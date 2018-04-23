var express = require('express');
var app = express();

var user = require('./user');

app.use(user);


module.exports = app;