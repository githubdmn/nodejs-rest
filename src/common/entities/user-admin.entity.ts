import {
  Entity,
  Column,
  BeforeInsert,
  OneToOne,
} from 'typeorm';
import Auth from './auth.entity';
import Credentials from './credentials.entity';
import User from './user.entity';

@Entity()
export default class Admin extends User {
  @Column({ unique: true })
  adminId: string;

  @OneToOne(() => Credentials, (credentials) => credentials.admin)
  credentials: Credentials;

  @OneToOne(() => Auth, (auth) => auth.admin)
  auth: Auth;

  @BeforeInsert()
  async generateId() {
    if (!Boolean(this.adminId)) {
      this.adminId = super.idGenerator('admin-');
    }
  }
}
