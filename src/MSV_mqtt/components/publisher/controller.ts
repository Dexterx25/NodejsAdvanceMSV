import pubClient from './network';
import { getCuriousFact } from '../../../MSV_Requests/index';
import messageModel from './model';
export function sendMQTTMessage({ message, user_id, topic }: messageModel) {
  return new Promise(async (resolve, reject) => {
    let data;
    if (!message) {
      const curiousCatFact = await getCuriousFact();
      data = { message: [curiousCatFact], user: [user_id] };
    } else {
      data = { message: [message], user: [user_id] };
    }
    console.log('this is the data to publish-->', data);
    pubClient.publish(topic, JSON.stringify(data), function (error: any) {
      if (error) {
        reject({ msg: error, statusCode: 400 });
      } else {
        resolve('MQTT Message succefull send');
      }
    });
  });
}
