var builder = require('botbuilder');
var request = require('request');

var date = require('date-utils');
date = new Date();
var language = "";

var query = require('./config/query');

var sessions = {};
global.cnt = 0;
//이미지경로 전역 변수 선언
global.img_path = 'http://webbot02.azurewebsites.net/hyundai';

var noneCont = 0;


function create(bot, languageValue) {                                                  // function create(bot) START

    var responseTime;

    if (!bot) throw new error('bot instance was not provided!!');

    if (languageValue == 'ko') {
        console.log('ko');
        var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/4e351e9f-d983-4ba7-b575-f78f7ff709a2?subscription-key=9fed2fd1ec614cb58ae1989302151d13&verbose=true');
    } else {
        console.log('en');
        var recognizer = new builder.LuisRecognizer('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/dc1e0bf6-7b94-4d8a-8f20-6c4bf1fe2298?subscription-key=9fed2fd1ec614cb58ae1989302151d13&verbose=true&timezoneOffset=0.0&q=');    
    }
    var intents = new builder.IntentDialog({ recognizers: [recognizer] });
    bot.dialog('/', intents);


    intents.matches('None', [

        function (session, args, next) {

            var qnaMsg = "";
            var qnaScore = 0;

            // 헤더 부분
            var headers = {
                'Ocp-Apim-Subscription-Key': '7d9d91d741684466bed2e706cfe5421a',
                'Content-Type': 'application/json'
            }

            // 요청 세부 내용
            var options = {
                url: 'https://westus.api.cognitive.microsoft.com/qnamaker/v1.0/knowledgebases/b9c07815-a65e-410e-98e7-171ff06d5748/generateAnswer',
                method: 'POST',
                headers: headers,
                form: { 'question': session.message.text }
            }

            // 요청 시작 받은값은 body
            request(options, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    console.log(body);
                    console.log(JSON.parse(body).answer);
                    msg = JSON.parse(body).answer;
                    score = JSON.parse(body).score;
                }
                console.log("qnaMsg : " + qnaMsg);
                //session.beginDialog('/QnA', { qnaResponse: msg, qnaScore: score });
                session.endDialog();
                session.beginDialog('/QnA', { qnaResponse: msg, qnaScore: score , sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "None", tableNm: "insert_history" });
            })
            
        }

    ]);

    
    intents.matches('korReturnMainMenu', [
        function (session, args, next) {
            session.beginDialog('/korReMainMenu', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korReturnMainMenu", tableNm: "insert_history"});
        }
    ]);
    
    intents.matches('greeting', [   
        function (session, args, next) {
            session.beginDialog('/korMenu', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korMenu", tableNm: "insert_history"});
        }
    ]);

     /*
        시승 INTENT MATCH
    */
    
    intents.matches('korTestDriveMain', [
        function (session, args, next) {
            session.beginDialog('/korTestDriveMain', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korTestDriveMain", tableNm: "insert_history"});
        }
    ]);

    intents.matches('korOnlineTestDrive', [
        function (session, args, next) {
            session.beginDialog('/korOnlineTestDrive', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korOnlineTestDrive", tableNm: "insert_history"});
        }
    ]);

    intents.matches('korNoAreaOfflineTestDrive', [
        function (session, args, next) {
            session.beginDialog('/korNoAreaOfflineTestDrive', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korNoAreaOfflineTestDrive", tableNm: "insert_history" });
        }
    ]);

    intents.matches('korAreaOfflineTestDrive', [
        function (session, args, next) {
            session.beginDialog('/korAreaOfflineTestDrive', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korAreaOfflineTestDrive", tableNm: "insert_history" });
        }
    ]);

    /*
        편의사항 INTENT MATCH
    */

    intents.matches('korConvenienceMain', [
        function (session, args, next) {
            session.beginDialog('/korConvenienceMain', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korConvenienceMain", tableNm: "insert_history" });
        }
    ]);
    
    intents.matches('korConvenienceInfotainmentList', [
        function (session, args, next) {
            session.beginDialog('/korConvenienceInfotainmentList', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korConvenienceInfotainmentList", tableNm: "insert_history" });
        }
    ]);
    intents.matches('korConvenienceInfotainmentSimple', [
        function (session, args, next) {
            session.beginDialog('/korConvenienceInfotainmentSimple', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korConvenienceInfotainmentSimple", tableNm: "insert_history" });
        }
    ]);

    intents.matches('korConvenienceSafetyList', [
        function (session, args, next) {
            session.beginDialog('/korConvenienceSafetyList', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korConvenienceSafetyList", tableNm: "insert_history" });
        }
    ]);
    intents.matches('korConvenienceSafetySimple', [
        function (session, args, next) {
            session.beginDialog('/korConvenienceSafetySimple', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korConvenienceSafetySimple", tableNm: "insert_history" });
        }
    ]);

    intents.matches('korConvenienceSmartsenseList', [
        function (session, args, next) {
            session.beginDialog('/korConvenienceSmartsenseList', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korConvenienceSmartsenseList", tableNm: "insert_history" });
        }
    ]);
    intents.matches('korConvenienceSmartSenseSimple', [
        function (session, args, next) {
            session.beginDialog('/korConvenienceSmartSenseSimple', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korConvenienceSmartSenseSimple", tableNm: "insert_history" });
        }
    ]);

    /*
        디자인 INTENT MATCH
    */

    intents.matches('korDesignMain', [
        function (session, args, next) {
            session.beginDialog('/korDesignMain', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignMain", tableNm: "insert_history" });
        }
    ]);
    intents.matches('korDesignColorList',[
        function (session, args, next) {
            session.beginDialog('/korDesignColorList', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignColorList", tableNm: "insert_history" });
        }
    ]);
    intents.matches('korDesignSelectGrandBlue',[
        function (session, args, next) {
            session.beginDialog('/korDesignSelectGrandBlue', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignSelectGrandBlue", tableNm: "insert_history" });
        }
    ]);
    intents.matches('korDesignSelectIonSilver', [
        function (session, args, next) {
            session.beginDialog('/korDesignSelectIonSilver', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignSelectIonSilver", tableNm: "insert_history" });
        }
    ]);
    intents.matches('korDesignSelectKakiMetal', [
        function (session, args, next) {
            session.beginDialog('/korDesignSelectKakiMetal', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignSelectKakiMetal", tableNm: "insert_history" });
        }
    ]);
    intents.matches('korDesignSelectLunaGray', [
        function (session, args, next) {
            session.beginDialog('/korDesignSelectLunaGray', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignSelectLunaGray", tableNm: "insert_history" });
        }
    ]);
    intents.matches('korDesignSelectMidnightBlack', [
        function (session, args, next) {
            session.beginDialog('/korDesignSelectMidnightBlack', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignSelectMidnightBlack", tableNm: "insert_history" });
        }
    ]);
    intents.matches('korDesignSelectPanteraGray', [
        function (session, args, next) {
            session.beginDialog('/korDesignSelectPanteraGray', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignSelectPanteraGray", tableNm: "insert_history" });
        }
    ]);
    intents.matches('korDesignSelectShadeBronze', [
        function (session, args, next) {
            session.beginDialog('/korDesignSelectShadeBronze', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignSelectShadeBronze", tableNm: "insert_history" });
        }
    ]);
    intents.matches('korDesignSelectValentineRed', [
        function (session, args, next) {
            session.beginDialog('/korDesignSelectValentineRed', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignSelectValentineRed", tableNm: "insert_history" });
        }
    ]);
    intents.matches('korDesignSelectWhiteCream', [
        function (session, args, next) {
            session.beginDialog('/korDesignSelectWhiteCream', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignSelectWhiteCream", tableNm: "insert_history" });
        }
    ]);

    intents.matches('korDesignExteriorSimple', [
        function (session, args, next) {
            session.beginDialog('/korDesignExteriorSimple', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignExteriorSimple", tableNm: "insert_history" });
        }
    ]);
    intents.matches('korDesignExteriorDetail', [
        function (session, args, next) {
            session.beginDialog('/korDesignExteriorDetail', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignExteriorDetail", tableNm: "insert_history" });
        }
    ]);


    intents.matches('korDesignInteriorSimple', [
        function (session, args, next) {
            session.beginDialog('/korDesignInteriorSimple', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorSimple", tableNm: "insert_history" });
        }
    ]);
    intents.matches('korDesignInteriorDetail', [
        function (session, args, next) {
            session.beginDialog('/korDesignInteriorDetail', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history" });
        }
    ]);
    intents.matches('korCompareModel', [
        function (session, args, next) {
            console.log("user insert : ");
        }
    ]);



/*
가격 INTENT MATCH
*/
    intents.matches('korPriceMain', [
        function (session, args, next) {
            var messageArray = [];

            console.log("args.entities : " + session.message.text);
            messageArray = session.message.text.split(" ");

            if (messageArray[0] == "가솔린2.4") {
                console.log("가솔린 2.4");
                if (messageArray[1] == "모던") {
                    console.log("모던");

                    if (messageArray[2] == "기본품목") {
                        session.beginDialog('/korPriceBasicOptionList', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 2.4", trim: "모던" });
                    } else if (messageArray[2] == "파워트레인") {
                        session.beginDialog('/korPriceBasicOptionItem', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 2.4", trim: "모던", basicOption1: "파워트레인" });
                    } else if (messageArray[2] == "성능") {
                        session.beginDialog('/korPriceBasicOptionItem', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 2.4", trim: "모던", basicOption1: "성능" });
                    } else if (messageArray[2] == "안전") {
                        session.beginDialog('/korPriceBasicOptionItem', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 2.4", trim: "모던", basicOption1: "안전" });
                    } else if (messageArray[2] == "외관") {
                        session.beginDialog('/korPriceBasicOptionItem', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 2.4", trim: "모던", basicOption1: "외관" });
                    } else if (messageArray[2] == "내장") {
                        session.beginDialog('/korPriceBasicOptionItem', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 2.4", trim: "모던", basicOption1: "내장" });
                    } else if (messageArray[2] == "시트") {
                        session.beginDialog('/korPriceBasicOptionItem', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 2.4", trim: "모던", basicOption1: "시트" });
                    } else if (messageArray[2] == "편의") {
                        session.beginDialog('/korPriceBasicOptionItem', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 2.4", trim: "모던", basicOption1: "편의" });
                    } else if (messageArray[2] == "멀티미디어") {
                        session.beginDialog('/korPriceBasicOptionItem', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 2.4", trim: "모던", basicOption1: "멀티미디어" });
                    }

                    else if (messageArray[2] == "선택품목") {
                        session.beginDialog('/korPriceSelectOptionList', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 2.4", trim: "모던" });
                    } else if (messageArray[2] == "파노라마썬루프") {
                        //session.beginDialog('/korPriceSelectOptionItem', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 2.4", trim: "모던", selectOption1: "파노라마 썬루프" });
                        session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 2.4", trim: "모던", carPrice: 30550000, selectOption1: "파노라마 썬루프", optionPrice1: 1100000 });
                    } else if (messageArray[2] == "TUIX컴포트패키지") {
                        session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 2.4", trim: "모던", carPrice: 30550000, selectOption1: "TUIX 컴포트 패키지", optionPrice1: 780000 });
                    } else if (messageArray[2] == "앞좌석통풍") {
                        session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 2.4", trim: "모던", carPrice: 30550000, selectOption1: "앞좌석 통풍 + 하이패스 시스템", optionPrice1: 600000 });
                    } else if (messageArray[2] == "하이패스시스템") {
                        session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 2.4", trim: "모던", carPrice: 30550000, selectOption1: "앞좌석 통풍 + 하이패스 시스템", optionPrice1: 600000 });
                    } else if (messageArray[2] == "현대스마트센스패키지IV") {
                        session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 2.4", trim: "모던", carPrice: 30550000, selectOption1: "현대 스마트 센스 패키지IV", optionPrice1: 18000000 });
                    }

                    else {
                        // 모던만 나오게 
                        session.beginDialog('/korPriceTrim', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 2.4", trim: "모던" });
                    }


                } else if (messageArray[1] == "프리미엄") {

                    if (messageArray[2] == "기본품목") { console.log("기본품목"); }
                    else if (messageArray[2] == "파워트레인") { }
                    else if (messageArray[2] == "성능") { console.log("성능"); }
                    else if (messageArray[2] == "안전") { }
                    else if (messageArray[2] == "외관") { }
                    else if (messageArray[2] == "내장") { }
                    else if (messageArray[2] == "시트") { }
                    else if (messageArray[2] == "편의") { }
                    else if (messageArray[2] == "멀티미디어") { }

                    else if (messageArray[2] == "선택품목") {
                        session.beginDialog('/korPriceSelectOptionList', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 2.4", trim: "프리미엄" });
                    } else if (messageArray[2] == "파노라마썬루프") {
                        session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 2.4", trim: "프리미엄", carPrice: 33750000, selectOption1: "파노라마 썬루프", optionPrice1: 1100000 });
                    } else if (messageArray[2] == "TUIX컴포트패키지") {
                        session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 2.4", trim: "프리미엄", carPrice: 33750000, selectOption1: "TUIX 컴포트 패키지", optionPrice1: 780000 });
                    } else if (messageArray[2] == "헤드업디스플레이(HUD)") {
                        session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 2.4", trim: "프리미엄", carPrice: 33750000, selectOption1: "헤드업 디스플레이(HUD)", optionPrice1: 1000000 });
                    } else if (messageArray[2] == "현대스마트센스패키지I") {
                        session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 2.4", trim: "프리미엄", carPrice: 33750000, selectOption1: "현대 스마트 센스 패키지I", optionPrice1: 1500000 });
                    } else if (messageArray[2] == "익스테리어패키지I") {
                        session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 2.4", trim: "프리미엄", carPrice: 33750000, selectOption1: "익스테리어 패키지I", optionPrice1: 1500000 });
                    }

                    else {
                        // 프리미엄만 나오게 
                        session.beginDialog('/korPriceTrim', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 2.4", trim: "프리미엄" });
                    }

                } else if (messageArray[1] == "프리미엄스페셜") {

                    if (messageArray[2] == "기본품목") { console.log("기본품목"); }
                    else if (messageArray[2] == "파워트레인") { }
                    else if (messageArray[2] == "성능") { console.log("성능"); }
                    else if (messageArray[2] == "안전") { }
                    else if (messageArray[2] == "외관") { }
                    else if (messageArray[2] == "내장") { }
                    else if (messageArray[2] == "시트") { }
                    else if (messageArray[2] == "편의") { }
                    else if (messageArray[2] == "멀티미디어") { }

                    else if (messageArray[2] == "선택품목") {
                        session.beginDialog('/korPriceSelectOptionList', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 2.4", trim: "프리미엄스페셜" });
                    } else if (messageArray[2] == "파노라마썬루프") {
                        //session.beginDialog('/korPriceSelectOptionItem', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 2.4", trim: "모던", selectOption1: "파노라마 썬루프" });
                        session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 2.4", trim: "프리미엄스페셜", carPrice: 31750000, selectOption1: "파노라마 썬루프", optionPrice1: 1100000 });
                    } else if (messageArray[2] == "TUIX컴포트패키지") {
                        session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 2.4", trim: "프리미엄스페셜", carPrice: 31750000, selectOption1: "TUIX 컴포트 패키지", optionPrice1: 780000 });
                    } else if (messageArray[2] == "헤드업디스플레이(HUD)") {
                        session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 2.4", trim: "프리미엄스페셜", carPrice: 31750000, selectOption1: "헤드업 디스플레이(HUD)", optionPrice1: 1000000 });
                    } else if (messageArray[2] == "현대스마트센스패키지II") {
                        session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 2.4", trim: "프리미엄스페셜", carPrice: 31750000, selectOption1: "현대 스마트 센스 패키지II", optionPrice1: 1600000 });
                    } else if (messageArray[2] == "익스테리어패키지II") {
                        session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 2.4", trim: "프리미엄스페셜", carPrice: 31750000, selectOption1: "익스테리어 패키지II", optionPrice1: 1000000 });
                    } else if (messageArray[2] == "JBL사운드패키지") {
                        session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 2.4", trim: "프리미엄스페셜", carPrice: 31750000, selectOption1: "JBL 사운드 패키지", optionPrice1: 1150000 });
                    } else if (messageArray[2] == "어라운드뷰모니터(AVM)") {
                        session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 2.4", trim: "프리미엄스페셜", carPrice: 31750000, selectOption1: "어라운드 뷰 모니터(AVM)", optionPrice1: 1200000 });
                    }

                    else {
                        // 프리미엄 스페셜만 나오게 
                        session.beginDialog('/korPriceTrim', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 2.4", trim: "프리미엄 스페셜" });
                    }
                }
                else {
                    //가솔린 2.4만 나오게
                    session.beginDialog('/korPriceTrim', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 2.4" });
                }
            } else if (messageArray[0] == "가솔린3.0") {

                if (messageArray[1] == "익스클루시브") {

                    if (messageArray[2] == "기본품목") { console.log("기본품목"); }
                    else if (messageArray[2] == "파워트레인") { }
                    else if (messageArray[2] == "성능") { console.log("성능"); }
                    else if (messageArray[2] == "안전") { }
                    else if (messageArray[2] == "외관") { }
                    else if (messageArray[2] == "내장") { }
                    else if (messageArray[2] == "시트") { }
                    else if (messageArray[2] == "편의") { }
                    else if (messageArray[2] == "멀티미디어") { }

                    else if (messageArray[2] == "선택품목") {
                        session.beginDialog('/korPriceSelectOptionList', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 3.0", trim: "익스클루시브" });
                    } else if (messageArray[2] == "파노라마썬루프") {
                        //session.beginDialog('/korPriceSelectOptionItem', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 2.4", trim: "모던", selectOption1: "파노라마 썬루프" });
                        session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 3.0", trim: "익스클루시브", carPrice: 35500000, selectOption1: "파노라마 썬루프", optionPrice1: 1100000 });
                    } else if (messageArray[2] == "TUIX컴포트패키지") {
                        session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 3.0", trim: "익스클루시브", carPrice: 35500000, selectOption1: "TUIX 컴포트 패키지", optionPrice1: 780000 });
                    } else if (messageArray[2] == "헤드업디스플레이(HUD)") {
                        session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 3.0", trim: "익스클루시브", carPrice: 35500000, selectOption1: "헤드업 디스플레이(HUD)", optionPrice1: 1000000 });
                    } else if (messageArray[2] == "현대스마트센스패키지II") {
                        session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 3.0", trim: "익스클루시브", carPrice: 35500000, selectOption1: "현대 스마트 센스 패키지II", optionPrice1: 1600000 });
                    } else if (messageArray[2] == "익스테리어패키지II") {
                        session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 3.0", trim: "익스클루시브", carPrice: 35500000, selectOption1: "익스테리어 패키지II", optionPrice1: 1600000 });
                    } else if (messageArray[2] == "어라운드뷰모니터(AVM)") {
                        session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 3.0", trim: "익스클루시브", carPrice: 35500000, selectOption1: "어라운드 뷰 모니터(AVM)+스마트 전동식 트렁크", optionPrice1: 1200000 });
                    } else if (messageArray[2] == "스마트전동식트렁크") {
                        session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 3.0", trim: "익스클루시브", carPrice: 35500000, selectOption1: "어라운드 뷰 모니터(AVM)+스마트 전동식 트렁크", optionPrice1: 1200000 });
                    }
                    else {
                        // 익스클루시브 만 나오게 
                        session.beginDialog('/korPriceTrim', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 3.0", trim: "익스클루시브" });
                    }
                } else if (messageArray[1] == "익스클루시브 스페셜") {

                    if (messageArray[2] == "기본품목") { console.log("기본품목"); }
                    else if (messageArray[2] == "파워트레인") { }
                    else if (messageArray[2] == "성능") { console.log("성능"); }
                    else if (messageArray[2] == "안전") { }
                    else if (messageArray[2] == "외관") { }
                    else if (messageArray[2] == "내장") { }
                    else if (messageArray[2] == "시트") { }
                    else if (messageArray[2] == "편의") { }
                    else if (messageArray[2] == "멀티미디어") { }

                    else if (messageArray[2] == "선택품목") {
                        session.beginDialog('/korPriceSelectOptionList', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 3.0", trim: "익스클루시브 스페셜" });
                    } else if (messageArray[2] == "파노라마썬루프") {
                        //session.beginDialog('/korPriceSelectOptionItem', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 2.4", trim: "모던", selectOption1: "파노라마 썬루프" });
                        session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 3.0", trim: "익스클루시브 스페셜", carPrice: 38700000, selectOption1: "파노라마 썬루프", optionPrice1: 1100000 });
                    } else if (messageArray[2] == "TUIX컴포트패키지") {
                        session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 3.0", trim: "익스클루시브 스페셜", carPrice: 38700000, selectOption1: "TUIX 컴포트 패키지", optionPrice1: 780000 });
                    } else if (messageArray[2] == "헤드업디스플레이(HUD)") {
                        session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 3.0", trim: "익스클루시브 스페셜", carPrice: 38700000, selectOption1: "헤드업 디스플레이(HUD)", optionPrice1: 1000000 });
                    } else if (messageArray[2] == "현대스마트센스패키지II") {
                        session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 3.0", trim: "익스클루시브 스페셜", carPrice: 38700000, selectOption1: "현대 스마트 센스 패키지II", optionPrice1: 1600000 });
                    } else if (messageArray[2] == "JBL사운드패키지") {
                        session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 3.0", trim: "익스클루시브 스페셜", carPrice: 38700000, selectOption1: "JBL 사운드 패키지", optionPrice1: 1150000 });
                    } else if (messageArray[2] == "프리미어인테리어셀렉션") {
                        session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 3.0", trim: "익스클루시브 스페셜", carPrice: 38700000, selectOption1: "프리미어 인테리어 셀렉션", optionPrice1: 1500000 });
                    }
                    else {
                        // 익스클루시브 스페셜만 나오게 
                        session.beginDialog('/korPriceTrim', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 3.0", trim: "익스클루시브 스페셜" });
                    }
                }
                else {
                    //가솔린 3.0만 나오게
                    session.beginDialog('/korPriceTrim', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 3.0" });
                }

            } else if (messageArray[0] == "가솔린3.3") {

                if (messageArray[1] == "셀러브리티") {

                    if (messageArray[2] == "기본품목") { console.log("기본품목"); }
                    else if (messageArray[2] == "파워트레인") { }
                    else if (messageArray[2] == "성능") { console.log("성능"); }
                    else if (messageArray[2] == "안전") { }
                    else if (messageArray[2] == "외관") { }
                    else if (messageArray[2] == "내장") { }
                    else if (messageArray[2] == "시트") { }
                    else if (messageArray[2] == "편의") { }
                    else if (messageArray[2] == "멀티미디어") { }

                    else if (messageArray[2] == "선택품목") {
                        session.beginDialog('/korPriceSelectOptionList', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 3.3", trim: "셀러브리티" });
                    } else if (messageArray[2] == "파노라마썬루프") {
                        //session.beginDialog('/korPriceSelectOptionItem', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 2.4", trim: "모던", selectOption1: "파노라마 썬루프" });
                        session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 3.3", trim: "셀러브리티", carPrice: 38700000, selectOption1: "파노라마 썬루프", optionPrice1: 1100000 });
                    } else if (messageArray[2] == "TUIX컴포트패키지") {
                        session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 3.3", trim: "셀러브리티", carPrice: 38700000, selectOption1: "TUIX 컴포트 패키지", optionPrice1: 780000 });
                    } else if (messageArray[2] == "헤드업디스플레이(HUD)" || messageArray[2] == "헤드업디스플레이") {
                        session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 3.3", trim: "셀러브리티", carPrice: 38700000, selectOption1: "헤드업 디스플레이(HUD)", optionPrice1: 1000000 });
                    } else if (messageArray[2] == "현대스마트센스패키지II") {
                        session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 3.3", trim: "셀러브리티", carPrice: 38700000, selectOption1: "현대 스마트 센스 패키지II", optionPrice1: 1600000 });
                    }
                    else {
                        // 셀러브리티만 나오게
                        session.beginDialog('/korPriceTrim', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 3.3", trim: "셀러브리티" });
                    }
                } else {
                    //가솔린 3.3만 나오게
                    session.beginDialog('/korPriceTrim', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 3.3" });
                }
            } else if (messageArray[0] == "디젤2.2") {


                if (messageArray[1] == "모던") {

                    if (messageArray[2] == "기본품목") { console.log("기본품목"); }
                    else if (messageArray[2] == "파워트레인") { }
                    else if (messageArray[2] == "성능") { console.log("성능"); }
                    else if (messageArray[2] == "안전") { }
                    else if (messageArray[2] == "외관") { }
                    else if (messageArray[2] == "내장") { }
                    else if (messageArray[2] == "시트") { }
                    else if (messageArray[2] == "편의") { }
                    else if (messageArray[2] == "멀티미디어") { }

                    else if (messageArray[2] == "선택품목") {
                        session.beginDialog('/korPriceSelectOptionList', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "디젤 2.2", trim: "모던" });
                    } else if (messageArray[2] == "파노라마썬루프") {
                        //session.beginDialog('/korPriceSelectOptionItem', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 2.4", trim: "모던", selectOption1: "파노라마 썬루프" });
                        session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "디젤 2.2", trim: "모던", carPrice: 33550000, selectOption1: "파노라마 썬루프", optionPrice1: 1100000 });
                    } else if (messageArray[2] == "TUIX컴포트패키지") {
                        session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "디젤 2.2", trim: "모던", carPrice: 33550000, selectOption1: "TUIX 컴포트 패키지", optionPrice1: 780000 });
                    } else if (messageArray[2] == "앞좌석통풍") {
                        session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "디젤 2.2", trim: "모던", carPrice: 33550000, selectOption1: "앞좌석 통풍 + 하이패스 시스템", optionPrice1: 600000 });
                    } else if (messageArray[2] == "하이패스시스템") {
                        session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "디젤 2.2", trim: "모던", carPrice: 33550000, selectOption1: "앞좌석 통풍 + 하이패스 시스템", optionPrice1: 600000 });
                    } else if (messageArray[2] == "현대스마트센스패키지IV") {
                        session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "디젤 2.2", trim: "모던", carPrice: 33550000, selectOption1: "현대 스마트 센스 패키지IV", optionPrice1: 18000000 });
                    }
                    else {
                        // 디젤 2.2 모던만 나오게
                        session.beginDialog('/korPriceTrim', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "디젤 2.2", trim: "모던" });
                    }
                } else if (messageArray[1] == "프리미엄") {

                    if (messageArray[2] == "기본품목") { console.log("기본품목"); }
                    else if (messageArray[2] == "파워트레인") { }
                    else if (messageArray[2] == "성능") { console.log("성능"); }
                    else if (messageArray[2] == "안전") { }
                    else if (messageArray[2] == "외관") { }
                    else if (messageArray[2] == "내장") { }
                    else if (messageArray[2] == "시트") { }
                    else if (messageArray[2] == "편의") { }
                    else if (messageArray[2] == "멀티미디어") { }

                    else if (messageArray[2] == "선택품목") {
                        session.beginDialog('/korPriceSelectOptionList', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "디젤 2.2", trim: "프리미엄" });
                    } else if (messageArray[2] == "파노라마썬루프") {
                        //session.beginDialog('/korPriceSelectOptionItem', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 2.4", trim: "모던", selectOption1: "파노라마 썬루프" });
                        session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "디젤 2.2", trim: "프리미엄", carPrice: 34750000, selectOption1: "파노라마 썬루프", optionPrice1: 1100000 });
                    } else if (messageArray[2] == "TUIX컴포트패키지") {
                        session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "디젤 2.2", trim: "프리미엄", carPrice: 34750000, selectOption1: "TUIX 컴포트 패키지", optionPrice1: 780000 });
                    } else if (messageArray[2] == "헤드업디스플레이(HUD)") {
                        session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "디젤 2.2", trim: "프리미엄", carPrice: 34750000, selectOption1: "헤드업 디스플레이(HUD)", optionPrice1: 1000000 });
                    } else if (messageArray[2] == "현대스마트센스패키지I") {
                        session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "디젤 2.2", trim: "프리미엄", carPrice: 34750000, selectOption1: "현대 스마트 센스 패키지I", optionPrice1: 1500000 });
                    } else if (messageArray[2] == "익스테리어패키지I") {
                        session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "디젤 2.2", trim: "프리미엄", carPrice: 34750000, selectOption1: "익스테리어 패키지I", optionPrice1: 1500000 });
                    }
                    else {
                        // 디젤 2.2 프리미엄만 나오게
                        session.beginDialog('/korPriceTrim', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "디젤 2.2", trim: "프리미엄" });
                    }
                } else if (messageArray[1] == "프리미엄스페셜") {

                    if (messageArray[2] == "기본품목") { console.log("기본품목"); }
                    else if (messageArray[2] == "파워트레인") { }
                    else if (messageArray[2] == "성능") { console.log("성능"); }
                    else if (messageArray[2] == "안전") { }
                    else if (messageArray[2] == "외관") { }
                    else if (messageArray[2] == "내장") { }
                    else if (messageArray[2] == "시트") { }
                    else if (messageArray[2] == "편의") { }
                    else if (messageArray[2] == "멀티미디어") { }

                    else if (messageArray[2] == "선택품목") {
                        session.beginDialog('/korPriceSelectOptionList', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "디젤 2.2", trim: "프리미엄스페셜" });
                    } else if (messageArray[2] == "파노라마썬루프") {
                        //session.beginDialog('/korPriceSelectOptionItem', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 2.4", trim: "모던", selectOption1: "파노라마 썬루프" });
                        session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "디젤 2.2", trim: "프리미엄스페셜", carPrice: 31750000, selectOption1: "파노라마 썬루프", optionPrice1: 1100000 });
                    } else if (messageArray[2] == "TUIX컴포트패키지") {
                        session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "디젤 2.2", trim: "프리미엄스페셜", carPrice: 31750000, selectOption1: "TUIX 컴포트 패키지", optionPrice1: 780000 });
                    } else if (messageArray[2] == "헤드업디스플레이(HUD)") {
                        session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "디젤 2.2", trim: "프리미엄스페셜", carPrice: 31750000, selectOption1: "헤드업 디스플레이(HUD)", optionPrice1: 1000000 });
                    } else if (messageArray[2] == "현대스마트센스패키지II") {
                        session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "디젤 2.2", trim: "프리미엄스페셜", carPrice: 31750000, selectOption1: "현대 스마트 센스 패키지II", optionPrice1: 1600000 });
                    } else if (messageArray[2] == "익스테리어패키지II") {
                        session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "디젤 2.2", trim: "프리미엄스페셜", carPrice: 31750000, selectOption1: "익스테리어 패키지II", optionPrice1: 1000000 });
                    } else if (messageArray[2] == "JBL사운드패키지") {
                        session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "디젤 2.2", trim: "프리미엄스페셜", carPrice: 31750000, selectOption1: "JBL 사운드 패키지", optionPrice1: 1150000 });
                    } else if (messageArray[2] == "어라운드뷰모니터(AVM)") {
                        session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "디젤 2.2", trim: "프리미엄스페셜", carPrice: 31750000, selectOption1: "어라운드 뷰 모니터(AVM)", optionPrice1: 1200000 });
                    }
                } else if (builder.EntityRecognizer.findEntity(args.entities, '프리미엄 스페셜')) {

                    if (builder.EntityRecognizer.findEntity(args.entities, '기본품목')) { }
                    else if (builder.EntityRecognizer.findEntity(args.entities, '파워트레인')) { }
                    else if (builder.EntityRecognizer.findEntity(args.entities, '성능')) { }
                    else if (builder.EntityRecognizer.findEntity(args.entities, '안전')) { }
                    else if (builder.EntityRecognizer.findEntity(args.entities, '외관')) { }
                    else if (builder.EntityRecognizer.findEntity(args.entities, '내장')) { }
                    else if (builder.EntityRecognizer.findEntity(args.entities, '시트')) { }
                    else if (builder.EntityRecognizer.findEntity(args.entities, '편의')) { }
                    else if (builder.EntityRecognizer.findEntity(args.entities, '멀티미디어')) { }

                    else if (builder.EntityRecognizer.findEntity(args.entities, '선택품목')) { }

                    else {
                        // 디젤 2.2 프리미엄 스페셜만 나오게
                        session.beginDialog('/korPriceTrim', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "디젤 2.2", trim: "프리미엄 스페셜" });
                    }
                } else {
                    // 디젤 2.2만 나오게
                    session.beginDialog('/korPriceTrim', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "디젤 2.2" });
                }
            } else {
                session.beginDialog('/korPriceModel', { sendMsg: session.message.text, key: session.message.sourceEvent.clientActivityId.split(".")[0] + "." + session.message.sourceEvent.clientActivityId.split(".")[1], beginTime: date.getTime(), intent: "korPriceMain", tableNm: "insert_history" });

            }
            session.endDialog();
        }
    ]);
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
            //console.log("message : " + args.sendMsg + "|| begin date : " + date.getTime());
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
                            builder.CardAction.imBack(session, "가격 보여줘", "가격")
                        ])
                ]);
                
                builder.Prompts.choice(session, msg, '시승|디자인|편의사항|가격');
                session.endDialog();
                
                responseTime = parseInt(date.getTime()) - parseInt(args.beginTime);
                query.insertHistoryQuery(args, responseTime, function (err, result) {
                    if (!err) {
                        console.log("query.getData : " + result);
                    }
                });
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


    bot.dialog('/korReMainMenu', [

        function (session, args, next) {

            var msg = new builder.Message(session)
                .attachments([
                    new builder.HeroCard(session)
                        .title("메뉴")
                        .text("다른 메뉴를 원하시면 선택하시거나 질문해주세요!!")
                        //.text(str)
                        .buttons([
                            builder.CardAction.imBack(session, "시승 방법 보여줘", "시승"),
                            builder.CardAction.imBack(session, "디자인 보여줘", "디자인"),
                            builder.CardAction.imBack(session, "편의사항 보여줘", "편의사항"),
                            builder.CardAction.imBack(session, "가격 보여줘", "가격")
                        ])
                ]);
            builder.Prompts.choice(session, msg, "시승|디자인|편의사항|가격 ");
            session.endDialog();
            //session.beginDialog('/korReMainMenu');
            //responseTime = parseInt(date.getTime()) - parseInt(args.beginTime);
            //query.insertHistoryQuery(args, responseTime, function (err, result) {
            //    if (!err) {
            //        console.log("query.getData : " + result);
            //    }
            //});
        }

    ]);


    bot.dialog('/QnA', [

        function (session, args, next) {
            console.log("args : " + args);
            if (args.qnaScore > 80) {
                session.send(args.qnaResponse);
            }
            else {
                session.send("Low Score");

            }
            

        }


    ]);


}   // function create(bot) END




module.exports = {
    create
}