-- CreateTable
CREATE TABLE `products` (
    `code` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `costPrice` DECIMAL(9, 2) NOT NULL,
    `salesPrice` DECIMAL(9, 2) NOT NULL,

    PRIMARY KEY (`code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pack` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `packId` INTEGER NOT NULL,
    `productId` INTEGER NOT NULL,
    `qty` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pack` ADD CONSTRAINT `Pack_packId_fkey` FOREIGN KEY (`packId`) REFERENCES `products`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Pack` ADD CONSTRAINT `Pack_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `products`(`code`) ON DELETE RESTRICT ON UPDATE CASCADE;
