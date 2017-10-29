var request = require('request');

var gitConfigs = {
  'username': 'gyit',
  'repo': 'blogs'
};

var get = function(request, url, callback) {
  var options = {
    url: 'https://api.github.com' + url,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.1'
    }
  };
  var request = request.get(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      var data = JSON.parse(body);

      callback(data);
    }
  });
};

var post = function(url, data, callback) {
  var options = {
    url: 'https://api.github.com' + url,
    json: true,
    body: data,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:40.0) Gecko/20100101 Firefox/40.1'
    }
  };
  var request = request.post(options, function(error, response, body) {
    if (!error && response.statusCode == 200) {
      console.log(response);
    }
  });
};

//Get SHA-1 of lastest commit
var saveLastestSha = function(){
  var url = '/repos/' + gitConfigs.username + '/' + gitConfigs.repo + '/git/refs/heads/master';
  get(request, url, saveShaBaseTree);
};

//Save SHA-1 of base tree at lastest commit
var saveShaBaseTree = function(data) {
  var sha = data.object.sha;
  var url = '/repos/' + gitConfigs.username + '/' + gitConfigs.repo + '/git/commits/' + sha;
  console.log(url);
  get(request, url, createNewTree);
};

var createNewTree = function(data) {
  var sha = data.tree.sha;
  var url = '/repos/' + gitConfigs.username + '/' + gitConfigs.repo + '/git/trees';
  var postData = {
    "base_tree": data.tree.sha,
    "tree": [
      {
        "path": "NewFile1.txt",
        "mode": "100644",
        "type": "blob",
        "content": "This is NewFile1."
      },
      {
        "path": "NewFile2.txt",
        "mode": "100644",
        "type": "blob",
        "content": "This is NewFile2."
      }
    ]
  };
};

module.exports = saveLastestSha;
