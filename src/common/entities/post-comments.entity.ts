import { Entity, Column } from "typeorm";
import Base from "./base.entity";



@Entity()
export default class PostComments extends Base {
  @Column({ unique: true })
  postId: string;

  @Column('array')
  comments: string;

  protected generateId(): void {}
}