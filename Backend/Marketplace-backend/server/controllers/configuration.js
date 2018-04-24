let dbConnection = require('../database/dbConnection');

dbConnection.query("SELECT value FROM configuration WHERE name = 'SHIPPING_COST'", (err, result) => {
    if(err){

        console.log("Error al buscar la configuracion. " + err);
        _shipping_cost = 0;
    }
    
    console.log("SHIPPING_COST: " + result[0].value);
    module.exports.SHIPPING_COST = result[0].value;
});

dbConnection.query("SELECT value FROM configuration WHERE name = 'INSURANCE_PERCENT'", (err, result) => {
    if(err){

        console.log("Error al buscar la configuracion. " + err);
        module.exports.INSURANCE_PERCENT = 0;
    }
    
    console.log("INSURANCE_PERCENT: " + result[0].value);
    module.exports.INSURANCE_PERCENT = result[0].value;
});

dbConnection.query("SELECT value FROM configuration WHERE name = 'TAX_PERCENT'", (err, result) => {
    if(err){

        console.log("Error al buscar la configuracion. " + err);
        module.exports.TAX_PERCENT = 0;
    }
    
    console.log("TAX_PERCENT: " + result[0].value);
    module.exports.TAX_PERCENT = result[0].value;
});

