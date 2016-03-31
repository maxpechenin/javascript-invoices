var should = require('should');

var helpers = {
  removeTimestamps: function removeTimestamps(result) {
    if (result) {
      if (result instanceof Array) {
        result.forEach(function(item, i) {
          delete result[i].createdAt;
          delete result[i].updatedAt;
        })
      } else {
        delete result.createdAt;
        delete result.updatedAt;
      }
    }
    return result;
  },
  _isModel: function(model, instance) {
    return model.forEach(function(field) {
      should(instance).have.property(field);
    });
  },
  isCustomer: function(customer) {
    var model = [
      'id',
      'name',
      'address',
      'phone'
    ];
    return helpers._isModel(model, customer);
  },
  isProduct: function(product) {
    var model = [
      'id',
      'name',
      'price'
    ];
    return helpers._isModel(model, product);
  },
  isInvoice: function(invoice) {
    var model = [
      'customer_id',
      'discount',
      'total'
    ];
    return helpers._isModel(model, invoice);
  },
  areCustomers: function(customers) {
    return customers.forEach(function(customer) {
      helpers.isCustomer(customer);
    });
  },
  areProducts: function(customers) {
    return customers.forEach(function(customer) {
      helpers.isProduct(customer);
    });
  },
  areInvoices: function(invoices) {
    return invoices.forEach(function(invoice) {
      helpers.isInvoice(invoice);
    });
  },
  getByIdAndCompare: function(API, id, instance) {
    return new Promise(function(resolve){
      API.get(id)
        .then(function(result){
          should(helpers.removeTimestamps(result)).be.eql(instance);
          resolve();
        })
    })
  }
};

module.exports = helpers;