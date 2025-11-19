import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

// Create an AWS resource (S3 Bucket)
const bucket = new aws.s3.Bucket("pulumi-state", {
    acl: "private",
    versioning: {
        enabled: true,
    },
    tags: {
        Project: "ultrafitlab",
        Environment: pulumi.getStack(),
    },
});

// Export the name of the bucket
export const pulumiStateBucketName = bucket.id;
