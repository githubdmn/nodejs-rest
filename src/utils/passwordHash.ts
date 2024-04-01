import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';

const scryptAsync = promisify(scrypt);

const SALT_SIZE = 16;

export async function hashPassword(password: string): Promise<string> {
  const salt = await generateSalt();
  const hashedBuffer = (await scryptAsync(password, salt, 64)) as Buffer;
  return hashedBuffer.toString('hex');
}

export async function generateSalt(): Promise<Buffer> {
  return randomBytes(SALT_SIZE);
}

export async function comparePasswords(
  candidatePassword: string,
  hashedPassword: string,
): Promise<boolean> {
  const candidateHashedPassword = await hashPassword(candidatePassword);
  return candidateHashedPassword === hashedPassword;
}
