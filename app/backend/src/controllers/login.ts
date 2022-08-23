import { NextFunction, Request, Response } from 'express';
import LoginService from '../services/login';

export default class LoginController {
  constructor(private loginService = new LoginService()) {}

  public login = async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });

    const result = await this.loginService.login({ email, password });

    if (typeof result !== 'string') {
      next(result);
      return;
    }

    return res.status(200).json({ token: result });
  };

  public validate = (req: Request, res: Response) => {
    const { authorization } = req.headers;

    if (!authorization) return res.status(401).json({ message: 'Token does not exist' });

    const result = this.loginService.validate(authorization);

    return res.status(200).json({ role: result });
  };
}
