import { BeforeInsert, Column, Entity, Index } from 'typeorm';
import Base from './base.entity';

@Entity()
@Index('idx_auth_email', ['email'])
export default class Auth extends Base {
  @Column({ unique: true })
  authId: string;

  @Column({ unique: true })
  @Index()
  email: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  password: string;

  @BeforeInsert()
  async generateId() {
    this.authId = super.idGenerator();
  }
}
