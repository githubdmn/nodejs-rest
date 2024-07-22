import { Entity, Column, OneToOne, JoinColumn, BeforeInsert } from 'typeorm';
import Base from './base.entity';
import EndUser from './enduser.entity';
import Admin from './admin.entity';
import { hashString } from '@/utils';

@Entity()
export default class Credentials extends Base {
  @Column({ unique: true })
  credentialsId: string;

  @Column()
  passwordHash: string;

  @OneToOne(() => EndUser, (enduser) => enduser)
  @JoinColumn({ name: 'enduserId', referencedColumnName: 'enduserId' })
  enduser?: EndUser;

  @OneToOne(() => Admin, (admin) => admin.credentials)
  @JoinColumn({ name: 'adminId', referencedColumnName: 'adminId' })
  admin?: Admin;

  @BeforeInsert()
  async generateId() {
    this.credentialsId = super.idGenerator();
  }

  @BeforeInsert()
  async hashPassword() {
    this.passwordHash = await hashString(this.passwordHash);
  }
}
