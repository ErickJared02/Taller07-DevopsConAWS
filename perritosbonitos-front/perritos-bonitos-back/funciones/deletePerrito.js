const AWS = require("aws-sdk");
exports.handler = async function (event, context) {
    console.log(JSON.stringify(event, null, 2));
    const pathParameters = event.pathParameters;
    let AssetsBucket = process.env.Storage;
    let Table = process.env.Table;
    let env = process.env.env;
    var s3Bucket = new AWS.S3({ params: { Bucket: AssetsBucket } });
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
                name: pathParameters.id
            }
        }
        await ddb.delete(params).promise();
        await s3Bucket.deleteObject({ Bucket: AssetsBucket, Key: ("assets/" + pathParameters.id) }).promise();
    } catch (error) {
        console.log(error);
        response.body = JSON.stringify({
            message: error
        })
        response.statusCode = 500
    }
    return response;
}