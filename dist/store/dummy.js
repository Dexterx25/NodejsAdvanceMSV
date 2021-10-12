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
const db = {
    user: [{ id: '1', name: 'Carlos' }]
};
function list(tabla) {
    return __awaiter(this, void 0, void 0, function* () {
        return db[tabla] || [];
    });
}
function get(tabla, id) {
    return __awaiter(this, void 0, void 0, function* () {
        let col = yield list(tabla);
        return col.filter((item) => item.id === id)[0] || null;
    });
}
function upsert(tabla, data) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!db[tabla]) {
            db[tabla] = [];
        }
        db[tabla].push(data);
        console.log(db);
    });
}
function remove(tabla, id) {
    return __awaiter(this, void 0, void 0, function* () {
        return true;
    });
}
function query(tabla, q) {
    return __awaiter(this, void 0, void 0, function* () {
        let col = yield list(tabla);
        let keys = Object.keys(q);
        let key = keys[0];
        return col.filter((item) => item[key] === q[key])[0] || null;
    });
}
exports.default = {
    list,
    get,
    upsert,
    remove,
    query
};
//# sourceMappingURL=dummy.js.map