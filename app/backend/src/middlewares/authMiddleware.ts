import { NextFunction, Request, Response } from 'express';
import Jwt from '../utils/jwt';

export default async (req: Request, res: Response, next: NextFunction) => {
  const jwt = new Jwt();
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token does not exist' });

  jwt.decrypt(authorization);

  next();
};
