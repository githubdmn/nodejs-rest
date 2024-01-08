import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  BeforeInsert,
} from 'typeorm';
import BaseEntity from './base.entity';
import Blog from './blog.entity';

@Entity('comment')
export default class Comment extends BaseEntity {
  @Column({ unique: true })
  commentId: string;

  @Column()
  content: string;

  // there's no relation with user due to efficiency
  // a relation would retrieve same users multiple times - inefficient
  // whis way a user can be retrieved when necessary and user data can be cached in case of reocurrence
  @Column()
  userId: string;

  @BeforeInsert()
  generateId() {
    this.commentId = super.idGenerator();
  }

  @ManyToOne(() => Blog, (blog) => blog.comments)
  @JoinColumn({ name: 'blogId' })
  blog: Blog;

  @ManyToOne(() => Comment, (comment) => comment.replies, { nullable: true })
  @JoinColumn({ name: 'parentId' })
  parent: Comment;

  @OneToMany(() => Comment, (comment) => comment.parent)
  replies: Comment[];
}
