const AWS = require("aws-sdk");
exports.handler = async function (event, context) {
    console.log(JSON.stringify(event, null, 2));
    const requestParams = JSON.parse(event.body);
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
        var buf = Buffer.from(requestParams.file.replace(/^data:image\/\w+;base64,/, ""), 'base64');
        var data = {
            Key: ("assets/" + context.awsRequestId + "." + requestParams.extension),
            Body: buf,
            ContentEncoding: 'base64',
            ContentType: 'image/jpeg'
        };
        await s3Bucket.putObject(data).promise();
        var params = {
            TableName: Table,
            Item: {
                "name": (context.awsRequestId + "." + requestParams.extension),
                "src": ("https://"+AssetsBucket+".s3.amazonaws.com" + "/assets/" + context.awsRequestId + "." + requestParams.extension),
                "caption": requestParams.name
            }
        }
        await ddb.put(params).promise();


    } catch (error) {
        console.log(error);
        response.body = JSON.stringify({
            message: error
        })
        response.statusCode = 500
    }
    return response;
}