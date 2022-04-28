This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Install dependencies

```sh
npm i -g pnpm
pnpm i
```

### Environement variables

```
cp .env.example .env
```

And then change variables inside `.env` to match your own environment.
If you ever want to add an environment variable, please add them to and `.env.example`.


### Setup the database

```sh
pnpm run resetDB
pnpm run showDB
```

### Run the development server

```bash
pnpm run dev
```

## Run the tests

### Run a server in test mode

(so that some external services can be mocked)

```sh
pnpm run dev:test
```

### Run tests in CLI

```sh
pnpm run test
```
### Run tests with the Cypress GUI

```sh
pnpm run test:gui
```