var builder = require('botbuilder');

function create(bot) {
    /***********************************************************************************
        한국어 시승 초기 메뉴
    ************************************************************************************/


    bot.dialog('/korTestDrive', [                                           //bot.dialog('/korTestDrive start

        function (session, args, next) {

            session.send("맞아요!!\n\n 한번 타 보셔야 저를 좀 더 잘 알 수 있겠죠!!");

            builder.Prompts.choice(session, '시승 신청을 하시기 위해서는 온라인에서 예약을 하시거나 \n\n지점에 직접 연락을 해 주셔야 해요. \n\n제가 도와 드릴께요, 어떤 방법이 편하시겠어요?',
                '온라인 예약|시승센터 전화예약', { listStyle: builder.ListStyle.button });

        }
        , function (session, results, next) {

            var str = "";

            if (session.message.text == results.response.entity) {
                session.userData.testDriveMenu = results.response.entity;
                console.log('선택 문구 : ' + results.response.entity);
                str = results.response.entity;

                if (str == '온라인 예약') {

                    session.send("온라인 예약 방법을 알려 드릴께요!!");

                    var onlineReserveCard = new builder.HeroCard(session)
                        .title('현대자동차 시승센터')
                        .subtitle('현대자동차 시승센터에서 다양한 시승 서비스를 경험하세요. \n\n온라인 예약 시 회원가입이 필요합니다.')
                        .images([
                            new builder.CardImage(session)
                                .url(img_path + "/images/testDrive/testDriveReservation.jpg")

                                .alt('contoso_flowers')
                        ])
                        .buttons([
                            builder.CardAction.openUrl(session, "http://www.hyundai.com/kr/tdn/index.do", "여기에서 예약할수 있어요^^*"),
                        ]);
                    session.send(new builder.Message(session).addAttachment(onlineReserveCard));
                    session.send("멋진 시승 하세요^^");

                    //session.send("처음으로 돌아가고 싶으시면 그랜다이저를 입력해주세요~~~!!");

                    //session.beginDialog('/testDriveReturn');

                    builder.Prompts.choice(session, "메인메뉴로 돌아가고 싶으시면 '처음으로' 또는 '그랜다이저'를 입력해주시고, 이전 메뉴로 돌아가고 싶으시면 '이전으로' 를 선택해주세요!!",
                        '처음으로|이전으로', { listStyle: builder.ListStyle.button });

                }
                else if (str == '시승센터 전화예약') {

                    session.beginDialog('/findTestDriveOffline');
                    //builder.Prompts.text(session, '시승센터를 찾기위하여 원하시는 위치의 동명을 입력해 주세요.(예: 서울) ');

                }
            } else if (session.message.text != results.response.entity) {

                console.log('입력 문구 : ' + session.message.text);
                str = session.message.text;

                return luis.query(str)
                    .then(luisResult => {
                        var intent = luisResult.topScoringIntent.intent;
                        var entityLen = Object.keys(luisResult.entities).length;
                        console.log(`processing resolved intent: ${intent}`);

                        for (var i = 0; i < entityLen; i++) {

                            console.log("[" + i + "] : " + luisResult.entities[i].type);

                            if (luisResult.entities[i].type.match(/시승센터 전화예약/g)) {

                                session.beginDialog('/findTestDriveOffline');
                                //builder.Prompts.text(session, '시승센터를 찾기위하여 원하시는 위치의 동명을 입력해 주세요.(예: 서울) ');

                            } else if (luisResult.entities[i].type.match(/온라인 예약/g)) {

                                session.send("온라인 예약 방법을 알려 드릴께요!!");

                                var onlineReserveCard = new builder.HeroCard(session)
                                    .title('현대자동차 시승센터')
                                    .subtitle('현대자동차 시승센터에서 다양한 시승 서비스를 경험하세요. \n\n온라인 예약 시 회원가입이 필요합니다.')
                                    .images([
                                        new builder.CardImage(session)
                                            .url(img_path + "/images/testDrive/testDriveReservation.jpg")
                                            .alt('contoso_flowers')
                                    ])
                                    .buttons([
                                        builder.CardAction.openUrl(session, "http://www.hyundai.com/kr/tdn/index.do", "여기에서 예약할수 있어요^^*"),
                                    ]);
                                session.send(new builder.Message(session).addAttachment(onlineReserveCard));
                                session.send("멋진 시승 하세요^^");
                                //builder.Prompts.text(session, "처음으로 돌아가고 싶으시면 그랜다이저를 입력해주세요~~~!!");

                                //session.beginDialog('/testDriveReturn');


                                builder.Prompts.choice(session, "메인메뉴로 돌아가고 싶으시면 '처음으로' 또는 '그랜다이저'를 입력해주시고, 이전 메뉴로 돌아가고 싶으시면 '이전으로' 를 선택해주세요!!",
                                    '처음으로|이전으로', { listStyle: builder.ListStyle.button });
                            }
                        };
                    })
                    .catch(err => {
                        console.error(`error processing intent: ${err.message}`);
                        session.send(`there was an error processing your request, please try again later...`);
                        return session.cancelDialog(0, '/');

                    });

            }
        }, function (session, results) {

            //console.log('session.message.tex : ' + results.response.entity);

            if (results.response.entity == "처음으로") {

                session.beginDialog('/korMenu');

            }
            else if (results.response.entity == "이전으로") {

                session.beginDialog('/korTestDrive');

            }
            else {

                session.beginDialog('/findTestDriveOffline');

            }
        }
    ])//.reloadAction('reloadTestDriveMenu', null, { matches: /^시승메뉴/i });     //bot.dialog('/korTestDrive end



    /***********************************************************************************
        한국어 시승 - 시승센터 전화 예약 메뉴
    ************************************************************************************/

    bot.dialog('/findTestDriveOffline', [

        function (session) {

            builder.Prompts.text(session, '시승센터를 찾기위하여 원하시는 위치의 동명을 입력해 주세요.(예: 서울) ');
        },
        function (session, results) {

            console.log('원하는 지역 : ' + session.message.text);
            session.send("[ " + session.message.text + " ] 의 시승센터 관련 정보입니다.");

            // Ask the user to select an item from a carousel.
            var msg = new builder.Message(session)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments([
                    new builder.HeroCard(session)
                        .title("성내 시승센터")
                        .subtitle("전화번호 : 02-473-7365(FAX : 02-2225-4736) 지점주소 : (05381) 서울 강동구 천호대로 1096 현대자동차 성내지점 3층 성내시승센터")
                        .images([
                            builder.CardImage.create(session, img_path + "/images/testDrive/seoul/seongnae.png")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/testDrive/seoul/seongnae.png")),
                        ])
                        //.images([
                        //    builder.CardImage.create(session, img_path + "/images/testDrive/" + session.message.text + "/seongnae.png")
                        //        .tap(builder.CardAction.showImage(session, img_path + "/images/testDrive/" + session.message.text + "/seongnae.png")),
                        //])
                        .buttons([
                            builder.CardAction.openUrl(session, "http://www.hyundai.com/kr/tdn/index.do", "시승센터 홈페이지")
                            //,builder.CardAction.imBack(session, "select:1", "Select")
                        ]),
                    new builder.HeroCard(session)
                        .title("잠실 시승센터")
                        .subtitle("전화번호 : 02-421-7365(FAX : 02-421-4737) 지점주소 : (05502) 서울 송파구 올림픽로 145 리센츠빌딩 2층 C10호 잠실시승센터")
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
                        .subtitle("전화번호 : 02-973-7365(FAX : 02-3296-6218) 지점주소 : (01861) 서울 노원구 화랑로 429 현대자동차 공릉지점옆 공릉시승센터")
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
                        .subtitle("전화번호 : 02-2644-7365(FAX : 02-2644-7359) 지점주소 : (07995) 서울 양천구 목동서로 225 한국예술인협회 2층 목동시승센터")
                        .images([
                            builder.CardImage.create(session, img_path + "/images/testDrive/seoul/mokdong.png")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/testDrive/seoul/mokdong.png"))
                        ])
                        .buttons([
                            builder.CardAction.openUrl(session, "http://www.hyundai.com/kr/tdn/index.do", "시승센터 홈페이지")
                            //,builder.CardAction.imBack(session, "select:4", "Select")
                        ])
                ]);

            session.send(msg);

            builder.Prompts.choice(session, "메인메뉴로 돌아가고 싶으시면 '처음으로' 또는 '그랜다이저'를 입력해주시고, 이전 메뉴로 돌아가고 싶으시면 '이전으로' 를 선택해주세요!!",
                '처음으로|이전으로', { listStyle: builder.ListStyle.button });

        }

        , function (session, results) {

            //session.beginDialog('/testDriveReturn');

            //console.log('results.response.entity : ' + results.response.entity);

            if (results.response.entity == "처음으로") {

                session.beginDialog('/korMenu');

            }
            else if (results.response.entity == "이전으로") {

                session.beginDialog('/korTestDrive');

            }

        }
    ]);
}

module.exports = {
    create
}