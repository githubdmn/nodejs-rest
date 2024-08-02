import { Entity, Column, ManyToOne, OneToOne, BeforeInsert, JoinColumn } from 'typeorm';
import Author from './user-author.entity';
import Base from './base.entity';
import PostContent from './post-content.entity';

@Entity()
export default class Post extends Base {
  @Column({ unique: true })
  postId: string;

  @Column()
  title: string;

  @OneToOne(() => PostContent, (content) => content.post)
  @JoinColumn({ name: 'postId', referencedColumnName: 'postId' })
  content: PostContent;

  @ManyToOne(() => Author, (author) => author.posts)
  @JoinColumn({ name: 'authorId', referencedColumnName: 'authorId' })
  author: Author;

  @BeforeInsert()
  generateId() {
    this.postId = super.idGenerator();
  }
}
