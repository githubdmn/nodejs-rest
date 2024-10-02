import { BeforeInsert, Column, Entity, OneToOne } from 'typeorm';
import User from './user.entity';
import Base from './base.entity';
import { hashString } from '@/utils';
import AuthAdmin from './auth-admin.entity';

@Entity()
export default class Password extends Base {
  @Column({ nullable: true })
  passwordId: string;

  @OneToOne(() => AuthAdmin, (authAdmin) => authAdmin.password)
  authAdmin: AuthAdmin;

  @OneToOne(() => User, (user) => user.password)
  user: User;

  @BeforeInsert()
  async hashPassword() {
    this.passwordId = await hashString(this.passwordId);
  }

  async generateId() {}
}
