"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth = __importStar(require("../../../authorizations/index"));
function cheakAuth(action) {
    function middleware(req, res, next) {
        switch (action) {
            case 'update':
                auth.cheak.next();
                break;
            case 'get':
                console.log('for getttt', req.headers);
                auth.cheak.logged(req);
                next();
                break;
            case 'list':
                auth.cheak.logged(req);
                next();
                break;
            case 'filter':
                auth.cheak.logged(req);
                next();
            default:
                next();
        }
    }
    return middleware;
}
exports.default = cheakAuth;
//# sourceMappingURL=secure.js.map