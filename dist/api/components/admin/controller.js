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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable prefer-const */
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const index_1 = __importDefault(require("../auth/index"));
const index_2 = require("../../../utils/actions/admins/index");
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
    let table = 'users';
    let procedence = '[USER CONTROLLER]';
    function insert({ datas, type }) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const responValidator = yield (0, index_2.Validator)(datas);
                if (responValidator) {
                    reject({ msg: responValidator });
                    return false;
                }
                let data = new model_1.default(datas);
                try {
                    const registerRespon = yield store.upsert(table, { data, type });
                    const responAuth = yield index_1.default.upsert(registerRespon, {
                        encrypted_password: yield bcryptjs_1.default.hash(datas.password, 5),
                        id: registerRespon.id,
                        email: registerRespon.email
                    }, 'users');
                    const { email } = Object.assign(registerRespon, responAuth);
                    const res = yield index_1.default.insert(email, datas.password, table);
                    console.log('RES CONTROLLER AUTH---', res);
                    resolve(res);
                }
                catch (e) {
                    console.log('this is the error create userAdmin');
                    yield (0, index_2.midlleHandleError)(e, table, datas, resolve, reject);
                }
            }));
        });
    }
    function get(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const { filter } = data;
                const theData = { type: 'getUser', querys: filter };
                console.log('the filter--->', filter);
                let user = yield cache.get(filter.id, table);
                if (!user) {
                    console.log('no estaba en cachee, buscando en db');
                    user = yield store.get(theData, table);
                    cache.upsert(user, table);
                }
                resolve(user);
            }));
        });
    }
    return {
        insert,
        get
    };
}
exports.default = default_1;
//# sourceMappingURL=controller.js.map