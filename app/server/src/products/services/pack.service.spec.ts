import { PrismaService } from '@/prisma/prisma.service';
import { TestingModule, Test } from '@nestjs/testing';
import { pack, packWithProducts } from '@Test/mocks/data';

import { PacksService } from './packs.service';

describe('PacksService', () => {
  let service: PacksService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PacksService,
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
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a pack', async () => {
      jest
        .spyOn(prisma.pack, 'findMany')
        .mockResolvedValueOnce([pack[0], pack[1]]);

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
