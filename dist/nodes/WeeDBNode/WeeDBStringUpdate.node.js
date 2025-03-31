"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeeDBStringUpdate = void 0;
const WeeDB_1 = __importDefault(require("../../src/WeeDB"));
class WeeDBStringUpdate {
    constructor() {
        this.description = {
            displayName: 'WeeDB String Update',
            name: 'weeDBStringUpdate',
            group: ['WeeDB'],
            version: 3,
            description: 'Update a WeeDB string',
            defaults: {
                color: '#ff9900',
                name: 'weeDBStringUpdate',
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
                    displayName: 'ID',
                    name: 'id',
                    type: 'string',
                    default: '',
                    placeholder: 'ID to Fetch',
                    description: 'ID to Fetch',
                },
                {
                    displayName: 'Data',
                    name: 'data',
                    type: 'string',
                    default: '',
                    placeholder: 'String Data to Update',
                    description: 'Strign Data to Update',
                }
            ],
        };
    }
    async execute() {
        const credentials = await this.getCredentials('weeDBConnection');
        const apiKey = credentials.databaseId;
        let data = this.getNodeParameter('data', 0);
        let id = this.getNodeParameter('id', 0);
        const weeDB = WeeDB_1.default.getInstance(apiKey);
        if (!weeDB)
            throw new Error('Failed to initialize WeeDB');
        const item = await weeDB.update(id, { data });
        return [this.helpers.returnJsonArray({ item })];
    }
}
exports.WeeDBStringUpdate = WeeDBStringUpdate;
//# sourceMappingURL=WeeDBStringUpdate.node.js.map