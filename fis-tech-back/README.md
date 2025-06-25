Inicializar o banco:

```npx prisma migrate dev --name init```

Gerar o prisma client:

```npx prisma generate```

Fazer uma migration (sempre que modificar o schema):

```npx prisma migrate dev```

ou

```npx prisma migrate dev --name <migration_name>```

Gere o cliente após cada migration
