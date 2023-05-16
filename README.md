# 🛒 Desafio Shopper

# 🎯Objetivo:

Desenvolver uma aplicação Fullstack capaz de realizar a atualização de preços de produtos por meio de um arquivo .csv, contendo o código e o novo preço de cada produto, além de prover toda a infraestrutura necessária para garantir a efetividade dessa funcionalidade.
   
  
# 🖥️Tecnologias utilizadas:
  
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white)
![Swagger](https://img.shields.io/badge/-Swagger-%23Clojure?style=for-the-badge&logo=swagger&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)


## 📋 Pré-requisitos:

- Docker versão 23.0.5
- Docker compose versão v2.5.0

# 🛠️ Como Utilizar:

1. Clone o repositório para sua máquina utilizando o comando:
  
	`git clone git@github.com:julio-silveira/shopper-challenge.git`

2. Após finalizar o download, abra a pasta **/app** e crie um arquivo **.env** contendo as mesmas variáveis de ambiente presentes no arquivo **.env.example**, ou use os dados do exemplo abaixo:
	<pre><code> DATABASE_URL=mysql://root:root@db:3306/shopper
	PORT=3000
	WEB_PORT=5173
	VITE_API_URL=http://localhost:${PORT}/</code></pre>

3. Abra um terminal na **pasta raiz do repositório** e execute o comando <code>npm run compose:up</code> ou o comando <code>docker-compose up</code> na pasta /app;

4. Aguarde todos os contêineres ficarem de pé;

5. Após isso, você poderá acessar o frontend da aplicação localmente através do localhost na porta escolhida na variável de ambiente WEB_PORT. Por padrão, a página pode ser acessada nesse link: <link>http://localhost:5173</link>

6.A API pode ser acessada também utilizando o localhost na porta escolhida na variável de ambiente PORT, por padrão <link>http://localhost:3000/<link> Já a documentação da API (Swagger) pode ser acessada na rota **/api <link>http://localhost:3000/api</link>.

7. Existem dois arquivos .csv na pasta /data: rightprices.csv, que pode ser utilizado para atualizar produtos com sucesso, e wrongprices.csv, que propositalmente gera alguns erros para facilitar a testagem da aplicação.

## 📷 Preview:

#### Upload form 1 - início
![alt text](./preview/tela2.png)

#### Upload form 2 - validado com sucesso
![alt text](./preview/tela3.png)

#### Feedback de sucesso ao atualizar produto (snackbar)
![alt text](./preview/tela4.png)

#### Upload form 3 - erros
![alt text](./preview/tela5.png)

#### Mobile
![alt text](./preview/tela6.png)

#### Documentação 1 (Swagger) 
![alt text](./preview/swagger.png)

#### Documentação 2 (Swagger) 
![alt text](./preview/swagger2.png)

#### Cobertura de testes - backend
![alt text](./preview/testcov.png)


## 💻 Aplicação:

O objetivo da aplicação é permitir que o usuário carregue um arquivo de precificação contendo o código e o novo preço de cada produto.

Ao clicar no botão "VALIDAR", o sistema lê todo o arquivo e verifica se todos os campos necessários estão preenchidos, se os códigos de produtos informados existem, se os preços estão preenchidos corretamente e se o arquivo respeita as regras definidas no cenário.

Ao final da validação, o sistema exibe as seguintes informações dos produtos que foram enviados: Código, Nome, Preço Atual e Novo Preço. Caso uma ou mais regras de validação tenham sido quebradas, o sistema exibe ao lado de cada produto qual regra foi quebrada.

Se todos os produtos do arquivo foram validados e nenhuma regra foi quebrada, o botão "ATUALIZAR" é habilitado. Ao clicar em "ATUALIZAR", o sistema salva o novo preço no banco de dados e deixa a tela pronta para o envio de um novo arquivo.

A aplicação possui backend dcoumentado com swagger e 100% de cobertura de testes, feitos com Jests, já o frontend está funcional e responsivo.


