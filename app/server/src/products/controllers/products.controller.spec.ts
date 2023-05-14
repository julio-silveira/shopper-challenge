import { PrismaService } from '@/prisma/prisma.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import {
  products,
  createProduct,
  productCsvData,
  productUpdateMock,
  packsWithoutProducts,
  validatedProducsMock,
} from '@Test/mocks/data';

import { PacksService } from '../services/packs.service';
import { ProductsService } from '../services/products.service';
import { ProductsController } from './products.controller';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;
  let packsService: PacksService;

  const product = products[0];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService, PrismaService, PacksService],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
    packsService = module.get<PacksService>(PacksService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a product', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(product);

      const response = await controller.findOne(product.code.toString());
      expect(response).toEqual(product);
    });

    it('should return a message when a product with code not registered', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null);

      expect(controller.findOne(product.code.toString())).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('create', () => {
    it('should create a product', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null);
      jest
        .spyOn(service, 'create')
        .mockResolvedValue({ message: 'Produto cadastrado com sucesso' });

      const response = await controller.create(createProduct);
      expect(response).toEqual({ message: 'Produto cadastrado com sucesso' });
    });

    it('should not create a product with code already registered', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(product);

      await expect(controller.create(createProduct)).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findAll', () => {
    it('should return all products', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(products);

      const response = await controller.findAll();
      expect(response).toEqual(products);
    });
  });

  describe('validateProductCsv', () => {
    it('should return a message when csv is valid', async () => {
      jest.spyOn(service, 'parseProductCsv').mockResolvedValue(productCsvData);
      const validateProduct = jest.spyOn(service, 'validateProduct');
      validateProduct.mockResolvedValueOnce(productUpdateMock[0]);
      validateProduct.mockResolvedValueOnce(productUpdateMock[1]);
      validateProduct.mockResolvedValueOnce(productUpdateMock[2]);
      validateProduct.mockResolvedValueOnce(productUpdateMock[3]);
      validateProduct.mockResolvedValueOnce(productUpdateMock[4]);

      const findPack = jest.spyOn(packsService, 'findOne');
      findPack.mockResolvedValueOnce(null);
      findPack.mockResolvedValueOnce({
        code: 1000,
        name: 'PACK 1',
        costPrice: 15,
        salesPrice: 40,
      });
      findPack.mockResolvedValueOnce(null);
      findPack.mockResolvedValueOnce(null);
      findPack.mockResolvedValueOnce({
        code: 1001,
        name: 'PACK 2',
        costPrice: 15,
        salesPrice: 50,
      });

      const validatePackItens = jest.spyOn(packsService, 'validatePackItens');
      validatePackItens.mockRejectedValueOnce(Error('message'));
      validatePackItens.mockRejectedValueOnce(Error('message'));

      const response = await controller.validateProductCsv(
        'file' as unknown as Express.Multer.File,
      );

      expect(response).toEqual(validatedProducsMock);
    });
    it('should throw a badRequestError when csv is invalid', async () => {
      jest.spyOn(service, 'parseProductCsv').mockResolvedValue(null);

      await expect(
        controller.validateProductCsv('file' as unknown as Express.Multer.File),
      ).rejects.toThrow(BadRequestException);
    });
  });
  describe('updatePrices', () => {
    it('should return a message when update prices', async () => {
      jest.spyOn(service, 'updatePrices').mockResolvedValue({
        message: 'Preços atualizados com sucesso',
      });

      const response = await controller.updatePrices({
        products: [{ code: 100, newPrice: 21 }],
      });
      expect(response).toEqual({ message: 'Preços atualizados com sucesso' });
    });
    it('should throw a badRequestError when receive invalid product', async () => {
      jest.spyOn(service, 'updatePrices').mockResolvedValue(null);

      await expect(
        controller.updatePrices({
          products: [{ code: 100, newPrice: 21 }],
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
