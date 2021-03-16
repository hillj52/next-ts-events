import { Request, Response, NextFunction } from 'express';
import { Roles } from '../models/user';
import { NotAuthorizedError } from '../errors/not-authorized-error';

export const requireRole = (role: Roles) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser) {
    throw new NotAuthorizedError();
  }
  if (!req.currentUser.roles.includes(role)) {
    throw new NotAuthorizedError();
  }
  next();
};
