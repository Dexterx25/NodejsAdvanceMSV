import express, { Application } from 'express';
import chalk from 'chalk';
const app: Application = express();
const server = require('http').Server(app);
import bodyParser from 'body-parser';
import path from 'path';
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
app.use(bodyParser.json());

import socket from './socket';
socket.connect(server);
app.use(bodyParser.urlencoded({ extended: false }));

import { config } from '../configurations/index';
import chats from './components/network';
import errors from '../utils/responses/errors';
app.use('/messages', chats);
app.use(errors);

server.listen(config.chatsServices.port, () => {
  // eslint-disable-next-line prettier/prettier
  console.log(chalk.blue.underline.bgWhite(`Chats service running in localhost:${config.chatsServices.port}`) )
});
