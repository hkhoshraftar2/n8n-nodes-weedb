"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeeDBStringCreate = void 0;
const WeeDB_1 = __importDefault(require("../../src/WeeDB"));
class WeeDBStringCreate {
    constructor() {
        this.description = {
            displayName: 'WeeDB String Create',
            name: 'weeDBStringCreate',
            group: ['transform'],
            version: 3,
            description: 'Create a new WeeDB string',
            defaults: {
                color: '#ff9900',
                name: 'weeDBStringCreate',
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
                    type: 'string',
                    default: '',
                    placeholder: 'String Data to save',
                    description: 'Strign Data to save',
                }
            ],
        };
    }
    async execute() {
        const credentials = await this.getCredentials('weeDBConnection');
        const apiKey = credentials.databaseId;
        let data = this.getNodeParameter('data', 0);
        const weeDB = WeeDB_1.default.getInstance(apiKey);
        if (!weeDB)
            throw new Error('Failed to initialize WeeDB');
        const item = await weeDB.create({ data });
        return [this.helpers.returnJsonArray({ item })];
    }
}
exports.WeeDBStringCreate = WeeDBStringCreate;
//# sourceMappingURL=WeeDBStringCreate.node.js.map