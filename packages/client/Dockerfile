FROM node:16.6.0-alpine

WORKDIR /client

COPY package.json ./
COPY tsconfig.node.json ./
COPY vite.config.ts ./

RUN yarn install

COPY . .

EXPOSE 3000

CMD ["yarn", "dev"]