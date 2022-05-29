import { AwsInstanceInterface } from "../types";
 
class AWS<T extends AwsInstanceInterface ,U>{
	private instance:T;

	constructor(instance:T){
		this.instance = instance;
	}

	getInstance():T{
		return this.instance;
	}

	generateClient(awsService):U{
		const { region, apiVersion, secretAccessKey, accessKeyId } = this.getInstance();
		
		return new awsService({ 
			region,
			apiVersion,
			credentials: { 
				secretAccessKey, 
				accessKeyId
			} 
		}); 
	}

}

export default AWS;