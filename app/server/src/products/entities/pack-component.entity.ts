import { Pack } from '@prisma/client';

export class PackComponentEntity implements Pack {
  id: number;
  packId: number;
  productId: number;
  qty: number;
}
