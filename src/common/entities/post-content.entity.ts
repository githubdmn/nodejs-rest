import { Entity, Column, ManyToOne, OneToOne, BeforeInsert, JoinColumn } from 'typeorm';
import Base from './base.entity';
import Post from './post.entity';

@Entity()
export default class PostContent extends Base {
  @Column({ unique: true })
  postId: string;

  @Column()
  title: string;

  @Column('text')
  content: string;

  @OneToOne(() => Post, (post) => post.content)
  @JoinColumn({ name: 'postId', referencedColumnName: 'postId' })
  post: Post;

  protected generateId(): void {}
}
