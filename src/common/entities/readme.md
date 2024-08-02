# Entity Relationships

## User Hierarchy
- `User` is an abstract base class.
- `Reader`, `Author`, and `Admin` extend `User`, inheriting common properties like email and name.
- Each specialized user type (`Reader`, `Author`, `Admin`) has a unique identifier (readerId, authorId, adminId).

## Authentication and Credentials
- `Auth` entity has one-to-one relationships with `Reader`, `Author`, and `Admin`.
- `Credentials` entity also has one-to-one relationships with `Reader`, `Author`, and `Admin`.
- This allows for separate storage of authentication tokens and password hashes.

## Post Structure
- `Post` entity is the central element for content.
- It has a one-to-one relationship with `PostContent`, separating the main post data from its full content.
- It also has a one-to-one relationship with `PostComments`, allowing for easy management of comments.

## Author-Post Relationship
- `Author` entity has a one-to-many relationship with `Post`.
- This is represented by the 'posts' property in the `Author` entity and the 'author' property in the `Post` entity.

## Inheritance and Polymorphism
- The use of a base `User` class and specialized user types (`Reader`, `Author`, `Admin`) allows for polymorphic relationships.
- This design enables role-based access control and specialized functionality for each user type.

## Separation of Concerns
- The separation of `Post`, `PostContent`, and `PostComments` allows for efficient data management and querying.
- It enables features like loading post summaries without full content or managing comments independently.

This structure provides a flexible and scalable foundation for a content management system with different user roles and associated functionalities.