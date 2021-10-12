"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class userModel {
    constructor(datas) {
        (this.names = datas.names),
            (this.surnames = datas.surnames),
            (this.full_name = `${datas.names} ${datas.surnames ? datas.surnames : ''}`.trim()),
            (this.prefix_number = datas.prefix_number),
            (this.phone_number = datas.phone_number),
            (this.email = datas.email),
            (this.type_user_id = '2'),
            (this.active = true);
        this.avatar = datas.avatar;
        return Object.assign({}, this);
    }
}
exports.default = userModel;
//# sourceMappingURL=model.js.map