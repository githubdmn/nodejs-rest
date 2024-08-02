import { Entity, Column } from "typeorm";
import Base from "./base.entity";

//TODO: connect post-content, readers and author


@Entity()
export default class PostComments extends Base {

  protected generateId(): void {}
}