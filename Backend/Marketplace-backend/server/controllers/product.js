var dbConnection = require('../database/dbConnection');

var express = require('express');
var app = express();

app.get('/product', (req, res) => {

    //dbConnection.connect();
    dbConnection.query('SELECT * FROM product', (err, result, fields) => {
        if(err){
            res.status(400).send({
                ok: false,
                message: "Error al hacer la consulta. " + err
            });            
        }

        //res.status(200).send(result);               
        res.json('get productos LOCAL!!!');
    });

    //dbConnection.end();
})






module.exports = app;