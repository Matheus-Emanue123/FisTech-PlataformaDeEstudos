# FisTech - Plataforma de Estudos

## Setup

1.  **Instale as dependências do backend:**
    Navegue até o diretório `fis-tech-back` e execute:
    ```bash
    cd fis-tech-back
    npm install
    ```

2.  **Configure as variáveis de ambiente do backend:**
    Crie um arquivo `.env` na raiz do diretório `fis-tech-back` com a seguinte variável:
    ```
    DATABASE_URL="postgresql://user:password@localhost:5432/fistech?schema=public"
    ```
    Substitua `user`, `password`, `localhost:5432` e `fistech` pelos dados do seu banco de dados PostgreSQL.

3.  **Instale as dependências do test client:**
    Navegue até o diretório `fis-tech-back/test-client` e execute:
    ```bash
    cd fis-tech-back/test-client
    npm install
    ```

## Banco de Dados

*   **Inicializar o banco (so pela primeira vez):**
    ```bash
    cd fis-tech-back
    npx prisma migrate dev --name init
    ```

*   **Popule o banco de dados com dados iniciais (seed):**
    ```bash
    cd fis-tech-back
    npm run db:seed
    ```

*   **Tem q fazer uma migration (sempre que modificar o schema):**
    ```bash
    cd fis-tech-back
    npx prisma migrate dev --name <migration_name>
    ```
*   **Gere o cliente após cada migration**:
    ```bash
    cd fis-tech-back
    npx prisma generate
    ```

## Rodar o Backend

Para iniciar o servidor de desenvolvimento do backend:
```bash
cd fis-tech-back
npm run dev
```

## Rodar o Test Client

Para executar o cliente de testes:
```bash
cd fis-tech-back/test-client
npm start
```

## Fluxo

Cliente -> Routes -> Controller -> Service -> Model (Prisma) -> Banco de Dados

Controladores -> Lógica de negócio (Implementação)
Serviços -> Regras de negócio (validação)
Modelo -> Entidades e interação com o banco

Usuário faz login -> Se o login for certo -> Recebe Token -> Front end salva o Token que identifica o usuário -> O front passa o token em todas as requisições para o back -> Back-end verifica sempre se o token é válido antes de realizar as operações, verifica se o usuário tem autorização para a operação

Usuário passa a senha para o registro -> Servidor faz a hash da senha  e armazena o hash (e não a senha)

Usuário passa a senha no login -> Servidor faz a hash da senha e compara com o hash que ele tem

