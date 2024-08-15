-- CreateTable
CREATE TABLE `aac_user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userCode` VARCHAR(191) NOT NULL,
    `userName` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,
    `salt` VARCHAR(191) NULL,
    `email` VARCHAR(191) NOT NULL,
    `mobile` VARCHAR(191) NULL,
    `tellphone` VARCHAR(191) NULL,
    `remark` VARCHAR(191) NULL,
    `createdaAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `aac_user_userCode_key`(`userCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
