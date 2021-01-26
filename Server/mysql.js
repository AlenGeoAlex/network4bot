const mysql   = require('mysql'),
    config  = require('../Config/mysql.json');
var sqlConnection = function sqlConnection(sql, values, next) {
    if (arguments.length === 2) {
        next = values;
        values = null;
    }

    var connection = mysql.createConnection(config.db);
    connection.connect(function(err) {
        if (err !== null) {
            console.log("[MYSQL] Error connecting to mysql:" + err+'\n');
        }  
    });

    connection.query(sql, values, function(err) {
        connection.end();
        if (err) {
            throw err;
        }
        next.apply(this, arguments);
    });
}

module.exports = sqlConnection;