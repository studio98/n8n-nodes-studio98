import type {
	IDataObject,
	IHookFunctions,
	INodeType,
	INodeTypeDescription,
	IWebhookFunctions,
	IWebhookResponseData,
} from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';
import { gcApiRequest } from './GenericFunctions';

export class GrandcentralTrigger implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'GrandCentral Trigger',
		name: 'grandcentralTrigger',
		icon: 'file:gc.svg',
		group: ['trigger'],
		version: 1,
		description: 'Handle GrandCentral events via webhooks',
		defaults: {
			name: 'GrandCentral Trigger',
		},
		inputs: [],
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
				displayName: 'Events',
				name: 'events',
				type: 'multiOptions',
				required: true,
				default: [],
				options: [
					{
							"name": "Invoice Created",
							"value": "automations.App\\Automations\\Triggers\\Billing\\InvoiceCreated",
					},
					{
							"name": "Invoice Sent",
							"value": "automations.App\\Automations\\Triggers\\Billing\\InvoiceSent",
					},
					{
							"name": "Payment Made",
							"value": "automations.App\\Automations\\Triggers\\Billing\\PaymentMade",
					},
					{
							"name": "Contact Created",
							"value": "automations.App\\Automations\\Triggers\\Contacts\\ContactCreated",
					},
					{
							"name": "Contact Deleted",
							"value": "automations.App\\Automations\\Triggers\\Contacts\\ContactDeleted",
					},
					{
							"name": "Contact Status Updates",
							"value": "automations.App\\Automations\\Triggers\\Contacts\\ContactStatus",
					},
					{
							"name": "Contact Tagged",
							"value": "automations.App\\Automations\\Triggers\\Contacts\\ContactTagged",
					},
					{
							"name": "Deal Created",
							"value": "automations.App\\Automations\\Triggers\\Deals\\DealCreated",
					},
					{
							"name": "Deal Owner Changes",
							"value": "automations.App\\Automations\\Triggers\\Deals\\DealOwnerUpdated",
					},
					{
							"name": "Deal Stage Changes",
							"value": "automations.App\\Automations\\Triggers\\Deals\\DealStage",
					},
					{
							"name": "Deal Status Changes",
							"value": "automations.App\\Automations\\Triggers\\Deals\\DealStatus",
					},
					{
							"name": "Organization Created",
							"value": "automations.App\\Automations\\Triggers\\Organizations\\OrganizationCreated",
					},
					{
							"name": "Organization Deleted",
							"value": "automations.App\\Automations\\Triggers\\Organizations\\OrganizationDeleted",
					},
					{
							"name": "Organization Owner Updates",
							"value": "automations.App\\Automations\\Triggers\\Organizations\\OrganizationOwnerUpdated",
					},
					{
							"name": "Organization Status Updates",
							"value": "automations.App\\Automations\\Triggers\\Organizations\\OrganizationStatus",
					},
					{
							"name": "Organization Tagged",
							"value": "automations.App\\Automations\\Triggers\\Organizations\\OrganizationTagged",
					},
					{
							"name": "Project Archived",
							"value": "automations.App\\Automations\\Triggers\\Projects\\ProjectArchived",
					},
					{
							"name": "Project Completed",
							"value": "automations.App\\Automations\\Triggers\\Projects\\ProjectCompleted",
					},
					{
							"name": "Project Created",
							"value": "automations.App\\Automations\\Triggers\\Projects\\ProjectCreated",
					},
					{
							"name": "Project Stage Updated",
							"value": "automations.App\\Automations\\Triggers\\Projects\\ProjectStageUpdated",
					},
					{
							"name": "Proposal Accepted",
							"value": "automations.App\\Automations\\Triggers\\Proposals\\ProposalAccepted",
					},
					{
							"name": "Proposal Archived",
							"value": "automations.App\\Automations\\Triggers\\Proposals\\ProposalArchived",
					},
					{
							"name": "Proposal Created",
							"value": "automations.App\\Automations\\Triggers\\Proposals\\ProposalCreated",
					},
					{
							"name": "Proposal Deposited",
							"value": "automations.App\\Automations\\Triggers\\Proposals\\ProposalDeposited",
					},
					{
							"name": "Proposal Sent",
							"value": "automations.App\\Automations\\Triggers\\Proposals\\ProposalSent",
					},
					{
							"name": "Proposal Viewed",
							"value": "automations.App\\Automations\\Triggers\\Proposals\\ProposalViewed",
					},
					{
							"name": "Subscription Added",
							"value": "automations.App\\Automations\\Triggers\\Subsciption\\SubscriptionAdded",
					},
					{
							"name": "Subscription Cancelled",
							"value": "automations.App\\Automations\\Triggers\\Subsciption\\SubscriptionCancelled",
					},
					{
							"name": "Subscription Board Active",
							"value": "automations.App\\Automations\\Triggers\\SubsciptionBoard\\SubscriptionBoardActive",
					},
					{
							"name": "Subscription Board Delivered",
							"value": "automations.App\\Automations\\Triggers\\SubsciptionBoard\\SubscriptionBoardDelivered",
					},
					{
							"name": "Subscription Board Overdue",
							"value": "automations.App\\Automations\\Triggers\\SubsciptionBoard\\SubscriptionBoardOverdue",
					},
					{
							"name": "Subscription Board Pending",
							"value": "automations.App\\Automations\\Triggers\\SubsciptionBoard\\SubscriptionBoardPending",
					},
					{
							"name": "Ticket Assigned",
							"value": "automations.App\\Automations\\Triggers\\Support\\TicketAssigned",
					},
					{
							"name": "Ticket Closed",
							"value": "automations.App\\Automations\\Triggers\\Support\\TicketClosed",
					},
					{
							"name": "Ticket Created",
							"value": "automations.App\\Automations\\Triggers\\Support\\TicketCreated",
					},
					{
							"name": "Ticket New Message",
							"value": "automations.App\\Automations\\Triggers\\Support\\TicketNewMessage",
					},
					{
							"name": "Ticket Replied",
							"value": "automations.App\\Automations\\Triggers\\Support\\TicketReplied",
					},
					{
							"name": "User Created",
							"value": "automations.App\\Automations\\Triggers\\Users\\UserCreated",
					},
					{
							"name": "User Deleted",
							"value": "automations.App\\Automations\\Triggers\\Users\\UserDeleted",
					},
					{
							"name": "User Role Updates",
							"value": "automations.App\\Automations\\Triggers\\Users\\UserRoleUpdated",
					}],
			},
		],
		webhooks: [
			{
				name: 'default',
				httpMethod: 'POST',
				responseMode: 'onReceived',
				path: 'webhook',
			},
		],
	};

	webhookMethods = {
		default: {
			async checkExists(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');
				if (webhookData.webhookId === undefined) {
					return false;
				}
				const endpoint = `/webhooks/check`;
				const  webhooks  = await gcApiRequest.call(this, 'GET', endpoint);
				if (Array.isArray(webhooks)) {
					for (const webhook of webhooks) {
						if (webhook.id === webhookData.webhookId) {
							return true;
						}
					}
				}
				return false;
			},
			async create(this: IHookFunctions): Promise<boolean> {
				const webhookUrl = this.getNodeWebhookUrl('default');
				const webhookData = this.getWorkflowStaticData('node');
				const events = this.getNodeParameter('events') as string[];
				const endpoint = `/webhooks/create`;
				const body: IDataObject = {
					endpoint: webhookUrl,
					events,
				};
				const webhook  = await gcApiRequest.call(this, 'POST', endpoint, body);

				webhookData.webhookId = webhook.id;
				webhookData.secret = webhook.secret;
				return true;
			},
			async delete(this: IHookFunctions): Promise<boolean> {
				const webhookData = this.getWorkflowStaticData('node');
				const endpoint = `/webhook/${webhookData.webhookId}`;
				try {
					await gcApiRequest.call(this, 'DELETE', endpoint);
				} catch (error) {
					return false;
				}
				delete webhookData.webhookId;
				delete webhookData.secret;
				return true;
			},
		},
	};

	async webhook(this: IWebhookFunctions): Promise<IWebhookResponseData> {
		// const credentials = await this.getCredentials('telegramApi');

		const bodyData = this.getBodyData() ;
		// const headerData = this.getHeaderData();


		return {
			workflowData: [this.helpers.returnJsonArray([bodyData as unknown as IDataObject])],
		};
	}
}
