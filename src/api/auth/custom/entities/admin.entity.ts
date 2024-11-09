import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';
import Base from './base.entity';
import Password from './password.entity';
import Roles from './roles.entity';
import Token from './token.entity';

@Entity()
@Index('idx_admin_email', ['email'])
@Index('idx_admin_adminId', ['adminId'])
export default class Admin extends Base {
  @Column({ unique: true })
  adminId: string;

  @Column({ unique: true })
  @Index()
  email: string;

  @Column({ unique: true })
  phone: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @OneToOne(() => Password, (password) => password.user, { cascade: true })
  @JoinColumn({ name: 'passwordId', referencedColumnName: 'passwordId' })
  password: Password;

  @OneToOne(() => Token, (token) => token.user, { cascade: true })
  @JoinColumn({ name: 'tokenId', referencedColumnName: 'tokenId' })
  token: Token;

  @ManyToOne(() => Roles)
  @JoinColumn({ name: 'roleId', referencedColumnName: 'roleId' })
  role: Roles;

  @BeforeInsert()
  async generateId() {
    this.adminId = super.idGenerator();
  }
}
