FROM node:16-alpine

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY . .

ARG PORT

RUN npx prisma generate 

CMD ["npm", "start"]