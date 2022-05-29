import AppError from "../../errors/AppError";
import AwsProvider from "../../providers/aws";
import S3StorageProvider from "../../providers/S3/S3StorageProvider";
import mime from "mime";
import fs from "fs";

let s3StorageProvider;
let awsProvider;

describe("S3 related tests", () => {
	beforeAll(()=>{
		awsProvider = new AwsProvider({
			region: "region", 
			apiVersion: "apiVersion",
			accessKeyId: "accessKeyId", 
			secretAccessKey: "secretAccessKey"
		});
				
		s3StorageProvider = new S3StorageProvider(awsProvider);
	});
	describe("List files related tests",()=>{
		it("should list files --success case", async () => {
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
	
			jest.spyOn(s3StorageProvider.s3Instance, "send").mockResolvedValue(mockS3Response);
	
			const response = await s3StorageProvider.listFiles("bucket-name");
			expect(response).toBe(mockS3Response);
		});
		it("should not list files --fail case", async () => {
			const statusCode = 500;
			const ListError = new AppError("It was not possible to list files from bucket.", statusCode);
	
			jest.spyOn(s3StorageProvider.s3Instance, "send").mockImplementation(()=>{
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
				await s3StorageProvider.listFiles("bucket-name");
			}).rejects.toMatchObject(ListError);
		});
	});
	describe("Create bucket related tests",()=>{
		it("should create bucket --success case", async () => {
			const mockS3Response ={
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
	
			jest.spyOn(s3StorageProvider.s3Instance, "send").mockResolvedValue(mockS3Response);
	
			const response = await s3StorageProvider.createBucket({ bucketName:"Bucket Name", ACL:"public-read" });
			expect(response).toBe(mockS3Response);
		});
		it("should not create bucket --fail case", async () => {
			const statusCode = 500;
			const ListError = new AppError("It was not possible to create a bucket.", statusCode);
				
			jest.spyOn(s3StorageProvider.s3Instance, "send").mockImplementation(()=>{
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
				await s3StorageProvider.createBucket({ bucketName:"Bucket Name", ACL:"public-read" });
			}).rejects.toMatchObject(ListError);
		});
	});
	describe("Delete file related tests",()=>{
		it("should create bucket --success case", async () => {
			const mockS3Response ={
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
	
			jest.spyOn(s3StorageProvider.s3Instance, "send").mockResolvedValue(mockS3Response);
	
			const response = await s3StorageProvider.deleteFile({ Bucket:"Bucket Name", Key:"key" });
			expect(response).toBe(mockS3Response);
		});
		it("should not delete file --fail case", async () => {
			const statusCode = 500;
			const DeleteError = new AppError("It was not possible to delete file.", statusCode);
			
			jest.spyOn(s3StorageProvider.s3Instance, "send").mockImplementation(()=>{
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
				await s3StorageProvider.deleteFile({ Bucket:"Bucket Name", Key:"key" });
			}).rejects.toMatchObject(DeleteError);
		});
	});
	describe("Get file related tests",()=>{
		it("should get file --success case", async () => {
			const mockS3Response ={
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
	
			jest.spyOn(s3StorageProvider.s3Instance, "send").mockResolvedValue(mockS3Response);
	
			const response = await s3StorageProvider.getFile({ Bucket:"Bucket Name", Key:"key" });
			expect(response).toBe(mockS3Response);
		});
		it("should not get file --fail case", async () => {
			const statusCode = 500;
			const GetError = new AppError("It was not possible to retrieve object from bucket.", statusCode);
			
			jest.spyOn(s3StorageProvider.s3Instance, "send").mockImplementation(()=>{
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
				await s3StorageProvider.getFile({ Bucket:"Bucket Name", Key:"key" });
			}).rejects.toMatchObject(GetError);
		});
	});
	describe("Check if bucket exists related tests",()=>{
		it("should check if file exists, --success case", async () => {
			const mockS3Response ={
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
	
			jest.spyOn(s3StorageProvider.s3Instance, "send").mockResolvedValue(mockS3Response);
	
			const response = await s3StorageProvider.checkIfBucketExists("Bucket Name");
			expect(response).toBeTruthy();
		});
		it("should not be able to check if file exists, --fail case", async () => {
			const statusCode = 404;
			
			jest.spyOn(s3StorageProvider.s3Instance, "send").mockImplementation(()=>{
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

			const response = await s3StorageProvider.checkIfBucketExists("Bucket Name");
			expect(response).toBeFalsy();
		});
	});
	describe("Save file related tests",()=>{
		it("should save file, --success case", async () => {
			jest.spyOn(mime, "getType").mockResolvedValue(".png");

			jest.spyOn(fs.promises, "readFile").mockResolvedValue("file");

			jest.mock("path", () => ({
				basename: "basename",
			}));

			const mockS3Response ={
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
	
			jest.spyOn(s3StorageProvider.s3Instance, "send").mockResolvedValue(mockS3Response);
	
			const response = await s3StorageProvider.saveFile({ Bucket:"Bucket Name", file:"file.png", ACL:"acl" });
			expect(response).toBe(mockS3Response);

			
		});
		it("should not save file, --fail case", async () => {
			const statusCode = 500;
			const SaveFileError = new AppError("It was not possible to insert file on bucket.", statusCode);
			
			jest.spyOn(mime, "getType").mockResolvedValue(".png");

			jest.spyOn(fs.promises, "readFile").mockResolvedValue("file");

			jest.mock("path", () => ({
				basename: "basename",
			}));

			jest.spyOn(s3StorageProvider.s3Instance, "send").mockImplementation(()=>{
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

			jest.spyOn(s3StorageProvider, "checkIfBucketExists").mockResolvedValue(true);

			expect(async () => {
				await s3StorageProvider.saveFile({ Bucket:"Bucket Name", file:"file.png", ACL:"acl" });
			}).rejects.toMatchObject(SaveFileError);
		});
		it("should create bucket, --success case", async () => {					
			const mockS3Response ={
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
	
			
			jest.spyOn(mime, "getType").mockResolvedValue(".png");

			jest.spyOn(fs.promises, "readFile").mockResolvedValue("file");

			jest.mock("path", () => ({
				basename: "basename",
			}));

			jest.spyOn(s3StorageProvider, "checkIfBucketExists").mockResolvedValue(false);

			jest.spyOn(s3StorageProvider.s3Instance, "send").mockResolvedValue(mockS3Response);

			const createBucketSpy = jest.spyOn(s3StorageProvider,"createBucket").mockResolvedValue(jest.fn());

			await s3StorageProvider.saveFile({ Bucket:"Bucket Name", file:"file", ACL:"acl" });

			expect(createBucketSpy).toHaveBeenCalled();
		});
		it("should not save file contentType error, --fail case", async () => {
			const MemeTypeError = new AppError("It was not possible to define content-type");

			jest.spyOn(mime, "getType").mockImplementation(()=>{
				return false;
			});

			expect(async () => {
				await s3StorageProvider.saveFile({ Bucket:"Bucket Name", file:"file", ACL:"acl" });
			}).rejects.toMatchObject(MemeTypeError);
		});
	
	});
});
