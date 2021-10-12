"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const remote_1 = __importDefault(require("./remote"));
const index_1 = require("../configurations/index");
exports.default = new remote_1.default(index_1.config.MSV_PSQL.host, index_1.config.MSV_PSQL.port);
//# sourceMappingURL=remote-postgres.js.map