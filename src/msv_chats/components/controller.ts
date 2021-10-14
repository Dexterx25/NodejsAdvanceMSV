import {
  midlleHandleError,
  Validator
} from '../../utils/actions/personas/index';
import * as auth from '../../authorizations/index';
import messageModel from './model';
import { decodeHeader } from '../../authorizations/index';
import { sendMQTTMessage } from '../../MSV_mqtt/components/publisher/controller';
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

  async function insert({ datas, type, token }: any) {
    const { id }: any = await decodeHeader({ token });
    console.log('this is the id decoded-->', id);
    return new Promise(async (resolve, reject) => {
      // eslint-disable-next-line prefer-const
      let data: messageModel = new messageModel(Object.assign(datas, { id }));
      try {
        const responChat: any = await sendMQTTMessage(data);
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
