import CreateSubscriptionDTO from "../dtos/CreateSubscriptionDTO";
import PublishDTO from "../dtos/PublishDTO";
import ConfirmSubscriptionDTO from "../dtos/ConfirmSubscriptionDTO";

import { 
	CreateSubscriptionResponse,
	CreateTopicResponse,
	ListTopicResponse,
	DeleteTopicResponse,
	PublishResponse,
	ConfirmSubscriptionResponse,
	UnsubscribeResponse
} from "../../../types";

export default interface IStorageProvider{
  checkAccreditedPhone(phoneNumber:string):Promise<boolean | undefined>
  createSubscription(data:CreateSubscriptionDTO):Promise<CreateSubscriptionResponse>
  createTopic(name:string):Promise<CreateTopicResponse>
  listTopics():Promise<ListTopicResponse>
  deleteTopic(name:string):Promise<DeleteTopicResponse>
  publish(data:PublishDTO):Promise<PublishResponse>
  confirmSubscription(data:ConfirmSubscriptionDTO):Promise<ConfirmSubscriptionResponse>
  unsubscribe(subscriptionArn:string):Promise< UnsubscribeResponse>
}