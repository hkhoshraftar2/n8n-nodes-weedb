"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeeDBDataDelete = void 0;
const WeeDB_1 = __importDefault(require("../../src/WeeDB"));
class WeeDBDataDelete {
    constructor() {
        this.description = {
            displayName: 'WeeDB Data Delete',
            name: 'weeDBDataDelete',
            group: ['WeeDB'],
            version: 3,
            description: 'Delete WeeDB Data',
            defaults: {
                color: '#ff9900',
                name: 'weeDBDataDelete',
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
                    placeholder: 'ID to Delete',
                    description: 'ID to Delete',
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
        const item = await weeDB.delete(id);
        return [this.helpers.returnJsonArray({ item })];
    }
}
exports.WeeDBDataDelete = WeeDBDataDelete;
//# sourceMappingURL=WeeDBDataDelete.node.js.map