import { randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

const scryptPromise = promisify(scrypt);
const passwordLength = 32;

export async function hashString(s: string) {
  const salt = randomBytes(8).toString('hex');
  const hash = (await scryptPromise(s, salt, passwordLength)) as Buffer;
  return salt + '.' + hash.toString('hex');
}

export async function checkHashedValue(str: string, givenStr: string) {
  const [salt, storedHash] = givenStr.split('.');
  const hash = (await scryptPromise(str, salt, passwordLength)) as Buffer;
  if (hash.toString('hex') === storedHash) return true;
  else return false;
}