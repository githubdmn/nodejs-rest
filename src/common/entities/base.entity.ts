// const { v4: uuidv4 } = require('uuid'); // return uuidv4().replace(/-/g, '').slice(0, 6);
import { PrimaryGeneratedColumn } from 'typeorm';
import { customAlphabet } from 'nanoid';

export default abstract class Base {
  @PrimaryGeneratedColumn()
  id: number;

  protected idGenerator(prefix: string = ''): string {
    return prefix + customAlphabet(`1234567890`, 5)();
  }

  protected abstract generateId(): void;
}
