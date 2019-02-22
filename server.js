// Dependencies 
//=============================

var express = require("express");
var path = require("path");


//Port and Express App Setup
//=============================

var app = express();
var PORT = process.env.PORT || 8080;

// Data parsing
//===============================

app.use(express.urlencoded({ extended: true}));
app.use(express.json());



//Router 
//===================================

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);


//Listener 
//===================================

app.listen(PORT, function() {
    console.log("App listening on PORT: " + PORT);
});