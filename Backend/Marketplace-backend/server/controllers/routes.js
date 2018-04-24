var express = require('express');
var app = express();

var user = require('./user');
var product = require('./product');
var shoppingCart = require('./shoppingcart');

app.use(user);
app.use(product);
app.use(shoppingCart);


module.exports = app;