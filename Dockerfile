FROM node:20.11-alpine

WORKDIR /usr/src/app

COPY package*.json .

RUN npm install

COPY . .

CMD npx prisma migrate dev && npm run start:dev