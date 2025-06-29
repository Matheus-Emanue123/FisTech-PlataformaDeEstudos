/*
  Warnings:

  - Made the column `user_type_id` on table `usuario` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `usuario` DROP FOREIGN KEY `Usuario_ibfk_1`;

-- AlterTable
ALTER TABLE `usuario` MODIFY `user_type_id` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_ibfk_1` FOREIGN KEY (`user_type_id`) REFERENCES `UserType`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
