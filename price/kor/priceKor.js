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
           
            var modelTrim;
            var powerTrain;
            var performance;
            var safety;
            var outSide;
            var inSide;
            var sit;
            var convenience;
            var multi;
            
            if (args.trim == session.localizer.gettext(session.preferredLocale(), "basicOptionModern")) {
                modelTrim = "[" + args.model + " " + args.trim + "]\n\n";
                powerTrain = session.localizer.gettext(session.preferredLocale(), "basicOptionModernPowerTrain");
                performance = session.localizer.gettext(session.preferredLocale(), "basicOptionModernPerformance");
                safety = session.localizer.gettext(session.preferredLocale(), "basicOptionModernSafety");
                outSide = session.localizer.gettext(session.preferredLocale(), "basicOptionModernOutside");
                inSide = session.localizer.gettext(session.preferredLocale(), "basicOptionModernInSide");
                sit = session.localizer.gettext(session.preferredLocale(), "basicOptionModernSit");
                convenience = session.localizer.gettext(session.preferredLocale(), "basicOptionModernConvenience");
                multi = session.localizer.gettext(session.preferredLocale(), "basicOptionModernMulti");
                session.send(modelTrim + powerTrain + performance + safety + outSide + inSide + sit + convenience + multi);

            } else if (args.trim == session.localizer.gettext(session.preferredLocale(), "basicOptionPremiumSpecial")) {
                modelTrim = "[" + args.model + " " + args.trim + "]\n\n";
                powerTrain = session.localizer.gettext(session.preferredLocale(), "basicOptionPremiumSpecialPowerTrain");
                performance = session.localizer.gettext(session.preferredLocale(), "basicOptionPremiumSpecialPerformance");
                safety = session.localizer.gettext(session.preferredLocale(), "basicOptionPremiumSpecialSafety");
                outSide = session.localizer.gettext(session.preferredLocale(), "basicOptionPremiumSpecialOutside");
                inSide = session.localizer.gettext(session.preferredLocale(), "basicOptionPremiumSpecialInSide");
                sit = session.localizer.gettext(session.preferredLocale(), "basicOptionPremiumSpecialSit");
                convenience = session.localizer.gettext(session.preferredLocale(), "basicOptionPremiumSpecialConvenience");
                multi = session.localizer.gettext(session.preferredLocale(), "basicOptionPremiumSpecialMulti");
                session.send(modelTrim + session.localizer.gettext(session.preferredLocale(), "includeGasoline2.4PremiumBasicOption") + outSide + inSide + sit + convenience);

            } else if (args.trim == session.localizer.gettext(session.preferredLocale(), "basicOptionPremium")) {
                modelTrim = "[" + args.model + " " + args.trim + "]\n\n";
                powerTrain = session.localizer.gettext(session.preferredLocale(), "basicOptionPremiumPowerTrain");
                performance = session.localizer.gettext(session.preferredLocale(), "basicOptionPremiumPerformance");
                safety = session.localizer.gettext(session.preferredLocale(), "basicOptionPremiumSafety");
                outSide = session.localizer.gettext(session.preferredLocale(), "basicOptionPremiumOutside");
                inSide = session.localizer.gettext(session.preferredLocale(), "basicOptionPremiumInSide");
                sit = session.localizer.gettext(session.preferredLocale(), "basicOptionPremiumSit");
                convenience = session.localizer.gettext(session.preferredLocale(), "basicOptionPremiumConvenience");
                multi = session.localizer.gettext(session.preferredLocale(), "basicOptionPremiumMulti");
                session.send(modelTrim + session.localizer.gettext(session.preferredLocale(), "includeGasoline2.4ModernBasicOption") + safety + sit + convenience);

            } else if (args.trim == session.localizer.gettext(session.preferredLocale(), "basicOptionExclusiveSpecial")) {
                modelTrim = "[" + args.model + " " + args.trim + "]\n\n";
                powerTrain = session.localizer.gettext(session.preferredLocale(), "basicOptionExclusiveSpecialPowerTrain");
                performance = session.localizer.gettext(session.preferredLocale(), "basicOptionExclusiveSpecialPerformance");
                safety = session.localizer.gettext(session.preferredLocale(), "basicOptionExclusiveSpecialSafety");
                outSide = session.localizer.gettext(session.preferredLocale(), "basicOptionExclusiveSpecialOutside");
                inSide = session.localizer.gettext(session.preferredLocale(), "basicOptionExclusiveSpecialInSide");
                sit = session.localizer.gettext(session.preferredLocale(), "basicOptionExclusiveSpecialSit");
                convenience = session.localizer.gettext(session.preferredLocale(), "basicOptionExclusiveSpecialConvenience");
                multi = session.localizer.gettext(session.preferredLocale(), "basicOptionExclusiveSpecialMulti");;
                session.send(modelTrim + session.localizer.gettext(session.preferredLocale(), "includeGasoline3.0ExclusiveBasicOption") + outSide + inSide + convenience);

            } else if (args.trim == session.localizer.gettext(session.preferredLocale(), "basicOptionExclusive")) {
                modelTrim = "[" + args.model + " " + args.trim + "]\n\n";
                powerTrain = session.localizer.gettext(session.preferredLocale(), "basicOptionExclusivePowerTrain");
                performance = session.localizer.gettext(session.preferredLocale(), "basicOptionExclusivePerformance");
                safety = session.localizer.gettext(session.preferredLocale(), "basicOptionExclusiveSafety");
                outSide = session.localizer.gettext(session.preferredLocale(), "basicOptionExclusiveOutside");
                inSide = session.localizer.gettext(session.preferredLocale(), "basicOptionExclusiveInSide");
                sit = session.localizer.gettext(session.preferredLocale(), "basicOptionExclusiveSit");
                convenience = session.localizer.gettext(session.preferredLocale(), "basicOptionExclusiveConvenience");
                multi = session.localizer.gettext(session.preferredLocale(), "basicOptionExclusiveMulti");
                session.send(modelTrim + session.localizer.gettext(session.preferredLocale(), "includeGasoline2.4PremiumSpecialBasicOption") + powerTrain + convenience);

            } else if (args.trim == session.localizer.gettext(session.preferredLocale(), "basicOptionCelebrity")) {
                modelTrim = "[" + args.model + " " + args.trim + "]\n\n";
                powerTrain = session.localizer.gettext(session.preferredLocale(), "basicOptionCelebrityPowerTrain");
                performance = session.localizer.gettext(session.preferredLocale(), "basicOptionCelebrityPerformance");
                safety = session.localizer.gettext(session.preferredLocale(), "basicOptionCelebritySafety");
                outSide = session.localizer.gettext(session.preferredLocale(), "basicOptionCelebrityOutside");
                inSide = session.localizer.gettext(session.preferredLocale(), "basicOptionCelebrityInSide");
                sit = session.localizer.gettext(session.preferredLocale(), "basicOptionCelebritySit");
                convenience = session.localizer.gettext(session.preferredLocale(), "basicOptionCelebrityConvenience");
                multi = session.localizer.gettext(session.preferredLocale(), "basicOptionCelebrityMulti");
                session.send(modelTrim + session.localizer.gettext(session.preferredLocale(), "includeGasoline3.0ExclusiveSpecialBasicOption") + powerTrain + performance + outSide + inSide + sit + convenience + multi);
            }
            
            var nextBtn = new builder.Message(session)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments([
                new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "basicOptionEndMessage"))
                        .buttons([
                    builder.CardAction.imBack(session, args.model + " " + args.trim + session.localizer.gettext(session.preferredLocale(), "basicOptionEndYesClickMessage"), session.localizer.gettext(session.preferredLocale(), "basicOptionEndYesMessage")),
                    builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "basicOptionEndNoClickMessage"), session.localizer.gettext(session.preferredLocale(), "basicOptionEndNoMessage"))
                ])
            ]);
            //builder.Prompts.choice(session, nextBtn, args.model + " " + args.trim + " 기본품목|홈", { listStyle: builder.ListStyle.button });
            builder.Prompts.choice(session, nextBtn, session.localizer.gettext(session.preferredLocale(), "basicOptionEndMenuList"), { listStyle: builder.ListStyle.button });
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
            
            session.send(args.model + " " + args.trim + session.localizer.gettext(session.preferredLocale(), "selectOptionInitMessage"));

            if (args.trim == session.localizer.gettext(session.preferredLocale(), "selectOptionModern")) {
                options = [new builder.HeroCard(session)
                    .title(args.model + " " + args.trim + session.localizer.gettext(session.preferredLocale(), "selectOption"))
                    .buttons([
                        builder.CardAction.imBack(session, model + " " + trim + session.localizer.gettext(session.preferredLocale(), "selectOptionItem1ClickMessage"), session.localizer.gettext(session.preferredLocale(), "selectOptionItem1")),
                        builder.CardAction.imBack(session, model + " " + trim + session.localizer.gettext(session.preferredLocale(), "selectOptionItem2ClickMessage"), session.localizer.gettext(session.preferredLocale(), "selectOptionItem2")),
                        builder.CardAction.imBack(session, model + " " + trim + session.localizer.gettext(session.preferredLocale(), "selectOptionItem3ClickMessage"), session.localizer.gettext(session.preferredLocale(), "selectOptionItem3")),
                        builder.CardAction.imBack(session, model + " " + trim + session.localizer.gettext(session.preferredLocale(), "selectOptionItem10ClickMessage"), session.localizer.gettext(session.preferredLocale(), "selectOptionItem10"))
                    ])];
            } else if (args.trim == session.localizer.gettext(session.preferredLocale(), "selectOptionPremium")) {
                options = [new builder.HeroCard(session)
                    .title(args.model + " " + args.trim + session.localizer.gettext(session.preferredLocale(), "selectOption"))
                    .buttons([
                        builder.CardAction.imBack(session, model + " " + trim + session.localizer.gettext(session.preferredLocale(), "selectOptionItem1ClickMessage"), session.localizer.gettext(session.preferredLocale(), "selectOptionItem1")),
                        builder.CardAction.imBack(session, model + " " + trim + session.localizer.gettext(session.preferredLocale(), "selectOptionItem2ClickMessage"), session.localizer.gettext(session.preferredLocale(), "selectOptionItem2")),
                        builder.CardAction.imBack(session, model + " " + trim + session.localizer.gettext(session.preferredLocale(), "selectOptionItem5ClickMessage"), session.localizer.gettext(session.preferredLocale(), "selectOptionItem5")),
                        builder.CardAction.imBack(session, model + " " + trim + session.localizer.gettext(session.preferredLocale(), "selectOptionItem6ClickMessage"), session.localizer.gettext(session.preferredLocale(), "selectOptionItem6")),
                        builder.CardAction.imBack(session, model + " " + trim + session.localizer.gettext(session.preferredLocale(), "selectOptionItem8ClickMessage"), session.localizer.gettext(session.preferredLocale(), "selectOptionItem8"))
                    ])];
            } else if (args.trim == session.localizer.gettext(session.preferredLocale(), "selectOptionPremiumSpecial1") || args.trim == session.localizer.gettext(session.preferredLocale(), "selectOptionPremiumSpecial2")) {
                options = [new builder.HeroCard(session)
                    .title(args.model + " " + args.trim + session.localizer.gettext(session.preferredLocale(), "selectOption"))
                    .buttons([
                        builder.CardAction.imBack(session, model + " " + trim + session.localizer.gettext(session.preferredLocale(), "selectOptionItem1ClickMessage"), session.localizer.gettext(session.preferredLocale(), "selectOptionItem1")),
                        builder.CardAction.imBack(session, model + " " + trim + session.localizer.gettext(session.preferredLocale(), "selectOptionItem2ClickMessage"), session.localizer.gettext(session.preferredLocale(), "selectOptionItem2")),
                        builder.CardAction.imBack(session, model + " " + trim + session.localizer.gettext(session.preferredLocale(), "selectOptionItem5ClickMessage"), session.localizer.gettext(session.preferredLocale(), "selectOptionItem5")),
                        builder.CardAction.imBack(session, model + " " + trim + session.localizer.gettext(session.preferredLocale(), "selectOptionItem7ClickMessage"), session.localizer.gettext(session.preferredLocale(), "selectOptionItem7")),
                        builder.CardAction.imBack(session, model + " " + trim + session.localizer.gettext(session.preferredLocale(), "selectOptionItem4ClickMessage"), session.localizer.gettext(session.preferredLocale(), "selectOptionItem4")),
                        builder.CardAction.imBack(session, model + " " + trim + session.localizer.gettext(session.preferredLocale(), "selectOptionItem11ClickMessage"), session.localizer.gettext(session.preferredLocale(), "selectOptionItem11"))
                    ])];
            } else if (args.trim == session.localizer.gettext(session.preferredLocale(), "selectOptionExclusive")) {
                options = [new builder.HeroCard(session)
                    .title(args.model + " " + args.trim + session.localizer.gettext(session.preferredLocale(), "selectOption"))
                    .buttons([
                        builder.CardAction.imBack(session, model + " " + trim + session.localizer.gettext(session.preferredLocale(), "selectOptionItem1ClickMessage"), session.localizer.gettext(session.preferredLocale(), "selectOptionItem1")),
                        builder.CardAction.imBack(session, model + " " + trim + session.localizer.gettext(session.preferredLocale(), "selectOptionItem2ClickMessage"), session.localizer.gettext(session.preferredLocale(), "selectOptionItem2")),
                        builder.CardAction.imBack(session, model + " " + trim + session.localizer.gettext(session.preferredLocale(), "selectOptionItem5ClickMessage"), session.localizer.gettext(session.preferredLocale(), "selectOptionItem5")),
                        builder.CardAction.imBack(session, model + " " + trim + session.localizer.gettext(session.preferredLocale(), "selectOptionItem9ClickMessage"), session.localizer.gettext(session.preferredLocale(), "selectOptionItem9")),
                        builder.CardAction.imBack(session, model + " " + trim + session.localizer.gettext(session.preferredLocale(), "selectOptionItem7ClickMessage"), session.localizer.gettext(session.preferredLocale(), "selectOptionItem7")),
                        builder.CardAction.imBack(session, model + " " + trim + session.localizer.gettext(session.preferredLocale(), "selectOptionItem11ClickMessage"), session.localizer.gettext(session.preferredLocale(), "selectOptionItem11"))
                    ])];
            } else if (args.trim == session.localizer.gettext(session.preferredLocale(), "selectOptionExclusiveSpecial1") || args.trim == session.localizer.gettext(session.preferredLocale(), "selectOptionExclusiveSpecial2")) {
                options = [new builder.HeroCard(session)
                    .title(args.model + " " + args.trim + session.localizer.gettext(session.preferredLocale(), "selectOption"))
                    .buttons([
                        builder.CardAction.imBack(session, model + " " + trim + session.localizer.gettext(session.preferredLocale(), "selectOptionItem1ClickMessage"), session.localizer.gettext(session.preferredLocale(), "selectOptionItem1")),
                        builder.CardAction.imBack(session, model + " " + trim + session.localizer.gettext(session.preferredLocale(), "selectOptionItem2ClickMessage"), session.localizer.gettext(session.preferredLocale(), "selectOptionItem2")),
                        builder.CardAction.imBack(session, model + " " + trim + session.localizer.gettext(session.preferredLocale(), "selectOptionItem5ClickMessage"), session.localizer.gettext(session.preferredLocale(), "selectOptionItem5")),
                        builder.CardAction.imBack(session, model + " " + trim + session.localizer.gettext(session.preferredLocale(), "selectOptionItem9ClickMessage"), session.localizer.gettext(session.preferredLocale(), "selectOptionItem9")),
                        builder.CardAction.imBack(session, model + " " + trim + session.localizer.gettext(session.preferredLocale(), "selectOptionItem4ClickMessage"), session.localizer.gettext(session.preferredLocale(), "selectOptionItem4")),
                        builder.CardAction.imBack(session, model + " " + trim + session.localizer.gettext(session.preferredLocale(), "selectOptionItem12ClickMessage"), session.localizer.gettext(session.preferredLocale(), "selectOptionItem12"))
                    ])];
            } else if (args.trim == session.localizer.gettext(session.preferredLocale(), "selectOptionCelebrity")) {
                options = [new builder.HeroCard(session)
                    .title(args.model + " " + args.trim + session.localizer.gettext(session.preferredLocale(), "selectOption"))
                    .buttons([
                        builder.CardAction.imBack(session, model + " " + trim + session.localizer.gettext(session.preferredLocale(), "selectOptionItem1ClickMessage"), session.localizer.gettext(session.preferredLocale(), "selectOptionItem1")),
                        builder.CardAction.imBack(session, model + " " + trim + session.localizer.gettext(session.preferredLocale(), "selectOptionItem2ClickMessage"), session.localizer.gettext(session.preferredLocale(), "selectOptionItem2")),
                        builder.CardAction.imBack(session, model + " " + trim + session.localizer.gettext(session.preferredLocale(), "selectOptionItem5ClickMessage"), session.localizer.gettext(session.preferredLocale(), "selectOptionItem5")),
                        builder.CardAction.imBack(session, model + " " + trim + session.localizer.gettext(session.preferredLocale(), "selectOptionItem9ClickMessage"), session.localizer.gettext(session.preferredLocale(), "selectOptionItem9"))
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
            session.send("선택하신 차량의 산출 가격 입니다.");
            
            console.log(userId + " user insert : " + session.message.text);
            //var userId = userId;
            var tasks = [
                function (callback) {
                    var returnData;
                    tp.setConnectionConfig(config);
                    tp.sql("SELECT TOD.MODEL_NUMBER, TOD.OPTION_NUMBER, TOD.OPTION_NAME, TOD.OPTION_PRICE "
                        + "FROM TBL_MODEL_CUSTOMER_SELECTED TMCS, TBL_OPTION_DEF TOD "
                        + "WHERE TMCS.MODEL_NUMBER = TOD.MODEL_NUMBER "
                        + "AND TMCS.USER_ID=@USERID "
                        + "AND TOD.MODEL_NUMBER=@MODELNUM "
                        + "ORDER BY OPTION_NUMBER "
                    )
                        .parameter('USERID', TYPES.NVarChar, userId)
                        .parameter('MODELNUM', TYPES.Int, args.modelNum)
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
                        + "FROM TBL_MODEL_CUSTOMER_SELECTED "
                        + "WHERE USER_ID=@USERID "
                        + "AND MODEL_NUMBER=@MODELNUM "
                    )
                        .parameter('USERID', TYPES.NVarChar, userId)
                        .parameter('MODELNUM', TYPES.Int, args.modelNum)
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
                    //console.log("results[1][0].OPTION" + i + " ::: " + eval("results[1][0].OPTION" + i));
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
                var OPTION1 = 0;
                var OPTION2 = 0;
                var OPTION3 = 0;
                var OPTION4 = 0;
                var OPTION5 = 0;
                var OPTION6 = 0;
                var OPTION7 = 0;
                var OPTION8 = 0;
                var OPTION9 = 0;
                
                for (var i = 0; i < optionCnt; i++) {
                    //console.log(typeof numberTemp[i]);
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
                    items = [builder.ReceiptItem.create(session, number_format(args.carPrice) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), args.model + " " + args.trim),];
                } else if (optionCnt == 1) {
                    items = [builder.ReceiptItem.create(session, number_format(args.carPrice) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), args.model + " " + args.trim),
                        builder.ReceiptItem.create(session, number_format(priceTemp[0]) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), itemsTemp[0])];
                } else if (optionCnt == 2) {
                    items = [builder.ReceiptItem.create(session, number_format(args.carPrice) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), args.model + " " + args.trim),
                        builder.ReceiptItem.create(session, number_format(priceTemp[0]) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), itemsTemp[0]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[1]) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), itemsTemp[1])];
                } else if (optionCnt == 3) {
                    items = [builder.ReceiptItem.create(session, number_format(args.carPrice) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), args.model + " " + args.trim),
                        builder.ReceiptItem.create(session, number_format(priceTemp[0]) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), itemsTemp[0]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[1]) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), itemsTemp[1]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[2]) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), itemsTemp[2])];
                } else if (optionCnt == 4) {
                    items = [builder.ReceiptItem.create(session, number_format(args.carPrice) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), args.model + " " + args.trim),
                        builder.ReceiptItem.create(session, number_format(priceTemp[0]) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), itemsTemp[0]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[1]) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), itemsTemp[1]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[2]) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), itemsTemp[2]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[3]) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), itemsTemp[3])];
                } else if (optionCnt == 5) {
                    items = [builder.ReceiptItem.create(session, number_format(args.carPrice) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), args.model + " " + args.trim),
                        builder.ReceiptItem.create(session, number_format(priceTemp[0]) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), itemsTemp[0]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[1]) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), itemsTemp[1]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[2]) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), itemsTemp[2]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[3]) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), itemsTemp[3]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[4]) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), itemsTemp[4])];
                } else if (optionCnt == 6) {
                    items = [builder.ReceiptItem.create(session, number_format(args.carPrice) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), args.model + " " + args.trim),
                        builder.ReceiptItem.create(session, number_format(priceTemp[0]) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), itemsTemp[0]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[1]) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), itemsTemp[1]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[2]) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), itemsTemp[2]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[3]) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), itemsTemp[3]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[4]) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), itemsTemp[4]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[5]) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), itemsTemp[5])];
                } else if (optionCnt == 7) {
                    items = [builder.ReceiptItem.create(session, number_format(args.carPrice) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), args.model + " " + args.trim),
                        builder.ReceiptItem.create(session, number_format(priceTemp[0]) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), itemsTemp[0]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[1]) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), itemsTemp[1]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[2]) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), itemsTemp[2]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[3]) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), itemsTemp[3]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[4]) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), itemsTemp[4]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[5]) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), itemsTemp[5]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[6]) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), itemsTemp[6])];
                } else if (optionCnt == 8) {
                    items = [builder.ReceiptItem.create(session, number_format(args.carPrice) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), args.model + " " + args.trim),
                        builder.ReceiptItem.create(session, number_format(priceTemp[0]) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), itemsTemp[0]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[1]) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), itemsTemp[1]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[2]) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), itemsTemp[2]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[3]) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), itemsTemp[3]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[4]) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), itemsTemp[4]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[5]) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), itemsTemp[5]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[6]) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), itemsTemp[6]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[7]) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), itemsTemp[7])];
                } else if (optionCnt == 9) {
                    items = [builder.ReceiptItem.create(session, number_format(args.carPrice) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), args.model + " " + args.trim),
                        builder.ReceiptItem.create(session, number_format(priceTemp[0]) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), itemsTemp[0]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[1]) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), itemsTemp[1]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[2]) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), itemsTemp[2]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[3]) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), itemsTemp[3]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[4]) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), itemsTemp[4]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[5]) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), itemsTemp[5]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[6]) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), itemsTemp[6]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[7]) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), itemsTemp[7]),
                        builder.ReceiptItem.create(session, number_format(priceTemp[8]) + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"), itemsTemp[8])];
                }
                
                var msg = new builder.Message(session)
                    .attachments([
                    new builder.ReceiptCard(session)
                            .title(args.model + " " + args.trim)
                            .items(items)
                            .facts([
                        builder.Fact.create(session, session.localizer.gettext(session.preferredLocale(), "priceReciptTopMenu2"), session.localizer.gettext(session.preferredLocale(), "priceReciptTopMenu1"))
                    ])
                            .total(total + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"))
                ]);
                session.send(msg);
                
                var nextBtn = new builder.Message(session)
                    .attachmentLayout(builder.AttachmentLayout.carousel)
                    .attachments([
                    new builder.HeroCard(session)
                            .title(session.localizer.gettext(session.preferredLocale(), "priceReciptEndMessage")) 
                            .buttons([
                        builder.CardAction.imBack(session, args.model + " " + args.trim + " " + session.localizer.gettext(session.preferredLocale(), "priceReciptEndYesClickMessage"), session.localizer.gettext(session.preferredLocale(), "priceReciptEndYesMessage")),
                        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "priceReciptEndNoClickMessage"), session.localizer.gettext(session.preferredLocale(), "priceReciptEndNoMessage"))
                    ])
                ]);
                builder.Prompts.choice(session, nextBtn, args.model + " " + args.trim + " " + session.localizer.gettext(session.preferredLocale(), "priceReciptEndMenuList"), { listStyle: builder.ListStyle.button });
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
                    case session.localizer.gettext(session.preferredLocale(), "compareCase1"):
                        title1 = session.localizer.gettext(session.preferredLocale(), "compareTitle1");
                        price1 = session.localizer.gettext(session.preferredLocale(), "comparePrice1");
                        break;
                    case session.localizer.gettext(session.preferredLocale(), "compareCase2"):
                        title1 = session.localizer.gettext(session.preferredLocale(), "compareTitle2");
                        price1 = session.localizer.gettext(session.preferredLocale(), "comparePrice2");
                        break;
                    case session.localizer.gettext(session.preferredLocale(), "compareCase3"):
                        title1 = session.localizer.gettext(session.preferredLocale(), "compareTitle3");
                        price1 = session.localizer.gettext(session.preferredLocale(), "comparePrice3");
                        break;
                    case session.localizer.gettext(session.preferredLocale(), "compareCase4"):
                        title1 = session.localizer.gettext(session.preferredLocale(), "compareTitle4");
                        price1 = session.localizer.gettext(session.preferredLocale(), "comparePrice4");
                        break;
                    case session.localizer.gettext(session.preferredLocale(), "compareCase5"):
                        title1 = session.localizer.gettext(session.preferredLocale(), "compareTitle5");
                        price1 = session.localizer.gettext(session.preferredLocale(), "comparePrice5");
                        break;
                    case session.localizer.gettext(session.preferredLocale(), "compareCase6"):
                        title1 = session.localizer.gettext(session.preferredLocale(), "compareTitle6");
                        price1 = session.localizer.gettext(session.preferredLocale(), "comparePrice6");
                        break;
                    case session.localizer.gettext(session.preferredLocale(), "compareCase7"):
                        title1 = session.localizer.gettext(session.preferredLocale(), "compareTitle7");
                        price1 = session.localizer.gettext(session.preferredLocale(), "comparePrice7");
                        break;
                    case session.localizer.gettext(session.preferredLocale(), "compareCase8"):
                        title1 = session.localizer.gettext(session.preferredLocale(), "compareTitle8");
                        price1 = session.localizer.gettext(session.preferredLocale(), "comparePrice8");
                        break;
                    case session.localizer.gettext(session.preferredLocale(), "compareCase9"):
                        title1 = session.localizer.gettext(session.preferredLocale(), "compareTitle9");
                        price1 = session.localizer.gettext(session.preferredLocale(), "comparePrice9");
                        break;
                    case session.localizer.gettext(session.preferredLocale(), "compareCase10"):
                        title1 = session.localizer.gettext(session.preferredLocale(), "compareTitle10");
                        price1 = session.localizer.gettext(session.preferredLocale(), "comparePrice10");
                        break;
                    case session.localizer.gettext(session.preferredLocale(), "compareCase11"):
                        title1 = session.localizer.gettext(session.preferredLocale(), "compareTitle11");
                        price1 = session.localizer.gettext(session.preferredLocale(), "comparePrice11");
                        break;
                    case session.localizer.gettext(session.preferredLocale(), "compareCase12"):
                        title1 = session.localizer.gettext(session.preferredLocale(), "compareTitle12");
                        price1 = session.localizer.gettext(session.preferredLocale(), "comparePrice12");
                        break;
                    case session.localizer.gettext(session.preferredLocale(), "compareCase13"):
                        title1 = session.localizer.gettext(session.preferredLocale(), "compareTitle13");
                        price1 = session.localizer.gettext(session.preferredLocale(), "comparePrice13");
                        break;
                    case session.localizer.gettext(session.preferredLocale(), "compareCase14"):
                        title1 = session.localizer.gettext(session.preferredLocale(), "compareTitle14");
                        price1 = session.localizer.gettext(session.preferredLocale(), "comparePrice14");
                        break;
                    default:
                        title1 = session.localizer.gettext(session.preferredLocale(), "compareTitle1");
                        price1 = session.localizer.gettext(session.preferredLocale(), "comparePrice1");
                        break;
                }
            }
            
            if (compare2 != null) {
                
                compare2 = compare2.replace(/ /gi, "");
                
                switch (compare2) {
                    case session.localizer.gettext(session.preferredLocale(), "compareCase1"):
                        title2 = session.localizer.gettext(session.preferredLocale(), "compareTitle1");
                        price2 = session.localizer.gettext(session.preferredLocale(), "comparePrice1");
                        break;
                    case session.localizer.gettext(session.preferredLocale(), "compareCase2"):
                        title2 = session.localizer.gettext(session.preferredLocale(), "compareTitle2");
                        price2 = session.localizer.gettext(session.preferredLocale(), "comparePrice2");
                        break;
                    case session.localizer.gettext(session.preferredLocale(), "compareCase3"):
                        title2 = session.localizer.gettext(session.preferredLocale(), "compareTitle3");
                        price2 = session.localizer.gettext(session.preferredLocale(), "comparePrice3");
                        break;
                    case session.localizer.gettext(session.preferredLocale(), "compareCase4"):
                        title2 = session.localizer.gettext(session.preferredLocale(), "compareTitle4");
                        price2 = session.localizer.gettext(session.preferredLocale(), "comparePrice4");
                        break;
                    case session.localizer.gettext(session.preferredLocale(), "compareCase5"):
                        title2 = session.localizer.gettext(session.preferredLocale(), "compareTitle5");
                        price2 = session.localizer.gettext(session.preferredLocale(), "comparePrice5");
                        break;
                    case session.localizer.gettext(session.preferredLocale(), "compareCase6"):
                        title2 = session.localizer.gettext(session.preferredLocale(), "compareTitle6");
                        price2 = session.localizer.gettext(session.preferredLocale(), "comparePrice6");
                        break;
                    case session.localizer.gettext(session.preferredLocale(), "compareCase7"):
                        title2 = session.localizer.gettext(session.preferredLocale(), "compareTitle7");
                        price2 = session.localizer.gettext(session.preferredLocale(), "comparePrice7");
                        break;
                    case session.localizer.gettext(session.preferredLocale(), "compareCase8"):
                        title2 = session.localizer.gettext(session.preferredLocale(), "compareTitle8");
                        price2 = session.localizer.gettext(session.preferredLocale(), "comparePrice8");
                        break;
                    case session.localizer.gettext(session.preferredLocale(), "compareCase9"):
                        title2 = session.localizer.gettext(session.preferredLocale(), "compareTitle9");
                        price2 = session.localizer.gettext(session.preferredLocale(), "comparePrice9");
                        break;
                    case session.localizer.gettext(session.preferredLocale(), "compareCase10"):
                        title2 = session.localizer.gettext(session.preferredLocale(), "compareTitle10");
                        price2 = session.localizer.gettext(session.preferredLocale(), "comparePrice10");
                        break;
                    case session.localizer.gettext(session.preferredLocale(), "compareCase11"):
                        title2 = session.localizer.gettext(session.preferredLocale(), "compareTitle11");
                        price2 = session.localizer.gettext(session.preferredLocale(), "comparePrice11");
                        break;
                    case session.localizer.gettext(session.preferredLocale(), "compareCase12"):
                        title2 = session.localizer.gettext(session.preferredLocale(), "compareTitle12");
                        price2 = session.localizer.gettext(session.preferredLocale(), "comparePrice12");
                        break;
                    case session.localizer.gettext(session.preferredLocale(), "compareCase13"):
                        title2 = session.localizer.gettext(session.preferredLocale(), "compareTitle13");
                        price2 = session.localizer.gettext(session.preferredLocale(), "comparePrice13");
                        break;
                    case session.localizer.gettext(session.preferredLocale(), "compareCase14"):
                        title2 = session.localizer.gettext(session.preferredLocale(), "compareTitle14");
                        price2 = session.localizer.gettext(session.preferredLocale(), "comparePrice14");
                        break;
                    default:
                        title2 = session.localizer.gettext(session.preferredLocale(), "compareTitle1");
                        price2 = session.localizer.gettext(session.preferredLocale(), "comparePrice1");
                        break;
                }
            }
            
           

            if (title1 != null && title2 != null) {
                
                session.send(title1 + session.localizer.gettext(session.preferredLocale(), "compareAndMessage") + title2 + session.localizer.gettext(session.preferredLocale(), "compareMessage"));

                msg = new builder.Message(session)
            .attachmentLayout(builder.AttachmentLayout.carousel)
            .attachments([
                    new builder.HeroCard(session)
            .title(title1)
            .text(session.localizer.gettext(session.preferredLocale(), "price") +" : " + price1 + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"))
            .images([
                        builder.CardImage.create(session, img_path + "/images/price/Grandeur_modern.PNG")
            .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_modern.PNG"))
                    ])
            .buttons([
                        builder.CardAction.imBack(session, title1 + session.localizer.gettext(session.preferredLocale(), "compareModelItem1BasicOptionClickMessage"), session.localizer.gettext(session.preferredLocale(), "compareModelItem1BasicOptionView")),
                        builder.CardAction.imBack(session, title1 + session.localizer.gettext(session.preferredLocale(), "compareModelItem1SelectOptionClickMessage"), session.localizer.gettext(session.preferredLocale(), "compareModelItem1SelectOptionAdd"))
                    ]),
                    new builder.HeroCard(session)
            .title(title2)
            .text(session.localizer.gettext(session.preferredLocale(), "price") + " : " + price2 + session.localizer.gettext(session.preferredLocale(), "priceReciptCurrencyUnit"))
            .images([
                        builder.CardImage.create(session, img_path + "/images/price/Grandeur_modern.PNG")
            .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_modern.PNG"))
                    ])
            .buttons([
                        builder.CardAction.imBack(session, title1 + session.localizer.gettext(session.preferredLocale(), "compareModelItem1BasicOptionClickMessage"), session.localizer.gettext(session.preferredLocale(), "compareModelItem1BasicOptionView")),
                        builder.CardAction.imBack(session, title1 + session.localizer.gettext(session.preferredLocale(), "compareModelItem1SelectOptionClickMessage"), session.localizer.gettext(session.preferredLocale(), "compareModelItem1SelectOptionAdd"))
                    ])
                ]);
                
                session.endDialog(msg);
            } else {
                
                switch (args.intent) {
                    case "korCompareModel":
                        session.send(session.localizer.gettext(session.preferredLocale(), "korCompareModelMessage"));
                        break;
                    case "korCompareBeforeModel":
                        session.send(session.localizer.gettext(session.preferredLocale(), "korCompareBeforeModelMessage"));
                        break;
                    case "korCompareBeforeModels":
                        session.send(session.localizer.gettext(session.preferredLocale(), "korCompareBeforeModelsMessage"));
                        break;
                    default:
                        session.send(session.localizer.gettext(session.preferredLocale(), "NocompareModelMessage"));
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
            
            session.send(fnResultModelNm + " " + fnResultTrimNm +" [ "+ fnResultOptionNm+" ] "+ session.localizer.gettext(session.preferredLocale(), "priceOptionAddMessage"));

            //functionOptionUpdate(userId, fnResultModel, fnResultOption, 1);
            
            //console.log(functionOptionUpdate(userId, fnResultModel, fnResultOption, 1));
            
            if (!functionOptionUpdate(userId, fnResultModel, fnResultOption, 1)) {
                
                
                session.endDialog();
                session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: userId, beginTime: date.getTime(), intent: "korPriceRecipt", tableNm: "insert_history", model: fnResultModelNm, trim: fnResultTrimNm, carPrice: fnResultCarPrice, modelNum: fnResultModel });
                
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
            
            session.send(fnResultModelNm + " " + fnResultTrimNm + " [ " + fnResultOptionNm + " ] " + session.localizer.gettext(session.preferredLocale(), "priceOptionRemoveMessage"));

            functionOptionUpdate(userId, fnResultModel, fnResultOption, 0);
            
            
            session.endDialog();
            session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: userId, beginTime: date.getTime(), intent: "korPriceRecipt", tableNm: "insert_history", model: fnResultModelNm, trim: fnResultTrimNm, carPrice: fnResultCarPrice, modelNum: fnResultModel });
            
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
            
            engineNameVar = session.localizer.gettext(session.preferredLocale(), "gasoline2.4");
            if (message.match(/모던/g) || message.match(/모 던/g)) {
                
                modelNameVar = session.localizer.gettext(session.preferredLocale(), "basicOptionModern");
                modelNumberVar = 1;
                carPriceVar = 30550000;
                
                if (message.match(/파노라마 썬루프/) || message.match(/파노라마썬루프/)) {
                    modelOptionNumberVar = 3;
                    optionNm = session.localizer.gettext(session.preferredLocale(), "selectOptionItem1");
                } else if (message.match(/TUIX 컴포트 패키지/) || message.match(/TUIX 컴포트패키지/) || message.match(/TUIX컴포트패키지/) || message.match(/튜익스 컴포트 패키지/) || message.match(/튜익스 컴포트패키지/) || message.match(/튜익스컴포트패키지/)) {
                    modelOptionNumberVar = 2;
                    optionNm = session.localizer.gettext(session.preferredLocale(), "selectOptionItem2");
                } else if (message.match(/앞좌석통풍/) || message.match(/앞좌석 통풍/) || message.match(/앞 좌석 통풍/)) {
                    modelOptionNumberVar = 1;
                    optionNm = session.localizer.gettext(session.preferredLocale(), "selectOptionItem3");
                } else if (message.match(/하이패스 시스템/) || message.match(/하이패스시스템/) || message.match(/하이 패스 시스템/)) {
                    modelOptionNumberVar = 1;
                    optionNm = session.localizer.gettext(session.preferredLocale(), "selectOptionItem3");
                } else if (message.match(/현대스마트센스패키지IV/) || message.match(/현대 스마트센스패키지IV/) || message.match(/현대 스마트 센스패키지IV/) || message.match(/현대 스마트 센스 패키지IV/) || message.match(/현대 스마트 센스 패키지 IV/)) {
                    modelOptionNumberVar = 4;
                    optionNm = session.localizer.gettext(session.preferredLocale(), "selectOptionItem10");
                } else {
                    modelOptionNumberVar = 0;
                }
            } else if (message.match(/프리미엄 스페셜/g) || message.match(/프리미엄스페셜/g)) {
                
                modelNameVar = session.localizer.gettext(session.preferredLocale(), "basicOptionPremiumSpecial"); 
                modelNumberVar = 3;
                carPriceVar = 33750000;
                
                if (message.match(/파노라마 썬루프/) || message.match(/파노라마썬루프/)) {
                    modelOptionNumberVar = 4;
                    optionNm = session.localizer.gettext(session.preferredLocale(), "selectOptionItem1");
                } else if (message.match(/TUIX 컴포트 패키지/) || message.match(/TUIX 컴포트패키지/) || message.match(/TUIX컴포트패키지/) || message.match(/튜익스 컴포트 패키지/) || message.match(/튜익스 컴포트패키지/) || message.match(/튜익스컴포트패키지/)) {
                    modelOptionNumberVar = 3;
                    optionNm = session.localizer.gettext(session.preferredLocale(), "selectOptionItem2");
                } else if (message.match(/헤드업디스플레이(HUD)/) || message.match(/헤드업 디스플레이(HUD)/) || message.match(/헤드업 디스플레이 (HUD)/) || message.match(/헤드업디스플레이/) || message.match(/헤드업 디스플레이/) || message.match(/HUD/)) {
                    modelOptionNumberVar = 5;
                    optionNm = session.localizer.gettext(session.preferredLocale(), "selectOptionItem5");
                } else if (message.match(/현대스마트센스패키지II/) || message.match(/현대 스마트센스패키지II/) || message.match(/현대 스마트 센스패키지II/) || message.match(/현대 스마트 센스 패키지II/) || message.match(/현대 스마트 센스 패키지 II/)) {
                    modelOptionNumberVar = 6;
                    optionNm = session.localizer.gettext(session.preferredLocale(), "selectOptionItem9");
                } else if (message.match(/익스테리어패키지II/) || message.match(/익스테리어 패키지II/) || message.match(/익스테리어 패키지 II/) || message.match(/익스테리어패키지 II/)) {
                    modelOptionNumberVar = 2;
                    optionNm = session.localizer.gettext(session.preferredLocale(), "selectOptionItem7");
                } else if (message.match(/JBL사운드패키지/) || message.match(/JBL 사운드패키지/) || message.match(/JBL 사운드 패키지/)) {
                    modelOptionNumberVar = 7;
                    optionNm = session.localizer.gettext(session.preferredLocale(), "selectOptionItem4");
                } else if (message.match(/어라운드뷰모니터(AVM)/) || message.match(/어라운드 뷰모니터(AVM)/) || message.match(/어라운드 뷰 모니터(AVM)/) || message.match(/어라운드 뷰 모니터 (AVM)/)) {
                    modelOptionNumberVar = 1;
                    optionNm = session.localizer.gettext(session.preferredLocale(), "selectOptionItem11");
                } else if (message.match(/스마트전동식트렁크/) || message.match(/스마트 전동식트렁크/) || message.match(/스마트 전동식 트렁크/) || message.match(/스마트전동식 트렁크/)) {
                    modelOptionNumberVar = 1;
                    optionNm = session.localizer.gettext(session.preferredLocale(), "selectOptionItem11");
                } else {
                    modelOptionNumberVar = 0;
                }
            } else if (message.match(/프리미엄/)) {
                
                modelNameVar = session.localizer.gettext(session.preferredLocale(), "basicOptionPremium"); 
                modelNumberVar = 2;
                carPriceVar = 31750000;
                
                if (message.match(/파노라마 썬루프/) || message.match(/파노라마썬루프/)) {
                    modelOptionNumberVar = 3;
                    optionNm = session.localizer.gettext(session.preferredLocale(), "selectOptionItem1");
                } else if (message.match(/TUIX 컴포트 패키지/) || message.match(/TUIX 컴포트패키지/) || message.match(/TUIX컴포트패키지/) || message.match(/튜익스 컴포트 패키지/) || message.match(/튜익스 컴포트패키지/) || message.match(/튜익스컴포트패키지/)) {
                    modelOptionNumberVar = 2;
                    optionNm = session.localizer.gettext(session.preferredLocale(), "selectOptionItem2");
                } else if (message.match(/헤드업디스플레이(HUD)/) || message.match(/헤드업 디스플레이(HUD)/) || message.match(/헤드업 디스플레이 (HUD)/) || message.match(/헤드업디스플레이/) || message.match(/헤드업 디스플레이/) || message.match(/HUD/)) {
                    modelOptionNumberVar = 4;
                    optionNm = session.localizer.gettext(session.preferredLocale(), "selectOptionItem5");
                } else if (message.match(/현대스마트센스패키지I/) || message.match(/현대 스마트센스패키지I/) || message.match(/현대 스마트 센스패키지I/) || message.match(/현대 스마트 센스 패키지I/) || message.match(/현대 스마트 센스 패키지 I/)) {
                    modelOptionNumberVar = 5;
                    optionNm = session.localizer.gettext(session.preferredLocale(), "selectOptionItem8");
                } else if (message.match(/익스테리어패키지I/) || message.match(/익스테리어 패키지I/) || message.match(/익스테리어 패키지 I/) || message.match(/익스테리어패키지 I/)) {
                    modelOptionNumberVar = 1;
                    optionNm = session.localizer.gettext(session.preferredLocale(), "selectOptionItem6");
                } else {
                    modelOptionNumberVar = 0;
                }
            }
        } else if (message.match(/가솔린 3.0/) || message.match(/가솔린3.0/)) {
            
            engineNameVar = session.localizer.gettext(session.preferredLocale(), "gasoline3.0"); 
            
            if (message.match(/익스클루시브 스페셜/) || message.match(/익스클루시브스페셜/)) {
                
                modelNameVar = session.localizer.gettext(session.preferredLocale(), "basicOptionExclusiveSpecial"); 
                modelNumberVar = 5;
                carPriceVar = 38700000;
                
                if (message.match(/파노라마 썬루프/) || message.match(/파노라마썬루프/)) {
                    modelOptionNumberVar = 2;
                    optionNm = session.localizer.gettext(session.preferredLocale(), "selectOptionItem1");
                } else if (message.match(/TUIX 컴포트 패키지/) || message.match(/TUIX 컴포트패키지/) || message.match(/TUIX컴포트패키지/) || message.match(/튜익스 컴포트 패키지/) || message.match(/튜익스 컴포트패키지/) || message.match(/튜익스컴포트패키지/)) {
                    modelOptionNumberVar = 1;
                    optionNm = session.localizer.gettext(session.preferredLocale(), "selectOptionItem2");
                } else if (message.match(/헤드업디스플레이(HUD)/) || message.match(/헤드업 디스플레이(HUD)/) || message.match(/헤드업 디스플레이 (HUD)/) || message.match(/헤드업디스플레이/) || message.match(/헤드업 디스플레이/) || message.match(/HUD/)) {
                    modelOptionNumberVar = 4;
                    optionNm = session.localizer.gettext(session.preferredLocale(), "selectOptionItem5");
                } else if (message.match(/현대스마트센스패키지II/) || message.match(/현대 스마트센스패키지II/) || message.match(/현대 스마트 센스패키지II/) || message.match(/현대 스마트 센스 패키지II/) || message.match(/현대 스마트 센스 패키지 II/)) {
                    modelOptionNumberVar = 5;
                    optionNm = session.localizer.gettext(session.preferredLocale(), "selectOptionItem9");
                } else if (message.match(/JBL사운드패키지/) || message.match(/JBL 사운드패키지/) || message.match(/JBL 사운드 패키지/)) {
                    modelOptionNumberVar = 6;
                    optionNm = session.localizer.gettext(session.preferredLocale(), "selectOptionItem4");
                } else if (message.match(/프리미어인테리어셀렉션/) || message.match(/프리미어 인테리어셀렉션/) || message.match(/프리미어 인테리어 셀렉션/)) {
                    //session.beginDialog('/korPriceRecipt', { sendMsg: session.message.text, key: userId, beginTime: date.getTime(), intent: "korDesignInteriorDetail", tableNm: "insert_history", model: "가솔린 3.0", trim: "익스클루시브 스페셜", carPrice: 38700000, selectOption1: "프리미어 인테리어 셀렉션", optionPrice1: 1500000 });
                    modelOptionNumberVar = 3;
                    optionNm = session.localizer.gettext(session.preferredLocale(), "selectOptionItem12");
                } else {
                    modelOptionNumberVar = 0;
                }
            } else if (message.match(/익스클루시브/)) {
                
                modelNameVar = session.localizer.gettext(session.preferredLocale(), "basicOptionExclusive"); 
                modelNumberVar = 4;
                carPriceVar = 35500000;
                
                if (message.match(/파노라마 썬루프/) || message.match(/파노라마썬루프/)) {
                    modelOptionNumberVar = 4;
                    optionNm = session.localizer.gettext(session.preferredLocale(), "selectOptionItem1");
                } else if (message.match(/TUIX 컴포트 패키지/) || message.match(/TUIX 컴포트패키지/) || message.match(/TUIX컴포트패키지/) || message.match(/튜익스 컴포트 패키지/) || message.match(/튜익스 컴포트패키지/) || message.match(/튜익스컴포트패키지/)) {
                    modelOptionNumberVar = 3;
                    optionNm = session.localizer.gettext(session.preferredLocale(), "selectOptionItem2");
                } else if (message.match(/헤드업디스플레이(HUD)/) || message.match(/헤드업 디스플레이(HUD)/) || message.match(/헤드업 디스플레이 (HUD)/) || message.match(/헤드업디스플레이/) || message.match(/헤드업 디스플레이/) || message.match(/HUD/)) {
                    modelOptionNumberVar = 5;
                    optionNm = session.localizer.gettext(session.preferredLocale(), "selectOptionItem5");
                } else if (message.match(/현대스마트센스패키지II/) || message.match(/현대 스마트센스패키지II/) || message.match(/현대 스마트 센스패키지II/) || message.match(/현대 스마트 센스 패키지II/) || message.match(/현대 스마트 센스 패키지 II/)) {
                    modelOptionNumberVar = 6;
                    optionNm = session.localizer.gettext(session.preferredLocale(), " selectOptionItem9 ");
                } else if (message.match(/익스테리어패키지II/) || message.match(/익스테리어 패키지II/) || message.match(/익스테리어 패키지 II/) || message.match(/익스테리어패키지 II/)) {
                    modelOptionNumberVar = 2;
                    optionNm = session.localizer.gettext(session.preferredLocale(), "selectOptionItem7");
                } else if (message.match(/어라운드뷰모니터(AVM)/) || message.match(/어라운드 뷰모니터(AVM)/) || message.match(/어라운드 뷰 모니터(AVM)/) || message.match(/어라운드 뷰 모니터 (AVM)/)) {
                    modelOptionNumberVar = 1;
                    optionNm = session.localizer.gettext(session.preferredLocale(), "selectOptionItem11");
                } else if (message.match(/스마트전동식트렁크/) || message.match(/스마트 전동식트렁크/) || message.match(/스마트 전동식 트렁크/) || message.match(/스마트전동식 트렁크/)) {
                    modelOptionNumberVar = 1;
                    optionNm = session.localizer.gettext(session.preferredLocale(), "selectOptionItem11");
                } else {
                    modelOptionNumberVar = 0;
                }
            }

        } else if (message.match(/가솔린 3.3/) || message.match(/가솔린3.3/)) {
            
            engineNameVar = session.localizer.gettext(session.preferredLocale(), "gasoline3.3"); 
            
            if (message.match(/셀러브리티/)) {
                
                modelNameVar = session.localizer.gettext(session.preferredLocale(), "basicOptionCelebrity"); 
                modelNumberVar = 7;
                carPriceVar = 41600000;
                
                if (message.match(/파노라마 썬루프/) || message.match(/파노라마썬루프/)) {
                    modelOptionNumberVar = 2;
                    optionNm = session.localizer.gettext(session.preferredLocale(), "selectOptionItem1");
                } else if (message.match(/TUIX 컴포트 패키지/) || message.match(/TUIX 컴포트패키지/) || message.match(/TUIX컴포트패키지/) || message.match(/튜익스 컴포트 패키지/) || message.match(/튜익스 컴포트패키지/) || message.match(/튜익스컴포트패키지/)) {
                    modelOptionNumberVar = 1;
                    optionNm = session.localizer.gettext(session.preferredLocale(), "selectOptionItem2");
                } else if (message.match(/헤드업디스플레이(HUD)/) || message.match(/헤드업 디스플레이(HUD)/) || message.match(/헤드업 디스플레이 (HUD)/) || message.match(/헤드업디스플레이/) || message.match(/헤드업 디스플레이/) || message.match(/HUD/)) {
                    modelOptionNumberVar = 3;
                    optionNm = session.localizer.gettext(session.preferredLocale(), "selectOptionItem5");
                } else if (message.match(/현대스마트센스패키지II/) || message.match(/현대 스마트센스패키지II/) || message.match(/현대 스마트 센스패키지II/) || message.match(/현대 스마트 센스 패키지II/) || message.match(/현대 스마트 센스 패키지 II/)) {
                    modelOptionNumberVar = 4;
                    optionNm = session.localizer.gettext(session.preferredLocale(), "selectOptionItem9");
                } else {
                    modelOptionNumberVar = 0;
                }
            } else if (message.match(/디젤 2.2/) || message.match(/디젤2.2/)) {
                
                engineNameVar = session.localizer.gettext(session.preferredLocale(), "diesel2.2"); 
                
                if (message.match(/모던/)) {
                    
                    modelNameVar = session.localizer.gettext(session.preferredLocale(), "basicOptionModern");
                    modelNumberVar = 8;
                    carPriceVar = 33550000;
                    
                    if (message.match(/파노라마 썬루프/) || message.match(/파노라마썬루프/)) {
                        modelOptionNumberVar = 3;
                        optionNm = session.localizer.gettext(session.preferredLocale(), "selectOptionItem1");
                    } else if (message.match(/TUIX 컴포트 패키지/) || message.match(/TUIX 컴포트패키지/) || message.match(/TUIX컴포트패키지/) || message.match(/튜익스 컴포트 패키지/) || message.match(/튜익스 컴포트패키지/) || message.match(/튜익스컴포트패키지/)) {
                        modelOptionNumberVar = 2;
                        optionNm = session.localizer.gettext(session.preferredLocale(), "selectOptionItem2");
                    } else if (message.match(/앞좌석통풍/) || message.match(/앞좌석 통풍/) || message.match(/앞 좌석 통풍/)) {
                        modelOptionNumberVar = 1;
                        optionNm = session.localizer.gettext(session.preferredLocale(), "selectOptionItem3");
                    } else if (message.match(/하이패스 시스템/) || message.match(/하이패스시스템/) || message.match(/하이 패스 시스템/)) {
                        modelOptionNumberVar = 1;
                        optionNm = session.localizer.gettext(session.preferredLocale(), "selectOptionItem3");
                    } else if (message.match(/현대스마트센스패키지IV/) || message.match(/현대 스마트센스패키지IV/) || message.match(/현대 스마트 센스패키지IV/) || message.match(/현대 스마트 센스 패키지IV/) || message.match(/현대 스마트 센스 패키지 IV/)) {
                        modelOptionNumberVar = 4;
                        optionNm = session.localizer.gettext(session.preferredLocale(), "selectOptionItem10");
                    } else {
                        modelOptionNumberVar = 0;
                    }
                } else if (message.match(/프리미엄 스페셜/g) || message.match(/프리미엄스페셜/g)) {
                    
                    modelNameVar = session.localizer.gettext(session.preferredLocale(), "basicOptionPremiumSpecial"); 
                    modelNumberVar = 10;
                    carPriceVar = 36750000;
                    
                    if (message.match(/파노라마 썬루프/) || message.match(/파노라마썬루프/)) {
                        modelOptionNumberVar = 4;
                        optionNm = session.localizer.gettext(session.preferredLocale(), "selectOptionItem1");
                    } else if (message.match(/TUIX 컴포트 패키지/) || message.match(/TUIX 컴포트패키지/) || message.match(/TUIX컴포트패키지/) || message.match(/튜익스 컴포트 패키지/) || message.match(/튜익스 컴포트패키지/) || message.match(/튜익스컴포트패키지/)) {
                        modelOptionNumberVar = 3;
                        optionNm = session.localizer.gettext(session.preferredLocale(), "selectOptionItem2");
                    } else if (message.match(/헤드업디스플레이(HUD)/) || message.match(/헤드업 디스플레이(HUD)/) || message.match(/헤드업 디스플레이 (HUD)/) || message.match(/헤드업디스플레이/) || message.match(/헤드업 디스플레이/) || message.match(/HUD/)) {
                        modelOptionNumberVar = 5;
                        optionNm = session.localizer.gettext(session.preferredLocale(), "selectOptionItem5");
                    } else if (message.match(/현대스마트센스패키지II/) || message.match(/현대 스마트센스패키지II/) || message.match(/현대 스마트 센스패키지II/) || message.match(/현대 스마트 센스 패키지II/) || message.match(/현대 스마트 센스 패키지 II/)) {
                        modelOptionNumberVar = 6;
                        optionNm = session.localizer.gettext(session.preferredLocale(), "selectOptionItem9");
                    } else if (message.match(/익스테리어패키지II/) || message.match(/익스테리어 패키지II/) || message.match(/익스테리어 패키지 II/) || message.match(/익스테리어패키지 II/)) {
                        modelOptionNumberVar = 2;
                        optionNm = session.localizer.gettext(session.preferredLocale(), "selectOptionItem7");
                    } else if (message.match(/JBL사운드패키지/) || message.match(/JBL 사운드패키지/) || message.match(/JBL 사운드 패키지/)) {
                        modelOptionNumberVar = 7;
                        optionNm = session.localizer.gettext(session.preferredLocale(), "selectOptionItem4");
                    } else if (message.match(/어라운드뷰모니터(AVM)/) || message.match(/어라운드 뷰모니터(AVM)/) || message.match(/어라운드 뷰 모니터(AVM)/) || message.match(/어라운드 뷰 모니터 (AVM)/)) {
                        modelOptionNumberVar = 1;
                        optionNm = session.localizer.gettext(session.preferredLocale(), "selectOptionItem11");
                    } else if (message.match(/스마트전동식트렁크/) || message.match(/스마트 전동식트렁크/) || message.match(/스마트 전동식 트렁크/) || message.match(/스마트전동식 트렁크/)) {
                        modelOptionNumberVar = 1;
                        optionNm = session.localizer.gettext(session.preferredLocale(), "selectOptionItem11");
                    } else {
                        modelOptionNumberVar = 0;
                    }
                } else if (message.match(/프리미엄/)) {
                    
                    modelNameVar = session.localizer.gettext(session.preferredLocale(), "basicOptionPremium"); 
                    modelNumberVar = 9;
                    carPriceVar = 34750000;
                    
                    if (message.match(/파노라마 썬루프/) || message.match(/파노라마썬루프/)) {
                        modelOptionNumberVar = 3;
                        optionNm = session.localizer.gettext(session.preferredLocale(), "selectOptionItem1");
                    } else if (message.match(/TUIX 컴포트 패키지/) || message.match(/TUIX 컴포트패키지/) || message.match(/TUIX컴포트패키지/) || message.match(/튜익스 컴포트 패키지/) || message.match(/튜익스 컴포트패키지/) || message.match(/튜익스컴포트패키지/)) {
                        modelOptionNumberVar = 2;
                        optionNm = session.localizer.gettext(session.preferredLocale(), "selectOptionItem2");
                    } else if (message.match(/헤드업디스플레이(HUD)/) || message.match(/헤드업 디스플레이(HUD)/) || message.match(/헤드업 디스플레이 (HUD)/) || message.match(/헤드업디스플레이/) || message.match(/헤드업 디스플레이/) || message.match(/HUD/)) {
                        modelOptionNumberVar = 4;
                        optionNm = session.localizer.gettext(session.preferredLocale(), "selectOptionItem5");
                    } else if (message.match(/현대스마트센스패키지I/) || message.match(/현대 스마트센스패키지I/) || message.match(/현대 스마트 센스패키지I/) || message.match(/현대 스마트 센스 패키지I/) || message.match(/현대 스마트 센스 패키지 I/)) {
                        modelOptionNumberVar = 5;
                        optionNm = session.localizer.gettext(session.preferredLocale(), "selectOptionItem8");
                    } else if (message.match(/익스테리어패키지I/) || message.match(/익스테리어 패키지I/) || message.match(/익스테리어 패키지 I/) || message.match(/익스테리어패키지 I/)) {
                        modelOptionNumberVar = 1;
                        optionNm = session.localizer.gettext(session.preferredLocale(), "selectOptionItem6");
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
