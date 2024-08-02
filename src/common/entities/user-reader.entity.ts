import { Entity, Column, OneToOne, BeforeInsert } from "typeorm";
import Auth from "./auth.entity";
import Credentials from "./credentials.entity";
import User from "./user.entity";


@Entity()
export default class Reader extends User {
  @Column({ unique: true })
  readerId: string;

  // favourite posts

  @OneToOne(() => Credentials, (credentials) => credentials.reader)
  credentials: Credentials;

  @OneToOne(() => Auth, (auth) => auth.reader)
  auth: Auth;

  @BeforeInsert()
  async generateId() {
    if (!Boolean(this.readerId)) {
      this.readerId = super.idGenerator('r-');
    }
  }
}