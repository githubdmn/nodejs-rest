import { Entity, Column, ManyToOne, OneToOne, BeforeInsert } from 'typeorm';
import Author from './user-author.entity';
import Base from './base.entity';

@Entity()
export default class PostContent extends Base {
  @Column({ unique: true })
  postId: string;

  @Column()
  title: string;

  @Column('text')
  content: string;

  protected generateId(): void {}
}
