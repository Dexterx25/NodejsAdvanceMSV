/* eslint-disable prefer-const */
export default function () {
  let table = 'telemetries';
  const create = async (client_id: number, topic: any, message: string) => {
    console.log('THIS IS DATASSSS--->', client_id, topic, message);
    //await store.writePoints({ topic, message, table });
  };
  return {
    create: create
  };
}
