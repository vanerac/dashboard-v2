FROM node:17-alpine as Builder

WORKDIR /area

ADD . .

COPY apps/front /apps/front
COPY packages packages
COPY package.json package.json
COPY package-lock.json package-lock.json

#RUN ls -Rl && exit 1

RUN npm install -w apps/front

WORKDIR /area/apps/front

RUN npm run build
