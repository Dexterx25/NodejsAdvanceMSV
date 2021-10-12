/* eslint-disable prefer-const */
import express, { Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import errors from '../utils/responses/errors';
let { config } = require('../configurations/index');
import chalk from 'chalk';
const app: Application = express();
import path from 'path';
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

import user from './components/users/network';
import admin from './components/admin/network';
import auth from './components/auth/network';
app.use('/users', user);
app.use('/admins', admin);
app.use('/authorization', auth);
app.use(errors);

app.listen(config.api.port, () => {
  // eslint-disable-next-line prettier/prettier
  console.log(chalk.blue.underline.bgWhite(`Api Runing into ${config.api.host}:${config.api.port}`));
});
