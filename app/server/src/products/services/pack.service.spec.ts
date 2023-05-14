import { PrismaService } from '@/prisma/prisma.service';
import { TestingModule, Test } from '@nestjs/testing';
import {
  pack,
  packProduct,
  packsWithoutProducts,
  packWithProducts,
} from '@Test/mocks/data';

import { PacksService } from './packs.service';
import { ProductsService } from './products.service';

describe('PacksService', () => {
  let service: PacksService;
  let prisma: PrismaService;
  let productsService: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PacksService,
        ProductsService,
        {
          provide: PrismaService,
          useValue: {
            pack: {
              create: jest.fn(),
              findUnique: jest.fn(),
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<PacksService>(PacksService);
    prisma = module.get<PrismaService>(PrismaService);
    productsService = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a pack', async () => {
      jest
        .spyOn(prisma.pack, 'findMany')
        .mockResolvedValueOnce([pack[0], pack[1]]);

      jest
        .spyOn(productsService, 'findOne')
        .mockResolvedValueOnce(packsWithoutProducts[0]);

      jest
        .spyOn(service, 'findPackComponents')
        .mockResolvedValueOnce([packProduct[0], packProduct[1]]);

      const result = await service.findOne(1000);

      expect(result).toEqual(packWithProducts[0]);
    });

    it('should return null when package is not registered', async () => {
      jest.spyOn(prisma.pack, 'findMany').mockResolvedValueOnce([]);

      const result = await service.findOne(1000);

      expect(result).toBeNull();
    });
  });

  describe('findAll', () => {
    it('should return a list of packs', async () => {
      jest.spyOn(prisma.pack, 'findMany').mockResolvedValueOnce(pack);

      const result = await service.findAll();

      expect(result).toEqual(packWithProducts);
    });
    it('should return an empty list when there are no packs', async () => {
      jest.spyOn(prisma.pack, 'findMany').mockResolvedValueOnce([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });
});
