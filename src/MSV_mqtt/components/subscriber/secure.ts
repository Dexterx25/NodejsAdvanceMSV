// eslint-disable-next-line prefer-const
let clients_id = ['nodeMcuAngieMarriaga'];

async function secure(client_id: number) {
  return new Promise((resolve, reject) => {
    if (clients_id.findIndex((e: any) => e == clients_id) == -1) {
      reject({ msg: 'Este cliente no está permitido!' });
    } else {
      resolve(client_id);
    }
  });
}

export default secure;
