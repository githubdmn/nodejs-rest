import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import TodoList from './todoList.entity';
import Base from './base.entity';
import Auth from './auth.entity';

@Entity()
export default class User extends Base {
  @Column({ unique: true })
  userId: string;

  @BeforeInsert()
  async generateId() {
    this.userId = super.idGenerator();
  }

  @OneToMany(() => TodoList, (todoList) => todoList.user)
  todoLists: TodoList[];

  @OneToOne(() => Auth, (auth) => auth.user)
  @JoinColumn({ name: 'userId' })
  auth: Auth;
}
