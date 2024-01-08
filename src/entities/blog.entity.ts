import {
  BeforeInsert,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import User from './user.entity';
import Base from './base.entity';
import { CommentEntity, UserEntity } from '.';

@Entity()
export default class Blog extends Base {
  @Column({ unique: true })
  blogId: string;
  @Column()
  title: string;
  @Column()
  text: string;
  @BeforeInsert()
  generateId() {
    this.blogId = super.idGenerator();
  }
  @ManyToOne(() => User, (user) => user.blog, {
    cascade: true,
    createForeignKeyConstraints: false,
    eager: true,
  })
  @JoinColumn({ name: 'userId', referencedColumnName: 'userId' })
  user: UserEntity;

  @OneToMany(() => CommentEntity, (comment) => comment.blog)
  comments: CommentEntity[];
}
