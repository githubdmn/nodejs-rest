import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  BeforeInsert,
  JoinColumn,
} from 'typeorm';
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
  @JoinColumn({ name: 'userId', referencedColumnName: 'userId' })
  user: User;

  @OneToMany(() => TodoItem, (todoItem) => todoItem.todoList, {
    cascade: ['remove'],
    createForeignKeyConstraints: false,
    onDelete: 'CASCADE',
  })
  items: TodoItem[];
}
