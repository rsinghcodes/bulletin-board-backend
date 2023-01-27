FROM node:alpine

WORKDIR /usr/src/app

COPY package*.json yarn.lock ./
RUN yarn install

COPY . .

RUN yarn run build

CMD ["yarn", "start"]