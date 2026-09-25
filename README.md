
## PROJETO P1 WEB-II

verificar se tem: node -v

## Requisitos
* Node.js 22 ou superior

## Sequencia para criar projeto

Criar o arquivo package

npm init

Instalar o Express para gerenciar as requisições, rotas e URLS, entre outras funcionalidade.

npm i express

Instalar os pacotes para suporte ao TypeScript
...
npm i -- save-dev @types/express
npm i -- save-dev @types/node

Instalar o compilador do projeto com Typescript e reiniciar o projeto quando o arquivo é modificado

npm i -- save-dev ts-node

I

Compilar o arquivo TypeScript
...

npx tsc

Executar o arquivo gerado com o Node.js
...
node dist/index.js


Instalar a dependência para rodar processos simultāneo.
...

npm i -- save-dev concurrently
...

Compilar o arquivo Typescript. Executar o arquivo gerado.
...

npm run start:watch

Criar base de dados MySQL

CREATE DATABASE nodeapi CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

Instalar dependencia para conectar o Node.js (TS) com BD.
...

npm install typeorm --save
...
Biblioteca utilizada no TypeScript para adicionar metadados (informações adicionais) a classes.
...

npm install reflect-metadata --save
...

Instalar o drive do banco de dados MySQL
...

npm install mysql2 --save 
...

Manipular variaveis de ambiente 
...

npm i dotenv --save
...

instalar os tipos de variaveis para o typescript 
...

npm i --save-dev  @types/dotenv 
...

Criar a Migração que sera usada para criar a tabela no banco de dados 
...

npx typeorm migration:create src/migration/CreatesituationsTable
...

npx typeorm migration:create src/migration/CreateUsersTable
...

Executar as migrations para criar as tabelas no banco de dados.
...

npx typeorm migration:run -d dist/data-source.js
...


