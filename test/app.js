var fs    = require("fs");
var request = require('request');

request({
    method: "POST",
    uri: "https://9.30.160.236:31046/topics/LedgerFeed/records",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer hedS4cZlehLctvfnJAdvmSzonSbsCFDUGHwhNnyakDOR"
    },
    body: JSON.stringify({
      name: "testtt"
    }),
    agentOptions: {
      ca: fs.readFileSync("es-cert.pem")
    }
  }, function(error, httpResponse, body) {
   console.log(body);
  });