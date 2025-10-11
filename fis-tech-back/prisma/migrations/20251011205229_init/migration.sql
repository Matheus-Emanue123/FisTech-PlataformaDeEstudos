/*
  Warnings:

  - A unique constraint covering the columns `[nome]` on the table `NivelDificuldade` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "NivelDificuldade_nome_key" ON "NivelDificuldade"("nome");
