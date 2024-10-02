import { BeforeInsert, Column, Entity, Index, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import Base from './base.entity';
import Password from './password.entiry';
import Roles from './roles.entity';
import Token from './token.entity';

@Entity()
@Index('idx_auth_email', ['email'])
export default class User extends Base {
  @Column({ unique: true })
  userId: string;

  @Column({ unique: true })
  @Index()
  email: string;

  @Column({ unique: true })
  phone: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @BeforeInsert()
  async generateId() {
    this.userId = super.idGenerator();
  }

  @OneToOne(() => Password, (password) => password.user, { cascade: true })
  @JoinColumn({ name: 'userId', referencedColumnName: 'userId' })
  password: Password;

  @OneToOne(() => Token, (token) => token.user, { cascade: true })
  @JoinColumn({ name: 'userId', referencedColumnName: 'userId' })
  token: Token;

  @ManyToOne(() => Roles)
  @JoinColumn({ name: 'roleId', referencedColumnName: 'roleId' })
  role: Roles;
}
