var restify = require('restify');
var builder = require('botbuilder');
var express = require('express');
var request = require('request');

var greeting = require('./greeting');
var testDriveKor = require('./testDrive/kor/testDriveKor');
var designKor = require('./design/kor/designKor');
var convenienceKor = require('./convenience/kor/convenienceKor');
var priceKor = require('./price/kor/priceKor');
var query = require('./config/query');

global.sample;

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
    appId: '98ee3e87-b025-4e50-a7b3-1df9e902dacc',
    appPassword: 'aKLgB9zVeiCPRBPObwAvwEr'
});
server.post('/api/messages', connector.listen());

var bot = new builder.UniversalBot(connector);

bot.on('conversationUpdate', function (message) {
	if (message.membersAdded && message.membersAdded.length > 0) {
		var membersAdded = message.membersAdded
                .map(function (m) {
                    var isSelf = m.id === message.address.bot.id;
                    return (isSelf ? message.address.bot.name : m.name) || '' + ' (Id: ' + m.id + ')';
                })
                .join(', ');
		if (membersAdded != 'Bot') {
            bot.beginDialog(message.address, '/init');
		}
	}
});

//초기 출력 화면

bot.dialog('/init', [
    function (session) {
        var msg = new builder.Message(session)
                .attachments([
                    new builder.AudioCard(session)
                        .title('그랜다이저')
                        .subtitle('Grandizer')
                        .text('안녕하세요. 저는 현대자동차의 그랜저 ig를 소개하는 그랜다이저예요. \n\nHi. My name is Grandizer.')
                        .image(builder.CardImage.create(session, 'http://webbot02.azurewebsites.net/hyundai/images/openning.png'))
                        .media([
                            { url: 'http://webbot02.azurewebsites.net/openning.wav' }
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, "한국어", "한국어"),
                            builder.CardAction.imBack(session, "English", "English")
                        ])
                ]);
                builder.Prompts.choice(session, msg, '한국어|English');
    },
    function (session, results) {
        var locale;
        switch (results.response.entity) {
            case '한국어':
                locale = 'ko';
                break;
            case 'English':
                locale = 'en';
                break;
        }
        session.preferredLocale(locale, function (err) {
            if (err) {
                session.error(err);
            }
        });
        var options = session.localizer.gettext(session.preferredLocale(), "name");
        var msg = new builder.Message(session)
            .attachments([
                new builder.HeroCard(session)
                    .title(options)
                    .text(session.localizer.gettext(session.preferredLocale(), "welcomemessage"))
                        .buttons([
                            builder.CardAction.imBack(session, "가격 보여줘", "가격"),
                            builder.CardAction.imBack(session, "디자인 보여줘", "디자인"),
                            builder.CardAction.imBack(session, "편의사항 보여줘", "편의사항"),
                            builder.CardAction.imBack(session, "시승 보여줘", "시승")
                        ])
            ]);

        builder.Prompts.choice(session, msg, '가격|디자인|편의사항|시승');
        session.endDialog();
        
        greeting.create(bot, session.preferredLocale());           // 인사
        testDriveKor.create(bot);       // 시승
        designKor.create(bot);          // 디자인
        convenienceKor.create(bot);     // 편의사항
        priceKor.create(bot);           // 가격
        console.log("user insert : " + session.message.text);
    }
]);


//=========================================================
// Bots Dialogs
//=========================================================

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
