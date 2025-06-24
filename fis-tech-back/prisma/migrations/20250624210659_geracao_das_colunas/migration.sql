-- CreateTable
CREATE TABLE `Anotacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `texto` TEXT NOT NULL,
    `user_id` INTEGER NULL,
    `topico_id` INTEGER NULL,
    `data_criacao` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    INDEX `topico_id`(`topico_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Assunto` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` TEXT NULL,
    `nome` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Comentario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `texto` TEXT NOT NULL,
    `data_criacao` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `removido` BOOLEAN NULL DEFAULT false,
    `user_id` INTEGER NULL,
    `conteudo_id` INTEGER NULL,

    INDEX `conteudo_id`(`conteudo_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Conteudo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(255) NOT NULL,
    `descricao` TEXT NULL,
    `url_video` VARCHAR(255) NULL,
    `tipo` VARCHAR(50) NULL,
    `data_criacao` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `topico_id` INTEGER NULL,
    `nivel_id` INTEGER NULL,
    `criado_por` INTEGER NULL,
    `questao_id` INTEGER NULL,

    INDEX `criado_por`(`criado_por`),
    INDEX `nivel_id`(`nivel_id`),
    INDEX `questao_id`(`questao_id`),
    INDEX `topico_id`(`topico_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MapaMental` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `arquivo_url` VARCHAR(255) NULL,
    `data_criacao` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `user_id` INTEGER NULL,
    `topico_id` INTEGER NULL,

    INDEX `topico_id`(`topico_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `NivelDificuldade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `xp` INTEGER NOT NULL,
    `nome` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Questao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `enunciado` TEXT NOT NULL,
    `ano` INTEGER NULL,
    `origem` VARCHAR(100) NULL,
    `fase` VARCHAR(50) NULL,
    `alternativas` JSON NULL,
    `data_criacao` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `resolvido` BOOLEAN NULL,
    `nivel_id` INTEGER NULL,
    `criado_por` INTEGER NULL,

    INDEX `criado_por`(`criado_por`),
    INDEX `nivel_id`(`nivel_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `QuestaoResolvida` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `data_resolucao` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `acerto` BOOLEAN NULL,
    `id_user` INTEGER NULL,
    `id_questao` INTEGER NULL,
    `nivel_id` INTEGER NULL,

    INDEX `id_questao`(`id_questao`),
    INDEX `id_user`(`id_user`),
    INDEX `nivel_id`(`nivel_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Resumo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `texto` TEXT NOT NULL,
    `data_criacao` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `user_id` INTEGER NULL,
    `topico_id` INTEGER NULL,

    INDEX `topico_id`(`topico_id`),
    INDEX `user_id`(`user_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Topico` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `descricao` TEXT NULL,
    `assunto_id` INTEGER NULL,

    INDEX `assunto_id`(`assunto_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserType` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` VARCHAR(191) NOT NULL,
    `permissoes` JSON NOT NULL,

    UNIQUE INDEX `UserType_tipo_key`(`tipo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserXP` (
    `user_id` INTEGER NOT NULL,
    `xp_total` INTEGER NOT NULL,
    `atualizado_em` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usuario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(100) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `senha_hash` VARCHAR(255) NOT NULL,
    `data_criacao` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `ultimo_login` DATETIME(0) NULL,
    `user_type_id` INTEGER NULL,

    INDEX `user_type_id`(`user_type_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Anotacao` ADD CONSTRAINT `Anotacao_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Usuario`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Anotacao` ADD CONSTRAINT `Anotacao_ibfk_2` FOREIGN KEY (`topico_id`) REFERENCES `Topico`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Comentario` ADD CONSTRAINT `Comentario_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Usuario`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Comentario` ADD CONSTRAINT `Comentario_ibfk_2` FOREIGN KEY (`conteudo_id`) REFERENCES `Conteudo`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Conteudo` ADD CONSTRAINT `Conteudo_ibfk_1` FOREIGN KEY (`topico_id`) REFERENCES `Topico`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Conteudo` ADD CONSTRAINT `Conteudo_ibfk_2` FOREIGN KEY (`nivel_id`) REFERENCES `NivelDificuldade`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Conteudo` ADD CONSTRAINT `Conteudo_ibfk_3` FOREIGN KEY (`criado_por`) REFERENCES `Usuario`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Conteudo` ADD CONSTRAINT `Conteudo_ibfk_4` FOREIGN KEY (`questao_id`) REFERENCES `Questao`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `MapaMental` ADD CONSTRAINT `MapaMental_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Usuario`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `MapaMental` ADD CONSTRAINT `MapaMental_ibfk_2` FOREIGN KEY (`topico_id`) REFERENCES `Topico`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Questao` ADD CONSTRAINT `Questao_ibfk_1` FOREIGN KEY (`nivel_id`) REFERENCES `NivelDificuldade`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Questao` ADD CONSTRAINT `Questao_ibfk_2` FOREIGN KEY (`criado_por`) REFERENCES `Usuario`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `QuestaoResolvida` ADD CONSTRAINT `QuestaoResolvida_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `Usuario`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `QuestaoResolvida` ADD CONSTRAINT `QuestaoResolvida_ibfk_2` FOREIGN KEY (`id_questao`) REFERENCES `Questao`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `QuestaoResolvida` ADD CONSTRAINT `QuestaoResolvida_ibfk_3` FOREIGN KEY (`nivel_id`) REFERENCES `NivelDificuldade`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Resumo` ADD CONSTRAINT `Resumo_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Usuario`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Resumo` ADD CONSTRAINT `Resumo_ibfk_2` FOREIGN KEY (`topico_id`) REFERENCES `Topico`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Topico` ADD CONSTRAINT `Topico_ibfk_1` FOREIGN KEY (`assunto_id`) REFERENCES `Assunto`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `UserXP` ADD CONSTRAINT `UserXP_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `Usuario`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `Usuario` ADD CONSTRAINT `Usuario_ibfk_1` FOREIGN KEY (`user_type_id`) REFERENCES `UserType`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
