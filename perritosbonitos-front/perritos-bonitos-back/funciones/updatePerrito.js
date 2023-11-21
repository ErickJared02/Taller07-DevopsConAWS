const AWS = require("aws-sdk");
exports.handler = async function (event, context) {
    const requestParams = JSON.parse(event.body);
    const pathParameters = event.pathParameters;
    let Table = process.env.Table;
    let env = process.env.env;
    const ddb = new AWS.DynamoDB.DocumentClient();
    let response = {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
        },
        statusCode: 200,
        body: ""
    }
    try {
        var params = {
            TableName: Table,
            Key: { name: pathParameters.id },
            UpdateExpression: `set #caption = :caption`,
            ExpressionAttributeNames: {
                "#caption": "caption",
            },
            ExpressionAttributeValues: {
                ':caption': requestParams.caption
            },
            ReturnValues: "UPDATED_NEW"
        }
        await ddb.update(params).promise();
    } catch (error) {
        console.log(error);
        response.body = JSON.stringify({
            message: error
        })
        response.statusCode = 500
    }
    return response;
}