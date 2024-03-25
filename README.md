# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Switch branch

```
git checkout docker/database
```

## Create .env file by using .env.example

## Docker-compose

```
docker compose up --build

or by using npm
npm run docker:build
```

## Docker check for vulnerabilities

```
npm run docker-scan:api
npm run docker-scan:db
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

## Running application in dev mode

```
npm start:dev
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

### Docker Hub image repository

##### NodeJS API:

[home-library-api](https://hub.docker.com/repository/docker/shoxakrshn/home-library-api/general)

##### PostgreSQL DB:

[home-library-db](https://hub.docker.com/repository/docker/shoxakrshn/home-library-db/general)

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
