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
  };

  var product = {
    name: 'iPhone',
    price: 999
  };

  var invoice = {
    customer_id: 10,
    discount: 5.55,
    total: 43.56
  };

  describe('get all', function() {

    it('get all customers', function() {
      return customerAPI.get()
        .then(helpers.areCustomers);
    });

    it('get all products', function() {
      return productAPI.get()
        .then(helpers.areProducts);
    });

    it('get all invoices', function() {
      return invoiceAPI.get()
        .then(helpers.areInvoices);
    });

  });

  describe('post', function() {

    it('create customer', function() {
      return customerAPI.create(customer)
        .then(function(result) {
          customer.id = result.id;
          return should(helpers.removeTimestamps(result)).be.eql(customer);
        });
    });

    it('create product', function() {
      return productAPI.create(product)
        .then(function(result) {
          product.id = result.id;
          return should(helpers.removeTimestamps(result)).be.eql(product);
        });
    });

    it('create invoice', function() {
      return invoiceAPI.create(invoice)
        .then(function(result) {
          invoice.id = result.id;
          return should(helpers.removeTimestamps(result)).be.eql(invoice);
        });
    });

  });

  describe('get by id', function() {

    it('get customer', function() {
      return helpers.getByIdAndCompare(customerAPI, customer.id, customer);
    });

    it('get product', function() {
      return helpers.getByIdAndCompare(productAPI, product.id, product);
    });

    it('get invoice', function() {
      return helpers.getByIdAndCompare(invoiceAPI, invoice.id, invoice);
    });

  });

  describe('put', function() {

    customer.name = 'Jake Doe';
    customer.address = 'Los Angeles, CA';
    customer.phone = '888-888-8888';

    product.name = 'iPad';
    product.price = 699;

    invoice.customer_id = 9;
    invoice.discount = 9.99;
    invoice.total = 74.52;

    it('update customer', function() {
      return customerAPI.update(customer.id, customer)
        .then(helpers.getByIdAndCompare.bind(this, customerAPI, customer.id, customer));
    });

    it('update product', function() {
      return productAPI.update(product.id, product)
        .then(helpers.getByIdAndCompare.bind(this, productAPI, product.id, product));
    });

    it('update invoice', function() {
      return invoiceAPI.update(invoice.id, invoice)
        .then(helpers.getByIdAndCompare.bind(this, invoiceAPI, invoice.id, invoice));
    });

  });

  describe('delete', function() {

    it('delete customer', function() {
      return customerAPI.remove(customer.id)
        .then(helpers.getByIdAndCompare.bind(this, customerAPI, customer.id, null));
    });

    it('delete product', function() {
      return productAPI.remove(product.id)
        .then(helpers.getByIdAndCompare.bind(this, productAPI, product.id, null));
    });

    it('delete invoice', function() {
      return invoiceAPI.remove(invoice.id)
        .then(helpers.getByIdAndCompare.bind(this, invoiceAPI, invoice.id, null));
    });
    
  });

















});