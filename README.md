# HighM
Frontend for [HighM server project](https://github.com/Romez1990/highm-server).

HighM is web application for college to organize math lessons.

## Getting started
These instructions will get you a copy of the project up and running on your
local machine for development and testing purposes. See deployment for notes on
how to deploy the project on a live system.

### Prerequisites
What things you need to have globally installed:
- Node.js 10 or higher
- Yarn

### Installing
Install project dependencies.
```shell script
yarn install
```

Copy .env.example to .env. Specify the server url and set USE_HTTPS=true if you
use HTTPS protocol.
```shell script
cp .env.example .env
```

Or instead of .env file you can set environment variables.

Run development server.
```shell script
yarn dev
```

## Automated testing
To run all the automated tests
```shell script
yarn test
```

### Linting
Linting code finds and fixes problems in the code
```shell script
yarn lint
```

## Deploying
To build for production
```shell script
yarn build
```

To run production server
```shell script
yarn start
```

## Built With
- [React](https://reactjs.org) - Library for building user interfaces
- [Next.js](https://nextjs.org) - Framework for React server side rendering
- [MobX](https://mobx.js.org) - Library for state management
- [Axios](https://github.com/axios/axios) - Promise based HTTP client for the
  browser and Node.js
- [MaterialUI](https://material-ui.com) - React component library with
  Material Design.
- [Formik](https://jaredpalmer.com/formik) - Library for building forms in React
- [fp-ts](https://gcanti.github.io/fp-ts/) - Functional programming in
  TypeScript
