import { BeforeInsert, Column, Entity, Index, OneToOne } from 'typeorm';
import Base from './base.entity';
import User from './user.entity';
import Admin from './admin.entity';

@Entity()
export default class Roles extends Base {
  @Column({ nullable: true })
  roleId: string;

  @Column({ nullable: true })
  roleName: string;

  @Column({ nullable: true })
  roleDescription: string;

  @Column({ enum: ['active', 'inactive'], default: 'active' })
  roleStatus: string;

  @Column({ default: true })
  verified: boolean;

  @BeforeInsert()
  async generateId() {
    this.roleId = super.idGenerator();
  }

  @OneToOne(() => Admin, (authAdmin) => authAdmin.role)
  authAdmin: Admin;

  @OneToOne(() => User, (user) => user.role)
  user: User;
}
