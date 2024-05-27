import { hashString } from '@/utils';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToOne,
} from 'typeorm';
import Auth from './auth.entity';
import Base from './base.entity';

@Entity()
export default class Admin extends Base {
  @Column({ unique: true })
  adminId: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  passwordHash: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Auth, (auth) => auth.user)
  auth: Auth[];

  @BeforeInsert()
  async hashPassword() {
    this.passwordHash = await hashString(this.passwordHash);
  }

  @BeforeInsert()
  async generateId() {
    this.adminId = super.idGenerator();
  }
}
