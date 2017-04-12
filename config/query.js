
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

// 메시지 한글/영어 체크
function kor_en_Checker(str) {
    var check = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
    
    if (str.match(check)) {
        //console.log("Ko");
        return "Ko";
    }
    else {
        //console.log("En");
        return "En";
    }
}

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
        //console.log("data : " + data.key);
        //console.log("data : " + data.sendMsg);
        //console.log("data : " + data.beginTime);
        var query = getQuery(data);
        
        query = query + " ;";
        console.log("query : " + query);
        var request = new tediousRequest(query, function (err, rowCount) {
            
            if (err) {
                console.log(err);
            } else { 
            
                if (rowCount < 1) {
                    callback(err);
                } else { 
                
                    callback(null, resultData);
                }
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
    //return resultData;
    

}


function insertHistoryQuery(data, resTime, callback) {
    
    var connection = new Connection(config);
    
    connection.on('connect', function (err) {
        console.log("data : " + data.key);
        console.log("data : " + data.sendMsg);
        console.log("data : " + data.intent);
        console.log("data : " + resTime);
        var query = getQuery(data.tableNm);
        
        query = query + " ;";
        console.log("query : " + query);
        var request = new tediousRequest(query, function (err) {
            
            if (err) {
                console.log(err);
            }
        });
        
        request.addParameter('userNumber', TYPES.NVarChar , data.key);
        request.addParameter('customerComment', TYPES.NVarChar , data.sendMsg);
        request.addParameter('chatbotCommentCode', TYPES.NVarChar , data.intent);
        request.addParameter('responseTime', TYPES.Int, resTime);

        request.on('row', function (columns) {
            console.log("value : "+ columns[0].value);
        });
        connection.execSql(request);
    });



}



module.exports = {
    getData, insertHistoryQuery,kor_en_Checker
}