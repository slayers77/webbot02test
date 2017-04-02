var Connection = require('tedious').Connection;
var config = {
    server: 'faxtimedb.database.windows.net',
    userName: 'faxtime',
    password: 'test2016!',
    options: {
        debug: {
            packet: false,
            data: false,
            patload: false,
            token: false,
            log: true
        },
        encrypt: true,
        database: 'taihoML'
    }
};




function insertMent(sid, ment) {

    var connection = new Connection(config);
    connection.on('connect', function (err) {
        // If no error, then good to proceed.  
        console.log("Connected");
        executeStatement1();
    });

    var Request = require('tedious').Request
    var TYPES = require('tedious').TYPES;

    function executeStatement1() {
        request = new Request("INSERT SalesLT.Product (Name, ProductNumber, StandardCost, ListPrice, SellStartDate) OUTPUT INSERTED.ProductID VALUES (@Name, @Number, @Cost, @Price, CURRENT_TIMESTAMP);", function (err) {
            if (err) {
                console.log(err);
            }
        });
        request.addParameter('Name', TYPES.NVarChar, 'SQL Server Express 2014');
        request.addParameter('Number', TYPES.NVarChar, 'SQLEXPRESS2014');
        request.addParameter('Cost', TYPES.Int, 11);
        request.addParameter('Price', TYPES.Int, 11);
        request.on('row', function (columns) {
            columns.forEach(function (column) {
                if (column.value === null) {
                    console.log('NULL');
                } else {
                    console.log("Product id of inserted item is " + column.value);
                }
            });
        });
        connection.execSql(request);
    } 


}
module.exports = {
    insertMent
}
 
