import { BeforeInsert, Column, Entity, In, Index, OneToOne } from 'typeorm';
import Base from './base.entity';
import User from './user.entity';
import AuthAdmin from './auth-admin.entity';

@Entity()
@Index('idx_refresh_token', ['refreshToken'])
export default class Token extends Base {
  @Column({ nullable: true })
  tokenId: string;

  @Column({ nullable: true })
  @Index()
  refreshToken: string;

  @Column({ nullable: true })
  refreshTokenExpiration: Date;

  @Column({ nullable: true })
  method: string; // The authentication method used ('password', 'google', 'facebook', etc.).

  @OneToOne(() => AuthAdmin, (authAdmin) => authAdmin.token)
  authAdmin: AuthAdmin;

  @OneToOne(() => User, (user) => user.token)
  user: User;

  @BeforeInsert()
  async generateId() {
    this.tokenId = super.idGenerator();
  }
}
