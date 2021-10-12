"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMongoModel = void 0;
const mongoose_1 = require("mongoose");
const authSchema = new mongoose_1.Schema({
    user_id: {
        type: String,
        required: true
    },
    encrypted_password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true
    },
    token: String,
    users: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'users'
    }
});
const AuthMongoModel = (0, mongoose_1.model)('authentications', authSchema);
exports.AuthMongoModel = AuthMongoModel;
//# sourceMappingURL=authModel.js.map