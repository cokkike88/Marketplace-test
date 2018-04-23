var express = require('express');
var app = express();

var user = require('./user');
var product = require('./product');

app.use(user);
app.use(product);


module.exports = app;