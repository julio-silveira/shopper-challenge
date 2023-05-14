import { PrismaService } from '@/prisma/prisma.service';
import * as csv from '@/utils/csv.parser';
import { TestingModule, Test } from '@nestjs/testing';
import {
  products,
  createProduct,
  parsedCsvData,
  productCsvData,
} from '@Test/mocks/data';

import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let prisma: PrismaService;

  const product = products[0];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductsService,
        {
          provide: PrismaService,
          useValue: {
            product: {
              create: jest.fn(),
              findUnique: jest.fn(),
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a product', async () => {
      jest.spyOn(prisma.product, 'findUnique').mockResolvedValue(product);

      const response = await service.findOne(product.code);
      expect(response).toEqual(product);
    });

    it('should return a null when a product with code not registered', async () => {
      jest.spyOn(prisma.product, 'findUnique').mockReturnValue(null);

      const response = await service.findOne(product.code);
      expect(response).toEqual(null);
    });
  });

  describe('create', () => {
    it('should create a product', async () => {
      const message = await service.create(createProduct);
      expect(message).toEqual({ message: 'Produto cadastrado com sucesso' });
    });
  });

  describe('findAll', () => {
    it('should return an array of products', async () => {
      jest.spyOn(prisma.product, 'findMany').mockResolvedValue(products);

      const response = await service.findAll();
      expect(response).toEqual(products);
    });
  });

  describe('parseProductCsv', () => {
    it('should return a parsed array', async () => {
      jest.spyOn(csv, 'csvParser').mockResolvedValue(parsedCsvData);

      const response = await service.parseProductCsv('path');
      expect(response).toEqual(productCsvData);
    });
  });

  describe('validatePrice', () => {
    it('should return an array with codes and new prices', async () => {
      const response = await service.validatePrice(90, 91, 92);
      expect(response).toEqual([]);
    });

    it('should return an array with error messages', async () => {
      const response = await service.validatePrice(90, 91, 88);
      expect(response).toEqual([
        'O novo preço não pode ser menor que o preço de custo',
      ]);
    });

    it('should return an array with error messages', async () => {
      const response = await service.validatePrice(1, 10, 5);
      expect(response).toEqual([
        'A variação de preço não pode ser superior à 10%.',
      ]);
    });
  });

  describe('validateProduct', () => {
    it('should return an array with error messages', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(product);

      const response = await service.validateProduct(1, 9);
      expect(response.message).toContain(
        'O novo preço não pode ser menor que o preço de custo',
      );
    });
    it('should return an array with error messages', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(product);

      const response = await service.validateProduct(1, 22);
      expect(response.message).toContain(
        'A variação de preço não pode ser superior à 10%.',
      );
    });
    it('should return an array with error messages', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(null);

      const response = await service.validateProduct(1, 22);
      expect(response.message).toContain('Produto não encontrado');
    });
    it('should return a object with product data', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(product);

      const response = await service.validateProduct(1, 20);
      expect(response).toEqual({
        code: 1,
        currentPrice: 20,
        name: 'SODA',
        newPrice: 20,
        valid: true,
      });
    });
  });
});
