# aws-application-services

## Overview
   
#####  
A simple set of functions to facilitate the use of AWS services, such as: S3, SNS...

##### Installation

```bash
npm i aws-application-services
```
### S3 Functions

| Function             | Parameters | Response - Return type |
| -------------------- | -------- | -------- | 
| listFiles                | Bucket: string  | Retrieve files inside specific bucket    
| getFile                | { Bucket: string, Key:string }  | Get specific file inside specific bucket    
| checkIfBucketExists    | bucketName: string  | Returns a boolean related to the existence of a bucket    
| createBucket | { bucketName:string, ACL: string }   | Returns instance of newly created bucket 
| saveFile | {  Bucket:string, file:string, ACL:string } | Returns instance of newly created file  
| deletedFile | {  Bucket:string, Key:string } | Returns instance of newly deleted file  
                                        

### SNS Functions

| Function             | Parameters | Response - Return type |
| -------------------- | -------- | -------- | 
| unsubscribe         |  subscriptionArn: string  | Return object related to subscription delete
| confirmSubscription       |  { TopicArn, Token: string }  | Return object related to confirmation of subscription
| publish       |  { TopicArn: string, Message: string }  | Return object related to message sent to a topic
| deleteTopic       |  name:string  | Return object related to deletion of topic and all subscriptions 
| listTopics       |   | Return object related to all user's topics
| checkAccreditedPhone       |  phoneNumber:string  | Check if phone holder opted to receive messages
| createSubscription       |  { TopicArn: string , Protocol: string, Endpoint: string }  | Subscribe someone to an especific topic
| createTopic       |  name: string  | Return object related to topic creation


### How instantiate aws factory

```ts
import AwsFactory from "aws-application-services";

const { SNS, S3 } = AwsFactory.startAws({
    region: "region",    
    accessKeyId: "accessKeyId",
    secretAccessKey: "secretAccessKey",
    apiVersion: "apiVersion"
});

```

### How use instance

```ts
const createBucket = async ({bucketName,ACL}) =>{
    return S3.createBucket({bucketName,ACL});
};

const listTopics = async  () =>{
    return SNS.listTopics();
};
```

### Tests
#### To run tests you can use the following command:
```
$ npm run test
```

### Reference

##### https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/index.html

## License

[MIT](https://choosealicense.com/licenses/mit/)