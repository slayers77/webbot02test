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
            
            var aa = query.getData("select_catType", function (err, result) {
                if (!err) {
                    console.log("query.getData : " + result);
                }
            });
            console.log("AA : " + aa);
            
            

            //console.log("sid : " + args.key + " || message : " + args.sendMsg + "|| begin date : " + args.beginTime + " || intent : " + args.intent+ " || "+args.tableNm);
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
            session.beginDialog('/korReMainMenu');
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
                                            .alt(session.localizer.gettext(session.preferredLocale(), "onlineReservationImgAltMessage"))
                                    ])
                                    .buttons([
                                        builder.CardAction.openUrl(session, "http://www.hyundai.com/kr/tdn/index.do", session.localizer.gettext(session.preferredLocale(), "onlineReservationUrlClickMessage")),
                                    ]);
                                session.send(new builder.Message(session).addAttachment(onlineReserveCard));
                                session.send(session.localizer.gettext(session.preferredLocale(), "onlineReservationEndMessage"));
            
            session.endDialog();
            session.beginDialog('/korReMainMenu');

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
                    .title(session.localizer.gettext(session.preferredLocale(), "centerCallReservationTitleName"))
                    .text(session.localizer.gettext(session.preferredLocale(), "centerCallReservationSubTitleMessage"))
                    //.text(str)
                    .buttons([
                
                    builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "seoulClickMessage"), session.localizer.gettext(session.preferredLocale(), "seoul")),
                    builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "busanClickMessage"), session.localizer.gettext(session.preferredLocale(), "busan"))
                ])
            ]);
            builder.Prompts.choice(session, msg, session.localizer.gettext(session.preferredLocale(), "centerCallReservationMenuList"));
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
                
                session.send(session.localizer.gettext(session.preferredLocale(), "seoulCenterCallReservationWelcomeMessage"));
                var msg = new builder.Message(session)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments([
                    new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "seoulCenterCallReservationItem1"))
                        .subtitle(session.localizer.gettext(session.preferredLocale(), "seoulCenterCallReservationItem1SubtitmeMessage"))
                        .images([
                        builder.CardImage.create(session, img_path + "/images/testDrive/seoul/seongnae.png")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/testDrive/seoul/seongnae.png")),
                    ])
                        .buttons([
                        builder.CardAction.openUrl(session, "http://www.hyundai.com/kr/tdn/index.do", session.localizer.gettext(session.preferredLocale(), "CenterCallReservationUrlClickMessage"))
                            //,builder.CardAction.imBack(session, "select:1", "Select")
                    ]),
                    new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "seoulCenterCallReservationItem2"))
                        .subtitle(session.localizer.gettext(session.preferredLocale(), "seoulCenterCallReservationItem2SubtitmeMessage"))
                        .images([
                        builder.CardImage.create(session, img_path + "/images/testDrive/seoul/jamsil.png")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/testDrive/seoul/jamsil.png")),
                    ])
                        .buttons([
                        builder.CardAction.openUrl(session, "http://www.hyundai.com/kr/tdn/index.do", session.localizer.gettext(session.preferredLocale(), "CenterCallReservationUrlClickMessage"))
                            //,builder.CardAction.imBack(session, "select:2", "Select")
                    ]),
                    new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "seoulCenterCallReservationItem3"))
                        .subtitle(session.localizer.gettext(session.preferredLocale(), "seoulCenterCallReservationItem3SubtitmeMessage"))
                        .images([
                        builder.CardImage.create(session, img_path + "/images/testDrive/seoul/gongnung.png")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/testDrive/seoul/gongnung.png"))
                    ])
                        .buttons([
                        builder.CardAction.openUrl(session, "http://www.hyundai.com/kr/tdn/index.do", session.localizer.gettext(session.preferredLocale(), "CenterCallReservationUrlClickMessage"))
                            //,builder.CardAction.imBack(session, "select:3", "Select")
                    ]),
                    new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "seoulCenterCallReservationItem4"))
                        .subtitle(session.localizer.gettext(session.preferredLocale(), "seoulCenterCallReservationItem4SubtitmeMessage"))
                        .images([
                        builder.CardImage.create(session, img_path + "/images/testDrive/seoul/mokdong.png")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/testDrive/seoul/mokdong.png"))
                    ])
                        .buttons([
                        builder.CardAction.openUrl(session, "http://www.hyundai.com/kr/tdn/index.do", session.localizer.gettext(session.preferredLocale(), "CenterCallReservationUrlClickMessage"))
                            //,builder.CardAction.imBack(session, "select:4", "Select")
                    ])
                ]);
            
            } else if (session.message.text.match(/부산/g) ) { 
            
                session.send(session.localizer.gettext(session.preferredLocale(), "busanCenterCallReservationWelcomeMessage"));
                var msg = new builder.Message(session)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments([
                    new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "busanCenterCallReservationItem1"))
                        .subtitle(session.localizer.gettext(session.preferredLocale(), "busanCenterCallReservationItem1SubtitmeMessage"))
                        .images([
                        builder.CardImage.create(session, img_path + "/images/testDrive/busan/busandongbu.png")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/testDrive/busan/busandongbu.png")),
                    ])
                        .buttons([
                        builder.CardAction.openUrl(session, "http://www.hyundai.com/kr/tdn/index.do", session.localizer.gettext(session.preferredLocale(), "CenterCallReservationUrlClickMessage"))
                            //,builder.CardAction.imBack(session, "select:1", "Select")
                    ]),
                    new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "busanCenterCallReservationItem2"))
                        .subtitle(session.localizer.gettext(session.preferredLocale(), "busanCenterCallReservationItem2SubtitmeMessage"))
                        .images([
                        builder.CardImage.create(session, img_path + "/images/testDrive/busan/busanjuang.png")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/testDrive/busan/busanjuang.png")),
                    ])
                        .buttons([
                        builder.CardAction.openUrl(session, "http://www.hyundai.com/kr/tdn/index.do", session.localizer.gettext(session.preferredLocale(), "CenterCallReservationUrlClickMessage"))
                            //,builder.CardAction.imBack(session, "select:2", "Select")
                    ])
                ]);
            }
            session.send(msg);
            session.endDialog();
            session.beginDialog('/korReMainMenu');
            
            responseTime = parseInt(date.getTime()) - parseInt(args.beginTime);
            query.insertHistoryQuery(args, responseTime, function (err, result) {
                if (!err) {
                    console.log("query.getData : " + result);
                }
            });



        }
            
            

            //if (session.message.text.match(/서울/g)) { 
            //    session.send("[ " + session.message.text + " ] 의 시승센터 관련 정보입니다.");
            //    var msg = new builder.Message(session)
            //    .attachmentLayout(builder.AttachmentLayout.carousel)
            //    .attachments([
            //        new builder.HeroCard(session)
            //            .title("성내 시승센터")
            //            .subtitle("전화번호 : 02-473-7365(FAX : 02-2225-4736) 지점주소 : (05381) 서울 강동구 천호대로 1096 현대자동차 성내지점 3층 성내시승센터")
            //            .images([
            //            builder.CardImage.create(session, img_path + "/images/testDrive/seoul/seongnae.png")
            //                    .tap(builder.CardAction.showImage(session, img_path + "/images/testDrive/seoul/seongnae.png")),
            //        ])
            //            .buttons([
            //            builder.CardAction.openUrl(session, "http://www.hyundai.com/kr/tdn/index.do", "시승센터 홈페이지")
            //                //,builder.CardAction.imBack(session, "select:1", "Select")
            //        ]),
            //        new builder.HeroCard(session)
            //            .title("잠실 시승센터")
            //            .subtitle("전화번호 : 02-421-7365(FAX : 02-421-4737) 지점주소 : (05502) 서울 송파구 올림픽로 145 리센츠빌딩 2층 C10호 잠실시승센터")
            //            .images([
            //            builder.CardImage.create(session, img_path + "/images/testDrive/seoul/jamsil.png")
            //                    .tap(builder.CardAction.showImage(session, img_path + "/images/testDrive/seoul/jamsil.png")),
            //        ])
            //            .buttons([
            //            builder.CardAction.openUrl(session, "http://www.hyundai.com/kr/tdn/index.do", "시승센터 홈페이지")
            //                //,builder.CardAction.imBack(session, "select:2", "Select")
            //        ]),
            //        new builder.HeroCard(session)
            //            .title("공릉 시승센터")
            //            .subtitle("전화번호 : 02-973-7365(FAX : 02-3296-6218) 지점주소 : (01861) 서울 노원구 화랑로 429 현대자동차 공릉지점옆 공릉시승센터")
            //            .images([
            //            builder.CardImage.create(session, img_path + "/images/testDrive/seoul/gongnung.png")
            //                    .tap(builder.CardAction.showImage(session, img_path + "/images/testDrive/seoul/gongnung.png"))
            //        ])
            //            .buttons([
            //            builder.CardAction.openUrl(session, "http://www.hyundai.com/kr/tdn/index.do", "시승센터 홈페이지")
            //                //,builder.CardAction.imBack(session, "select:3", "Select")
            //        ]),
            //        new builder.HeroCard(session)
            //            .title("목동 시승센터")
            //            .subtitle("전화번호 : 02-2644-7365(FAX : 02-2644-7359) 지점주소 : (07995) 서울 양천구 목동서로 225 한국예술인협회 2층 목동시승센터")
            //            .images([
            //            builder.CardImage.create(session, img_path + "/images/testDrive/seoul/mokdong.png")
            //                    .tap(builder.CardAction.showImage(session, img_path + "/images/testDrive/seoul/mokdong.png"))
            //        ])
            //            .buttons([
            //            builder.CardAction.openUrl(session, "http://www.hyundai.com/kr/tdn/index.do", "시승센터 홈페이지")
            //                //,builder.CardAction.imBack(session, "select:4", "Select")
            //        ])
            //    ]);

            ////}

            
            
            //session.send(msg);
            //session.endDialog();
            //session.beginDialog('/korReMainMenu');
            
            //responseTime = parseInt(date.getTime()) - parseInt(args.beginTime);
            //query.insertHistoryQuery(args, responseTime, function (err, result) {
            //    if (!err) {
            //        console.log("query.getData : " + result);
            //    }
            //});
        
        //}
    ]);
}

module.exports = {
    create
}