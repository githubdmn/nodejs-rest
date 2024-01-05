import { PrimaryGeneratedColumn } from 'typeorm';
// const { v4: uuidv4 } = require('uuid');
import { customAlphabet } from 'nanoid';

export default abstract class Base {
  @PrimaryGeneratedColumn()
  id: number;

  protected idGenerator(): string {
    // return uuidv4().replace(/-/g, '').slice(0, 6);
    return customAlphabet('1234567890', 5)();
  }

  protected abstract generateId(): void;
}
