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
import Base from './base.entity';
import EndUser from './enduser.entity';

@Entity('todo_lists')
export default class TodoList extends Base {
  @Column({ unique: true })
  listId: string;

  @Column()
  title: string;

  @BeforeInsert()
  generateId() {
    this.listId = super.idGenerator();
  }

  @ManyToOne(() => EndUser, (enduser) => enduser.todoLists)
  @JoinColumn({ name: 'enduserId', referencedColumnName: 'enduserId' })
  user: User;

  @OneToMany(() => TodoItem, (todoItem) => todoItem.todoList, {
    cascade: ['remove'],
    createForeignKeyConstraints: false,
    onDelete: 'CASCADE',
  })
  items: TodoItem[];
}
