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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.patchDatas = exports.listDatas = exports.getData = exports.updateDatas = exports.queryDatas = exports.insertTionDatas = void 0;
/* eslint-disable no-var */
/* eslint-disable prefer-const */
require("../../store/db");
const index_1 = require("./schemas/index");
const insertTionDatas = (data, type) => {
    let $data = {};
    for (var k in data) {
        if (data[k]) {
            $data[k] = data[k];
        }
    }
    switch (type) {
        case 'email_register':
        case 'facebook_register':
        case 'ios_register':
            const userCreate = new index_1.UserMongoModel($data);
            return userCreate;
        case 'insert_auth_users':
            const authCreated = new index_1.AuthMongoModel($data);
            return authCreated;
            break;
        default:
            break;
    }
};
exports.insertTionDatas = insertTionDatas;
const queryDatas = (table, typequery, joins) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('queryAction!', table, typequery, joins);
    let query = Object.keys(typequery);
    let queryValues = Object.values(typequery);
    let theJoinQuery = '';
    let theQuery = '';
    switch (table) {
        case 'authentications':
            // if (joins) {
            //   theJoinQuery = `INNER JOIN ${joins[0]} ON ${table}.${query[0]} = ${joins[0]}.${query[0]}`;
            // }
            // theQuery = `WHERE ${table}.${query[0]} = '${queryValues[0]}'`;
            // console.log('datasFilter--->', theJoinQuery, 'query-->', theQuery);
            const _a = yield (yield index_1.AuthMongoModel.findOne(typequery))
                ._doc, { _id } = _a, res = __rest(_a, ["_id"]);
            return Object.assign(res, { id: _id.toString() });
            break;
        default:
            break;
    }
});
exports.queryDatas = queryDatas;
const updateDatas = (data, type) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Updata Mock', data, type);
    let $data = {};
    for (var k in data) {
        if (data[k]) {
            $data[k] = data[k];
        }
    }
    let { id } = $data, dataToUpdate = __rest($data, ["id"]);
    console.log('this is the IDDDDDD--->', id, dataToUpdate);
    switch (type) {
        case 'user_update':
        case 'update_user_forAdmin':
            return yield index_1.UserMongoModel.findOneAndUpdate({ _id: id }, dataToUpdate, {
                new: true
            });
        case 'update_auth_users':
            return yield index_1.AuthMongoModel.findOneAndUpdate({ _id: id }, dataToUpdate, {
                new: true
            });
        case 'logout_auth_users':
            return yield index_1.AuthMongoModel.findOneAndUpdate({ _id: id }, { token: '' }, {
                new: true
            });
        default:
            break;
    }
});
exports.updateDatas = updateDatas;
const getData = (querys, type) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('this is the querys GET--->', querys);
    let $data = {};
    for (var k in querys) {
        if (querys[k] != null)
            $data[k] = querys[k];
    }
    console.log('this is the dataFormating GET--->', $data);
    let { id } = $data, rest = __rest($data, ["id"]);
    switch (type) {
        case 'getUser':
            return yield index_1.UserMongoModel.findOne({ _id: id, active: true });
        default:
            break;
    }
});
exports.getData = getData;
const listDatas = (table, type) => __awaiter(void 0, void 0, void 0, function* () {
    switch (table) {
        case 'users':
            const listDatas = yield index_1.UserMongoModel.find({ active: true });
            return listDatas;
            break;
        default:
            break;
    }
});
exports.listDatas = listDatas;
const patchDatas = (data, type) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Updata Mock', data, type);
    let $data = {};
    for (var k in data) {
        if (data[k]) {
            $data[k] = data[k];
        }
    }
    console.log('DATASSSS_-', $data);
    switch (type) {
        case 'user_patch_active':
            const { id, active } = $data, rest = __rest($data, ["id", "active"]);
            console.log('this is the active--->', active);
            return yield index_1.UserMongoModel.findOneAndUpdate({ _id: id }, { active: true }, { new: true });
        default:
            break;
    }
});
exports.patchDatas = patchDatas;
//# sourceMappingURL=index.js.map