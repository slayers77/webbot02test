var builder = require('botbuilder');
var language = "";
var luis = require('./luis');
//var insetMent = require('./insertMent');
var sessions = {};

//이미지경로 전역 변수 선언
global.img_path = 'http://webbot02.azurewebsites.net/hyundai';


function create(bot) {                                                  // function create(bot) START

    if (!bot) throw new error('bot instance was not provided!!');

    var intents = new builder.IntentDialog();
    bot.dialog('/', intents);

    intents.onDefault(session => {

        session.beginDialog('/greeting');

    })
    /***********************************************************************************
        greeting (인사말 구분 및 초기 유제 멘트 Luis 분기)
    ************************************************************************************/
    bot.dialog('/greeting', [                   //bot.dialog('/greeting' start

        function (session) {
            

            console.log("SECOND ID : " + session.message.sourceEvent.clientActivityId);
            return session.beginDialog('/korMenu');

            //var kor = /[ㄱ-힣]/g;
            //var eng = /^[A-Z|a-z]/g;
            //var ment = session.message.text;
            //console.log('kor : ' + ment.match(kor));
            //console.log('eng : ' + ment.match(eng)); 
            //session.beginDialog('/korMenu');

            //return luis.query(session.message.text)
            //    .then(luisResult => {
            //        var intent = luisResult.topScoringIntent.intent;
            //        var entityLen = Object.keys(luisResult.entities).length;
            //        console.log(`processing resolved intent: ${intent}`);
            //        //console.log(`greeting : ` + luisResult.entities[0].type);

            //        // collect missing fields 

            //        if (intent == 'greeting') {

            //            if (luisResult.entities[0].type == '한국어인사') { return session.beginDialog('/korMenu'); }
            //            else if (luisResult.entities[0].type == '영어인사') { return session.beginDialog('/EngMenu'); }

            //        } else if (intent == '시승') {

            //            console.log("luisResult.entities : " + luisResult.entities.length);
            //            for (var i = 0; i < luisResult.entities.length; i++) {

            //                if (luisResult.entities[i].type.match('온라인 예약')) {

            //                    return session.beginDialog('/korTestDrive');

            //                } else if (luisResult.entities[i].type.match('시승센터 전화예약')) {

            //                    return session.beginDialog('/findTestDriveOffline');

            //                } else {

            //                    return session.beginDialog('/korTestDrive');

            //                }

            //            }
            //        } else if (intent == '디자인') { return session.beginDialog('/korDesign'); }
            //        else if (intent == '편의사항') { return session.beginDialog('/korConvenience'); }
            //        else if (intent == '가격') { return session.beginDialog('/korPrice'); }
            //        else if (intent == 'None') {

            //            session.send("I Do Not Understanding Your Comment . Please Typing 'hi' or '하이'");

            //            return session.beginDialog('/');
            //        }

            //    })
            //    .catch(err => {
            //        console.error(`error processing intent: ${err.message}`);
            //        session.send(`there was an error processing your request, please try again later...`);
            //        return session.cancelDialog(0, '/');

            //    });
        }
    ]);//bot.dialog('/greeting' end



    /***********************************************************************************
        한국어 메뉴 초기화면
    ************************************************************************************/

    bot.dialog('/korMenu', [                                        //bot.dialog('/korMenu' start

        function (session, args, next) {
            console.log('img_path  : ' + img_path);
            var card = new builder.HeroCard(session)
                .title("그랜다이저")
                .text("안녕하세요!! 전 현대자동차 챗봇 그랜다이저입니다.")
                .images([
                    //builder.CardImage.create(session, "https://raw.githubusercontent.com/kimhyunsuk/webbot02/master/images/Grandeur_main.png")
                    builder.CardImage.create(session, img_path + "/images/Grandeur_main.png")

                    //builder.CardImage.create(session, "images\Grandeur_main.png")
                    //builder.CardImage.create(session, "/d/home/site/wwwroot/images/Grandeur_main.jpg")

                ]);
            var msg = new builder.Message(session).attachments([card]);
            session.send(msg);

            //session.send("안녕!! 난 현대자동차 챗봇 그랜다이저야 !!");

            builder.Prompts.choice(session, '원하시는 메뉴를 \n\n 선택하시거나 질문해주세요!!', '시승|디자인|편의사항|가격', { listStyle: builder.ListStyle.button });

        }

        , function (session, results) {

            var str = "";
            console.log('select menu : ' + session.message.text);
            if (session.message.text == results.response.entity) {
                console.log('선택 문구 : ' + results.response.entity);
                str = results.response.entity;

                if (str == '시승') {
                    session.beginDialog('/korTestDrive');
                } else if (str == '디자인') {
                    session.beginDialog('/korDesign');
                } else if (str == '편의사항') {
                    session.beginDialog('/korConvenience');
                } else if (str == '가격') {
                    session.beginDialog('/korPrice');
                } else {
                    session.endDialog();
                }

            } else if (session.message.text != results.response.entity) {

                console.log('입력 문구 : ' + session.message.text);
                str = session.message.text;
                return luis.query(str)
                    .then(luisResult => {
                        var intent = luisResult.topScoringIntent.intent;
                        var entityLen = Object.keys(luisResult.entities).length;
                        console.log(`processing resolved intent: ${intent}`);

                        for (var i = 0; i < entityLen; i++) {

                            console.log("[" + i + "] : " + luisResult.entities[i].type);

                            if (luisResult.entities[i].type.match(/시승/g)) {
                                session.beginDialog('/korTestDrive');
                            } else if (luisResult.entities[i].type.match(/가격/g)) {
                                session.beginDialog('/korPrice');
                            } else if (luisResult.entities[i].type.match(/편의사항/g)) {
                                session.beginDialog('/korConvenience');
                            } else if (luisResult.entities[i].type.match(/디자인/g)) {
                                session.beginDialog('/korDesign');
                            }

                        };
                    })
                    .catch(err => {
                        console.error(`error processing intent: ${err.message}`);
                        session.send(`there was an error processing your request, please try again later...`);
                        return session.cancelDialog(0, '/');

                    });

            }
        },
        function (session, results) {
            // The menu runs a loop until the user chooses to (quit).
            session.replaceDialog('/korMenu');
        }

    ]).reloadAction('reloadMenu', null, { matches: /^그랜다이저/i });

    //bot.dialog('/korMenu' end


    /***********************************************************************************
        영어 초기 메뉴
    ************************************************************************************/
    bot.dialog('/EngMenu', [

        function (session, args, next) {

            session.send("Hi!! I`m Hyundai Motors ChatBot  Grandizer!!");
            builder.Prompts.choice(session, 'What do you want menu? choice or typing!!', 'testDrive|Design|Convenience|Price', { listStyle: builder.ListStyle.button });

        }


    ]);

}   // function create(bot) END



module.exports = {
    create
}