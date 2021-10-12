/* eslint-disable prefer-const */
import { pool } from './db';
const chalk = require('chalk');
require('dotenv').config();
import {
  insertTionDatas,
  queryDatas,
  updateDatas,
  getData,
  patchDatas
} from '../utils/postgres/index';
import { ConsoleResponse } from '../utils/responses/index';

let procedence = '[STORE - POSTGRES]';

export function list(table: string) {
  console.log('listing--->', table);
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM ${table} `, (err: any, result: any) => {
      if (err) return reject(err);
      console.log('resut--->', result.rows);
      resolve(result.rows);
    });
  });
}

export function get({ type, querys }: any, table: string) {
  return new Promise(async (resolve, reject) => {
    const { theQuery }: any = await getData(querys, type);
    console.log('TheQuery--->', theQuery, 'tableee--->', table);
    pool.query(
      `SELECT * FROM ${table} ${theQuery}`,
      (err: any, result: any) => {
        if (err) {
          console.log('error Get--->', err.stack);
          reject(err);
        } else {
          if (result.rows.length) {
            resolve(result.rows[0]);
          } else {
            reject({ msg: 'not result' });
          }
        }
      }
    );
  });
}

export async function insert(table: string, { data, type }: any) {
  console.warn('datas to insert --->', data, type, table);
  return new Promise(async (resolve, reject) => {
    const { keys, values }: any = await insertTionDatas(data, type);
    console.log('keys-->', keys, 'values--->', values);
    pool.query(
      `INSERT INTO ${table}(${keys}) values(${values}) RETURNING *`,
      (err: any, result: any) => {
        if (err) {
          console.log('this is the error INSERT POSTGRES---->', err);
          reject(Object.assign(err, { procedence }));
        } else {
          console.log(
            chalk.redBright(`succefull ${type}!`),
            result.rows[0],
            '<----hasta aqui'
          );
          resolve(result.rows[0]);
        }
      }
    );
  });
}

export function update(table: string, { data, type }: any) {
  console.log('Updataaaa IN FUNCTION UPDATE-->', table, data, type);
  return new Promise(async (resolve, reject) => {
    const { keysAndValuesToUpdate, conditions }: any = await updateDatas(
      data,
      type
    );
    console.log('Update Key after--->', keysAndValuesToUpdate, conditions);
    pool.query(
      `UPDATE ${table} SET ${keysAndValuesToUpdate} ${conditions} RETURNING *`,
      (err: any, result: any) => {
        if (err) {
          console.log('error Update--->', err.stack);
          reject(err);
        } else {
          console.log(chalk.redBright(`succefull ${type}!`), result.rows[0]);
          resolve(result.rows[0]);
        }
      }
    );
  });
}

export function upsert(table: string, { data, type }: any) {
  console.warn('datas upsert--->', data.names);
  if (data && data.id) {
    console.log('Vamo Update', table, data);
    return update(table, { data, type });
  } else {
    console.log('Vamo Insert-->', table, data);
    return insert(table, { data, type });
  }
}

export async function query(table: string, typequery: any, joins: any) {
  console.log(chalk.redBright('comming to query--->'), table, typequery, joins);
  let joinQuery = '';
  let query = '';
  if (joins.length) {
    console.log('One Query');
    const { theJoinQuery, theQuery }: any = await queryDatas(
      table,
      typequery,
      joins
    );
    joinQuery = theJoinQuery;
    query = theQuery;
  } else {
    console.log('multiple query');
    const { theQuery }: any = await queryDatas(table, typequery, null);
    query = theQuery;
  }
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM ${table} ${joinQuery}  ${query}`,
      (err: any, res: any) => {
        if (err) return reject(err);
        console.log('RESPONSE QUERY DATABASE', res.rows[0]);
        resolve(res.rows[0]);
      }
    );
  });
}

export async function remove(table: string, { id, type }: any) {
  console.log('deleteeee--->', id, type);
  return new Promise((resolve, reject) => {
    pool.query(
      `DELETE FROM ${table} CASCADE where id = '${id}' RETURNING *`,
      (err: any, result: any) => {
        if (err) {
          console.log('error delete--->', err.stack);
          reject(err);
        } else {
          console.log(chalk.redBright(`succefull ${type}!`), result.rows[0]);
          resolve(result.rows[0]);
        }
      }
    );
  });
}

export async function patch(table: string, { data, type }: any) {
  console.log('deleteeee--->', data, type);
  return new Promise(async (resolve, reject) => {
    const { keysAndValuesToUpdate, conditions }: any = await patchDatas(
      data,
      type
    );
    console.log('Update Key after--->', keysAndValuesToUpdate, conditions);
    pool.query(
      `UPDATE ${table} SET ${keysAndValuesToUpdate} ${conditions} RETURNING *`,
      (err: any, result: any) => {
        if (err) {
          console.log('error delete--->', err.stack);
          reject(err);
        } else {
          console.log(chalk.redBright(`succefull ${type}!`), result.rows[0]);
          resolve(result.rows[0]);
        }
      }
    );
  });
}
