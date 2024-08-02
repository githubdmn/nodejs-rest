import { Entity, Column, ManyToOne, OneToOne, BeforeInsert } from 'typeorm';
import Author from './user-author.entity';
import Base from './base.entity';

@Entity()
export default class Post extends Base {
  @Column({ unique: true })
  postId: string;

  @Column()
  title: string;

  //@OneToOne()
  postContent: string;

  //@OneToOne()
  postComments: string;

  @BeforeInsert()
  generateId() {
    this.postId = super.idGenerator();
  }

  @ManyToOne(() => Author, (author) => author.posts)
  author: Author;
}
