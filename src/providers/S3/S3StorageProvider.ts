import IStorageProvider from "./interfaces/IStorageProvider";

import CreateBucketDTO from "./interfaces/dtos/CreateBucketDTO";
import DeleteObjectOfBucketDTO from "./interfaces/dtos/DeleteObjectOfBucketDTO";
import SaveFileDTO from "./interfaces/dtos/SaveFileDTO";
import GetObjectDTO from "./interfaces/dtos/GetObjectDTO";

import AppError from "../../errors/AppError";

import {
	AwsInstanceInterface, 
	CreateBucketResponse, 
	DeleteFileResponse, 
	PutFileResponse, 
	GetObjectResponse,
	ListObjectsResponse
} from "../../types";

import { 
	S3Client,
	CreateBucketCommand,
	HeadBucketCommand, 
	DeleteObjectCommand, 
	PutObjectCommand,  
	GetObjectCommand,
	ListObjectsCommand
} from "@aws-sdk/client-s3";

import AWS from "../aws";

import fs from "fs";
import mime from "mime";
import path from "path";

type S3InstanceInterface = AWS<AwsInstanceInterface,S3Client>

class S3StorageProvider implements IStorageProvider {
	s3Instance:S3Client;

	constructor(awsInstance:S3InstanceInterface){
		this.s3Instance = awsInstance.generateClient(S3Client);
	}
	public async listFiles(Bucket: string): Promise<ListObjectsResponse> {
		const params = {
			Bucket
		};

		try{
			return this.s3Instance.send(new ListObjectsCommand(params));
		}catch(error){
			const { httpStatusCode } = error.$metadata;
			throw new AppError("It was not possible to list files from bucket.", httpStatusCode);
		}

	}
	
	public async getFile({ Bucket , Key}: GetObjectDTO): Promise<GetObjectResponse> {
		const params = {
			Bucket,
			Key
		};
		
		try {
			return this.s3Instance.send(new GetObjectCommand(params));
		} catch (error) {
			const { httpStatusCode } = error.$metadata;
			throw new AppError("It was not possible to retrieve object from bucket.", httpStatusCode);
		}
	}

	public async checkIfBucketExists(bucketName:string) : Promise<boolean>{
		const params = {
			Bucket: bucketName,
		};
		
		try {
			await this.s3Instance.send(new HeadBucketCommand(params));
			return true;
		} catch (error) {
			const { httpStatusCode } = error.$metadata;
			if(httpStatusCode === 404) return false;
		}
	}

	public async createBucket({ bucketName, ACL }: CreateBucketDTO): Promise<CreateBucketResponse> {
		const params = {
			Bucket: bucketName,
			ACL
		};

		try{
			return this.s3Instance.send(new CreateBucketCommand(params));
		}catch(error){
			const { httpStatusCode } = error.$metadata;
			throw new AppError("It was not possible to create a bucket.", httpStatusCode);
		}
	}

	public async saveFile({ Bucket, file, ACL }:SaveFileDTO): Promise<PutFileResponse> {
		const contentType = mime.getType(file);

		if(!contentType){
			throw new AppError("It was not possible to define content-type");
		}

		const fileContent = await fs.promises.readFile(file);
		const filename = path.basename(file);

		const params = {
			Bucket,
			Key:filename,
			ACL,
			Body:fileContent,
			ContentType:contentType,
			ContentDisposition:`inline;filename=${file}`
		};
			
		const bucketExists = await this.checkIfBucketExists(Bucket);

		if(!bucketExists){
			await this.createBucket({ bucketName:Bucket, ACL});
		}
		
		try{
			return this.s3Instance.send(new PutObjectCommand(params));
		}catch(error){
			const { httpStatusCode } = error.$metadata;
			throw new AppError("It was not possible to insert file on bucket.", httpStatusCode);
		}
	}

	public async deleteFile({ Bucket,Key }:DeleteObjectOfBucketDTO): Promise<DeleteFileResponse> {
		const params = {
			Bucket,
			Key 
		};

		try{
			return this.s3Instance.send(new DeleteObjectCommand(params));
		}catch (error){
			const { httpStatusCode } = error.$metadata;
			throw new AppError("It was not possible to delete file.", httpStatusCode);
		}
	}
}

export default S3StorageProvider;