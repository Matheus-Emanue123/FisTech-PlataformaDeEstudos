-- CreateEnum
CREATE TYPE "UserType_tipo" AS ENUM ('administrador', 'moderador', 'usuario_padrao');

-- CreateTable
CREATE TABLE "Anotacao" (
    "id" SERIAL NOT NULL,
    "texto" TEXT NOT NULL,
    "user_id" INTEGER,
    "topico_id" INTEGER,
    "data_criacao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Anotacao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Assunto" (
    "id" SERIAL NOT NULL,
    "descricao" TEXT,
    "nome" VARCHAR(100) NOT NULL,

    CONSTRAINT "Assunto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comentario" (
    "id" SERIAL NOT NULL,
    "texto" TEXT NOT NULL,
    "data_criacao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "removido" BOOLEAN DEFAULT false,
    "user_id" INTEGER,
    "conteudo_id" INTEGER,

    CONSTRAINT "Comentario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Conteudo" (
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
CREATE TABLE "MapaMental" (
    "id" SERIAL NOT NULL,
    "arquivo_url" VARCHAR(255),
    "data_criacao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER,
    "topico_id" INTEGER,

    CONSTRAINT "MapaMental_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NivelDificuldade" (
    "id" SERIAL NOT NULL,
    "xp" INTEGER NOT NULL,
    "nome" VARCHAR(50) NOT NULL,

    CONSTRAINT "NivelDificuldade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Questao" (
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
CREATE TABLE "QuestaoResolvida" (
    "id" SERIAL NOT NULL,
    "data_resolucao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "acerto" BOOLEAN,
    "id_user" INTEGER,
    "id_questao" INTEGER,
    "nivel_id" INTEGER,

    CONSTRAINT "QuestaoResolvida_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Resumo" (
    "id" SERIAL NOT NULL,
    "texto" TEXT NOT NULL,
    "data_criacao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER,
    "topico_id" INTEGER,

    CONSTRAINT "Resumo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topico" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "descricao" TEXT,
    "assunto_id" INTEGER,

    CONSTRAINT "Topico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserType" (
    "id" SERIAL NOT NULL,
    "tipo" TEXT NOT NULL,
    "permissoes" JSONB NOT NULL,

    CONSTRAINT "UserType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserXP" (
    "user_id" INTEGER NOT NULL,
    "xp_total" INTEGER NOT NULL,
    "atualizado_em" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UserXP_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "senha_hash" VARCHAR(255) NOT NULL,
    "data_criacao" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "ultimo_login" TIMESTAMP(3),
    "disabled" BOOLEAN NOT NULL DEFAULT false,
    "user_type_id" INTEGER NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefreshToken" (
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
CREATE INDEX "Anotacao_topico_id" ON "Anotacao"("topico_id");

-- CreateIndex
CREATE INDEX "Anotacao_user_id" ON "Anotacao"("user_id");

-- CreateIndex
CREATE INDEX "Comentario_conteudo_id" ON "Comentario"("conteudo_id");

-- CreateIndex
CREATE INDEX "Comentario_user_id" ON "Comentario"("user_id");

-- CreateIndex
CREATE INDEX "Conteudo_criado_por" ON "Conteudo"("criado_por");

-- CreateIndex
CREATE INDEX "Conteudo_nivel_id" ON "Conteudo"("nivel_id");

-- CreateIndex
CREATE INDEX "Conteudo_questao_id" ON "Conteudo"("questao_id");

-- CreateIndex
CREATE INDEX "Conteudo_topico_id" ON "Conteudo"("topico_id");

-- CreateIndex
CREATE INDEX "MapaMental_topico_id" ON "MapaMental"("topico_id");

-- CreateIndex
CREATE INDEX "MapaMental_user_id" ON "MapaMental"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "NivelDificuldade_nome_key" ON "NivelDificuldade"("nome");

-- CreateIndex
CREATE INDEX "Questao_criado_por" ON "Questao"("criado_por");

-- CreateIndex
CREATE INDEX "Questao_nivel_id" ON "Questao"("nivel_id");

-- CreateIndex
CREATE INDEX "QuestaoResolvida_id_questao" ON "QuestaoResolvida"("id_questao");

-- CreateIndex
CREATE INDEX "QuestaoResolvida_id_user" ON "QuestaoResolvida"("id_user");

-- CreateIndex
CREATE INDEX "QuestaoResolvida_nivel_id" ON "QuestaoResolvida"("nivel_id");

-- CreateIndex
CREATE INDEX "Resumo_topico_id" ON "Resumo"("topico_id");

-- CreateIndex
CREATE INDEX "Resumo_user_id" ON "Resumo"("user_id");

-- CreateIndex
CREATE INDEX "Topico_assunto_id" ON "Topico"("assunto_id");

-- CreateIndex
CREATE UNIQUE INDEX "UserType_tipo_key" ON "UserType"("tipo");

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE INDEX "Usuario_user_type_id" ON "Usuario"("user_type_id");

-- CreateIndex
CREATE UNIQUE INDEX "RefreshToken_token_hash_key" ON "RefreshToken"("token_hash");

-- AddForeignKey
ALTER TABLE "Anotacao" ADD CONSTRAINT "Anotacao_ibfk_1" FOREIGN KEY ("user_id") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Anotacao" ADD CONSTRAINT "Anotacao_ibfk_2" FOREIGN KEY ("topico_id") REFERENCES "Topico"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_ibfk_1" FOREIGN KEY ("user_id") REFERENCES "Usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Comentario" ADD CONSTRAINT "Comentario_ibfk_2" FOREIGN KEY ("conteudo_id") REFERENCES "Conteudo"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Conteudo" ADD CONSTRAINT "Conteudo_ibfk_1" FOREIGN KEY ("topico_id") REFERENCES "Topico"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Conteudo" ADD CONSTRAINT "Conteudo_ibfk_2" FOREIGN KEY ("nivel_id") REFERENCES "NivelDificuldade"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Conteudo" ADD CONSTRAINT "Conteudo_ibfk_3" FOREIGN KEY ("criado_por") REFERENCES "Usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Conteudo" ADD CONSTRAINT "Conteudo_ibfk_4" FOREIGN KEY ("questao_id") REFERENCES "Questao"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "MapaMental" ADD CONSTRAINT "MapaMental_ibfk_1" FOREIGN KEY ("user_id") REFERENCES "Usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "MapaMental" ADD CONSTRAINT "MapaMental_ibfk_2" FOREIGN KEY ("topico_id") REFERENCES "Topico"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Questao" ADD CONSTRAINT "Questao_ibfk_1" FOREIGN KEY ("nivel_id") REFERENCES "NivelDificuldade"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Questao" ADD CONSTRAINT "Questao_ibfk_2" FOREIGN KEY ("criado_por") REFERENCES "Usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "QuestaoResolvida" ADD CONSTRAINT "QuestaoResolvida_ibfk_1" FOREIGN KEY ("id_user") REFERENCES "Usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "QuestaoResolvida" ADD CONSTRAINT "QuestaoResolvida_ibfk_2" FOREIGN KEY ("id_questao") REFERENCES "Questao"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "QuestaoResolvida" ADD CONSTRAINT "QuestaoResolvida_ibfk_3" FOREIGN KEY ("nivel_id") REFERENCES "NivelDificuldade"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Resumo" ADD CONSTRAINT "Resumo_ibfk_1" FOREIGN KEY ("user_id") REFERENCES "Usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Resumo" ADD CONSTRAINT "Resumo_ibfk_2" FOREIGN KEY ("topico_id") REFERENCES "Topico"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Topico" ADD CONSTRAINT "Topico_ibfk_1" FOREIGN KEY ("assunto_id") REFERENCES "Assunto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "UserXP" ADD CONSTRAINT "UserXP_ibfk_1" FOREIGN KEY ("user_id") REFERENCES "Usuario"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Usuario" ADD CONSTRAINT "Usuario_ibfk_1" FOREIGN KEY ("user_type_id") REFERENCES "UserType"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "RefreshToken" ADD CONSTRAINT "RefreshToken_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
