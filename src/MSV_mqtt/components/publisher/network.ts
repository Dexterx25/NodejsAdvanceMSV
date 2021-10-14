/* eslint-disable prefer-const */
import mqtt from 'mqtt';
import { config } from '../../../configurations/index';
const clientId = `mqtt_JuanDavidBlancoVergara`;
const connectUrl = `mqtt://${config.mqtt_config.host}:${config.mqtt_config.port}`;
console.log('MQTT URL--->', connectUrl);
const pubClient = mqtt.connect(connectUrl, {
  clientId
});

export default pubClient;
