const { config } = require('../../../configurations/index');
import * as thecache from '../../../store/redis';
import * as storeRemotePG from '../../../store/remote-postgres';
import * as storeLocalPG from '../../../store/postgres';
import * as storeLocalMongoDB from '../../../store/mongoDB';
let store: any, cache: any;

if (config.remoteDB === true) {
  store = storeRemotePG;
  cache = require('../../../store/remote-cache');
} else {
  if (config.usingDb.postgres === true) {
    store = storeLocalPG;
    cache = thecache;
  } else {
    store = storeLocalMongoDB;
    cache = thecache;
  }
}

import controller from './controller';
export default controller(store);
