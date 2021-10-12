import mqtt from 'mqtt';
import broker from '../../mqtt';
import secure from './secure';
import controller from './controller';
const sub = mqtt.connect('mqtt://localhost:1883');

export default function (client: any) {
  sub.on('connect', () => {
    sub.subscribe('outTopic');
    sub.subscribe('temp');
    sub.subscribe('hum');
    sub.subscribe('co2');
    sub.subscribe('pm2_5');
    sub.subscribe('pm_10');
    sub.subscribe('nh3');
    sub.subscribe('co');
    sub.subscribe('latitude');
    sub.subscribe('longitude');
    secure(client.id)
      .then((client_id: any) => {
        sub.on('message', (topic, message) => {
          console.warn('THIS IS TEH Message-->', topic, message.toString());
          const data = message.toString();
          //   store.upsert(data, table, topic)

          /*
                        @ topics
                      */
          controller().create(client_id, topic, message.toString());
        });
      })
      .catch((error) => {
        console.log('suscriberPoolConection ERROR-->', error);
      });
  });
}
