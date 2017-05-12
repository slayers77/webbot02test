var builder = require('botbuilder');
var query = require('../../config/query');
var date = require('date-utils');
var tts = require('../../TTSService');
var audioPath = 'http://taiholabchatbot.azurewebsites.net';

function introMsg(session, msg) {
    var text = session.localizer.gettext(session.preferredLocale(), msg);
    tts.Synthesize(text, msg);
    var audioMsg = new builder.Message(session);
    audioMsg.attachmentLayout(builder.AttachmentLayout.carousel);
    audioMsg.attachments([
        new builder.AudioCard(session)
            .text(text)
            .autostart(true)
            .media([
            { url: audioPath + '/' + msg + '.mp3' }
        ])
    ]);
    session.send(audioMsg);
}

function colorMsg(session, msg, fileName) {
    tts.Synthesize(msg, fileName);
    var audioMsg = new builder.Message(session);
    audioMsg.attachmentLayout(builder.AttachmentLayout.carousel);
    audioMsg.attachments([
        new builder.AudioCard(session)
            .text(msg)
            .autostart(true)
            .media([
            { url: audioPath + '/' + fileName + '.mp3' }
        ])
    ]);
    session.send(audioMsg);
}

date = new Date();
var query = require('../../config/query');
function create(bot) {
    
    var responseTime;

    /***********************************************************************************
    1. 한국어 디자인 초기 메뉴
    ************************************************************************************/
    bot.dialog('/korDesignMain', [

        function (session, args) {
            
            //session.send(session.localizer.gettext(session.preferredLocale(), "designMainMessage")); 
            introMsg(session, "designMainMessage");

            var msg = new builder.Message(session)
                .textFormat(builder.TextFormat.xml)
                //.attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments([
                    //AnimationCard
                    new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "designTitleName"))
                        .subtitle(session.localizer.gettext(session.preferredLocale(), "designSubtitleMessage"))
                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/20170302091059771443.jpg")
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "colorClickMessage"), session.localizer.gettext(session.preferredLocale(), "color")),
                            builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "interiorClickMessage"), session.localizer.gettext(session.preferredLocale(), "interior")),
                            builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "exteriorClickMessage"), session.localizer.gettext(session.preferredLocale(), "exterior"))
                        ])
                        //.buttons([
                        //    builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "colorClickMessage"), session.localizer.gettext(session.preferredLocale(), "color")),
                        //    builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "interiorClickMessage"), session.localizer.gettext(session.preferredLocale(), "interior")),
                        //    builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "exteriorClickMessage"), session.localizer.gettext(session.preferredLocale(), "exterior"))
                        //])
            ]);
            
            //session.send(msg);

            //var msg1 = new builder.Message(session)
            //    .textFormat(builder.TextFormat.xml)
            //    //.attachmentLayout(builder.AttachmentLayout.carousel)
            //    .attachments([
            //        //AnimationCard
            //    new builder.HeroCard(session)
            //    //        .title(session.localizer.gettext(session.preferredLocale(), "designTitleName"))
            //    //        .subtitle(session.localizer.gettext(session.preferredLocale(), "designSubtitleMessage"))
            //    //        .images([
            //    //    builder.CardImage.create(session, img_path + "/images/carDesign/20170302091059771443.jpg")
            //    //])
            //            .buttons([
            //        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "colorClickMessage"), session.localizer.gettext(session.preferredLocale(), "color")),
            //        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "interiorClickMessage"), session.localizer.gettext(session.preferredLocale(), "interior")),
            //        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "exteriorClickMessage"), session.localizer.gettext(session.preferredLocale(), "exterior"))
            //    ])
            //]);

            builder.Prompts.choice(session, msg, session.localizer.gettext(session.preferredLocale(), "designMenuList")); 
            session.endDialog();
            responseTime = parseInt(date.getTime()) - parseInt(args.beginTime);
            query.insertHistoryQuery(args, responseTime, function (err, result) {
                if (!err) {
                    console.log("query.getData : " + result);
                }
            });
        }
    ]);


    //색상 선택
    bot.dialog('/korDesignColorList', [

        function (session, args) {
            //session.send(session.localizer.gettext(session.preferredLocale(), "colorSelectWelcomeMessage")); 
            introMsg(session, "colorSelectWelcomeMessage");
            var msg = new builder.Message(session)
                .textFormat(builder.TextFormat.xml)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments([
                    //AnimationCard
                    new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "whiteCream"))

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/WC9/00060.jpg")
                                .alt(session.localizer.gettext(session.preferredLocale(), "whiteCream"))
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/WC9/00060.jpg"))
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "whiteCreamCilckMessage"), session.localizer.gettext(session.preferredLocale(), "colorSelect"))
                        ]),
                    new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "IonSilver"))
                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/N9V/00060.jpg")
                                .alt(session.localizer.gettext(session.preferredLocale(), "IonSilver"))
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/N9V/00060.jpg"))
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "IonSilverCilckMessage"), session.localizer.gettext(session.preferredLocale(), "colorSelect"))
                        ]),
                    new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "LunaGray"))
                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/U9G/00060.jpg")
                                .alt(session.localizer.gettext(session.preferredLocale(), "LunaGray"))
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/U9G/00060.jpg"))
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "LunaGrayCilckMessage"), session.localizer.gettext(session.preferredLocale(), "colorSelect"))
                        ]),
                    new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "PanteraGray"))
                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/PG9/00060.jpg")
                                .alt(session.localizer.gettext(session.preferredLocale(), "PanteraGray"))
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/PG9/00060.jpg"))
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "PanteraGrayCilckMessage"), session.localizer.gettext(session.preferredLocale(), "colorSelect"))

                        ]),
                    new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "MidnightBlack"))
                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/NB9/00060.jpg")
                                .alt(session.localizer.gettext(session.preferredLocale(), "MidnightBlack"))
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/NB9/00060.jpg"))
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "MidnightBlackCilckMessage"), session.localizer.gettext(session.preferredLocale(), "colorSelect"))
                        ]),
                    new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "ValentineRed"))
                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/V9R/00060.jpg")
                                .alt(session.localizer.gettext(session.preferredLocale(), "ValentineRed"))
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/V9R/00060.jpg"))
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "ValentineRedCilckMessage"), session.localizer.gettext(session.preferredLocale(), "colorSelect"))
                        ]),
                    new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "GrandBlue"))
                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/NU9/00060.jpg")
                                .alt(session.localizer.gettext(session.preferredLocale(), "GrandBlue"))
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/NU9/00060.jpg"))
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "GrandBlueCilckMessage"), session.localizer.gettext(session.preferredLocale(), "colorSelect"))
                        ]),
                    new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "ShadeBronze"))
                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/S9C/00060.jpg")
                                .alt(session.localizer.gettext(session.preferredLocale(), "ShadeBronze"))
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/S9C/00060.jpg"))
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "ShadeBronzeCilckMessage"), session.localizer.gettext(session.preferredLocale(), "colorSelect"))
                        ]),
                    new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "KakiMetal")) 
                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/TK9/00060.jpg")
                                .alt(session.localizer.gettext(session.preferredLocale(), "KakiMetal"))
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/TK9/00060.jpg"))
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "KakiMetalCilckMessage"), session.localizer.gettext(session.preferredLocale(), "colorSelect"))
                        ])
                ]);

            builder.Prompts.choice(session, msg, session.localizer.gettext(session.preferredLocale(), "colorMenuList"));
            session.endDialog();
           
            responseTime = parseInt(date.getTime()) - parseInt(args.beginTime);
            query.insertHistoryQuery(args, responseTime, function (err, result) {
                if (!err) {
                    console.log("query.getData : " + result);
                }
            });
        }
    ]);

    // 차 외관 선택
    bot.dialog('/korDesignExteriorSimple', [

        function (session, args) {
            
            //session.send(session.localizer.gettext(session.preferredLocale(), "exteriorMainMessage")); 
            introMsg(session, "exteriorMainMessage");

            var msg = new builder.Message(session)
                .textFormat(builder.TextFormat.xml)
                .attachments([
                    new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "exteriorTitleName"))
                        .subtitle(session.localizer.gettext(session.preferredLocale(), "exteriorSubtitleMessage"))
                        .text(session.localizer.gettext(session.preferredLocale(), "exteriorTextMessage"))
                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/car_outside_title.jpg")
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "exteriorDetailClickMessage"), session.localizer.gettext(session.preferredLocale(), "exteriorDetail"))
                        ])
            ]);
            
            //session.send(msg);

            //var msg1 = new builder.Message(session)
            //    .textFormat(builder.TextFormat.xml)
            //    .attachments([
            //    new builder.HeroCard(session)
            //    .buttons([
            //         builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "exteriorDetailClickMessage"), session.localizer.gettext(session.preferredLocale(), "exteriorDetail"))
            //    ])
            //]);
           
            builder.Prompts.choice(session, msg, session.localizer.gettext(session.preferredLocale(), "exteriorMenuList"));
            session.endDialog();
            
            responseTime = parseInt(date.getTime()) - parseInt(args.beginTime);
            query.insertHistoryQuery(args, responseTime, function (err, result) {
                if (!err) {
                    console.log("query.getData : " + result);
                }
            });
           
        }
    ]);
    
    
    bot.dialog('/korDesignExteriorDetail', [
    
        function (session, args, results) {
            
            //session.send(session.localizer.gettext(session.preferredLocale(), "exteriorDetailMessage")); 
            introMsg(session, "exteriorDetailMessage");

            //if (results.response.entity == "외관상세") {
                var msg1 = new builder.Message(session)
                    .textFormat(builder.TextFormat.xml)
                    .attachmentLayout(builder.AttachmentLayout.carousel)
                    //.title("그랜저의 외관입니다.")
                    .attachments([
                    new builder.HeroCard(session)
                            .title(session.localizer.gettext(session.preferredLocale(), "exteriorDetailItem1"))
                            .images([
                        builder.CardImage.create(session, img_path + "/images/carDesign/20161122093146198083.jpg")
                                    .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/20161122093146198083.jpg"))
                    ]),
                    new builder.HeroCard(session)
                            .title(session.localizer.gettext(session.preferredLocale(), "exteriorDetailItem2"))
                            .images([
                        builder.CardImage.create(session, img_path + "/images/carDesign/20161122093251750084.jpg")
                                    .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/20161122093251750084.jpg"))
                    ]),
                    new builder.HeroCard(session)
                            .title(session.localizer.gettext(session.preferredLocale(), "exteriorDetailItem3"))
                            .images([
                        builder.CardImage.create(session, img_path + "/images/carDesign/20161122093309923085.jpg")
                                    .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/20161122093309923085.jpg"))
                    ]),
                    new builder.HeroCard(session)
                            .title(session.localizer.gettext(session.preferredLocale(), "exteriorDetailItem4"))
                            .images([
                        builder.CardImage.create(session, img_path + "/images/carDesign/20161122093331472086.jpg")
                                    .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/20161122093331472086.jpg"))
                    ])
                ]);
                
            session.send(msg1);
           
            responseTime = parseInt(date.getTime()) - parseInt(args.beginTime);
            query.insertHistoryQuery(args, responseTime, function (err, result) {
                if (!err) {
                    console.log("query.getData : " + result);
                }
            });
           
            var msg = new builder.Message(session)
                    .attachments([
            
                new builder.HeroCard(session)
                            .title("")
                            .text(session.localizer.gettext(session.preferredLocale(), "induceExteriorDesignToConvenience"))
                            .buttons([
                                builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "convenienceClickMessage"), session.localizer.gettext(session.preferredLocale(), "Yes")), 
                                builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "No"), session.localizer.gettext(session.preferredLocale(), "No"))
                            ])
            ]);
            
            //session.send(msg);
            //var msg1 = new builder.Message(session)
            //        .attachments([
            
            //    new builder.HeroCard(session)
            //                .buttons([
            //        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "convenienceClickMessage"), session.localizer.gettext(session.preferredLocale(), "Yes")), 
            //        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "No"), session.localizer.gettext(session.preferredLocale(), "No"))
            //    ])
            //]);

            builder.Prompts.choice(session, msg, session.localizer.gettext(session.preferredLocale(), "YesOrNo"));
            session.endDialog();
        }
        //, function (session, results) { 
        
        //    console.log("AAAA : " + session.message.text);
        //    session.endDialog();
        //}

    ]);



    // 차 내관 선택
    bot.dialog('/korDesignInteriorSimple', [

        function (session, args) {
            
            //session.send(session.localizer.gettext(session.preferredLocale(), "interiorMainMessage")); 
            introMsg(session, "interiorMainMessage");

            var msg = new builder.Message(session)
                .textFormat(builder.TextFormat.xml)
                .attachments([
                new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "interiorTitleName"))
                        .subtitle(session.localizer.gettext(session.preferredLocale(), "interiorSubtitleMessage"))
                        .text(session.localizer.gettext(session.preferredLocale(), "interiorTextMessage"))
                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/car_inside_title.jpg")
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "interiorDetailClickMessage"), session.localizer.gettext(session.preferredLocale(), "interiorDetail"))
                        ])
            ]);
            
            //session.send(msg);            
            
            //var msg1 = new builder.Message(session)
            //    .textFormat(builder.TextFormat.xml)
            //    .attachments([
            //    new builder.HeroCard(session)
            //            .buttons([
            //        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "interiorDetailClickMessage"), session.localizer.gettext(session.preferredLocale(), "interiorDetail"))
            //    ])
            //]);
            
            builder.Prompts.choice(session, msg, session.localizer.gettext(session.preferredLocale(), "interiorMenuList"));
            session.endDialog();
            
            responseTime = parseInt(date.getTime()) - parseInt(args.beginTime);
            query.insertHistoryQuery(args, responseTime, function (err, result) {
                if (!err) {
                    console.log("query.getData : " + result);
                }
            });
        }
    ]);
        
        
    bot.dialog('/korDesignInteriorDetail', [
    
        function (session, args, results) {
            
            //session.send(session.localizer.gettext(session.preferredLocale(), "interiorDetailMessage")); 
            introMsg(session, "interiorDetailMessage");

            //if (results.response.entity == "내관상세") {
                var msg1 = new builder.Message(session)
                    .textFormat(builder.TextFormat.xml)
                    .attachmentLayout(builder.AttachmentLayout.carousel)
                    .attachments([
                        //AnimationCard
                    new builder.HeroCard(session)
                            .title(session.localizer.gettext(session.preferredLocale(), "interiorDetailItem1"))
                            .images([
                        builder.CardImage.create(session, img_path + "/images/carDesign/car_inside_detail_front.jpg")
                                    .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/car_inside_detail_front.jpg"))
                    ]),
                    new builder.HeroCard(session)
                            .title(session.localizer.gettext(session.preferredLocale(), "interiorDetailItem2"))
                            .images([
                        builder.CardImage.create(session, img_path + "/images/carDesign/car_inside_detail_back.jpg")
                                    .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/car_inside_detail_back.jpg"))
                    ]),
                ]);
                
            session.send(msg1);
            
            responseTime = parseInt(date.getTime()) - parseInt(args.beginTime);
            query.insertHistoryQuery(args, responseTime, function (err, result) {
                if (!err) {
                    console.log("query.getData : " + result);
                }
            });

            var msg = new builder.Message(session)
                            .attachments([
            
                new builder.HeroCard(session)
                    .title("")
                    .text(session.localizer.gettext(session.preferredLocale(), "induceInteriorDesignToConvenience"))
                    .buttons([
                        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "convenienceClickMessage"), session.localizer.gettext(session.preferredLocale(), "Yes")), 
                        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "No"), session.localizer.gettext(session.preferredLocale(), "No"))
                    ])
                ]);
            
            //session.send(msg);
            //var msg1 = new builder.Message(session)
            //        .attachments([
            
            //    new builder.HeroCard(session)
            //                .buttons([
            //        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "convenienceClickMessage"), session.localizer.gettext(session.preferredLocale(), "Yes")), 
            //        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "No"), session.localizer.gettext(session.preferredLocale(), "No"))
            //    ])
            //]);
            
            builder.Prompts.choice(session, msg, session.localizer.gettext(session.preferredLocale(), "YesOrNo"));
            session.endDialog();
        }
    ]);
     


    /***********************************************************************************
    1. 한국어 디자인 - 색상 세부 목록
    ************************************************************************************/


    //화이트 크림 색상
    bot.dialog('/korDesignSelectWhiteCream', [
        function (session, args) {
            
            //session.send("화이트 크림 색상의 정면 | 좌측면 | 우측면 | 후면 모습입니다.");
            //session.send(session.localizer.gettext(session.preferredLocale(), "whiteCream")+" "+ session.localizer.gettext(session.preferredLocale(), "selectedColorMessage"));
            var whiteCream = session.localizer.gettext(session.preferredLocale(), "whiteCream") + " " + session.localizer.gettext(session.preferredLocale(), "selectedColorMessage");
            colorMsg(session, whiteCream, "whiteCream");

            var msg = new builder.Message(session)
                .textFormat(builder.TextFormat.xml)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                //.title("화이트크림")
                .attachments([
                    //AnimationCard
                new builder.HeroCard(session)

                        .title(session.localizer.gettext(session.preferredLocale(), "colorDetailFront"))
                        .images([
                    builder.CardImage.create(session, img_path + "/images/carDesign/WC9/00055.jpg")
                                .alt(session.localizer.gettext(session.preferredLocale(), "whiteCream"))
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/WC9/00055.jpg"))
                ]),
                new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "colorDetailRight"))
                        .images([
                    builder.CardImage.create(session, img_path + "/images/carDesign/WC9/00046.jpg")
                                .alt(session.localizer.gettext(session.preferredLocale(), "whiteCream"))
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/WC9/00046.jpg"))
                ]),
                new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "colorDetailLeft"))
                        .images([
                    builder.CardImage.create(session, img_path + "/images/carDesign/WC9/00014.jpg")
                                .alt(session.localizer.gettext(session.preferredLocale(), "whiteCream"))
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/WC9/00014.jpg"))
                ]),
                new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "colorDetailRear"))
                        .images([
                    builder.CardImage.create(session, img_path + "/images/carDesign/WC9/00021.jpg")
                                .alt(session.localizer.gettext(session.preferredLocale(), "whiteCream"))
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/WC9/00021.jpg"))
                ])
            ]);
            session.send(msg);
            
            responseTime = parseInt(date.getTime()) - parseInt(args.beginTime);
            query.insertHistoryQuery(args, responseTime, function (err, result) {
                if (!err) {
                    console.log("query.getData : " + result);
                }
            });

            var msg = new builder.Message(session)
                            .attachments([
            
                new builder.HeroCard(session)
                .title("")
                .text(session.localizer.gettext(session.preferredLocale(), "induceColorDesignToConvenience"))
                .buttons([
                    builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "convenienceClickMessage"), session.localizer.gettext(session.preferredLocale(), "Yes")), 
                    builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "No"), session.localizer.gettext(session.preferredLocale(), "No"))
                ])
            ]);
            
            //session.send(msg);
            //var msg1 = new builder.Message(session)
            //        .attachments([
            
            //    new builder.HeroCard(session)
            //                .buttons([
            //        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "convenienceClickMessage"), session.localizer.gettext(session.preferredLocale(), "Yes")), 
            //        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "No"), session.localizer.gettext(session.preferredLocale(), "No"))
            //    ])
            //]);
            
            builder.Prompts.choice(session, msg, session.localizer.gettext(session.preferredLocale(), "YesOrNo"));
            session.endDialog();

        }

        
    ]);
    

    //이온 실버 색상
    bot.dialog('/korDesignSelectIonSilver', [
        function (session, args) {
            
            //session.send(session.localizer.gettext(session.preferredLocale(), "IonSilver") + " " + session.localizer.gettext(session.preferredLocale(), "selectedColorMessage"));
            var IonSilver = session.localizer.gettext(session.preferredLocale(), "IonSilver") + " " + session.localizer.gettext(session.preferredLocale(), "selectedColorMessage");
            colorMsg(session, IonSilver, "IonSilver");

            var msg = new builder.Message(session)
                .textFormat(builder.TextFormat.xml)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments([
                    //AnimationCard
                new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "colorDetailFront"))

                        .images([
                    builder.CardImage.create(session, img_path + "/images/carDesign/N9V/00055.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/N9V/00055.jpg"))
                                .alt(session.localizer.gettext(session.preferredLocale(), "IonSilver"))
                ]),
                new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "colorDetailRight"))
                        .images([
                    builder.CardImage.create(session, img_path + "/images/carDesign/N9V/00046.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/N9V/00046.jpg"))
                                .alt(session.localizer.gettext(session.preferredLocale(), "IonSilver"))
                ]),
                new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "colorDetailLeft"))

                        .images([
                    builder.CardImage.create(session, img_path + "/images/carDesign/N9V/00014.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/N9V/00014.jpg"))
                                .alt(session.localizer.gettext(session.preferredLocale(), "IonSilver"))
                ]),
                new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "colorDetailRear"))

                        .images([
                    builder.CardImage.create(session, img_path + "/images/carDesign/N9V/00021.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/N9V/00021.jpg"))
                                .alt(session.localizer.gettext(session.preferredLocale(), "IonSilver"))
                ])
            ]);
            session.send(msg);
            
            responseTime = parseInt(date.getTime()) - parseInt(args.beginTime);
            query.insertHistoryQuery(args, responseTime, function (err, result) {
                if (!err) {
                    console.log("query.getData : " + result);
                }
            });

        //    session.beginDialog('/korReMainMenu');
        //    session.endDialog();
            
        //    responseTime = parseInt(date.getTime()) - parseInt(args.beginTime);
        //    query.insertHistoryQuery(args, responseTime, function (err, result) {
        //        if (!err) {
        //            console.log("query.getData : " + result);
        //        }
        //    });
        //    //builder.Prompts.choice(session, "그랜저의 다른 색상을 보시겠습니까?", '예|아니오', { listStyle: builder.ListStyle.button });
        //}
            var msg = new builder.Message(session)
                            .attachments([
            
                new builder.HeroCard(session)
                .title("")
                .text(session.localizer.gettext(session.preferredLocale(), "induceColorDesignToConvenience"))
                .buttons([
                    builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "convenienceClickMessage"), session.localizer.gettext(session.preferredLocale(), "Yes")), 
                    builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "No"), session.localizer.gettext(session.preferredLocale(), "No"))
                ])
            ]);
            builder.Prompts.choice(session, msg, session.localizer.gettext(session.preferredLocale(), "YesOrNo"));
            session.endDialog();

        }
    ]);

    //루나 그레이 색상
    bot.dialog('/korDesignSelectLunaGray', [
        function (session, args) {
            
            //session.send(session.localizer.gettext(session.preferredLocale(), "LunaGray") + " " + session.localizer.gettext(session.preferredLocale(), "selectedColorMessage"));
            var LunaGray = session.localizer.gettext(session.preferredLocale(), "LunaGray") + " " + session.localizer.gettext(session.preferredLocale(), "selectedColorMessage");
            colorMsg(session, LunaGray, "LunaGray");

            var msg = new builder.Message(session)
                .textFormat(builder.TextFormat.xml)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments([
                    //AnimationCard
                    new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "colorDetailFront"))

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/U9G/00055.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/U9G/00055.jpg"))
                                .alt(session.localizer.gettext(session.preferredLocale(), "LunaGray"))
                        ]),
                    new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "colorDetailRight"))

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/U9G/00046.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/U9G/00046.jpg"))
                                .alt(session.localizer.gettext(session.preferredLocale(), "LunaGray"))
                        ]),
                    new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "colorDetailLeft"))

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/U9G/00014.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/U9G/00014.jpg"))
                                .alt(session.localizer.gettext(session.preferredLocale(), "LunaGray"))
                        ]),
                    new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "colorDetailRear"))
                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/U9G/00021.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/U9G/00021.jpg"))
                                .alt(session.localizer.gettext(session.preferredLocale(), "LunaGray"))
                        ])
                ]);
            session.send(msg);
            
            responseTime = parseInt(date.getTime()) - parseInt(args.beginTime);
            query.insertHistoryQuery(args, responseTime, function (err, result) {
                if (!err) {
                    console.log("query.getData : " + result);
                }
            });

            var msg = new builder.Message(session)
                            .attachments([
            
                new builder.HeroCard(session)
                    .title("")
                    .text(session.localizer.gettext(session.preferredLocale(), "induceColorDesignToConvenience"))
                    .buttons([
                        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "convenienceClickMessage"), session.localizer.gettext(session.preferredLocale(), "Yes")), 
                        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "No"), session.localizer.gettext(session.preferredLocale(), "No"))
                    ])
            ]);
            builder.Prompts.choice(session, msg, session.localizer.gettext(session.preferredLocale(), "YesOrNo"));
            session.endDialog();

        }
    ]);

    //판테라 그레이 색상
    bot.dialog('/korDesignSelectPanteraGray', [
        function (session, args) {
            
            //session.send(session.localizer.gettext(session.preferredLocale(), "PanteraGray") + " " + session.localizer.gettext(session.preferredLocale(), "selectedColorMessage"));
            var PanteraGray = session.localizer.gettext(session.preferredLocale(), "PanteraGray") + " " + session.localizer.gettext(session.preferredLocale(), "selectedColorMessage");
            colorMsg(session, PanteraGray, "PanteraGray");

            var msg = new builder.Message(session)
                .textFormat(builder.TextFormat.xml)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments([
                    //AnimationCard
                    new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "colorDetailFront"))

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/PG9/00055.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/PG9/00055.jpg"))
                                .alt(session.localizer.gettext(session.preferredLocale(), "PanteraGray"))
                        ]),
                    new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "colorDetailRight"))

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/PG9/00046.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/PG9/00046.jpg"))
                                .alt(session.localizer.gettext(session.preferredLocale(), "PanteraGray"))
                        ]),
                    new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "colorDetailLeft"))

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/PG9/00014.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/PG9/00014.jpg"))
                                .alt(session.localizer.gettext(session.preferredLocale(), "PanteraGray"))
                        ]),
                    new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "colorDetailRear"))

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/PG9/00021.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/PG9/00021.jpg"))
                                .alt(session.localizer.gettext(session.preferredLocale(), "PanteraGray"))
                        ])
                ]);
            session.send(msg);
            
            responseTime = parseInt(date.getTime()) - parseInt(args.beginTime);
            query.insertHistoryQuery(args, responseTime, function (err, result) {
                if (!err) {
                    console.log("query.getData : " + result);
                }
            });

            var msg = new builder.Message(session)
                            .attachments([
            
                new builder.HeroCard(session)
                .title("")
                .text(session.localizer.gettext(session.preferredLocale(), "induceColorDesignToConvenience"))
                .buttons([
                    builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "convenienceClickMessage"), session.localizer.gettext(session.preferredLocale(), "Yes")), 
                    builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "No"), session.localizer.gettext(session.preferredLocale(), "No"))
                ])
            ]);
            
            builder.Prompts.choice(session, msg, session.localizer.gettext(session.preferredLocale(), "YesOrNo"));
            session.endDialog();

        }
    ]);


    //미드나잇 블랙 색상
    bot.dialog('/korDesignSelectMidnightBlack', [
        function (session, args) {
            
            //session.send(session.localizer.gettext(session.preferredLocale(), "MidnightBlack") + " " + session.localizer.gettext(session.preferredLocale(), "selectedColorMessage"));
            var MidnightBlack = session.localizer.gettext(session.preferredLocale(), "MidnightBlack") + " " + session.localizer.gettext(session.preferredLocale(), "selectedColorMessage");
            colorMsg(session, MidnightBlack, 'MidnightBlack');

            var msg = new builder.Message(session)
                .textFormat(builder.TextFormat.xml)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments([
                    //AnimationCard
                    new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "colorDetailFront"))

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/NB9/00055.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/NB9/00055.jpg"))
                                .alt(session.localizer.gettext(session.preferredLocale(), "MidnightBlack"))
                        ]),
                    new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "colorDetailRight"))

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/NB9/00046.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/NB9/00046.jpg"))
                                .alt(session.localizer.gettext(session.preferredLocale(), "MidnightBlack"))
                        ]),
                    new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "colorDetailLeft"))

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/NB9/00014.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/NB9/00014.jpg"))
                                .alt(session.localizer.gettext(session.preferredLocale(), "MidnightBlack"))
                        ]),
                    new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "colorDetailRear"))

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/NB9/00021.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/NB9/00021.jpg"))
                                .alt(session.localizer.gettext(session.preferredLocale(), "MidnightBlack"))
                        ])
                ]);
            session.send(msg);
            
            responseTime = parseInt(date.getTime()) - parseInt(args.beginTime);
            query.insertHistoryQuery(args, responseTime, function (err, result) {
                if (!err) {
                    console.log("query.getData : " + result);
                }
            });

            var msg = new builder.Message(session)
                            .attachments([
            
                new builder.HeroCard(session)
                .title("")
                .text(session.localizer.gettext(session.preferredLocale(), "induceColorDesignToConvenience"))
                .buttons([
                    builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "convenienceClickMessage"), session.localizer.gettext(session.preferredLocale(), "Yes")), 
                    builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "No"), session.localizer.gettext(session.preferredLocale(), "No"))
                ])
            ]);
            
            builder.Prompts.choice(session, msg, session.localizer.gettext(session.preferredLocale(), "YesOrNo"));
            session.endDialog();

        }
    ]);

    //발렌타인 레드 색상
    bot.dialog('/korDesignSelectValentineRed', [
        function (session, args) {
            
            //session.send(session.localizer.gettext(session.preferredLocale(), "ValentineRed") + " " + session.localizer.gettext(session.preferredLocale(), "selectedColorMessage"));
            var ValentineRed = session.localizer.gettext(session.preferredLocale(), "ValentineRed") + " " + session.localizer.gettext(session.preferredLocale(), "selectedColorMessage");
            colorMsg(session, ValentineRed, 'ValentineRed');

            var msg = new builder.Message(session)
                .textFormat(builder.TextFormat.xml)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments([
                    //AnimationCard
                    new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "colorDetailFront"))

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/V9R/00055.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/V9R/00055.jpg"))
                                .alt(session.localizer.gettext(session.preferredLocale(), "ValentineRed"))
                        ]),
                    new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "colorDetailRight"))

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/V9R/00046.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/V9R/00046.jpg"))
                                .alt(session.localizer.gettext(session.preferredLocale(), "ValentineRed"))
                        ]),
                    new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "colorDetailLeft"))

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/V9R/00014.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/V9R/00014.jpg"))
                                .alt(session.localizer.gettext(session.preferredLocale(), "ValentineRed"))
                        ]),
                    new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "colorDetailRear"))

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/V9R/00021.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/V9R/00021.jpg"))
                                .alt(session.localizer.gettext(session.preferredLocale(), "ValentineRed"))
                        ])
                ]);
            session.send(msg);
            
            responseTime = parseInt(date.getTime()) - parseInt(args.beginTime);
            query.insertHistoryQuery(args, responseTime, function (err, result) {
                if (!err) {
                    console.log("query.getData : " + result);
                }
            });

            var msg = new builder.Message(session)
                            .attachments([
            
                new builder.HeroCard(session)
                .title("")
                .text(session.localizer.gettext(session.preferredLocale(), "induceColorDesignToConvenience"))
                .buttons([
                    builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "convenienceClickMessage"), session.localizer.gettext(session.preferredLocale(), "Yes")), 
                    builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "No"), session.localizer.gettext(session.preferredLocale(), "No"))
                ])
            ]);
            
            builder.Prompts.choice(session, msg, session.localizer.gettext(session.preferredLocale(), "YesOrNo"));
            session.endDialog();

        }
    ]);

    //그랑 블루 색상
    bot.dialog('/korDesignSelectGrandBlue', [
        function (session, args) {
            
            //session.send(session.localizer.gettext(session.preferredLocale(), "GrandBlue") + " " + session.localizer.gettext(session.preferredLocale(), "selectedColorMessage"));
            var GrandBlue = session.localizer.gettext(session.preferredLocale(), "GrandBlue") + " " + session.localizer.gettext(session.preferredLocale(), "selectedColorMessage");
            colorMsg(session, GrandBlue, 'GrandBlue');

            var msg = new builder.Message(session)
                .textFormat(builder.TextFormat.xml)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments([
                    new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "colorDetailFront"))
                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/NU9/00055.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/NU9/00055.jpg"))
                                .alt(session.localizer.gettext(session.preferredLocale(), "GrandBlue"))
                        ]),
                    new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "colorDetailRight"))

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/NU9/00046.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/NU9/00046.jpg"))
                                .alt(session.localizer.gettext(session.preferredLocale(), "GrandBlue"))
                        ]),
                    new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "colorDetailLeft"))

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/NU9/00014.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/NU9/00014.jpg"))
                                .alt(session.localizer.gettext(session.preferredLocale(), "GrandBlue"))
                        ]),
                    new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "colorDetailRear"))

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/NU9/00021.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/NU9/00021.jpg"))
                                .alt(session.localizer.gettext(session.preferredLocale(), "GrandBlue"))
                        ])
                ]);
            session.send(msg);
            
            responseTime = parseInt(date.getTime()) - parseInt(args.beginTime);
            query.insertHistoryQuery(args, responseTime, function (err, result) {
                if (!err) {
                    console.log("query.getData : " + result);
                }
            });

            var msg = new builder.Message(session)
                            .attachments([
            
                new builder.HeroCard(session)
                .title("")
                .text(session.localizer.gettext(session.preferredLocale(), "induceColorDesignToConvenience"))
                .buttons([
                    builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "convenienceClickMessage"), session.localizer.gettext(session.preferredLocale(), "Yes")), 
                    builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "No"), session.localizer.gettext(session.preferredLocale(), "No"))
                ])
            ]);
            
            builder.Prompts.choice(session, msg, session.localizer.gettext(session.preferredLocale(), "YesOrNo"));
            session.endDialog();

        }
    ]);

    //쉐이드 브론즈 차
    bot.dialog('/korDesignSelectShadeBronze', [
        function (session, args) {
            
            //session.send(session.localizer.gettext(session.preferredLocale(), "ShadeBronze") + " " + session.localizer.gettext(session.preferredLocale(), "selectedColorMessage"));
            var ShadeBronze = session.localizer.gettext(session.preferredLocale(), "ShadeBronze") + " " + session.localizer.gettext(session.preferredLocale(), "selectedColorMessage");
            colorMsg(session, GrandBlue, 'ShadeBronze');

            var msg = new builder.Message(session)
                .textFormat(builder.TextFormat.xml)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments([
                    //AnimationCard
                    new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "colorDetailFront"))

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/S9C/00055.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/S9C/00055.jpg"))
                                .alt(session.localizer.gettext(session.preferredLocale(), "ShadeBronze"))
                        ]),
                    new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "colorDetailLeft"))

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/S9C/00046.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/S9C/00046.jpg"))
                                .alt(session.localizer.gettext(session.preferredLocale(), "ShadeBronze"))
                        ]),
                    new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "colorDetailRight"))

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/S9C/00014.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/S9C/00014.jpg"))
                                .alt(session.localizer.gettext(session.preferredLocale(), "ShadeBronze"))
                        ]),
                    new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "colorDetailRear"))

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/S9C/00021.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/S9C/00021.jpg"))
                                .alt(session.localizer.gettext(session.preferredLocale(), "ShadeBronze"))
                        ])
                ]);
            session.send(msg);
            
            responseTime = parseInt(date.getTime()) - parseInt(args.beginTime);
            query.insertHistoryQuery(args, responseTime, function (err, result) {
                if (!err) {
                    console.log("query.getData : " + result);
                }
            });

            var msg = new builder.Message(session)
                            .attachments([
            
                new builder.HeroCard(session)
                .title("")
                .text(session.localizer.gettext(session.preferredLocale(), "induceColorDesignToConvenience"))
                .buttons([
                    builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "convenienceClickMessage"), session.localizer.gettext(session.preferredLocale(), "Yes")), 
                    builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "No"), session.localizer.gettext(session.preferredLocale(), "No"))
                ])
            ]);
            
            builder.Prompts.choice(session, msg, session.localizer.gettext(session.preferredLocale(), "YesOrNo"));
            session.endDialog();

        }
    ]);

    //카키 메탈 차
    bot.dialog('/korDesignSelectKakiMetal', [
        function (session, args) {
            
            //session.send(session.localizer.gettext(session.preferredLocale(), "KakiMetal") + " " + session.localizer.gettext(session.preferredLocale(), "selectedColorMessage"));
            var KakiMetal = session.localizer.gettext(session.preferredLocale(), "KakiMetal") + " " + session.localizer.gettext(session.preferredLocale(), "selectedColorMessage");
            colorMsg(session, MidnightBlack, 'KakiMetal');

            var msg = new builder.Message(session)
                .textFormat(builder.TextFormat.xml)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments([
                    //AnimationCard
                    new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "colorDetailFront"))

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/TK9/00055.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/TK9/00055.jpg"))
                                .alt(session.localizer.gettext(session.preferredLocale(), "KakiMetal"))
                        ]),
                    new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "colorDetailRight"))

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/TK9/00046.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/TK9/00046.jpg"))
                                .alt(session.localizer.gettext(session.preferredLocale(), "KakiMetal"))
                        ]),
                    new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "colorDetailLeft"))

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/TK9/00014.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/TK9/00014.jpg"))
                                .alt(session.localizer.gettext(session.preferredLocale(), "KakiMetal"))
                        ]),
                    new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "colorDetailRear"))

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/TK9/00021.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/TK9/00021.jpg"))
                                .alt(session.localizer.gettext(session.preferredLocale(), "KakiMetal"))
                        ])
                ]);
            session.send(msg);
            
            responseTime = parseInt(date.getTime()) - parseInt(args.beginTime);
            query.insertHistoryQuery(args, responseTime, function (err, result) {
                if (!err) {
                    console.log("query.getData : " + result);
                }
            });

            var msg = new builder.Message(session)
                            .attachments([
            
                new builder.HeroCard(session)
                .title("")
                .text(session.localizer.gettext(session.preferredLocale(), "induceColorDesignToConvenience"))
                .buttons([
                    builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "convenienceClickMessage"), session.localizer.gettext(session.preferredLocale(), "Yes")), 
                    builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "No"), session.localizer.gettext(session.preferredLocale(), "No"))
                ])
            ]);
            
            builder.Prompts.choice(session, msg, session.localizer.gettext(session.preferredLocale(), "YesOrNo"));
            session.endDialog();

        }

    ]);
}

module.exports = {
    create
}