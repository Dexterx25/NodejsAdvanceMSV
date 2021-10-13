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
const { ServerResponse, ConsoleResponse } = require('../../../utils/responses/index');
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
router.post('/', upload.single('file'), upsert);
router.get('/:id', get);
router.get('/', (0, secure_1.default)('list'), list);
router.put('/:id', (0, secure_1.default)('update'), update);
router.delete('/:id', (0, secure_1.default)('delete'), remove);
router.patch('/:id/active', (0, secure_1.default)('active'), patch);
let procedence = 'USER NETWORK';
function upsert(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('This IS The File:', req.files);
        const datas = {
            type: 'email_register',
            datas: req.body,
            files: req.files
        };
        console.log('UPSERTTTTT');
        console.log('body--->', datas);
        yield index_1.default
            .insert(datas)
            .then((respon) => {
            ConsoleResponse.success(procedence, respon);
            ServerResponse.success(req, res, respon, 201);
        })
            .catch((err) => {
            ServerResponse.error(req, res, err);
        });
    });
}
function get(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = {
            filter: req.params,
            token: req.headers.authorization
        };
        console.log('datass-->', data);
        yield index_1.default
            .get(data)
            .then((dataUser) => {
            ConsoleResponse.success(procedence, dataUser);
            ServerResponse.success(req, res, dataUser, 200);
        })
            .catch((err) => {
            console.log('this is the error--°', err);
            ServerResponse.error(req, res, err, 400);
        });
    });
}
function list(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        yield index_1.default
            .list()
            .then((respon) => {
            ServerResponse.success(req, res, respon, 200);
        })
            .catch((err) => {
            ServerResponse.error(req, res, err);
        });
    });
}
function update(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = {
            id: req.params.id || req.params._id,
            datas: req.body,
            type: 'user_update'
        };
        yield index_1.default
            .update(data)
            .then((datasAlter) => {
            ServerResponse.success(req, res, datasAlter, 200);
        })
            .catch((err) => {
            ServerResponse.error(req, res, err);
        });
    });
}
function patch(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = {
            id: req.params.id,
            type: 'user_patch_active'
        };
        yield index_1.default
            .patch(data)
            .then((datasAlter) => {
            ServerResponse.success(req, res, datasAlter, 202);
        })
            .catch((err) => {
            ServerResponse.error(req, res, err);
        });
    });
}
function remove(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = {
            id: req.params.id,
            type: 'user_delete'
        };
        yield index_1.default
            .remove(data)
            .then((datasAlter) => {
            ServerResponse.success(req, res, datasAlter, 202);
        })
            .catch((err) => {
            ServerResponse.error(req, res, err);
        });
    });
}
exports.default = router;
//# sourceMappingURL=network.js.map