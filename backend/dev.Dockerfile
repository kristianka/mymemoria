FROM node:22.1.0-alpine

WORKDIR /usr/src/app

COPY package* ./

RUN npm install

CMD ["npm", "run", "dev"]