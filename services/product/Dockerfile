FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY .env ./
COPY services/product ./services/product
COPY services/shared ./services/shared

RUN npm install

EXPOSE 3001

CMD ["node", "services/product/server.js"]