var path = require("path");
var fs = require("fs");
var Handler = require("./response_handler");

var contentTypeMap = {
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.html': 'text/html',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png'
}

function serveStatic(res, filePath) {
  var extName = path.extname(filePath);
  var contentType = contentTypeMap[extName] || "text/html";

  fs.exists(filePath, function(exists) {
    if(!exists) {
      Handler.errorHandler(res, 404)
    } else {
     fs.readFile(filePath, function(err, data) {
       if(err) {
         Handler.errorHandler(res, 500, err)
       } else {
         Handler.successHandler(res, 200, contentType, data);
       }
     });
    }
  });
}

exports.serveStatic = serveStatic;