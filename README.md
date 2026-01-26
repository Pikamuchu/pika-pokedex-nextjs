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
- SSR hybrid rendering with Next.js 15.
- React 18 with modern hooks and patterns.
- Built-in i18n routing (en/es/ca).
- Google Analytics integration.
- PokeApi integration.

## Developing

### Built with

- [Next.js 15](https://nextjs.org/) - React framework with SSR
- [React 18](https://react.dev/) - UI library with hooks
- [React Bootstrap 2](https://react-bootstrap.github.io/) - Bootstrap 5 components
- [React Autosuggest](https://react-autosuggest.js.org/) - Search autocomplete
- [Bootswatch](https://bootswatch.com/) - Bootstrap themes
- [animejs](https://animejs.com/) - Animation library
- [next-i18next](https://github.com/i18next/next-i18next) - Internationalization
- [PokeAPI](https://pokeapi.co/) - Pokemon data source
- [SWR 2](https://swr.vercel.app/) - Data fetching and caching
- [Hammer.js](https://hammerjs.github.io/) - Touch gestures

### Folder structure

- root: Contains the README.md, the main configuration to execute the project such as package.json or any other configuration files.
- pages: Contains the source code for application main pages and API endpoints definitions (Next.js constraint).
- public: Contains the application static resources.
- src: Contains the application source code.
- **tests**: Contains the application tests.

### Requirements

- Node.js 18.x or higher
- Yarn package manager

### Installing / Getting started

Clone the source code repository

```bash
  git clone git@github.com:pikamachu/pika-pokedex-nextjs.git
```

Install node modules dependencies

```bash
  npm install
```

Start application in development mode

```bash
$ npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The pages auto-updates as you edit the source files.

### Run tests

Run tests with

```bash
$ npm test
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

## Documentation

- **[Migration Guide](./docs/MIGRATION.md)** - Detailed guide for upgrading from Next.js 10 to Next.js 15
- **[Copilot Instructions](./.github/copilot-instructions.md)** - AI coding assistant guidelines for this project
