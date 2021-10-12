"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class messageModel {
    constructor(datas) {
        this.userName = datas.full_name;
        this.avatar = datas.avatar;
        this.message = datas.message;
        this.userId = datas.userId;
        this.channel_id = datas.channel_id;
        this.msg_id = datas.msg_id;
        return Object.assign({}, this);
    }
}
exports.default = messageModel;
//# sourceMappingURL=model.js.map