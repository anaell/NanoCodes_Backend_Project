/*
  Warnings:

  - You are about to drop the column `artisan_id` on the `User` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `User_artisan_id_key` ON `User`;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `artisan_id`;
