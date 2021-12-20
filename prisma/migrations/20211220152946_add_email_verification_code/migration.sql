/*
  Warnings:

  - Added the required column `emailVerificationCode` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `User` ADD COLUMN `emailVerificationCode` VARCHAR(191) NOT NULL;
