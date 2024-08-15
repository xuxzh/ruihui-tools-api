/*
  Warnings:

  - You are about to drop the column `tellphone` on the `aac_user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `aac_user` DROP COLUMN `tellphone`,
    ADD COLUMN `deleted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `deletedAt` DATETIME(3) NULL,
    ADD COLUMN `telephone` VARCHAR(191) NULL;
