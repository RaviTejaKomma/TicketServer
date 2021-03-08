/**
 * Fill this method to create required tables for storing tickets.
 *
 * Also, this method should clear off any existing data.
 *
 * @param callback Send the err and result of the DDL operation appropriately
 */

var dbHelper = require("./databaseHelper");

exports.createTicket = function(ticket, callback) {
    
    console.log("Entered add Ticket");
        
    var connection = dbHelper.getConnection();
    
    connection.query("INSERT INTO ticketsTable SET ?",ticket, function(err, result)
    {
                //console.log("Entered Query");
                if(err)
                {
                    //console.log("Entered IF");
                    console.log("Error is :",err);
                }
                //console.log("Task insert result: ", result);
                dbHelper.endConnection();
                //console.log(result);
                //console.log("Exiting query");
                callback(err,result);
    });

};

exports.setupTicketsTable = function (callback) {
    var connection = dbHelper.getConnection();
    //console.log(connection);
    if(connection!=null)
        {
            var ERROR=null;
            var final_result;
            connection.query('CREATE TABLE IF NOT EXISTS ticketsTable ('+
                             'pnr INT NOT NULL AUTO_INCREMENT,'+
                             'src VARCHAR(100) NOT NULL,'+
                             'dest VARCHAR(100) NOT NULL,'+ 
                             'name VARCHAR(100) NOT NULL, '+
                             'doj VARCHAR(45) NOT NULL, '+
                             'facilities JSON NULL, '+
                             'PRIMARY KEY (`pnr`))',function(err,result){
                
                if(err)
                {
                    console.log("Error in setUpTicketsTable is ",err);
                }
                else
                {
                    console.log("Table createdsuccesfully");
                }
                //console.log(err);
                //console.log(result);
                ERROR = err;
                final_result = result;
            }); // table creation
            connection.query("DELETE FROM ticketsTable", function(err, result){
    
                        if(err){
                                console.log("Error in clearing the database "+JSON.stringify(err));
                        }
                        else{
                            console.log("Table contents are deleted successfully");
                            dbHelper.endConnection();
                            callback(ERROR,final_result);
                        }
            });
        }
    else{
        console.log("Connection is not formed properly : serUpTicketsTable");
    }
    
};

