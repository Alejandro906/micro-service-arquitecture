FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY .env ./
COPY gateway ./gateway

RUN npm install

EXPOSE 3000

CMD ["node", "gateway/server.js"]