import { Entity, Column, ManyToOne, OneToMany, BeforeInsert } from 'typeorm';
import User from './user.entity';
import TodoItem from './todoItem.entity';
import BaseEntity from './base.entity';

@Entity('todo_lists')
export default class TodoList extends BaseEntity {
  @Column({ unique: true })
  listId: string;

  @Column()
  title: string;

  @BeforeInsert()
  generateId() {
    this.listId = super.idGenerator();
  }

  @ManyToOne(() => User, (user) => user.todoLists)
  user: User;

  @OneToMany(() => TodoItem, (todoItem) => todoItem.todoList, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  items: TodoItem[];
}
