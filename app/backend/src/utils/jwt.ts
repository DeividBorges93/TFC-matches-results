import { sign, verify } from 'jsonwebtoken';
import 'dotenv/config';

class Jwt {
  private secret: string;

  constructor() {
    this.secretInit();
  }

  private async secretInit(): Promise<void> {
    const secretJwt = process.env.JWT_SECRET;
    this.secret = secretJwt || 'dfadfad';
  }

  async encrypt(text: object): Promise<string> {
    return sign(text, this.secret);
  }

  async decrypt(encryptedText: string): Promise<string> {
    return verify(encryptedText, this.secret) as string;
  }
}

export default Jwt;
