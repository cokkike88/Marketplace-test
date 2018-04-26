let dbConnection = require('../database/dbConnection');
let express = require('express');
let app = express();

app.get('/shoppingcart/:userId', (req, res) => {
    
    let userId = req.params.userId;
    let query = "SELECT sc.userId, sc.productId, p.name, sc.quantity FROM shopping_cart sc ";
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
    let shoppingcart = req.body;

    if(shoppingCartValidated(shoppingcart)){

        findProduct(shoppingcart.userId, shoppingcart.productId, (result, data) => {
            if(result){
                // UPDATE
                console.log('UPDATE');
                // PARA INCREMENTAR
                if(shoppingcart.add)
                    shoppingcart.quantity = parseInt(data.quantity) + parseInt(shoppingcart.quantity);

                updateShoppingCart(shoppingcart, res);
            }
            else{
                console.log('INSERT');
                let key = "add";
                delete shoppingcart[key];
                console.log(JSON.stringify(shoppingcart));
                dbConnection.query('INSERT INTO shopping_cart SET ?', shoppingcart, (err, result) => {
                
                    if(err){
                        res.status(400).json({ok: false, message: "Error al insertar datos. ", err});
                    }
                    
                    res.status(200).json({code: 200});            
                });
            }
        })
              
    }
    else{
        res.status(400).json({
            ok: false,
            message: _strMensaje
        })
    }
})

app.put('/shoppingcart', (req, res) => {
    let shoppingcart = req.body;

    if(shoppingCartValidated(shoppingcart)){

        updateShoppingCart(shoppingcart, res);

    }
    else{
        res.status(400).json({
            code: 400,
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

function findProduct(userId, productId, next){

    dbConnection.query("SELECT * FROM shopping_cart WHERE userId = ? AND productId = ?", [userId, productId] , (err, result, fields) => {
        if(err){
            console.log('ERROR ' + err);
            next(false);
        }

        if(result == undefined || result == ''){
            console.log('NO EXISTE ' + result);
            next(false);
        }
        else{
            console.log('SI EXISTE ' + result);
            next(true, result[0]);
        }

    });
}

function updateShoppingCart(shoopingcart, res){
    let query = "UPDATE shopping_cart SET quantity = ? ";
    query += "WHERE userId = ? AND productId = ?"

    dbConnection.query(query, [shoopingcart.quantity, shoopingcart.userId, shoopingcart.productId], (err, result) => {
        
        if(err){
            res.status(400).json({ok: false, message: "Error al modificar el dato. ", err});
        }
        
        res.status(200).json({code: 200});            
    });
}

module.exports = app;