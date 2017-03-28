var restify = require('restify');
var builder = require('botbuilder');
var express = require('express');

var request = require('request');

var greeting = require('./greeting');

//var luisEngServer = require('./LuisEnglishServer');
//var luisKorServer = require('./LuisKoreanServer');
//=========================================================
// Bot Setup
//=========================================================

// Setup Restify Server
var server = restify.createServer();
var botenv = process.env.BOT_ENV;
server.listen(process.env.port || process.env.PORT || 3978, function () {
   console.log('%s listening to %s (%s)', server.name, server.url, botenv);
});

// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

var bot = new builder.UniversalBot(connector);
server.post('/api/messages', connector.listen());


    //var model = 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/6393ebda-613e-477e-bade-92330e2e496d?subscription-key=7489b95cf3fb4797939ea70ce94a4b11';
    //var recognizer = new builder.LuisRecognizer(model);
    //var luisDialog = new builder.IntentDialog({ recognizers: [recognizer] }); 
    //bot.recognizer(recognizer);
    //bot.dialog('/', luisDialog);


//=========================================================
// Bots Dialogs
//=========================================================
//bot.dialog('/', dialog);
//var bot = new builder.UniversalBot(connector, [

//    function (session) {
//        greeting.beginDialog(session);
//    }

//]);
greeting.create(bot);






var app = express();
var fs = require('fs');

app.listen(3303, function () { 
	console.log('Server Start .');
});

app.get('/', function (req, res) {
	fs.readFile('index.html', function (error, data) {
		if (error) {
			console.log(error);
		} else {
			res.writeHead(200, { 'Content-Type': 'text/html' });
			res.end(data);
		} 
	});
});



