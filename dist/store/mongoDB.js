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
const chalk = require('chalk');
require('dotenv').config();
const index_1 = require("../utils/mongoDB/index");
// eslint-disable-next-line prefer-const
let procedence = '[STORE - MONGODB]';
function list(table) {
    console.log('listing--->', table);
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const listDatasReturn = yield (0, index_1.listDatas)(table, table);
            if (!listDatasReturn) {
                reject({ msg: ` No hay ${table}`, statusCode: 400 });
                return false;
            }
            else {
                resolve(listDatasReturn);
            }
        }
        catch (error) {
            reject();
            return false;
        }
    }));
}
exports.list = list;
function get({ type, querys }, table) {
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        const dataGet = yield (0, index_1.getData)(querys, type);
        if (!dataGet) {
            reject();
            return false;
        }
        else {
            resolve(dataGet);
        }
    }));
}
exports.get = get;
function insert(table, { data, type }) {
    return __awaiter(this, void 0, void 0, function* () {
        console.warn('datas to insert --->', data, type, table);
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const dataFormated = yield (0, index_1.insertTionDatas)(data, type);
            dataFormated.save((err, document) => {
                if (err)
                    return reject(err);
                resolve(document);
            });
        }));
    });
}
exports.insert = insert;
function update(table, { data, type }) {
    console.log('Updataaaa IN FUNCTION UPDATE-->', table, data, type);
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        try {
            const dataUpdateFormated = yield (0, index_1.updateDatas)(data, type);
            console.log('this is the dataUODATE FORMTATED--->', dataUpdateFormated);
            resolve(dataUpdateFormated);
        }
        catch (error) {
            reject(error);
            return false;
        }
    }));
}
exports.update = update;
function upsert(table, { data, type }) {
    console.warn('datas upsert--->', data);
    if (data && (data.id || data._id)) {
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
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            let dataResponRelativeQuery;
            if (joins.length) {
                console.log('One Query');
                try {
                    dataResponRelativeQuery = yield (0, index_1.queryDatas)(table, typequery, joins);
                    console.log('this is the RELATION QUERY DATAS--->', dataResponRelativeQuery);
                    resolve(dataResponRelativeQuery);
                }
                catch (error) {
                    reject(error);
                }
            }
            else {
                console.log('multiple query');
                try {
                    dataResponRelativeQuery = yield (0, index_1.queryDatas)(table, typequery, null);
                    console.log('this is the RELATION QUERY DATAS MULTIPLES--->', dataResponRelativeQuery);
                    resolve(dataResponRelativeQuery);
                }
                catch (error) {
                    reject(error);
                }
            }
        }));
    });
}
exports.query = query;
function remove(table, { id, type }) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('deleteeee--->', id, type);
        return new Promise((resolve, reject) => {
            resolve('xd');
        });
    });
}
exports.remove = remove;
function patch(table, { data, type }) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('deleteeee--->', data, type);
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const patchDataReturn = yield (0, index_1.patchDatas)(data, type);
                resolve(patchDataReturn);
            }
            catch (e) {
                reject(e);
            }
        }));
    });
}
exports.patch = patch;
//# sourceMappingURL=mongoDB.js.map