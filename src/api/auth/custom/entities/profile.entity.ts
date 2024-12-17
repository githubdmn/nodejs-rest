import { Column, Index, OneToOne, JoinColumn, ManyToOne } from 'typeorm';
import Base from './base.entity';
import Password from './password.entity';
import Roles from './roles.entity';
import Token from './token.entity';

export default abstract class Profile extends Base {
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
}
