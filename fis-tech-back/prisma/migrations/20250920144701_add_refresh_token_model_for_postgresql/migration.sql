-- CreateEnum
CREATE TYPE "public"."UserType_tipo" AS ENUM ('administrador', 'moderador', 'usuario_padrao');

-- CreateTable
CREATE TABLE "public"."Anotacao" (
    "id" SERIAL NOT NULL,
    "texto" TEXT NOT NULL,
    "user_id" INTEGER,
    "topico_id" INTEGER,
    "data_criacao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Anotacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Assunto" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT,
    "nome" VARCHAR(100) NOT NULL,

    CONSTRAINT "Assunto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Comentario" (
    "id" SERIAL NOT NULL,
    "texto" TEXT NOT NULL,
    "data_criacao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "removido" BOOLEAN DEFAULT false,
    "user_id" INTEGER,
    "conteudo_id" INTEGER,

    CONSTRAINT "Comentario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Conteudo" (
    "id" SERIAL NOT NULL,
    "titulo" VARCHAR(255) NOT NULL,
    "descricao" TEXT,
    "url_video" VARCHAR(255),
    "tipo" VARCHAR(50),
    "data_criacao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "topico_id" INTEGER,
    "nivel_id" INTEGER,
    "criado_por" INTEGER,
    "questao_id" INTEGER,

    CONSTRAINT "Conteudo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."MapaMental" (
    "id" SERIAL NOT NULL,
    "arquivo_url" VARCHAR(255),
    "data_criacao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER,
    "topico_id" INTEGER,

    CONSTRAINT "MapaMental_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."NivelDificuldade" (
    "id" SERIAL NOT NULL,
    "xp" INTEGER NOT NULL,
    "nome" VARCHAR(50) NOT NULL,

    CONSTRAINT "NivelDificuldade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Questao" (
    "id" SERIAL NOT NULL,
    "enunciado" TEXT NOT NULL,
    "ano" INTEGER,
    "origem" VARCHAR(100),
    "fase" VARCHAR(50),
    "alternativas" JSONB,
    "data_criacao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "resolvido" BOOLEAN,
    "nivel_id" INTEGER,
    "criado_por" INTEGER,

    CONSTRAINT "Questao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."QuestaoResolvida" (
    "id" SERIAL NOT NULL,
    "data_resolucao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "acerto" BOOLEAN,
    "id_user" INTEGER,
    "id_questao" INTEGER,
    "nivel_id" INTEGER,

    CONSTRAINT "QuestaoResolvida_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Resumo" (
    "id" SERIAL NOT NULL,
    "texto" TEXT NOT NULL,
    "data_criacao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER,
    "topico_id" INTEGER,

    CONSTRAINT "Resumo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Topico" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "descricao" TEXT,
    "assunto_id" INTEGER,

    CONSTRAINT "Topico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserType" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "permissoes" JSONB NOT NULL,

    CONSTRAINT "UserType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserXP" (
    "user_id" INTEGER NOT NULL,
    "xp_total" INTEGER NOT NULL,
    "atualizado_em" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserXP_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "public"."Usuario" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "senha_hash" VARCHAR(255) NOT NULL,
    "data_criacao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "ultimo_login" TIMESTAMP(3),
    "user_type_id" INTEGER NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RefreshToken" (
    "id" SERIAL NOT NULL,
    "token_hash" TEXT NOT NULL,
    "usuarioId" INTEGER NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "isRevoked" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RefreshToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Anotacao_topico_id" ON "public"."Anotacao"("topico_id");

-- CreateIndex
CREATE INDEX "Anotacao_user_id" ON "public"."Anotacao"("user_id");

-- CreateIndex
CREATE INDEX "Comentario_conteudo_id" ON "public"."Comentario"("conteudo_id");

-- CreateIndex
CREATE INDEX "Comentario_user_id" ON "public"."Comentario"("user_id");

-- CreateIndex
CREATE INDEX "Conteudo_criado_por" ON "public"."Conteudo"("criado_por");

-- CreateIndex
CREATE INDEX "Conteudo_nivel_id" ON "public"."Conteudo"("nivel_id");

-- CreateIndex
CREATE INDEX "Conteudo_questao_id" ON "public"."Conteudo"("questao_id");

-- CreateIndex
CREATE INDEX "Conteudo_topico_id" ON "public"."Conteudo"("topico_id");

-- CreateIndex
CREATE INDEX "MapaMental_topico_id" ON "public"."MapaMental"("topico_id");

-- CreateIndex
CREATE INDEX "MapaMental_user_id" ON "public"."MapaMental"("user_id");

-- CreateIndex
CREATE INDEX "Questao_criado_por" ON "public"."Questao"("criado_por");

-- CreateIndex
CREATE INDEX "Questao_nivel_id" ON "public"."Questao"("nivel_id");

-- CreateIndex
CREATE INDEX "QuestaoResolvida_id_questao" ON "public"."QuestaoResolvida"("id_questao");

-- CreateIndex
CREATE INDEX "QuestaoResolvida_id_user" ON "public"."QuestaoResolvida"("id_user");

-- CreateIndex
CREATE INDEX "QuestaoResolvida_nivel_id" ON "public"."QuestaoResolvida"("nivel_id");

-- CreateIndex
CREATE INDEX "Resumo_topico_id" ON "public"."Resumo"("topico_id");

-- CreateIndex
CREATE INDEX "Resumo_user_id" ON "public"."Resumo"("user_id");

-- CreateIndex
CREATE INDEX "Topico_assunto_id" ON "public"."Topico"("assunto_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserType_tipo_key" ON "public"."UserType"("tipo");

-- CreateIndex
CREATE INDEX "Usuario_user_type_id" ON "public"."Usuario"("user_type_id");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_token_hash_key" ON "public"."RefreshToken"("token_hash");

-- AddForeignKey
ALTER TABLE "public"."Anotacao" ADD CONSTRAINT "Anotacao_ibfk_1" FOREIGN KEY ("user_id") REFERENCES "public"."Usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."Anotacao" ADD CONSTRAINT "Anotacao_ibfk_2" FOREIGN KEY ("topico_id") REFERENCES "public"."Topico"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."Comentario" ADD CONSTRAINT "Comentario_ibfk_1" FOREIGN KEY ("user_id") REFERENCES "public"."Usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."Comentario" ADD CONSTRAINT "Comentario_ibfk_2" FOREIGN KEY ("conteudo_id") REFERENCES "public"."Conteudo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."Conteudo" ADD CONSTRAINT "Conteudo_ibfk_1" FOREIGN KEY ("topico_id") REFERENCES "public"."Topico"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."Conteudo" ADD CONSTRAINT "Conteudo_ibfk_2" FOREIGN KEY ("nivel_id") REFERENCES "public"."NivelDificuldade"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."Conteudo" ADD CONSTRAINT "Conteudo_ibfk_3" FOREIGN KEY ("criado_por") REFERENCES "public"."Usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."Conteudo" ADD CONSTRAINT "Conteudo_ibfk_4" FOREIGN KEY ("questao_id") REFERENCES "public"."Questao"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."MapaMental" ADD CONSTRAINT "MapaMental_ibfk_1" FOREIGN KEY ("user_id") REFERENCES "public"."Usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."MapaMental" ADD CONSTRAINT "MapaMental_ibfk_2" FOREIGN KEY ("topico_id") REFERENCES "public"."Topico"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."Questao" ADD CONSTRAINT "Questao_ibfk_1" FOREIGN KEY ("nivel_id") REFERENCES "public"."NivelDificuldade"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."Questao" ADD CONSTRAINT "Questao_ibfk_2" FOREIGN KEY ("criado_por") REFERENCES "public"."Usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."QuestaoResolvida" ADD CONSTRAINT "QuestaoResolvida_ibfk_1" FOREIGN KEY ("id_user") REFERENCES "public"."Usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."QuestaoResolvida" ADD CONSTRAINT "QuestaoResolvida_ibfk_2" FOREIGN KEY ("id_questao") REFERENCES "public"."Questao"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."QuestaoResolvida" ADD CONSTRAINT "QuestaoResolvida_ibfk_3" FOREIGN KEY ("nivel_id") REFERENCES "public"."NivelDificuldade"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."Resumo" ADD CONSTRAINT "Resumo_ibfk_1" FOREIGN KEY ("user_id") REFERENCES "public"."Usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."Resumo" ADD CONSTRAINT "Resumo_ibfk_2" FOREIGN KEY ("topico_id") REFERENCES "public"."Topico"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."Topico" ADD CONSTRAINT "Topico_ibfk_1" FOREIGN KEY ("assunto_id") REFERENCES "public"."Assunto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."UserXP" ADD CONSTRAINT "UserXP_ibfk_1" FOREIGN KEY ("user_id") REFERENCES "public"."Usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."Usuario" ADD CONSTRAINT "Usuario_ibfk_1" FOREIGN KEY ("user_type_id") REFERENCES "public"."UserType"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "public"."RefreshToken" ADD CONSTRAINT "RefreshToken_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "public"."Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
