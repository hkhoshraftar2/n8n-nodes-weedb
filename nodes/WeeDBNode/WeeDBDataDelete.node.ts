import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';
import WeeDB from '../../src/WeeDB';

 
export class WeeDBDataDelete implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'WeeDB Data Delete',
		name: 'weeDBDataDelete',
		group: ['WeeDB'],
		version: 3,
		description: 'Delete WeeDB Data',
		defaults: {
			color: '#ff9900',
			name: 'weeDBDataDelete',
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
				placeholder: 'ID to Delete',
				description: 'ID to Delete',
			}
			
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {


		const credentials = await this.getCredentials('weeDBConnection');
		const apiKey = credentials.databaseId as string;

		const id = this.getNodeParameter('id', 0) as string;
		

		const weeDB = WeeDB.getInstance(apiKey);
		if (!weeDB) throw new Error('Failed to initialize WeeDB');
		const item = await weeDB.delete(id);


		
		return [this.helpers.returnJsonArray({item})];

	}
}
