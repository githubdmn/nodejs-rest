import { BeforeInsert, Column, Entity, Index, JoinColumn, ManyToOne, OneToOne } from "typeorm";
import Base from "./base.entity";
import Password from "./password.entity";
import Roles from "./roles.entity";
import Token from "./token.entity";

@Entity()
@Index('idx_auth_email', ['email'])
export default class AuthAdmin extends Base {
  @Column({ unique: true })
  authAdminId: string;

  @Column({ unique: true })
  @Index()
  email: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @BeforeInsert()
  async generateId() {
    this.authAdminId = super.idGenerator();
  }

  @OneToOne(() => Password, (password) => password.authAdmin, { cascade: true })
  @JoinColumn({ name: 'passwordId', referencedColumnName: 'passwordId' })
  password: Password;

  @OneToOne(() => Token, (token) => token.authAdmin, { cascade: true })
  @JoinColumn({ name: 'tokenId', referencedColumnName: 'tokenId' })
  token: Token;

  @ManyToOne(() => Roles)
  @JoinColumn({ name: 'roleId', referencedColumnName: 'roleId' })
  role: Roles;
}
