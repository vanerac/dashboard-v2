FROM node:17-alpine as builder

# Environment variables
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

WORKDIR /area

COPY apps/api /apps/api
COPY packages packages
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY turbo.json turbo.json

RUN npm ci

WORKDIR /area/apps/api

RUN npm run build

FROM node:17-alpine as worker

WORKDIR /app/apps/api

COPY --from=builder apps/api/build .
COPY --from=builder apps/api/node_modules .

COPY --from=builder node_modules ../../node_modules

ENTRYPOINT ["node", "./build/index.js"]
