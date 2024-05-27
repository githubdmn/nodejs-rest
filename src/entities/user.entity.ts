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
import Credentials from './credentials.entity';

@Entity()
export default class User extends Base {
  @Column({ unique: true })
  userId: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => TodoList, (todoList) => todoList.user)
  todoLists: TodoList[];

  @OneToOne(() => Credentials, (credentials) => credentials.user)
  credentials: Credentials;

  @OneToOne(() => Auth, (auth) => auth.user)
  auth: Auth;

  @BeforeInsert()
  async generateId() {
    this.userId = super.idGenerator();
  }
}
