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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const index_1 = __importDefault(require("../auth/index"));
const index_2 = require("../../../utils/actions/personas/index");
const model_1 = __importDefault(require("./model"));
function default_1(injectedStore, injectedCache) {
    let cache = injectedCache;
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy');
    }
    if (!cache) {
        cache = require('../../../store/dummy');
    }
    const table = 'users';
    function insert({ datas, type }) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const responValidator = yield (0, index_2.Validator)(datas);
                if (responValidator) {
                    reject({ msg: responValidator });
                    return false;
                }
                const data = new model_1.default(datas);
                try {
                    const registerRespon = yield store.upsert(table, { data, type });
                    const responAuth = yield index_1.default.upsert(registerRespon, {
                        encrypted_password: yield bcryptjs_1.default.hash(datas.password, 5),
                        id: registerRespon.id,
                        email: registerRespon.email
                    }, 'users');
                    const { id } = registerRespon, rest = __rest(registerRespon, ["id"]);
                    //Si quiero que logue automaticamente, descomento esto de acá abajo
                    //const { email } = Object.assign(registerRespon, responAuth);
                    // const res = await controllerAuth.insert(email, datas.password, table);
                    console.log('RES CONTROLLER AUTH REGISTER---', registerRespon);
                    resolve({ id });
                }
                catch (e) {
                    yield (0, index_2.midlleHandleError)(e, table, datas, resolve, reject);
                }
            }));
        });
    }
    function list() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                console.log('LIST CONTROLLER');
                try {
                    let users = yield cache.list(table);
                    if (!users) {
                        users = yield store.list(table);
                        !users && reject({ msg: 'No hay usuarios' });
                        cache.upsert(users, table);
                    }
                    else {
                        console.log('datos traidos de la cache');
                    }
                    resolve(users);
                }
                catch (error) {
                    reject(error);
                    return false;
                }
            }));
        });
    }
    function get(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const { filter } = data;
                    const theData = { type: 'getUser', querys: filter };
                    let user = yield cache.get(filter.id, table);
                    if (!user) {
                        console.log('no estaba en cachee, buscando en db');
                        user = yield store.get(theData, table);
                    }
                    yield cache.upsert(user, table);
                    resolve(user);
                }
                catch (error) {
                    console.log('this error--->', error);
                    return reject({ msg: 'maybe the user dont exist or is not active' });
                }
            }));
        });
    }
    function update({ datas, id, type }) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const responValidator = yield (0, index_2.Validator)(datas);
                if (responValidator) {
                    reject({ msg: responValidator });
                    return false;
                }
                const data = Object.assign(new model_1.default(datas), { id });
                try {
                    const dataRespon = yield store.upsert(table, { data, type });
                    console.log('this is the dataRespon--->', dataRespon);
                    resolve(dataRespon);
                }
                catch (error) {
                    (0, index_2.midlleHandleError)(error, table, data, resolve, reject);
                }
            }));
        });
    }
    function remove({ id, type }) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const dataRespon = yield store.remove(table, { id, type });
                    resolve(dataRespon);
                }
                catch (error) {
                    (0, index_2.midlleHandleError)(error, table, { data: id }, resolve, reject);
                }
            }));
        });
    }
    function patch({ id, type }) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const data = { id, active: true };
                    const dataRespon = yield store.patch(table, { data, type });
                    resolve(dataRespon);
                }
                catch (error) {
                    (0, index_2.midlleHandleError)(error, table, { data: id }, resolve, reject);
                }
            }));
        });
    }
    return {
        insert,
        list,
        get,
        update,
        remove,
        patch
    };
}
exports.default = default_1;
//# sourceMappingURL=controller.js.map