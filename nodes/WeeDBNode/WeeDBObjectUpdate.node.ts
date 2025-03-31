import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	JsonObject,
} from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';
import WeeDB from '../../src/WeeDB';

 
export class WeeDBObjectUpdate implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'WeeDB Object Update',
		name: 'weeDBObjectUpdate',
		group: ['WeeDB'],
		version: 3,
		description: 'Update a WeeDB object',
		defaults: {
			color: '#ff9900',
			name: 'weeDBObjectUpdate',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
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
				type: 'json',
				default: '',
				placeholder: 'Object Data to Update',
				description: 'Object Data to Update',
			}
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {


		const credentials = await this.getCredentials('weeDBConnection');
		const apiKey = credentials.databaseId as string;
		let data = this.getNodeParameter('data', 0) as JsonObject;
		let id = this.getNodeParameter('id', 0) as string;
		const weeDB = WeeDB.getInstance(apiKey);
		if (!weeDB) throw new Error('Failed to initialize WeeDB');
		const item = await weeDB.update(id, data);
		
		
		return [this.helpers.returnJsonArray({item})];

	}
}
