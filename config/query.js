
var util = require('util');
var fs = require('fs');
var xml_digester = require('xml-digester');
var digester = xml_digester.XmlDigester({});

var connectionPool = require('tedious-connection-pool');
var Connection = require('tedious').Connection;
var tediousRequest = require('tedious').Request;
var TYPES = require('tedious').TYPES;
var connection = "";

var poolConfig = {
    min: 2,
    max: 5,
    log: false
};

var config = {
    server: 'faxtimedb.database.windows.net',
    userName: 'faxtime',
    password: 'test2016!',
    options: {
        encrypt: true,
        database: 'taihoML'
    }
};

// 메시지 한글/영어 체크
function kor_en_Checker(str) {
    var check = /[가-힣ㄱ-ㅎㅏ-ㅣ]/g;
    
    //if (str.match(check)) {
    if(check.test(str)){
        //console.log("Ko");
        return "Ko";
    }
    else {
        //console.log("En");
        return "En";
    }
};

function getQuery(str) {

    var data = fs.readFileSync(__dirname + '/query.xml', 'utf8');
    var result = digester.digest(data);
    var query = eval("result.query." + str); 
    
    return query;
};


//function insertHistoryQuery(data, resTime, callback) {
    
//    var pool = new connectionPool(poolConfig, config );
    
    
//    pool.on('error', function (err) {
        
//        console.error(err);
    
//    });
    
//    pool.acquire(function (err, connection) {
        
//        if (err) {
//            console.error(err);
//            return;
//        }
        
//        //get query
//        var query = getQuery(data.tableNm);
        
//        //use the connection as normal
//        var request = new tediousRequest(query, function (err, rowCount) {
            
//            if (err) {
                
//                console.error(err);
//                return;

//            }
//            console.log("rowCount : " + rowCount);
//            connection.release();
            
//        });
        
//        console.log("data : " + data.key);
//        console.log("data : " + data.sendMsg);
//        console.log("data : " + data.intent);
//        console.log("data : " + resTime);
        
//        request.addParameter('userNumber', TYPES.NVarChar , data.key);
//        request.addParameter('customerComment', TYPES.NVarChar , data.sendMsg);
//        request.addParameter('chatbotCommentCode', TYPES.NVarChar , data.intent);
//        request.addParameter('responseTime', TYPES.Int, resTime);
        
//        connection.execSql(request);
        
    
//    });

//};



function insertHistoryQuery(data, resTime, callback) {
    
    var connection = new Connection(config);
    
    connection.on('connect', function (err) {
        console.log("data : " + data.key);
        console.log("data : " + data.sendMsg);
        console.log("data : " + data.intent);
        console.log("data : " + data.chanelID);
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
        request.addParameter('chanelId', TYPES.NVarChar, data.chanelID);
        request.addParameter('responseTime', TYPES.Int, resTime);
        
        request.on('row', function (columns) {
            console.log("value : " + columns[0].value);
        });
        connection.execSql(request);
    });



}

module.exports = {
    insertHistoryQuery,kor_en_Checker
}