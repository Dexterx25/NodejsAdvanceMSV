/* eslint-disable prefer-const */
import { Router, Request, Response, NextFunction } from 'express';
import controller from './index';
import { ServerResponse, ConsoleResponse } from '../../utils/responses';
import secure from './secure';
const router: Router = Router();

import multer from 'multer';
import mimeTypes from 'mime-types';

const storage = multer.diskStorage({
  destination: 'public/photos',
  filename: function (req: Request, file: any, cb: any) {
    cb('', Date.now() + '.' + file.originalname);
  }
});

const upload = multer({
  storage: storage
});

router.post('/send', secure('send'), upsert);
router.get('/', secure('list'), list);

let procedence = 'Messages NETWORK';

async function upsert(req: Request, res: Response, next: NextFunction) {
  const datas: Record<string, unknown> = {
    type: 'send_message',
    datas: req.body,
    token: req.headers.authorization,
    files: req.files
  };
  console.log('UPSERTTTTT message', datas);

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

async function list(req: Request, res: Response, next: NextFunction) {
  await controller
    .list()
    .then((respon: any) => {
      ServerResponse.success(req, res, respon, 200);
    })
    .catch((err) => {
      ServerResponse.error(req, res, err, 400);
    });
}

export default router;
