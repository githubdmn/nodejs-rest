import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  OneToOne,
} from 'typeorm';
import TodoList from './todoList.entity';
import Auth from './auth.entity';
import Credentials from './credentials.entity';
import User from './user.entity';

@Entity()
export default class EndUser extends User {
  @Column({ unique: true })
  enduserId: string;

  @OneToMany(() => TodoList, (todoList) => todoList.user)
  todoLists: TodoList[];

  @OneToOne(() => Credentials, (credentials) => credentials.enduser)
  credentials: Credentials;

  @OneToOne(() => Auth, (auth) => auth.enduser)
  auth: Auth;

  @BeforeInsert()
  async generateId() {
    this.enduserId = super.idGenerator();
  }
}
