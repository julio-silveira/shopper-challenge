import { PrismaService } from '@/prisma/prisma.service';
import { NotFoundException, BadRequestException } from '@nestjs/common';
import { TestingModule, Test } from '@nestjs/testing';
import { products, createProduct } from '@Test/mocks/data';

import { ProductsService } from '../services/products.service';
import { ProductsController } from './products.controller';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  const product = products[0];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService, PrismaService],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
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
});
