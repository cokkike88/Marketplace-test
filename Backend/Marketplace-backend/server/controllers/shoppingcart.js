let dbConnection = require('../database/dbConnection');
let express = require('express');
let app = express();

app.get('/shoopingcart', (req, res) => {
    
    let userId = req.params.userId;
    let query = "SELECT sc.userId, sc.productId, p.name, sc.quatity FROM shopping_cart sc ";
    query += " INNER JOIN product p ON (p.productId = sc.productId)";
    query += " WHERE sc.userId = ?"


    dbConnection.query(query, [userId], (err, result, fields) => {
        if(err){
            res.status(400).send({
                ok: false,
                message: "Error al hacer la consulta. " + err
            });            
        }

        //res.status(200).send(result);               
        res.json(result);
    });
})

app.post('/shoppingcart', (req, res) => {
    let shoopingcart = req.body;

    if(shoppingCartValidated(shoopingcart)){

        dbConnection.query('INSERT INTO shopping_cart SET ?', shoopingcart, (err, result) => {
            
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
})

app.put('/shoppingcart', (req, res) => {
    let shoopingcart = req.body;

    if(shoppingCartValidated(shoopingcart)){

        let query = "UPDATE shopping_cart SET quantity = ? ";
        query += "WHERE userId = ? AND productId = ?"

        dbConnection.query(query, [shoopingcart.quantity, shoopingcart.userId, shoopingcart.productId], (err, result) => {
            
            if(err){
                res.status(400).json({ok: false, message: "Error al modificar el dato. ", err});
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
})

app.delete('/shoppingcart', (req, res) => {
    let shoopingcart = req.body;

    let query = "DELETE FROM shopping_cart ";
    query += "WHERE userId = ? AND productId = ?"

    dbConnection.query(query, [shoopingcart.userId, shoopingcart.productId], (err, result) => {
        
        if(err){
            res.status(400).json({ok: false, message: "Error al eliminar el dato. ", err});
        }
        
        res.status(200).json(result);            
    });


})

function shoppingCartValidated(pObShoppingCart){

    _strMensaje = "";

    if(pObShoppingCart.userId == undefined){
        _strMensaje += "El usuario es obligatorio. ";
        return false;
    }

    if(pObShoppingCart.productId == undefined){
        _strMensaje += "El producto es obligatorio. ";
        return false;
    }

    if(pObShoppingCart.quantity == undefined){
        _strMensaje += "La cantidad es obligatorio. ";
        return false;
    }    
    
    return true;
}

module.exports = app;