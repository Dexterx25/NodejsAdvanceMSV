"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chalk_1 = __importDefault(require("chalk"));
const app = (0, express_1.default)();
const server = require('http').Server(app);
const body_parser_1 = __importDefault(require("body-parser"));
const path_1 = __importDefault(require("path"));
require('dotenv').config({ path: path_1.default.resolve(__dirname, '../.env') });
app.use(body_parser_1.default.json());
const socket_1 = __importDefault(require("./socket"));
socket_1.default.connect(server);
app.use(body_parser_1.default.urlencoded({ extended: false }));
const index_1 = require("../configurations/index");
const network_1 = __importDefault(require("./components/network"));
const errors_1 = __importDefault(require("../utils/responses/errors"));
app.use('/messages', network_1.default);
app.use(errors_1.default);
server.listen(index_1.config.chatsServices.port, () => {
    // eslint-disable-next-line prettier/prettier
    console.log(chalk_1.default.blue.underline.bgWhite(`Chats service running in localhost:${index_1.config.chatsServices.port}`));
});
//# sourceMappingURL=chats.js.map