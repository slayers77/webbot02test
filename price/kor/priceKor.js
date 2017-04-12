var builder = require('botbuilder');
var query = require('../../config/query');
var date = require('date-utils');
date = new Date();

var async = require('async');
var tp = require('tedious-promises');
var TYPES = require('tedious').TYPES;


var config = {
    server: 'faxtimedb.database.windows.net',
    userName: 'faxtime',
    password: 'test2016!',
    options: {
        debug: {
            packet: false,
            data: false,
            patload: false,
            token: false,
            log: true
        },
        encrypt: true,
        database: 'taihoML'
    }
};

function create(bot) {
    /***********************************************************************************
    1. 한국어 가격 초기 메뉴(모델 카드)
    ************************************************************************************/

    var responseTime;
    
    bot.dialog('/korPriceModel', [

        function (session, args) {
            session.userData.model = "";
            session.send(session.localizer.gettext(session.preferredLocale(), "priceWelcomeMessage"));
            var msg = new builder.Message(session)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments([
                new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "priceGasoline2.4ModelMessage"))
                        .images([
                    builder.CardImage.create(session, img_path + "/images/price/Grandeur_24spec.PNG")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_24spec.PNG"))
                ])
                        .buttons([
                    builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "gasoline2.4"), session.localizer.gettext(session.preferredLocale(), "gasoline2.4ClickMessage"))
                ]),
                new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "priceGasoline3.0ModelMessage"))
                        .images([
                    builder.CardImage.create(session, img_path + "/images/price/Grandeur_30spec.PNG")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_30spec.PNG"))
                ])
                        .buttons([
                    builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "gasoline3.0"), session.localizer.gettext(session.preferredLocale(), "gasoline3.0ClickMessage"))
                ]),
                new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "gasoline3.3ClickMessage"))
                        .images([
                    builder.CardImage.create(session, img_path + "/images/price/Grandeur_33spec.PNG")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_33spec.PNG"))
                ])
                        .buttons([
                    builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "gasoline3.3"), session.localizer.gettext(session.preferredLocale(), "gasoline3.3ClickMessage"))
                ]),
                new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "priceDiesel2.2ModelMessage"))
                        .images([
                    builder.CardImage.create(session, img_path + "/images/price/Grandeur_22spec.PNG")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_22spec.PNG"))
                ])
                        .buttons([
                    builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "diesel2.2"), session.localizer.gettext(session.preferredLocale(), "diesel2.2ClickMessage"))
                ])
            ]);
            builder.Prompts.choice(session, msg, session.localizer.gettext(session.preferredLocale(), "priceModelMenuList"));
            session.endDialog();
            //session.beginDialog('/korReMainMenu');

            responseTime = parseInt(date.getTime()) - parseInt(args.beginTime);
            query.insertHistoryQuery(args, responseTime, function (err, result) {
                if (!err) {
                    console.log("query.getData : " + result);
                }
            });
        }
    ]);
    
    /***********************************************************************************
    2. 한국어 가격 메뉴 (트림 카드)
    ************************************************************************************/

    bot.dialog('/korPriceTrim', [
        function (session, args) {
            var model = args.model;
            var trim = args.trim;
            var trim1 = "";
            var trim2 = "";
            var trim3 = "";
            var trimCard1;
            var trimCard2;
            var trimCard3;
            var trimCard4;
            var msg;
            var showTrim;
            if (args.sendMsg.match(/모던/g) || args.sendMsg.match(/프리미엄/g) || args.sendMsg.match(/프리미엄스페셜/g) || args.sendMsg.match(/프리미엄 스페셜/g) 
                || args.sendMsg.match(/익스클루시브/g) || args.sendMsg.match(/익스클루시브스페셜/g) || args.sendMsg.match(/익스클루시브 스페셜/g) 
                || args.sendMsg.match(/셀러브리티/g)) {
                session.send(session.localizer.gettext(session.preferredLocale(), "priceTrimWelcomeMessgae1"));
            } else {
                session.send(session.localizer.gettext(session.preferredLocale(), "priceTrimWelcomeMessgae2"));
            }
            if (args.sendMsg.match(/가솔린2.4/g) || args.sendMsg.match(/가솔린 2.4/g)) {
                model = session.localizer.gettext(session.preferredLocale(), "priceTrimGasoline2.4Model");
                trim1 = session.localizer.gettext(session.preferredLocale(), "priceTrimModern");
                trim2 = session.localizer.gettext(session.preferredLocale(), "priceTrimPremium");
                trim3 = session.localizer.gettext(session.preferredLocale(), "priceTrimPremiumSpecial");
                //모던 카드
                trimCard1 = [new builder.HeroCard(session)
                    .title(model + " " + trim1)
                    .text(session.localizer.gettext(session.preferredLocale(), "priceTrimGasoline2.4ModernPrice"))
                    .images([
                        builder.CardImage.create(session, img_path + "/images/price/Grandeur_modern.PNG")
                            .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_modern.PNG"))
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "priceTrimGasoline2.4ModernBasicItemMessage"), session.localizer.gettext(session.preferredLocale(), "priceTrimBasicOptionViewMessage")),
                        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "priceTrimGasoline2.4ModernSelectItemMessage"), session.localizer.gettext(session.preferredLocale(), "priceTrimSelectOptionAddMessage"))
                    ])];
                //프리미엄 카드
                trimCard2 = [new builder.HeroCard(session)
                    .title(model + " " + trim2)
                    .text(session.localizer.gettext(session.preferredLocale(), "priceTrimGasoline2.4PremiumPrice"))
                    .images([
                        builder.CardImage.create(session, img_path + "/images/price/Grandeur_modern.PNG")
                            .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_modern.PNG"))
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "priceTrimGasoline2.4PremiumBasicItemMessage"), session.localizer.gettext(session.preferredLocale(), "priceTrimBasicOptionViewMessage")),
                        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "priceTrimGasoline2.4PremiumSelectItemMessage"), session.localizer.gettext(session.preferredLocale(), "priceTrimSelectOptionAddMessage"))
                    ])];
                //프리미엄 스페셜 카드
                trimCard3 = [new builder.HeroCard(session)
                    .title(model + " " + trim3)
                    .text(session.localizer.gettext(session.preferredLocale(), "priceTrimGasoline2.4PremiumSpecialPrice"))
                    .images([
                        builder.CardImage.create(session, img_path + "/images/price/Grandeur_modern.PNG")
                            .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_modern.PNG"))
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "priceTrimGasoline2.4PremiumSpecialBasicItemMessage"), session.localizer.gettext(session.preferredLocale(), "priceTrimBasicOptionViewMessage")),
                        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "priceTrimGasoline2.4PremiumSpecialSelectItemMessage"), session.localizer.gettext(session.preferredLocale(), "priceTrimSelectOptionAddMessage"))
                    ])];
                //모던 + 프리미엄 + 프리미엄 스페셜 카드
                trimCard4 = [new builder.HeroCard(session)
                    .title(model + " " + trim1)
                    .text(session.localizer.gettext(session.preferredLocale(), "priceTrimGasoline2.4ModernPrice"))
                    .images([
                        builder.CardImage.create(session, img_path + "/images/price/Grandeur_modern.PNG")
                            .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_modern.PNG"))
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "priceTrimGasoline2.4ModernBasicItemMessage"), session.localizer.gettext(session.preferredLocale(), "priceTrimBasicOptionViewMessage")),
                        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "priceTrimGasoline2.4ModernSelectItemMessage"), session.localizer.gettext(session.preferredLocale(), "priceTrimSelectOptionAddMessage"))
                    ]),
                    new builder.HeroCard(session)
                        .title(model + " " + trim2)
                        .text(session.localizer.gettext(session.preferredLocale(), "priceTrimGasoline2.4PremiumPrice"))
                        .images([
                        builder.CardImage.create(session, img_path + "/images/price/Grandeur_modern.PNG")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_modern.PNG"))
                    ])
                        .buttons([
                        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "priceTrimGasoline2.4PremiumBasicItemMessage"), session.localizer.gettext(session.preferredLocale(), "priceTrimBasicOptionViewMessage")),
                        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "priceTrimGasoline2.4PremiumSelectItemMessage"), session.localizer.gettext(session.preferredLocale(), "priceTrimSelectOptionAddMessage"))
                    ]),
                    new builder.HeroCard(session)
                        .title(model + " " + trim3)
                        .text(session.localizer.gettext(session.preferredLocale(), "priceTrimGasoline2.4PremiumSpecialPrice"))
                        .images([
                        builder.CardImage.create(session, img_path + "/images/price/Grandeur_modern.PNG")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_modern.PNG"))
                    ])
                        .buttons([
                        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "priceTrimGasoline2.4PremiumSpecialBasicItemMessage"), session.localizer.gettext(session.preferredLocale(), "priceTrimBasicOptionViewMessage")),
                        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "priceTrimGasoline2.4PremiumSpecialSelectItemMessage"), session.localizer.gettext(session.preferredLocale(), "priceTrimSelectOptionAddMessage"))
                    ])];
                if (args.sendMsg.match(/모던/g)) {
                    showTrim = trimCard1;
                } else if (args.sendMsg.match(/프리미엄스페셜/g) || args.sendMsg.match(/프리미엄 스페셜/g)) {
                    showTrim = trimCard3;
                } else if (args.sendMsg.match(/프리미엄/g)) {
                    showTrim = trimCard2;
                } else {
                    showTrim = trimCard4;
                }
                msg = new builder.Message(session).attachmentLayout(builder.AttachmentLayout.carousel).attachments(showTrim);
            } else if (args.sendMsg.match(/가솔린3.0/g) || args.sendMsg.match(/가솔린 3.0/g)) {
                model = session.localizer.gettext(session.preferredLocale(), "priceTrimGasoline3.0Model");
                trim1 = session.localizer.gettext(session.preferredLocale(), "priceTrimExclusive");
                trim2 = session.localizer.gettext(session.preferredLocale(), "priceTrimExclusiveSpecial");
                //익스클루시브 카드
                trimCard1 = [new builder.HeroCard(session)
                        .title(model + " " + trim1)
                        .text(session.localizer.gettext(session.preferredLocale(), "priceTrimGasoline2.4ExclusivePrice"))
                        .images([
                        builder.CardImage.create(session, img_path + "/images/price/Grandeur_exclusive.PNG")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_exclusive.PNG"))
                    ])
                        .buttons([
                        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "priceTrimGasoline2.4ExclusiveBasicItemMessage"), session.localizer.gettext(session.preferredLocale(), "priceTrimBasicOptionViewMessage")),
                        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "priceTrimGasoline2.4ExclusiveSelectItemMessage"), session.localizer.gettext(session.preferredLocale(), "priceTrimSelectOptionAddMessage"))
                    ])];
                //익스클루시브 스페셜 카드
                trimCard2 = [new builder.HeroCard(session)
                    .title(model + " " + trim2)
                    .text(session.localizer.gettext(session.preferredLocale(), "priceTrimGasoline2.4ExclusiveSpecialPrice"))
                    .images([
                        builder.CardImage.create(session, img_path + "/images/price/Grandeur_exclusive.PNG")
                            .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_exclusive.PNG"))
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "priceTrimGasoline2.4ExclusiveSpecialBasicItemMessage"), session.localizer.gettext(session.preferredLocale(), "priceTrimBasicOptionViewMessage")),
                        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "priceTrimGasoline2.4ExclusiveSpecialSelectItemMessage"), session.localizer.gettext(session.preferredLocale(), "priceTrimSelectOptionAddMessage"))
                    ])];
                //익스클루시브 + 익스클루시브 스페셜 카드
                trimCard3 = [new builder.HeroCard(session)
                    .title(model + " " + trim1)
                    .text(session.localizer.gettext(session.preferredLocale(), "priceTrimGasoline2.4ExclusivePrice"))
                    .images([
                        builder.CardImage.create(session, img_path + "/images/price/Grandeur_exclusive.PNG")
                            .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_exclusive.PNG"))
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "priceTrimGasoline2.4ExclusiveBasicItemMessage"), session.localizer.gettext(session.preferredLocale(), "priceTrimBasicOptionViewMessage")),
                        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "priceTrimGasoline2.4ExclusiveSelectItemMessage"), session.localizer.gettext(session.preferredLocale(), "priceTrimSelectOptionAddMessage"))
                    ]),
                    new builder.HeroCard(session)
                        .title(model + " " + trim2)
                        .text(session.localizer.gettext(session.preferredLocale(), "priceTrimGasoline2.4ExclusiveSpecialPrice"))
                        .images([
                        builder.CardImage.create(session, img_path + "/images/price/Grandeur_exclusive.PNG")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_exclusive.PNG"))
                    ])
                        .buttons([
                        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "priceTrimGasoline2.4ExclusiveSpecialBasicItemMessage"), session.localizer.gettext(session.preferredLocale(), "priceTrimBasicOptionViewMessage")),
                        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "priceTrimGasoline2.4ExclusiveSpecialSelectItemMessage"), session.localizer.gettext(session.preferredLocale(), "priceTrimSelectOptionAddMessage"))
                    ])];
                if (args.sendMsg.match(/익스클루시브스페셜/g) || args.sendMsg.match(/익스클루시브 스페셜/g)) {
                    showTrim = trimCard2;
                } else if (args.sendMsg.match(/익스클루시브/g)) {
                    showTrim = trimCard1;
                } else {
                    showTrim = trimCard3;
                }
                msg = new builder.Message(session).attachmentLayout(builder.AttachmentLayout.carousel).attachments(showTrim);
            } else if (args.sendMsg.match(/가솔린3.3/g) || args.sendMsg.match(/가솔린 3.3/g)) {
                model = session.localizer.gettext(session.preferredLocale(), "priceTrimGasoline3.3Model");
                trim1 = session.localizer.gettext(session.preferredLocale(), "priceTrimCelebrity");
                //셀러브리티 카드
                showTrim = [new builder.HeroCard(session)
                    .title(model + " " + trim1)
                    .text(session.localizer.gettext(session.preferredLocale(), "priceTrimGasoline3.3CelebrityPrice"))
                    .images([
                        builder.CardImage.create(session, img_path + "/images/price/Grandeur_celebrity.PNG")
                            .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_celebrity.PNG"))
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "priceTrimGasoline3.3CelebrityBasicItemMessage"), session.localizer.gettext(session.preferredLocale(), "priceTrimBasicOptionViewMessage")),
                        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "priceTrimGasoline3.3CelebritySelectItemMessage"), session.localizer.gettext(session.preferredLocale(), "priceTrimSelectOptionAddMessage"))
                    ])];
                msg = new builder.Message(session).attachmentLayout(builder.AttachmentLayout.carousel).attachments(showTrim);
            } else if (args.sendMsg.match(/디젤2.2/g) || args.sendMsg.match(/디젤 2.2/g)) {
                model = session.localizer.gettext(session.preferredLocale(), "priceTrimDiesel2.2Model");
                trim1 = session.localizer.gettext(session.preferredLocale(), "priceTrimModern");
                trim2 = session.localizer.gettext(session.preferredLocale(), "priceTrimPremium");
                trim3 = session.localizer.gettext(session.preferredLocale(), "priceTrimPremiumSpecial");
                //모던 카드
                trimCard1 = [new builder.HeroCard(session)
                    .title(model + " " + trim1)
                    .text(session.localizer.gettext(session.preferredLocale(), "priceTrimDiesel2.2ModernPrice"))
                    .images([
                        builder.CardImage.create(session, img_path + "/images/price/Grandeur_modern.PNG")
                            .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_modern.PNG"))
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "priceTrimDiesel2.2ModernBasicItemMessage"), session.localizer.gettext(session.preferredLocale(), "priceTrimBasicOptionViewMessage")),
                        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "priceTrimDiesel2.2ModernSelectItemMessage"), session.localizer.gettext(session.preferredLocale(), "priceTrimSelectOptionAddMessage"))
                    ])];
                //프리미엄 카드
                trimCard2 = [new builder.HeroCard(session)
                    .title(model + " " + trim2)
                    .text(session.localizer.gettext(session.preferredLocale(), "priceTrimDiesel2.2PremiumPrice"))
                    .images([
                        builder.CardImage.create(session, img_path + "/images/price/Grandeur_modern.PNG")
                            .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_modern.PNG"))
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "priceTrimDiesel2.2PremiumBasicItemMessage"), session.localizer.gettext(session.preferredLocale(), "priceTrimBasicOptionViewMessage")),
                        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "priceTrimDiesel2.2PremiumSelectItemMessage"), session.localizer.gettext(session.preferredLocale(), "priceTrimSelectOptionAddMessage"))
                    ])];
                //프리미엄 스페셜 카드
                trimCard3 = [new builder.HeroCard(session)
                    .title(model + " " + trim3)
                    .text(session.localizer.gettext(session.preferredLocale(), "priceTrimDiesel2.2PremiumSpecialPrice"))
                    .images([
                        builder.CardImage.create(session, img_path + "/images/price/Grandeur_modern.PNG")
                            .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_modern.PNG"))
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "priceTrimDiesel2.2PremiumSpecialBasicItemMessage"), session.localizer.gettext(session.preferredLocale(), "priceTrimBasicOptionViewMessage")),
                        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "priceTrimDiesel2.2PremiumSpecialSelectItemMessage"), session.localizer.gettext(session.preferredLocale(), "priceTrimSelectOptionAddMessage"))
                    ])];
                //모던 + 프리미엄 + 프리미엄 스페셜 카드
                trimCard4 = [new builder.HeroCard(session)
                    .title(model + " " + trim1)
                    .text(session.localizer.gettext(session.preferredLocale(), "priceTrimDiesel2.2ModernPrice"))
                    .images([
                        builder.CardImage.create(session, img_path + "/images/price/Grandeur_modern.PNG")
                            .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_modern.PNG"))
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "priceTrimDiesel2.2ModernBasicItemMessage"), session.localizer.gettext(session.preferredLocale(), "priceTrimBasicOptionViewMessage")),
                        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "priceTrimDiesel2.2ModernSelectItemMessage"), session.localizer.gettext(session.preferredLocale(), "priceTrimSelectOptionAddMessage"))
                    ]),
                    new builder.HeroCard(session)
                    .title(model + " " + trim2)
                    .text(session.localizer.gettext(session.preferredLocale(), "priceTrimDiesel2.2PremiumPrice"))
                    .images([
                        builder.CardImage.create(session, img_path + "/images/price/Grandeur_modern.PNG")
                            .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_modern.PNG"))
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "priceTrimDiesel2.2PremiumBasicItemMessage"), session.localizer.gettext(session.preferredLocale(), "priceTrimBasicOptionViewMessage")),
                        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "priceTrimDiesel2.2PremiumSelectItemMessage"), session.localizer.gettext(session.preferredLocale(), "priceTrimSelectOptionAddMessage"))
                    ]),
                    new builder.HeroCard(session)
                    .title(model + " " + trim3)
                    .text(session.localizer.gettext(session.preferredLocale(), "priceTrimDiesel2.2PremiumSpecialPrice"))
                    .images([
                        builder.CardImage.create(session, img_path + "/images/price/Grandeur_modern.PNG")
                            .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_modern.PNG"))
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "priceTrimDiesel2.2PremiumSpecialBasicItemMessage"), session.localizer.gettext(session.preferredLocale(), "priceTrimBasicOptionViewMessage")),
                        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "priceTrimDiesel2.2PremiumSpecialSelectItemMessage"), session.localizer.gettext(session.preferredLocale(), "priceTrimSelectOptionAddMessage"))
                    ])];
                if (args.sendMsg.match(/모던/g)) {
                    showTrim = trimCard1;
                } else if (args.sendMsg.match(/프리미엄스페셜/g) || args.sendMsg.match(/프리미엄 스페셜/g)) {
                    showTrim = trimCard3;
                } else if (args.sendMsg.match(/프리미엄/g)) {
                    showTrim = trimCard2;
                } else {
                    showTrim = trimCard4;
                }
                msg = new builder.Message(session).attachmentLayout(builder.AttachmentLayout.carousel).attachments(showTrim);
            }
            builder.Prompts.choice(session, msg, "BTN1|BTN2|BTN3|BTN4|BTN5|BTN6");
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
    3-1. 한국어 가격 메뉴 (기본옵션 보기)
    ************************************************************************************/
    bot.dialog('/korPriceBasicOptionList', [
        function (session, args) {
            /*
            var modelTrim = "";
            
            var searchModel = query.getOption({ model: session.userData.model, trim: session.userData.trim, queryName: "select_carType" }, function (err, result) {
                if (!err) {
                    console.log("query.getOption : " + result.length);
                    for (var i = 0; i < result.length; i++) {
                        console.log("[ " + i + " ] :  " + result[i].CAR_TYPE);
                    }
                }
            });
           
            var text1 = query.getBasicOption(session.userData.model, session.userData.trim, "select_carType", function (result) {
                console.log("getOption1 :::: " + result);
            });
             */
            //session.send("searchModel :::: " + text1[CAR_TYPE]);

            var modelTrim;
            var powerTrain;
            var performance;
            var safety;
            var outSide;
            var inSide;
            var sit;
            var convenience;
            var multi;
            
            if (args.trim == "모던") {
                modelTrim = "[" + args.model + " " + args.trim + "]\n\n";
                powerTrain = "\n\n파워트레인 \n\n - 가솔린 2.4엔진";
                performance = "\n\n성능 \n\n - 6단 자동변속기 \n\n - 전동식 파워 스티어링(속도감응형)";
                safety = "\n\n안전 \n\n - 9 에어백 시스템(앞좌석 어드밴스드, 운전석 무릎, 앞/뒷좌석 사이드, 전복 대응 커튼)\n\n - 앞좌석 후방충격 저감 시스템\n\n - 앞좌석 하체 상해 저감 시트벨트(EFD 시스템)\n\n - 뒷좌석 센터 3점식 시트벨트\n\n - 유아용 시트 고정장치(뒷좌석)\n\n - 차체 자세 제어 장치(ESC)\n\n - 샤시 통합 제어 시스템(VSM)\n\n - 경사로 밀림 방지 장치(HAC)\n\n - 급제동 경보 장치(ESS)\n\n - 개별 타이어 공기압 경보 장치(TPMS)\n\n - 세이프티 언락\n\n - 타이어 응급처치 키트";
                outSide = "\n\n외관 \n\n - 듀얼 프로젝션 헤드램프\n\n - LED 주간주행등(DRL, 포지셔닝 기능 포함)\n\n - LED 리어 콤비램프(제동등, 후미등 적용) \n\n - LED 보조제동등\n\n - 17인치 알로이 휠 & 타이어\n\n - 이중접합 차음 유리(앞면, 앞도어) \n\n - 아웃사이드 미러(열선, 전동 조절, 전동 접이, LED 방향지시등) \n\n - 도어 포켓라이팅(앞) \n\n - 듀얼 머플러";
                inSide = "\n\n내장 \n\n - 슈퍼비전 클러스터(3.5인치 단색 LCD)\n\n - 가죽 스티어링 휠(열선, 수동식 틸트 & 텔레스코픽, 리모컨)\n\n - 가죽 변속기 노브\n\n - 크래쉬패드 인조가죽 감싸기\n\n - 도어트림 우드그레인 가니쉬\n\n - 트리코트 내장재\n\n - 메탈 도어스커프\n\n - 룸램프(LED)\n\n - ECM 룸미러\n\n - 아날로그 시계";
                sit = "\n\n시트 \n\n - 천연가죽 시트\n\n - 운전석 전동 조절(8way) & 전동식 2way 럼버서포트\n\n - 동승석 전동 조절(4way)\n\n - 앞좌석 열선\n\n - 뒷좌석 열선\n\n - 뒷좌석 암레스트(스키쓰루)";
                convenience = "\n\n편의 \n\n - 버튼 시동 & 스마트키 시스템\n\n - 듀얼 풀오토 에어컨\n\n - 오토 디포그\n\n - 고성능 에어컨 필터\n\n - 통합주행모드\n\n - 오토 크루즈 컨트롤, 풋파킹 브레이크\n\n - 전/후방 주차보조 시스템\n\n - 후방카메라(조향 연동)\n\n - 스마트 트렁크(풀오픈 타입)\n\n - 세이프티 파워윈도우(앞좌석)\n\n - USB 충전기\n\n - 파워 아웃렛(센터페시아, 센터콘솔 암레스트)";
                multi = "\n\n멀티미디어 \n\n - 8인치 내비게이션\n\n - 일반 사운드 시스템(8스피커)\n\n - AUX & USB 단자\n\n - 블루투스 핸즈프리";
                session.send("[" + args.model + " " + args.trim + "] 기본 옵션 입니다.");
                //session.send(modelTrim + powerTrain + performance + safety + outSide + inSide + sit + convenience + multi);
                session.send( powerTrain + performance + safety + outSide + inSide + sit + convenience + multi);

            } else if (args.trim == "프리미엄 스페셜") {
                modelTrim = "[" + args.model + " " + args.trim + "]\n\n";
                powerTrain = "";
                performance = "";
                safety = "";
                outSide = "\n\n외관 \n\n - 고급 샤틴 크롬 라디에이터 그릴\n\n - 고급 샤틴 크롬 몰딩\n\n - LED 방향지시등(앞)\n\n - 18인치 알로이 휠 & 미쉐린 타이어\n\n - 자외선 차단 유리(앞면)\n\n - 아웃사이드 미러 퍼들램프";
                inSide = "\n\n내장 \n\n - 도어트림 인조가죽 감싸기\n\n - 도어트림 인서트필름 가니쉬\n\n - 도어 암레스트 크롬 엑센트";
                sit = "\n\n시트 \n\n - 운전석 전동식 4way 럼버서포트\n\n - 운전석 자세 메모리 시스템(IMS)\n\n - 운전석 전동식 쿠션 익스텐션\n\n - 동승석 워크인 스위치\n\n - 뒷좌석 다기능 암레스트";
                convenience = "\n\n편의 \n\n - 전동식 틸트 & 텔레스코픽 스티어링 휠\n\n - 수동식 뒷좌석 도어 커튼";
                multi = "";
                session.send("[" + args.model + " " + args.trim + "] 기본 옵션 입니다.");
                session.send(modelTrim + "가솔린 2.4 프리미엄 기본 사양 및 \n\n" + outSide + inSide + sit + convenience);

            } else if (args.trim == "프리미엄") {
                modelTrim = "[" + args.model + " " + args.trim + "]\n\n";
                powerTrain = "";
                performance = "";
                safety = "\n\n안전 \n\n - 스마트 후측방 경보 시스템(BSD)";
                outSide = "";
                inSide = "";
                sit = "\n\n시트 \n\n - 앞좌석 통풍";
                convenience = "\n\n편의 \n\n - 전동식 파킹 브레이크(EPB)\n\n - 하이패스 시스템\n\n - 레인센서";
                multi = "";
                session.send("[" + args.model + " " + args.trim + "] 기본 옵션 입니다.");
                session.send(modelTrim + "가솔린 2.4 모던 기본 사양 및 \n\n" + safety + sit + convenience);

            } else if (args.trim == "익스클루시브 스페셜") {
                modelTrim = "[" + args.model + " " + args.trim + "]\n\n";
                powerTrain = "";
                performance = "";
                safety = "";
                outSide = "\n\n외관 \n\n - Full LED 헤드램프(다이나믹 밴딩 기능)\n\n - 19인치 스퍼터링 알로이 휠 & 미쉐린 타이어\n\n - 자외선 차단 유리(전체 도어, 뒷면)";
                inSide = "\n\n내장 \n\n - 4.2인치 컬러 LCD 클러스터\n\n - 클러스터 이오나이저\n\n - 어라운드 뷰 모니터(AVM)";
                sit = "";
                convenience = "\n\n편의 \n\n - 스마트 전동식 트렁크\n\n - 전동식 뒷좌석 후방 커튼";
                multi = "";
                session.send("[" + args.model + " " + args.trim + "] 기본 옵션 입니다.");
                session.send(modelTrim + "가솔린 3.0 익스클루시브 기본 사양 및 \n\n" + outSide + inSide + convenience);

            } else if (args.trim == "익스클루시브") {
                modelTrim = "[" + args.model + " " + args.trim + "]\n\n";
                powerTrain = "\n\n파워트레인 \n\n - 가솔린 3.0엔진, 8단 자동변속기";
                performance = "";
                safety = "";
                outSide = "";
                inSide = "";
                sit = "";
                convenience = "\n\n편의 \n\n - 카드타입 스마트키\n\n - 스마트폰 무선충전 시스템";
                multi = "";
                session.send("[" + args.model + " " + args.trim + "] 기본 옵션 입니다.");
                session.send(modelTrim + "가솔린 2.4 프리미엄 스페셜 기본 사양 및 \n\n" + powerTrain + convenience);

            } else if (args.trim == "셀러브리티") {
                modelTrim = "[" + args.model + " " + args.trim + "]\n\n";
                powerTrain = "\n\n파워트레인 \n\n - 가솔린 3.3엔진";
                performance = "\n\n성능 \n\n - 전륜 대용량 디스크 브레이크";
                safety = "";
                outSide = "\n\n외관 \n\n - 발수 적용 유리(앞도어)\n\n - 이중접합 차음 유리(뒷도어)";
                inSide = "\n\n내장 \n\n - 크래쉬패드 인조가죽 감싸기(무엠보형)\n\n - 스티어링 휠 혼 커버 나파가죽 감싸기\n\n - 스웨이드 내장재\n\n - 도어트림 리얼 알루미늄 가니쉬\n\n - 고급 카매트";
                sit = "\n\n시트 \n\n - 프라임 나파 가죽시트\n\n - 동승석 전동 조절(8way) & 전동식 럼버서포트(2way)";
                convenience = "\n\n편의 \n\n - 블루링크(텔레메틱스 시스템)";
                multi = "\n\n멀티미디어 \n\n - JBL 프리미엄 사운드 시스템(12스피커, 외장앰프)\n\n - CDP";
                session.send("[" + args.model + " " + args.trim + "] 기본 옵션 입니다.");
                session.send(modelTrim + "가솔린 3.0 익스클루시브 스페셜 기본 사양 및 \n\n" + powerTrain + performance + outSide + inSide + sit + convenience + multi);
            }
            
            var nextBtn = new builder.Message(session)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments([
                new builder.HeroCard(session)
                        .title("선택옵션도 보여드릴까요?")
                        .buttons([
                    builder.CardAction.imBack(session, args.model + " " + args.trim + " 선택품목", "예"),
                    builder.CardAction.imBack(session, "홈", "아니오")
                ])
            ]);
            //builder.Prompts.choice(session, nextBtn, args.model + " " + args.trim + " 기본품목|홈", { listStyle: builder.ListStyle.button });
            builder.Prompts.choice(session, nextBtn, "선택품목|홈", { listStyle: builder.ListStyle.button });
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
    3-2. 한국어 가격 메뉴 (선택옵션 리스트)
    ************************************************************************************/
    bot.dialog('/korPriceSelectOptionList', [
        function (session, args) {
            var model = args.model;
            var trim = args.trim;
            var selectItem1;
            var selectItem2;
            var selectItem3;
            var selectItem4;
            var selectItem5;
            var selectItem6;
            var selectItem7;
            var options;
            
            session.send(args.model + " " + args.trim + " 선택 옵션은 다음과 같습니다. \n\n 선택하시면 옵션이 추가 됩니다.");

            if (args.trim == "모던") {
                options = [new builder.HeroCard(session)
                    .title(args.model + " " + args.trim + " 선택옵션")
                    .buttons([
                        builder.CardAction.imBack(session, model + " " + trim + " 앞좌석 통풍+하이패스 시스템 추가", "앞좌석 통풍+하이패스 시스템"),
                        builder.CardAction.imBack(session, model + " " + trim + " TUIX 컴포트 패키지 추가", "TUIX 컴포트 패키지"),
                        builder.CardAction.imBack(session, model + " " + trim + " 파노라마 썬루프 추가", "파노라마 썬루프"),
                        builder.CardAction.imBack(session, model + " " + trim + " 현대 스마트 센스 패키지IV 추가", "현대 스마트 센스 패키지IV")
                    ])];
            } else if (args.trim == "프리미엄") {
                options = [new builder.HeroCard(session)
                    .title(args.model + " " + args.trim + " 선택옵션")
                    .buttons([
                        builder.CardAction.imBack(session, model + " " + trim + " 익스테리어 패키지I 추가", "익스테리어 패키지I"),
                        builder.CardAction.imBack(session, model + " " + trim + " TUIX 컴포트 패키지 추가", "TUIX 컴포트 패키지"),
                        builder.CardAction.imBack(session, model + " " + trim + " 파노라마 썬루프 추가", "파노라마 썬루프"),
                        builder.CardAction.imBack(session, model + " " + trim + " 헤드업 디스플레이(HUD) 추가", "헤드업 디스플레이(HUD)"),
                        builder.CardAction.imBack(session, model + " " + trim + " 현대 스마트 센스 패키지I 추가", "현대 스마트 센스 패키지I")
                    ])];
            } else if (args.trim == "프리미엄 스페셜" || args.trim == "프리미엄스페셜") {
                options = [new builder.HeroCard(session)
                    .title(args.model + " " + args.trim + " 선택옵션")
                    .buttons([
                        builder.CardAction.imBack(session, model + " " + trim + " 어라운드 뷰 모니터(AVM) + 스마트 전동식 트렁크 추가", "어라운드 뷰 모니터(AVM) + 스마트 전동식 트렁크"),
                        builder.CardAction.imBack(session, model + " " + trim + " 익스테리어 패키지II 추가", "익스테리어 패키지II"),
                        builder.CardAction.imBack(session, model + " " + trim + " TUIX 컴포트 패키지 추가", "TUIX 컴포트 패키지"),
                        builder.CardAction.imBack(session, model + " " + trim + " 파노라마 썬루프 추가", "파노라마 썬루프"),
                        builder.CardAction.imBack(session, model + " " + trim + " 헤드업 디스플레이(HUD) 추가", "헤드업 디스플레이(HUD)"),
                        builder.CardAction.imBack(session, model + " " + trim + " 현대 스마트 센스 패키지II 추가", "현대 스마트 센스 패키지II"),
                        builder.CardAction.imBack(session, model + " " + trim + " JBL 사운드 패키지 추가", "JBL 사운드 패키지")
                    ])];
            } else if (args.trim == "익스클루시브") {
                options = [new builder.HeroCard(session)
                    .title(args.model + " " + args.trim + " 선택옵션")
                    .buttons([
                        builder.CardAction.imBack(session, model + " " + trim + " 어라운드 뷰 모니터(AVM) + 스마트 전동식 트렁크 추가", "어라운드 뷰 모니터(AVM) + 스마트 전동식 트렁크"),
                        builder.CardAction.imBack(session, model + " " + trim + " 익스테리어 패키지II 추가", "익스테리어 패키지II"),
                        builder.CardAction.imBack(session, model + " " + trim + " TUIX 컴포트 패키지 추가", "TUIX 컴포트 패키지"),
                        builder.CardAction.imBack(session, model + " " + trim + " 파노라마 썬루프 추가", "파노라마 썬루프"),
                        builder.CardAction.imBack(session, model + " " + trim + " 헤드업 디스플레이(HUD) 추가", "헤드업 디스플레이(HUD)"),
                        builder.CardAction.imBack(session, model + " " + trim + " 현대 스마트 센스 패키지II 추가", "현대 스마트 센스 패키지II")
                    ])];
            } else if (args.trim == "익스클루시브 스페셜" || args.trim == "익스클루시브스페셜") {
                options = [new builder.HeroCard(session)
                    .title(args.model + " " + args.trim + " 선택옵션")
                    .buttons([
                        builder.CardAction.imBack(session, model + " " + trim + " TUIX 컴포트 패키지 추가", "TUIX 컴포트 패키지"),
                        builder.CardAction.imBack(session, model + " " + trim + " 파노라마 썬루프 추가", "파노라마 썬루프"),
                        builder.CardAction.imBack(session, model + " " + trim + " 프리미어 인테리어 셀렉션 추가", "프리미어 인테리어 셀렉션"),
                        builder.CardAction.imBack(session, model + " " + trim + " 헤드업 디스플레이(HUD) 추가", "헤드업 디스플레이(HUD)"),
                        builder.CardAction.imBack(session, model + " " + trim + " 현대 스마트 센스 패키지II 추가", "현대 스마트 센스 패키지II"),
                        builder.CardAction.imBack(session, model + " " + trim + " JBL 사운드 패키지 추가", "JBL 사운드 패키지")
                    ])];
            } else if (args.trim == "셀러브리티") {
                options = [new builder.HeroCard(session)
                    .title(args.model + " " + args.trim + " 선택옵션")
                    .buttons([
                        builder.CardAction.imBack(session, model + " " + trim + " TUIX 컴포트 패키지 추가", "TUIX 컴포트 패키지"),
                        builder.CardAction.imBack(session, model + " " + trim + " 파노라마 썬루프 추가", "파노라마 썬루프"),
                        builder.CardAction.imBack(session, model + " " + trim + " 헤드업 디스플레이(HUD) 추가", "헤드업 디스플레이(HUD)"),
                        builder.CardAction.imBack(session, model + " " + trim + " 현대 스마트 센스 패키지II 추가", "현대 스마트 센스 패키지II")
                    ])];
            }
            var msg = new builder.Message(session).attachmentLayout(builder.AttachmentLayout.carousel).attachments(options);
            builder.Prompts.choice(session, msg, "BTN1|BTN|2|BTN3|BTN4|BTN5|BTN6");
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
    3-2-1. 한국어 가격 메뉴 (선택옵션 가격표)
    ************************************************************************************/
    bot.dialog('/korPriceRecipt', [
        function (session, args, next) {
            //session.send("선택하신 차량의 산출 가격 입니다.");
            //session.send("선택하신 옵션을 제거를 원하실 경우 \n\n [ 예 : 가솔린 2.4 모던 파노라마썬루프 삭제 ] 명령어를 입력하시면 \n\n 옵션이 빠진 가격을 보실수 있습니다.");
            
            console.log("user insert : " + session.message.text);
            var userId = userId;
            
            var tasks = [
                function (callback) {
                    var returnData;
                    tp.setConnectionConfig(config);
                    tp.sql("SELECT OPTION_NUMBER, OPTION_NAME, OPTION_PRICE " 
                        + "FROM dbo.TBL_MODEL_CUSTOMER_SELECTED TMCS, dbo.TBL_OPTION_DEF TOD " 
                        + "WHERE TMCS.MODEL_NUMBER = TOD.MODEL_NUMBER " 
                        + "AND TMCS.USER_ID=@USERID " 
                        + "ORDER BY OPTION_NUMBER "
                    )
                        .parameter('USERID', TYPES.NVarChar, userId)
                        .execute()
                        .then(function (results) {
                        console.log("select TBL_OPTION_DEF success!!!!");
                        callback(null, results);
                    }).fail(function (err) {
                        console.log(err);
                    });
                },
                function (callback) {
                    tp.sql("SELECT MODEL_NUMBER, OPTION1, OPTION2, OPTION3, OPTION4, OPTION5, OPTION6, OPTION7, OPTION8, OPTION9 " 
                    + "FROM dbo.TBL_MODEL_CUSTOMER_SELECTED " 
                    + "WHERE USER_ID=@USERID "
                    )
                        .parameter('USERID', TYPES.NVarChar, userId)
                        .execute()
                        .then(function (results) {
                        console.log("select TBL_MODEL_CUSTOMER_SELECTED success!!!!");
                        callback(null, results);
                    }).fail(function (err) {
                        console.log(err);
                    });
                }
            ];
            
            async.series(tasks, function (err, results) {
                
                //선택된 옵션 갯수
                var optionCnt = 0;
                var numberTemp = [];
                for (var i = 1; i < 10; i++) {
                    console.log("results[1][0].OPTION" + i + " ::: " + eval("results[1][0].OPTION" + i));
                    if (eval("results[1][0].OPTION" + i)) {
                        optionCnt++;
                        
                        //OPTION_NUMBER check
                        numberTemp.push(i);
                    }
                }
                
                //선택된 옵션명 + 가격
                var optionPrice = 0;
                var total = 0;
                var itemsTemp = [];
                var priceTemp = [];
                var tmp = 1;
                for (var i = 0; i < optionCnt; i++) {
                    console.log(typeof numberTemp[i]);
                    itemsTemp.push(results[0][numberTemp[i] - 1].OPTION_NAME);
                    priceTemp.push(results[0][numberTemp[i] - 1].OPTION_PRICE);
                    optionPrice = optionPrice + results[0][numberTemp[i] - 1].OPTION_PRICE;
                }
                console.log(" itemTemp ::: " + itemsTemp);
                console.log(" priceTemp ::: " + priceTemp);
                console.log(typeof args.carPrice);
                console.log(typeof optionPrice);
                total = parseInt(args.carPrice) + optionPrice;
                total = number_format(total);
                
                //선택된 옵션만 담기
                var items;
                /*for (var j = 0; j < optionCnt; j++) {
                    console.log("name :::: " + itemsTemp[j].name);
                    console.log("price :::: " + priceTemp[j].price);
                }*/
                if (optionCnt == 0) {
                    items = [builder.ReceiptItem.create(session, number_format(args.carPrice) + " 원", args.model + " " + args.trim),];
                } else if (optionCnt == 1) {
                    items = [builder.ReceiptItem.create(session, number_format(args.carPrice) + " 원", args.model + " " + args.trim),
                        builder.ReceiptItem.create(session, number_format(priceTemp[0]) + " 원", itemsTemp[0])];
                } else if (optionCnt == 2) {
                    items = [builder.ReceiptItem.create(session, number_format(args.carPrice) + " 원", args.model + " " + args.trim),
                        builder.ReceiptItem.create(session, number_format(priceTemp[0]) + " 원", itemsTemp[0]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[1]) + " 원", itemsTemp[1])];
                } else if (optionCnt == 3) {
                    items = [builder.ReceiptItem.create(session, number_format(args.carPrice) + " 원", args.model + " " + args.trim),
                        builder.ReceiptItem.create(session, number_format(priceTemp[0]) + " 원", itemsTemp[0]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[1]) + " 원", itemsTemp[1]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[2]) + " 원", itemsTemp[2])];
                } else if (optionCnt == 4) {
                    items = [builder.ReceiptItem.create(session, number_format(args.carPrice) + " 원", args.model + " " + args.trim),
                        builder.ReceiptItem.create(session, number_format(priceTemp[0]) + " 원", itemsTemp[0]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[1]) + " 원", itemsTemp[1]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[2]) + " 원", itemsTemp[2]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[3]) + " 원", itemsTemp[3])];
                } else if (optionCnt == 5) {
                    items = [builder.ReceiptItem.create(session, number_format(args.carPrice) + " 원", args.model + " " + args.trim),
                        builder.ReceiptItem.create(session, number_format(priceTemp[0]) + " 원", itemsTemp[0]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[1]) + " 원", itemsTemp[1]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[2]) + " 원", itemsTemp[2]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[3]) + " 원", itemsTemp[3]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[4]) + " 원", itemsTemp[4])];
                } else if (optionCnt == 6) {
                    items = [builder.ReceiptItem.create(session, number_format(args.carPrice) + " 원", args.model + " " + args.trim),
                        builder.ReceiptItem.create(session, number_format(priceTemp[0]) + " 원", itemsTemp[0]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[1]) + " 원", itemsTemp[1]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[2]) + " 원", itemsTemp[2]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[3]) + " 원", itemsTemp[3]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[4]) + " 원", itemsTemp[4]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[5]) + " 원", itemsTemp[5])];
                } else if (optionCnt == 7) {
                    items = [builder.ReceiptItem.create(session, number_format(args.carPrice) + " 원", args.model + " " + args.trim),
                        builder.ReceiptItem.create(session, number_format(priceTemp[0]) + " 원", itemsTemp[0]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[1]) + " 원", itemsTemp[1]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[2]) + " 원", itemsTemp[2]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[3]) + " 원", itemsTemp[3]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[4]) + " 원", itemsTemp[4]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[5]) + " 원", itemsTemp[5]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[6]) + " 원", itemsTemp[6])];
                } else if (optionCnt == 8) {
                    items = [builder.ReceiptItem.create(session, number_format(args.carPrice) + " 원", args.model + " " + args.trim),
                        builder.ReceiptItem.create(session, number_format(priceTemp[0]) + " 원", itemsTemp[0]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[1]) + " 원", itemsTemp[1]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[2]) + " 원", itemsTemp[2]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[3]) + " 원", itemsTemp[3]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[4]) + " 원", itemsTemp[4]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[5]) + " 원", itemsTemp[5]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[6]) + " 원", itemsTemp[6]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[7]) + " 원", itemsTemp[7])];
                } else if (optionCnt == 9) {
                    items = [builder.ReceiptItem.create(session, number_format(args.carPrice) + " 원", args.model + " " + args.trim),
                        builder.ReceiptItem.create(session, number_format(priceTemp[0]) + " 원", itemsTemp[0]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[1]) + " 원", itemsTemp[1]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[2]) + " 원", itemsTemp[2]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[3]) + " 원", itemsTemp[3]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[4]) + " 원", itemsTemp[4]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[5]) + " 원", itemsTemp[5]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[6]) + " 원", itemsTemp[6]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[7]) + " 원", itemsTemp[7]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[8]) + " 원", itemsTemp[8])];
                }
                
                var msg = new builder.Message(session)
                    .attachments([
                    new builder.ReceiptCard(session)
                            .title(args.model + " " + args.trim)
                            .items(items)
                            .facts([
                        builder.Fact.create(session, "(단위 : 원)", "2017년 3월 30일 기준")
                    ])
                            .total(total + " 원")
                ]);
                session.send(msg);
                
                var nextBtn = new builder.Message(session)
                    .attachmentLayout(builder.AttachmentLayout.carousel)
                    .attachments([
                    new builder.HeroCard(session)
                            .title("다른 선택옵션을 추가 하시겠습니까?")
                            .buttons([
                        builder.CardAction.imBack(session, args.model + " " + args.trim + " " + "선택품목", "예"),
                        builder.CardAction.imBack(session, "홈", "아니오")
                    ])
                ]);
                builder.Prompts.choice(session, nextBtn, args.model + " " + args.trim + " " + "선택품목|홈", { listStyle: builder.ListStyle.button });
                session.endDialog();
                
            });
        }
    ]);
    
    
    
    
    
    bot.dialog('/korCompareModel', [
        function (session, args) {
            var compare1 = args.sendPrice[0];
            var compare2 = args.sendPrice[1];
            var msg;
            var price1;
            var price2;
            var title1 = null;
            var title2 = null;
            
            if (compare1 != null) {
                
                compare1 = compare1.replace(/ /gi, "");
                
                switch (compare1) {
                    case "가솔린2.4모던":
                        title1 = "가솔린2.4 모던";
                        price1 = "30,550,000";
                        break;
                    case "가솔린2.4프리미엄":
                        title1 = "가솔린2.4 프리미엄";
                        price1 = "31,750,000";
                        break;
                    case "가솔린2.4프리미엄스페셜":
                        title1 = "가솔린2.4 프리미엄스페셜";
                        price1 = "33,750,000";
                        break;
                    case "가솔린3.0익스클루시브":
                        title1 = "가솔린3.0 익스클루시브";
                        price1 = "35,500,000";
                        break;
                    case "가솔린3.0익스클루시브스페셜":
                        title1 = "가솔린3.0 익스클루시브스페셜";
                        price1 = "38,700,000";
                        break;
                    case "가솔린3.0익스클루시브스페셜프리미어인테리어셀렉션":
                        title1 = "가솔린3.0 익스클루시브스페셜프리미어인테리어셀렉션";
                        price1 = "40,200,000";
                        break;
                    case "가솔린3.3셀러브리티":
                        title1 = "가솔린3.3 셀러브리티";
                        price1 = "41,600,000";
                        break;
                    case "디젤2.2모던":
                        title1 = "디젤2.2 모던";
                        price1 = "33,550,000";
                        break;
                    case "디젤2.2프리미엄":
                        title1 = "디젤2.2 프리미엄";
                        price1 = "30,550,000";
                        break;
                    case "디젤2.2프리미엄스페셜":
                        title1 = "디젤2.2 프리미엄스페셜";
                        price1 = "35,500,000";
                        break;
                    case "가솔린2.4":
                        title1 = "가솔린2.4 모던";
                        price1 = "30,550,000";
                        break;
                    case "가솔린3.0":
                        title1 = "가솔린3.0 익스클루시브";
                        price1 = "35,500,000";
                        break;
                    case "가솔린3.3":
                        title1 = "가솔린3.3 셀러브리티";
                        price1 = "41,600,000";
                        break;
                    case "디젤2.2":
                        title1 = "디젤2.2 모던";
                        price1 = "33,550,000";
                        break;
                    default:
                        title1 = "가솔린2.4 모던";
                        price1 = "30,550,000";
                        break;
                }
            }
            
            if (compare2 != null) {
                
                compare2 = compare2.replace(/ /gi, "");
                
                switch (compare2) {
                    case "가솔린2.4모던":
                        title2 = "가솔린2.4 모던";
                        price2 = "30,550,000";
                        break;
                    case "가솔린2.4프리미엄":
                        title2 = "가솔린2.4 프리미엄";
                        price2 = "31,750,000";
                        break;
                    case "가솔린2.4프리미엄스페셜":
                        title2 = "가솔린2.4 프리미엄스페셜";
                        price2 = "33,750,000";
                        break;
                    case "가솔린3.0익스클루시브":
                        title2 = "가솔린3.0 익스클루시브";
                        price2 = "35,500,000";
                        break;
                    case "가솔린3.0익스클루시브스페셜":
                        title2 = "가솔린3.0 익스클루시브스페셜";
                        price2 = "38,700,000";
                        break;
                    case "가솔린3.0익스클루시브스페셜프리미어인테리어셀렉션":
                        title2 = "가솔린3.0 익스클루시브스페셜프리미어인테리어셀렉션";
                        price2 = "40,200,000";
                        break;
                    case "가솔린3.3셀러브리티":
                        title2 = "가솔린3.3 셀러브리티";
                        price2 = "41,600,000";
                        break;
                    case "디젤2.2모던":
                        title2 = "디젤2.2 모던";
                        price2 = "33,550,000";
                        break;
                    case "디젤2.2프리미엄":
                        title2 = "디젤2.2 프리미엄";
                        price2 = "30,550,000";
                        break;
                    case "디젤2.2프리미엄스페셜":
                        title2 = "디젤2.2 프리미엄스페셜";
                        price2 = "35,500,000";
                        break;
                    case "가솔린2.4":
                        title2 = "가솔린2.4 모던";
                        price2 = "30,550,000";
                        break;
                    case "가솔린3.0":
                        title2 = "가솔린3.0 익스클루시브";
                        price2 = "35,500,000";
                        break;
                    case "가솔린3.3":
                        title2 = "가솔린3.3 셀러브리티";
                        price2 = "41,600,000";
                        break;
                    case "디젤2.2":
                        title2 = "디젤2.2 모던";
                        price2 = "33,550,000";
                        break;
                    default:
                        title2 = "가솔린2.4 모던";
                        price2 = "30,550,000";
                        break;
                }
            }
            
           

            if (title1 != null && title2 != null) {
                
                session.send(title1 +"와 "+ title2 + "를 비교해드리겠습니다.");

                msg = new builder.Message(session)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments([
                    new builder.HeroCard(session)
            .title(title1)
            .text("가격 : " + price1 + "원")
            .images([
                        builder.CardImage.create(session, img_path + "/images/price/Grandeur_modern.PNG")
            .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_modern.PNG"))
                    ])
            .buttons([
                        builder.CardAction.imBack(session, title1 + " 기본품목", "기본 옵션 보기"),
                        builder.CardAction.imBack(session, title1 + " 선택품목", "선택 옵션 추가")
                    ]),
                    new builder.HeroCard(session)
            .title(title2)
            .text("가격 : " + price2 + "원")
            .images([
                        builder.CardImage.create(session, img_path + "/images/price/Grandeur_modern.PNG")
            .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_modern.PNG"))
                    ])
            .buttons([
                        builder.CardAction.imBack(session, title2 + " 기본품목", "기본 옵션 보기"),
                        builder.CardAction.imBack(session, title2 + " 선택품목", "선택 옵션 추가")
                    ])
                ]);
                
                session.endDialog(msg);
            } else {
                
                switch (args.intent) {
                    case "korCompareModel":
                        session.send("모델명이 정확하지 않아 모델을 비교 할수없어요. 모델명을 다시 확인해 주세요.");
                        break;
                    case "korCompareBeforeModel":
                        session.send("이전에 본 모델이 없어요. 모델을 보시고 비교해 주세요.");
                        break;
                    case "korCompareBeforeModels":
                        session.send("모델을 2개 이상 봐주세요 비교할 모델이 없어요.");
                        break;
                    default:
                        session.send("비교할 모델을 모르겠어요. 모델을 확인해 주세요.");
                }
                
                session.endDialog(msg);
                
            }
            responseTime = parseInt(date.getTime()) - parseInt(args.beginTime);
            query.insertHistoryQuery(args, responseTime, function (err, result) {
                if (!err) {
                    console.log("query.getData : " + result);
                }
            });
            
        }
    ]);
    
    /***********************************************************************************
   3-3-1. 한국어 옵션 추가
   ************************************************************************************/
    
    bot.dialog('/korOptionAdd', [
        function (session, args) {
            var fnResult = '';
            var fnResultsplit = '';
            var fnResultModel = '';
            var fnResultOption = '';
            var fnResultModelNm = '';
            var fnResultTrimNm = '';
            var fnResultCarPrice = 0;
            
            
            fnResult = optionNumChoice(session.message.text);
            fnResultsplit = fnResult.split('|');
            fnResultModel = fnResultsplit[0];
            fnResultOption = fnResultsplit[1];
            fnResultModelNm = fnResultsplit[2];
            fnResultTrimNm = fnResultsplit[3];
            fnResultCarPrice = fnResultsplit[4];
            fnResultOptionNm = fnResultsplit[5];
            
            console.log(fnResultsplit[5] + " fnResultsplit : "+ fnResultsplit.length);
            
            session.send(fnResultModelNm + " " + fnResultTrimNm +"에 [ "+ fnResultOptionNm+" ] 옵션을 추가한 가격입니다.");

            //functionOptionUpdate(userId, fnResultModel, fnResultOption, 1);
            
            //console.log(functionOptionUpdate(userId, fnResultModel, fnResultOption, 1));
            
            if (!functionOptionUpdate(userId, fnResultModel, fnResultOption, 1)) {
                
                
                session.endDialog();
                session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: userId, beginTime: date.getTime(), intent: "korPriceRecipt", tableNm: "insert_history", model: fnResultModelNm, trim: fnResultTrimNm , carPrice: fnResultCarPrice });
                
                responseTime = parseInt(date.getTime()) - parseInt(args.beginTime);
                query.insertHistoryQuery(args, responseTime, function (err, result) {
                    if (!err) {
                        console.log("query.getData : " + result);
                    }
                });
            
            }

            //session.endDialog();
            //session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: userId, beginTime: date.getTime(), intent: "korPriceRecipt", tableNm: "insert_history", model: fnResultModelNm, trim: fnResultTrimNm , carPrice: fnResultCarPrice});
            
            //responseTime = parseInt(date.getTime()) - parseInt(args.beginTime);
            //query.insertHistoryQuery(args, responseTime, function (err, result) {
            //    if (!err) {
            //        console.log("query.getData : " + result);
            //    }
            //});
        }
    ]);
    /***********************************************************************************
   3-3-2. 한국어 옵션 삭제
   ************************************************************************************/
    bot.dialog('/korOptionRemove', [
        function (session, args) {
            var fnResult = '';
            var fnResultsplit = '';
            var fnResultModel = '';
            var fnResultOption = '';
            var fnResultModelNm = '';
            var fnResultTrimNm = '';
            var fnResultCarPrice = 0;
            //session.send("옵션을 뺍니다.");
            
            fnResult = optionNumChoice(session.message.text);
            fnResultsplit = fnResult.split('|');
            fnResultModel = fnResultsplit[0];
            fnResultOption = fnResultsplit[1];
            fnResultModelNm = fnResultsplit[2];
            fnResultTrimNm = fnResultsplit[3];
            fnResultCarPrice = fnResultsplit[4];
            fnResultOptionNm = fnResultsplit[5];
            
            session.send(fnResultModelNm + " " + fnResultTrimNm + "에 [ " + fnResultOptionNm + " ] 옵션을 제거한 가격입니다.");

            functionOptionUpdate(userId, fnResultModel, fnResultOption, 0);
            
            
            session.endDialog();
            session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: userId, beginTime: date.getTime(), intent: "korPriceRecipt", tableNm: "insert_history", model: fnResultModelNm, trim: fnResultTrimNm , carPrice: fnResultCarPrice });
            
            responseTime = parseInt(date.getTime()) - parseInt(args.beginTime);
            query.insertHistoryQuery(args, responseTime, function (err, result) {
                if (!err) {
                    console.log("query.getData : " + result);
                }
            });
        }
    ]);
    /***********************************************************************************
    3-3-3 . 한국어 옵션 NUMBER 확인
    ************************************************************************************/
    function optionNumChoice(message) {
        
        var modelNameVar = "";
        var modelNumberVar = 0;
        var engineNameVar = "";
        var carPriceVar = 0;
        var optionNm = "";
        var modelOptionNumberVar = "";
        
        if (message.match(/가솔린 2.4/g) || message.match(/가솔린2.4/g) || message.match(/2.4/g)) {
            console.log("가솔린 2.4");
            engineNameVar = "가솔린 2.4";
            if (message.match(/모던/g) || message.match(/모 던/g)) {
                console.log("모던");
                
                modelNameVar = "모던";
                modelNumberVar = 1;
                carPriceVar = 30550000;
                
                if (message.match(/파노라마 썬루프/) || message.match(/파노라마썬루프/)) {
                    modelOptionNumberVar = 3;
                    optionNm = "파노라마 썬루프";
                } else if (message.match(/TUIX 컴포트 패키지/) || message.match(/TUIX 컴포트패키지/) || message.match(/TUIX컴포트패키지/) || message.match(/튜익스 컴포트 패키지/) || message.match(/튜익스 컴포트패키지/) || message.match(/튜익스컴포트패키지/)) {
                    modelOptionNumberVar = 2;
                    optionNm = "TUIX 컴포트 패키지";
                } else if (message.match(/앞좌석통풍/) || message.match(/앞좌석 통풍/) || message.match(/앞 좌석 통풍/)) {
                    modelOptionNumberVar = 1;
                    optionNm = "앞좌석 통풍+하이패스시스템";
                } else if (message.match(/하이패스 시스템/) || message.match(/하이패스시스템/) || message.match(/하이 패스 시스템/)) {
                    modelOptionNumberVar = 1;
                    optionNm = "앞좌석 통풍+하이패스시스템";
                } else if (message.match(/현대스마트센스패키지IV/) || message.match(/현대 스마트센스패키지IV/) || message.match(/현대 스마트 센스패키지IV/) || message.match(/현대 스마트 센스 패키지IV/) || message.match(/현대 스마트 센스 패키지 IV/)) {
                    modelOptionNumberVar = 4;
                    optionNm = "현대 스마트 센스 패키지 IV";
                } else {
                    modelOptionNumberVar = 0;
                }
            } else if (message.match(/프리미엄 스페셜/g) || message.match(/프리미엄스페셜/g)) {
                
                modelNameVar = "프리미엄 스페셜";
                modelNumberVar = 3;
                carPriceVar = 33750000;
                
                if (message.match(/파노라마 썬루프/) || message.match(/파노라마썬루프/)) {
                    modelOptionNumberVar = 4;
                    optionNm = "파노라마 썬루프";
                } else if (message.match(/TUIX 컴포트 패키지/) || message.match(/TUIX 컴포트패키지/) || message.match(/TUIX컴포트패키지/) || message.match(/튜익스 컴포트 패키지/) || message.match(/튜익스 컴포트패키지/) || message.match(/튜익스컴포트패키지/)) {
                    modelOptionNumberVar = 3;
                    optionNm = "TUIX 컴포트 패키지";
                } else if (message.match(/헤드업디스플레이(HUD)/) || message.match(/헤드업 디스플레이(HUD)/) || message.match(/헤드업 디스플레이 (HUD)/) || message.match(/헤드업디스플레이/) || message.match(/헤드업 디스플레이/) || message.match(/HUD/)) {
                    modelOptionNumberVar = 5;
                    optionNm = "헤드업 디스플레이(HUD)";
                } else if (message.match(/현대스마트센스패키지II/) || message.match(/현대 스마트센스패키지II/) || message.match(/현대 스마트 센스패키지II/) || message.match(/현대 스마트 센스 패키지II/) || message.match(/현대 스마트 센스 패키지 II/)) {
                    modelOptionNumberVar = 6;
                    optionNm = "현대 스마트 센스 패키지 II";
                } else if (message.match(/익스테리어패키지II/) || message.match(/익스테리어 패키지II/) || message.match(/익스테리어 패키지 II/) || message.match(/익스테리어패키지 II/)) {
                    modelOptionNumberVar = 2;
                    optionNm = "익스테리어 패키지 II";
                } else if (message.match(/JBL사운드패키지/) || message.match(/JBL 사운드패키지/) || message.match(/JBL 사운드 패키지/)) {
                    modelOptionNumberVar = 7;
                    optionNm = "JBL 사운드 패키지";
                } else if (message.match(/어라운드뷰모니터(AVM)/) || message.match(/어라운드 뷰모니터(AVM)/) || message.match(/어라운드 뷰 모니터(AVM)/) || message.match(/어라운드 뷰 모니터 (AVM)/)) {
                    modelOptionNumberVar = 1;
                    optionNm = "어라운드 뷰 모니터(AVM) + 스마트 전동식 트렁크";
                } else if (message.match(/스마트전동식트렁크/) || message.match(/스마트 전동식트렁크/) || message.match(/스마트 전동식 트렁크/) || message.match(/스마트전동식 트렁크/)) {
                    modelOptionNumberVar = 1;
                    optionNm = "어라운드 뷰 모니터(AVM) + 스마트 전동식 트렁크";
                } else {
                    modelOptionNumberVar = 0;
                }
            } else if (message.match(/프리미엄/)) {
                
                modelNameVar = "프리미엄";
                modelNumberVar = 2;
                carPriceVar = 31750000;
                
                if (message.match(/파노라마 썬루프/) || message.match(/파노라마썬루프/)) {
                    modelOptionNumberVar = 3;
                    optionNm = "파노라마 썬루프";
                } else if (message.match(/TUIX 컴포트 패키지/) || message.match(/TUIX 컴포트패키지/) || message.match(/TUIX컴포트패키지/) || message.match(/튜익스 컴포트 패키지/) || message.match(/튜익스 컴포트패키지/) || message.match(/튜익스컴포트패키지/)) {
                    modelOptionNumberVar = 2;
                    optionNm = "TUIX 컴포트 패키지";
                } else if (message.match(/헤드업디스플레이(HUD)/) || message.match(/헤드업 디스플레이(HUD)/) || message.match(/헤드업 디스플레이 (HUD)/) || message.match(/헤드업디스플레이/) || message.match(/헤드업 디스플레이/) || message.match(/HUD/)) {
                    modelOptionNumberVar = 4;
                    optionNm = "헤드업 디스플레이(HUD)";
                } else if (message.match(/현대스마트센스패키지I/) || message.match(/현대 스마트센스패키지I/) || message.match(/현대 스마트 센스패키지I/) || message.match(/현대 스마트 센스 패키지I/) || message.match(/현대 스마트 센스 패키지 I/)) {
                    modelOptionNumberVar = 5;
                    optionNm = "현대 스마트 센스 패키지 I";
                } else if (message.match(/익스테리어패키지I/) || message.match(/익스테리어 패키지I/) || message.match(/익스테리어 패키지 I/) || message.match(/익스테리어패키지 I/)) {
                    modelOptionNumberVar = 1;
                    optionNm = "익스테리어 패키지 I";
                } else {
                    modelOptionNumberVar = 0;
                }
            }
        } else if (message.match(/가솔린 3.0/) || message.match(/가솔린3.0/)) {
            
            engineNameVar = "가솔린 3.0";
            
            if (message.match(/익스클루시브 스페셜/) || message.match(/익스클루시브스페셜/)) {
                
                modelNameVar = "익스클루시브 스페셜";
                modelNumberVar = 5;
                carPriceVar = 38700000;
                
                if (message.match(/파노라마 썬루프/) || message.match(/파노라마썬루프/)) {
                    modelOptionNumberVar = 2;
                    optionNm = "파노라마 썬루프";
                } else if (message.match(/TUIX 컴포트 패키지/) || message.match(/TUIX 컴포트패키지/) || message.match(/TUIX컴포트패키지/) || message.match(/튜익스 컴포트 패키지/) || message.match(/튜익스 컴포트패키지/) || message.match(/튜익스컴포트패키지/)) {
                    modelOptionNumberVar = 1;
                    optionNm = "TUIX 컴포트 패키지";
                } else if (message.match(/헤드업디스플레이(HUD)/) || message.match(/헤드업 디스플레이(HUD)/) || message.match(/헤드업 디스플레이 (HUD)/) || message.match(/헤드업디스플레이/) || message.match(/헤드업 디스플레이/) || message.match(/HUD/)) {
                    modelOptionNumberVar = 4;
                    optionNm = "헤드업 디스플레이(HUD)";
                } else if (message.match(/현대스마트센스패키지II/) || message.match(/현대 스마트센스패키지II/) || message.match(/현대 스마트 센스패키지II/) || message.match(/현대 스마트 센스 패키지II/) || message.match(/현대 스마트 센스 패키지 II/)) {
                    modelOptionNumberVar = 5;
                    optionNm = "현대 스마트 센스 패키지 II";
                } else if (message.match(/JBL사운드패키지/) || message.match(/JBL 사운드패키지/) || message.match(/JBL 사운드 패키지/)) {
                    modelOptionNumberVar = 6;
                    optionNm = "JBL 사운드 패키지";
                } else if (message.match(/프리미어인테리어셀렉션/) || message.match(/프리미어 인테리어셀렉션/) || message.match(/프리미어 인테리어 셀렉션/)) {
                    //session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: userId, beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 3.0", trim: "익스클루시브 스페셜", carPrice: 38700000, selectOption1: "프리미어 인테리어 셀렉션", optionPrice1: 1500000 });
                    modelOptionNumberVar = 3;
                    optionNm = "프리미어 인테리어 셀렉션";
                } else {
                    modelOptionNumberVar = 0;
                }
            } else if (message.match(/익스클루시브/)) {
                
                modelNameVar = "익스클루시브";
                modelNumberVar = 4;
                carPriceVar = 35500000;
                
                if (message.match(/파노라마 썬루프/) || message.match(/파노라마썬루프/)) {
                    modelOptionNumberVar = 4;
                    optionNm = "파노라마 썬루프";
                } else if (message.match(/TUIX 컴포트 패키지/) || message.match(/TUIX 컴포트패키지/) || message.match(/TUIX컴포트패키지/) || message.match(/튜익스 컴포트 패키지/) || message.match(/튜익스 컴포트패키지/) || message.match(/튜익스컴포트패키지/)) {
                    modelOptionNumberVar = 3;
                    optionNm = "TUIX 컴포트 패키지";
                } else if (message.match(/헤드업디스플레이(HUD)/) || message.match(/헤드업 디스플레이(HUD)/) || message.match(/헤드업 디스플레이 (HUD)/) || message.match(/헤드업디스플레이/) || message.match(/헤드업 디스플레이/) || message.match(/HUD/)) {
                    modelOptionNumberVar = 5;
                    optionNm = "헤드업 디스플레이(HUD)";
                } else if (message.match(/현대스마트센스패키지II/) || message.match(/현대 스마트센스패키지II/) || message.match(/현대 스마트 센스패키지II/) || message.match(/현대 스마트 센스 패키지II/) || message.match(/현대 스마트 센스 패키지 II/)) {
                    modelOptionNumberVar = 6;
                    optionNm = "현대 스마트 센스 패키지 II";
                } else if (message.match(/익스테리어패키지II/) || message.match(/익스테리어 패키지II/) || message.match(/익스테리어 패키지 II/) || message.match(/익스테리어패키지 II/)) {
                    modelOptionNumberVar = 2;
                    optionNm = "익스테리어 패키지 II";
                } else if (message.match(/어라운드뷰모니터(AVM)/) || message.match(/어라운드 뷰모니터(AVM)/) || message.match(/어라운드 뷰 모니터(AVM)/) || message.match(/어라운드 뷰 모니터 (AVM)/)) {
                    modelOptionNumberVar = 1;
                    optionNm = "어라운드 뷰 모니터(AVM) + 스마트 전동식 트렁크";
                } else if (message.match(/스마트전동식트렁크/) || message.match(/스마트 전동식트렁크/) || message.match(/스마트 전동식 트렁크/) || message.match(/스마트전동식 트렁크/)) {
                    modelOptionNumberVar = 1;
                    optionNm = "어라운드 뷰 모니터(AVM) + 스마트 전동식 트렁크";
                } else {
                    modelOptionNumberVar = 0;
                }
            }

        } else if (message.match(/가솔린 3.3/) || message.match(/가솔린3.3/)) {
            
            engineNameVar = "가솔린 3.3";
            
            if (message.match(/셀러브리티/)) {
                
                modelNameVar = "셀러브리티";
                modelNumberVar = 7;
                carPriceVar = 41600000;
                
                if (message.match(/파노라마 썬루프/) || message.match(/파노라마썬루프/)) {
                    modelOptionNumberVar = 2;
                    optionNm = "파노라마 썬루프";
                } else if (message.match(/TUIX 컴포트 패키지/) || message.match(/TUIX 컴포트패키지/) || message.match(/TUIX컴포트패키지/) || message.match(/튜익스 컴포트 패키지/) || message.match(/튜익스 컴포트패키지/) || message.match(/튜익스컴포트패키지/)) {
                    modelOptionNumberVar = 1;
                    optionNm = "TUIX 컴포트 패키지";
                } else if (message.match(/헤드업디스플레이(HUD)/) || message.match(/헤드업 디스플레이(HUD)/) || message.match(/헤드업 디스플레이 (HUD)/) || message.match(/헤드업디스플레이/) || message.match(/헤드업 디스플레이/) || message.match(/HUD/)) {
                    modelOptionNumberVar = 3;
                    optionNm = "헤드업 디스플레이(HUD)";
                } else if (message.match(/현대스마트센스패키지II/) || message.match(/현대 스마트센스패키지II/) || message.match(/현대 스마트 센스패키지II/) || message.match(/현대 스마트 센스 패키지II/) || message.match(/현대 스마트 센스 패키지 II/)) {
                    modelOptionNumberVar = 4;
                    optionNm = "현대 스마트 센스 패키지 II";
                } else {
                    modelOptionNumberVar = 0;
                }
            } else if (message.match(/디젤 2.2/) || message.match(/디젤2.2/)) {
                
                engineNameVar = "디젤 2.2";
                
                if (message.match(/모던/)) {
                    
                    modelNameVar = "모던";
                    modelNumberVar = 8;
                    carPriceVar = 33550000;
                    
                    if (message.match(/파노라마 썬루프/) || message.match(/파노라마썬루프/)) {
                        modelOptionNumberVar = 3;
                        optionNm = "파노라마 썬루프";
                    } else if (message.match(/TUIX 컴포트 패키지/) || message.match(/TUIX 컴포트패키지/) || message.match(/TUIX컴포트패키지/) || message.match(/튜익스 컴포트 패키지/) || message.match(/튜익스 컴포트패키지/) || message.match(/튜익스컴포트패키지/)) {
                        modelOptionNumberVar = 2;
                        optionNm = "TUIX 컴포트 패키지";
                    } else if (message.match(/앞좌석통풍/) || message.match(/앞좌석 통풍/) || message.match(/앞 좌석 통풍/)) {
                        modelOptionNumberVar = 1;
                        optionNm = "앞좌석 통풍+하이패스시스템";
                    } else if (message.match(/하이패스 시스템/) || message.match(/하이패스시스템/) || message.match(/하이 패스 시스템/)) {
                        modelOptionNumberVar = 1;
                        optionNm = "앞좌석 통풍+하이패스시스템";
                    } else if (message.match(/현대스마트센스패키지IV/) || message.match(/현대 스마트센스패키지IV/) || message.match(/현대 스마트 센스패키지IV/) || message.match(/현대 스마트 센스 패키지IV/) || message.match(/현대 스마트 센스 패키지 IV/)) {
                        modelOptionNumberVar = 4;
                        optionNm = "현대 스마트 센스 패키지 IV";
                    } else {
                        modelOptionNumberVar = 0;
                    }
                } else if (message.match(/프리미엄 스페셜/g) || message.match(/프리미엄스페셜/g)) {
                    
                    modelNameVar = "프리미엄 스페셜";
                    modelNumberVar = 10;
                    carPriceVar = 36750000;
                    
                    if (message.match(/파노라마 썬루프/) || message.match(/파노라마썬루프/)) {
                        modelOptionNumberVar = 4;
                        optionNm = "파노라마 썬루프";
                    } else if (message.match(/TUIX 컴포트 패키지/) || message.match(/TUIX 컴포트패키지/) || message.match(/TUIX컴포트패키지/) || message.match(/튜익스 컴포트 패키지/) || message.match(/튜익스 컴포트패키지/) || message.match(/튜익스컴포트패키지/)) {
                        modelOptionNumberVar = 3;
                        optionNm = "TUIX 컴포트 패키지";
                    } else if (message.match(/헤드업디스플레이(HUD)/) || message.match(/헤드업 디스플레이(HUD)/) || message.match(/헤드업 디스플레이 (HUD)/) || message.match(/헤드업디스플레이/) || message.match(/헤드업 디스플레이/) || message.match(/HUD/)) {
                        modelOptionNumberVar = 5;
                        optionNm = "헤드업 디스플레이(HUD)";
                    } else if (message.match(/현대스마트센스패키지II/) || message.match(/현대 스마트센스패키지II/) || message.match(/현대 스마트 센스패키지II/) || message.match(/현대 스마트 센스 패키지II/) || message.match(/현대 스마트 센스 패키지 II/)) {
                        modelOptionNumberVar = 6;
                        optionNm = "현대 스마트 센스 패키지 II";
                    } else if (message.match(/익스테리어패키지II/) || message.match(/익스테리어 패키지II/) || message.match(/익스테리어 패키지 II/) || message.match(/익스테리어패키지 II/)) {
                        modelOptionNumberVar = 2;
                        optionNm = "익스테리어 패키지 II";
                    } else if (message.match(/JBL사운드패키지/) || message.match(/JBL 사운드패키지/) || message.match(/JBL 사운드 패키지/)) {
                        modelOptionNumberVar = 7;
                        optionNm = "JBL 사운드 패키지";
                    } else if (message.match(/어라운드뷰모니터(AVM)/) || message.match(/어라운드 뷰모니터(AVM)/) || message.match(/어라운드 뷰 모니터(AVM)/) || message.match(/어라운드 뷰 모니터 (AVM)/)) {
                        modelOptionNumberVar = 1;
                        optionNm = "어라운드 뷰 모니터(AVM) + 스마트 전동식 트렁크";
                    } else if (message.match(/스마트전동식트렁크/) || message.match(/스마트 전동식트렁크/) || message.match(/스마트 전동식 트렁크/) || message.match(/스마트전동식 트렁크/)) {
                        modelOptionNumberVar = 1;
                        optionNm = "어라운드 뷰 모니터(AVM) + 스마트 전동식 트렁크";
                    } else {
                        modelOptionNumberVar = 0;
                    }
                } else if (message.match(/프리미엄/)) {
                    
                    modelNameVar = "프리미엄";
                    modelNumberVar = 9;
                    carPriceVar = 34750000;
                    
                    if (message.match(/파노라마 썬루프/) || message.match(/파노라마썬루프/)) {
                        modelOptionNumberVar = 3;
                        optionNm = "파노라마 썬루프";
                    } else if (message.match(/TUIX 컴포트 패키지/) || message.match(/TUIX 컴포트패키지/) || message.match(/TUIX컴포트패키지/) || message.match(/튜익스 컴포트 패키지/) || message.match(/튜익스 컴포트패키지/) || message.match(/튜익스컴포트패키지/)) {
                        modelOptionNumberVar = 2;
                        optionNm = "TUIX 컴포트 패키지";
                    } else if (message.match(/헤드업디스플레이(HUD)/) || message.match(/헤드업 디스플레이(HUD)/) || message.match(/헤드업 디스플레이 (HUD)/) || message.match(/헤드업디스플레이/) || message.match(/헤드업 디스플레이/) || message.match(/HUD/)) {
                        modelOptionNumberVar = 4;
                        optionNm = "헤드업 디스플레이(HUD)";
                    } else if (message.match(/현대스마트센스패키지I/) || message.match(/현대 스마트센스패키지I/) || message.match(/현대 스마트 센스패키지I/) || message.match(/현대 스마트 센스 패키지I/) || message.match(/현대 스마트 센스 패키지 I/)) {
                        modelOptionNumberVar = 5;
                        optionNm = "현대 스마트 센스 패키지 I";
                    } else if (message.match(/익스테리어패키지I/) || message.match(/익스테리어 패키지I/) || message.match(/익스테리어 패키지 I/) || message.match(/익스테리어패키지 I/)) {
                        modelOptionNumberVar = 1;
                        optionNm = "익스테리어 패키지 I";
                    } else {
                        modelOptionNumberVar = 0;
                    }
                }

            }
        }
        console.log("OPTION : "+ modelNumberVar + '|' + modelOptionNumberVar + "|" + engineNameVar + "|" + modelNameVar + "|" + carPriceVar + "|" + optionNm);
        
        return modelNumberVar + '|' + modelOptionNumberVar + "|" + engineNameVar + "|" + modelNameVar + "|" + carPriceVar + "|" + optionNm;

    }
    /***********************************************************************************
    3-3-4 . 옵션 업데이트
    ************************************************************************************/
    function functionOptionUpdate(userID, modelNum, optionNum, val) {
        var statusTask = [
            function (callback) {
                var tableName = "OPTION" + optionNum;
                tp.setConnectionConfig(config);
                
                tp.sql("UPDATE TBL_MODEL_CUSTOMER_SELECTED SET " + tableName + " = @val WHERE USER_ID = @userID AND MODEL_NUMBER = @modelNum")

                    .parameter('userID', TYPES.NVarChar, userID)
                    .parameter('modelNum', TYPES.NVarChar, modelNum)
                    .parameter('val', TYPES.NVarChar, val)
                    .execute()

                    .then(function (results) {
                    console.log("TBL_MODEL_CUSTOMER_SELECTED UPDATE Success!!!!");
                    callback(null, results);
                }).fail(function (err) {
                    console.log(err);
                });
            }
        ];
        
        async.series(statusTask, function (err, results) {
            
            var statusMerge;
            
            console.log("UPDATE Result : " + results[0]);
        });
        
        return false;
    }



}

// 자동으로 콤마 넣기 
function number_format(num) {
    var num_str = num.toString();
    var result = '';
    
    for (var i = 0; i < num_str.length; i++) {
        var tmp = num_str.length - (i + 1);
        if (i % 3 == 0 && i != 0) result = ',' + result;
        result = num_str.charAt(tmp) + result;
    }
    
    return result;
} 


module.exports = {
    create
}