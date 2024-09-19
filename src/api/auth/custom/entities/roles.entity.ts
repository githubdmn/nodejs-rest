import { BeforeInsert, Column, Entity, Index } from 'typeorm';
import Base from './base.entity';

@Entity()
export default class Roles extends Base {
  @Column({ nullable: true })
  roleId: string;

  @Column({ nullable: true })
  roleName: string;

  @Column({ nullable: true })
  roleDescription: string;

  @Column({ enum:  ['active', 'inactive'], default: 'active' })
  roleStatus: string;

  @BeforeInsert()
  async generateId() {
    this.roleId = super.idGenerator();
  }
}
