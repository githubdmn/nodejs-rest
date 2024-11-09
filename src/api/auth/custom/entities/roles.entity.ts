import {
  BeforeInsert,
  Column,
  Entity,
  Index,
  OneToMany,
  OneToOne,
} from 'typeorm';
import Base from './base.entity';
import User from './user.entity';
import Admin from './admin.entity';

@Entity()
export default class Roles extends Base {
  @Column({ unique: true })
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
  async generateId(alphabet?: string, length?: number) {
    if (!this.roleId) this.roleId = super.idGenerator(alphabet, length);
  }

  @OneToMany(() => Admin, (admin) => admin.role)
  admins: Admin[];

  @OneToMany(() => User, (user) => user.role)
  users: User[];
}
