-- AlterTable
ALTER TABLE `Artisan` MODIFY `min_price_per_hour` DECIMAL(20, 2) NULL,
    MODIFY `total_money_made` DECIMAL(20, 2) NULL,
    MODIFY `total_money_withdrawn` DECIMAL(20, 2) NULL;

-- AlterTable
ALTER TABLE `Booking` MODIFY `booking_price` DECIMAL(20, 2) NOT NULL;

-- AlterTable
ALTER TABLE `Payment` MODIFY `amount` DECIMAL(20, 2) NOT NULL;

-- AlterTable
ALTER TABLE `Service` MODIFY `price` DECIMAL(20, 2) NOT NULL;

-- AlterTable
ALTER TABLE `User` MODIFY `total_amount_spent_on_bookings` DECIMAL(20, 2) NULL;
