import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  BeforeInsert,
} from 'typeorm';
import User from './user.entity';
import { hashString } from '@/utils';
import Base from './base.entity';

@Entity()
export default class Auth extends Base {
  @PrimaryGeneratedColumn()
  authId: string;

  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ nullable: false })
  passwordHash: string;

  @Column({ nullable: true })
  refreshToken: string;

  @Column({ nullable: true })
  refreshTokenExpiration: Date;

  @Column()
  last_login: Date;

  @Column()
  method: string; // The authentication method used ('password', 'google', 'facebook', etc.).

  @BeforeInsert()
  async generateId() {
    // this.authId = super.idGenerator();
  }

  @BeforeInsert()
  async hashPassword() {
    this.passwordHash = await hashString(this.passwordHash);
  }

  @OneToOne(() => User, (user: any) => user.auth)
  @JoinColumn({ name: 'userId' })
  user: User;
}
