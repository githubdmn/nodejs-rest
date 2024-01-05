# technical-assignment-nodejs

# NestJS Project

This is a sample NestJS project with Docker Compose for containerization and PostgreSQL as the database.

Provided:

- `JS-assignment-24-01.postman_collection.json`
- swagger api documentation `localhost:3000/api#`
- `nvm`

## Prerequisites

- Docker
- Docker Compose
- [Node.js](https://nodejs.org/) (for development outside containers)

## Getting Started

1.  Clone the repository:

    bashCopy code

    `git clone https://github.com/githubdmn/technical-assignment-nodejs.git`

    `git clone git@github.com:githubdmn/technical-assignment-nodejs.git`

2.  Navigate to the project directory:

    bashCopy code

    `cd technical-assignment-nodejs`

3.  Create a `.env` file in the project root and configure the PostgreSQL environment variables:

    envCopy code

    ```
    NODE_ENV=development
    PORT=3000
    DATABASE=postgres
    DB_HOST=postgres
    POSTGRES_PORT=5432
    POSTGRES_USER=postgres
    POSTGRES_PASSWORD=postgres
    POSTGRES_DB=blog
    ```

    or bashCopy code
    `cp -v env .env`

4.  Build and run the project with Docker Compose:

    bashCopy code

    `(sudo) docker-compose up --build`

    This command will build the Docker images and start the containers.

5.  Open your browser and go to http://localhost:3000 to access the NestJS application.

## Stopping the Containers

To stop the containers, run:

bashCopy code

`docker-compose down`

This will stop and remove the containers, but data in the PostgreSQL volume (`./pgdata`) will persist.

## Development (Outside Containers)

If you want to run the NestJS application without Docker for development purposes, you can use the following commands:

1.  Install dependencies:

    bashCopy code

    `npm install`

    or using `yarn` bashCopy code

    `yarn`

2.  Start the application:

    bashCopy code

    `npm run start:dev`

    or using `yarn` bashCopy code

    `yarn run start:dev`

3.  The application will be accessible at http://localhost:3000.

## Notes

In case `process.env` does not map variables form `.env` file, use the configuration data form  
`src/conf/postgresql.connection.ts`
