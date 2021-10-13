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
/* eslint-disable prefer-const */
const express_1 = require("express");
const index_1 = __importDefault(require("./index"));
const responses_1 = require("../../utils/responses");
const secure_1 = __importDefault(require("./secure"));
const router = (0, express_1.Router)();
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: 'public/photos',
    filename: function (req, file, cb) {
        cb('', Date.now() + '.' + file.originalname);
    }
});
const upload = (0, multer_1.default)({
    storage: storage
});
router.post('/send', (0, secure_1.default)('send'), upsert);
router.get('/', (0, secure_1.default)('list'), list);
let procedence = 'Messages NETWORK';
function upsert(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const datas = {
            type: 'send_message',
            datas: req.body,
            files: req.files
        };
        console.log('UPSERTTTTT message', datas);
        yield index_1.default
            .insert(datas)
            .then((respon) => {
            responses_1.ConsoleResponse.success(procedence, respon);
            responses_1.ServerResponse.success(req, res, respon, 200);
        })
            .catch((err) => {
            responses_1.ServerResponse.error(req, res, err, 400);
        });
    });
}
function list(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        yield index_1.default
            .list()
            .then((respon) => {
            responses_1.ServerResponse.success(req, res, respon, 200);
        })
            .catch((err) => {
            responses_1.ServerResponse.error(req, res, err, 400);
        });
    });
}
exports.default = router;
//# sourceMappingURL=network.js.map