const AWS = require("aws-sdk");

exports.handler = async function (event, context) {
    console.log(JSON.stringify(event, null, 2));
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
        let data = [];
        var params = {
            TableName: Table,
        }
        let resp = await ddb.scan(params).promise();
        data = data.concat(resp.Items)
        while (resp.LastEvaluatedKey) {
            params.ExclusiveStartKey = resp.LastEvaluatedKey;
            let resp = await ddb.scan(params).promise();
            data = data.concat(resp.Items)
        }
        response.body = JSON.stringify(data)
    } catch (error) {
        console.log(error);
        response.body = JSON.stringify([])
        response.statusCode = 500
    }
    return response;
}
