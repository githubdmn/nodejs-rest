import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';
import TodoList from './todoList.entity';
import Base from './base.entity';
import { hashString } from '@/utils';
import Auth from './auth.entity';

@Entity()
export default class User extends Base {
  @Column({ unique: true })
  userId: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @BeforeInsert()
  async generateId() {
    this.userId = super.idGenerator();
    this.password = await hashString(this.password);
  }
  @OneToMany(() => TodoList, (todoList) => todoList.user)
  todoLists: TodoList[];

  @OneToMany(() => Auth, (auth) => auth.user)
  auth: Auth[];
}
