let dbConnection = require('../database/dbConnection');
let configuration = require('./configuration');

let jv = require('json-validation');
let express = require('express');
let app = express();

let _strMensaje = "";
let _jsonValidation = new jv.JSONValidation();

app.get('/product', (req, res) => {

    console.log(configuration.SHIPPING_COST);
    
    dbConnection.query('SELECT * FROM product', (err, result, fields) => {
        if(err){
            res.status(400).send({
                ok: false,
                message: "Error al hacer la consulta. " + err
            });            
        }

        //res.status(200).send(result);               
        res.json(result);
    });

    //dbConnection.end();
})

app.post('/product', (req, res) => {
     let product = req.body;

    if(productValidated(product)){

        dbConnection.query('INSERT INTO product SET ?', product, (err, result) => {
            
            if(err){
                res.status(400).json({ok: false, message: "Error al insertar datos. ", err});
            }
            
            res.status(200).json(result);            
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

    if(pObjProduct.tax == undefined){
        _strMensaje += "El impuesto es obligatorio. ";
        return false;
    }

    if(pObjProduct.weight == undefined){
        _strMensaje += "El peso es obligatorio. ";
        return false;
    }

    // if(_jsonValidation.validate(pObjProduct.cost, { "type": "number" }).ok){
    //     _strMensaje += "El tipo de dato del costo no es el correcto. ";
    //     return false;
    // }
    
    // if(pObjProduct.tax instanceof Number){
    //     _strMensaje += "El tipo de dato del impuesto no es el correcto. ";
    //     return false;
    // }    

    // if(pObjProduct.weight instanceof Number){
    //     _strMensaje += "El tipo de dato del peso no es el correcto. ";
    //     return false;
    // }

    

    return true;
}

module.exports = app;