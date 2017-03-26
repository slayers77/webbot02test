var restify = require('restify');
var builder = require('botbuilder');
var express = require('express');
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

//=========================================================
// Bots Dialogs
//=========================================================

//var bot = new builder.UniversalBot(connector,[

//    function (session) {
//        session.send("Hello World from " + botenv);
//        builder.Prompts.choice(session, "Hello What is your preferred language?", 'English|Korean');
//    },
//    function (session, results) {

//        var locale;
//        switch (results.response.entity) {
//            case 'English':
//                locale = 'en';
//            case 'Korean':
//                locale = 'kr';
//                break;
//        }
//        //session.endDialog(result.response.entity);
//    },
//    function (session, result) {
//        session.preferredLocale(locale, function (err) {
//            if (!err) {
//                // Locale files loaded
//                session.endDialog("Your preferred language is now %s.", results.response.entity);
//            } else {
//                // Problem loading the selected locale
//                session.error(err);
//            }
//        });
//        builder.Prompts.text(session, 'What is your name?');
//    },
//    function (session, results) {
//        session.send('Hello %s!', results.response);
//        session.endDialog(results);
//    }

//]);


bot.dialog('/', [
    function (session) {
        session.send("Hello World from " + botenv);
        session.beginDialog('/localePicker');

    },
    function (session, results) {
        session.send("Your preferred language is now %s.", results.response.entity);
        session.beginDialog('/askName');
        //session.send('Hello %s!', results.response);
    }
]);
bot.dialog('/askName', [
    function (session) {
        builder.Prompts.text(session, 'What is your name?');
    },
    function (session, results) {
        session.send('Hello %s!', results.response);
        session.endDialog(results);
    }
]);


bot.dialog('/localePicker', [
    function (session) {
        // Prompt the user to select their preferred locale
        builder.Prompts.choice(session, "What is your preferred language?", 'English|Korean');
    },
    function (session, results) {
        // Update preferred locale
        var locale;
        switch (results.response.entity) {
            case 'English':
                locale = 'en';
            case 'Korean':
                locale = 'kr';
                break;
        }
        session.endDialog(result.response.entity);
        session.preferredLocale(locale, function (err) {
            if (!err) {
                // Locale files loaded
                session.endDialog("Your preferred language is now %s.", results.response.entity);
            } else {
                // Problem loading the selected locale
                session.error(err);
            }
        });
    }
]);


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