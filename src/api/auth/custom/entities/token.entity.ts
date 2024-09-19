import { BeforeInsert, Column, Entity, In, Index } from 'typeorm';
import Base from './base.entity';

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
  last_login: Date;

  @Column({ nullable: true })
  method: string; // The authentication method used ('password', 'google', 'facebook', etc.).

  @BeforeInsert()
  async generateId() {
    this.tokenId = super.idGenerator();
  }
}
