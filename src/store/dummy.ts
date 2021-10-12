/* eslint-disable prefer-const */
const db: any = {
  user: [{ id: '1', name: 'Carlos' }]
};

async function list(tabla: string) {
  return db[tabla] || [];
}

async function get(tabla: string, id: any) {
  let col: any[] = await list(tabla);
  return col.filter((item) => item.id === id)[0] || null;
}

async function upsert(tabla: string, data: any) {
  if (!db[tabla]) {
    db[tabla] = [];
  }

  db[tabla].push(data);

  console.log(db);
}

async function remove(tabla: string, id: any) {
  return true;
}

async function query(tabla: string, q: any) {
  let col: any[] = await list(tabla);
  let keys = Object.keys(q);
  let key = keys[0];

  return col.filter((item) => item[key] === q[key])[0] || null;
}

export default {
  list,
  get,
  upsert,
  remove,
  query
};
