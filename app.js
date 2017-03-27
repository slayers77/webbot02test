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


// √ππ¯¬∞
//bot.dialog('/', [
//    function (session) {
//        session.send("Hello World from " + botenv);
//        session.send( botenv + " æ»≥Á!! ≥≠ «ˆ¥Î¿⁄µø¬˜ √™∫ø ∫Œ∏™¿Ãæﬂ...");
        
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




// µŒπ¯¬∞

bot.dialog('/', [

    function (session) {

        session.send("æ»≥Á!! ≥≠ «ˆ¥Î¿⁄µø¬˜ √™∫ø ∫Œ∏™¿Ãæﬂ !!");
        session.beginDialog('choiceLanguage');

    },
    function (session, results) {

        //session.endConversation('Good Bye until next time...');
        session.send("Your Choice ==> Language : " + session.userData.language + " Name : " + session.userData.name + " Age : " + session.userData.age);
    }
]);


bot.dialog('choiceLanguage', [
         function (session) {
        // Prompt the user to select their preferred locale 
             builder.Prompts.choice(session, "Choose Your Language : ", 'English|Korean', { listStyle: builder.ListStyle.button });
        
    },
         function (session, results) {
            session.preferredLocale(results.response.entity, function (err) {
            if (!err) {
                session.send("Your Choice Language %s.", results.response.entity);
                session.userData.language = results.response.entity;
                if (results.response.entity == "English") {
                    session.beginDialog('/askNameEng');
                }
                else if (results.response.entity == "Korean") {
                    session.beginDialog('/askNameKor');
                }
            } else {
                    session.error(err);
            }
        }); 
     } 
]); 


bot.dialog('/askNameEng', [
    function (session) {
        builder.Prompts.text(session, 'What is your name?');
    },
    function (session, results) {
        session.send('Hello %s!', results.response);
        session.userData.name = results.response;
        session.beginDialog('/askAgeEng');
        //session.endDialog(results);
    }
]);


bot.dialog('/askNameKor', [
    function (session) {
        builder.Prompts.text(session, '¥ÁΩ≈¿« ¿Ã∏ß¿∫?');
    },
    function (session, results) {
        session.send('æ»≥Á %s!', results.response);
        session.userData.name = results.response;
        session.beginDialog('/askAgeKor');
        //session.endDialog(results);
    }
]);

bot.dialog('/askAgeEng', [
    function (session) {
        builder.Prompts.text(session, 'What is your Age?');
    },
    function (session, results) {
        session.send('Hello %s!', results.response);
        session.userData.age = results.response;
        //session.beginDialog('/askAgeEng');
        session.endDialog(results);
    }
]);


bot.dialog('/askAgeKor', [
    function (session) {
        builder.Prompts.text(session, '¥ÁΩ≈¿« ø¨∑…¿∫?');
    },
    function (session, results) {
        session.send('æ»≥Á %s!', results.response);
        session.userData.age = results.response;
        //session.beginDialog('/askAgeKor');
        session.endDialog(results);
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