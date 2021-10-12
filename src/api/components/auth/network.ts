/* eslint-disable prefer-const */
import expres, {
  Request,
  Response,
  NextFunction,
  Router,
  response
} from 'express';
import {
  ConsoleResponse,
  ServerResponse
} from '../../../utils/responses/index';
import controller from './index';
import secure from './secure';
const router: Router = Router();
const chalk = require('chalk');
let procedence = '[NETWORK AUTH]';

router.post('/', function (req: Request, res: Response, next: NextFunction) {
  console.log('THIS IS THE BODY INSERT LOGIN-->', req.body);
  controller
    .insert(req.body.email, req.body.password, 'users')
    .then((token: any) => {
      console.log('THIS IS THE TOKEN--->', token);
      if (!token) {
        ConsoleResponse.error(procedence, 'token Not Is Here');
        return next;
      } else {
        ConsoleResponse.success(procedence, token);
        ServerResponse.success(req, res, token, 201);
      }
    })
    .catch(next);
});

router.delete('/', secure('logout'), function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log('THIS IS THE PARAMS DELETE AUTH-->', req.headers);
  controller
    .remove(req)
    .then((respon: any) => {
      ConsoleResponse.success(procedence, respon);
      ServerResponse.success(req, res, respon, 201);
    })
    .catch(next);
});

export default router;
