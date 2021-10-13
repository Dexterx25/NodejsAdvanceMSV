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
exports.upsert = exports.get = exports.list = void 0;
const redis_1 = __importDefault(require("redis"));
const index_1 = require("../configurations/index");
const chalk_1 = __importDefault(require("chalk"));
const client = redis_1.default.createClient({
    host: index_1.config.redis.host,
    port: index_1.config.redis.port
    //  password: config.redis.password,
});
// eslint-disable-next-line prettier/prettier
client.on('ready', (_) => console.log(chalk_1.default.blue.underline.bgWhite('Redis service is ready!')));
function list(table) {
    return new Promise((resolve, reject) => {
        client.get(table, (err, data) => {
            if (err)
                return reject(err);
            let res = data || null;
            if (data) {
                console.log('dataaaaaa cache list-->', data);
                res = JSON.parse(data);
            }
            resolve(res);
        });
    });
}
exports.list = list;
function get(id, table) {
    console.log('entra get Redis');
    return list(table + '_' + id);
}
exports.get = get;
function upsert(data, table) {
    return __awaiter(this, void 0, void 0, function* () {
        let key = table;
        if (data && data.id) {
            key = key + '_' + data.id;
        }
        console.log('dataaaaaa cache upsert-->', data);
        client.setex(key, 10, JSON.stringify(data));
        return true;
    });
}
exports.upsert = upsert;
//# sourceMappingURL=redis.js.map