var builder = require('botbuilder');
var language = "";
//var luis = require('./luis');
//var insetMent = require('./insertMent');
var query = require('./config/query');
var sessions = {};
global.cnt = 0;
//이미지경로 전역 변수 선언
global.img_path = 'http://webbot02.azurewebsites.net/hyundai';


function create(bot) {                                                  // function create(bot) START

    if (!bot) throw new error('bot instance was not provided!!');

    //var recognizer= new b
    console.log("cnt : " + cnt);
    //var intents = new builder.IntentDialog();
    var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/4e351e9f-d983-4ba7-b575-f78f7ff709a2?subscription-key=9fed2fd1ec614cb58ae1989302151d13&verbose=true');
    var intents = new builder.IntentDialog({ recognizers: [recognizer] });
    bot.dialog('/', intents);


    
    intents.matches('korReturnMainMenu', builder.DialogAction.beginDialog('/korMenu'));

    intents.matches('greeting', builder.DialogAction.beginDialog('/korMenu'));

    intents.matches('korTestDriveMain', builder.DialogAction.beginDialog('/korTestDrive'));
    intents.matches('korOnlineTestDrive', builder.DialogAction.beginDialog('/korOnlineTestDrive'));
    intents.matches('korNoAreaOfflineTestDrive', builder.DialogAction.beginDialog('/korNoAreaOfflineTestDrive'));
    intents.matches('korAreaOfflineTestDrive', builder.DialogAction.beginDialog('/korAreaOfflineTestDrive'));



    intents.matches('korConvenienceMain', builder.DialogAction.beginDialog('/korConvenienceMain'));

    //intents.matches('korConvenienceInfotainmentIntro', builder.DialogAction.beginDialog('/'));
    //intents.matches('korConvenienceInfotainmentLink', builder.DialogAction.beginDialog('/'));
    intents.matches('korConvenienceInfotainmentList', builder.DialogAction.beginDialog('/korConvenienceInfotainmentList'));
    intents.matches('korConvenienceInfotainmentSimple', builder.DialogAction.beginDialog('/korConvenienceInfotainmentSimple'));

    //intents.matches('korConvenienceSafetyIntro', builder.DialogAction.beginDialog('/'));
    //intents.matches('korConvenienceSafetyLink', builder.DialogAction.beginDialog('/'));
    intents.matches('korConvenienceSafetyList', builder.DialogAction.beginDialog('/korConvenienceSafetyList'));
    intents.matches('korConvenienceSafetySimple', builder.DialogAction.beginDialog('/korConvenienceSafetySimple'));

    //intents.matches('korConvenienceSmartsenseIntro', builder.DialogAction.beginDialog('/'));
    //intents.matches('korConvenienceSmartsenseLink', builder.DialogAction.beginDialog('/'));
    intents.matches('korConvenienceSmartsenseList', builder.DialogAction.beginDialog('/korConvenienceSmartsenseList'));
    intents.matches('korConvenienceSmartSenseSimple', builder.DialogAction.beginDialog('/korConvenienceSmartSenseSimple'));


    intents.matches('korDesignMain', builder.DialogAction.beginDialog('/korDesignMain'));
    intents.matches('korDesignColorList', builder.DialogAction.beginDialog('/korDesignColorList'));
    intents.matches('korDesignSelectGrandBlue', builder.DialogAction.beginDialog('/korDesignSelectGrandBlue'));
    intents.matches('korDesignSelectIonSilver', builder.DialogAction.beginDialog('/korDesignSelectIonSilver'));
    intents.matches('korDesignSelectKakiMetal', builder.DialogAction.beginDialog('/korDesignSelectKakiMetal'));
    intents.matches('korDesignSelectLunaGray', builder.DialogAction.beginDialog('/korDesignSelectLunaGray'));
    intents.matches('korDesignSelectMidnightBlack', builder.DialogAction.beginDialog('/korDesignSelectMidnightBlack'));
    intents.matches('korDesignSelectPanteraGray', builder.DialogAction.beginDialog('/korDesignSelectPanteraGray'));
    intents.matches('korDesignSelectShadeBronze', builder.DialogAction.beginDialog('/korDesignSelectShadeBronze'));
    intents.matches('korDesignSelectValentineRed', builder.DialogAction.beginDialog('/korDesignSelectValentineRed'));
    intents.matches('korDesignSelectWhiteCream', builder.DialogAction.beginDialog('/korDesignSelectWhiteCream'));

    intents.matches('korDesignExteriorSimple', builder.DialogAction.beginDialog('/korDesignExteriorSimple'));
    intents.matches('korDesignExteriorDetail', builder.DialogAction.beginDialog('/korDesignExteriorDetail'));


    intents.matches('korDesignInteriorSimple', builder.DialogAction.beginDialog('/korDesignInteriorSimple'));
    intents.matches('korDesignInteriorDetail', builder.DialogAction.beginDialog('/korDesignInteriorDetail'));


    //intents.matches('korPriceMain', builder.DialogAction.beginDialog('/'));
    //intents.matches('korPriceDiesel2.2', builder.DialogAction.beginDialog('/'));
    //intents.matches('korPriceGas2.4', builder.DialogAction.beginDialog('/'));
    //intents.matches('korPriceGas3.0', builder.DialogAction.beginDialog('/'));
    //intents.matches('korPriceGas3.3', builder.DialogAction.beginDialog('/'));
    

    /***********************************************************************************
        한국어 메뉴 초기화면
    ************************************************************************************/
    //bot.dialog('/korMenu' start
    bot.dialog('/korMenu', [                                        

        function (session, args, next) {
            console.log('img_path  : ' + img_path);
            var msg = new builder.Message(session)
                .attachments([

                    new builder.HeroCard(session)
                        .title("그랜다이저")
                        .text("안녕하세요!! 전 현대자동차 챗봇 그랜다이저입니다. 원하시는 메뉴를 \n\n 선택하시거나 질문해주세요!!")
                        .images([

                            builder.CardImage.create(session, img_path + "/images/Grandeur_main.png")

                        ])
                        .buttons([

                            builder.CardAction.imBack(session, "시승 보여줘", "시승"),
                            builder.CardAction.imBack(session, "디자인 보여줘", "디자인"),
                            builder.CardAction.imBack(session, "편의사항 보여줘", "편의사항"),
                            builder.CardAction.imBack(session, "편의사항 보여줘", "가격")
                        ])
                ]);
                
                builder.Prompts.choice(session, msg, '시승|디자인|편의사항|가격');
                session.endDialog();

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