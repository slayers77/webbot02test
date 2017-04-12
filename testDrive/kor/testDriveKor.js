var builder = require('botbuilder');
var stringBuilder = require('stringbuilder');
var query = require('../../config/query');
var date = require('date-utils');
date = new Date();
var data = "";

function create(bot) {
    
    var responseTime;
    
    
    

     bot.dialog('/korTestDriveMain', [                                      //bot.dialog('/korTestDrive start


        

        function (session, args, next) {
            
            var msg = new builder.Message(session)
            .attachments([
            
                new builder.HeroCard(session)
                    .title(session.localizer.gettext(session.preferredLocale(), "testDriveTitleName"))
                    .text(session.localizer.gettext(session.preferredLocale(), "testDriveSubtitleMessage"))
                    //.text(str)
                    .buttons([
                
                    builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "onlineReservationClickMessage"), session.localizer.gettext(session.preferredLocale(), "onlineReservationMessage")),
                    builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "centerCallReservationClickMessage"), session.localizer.gettext(session.preferredLocale(), "centerCallReservationMessage"))
                ])
            ]);
            builder.Prompts.choice(session, msg, session.localizer.gettext(session.preferredLocale(), "testDriveMenuList"));
            
            session.endDialog();
            responseTime = parseInt(date.getTime()) - parseInt(args.beginTime);
            query.insertHistoryQuery(args, responseTime, function (err, result) {
                if (!err) {
                    console.log("query.getData : " + result);
                }
            });
        }
    ]);
    
    
    bot.dialog('/korOnlineTestDrive' , [
    
        function (session, args, next) { 
            console.log("sid : " + args.key +" || message : "+ args.sendMsg +"|| begin date : " + args.beginTime + " || intent : "+args.intent);
            //session.send("korOnlineTestDrive session key : " + session.message.sourceEvent.clientActivityId);
            //query.getData(args);
            session.send(session.localizer.gettext(session.preferredLocale(), "onlineReservationWelcomeMessage"));
            
                                var onlineReserveCard = new builder.HeroCard(session)
                                    .title(session.localizer.gettext(session.preferredLocale(), "onlineReservationTitleName"))
                                    .subtitle(session.localizer.gettext(session.preferredLocale(), "onlineReservationSubtitleMessage"))
                                    .images([
                                        new builder.CardImage(session)
                                            .url(img_path + "/images/testDrive/testDriveReservation.jpg")
                                            .alt('contoso_flowers')
                                    ])
                                    .buttons([
                                        builder.CardAction.openUrl(session, "http://www.hyundai.com/kr/tdn/index.do", session.localizer.gettext(session.preferredLocale(), "onlineReservationUrlClickMessage")),
                                    ]);
                                session.send(new builder.Message(session).addAttachment(onlineReserveCard));
                                session.send(session.localizer.gettext(session.preferredLocale(), "onlineReservationEndMessage"));
            
            

            var msg = new builder.Message(session)
                            .attachments([
            
                new builder.HeroCard(session)
                                    .title("")
                                    .text(session.localizer.gettext(session.preferredLocale(), "induceTestDriveToPrice"))
                                    //.text(str)
                                    .buttons([
                    builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "priceClickMessage"), session.localizer.gettext(session.preferredLocale(), "priceReciptEndYesMessage")), 
                    builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "returnMainMenu"), session.localizer.gettext(session.preferredLocale(), "priceReciptEndNoMessage"))
                ])
            ]);
            builder.Prompts.choice(session, msg, session.localizer.gettext(session.preferredLocale(), "YesOrNo"));
            session.endDialog();
            responseTime = parseInt(date.getTime()) - parseInt(args.beginTime);
            query.insertHistoryQuery(args, responseTime, function (err, result) {
                if (!err) {
                    console.log("query.getData : " + result);
                }
            });
        }
    ]);

    /***********************************************************************************
        한국어 시승 - 시승센터 전화 예약 메뉴
    ************************************************************************************/

    bot.dialog('/korNoAreaOfflineTestDrive', [

        function (session, args, next) {
            console.log("sid : " + args.key + " || message : " + args.sendMsg + "|| begin date : " + args.beginTime + " || intent : " + args.intent);
            //session.send(session.message.text);
            var msg = new builder.Message(session)
            .attachments([
            
                new builder.HeroCard(session)
                    .title("시승센터")
                    .text("시승센터를 찾기위하여 원하시는 지역을 선택해주세요..")
                    //.text(str)
                    .buttons([
                
                    builder.CardAction.imBack(session, "서울 시승센터 찾아줘", "서울"),
                    builder.CardAction.imBack(session, "부산 시승센터 찾아줘", "부산")
                ])
            ]);
            builder.Prompts.choice(session, msg, "서울|부산");
            session.endDialog();

            responseTime = parseInt(date.getTime()) - parseInt(args.beginTime);
            query.insertHistoryQuery(args, responseTime, function (err, result) {
                if (!err) {
                    console.log("query.getData : " + result);
                }
            });
        }
    ]);
    
    bot.dialog('/korAreaOfflineTestDrive', [
    
        function (session , args, next) {
            
            console.log("sid : " + args.key + " || message : " + args.sendMsg + "|| begin date : " + args.beginTime + " || intent : " + args.intent);
            
            
            
            
            if (session.message.text.match(/서울/g) ) { 
                
                session.send("[ 서울 ] 의 시승센터 관련 정보입니다.");
                var msg = new builder.Message(session)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments([
                    new builder.HeroCard(session)
                        .title("성내 시승센터")
                        .subtitle("전화번호 : 02-473-7365(FAX : 02-2225-4736) 센터주소 : (05381) 서울 강동구 천호대로 1096 현대자동차 성내지점 3층 성내시승센터")
                        .images([
                        builder.CardImage.create(session, img_path + "/images/testDrive/seoul/seongnae.png")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/testDrive/seoul/seongnae.png")),
                    ])
                        .buttons([
                        builder.CardAction.openUrl(session, "http://www.hyundai.com/kr/tdn/index.do", "시승센터 홈페이지")
                            //,builder.CardAction.imBack(session, "select:1", "Select")
                    ]),
                    new builder.HeroCard(session)
                        .title("잠실 시승센터")
                        .subtitle("전화번호 : 02-421-7365(FAX : 02-421-4737) 센터주소 : (05502) 서울 송파구 올림픽로 145 리센츠빌딩 2층 C10호 잠실시승센터")
                        .images([
                        builder.CardImage.create(session, img_path + "/images/testDrive/seoul/jamsil.png")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/testDrive/seoul/jamsil.png")),
                    ])
                        .buttons([
                        builder.CardAction.openUrl(session, "http://www.hyundai.com/kr/tdn/index.do", "시승센터 홈페이지")
                            //,builder.CardAction.imBack(session, "select:2", "Select")
                    ]),
                    new builder.HeroCard(session)
                        .title("공릉 시승센터")
                        .subtitle("전화번호 : 02-973-7365(FAX : 02-3296-6218) 센터주소 : (01861) 서울 노원구 화랑로 429 현대자동차 공릉지점옆 공릉시승센터")
                        .images([
                        builder.CardImage.create(session, img_path + "/images/testDrive/seoul/gongnung.png")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/testDrive/seoul/gongnung.png"))
                    ])
                        .buttons([
                        builder.CardAction.openUrl(session, "http://www.hyundai.com/kr/tdn/index.do", "시승센터 홈페이지")
                            //,builder.CardAction.imBack(session, "select:3", "Select")
                    ]),
                    new builder.HeroCard(session)
                        .title("목동 시승센터")
                        .subtitle("전화번호 : 02-2644-7365(FAX : 02-2644-7359) 센터주소 : (07995) 서울 양천구 목동서로 225 한국예술인협회 2층 목동시승센터")
                        .images([
                        builder.CardImage.create(session, img_path + "/images/testDrive/seoul/mokdong.png")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/testDrive/seoul/mokdong.png"))
                    ])
                        .buttons([
                        builder.CardAction.openUrl(session, "http://www.hyundai.com/kr/tdn/index.do", "시승센터 홈페이지")
                            //,builder.CardAction.imBack(session, "select:4", "Select")
                    ])
                ]);
            
            } else if (session.message.text.match(/부산/g) ) { 
            
                session.send("[ 부산 ] 의 시승센터 관련 정보입니다.");
                var msg = new builder.Message(session)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments([
                    new builder.HeroCard(session)
                        .title("부산중앙 시승센터")
                        .subtitle("전화번호 051-465-7365 (FAX:051-465-7350) 센터주소 (48728) 부산 동구 중앙대로 360 협성타워빌딩 1층 101호 현대자동차 부산중앙시승센터")
                        .images([
                        builder.CardImage.create(session, img_path + "/images/testDrive/busan/busandongbu.png")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/testDrive/busan/busandongbu.png")),
                    ])
                        .buttons([
                        builder.CardAction.openUrl(session, "http://www.hyundai.com/kr/tdn/index.do", "시승센터 홈페이지")
                            //,builder.CardAction.imBack(session, "select:1", "Select")
                    ]),
                    new builder.HeroCard(session)
                        .title("부산동부 시승센터")
                        .subtitle("전화번호 051-517-7365 (FAX:051-517-7363) 센터주소 (46233) 부산 금정구 중앙대로 1883 현대자동차 금정지점 1층 부산동부시승센터")
                        .images([
                        builder.CardImage.create(session, img_path + "/images/testDrive/busan/busanjuang.png")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/testDrive/busan/busanjuang.png")),
                    ])
                        .buttons([
                        builder.CardAction.openUrl(session, "http://www.hyundai.com/kr/tdn/index.do", "시승센터 홈페이지")
                            //,builder.CardAction.imBack(session, "select:2", "Select")
                    ])
                ]);
            }
            session.send(msg);
            
            

            var msg = new builder.Message(session)
                            .attachments([
            
                new builder.HeroCard(session)
                                    .title("")
                                    .text(session.localizer.gettext(session.preferredLocale(), "induceTestDriveToPrice"))
                                    //.text(str)
                                    .buttons([
                    builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "priceClickMessage"), session.localizer.gettext(session.preferredLocale(), "priceReciptEndYesMessage")), 
                    builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "returnMainMenu"), session.localizer.gettext(session.preferredLocale(), "priceReciptEndNoMessage"))
                ])
            ]);
            builder.Prompts.choice(session, msg, session.localizer.gettext(session.preferredLocale(), "YesOrNo"));
            
            session.endDialog();
            responseTime = parseInt(date.getTime()) - parseInt(args.beginTime);
            query.insertHistoryQuery(args, responseTime, function (err, result) {
                if (!err) {
                    console.log("query.getData : " + result);
                }
            });
        }
    ]);
}

module.exports = {
    create
}