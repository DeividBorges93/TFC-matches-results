import { Request, Response } from 'express';
import ILoginService from '../interfaces/ILoginService';
import IUser from '../interfaces/IUser';
import Jwt from '../utils/jwt';

export default class LoginController {
  constructor(private loginService: ILoginService<IUser>) {}

  public create = async (req: Request, res: Response) => {
    const user = await this.loginService.login(req.body);
    const jwt = new Jwt();
    const token = jwt.encrypt({ email: user.email, id: user.id });

    if (!user) return res.status(404).json({ message: 'User not found' });

    return res.status(200).json({ token });
  };
}
