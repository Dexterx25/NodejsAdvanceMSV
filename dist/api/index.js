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
const chalk_1 = __importDefault(require("chalk"));
//Swagger --->
//const SwaggerUI = require('swagger-ui-express');
//const SwaggerJsDoc = require('swagger-jsdoc');
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const app = (0, express_1.default)();
const path_1 = __importDefault(require("path"));
require('dotenv').config({ path: path_1.default.resolve(__dirname, '../../.env') });
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use(body_parser_1.default.urlencoded({ extended: false }));
//meddlewares-->
const network_1 = __importDefault(require("./components/users/network"));
const network_2 = __importDefault(require("./components/admin/network"));
const network_3 = __importDefault(require("./components/auth/network"));
app.use('/api-doc', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup((0, swagger_jsdoc_1.default)()));
app.use('/users', network_1.default);
app.use('/admins', network_2.default);
app.use('/authorization', network_3.default);
app.use(errors_1.default);
app.listen(config.api.port, () => {
    // eslint-disable-next-line prettier/prettier
    console.log(chalk_1.default.blue.underline.bgWhite(`Api Runing into ${config.api.host}:${config.api.port}`));
});
//# sourceMappingURL=index.js.map