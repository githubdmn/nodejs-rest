import { BeforeInsert, Column, Entity, OneToOne } from 'typeorm';
import User from './user.entity';
import Base from './base.entity';
import { hashString } from '@/utils';
import AuthAdmin from './admin.entity';

@Entity()
export default class Password extends Base {
  @Column({ nullable: true })
  password: string;

  @OneToOne(() => AuthAdmin, (authAdmin) => authAdmin.password)
  authAdmin: AuthAdmin;

  @OneToOne(() => User, (user) => user.password)
  user: User;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hashString(this.password);
  }

  async generateId() {}
}
