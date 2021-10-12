/* eslint-disable @typescript-eslint/no-explicit-any */
import { Router, Request, Response, NextFunction } from 'express';
import * as Store from '../store/postgres';
import { ServerResponse, ConsoleResponse } from '../utils/responses/index';
const router: Router = Router();

router.get('/:table', list);
router.get('/:table/:id', get);
router.post('/:table', insert);
router.put('/:table', upsert);

async function list(req: Request, res: Response, next: NextFunction) {
  const datos: any = await Store.list(req.params.table);
  ServerResponse.success(req, res, datos, 200);
}

async function get(req: Request, res: Response, next: NextFunction) {
  const datos: any = await Store.get(req.params.table, req.params.id);
  ServerResponse.success(req, res, datos, 200);
}

async function insert(req: Request, res: Response, next: NextFunction) {
  const datos: any = await Store.insert(req.params.table, req.body);
  ServerResponse.success(req, res, datos, 200);
}

async function upsert(req: Request, res: Response, next: NextFunction) {
  const datos: any = await Store.upsert(req.params.table, req.body);
  ServerResponse.success(req, res, datos, 200);
}

export default router;
