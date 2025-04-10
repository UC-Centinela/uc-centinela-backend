FROM node:lts-alpine

WORKDIR /usr/src/app

COPY tsconfig.json package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]
