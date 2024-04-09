# :books: Home Library Service [<img src="https://img.shields.io/badge/DockerHub-latest-blue.svg?logo=LOGO">](https://hub.docker.com/repository/docker/shoxakrshn/home-library-api/general)

## :clipboard: Prerequisites

| Software    | Link                                                                    |
| ----------- | ----------------------------------------------------------------------- |
| Git         | [download and install](https://git-scm.com/downloads)                   |
| Node.js/npm | [download and install](https://nodejs.org/en/download/)                 |
| Docker      | [download and install](https://www.docker.com/products/docker-desktop/) |
| Docker Hub  | [create an account](https://hub.docker.com/)                            |

## :hammer_and_wrench: Installation

:one: Clone this repo:

```bash
git clone git@github.com:shoxakrshn/nodejs2024Q1-service.git
```

:two: Switch branch

```bash
git checkout jwt/logging
```

:three: Install NPM modules:

```bash
npm install
```

:four: Rename `.env.example` file to `.env`:

```bash
cp .env.example .env
```

## :rocket: Running the Application

First time running the multi-container application:

```bash
npm run docker:build or docker-compose up --build
```

Subsequent running the multi-container application:

```bash
npm run docker:up or docker-compose up
```

Application starts on the port indicated in the `.env` file or default (**4000**) port.

Postgres database starts on the indicated in the `.env` file (**5432**) port.

:warning: If you encounter `Already in use` error, please stop processes that are using the indicated ports.

Turn down multi-container application:

```bash
npm run docker:down or docker-compose down
```

## :package: Docker features

To perform a vulnerability scan and receive recommendations from Docker Scout, execute the following command:

```bash
npm run docker-audit:api
```

:link: To view the repository containing the app image on Docker Hub, please visit [this link](https://hub.docker.com/repository/docker/shoxakrshn/home-library-api/general).

## :test_tube: Testing

To run all tests with authorization:

```bash
npm run test:auth
```

To run all tests with refresh authorization:

```bash
npm run test:refresh
```

To run all tests without authorization:

```bash
npm run test
```

### 📌 Logging Level

| Level   | Log Type |
| ------- | -------- |
| :zero:  | LOG      |
| :one:   | ERROR    |
| :two:   | WARN     |
| :three: | DEBUG    |
| :four:  | VERBOSE  |
| :five:  | FATAL    |

### :memo: Documentation

:link: Once the app is running, you can easily access the OpenAPI documentation by typing http://localhost:4000/doc/ into your browser's address bar.

### ✨ Auto-fix and format

To check existing linting and formatting:

```bash
npm run lint
```

```bash
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

:link: For more information, please check [this link](https://code.visualstudio.com/docs/editor/debugging).
