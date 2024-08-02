import AuthorEntity from './user-author.entity';
import AuthEntity from './auth.entity';
import AdminEntity from './user-admin.entity';
import CredentialsEntity from './credentials.entity';
import ReaderEntity from './user-reader.entity';
import PostEntity from './post.entity';
import PostContentEntity from './post-content.entity';
import PostCommentsEntity from './post-comments.entity';

export {
  AuthorEntity,
  ReaderEntity,
  AuthEntity,
  AdminEntity,
  CredentialsEntity,
  PostEntity,
  PostCommentsEntity,
  PostContentEntity,
};

export const Entities = [
  AuthorEntity,
  ReaderEntity,
  AuthEntity,
  AdminEntity,
  CredentialsEntity,
  PostEntity,
  PostCommentsEntity,
  PostContentEntity,
];
