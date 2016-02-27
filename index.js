var http = require("http");
var fs = require("fs");
var path = require("path");
var filePath = path.join(__dirname, "data.json");

var Handler = require("./middlewares/response_handler");
var serveStatic = require("./middlewares/serve_static").serveStatic;
var router = require("./middlewares/router").router;

router.get('/', function(req, res) {
  serveStatic(res, './index.html');
});

router.get('/javascripts/rx.lite.js', function(req, res) {
  serveStatic(res, './javascripts/rx.lite.js');
});

router.get('/javascripts/index.js', function(req, res) {
  serveStatic(res,'./javascripts/index.js');
});

router.get('/data', function(req, res) {
  var stat = fs.statSync(filePath);

  res.writeHead(200, {
    'Content-Type': '',
    'Content-Length': stat.size
  });

  var readStream = fs.createReadStream(filePath);
  readStream.pipe(res);
});

var server = http.createServer(function(req, res) {
  router.resolve(req, res);
});

server.listen(5000, function(req, res) {
  console.log("listening on port ", server.address().port);
});