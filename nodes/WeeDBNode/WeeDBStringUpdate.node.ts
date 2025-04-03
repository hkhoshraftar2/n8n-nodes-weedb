import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';
import WeeDB from '../../src/WeeDB';


export class WeeDBStringUpdate implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'WeeDB String Update',
		name: 'weeDBStringUpdate',
		group: ['WeeDB'],
		version: 3,
		description: 'Update a WeeDB string',
		defaults: {
			color: '#ff9900',
			name: 'weeDBStringUpdate',
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
				type: 'string',
				default: '',
				placeholder: 'String Data to Update',
				description: 'Strign Data to Update',
			},
			{
				displayName: 'Cerate',
				name: 'create',
				type: 'boolean',
				default: false,
				description: 'Create record if not exist',
			},
		]
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {


		const credentials = await this.getCredentials('weeDBConnection');
		const apiKey = credentials.databaseId as string;
		let data = this.getNodeParameter('data', 0) as string;
		let id = this.getNodeParameter('id', 0) as string;
		let create = this.getNodeParameter('create', 0) as boolean;

		const weeDB = WeeDB.getInstance(apiKey);
		if (!weeDB) throw new Error('Failed to initialize WeeDB');

		let item = null;
		if (create)
			item = await weeDB.createOrUpdateString(id, { data });
		else
			item = await weeDB.update(id, { data });

		return [this.helpers.returnJsonArray({ item })];

	}
}
