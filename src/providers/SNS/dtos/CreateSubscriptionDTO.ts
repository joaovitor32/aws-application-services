export default interface CreateSubscritpionDTO{
    Protocol: "email" | "sms" | "http" | "https" | "email" | "email-json" | "sqs" | "application" | "lambda" | "firehose",
    TopicArn: string,
    Endpoint: string
}