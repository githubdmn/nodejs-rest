import { Entity, Column, JoinColumn, BeforeInsert, OneToOne } from 'typeorm';
import Base from './base.entity';
import Admin from './admin.entity';
import EndUser from './enduser.entity';

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

  @Column({ nullable: true })
  method: string; // The authentication method used ('password', 'google', 'facebook', etc.).

  @BeforeInsert()
  async generateId() {
    this.authId = super.idGenerator();
  }

  @OneToOne(() => EndUser, (enduser) => enduser.auth)
  @JoinColumn({ name: 'userId', referencedColumnName: 'userId' })
  enduser?: EndUser;

  @OneToOne(() => Admin, (admin) => admin.auth)
  @JoinColumn({ name: 'adminId', referencedColumnName: 'adminId' })
  admin?: Admin;
}
