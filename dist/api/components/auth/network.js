"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable prefer-const */
const express_1 = require("express");
const index_1 = require("../../../utils/responses/index");
const index_2 = __importDefault(require("./index"));
const secure_1 = __importDefault(require("./secure"));
const router = (0, express_1.Router)();
const chalk = require('chalk');
let procedence = '[NETWORK AUTH]';
router.post('/', function (req, res, next) {
    console.log('THIS IS THE BODY INSERT LOGIN-->', req.body);
    index_2.default
        .insert(req.body.email, req.body.password, 'users')
        .then((token) => {
        console.log('THIS IS THE TOKEN--->', token);
        if (!token) {
            index_1.ConsoleResponse.error(procedence, 'token Not Is Here');
            return next;
        }
        else {
            index_1.ConsoleResponse.success(procedence, token);
            index_1.ServerResponse.success(req, res, token, 201);
        }
    })
        .catch(next);
});
router.delete('/', (0, secure_1.default)('logout'), function (req, res, next) {
    console.log('THIS IS THE PARAMS DELETE AUTH-->', req.headers);
    index_2.default
        .remove(req)
        .then((respon) => {
        index_1.ConsoleResponse.success(procedence, respon);
        index_1.ServerResponse.success(req, res, respon, 201);
    })
        .catch(next);
});
exports.default = router;
//# sourceMappingURL=network.js.map