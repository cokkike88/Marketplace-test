var express = require('express');
var app = express();

var user = require('./user');
var product = require('./product');
var shoppingCart = require('./shoppingcart');
var factura = require('./factura');

app.use(user);
app.use(product);
app.use(shoppingCart);
app.use(factura);


module.exports = app;