var builder = require('botbuilder');
var query = require('../../config/query');
var date = require('date-utils');
date = new Date();

function create(bot) {
    
    var responseTime;

    /***********************************************************************************
    1. 한국어 디자인 초기 메뉴
    ************************************************************************************/
    bot.dialog('/korDesignMain', [

        function (session, args) {

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
                ]);
            builder.Prompts.choice(session, msg, session.localizer.gettext(session.preferredLocale(), "designMenuList")); 
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


    //색상 선택
    bot.dialog('/korDesignColorList', [

        function (session, args) {
            session.send(session.localizer.gettext(session.preferredLocale(), "colorSelectWelcomeMessage")); 
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
            session.beginDialog('/korReMainMenu');
            
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
            session.endDialog();
            session.beginDialog('/korReMainMenu');
            
            responseTime = parseInt(date.getTime()) - parseInt(args.beginTime);
            query.insertHistoryQuery(args, responseTime, function (err, result) {
                if (!err) {
                    console.log("query.getData : " + result);
                }
            });
            //}
        }
    ]);



    // 차 내관 선택
    bot.dialog('/korDesignInteriorSimple', [

        function (session, args) {
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
            session.endDialog();
            session.beginDialog('/korReMainMenu');
            
            responseTime = parseInt(date.getTime()) - parseInt(args.beginTime);
            query.insertHistoryQuery(args, responseTime, function (err, result) {
                if (!err) {
                    console.log("query.getData : " + result);
                }
            });
                //builder.Prompts.choice(session, "그랜저의 디자인에 대해 메뉴를 보시겠습니까?", '디자인|색상|내관|외관|홈', { listStyle: builder.ListStyle.button });
            }
        //}
    ]);
     


    /***********************************************************************************
    1. 한국어 디자인 - 색상 세부 목록
    ************************************************************************************/


    //화이트 크림 색상
    bot.dialog('/korDesignSelectWhiteCream', [
        function (session, args) {
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
            session.beginDialog('/korReMainMenu');
            session.endDialog();
            
            responseTime = parseInt(date.getTime()) - parseInt(args.beginTime);
            query.insertHistoryQuery(args, responseTime, function (err, result) {
                if (!err) {
                    console.log("query.getData : " + result);
                }
            });
            //builder.Prompts.choice(session, "그랜저의 다른 색상을 보시겠습니까?", '예|아니오', { listStyle: builder.ListStyle.button });
        }
    ]);
    

    //이온 실버 색상
    bot.dialog('/korDesignSelectIonSilver', [
        function (session, args) {
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
            session.beginDialog('/korReMainMenu');
            session.endDialog();
            
            responseTime = parseInt(date.getTime()) - parseInt(args.beginTime);
            query.insertHistoryQuery(args, responseTime, function (err, result) {
                if (!err) {
                    console.log("query.getData : " + result);
                }
            });
            //builder.Prompts.choice(session, "그랜저의 다른 색상을 보시겠습니까?", '예|아니오', { listStyle: builder.ListStyle.button });
        }
    ]);

    //루나 그레이 색상
    bot.dialog('/korDesignSelectLunaGray', [
        function (session, args) {
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
            session.beginDialog('/korReMainMenu');
            session.endDialog();
            
            responseTime = parseInt(date.getTime()) - parseInt(args.beginTime);
            query.insertHistoryQuery(args, responseTime, function (err, result) {
                if (!err) {
                    console.log("query.getData : " + result);
                }
            });
            //builder.Prompts.choice(session, "그랜저의 다른 색상을 보시겠습니까?", '예|아니오', { listStyle: builder.ListStyle.button });
        }
    ]);

    //판테라 그레이 색상
    bot.dialog('/korDesignSelectPanteraGray', [
        function (session, args) {
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
            session.beginDialog('/korReMainMenu');
            session.endDialog();
            
            responseTime = parseInt(date.getTime()) - parseInt(args.beginTime);
            query.insertHistoryQuery(args, responseTime, function (err, result) {
                if (!err) {
                    console.log("query.getData : " + result);
                }
            });
            //builder.Prompts.choice(session, "그랜저의 다른 색상을 보시겠습니까?", '예|아니오', { listStyle: builder.ListStyle.button });
        }
    ]);


    //미드나잇 블랙 색상
    bot.dialog('/korDesignSelectMidnightBlack', [
        function (session, args) {
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
            session.beginDialog('/korReMainMenu');
            session.endDialog();
            
            responseTime = parseInt(date.getTime()) - parseInt(args.beginTime);
            query.insertHistoryQuery(args, responseTime, function (err, result) {
                if (!err) {
                    console.log("query.getData : " + result);
                }
            });
            //builder.Prompts.choice(session, "그랜저의 다른 색상을 보시겠습니까?", '예|아니오', { listStyle: builder.ListStyle.button });
        }
    ]);

    //발렌타인 레드 색상
    bot.dialog('/korDesignSelectValentineRed', [
        function (session, args) {
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
            session.beginDialog('/korReMainMenu');
            session.endDialog();
            
            responseTime = parseInt(date.getTime()) - parseInt(args.beginTime);
            query.insertHistoryQuery(args, responseTime, function (err, result) {
                if (!err) {
                    console.log("query.getData : " + result);
                }
            });
            //builder.Prompts.choice(session, "그랜저의 다른 색상을 보시겠습니까?", '예|아니오', { listStyle: builder.ListStyle.button });
        }
    ]);

    //그랑 블루 색상
    bot.dialog('/korDesignSelectGrandBlue', [
        function (session, args) {
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
            session.beginDialog('/korReMainMenu');
            session.endDialog();
            
            responseTime = parseInt(date.getTime()) - parseInt(args.beginTime);
            query.insertHistoryQuery(args, responseTime, function (err, result) {
                if (!err) {
                    console.log("query.getData : " + result);
                }
            });
            //builder.Prompts.choice(session, "그랜저의 다른 색상을 보시겠습니까?", '예|아니오', { listStyle: builder.ListStyle.button });
        }
    ]);

    //쉐이드 브론즈 차
    bot.dialog('/korDesignSelectShadeBronze', [
        function (session, args) {
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
            session.beginDialog('/korReMainMenu');
            session.endDialog();
            
            responseTime = parseInt(date.getTime()) - parseInt(args.beginTime);
            query.insertHistoryQuery(args, responseTime, function (err, result) {
                if (!err) {
                    console.log("query.getData : " + result);
                }
            });
            //builder.Prompts.choice(session, "그랜저의 다른 색상을 보시겠습니까?", '예|아니오', { listStyle: builder.ListStyle.button });
        }
    ]);

    //카키 메탈 차
    bot.dialog('/korDesignSelectKakiMetal', [
        function (session, args) {
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
            session.beginDialog('/korReMainMenu');
            session.endDialog();
            
            responseTime = parseInt(date.getTime()) - parseInt(args.beginTime);
            query.insertHistoryQuery(args, responseTime, function (err, result) {
                if (!err) {
                    console.log("query.getData : " + result);
                }
            });
            //builder.Prompts.choice(session, "그랜저의 다른 색상을 보시겠습니까?", '예|아니오', { listStyle: builder.ListStyle.button });
        }
    ]);
}

module.exports = {
    create
}