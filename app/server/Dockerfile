FROM node:16-alpine

WORKDIR /server

COPY package*.json ./

RUN npm install

EXPOSE ${API_PORT}

COPY . .

CMD ["npm", "start"]