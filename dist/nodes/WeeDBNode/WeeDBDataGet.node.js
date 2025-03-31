"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeeDBDataGet = void 0;
const WeeDB_1 = __importDefault(require("../../src/WeeDB"));
class WeeDBDataGet {
    constructor() {
        this.description = {
            displayName: 'WeeDB Data Get',
            name: 'weeDBDataGet',
            group: ['WeeDB'],
            version: 3,
            description: 'Get WeeDB Data',
            defaults: {
                color: '#ff9900',
                name: 'weeDBDataGet',
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
                }
            ],
        };
    }
    async execute() {
        const credentials = await this.getCredentials('weeDBConnection');
        const apiKey = credentials.databaseId;
        const id = this.getNodeParameter('id', 0);
        const weeDB = WeeDB_1.default.getInstance(apiKey);
        if (!weeDB)
            throw new Error('Failed to initialize WeeDB');
        const item = await weeDB.read(id);
        return [this.helpers.returnJsonArray({ item })];
    }
}
exports.WeeDBDataGet = WeeDBDataGet;
//# sourceMappingURL=WeeDBDataGet.node.js.map