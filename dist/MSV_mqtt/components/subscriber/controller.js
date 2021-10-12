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
/* eslint-disable prefer-const */
function default_1() {
    let table = 'telemetries';
    const create = (client_id, topic, message) => __awaiter(this, void 0, void 0, function* () {
        console.log('THIS IS DATASSSS--->', client_id, topic, message);
        //await store.writePoints({ topic, message, table });
    });
    return {
        create: create
    };
}
exports.default = default_1;
//# sourceMappingURL=controller.js.map