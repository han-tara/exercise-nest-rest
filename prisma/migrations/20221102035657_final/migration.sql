-- AlterTable
ALTER TABLE `Form` ADD COLUMN `status` VARCHAR(20) NULL,
    MODIFY `duration` INTEGER NULL,
    MODIFY `active_date` DATETIME(3) NULL;
