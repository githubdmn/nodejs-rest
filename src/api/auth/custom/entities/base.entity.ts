// const { v4: uuidv4 } = require('uuid');
// return uuidv4().replace(/-/g, '').slice(0, 6);

import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { customAlphabet } from 'nanoid';
import { NUMBERS, ID_LENGTH } from './../constants';

export default abstract class Base {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  protected idGenerator(
    alphabet: string = NUMBERS,
    length: number = ID_LENGTH,
  ): string {
    return customAlphabet(alphabet, length)();
  }

  protected abstract generateId(): void;
}
