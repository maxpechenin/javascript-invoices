var request = require('supertest');
var should = require('should');

function removeTimestamps(result) {
  delete result.body.createdAt;
  delete result.body.updatedAt;
};

function isCustomer(customer) {
  var fields = [
    'id',
    'name',
    'address',
    'phone',
    'createdAt',
    'updatedAt'
  ];
  fields.forEach(function(field) {
    should(customer).have.property(field);
  });
}

function isProduct(product) {
  var fields = [
    'id',
    'name',
    'price',
    'createdAt',
    'updatedAt'
  ];
  fields.forEach(function(field) {
    should(product).have.property(field);
  });
}

describe('API', function() {
  var server = require('../app');
  var customerUrl = '/api/customers/';
  var productUrl = '/api/products/';
  var customer = {
    name: 'John Doe',
    address: 'San Francisco, CA',
    phone: '999-999-9999'
  };
  var product = {
    name: 'iPhone',
    price: 999.00
  };

  it('gets all customers', function testGetAllCustomers(done) {
    request(server)
      .get(customerUrl)
      .expect(function(result) {
        result.body.forEach(function(customer) {
          isCustomer.call(this, customer);
        })
      })
      .expect(200, done);
  });

  it('creates customer', function testCreateCustomer(done) {
    request(server)
      .post(customerUrl)
      .send(customer)
      .expect(function(result) {
        customer.id = result.body.id;
      })
      .expect(200, done);
  });

  it('gets customer', function testGetCustomer(done) {
    request(server)
      .get(customerUrl + customer.id)
      .expect(removeTimestamps)
      .expect(200, customer, done);
  });

  it('updates customer', function testPutCustomer(done) {
    customer.name = 'Jake Doe';
    customer.address = 'Los Angeles, CA';
    customer.phone = '888-888-8888';
    request(server)
      .put(customerUrl + customer.id)
      .send(customer)
      .expect(removeTimestamps)
      .expect(200, customer, done);
  });

  it('deletes customer', function testDeleteCustomer(done) {
    request(server)
      .delete(customerUrl + customer.id)
      .end(function() {
        request(server)
          .get(customerUrl + customer.id)
          .expect(200, null, done);
      })
  });

  it('gets all products', function testGetAllProducts(done) {
    request(server)
      .get(productUrl)
      .expect(function(result) {
        result.body.forEach(function(product) {
          isProduct.call(this, product);
        })
      })
      .expect(200, done);
  });

  it('creates product', function testCreateProduct(done) {
    request(server)
      .post(productUrl)
      .send(product)
      .expect(function(result) {
        product.id = result.body.id;
      })
      .expect(200, done);
  });

  it('gets product', function testGetProduct(done) {
    request(server)
      .get(productUrl + product.id)
      .expect(removeTimestamps)
      .expect(200, product, done);
  });

  it('updates product', function testPutProduct(done) {
    product.name = 'iPad';
    product.price = 499.00;
    request(server)
      .put(productUrl + product.id)
      .send(product)
      .expect(removeTimestamps)
      .expect(200, product, done);
  });

  it('deletes product', function testDeleteProduct(done) {
    request(server)
      .delete(productUrl + product.id)
      .end(function() {
        request(server)
          .get(productUrl + product.id)
          .expect(200, null, done);
      })
  });

});