import mosca from 'mosca';
import mqtt from 'mqtt';
import networkSuscriber from './components/subscriber/network';
import chalk from 'chalk';
import path from 'path';
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const broker = new mosca.Server({
  port: 1883
});
mqtt.connect('mqtt://localhost:1883');

broker.on('ready', () => {
  console.log(chalk.blue.underline.bgWhite('MQTT broker is ready!'));
});

broker.on('clientConnected', async (client: any) => {
  await networkSuscriber(client);
});
export default broker;
