"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeeDBConnection = void 0;
class WeeDBConnection {
    constructor() {
        this.name = 'weeDBConnection';
        this.displayName = 'WeeDB Connection';
        this.documentationUrl = 'https://docs.metisai.ir';
        this.properties = [
            {
                displayName: 'Database ID',
                name: 'databaseId',
                type: 'string',
                default: '',
                typeOptions: {
                    password: false,
                },
                description: 'Shining Database ID',
            },
        ];
    }
}
exports.WeeDBConnection = WeeDBConnection;
//# sourceMappingURL=WeeDBConnection.credentials.js.map