import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from '../services/products.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { ProductEntity } from '../entities/product.entity';
import { CreateProductDto } from '../dto/create-product.dto';
import { PrismaService } from '../../prisma/prisma.service';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  const product: ProductEntity = {
    code: 100,
    name: 'SODA',
    costPrice: new Prisma.Decimal(10),
    salesPrice: new Prisma.Decimal(20),
  };

  const createProduct: CreateProductDto = {
    code: 100,
    name: 'SODA',
    costPrice: 10,
    salesPrice: 20,
  };

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
});
