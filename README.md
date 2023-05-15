# Desafio Shopper

# 🎯Objetivo

Desenvolver uma aplicação Fullstack capaz de realizar a atualização de preços de produtos por meio de um arquivo .csv, contendo o código e o novo preço de cada produto, além de prover toda a infraestrutura necessária para garantir a efetividade dessa funcionalidade.
  
# 🖥️Tecnologias utilizadas
  
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
# Como Utilizar

1. Clone o repositório repositório para sua máquina utilizando o comando: 
  
	`git clone git@github.com:julio-silveira/shopper.git`

2. Após finalizar o download, abra a pasta /app e crie um arquivo **.env** contendo as mesmas váriaveis de ambiente presente no arquivo **.env.example**, ou use os dados do exemplo abaixo:
	<pre><code> DATABASE_URL=mysql://root:root@db:3306/shopper
	PORT=3000
	WEB_PORT=5173
	VITE_API_URL=http://localhost:${PORT}/</code></pre>

3. Abra um terminal na **pasta raiz** do repositório e execute o comando <code>npm run compose:up</code> ou o  <code>comando docker compose up</code> na pasta **/app**.;

4.  Aguarde todos containeres ficarem de pé;

5. Após isso, você poderá acessar o frontend da aplicação através localmente através do localhost na porta escolhida na váriavel de ambiente WEB_PORT, por padrão, podendo ser acessada nesse link: <link>http://localhost:5173 </link>

6. A api pode ser acessada também utilizando o localhost na porta escolhida na váriavel de ambiente PORT, por padrão <link>http://localhost:3000/</link>, já a documentação da api(swagger) pode ser acessada na rota **/api**:    <link>http://localhost:3000/api</link>.

7. Na pasta /data existem dois arquivos .csv, um que pode ser utilizado para atualizar produtos com sucesso (rightprices.csv) e outro que propositalmente gera alguns erros para simplificar a testagem da aplicação (wrongprices.csv)

## Aplicação




