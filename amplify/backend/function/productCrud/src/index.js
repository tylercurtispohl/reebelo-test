/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	STORAGE_REEBELOTEST_ARN
	STORAGE_REEBELOTEST_NAME
	STORAGE_REEBELOTEST_STREAMARN
Amplify Params - DO NOT EDIT */

const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();

const params = {
  TableName: "product-dev",
  Key: {
    id: "577906cc-c558-4e2f-bffd-6ee16eeea76d",
  },
};

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  if (event.requestContext.authorizer) {
    console.log(`CLAIMS: `, event.requestContext.authorizer.claims);
  }
  // return {
  //     statusCode: 200,
  //     headers: {
  //         "Access-Control-Allow-Origin": "*",
  //         "Access-Control-Allow-Headers": "*"
  //     },
  //     body: JSON.stringify('Hello from Lambda!'),
  // };
  try {
    const data = await docClient.get(params).promise();
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.log(err);
    return { error: err };
  }
};
