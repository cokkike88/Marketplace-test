let dbConnection = require('../database/dbConnection');
let express = require('express');
let app = express();

app.post('/invoice', (req, res) => {
    let invoice = req.body;
    let detaill = req.body.detaill;

    let key = "detaill";
    delete invoice[key];

    console.log(JSON.stringify("FACTURA " + invoice));
    console.log(JSON.stringify("DETALLE " + detaill));

    dbConnection.query('INSERT INTO invoice  SET ?', invoice, (err, result) => {
        
        if(err){
            res.status(400).json({ok: false, message: "Error al insertar datos. ", err});
        }
        console.log("result " +JSON.stringify(result));
        invoice.invoiceId = result.insertId;

        detaill.forEach(product => {
            
            let weightKey = 'weight';
            delete product[weightKey];

            let nameKey = 'name';
            delete product[nameKey];

            let userIdKey = 'userId';
            delete product[userIdKey];

            product.invoiceId = invoice.invoiceId;

            dbConnection.query('INSERT INTO invoicedetaill SET ?', product, (err, result) => {
                if(err){
                    console.log("ERROR: " + err);
                    deleteInvoice(invoice.invoiceId);                    
                }
                
                console.log("Se agrego al detalle: " + JSON.stringify(product));
            })
        });

        let query = "DELETE FROM shopping_cart ";
        query += "WHERE userId = ? "

        dbConnection.query(query, [invoice.userId], (err, result) => {
            
            if(err){
                res.status(400).json({ok: false, message: "Error al eliminar el dato. ", err});
            }
            
            res.status(200).json({code: 200});            
        });

        // res.status(200).json({
        //     code: 200
        // });            
    });


});

function deleteInvoice(invoiceId){
    
    dbConnection.query('DELETE FROM invoicedetaill WHERE invoiceId = ?', [invoiceId], (err, result) => {
        if(err){
            console.log("Error al eliminar el detalle");
            return;
        }

        dbConnection.query('DELETE FROM invoicedetaill WHERE invoiceId = ?', [invoiceId], (err, result) => {
            if(err){
                console.log("Error all eliminar la factura");
                return;
            }

            console.log("Factura eliminada");

        });
    })
}

module.exports = app;