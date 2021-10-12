import remote from './remote';
import { config } from '../configurations/index';
export default new (remote as any)(config.MSV_PSQL.host, config.MSV_PSQL.port);
