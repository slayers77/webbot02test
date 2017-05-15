var builder = require('botbuilder');
var query = require('../../config/query');
var date = require('date-utils');
var tts = require('../../TTSService');
var audioPath = 'http://taiholabchatbot.azurewebsites.net';

function introMsg(session, msg, fileName) {
    var text = session.localizer.gettext(session.preferredLocale(), msg);
    tts.Synthesize(text, fileName);
    var audioMsg = new builder.Message(session);
    audioMsg.attachmentLayout(builder.AttachmentLayout.carousel);
    audioMsg.attachments([
        new builder.AudioCard(session)
            .text(text)
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
    1. 한국어 편의사항 초기 메뉴
    ************************************************************************************/

    bot.dialog('/korConvenienceMain', [

        function (session, args) {
            /*
            var convenienceMainMessgae = session.localizer.gettext(session.preferredLocale(), "convenienceMainMessgae");
            tts.Synthesize(convenienceMainMessgae, 'convenienceMainMessgae');
            
            var audioMsg = new builder.Message(session);
            audioMsg.attachmentLayout(builder.AttachmentLayout.carousel);
            audioMsg.attachments([
                new builder.AudioCard(session)
                    .text(convenienceMainMessgae)
                    .autostart(true)
                    .media([
                    { url: audioPath + '/convenienceMainMessgae.mp3' }
                ])
            ]);

            session.send(audioMsg);
            */
            if (session.preferredLocale() == "Kr") {
                introMsg(session, "convenienceMainMessgae", "convenienceMainMessgae");
            } else if (session.preferredLocale() == "En") {
                introMsg(session, "convenienceMainMessgae", "enConvenienceMainMessgae");
            }
            var msg = new builder.Message(session)
                .textFormat(builder.TextFormat.xml)
                //.attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments([
                    //AnimationCard
                    new builder.HeroCard(session)
                        .title(session.localizer.gettext(session.preferredLocale(), "convenienceTitleName"))
                        .subtitle(session.localizer.gettext(session.preferredLocale(), "convenienceWelcomeMessage"))
                        .images([
                            builder.CardImage.create(session, img_path + "/images/convenience/convenience00.png")
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "smartSenseClickMessage"), session.localizer.gettext(session.preferredLocale(), "smartSense")),
                            builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "infotainmentClickMessage"), session.localizer.gettext(session.preferredLocale(), "infotainment")),
                            builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "safetyClickMessage"), session.localizer.gettext(session.preferredLocale(), "safety"))
                        ])
            ]);
            
            //session.send(msg);
            //var msg1 = new builder.Message(session)
            //    .textFormat(builder.TextFormat.xml)
            //    //.attachmentLayout(builder.AttachmentLayout.carousel)
            //    .attachments([
            //        //AnimationCard
            //    new builder.HeroCard(session)
            //            .buttons([
            //        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "smartSenseClickMessage"), session.localizer.gettext(session.preferredLocale(), "smartSense")),
            //        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "infotainmentClickMessage"), session.localizer.gettext(session.preferredLocale(), "infotainment")),
            //        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "safetyClickMessage"), session.localizer.gettext(session.preferredLocale(), "safety"))
            //    ])
            //]);
            builder.Prompts.choice(session, msg, session.localizer.gettext(session.preferredLocale(), "convenienceMenuList"));
            
            session.endDialog();
            
            responseTime = parseInt(date.getTime()) - parseInt(args.beginTime);
            query.insertHistoryQuery(args, responseTime, function (err, result) {
                if (!err) {
                    console.log("query.getData : " + result);
                }
            });
        }
        //, function (session, results) {
        //    //session.send('당신의 선택 메뉴 : %s!', results.response.entity);
        //    if (results.response.entity == '스마트센스') {
        //        session.beginDialog('/smartsense');
        //    }
        //    else if (results.response.entity == '인포테인먼트') {
        //        session.beginDialog('/infotainment');
        //    }
        //    else if (results.response.entity == '안전') {
        //        session.beginDialog('/safe');

        //    }
        //}

    ]);


    /***********************************************************************************
   1. 한국어 편의사항 - 스마트 센스 초기메뉴
   ************************************************************************************/


    //스마트센스


    bot.dialog('/korConvenienceSmartSenseSimple', [
    
        function (session, args, results) {
            /*
            var smartSenseMainMessage = session.localizer.gettext(session.preferredLocale(), "smartSenseMainMessage");
            tts.Synthesize(smartSenseMainMessage, 'smartSenseMainMessage');
            
            var audioMsg = new builder.Message(session);
            audioMsg.attachmentLayout(builder.AttachmentLayout.carousel);
            audioMsg.attachments([
                new builder.AudioCard(session)
                    .text(smartSenseMainMessage)
                    .autostart(true)
                    .media([
                    { url: audioPath + '/smartSenseMainMessage.mp3' }
                ])
            ]);

            session.send(audioMsg);
            */
            if (session.preferredLocale() == "Kr") {
                introMsg(session, "smartSenseMainMessage", "smartSenseMainMessage");
            } else if (session.preferredLocale() == "En") {
                introMsg(session, "smartSenseMainMessage", "enSmartSenseMainMessage");
            }
            //if (results.response.entity == '스마트 센스 소개') {
                var msg = new builder.Message(session)
                    .textFormat(builder.TextFormat.xml)
                    //.attachmentLayout(builder.AttachmentLayout.carousel)
                    .attachments([
                        //AnimationCard
                    new builder.HeroCard(session)
                            .title(session.localizer.gettext(session.preferredLocale(), "smartSenseTitleName"))
                            .subtitle(session.localizer.gettext(session.preferredLocale(), "smartSenseSubtitleMessage"))
                            .images([
                                builder.CardImage.create(session, img_path + "/images/convenience/smartsense/smartsense0.png")
                ])
                            .buttons([
                    builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "smartSenseDetailClickMessgae"), session.localizer.gettext(session.preferredLocale(), "smartSenseDetail"))
                ])
            ]);
            
            session.send(msg);
            //var msg1 = new builder.Message(session)
            //        .textFormat(builder.TextFormat.xml)
            //        //.attachmentLayout(builder.AttachmentLayout.carousel)
            //        .attachments([
            //            //AnimationCard
            //    new builder.HeroCard(session)
            //                .buttons([
            //        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "smartSenseDetailClickMessgae"), session.localizer.gettext(session.preferredLocale(), "smartSenseDetail"))
            //    ])
            //]);
            //session.send(msg1);
            session.endDialog();
            
            responseTime = parseInt(date.getTime()) - parseInt(args.beginTime);
            query.insertHistoryQuery(args, responseTime, function (err, result) {
                if (!err) {
                    console.log("query.getData : " + result);
                }
            });
            }
    
    ]);
    
    
    bot.dialog('/korConvenienceSmartsenseList', [
    
        function (session, args) {
            /*
            var smartSenseDetailMessage = session.localizer.gettext(session.preferredLocale(), "smartSenseDetailMessage");
            tts.Synthesize(smartSenseDetailMessage, 'smartSenseDetailMessage');
            
            var audioMsg = new builder.Message(session);
            audioMsg.attachmentLayout(builder.AttachmentLayout.carousel);
            audioMsg.attachments([
                new builder.AudioCard(session)
                    .text(smartSenseDetailMessage)
                    .autostart(true)
                    .media([
                    { url: audioPath + '/smartSenseDetailMessage.mp3' }
                ])
            ]);
            
            session.send(audioMsg);
            */
            if (session.preferredLocale() == "Kr") {
                introMsg(session, "smartSenseDetailMessage", "smartSenseDetailMessage");
            } else if (session.preferredLocale() == "En") {
                introMsg(session, "smartSenseDetailMessage", "enSmartSenseDetailMessage");
            }

            var msg = new builder.Message(session)
                        .textFormat(builder.TextFormat.xml)
                        .attachmentLayout(builder.AttachmentLayout.carousel)
                        .attachments([
                            //AnimationCard
                new builder.HeroCard(session)
                                .title(session.localizer.gettext(session.preferredLocale(), "smartSenseDetailItem1"))
                                .subtitle(session.localizer.gettext(session.preferredLocale(), "smartSenseDetailItem1SubtitleMessage"))
                                .images([
                    builder.CardImage.create(session, img_path + "/images/convenience/smartsense/smartsense1.png")
                ]),
                new builder.HeroCard(session)
                                .title(session.localizer.gettext(session.preferredLocale(), "smartSenseDetailItem2"))
                                .subtitle(session.localizer.gettext(session.preferredLocale(), "smartSenseDetailItem2SubtitleMessage"))
                                .images([
                    builder.CardImage.create(session, img_path + "/images/convenience/smartsense/smartsense2.png")
                ]),
                new builder.HeroCard(session)
                                .title(session.localizer.gettext(session.preferredLocale(), "smartSenseDetailItem3"))
                                .subtitle(session.localizer.gettext(session.preferredLocale(), "smartSenseDetailItem3SubtitleMessage"))
                                .images([
                    builder.CardImage.create(session, img_path + "/images/convenience/smartsense/smartsense3.png")
                ]),
                new builder.HeroCard(session)
                                .title(session.localizer.gettext(session.preferredLocale(), "smartSenseDetailItem4"))
                                .subtitle(session.localizer.gettext(session.preferredLocale(), "smartSenseDetailItem4SubtitleMessage"))
                                .images([
                    builder.CardImage.create(session, img_path + "/images/convenience/smartsense/smartsense4.png")
                ]),
                new builder.HeroCard(session)
                                .title(session.localizer.gettext(session.preferredLocale(), "smartSenseDetailItem5"))
                                .subtitle(session.localizer.gettext(session.preferredLocale(), "smartSenseDetailItem5SubtitleMessage"))
                                .images([
                    builder.CardImage.create(session, img_path + "/images/convenience/smartsense/smartsense5.png")
                ]),
                new builder.HeroCard(session)
                                .title(session.localizer.gettext(session.preferredLocale(), "smartSenseDetailItem6"))
                                .subtitle(session.localizer.gettext(session.preferredLocale(), "smartSenseDetailItem6SubtitleMessage"))
                                .images([
                    builder.CardImage.create(session, img_path + "/images/convenience/smartsense/smartsense6.png")
                ]),
                new builder.HeroCard(session)
                                .title(session.localizer.gettext(session.preferredLocale(), "smartSenseDetailItem7"))
                                .subtitle(session.localizer.gettext(session.preferredLocale(), "smartSenseDetailItem7SubtitleMessage"))
                                .images([
                    builder.CardImage.create(session, img_path + "/images/convenience/smartsense/smartsense7.png")
                ])
            ]);
            
            session.send(msg);

            var msg = new builder.Message(session)
                            .attachments([
            
                new builder.HeroCard(session)
                                    .title("")
                                    .text(session.localizer.gettext(session.preferredLocale(), "induceSmartsenseToTestDrive"))
                                    .buttons([
                    builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "testDriveClickMessage"), session.localizer.gettext(session.preferredLocale(), "priceReciptEndYesMessage")), 
                    builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "No"), session.localizer.gettext(session.preferredLocale(), "No"))
                ])
            ]);
            
            //session.send(msg);

            //var msg1 = new builder.Message(session)
            //                .attachments([
            
            //    new builder.HeroCard(session)
            //                        .buttons([
            //        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "testDriveClickMessage"), session.localizer.gettext(session.preferredLocale(), "priceReciptEndYesMessage")), 
            //        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "No"), session.localizer.gettext(session.preferredLocale(), "No"))
            //    ])
            //]);

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
    1. 한국어 편의사항 - 인포테인먼트 초기 메뉴
    ************************************************************************************/


    //인포테인먼트


    bot.dialog('/korConvenienceInfotainmentSimple', [
    
        function (session, args, results) {
            /*
            var InfotainmentMainMessage = session.localizer.gettext(session.preferredLocale(), "InfotainmentMainMessage");
            tts.Synthesize(InfotainmentMainMessage, 'InfotainmentMainMessage');
            
            var audioMsg = new builder.Message(session);
            audioMsg.attachmentLayout(builder.AttachmentLayout.carousel);
            audioMsg.attachments([
                new builder.AudioCard(session)
                    .text(InfotainmentMainMessage)
                    .autostart(true)
                    .media([
                    { url: audioPath + '/InfotainmentMainMessage.mp3' }
                ])
            ]);

            session.send(audioMsg);
            */
            if (session.preferredLocale() == "Kr") {
                introMsg(session, "InfotainmentMainMessage", "InfotainmentMainMessage");
            } else if (session.preferredLocale() == "En") {
                introMsg(session, "InfotainmentMainMessage", "enInfotainmentMainMessage");
            }

            var msg = new builder.Message(session)
                    .textFormat(builder.TextFormat.xml)
                    //.attachmentLayout(builder.AttachmentLayout.carousel)
                    .attachments([
                        //AnimationCard
                new builder.HeroCard(session)
                            .title(session.localizer.gettext(session.preferredLocale(), "infotainmentTitleName"))
                            .subtitle(session.localizer.gettext(session.preferredLocale(), "infotainmentSubtitleMessage"))
                            .images([
                    builder.CardImage.create(session, "http://www.hyundai.com/kr/dsp/20161122094424247104.jpg")
                ])
                            .buttons([
                    builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "infotainmentDetailClickMessage"), session.localizer.gettext(session.preferredLocale(), "infotainmentDetail"))
                ])
            ]);
            session.send(msg);
            
            
            //var msg1 = new builder.Message(session)
            //        .textFormat(builder.TextFormat.xml)
            //        //.attachmentLayout(builder.AttachmentLayout.carousel)
            //        .attachments([
            //            //AnimationCard
            //    new builder.HeroCard(session)
            //                 .buttons([
            //        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "infotainmentDetailClickMessage"), session.localizer.gettext(session.preferredLocale(), "infotainmentDetail"))
            //    ])
            //]);
            //session.send(msg1);

            session.endDialog();
            
            responseTime = parseInt(date.getTime()) - parseInt(args.beginTime);
            query.insertHistoryQuery(args, responseTime, function (err, result) {
                if (!err) {
                    console.log("query.getData : " + result);
                }
            });
        }
    
    
    ]);
    
    
    bot.dialog('/korConvenienceInfotainmentList', [
    
        function (session, args, results) {
            /*
            var InfotainmentDetailMessage = session.localizer.gettext(session.preferredLocale(), "InfotainmentDetailMessage");
            tts.Synthesize(InfotainmentDetailMessage, 'InfotainmentDetailMessage');
            
            var audioMsg = new builder.Message(session);
            audioMsg.attachmentLayout(builder.AttachmentLayout.carousel);
            audioMsg.attachments([
                new builder.AudioCard(session)
                    .text(InfotainmentDetailMessage)
                    .autostart(true)
                    .media([
                    { url: audioPath + '/InfotainmentDetailMessage.mp3' }
                ])
            ]);

            session.send(audioMsg);
            */
            if (session.preferredLocale() == "Kr") {
                introMsg(session, "InfotainmentDetailMessage", "InfotainmentDetailMessage");
            } else if (session.preferredLocale() == "En") {
                introMsg(session, "InfotainmentDetailMessage", "enInfotainmentDetailMessage");
            }

            var msg = new builder.Message(session)
                        .textFormat(builder.TextFormat.xml)
                        .attachmentLayout(builder.AttachmentLayout.carousel)
                        .attachments([
                            //AnimationCard
                new builder.HeroCard(session)
                                .subtitle(session.localizer.gettext(session.preferredLocale(), "infotainmentDetailItem1"))
                                .images([
                    builder.CardImage.create(session, img_path + "/images/convenience/infotainment/infotainment1.png")
                ]),
                new builder.HeroCard(session)
                                .subtitle(session.localizer.gettext(session.preferredLocale(), "infotainmentDetailItem2"))
                                .images([
                    builder.CardImage.create(session, img_path + "/images/convenience/infotainment/infotainment2.png")
                ]),
                new builder.HeroCard(session)
                                .subtitle(session.localizer.gettext(session.preferredLocale(), "infotainmentDetailItem3"))
                                .images([
                    builder.CardImage.create(session, img_path + "/images/convenience/infotainment/infotainment3.png")
                ]),
                new builder.HeroCard(session)
                                .subtitle(session.localizer.gettext(session.preferredLocale(), "infotainmentDetailItem4"))
                                .images([
                    builder.CardImage.create(session, img_path + "/images/convenience/infotainment/infotainment4.png")
                ])
            ]);
            session.send(msg);
            
            

            var msg = new builder.Message(session)
                            .attachments([
            
                new builder.HeroCard(session)
                                    .title("")
                                    .text(session.localizer.gettext(session.preferredLocale(), "induceinfotainmentToTestDrive"))
                                    .buttons([
                    builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "testDriveClickMessage"), session.localizer.gettext(session.preferredLocale(), "priceReciptEndYesMessage")), 
                    builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "No"), session.localizer.gettext(session.preferredLocale(), "No"))
                ])
            ]);
            
            //session.send(msg);
            
            //var msg1 = new builder.Message(session)
            //                .attachments([
            
            //    new builder.HeroCard(session)
            //                        .buttons([
            //        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "testDriveClickMessage"), session.localizer.gettext(session.preferredLocale(), "priceReciptEndYesMessage")), 
            //        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "No"), session.localizer.gettext(session.preferredLocale(), "No"))
            //    ])
            //]);
            
            

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


    //bot.dialog('/infotainment', [
    //    function (session, args) {
    //        builder.Prompts.choice(session, '원하시는 메뉴를 선택하세요? 선택하시거나 질문해주세요!!!', '인포테인먼트 소개|인포테인먼트 세부목록|인포테인먼트 세부목록 링크', { listStyle: builder.ListStyle.button });
    //    }, function (session, results) {

    //        //session.send('당신의 선택 메뉴 : %s!', results.response.entity);
    //        if (results.response.entity == '인포테인먼트 소개') {
    //            var msg = new builder.Message(session)
    //                .textFormat(builder.TextFormat.xml)
    //                //.attachmentLayout(builder.AttachmentLayout.carousel)
    //                .attachments([
    //                    //AnimationCard
    //                    new builder.HeroCard(session)
    //                        .title("Infotainment")
    //                        .subtitle("스마트 멀티미디어 시스템과 고품격 사운드 시스템 등 고급 준대형 세단이 가져야 할 모든 편의사양들이 적용되었습니다. 당신의 삶을 스마트하게 케어할 수 있도록 그랜저가 한 발 더 앞서갑니다.")
    //                        .images([
    //                            builder.CardImage.create(session, "http://www.hyundai.com/kr/dsp/20161122094424247104.jpg")
    //                        ])
    //                ]);
    //        }
    //        else if (results.response.entity == '인포테인먼트 세부목록') {
    //            //session.send('당신의 선택 메뉴 : %s!', results.response.entity);
    //            if (results.response.entity == '인포테인먼트 세부목록') {
    //                var msg = new builder.Message(session)
    //                    .textFormat(builder.TextFormat.xml)
    //                    .attachmentLayout(builder.AttachmentLayout.carousel)
    //                    .attachments([
    //                        //AnimationCard
    //                        new builder.HeroCard(session)
    //                            .subtitle("8인치 내비게이션 & 폰 커넥티비티 (애플 카플레이, 미러링크 지원)")
    //                            .images([
    //                                builder.CardImage.create(session, img_path + "/images/convenience/infotainment/infotainment1.png")
    //                            ]),
    //                        new builder.HeroCard(session)
    //                            .subtitle("아날로그 시계 / 전동식 파킹 브레이크 (오토홀드 기능 포함)")
    //                            .images([
    //                                builder.CardImage.create(session, img_path + "/images/convenience/infotainment/infotainment2.png")
    //                            ]),
    //                        new builder.HeroCard(session)
    //                            .subtitle("JBL 프리미엄 사운드 시스템 (12 스피커)")
    //                            .images([
    //                                builder.CardImage.create(session, img_path + "/images/convenience/infotainment/infotainment3.png")
    //                            ]),
    //                        new builder.HeroCard(session)
    //                            .subtitle("동승석 워크인 스위치 / CDP (센터 콘솔 암레스트 내장)")
    //                            .images([
    //                                builder.CardImage.create(session, img_path + "/images/convenience/infotainment/infotainment4.png")
    //                            ])

    //                    ]);
    //            }
    //            //builder.Prompts.choice(session, '원하시는 메뉴를 선택하세요? 선택하시거나 질문해주세요!!', '인포테인먼트 소개|인포테인먼트 세부목록|인포테인먼트 세부목록 링크', { listStyle: builder.ListStyle.button });
    //        }
    //        else if (results.response.entity == '인포테인먼트 세부목록 링크') {
    //            session.send('인포테인먼트 세부목록 링크');
    //            //builder.Prompts.choice(session, '원하시는 메뉴를 선택하세요? 선택하시거나 질문해주세요!!', '안전 소개|안전 세부목록|안전 세부목록 링크', { listStyle: builder.ListStyle.button });

    //        }

    //        session.send(msg);
    //        session.beginDialog('/return');
    //    }
    //]);


    /***********************************************************************************
    1. 한국어 편의사항 - 안전 초기 메뉴
    ************************************************************************************/
    //안전

    bot.dialog('/korConvenienceSafetySimple', [
    
        function (session, args, results) {
            /*
            var safetyMainMessage = session.localizer.gettext(session.preferredLocale(), "safetyMainMessage");
            tts.Synthesize(safetyMainMessage, 'safetyMainMessage');
            
            var audioMsg = new builder.Message(session);
            audioMsg.attachmentLayout(builder.AttachmentLayout.carousel);
            audioMsg.attachments([
                new builder.AudioCard(session)
                    .text(safetyMainMessage)
                    .autostart(true)
                    .media([
                    { url: audioPath + '/safetyMainMessage.mp3' }
                ])
            ]);

            session.send(audioMsg);
            */
            if (session.preferredLocale() == "Kr") {
                introMsg(session, "safetyMainMessage", "safetyMainMessage");
            } else if (session.preferredLocale() == "En") {
                introMsg(session, "safetyMainMessage", "enSafetyMainMessage");
            }
            var msg = new builder.Message(session)
                    .textFormat(builder.TextFormat.xml)
                    //.attachmentLayout(builder.AttachmentLayout.carousel)
                    .attachments([
                        //AnimationCard
                new builder.HeroCard(session)
                            .title(session.localizer.gettext(session.preferredLocale(), "safetyTitleName"))
                            .subtitle(session.localizer.gettext(session.preferredLocale(), "safetySubtitleMessage"))
                            .text(session.localizer.gettext(session.preferredLocale(), "safetyTextMessage"))
                            .images([
                    builder.CardImage.create(session, img_path + "/images/convenience/safe/safe0.jpg")
                ])
                            .buttons([
                    builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "safetyDetailClickMessgae"), session.localizer.gettext(session.preferredLocale(), "safetyDetail"))
                ])
            ]);
        

            session.send(msg);
    
            //var msg1 = new builder.Message(session)
            //                .textFormat(builder.TextFormat.xml)
            //                //.attachmentLayout(builder.AttachmentLayout.carousel)
            //                .attachments([
            //                    //AnimationCard
            //    new builder.HeroCard(session)
            //                        .buttons([
            //        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "safetyDetailClickMessgae"), session.localizer.gettext(session.preferredLocale(), "safetyDetail"))
            //    ])
            //]);
    
    
            //session.send(msg1);
            session.endDialog();
            
            responseTime = parseInt(date.getTime()) - parseInt(args.beginTime);
            query.insertHistoryQuery(args, responseTime, function (err, result) {
                if (!err) {
                    console.log("query.getData : " + result);
                }
            });

        }
    ]);

    
    bot.dialog('/korConvenienceSafetyList', [
    
        function (session, args, results) {
            /*
            var safetyDetailMessage = session.localizer.gettext(session.preferredLocale(), "safetyDetailMessage");
            tts.Synthesize(safetyDetailMessage, 'safetyDetailMessage');
            
            var audioMsg = new builder.Message(session);
            audioMsg.attachmentLayout(builder.AttachmentLayout.carousel);
            audioMsg.attachments([
                new builder.AudioCard(session)
                    .text(safetyDetailMessage)
                    .autostart(true)
                    .media([
                    { url: audioPath + '/safetyDetailMessage.mp3' }
                ])
            ]);
            session.send(audioMsg);
            */
            if (session.preferredLocale() == "Kr") {
                introMsg(session, "safetyDetailMessage", "safetyDetailMessage");
            } else if (session.preferredLocale() == "En") {
                introMsg(session, "safetyDetailMessage", "enSafetyDetailMessage");
            }
            var msg = new builder.Message(session)
                        .textFormat(builder.TextFormat.xml)
                        .attachmentLayout(builder.AttachmentLayout.carousel)
                        .attachments([
                            //AnimationCard
                new builder.HeroCard(session)
                                .title(session.localizer.gettext(session.preferredLocale(), "safetyDetailItem1"))
                                //.subtitle("부주의 운전 경보 시스템")
                                .images([
                    builder.CardImage.create(session, img_path + "/images/convenience/safe/safe1.jpg")
                ]),
                new builder.HeroCard(session)
                                .title(session.localizer.gettext(session.preferredLocale(), "safetyDetailItem2"))
                                .subtitle(session.localizer.gettext(session.preferredLocale(), "safetyDetailItem2SubtitleMessage"))
                                .images([
                    builder.CardImage.create(session, img_path + "/images/convenience/safe/safe2.jpg")
                ]),
                new builder.HeroCard(session)
                                .title(session.localizer.gettext(session.preferredLocale(), "safetyDetailItem3"))
                                //.subtitle("어드밴스드 스마트 크루즈 컨트롤")
                                .images([
                    builder.CardImage.create(session, img_path + "/images/convenience/safe/safe3.jpg")
                ]),
                new builder.HeroCard(session)
                                .title(session.localizer.gettext(session.preferredLocale(), "safetyDetailItem4"))
                                //.subtitle("어라운드 뷰 모니터")
                                .images([
                    builder.CardImage.create(session, img_path + "/images/convenience/safe/safe4.jpg")
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
                                    .text(session.localizer.gettext(session.preferredLocale(), "induceSafetyToTestDrive"))
                                    //.text(str)
                                    .buttons([
                    builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "testDriveClickMessage"), session.localizer.gettext(session.preferredLocale(), "priceReciptEndYesMessage")), 
                    //builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "returnMainMenu"), session.localizer.gettext(session.preferredLocale(), "priceReciptEndNoMessage"))
                    builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "No"), session.localizer.gettext(session.preferredLocale(), "No"))
                ])
            ]);
    
            //session.send(msg);
    
            //var msg1 = new builder.Message(session)
            //                        .attachments([
            
            //    new builder.HeroCard(session)
            //                                .title("")
            //                                .text(session.localizer.gettext(session.preferredLocale(), "induceSafetyToTestDrive"))
            //                                //.text(str)
            //                                .buttons([
            //        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "testDriveClickMessage"), session.localizer.gettext(session.preferredLocale(), "priceReciptEndYesMessage")), 
            //                //builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "returnMainMenu"), session.localizer.gettext(session.preferredLocale(), "priceReciptEndNoMessage"))
            //        builder.CardAction.imBack(session, session.localizer.gettext(session.preferredLocale(), "No"), session.localizer.gettext(session.preferredLocale(), "No"))
            //    ])
            //]);

            builder.Prompts.choice(session, msg, session.localizer.gettext(session.preferredLocale(), "YesOrNo"));
            session.endDialog();
        }
    ]);
    

    //bot.dialog('/safe', [
    //    function (session, args) {

    //        builder.Prompts.choice(session, '원하시는 메뉴를 선택하세요? 선택하시거나 질문해주세요!!!', '안전 소개|안전 세부목록|안전 세부목록 링크', { listStyle: builder.ListStyle.button });
    //    }, function (session, results) {

    //        //session.send('당신의 선택 메뉴 : %s!', results.response.entity);
    //        if (results.response.entity == '안전 소개') {
    //            var msg = new builder.Message(session)
    //                .textFormat(builder.TextFormat.xml)
    //                //.attachmentLayout(builder.AttachmentLayout.carousel)
    //                .attachments([
    //                    //AnimationCard
    //                    new builder.HeroCard(session)
    //                        .title("Safety")
    //                        .subtitle("안전에 관한 새로운 패러다임을 제시할 것")
    //                        .text("앞 차와 사고가 나기전에 미리, 뒤 차와 충돌하기 전에 미리, 차선을 벗어나기 전에 미리 그랜저에게 안전이란, 미리 사고를 예방하는 것입니다. 때론 알아서 멈추고 주변 360도를 확인시켜주고 운전자의 부주의를 챙기는 것까지 어떤 상황에서도 운전자와 보행자 모두의 안전을 지킬 수 있도록. 다시 처음부터 그랜저를 바꾸다")
    //                        .images([
    //                            builder.CardImage.create(session, img_path + "/images/convenience/safe/safe0.jpg")
    //                        ])

    //                ]);
    //        }
    //        else if (results.response.entity == '안전 세부목록') {
    //            //session.send('당신의 선택 메뉴 : %s!', results.response.entity);
    //            if (results.response.entity == '안전 세부목록') {
    //                var msg = new builder.Message(session)
    //                    .textFormat(builder.TextFormat.xml)
    //                    .attachmentLayout(builder.AttachmentLayout.carousel)
    //                    .attachments([
    //                        //AnimationCard
    //                        new builder.HeroCard(session)
    //                            .title("9 에어백 시스템")
    //                            //.subtitle("부주의 운전 경보 시스템")
    //                            .images([
    //                                builder.CardImage.create(session, img_path + "/images/convenience/safe/safe1.jpg")
    //                            ]),
    //                        new builder.HeroCard(session)
    //                            .title("차체 강성 향상")
    //                            .subtitle("기존차 대비 차체 평균 강도를 34% 개선, 차체 비틀림 강성이 23% 향상되고 충돌 시 객실 보호 성능이 강화되었습니다.")
    //                            .images([
    //                                builder.CardImage.create(session, img_path + "/images/convenience/safe/safe2.jpg")
    //                            ]),
    //                        new builder.HeroCard(session)
    //                            .title("전동식 파킹 브레이크 (오토홀드 기능 포함)")
    //                            //.subtitle("어드밴스드 스마트 크루즈 컨트롤")
    //                            .images([
    //                                builder.CardImage.create(session, img_path + "/images/convenience/safe/safe3.jpg")
    //                            ]),
    //                        new builder.HeroCard(session)
    //                            .title("세이프티 언락")
    //                            //.subtitle("어라운드 뷰 모니터")
    //                            .images([
    //                                builder.CardImage.create(session, img_path + "/images/convenience/safe/safe4.jpg")
    //                            ])
    //                    ]);
    //            }

    //        }
    //        else if (results.response.entity == '안전 세부목록 링크') {
    //            //session.send('당신의 선택 메뉴 : %s!', results.response.entity);
    //            var msg = new builder.Message(session)
    //                .textFormat(builder.TextFormat.xml)
    //                //.attachmentLayout(builder.AttachmentLayout.carousel)
    //                .attachments([
    //                    //AnimationCard
    //                    new builder.HeroCard(session)
    //                        //.title("SmartSense")
    //                        .subtitle("안전 세부목록 편집된 안내 페이지로 링크")
    //                        .images([
    //                            builder.CardImage.create(session, "http://www.hyundai.com/kr/images/showroom/grandeur_ig/img_visual_car3.png")
    //                        ])
    //                        .buttons([
    //                            builder.CardAction.openUrl(session, "http://www.hyundai.com/kr/showroom.do?carCd1=RD032&WT.ac=gnb_carkind_grandeur", "Go To SITE")])
    //                ]);

    //        }
    //        session.send(msg);
    //        session.beginDialog('/return');
    //    }
    //]);

    /***********************************************************************************
    1. 편의사항 되돌아가기
    ************************************************************************************/

    bot.dialog('/return', [
        function (session, args) {
            builder.Prompts.choice(session, session.localizer.gettext(session.preferredLocale(), "returnMessage"),
                session.localizer.gettext(session.preferredLocale(), "returnMenuList"), { listStyle: builder.ListStyle.button });
        }, function (session, results) {

            if (results.response.entity == session.localizer.gettext(session.preferredLocale(), "returnItem1")) {
                session.beginDialog('/smartsense');
            } else if (results.response.entity == session.localizer.gettext(session.preferredLocale(), "returnItem2")) {
                session.beginDialog('/infotainment');
            } else if (results.response.entity == session.localizer.gettext(session.preferredLocale(), "returnItem3")) {
                session.beginDialog('/safe');
            } else if (results.response.entity == session.localizer.gettext(session.preferredLocale(), "returnItem4")) {
                session.beginDialog('/korConvenience');
            } else if (results.response.entity == session.localizer.gettext(session.preferredLocale(), "returnItem5")) {
                session.beginDialog('/korMenu');
            }

        }
    ]);
}

module.exports = {
    create
}