import { PrismaService } from '@/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Pack } from '@prisma/client';

import { PackComponentEntity } from '../entities/pack-component.entity';
import { PackProductEntity } from '../entities/pack-product.entity';
import { PackEntity } from '../entities/pack.entity';
import { PackMapper } from '../mappers/pack.mapper';
import { ProductsService } from './products.service';

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
}
