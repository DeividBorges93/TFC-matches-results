import ILogin from '../interfaces/ILogin';
import UserModel from '../database/models/user';
import IError from '../interfaces/IError';
import Jwt from '../utils/jwt';

export default class LoginService {
  public login = async (login: ILogin): Promise<string | IError> => {
    const result = await (UserModel.findOne({ where: { email: login.email } }));
    const jwt = new Jwt();

    if (!result) return { code: 401, message: 'Incorrect email or password' };

    const token = jwt.encrypt({ email: result.email, id: result.id, role: result.role });

    return token;
  };

  public validate = (authorization: string): string => {
    const jwt = new Jwt();

    const { role } = jwt.decrypt(authorization);

    return role;
  };
}
