import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Pack } from '@prisma/client';

import { PackComponentEntity } from '../entities/pack-component.entity';
import { PackProductEntity } from '../entities/pack-product.entity';
import { PackEntity } from '../entities/pack.entity';
import { PriceUpdateInteface } from '../interfaces/price-update.interface';
import { PackMapper } from '../mappers/pack.mapper';
import { ProductsService } from './products.service';
import { roundFloat } from '@/utils/roundFloat';

@Injectable()
export class PacksService {
  constructor(
    private prisma: PrismaService,
    private productService: ProductsService,
  ) {}

  async findAll() {
    const pack = await this.prisma.pack.findMany();
    if (pack.length === 0) {
      return pack;
    }

    const packCodes = [...new Set(pack.map((p) => p.packId))];

    const packs = await this.findPacks(packCodes);

    return packs;
  }

  async findPacks(codes: number[]) {
    return await Promise.all(
      codes.map(async (code) => await this.findOne(code)),
    );
  }

  async findOne(code: number): Promise<PackEntity> {
    const pack = await this.prisma.pack.findMany({ where: { packId: code } });
    if (pack.length === 0) {
      return null;
    }

    const packData = await this.productService.findOne(code);

    const products = await this.findPackComponents(pack);

    return PackMapper.withProducts(packData, products);
  }

  async findPackComponents(pack: Pack[]): Promise<PackProductEntity[]> {
    const products = await Promise.all(
      pack.map(async (p) => await this.findComponentAndMap(p)),
    );

    return products;
  }

  async findComponentAndMap(
    pack: PackComponentEntity,
  ): Promise<PackProductEntity> {
    const product = await this.productService.findOne(pack.productId);

    const packProduct = {
      packItemId: pack.id,
      packId: pack.packId,
      code: product.code,
      name: product.name,
      costPrice: product.costPrice.toNumber(),
      salesPrice: product.salesPrice.toNumber(),
      qty: pack.qty,
    };

    return packProduct;
  }

  async validatePackItens(
    pack: PackEntity,
    priceUpdateList: PriceUpdateInteface[],
  ) {
    await this.validateContent(pack, priceUpdateList);

    await this.validateNewPackPrice(pack, priceUpdateList);
  }

  async validateContent(
    pack: PackEntity,
    priceUpdateList: PriceUpdateInteface[],
  ) {
    const containsAllProducts = pack.products.every(
      (product) =>
        product.code === pack.code ||
        priceUpdateList.some((item) => item.code === product.code),
    );

    if (!containsAllProducts) {
      throw new Error(
        'A solicitação contém o novo preço de todos produtos do pacote',
      );
    }
  }

  async validateNewPackPrice(
    pack: PackEntity,
    priceUpdateList: PriceUpdateInteface[],
  ) {
    const newPack = priceUpdateList.reduce(
      (acc, curr) => {
        if (curr.code === pack.code) {
          return { ...acc, pack: curr };
        }
        const currentProduct = pack.products.find((p) => p.code === curr.code);
        if (currentProduct) {
          return {
            ...acc,
            products: [...acc?.products, { ...curr, qty: currentProduct.qty }],
          };
        }
        return acc;
      },
      { pack: null, products: [] },
    );

    const sumNewProductsPrice = newPack.products.reduce(
      (acc, curr) => acc + curr.qty * curr.newPrice,
      0,
    );

    if (newPack.pack.newPrice !== roundFloat(sumNewProductsPrice)) {
      throw new Error(
        'O preço do pacote deve ser igual a soma do preço dos produtos',
      );
    }
  }
}
