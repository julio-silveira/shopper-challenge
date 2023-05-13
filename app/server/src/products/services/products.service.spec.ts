import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product } from '@prisma/client';

describe('ProductsService', () => {
  let service: ProductsService;
  let prisma: PrismaService;

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
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', async () => {
    it('should return a product', async () => {
      const product: Product = {
        code: 100,
        name: 'SODA',
        costPrice: 10,
        salesPrice: 20,
      };

      jest.spyOn(prisma.product, 'findUnique').mockReturnValue(product);

      const response = await service.findOne(product.code);
      expect(response).toEqual(product);
    });

    it('should return a null when a product with code not registered', async () => {
      const product = {
        code: 100,
        name: 'SODA',
        costPrice: 10,
        salesPrice: 20,
      };

      jest.spyOn(prisma.product, 'findUnique').mockReturnValue(null);

      const response = await service.findOne(product.code);
      expect(response).toEqual(null);
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

      const message = await service.create(product);
      expect(message).toEqual('Producto cadastrado com sucesso');
    });
  });
});
