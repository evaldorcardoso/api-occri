<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">WebPanel API OCCRI</p>

## Description

API to manage OCCRI System, this is the back-end part of the project OCCRI System.

## 🛠️ Technologies:

* [NestJS](https://nestjs.com/) - A progressive Node.js framework
* [MySQL](https://www.mysql.com/) - Database
* [Docker](https://www.docker.com/) - Open platform for developing, shipping, and running applications.
* [Yarn](https://yarnpkg.com/) - Javascript Package manager

##  Installation

```bash
# Make sure you've yarn installed (https://yarnpkg.com/)
$ yarn
```

## 🚀Running the app

1 - Copy example.env to .env file and set up the values

```bash
# bring up database (Docker https://www.docker.com/ and Docker-Compose https://docs.docker.com/compose/ are necessary), it will bring the containers with mysql database and phpmyadmin and the api, that can be acessed via browser at http://localhost:8080
$ yarn docker:run

# for local development
$ yarn start

# for local development watch mode
$ yarn start:dev

# production mode
$ yarn start:prod

# seed database (create Admin User)
$ yarn seed:run
```

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## ✒️ Stay in touch

* **Developer** - [Evaldo R Cardoso](https://evaldorc.com.br)