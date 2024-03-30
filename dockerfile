
FROM node:alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY *.json yarn.lock /usr/src/app/

COPY . /usr/src/app

RUN yarn --network-timeout 100000 --frozen-lockfile

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]