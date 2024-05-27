## Entities Overview

### BaseEntity
The `BaseEntity` is an abstract class that provides a primary generated column `id` and a method for generating unique IDs using the `nanoid` library. This class is extended by other entities in the application.

### Admin
The `Admin` entity represents an admin in the application. It has fields for `adminId`, `name`, `email`, `createdAt`, `updatedAt`, and relationships with `Credentials` and `Auth` entities.

### Auth
The `Auth` entity represents authentication details for a user or admin. It has fields for `authId`, `refreshToken`, `refreshTokenExpiration`, `last_login`, `method`, and relationships with `User` and `Admin` entities.

### Credentials
The `Credentials` entity represents the credentials for a user or admin. It has fields for `credentialsId`, `passwordHash`, and relationships with `User` and `Admin` entities. The `passwordHash` is hashed before insertion.

### User
The `User` entity represents a user in the application. It has fields for `userId`, `email`, `firstName`, `lastName`, `createdAt`, `updatedAt`, and relationships with `TodoList`, `Credentials`, and `Auth` entities.

### TodoList
The `TodoList` entity represents a todo list in the application. It has fields for `listId`, `title`, and relationships with `User` and `TodoItem` entities.

### TodoItem
The `TodoItem` entity represents a todo item in a todo list. It has fields for `itemId`, `text`, `isDone`, and a relationship with the `TodoList` entity.