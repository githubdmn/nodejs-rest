import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import Blog from './blog.entity';
import Base from './base.entity';
import { hashString } from '@/utils';

@Entity()
export default class User extends Base {
  @Column({ unique: true })
  userId: string;
  @Column({ unique: true })
  email: string;
  @Column({ select: false })
  password: string;
  @BeforeInsert()
  async generateId() {
    this.userId = super.idGenerator();
    this.password = await hashString(this.password);
  }
  @OneToMany(() => Blog, (blog) => blog.user)
  blog: Blog[];
}
