import { config } from '../../configurations/index';
import * as thecache from '../../store/redis';
import * as storeRemote from '../../store/remote-postgres';
import * as storeLocal from '../../store/postgres';
let store: any, cache: any;

if (config.remoteDB === true) {
  store = storeRemote;
  cache = require('../../../store/remote-cache');
} else {
  store = storeLocal;
  cache = thecache;
}
import controller from './controller';
export default controller(store, cache);
