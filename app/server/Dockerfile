FROM node:16-alpine

WORKDIR /server

COPY package*.json ./

RUN npm install

EXPOSE ${API_PORT}

COPY . .

RUN npx prisma generate 

CMD ["npm", "start"]