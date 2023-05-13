import { PrismaClient } from '@prisma/client';
import { products } from './seedData/products';
import { packs } from './seedData/packs';
const prisma = new PrismaClient();

async function main() {
  await Promise.all(
    products.map(async (currProduct) => {
      await prisma.product.upsert({
        where: { code: currProduct.code },
        update: {},
        create: currProduct,
      });
    }),
  );

  await Promise.all(
    packs.map(async (currPack) => {
      await prisma.pack.upsert({
        where: { id: currPack.id },
        update: {},
        create: {
          pack: {
            connect: { code: currPack.packId },
          },
          product: {
            connect: { code: currPack.productId },
          },
          qty: currPack.qty,
        },
      });
    }),
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
