"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patch = exports.remove = exports.query = exports.upsert = exports.update = exports.insert = exports.get = exports.list = void 0;
/* eslint-disable prefer-const */
const db_1 = require("./db");
const chalk = require('chalk');
require('dotenv').config();
const index_1 = require("../utils/postgres/index");
let procedence = '[STORE - POSTGRES]';
function list(table) {
    console.log('listing--->', table);
    return new Promise((resolve, reject) => {
        db_1.pool.query(`SELECT * FROM ${table} `, (err, result) => {
            if (err)
                return reject(err);
            console.log('resut--->', result.rows);
            resolve(result.rows);
        });
    });
}
exports.list = list;
function get({ type, querys }, table) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        const { theQuery } = yield (0, index_1.getData)(querys, type);
        console.log('TheQuery--->', theQuery, 'tableee--->', table);
        db_1.pool.query(`SELECT * FROM ${table} ${theQuery}`, (err, result) => {
            if (err) {
                console.log('error Get--->', err.stack);
                reject(err);
            }
            else {
                if (result.rows.length) {
                    resolve(result.rows[0]);
                }
                else {
                    reject({ msg: 'not result' });
                }
            }
        });
    }));
}
exports.get = get;
function insert(table, { data, type }) {
    return __awaiter(this, void 0, void 0, function* () {
        console.warn('datas to insert --->', data, type, table);
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const { keys, values } = yield (0, index_1.insertTionDatas)(data, type);
            console.log('keys-->', keys, 'values--->', values);
            db_1.pool.query(`INSERT INTO ${table}(${keys}) values(${values}) RETURNING *`, (err, result) => {
                if (err) {
                    console.log('this is the error INSERT POSTGRES---->', err);
                    reject(Object.assign(err, { procedence }));
                }
                else {
                    console.log(chalk.redBright(`succefull ${type}!`), result.rows[0], '<----hasta aqui');
                    resolve(result.rows[0]);
                }
            });
        }));
    });
}
exports.insert = insert;
function update(table, { data, type }) {
    console.log('Updataaaa IN FUNCTION UPDATE-->', table, data, type);
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        const { keysAndValuesToUpdate, conditions } = yield (0, index_1.updateDatas)(data, type);
        console.log('Update Key after--->', keysAndValuesToUpdate, conditions);
        db_1.pool.query(`UPDATE ${table} SET ${keysAndValuesToUpdate} ${conditions} RETURNING *`, (err, result) => {
            if (err) {
                console.log('error Update--->', err.stack);
                reject(err);
            }
            else {
                console.log(chalk.redBright(`succefull ${type}!`), result.rows[0]);
                resolve(result.rows[0]);
            }
        });
    }));
}
exports.update = update;
function upsert(table, { data, type }) {
    console.warn('datas upsert--->', data.names);
    if (data && data.id) {
        console.log('Vamo Update', table, data);
        return update(table, { data, type });
    }
    else {
        console.log('Vamo Insert-->', table, data);
        return insert(table, { data, type });
    }
}
exports.upsert = upsert;
function query(table, typequery, joins) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(chalk.redBright('comming to query--->'), table, typequery, joins);
        let joinQuery = '';
        let query = '';
        if (joins.length) {
            console.log('One Query');
            const { theJoinQuery, theQuery } = yield (0, index_1.queryDatas)(table, typequery, joins);
            joinQuery = theJoinQuery;
            query = theQuery;
        }
        else {
            console.log('multiple query');
            const { theQuery } = yield (0, index_1.queryDatas)(table, typequery, null);
            query = theQuery;
        }
        return new Promise((resolve, reject) => {
            db_1.pool.query(`SELECT * FROM ${table} ${joinQuery}  ${query}`, (err, res) => {
                if (err)
                    return reject(err);
                console.log('RESPONSE QUERY DATABASE', res.rows[0]);
                resolve(res.rows[0]);
            });
        });
    });
}
exports.query = query;
function remove(table, { id, type }) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('deleteeee--->', id, type);
        return new Promise((resolve, reject) => {
            db_1.pool.query(`DELETE FROM ${table} CASCADE where id = '${id}' RETURNING *`, (err, result) => {
                if (err) {
                    console.log('error delete--->', err.stack);
                    reject(err);
                }
                else {
                    console.log(chalk.redBright(`succefull ${type}!`), result.rows[0]);
                    resolve(result.rows[0]);
                }
            });
        });
    });
}
exports.remove = remove;
function patch(table, { data, type }) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('deleteeee--->', data, type);
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const { keysAndValuesToUpdate, conditions } = yield (0, index_1.patchDatas)(data, type);
            console.log('Update Key after--->', keysAndValuesToUpdate, conditions);
            db_1.pool.query(`UPDATE ${table} SET ${keysAndValuesToUpdate} ${conditions} RETURNING *`, (err, result) => {
                if (err) {
                    console.log('error delete--->', err.stack);
                    reject(err);
                }
                else {
                    console.log(chalk.redBright(`succefull ${type}!`), result.rows[0]);
                    resolve(result.rows[0]);
                }
            });
        }));
    });
}
exports.patch = patch;
//# sourceMappingURL=postgres.js.map