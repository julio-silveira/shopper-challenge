import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { Prisma } from '@prisma/client';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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

    it('should not create a product with code already registered', async () => {
      const product = {
        code: 100,
        name: 'SODA',
        costPrice: 10,
        salesPrice: 20,
      };

      await service.create(product);
      await expect(service.create(product)).rejects.toThrow(
        'Código já cadastrado',
      );
    });
  });
});
