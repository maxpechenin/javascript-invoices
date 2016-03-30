var helpers = require('./helpers');
var APIGenerator = require('./api-generator');
var should = require('should');

describe('API', function() {
  var server = require('../app');

  var customerAPI = APIGenerator(server, '/api/customers/');
  var productAPI = APIGenerator(server, '/api/products/');
  var invoiceAPI = APIGenerator(server, '/api/invoices/');

  var customer = {
    name: 'John Doe',
    address: 'San Francisco, CA',
    phone: '999-999-9999'
  }

  it('gets customers', function() {
    return customerAPI
      .get()
      .then(helpers.areCustomers);
  });

  it('creates customer', function() {
    return customerAPI
      .create(customer)
      .then(function(result) {
        customer.id = result.id;
        return should(helpers.removeTimestamps(result)).be.eql(customer);
      })
  });

  it('gets customer', function getUserAndCheckHim() {
    return customerAPI
      .get(customer.id)
      .then(function(result) {
        return should(helpers.removeTimestamps(result)).be.eql(customer);
      });
  });

  it('updates customer', function() {
    customer.name = 'Jake Doe';
    customer.address = 'Los Angeles, CA';
    customer.phone = '888-888-8888';
    return customerAPI
      .update(customer.id, customer)
      .then(function() {
        return customerAPI
          .get(customer.id)
          .then(function(result){
            return should(helpers.removeTimestamps(result)).be.eql(customer);
          })
      });
  });

  it('deletes customer', function() {
    return customerAPI
      .remove(customer.id)
      .then(function() {
        return customerAPI
          .get(customer.id)
          .then(function(result){
            return should(result).be.eql(null);
          })
      });
  });

});