import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import TodoList from './todoList.entity';
import Base from './base.entity';
import Auth from './auth.entity';
import { hashString } from '@/utils';

@Entity()
export default class User extends Base {
  @Column({ unique: true })
  userId: string; 

  @Column({ unique: true })
  email: string;

  @Column({ nullable: false })
  passwordHash: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => TodoList, (todoList) => todoList.user)
  todoLists: TodoList[];

  @OneToOne(() => Auth, (auth) => auth.user)
  @JoinColumn({ name: 'userId' })
  auth: Auth;

  @BeforeInsert()
  async hashPassword() {
    this.passwordHash = await hashString(this.passwordHash);
  }

  @BeforeInsert()
  async generateId() {
    this.userId = super.idGenerator();
  }
}
