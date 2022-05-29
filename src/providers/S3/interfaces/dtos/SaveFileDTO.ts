export default interface SaveFileDTO{
    Bucket:string,
    file:string
    ACL: "private" | "public-read" | "public-read-write" | "authenticated-read",
}