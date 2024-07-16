import { Entity, Column, ManyToOne, BeforeInsert, JoinColumn } from 'typeorm';
import TodoList from './todoList.entity';
import Base from './base.entity';

@Entity('todo_items')
export default class TodoItem extends Base {
  @Column({ unique: true })
  itemId: string;

  @Column()
  text: string;

  @Column({ default: false })
  isDone: boolean;

  @BeforeInsert()
  generateId() {
    this.itemId = super.idGenerator();
  }

  @ManyToOne(() => TodoList, (todoList) => todoList.items)
  @JoinColumn({ name: 'listId', referencedColumnName: 'listId' })
  todoList: TodoList;
}
