"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeeDBObjectCreate = void 0;
const WeeDB_1 = __importDefault(require("../../src/WeeDB"));
class WeeDBObjectCreate {
    constructor() {
        this.description = {
            displayName: 'WeeDB  Create Object',
            name: 'weeDBObjectCreate',
            group: ['WeeDB'],
            version: 3,
            description: 'Create a new WeeDB object',
            defaults: {
                color: '#ff9900',
                name: 'weeDBObjectCreate',
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
                    displayName: 'Data',
                    name: 'data',
                    type: 'json',
                    default: '',
                    placeholder: 'Object Data to save',
                    description: 'Object Data to save',
                }
            ],
        };
    }
    async execute() {
        const credentials = await this.getCredentials('weeDBConnection');
        const apiKey = credentials.databaseId;
        let dataObject = this.getNodeParameter('data', 0);
        const weeDB = WeeDB_1.default.getInstance(apiKey);
        if (!weeDB)
            throw new Error('Failed to initialize WeeDB');
        const item = await weeDB.createObject(dataObject);
        return [this.helpers.returnJsonArray({ item })];
    }
}
exports.WeeDBObjectCreate = WeeDBObjectCreate;
//# sourceMappingURL=WeeDBObjectCreate.node.js.map