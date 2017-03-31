var restify = require('restify');
var builder = require('botbuilder');
var express = require('express');
var request = require('request');
var greeting = require('./greeting');


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
    //appId: process.env.MICROSOFT_APP_ID,
    //appPassword: process.env.MICROSOFT_APP_PASSWORD
    appId: "98ee3e87-b025-4e50-a7b3-1df9e902dacc",
    appPassword: "aKLgB9zVeiCPRBPObwAvwEr"
});

var bot = new builder.UniversalBot(connector);
//global.bot = new builder.BotConnectorBot({
//    appId: "98ee3e87-b025-4e50-a7b3-1df9e902dacc",
//    appPassword: "aKLgB9zVeiCPRBPObwAvwEr"
//});
//var bot = new builder.UniversalBot(connector, function (session) {

//    session.send("Welcome !!!");
//});
greeting.create(bot);
server.post('/api/messages', connector.listen());




//bot.recognizer(recognizer);

//=========================================================
// Bots Dialogs
//=========================================================

//intents.matches('greeting', [

//    function (session, args, next) {

//        var match;



//    }

//])


//bot.dialog('/greeting', [

//    function (session, args, next) {


//        var intent = args.intent;

//        builder.Prompts.text(session, 'your intent  %s ', intent);
//    }

//]).triggerAction({
//    matches: '인사::한국어', 
//    confirmPrompt: "This will cancel the current alarm. Are you sure?" 
//})



//greeting.create(connector);

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
