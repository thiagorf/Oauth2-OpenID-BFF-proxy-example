FROM node:16.6.0-alpine

WORKDIR /urs/app

COPY package.json ./

RUN npm install

COPY . .

USER node

EXPOSE 8000

CMD ["npm", "run", "dev"]

