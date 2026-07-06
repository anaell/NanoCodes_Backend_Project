/*
  Warnings:

  - You are about to drop the column `review_id` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the `Bank_Details` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Bank_Details` DROP FOREIGN KEY `Bank_Details_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `Booking` DROP FOREIGN KEY `Booking_review_id_fkey`;

-- DropForeignKey
ALTER TABLE `Review` DROP FOREIGN KEY `Review_artisan_id_fkey`;

-- DropForeignKey
ALTER TABLE `Review` DROP FOREIGN KEY `Review_customer_id_fkey`;

-- DropIndex
DROP INDEX `Booking_review_id_key` ON `Booking`;

-- AlterTable
ALTER TABLE `Artisan` ADD COLUMN `total_money_made` DOUBLE NULL,
    ADD COLUMN `total_money_withdrawn` DOUBLE NULL;

-- AlterTable
ALTER TABLE `Booking` DROP COLUMN `review_id`,
    MODIFY `status` ENUM('pending', 'accepted', 'rejected', 'in_progress', 'cancelled', 'completed') NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE `User` ADD COLUMN `is_deleted` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `is_suspended` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `total_amount_spent_on_bookings` DOUBLE NULL;

-- DropTable
DROP TABLE `Bank_Details`;

-- DropTable
DROP TABLE `Review`;

-- CreateTable
CREATE TABLE `Bank_Detail` (
    `id` VARCHAR(191) NOT NULL,
    `account_no` VARCHAR(191) NOT NULL,
    `bank_name` VARCHAR(191) NOT NULL,
    `account_name` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Bank_Detail_user_id_key`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Booking_Review` (
    `id` VARCHAR(191) NOT NULL,
    `comment` VARCHAR(191) NULL,
    `rating` INTEGER NOT NULL,
    `status` ENUM('published', 'deleted', 'reported') NOT NULL DEFAULT 'published',
    `customer_id` VARCHAR(191) NOT NULL,
    `booking_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,
    `artisanId` VARCHAR(191) NULL,

    UNIQUE INDEX `Booking_Review_booking_id_key`(`booking_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Artisan_Review_Reply` (
    `id` VARCHAR(191) NOT NULL,
    `reply` VARCHAR(191) NOT NULL,
    `review_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Artisan_Review_Reply_review_id_key`(`review_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Payment` (
    `id` VARCHAR(191) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `status` ENUM('processing', 'successful') NOT NULL DEFAULT 'processing',
    `payment_method` VARCHAR(191) NOT NULL,
    `artisan_id` VARCHAR(191) NOT NULL,
    `customer_id` VARCHAR(191) NOT NULL,
    `booking_id` VARCHAR(191) NOT NULL,
    `payment_completed_at` DATETIME(3) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Payment_booking_id_key`(`booking_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Artisan_Verification_Documents` (
    `id` VARCHAR(191) NOT NULL,
    `status` ENUM('pending', 'accepted', 'rejected', 'more_info_required') NOT NULL DEFAULT 'pending',
    `nin_doc_url` VARCHAR(191) NULL,
    `profession_credential_doc_url` VARCHAR(191) NULL,
    `artisan_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Artisan_Verification_Documents_artisan_id_key`(`artisan_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `System_Info` (
    `id` VARCHAR(191) NOT NULL,
    `platform_name` VARCHAR(191) NOT NULL,
    `platform_logo_url` VARCHAR(191) NOT NULL,
    `support_email` VARCHAR(191) NOT NULL,
    `maintenance_mode` BOOLEAN NOT NULL DEFAULT false,
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Bank_Detail` ADD CONSTRAINT `Bank_Detail_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking_Review` ADD CONSTRAINT `Booking_Review_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking_Review` ADD CONSTRAINT `Booking_Review_booking_id_fkey` FOREIGN KEY (`booking_id`) REFERENCES `Booking`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking_Review` ADD CONSTRAINT `Booking_Review_artisanId_fkey` FOREIGN KEY (`artisanId`) REFERENCES `Artisan`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Artisan_Review_Reply` ADD CONSTRAINT `Artisan_Review_Reply_review_id_fkey` FOREIGN KEY (`review_id`) REFERENCES `Booking_Review`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_artisan_id_fkey` FOREIGN KEY (`artisan_id`) REFERENCES `Artisan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_customer_id_fkey` FOREIGN KEY (`customer_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Payment` ADD CONSTRAINT `Payment_booking_id_fkey` FOREIGN KEY (`booking_id`) REFERENCES `Booking`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Artisan_Verification_Documents` ADD CONSTRAINT `Artisan_Verification_Documents_artisan_id_fkey` FOREIGN KEY (`artisan_id`) REFERENCES `Artisan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
