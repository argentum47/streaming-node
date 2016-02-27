function errorHandler(res, statusCode, data) {
  res.writeHead(statusCode);
  res.end(data);
}

function successHandler(res, statusCode, contentType, data) {
  res.writeHead(statusCode, { 'Content-Type': contentType });
  res.end(data);
}

exports.errorHandler = errorHandler;
exports.successHandler = successHandler;