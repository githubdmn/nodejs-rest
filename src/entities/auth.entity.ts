// auth.entity.ts

import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import User from './user.entity';
import Base from './base.entity'; // Assuming you have a Base entity

@Entity('auth')
export default class Auth extends Base {
  @Column({ unique: true })
  accessToken: string;

  @Column({ unique: true })
  refreshToken: string;

  @Column()
  expiryDate: Date;

  @ManyToOne(() => User, (user) => user.auth)
  @JoinColumn({ name: 'userId', referencedColumnName: 'userId' })
  user: User;

  generateId(): void {
    this.id = +this.idGenerator(); // Convert the nanoid string to a number
  }
}
