import { Entity, Column, ManyToOne, JoinColumn, BeforeInsert } from 'typeorm';
import User from './user.entity';
import Base from './base.entity';

@Entity('auth')
export default class Auth extends Base {
  @Column({ unique: true })
  authId: string;

  @Column({ unique: true })
  accessToken: string;

  @Column({ unique: true })
  refreshToken: string;

  @Column()
  expiryDate: Date;

  @Column({ nullable: true })
  lastUsedDate: Date;

  @Column({ default: false })
  revoked: boolean;

  @ManyToOne(() => User, (user) => user.auth)
  @JoinColumn({ name: 'userId', referencedColumnName: 'userId' })
  user: User;

  @BeforeInsert()
  generateId() {
    this.authId = super.idGenerator();
  }
}
