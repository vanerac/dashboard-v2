FROM node:lts-alpine as install

# Environment variables
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PLAYER_ENABLED=false

WORKDIR /area

COPY apps/front apps/front
COPY packages packages
COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm ci

FROM install as build

WORKDIR /area/apps/front

RUN npm run build


FROM node:lts-alpine as worker

WORKDIR /area

COPY --from=build /area/apps/front /area/apps/front
COPY --from=build /area/apps/front/node_modules /area/apps/front/node_modules
COPY --from=build /area/node_modules /area/node_modules
COPY --from=build /area/package.json /area/package.json
COPY --from=build /area/package-lock.json /area/package-lock.json
COPY --from=build /area/packages /area/packages

WORKDIR /area/apps/front

CMD ["npm", "start"]
