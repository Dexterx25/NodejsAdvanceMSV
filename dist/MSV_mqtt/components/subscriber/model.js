"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class userModel {
    constructor(datas) {
        this.hum = 0;
        this.temp = 0;
        this.pm2_5 = 0;
        this.pm_10 = 0;
        this.nh3 = 0;
        this.co = 0;
        this.co2 = 0;
        (this.hum = datas.hum), (this.temp = datas.temp);
        this.pm2_5 = datas.pm2_5;
        this.pm_10 = datas.pm_10;
        this.nh3 = datas.nh3;
        this.co = datas.co;
        this.co2 = datas.co2;
        return Object.assign({}, this);
    }
}
exports.default = userModel;
//# sourceMappingURL=model.js.map