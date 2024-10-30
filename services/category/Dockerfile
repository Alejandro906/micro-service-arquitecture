FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY .env ./
COPY services/category ./services/category
COPY services/shared ./services/shared

RUN npm install

EXPOSE 3002

CMD ["node", "services/category/server.js"]