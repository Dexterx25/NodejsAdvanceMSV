"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const auth = __importStar(require("../../../authorizations/index"));
const chalk_1 = __importDefault(require("chalk"));
const index_1 = __importDefault(require("./index"));
const configurations_1 = require("../../../configurations");
function default_1(injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/store');
    }
    let table2 = 'authentications';
    let procedence = '[CONTROLLER AUTH]';
    const insert = (email, password, type) => {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const data = yield store.query(table2, { email: email }, new Array(type));
            if (!data) {
                reject({
                    msg: 'correo no valido o usuario inexistente',
                    statusCode: 400
                });
                return false;
            }
            const areEqual = yield bcryptjs_1.default.compare(password, data.encrypted_password);
            console.log('ARE EQUAL?--->', areEqual);
            if (areEqual == true) {
                const thistoken = yield auth.sign(data);
                const dataAuth = yield index_1.default.update({
                    token: thistoken,
                    id: data.id
                });
                const _a = configurations_1.config.usingDb.mongoDB ? dataAuth._doc : dataAuth, { id, encrypted_password, created_at, updated_at, user_id, email, _id } = _a, newObject = __rest(_a, ["id", "encrypted_password", "created_at", "updated_at", "user_id", "email", "_id"]);
                resolve(Object.assign({ id: user_id }, newObject));
            }
            else {
                reject({ msg: 'Invalid Password' });
            }
        }));
    };
    //user auth
    const upsert = (respon, data, type) => __awaiter(this, void 0, void 0, function* () {
        console.log('DATAS UPSERT ---->', data);
        let authData = '';
        if ((type = 'users')) {
            authData = {
                data: {
                    user_id: respon.id,
                    encrypted_password: data.encrypted_password,
                    email: data.email
                },
                type: 'insert_auth_users'
            };
        }
        console.log(`${procedence} ====> upsertAuth authData body -> ${chalk_1.default.blueBright(data)}`);
        return store.upsert(table2, authData);
    });
    const update = (data) => __awaiter(this, void 0, void 0, function* () {
        console.log('DATAS UPDATE ---->', data);
        let authData = '';
        authData = {
            data: {
                id: data.id,
                token: data.token ? data.token : '',
                encrypted_password: data.password ? data.password : '',
                email: data.email ? data.email : ''
            },
            type: 'update_auth_users'
        };
        console.log(`${procedence} ====> upsertAuth authData body -> ${chalk_1.default.blueBright(data)}`);
        return store.upsert(table2, authData);
    });
    const removeToken = (req) => __awaiter(this, void 0, void 0, function* () {
        const dataUser = yield auth.decodeHeader(req);
        console.log('DATAS REMOVE TOKEN ---->', dataUser);
        let authData = '';
        authData = {
            data: {
                id: dataUser.id,
                token: ''
            },
            type: 'logout_auth_users'
        };
        console.log(`${procedence} ====> upsertAuth authData body -> ${chalk_1.default.blueBright(authData)}`);
        const updateToken = yield store.upsert(table2, authData);
        const _a = configurations_1.config.usingDb.mongoDB ? updateToken._doc : updateToken, { id, _id, user_id, encrypted_password, email, created_at, updated_at } = _a, newobject = __rest(_a, ["id", "_id", "user_id", "encrypted_password", "email", "created_at", "updated_at"]);
        console.log('this is the newObject Logout--->', newobject);
        return newobject;
    });
    return {
        insert,
        upsert,
        update,
        remove: removeToken
    };
}
exports.default = default_1;
//# sourceMappingURL=controller.js.map