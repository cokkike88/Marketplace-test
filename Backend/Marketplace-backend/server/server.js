require('./config/config');

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var routes = require('./controllers/routes');

app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

// Controllers
app.use(routes);





app.listen(process.env.PORT, ()=>{
    console.log("Escuchando el puerto: " ,process.env.PORT);
    
});