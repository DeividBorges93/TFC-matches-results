import { JwtPayload, sign, SignOptions, verify } from 'jsonwebtoken';
import 'dotenv/config';

class Jwt {
  private secret: string;
  private jwtConfig: SignOptions;

  constructor() {
    this.secretInit();
    this.jwtConfig = { algorithm: 'HS256', expiresIn: '1d' };
  }

  private async secretInit(): Promise<void> {
    const secretJwt = process.env.JWT_SECRET;
    this.secret = secretJwt || 'dfadfad';
  }

  encrypt(text: JwtPayload): string {
    return sign(text, this.secret, this.jwtConfig);
  }

  decrypt(encryptedText: string): JwtPayload {
    return verify(encryptedText, this.secret) as JwtPayload;
  }
}

export default Jwt;
