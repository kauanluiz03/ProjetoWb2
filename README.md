
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