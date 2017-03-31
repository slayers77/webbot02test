var builder = require('botbuilder');
var language = "";
var korTestDrive = require('./testDriveKor');
var luis = require('./luis');
//var korConvenience = require('./convenienceKor');
//var korDesign = require('./designKor');
//var korPrice = require('./priceKor');

//var engTestDrive = require('./testDriveEng');
//var engConvenience = require('./convenienceEng');
//var engDesign = require('./designEng');
//var engPrice = require('./priceEng');

//exports.create = function (bot) {
function create (bot) {
    //exports.create = function (con) {

    //var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/6393ebda-613e-477e-bade-92330e2e496d?subscription-key=7489b95cf3fb4797939ea70ce94a4b11');
    //bot.recognizer(recognizer);
    //var intents = new builder.IntentDialog({ recognizers: [recognizer] });
    ///*global.intents = new builder.IntentDialog({ recognizers: [recognizer] })*/;

    if (!bot) throw new error('bot instance was not provided!!');

    var intents = new builder.IntentDialog();
    bot.dialog('/', intents);


    intents.onDefault(session => {

        //session.send('greeting ');
        session.beginDialog('/greeting');

    })

    bot.dialog('/greeting', [

        function (session) {

            //console.log('session response : ' + session.message.text);

            return luis.query(session.message.text)
                .then(luisResult => {
                    const intent = luisResult.topScoringIntent.intent;
                    //const entity = luisResult.entities.;
                    const entity = Object.keys(luisResult.entities).length;
                    console.log(`processing resolved intent: ${intent}`);
                    console.log(`greeting : ` + luisResult.entities[0].type);

                    // collect missing fields 
                    return session.beginDialog('/korMenu');

                    

                })
                .catch(err => {
                    console.error(`error processing intent: ${err.message}`);
                    session.send(`there was an error processing your request, please try again later...`);
                    return session.cancelDialog(0, '/');

                });


            //builder.Prompts.text(session, '');
            //builder.Prompts.choice(session, "Hi...... Choose or Typing Your Language : ", 'English|Korean', { listStyle: builder.ListStyle.button });

        }
        ,function (session, results) {

            console.log('111 : ' + results.response.entity);

            return luis.query('하이')
            .then(luisResult => {
                const intent = luisResult.topScoringIntent.intent;
                //const entity = luisResult.entities.;
                const entity = Object.keys(luisResult.entities).length;
                console.log(`processing resolved intent: ${intent}`);
                console.log(`greeting : ` + luisResult.entities[0].type);

                // collect missing fields 
                if (luisResult.entities[0].type == '한국어인사') { return session.beginDialog('/korMenu'); }
                else if (luisResult.entities[0].type == '영어인사') { return session.beginDialog('/EngMenu'); }
                
            })
            .catch(err => {
                console.error(`error processing intent: ${err.message}`);
                session.send(`there was an error processing your request, please try again later...`);
                //return session.cancelDialog(0, '/');
                
            });
        }
    ]);



    bot.dialog('/korMenu', [

        function (session, args, next) {

            session.send("안녕!! 난 현대자동차 챗봇 그랜다이저야 !!");
            builder.Prompts.choice(session, '원하시는 메뉴를 선택하세요? 선택하시거나 질문해주세요!!', '시승|디자인|편의사항|가격', { listStyle: builder.ListStyle.button });

        }

        ,function (session, results) {

            //console.log('시승 선택 : ' + session.message.text);
            //console.log('시승 선택 : ' + results.response.entity);

            if()



        }

    ]);



    bot.dialog('/EngMenu', [

        function (session, args, next) {

            session.send("Hi!! I`m Hyundai Motors ChatBot  Grandizer!!");
            builder.Prompts.choice(session, 'What do you want menu? choice or typing!!', 'testDrive|Design|Convenience|Price', { listStyle: builder.ListStyle.button });

        }


    ])

    //intents.onBegin(function (session, args, next) {
    //    session.dialogData.name = args.name;
    //    session.send("Hi %s...", args.name);
    //    next();
    //});

    //bot.dialog('/korMainMenu', [

    //    function (session, args, next) {

    //        if (language == "kor") {

    //            session.send("안녕!! 난 현대자동차 챗봇 그랜다이저야 !!");
    //            builder.Prompts.choice(session, '원하시는 메뉴를 선택하세요? 선택하시거나 질문해주세요!!', '시승|디자인|편의사항|가격', { listStyle: builder.ListStyle.button });
    //        }
    //        else if (language == "eng") {

    //        }
    //    }
    //    ,
    //    function (session, results) {

    //        if (results.response.entity == "시승") {
    //            session.send('select menu : ' + results.response.entity);
    //            //korTestDrive.create(session, intents);

    //        }
    //    }
    //]);

    //intents.matches('None', [

    //    function (session, args, next) {

    //        session.endDialog("sorry - i did not understand. Try to say 'hello' or '하이'");
    //    }
    //]);

    //intents.matches('greeting', [
    //    function (session, args, next) {

    //        var korean = builder.EntityRecognizer.findEntity(args.entities, '한국어인사');
    //        var english = builder.EntityRecognizer.findEntity(args.entities, '영어인사');

    //        if (korean) {
    //            language = 'kor';
    //            //session.send('/korMainMenu'+args);
    //        }
    //        else if (english) {
    //            language = 'eng';
    //        }
    //        else if (!korean || !english) { language = 'non' }

    //        return next({ response: language });

    //    },
    //    function (session, results) {

    //        if (results.response == 'eng') {

    //        } else if (results.response == 'kor') {

    //            //bot.beginDialog(session.message.address, '/korMainMenu');
    //            session.send("안녕!! 난 현대자동차 챗봇 그랜다이저야 !!");
    //            builder.Prompts.choice(session, '원하시는 메뉴를 선택하세요? 선택하시거나 질문해주세요!!', '시승|디자인|편의사항|가격', { listStyle: builder.ListStyle.button });

    //        }
    //    },
    //    function (session, results) {

    //        session.send('your choice :'+ results.response.entity);
    //    }
    //]);

    //intents.matches('시승',

    //    function (session, args, next) {

    //        var testDrive = builder.EntityRecognizer.findEntity(args.entities, '메인주제::시승');
    //        var online = builder.EntityRecognizer.findEntity(args.entities, '시승주제::온라인');
    //        var offline = builder.EntityRecognizer.findEntity(args.entities, '시승주제::시승센터');


    //        if (online) {

    //            session.send('온라인 예약을 위한 링크를 알려드릴께요!!');


    //        }
    //        else if (offline) {

    //            session.send('시승센타 예약을 위한 방법을 알려드릴께요!!');
    //        }
    //        else if (testDrive) {

    //            session.send('맞아요 한번 타 보셔야 그랜저를 더 잘아시게 될꺼에요!!!');
    //            session.send('시승 신청을 하시기 위해서는 온라인 예약을 하시거나 시승센터에 직접 연락을 해주셔야 합니다.');
    //            builder.Prompts.choice(session, '제가 도와드릴께요.. 어떤 방법이 편하시겠어요?', '온라인|시승센터', { listStyle: builder.ListStyle.button });

    //        }

    //        //session.send('맞아요 한번 타 보셔야 그랜저를 더 잘아시게 될꺼에요!!!');
    //        //session.send('시승 신청을 하시기 위해서는 온라인 예약을 하시거나 시승센터에 직접 연락을 해주셔야 합니다.');
    //        //builder.Prompts.choice(session, '제가 도와드릴께요.. 어떤 방법이 편하시겠어요?', '온라인|시승센터', { listStyle: builder.ListStyle.button });

    //        //builder.Prompts.text(session, 'Your Ment  : ' + session.message.text);

    //        //var testDrive = builder.EntityRecognizer.findEntity(args.entities, '메인주제::시승');


    //        ////var english = builder.EntityRecognizer.findEntity(args.entities, '영어인사');
    //        ////var aa = builder.EntityRecognizer.findAllEntities(args.entities.type, '인사::한국어'); 
    //        ////var aa = builder.EntityRecognizer.

    //        //if (testDrive) { language = 'kor'; }
    //        //else if (english) { language = 'eng'; }
    //        ////else if (!korean || !english) { language = 'non'}

    //        ////builder.Prompts.text(session, language);
    //        //return next({ response: language });

    //    }

    //);



    //bot.dialog('/', [

    //    function (session) {

    //        builder.Prompts.choice(session, "Hi...... Choose or Typing Your Language : ", 'English|Korean', { listStyle: builder.ListStyle.button });

    //    },

    //    function (session, results) {
    //        session.preferredLocale(results.response.entity, function (err) {
    //            if (!err) {
    //                //session.send("Your Choice Language %s.", results.response.entity);
    //                session.userData.language = results.response.entity;
    //                if (results.response.entity == "English") {
    //                    session.send("Hi!! I`m Hyundai Motors ChatBot  Grandizer!!");
    //                    builder.Prompts.text(session, 'What is your name?');
    //                }
    //                else if (results.response.entity == "Korean") {
    //                    session.send("안녕!! 난 현대자동차 챗봇 그랜다이저야 !!");
    //                    builder.Prompts.text(session, '당신의 이름은?');
    //                }
    //            } else {
    //                session.error(err);
    //            }
    //        });
    //    },
    //    function (session, results) {

    //        if (session.userData.language == 'English') {

    //            session.send('Hello %s!', results.response);
    //            session.userData.name = results.response;
    //            builder.Prompts.choice(session, 'What is your Age Group?', '10~20 AgeGroup|30 AgeGroup|40 AgeGroup|50 AgeGroup| 60 Over AgeGroup', { listStyle: builder.ListStyle.button });

    //        } else if (session.userData.language == 'Korean') {

    //            session.send('안녕 %s!', results.response);
    //            session.userData.name = results.response;
    //            builder.Prompts.choice(session, '당신의 연령대는?', '10~20대|30대|40대|50대|60대이상', { listStyle: builder.ListStyle.button });

    //        }
    //    },
    //    function (session, results) {

    //        if (session.userData.language == 'English') {

    //            session.send('Your AgeGroup :  %s!', results.response.entity);
    //            //session.userData.age = results.response.entity;
    //            ession.send("Your Choice Language : " + session.userData.language + " Your Name : " + session.userData.name + " Your Age : " + results.response.entity);
    //            session.send("OK.. Let`s Go Grandizer..!!" + session.userData.name);
    //            builder.Prompts.choice(session, 'What do you want menu? choice or typing!!', 'testDrive|Design|Convenience|Price', { listStyle: builder.ListStyle.button });

    //        } else if (session.userData.language == 'Korean') {

    //            session.send('당신의 연령대는 : %s!', results.response.entity);
    //            //session.userData.menu = results.response.entity;
    //            //session.send("당신이 선택한 언어 : %s  당신의 이름 : %s  당신의 연령대 : %s", session.userData.language, session.userData.name, session.userData.age);
    //            session.send("당신이 선택한 언어 : " + session.userData.language + "  당신의 이름 : " + session.userData.name + "  당신의 연령대 : " + results.response.entity);
    //            session.send("OK.. 그랜다이저를 시작해볼까요..!! %s 님", session.userData.name);
    //            builder.Prompts.choice(session, '원하시는 메뉴를 선택하세요? 선택하시거나 질문해주세요!!', '시승|디자인|편의사항|가격', { listStyle: builder.ListStyle.button });

    //        }
    //    }, function (session, results) {

    //        if (session.userData.language == 'English') {

    //            session.send('Your Select menu :  %s!', results.response.entity);
    //            if (results.response.entity == 'testDrive') {
    //                engTestDrive.beginDialog(session);
    //                engTestDrive.create(bot);
    //            }
    //            else if (results.response.entity == 'Design') {
    //                engDesign.beginDialog(session);
    //                engDesign.create(bot);
    //            }
    //            else if (results.response.entity == 'Convenience') {
    //                engConvenience.beginDialog(session);
    //                engConvenience.create(bot);
    //            }
    //            else if (results.response.entity == 'Price') {
    //                engPrice.beginDialog(session);
    //                engPrice.create(bot);
    //            }

    //        } else if (session.userData.language == 'Korean') {

    //            session.send('당신의 선택 메뉴 : %s!', results.response);
    //            if (results.response.entity == '시승') {
    //                session.send('당신의 선택 메뉴 : %s!', results.response.entity);
    //                //korTestDrive.beginDialog(session, bot);
    //                //korTestDrive.create(bot);
    //                //bot.libraby
    //                session.send('당신의 선택 메뉴!!! : %s!', results.response.entity);
    //            }
    //            else if (results.response.entity == '디자인') {
    //                korDesign.beginDialog(session);
    //                korDesign.create(bot);
    //            }
    //            else if (results.response.entity == '편의사항') {
    //                korConvenience.beginDialog(session);
    //                korConvenience.create(bot);
    //            }
    //            else if (results.response.entity == '가격') {
    //                korPrice.beginDialog(session);
    //                korPrice.create(bot);
    //            }

    //        }
    //    }
    //])

    function testDriveFnc(builder, args, session) {

        var intent = args.intent;

    }


}

//function prepareForm(intent) {
//    const form = [];
//    const fields = intentForms.intents[intent];
//    if (!fields) return form;
    
//    fields.forEach(field => {
//        var instance = {};
//        extend(instance, intentForms.fields[field], true);
//        instance.name = field;
//        form.push(instance);
        
//    });
    

//    return form;
    
//} 



module.exports = {
    create
}