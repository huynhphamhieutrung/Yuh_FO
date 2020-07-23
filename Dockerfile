FROM node:13.5.0-alpine3.10

WORKDIR /usr/src/app

RUN apk update && apk upgrade
RUN apk add git

COPY . .

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]

