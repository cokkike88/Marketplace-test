require('./config/config');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var routes = require('./controllers/routes');

app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());

// Controllers
app.use(routes);





app.listen(process.env.PORT, ()=>{
    console.log("Escuchando el puerto: " ,process.env.PORT);
    
});