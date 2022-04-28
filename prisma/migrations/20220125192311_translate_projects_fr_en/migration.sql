/*
  Warnings:

  - You are about to drop the column `description` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Project` DROP COLUMN `description`,
    DROP COLUMN `title`,
    ADD COLUMN `descriptionEN` TEXT NULL,
    ADD COLUMN `descriptionFR` TEXT NULL,
    ADD COLUMN `titleEN` VARCHAR(255) NULL,
    ADD COLUMN `titleFR` VARCHAR(255) NULL;
