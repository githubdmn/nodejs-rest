import { Entity, Column, OneToOne, JoinColumn, BeforeInsert } from "typeorm";
import Base from "./base.entity";
import User from "./user.entity";
import Admin from "./admin.entity";
import { hashString } from "@/utils";

@Entity()
export default class Credentials extends Base {
  @Column({ unique: true })
  credentialsId: string;

  @Column()
  passwordHash: string;

  @OneToOne(() => User, (user) => user.credentials)
  @JoinColumn({ name: 'userId' })
  user?: User;

  @OneToOne(() => Admin, (admin) => admin.credentials)
  @JoinColumn({ name: 'adminId' })
  admin?: Admin;

  @BeforeInsert()
  async generateId() {
    this.credentialsId = super.idGenerator();
  }

  @BeforeInsert()
  async hashPassword() {
    this.passwordHash = await hashString(this.passwordHash);
  }
}
