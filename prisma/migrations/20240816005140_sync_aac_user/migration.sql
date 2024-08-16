/*
  Warnings:

  - You are about to drop the column `createdaAt` on the `aac_user` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `aac_user` DROP COLUMN `createdaAt`,
    ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);
