"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeeDBKeyValueRemove = void 0;
const WeeDB_1 = __importDefault(require("../../src/WeeDB"));
class WeeDBKeyValueRemove {
    constructor() {
        this.description = {
            displayName: 'WeeDB Key Value Remove',
            name: 'weeDBKeyValueRemove',
            group: ['WeeDB'],
            version: 3,
            description: 'Remove WeeDB KeyValue',
            defaults: {
                color: '#ff9900',
                name: 'weeDBKeyValueRemove',
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
                {
                    displayName: 'Key',
                    name: 'key',
                    type: 'string',
                    default: '',
                    placeholder: 'Key to remove',
                    description: 'Key to remove',
                }
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
            item = await weeDB.remove(key);
        }
        else if (singleOrAll === 'searchKeys') {
            item = await weeDB.removeKeysByPattern(key);
        }
        return [this.helpers.returnJsonArray({ item })];
    }
}
exports.WeeDBKeyValueRemove = WeeDBKeyValueRemove;
//# sourceMappingURL=WeeDBKeyValueRemove.node.js.map