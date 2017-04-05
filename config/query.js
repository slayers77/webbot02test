
var util = require('util');
var fs = require('fs');
//var exports = module.exports = {};
var xml_digester = require('xml-digester');
var digester = xml_digester.XmlDigester({});

var Connection = require('tedious').Connection;
var tediousRequest = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var connection = "";

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



function getQuery(str) {

    var data = fs.readFileSync(__dirname + '/query.xml', 'utf8');
    var result = digester.digest(data);
    var query = eval("result.query." + str); 
    
    return query;
}



function getData(data, callback) {

    var connection = new Connection(config);
    var dataset = [];
    var resultData = [];

    connection.on('connect', function (err) {
        console.log("data : " + data);
        var query = getQuery(data);
        
        query = query + " ;";
        console.log("query : " + query);
        var request = new tediousRequest(query, function (err) {
            
            if (err) {

                console.log(err); 

            }
        });
        request.addParameter('sid', TYPES.Int, 1);  
        request.on('row', function (columns) {

            var obj = {};
            columns.forEach(function (column) {
                if (column.value === null) {
                    console.log('NULL');
                } else {
                    console.log("column.metadata.colName : " + column.metadata.colName);
                    console.log("column.value : " + column.value);
                    obj[column.metadata.colName] = column.value;

                    dataset.push({
                        col: column.metadata.colName,
                        val: column.value
                    });
                }
            });
            resultData.push(obj);
            
        });
        
        connection.execSql(request);
        
    });
    return resultData;

}

module.exports = {
    getData
}