import bcrypt from 'bcryptjs';
import controllerAuth from '../auth/index';
import {
  midlleHandleError,
  Validator
} from '../../../utils/actions/personas/index';

import * as auth from '../../../authorizations/index';
import userModel from './model';
import errors from '../../../utils/responses/errors';
export default function (injectedStore: any, injectedCache: any) {
  let cache = injectedCache;
  let store = injectedStore;

  if (!store) {
    store = require('../../../store/dummy');
  }
  if (!cache) {
    cache = require('../../../store/dummy');
  }
  const table = 'users';

  async function insert({ datas, type }: any) {
    return new Promise(async (resolve, reject) => {
      const responValidator = await Validator(datas);
      if (responValidator) {
        reject({ msg: responValidator });
        return false;
      }
      const data = new userModel(datas);
      try {
        const registerRespon: any = await store.upsert(table, { data, type });

        const responAuth = await controllerAuth.upsert(
          registerRespon,
          {
            encrypted_password: await bcrypt.hash(datas.password, 5),
            id: registerRespon.id,
            email: registerRespon.email
          },
          'users'
        );
        const { id, ...rest } = registerRespon;
        //Si quiero que logue automaticamente, descomento esto de acá abajo
        //const { email } = Object.assign(registerRespon, responAuth);
        // const res = await controllerAuth.insert(email, datas.password, table);
        console.log('RES CONTROLLER AUTH REGISTER---', registerRespon);
        resolve({ id });
      } catch (e) {
        await midlleHandleError(e, table, datas, resolve, reject);
      }
    });
  }

  async function list() {
    return new Promise(async (resolve, reject) => {
      console.log('LIST CONTROLLER');
      try {
        let users = await cache.list(table);
        if (!users) {
          users = await store.list(table);
          !users && reject({ msg: 'No hay usuarios' });
          cache.upsert(users, table);
        } else {
          console.log('datos traidos de la cache');
        }
        resolve(users);
      } catch (error) {
        reject(error);
        return false;
      }
    });
  }

  async function get(data: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const { filter } = data;
        const theData = { type: 'getUser', querys: filter };
        let user: any = await cache.get(filter.id, table);
        if (!user) {
          console.log('no estaba en cachee, buscando en db');
          user = await store.get(theData, table);
        }
        await cache.upsert(user, table);
        resolve(user);
      } catch (error) {
        console.log('this error--->', error);
        return reject({ msg: 'maybe the user dont exist or is not active' });
      }
    });
  }

  async function update({ datas, id, type }: any) {
    return new Promise(async (resolve, reject) => {
      const responValidator = await Validator(datas);
      if (responValidator) {
        reject({ msg: responValidator });
        return false;
      }
      const data = Object.assign(new userModel(datas), { id });

      try {
        const dataRespon = await store.upsert(table, { data, type });
        console.log('this is the dataRespon--->', dataRespon);
        resolve(dataRespon);
      } catch (error) {
        midlleHandleError(error, table, data, resolve, reject);
      }
    });
  }

  async function remove({ id, type }: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const dataRespon = await store.remove(table, { id, type });
        resolve(dataRespon);
      } catch (error) {
        midlleHandleError(error, table, { data: id }, resolve, reject);
      }
    });
  }

  async function patch({ id, type }: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = { id, active: true };
        const dataRespon = await store.patch(table, { data, type });
        resolve(dataRespon);
      } catch (error) {
        midlleHandleError(error, table, { data: id }, resolve, reject);
      }
    });
  }

  return {
    insert,
    list,
    get,
    update,
    remove,
    patch
  };
}
