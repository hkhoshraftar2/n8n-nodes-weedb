import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';
import WeeDB from '../../src/WeeDB';

 
export class WeeDBKeyValueCreate implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'WeeDB Key Value Create',
		name: 'weeDBKeyValueCreate',
		group: ['WeeDB'],
		version: 3,
		description: 'Create a new WeeDB KeyValue',
		defaults: {
			color: '#ff9900',
			name: 'weeDBKeyValueCreate',
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
				displayName: 'Key',
				name: 'key',
				type: 'string',
				default: '',
				placeholder: 'Key to save',
				description: 'Key to save',
			},
			{
				displayName: 'Value',
				name: 'value',
				type: 'string',
				default: '',
				placeholder: 'Value to save',
				description: 'Value to save',
			}
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {


		const credentials = await this.getCredentials('weeDBConnection');
		const apiKey = credentials.databaseId as string;

		let key = this.getNodeParameter('key', 0) as string;
		let value = this.getNodeParameter('value', 0) as string;

		const weeDB = WeeDB.getInstance(apiKey);
		if (!weeDB) throw new Error('Failed to initialize WeeDB');
		const item = await weeDB.set(key,value);
		
		// const initialMessageType = this.getNodeParameter('initialMessageType', 0) as string;
		// const initialMessage = this.getNodeParameter('initialMessage', 0) as string;

		// let prompt = this.getNodeParameter('prompt', 0) as string;
		return [this.helpers.returnJsonArray({item})];

	}
}
