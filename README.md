# technical-assignment-nodejs

According to the assignment, this is a sample code that demonstrates the rather basic use of a Node.js backend RESTful API. Due to time constraints, many features have not been fully implemented. The decision prioritized code simplicity, clarity, and adherence to the assignment's educational objectives.

- Authentication:
  Usually for this is used third-party service or sometimes implemented as another microservice using different databases.  
  This is only a basic exmaple of using jwt.
- Caching:
  Caching features were omitted in this sample Node.js backend RESTful API code, due to the assignment's focus on fundamental concepts and time constraints.

# NestJS Project

This is a sample NestJS project with Docker Compose for containerization and PostgreSQL as the database.

**Provided**:

- `JS-assignment-24-01.postman_collection.json`
- swagger api documentation `localhost:3000/api#`
- `nvm`
- to run tests -> `yarn run test`

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

## Considered features

User-related functionality:

1. **User Profile Management**:

   - Allow users to view and edit their profiles.
   - Add functionality to upload and update user avatars or profile pictures.

2. **Password Recovery**:

   - Implement a password recovery mechanism, such as sending a reset link to the user's email.

3. **Email Verification**:

   - Include an email verification step during the user registration process.

4. **User Roles and Permissions**:

   - Implement roles (e.g., admin, regular user) and permissions for different user types.

5. **Social Authentication**:

   - Allow users to sign in using third-party authentication providers (Google, Facebook, etc.).

6. **Two-Factor Authentication (2FA)**:

   - Enhance security by implementing two-factor authentication for user accounts.

7. **User Activity Logs**:

   - Log and track user activities, such as login attempts, profile changes, etc.

8. **User Search and Filtering**:

   - Implement search and filtering functionality for users.

9. **User Deactivation/Reactivation**:

   - Allow administrators to deactivate or reactivate user accounts.

10. **User Preferences**:

    - Allow users to set preferences for their accounts, such as theme, language, etc.

Blog-related functionality:

1. **Comments and Replies:**

   - Allow users to leave comments on blog posts.
   - Support threaded replies for more structured discussions.

2. **Tags and Categories:**

   - Implement a tagging system to categorize blog posts.
   - Allow users to filter and search for posts based on tags or categories.

3. **Search Functionality:**

   - Add a search bar for users to easily find specific blog posts.
   - Implement a search algorithm that considers titles, content, and tags.

4. **User Profiles:**

   - Create user profiles to showcase a user's published blog posts.
   - Include a bio, profile picture, and a list of authored posts.

5. **Post Analytics:**
   - Track and display analytics for each blog post (views, likes, shares).
   - Provide insights into popular content and audience engagement.
