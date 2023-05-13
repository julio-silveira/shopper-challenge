import { PrismaService } from '@/prisma/prisma.service';
import { TestingModule, Test } from '@nestjs/testing';
import { products, createProduct } from '@Test/mocks/data';

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
});
