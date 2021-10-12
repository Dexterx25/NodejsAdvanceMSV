import * as auth from '../../../authorizations/index';
import { Request, Response, NextFunction } from 'express';
export default function cheakAuth(action: any) {
  function middleware(req: Request, res: Response, next: NextFunction) {
    switch (action) {
      case 'update':
        auth.cheak.next();
        break;
      case 'get':
        console.log('for getttt', req.headers);
        auth.cheak.logged(req);
        next();
        break;
      case 'list':
        auth.cheak.logged(req);
        next();
        break;
      case 'filter':
        auth.cheak.logged(req);
        next();
      default:
        next();
    }
  }
  return middleware;
}
