import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import Auth from './auth.entity';
import Base from './base.entity';
import Credentials from './credentials.entity';

@Entity()
export default class Admin extends Base {
  @Column({ unique: true })
  adminId: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToOne(() => Credentials, (credentials) => credentials.admin)
  @JoinColumn({ name: 'adminId' })
  credentials: Credentials;
  
  @OneToOne(() => Auth, (auth) => auth.admin)
  auth: Auth;

  @BeforeInsert()
  async generateId() {
    this.adminId = super.idGenerator();
  }
}
