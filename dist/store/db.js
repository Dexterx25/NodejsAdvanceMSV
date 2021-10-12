"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongo = exports.pool = void 0;
const pg_1 = require("pg");
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = require("../configurations/index");
const path_1 = __importDefault(require("path"));
require('dotenv').config({ path: path_1.default.resolve(__dirname, '../../.env') });
const { database } = index_1.config;
if (index_1.config.usingDb.postgres === true) {
    exports.pool = new pg_1.Pool(database);
    console.log('POSTGRES SERVICE IS RUNNING!');
}
if (index_1.config.usingDb.mongoDB === true) {
    exports.mongo = mongoose_1.default.connect(`${index_1.config.database.mongoose}`);
}
// eslint-disable-next-line prettier/prettier
mongoose_1.default.connection.on('open', _ => console.log('MONGODB database is connected to-->', index_1.config.database.mongoose));
// eslint-disable-next-line prettier/prettier
mongoose_1.default.connection.on('error', e => console.log('THERE ARE AN ERROR CONNECTION MONGODB--->', e));
//# sourceMappingURL=db.js.map