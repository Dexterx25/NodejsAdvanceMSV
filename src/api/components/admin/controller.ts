/* eslint-disable prefer-const */
import bcrypt from 'bcryptjs';
import controllerAuth from '../auth/index';
import {
  midlleHandleError,
  Validator
} from '../../../utils/actions/admins/index';
import mailValidator from './mailValidator';
import userModel from './model';

export default function (injectedStore: any, injectedCache: any) {
  let cache = injectedCache;
  let store = injectedStore;

  if (!store) {
    store = require('../../../store/dummy');
  }
  if (!cache) {
    cache = require('../../../store/dummy');
  }
  let table = 'users';
  let procedence = '[USER CONTROLLER]';

  async function insert({ datas, type }: any) {
    return new Promise(async (resolve, reject) => {
      const responValidator = await Validator(datas);
      if (responValidator) {
        reject({ msg: responValidator });
        return false;
      }
      let data = new userModel(datas);
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

        const { email } = Object.assign(registerRespon, responAuth);
        const res = await controllerAuth.insert(email, datas.password, table);
        console.log('RES CONTROLLER AUTH---', res);
        resolve(res);
      } catch (e) {
        console.log('this is the error create userAdmin');
        await midlleHandleError(e, table, datas, resolve, reject);
      }
    });
  }

  async function get(data: any) {
    return new Promise(async (resolve, reject) => {
      const { filter } = data;
      const theData = { type: 'getUser', querys: filter };
      console.log('the filter--->', filter);
      let user = await cache.get(filter.id, table);
      if (!user) {
        console.log('no estaba en cachee, buscando en db');
        user = await store.get(theData, table);
        cache.upsert(user, table);
      }
      resolve(user);
    });
  }
  return {
    insert,
    get
  };
}
