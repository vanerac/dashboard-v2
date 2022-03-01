FROM node:17-alpine as Builder

WORKDIR /area

ADD . .

COPY apps/api /apps/api
COPY packages packages
COPY package.json package.json
COPY package-lock.json package-lock.json

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
RUN npm install -w apps/api

WORKDIR /area/apps/api

RUN npm run build

FROM node:17-alpine as Worker

WORKDIR /app/apps/api

COPY --from=Builder apps/api/build .
COPY --from=Builder package.json ../../package-lock.json
COPY --from=Builder packages ../../packages
COPY --from=Builder node_modules ../../node_modules
COPY --from=Builder apps/api/node_modules .

ENTRYPOINT ["node", "./build/index.js"]
