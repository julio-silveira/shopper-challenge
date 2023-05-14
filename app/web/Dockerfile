FROM node:16.14-alpine

WORKDIR /web

COPY package*.json ./

RUN npm install

EXPOSE ${WEB_PORT}

COPY . .

CMD ["npm","run", "dev"]