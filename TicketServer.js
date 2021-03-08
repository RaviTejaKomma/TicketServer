var express = require('express');
var path = require('path');
var app = express();


/* Fill the code in routes/tickets.js so that it can help with ticket operations
 Defining routes in a dedicated folder and maintaining various routes for various flows helps in
 designing and writing rich functional servers.
 */


var tickets = require('./routes/tickets');

app.use('/tickets',tickets);

app.get("*",function(req,res){
    console.log("Entered GET with Bad url");
    res.writeHead(404,{"Content-Type" : "text/json"});
    res.end(JSON.stringify({status:404,message:"The requested URL was not found"}));
});

app.put("*",function(req,res){
    console.log("Entered PUT with Bad url");
    res.writeHead(404,{"Content-Type" : "text/json"});
    res.end(JSON.stringify({status:404,message:"The requested URL was not found"}));
});

app.post("*",function(req,res){
    console.log("Entered POST with Bad url");
    res.writeHead(404,{"Content-Type" : "text/json"});
    res.end(JSON.stringify({status:404,message:"The requested URL was not found"}));
});

app.delete("*",function(req,res){
    console.log("Entered DELETE with Bad url");
    res.writeHead(404,{"Content-Type" : "text/json"});
    res.end(JSON.stringify({status:404,message:"The requested URL was not found"}));
});




var server = app.listen(3001, function () {
    var port = server.address().port;

    console.log("Example app listening at port %s", port)
});