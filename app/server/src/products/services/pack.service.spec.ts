import { PrismaService } from '@/prisma/prisma.service';
import * as packUtils from '@/utils/pack.helpers';
import { TestingModule, Test } from '@nestjs/testing';
import {
  pack,
  packProduct,
  packsWithoutProducts,
  packWithProducts,
  productCsvData,
  products,
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
      jest.spyOn(service, 'findPacks').mockResolvedValueOnce(packWithProducts);

      const result = await service.findAll();

      expect(result).toEqual(packWithProducts);
    });
    it('should return an empty list when there are no packs', async () => {
      jest.spyOn(prisma.pack, 'findMany').mockResolvedValueOnce([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });
  });

  describe('findPacks', () => {
    it('should return a list of packs', async () => {
      const findOne = jest.spyOn(service, 'findOne');
      findOne.mockResolvedValueOnce(packWithProducts[0]);
      findOne.mockResolvedValueOnce(packWithProducts[1]);

      const result = await service.findPacks([1000, 10001]);

      expect(result).toEqual(packWithProducts);
    });
  });

  describe('findPackComponents', () => {
    it('should return a list of pack components', async () => {
      const findComponentAndMap = jest.spyOn(service, 'findComponentAndMap');
      findComponentAndMap.mockResolvedValueOnce(packProduct[0]);
      findComponentAndMap.mockResolvedValueOnce(packProduct[1]);

      const result = await service.findPackComponents([pack[0], pack[1]]);

      expect(result).toEqual([packProduct[0], packProduct[1]]);
    });
  });

  describe('findComponentAndMap', () => {
    it('should return a pack component', async () => {
      jest.spyOn(productsService, 'findOne').mockResolvedValueOnce(products[0]);

      const result = await service.findComponentAndMap(pack[0]);

      expect(result).toEqual(packProduct[0]);
    });
  });

  describe('validatePackItens', () => {
    it('should not throw any error when pack is valid', async () => {
      jest.spyOn(service, 'validateContent').mockReturnValue(null);
      jest.spyOn(service, 'validateNewPackPrice').mockReturnValue(null);

      const result = await service.validatePackItens(packWithProducts[0], [
        productCsvData[0],
        productCsvData[1],
        productCsvData[2],
      ]);

      expect(result).toBeUndefined();
    });
    it('should throw an error when pack is invalid', async () => {
      jest.spyOn(service, 'validateContent').mockReturnValue(null);
      jest
        .spyOn(service, 'validateNewPackPrice')
        .mockRejectedValue(new Error('message'));

      expect(
        service.validatePackItens(packWithProducts[0], [
          productCsvData[0],
          productCsvData[1],
          productCsvData[2],
        ]),
      ).rejects.toThrowError(new Error('message'));
    });
    it('should throw an error when pack prices is invalid', async () => {
      jest
        .spyOn(service, 'validateContent')
        .mockRejectedValue(new Error('message'));
      jest.spyOn(service, 'validateNewPackPrice').mockReturnValue(null);

      expect(
        service.validatePackItens(packWithProducts[0], [
          productCsvData[0],
          productCsvData[1],
          productCsvData[2],
        ]),
      ).rejects.toThrowError(new Error('message'));
    });
  });
  describe('validateContent', () => {
    it('should not throw any error when pack is valid', async () => {
      jest.spyOn(service, 'validateContent').mockResolvedValueOnce(null);

      const result = await service.validateContent(packWithProducts[0], [
        productCsvData[0],
        productCsvData[1],
        productCsvData[2],
      ]);

      expect(result).toBeNull();
    });
    it('should throw an error when pack is invalid', async () => {
      jest.spyOn(packUtils, 'checkPackContent').mockReturnValue(false);

      expect(
        service.validateContent(packWithProducts[0], [
          productCsvData[0],
          productCsvData[1],
          productCsvData[2],
        ]),
      ).rejects.toThrowError(
        new Error(
          'A solicitação não contém o novo preço de todos produtos do pacote',
        ),
      );
    });
  });

  describe('validateNewPackPrice', () => {
    it('should not throw any error when pack is valid', async () => {
      jest.spyOn(service, 'validateNewPackPrice').mockResolvedValueOnce(null);

      const result = await service.validateNewPackPrice(packWithProducts[0], [
        productCsvData[0],
        productCsvData[1],
        productCsvData[2],
      ]);

      expect(result).toBeNull();
    });

    it('should throw an error when pack is invalid', async () => {
      jest.spyOn(packUtils, 'reducePriceList').mockReturnValue({
        pack: { code: 1, newPrice: 2 },
        products: [
          { code: 2, newPrice: 1, qty: 3 },
          { code: 3, newPrice: 2, qty: 1 },
        ],
      });
      jest.spyOn(packUtils, 'reducePackPrice').mockReturnValue(0);

      expect(
        service.validateNewPackPrice(packWithProducts[0], [
          productCsvData[0],
          productCsvData[1],
          productCsvData[2],
        ]),
      ).rejects.toThrowError(
        new Error(
          'O preço do pacote deve ser igual a soma do preço dos produtos',
        ),
      );
    });
  });
});
