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
                },
                {
                    displayName: 'Single or All',
                    name: 'singleOrAll',
                    type: 'options',
                    noDataExpression: true,
                    options: [
                        {
                            name: 'Single',
                            value: 'single',
                            description: 'Get a value by key',
                        },
                        {
                            name: 'Search Keys',
                            value: 'searchKeys',
                            description: 'Search for keys by regex pattern and return all',
                        },
                    ],
                    default: 'single',
                },
            ],
        };
    }
    async execute() {
        const credentials = await this.getCredentials('weeDBConnection');
        const apiKey = credentials.databaseId;
        let key = this.getNodeParameter('key', 0);
        let singleOrAll = this.getNodeParameter('singleOrAll', 0);
        const weeDB = WeeDB_1.default.getInstance(apiKey);
        if (!weeDB)
            throw new Error('Failed to initialize WeeDB');
        let item = null;
        if (singleOrAll === 'single') {
            item = await weeDB.get(key);
        }
        else if (singleOrAll === 'searchKeys') {
            item = await weeDB.searchKeys(key);
        }
        return [this.helpers.returnJsonArray({ item })];
    }
}
exports.WeeDBKeyValueGet = WeeDBKeyValueGet;
//# sourceMappingURL=WeeDBKeyValueGet.node.js.map