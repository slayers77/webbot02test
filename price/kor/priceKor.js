var builder = require('botbuilder');

function create(bot) {
    /***********************************************************************************
    1. 한국어 가격 초기 메뉴(모델 카드)
    ************************************************************************************/

    bot.dialog('/korPrice', [

        function (session) {
            session.send("그랜저는 4가지 모델을 제공합니다.");
            var msg = new builder.Message(session)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments([
                    new builder.HeroCard(session)
                        .title("가솔린 2.4")
                        //.text("엔진형식 : 세타2 개선 2.4GDI\t\t배기량(cc) : 2,359\n\n최고출력(PS/rpm) : 100/6,000\n\n최대토크(kg.m/rpm) : 24.6/4,000")
                        .images([
                            builder.CardImage.create(session, img_path + "/images/price/Grandeur_24spec.PNG")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_24spec.PNG"))
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, "1 : 가솔린 2.4", "가솔린 2.4 선택")
                        ]),
                    new builder.HeroCard(session)
                        .title("가솔린 3.0")
                        .images([
                            builder.CardImage.create(session, img_path + "/images/price/Grandeur_30spec.PNG")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_30spec.PNG"))
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, "2 : 가솔린 3.0", "가솔린 3.0 선택")
                        ]),
                    new builder.HeroCard(session)
                        .title("가솔린 3.3")
                        .images([
                            builder.CardImage.create(session, img_path + "/images/price/Grandeur_33spec.PNG")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_33spec.PNG"))
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, "3 : 가솔린 3.3", "가솔린 3.3 선택")
                        ]),
                    new builder.HeroCard(session)
                        .title("디젤 2.2")
                        .images([
                            builder.CardImage.create(session, img_path + "/images/price/Grandeur_22spec.PNG")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_22spec.PNG"))
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, "4 : 디젤 2.2", "디젤 2.2 선택")
                        ])
                ]);
            builder.Prompts.choice(session, msg, "가솔린 2.4|가솔린 3.0|가솔린 3.3|디젤 2.2");
        },
        function (session, results) {
            if (results.response && results.response.entity != '(quit)') {
                // Select Model Menu
                if (results.response.entity == "가솔린 2.4" || results.response.entity == 1) {
                    session.beginDialog('/model24');
                } else if (results.response.entity == "가솔린 3.0" || results.response.entity == 2) {
                    session.beginDialog('/model30');
                } else if (results.response.entity == "가솔린 3.3" || results.response.entity == 3) {
                    session.beginDialog('/model33');
                } else if (results.response.entity == "디젤 2.2" || results.response.entity == 4) {
                    session.beginDialog('/model22');
                }
            } else {
                // Exit the menu
                session.endDialog();
            }
        }

    ]);






    /***********************************************************************************
    1. 한국어 가격 가솔린 2.4 메뉴(트림 카드)
    ************************************************************************************/

    bot.dialog('/model24', [

        function (session) {
            var msg = new builder.Message(session)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments([
                    new builder.HeroCard(session)
                        .title("모던(Modern)")
                        .text("가격 : 30,550,000 원")
                        .images([
                            builder.CardImage.create(session, img_path + "/images/price/Grandeur_modern.PNG")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_modern.PNG"))
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, "1 : 모던", "모던 품목")
                        ]),
                    new builder.HeroCard(session)
                        .title("프리미엄(Premium)")
                        .text("가격 : 31,750,000 원")
                        .images([
                            builder.CardImage.create(session, img_path + "/images/price/Grandeur_modern.PNG")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_modern.PNG"))
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, "2 : 프리미엄", "프리미엄 품목")
                        ]),
                    new builder.HeroCard(session)
                        .title("프리미엄 스페셜(Premium Special)")
                        .text("가격 : 33,750,000 원")
                        .images([
                            builder.CardImage.create(session, img_path + "/images/price/Grandeur_premiumSpecial.PNG")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_premiumSpecial.PNG"))
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, "3 : 프리미엄 스페셜", "프리미엄 스페셜 품목")
                        ])
                ]);
            builder.Prompts.choice(session, msg, "모던|프리미엄|프리미엄 스페셜");
        },
        function (session, results) {
            if (results.response && results.response.entity != '(quit)') {
                // Select Model Menu
                if (results.response.entity == "모던" || results.response.entity == 1) {
                    session.beginDialog('/model24_modern_trim');
                } else if (results.response.entity == "프리미엄" || results.response.entity == 2) {
                    session.beginDialog('/model24_premium_trim');
                } else if (results.response.entity == "프리미엄 스페셜" || results.response.entity == 3) {
                    session.beginDialog('/model24_premiumSpecial_trim');
                }
            } else {
                // Exit the menu
                session.endDialog();
            }
        }

    ]);

    /***********************************************************************************
    2. 한국어 가격 가솔린 3.0 메뉴(트림 카드)
    ************************************************************************************/

    bot.dialog('/model30', [

        function (session) {
            var msg = new builder.Message(session)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments([
                    new builder.HeroCard(session)
                        .title("익스클루시브(Exclusive)")
                        .text("가격 : 35,550,000 원")
                        .images([
                            builder.CardImage.create(session, img_path + "/images/price/Grandeur_exclusive.PNG")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_exclusive.PNG"))
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, "1 : 익스클루시브", "익스클루시브 품목")
                        ]),
                    new builder.HeroCard(session)
                        .title("익스클루시브 스페셜(Exclusive Special)")
                        .text("가격 : 31,750,000 원")
                        .images([
                            builder.CardImage.create(session, img_path + "/images/price/Grandeur_exclusive.PNG")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_exclusive.PNG"))
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, "2 : 익스클루시브", "익스클루시브 스페셜 품목")
                        ])
                ]);
            builder.Prompts.choice(session, msg, "익스클루시브|익스클루시브 스페셜");
        },
        function (session, results) {
            if (results.response && results.response.entity != '(quit)') {
                // Select Model Menu
                if (results.response.entity == "익스클루시브" || results.response.entity == 1) {
                    session.beginDialog('/model30_exclusive_trim');
                } else if (results.response.entity == "익스클루시브 스페셜" || results.response.entity == 2) {
                    session.beginDialog('/model30_exclusiveSpecial_trim');
                }
            } else {
                // Exit the menu
                session.endDialog();
            }
        }

    ]);

    /***********************************************************************************
    3. 한국어 가격 가솔린 3.3 메뉴(트림 카드)
    ************************************************************************************/

    bot.dialog('/model33', [

        function (session) {
            var msg = new builder.Message(session)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments([
                    new builder.HeroCard(session)
                        .title("셀러브리티(Celebrity)")
                        .text("가격 : 41,600,000 원")
                        .images([
                            builder.CardImage.create(session, img_path + "/images/price/Grandeur_celebrity.PNG")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_celebrity.PNG"))
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, "1 : 셀러브리티", "셀러브리티 품목")
                        ])
                ]);
            builder.Prompts.choice(session, msg, "셀러브리티");
        },
        function (session, results) {
            if (results.response && results.response.entity != '(quit)') {
                // Select Model Menu
                if (results.response.entity == "셀러브리티" || results.response.entity == 1) {
                    session.beginDialog('/model33_celebrity_trim');
                }
            } else {
                // Exit the menu
                session.endDialog();
            }
        }

    ]);

    /***********************************************************************************
    4. 한국어 가격 디젤 2.2 메뉴(트림 카드)
    ************************************************************************************/

    bot.dialog('/model22', [

        function (session) {
            var msg = new builder.Message(session)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments([
                    new builder.HeroCard(session)
                        .title("모던(Morden)")
                        .text("가격 : 33,550,000 원")
                        .images([
                            builder.CardImage.create(session, img_path + "/images/price/Grandeur_modern.PNG")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_modern.PNG"))
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, "1 : 모던", "모던 품목")
                        ]),
                    new builder.HeroCard(session)
                        .title("프리미엄(Premium)")
                        .text("가격 : 34,750,000 원")
                        .images([
                            builder.CardImage.create(session, img_path + "/images/price/Grandeur_modern.PNG")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_modern.PNG"))
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, "2 : 프리미엄", "프리미엄 품목")
                        ]),
                    new builder.HeroCard(session)
                        .title("프리미엄 스페셜(Premium Special)")
                        .text("가격 : 36,750,000 원")
                        .images([
                            builder.CardImage.create(session, img_path + "/images/price/Grandeur_premiumSpecial.PNG")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_premiumSpecial.PNG"))
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, "3 : 프리미엄 스페셜", "프리미엄 스페셜 품목")
                        ])
                ]);
            builder.Prompts.choice(session, msg, "모던|프리미엄|프리미엄 스페셜");
        },
        function (session, results) {
            if (results.response && results.response.entity != '(quit)') {
                // Select Model Menu
                if (results.response.entity == "모던" || results.response.entity == 1) {
                    session.beginDialog('/model22_modern_trim');
                } else if (results.response.entity == "프리미엄" || results.response.entity == 2) {
                    session.beginDialog('/model22_premium_trim');
                } else if (results.response.entity == "프리미엄 스페셜" || results.response.entity == 3) {
                    session.beginDialog('/model22_premiumSpecial_trim');
                }
            } else {
                // Exit the menu
                session.endDialog();
            }
        }

    ]);

    /***********************************************************************************
    1-1. 한국어 가격 - 가솔린 24 - 가솔린 24 모던 품목
    ************************************************************************************/

    bot.dialog('/model24_modern_trim', [
        function (session) {
            session.send("가솔린 2.4의 모던 트림 품목 입니다.");
            var msg = new builder.Message(session)
                .attachments([
                    new builder.ReceiptCard(session)
                        .title("Modern(모던) 기본품목")
                        .items([
                            builder.ReceiptItem.create(session, "생략", "파워트레인/성능"),
                            builder.ReceiptItem.create(session, "생략", "안전"),
                            builder.ReceiptItem.create(session, "생략", "외관"),
                            builder.ReceiptItem.create(session, "생략", "내장"),
                            builder.ReceiptItem.create(session, "생략", "시트"),
                            builder.ReceiptItem.create(session, "생략", "편의"),
                            builder.ReceiptItem.create(session, "생략", "멀티미디어"),
                        ])
                        .facts([
                            builder.Fact.create(session, "30,550,000", "주요사항")
                        ]),
                    new builder.ReceiptCard(session)
                        .title("Modern(모던) 선택품목")
                        .items([
                            builder.ReceiptItem.create(session, "1,100,000", "파노라마 썬루프"),
                            builder.ReceiptItem.create(session, "780,000", "TUIX 컴포트 패키지"),
                            builder.ReceiptItem.create(session, "600,000", "앞좌석 통풍+하이패스 시스템"),
                            builder.ReceiptItem.create(session, "1,800,000", "현대 스마트 센스 패키지IV")
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, "1 : 다른모델", "다른모델"),
                            builder.CardAction.imBack(session, "2 : 다른트림", "다른트림"),
                            builder.CardAction.imBack(session, "3 : 홈", "홈으로")
                        ])
                    /*.facts([
                        builder.Fact.create(session, "31,750,000", "주요사항")
                    ])*/
                ]);

            builder.Prompts.choice(session, msg, "다른모델|다른트림|홈");
        },

        function (session, results) {
            if (results.response && results.response.entity != '(quit)') {
                // Select Model Menu
                if (results.response.entity == "다른모델" || results.response.entity == 1) {
                    session.beginDialog('/korPrice');
                } else if (results.response.entity == "다른트림" || results.response.entity == 2) {
                    session.beginDialog('/model24');
                } else if (results.response.entity == "홈" || results.response.entity == 3) {
                    session.beginDialog('/korMenu');
                }
            } else {
                // Exit the menu
                session.endDialog();
            }
        }
    ]);

    /***********************************************************************************
    1-2. 한국어 가격 - 가솔린 24 - 가솔린 24 프리미엄 품목
    ************************************************************************************/

    bot.dialog('/model24_premium_trim', [
        function (session) {
            session.send("가솔린 2.4의 프리미엄 트림 품목 입니다.");
            var msg = new builder.Message(session)
                .attachments([
                    new builder.ReceiptCard(session)
                        .title("Premium(프리미엄) 기본품목")
                        .items([
                            builder.ReceiptItem.create(session, "", "가솔린 2.4 모던 기본 사양 및"),
                            builder.ReceiptItem.create(session, "생략", "안전"),
                            builder.ReceiptItem.create(session, "생략", "시트")
                        ])
                        .facts([
                            builder.Fact.create(session, "32,750,000", "주요사항")
                        ]),
                    new builder.ReceiptCard(session)
                        .title("Premium(프리미엄) 선택품목")
                        .items([
                            builder.ReceiptItem.create(session, "1,000,000", "헤드업 디스플레이(HUD)"),
                            builder.ReceiptItem.create(session, "1,500,000", "현대 스마트 센스 패키지I"),
                            builder.ReceiptItem.create(session, "1,500,000", "익스테리어 패키지I")
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, "1 : 다른모델", "다른모델"),
                            builder.CardAction.imBack(session, "2 : 다른트림", "다른트림"),
                            builder.CardAction.imBack(session, "3 : 홈", "홈으로")
                        ])
                ]);

            builder.Prompts.choice(session, msg, "다른모델|다른트림|홈");
        },

        function (session, results) {
            if (results.response && results.response.entity != '(quit)') {
                // Select Model Menu
                if (results.response.entity == "다른모델" || results.response.entity == 1) {
                    session.beginDialog('/korPrice');
                } else if (results.response.entity == "다른트림" || results.response.entity == 2) {
                    session.beginDialog('/model24');
                } else if (results.response.entity == "홈" || results.response.entity == 3) {
                    session.beginDialog('/korMenu');
                }
            } else {
                // Exit the menu
                session.endDialog();
            }
        }
    ]);

    /***********************************************************************************
    1-3. 한국어 가격 - 가솔린 24 - 가솔린 24 프리미엄 스페셜 품목
    ************************************************************************************/

    bot.dialog('/model24_premiumSpecial_trim', [
        function (session) {
            session.send("가솔린 2.4의 프리미엄 스페셜 트림 품목 입니다.");
            var msg = new builder.Message(session)
                .attachments([
                    new builder.ReceiptCard(session)
                        .title("Premium Special(프리미엄 스페셜) 기본품목")
                        .items([
                            builder.ReceiptItem.create(session, "", "가솔린 2.4 프리미엄 기본 사양 및"),
                            builder.ReceiptItem.create(session, "생략", "외관"),
                            builder.ReceiptItem.create(session, "생략", "내장"),
                            builder.ReceiptItem.create(session, "생략", "시트"),
                            builder.ReceiptItem.create(session, "생략", "편의")
                        ])
                        .facts([
                            builder.Fact.create(session, "33,750,000", "주요사항")
                        ]),
                    new builder.ReceiptCard(session)
                        .title("Premium Special(프리미엄 스페셜) 선택품목")
                        .items([
                            builder.ReceiptItem.create(session, "1,000,000", "헤드업 디스플레이(HUD)"),
                            builder.ReceiptItem.create(session, "1,600,000", "현대 스마트 센스 패키지II"),
                            builder.ReceiptItem.create(session, "1,000,000", "익스테리어 패키지II"),
                            builder.ReceiptItem.create(session, "1,150,000", "JBL 사운드 패키지"),
                            builder.ReceiptItem.create(session, "1,200,000", "어라운드 뷰 모니터(AVM)+스마트 전동식 트렁크"),
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, "1 : 다른모델", "다른모델"),
                            builder.CardAction.imBack(session, "2 : 다른트림", "다른트림"),
                            builder.CardAction.imBack(session, "3 : 홈", "홈으로")
                        ])
                ]);

            builder.Prompts.choice(session, msg, "다른모델|다른트림|홈");
        },

        function (session, results) {
            if (results.response && results.response.entity != '(quit)') {
                // Select Model Menu
                if (results.response.entity == "다른모델" || results.response.entity == 1) {
                    session.beginDialog('/korPrice');
                } else if (results.response.entity == "다른트림" || results.response.entity == 2) {
                    session.beginDialog('/model24');
                } else if (results.response.entity == "홈" || results.response.entity == 3) {
                    session.beginDialog('/korMenu');
                }
            } else {
                // Exit the menu
                session.endDialog();
            }
        }
    ]);

    /***********************************************************************************
    2-1. 한국어 가격 - 가솔린 30 - 가솔린 30 익스클루시브 품목
    ************************************************************************************/

    bot.dialog('/model30_exclusive_trim', [
        function (session) {
            session.send("가솔린 3.0의 익스클루시브 트림 품목 입니다.");
            var msg = new builder.Message(session)
                .attachments([
                    new builder.ReceiptCard(session)
                        .title("Exclusive(익스클루시브) 기본품목")
                        .items([
                            builder.ReceiptItem.create(session, "", "가솔린 2.4 프리미엄 스페셜 기본 사양 및"),
                            builder.ReceiptItem.create(session, "생략", "파워트레인"),
                            builder.ReceiptItem.create(session, "생략", "편의")
                        ])
                        .facts([
                            builder.Fact.create(session, "35,500,000", "주요사항")
                        ]),
                    new builder.ReceiptCard(session)
                        .title("Exclusive (익스클루시브) 선택품목")
                        .items([
                            builder.ReceiptItem.create(session, "1,100,000", "파노라마 썬루프"),
                            builder.ReceiptItem.create(session, "1,000,000", "헤드업 디스플레이(HUD)"),
                            builder.ReceiptItem.create(session, "1,600,000", "현대 스마트 센스 패키지II"),
                            builder.ReceiptItem.create(session, "780,000", "TUIX 컴포트 패키지"),
                            builder.ReceiptItem.create(session, "1,000,000", "익스테리어 패키지II"),
                            builder.ReceiptItem.create(session, "1,200,000", "어라운드 뷰 모니터(AVM)+스마트 전동식 트렁크")
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, "1 : 다른모델", "다른모델"),
                            builder.CardAction.imBack(session, "2 : 다른트림", "다른트림"),
                            builder.CardAction.imBack(session, "3 : 홈", "홈으로")
                        ])
                ]);

            builder.Prompts.choice(session, msg, "다른모델|다른트림|홈");
        },

        function (session, results) {
            if (results.response && results.response.entity != '(quit)') {
                // Select Model Menu
                if (results.response.entity == "다른모델" || results.response.entity == 1) {
                    session.beginDialog('/korPrice');
                } else if (results.response.entity == "다른트림" || results.response.entity == 2) {
                    session.beginDialog('/model30');
                } else if (results.response.entity == "홈" || results.response.entity == 3) {
                    session.beginDialog('/korMenu');
                }
            } else {
                // Exit the menu
                session.endDialog();
            }
        }
    ]);

    /***********************************************************************************
    2-2. 한국어 가격 - 가솔린 30 - 가솔린 30 익스클루시브 스페셜 품목
    ************************************************************************************/

    bot.dialog('/model30_exclusiveSpecial_trim', [
        function (session) {
            session.send("가솔린 3.0의 익스클루시브 스페셜 트림 품목 입니다.");
            var msg = new builder.Message(session)
                .attachments([
                    new builder.ReceiptCard(session)
                        .title("Exclusive Special(익스클루시브 스페셜) 기본품목")
                        .items([
                            builder.ReceiptItem.create(session, "", "가솔린 3.0 익스클루시브 기본 사양 및"),
                            builder.ReceiptItem.create(session, "생략", "외관"),
                            builder.ReceiptItem.create(session, "생략", "내장/편의")
                        ])
                        .facts([
                            builder.Fact.create(session, "38,700,000", "주요사항")
                        ]),
                    new builder.ReceiptCard(session)
                        .title("Exclusive Special(익스클루시브 스페셜) 선택품목")
                        .items([
                            builder.ReceiptItem.create(session, "1,150,000", "JBL 사운드 패키지"),
                            builder.ReceiptItem.create(session, "1,500,000", "프리미어 인테리어 셀렉션")
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, "1 : 다른모델", "다른모델"),
                            builder.CardAction.imBack(session, "2 : 다른트림", "다른트림"),
                            builder.CardAction.imBack(session, "3 : 홈", "홈으로")
                        ])
                ]);

            builder.Prompts.choice(session, msg, "다른모델|다른트림|홈");
        },

        function (session, results) {
            if (results.response && results.response.entity != '(quit)') {
                // Select Model Menu
                if (results.response.entity == "다른모델" || results.response.entity == 1) {
                    session.beginDialog('/korPrice');
                } else if (results.response.entity == "다른트림" || results.response.entity == 2) {
                    session.beginDialog('/model30');
                } else if (results.response.entity == "홈" || results.response.entity == 3) {
                    session.beginDialog('/korMenu');
                }
            } else {
                // Exit the menu
                session.endDialog();
            }
        }
    ]);

    /***********************************************************************************
    3-1. 한국어 가격 - 가솔린 33 - 가솔린 33 셀러브리티 품목
    ************************************************************************************/

    bot.dialog('/model33_celebrity_trim', [
        function (session) {
            session.send("가솔린 3.3의 셀레브리티 트림 품목 입니다.");
            var msg = new builder.Message(session)
                .attachments([
                    new builder.ReceiptCard(session)
                        .title("Celebrity(셀레브리티) 기본품목")
                        .items([
                            builder.ReceiptItem.create(session, "", "가솔린 3.0 익스클루시브 스페셜 기본 사양 및"),
                            builder.ReceiptItem.create(session, "생략", "파워트레인"),
                            builder.ReceiptItem.create(session, "생략", "외관"),
                            builder.ReceiptItem.create(session, "생략", "내장"),
                            builder.ReceiptItem.create(session, "생략", "시트"),
                            builder.ReceiptItem.create(session, "생략", "편의"),
                            builder.ReceiptItem.create(session, "생략", "멀티미디어")
                        ])
                        .facts([
                            builder.Fact.create(session, "41,600,000", "주요사항")
                        ]),
                    new builder.ReceiptCard(session)
                        .title("Celebrity(셀레브리티) 선택품목")
                        .items([
                            builder.ReceiptItem.create(session, "1,100,000", "파노라마 썬루프"),
                            builder.ReceiptItem.create(session, "1,000,000", "헤드업 디스플레이(HUD)"),
                            builder.ReceiptItem.create(session, "1,600,000", "현대 스마트 센스 패키지II"),
                            builder.ReceiptItem.create(session, "780,000", "TUIX 컴포트 패키지")
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, "1 : 다른모델", "다른모델"),
                            builder.CardAction.imBack(session, "2 : 다른트림", "다른트림"),
                            builder.CardAction.imBack(session, "3 : 홈", "홈으로")
                        ])
                ]);

            builder.Prompts.choice(session, msg, "다른모델|다른트림|홈");
        },

        function (session, results) {
            if (results.response && results.response.entity != '(quit)') {
                // Select Model Menu
                if (results.response.entity == "다른모델" || results.response.entity == 1) {
                    session.beginDialog('/korPrice');
                } else if (results.response.entity == "다른트림" || results.response.entity == 2) {
                    session.beginDialog('/model33');
                } else if (results.response.entity == "홈" || results.response.entity == 3) {
                    session.beginDialog('/korMenu');
                }
            } else {
                // Exit the menu
                session.endDialog();
            }
        }
    ]);

    /***********************************************************************************
    4-1. 한국어 가격 - 디젤 22 - 디젤 22 모던 품목
    ************************************************************************************/

    bot.dialog('/model22_modern_trim', [
        function (session) {
            session.send("디젤 2.2의 모던 트림 품목 입니다.");
            var msg = new builder.Message(session)
                .attachments([
                    new builder.ReceiptCard(session)
                        .title("Modern(모던) 기본품목")
                        .items([
                            builder.ReceiptItem.create(session, "", "가솔린 2.4 모던 기본 사양 및"),
                            builder.ReceiptItem.create(session, "생략", "파워트레인")
                        ])
                        .facts([
                            builder.Fact.create(session, "33,550,000", "주요사항")
                        ]),
                    new builder.ReceiptCard(session)
                        .title("Modern(모던) 선택품목")
                        .items([
                            builder.ReceiptItem.create(session, "1,100,000", "파노라마 썬루프"),
                            builder.ReceiptItem.create(session, "780,000", "TUIX 컴포트 패키지"),
                            builder.ReceiptItem.create(session, "600,000", "앞좌석 통풍+하이패스 시스템"),
                            builder.ReceiptItem.create(session, "1,800,000", "현대 스마트 센스 패키지IV")
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, "1 : 다른모델", "다른모델"),
                            builder.CardAction.imBack(session, "2 : 다른트림", "다른트림"),
                            builder.CardAction.imBack(session, "3 : 홈", "홈으로")
                        ])
                    /*.facts([
                        builder.Fact.create(session, "31,750,000", "주요사항")
                    ])*/
                ]);

            builder.Prompts.choice(session, msg, "다른모델|다른트림|홈");
        },

        function (session, results) {
            if (results.response && results.response.entity != '(quit)') {
                // Select Model Menu
                if (results.response.entity == "다른모델" || results.response.entity == 1) {
                    session.beginDialog('/korPrice');
                } else if (results.response.entity == "다른트림" || results.response.entity == 2) {
                    session.beginDialog('/model22');
                } else if (results.response.entity == "홈" || results.response.entity == 3) {
                    session.beginDialog('/korMenu');
                }
            } else {
                // Exit the menu
                session.endDialog();
            }
        }
    ]);

    /***********************************************************************************
    4-2. 한국어 가격 - 디젤 22 - 디젤 22 프리미엄 품목
    ************************************************************************************/

    bot.dialog('/model22_premium_trim', [
        function (session) {
            session.send("디젤 2.2의 프리미엄 트림 품목 입니다.");
            var msg = new builder.Message(session)
                .attachments([
                    new builder.ReceiptCard(session)
                        .title("Premium(프리미엄) 기본품목")
                        .items([
                            builder.ReceiptItem.create(session, "", "디젤 2.2 모던 기본 사양 및"),
                            builder.ReceiptItem.create(session, "생략", "안전"),
                            builder.ReceiptItem.create(session, "생략", "시트/편의")
                        ])
                        .facts([
                            builder.Fact.create(session, "34,750,000", "주요사항")
                        ]),
                    new builder.ReceiptCard(session)
                        .title("Premium(프리미엄) 선택품목")
                        .items([
                            builder.ReceiptItem.create(session, "1,000,000", "헤드업 디스플레이(HUD)"),
                            builder.ReceiptItem.create(session, "1,500,000", "현대 스마트 센스 패키지I"),
                            builder.ReceiptItem.create(session, "1,500,000", "익스테리어 패키지I")
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, "1 : 다른모델", "다른모델"),
                            builder.CardAction.imBack(session, "2 : 다른트림", "다른트림"),
                            builder.CardAction.imBack(session, "3 : 홈", "홈으로")
                        ])
                ]);

            builder.Prompts.choice(session, msg, "다른모델|다른트림|홈");
        },

        function (session, results) {
            if (results.response && results.response.entity != '(quit)') {
                // Select Model Menu
                if (results.response.entity == "다른모델" || results.response.entity == 1) {
                    session.beginDialog('/korPrice');
                } else if (results.response.entity == "다른트림" || results.response.entity == 2) {
                    session.beginDialog('/model22');
                } else if (results.response.entity == "홈" || results.response.entity == 3) {
                    session.beginDialog('/korMenu');
                }
            } else {
                // Exit the menu
                session.endDialog();
            }
        }
    ]);

    /***********************************************************************************
    4-3. 한국어 가격 - 디젤 22 - 디젤 22 프리미엄 스페셜 품목
    ************************************************************************************/

    bot.dialog('/model22_premiumSpecial_trim', [
        function (session) {
            session.send("디젤 2.2의 프리미엄 스페셜 트림 품목 입니다.");
            var msg = new builder.Message(session)
                .attachments([
                    new builder.ReceiptCard(session)
                        .title("Premium Special(프리미엄 스페셜) 기본품목")
                        .items([
                            builder.ReceiptItem.create(session, "", "디젤 2.2 프리미엄 기본 사양 및"),
                            builder.ReceiptItem.create(session, "생략", "외관"),
                            builder.ReceiptItem.create(session, "생략", "내장"),
                            builder.ReceiptItem.create(session, "생략", "시트"),
                            builder.ReceiptItem.create(session, "생략", "편의")
                        ])
                        .facts([
                            builder.Fact.create(session, "36,750,000", "주요사항")
                        ]),
                    new builder.ReceiptCard(session)
                        .title("Premium Special(프리미엄 스페셜) 선택품목")
                        .items([
                            builder.ReceiptItem.create(session, "1,000,000", "헤드업 디스플레이(HUD)"),
                            builder.ReceiptItem.create(session, "1,600,000", "현대 스마트 센스 패키지II"),
                            builder.ReceiptItem.create(session, "1,000,000", "익스테리어 패키지II"),
                            builder.ReceiptItem.create(session, "1,150,000", "JBL 사운드 패키지"),
                            builder.ReceiptItem.create(session, "1,200,000", "어라운드 뷰 모니터(AVM)+스마트 전동식 트렁크"),
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, "1 : 다른모델", "다른모델"),
                            builder.CardAction.imBack(session, "2 : 다른트림", "다른트림"),
                            builder.CardAction.imBack(session, "3 : 홈", "홈으로")
                        ])
                ]);

            builder.Prompts.choice(session, msg, "다른모델|다른트림|홈");
        },

        function (session, results) {
            if (results.response && results.response.entity != '(quit)') {
                // Select Model Menu
                if (results.response.entity == "다른모델" || results.response.entity == 1) {
                    session.beginDialog('/korPrice');
                } else if (results.response.entity == "다른트림" || results.response.entity == 2) {
                    session.beginDialog('/model22');
                } else if (results.response.entity == "홈" || results.response.entity == 3) {
                    session.beginDialog('/korMenu');
                }
            } else {
                // Exit the menu
                session.endDialog();
            }
        }
    ]);



    //function executeStatement(queryStr) {
    //    var result = "";
    //    var jsonArray = [];
    //    var requests = new tediousRequest(queryStr, function (err) {
    //        if (err) {
    //            console.log('ERROR : ' + err);
    //        }
    //    });

    //    requests.addParameter('sid', TYPES.NVarChar, '1');


    //    requests.on('row', function (columns) {
    //        var obj = {};
    //        columns.forEach(function (column) {
    //            if (column.value === null) {
    //                console.log('NULL');
    //            } else {
    //                console.log("column.metadata.colName : " + column.metadata.colName);
    //                console.log("column.value : " + column.value);
    //                obj[column.metadata.colName] = column.value;
    //            }
    //        });
    //        jsonArray.push(obj);
    //    });

    //    requests.on('doneProc', function (rowCount, more) {
    //        console.log('LAST : ' + jsonArray);
    //        //param = "";
    //        matchCnt = 0;
    //        //res(null, jsonArray);

    //        for (var i = 0; i < jsonArray.length; i++)
    //        {

    //            console.log("CAR_TYPE : "+jsonArray[i].CAR_TYPE);

    //        }
    //    });
    //    connection.execSql(requests);
    //};
}

module.exports = {
    create
}