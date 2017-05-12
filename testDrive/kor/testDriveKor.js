var builder = require('botbuilder');
var stringBuilder = require('stringbuilder');
var query = require('../../config/query');
var date = require('date-utils');
var tts = require('../../TTSService');
var audioPath = 'http://taiholabchatbot.azurewebsites.net';
date = new Date();
var data = "";

var query = require('../../config/query');

function create(bot) {
    
    var responseTime;

     bot.dialog('/korTestDriveMain', [                                      //bot.dialog('/korTestDrive start


        

        function (session, args, next) {
            
            var testDriveSubtitleMessage = session.localizer.gettext(session.preferredLocale(), "testDriveSubtitleMessage");
            tts.Synthesize(testDriveSubtitleMessage, 'testDriveSubtitleMessage');;

            var msg = new builder.Message(session)
            .attachments([
            
                new builder.AudioCard(session)
                    .title(session.localizer.gettext(session.preferredLocale(), "testDriveTitleName"))
                    .text(testDriveSubtitleMessage)
                    .autostart(true)
                    .media([
                        { url: audioPath + '/testDriveSubtitleMessage.mp3' }
                    ])
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
                    builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "No"), session.localizer.gettext(session.preferredLocale(), "No"))
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
                    .title(session.localizer.gettext(session.preferredLocale(), "centerCallReservationTitleName"))
                    .text(session.localizer.gettext(session.preferredLocale(), "centerCallReservationSubTitleMessage"))
                    //.text(str)
                    .buttons([
                
                    builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "seoulClickMessage"), session.localizer.gettext(session.preferredLocale(), "seoul")),
                    builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "busanClickMessage"), session.localizer.gettext(session.preferredLocale(), "busan")),
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
            
            
            
            
            if (session.message.text.match(/서울/g) || session.message.text.match(/Seoul/g)) { 
                
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
            
            } else if (session.message.text.match(/부산/g) || session.message.text.match(/Busan/g) ) { 
            
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
            
            

            var msg = new builder.Message(session)
                            .attachments([
            
                new builder.HeroCard(session)
                                    .title("")
                                    .text(session.localizer.gettext(session.preferredLocale(), "induceTestDriveToPrice"))
                                    //.text(str)
                                    .buttons([
                    builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "priceClickMessage"), session.localizer.gettext(session.preferredLocale(), "priceReciptEndYesMessage")), 
                    builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "No"), session.localizer.gettext(session.preferredLocale(), "No"))
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