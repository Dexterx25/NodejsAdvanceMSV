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
const mosca_1 = __importDefault(require("mosca"));
const mqtt_1 = __importDefault(require("mqtt"));
const network_1 = __importDefault(require("./components/subscriber/network"));
const chalk_1 = __importDefault(require("chalk"));
const path_1 = __importDefault(require("path"));
require('dotenv').config({ path: path_1.default.resolve(__dirname, '../../.env') });
const broker = new mosca_1.default.Server({
    port: 1883
});
mqtt_1.default.connect('mqtt://localhost:1883');
broker.on('ready', () => {
    console.log(chalk_1.default.blue.underline.bgWhite('MQTT broker is ready!'));
});
broker.on('clientConnected', (client) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, network_1.default)(client);
}));
exports.default = broker;
//# sourceMappingURL=mqtt.js.map