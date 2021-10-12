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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const { config } = require('../../../configurations/index');
const thecache = __importStar(require("../../../store/redis"));
const storeRemotePG = __importStar(require("../../../store/remote-postgres"));
const storeLocalPG = __importStar(require("../../../store/postgres"));
const storeLocalMongoDB = __importStar(require("../../../store/mongoDB"));
let store, cache;
if (config.remoteDB === true) {
    store = storeRemotePG;
    cache = require('../../../store/remote-cache');
}
else {
    if (config.usingDb.postgres === true) {
        store = storeLocalPG;
        cache = thecache;
    }
    else {
        store = storeLocalMongoDB;
        cache = thecache;
    }
}
const controller_1 = __importDefault(require("./controller"));
exports.default = (0, controller_1.default)(store, cache);
//# sourceMappingURL=index.js.map