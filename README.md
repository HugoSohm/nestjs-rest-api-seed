<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

<p align="center">
    <a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
    <a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
    <a href="https://www.npmjs.com/~nestjscore"><img src="https://img.shields.io/npm/dm/@nestjs/core.svg" alt="NPM Downloads" /></a>
    <a href="https://travis-ci.org/nestjs/nest"><img src="https://api.travis-ci.org/nestjs/nest.svg?branch=master" alt="Travis" /></a>
    <a href="https://travis-ci.org/nestjs/nest"><img src="https://img.shields.io/travis/nestjs/nest/master.svg?label=linux" alt="Linux" /></a>
    <a href="https://coveralls.io/github/nestjs/nest?branch=master"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#5" alt="Coverage" /></a>
    <a href="https://gitter.im/nestjs/nestjs?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=body_badge"><img src="https://badges.gitter.im/nestjs/nestjs.svg" alt="Gitter" /></a>
    <a href="https://opencollective.com/nest#backer"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
    <a href="https://opencollective.com/nest#sponsor"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
</p>

## Description

REST API developed with _**TypeScript**_ using _**NestJS**_ based on _**TypeORM**_ with _**CRUD architecture**_

## Features

- [**Authentication** - Passport & Bcrypt & Bearer JWT](https://docs.nestjs.com/security/authentication)
- [**Authorization guard**](https://docs.nestjs.com/guards)
- [**Configuration**](https://docs.nestjs.com/techniques/configuration)
- [**Mailer**](https://github.com/nest-modules/mailer)
- [**Documentation** - Swagger OpenApi](https://docs.nestjs.com/openapi/introduction)
- [**Seeding** - FakerJS & Typeorm-seeding](https://github.com/marak/Faker.js)
- [**Migrations** - TypeOrm](https://docs.nestjs.com/techniques/database)
- [**Storage** - Multer](https://docs.nestjs.com/techniques/file-upload)
- [**Logger** - Morgan](https://docs.nestjs.com/techniques/logger)
- [**Security** - Helmet](https://docs.nestjs.com/security/helmet)
- [**Linter** - Airbnb typescript eslint](https://airbnb.io/javascript)

## Installation

```bash
$ yarn or yarn install
```

## Running

```bash
# Development
$ yarn start

# Watch mode
$ yarn start:dev

# Debug mode
$ yarn run start:debug

# Production mode
$ yarn run start:prod
```

## Commands

```bash
# Run migrations
$ yarn typeorm migration:run

# Run seeding
$ yarn seed

# Run linter
$ yarn lint
```

## Test

```bash
# Unit tests
$ yarn test

# e2e tests
$ yarn test:e2e

# Test coverage
$ yarn test:cov
```

## Copyright

:zap: Developed by [Hugo Sohm](https://kamilmysliwiec.com)  
[Website](https://hugosohm.fr) -
[Gitlab](https://gitlab.com/HugoSohm) -
[Github](https://github.com/HugoSohm) -
[LinkedIn](https://www.linkedin.com/in/hugo-sohm)
