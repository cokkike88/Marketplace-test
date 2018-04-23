var express = require('express');
var app = express();


app.get('/user', (req, res) => {
    res.json('get Usuario LOCAL!!!');
})






module.exports = app;