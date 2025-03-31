"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeeDBKeyValueCreate = void 0;
const WeeDB_1 = __importDefault(require("../../src/WeeDB"));
class WeeDBKeyValueCreate {
    constructor() {
        this.description = {
            displayName: 'WeeDB Key Value Create',
            name: 'weeDBKeyValueCreate',
            group: ['transform'],
            version: 3,
            description: 'Create a new WeeDB KeyValue',
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
                },
                {
                    displayName: 'Value',
                    name: 'value',
                    type: 'string',
                    default: '',
                    placeholder: 'Value to save',
                    description: 'Value to save',
                }
            ],
        };
    }
    async execute() {
        const credentials = await this.getCredentials('weeDBConnection');
        const apiKey = credentials.databaseId;
        let key = this.getNodeParameter('key', 0);
        let value = this.getNodeParameter('value', 0);
        const weeDB = WeeDB_1.default.getInstance(apiKey);
        if (!weeDB)
            throw new Error('Failed to initialize WeeDB');
        const item = await weeDB.set(key, value);
        return [this.helpers.returnJsonArray({ item })];
    }
}
exports.WeeDBKeyValueCreate = WeeDBKeyValueCreate;
//# sourceMappingURL=WeeDBKeyValueCreate.node.js.map