"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeeDBKeyValueGet = void 0;
const WeeDB_1 = __importDefault(require("../../src/WeeDB"));
class WeeDBKeyValueGet {
    constructor() {
        this.description = {
            displayName: 'WeeDB Key Value Get',
            name: 'weeDBKeyValueGet',
            group: ['transform'],
            version: 3,
            description: 'Get a new WeeDB KeyValue',
            defaults: {
                color: '#ff9900',
                name: 'weeDBKeyValueCreate',
            },
            inputs: ["main"],
            outputs: ["main"],
            credentials: [
                {
                    name: 'weeDBConnection',
                    required: true,
                },
            ],
            properties: [
                {
                    displayName: 'Key',
                    name: 'key',
                    type: 'string',
                    default: '',
                    placeholder: 'Key to save',
                    description: 'Key to save',
                }
            ],
        };
    }
    async execute() {
        const credentials = await this.getCredentials('weeDBConnection');
        const apiKey = credentials.databaseId;
        let key = this.getNodeParameter('key', 0);
        const weeDB = WeeDB_1.default.getInstance(apiKey);
        if (!weeDB)
            throw new Error('Failed to initialize WeeDB');
        const item = await weeDB.get(key);
        return [this.helpers.returnJsonArray({ item })];
    }
}
exports.WeeDBKeyValueGet = WeeDBKeyValueGet;
//# sourceMappingURL=WeeDBKeyValueGet.node.js.map