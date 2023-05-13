import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from '../services/products.service';
import { BadRequestException } from '@nestjs/common';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findOne', async () => {
    it('should return a product', async () => {
      const product = {
        code: 100,
        name: 'SODA',
        costPrice: 10,
        salesPrice: 20,
      };

      jest.spyOn(service, 'findOne').mockReturnValue(product);

      const response = await controller.findOne(product.code);
      expect(response).toEqual(product);
    });

    it('should return a message when a product with code not registered', async () => {
      const product = {
        code: 100,
        name: 'SODA',
        costPrice: 10,
        salesPrice: 20,
      };

      jest.spyOn(service, 'findOne').mockReturnValue(null);

      const response = await controller.findOne(product.code);
      expect(response).toEqual({ message: 'Produto não encontrado' });
    });
  });

  describe('create', async () => {
    it('should create a product', async () => {
      const product = {
        code: 100,
        name: 'SODA',
        costPrice: 10,
        salesPrice: 20,
      };

      jest
        .spyOn(service, 'create')
        .mockReturnValue('Produto cadastrado com sucesso');

      const response = await controller.create(product);
      expect(response).toEqual('Produto cadastrado com sucesso');
    });

    it('should not create a product with code already registered', async () => {
      const product = {
        code: 100,
        name: 'SODA',
        costPrice: 10,
        salesPrice: 20,
      };

      jest.spyOn(service, 'findOne').mockReturnValue(product);

      await expect(service.create(product)).rejects.toThrow(
        BadRequestException,
      );
    });
  });
});
