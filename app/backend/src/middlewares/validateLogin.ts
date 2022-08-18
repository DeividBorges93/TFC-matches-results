import { Request, Response, NextFunction } from 'express';
import loginSchemas from '../schemas/login';

const validateLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  const { error } = loginSchemas.validate({ email, password });

  if (error) {
    const [code, message] = error.message.split('|');
    return res.status(Number(code)).json({ message });
  }

  return next();
};

export default validateLogin;
