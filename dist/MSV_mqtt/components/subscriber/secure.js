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
// eslint-disable-next-line prefer-const
let clients_id = ['nodeMcuAngieMarriaga'];
function secure(client_id) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('CLIENT SECUREEE', client_id);
        return new Promise((resolve, reject) => {
            if (clients_id.findIndex((e) => e == clients_id) == -1) {
                console.log('NOPE');
                reject({ msg: 'Este cliente no está permitido!' });
            }
            else {
                console.log('YEEEP');
                resolve(client_id);
            }
        });
    });
}
exports.default = secure;
//# sourceMappingURL=secure.js.map