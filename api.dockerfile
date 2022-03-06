FROM node:lts-alpine as install

# Environment variables
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PLAYER_ENABLED=false

WORKDIR /area

COPY apps/api apps/api
COPY packages/services packages/services
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY packages/tsconfig packages/tsconfig
COPY packages/config packages/config
#COPY turbo.json turbo.json

RUN npm ci

FROM install as build

WORKDIR /area/apps/api

RUN npm run build


FROM node:lts-alpine as worker

WORKDIR /area

COPY --from=build /area/apps/api/build /area/apps/api/build
COPY --from=build /area/apps/api/node_modules /area/apps/api/node_modules
COPY --from=build /area/node_modules /area/node_modules
COPY --from=build /area/apps/api/generated/openapi-v1.json /area/apps/api/build/apps/api/generated/openapi-v1.json

WORKDIR /area/apps/api/build/apps/api

CMD ["node", "index.js"]
