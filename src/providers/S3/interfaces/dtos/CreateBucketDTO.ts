export default interface CreateBucketDTO{
    ACL: "private" | "public-read" | "public-read-write" | "authenticated-read",
    bucketName: string
}