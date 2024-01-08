import { randomBytes, scrypt } from 'crypto';
import { promisify } from 'util';

const scryptPromise = promisify(scrypt);
const passwordLength = 32;

export async function hashString(s: string) {
  const salt = randomBytes(8).toString('hex');
  const hash = (await scryptPromise(s, salt, passwordLength)) as Buffer;
  return salt + '.' + hash.toString('hex');
}

export async function checkHashedValue(existingStr: string, givenStr: string) {
  const [salt, storedHash] = existingStr.split('.');
  const hash = (await scryptPromise(givenStr, salt, passwordLength)) as Buffer;
  if (hash.toString('hex') === storedHash) return true;
  else return false;
}
