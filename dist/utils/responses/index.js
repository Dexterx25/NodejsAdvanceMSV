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
exports.ConsoleResponse = exports.ServerResponse = void 0;
const chalk_1 = __importDefault(require("chalk"));
exports.ServerResponse = {
    success: function (req, res, message, status) {
        return __awaiter(this, void 0, void 0, function* () {
            let statusCode = status || 200;
            let statusMessage = message || '';
            res.status(statusCode).send({
                error: false,
                status: statusCode,
                body: statusMessage
            });
        });
    },
    error: function (req, res, message, status) {
        return __awaiter(this, void 0, void 0, function* () {
            console.warn('Message--->', message, 'status--->', status);
            let statusCode = status || 500;
            let statusMessage = message || 'Internal server error';
            res.status(statusCode).send({
                error: true,
                status: statusCode,
                body: statusMessage
            });
        });
    }
};
exports.ConsoleResponse = {
    error: function (message, procedence) {
        console.warn(`${chalk_1.default.red(`[Handle Fatal Error >>> (${procedence})] \n`)} ${chalk_1.default.magentaBright(`====> ${message}`)}`);
    },
    success: function (procedence, message) {
        console.warn(`${chalk_1.default.green(`[Success Response >>> (${procedence})]  \n`)}${chalk_1.default.greenBright(`====> ${JSON.stringify(message)}`)}`);
    }
};
//# sourceMappingURL=index.js.map