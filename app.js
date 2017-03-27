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


// Ã¹¹øÂ°
//bot.dialog('/', [
//    function (session) {
//        session.send("Hello World from " + botenv);
//        session.send( botenv + " ¾È³ç!! ³­ Çö´ëÀÚµ¿Â÷ Ãªº¿ ºÎ¸ªÀÌ¾ß...");
        
//        session.beginDialog('/localePicker');

//    },
//    function (session, results) {
//        //session.send("Your preferred language is now %s.", results.response.entity);
//        //session.beginDialog('/askName');
//        //session.send('Hello %s!', results.response);
//    }
//]);

//bot.dialog('/localePicker', [
//    function (session) {
//        // Prompt the user to select their preferred locale
//        builder.Prompts.choice(session, "Choice Your Language ? ", ["English","Korean"]);
//    },
//    function (session, results) {
//        // Update preferred locale
//        var locale;
//        switch (results.response.entity) {
//            case 'English':
//                locale = 'en';
//            case 'Korean':
//                locale = 'kr';
//                break;
//        }
//        //session.endDialog(result.response.entity);
//        session.preferredLocale(locale, function (err) {
//            if (!err) {
//                // Locale files loaded
//                session.send("Your preferred language is now %s.", results.response.entity);
//                if (results.response.entity == "English") {
//                    session.beginDialog('/askNameEng');
//                }
//                else if (results.response.entity == "Korean") {
//                    session.beginDialog('/askNameKor');
//                }
                
//            } else {
//                // Problem loading the selected locale
//                session.error(err);
//            }
//        });
//    }
//]);

//bot.dialog('/askName', [
//    function (session) {
//        builder.Prompts.text(session, 'What is your name?');
//    },
//    function (session, results) {
//        session.send('Hello %s!', results.response);
//        session.beginDialog('/askAge');
//        //session.endDialog(results);
//    }
//]);




// µÎ¹øÂ°

bot.dialog('/', [

    function (session) {

        session.send("¾È³ç!! ³­ Çö´ëÀÚµ¿Â÷ Ãªº¿ ºÎ¸ªÀÌ¾ß !!");
        session.beginDialog('choiceLanguage');

    },
    function (session, results) {

        session.endConversation('Good Bye until next time...');
    }
]);

bot.dialog('choiceLanguage', [

    function (session) {

        builder.Prompts.choice(session, "Choose a Language : ", ["English","Korean"] );
    },
    function (session, results) {

        switch (results.response.entity) {

            case "English":
                session.beginDialog('askNameEng');
                break;
            case "Korean":
                session.beginDialog('askNameKor');
                break;
            default:
                session.endDialog();
                break;
                
        }
    }
]);



bot.dialog('/askNameEng', [
    function (session) {
        builder.Prompts.text(session, 'What is your name?');
    },
    function (session, results) {
        session.send('Hello %s!', results.response);
        //session.beginDialog('/askAgeEng');
        //session.endDialog(results);
    }
]);


bot.dialog('/askNameKor', [
    function (session) {
        builder.Prompts.text(session, '´ç½ÅÀÇ ÀÌ¸§Àº?');
    },
    function (session, results) {
        session.send('¾È³ç %s!', results.response);
        //session.beginDialog('/askAgeKor');
        //session.endDialog(results);
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