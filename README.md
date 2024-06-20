# MessageApp

## Descripción

MessageApp is a messaging application that allows users to register, log in, and send messages to each other. The application is built with NestJS and uses JWT for authentication. The database is managed by MongoDB and Prisma.

## Features
- User registration
- JWT-based login
- Sending and receiving messages
- Viewing messages by user
- Route protection with JWT
- API documentation with Swagger

## Installation

Follow these steps to set up and run the project locally.

1. Clone the repository:

```bash
git clone git@github.com:Lopez10/message-app.git
cd message-app
```

2. Install dependencies:
```bash
$ pnpm install
```

3. Set up environment variables:

Create a `.env.dev` file in the root of the project with the `.env.example` content

4. Start the Docker containers
```bash
make docker-local-up
```


<!-- ## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
``` -->

## Test

```bash
# unit tests
$ pnpm run test
```

## API Documentation
The API documentation is available at http://localhost:3000/api-doc once the application is running.

## Stay in touch
- Author - [Juan López Berges](https://juan-lopez.netlify.app/)
