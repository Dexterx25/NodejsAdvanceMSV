import {
  midlleHandleError,
  Validator
} from '../../utils/actions/personas/index';
import * as auth from '../../authorizations/index';
import messageModel from './model';
export default function (injectedStore: any, injectedCache: any) {
  let cache = injectedCache;
  let store = injectedStore;

  if (!store) {
    store = require('../../../store/dummy');
  }
  if (!cache) {
    cache = require('../../../store/dummy');
  }
  // eslint-disable-next-line prefer-const
  let table = 'messages';

  async function insert({ datas, type }: any) {
    return new Promise(async (resolve, reject) => {
      const responValidator = await Validator(datas);
      if (responValidator) {
        reject({ msg: responValidator });
        return false;
      }
      // eslint-disable-next-line prefer-const
      let data = new messageModel(datas);
      try {
        const responChat: any = await store.upsert(table, { data, type });
        resolve(responChat);
      } catch (e) {
        await midlleHandleError(e, table, datas, resolve, reject);
      }
    });
  }

  async function list() {
    return new Promise(async (resolve, reject) => {
      console.log('LIST CONTROLLER Messages');
      let messages = await cache.list(table);
      if (!messages) {
        messages = await store.list(table);
        cache.upsert(messages, table);
      } else {
        console.log('datos traidos de la cache');
      }
      resolve(messages);
    });
  }

  return {
    insert,
    list
  };
}
