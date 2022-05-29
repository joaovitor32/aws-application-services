import ISNSProvider from "./interfaces/ISNSProvider";

import AppError from "../../errors/AppError";

import {
	AwsInstanceInterface,
	CreateSubscriptionResponse,
	CreateTopicResponse,
	ListTopicResponse,
	DeleteTopicResponse,
	PublishResponse,
	ConfirmSubscriptionResponse,
	UnsubscribeResponse
} from "../../types";

import { 
	SNSClient,
	CheckIfPhoneNumberIsOptedOutCommand,
	SubscribeCommand,
	CreateTopicCommand,
	ListTopicsCommand,
	DeleteTopicCommand,
	PublishCommand,
	ConfirmSubscriptionCommand,
	UnsubscribeCommand,
} from "@aws-sdk/client-sns";


import AWS from "../aws";
import CreateSubscriptionDTO from "./dtos/CreateSubscriptionDTO";
import PublishDTO from "./dtos/PublishDTO";
import ConfirmSubscriptionDTO from "./dtos/ConfirmSubscriptionDTO";

type SNSInstanceInterface = AWS<AwsInstanceInterface, SNSClient>

class SNSProvider implements ISNSProvider {
	snsInstance:SNSClient;

	constructor(awsInstance:SNSInstanceInterface){
		this.snsInstance = awsInstance.generateClient(SNSClient);
	}
	public async unsubscribe(subscriptionArn: string): Promise<UnsubscribeResponse> {
		const params  = { SubscriptionArn:subscriptionArn };
		
		try{
			return this.snsInstance.send(new UnsubscribeCommand(params));
		}catch(error){
			const { httpStatusCode } = error.$metadata;
			throw new AppError("It was not possible to unsubscribe.", httpStatusCode);
		}
	}
	public async confirmSubscription({ TopicArn, Token }: ConfirmSubscriptionDTO): Promise<ConfirmSubscriptionResponse> {
		const params = { TopicArn, Token };
	
		try{
			return this.snsInstance.send(new ConfirmSubscriptionCommand(params));
		}catch(error){
			const { httpStatusCode } = error.$metadata;
			throw new AppError("It was not possible to confirm subscription.", httpStatusCode);
		}
	}
	
	public async publish({ TopicArn, Message }: PublishDTO): Promise<PublishResponse> {
		const params = { TopicArn, Message };
		
		try{
			return this.snsInstance.send(new PublishCommand(params));
		}catch(error){
			const { httpStatusCode } = error.$metadata;
			throw new AppError("It was not possible to publish.", httpStatusCode);
		}
	}
	
	public async deleteTopic(name: string): Promise<DeleteTopicResponse> {
		const params = { TopicArn: name };
		
		try{
			return this.snsInstance.send(new DeleteTopicCommand(params));
		}catch(error){
			const { httpStatusCode } = error.$metadata;
			throw new AppError("It was not possible to delete topic.", httpStatusCode);
		}
	}
	
	public async listTopics(): Promise<ListTopicResponse> {
		
		try{
			return this.snsInstance.send(new ListTopicsCommand({}));
		}catch(error){
			const { httpStatusCode } = error.$metadata;
			throw new AppError("It was not possible to list topics.", httpStatusCode);
		}
	}

	/**
    * @param {string} phoneNumber 
    * @returns Check if phoneNumber opt out to receive messages
    */
	public async checkAccreditedPhone(phoneNumber: string): Promise<boolean | undefined> {
		const params = { phoneNumber };

		try{
			const { isOptedOut } = await this.snsInstance.send(new CheckIfPhoneNumberIsOptedOutCommand(params));
			return isOptedOut;
		}catch(error){
			return false;	
		}
	}
	/**
	 * Allow a phone number, email, etc... to receive messages 
	 * @returns boolean 
	 */
	public async createSubscription({ TopicArn, Protocol, Endpoint }: CreateSubscriptionDTO):Promise<CreateSubscriptionResponse> {
		const params = { TopicArn, Protocol, Endpoint };

		try{
			return this.snsInstance.send(new SubscribeCommand(params));
		}catch(error){
			const { httpStatusCode } = error.$metadata;
			throw new AppError("It was not possible to make subscription.", httpStatusCode);
		}
	}

	/**
	 * Creates a topic to which notifications can be published.
	 * @param name  
	 */
	public async createTopic(name: string): Promise<CreateTopicResponse> {
		const params = { Name:name };

		try{
			return this.snsInstance.send(new CreateTopicCommand(params));
		}catch(error){
			const { httpStatusCode } = error.$metadata;
			throw new AppError("It was not possible to create topic.", httpStatusCode);
		}
	}
}

export default SNSProvider;