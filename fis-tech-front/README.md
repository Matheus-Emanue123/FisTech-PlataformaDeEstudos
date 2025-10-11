# FISTECH PLATAFORMA DE ESTUDOS

## INTRODUÇÃO FRONT-END

Para o desenvolvimento do **FISTECH** no front-end, foi escolhido três ferramentas fundamentais e metodos que garantem performance, escalabilidade e uma experiência de usuário consistente:

- **React com TypeScript (19.1.0):** React é uma biblioteca JavaScript para construção de interfaces de usuário declarativas e componentizadas. Ao integrá-lo com TypeScript, ganhamos tipagem estática, autocompletar e detecção de erros em tempo de compilação, o que aumenta a robustez do código e facilita a manutenção em projetos de maior porte. Saiba mais em: <https://reactjs.org/> <https://www.typescriptlang.org/>

- **Axios (1.11.0):** Axios é uma biblioteca leve para fazer requisições HTTP a partir do navegador (ou Node.js), com suporte a Promises e interceptors para tratamento centralizado de erros e autenticação. Escolhemos Axios pela sua simplicidade de uso, configurabilidade e por facilitar a realização de requisições a APIs. Saiba mais em: <https://axios-http.com/ptbr/docs/intro>

- **Material UI (7.1.2):** Material UI é um conjunto de componentes React prontos, baseados no Material Design da Google. Ele oferece temas personalizáveis, componentes acessíveis e uma vasta coleção de elementos (botões, tabelas, formulários, etc.), acelerando o desenvolvimento de uma interface moderna e responsiva. Saiba mais em: <https://mui.com>

Estas ferramentas trabalham em conjunto para tornar o front-end do FISTECH ágil, seguro e agradável tanto para desenvolvedores quanto para usuários finais. Dentre os benefícios de adotá-las no desenvolvimento nós podemos destacar o conhecimento prévio das ferramentas pelos alunos, agilidade e facilidade no desenvolvimento de páginas completas proporcionadas pelas bibliotecas.

## ESTRUTURA DE PASTA

Para otimizar o desenvolvimento e a manutenção do front-end do **FISTECH**, adotamos uma estrutura de pastas clara e modular. Cada diretório possui uma responsabilidade bem definida, facilitando a navegação pelo projeto, a colaboração entre a equipe e a escalabilidade conforme novas funcionalidades são adicionadas:

**node_modules:** Pasta com as dependencias do produto.

**public:** Arquivos públicos de coonfiguração e disponíveis durante o acesso dos usuários: imagens, fontes, etc.

**src:** Pasta que contém os principais arquivos do produto. Esta pasta está organizada com as seguintes pastas:

<pre markdown>
┌──
├── app/ ---> Abriga as estruras inicias para a inicialização do produto.
│ ├── App.tsx --> Componente principal montado na index.html.
│ ├── AppContext.tsx --> Contexto empregado para gerenciar os componentes do sistema.
│ ├── AppController/ --> Conjunto de componentes globais do sistema (diálogos, modais, etc.).
│ ├── AppRouterSwitch.tsx --> Gerencia as rotas da aplicação.
│ └── AppStyles.tsx --> Estilo dos componentes gerais.
│
├── api/ --> Contém os arquivos/classes bases para comunicação com o banco de dados.
│
├── libs/ --> Estruturas auxiliares utilizadas em todo o produto.
│
├── modules/ --> Módulos do sistema com api, schema e páginas de CRUD (Cadastro/Visualização/Edição/Deleção).
│
├── ui/ --> Componentes e páginas da aplicação.
│ ├── sysComponents/ --> Componentes utilizados por toda a aplicação.
│ ├── sysForm/ --> Campos personalizados para formulários.
│ ├── SimpleFormFields/ --> Campos de formulário simples.
│ ├── SimpleLabelView/ --> Label customizado e estilos.
│ ├── SimpleTable/ --> Tabela customizada e estilos.
│ └── InterfaceBaseSimpleFormComponent.ts --> Interface do simpleForm.
│
├── sysMaterialUi/ --> Configuração de tema e customização do Material UI.
│
├── layouts/ --> Layouts usados por menus, rotas e navbar.
│
├── pages/ --> Páginas gerais da aplicação:
│ └── Example/ --> Página de exemplo para desenvolvedores.
│ └── EmailVerify/ --> Página de verificação de email.
│ └── Home/ --> Página home e estilos.
│ └── NotFound/ --> Página de rota não encontrada.
│ └── RecoveryPassword/ --> Página de recuperação de senha e estilos.
│ └── ResetPassword/ --> Página de nova senha e estilos.
│ └── SignIn/ --> Página de login e estilos.
│ └── SignOut/ --> Página de logout e estilos.
│ └── SignUp/ --> Página de cadastro e estilos.
└── 
</pre>

## PRIMEIROS PASSOS

Para executar o front-end do FisTech faça um clone do repositório:

    git clone https://github.com/Matheus-Emanue123/FisTech-PlataformaDeEstudos.git

Em seguida, abre um terminar na pasta `fis-tech-front` e instale as dependências:

    npm install

E depois, execute a aplicação:

    npm start

Acesse o sistema através do seu browser no endereço "http://localhost:3000" com as credenciais do administrador do sistema:

    login: admin@example.com
    password: 123456

**Observação**: os dados do usuário "admin" foram inseridos através do banco de dados de forma manual;
