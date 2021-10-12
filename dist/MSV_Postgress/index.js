"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const index_1 = require("../configurations/index");
const network_1 = __importDefault(require("./network"));
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
// RUTAS
app.use('/', network_1.default);
app.listen(index_1.config.MSV_PSQL.host, () => {
    // eslint-disable-next-line prettier/prettier
    console.log('Servicio de mysql escuchando en el puerto', index_1.config.MSV_PSQL.port);
});
//# sourceMappingURL=index.js.map