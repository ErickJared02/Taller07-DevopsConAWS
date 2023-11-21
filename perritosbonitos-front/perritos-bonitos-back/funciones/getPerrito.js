const AWS = require("aws-sdk");
exports.handler = async function (event, context) {
    console.log(JSON.stringify(event, null, 2));
    const requestParams = event.pathParameters;
    let Table = process.env.Table;
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
            Key:
            {
                name: requestParams.id
            }
        }
        let resp = await ddb.get(params).promise();
        response.body = JSON.stringify(resp.Item)
    } catch (error) {
        console.log(error);
        response.body = JSON.stringify({
            message: error
        })
        response.statusCode = 500
    }
    return response;
}