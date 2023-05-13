import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, Product } from '@prisma/client';

describe('ProductsService', () => {
  let service: ProductsService;
  let prisma: PrismaService;

  const product: Product = {
    code: 100,
    name: 'SODA',
    costPrice: new Prisma.Decimal(10),
    salesPrice: new Prisma.Decimal(20),
  };

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
      const message = await service.create(product);
      expect(message).toEqual('Producto cadastrado com sucesso');
    });
  });
});
