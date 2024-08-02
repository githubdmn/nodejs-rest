import { BeforeInsert, Column, Entity, OneToMany, OneToOne } from 'typeorm';
import Auth from './auth.entity';
import Credentials from './credentials.entity';
import User from './user.entity';
import Post from './post.entity';

@Entity()
export default class Author extends User {
  @Column({ unique: true })
  authorId: string;

  @OneToMany(() => Post, (posts) => posts.author)
  posts: Post[];

  @OneToOne(() => Credentials, (credentials) => credentials.author)
  credentials: Credentials;

  @OneToOne(() => Auth, (auth) => auth.author)
  auth: Auth;

  @BeforeInsert()
  async generateId() {
    if (!Boolean(this.authorId)) {
      this.authorId = super.idGenerator('a-');
    }
  }
}
