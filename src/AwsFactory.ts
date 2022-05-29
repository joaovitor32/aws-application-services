import S3StorageProvider from "./providers/S3/S3StorageProvider";
import SNSProvider from "./providers/SNS/SNSProvider";

import { AwsInstanceInterface } from "./types";

import AWS from "./providers/aws";

// Make this interface more generic
type AwsProviders = Readonly<{
    S3: S3StorageProvider;
    SNS: SNSProvider;
}>

abstract class AwsFactory{
	static aws;
	
	public static startAws({ 
		region, 
		apiVersion,
		accessKeyId,
		secretAccessKey }:AwsInstanceInterface): AwsProviders{
		
		this.aws = new AWS({
			region, 
			apiVersion,
			accessKeyId,
			secretAccessKey
		});  

		return Object.freeze({
			"S3": new S3StorageProvider(this.aws),
			"SNS": new SNSProvider(this.aws)
		});
	}
}

export default AwsFactory;