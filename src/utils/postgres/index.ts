/* eslint-disable no-var */
/* eslint-disable prefer-const */
export const insertTionDatas = (data: any, type: string) => {
  console.log('insertionDatas Model--->', data, type);
  let $data: any = {};
  for (var k in data) {
    if (data[k]) {
      $data[k] = data[k];
    }
  }
  let $keys;
  let $values;
  switch (type) {
    case 'email_register':
    case 'facebook_register':
    case 'ios_register':
    case 'insert_auth_users':
      $keys = Object.keys($data).toString().replace('[', '').replace(']', '');
      $values = `${Object.values($data)
        .map((e) => `'${e}'`)
        .toString()}`;
      console.log('values intoActions-->', $values);
      return {
        keys: $keys,
        values: $values
      };
      break;

    default:
      break;
  }
};

export const queryDatas = (table: string, typequery: any, joins: any) => {
  console.log('queryAction!', table, typequery, joins);
  let query: any = Object.keys(typequery);
  let queryValues: any = Object.values(typequery);
  let theJoinQuery = '';
  let theQuery = '';
  switch (table) {
    case 'authentications':
      if (joins) {
        theJoinQuery = `INNER JOIN ${joins[0]} ON ${table}.${query[0]} = ${joins[0]}.${query[0]}`;
      }
      theQuery = `WHERE ${table}.${query[0]} = '${queryValues[0]}'`;
      console.log('datasFilter--->', theJoinQuery, 'query-->', theQuery);
      return {
        theJoinQuery,
        theQuery
      };
      break;

    default:
      break;
  }
};
export const updateDatas = (data: any, type: string) => {
  console.log('Updata Mock', data, type);
  let $data: any = {};
  for (var k in data) {
    if (data[k]) {
      $data[k] = data[k];
    }
  }
  console.log('DATASSSS_-', $data);
  let keysAndValuesToUpdate: any[] = [];
  let conditions: any[] = [];
  switch (type) {
    case 'user_update':
    case 'update_user_forAdmin':
      console.log('entró a update', data);
      for (let i = 0; i < Object.keys($data).length; i++) {
        const dataKeys: any = Object.keys($data)[i];
        const dataValues: any = Object.values($data)[i];
        keysAndValuesToUpdate.push(` ${dataKeys} = '${dataValues.toString()}'`);
      }
      console.log('Put OUT-->', keysAndValuesToUpdate, conditions);
      conditions.push(` WHERE id = '${data.id.toString()}'`);
      console.log('coditions', conditions);
      return {
        keysAndValuesToUpdate: keysAndValuesToUpdate
          .toString()
          .replace('[', '')
          .replace(']', ''),
        conditions: conditions.toString().replace('[', '').replace(']', '')
      };
      break;
    case 'update_auth_users':
      console.log('entró a update', data);
      for (let i = 0; i < Object.keys($data).length; i++) {
        const dataKeys: any = Object.keys($data)[i];
        const dataValues: any = Object.values($data)[i];
        keysAndValuesToUpdate.push(` ${dataKeys} = '${dataValues.toString()}'`);
      }
      console.log('Put OUT-->', keysAndValuesToUpdate, conditions);
      conditions.push(` WHERE user_id = '${data.id.toString()}'`);
      console.log('coditions', conditions);
      return {
        keysAndValuesToUpdate: keysAndValuesToUpdate
          .toString()
          .replace('[', '')
          .replace(']', ''),
        conditions: conditions.toString().replace('[', '').replace(']', '')
      };
      break;
    case 'logout_auth_users':
      console.log('entró a logout', data);
      for (let i = 0; i < Object.keys($data).length; i++) {
        const dataKeys: any = Object.keys($data)[i];
        const dataValues: any = Object.values($data)[i];
        keysAndValuesToUpdate.push(`token = ''`);
      }
      conditions.push(` WHERE user_id = '${data.id.toString()}'`);
      console.log('coditions', conditions);
      return {
        keysAndValuesToUpdate: keysAndValuesToUpdate
          .toString()
          .replace('[', '')
          .replace(']', ''),
        conditions: conditions.toString().replace('[', '').replace(']', '')
      };
    default:
      break;
  }
};

export const getData = (querys: any, type: string) => {
  let $data: any = {};
  for (var k in querys) {
    if (querys[k] != null) $data[k] = querys[k];
  }
  let theQuery: any[] = [];
  switch (type) {
    case 'getUser':
      for (let i = 0; i < Object.keys($data).length; i++) {
        if (Object.keys($data).length <= 1) {
          console.log('entra aqui-->');
          theQuery.push(
            `WHERE ${Object.keys($data)[i]} = '${
              Object.values($data)[i]
            }' and active = 'TRUE'`
          );
        }
      }
      return {
        theQuery: theQuery.toString().replace('[', '').replace(']', '')
      };

    default:
      break;
  }
};

export const patchDatas = (data: any, type: string) => {
  console.log('Updata Mock', data, type);
  let $data: any = {};
  for (var k in data) {
    if (data[k]) {
      $data[k] = data[k];
    }
  }
  console.log('DATASSSS_-', $data);
  let keysAndValuesToUpdate: any[] = [];
  let conditions: any[] = [];
  switch (type) {
    case 'user_patch_active':
      for (let i = 0; i < Object.keys($data).length; i++) {
        const dataKeys: any = Object.keys($data)[i];
        const dataValues: any = Object.values($data)[i];
        keysAndValuesToUpdate.push(` ${dataKeys} = '${dataValues.toString()}'`);
      }
      console.log('patch OUT-->', keysAndValuesToUpdate, conditions);
      conditions.push(` WHERE id = '${data.id.toString()}'`);
      console.log('coditions patch', conditions);
      return {
        keysAndValuesToUpdate: keysAndValuesToUpdate
          .toString()
          .replace('[', '')
          .replace(']', ''),
        conditions: conditions.toString().replace('[', '').replace(']', '')
      };
      break;

    default:
      break;
  }
};
