const chalk = require('chalk');
require('dotenv').config();
import {
  insertTionDatas,
  queryDatas,
  updateDatas,
  getData,
  patchDatas,
  listDatas
} from '../utils/mongoDB/index';

// eslint-disable-next-line prefer-const
let procedence = '[STORE - MONGODB]';

export function list(table: string) {
  console.log('listing--->', table);
  return new Promise(async (resolve, reject) => {
    try {
      const listDatasReturn: any = await listDatas(table, table);
      if (!listDatasReturn) {
        reject({ msg: ` No hay ${table}`, statusCode: 400 });
        return false;
      } else {
        resolve(listDatasReturn);
      }
    } catch (error) {
      reject();
      return false;
    }
  });
}

export function get({ type, querys }: any, table: string) {
  return new Promise(async (resolve, reject) => {
    const dataGet: any = await getData(querys, type);
    if (!dataGet) {
      reject();
      return false;
    } else {
      resolve(dataGet);
    }
  });
}

export async function insert(table: string, { data, type }: any) {
  console.warn('datas to insert --->', data, type, table);
  return new Promise(async (resolve, reject) => {
    const dataFormated: any = await insertTionDatas(data, type);
    dataFormated.save((err: any, document: any) => {
      if (err) return reject(err);
      resolve(document);
    });
  });
}

export function update(table: string, { data, type }: any) {
  console.log('Updataaaa IN FUNCTION UPDATE-->', table, data, type);
  return new Promise(async (resolve, reject) => {
    try {
      const dataUpdateFormated: any = await updateDatas(data, type);
      console.log('this is the dataUODATE FORMTATED--->', dataUpdateFormated);
      resolve(dataUpdateFormated);
    } catch (error) {
      reject(error);
      return false;
    }
  });
}

export function upsert(table: string, { data, type }: any) {
  console.warn('datas upsert--->', data);

  if (data && (data.id || data._id)) {
    console.log('Vamo Update', table, data);
    return update(table, { data, type });
  } else {
    console.log('Vamo Insert-->', table, data);
    return insert(table, { data, type });
  }
}

export async function query(table: string, typequery: any, joins: any) {
  console.log(chalk.redBright('comming to query--->'), table, typequery, joins);
  return new Promise(async (resolve, reject) => {
    let dataResponRelativeQuery;
    if (joins.length) {
      console.log('One Query');
      try {
        dataResponRelativeQuery = await queryDatas(table, typequery, joins);
        console.log(
          'this is the RELATION QUERY DATAS--->',
          dataResponRelativeQuery
        );
        resolve(dataResponRelativeQuery);
      } catch (error) {
        reject(error);
      }
    } else {
      console.log('multiple query');
      try {
        dataResponRelativeQuery = await queryDatas(table, typequery, null);
        console.log(
          'this is the RELATION QUERY DATAS MULTIPLES--->',
          dataResponRelativeQuery
        );
        resolve(dataResponRelativeQuery);
      } catch (error) {
        reject(error);
      }
    }
  });
}

export async function remove(table: string, { id, type }: any) {
  console.log('deleteeee--->', id, type);
  return new Promise((resolve, reject) => {
    resolve('xd');
  });
}

export async function patch(table: string, { data, type }: any) {
  console.log('deleteeee--->', data, type);
  return new Promise(async (resolve, reject) => {
    try {
      const patchDataReturn: any = await patchDatas(data, type);
      resolve(patchDataReturn);
    } catch (e: any) {
      reject(e);
    }
  });
}
