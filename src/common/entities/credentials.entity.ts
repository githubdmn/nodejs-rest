import { Entity, Column, OneToOne, JoinColumn, BeforeInsert } from 'typeorm';
import Base from './base.entity';
import Author from './user-author.entity';
import Admin from './user-admin.entity';
import { hashString } from '@/utils';
import Reader from './user-reader.entity';
import User from './user.entity';

@Entity()
export default class Credentials extends Base {
  @Column({ unique: true })
  credentialsId: string;

  @Column()
  passwordHash: string;

  @OneToOne(() => Reader, (reader) => reader)
  @JoinColumn({ name: 'readerId', referencedColumnName: 'readerId' })
  reader?: Reader;

  @OneToOne(() => Author, (author) => author)
  @JoinColumn({ name: 'authorId', referencedColumnName: 'authorId' })
  author?: Author;

  @OneToOne(() => Admin, (admin) => admin.credentials)
  @JoinColumn({ name: 'adminId', referencedColumnName: 'adminId' })
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
