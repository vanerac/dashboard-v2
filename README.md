[![Linter](https://github.com/vanerac/dashboard-v2/actions/workflows/ci-lint.yml/badge.svg)](https://github.com/vanerac/dashboard-v2/actions/workflows/ci-lint.yml)
[![Builder](https://github.com/vanerac/dashboard-v2/actions/workflows/ci-build.yml/badge.svg)](https://github.com/vanerac/dashboard-v2/actions/workflows/ci-build.yml)
[![Repository Sync](https://github.com/vanerac/dashboard-v2/actions/workflows/link.yml/badge.svg)](https://github.com/vanerac/dashboard-v2/actions/workflows/link.yml)

# About

# Installation
Run the following command to install the dashboard:
```shell
# Note: This should be run from the root of the repository
$ npm install                           # Installs all packages
```

# Configuration

### Environment Variables
```dotenv

```

# Development

```shell
# Note: The API is necessary for the dashboard to work
$ npm run dev --prefix=apps/api         # Start API

# Note: This should be run from the root of the repository
$ npm run dev --prefix=apps/front       # Start Front-end
$ npm run ios --prefix=apps/app         # Start App with IOS emulator
$ npm run android --prefix=apps/app     # Start App with Android emulator
```

[//]: # (# Testing)


# Production

### Docker
```shell
# Note: docker-compose requires a .env.production file

$ docker-compose up                     # run docker
$ docker-compose down                   # stop docker
```

### Kubernetes

# Further Reading
