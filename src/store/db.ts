import { Pool } from 'pg';
import mongoose from 'mongoose';
import chalk from 'chalk';
import { ServerResponse, ConsoleResponse } from '../utils/responses/index';
import { config } from '../configurations/index';
import path from 'path';
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const { database }: any = config;

export let pool: Pool;
if (config.usingDb.postgres === true) {
  pool = new Pool(database);
  console.log(chalk.blue.underline.bgWhite('Postgres service is running'));
}
export let mongo: Promise<typeof mongoose>;

if (config.usingDb.mongoDB === true) {
  mongo = mongoose.connect(`${config.database.mongoose}`);
}
// eslint-disable-next-line prettier/prettier
mongoose.connection.on('open', _ => console.log(chalk.blue.underline.bgWhite('MongoDb database is connected to-->', config.database.mongoose )))
// eslint-disable-next-line prettier/prettier
mongoose.connection.on('error', e => console.log(chalk.red.bgWhite('THERE ARE AN ERROR CONNECTION MONGODB--->', e)))
