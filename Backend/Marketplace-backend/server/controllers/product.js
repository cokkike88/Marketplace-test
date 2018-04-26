let dbConnection = require('../database/dbConnection');
let configuration = require('./configuration');

let jv = require('json-validation');
let express = require('express');
let app = express();

let _strMensaje = "";
let _jsonValidation = new jv.JSONValidation();

app.get('/product', (req, res) => {

    //console.log(configuration.SHIPPING_COST);
    
    dbConnection.query('SELECT * FROM product', (err, result, fields) => {
        if(err){
            res.status(400).send({
                ok: false,
                message: "Error al hacer la consulta. " + err
            });            
        }

        result.forEach(product => {
            product.cost = parseFloat(product.cost +(product.cost * configuration.TAX_PERCENT/100) + (product.weight * configuration.SHIPPING_COST)).toFixed(2);
        });
        //res.status(200).send(result);               
        res.json({code: 200, data:  result});
    });

})

app.post('/product', (req, res) => {
     let product = req.body;

    if(productValidated(product)){

        dbConnection.query('INSERT INTO product SET ?', product, (err, result) => {
            
            if(err){
                res.status(400).json({ok: false, message: "Error al insertar datos. ", err});
            }
            
            product.productId = result.insertId;

            res.status(200).json({
                code: 200, 
                data: product
            });            
        });

    }
    else{
        res.status(400).json({
            ok: false,
            message: _strMensaje
        })
    }

});

function productValidated(pObjProduct){

    _strMensaje = "";

    if(pObjProduct.name == undefined){
        _strMensaje += "El nombre es obligatorio. ";
        return false;
    }

    if(pObjProduct.cost == undefined){
        _strMensaje += "El costo es obligatorio. ";
        return false;
    }

    if(pObjProduct.weight == undefined){
        _strMensaje += "El peso es obligatorio. ";
        return false;
    }

    return true;
}

module.exports = app;