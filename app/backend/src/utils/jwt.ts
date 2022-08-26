import { JwtPayload, sign, SignOptions, verify } from 'jsonwebtoken';
import InvalidToken from '../error/InvalidToken';
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
    try {
      return verify(encryptedText, this.secret) as JwtPayload;
    } catch (error) {
      throw new InvalidToken('Token must be a valid token');
    }
  }
}

export default Jwt;

// const decryptedToken = verify(authorization, this.secret) as JwtPayload;

// if (decryptedToken.code) {
//   throw new InvalidToken('Token must be a valid token');
// }
// return decryptedToken;
// } TESTE SEM TRY/CATCH FUTURA REFATORAÇÃO
