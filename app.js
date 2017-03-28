var restify = require('restify');
var builder = require('botbuilder');
var express = require('express');

var request = require('request');

//var greeting = require('./greeting');

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
//var bot = new builder.BotConnectorBot(connector);
server.post('/api/messages', connector.listen());

var dialog = new builder.LuisDialog('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/6393ebda-613e-477e-bade-92330e2e496d?subscription-key=7489b95cf3fb4797939ea70ce94a4b11');
//var intent = new builder.IntentDialog();

    //=========================================================
    // Bots Dialogs
    //=========================================================


//bot.dialog('/', dialog);
//console.log('111111111111');
bot.dialog('/', [

    function (session) {

        //session.send("HI..");
        builder.Prompts.choice(session, "Hi.. Choose Your Language : ", 'English|Korean', { listStyle: builder.ListStyle.button });

    },

    function (session, results) {
        session.preferredLocale(results.response.entity, function (err) {
            if (!err) {
                session.send("Your Choice Language %s.", results.response.entity);
                session.userData.language = results.response.entity;
                if (results.response.entity == "English") {
                    session.send("Hi!! I`m Hyundai Motors ChatBot  Grandizer!!");
                    builder.Prompts.text(session, 'What is your name?');
                }
                else if (results.response.entity == "Korean") {
                    session.send("안녕!! 난 현대자동차 챗봇 그랜다이저야 !!");
                    builder.Prompts.text(session, '당신의 이름은?');
                }
            } else {
                session.error(err);
            }
        });
    },
    function (session, results) {

        if (session.userData.language == 'English') {

            session.send('Hello %s!', results.response);
            session.userData.name = results.response;
            builder.Prompts.choice(session, 'What is your Age Group?', '10~20 AgeGroup|30 AgeGroup|40 AgeGroup|50 AgeGroup| 60 Over AgeGroup', { listStyle: builder.ListStyle.button });

        } else if (session.userData.language == 'Korean') {

            session.send('안녕 %s!', results.response);
            session.userData.name = results.response;
            builder.Prompts.choice(session, '당신의 연령대는?', '10~20대|30대|40대|50대|60대이상', { listStyle: builder.ListStyle.button });

        }
    },
    function (session, results) {

        if (session.userData.language == 'English') {

            session.send('Your AgeGroup :  %s!', results.response.entity);
            session.userData.age = results.response.entity;
            ession.send("Your Choice Language : " + session.userData.language + "\n Your Name : " + session.userData.name + "\n Your Age : " + session.userData.age);
            session.send("OK.. Let`s Go Grandizer..!!" + session.userData.name);
            builder.Prompts.choice(session, 'What do you want menu?', 'testDrive|Design|Convenience|Price', { listStyle: builder.ListStyle.button });

        } else if (session.userData.language == 'Korean') {

            session.send('당신의 연령대는 : %s!', results.response.entity);
            session.userData.menu = results.response.entity;
            session.send("당신이 선택한 언어 : %s  당신의 이름 : %s  당신의 연령대 : %s", session.userData.language, session.userData.name, session.userData.age);
            session.send("OK.. 그랜다이저를 시작해볼까요..!! %s 님", session.userData.name);
            builder.Prompts.choice(session, '원하시는 메뉴를 선택하세요?', '시승|디자인|편의사항|가격', { listStyle: builder.ListStyle.button });

        }
    }
]);


//bot.dialog('choiceLanguage', [
//         function (session) {
//        // Prompt the user to select their preferred locale 
//             builder.Prompts.choice(session, "Hi.. Choose Your Language : ", 'English|Korean', { listStyle: builder.ListStyle.button });
//             //builder.Prompts.choice(session, "Hi.. Choose Your Language : ", 'English|Korean', { listStyle: builder.ListStyle.inline });
//             //builder.Prompts.choice(session, "Hi.. Choose Your Language : ", 'English|Korean', { listStyle: builder.ListStyle.list });
        
//    },
//         function (session, results) {
//            session.preferredLocale(results.response.entity, function (err) {
//            if (!err) {
//                session.send("Your Choice Language %s.", results.response.entity);
//                session.userData.language = results.response.entity;
//                if (results.response.entity == "English") {
//                    session.send("Hi!! I`m Hyundai Motors ChatBot  Grandizer!!");
//                    session.beginDialog('/askNameEng');
//                }
//                else if (results.response.entity == "Korean") {
//                    session.send("안녕!! 난 현대자동차 챗봇 그랜다이저야 !!");
//                    session.beginDialog('/askNameKor');
//                }
//            } else {
//                    session.error(err);
//            }
//        }); 
//     } 
//]); 


//bot.dialog('/askNameEng', [
//    function (session) {
//        builder.Prompts.text(session, 'What is your name?');
//    },
//    function (session, results) {
//        session.send('Hello %s!', results.response);
//        session.userData.name = results.response;
//        session.beginDialog('/askAgeEng');
//        //session.endDialog(results);
//    }
//]);


//bot.dialog('/askNameKor', [
//    function (session) {
//        builder.Prompts.text(session, '당신의 이름은?');
//    },
//    function (session, results) {
//        session.send('안녕 %s!', results.response);
//        session.userData.name = results.response;
//        session.beginDialog('/askAgeKor');
//        //session.endDialog(results);
//    }
//]);

//bot.dialog('/askAgeEng', [
//    function (session) {
//        //builder.Prompts.text(session, 'What is your Age?');
//        builder.Prompts.choice(session, 'What is your Age Group?', '10~20 AgeGroup|30 AgeGroup|40 AgeGroup|50 AgeGroup| 60 Over AgeGroup', { listStyle: builder.ListStyle.button });
//    },
//    function (session, results) {
//        session.send('Your AgeGroup :  %s!', results.response.entity);
//        session.userData.age = results.response.entity;
//        //session.endDialog(results);
//    }
//]);


//bot.dialog('/askAgeKor', [
//    function (session) {
//        builder.Prompts.choice(session, '당신의 연령대는?', '10~20대|30대|40대|50대|60대이상', { listStyle: builder.ListStyle.button });
//    },
//    function (session, results) {
//        session.send('당신의 연령대는 : %s!', results.response.entity);
//        session.userData.age = results.response.entity;
//        //session.endDialog(results);
//    }
//]);





//bot.dialog('selectKorMenu', [
//    function (session) {
//        console.log('selectKorMenu');
//        builder.Prompts.choice(session, '원하시는 메뉴를 선택하세요?', '시승|디자인|편의사항|가격', { listStyle: builder.ListStyle.button });
//    },
//    function (session, results) {
//        session.send('당신이 선택한 메뉴는 : %s!', results.response.entity);
//        session.userData.menu = results.response.entity;
//        //luisKorServer.beginDialog(session);
//    }
//]);

//bot.dialog('selectEngMenu', [
//    function (session) {
//        builder.Prompts.choice(session, 'What do you want menu?', 'testDrive|Design|Convenience|Price', { listStyle: builder.ListStyle.button });
//    },
//    function (session, results) {
//        session.send('Your Choice Menu : %s!', results.response.entity);
//        session.userData.menu = results.response.entity;
//        //luisEngServer.beginDialog(session); 
//    }
//]);




//luisEngServer.create(bot);
//luisKorServer.create(bot);

//greeting.create(bot);






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



