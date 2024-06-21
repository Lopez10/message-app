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

## Dev Installation

Follow these steps to set up and run the project in dev environment

1. Clone the repository:

```bash
git clone git@github.com:Lopez10/message-app.git
cd message-app
```

2. Set up environment variables:
```
Create a `.env.dev` file in the root of the project with the `.env.dev.example` content
```

3. Start the Docker containers
```bash
make docker-dev-up
```

## Local Installation
Follow these steps to set up and run the project in local environment

1. Go to the repository:

```bash
cd message-app
```

2. Install pnpm:
```
https://pnpm.io/installation
```

3. Install dependencies:
```bash
pnpm install
```

4. Set up environment variables:
```
Create a `.env.local` file in the root of the project with the `.env.local.example` content
```

5. Start the Docker container
```bash
make docker-local-up
```

6. Create Prisma database
```bash
pnpm prisma:db:create:local
```

7. Start the project 
```bash
pnpm start:local
```

## Test
```bash
pnpm run test:watch
```

## API Documentation
The API documentation is available at http://localhost:3000/api-doc once the application is running.

## Stay in touch
- Author - [Juan López Berges](https://juan-lopez.netlify.app/)
