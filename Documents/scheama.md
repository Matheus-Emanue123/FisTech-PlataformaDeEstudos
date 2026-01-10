# Esquema de Endpoints Backend

Este seguinte arquivo documenta os endpoints do backend, expondo suas rotas, suas variáveis e o formato de seu jsons.

## Rotas de Autenticação

As rotas de autenticação incluem as seguintes rotas:

```Markdown
Post: https://localhost:8080/auth/login
Post: https://localhost:8080/auth/register
Post: https://localhost:8080/auth/refresh
Post: https://localhost:8080/auth/logout

```

### Login de usuários

O login de usuários é feito pela seguinte rota: https://localhost:8080/auth/login.

Ela retorna as informações do usuário e seus tokens que o permitiram fazer diferentes ações dentro do sistema, conforme permissão.

As permissões são definidas por id, sendo elas:
| Tipo de Usuário | Id Referente |
| :--- | :--- |
|administrador| 1 |
|moderador | 2 |
|usuario_padrão | 3

- Administrador:

  - Manejo de usuários : Sim
  - Manejo de Conteúdos: Sim
  - Manejo de Comentários: Sim
  - Ver estatísticas da plataforma: Sim

- Moderador:

  - Manejo de usuários : Não
  - Manejo de Conteúdos: Não
  - Manejo de Comentários: Sim
  - Ver estatísticas da plataforma: Não

- Usuário-Padrão:
  - Manejo de usuários : Não
  - Manejo de Conteúdos: Não
  - Manejo de Comentários: Apenas os seus
  - Ver estatísticas da plataforma: Não

A rota de login ela

- Consome: `JSON`
- Produz: `JSON`

O Json recebe os seguintes atributos:

```Markdown
{
    "nome" : "asdas",
    "password" : "aadsda"
}
```

O json de retorno contém:

```Markdown
{
    "success": true,
    "message": "Login successful",
    "timestamp": "2025-09-28T20:10:58.606Z",
    "data": {
        "user": {
            "id": 4,
            "nome": "Getulio",
            "email": "getulio@gmail.com",
            "userType": "administrador"
        },
        "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImVtYWlsIjoiZ2V0dWxpb0BnbWFpbC5jb20iLCJ1c2VyVHlwZSI6ImFkbWluaXN0cmFkb3IiLCJpYXQiOjE3NTkwOTAyNTgsImV4cCI6MTc1OTA5MTE1OH0.wXrJcxmXMONp_ywVmEKNgzB7qGVvWHs2YvE-OWlcUc0",
        "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImVtYWlsIjoiZ2V0dWxpb0BnbWFpbC5jb20iLCJ1c2VyVHlwZSI6ImFkbWluaXN0cmFkb3IiLCJqdGkiOiI4OTQ4NTgyMC01MjUzLTQ5MDQtOGI4Mi0xMDUxM2ZjODYzZjciLCJpYXQiOjE3NTkwOTAyNTgsImV4cCI6MTc1OTY5NTA1OH0._67hR-NA2lNgcJU24rmtTlgHH4vUMNPbVwCDEUHvEGc"
    }
}
```

### Registro de usuários

O registro de usuários é feito pela rota: https://localhost:8080/auth/register.

- Consome: `Json`
- Produz: `Json`

Formato do Json de requisição:

``` Markdown
{
    "nome": "Novo Usuário",
    "email": "novo.usuario@example.com",
    "password": "minhasenha123"
}
```

Exemplo de resposta: 

``` Markdown
{
    "success": true,
    "message": "Login successful",
    "timestamp": "...",
    "data": {
        "user": {
            "id": 4,
            "nome": "Getulio",
            "email": "getulio@gmail.com",
            "userType": "administrador"
        },
        "accessToken": "...",
        "refreshToken": "..."
    }
}
```

### Refresh Token

Para fazer o refresh da seção, será necessário acessar a rota: https://localhost:8080/auth/refresh.

- Consome: `Json`
- Produz: `Json`

O json recebe o refresh token da seção atual:

```Markdown
{
    "refreshToken": "sljkflkfjslfjlkd"
}
```

### Logout de Usuários

Para o logout de usuários, será preciso acessar a rota: https://localhost:8080/auth/logout.

- Consome: `Json`
- Produz: `Json`

O json refresh token da seção atual:

```Markdown
{
    "refreshToken": "sljkflkfjslfjlkd"
}
```

## CRUD Usuários

As rotas para o crud de usuários são:

```markdown
Post: https://localhost:8080/users/
Get: https://localhost:8080/
Get: https://localhost:8080/id
Put: https://localhost:8080/id
Delete: https://localhost:8080/id
```

### Criação de Usuários

A criação de usuários é feita pela rota https://localhost:8080/users/.

Para criação de usuários é necessário `Autenticação via TOKEN`. Assim, para isso, o token tem de ser passado como header na forma:

Bearer + token

- Consome: `JSON`
- Produz: `JSON`

O json recebe os seguintes atributos:

```markdown
    nome: String
    email: String
    senha: String
    tipo de usuário: Int
```

```markdown
{
"nome" : "asdadsad",
"email" : "example@dadadad.com",
"senha_hash" : "afdaasd",
"user_type_id" : 1212
}
```

### Update de Usuários

A modificação de usuários é feita pela rota https://localhost:8080/users/{id}. O atributo id é passado como `Path Variable`.

Para update de usuários é necessário `Autenticação via TOKEN`. Assim, para isso, o token tem de ser passado como header na forma:

Bearer + token

- Consome: `JSON`
- Produz: `JSON`

O json recebe os seguintes atributos:

```markdown
    nome: String
    email: String
    senha: String
    tipo de usuário: Int (Opcional)
```

```markdown
{
"nome" : "asdadsad",
"email" : "example@dadadad.com",
"senha_hash" : "afdaasd",
"user_type_id" : 1212 (Opcional)
}
```

### GET de Usuários

O get de usuários é feita pela rota https://localhost:8080/users/.

Para Get de usuários é necessário `Autenticação via TOKEN`. Assim, para isso, o token tem de ser passado como header na forma:

Bearer + token

- Produz: `JSON`

Esta rota aceita `Query Parameters` (parâmetros na URL) para paginação, filtro e ordenação.

| Parâmetro | Tipo | Descrição | Default |
| :--- | :--- | :--- | :--- |
| `page` | `Int` | O número da página que se deseja buscar. | `1` |
| `size` | `Int` | O número de itens por página. | `10` |
| `sortBy` | `String` | O campo pelo qual os resultados serão ordenados. <br>Valores permitidos: `nome`, `createdAt`. | `createdAt` |
| `direction` | `String` | A direção da ordenação. <br>Valores permitidos: `asc` (Ascendente), `desc` (Descendente). | `asc` |
| `nome` | `String` | (Opcional) Filtra usuários cujo nome contenha o texto. | *N/A* |
| `userType` | `Int` | (Opcional) Filtra usuários por ID do tipo (ex: `3` para `usuario_padrao`). | *N/A* |

Exemplo de rota com paginação: 

https://localhost:8080/users?page=2&size=5&sortBy=nome&direction=desc

O uso dos parâmetros é opcional.

O Json de resposta agora inclui os metadados da paginação (`page`, `totalPages`, `size`, `total`) e move a lista de usuários para dentro de um array users:

```markdown
{
    "success": true,
    "message": "Users retrieved successfully",
    "timestamp": "2025-09-28T19:47:13.769Z",
    "data": {
        "users": [
            {
                "id": 1,
                "nome": "Test Admin",
                "email": "admin-test@example.com",
                "senha_hash": "$2b$12$...",
                "data_criacao": "2025-09-28T17:55:10.944Z",
                "ultimo_login": null,
                "user_type_id": 1,
                "UserType": {
                    "id": 1,
                    "tipo": "administrador",
                    "permissoes": {
                        "canManageUsers": true,
                        "canManageContent": true,
                        "canViewAnalytics": true,
                        "canManageComments": true
                    }
                }
            },
            {
                "id": 2,
                "nome": "Test Moderator",
                "email": "user1@example.com",
                "senha_hash": "$2b$12$...",
                "data_criacao": "2025-09-28T17:55:10.944Z",
                "ultimo_login": null,
                "user_type_id": 2,
                "UserType": {
                    "id": 2,
                    "tipo": "moderador",
                    "permissoes": {
                        "canManageUsers": false,
                        "canManageContent": false,
                        "canViewAnalytics": false,
                        "canManageComments": true
                    }
                }
            }
        ],
        "page": 1,
        "totalPages": 2,
        "size": 10,
        "total": 16
    }
}
```

### GET de Usuário por Id

O get de usuário por id é feita pela rota https://localhost:8080/users/. O atributo id é passado como `Path Variable`.

Para Get de usuário é necessário `Autenticação via TOKEN`. Assim, para isso, o token tem de ser passado como header na forma:

Bearer + token

- Produz: `JSON`

O Json de resposta é na forma:

```markdown
{
"success": true,
"message": "User retrieved successfully",
"timestamp": "2025-09-28T19:49:17.550Z",
"data": {
"id": 3,
"nome": "Joaquim",
"email": "joaquim@gmail.com",
"senha_hash": "$2b$12$JwInWRbRqgJb/ZEocp4sP.ztmrPBxu/K8KsG9BAMX7x8mxnu9hVvq",
"data_criacao": "2025-09-28T18:12:41.318Z",
"ultimo_login": null,
"user_type_id": 2,
"UserType": {
"id": 2,
"tipo": "moderador",
"permissoes": {
"canManageUsers": false,
"canManageContent": false,
"canViewAnalytics": false,
"canManageComments": true
}
}
}
}
```

### Delete de Usuários

A deleção de usuários é feita pela rota https://localhost:8080/users/{id}.
O atributo id é passado como `Path Variable`.

Para deleção de usuários é necessário `Autenticação via TOKEN`. Assim, para isso, o token tem de ser passado como header na forma:

Bearer + Token

- Produz: `JSON`

O Json de resposta é na forma:

```Markdown
{
   "success": true,
   "message": "User deleted successfully",
   "timestamp": "2025-09-28T19:50:17.671Z",
   "data": {
       "id": 2,
       "nome": "Test User",
       "email": "testuser1759082110467@example.com",
       "senha_hash": "$2b$12$SxGpjmysOdiSA0.zJTSi..1jWaZ3OIhqgZpgU6Va0WAx89flFWys6",
       "data_criacao": "2025-09-28T17:55:10.944Z",
       "ultimo_login": null,
       "user_type_id": 3
   }
}
```
