var url = require('url');
var Handler = require("./response_handler");

function createFactory(method) {
  return function(req, res) {
    method.apply(this, [req, res]);
  }
}

var router = {
  routes: {
    get: {},
    post: {}
  },

  get: function(path, callback) {
    this.routes.get[path] = {
      callback: createFactory(callback)
    };
  },

  post: function(path, callback) {
    this.routes.post[path] = {
      callback: createFactory(callback)
    };
  },

  resolve: function(req, res) {
    var requetUrl = req.url.replace(/^\./,'');
    var method = req.method.toLowerCase();

    var path = url.parse(requetUrl).pathname;
    if(this.routes[method] && this.routes[method][path]) {
      (this.routes[method][path]).callback(req, res);
    } else {
      Handler.errorHandler(res, 404)
    }
  }
};

exports.router = router;