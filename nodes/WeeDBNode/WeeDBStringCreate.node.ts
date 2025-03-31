import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';
import WeeDB from '../../src/WeeDB';

 
export class WeeDBStringCreate implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'WeeDB String Create',
		name: 'weeDBStringCreate',
		group: ['transform'],
		version: 3,
		description: 'Create a new WeeDB string',
		defaults: {
			color: '#ff9900',
			name: 'weeDBStringCreate',
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
				type: 'string',
				default: '',
				placeholder: 'String Data to save',
				description: 'Strign Data to save',
			}
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {


		const credentials = await this.getCredentials('weeDBConnection');
		const apiKey = credentials.databaseId as string;
		let data = this.getNodeParameter('data', 0) as string;

		const weeDB = WeeDB.getInstance(apiKey);
		if (!weeDB) throw new Error('Failed to initialize WeeDB');
		const item = await weeDB.create({data});
		
		// const initialMessageType = this.getNodeParameter('initialMessageType', 0) as string;
		// const initialMessage = this.getNodeParameter('initialMessage', 0) as string;

		// let prompt = this.getNodeParameter('prompt', 0) as string;

	
		
		return [this.helpers.returnJsonArray({item})];

	}
}
