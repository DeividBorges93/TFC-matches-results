import IUser from '../interfaces/IUser';
import ILogin from '../interfaces/ILogin';
import UserModel from '../database/models/user';

export default class LoginService {
  public login = async (login: ILogin): Promise<IUser> => {
    const user = await UserModel.findOne({ where: { email: login.email } });

    return user as IUser;
  };
}
