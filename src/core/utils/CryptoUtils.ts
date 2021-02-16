import { compare, hash } from 'bcrypt';

const saltRound = 15;

export class CryptoUtils {
  static getHash(password: string): Promise<string> {
    return hash(password, saltRound);
  }

  static compareHash(password: string, hash: string): Promise<boolean> {
    return compare(password, hash);
  }
}
