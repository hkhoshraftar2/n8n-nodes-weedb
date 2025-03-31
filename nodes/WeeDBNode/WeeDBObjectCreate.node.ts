import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	JsonObject,
} from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';
import WeeDB from '../../src/WeeDB';

 
export class WeeDBObjectCreate implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'WeeDB  Create Object',
		name: 'weeDBObjectCreate',
		group: ['WeeDB'],
		version: 3,
		description: 'Create a new WeeDB object',
		defaults: {
			color: '#ff9900',
			name: 'weeDBObjectCreate',
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
				displayName: 'Data',
				name: 'data',
				type: 'json',
				default: '',
				placeholder: 'Object Data to save',
				description: 'Object Data to save',
			}
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const credentials = await this.getCredentials('weeDBConnection');
		const apiKey = credentials.databaseId as string;
		let dataObject = this.getNodeParameter('data', 0) as JsonObject;

		const weeDB = WeeDB.getInstance(apiKey);
		if (!weeDB) throw new Error('Failed to initialize WeeDB');
		const item = await weeDB.createObject(dataObject);

		
		return [this.helpers.returnJsonArray({item})];

	}
}
