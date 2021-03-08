var theConnection = null;
var mysql = require("mysql");

/**
 * Before running your application update your DBConfig here!
 * @type {{host: string, user: string, password: string, database: string, port: number}}
 */
var theDbConfig = {
    host: "localhost",
    user: "root",
    password: "raviprince57",
    database: "sampleserver",
    port: 3306
};

/**
 * Method is used to create a connection to the database.
 * @returns {*} connection
 */
exports.getConnection = function() {
    theConnection = mysql.createConnection(theDbConfig);
    return theConnection;
};

/**
 * Method is used to terminate the database connection
 */
exports.endConnection = function() {
    if(theConnection != null) {
        theConnection.end();
    }
    theConnection = null;
};

/**
 ****************** DO NOT CHANGE THIS METHOD ******************
 */
exports.setDBConfig = function(host, user, password, database, port) {
    theDbConfig = {};
    theDbConfig.host = host;
    theDbConfig.user = user;
    theDbConfig.password = password;
    theDbConfig.database = database;
    theDbConfig.port = port;
};
