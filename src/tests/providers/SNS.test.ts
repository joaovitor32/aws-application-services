import AppError from "../../errors/AppError";
import AwsProvider from "../../providers/aws";
import SNSProvider from "../../providers/SNS/SNSProvider";

let snsProvider;
let awsProvider;

describe("SNS related tests", () => {
	beforeAll(()=>{
		awsProvider = new AwsProvider({
			region: "region", 
			apiVersion: "apiVersion",
			accessKeyId: "accessKeyId", 
			secretAccessKey: "secretAccessKey"
		});
				
		snsProvider = new SNSProvider(awsProvider);
	});
	describe("Delete topic related tests",()=>{
		it("should delete topic --success case", async () => {
			const mockS3Response = {
				"$metadata": {
					httpStatusCode: 200,
					requestId: undefined,
					extendedRequestId: "",
					cfId: undefined,
					attempts: 1,
					totalRetryDelay: 0
				},
				Location: "/testeas2d"
			};
	
			jest.spyOn(snsProvider.snsInstance, "send").mockResolvedValue(mockS3Response);
	
			const response = await snsProvider.deleteTopic("bucket-name");
			expect(response).toBe(mockS3Response);
		});
		it("should not delete topic --fail case", async () => {
			const statusCode = 500;
			const DeleteTopicError = new AppError("It was not possible to delete topic.", statusCode);
	
			jest.spyOn(snsProvider.snsInstance, "send").mockImplementation(()=>{
				throw {
					"$metadata": {
						httpStatusCode: statusCode,
						requestId: undefined,
						extendedRequestId: "",
						cfId: undefined,
						attempts: 1,
						totalRetryDelay: 0
					},
					Location: "/testeas2d"
				};
			});

			expect(async () => {
				await snsProvider.deleteTopic("bucket-name");
			}).rejects.toMatchObject(DeleteTopicError);
		});
	});
	describe("List topic related tests",()=>{
		it("should list topics --success case", async () => {
			const mockS3Response = {
				"$metadata": {
					httpStatusCode: 200,
					requestId: undefined,
					extendedRequestId: "",
					cfId: undefined,
					attempts: 1,
					totalRetryDelay: 0
				},
				Location: "/testeas2d"
			};
	
			jest.spyOn(snsProvider.snsInstance, "send").mockResolvedValue(mockS3Response);
	
			const response = await snsProvider.listTopics();
			expect(response).toBe(mockS3Response);
		});
		it("should not list topics --fail case", async () => {
			const statusCode = 500;
			const ListTopicError = new AppError("It was not possible to list topics.", statusCode);
	
			jest.spyOn(snsProvider.snsInstance, "send").mockImplementation(()=>{
				throw {
					"$metadata": {
						httpStatusCode: statusCode,
						requestId: undefined,
						extendedRequestId: "",
						cfId: undefined,
						attempts: 1,
						totalRetryDelay: 0
					},
					Location: "/testeas2d"
				};
			});

			expect(async () => {
				await snsProvider.listTopics();
			}).rejects.toMatchObject(ListTopicError);
		});
	});
	describe("Check Accredited Phone related tests",()=>{
		it("should check accredited phone topics --success case", async () => {
			const mockS3Response = {
				isOptedOut:true
			};
	
			jest.spyOn(snsProvider.snsInstance, "send").mockResolvedValue(mockS3Response);
	
			const response = await snsProvider.checkAccreditedPhone("9556133129");
			expect(response).toBeTruthy();
		});
		it("should not check accreditphone --fail case", async () => {
			const statusCode = 500;
		
			jest.spyOn(snsProvider.snsInstance, "send").mockImplementation(()=>{
				throw {
					"$metadata": {
						httpStatusCode: statusCode,
						requestId: undefined,
						extendedRequestId: "",
						cfId: undefined,
						attempts: 1,
						totalRetryDelay: 0
					},
					Location: "/testeas2d"
				};
			});

			const response = await snsProvider.checkAccreditedPhone("9556133129");
			expect(response).toBeFalsy();
		});
	});
	describe("Create subscription related tests",()=>{
		it("should create subscription --success case", async () => {
			const mockS3Response = {
				"$metadata": {
					httpStatusCode: 200,
					requestId: undefined,
					extendedRequestId: "",
					cfId: undefined,
					attempts: 1,
					totalRetryDelay: 0
				},
				Location: "/testeas2d"
			};
	
			jest.spyOn(snsProvider.snsInstance, "send").mockResolvedValue(mockS3Response);
	
			const response = await snsProvider.createSubscription({TopicArn:"topic",Protocol:"protocol",Endpoint:""});
			expect(response).toBe(mockS3Response);
		});
		it("should not create subscription --fail case", async () => {
			const statusCode = 500;
			const ListTopicError = new AppError("It was not possible to make subscription.", statusCode);
	
			jest.spyOn(snsProvider.snsInstance, "send").mockImplementation(()=>{
				throw {
					"$metadata": {
						httpStatusCode: statusCode,
						requestId: undefined,
						extendedRequestId: "",
						cfId: undefined,
						attempts: 1,
						totalRetryDelay: 0
					},
					Location: "/testeas2d"
				};
			});

			expect(async () => {
				await snsProvider.createSubscription({TopicArn:"topic",Protocol:"protocol",Endpoint:""});
			}).rejects.toMatchObject(ListTopicError);
		});
	});
	describe("Publish related tests",()=>{
		it("should publish --success case", async () => {
			const mockS3Response = {
				"$metadata": {
					httpStatusCode: 200,
					requestId: undefined,
					extendedRequestId: "",
					cfId: undefined,
					attempts: 1,
					totalRetryDelay: 0
				},
				Location: "/testeas2d"
			};
	
			jest.spyOn(snsProvider.snsInstance, "send").mockResolvedValue(mockS3Response);
	
			const response = await snsProvider.publish({ TopicArn:"topic", Message:"message" });
			expect(response).toBe(mockS3Response);
		});
		it("should not publish --fail case", async () => {
			const statusCode = 500;
			const PublishError = new AppError("It was not possible to publish.", statusCode);

			jest.spyOn(snsProvider.snsInstance, "send").mockImplementation(()=>{
				throw {
					"$metadata": {
						httpStatusCode: statusCode,
						requestId: undefined,
						extendedRequestId: "",
						cfId: undefined,
						attempts: 1,
						totalRetryDelay: 0
					},
					Location: "/testeas2d"
				};
			});

			expect(async () => {
				await snsProvider.publish({ TopicArn:"topic", Message:"message" });
			}).rejects.toMatchObject(PublishError);
		});
	});
	describe("Confirm Subscription related tests",()=>{
		it("should confirm subscription --success case", async () => {
			const mockS3Response = {
				"$metadata": {
					httpStatusCode: 200,
					requestId: undefined,
					extendedRequestId: "",
					cfId: undefined,
					attempts: 1,
					totalRetryDelay: 0
				},
				Location: "/testeas2d"
			};
	
			jest.spyOn(snsProvider.snsInstance, "send").mockResolvedValue(mockS3Response);
	
			const response = await snsProvider.confirmSubscription({ TopicArn:"topic", Token:"token" });
			expect(response).toBe(mockS3Response);
		});
		it("should not confirm subscription --fail case", async () => {
			const statusCode = 500;
			const ConfirmSubscriptionError = new AppError("It was not possible to confirm subscription.", statusCode);
	
			jest.spyOn(snsProvider.snsInstance, "send").mockImplementation(()=>{
				throw {
					"$metadata": {
						httpStatusCode: statusCode,
						requestId: undefined,
						extendedRequestId: "",
						cfId: undefined,
						attempts: 1,
						totalRetryDelay: 0
					},
					Location: "/testeas2d"
				};
			});

			expect(async () => {
				await snsProvider.confirmSubscription({ TopicArn:"topic", Token:"token" });
			}).rejects.toMatchObject(ConfirmSubscriptionError);
		});
	});
	describe("Create Topic related tests",()=>{
		it("should create topic --success case", async () => {
			const mockS3Response = {
				"$metadata": {
					httpStatusCode: 200,
					requestId: undefined,
					extendedRequestId: "",
					cfId: undefined,
					attempts: 1,
					totalRetryDelay: 0
				},
				Location: "/testeas2d"
			};
	
			jest.spyOn(snsProvider.snsInstance, "send").mockResolvedValue(mockS3Response);
	
			const response = await snsProvider.createTopic("topic");
			expect(response).toBe(mockS3Response);
		});
		it("should not confirm subscription --fail case", async () => {
			const statusCode = 500;
			const CreateTopicError = new AppError("It was not possible to create topic.", statusCode);
	
			jest.spyOn(snsProvider.snsInstance, "send").mockImplementation(()=>{
				throw {
					"$metadata": {
						httpStatusCode: statusCode,
						requestId: undefined,
						extendedRequestId: "",
						cfId: undefined,
						attempts: 1,
						totalRetryDelay: 0
					},
					Location: "/testeas2d"
				};
			});

			expect(async () => {
				await snsProvider.createTopic("topic");
			}).rejects.toMatchObject(CreateTopicError);
		});
	});
	describe("Unsubscribe related tests",()=>{
		it("should unsubscribe --success case", async () => {
			const mockS3Response = {
				"$metadata": {
					httpStatusCode: 200,
					requestId: undefined,
					extendedRequestId: "",
					cfId: undefined,
					attempts: 1,
					totalRetryDelay: 0
				},
				Location: "/testeas2d"
			};
	
			jest.spyOn(snsProvider.snsInstance, "send").mockResolvedValue(mockS3Response);
	
			const response = await snsProvider.unsubscribe("unsubscribing");
			expect(response).toBe(mockS3Response);
		});
		it("should not unsubscribe --fail case", async () => {
			const statusCode = 500;
			const UnsubscribeError = new AppError("It was not possible to unsubscribe.", statusCode);
	
			jest.spyOn(snsProvider.snsInstance, "send").mockImplementation(()=>{
				throw {
					"$metadata": {
						httpStatusCode: statusCode,
						requestId: undefined,
						extendedRequestId: "",
						cfId: undefined,
						attempts: 1,
						totalRetryDelay: 0
					},
					Location: "/testeas2d"
				};
			});

			expect(async () => {
				await snsProvider.unsubscribe("unsubscribing");
			}).rejects.toMatchObject(UnsubscribeError);
		});
	});
});
