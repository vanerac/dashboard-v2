FROM debian:bookworm-20220228-slim as install-chrome

# install chrome
RUN apt-get update && apt-get upgrade -y
RUN apt-get install wget -y
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN dpkg -i google-chrome-stable_current_amd64.deb
RUN rm google-chrome-stable_current_amd64.deb

RUN chmod +x /usr/bin/google-chrome-stable
ENV CHROME_BIN /usr/bin/google-chrome-stable

FROM install-chrome as install-graphical-env

RUN apt-get install xvfb
ENV DISPLAY=:99.0
RUN chmod +x /usr/bin/Xvfb
ENV Xvfb :99 -ac -screen 0 1280x1024x24

FROM install-graphical-env as install-node

RUN apt-get update && apt-get upgrade -y
RUN apt-get install curl -y
RUN curl -sL https://deb.nodesource.com/setup_17.x | bash -
RUN apt-get install nodejs -y
RUN npm install -g npm

FROM install-graphical-env as install

# Environment variables
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

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


FROM build as worker

WORKDIR /app/apps/api

COPY --from=dependencies apps/api/build .
COPY --from=dependencies apps/api/node_modules .

COPY --from=dependencies node_modules ../../node_modules

ENTRYPOINT ["node", "./build/index.js"]
