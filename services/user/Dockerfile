FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY .env ./
COPY services/user ./services/user
COPY services/shared ./services/shared

RUN npm install

EXPOSE 3003

CMD ["node", "services/user/server.js"]