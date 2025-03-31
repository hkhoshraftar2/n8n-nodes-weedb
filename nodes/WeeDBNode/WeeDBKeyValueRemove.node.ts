import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';
import WeeDB from '../../src/WeeDB';

 
export class WeeDBKeyValueRemove implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'WeeDB Key Value Remove',
		name: 'weeDBKeyValueRemove',
		group: ['transform'],
		version: 3,
		description: 'Remove WeeDB KeyValue',
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
				displayName: 'Single or All',
				name: 'singleOrAll',
				type: 'options',
				noDataExpression: true, // Prevents using expressions in the selection
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

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {


		const credentials = await this.getCredentials('weeDBConnection');
		const apiKey = credentials.databaseId as string;

		let key = this.getNodeParameter('key', 0) as string;
		let singleOrAll = this.getNodeParameter('singleOrAll', 0) as string;

		const weeDB = WeeDB.getInstance(apiKey);
		if (!weeDB) throw new Error('Failed to initialize WeeDB');


		let item = null;
		if (singleOrAll === 'single') {
			item = await weeDB.remove(key);
		} else if (singleOrAll === 'searchKeys') {
			item = await weeDB.removeKeysByPattern(key);
		}

		return [this.helpers.returnJsonArray({item})];

	}
}
