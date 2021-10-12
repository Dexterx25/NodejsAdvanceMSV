import * as auth from '../../../authorizations/index';
import { Request, Response, NextFunction } from 'express';

export default function cheakAuth(action: any) {
  async function middleware(req: Request, res: Response, next: NextFunction) {
    switch (action) {
      case 'update':
        console.log('Update MIDLLLLLLLLLLEEEE');
        await auth.cheak.logged(req, res);
        next();
        break;
      case 'logout':
        console.log('DELETE MIDLLLLLLLLLLEEEE');
        await auth.cheak.logged(req, res);
        next();
        break;

      default:
        next();
    }
  }
  return middleware;
}
