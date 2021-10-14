import jwt from 'jsonwebtoken';
import { config } from '../configurations/index';
import errors from '../utils/responses/errors';
import { NextFunction, Request, Response } from 'express';

const SECRET = config.jwt.secret;

export async function sign(data: any) {
  return await jwt.sign(data, SECRET);
}

export async function verify(token: any) {
  return await jwt.verify(token, SECRET);
}

export const cheak: any = {
  own: async function (req: Request, res: Response, owner: any) {
    const decoded: any = await decodeHeader(req);

    if (decoded.id !== owner) {
      return { error: 'Not is Owner', statusCode: 401 };
    }
  },

  logged: async function (req: Request, res: Response, next: NextFunction) {
    try {
      const decoded = await decodeHeader(req);
      return { token_decoded: decoded };
    } catch (error: any) {
      await errors(
        Object.assign({ msg: 'Token No Válido' }, { statusCode: 403 }),
        req,
        res
      );
    }
  },

  loggedAdmin: async function (
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const decoded: any = await decodeHeader(req);
      if (decoded.type_user_id !== '2') {
        await errors(
          // eslint-disable-next-line prettier/prettier
          Object.assign({msg:'This token doesnt belong to an admin!'}, {statusCode:401}), req, res);
      } else {
        return { token_decoded: decoded };
      }
    } catch (error: any) {
      // eslint-disable-next-line prettier/prettier
      await errors(Object.assign({msg:'Token No Válido'}, {statusCode:403}), req, res);
    }
  }
};

export async function getToken(auth: any) {
  if (!auth) {
    console.log('Noy bring token');
    return { error: 'Don`t bring Token', statusCode: 401 };
  }

  if (auth.indexOf('Bearer ') === -1) {
    console.log('invalid Format');
    return { error: 'Formato inválido', statusCode: 401 };
  }

  const token = auth.replace('Bearer ', '');

  return token;
}

export async function decodeHeader(req: any) {
  const { headers, token } = req;
  console.log('TOKEN PASADO POR AQUIII-->', token);
  const authorization = !headers ? token : headers.authorization || '';
  const thetoken = await getToken(authorization);
  const decoded = await verify(thetoken);

  req.user = decoded;

  return decoded;
}
