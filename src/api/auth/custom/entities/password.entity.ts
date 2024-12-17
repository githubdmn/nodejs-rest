import { BeforeInsert, Column, Entity, OneToOne } from 'typeorm';
import User from './user.entity';
import Base from './base.entity';
import { hashString } from '@/utils';
import Admin from './admin.entity';

import { NUMBERS } from './../constants';

const PASSWORD_ID_LENGTH = 3;

@Entity()
export default class Password extends Base {
  @Column({ unique: true })
  passwordId: string;

  @Column({ nullable: true })
  password: string;

  @OneToOne(() => Admin, (authAdmin) => authAdmin.password)
  authAdmin: Admin;

  @OneToOne(() => User, (user) => user.password)
  user: User;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hashString(this.password);
  }

  @BeforeInsert()
  async generateId() {
    this.passwordId = 'PA-' + super.idGenerator(NUMBERS, PASSWORD_ID_LENGTH);
  }
}
