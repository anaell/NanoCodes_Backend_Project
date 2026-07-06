/*
  Warnings:

  - You are about to drop the column `service_description` on the `Booking` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[review_id]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `booking_price` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `booking_start_date` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `problem_description` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `work_to_be_done` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Artisan` ADD COLUMN `about_artisan` VARCHAR(191) NULL,
    ADD COLUMN `main_skill` VARCHAR(191) NULL,
    ADD COLUMN `min_price_per_hour` DOUBLE NULL,
    ADD COLUMN `response_time` INTEGER NULL,
    ADD COLUMN `verified` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `Booking` DROP COLUMN `service_description`,
    ADD COLUMN `booking_address` VARCHAR(191) NULL,
    ADD COLUMN `booking_end_date` DATETIME(3) NULL,
    ADD COLUMN `booking_price` DOUBLE NOT NULL,
    ADD COLUMN `booking_start_date` DATETIME(3) NOT NULL,
    ADD COLUMN `problem_description` VARCHAR(191) NOT NULL,
    ADD COLUMN `review_id` VARCHAR(191) NULL,
    ADD COLUMN `work_to_be_done` VARCHAR(191) NOT NULL,
    MODIFY `status` ENUM('pending', 'accepted', 'rejected', 'in_progress', 'completed') NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE `Review` ADD COLUMN `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updated_at` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `preferred_booking_address` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `Service` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `price` DOUBLE NOT NULL,
    `artisan_id` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Newsletter` (
    `id` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `Newsletter_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Favourite` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `artisan_id` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Favourite_user_id_artisan_id_key`(`user_id`, `artisan_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Booking_Picture` (
    `id` VARCHAR(191) NOT NULL,
    `booking_id` VARCHAR(191) NOT NULL,
    `url` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `Booking_review_id_key` ON `Booking`(`review_id`);

-- AddForeignKey
ALTER TABLE `Booking` ADD CONSTRAINT `Booking_review_id_fkey` FOREIGN KEY (`review_id`) REFERENCES `Review`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Service` ADD CONSTRAINT `Service_artisan_id_fkey` FOREIGN KEY (`artisan_id`) REFERENCES `Artisan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favourite` ADD CONSTRAINT `Favourite_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Favourite` ADD CONSTRAINT `Favourite_artisan_id_fkey` FOREIGN KEY (`artisan_id`) REFERENCES `Artisan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Booking_Picture` ADD CONSTRAINT `Booking_Picture_booking_id_fkey` FOREIGN KEY (`booking_id`) REFERENCES `Booking`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
