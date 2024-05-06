FROM node:22.1.0-alpine3.18

EXPOSE 3000

WORKDIR /usr/src/app

COPY . .

RUN npm install

RUN npm run build:production
CMD ["npm", "run", "start:built-production"]

# testing env if you want
# RUN npm run build:testing
# CMD ["npm", "run", "start:built-testing"]

# Running
# docker build -t backend .
# docker run --env-file=.env -p 3000:3000 backend

# note: you may need to remove quotes from .env file in mongodb connection string