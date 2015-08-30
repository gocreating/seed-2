# Seed

[![Build Status](https://travis-ci.org/gocreating/seed.svg?branch=master)](https://travis-ci.org/gocreating/seed)

A flexible and scalable suite for building modern websites.

## Features

- Node & Express 4
- React & Alt
- Isomorphic
- Sequalize
- Gulp
- Webpack
- React Router Component
- Hot reload react files
- Cross Platforms
- Support ES6/ES7 syntax

## Prerequisites

- nodejs
- gulp

`Nodejs` and `gulp` must be installed. For the installation of nodejs, refer to nodejs [official site](https://nodejs.org/). For installation of gulp, just use npm installation command:

```
$ npm install -g gulp
```

## Getting started

```
$ npm install
$ gulp init -d  # initialize database or something else for development mode
$ gulp build -d # running the server as development mode
```

### Initialize database

   Create tables from schemas, and insert built-in records like root user, default permissions, etc.

   `-d`, `-t`, and `-p` switches will initialize the `development`, `test`, `production` databases, respectively.

   ```
   $ gulp init [-d | -t | -p]
   ```

### Run as debug/production mode

  - if you want to start developing your website, then use debug mode with livereload function.

    ```
    $ gulp build -d
    ```

  - if you want to put your website into production, then use production mode.

    ```
    $ gulp build -p
    ```

  - Moreover, you can turn on `-u` switch to uglify backend script files.

    ```
    $ gulp build -p -u
    ```

5. Open on browsers

  - Development mode is host on port 5000

    `http://localhost:5000`

  - Production mode is host on port 3000

    `http://localhost:3000`

## Documentation

The documentation is served on gitbook site: [seed](https://www.gitbook.com/book/gocreating/seed)

## Development Gotchas

### DON'T use arrow function syntax when defining model `instanceMethods`

see reference: <https://github.com/babel/babel/issues/733>