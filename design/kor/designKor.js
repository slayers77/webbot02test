var builder = require('botbuilder');

function create(bot) {
    /***********************************************************************************
    1. 한국어 디자인 초기 메뉴
    ************************************************************************************/
    bot.dialog('/korDesign', [

        function (session) {

            var msg = new builder.Message(session)
                .textFormat(builder.TextFormat.xml)
                //.attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments([
                    //AnimationCard
                    new builder.HeroCard(session)
                        .title("Design")
                        .subtitle("멋지죠? 더 자세한 내용을 한번 보시겠어요?")
                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/20170302091059771443.jpg")
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, "색상", "색상"),
                            builder.CardAction.imBack(session, "내관", "내관"),
                            builder.CardAction.imBack(session, "외관", "외관")
                        ])
                ]);
            builder.Prompts.choice(session, msg, "색상|내관|외관");
        },
        function (session, results) {

            session.send('당신의 선택 메뉴 : %s!', results.response.entity);
            if (results.response.entity == '색상') {
                session.beginDialog('/designColor');
            }
            else if (results.response.entity == '내관') {
                session.beginDialog('/designInside');
            }
            else if (results.response.entity == '외관') {
                session.beginDialog('/designOutside');

            }
        }
    ]);


    //20170401 윤인식 수정 START
    //2070402/윤인식/수정START
    //색상 선택
    bot.dialog('/designColor', [

        function (session) {
            session.send("원하시는 색상을 선택하시면 그랜저 색상이 바뀝니다");
            var msg = new builder.Message(session)
                .textFormat(builder.TextFormat.xml)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments([
                    //AnimationCard
                    new builder.HeroCard(session)
                        .title("화이트 크림")

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/WC9/00060.jpg")
                                .alt("화이트 크림")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/WC9/00060.jpg"))
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, "화이트 크림", "선택")
                        ]),
                    new builder.HeroCard(session)
                        .title("이온 실버")
                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/N9V/00060.jpg")
                                .alt("이온 실버")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/N9V/00060.jpg"))
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, "이온 실버", "선택")
                        ]),
                    new builder.HeroCard(session)
                        .title("루나 그레이")
                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/U9G/00060.jpg")
                                .alt("루나 그레이")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/U9G/00060.jpg"))
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, "루나 그레이", "선택")
                        ]),
                    new builder.HeroCard(session)
                        .title("판테라 그레이")
                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/PG9/00060.jpg")
                                .alt("판테라 그레이")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/PG9/00060.jpg"))
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, "판테라 그레이", "선택")

                        ]),
                    new builder.HeroCard(session)
                        .title("미드나잇 블랙")
                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/NB9/00060.jpg")
                                .alt("미드나잇 블랙")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/NB9/00060.jpg"))
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, "미드나잇 블랙", "선택")
                        ]),
                    new builder.HeroCard(session)
                        .title("발렌타인 레드")
                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/V9R/00060.jpg")
                                .alt("발렌타인 레드")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/V9R/00060.jpg"))
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, "발렌타인 레드", "선택")
                        ]),
                    new builder.HeroCard(session)
                        .title("그랑 블루")
                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/NU9/00060.jpg")
                                .alt("그랑 블루")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/NU9/00060.jpg"))
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, "그랑 블루", "선택")
                        ]),
                    new builder.HeroCard(session)
                        .title("쉐이드 브론즈")
                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/S9C/00060.jpg")
                                .alt("쉐이드 브론즈")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/S9C/00060.jpg"))
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, "쉐이드 브론즈", "선택")
                        ]),
                    new builder.HeroCard(session)
                        .title("카키 메탈")
                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/TK9/00060.jpg")
                                .alt("카키 메탈")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/TK9/00060.jpg"))
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, "카키 메탈", "선택")
                        ])
                ]);

            builder.Prompts.choice(session, msg, "화이트 크림|이온 실버|루나 그레이|판테라 그레이|미드나잇 블랙|발렌타인 레드|그랑 블루|쉐이드 브론즈|카키 메탈");
        },
        function (session, results) {
            session.preferredLocale(results.response.entity, function (err) {
                if (!err) {
                    session.userData.carColor = results.response.entity;
                    if (results.response.entity == "화이트 크림") {
                        session.beginDialog('/whiteCream');
                    } else if (results.response.entity == "이온 실버") {
                        session.beginDialog('/ionSilber');
                    } else if (results.response.entity == "루나 그레이") {
                        session.beginDialog('/lunarGrey');
                    } else if (results.response.entity == "판테라 그레이") {
                        session.beginDialog('/panteraGrey');
                    } else if (results.response.entity == "미드나잇 블랙") {
                        session.beginDialog('/midnightBlack');
                    } else if (results.response.entity == "발렌타인 레드") {
                        session.beginDialog('/valentineRed');
                    } else if (results.response.entity == "그랑 블루") {
                        session.beginDialog('/grangBlue');
                    } else if (results.response.entity == "쉐이드 브론즈") {
                        session.beginDialog('/shadeBronze');
                    } else if (results.response.entity == "카키 메탈") {
                        session.beginDialog('/kakiMetal');
                    }
                } else {
                    session.error(err);
                }
            });
        }
    ]);

    // 차 외관 선택

    bot.dialog('/designOutside', [

        function (session) {
            var msg = new builder.Message(session)
                .textFormat(builder.TextFormat.xml)


                .attachments([
                    new builder.HeroCard(session)
                        .title("그랜저 외관")
                        .subtitle("단단해진 차체와 새로운 플랫폼 적용으로 균형 잡힌 주행 안정성과 민첩하고 다이나믹한 가속 응답성, 부드러운 승차감까지 갖추었습니다.")
                        .text("미래 자율 주행에 한발 더 다가선 지능형 안전기술 Hyundai SmartSense로 더운 편안한 주행 환경을 제공하고 다른 차량 운전자와 보행자까지 모두의 안전을 스마트하게 케어 합니다.")
                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/car_outside_title.jpg")
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, "외관상세", "외관상세")
                        ])

                ]);
            //session.send(msg);
            builder.Prompts.choice(session, msg, "외관상세");
            //session.send("그랜저 외관입니다.");
        },
        function (session, results) {
            if (results.response.entity == "외관상세") {
                var msg1 = new builder.Message(session)
                    .textFormat(builder.TextFormat.xml)
                    .attachmentLayout(builder.AttachmentLayout.carousel)
                    //.title("그랜저의 외관입니다.")
                    .attachments([
                        new builder.HeroCard(session)
                            .title("Full LED 헤드램프 / 캐스캐이딩 그릴")
                            .images([
                                builder.CardImage.create(session, img_path + "/images/carDesign/20161122093146198083.jpg")
                                    .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/20161122093146198083.jpg"))
                            ]),
                        new builder.HeroCard(session)
                            .title("19인치 알로이 휠 & 타이어")
                            .images([
                                builder.CardImage.create(session, img_path + "/images/carDesign/20161122093251750084.jpg")
                                    .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/20161122093251750084.jpg"))
                            ]),
                        new builder.HeroCard(session)
                            .title("LED 방향지시등 적용 아웃사이드 미러 & 샤틴 크롬 몰딩")
                            .images([
                                builder.CardImage.create(session, img_path + "/images/carDesign/20161122093309923085.jpg")
                                    .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/20161122093309923085.jpg"))
                            ]),
                        new builder.HeroCard(session)
                            .title("LED 리어 콤비램프")
                            .images([
                                builder.CardImage.create(session, img_path + "/images/carDesign/20161122093331472086.jpg")
                                    .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/20161122093331472086.jpg"))
                            ])
                    ]);

                session.send(msg1);
                builder.Prompts.choice(session, "그랜저의 디자인에 대해 메뉴를 보시겠습니까?", '디자인|색상|내관|외관|홈', { listStyle: builder.ListStyle.button });
            }
        },

        function (session, results) {

            session.userData.menuChoice = results.response.entity;
            if (results.response.entity == '디자인') {
                session.beginDialog('/korDesign');
            } else if (results.response.entity == '색상') {
                session.beginDialog('/designColor');
            } else if (results.response.entity == '내관') {
                session.beginDialog('/designInside');
            } else if (results.response.entity == '외관') {
                session.beginDialog('/designOutside');
            } else if (results.response.entity == '홈') {
                session.beginDialog('/korMenu');
            } else {
                session.endDialog();
            }
        }
    ]);


    // 차 내관 선택
    bot.dialog('/designInside', [

        function (session) {
            var msg = new builder.Message(session)
                .textFormat(builder.TextFormat.xml)

                .attachments([
                    new builder.HeroCard(session)
                        .title("그랜저 내관")
                        .subtitle("크래쉬패드의 높이를 낮추고 수펴적인 아키텍처를 적용한 인테리어는\n\n 탁 트인 개방감과 넓고 안정적인 공간감을 연출합니다.")
                        .text("엄선된 고급 소재와 깊이 있는 컬러, 새로운 플로팅 타입 디스플레이와 스마트 멀리미디어 시스템까지\n\n 정교하게 다듬어진 디테일들이 품격있고 섬세한 취향을 만족시켜 드릴 것입니다.")
                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/car_inside_title.jpg")
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, "내관상세", "내관상세")
                        ])

                ]);
            //session.send(msg);
            builder.Prompts.choice(session, msg, "내관상세");
            //session.send("그랜저 내관입니다.");
        },
        function (session, results) {
            if (results.response.entity == "내관상세") {
                var msg1 = new builder.Message(session)
                    .textFormat(builder.TextFormat.xml)
                    .attachmentLayout(builder.AttachmentLayout.carousel)
                    .attachments([
                        //AnimationCard
                        new builder.HeroCard(session)
                            .title("운전적 내부 전경")
                            .images([
                                builder.CardImage.create(session, img_path + "/images/carDesign/car_inside_detail_front.jpg")
                                    .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/car_inside_detail_front.jpg"))

                            ]),
                        new builder.HeroCard(session)
                            .title("뒷자석 내부 전경")
                            .images([
                                builder.CardImage.create(session, img_path + "/images/carDesign/car_inside_detail_back.jpg")
                                    .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/car_inside_detail_back.jpg"))
                            ]),

                    ]);

                session.send(msg1);
                builder.Prompts.choice(session, "그랜저의 디자인에 대해 메뉴를 보시겠습니까?", '디자인|색상|내관|외관|홈', { listStyle: builder.ListStyle.button });
            }
        },


        function (session, results) {

            session.userData.menuChoice = results.response.entity;
            if (results.response.entity == '디자인') {
                session.beginDialog('/korDesign');
            } else if (results.response.entity == '색상') {
                session.beginDialog('/designColor');
            } else if (results.response.entity == '내관') {
                session.beginDialog('/designInside');
            } else if (results.response.entity == '외관') {
                session.beginDialog('/designOutside');
            } else if (results.response.entity == '홈') {
                session.beginDialog('/korMenu');
            } else {
                session.endDialog();
            }
        }
    ]);


    /***********************************************************************************
    1. 한국어 디자인 - 색상
    ************************************************************************************/



    /***********************************************************************************
    1. 한국어 디자인 - 색상 세부 목록
    ************************************************************************************/


    //화이트 크림 색상
    bot.dialog('/whiteCream', [
        function (session) {
            var msg = new builder.Message(session)
                .textFormat(builder.TextFormat.xml)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                //.title("화이트크림")
                .attachments([
                    //AnimationCard
                    new builder.HeroCard(session)

                        .title("정면")
                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/WC9/00055.jpg")
                                .alt("화이트 크림")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/WC9/00055.jpg"))
                        ]),
                    new builder.HeroCard(session)
                        .title("우측면")
                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/WC9/00046.jpg")
                                .alt("화이트 크림")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/WC9/00046.jpg"))
                        ]),
                    new builder.HeroCard(session)
                        .title("좌측면")
                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/WC9/00014.jpg")
                                .alt("화이트 크림")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/WC9/00014.jpg"))
                        ]),
                    new builder.HeroCard(session)
                        .title("후면")
                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/WC9/00021.jpg")
                                .alt("화이트 크림")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/WC9/00021.jpg"))
                        ])
                ]);
            session.send(msg);
            builder.Prompts.choice(session, "그랜저의 다른 색상을 보시겠습니까?", '예|아니오', { listStyle: builder.ListStyle.button });
        },
        function (session, results) {

            session.userData.menuChoice = results.response.entity;
            if (session.userData.menuChoice == '예') {
                session.beginDialog('/designColor');
            } else {
                //builder.Prompts.choice(session, "그랜저의 다른 메뉴를 보시겠습니까?", '시승|디자인|편의사항|가격|홈', { listStyle: builder.ListStyle.button });
                builder.Prompts.choice(session, "그랜저의 디자인에 대해 메뉴를 보시겠습니까?", '디자인|색상|내관|외관|홈', { listStyle: builder.ListStyle.button });
            }

        },
        function (session, results) {

            session.userData.menuChoice = results.response.entity;
            if (results.response.entity == '디자인') {
                session.beginDialog('/korDesign');
            } else if (results.response.entity == '색상') {
                session.beginDialog('/designColor');
            } else if (results.response.entity == '내관') {
                session.beginDialog('/designInside');
            } else if (results.response.entity == '외관') {
                session.beginDialog('/designOutside');
            } else if (results.response.entity == '홈') {
                session.beginDialog('/korMenu');
            } else {
                session.endDialog();
            }

        }
    ]);

    //이온 실버 색상
    bot.dialog('/ionSilber', [
        function (session) {
            var msg = new builder.Message(session)
                .textFormat(builder.TextFormat.xml)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments([
                    //AnimationCard
                    new builder.HeroCard(session)
                        .title("정면")

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/N9V/00055.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/N9V/00055.jpg"))
                                .alt("이온 실버")
                        ]),
                    new builder.HeroCard(session)
                        .title("우측면")
                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/N9V/00046.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/N9V/00046.jpg"))
                                .alt("이온 실버")
                        ]),
                    new builder.HeroCard(session)
                        .title("좌측면")

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/N9V/00014.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/N9V/00014.jpg"))
                                .alt("이온 실버")
                        ]),
                    new builder.HeroCard(session)
                        .title("후면")

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/N9V/00021.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/N9V/00021.jpg"))
                                .alt("이온 실버")
                        ])
                ]);
            session.send(msg);
            builder.Prompts.choice(session, "그랜저의 다른 색상을 보시겠습니까? ", '예|아니오', { listStyle: builder.ListStyle.button });
        },
        function (session, results) {

            session.userData.menuChoice = results.response.entity;
            if (session.userData.menuChoice == '예') {
                session.beginDialog('/designColor');
            } else {
                //builder.Prompts.choice(session, "그랜저의 다른 메뉴를 보시겠습니까? ", '시승|디자인|편의사항|가격|홈', { listStyle: builder.ListStyle.button });
                builder.Prompts.choice(session, "그랜저의 디자인에 대해 메뉴를 보시겠습니까?", '디자인|색상|내관|외관|홈', { listStyle: builder.ListStyle.button });
            }

        },
        function (session, results) {

            session.userData.menuChoice = results.response.entity;
            if (results.response.entity == '디자인') {
                session.beginDialog('/korDesign');
            } else if (results.response.entity == '색상') {
                session.beginDialog('/designColor');
            } else if (results.response.entity == '내관') {
                session.beginDialog('/designInside');
            } else if (results.response.entity == '외관') {
                session.beginDialog('/designOutside');
            } else if (results.response.entity == '홈') {
                session.beginDialog('/korMenu');
            } else {
                session.endDialog();
            }

        }
    ]);

    //루나 그레이 색상
    bot.dialog('/lunarGrey', [
        function (session) {
            var msg = new builder.Message(session)
                .textFormat(builder.TextFormat.xml)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments([
                    //AnimationCard
                    new builder.HeroCard(session)
                        .title("정면")

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/U9G/00055.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/U9G/00055.jpg"))
                                .alt("루나 그레이")
                        ]),
                    new builder.HeroCard(session)
                        .title("우측면")

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/U9G/00046.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/U9G/00046.jpg"))
                                .alt("루나 그레이")
                        ]),
                    new builder.HeroCard(session)
                        .title("좌측면")

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/U9G/00014.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/U9G/00014.jpg"))
                                .alt("루나 그레이")
                        ]),
                    new builder.HeroCard(session)
                        .title("후면")
                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/U9G/00021.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/U9G/00021.jpg"))
                                .alt("루나 그레이")
                        ])
                ]);
            session.send(msg);
            builder.Prompts.choice(session, "그랜저의 다른 색상을 보시겠습니까? ", '예|아니오', { listStyle: builder.ListStyle.button });
        },
        function (session, results) {

            session.userData.menuChoice = results.response.entity;
            if (session.userData.menuChoice == '예') {
                session.beginDialog('/designColor');
            } else {
                //builder.Prompts.choice(session, "그랜저의 다른 메뉴를 보시겠습니까? ", '시승|디자인|편의사항|가격|홈', { listStyle: builder.ListStyle.button });
                builder.Prompts.choice(session, "그랜저의 디자인에 대해 메뉴를 보시겠습니까?", '디자인|색상|내관|외관|홈', { listStyle: builder.ListStyle.button });
            }

        },
        function (session, results) {

            session.userData.menuChoice = results.response.entity;
            if (results.response.entity == '디자인') {
                session.beginDialog('/korDesign');
            } else if (results.response.entity == '색상') {
                session.beginDialog('/designColor');
            } else if (results.response.entity == '내관') {
                session.beginDialog('/designInside');
            } else if (results.response.entity == '외관') {
                session.beginDialog('/designOutside');
            } else if (results.response.entity == '홈') {
                session.beginDialog('/korMenu');
            } else {
                session.endDialog();
            }

        }
    ]);

    //판테라 그레이 색상
    bot.dialog('/panteraGrey', [
        function (session) {
            var msg = new builder.Message(session)
                .textFormat(builder.TextFormat.xml)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments([
                    //AnimationCard
                    new builder.HeroCard(session)
                        .title("정면")

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/PG9/00055.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/PG9/00055.jpg"))
                                .alt("판테라 그레이")
                        ]),
                    new builder.HeroCard(session)
                        .title("우측면")

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/PG9/00046.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/PG9/00046.jpg"))
                                .alt("판테라 그레이")
                        ]),
                    new builder.HeroCard(session)
                        .title("좌측면")

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/PG9/00014.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/PG9/00014.jpg"))
                                .alt("판테라 그레이")
                        ]),
                    new builder.HeroCard(session)
                        .title("후면")

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/PG9/00021.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/PG9/00021.jpg"))
                                .alt("판테라 그레이")
                        ])
                ]);
            session.send(msg);
            builder.Prompts.choice(session, "그랜저의 다른 색상을 보시겠습니까? ", '예|아니오', { listStyle: builder.ListStyle.button });
        },
        function (session, results) {

            session.userData.menuChoice = results.response.entity;
            if (session.userData.menuChoice == '예') {
                session.beginDialog('/designColor');
            } else {
                //builder.Prompts.choice(session, "그랜저의 다른 메뉴를 보시겠습니까? ", '시승|디자인|편의사항|가격|홈', { listStyle: builder.ListStyle.button });
                builder.Prompts.choice(session, "그랜저의 디자인에 대해 메뉴를 보시겠습니까?", '디자인|색상|내관|외관|홈', { listStyle: builder.ListStyle.button });
            }

        },
        function (session, results) {

            session.userData.menuChoice = results.response.entity;
            if (results.response.entity == '디자인') {
                session.beginDialog('/korDesign');
            } else if (results.response.entity == '색상') {
                session.beginDialog('/designColor');
            } else if (results.response.entity == '내관') {
                session.beginDialog('/designInside');
            } else if (results.response.entity == '외관') {
                session.beginDialog('/designOutside');
            } else if (results.response.entity == '홈') {
                session.beginDialog('/korMenu');
            } else {
                session.endDialog();
            }

        }
    ]);

    //미드나잇 블랙 색상
    bot.dialog('/midnightBlack', [
        function (session) {
            var msg = new builder.Message(session)
                .textFormat(builder.TextFormat.xml)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments([
                    //AnimationCard
                    new builder.HeroCard(session)
                        .title("정면")

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/NB9/00055.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/NB9/00055.jpg"))
                                .alt("미드나잇 블랙")
                        ]),
                    new builder.HeroCard(session)
                        .title("우측면")

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/NB9/00046.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/NB9/00046.jpg"))
                                .alt("미드나잇 블랙")
                        ]),
                    new builder.HeroCard(session)
                        .title("좌측면")

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/NB9/00014.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/NB9/00014.jpg"))
                                .alt("미드나잇 블랙")
                        ]),
                    new builder.HeroCard(session)
                        .title("후면")

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/NB9/00021.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/NB9/00021.jpg"))
                                .alt("미드나잇 블랙")
                        ])
                ]);
            session.send(msg);
            builder.Prompts.choice(session, "그랜저의 다른 색상을 보시겠습니까?", '예|아니오', { listStyle: builder.ListStyle.button });
        },
        function (session, results) {

            session.userData.menuChoice = results.response.entity;
            if (session.userData.menuChoice == '예') {
                session.beginDialog('/designColor');
            } else {
                //builder.Prompts.choice(session, "그랜저의 다른 메뉴를 보시겠습니까?", '시승|디자인|편의사항|가격|홈', { listStyle: builder.ListStyle.button });
                builder.Prompts.choice(session, "그랜저의 디자인에 대해 메뉴를 보시겠습니까?", '디자인|색상|내관|외관|홈', { listStyle: builder.ListStyle.button });
            }

        },
        function (session, results) {

            session.userData.menuChoice = results.response.entity;
            if (results.response.entity == '디자인') {
                session.beginDialog('/korDesign');
            } else if (results.response.entity == '색상') {
                session.beginDialog('/designColor');
            } else if (results.response.entity == '내관') {
                session.beginDialog('/designInside');
            } else if (results.response.entity == '외관') {
                session.beginDialog('/designOutside');
            } else if (results.response.entity == '홈') {
                session.beginDialog('/korMenu');
            } else {
                session.endDialog();
            }

        }
    ]);

    //발렌타인 레드 색상
    bot.dialog('/valentineRed', [
        function (session) {
            var msg = new builder.Message(session)
                .textFormat(builder.TextFormat.xml)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments([
                    //AnimationCard
                    new builder.HeroCard(session)
                        .title("정면")

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/V9R/00055.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/V9R/00055.jpg"))
                                .alt("발렌타인 레드")
                        ]),
                    new builder.HeroCard(session)
                        .title("우측면")

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/V9R/00046.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/V9R/00046.jpg"))
                                .alt("발렌타인 레드")
                        ]),
                    new builder.HeroCard(session)
                        .title("좌측면")

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/V9R/00014.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/V9R/00014.jpg"))
                                .alt("발렌타인 레드")
                        ]),
                    new builder.HeroCard(session)
                        .title("후면")

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/V9R/00021.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/V9R/00021.jpg"))
                                .alt("발렌타인 레드")
                        ])
                ]);
            session.send(msg);
            builder.Prompts.choice(session, "그랜저의 다른 색상을 보시겠습니까?", '예|아니오', { listStyle: builder.ListStyle.button });
        },
        function (session, results) {

            session.userData.menuChoice = results.response.entity;
            if (session.userData.menuChoice == '예') {
                session.beginDialog('/designColor');
            } else {
                //builder.Prompts.choice(session, "그랜저의 다른 메뉴를 보시겠습니까?", '시승|디자인|편의사항|가격|홈', { listStyle: builder.ListStyle.button });
                builder.Prompts.choice(session, "그랜저의 디자인에 대해 메뉴를 보시겠습니까?", '디자인|색상|내관|외관|홈', { listStyle: builder.ListStyle.button });
            }

        },
        function (session, results) {

            session.userData.menuChoice = results.response.entity;
            if (results.response.entity == '디자인') {
                session.beginDialog('/korDesign');
            } else if (results.response.entity == '색상') {
                session.beginDialog('/designColor');
            } else if (results.response.entity == '내관') {
                session.beginDialog('/designInside');
            } else if (results.response.entity == '외관') {
                session.beginDialog('/designOutside');
            } else if (results.response.entity == '홈') {
                session.beginDialog('/korMenu');
            } else {
                session.endDialog();
            }

        }
    ]);

    //그랑 블루 색상
    bot.dialog('/grangBlue', [
        function (session) {
            var msg = new builder.Message(session)
                .textFormat(builder.TextFormat.xml)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments([
                    new builder.HeroCard(session)
                        .title("정면")
                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/NU9/00055.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/NU9/00055.jpg"))
                                .alt("그랑 블루")
                        ]),
                    new builder.HeroCard(session)
                        .title("우측면")

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/NU9/00046.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/NU9/00046.jpg"))
                                .alt("그랑 블루")
                        ]),
                    new builder.HeroCard(session)
                        .title("좌측면")

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/NU9/00014.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/NU9/00014.jpg"))
                                .alt("그랑 블루")
                        ]),
                    new builder.HeroCard(session)
                        .title("후면")

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/NU9/00021.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/NU9/00021.jpg"))
                                .alt("그랑 블루")
                        ])
                ]);
            session.send(msg);
            builder.Prompts.choice(session, "그랜저의 다른 색상을 보시겠습니까?", '예|아니오', { listStyle: builder.ListStyle.button });
        },
        function (session, results) {

            session.userData.menuChoice = results.response.entity;
            if (session.userData.menuChoice == '예') {
                session.beginDialog('/designColor');
            } else {
                //builder.Prompts.choice(session, "그랜저의 다른 메뉴를 보시겠습니까?", '시승|디자인|편의사항|가격|홈', { listStyle: builder.ListStyle.button });
                builder.Prompts.choice(session, "그랜저의 디자인에 대해 메뉴를 보시겠습니까?", '디자인|색상|내관|외관|홈', { listStyle: builder.ListStyle.button });
            }

        },
        function (session, results) {

            session.userData.menuChoice = results.response.entity;
            if (results.response.entity == '디자인') {
                session.beginDialog('/korDesign');
            } else if (results.response.entity == '색상') {
                session.beginDialog('/designColor');
            } else if (results.response.entity == '내관') {
                session.beginDialog('/designInside');
            } else if (results.response.entity == '외관') {
                session.beginDialog('/designOutside');
            } else if (results.response.entity == '홈') {
                session.beginDialog('/korMenu');
            } else {
                session.endDialog();
            }

        }
    ]);

    //쉐이드 브론즈 차
    bot.dialog('/shadeBronze', [
        function (session) {
            var msg = new builder.Message(session)
                .textFormat(builder.TextFormat.xml)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments([
                    //AnimationCard
                    new builder.HeroCard(session)
                        .title("정면")

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/S9C/00055.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/S9C/00055.jpg"))
                                .alt("쉐이드 브론즈")
                        ]),
                    new builder.HeroCard(session)
                        .title("좌측면")

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/S9C/00046.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/S9C/00046.jpg"))
                                .alt("쉐이드 브론즈")
                        ]),
                    new builder.HeroCard(session)
                        .title("우측면")

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/S9C/00014.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/S9C/00014.jpg"))
                                .alt("쉐이드 브론즈")
                        ]),
                    new builder.HeroCard(session)
                        .title("후면")

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/S9C/00021.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/S9C/00021.jpg"))
                                .alt("쉐이드 브론즈")
                        ])
                ]);
            session.send(msg);
            builder.Prompts.choice(session, "그랜저의 다른 색상을 보시겠습니까?", '예|아니오', { listStyle: builder.ListStyle.button });
        },
        function (session, results) {

            session.userData.menuChoice = results.response.entity;
            if (session.userData.menuChoice == '예') {
                session.beginDialog('/designColor');
            } else {
                //builder.Prompts.choice(session, "그랜저의 다른 메뉴를 보시겠습니까?", '시승|디자인|편의사항|가격|홈', { listStyle: builder.ListStyle.button });
                builder.Prompts.choice(session, "그랜저의 디자인에 대해 메뉴를 보시겠습니까?", '디자인|색상|내관|외관|홈', { listStyle: builder.ListStyle.button });
            }

        },
        function (session, results) {

            session.userData.menuChoice = results.response.entity;
            if (results.response.entity == '디자인') {
                session.beginDialog('/korDesign');
            } else if (results.response.entity == '색상') {
                session.beginDialog('/designColor');
            } else if (results.response.entity == '내관') {
                session.beginDialog('/designInside');
            } else if (results.response.entity == '외관') {
                session.beginDialog('/designOutside');
            } else if (results.response.entity == '홈') {
                session.beginDialog('/korMenu');
            } else {
                session.endDialog();
            }

        }
    ]);

    //카키 메탈 차
    bot.dialog('/kakiMetal', [
        function (session) {
            var msg = new builder.Message(session)
                .textFormat(builder.TextFormat.xml)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments([
                    //AnimationCard
                    new builder.HeroCard(session)
                        .title("정면")

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/TK9/00055.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/TK9/00055.jpg"))
                                .alt("카키 메탈")
                        ]),
                    new builder.HeroCard(session)
                        .title("우측면")

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/TK9/00046.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/TK9/00046.jpg"))
                                .alt("카키 메탈")
                        ]),
                    new builder.HeroCard(session)
                        .title("좌측면")

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/TK9/00014.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/TK9/00014.jpg"))
                                .alt("카키 메탈")
                        ]),
                    new builder.HeroCard(session)
                        .title("후면")

                        .images([
                            builder.CardImage.create(session, img_path + "/images/carDesign/TK9/00021.jpg")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/carDesign/TK9/00021.jpg"))
                                .alt("카키 메탈")
                        ])
                ]);
            session.send(msg);
            builder.Prompts.choice(session, "그랜저의 다른 색상을 보시겠습니까?", '예|아니오', { listStyle: builder.ListStyle.button });
        },
        function (session, results) {

            session.userData.menuChoice = results.response.entity;
            if (session.userData.menuChoice == '예') {
                session.beginDialog('/designColor');
            } else {
                //builder.Prompts.choice(session, "그랜저의 다른 메뉴를 보시겠습니까?", '시승|디자인|편의사항|가격|홈', { listStyle: builder.ListStyle.button });
                builder.Prompts.choice(session, "그랜저의 디자인에 대해 메뉴를 보시겠습니까?", '디자인|색상|내관|외관|홈', { listStyle: builder.ListStyle.button });
            }

        },
        function (session, results) {

            session.userData.menuChoice = results.response.entity;
            if (results.response.entity == '디자인') {
                session.beginDialog('/korDesign');
            } else if (results.response.entity == '색상') {
                session.beginDialog('/designColor');
            } else if (results.response.entity == '내관') {
                session.beginDialog('/designInside');
            } else if (results.response.entity == '외관') {
                session.beginDialog('/designOutside');
            } else if (results.response.entity == '홈') {
                session.beginDialog('/korMenu');
            } else {
                session.endDialog();
            }

        }
    ]);
}

module.exports = {
    create
}