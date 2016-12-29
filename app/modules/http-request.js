var http = require("http");
var get = function(url, callback) {
  http.get(url, function(response) {
    var statusCode = response.statusCode;
    var contentType = response.headers["content-type"];
    var error; // check for errors
    if (statusCode != 200) {
      error = new Error(
        "Request Failed.\n" +
        "Status Code: ${statusCode}");
    } else if (!/^application\/json/.test(contentType)) {
      error = new Error(
        "Invalid content-type.\n" +
        "Expected application/json but received ${contentType}");
    }
    if (error) { // if not undefined
      console.log(error.message);
      response.resume();
      return;
    }
    response.setEncoding("utf8");
    var rawData = ""; // JSON
    // receive another chunk of data
    response.on("data", function(chunk) {
      rawData += chunk;
    });
    // the whole response has been recieved
    response.on("end", function() {
      var parsedData = JSON.parse(rawData);
      callback(parsedData)
    })
  });
};
module.exports.get = get;
