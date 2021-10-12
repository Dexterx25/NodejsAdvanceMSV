import { ServerResponse, ConsoleResponse } from './index';
import { Request, Response, NextFunction } from 'express';
export default async function errors(
  err: any,
  req: Request,
  res: Response,
  next?: NextFunction | any
) {
  console.log('error Heere---!', err);
  const message = err.msg || 'Error interno';
  const status = err.statusCode || 500;
  console.log('STATUS CONSOLE--->', status);
  await ServerResponse.error(req, res, message, status);
}
