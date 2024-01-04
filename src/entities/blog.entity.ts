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
  @ManyToOne((type) => User, (user) => user.userId, {
    cascade: true,
    createForeignKeyConstraints: false,
    eager: true,
  })
  @JoinColumn({ name: 'userId', referencedColumnName: 'userId' })
  userId: string;
}
