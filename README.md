<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">WebPanel API OCCRI</p>

## Description

✔ Backend: API to manage OCCRI System, this is the back-end part of the project OCCRI System.     
✔ Frontend: [Occri](https://github.com/JeanLiima/occri)

## 🛠️ Technologies:

* [NestJS](https://nestjs.com/) - A progressive Node.js framework
* [MySQL](https://www.mysql.com/) - Database
* [Docker](https://www.docker.com/) - Open platform for developing, shipping, and running applications.
* [Yarn](https://yarnpkg.com/) - Javascript Package manager

##  Installation

```bash
# First of all, make sure you've yarn installed (https://yarnpkg.com/), then run:
$ yarn
```

## 🚀Running the app

1 - Copy example.env to .env file and set up the values

```bash
# bring up database (Docker https://www.docker.com/ and Docker-Compose https://docs.docker.com/compose/ are necessary), it will bring the containers with mysql database and phpmyadmin, that can be acessed via browser at http://localhost:8080

# start and bring up the database and manager containers
$ yarn docker:run

# start the api for local development
$ yarn start

# start the api for local development watch mode
$ yarn start:dev

# start the api for production mode
$ yarn start:prod

# seed database (create Admin User)
$ yarn seed:run

# stop the containers
$ yarn docker:stop
```

After that, the api can be acessed through this url: http://localhost:3000

## Test

```bash
# unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# test coverage
$ yarn test:cov
```

## 🔐 Authentication and login

Check our documentation about how to manage the authentication and login of users: [Authentication Flow](./docs/Authorization.md).


## ✒️ Devs

* **Backend** - [Evaldo R Cardoso](https://evaldorc.com.br)
* **Frontend** - [Jean Lima](https://jean.dev.com)
