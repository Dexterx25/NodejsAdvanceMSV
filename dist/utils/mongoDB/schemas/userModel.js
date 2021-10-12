"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMongoModel = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    names: {
        type: String,
        required: true
    },
    surnames: {
        type: String,
        required: true
    },
    full_name: {
        type: String,
        required: true
    },
    prefix_number: {
        type: String,
        required: true
    },
    type_user_id: {
        type: String,
        required: true
    },
    active: {
        type: String,
        default: false
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    phone_number: {
        type: String,
        unique: true,
        require: true
    },
    avatar: String,
    authentications: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'authentications'
    }
});
const UserMongoModel = (0, mongoose_1.model)('users', userSchema);
exports.UserMongoModel = UserMongoModel;
//# sourceMappingURL=userModel.js.map