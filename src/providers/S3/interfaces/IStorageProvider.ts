import CreateBucketDTO from "./dtos/CreateBucketDTO";
import DeleteObjectOfBucketDTO from "./dtos/DeleteObjectOfBucketDTO";
import SaveFileDTO from "./dtos/SaveFileDTO";

import { 
	CreateBucketResponse,
	DeleteFileResponse,
	PutFileResponse,
	GetObjectResponse,
	ListObjectsResponse
} from "../../../types";
import GetObjectDTO from "./dtos/GetObjectDTO";

export default interface IStorageProvider{
    saveFile(data:SaveFileDTO):Promise<PutFileResponse>;
    deleteFile(data:DeleteObjectOfBucketDTO):Promise<DeleteFileResponse>;
    listFiles(Bucket:string):Promise<ListObjectsResponse>
    createBucket(data:CreateBucketDTO):Promise<CreateBucketResponse>
    getFile(data:GetObjectDTO):Promise<GetObjectResponse>
    checkIfBucketExists(name:string):Promise<boolean>
}