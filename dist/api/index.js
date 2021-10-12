"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable prefer-const */
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const errors_1 = __importDefault(require("../utils/responses/errors"));
let { config } = require('../configurations/index');
const app = (0, express_1.default)();
const path_1 = __importDefault(require("path"));
require('dotenv').config({ path: path_1.default.resolve(__dirname, '../../.env') });
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: false }));
const network_1 = __importDefault(require("./components/users/network"));
const network_2 = __importDefault(require("./components/admin/network"));
const network_3 = __importDefault(require("./components/auth/network"));
app.use('/users', network_1.default);
app.use('/admins', network_2.default);
app.use('/authorization', network_3.default);
app.use(errors_1.default);
app.listen(config.api.port, () => {
    console.log(`Api Runing XDD into ${config.api.host}:${config.api.port}`);
});
//# sourceMappingURL=index.js.map