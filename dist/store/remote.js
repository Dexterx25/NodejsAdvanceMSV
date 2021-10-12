"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
require('dotenv').config();
function createRemoteDB(host, port) {
    const URL = 'http://' + host + ':' + port;
    function list(table) {
        return req('GET', table);
    }
    function get(table, id) {
        return req('GET', table, id);
    }
    function insert(table, data) {
        return req('POST', table, data);
    }
    function update(table, data) {
        return req('PUT', table, data);
    }
    function upsert(table, data) {
        if (data.id) {
            return update(table, data);
        }
        return insert(table, data);
    }
    function query(table, query, join) {
        return req('POST', table + '/query', { query, join });
    }
    function req(method, table, data) {
        let url = URL + '/' + table;
        let body = '';
        if (method === 'GET' && data) {
            url += '/' + data;
        }
        else if (data) {
            body = JSON.stringify(data);
        }
        return new Promise((resolve, reject) => {
            (0, request_1.default)({
                method,
                headers: {
                    'content-type': 'application/json'
                },
                url,
                body
            }, (err, req, body) => {
                if (err) {
                    console.error('Error con la base de datos remota', err);
                    return reject(err.message);
                }
                const resp = JSON.parse(body);
                return resolve(resp.body);
            });
        });
    }
    return {
        list
    };
}
exports.default = createRemoteDB;
//# sourceMappingURL=remote.js.map