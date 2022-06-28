import { SNSClient } from "../../node_modules/@aws-sdk/client-sns";
import { CognitoIdentityClient } from "../../node_modules/@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "../../node_modules/@aws-sdk/credential-provider-cognito-identity";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";

const REGION = "us-east-1";

// Set the AWS Region.
const snsClient = new SNSClient({
  region: REGION,
  credentials: fromCognitoIdentityPool({
    client: new CognitoIdentityClient({
      region: REGION,
    }),
    identityPoolId: "us-east-1:81fce7bb-2440-4ab8-9f12-f6bbbb5be34d", // IDENTITY_POOL_ID
  }),
});
// Create SNS service object.
export { snsClient };
