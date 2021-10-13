"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mqtt_1 = __importDefault(require("mqtt"));
const secure_1 = __importDefault(require("./secure"));
const controller_1 = __importDefault(require("./controller"));
const sub = mqtt_1.default.connect('mqtt://localhost:1883');
function default_1(client) {
    sub.on('connect', () => {
        sub.subscribe('outTopic');
        sub.subscribe('temp');
        sub.subscribe('hum');
        sub.subscribe('co2');
        sub.subscribe('pm2_5');
        sub.subscribe('pm_10');
        sub.subscribe('nh3');
        sub.subscribe('co');
        sub.subscribe('latitude');
        sub.subscribe('longitude');
        (0, secure_1.default)(client.id)
            .then((client_id) => {
            sub.on('message', (topic, message) => {
                console.warn('THIS IS TEH Message-->', topic, message.toString());
                const data = message.toString();
                //   store.upsert(data, table, topic)
                /*
                              @ topics
                            */
                (0, controller_1.default)().create(client_id, topic, message.toString());
            });
        })
            .catch((error) => {
            console.log('suscriberPoolConection ERROR-->', error);
        });
    });
}
exports.default = default_1;
//# sourceMappingURL=network.js.map