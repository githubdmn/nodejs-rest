# technical-assignment-nodejs

OVERALL REQUIREMENTS/RECOMMENDATIONS
●
The codebase should be hosted on a public version control
repository (e.g., GitHub, Bitbucket).
●
You may use technologies of your choice (JavaScript, TypeScript,
Python, etc.), selecting what you believe is most appropriate for
the task.
●
Integrate a simple database (e.g., SQLite, MongoDB, PostgreSQL)
to store data.
●
We appreciate the ease of setup. It would be ideal if we could
simply clone the project and run it on any machine without
encountering dependency issues or the need for additional
installations. ("It works on my machine" scenario.)
●
The UI does not need to be elaborate. Avoid animations and
transformations; focus on creating a clean and functional
interface.

TASK 1: Simple To-Do Web Application
Functionality to group To-Dos by users. A user can have multiple To-Do
lists (e.g., Grocery list, Do it tomorrow, Notes for a meeting).
Users should be able to view their created To-Do lists, each with a
title and items.
Example To-Do lists for a user:
User: Bob
●Grocery list
●Do it tomorrow
●Notes for a meeting
Upon selecting a To-Do list, users should see the items within, along
with their current state (marked as done or not).
When a To-Do item is marked as done, it should move to the end of the
list and be styled with a strikethrough.Example items in a To-Do list:
●Do this tomorrow.
●Go there.
●Check this.
●Buy a book.
●Sell unused stuff.

# NestJS Project

This is a sample NestJS project with Docker Compose for containerization and PostgreSQL as the database.

**Provided**:

- `JS-assignment-24-01.postman_collection.json`
- - `JS-assignment-24-01.environment.json`
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
    NODE_ENV=production
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

- 3.1 For running the app locally create a `.env` file in the project root and configure the PostgreSQL environment variables:

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
  `cp -v env.localhost .env`

  `nvm use` - optional

  `docker-compose -f ./postgresql.yaml up -d`
  `yarn run start:dev`

1.  Build and run the project with Docker Compose:

    bashCopy code

    `(sudo) docker-compose up --build`

    This command will build the Docker images and start the containers.

2.  Open your browser and go to http://localhost:3000 to access the NestJS application.

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


# Role-Based Authentication in NestJS

Our application implements role-based authentication. Here's a high-level overview of how it works:

## Roles and Permissions

We've defined several roles within our application, each with its own set of permissions:

- `admin`: Has all permissions.
- `user`: Has read and write permissions.
- `guest`: Has read permissions.

## Database Entities

We've created a `Role` entity in our database to store the roles for each user. This entity has the following columns:

- `roleId`: A unique identifier for each role.
- `name`: The name of the role.
- `permissions`: The permissions associated with the role.

We've also updated our `User` entity to include a `roleId` column, which references the `Role` entity.

## Roles Guard

We've created a custom `RolesGuard` that checks if the user has the necessary role to perform a certain action. This guard is used with the `@UseGuards()` decorator in our controllers.

## Authentication Strategy

We've updated our authentication strategy to include the user's role in the JWT or session. This allows us to check the user's role in the `RolesGuard`.

## Usage

To restrict a route to certain roles, use the `@UseGuards()` decorator with the `RolesGuard` and provide the required roles. For example:

```typescript
@Get('admin')
@UseGuards(RolesGuard)
@Roles('admin')
async adminRoute() {
  // ...
}