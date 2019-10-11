var request = require('request');
request({
    method: "POST",
    rejectUnauthorized: false,
    requestCert: true,
    agent: false,
    uri: "https://caplonsgprd-1.securegateway.appdomain.cloud:15671/topics/CustomerFeed/records",
    headers: {
      "Content-Type": "text/plain",
      "Authorization": "Bearer N2Pmtf3vpao6VR30rty7UqUXIZD-R-4_9FZwEteMQHvI",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: "testtt"
    })
  }, function(error, httpResponse, body) {
   console.log(body);
  });