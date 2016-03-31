var supertest = require('supertest');

var sendRequest = function sendRequest(server, requestType, url, data) {
  return new Promise(function(resolve) {
    supertest(server)
      [requestType](url)
      .send(data)
      .end(function(error, result) {
        if (error) throw error;
        resolve(result.body);
      });
  });
};

var commonAPI = {
  get: function get(server, url, id) {
    return sendRequest(server, 'get', url + (id ? id : ''));
  },
  post: function post(server, url, data) {
    return sendRequest(server, 'post', url, data);
  },
  put: function put(server, url, id, data) {
    return sendRequest(server, 'put', url + id, data);
  },
  remove: function remove(server, url, id) {
    return sendRequest(server, 'delete', url + id);
  }
};

var APIGenerator = function(server, url) {
  return {
    get: commonAPI.get.bind(this, server, url),
    create: commonAPI.post.bind(this, server, url),
    update: commonAPI.put.bind(this, server, url),
    remove: commonAPI.remove.bind(this, server, url)
  };
};

module.exports = APIGenerator;