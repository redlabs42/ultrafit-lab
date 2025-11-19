import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as awsx from "@pulumi/awsx";

// Configuration
const config = new pulumi.Config();
const projectName = config.require("projectName"); // e.g. ultrafitlab
const environment = config.require("environment"); // e.g. staging

// --- DynamoDB Tables ---

const usersTable = new aws.dynamodb.Table("users-table", {
    attributes: [{ name: "user_id", type: "S" }],
    hashKey: "user_id",
    billingMode: "PAY_PER_REQUEST",
    tags: { Project: projectName, Environment: environment },
});

const nutritionTable = new aws.dynamodb.Table("nutrition-table", {
    attributes: [{ name: "user_id", type: "S" }, { name: "date", type: "S" }],
    hashKey: "user_id",
    rangeKey: "date",
    billingMode: "PAY_PER_REQUEST",
    tags: { Project: projectName, Environment: environment },
});

const workoutsTable = new aws.dynamodb.Table("workouts-table", {
    attributes: [{ name: "user_id", type: "S" }, { name: "date", type: "S" }],
    hashKey: "user_id",
    rangeKey: "date",
    billingMode: "PAY_PER_REQUEST",
    tags: { Project: projectName, Environment: environment },
});

// --- Cognito ---

const userPool = new aws.cognito.UserPool("user-pool", {
    autoVerifiedAttributes: ["email"],
    passwordPolicy: {
        minimumLength: 8,
        requireLowercase: true,
        requireNumbers: true,
        requireSymbols: true,
        requireUppercase: true,
    },
    tags: { Project: projectName, Environment: environment },
});

const userPoolClient = new aws.cognito.UserPoolClient("user-pool-client", {
    userPoolId: userPool.id,
    generateSecret: false,
    explicitAuthFlows: [
        "ALLOW_USER_SRP_AUTH",
        "ALLOW_REFRESH_TOKEN_AUTH",
        "ALLOW_USER_PASSWORD_AUTH" // For easier testing, can be removed for prod
    ],
});

const userPoolDomain = new aws.cognito.UserPoolDomain("user-pool-domain", {
    domain: `${projectName}-${environment}-${pulumi.getStack()}`,
    userPoolId: userPool.id,
});

// --- API Gateway (HTTP API) ---

const httpApi = new aws.apigatewayv2.Api("http-api", {
    protocolType: "HTTP",
    corsConfiguration: {
        allowOrigins: ["*"], // Update with frontend URL in production
        allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowHeaders: ["Content-Type", "Authorization"],
    },
    tags: { Project: projectName, Environment: environment },
});

const apiStage = new aws.apigatewayv2.Stage("api-stage", {
    apiId: httpApi.id,
    name: "$default",
    autoDeploy: true,
    tags: { Project: projectName, Environment: environment },
});

// --- Lambda Functions (Placeholder for now, pointing to src/backend) ---
// Note: In a real scenario, we would build the TS code to JS/dist first.
// For now, we assume the build process puts artifacts in dist/ or we use ts-node.
// Since I cannot run the build here, I will create a placeholder role.

const lambdaRole = new aws.iam.Role("lambda-role", {
    assumeRolePolicy: aws.iam.assumeRolePolicyForPrincipal({ Service: "lambda.amazonaws.com" }),
});

new aws.iam.RolePolicyAttachment("lambda-basic-execution", {
    role: lambdaRole,
    policyArn: aws.iam.ManagedPolicy.AWSLambdaBasicExecutionRole,
});

// Grant DynamoDB access to Lambda
const dynamoPolicy = new aws.iam.Policy("dynamo-policy", {
    policy: pulumi.all([usersTable.arn, nutritionTable.arn, workoutsTable.arn]).apply(([usersArn, nutritionArn, workoutsArn]) => JSON.stringify({
        Version: "2012-10-17",
        Statement: [{
            Action: ["dynamodb:GetItem", "dynamodb:PutItem", "dynamodb:UpdateItem", "dynamodb:DeleteItem", "dynamodb:Query", "dynamodb:Scan"],
            Effect: "Allow",
            Resource: [usersArn, nutritionArn, workoutsArn],
        }],
    })),
});

new aws.iam.RolePolicyAttachment("lambda-dynamo-access", {
    role: lambdaRole,
    policyArn: dynamoPolicy.arn,
});


// Exports
export const cognitoUserPoolId = userPool.id;
export const cognitoUserPoolClientId = userPoolClient.id;
export const cognitoUserPoolDomain = userPoolDomain.domain;
export const apiGatewayUrl = httpApi.apiEndpoint;
export const dynamoUsersTable = usersTable.name;
export const dynamoNutritionTable = nutritionTable.name;
export const dynamoWorkoutsTable = workoutsTable.name;
