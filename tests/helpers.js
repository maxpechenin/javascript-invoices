var should = require('should');

var helpers = {
  removeTimestamps: function removeTimestamps(result) {
    if (result instanceof Array) {
      result.forEach(function(item, i) {
        delete result[i].createdAt;
        delete result[i].updatedAt;
      })
    } else {
      delete result.createdAt;
      delete result.updatedAt;
    }
    return result;
  },
  _isModel: function(model, instance) {
    model.forEach(function(field) {
      should(instance).have.property(field);
    });
  },
  _isCustomer: function(customer) {
    var model = [
      'id',
      'name',
      'address',
      'phone'
    ];
    return helpers._isModel(model, customer);
  },
  isCustomer: function(customer) {
    return helpers._isCustomer(customer);
  },
  isProduct: function(product) {
    return helpers._isProduct(product);
  },
  areCustomers: function(customers) {
    return new Promise(function(resolve) {
      customers.forEach(function(customer) {
        helpers.isCustomer(customer);
      });
      resolve();
    });
  },
  areProducts: function(customers) {
    return new Promise(function(resolve) {
      customers.forEach(function(customer) {
        helpers.isProduct(customer);
      });
      resolve();
    });
  },
  _isProduct: function(product) {
    var model = [
      'id',
      'name',
      'price'
    ];
    helpers._isModel(model, product);
  }
};

module.exports = helpers;