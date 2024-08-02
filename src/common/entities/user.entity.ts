import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import Base from './base.entity';
export default abstract class User extends Base {
  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
