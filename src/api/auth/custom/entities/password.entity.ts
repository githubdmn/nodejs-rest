import { BeforeInsert, Column, Entity, OneToOne } from 'typeorm';
import User from './user.entity';
import Base from './base.entity';
import { hashString } from '@/utils';
import Admin from './admin.entity';

@Entity()
export default class Password extends Base {
  @Column({ nullable: true })
  passwordId: string;

  @OneToOne(() => Admin, (authAdmin) => authAdmin.password)
  authAdmin: Admin;

  @OneToOne(() => User, (user) => user.password)
  user: User;

  @BeforeInsert()
  async hashPassword() {
    this.passwordId = await hashString(this.passwordId);
  }

  async generateId() {}
}
