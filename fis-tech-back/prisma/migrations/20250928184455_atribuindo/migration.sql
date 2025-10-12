-- DropForeignKey
ALTER TABLE "public"."Anotacao" DROP CONSTRAINT "Anotacao_ibfk_1";

-- DropForeignKey
ALTER TABLE "public"."RefreshToken" DROP CONSTRAINT "RefreshToken_usuarioId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Anotacao" ADD CONSTRAINT "Anotacao_ibfk_1" FOREIGN KEY ("user_id") REFERENCES "public"."Usuario"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."RefreshToken" ADD CONSTRAINT "RefreshToken_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
