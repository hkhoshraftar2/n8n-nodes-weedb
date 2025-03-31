import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class WeeDBConnection implements ICredentialType {
	name = 'weeDBConnection';
	displayName = 'WeeDB Connection';
	documentationUrl = 'https://docs.metisai.ir';
	properties: INodeProperties[] = [
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
