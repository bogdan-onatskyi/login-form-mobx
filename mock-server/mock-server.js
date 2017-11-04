const mockServer = require('mockserver-node');
const mockServerClient = require('mockserver-client').mockServerClient;
const mockServer_port = 8080;

mockServer.start_mockserver({serverPort: mockServer_port, verbose: true})
    .then(function () {
        mockServerClient("localhost", mockServer_port).mockAnyResponse({
            "httpRequest": {
                "method": "POST",
                "path": "/login",
                "body": {
                    "type": "JSON",
                    "json": JSON.stringify({Username: "foo", Password: "bar"}),
                    "matchType": "STRICT"
                }
            },
            "httpResponse": {
                "statusCode": 200,
                "headers": [
                    {
                        "name": "Content-Type",
                        "values": ["application/json; charset=utf-8"]
                    },
                    {
                        "name": "Cache-Control",
                        "values": ["public, max-age=86400"]
                    },
                    {
                        "name": "Access-Control-Allow-Origin",
                        "values": ["http://localhost:3000"]
                    },
                    // {
                    //     "name": "Access-Control-Allow-Credentials",
                    //     "values": ["true"]
                    // }
                ],
                "body": JSON.stringify({Auth: "Denied"}),
                "delay": {
                    "timeUnit": "SECONDS",
                    "value": 1
                }
            }
        });
    });
