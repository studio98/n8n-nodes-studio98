import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';


export class Grandcentral implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'GrandCentral',
		name: 'grandCentral',
		icon: 'file:gc.svg',
		group: ['output'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ":" + $parameter["resource"]}}',
		description: 'Consume GrandCentral API (Beta)',
		defaults: {
			name: 'GrandCentral',
		},
		usableAsTool: true,
		// eslint-disable-next-line n8n-nodes-base/node-class-description-inputs-wrong-regular-node
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],

		credentials: [
			{
				name: 'gcApi',
				required: true,
				displayOptions: {
					show: {
						authentication: ['accessToken'],
					},
				},
			},
		],
		properties: [
			{
				displayName: 'Authentication',
				name: 'authentication',
				type: 'options',
				options: [
					{
						name: 'Access Token',
						value: 'accessToken',
					},
				],
				default: 'accessToken',
			},
			{
				"displayName": "Resource",
				"name": "resource",
				"type": "options",
				"noDataExpression": true,
				"options": [
				{
						"name": "Advanced",
						"value": "advanced"
				},
				{
						"name": "Contact",
						"value": "contact"
				},
				{
						"name": "Deals",
						"value": "deals"
				},
				{
						"name": "Emails",
						"value": "emails"
				},
				{
						"name": "Organization",
						"value": "organization"
				},
				{
						"name": "To-Dos",
						"value": "to-dos"
				}],
				"default": "advanced"
		},
		{
				"displayName": "Opration",
				"name": "operation",
				"type": "options",
				"noDataExpression": true,
				"displayOptions":
				{
						"show":
						{
								"resource": ["contact"]
						}
				},
				"options": [
				{
						"name": "Add a Note",
						"value": "App\\Automations\\Actions\\Contact\\AddNote",
						"description": "Add a note",
						"action": "Add a Note"
				},
				{
						"name": "Remove Contact Tag",
						"value": "App\\Automations\\Actions\\Contact\\RemoveContactTag",
						"description": "Remove a tag to a contact",
						"action": "Remove Contact Tag"
				},
				{
						"name": "Tag Contact",
						"value": "App\\Automations\\Actions\\Contact\\TagContact",
						"description": "Add a tag to a contact",
						"action": "Tag Contact"
				}],
				"default": "App\\Automations\\Actions\\Contact\\AddNote"
		},
		{
				"displayName": "Opration",
				"name": "operation",
				"type": "options",
				"noDataExpression": true,
				"displayOptions":
				{
						"show":
						{
								"resource": ["deals"]
						}
				},
				"options": [
				{
						"name": "Change Deal Owner",
						"value": "App\\Automations\\Actions\\Deals\\ChangeDealOwner",
						"description": "Change Deal Owner",
						"action": "Change Deal Owner"
				},
				{
						"name": "Change Deal Status",
						"value": "App\\Automations\\Actions\\Deals\\ChangeDealStatus",
						"description": "Change Deal Status",
						"action": "Change Deal Status"
				},
				{
						"name": "Create Deal",
						"value": "App\\Automations\\Actions\\Deals\\CreateDeal",
						"description": "Create a new deal in a specific deal board",
						"action": "Create Deal"
				},
				{
						"name": "Move Deal",
						"value": "App\\Automations\\Actions\\Deals\\MoveDeal",
						"description": "Move Deal to another stage",
						"action": "Move Deal"
				}],
				"default": "App\\Automations\\Actions\\Deals\\ChangeDealOwner"
		},
		{
				"displayName": "Opration",
				"name": "operation",
				"type": "options",
				"noDataExpression": true,
				"displayOptions":
				{
						"show":
						{
								"resource": ["emails"]
						}
				},
				"options": [
				{
						"name": "Send Email",
						"value": "App\\Automations\\Actions\\Emails\\SendEmail",
						"description": "Send Email",
						"action": "Send Email"
				}],
				"default": "App\\Automations\\Actions\\Emails\\SendEmail"
		},
		{
				"displayName": "Opration",
				"name": "operation",
				"type": "options",
				"noDataExpression": true,
				"displayOptions":
				{
						"show":
						{
								"resource": ["organization"]
						}
				},
				"options": [
				{
						"name": "Remove Organization Tag",
						"value": "App\\Automations\\Actions\\Organization\\RemoveOrganizationTag",
						"description": "Remove a tag to an organization",
						"action": "Remove Organization Tag"
				},
				{
						"name": "Tag Organization",
						"value": "App\\Automations\\Actions\\Organization\\TagOrganization",
						"description": "Add a tag to an organization",
						"action": "Tag Organization"
				}],
				"default": "App\\Automations\\Actions\\Organization\\RemoveOrganizationTag"
		},
		{
				"displayName": "Opration",
				"name": "operation",
				"type": "options",
				"noDataExpression": true,
				"displayOptions":
				{
						"show":
						{
								"resource": ["to-dos"]
						}
				},
				"options": [
				{
						"name": "Add To-do Task",
						"value": "App\\Automations\\Actions\\Todo\\AddTodoTask",
						"description": "Add a To-do task",
						"action": "Add To-do Task"
				}],
				"default": "App\\Automations\\Actions\\Todo\\AddTodoTask"
		},
		{
				"displayName": "Contact",
				"name": "contact",
				"type": "string",
				"default": "",
				"displayOptions":
				{
						"show":
						{
								"resource": ["contact"],
								"operation": ["App\\Automations\\Actions\\Contact\\AddNote"]
						}
				},
				"required": true
		},
		{
				"displayName": "Note",
				"name": "note",
				"type": "string",
				"default": "",
				"displayOptions":
				{
						"show":
						{
								"resource": ["contact"],
								"operation": ["App\\Automations\\Actions\\Contact\\AddNote"]
						}
				},
				"required": true
		},
		{
				"displayName": "Contact",
				"name": "contact",
				"type": "string",
				"default": "",
				"displayOptions":
				{
						"show":
						{
								"resource": ["contact"],
								"operation": ["App\\Automations\\Actions\\Contact\\RemoveContactTag"]
						}
				},
				"required": true
		},
		{
				"displayName": "Tag",
				"name": "tag",
				"type": "string",
				"default": "",
				"displayOptions":
				{
						"show":
						{
								"resource": ["contact"],
								"operation": ["App\\Automations\\Actions\\Contact\\RemoveContactTag"]
						}
				},
				"required": true
		},
		{
				"displayName": "Contact",
				"name": "contact",
				"type": "string",
				"default": "",
				"displayOptions":
				{
						"show":
						{
								"resource": ["contact"],
								"operation": ["App\\Automations\\Actions\\Contact\\TagContact"]
						}
				},
				"required": true
		},
		{
				"displayName": "Tag",
				"name": "tag",
				"type": "string",
				"default": "",
				"displayOptions":
				{
						"show":
						{
								"resource": ["contact"],
								"operation": ["App\\Automations\\Actions\\Contact\\TagContact"]
						}
				},
				"required": true
		},
		{
				"displayName": "Deal",
				"name": "deal",
				"type": "string",
				"default": "",
				"displayOptions":
				{
						"show":
						{
								"resource": ["deals"],
								"operation": ["App\\Automations\\Actions\\Deals\\ChangeDealOwner"]
						}
				},
				"required": true
		},
		{
				"displayName": "Owner",
				"name": "owner",
				"type": "string",
				"default": "",
				"displayOptions":
				{
						"show":
						{
								"resource": ["deals"],
								"operation": ["App\\Automations\\Actions\\Deals\\ChangeDealOwner"]
						}
				},
				"required": true
		},
		{
				"displayName": "Deal",
				"name": "deal",
				"type": "string",
				"default": "",
				"displayOptions":
				{
						"show":
						{
								"resource": ["deals"],
								"operation": ["App\\Automations\\Actions\\Deals\\ChangeDealStatus"]
						}
				},
				"required": true
		},
		{
				"displayName": "Status",
				"name": "status",
				"type": "string",
				"default": "",
				"displayOptions":
				{
						"show":
						{
								"resource": ["deals"],
								"operation": ["App\\Automations\\Actions\\Deals\\ChangeDealStatus"]
						}
				},
				"required": true
		},
		{
				"displayName": "Deal Board",
				"name": "dealBoard",
				"type": "string",
				"default": "",
				"displayOptions":
				{
						"show":
						{
								"resource": ["deals"],
								"operation": ["App\\Automations\\Actions\\Deals\\CreateDeal"]
						}
				},
				"required": true
		},
		{
				"displayName": "Deal Name",
				"name": "dealName",
				"type": "string",
				"default": "",
				"displayOptions":
				{
						"show":
						{
								"resource": ["deals"],
								"operation": ["App\\Automations\\Actions\\Deals\\CreateDeal"]
						}
				},
				"required": true
		},
		{
				"displayName": "Deal Value",
				"name": "dealValue",
				"type": "string",
				"default": "",
				"displayOptions":
				{
						"show":
						{
								"resource": ["deals"],
								"operation": ["App\\Automations\\Actions\\Deals\\CreateDeal"]
						}
				},
				"required": false
		},
		{
				"displayName": "Owner",
				"name": "owner",
				"type": "string",
				"default": "",
				"displayOptions":
				{
						"show":
						{
								"resource": ["deals"],
								"operation": ["App\\Automations\\Actions\\Deals\\CreateDeal"]
						}
				},
				"required": true
		},
		{
				"displayName": "No Value",
				"name": "noValue",
				"type": "string",
				"default": "",
				"displayOptions":
				{
						"show":
						{
								"resource": ["deals"],
								"operation": ["App\\Automations\\Actions\\Deals\\CreateDeal"]
						}
				},
				"required": false
		},
		{
				"displayName": "Organization",
				"name": "organization",
				"type": "string",
				"default": "",
				"displayOptions":
				{
						"show":
						{
								"resource": ["deals"],
								"operation": ["App\\Automations\\Actions\\Deals\\CreateDeal"]
						}
				},
				"required": true
		},
		{
				"displayName": "Contact",
				"name": "contact",
				"type": "string",
				"default": "",
				"displayOptions":
				{
						"show":
						{
								"resource": ["deals"],
								"operation": ["App\\Automations\\Actions\\Deals\\CreateDeal"]
						}
				},
				"required": false
		},
		{
				"displayName": "Deal",
				"name": "deal",
				"type": "string",
				"default": "",
				"displayOptions":
				{
						"show":
						{
								"resource": ["deals"],
								"operation": ["App\\Automations\\Actions\\Deals\\MoveDeal"]
						}
				},
				"required": true
		},
		{
				"displayName": "Deal Board",
				"name": "dealBoard",
				"type": "string",
				"default": "",
				"displayOptions":
				{
						"show":
						{
								"resource": ["deals"],
								"operation": ["App\\Automations\\Actions\\Deals\\MoveDeal"]
						}
				},
				"required": true
		},
		{
				"displayName": "Deal Stage",
				"name": "dealStage",
				"type": "string",
				"default": "",
				"displayOptions":
				{
						"show":
						{
								"resource": ["deals"],
								"operation": ["App\\Automations\\Actions\\Deals\\MoveDeal"]
						}
				},
				"required": true
		},
		{
				"displayName": "To",
				"name": "to",
				"type": "string",
				"default": "",
				"displayOptions":
				{
						"show":
						{
								"resource": ["emails"],
								"operation": ["App\\Automations\\Actions\\Emails\\SendEmail"]
						}
				},
				"required": true
		},
		{
				"displayName": "Subject",
				"name": "subject",
				"type": "string",
				"default": "",
				"displayOptions":
				{
						"show":
						{
								"resource": ["emails"],
								"operation": ["App\\Automations\\Actions\\Emails\\SendEmail"]
						}
				},
				"required": true
		},
		{
				"displayName": "Message",
				"name": "message",
				"type": "string",
				"default": "",
				"displayOptions":
				{
						"show":
						{
								"resource": ["emails"],
								"operation": ["App\\Automations\\Actions\\Emails\\SendEmail"]
						}
				},
				"required": true
		},
		{
				"displayName": "Organization",
				"name": "organization",
				"type": "string",
				"default": "",
				"displayOptions":
				{
						"show":
						{
								"resource": ["organization"],
								"operation": ["App\\Automations\\Actions\\Organization\\RemoveOrganizationTag"]
						}
				},
				"required": true
		},
		{
				"displayName": "Tag",
				"name": "tag",
				"type": "string",
				"default": "",
				"displayOptions":
				{
						"show":
						{
								"resource": ["organization"],
								"operation": ["App\\Automations\\Actions\\Organization\\RemoveOrganizationTag"]
						}
				},
				"required": true
		},
		{
				"displayName": "Untag All Contacts",
				"name": "untagAllContacts",
				"type": "string",
				"default": "",
				"displayOptions":
				{
						"show":
						{
								"resource": ["organization"],
								"operation": ["App\\Automations\\Actions\\Organization\\RemoveOrganizationTag"]
						}
				},
				"required": false
		},
		{
				"displayName": "Organization",
				"name": "organization",
				"type": "string",
				"default": "",
				"displayOptions":
				{
						"show":
						{
								"resource": ["organization"],
								"operation": ["App\\Automations\\Actions\\Organization\\TagOrganization"]
						}
				},
				"required": true
		},
		{
				"displayName": "Tag",
				"name": "tag",
				"type": "string",
				"default": "",
				"displayOptions":
				{
						"show":
						{
								"resource": ["organization"],
								"operation": ["App\\Automations\\Actions\\Organization\\TagOrganization"]
						}
				},
				"required": true
		},
		{
				"displayName": "Tag All Contacts",
				"name": "tagAllContacts",
				"type": "string",
				"default": "",
				"displayOptions":
				{
						"show":
						{
								"resource": ["organization"],
								"operation": ["App\\Automations\\Actions\\Organization\\TagOrganization"]
						}
				},
				"required": false
		},
		{
				"displayName": "Organization",
				"name": "organization",
				"type": "string",
				"default": "",
				"displayOptions":
				{
						"show":
						{
								"resource": ["to-dos"],
								"operation": ["App\\Automations\\Actions\\Todo\\AddTodoTask"]
						}
				},
				"required": false
		},
		{
				"displayName": "Title",
				"name": "title",
				"type": "string",
				"default": "",
				"displayOptions":
				{
						"show":
						{
								"resource": ["to-dos"],
								"operation": ["App\\Automations\\Actions\\Todo\\AddTodoTask"]
						}
				},
				"required": true
		},
		{
				"displayName": "Details",
				"name": "details",
				"type": "string",
				"default": "",
				"displayOptions":
				{
						"show":
						{
								"resource": ["to-dos"],
								"operation": ["App\\Automations\\Actions\\Todo\\AddTodoTask"]
						}
				},
				"required": false
		},
		{
				"displayName": "Priority",
				"name": "priority",
				"type": "string",
				"default": "",
				"displayOptions":
				{
						"show":
						{
								"resource": ["to-dos"],
								"operation": ["App\\Automations\\Actions\\Todo\\AddTodoTask"]
						}
				},
				"required": false
		},
		{
				"displayName": "Due Date",
				"name": "dueDate",
				"type": "string",
				"default": "",
				"displayOptions":
				{
						"show":
						{
								"resource": ["to-dos"],
								"operation": ["App\\Automations\\Actions\\Todo\\AddTodoTask"]
						}
				},
				"required": false
		},
		{
				"displayName": "Assigned To",
				"name": "assignedTo",
				"type": "string",
				"default": "",
				"displayOptions":
				{
						"show":
						{
								"resource": ["to-dos"],
								"operation": ["App\\Automations\\Actions\\Todo\\AddTodoTask"]
						}
				},
				"required": true
		},
		],
	};

	methods = {
		loadOptions: {

		},
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		// const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		// const length = items.length;
		// const qs: IDataObject = {};
		// let responseData;

		// const resource = this.getNodeParameter('resource', 0);
		// const operation = this.getNodeParameter('operation', 0);


		return [returnData];
	}
}
