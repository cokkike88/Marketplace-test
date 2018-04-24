let dbConnection = require('../database/dbConnection');
let bcrypt = require('bcrypt');
let express = require('express');
let app = express();


app.post('/login', (req, res) => {

    let email = req.body.email;
    let pass = bcrypt.hashSync(req.body.pass, 10);
    console.log(pass);

    dbConnection.query("SELECT * FROM user WHERE email = ? AND pass = ?", [email, pass] , (err, result, fields) => {
        if(err){
            res.status(400).send({
                ok: false,
                message: "Error al hacer la consulta. " + err
            });            
        }

        if(result == undefined){
            res.status(404).send({
                ok: false,
                message: "No se encontro el usuario. "
            });
        }

        res.status(200).json(result[0]);

    });
})

app.post('/user', (req, res) => {

    let user = {
        email: req.body.email,
        pass: bcrypt.hashSync(req.body.pass, 10),
        isSeller: req.body.isSeller
    };    

    dbConnection.query('INSERT INTO user SET ?', user, (err, result) => {
            
        if(err){
            res.status(400).json({ok: false, message: "Error al insertar datos. ", err});
        }
        
        res.status(200).json(result);            
    });
})






module.exports = app;