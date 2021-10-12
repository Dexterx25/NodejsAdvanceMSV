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
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
function errors(err, req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('error Heere---!', err);
        const message = err.msg || 'Error interno';
        const status = err.statusCode || 500;
        console.log('STATUS CONSOLE--->', status);
        yield index_1.ServerResponse.error(req, res, message, status);
    });
}
exports.default = errors;
//# sourceMappingURL=errors.js.map