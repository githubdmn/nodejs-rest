import {
  Entity,
  Column,
  JoinColumn,
  BeforeInsert,
  OneToOne,
} from 'typeorm';
import User from './user.entity';
import Base from './base.entity';
import Admin from './admin.entity';

@Entity()
export default class Auth extends Base {
  @Column({ unique: true })
  authId: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column({ nullable: true })
  refreshTokenExpiration: Date;

  @Column({ nullable: true })
  last_login: Date;

  @Column()
  method: string; // The authentication method used ('password', 'google', 'facebook', etc.).

  @BeforeInsert()
  async generateId() {
    this.authId = super.idGenerator();
  }

  @OneToOne(() => User, (user) => user.auth)
  @JoinColumn({ name: 'userId', referencedColumnName: 'userId' })
  user?: User;

  @OneToOne(() => Admin, (admin) => admin.auth)
  @JoinColumn({ name: 'adminId', referencedColumnName: 'adminId' })
  admin?: Admin;
}
