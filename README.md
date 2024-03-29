# Pikadex

[![Build Status](https://travis-ci.org/pikamuchu/pika-pokedex-nextjs.svg?branch=master)](https://travis-ci.org/pikamuchu/pika-pokedex-nextjs)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/4c9d6e8bd4ca4064b09326eb48ab416a)](https://www.codacy.com/gh/pikamuchu/pika-pokedex-nextjs/dashboard?utm_source=github.com&utm_medium=referral&utm_content=pikamuchu/pika-pokedex-nextjs&utm_campaign=Badge_Grade)
[![codecov](https://codecov.io/gh/pikamuchu/pika-pokedex-nextjs/branch/master/graph/badge.svg)](https://codecov.io/gh/pikamuchu/pika-pokedex-nextjs)

## Introduction

Pikadex is a pokemon Pokedex PWA example using JAM stack technologies and serverless infraestructure.

You can browse the running example in [Pikadex on Vercel](https://pikadex.vercel.app/)

You can preview source code using [codesandbox](https://codesandbox.io/s/github/pikamachu/pika-pokedex-nextjs/tree/master)

### Pokedex features

- Explore pokemons.
- Search pokemons by name.
- See pokemons info in the details page.
- Catch your favorite pokemons with the capture game.

### Technical features

- Progressive Web Application.
- SSR hybrid rendering.
- Serverless.
- Multilanguage.
- Google Analytics integration.
- PokeApi integration.

## Developing

### Built with

- [Next.js](https://nextjs.org/)
- [React Hooks](https://es.reactjs.org/docs/hooks-intro.html)
- [React Bootstrap](https://react-bootstrap.github.io/)
- [React Autosuggest](https://react-autosuggest.js.org/)
- [Bootswatch](https://bootswatch.com/)
- [animejs](https://animejs.com/)
- [i18next](https://www.i18next.com/)
- [PokeAPI](https://pokeapi.co/)
- [SWR](https://swr.vercel.app/)
- [Hammer.js](https://hammerjs.github.io/)

### Folder structure

- root: Contains the README.md, the main configuration to execute the project such as package.json or any other configuration files.
- pages: Contains the source code for application main pages and API endpoints definitions (Next.js constraint).
- public: Contains the application static resources.
- src: Contains the application source code.
- **tests**: Contains the application tests.

### Installing / Getting started

Clone the source code repository

```bash
  git clone git@github.com:pikamachu/pika-pokedex-nextjs.git
```

Install node modules dependencies

```bash
  yarn install
```

Start application in development mode

```bash
$ yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The pages auto-updates as you edit the source files.

### Run tests

Run tests with

```bash
$ yarn test
```

### Pika commands

You can also use these pika bash command

```
Usage: pika [command]

where [command] is one of:
   install -> install application dependencies.
   build -> compile application.
   start -> run application in development mode.
   test -> execute application tests.
   format -> auto format project code using prettier.
   docker build -> create application docker image.
   docker start -> run application docker image.
```
