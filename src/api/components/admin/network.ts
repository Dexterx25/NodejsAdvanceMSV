/* eslint-disable prefer-const */
import { Router, Request, Response, NextFunction } from 'express';
import controller from './index';
const {
  ServerResponse,
  ConsoleResponse
} = require('../../../utils/responses/index');
import secure from './secure';
const router: Router = Router();
router.post('/', upsert);
let procedence = 'ADMIN NETWORK';

async function upsert(req: Request, res: Response, next: NextFunction) {
  const datas: Record<string, unknown> = {
    type: 'email_register',
    datas: req.body
  };
  console.log('body--->', req.body);
  await controller
    .insert(datas)
    .then((respon: any) => {
      ConsoleResponse.success(procedence, respon);
      ServerResponse.success(req, res, respon, 200);
    })
    .catch((err) => {
      ServerResponse.error(req, res, err, 400);
    });
}

export default router;
