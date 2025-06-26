Inicializar o banco:

```npx prisma migrate dev --name init```

Gerar o prisma client:

```npx prisma generate```

Fazer uma migration (sempre que modificar o schema):

```npx prisma migrate dev```

ou

```npx prisma migrate dev --name <migration_name>```

Gere o cliente após cada migration

## Fluxo

Cliente -> Routes -> Controller -> Service -> Model (Prisma) -> Banco de Dados

Controladores -> Lógica de negócio (Implementação)
Serviços -> Regras de negócio (validação)
Modelo -> Entidades e interação com o banco

Usuário faz login -> Se o login for certo -> Recebe Token -> Front end salva o Token que identifica o usuário -> O front passa o token em todas as requisições para o back -> Back-end verifica sempre se o token é válido antes de realizar as operações, verifica se o usuário tem autorização para a operação

Usuário passa a senha para o registro -> Servidor faz a hash da senha  e armazena o hash (e não a senha)

Usuário passa a senha no login -> Servidor faz a hash da senha e compara com o hash que ele tem