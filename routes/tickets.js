/**
 * Route all the requests to /tickets to this file....
 *
 * Use models/tickets.js to perform appropriate CRUD Operations.
 */
var tickets = require("./../models/tickets");
var express = require('express');
var router = express.Router();
var url = require("url");

var pnr_code =100000;

function valid_date(dateString){
    console.log("Entered valid_date");
    if(Date.parse(dateString)==NaN)
    {   // to check whether given string is in the form of date or not
          return false;
    }
    var obj = new Date(dateString);
    var today_date = new Date();
    if(obj > today_date)
    {
        console.log("Returened true");
        return true;
    }
    console.log("Returened false");
    return false;
}

router.post('*',function(req,res){
    
    var response_statuscode=201;
    var body = "";
    
    req.on('data', function (data) {
                  body += data;
    });

    req.on('end', function ()
    {
        var ticket = JSON.parse(body);
        
       if(typeof ticket.src !='string' || typeof ticket.dest !='string' || typeof ticket.name !='string' ||
         typeof ticket.doj !='string' || (ticket.dest == ticket.src))
       {
         response_statuscode=400;
         res.writeHead(response_statuscode, {"Content-Type" : "text/json"});
         res.end(JSON.stringify(null));
       }
       var valid_cities = ['hyderabad', 'bangalore', 'delhi', 'kolkata', 'chennai', 'ahmedabad', 'pune', 'mumbai'];
       
       if(valid_cities.indexOf(ticket.src.toLocaleLowerCase()) < 0 || valid_cities.indexOf(ticket.dest.toLocaleLowerCase()) < 0 || valid_date(ticket.doj)==false )
       {
         response_statuscode=400;
         res.writeHead(response_statuscode, {"Content-Type" : "text/json"});
         res.end(JSON.stringify(null));
       }
    
       var new_ticket = {pnr : pnr_code , src : ticket.src , dest : ticket.dest , name : ticket.name , doj : ticket.doj , facilities : ticket.facilities};
    
       tickets.createTicket(new_ticket,function(err,result){
           if(err){
               console.log("Error in the createTicket is ",err);
               response_statuscode=400;
           }
           res.writeHead(response_statuscode, {"Content-Type" : "text/json"});
           res.end(JSON.stringify(result));
       });
        
        
    });
    
    
});

module.exports = router;