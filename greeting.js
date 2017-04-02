var builder = require('botbuilder');
var language = "";
var luis = require('./luis');
//var insetMent = require('./insertMent');
var sessions = {};

function create(bot) {                                                  // function create(bot) START

    if (!bot) throw new error('bot instance was not provided!!');

    var intents = new builder.IntentDialog();
    bot.dialog('/', intents);

    intents.onDefault(session => {

        session.beginDialog('/greeting');

    })


    /***********************************************************************************

        greeting (인사말 구분 및 초기 유제 멘트 Luis 분기)

    ************************************************************************************/
    bot.dialog('/greeting', [                   //bot.dialog('/greeting' start

        function (session) {

            
            //var kor = /[ㄱ-힣]/g;
            //var eng = /^[A-Z|a-z]/g;
            //var ment = session.message.text;
            //console.log('kor : ' + ment.match(kor));
            //console.log('eng : ' + ment.match(eng));


            return luis.query(session.message.text)
                .then(luisResult => {
                    var intent = luisResult.topScoringIntent.intent;
                    var entityLen = Object.keys(luisResult.entities).length;
                    console.log(`processing resolved intent: ${intent}`);
                    //console.log(`greeting : ` + luisResult.entities[0].type);

                    // collect missing fields 

                    if (intent == 'greeting') {

                        if (luisResult.entities[0].type == '한국어인사') { return session.beginDialog('/korMenu'); }
                        else if (luisResult.entities[0].type == '영어인사') { return session.beginDialog('/EngMenu'); }

                    } else if (intent == '시승') {

                        //if (luisResult.entities.matches('/온라인 예약/')) {

                        //    return session.beginDialog('/korTestDrive');

                        //} else if (luisResult.entities.matches('/시승센터 전화예약/')) {

                        //    return session.beginDialog('/findTestDriveOffline');

                        //}
                        return session.beginDialog('/korTestDrive');
                        

                    } else if (intent == '디자인') { return session.beginDialog('/korDesign'); }
                    else if (intent == '편의사항') { return session.beginDialog('/korConvenience'); }
                    else if (intent == '가격') { return session.beginDialog('/korPrice'); }
                    else if (intent == 'None') {

                        session.send("I Do Not Understanding Your Comment . Please Typing 'hi' or '하이'");

                        return session.beginDialog('/');
                    }
                    
                })
                .catch(err => {
                    console.error(`error processing intent: ${err.message}`);
                    session.send(`there was an error processing your request, please try again later...`);
                    return session.cancelDialog(0, '/');

                });
        }
    ]);//bot.dialog('/greeting' end



    /***********************************************************************************

        한국어 메뉴 초기화면

    ************************************************************************************/

    bot.dialog('/korMenu', [                                        //bot.dialog('/korMenu' start

        function (session, args, next) {
            console.log('__dirname  : ' + __dirname);
            var card = new builder.HeroCard(session)
                .title("그랜다이저")
                .text("안녕!! 난 현대자동차 챗봇 그랜다이저야 !!")
                .images([
                    //builder.CardImage.create(session, "http://www.hyundai.com/kr/images/showroom/grandeur_ig/img_visual_car3.png")
                    //builder.CardImage.create(session, __dirname+"/images/Grandeur_main.png")
                    
                    builder.CardImage.create(session, "D:\home\site\wwwroot\images\Grandeur_main.png")
                    //builder.CardImage.create(session, "/d/home/site/wwwroot/images/Grandeur_main.jpg")
                    
                ]);
            var msg = new builder.Message(session).attachments([card]);
            session.send(msg);

           //session.send("안녕!! 난 현대자동차 챗봇 그랜다이저야 !!");

            builder.Prompts.choice(session, '원하시는 메뉴를 \n\n 선택하시거나 질문해주세요!!', '시승|디자인|편의사항|가격', { listStyle: builder.ListStyle.button });

        }

        , function (session, results) {

            var str = "";
            console.log('select menu : ' + session.message.text);
            if (session.message.text == results.response.entity) {
                console.log('선택 문구 : ' + results.response.entity);
                str = results.response.entity;

                if (str == '시승') {
                    session.beginDialog('/korTestDrive');
                } else if (str == '디자인') {
                    session.beginDialog('/korDesign');
                } else if (str == '편의사항') {
                    session.beginDialog('/korConvenience');
                } else if (str == '가격') {
                    session.beginDialog('/korPrice');
                } else {
                    session.endDialog();
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

                            if (luisResult.entities[i].type.match(/시승/g)) {
                                session.beginDialog('/korTestDrive');
                            } else if (luisResult.entities[i].type.match(/가격/g)) {
                                session.beginDialog('/korPrice');
                            } else if (luisResult.entities[i].type.match(/편의사항/g)) {
                                session.beginDialog('/korConvenience');
                            } else if (luisResult.entities[i].type.match(/디자인/g)) {
                                session.beginDialog('/korDesign');
                            }

                        };
                    })
                    .catch(err => {
                        console.error(`error processing intent: ${err.message}`);
                        session.send(`there was an error processing your request, please try again later...`);
                        return session.cancelDialog(0, '/');

                    });

            }
        },
        function (session, results) {
            // The menu runs a loop until the user chooses to (quit).
            session.replaceDialog('/korMenu');
        }

    ]).reloadAction('reloadMenu', null, { matches: /^그랜다이저/i });

    //bot.dialog('/korMenu' end


    /***********************************************************************************

        영어 초기 메뉴

    ************************************************************************************/
    bot.dialog('/EngMenu', [

        function (session, args, next) {

            session.send("Hi!! I`m Hyundai Motors ChatBot  Grandizer!!");
            builder.Prompts.choice(session, 'What do you want menu? choice or typing!!', 'testDrive|Design|Convenience|Price', { listStyle: builder.ListStyle.button });

        }


    ]);



    /***********************************************************************************

        한국어 시승 초기 메뉴

    ************************************************************************************/


    bot.dialog('/korTestDrive', [                                           //bot.dialog('/korTestDrive start

        function (session, args, next) {

            session.send("맞아요, 한번 타 보셔야 저를 좀 더 잘 알 수 있겠죠!!");

            builder.Prompts.choice(session, '시승 신청을 하시기 위해서는 온라인에서 예약을 하시거나 지점에 직접 연락을 해 주셔야 해요. 제가 도와 드릴께요, 어떤 방법이 편하시겠어요?',
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
                                .url('http://www.hyundai.com/kr/images/counsel/img_subvisual03_2015.jpg')
                                .alt('contoso_flowers')
                        ])
                        .buttons([
                            builder.CardAction.openUrl(session, "http://www.hyundai.com/kr/tdn/index.do", "여기에서 예약할수 있어요^^*"),
                        ]);
                    session.send(new builder.Message(session).addAttachment(onlineReserveCard));
                    session.send("멋진 시승 하세요^^");

                    //session.send("처음으로 돌아가고 싶으시면 그랜다이저를 입력해주세요~~~!!");

                    //session.beginDialog('/testDriveReturn');

                    //builder.Prompts.choice(session, "메인메뉴로 돌아가고 싶으시면 '처음으로' 또는 '그랜다이저'를 입력해주시고, 이전 메뉴로 돌아가고 싶으시면 '이전으로' 를 선택해주세요!!",
                    //    '처음으로|이전으로', { listStyle: builder.ListStyle.button });

                }
                else if (str == '시승센터 전화예약'){

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
                                            .url('http://www.hyundai.com/kr/images/counsel/img_subvisual03_2015.jpg')
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
                            builder.CardImage.create(session, __dirname +"/images/testDrive/seoul/seongnae.png")
                                .tap(builder.CardAction.showImage(session, __dirname+"/images/testDrive/seoul/seongnae.png")),
                        ])
                        //.images([
                        //    builder.CardImage.create(session, __dirname + "/images/testDrive/" + session.message.text + "/seongnae.png")
                        //        .tap(builder.CardAction.showImage(session, __dirname + "/images/testDrive/" + session.message.text + "/seongnae.png")),
                        //])
                        .buttons([
                            builder.CardAction.openUrl(session, "http://www.hyundai.com/kr/tdn/index.do", "시승센터 홈페이지")
                            //,builder.CardAction.imBack(session, "select:1", "Select")
                        ]),
                    new builder.HeroCard(session)
                        .title("잠실 시승센터")
                        .subtitle("전화번호 : 02-421-7365(FAX : 02-421-4737) 지점주소 : (05502) 서울 송파구 올림픽로 145 리센츠빌딩 2층 C10호 잠실시승센터")
                        .images([
                            builder.CardImage.create(session, __dirname +"/images/testDrive/seoul/jamsil.png")
                                .tap(builder.CardAction.showImage(session, __dirname +"/images/testDrive/seoul/jamsil.png")),
                        ])
                        .buttons([
                            builder.CardAction.openUrl(session, "http://www.hyundai.com/kr/tdn/index.do", "시승센터 홈페이지")
                            //,builder.CardAction.imBack(session, "select:2", "Select")
                        ]),
                    new builder.HeroCard(session)
                        .title("공릉 시승센터")
                        .subtitle("전화번호 : 02-973-7365(FAX : 02-3296-6218) 지점주소 : (01861) 서울 노원구 화랑로 429 현대자동차 공릉지점옆 공릉시승센터")
                        .images([
                            builder.CardImage.create(session, __dirname +"/images/testDrive/seoul/gongnung.png")
                                .tap(builder.CardAction.showImage(session, __dirname +"/images/testDrive/seoul/gongnung.png"))
                        ])
                        .buttons([
                            builder.CardAction.openUrl(session, "http://www.hyundai.com/kr/tdn/index.do", "시승센터 홈페이지")
                            //,builder.CardAction.imBack(session, "select:3", "Select")
                        ]),
                    new builder.HeroCard(session)
                        .title("목동 시승센터")
                        .subtitle("전화번호 : 02-2644-7365(FAX : 02-2644-7359) 지점주소 : (07995) 서울 양천구 목동서로 225 한국예술인협회 2층 목동시승센터")
                        .images([
                            builder.CardImage.create(session, __dirname +"/images/testDrive/seoul/mokdong.png")
                                .tap(builder.CardAction.showImage(session, __dirname +"/images/testDrive/seoul/mokdong.png"))
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
        
        ,function (session, results) {

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
                            builder.CardImage.create(session, __dirname+"/images/carDesign/20170302091059771443.jpg")
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
                            builder.CardImage.create(session, __dirname + "/images/carDesign/WC9/00060.jpg")
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, "화이트 크림", "선택")
                        ]),
                    new builder.HeroCard(session)
                        .title("이온 실버")
                        .images([
                            builder.CardImage.create(session, __dirname + "/images/carDesign/N9V/00060.jpg")
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, "이온 실버", "선택")
                        ]),
                    new builder.HeroCard(session)
                        .title("루나 그레이")
                        .images([
                            builder.CardImage.create(session, __dirname + "/images/carDesign/U9G/00060.jpg")
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, "루나 그레이", "선택")
                        ]),
                    new builder.HeroCard(session)
                        .title("판테라 그레이")
                        .images([
                            builder.CardImage.create(session, __dirname + "/images/carDesign/PG9/00060.jpg")
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, "판테라 그레이", "선택")

                        ]),
                    new builder.HeroCard(session)
                        .title("미드나잇 블랙")
                        .images([
                            builder.CardImage.create(session, __dirname + "/images/carDesign/NB9/00060.jpg")
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, "미드나잇 블랙", "선택")
                        ]),
                    new builder.HeroCard(session)
                        .title("발렌타인 레드")
                        .images([
                            builder.CardImage.create(session, __dirname + "/images/carDesign/V9R/00060.jpg")
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, "발렌타인 레드", "선택")
                        ]),
                    new builder.HeroCard(session)
                        .title("그랑 블루")
                        .images([
                            builder.CardImage.create(session, __dirname + "/images/carDesign/NU9/00060.jpg")
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, "그랑 블루", "선택")
                        ]),
                    new builder.HeroCard(session)
                        .title("쉐이드 브론즈")
                        .images([
                            builder.CardImage.create(session, __dirname + "/images/carDesign/S9C/00060.jpg")
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, "쉐이드 브론즈", "선택")
                        ]),
                    new builder.HeroCard(session)
                        .title("카키 메탈")
                        .images([
                            builder.CardImage.create(session, __dirname + "/images/carDesign/TK9/00060.jpg")
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
                        //   .title("단단해진 차체와 새로운 플랫폼 적용으로 균형 잡힌 주행 안정성과 민첩하고 다이나믹한 가속 응답성, 부드러운 승차감까지 갖추었습니다.")
                        //   .text("미래 자율 주행에 한발 더 다가선 지능형 안전기술 Hyundai SmartSense로 더운 편안한 주행 환경을 제공하고 다른 차량 운전자와 보행자까지 모두의 안전을 스마트하게 케어 합니다.")
                        .images([
                            builder.CardImage.create(session, __dirname + "/images/carDesign/car_outside_title.jpg")
                        ])

                ]);
            session.send(msg);

            session.send("그랜저 외관입니다.");


            var msg1 = new builder.Message(session)
                .textFormat(builder.TextFormat.xml)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                //.title("그랜저의 외관입니다.")
                .attachments([
                    new builder.HeroCard(session)
                        .title("Full LED 헤드램프 / 캐스캐이딩 그릴")
                        .images([
                            builder.CardImage.create(session, __dirname + "/images/carDesign/20161122093146198083.jpg")
                        ]),
                    new builder.HeroCard(session)
                        .title("19인치 알로이 휠 & 타이어")
                        .images([
                            builder.CardImage.create(session, __dirname + "/images/carDesign/20161122093251750084.jpg")
                        ]),
                    new builder.HeroCard(session)
                        .title("LED 방향지시등 적용 아웃사이드 미러 & 샤틴 크롬 몰딩")
                        .images([
                            builder.CardImage.create(session, __dirname + "/images/carDesign/20161122093309923085.jpg")
                        ]),
                    new builder.HeroCard(session)
                        .title("LED 리어 콤비램프")
                        .images([
                            builder.CardImage.create(session, __dirname + "/images/carDesign/20161122093331472086.jpg")
                        ])
                ]);

            session.send(msg1);
            builder.Prompts.choice(session, "그랜저의 디자인에 대해 메뉴를 보시겠습니까?", '디자인|색상|내관|외관|홈', { listStyle: builder.ListStyle.button });
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
                        // .title("크래쉬패드의 높이를 낮추고 수펴적인 아키텍처를 적용한 인테리어는\n\n 탁 트인 개방감과 넓고 안정적인 공간감을 연출합니다.")
                        // .text("엄선된 고급 소재와 깊이 있는 컬러, 새로운 플로팅 타입 디스플레이와 스마트 멀리미디어 시스템까지\n\n 정교하게 다듬어진 디테일들이 품격있고 섬세한 취향을 만족시켜 드릴 것입니다.")
                        .images([
                            builder.CardImage.create(session, __dirname + "/images/carDesign/car_inside_title.jpg")
                        ])

                ]);
            session.send(msg);
            session.send("그랜저 내관입니다.");

            var msg1 = new builder.Message(session)
                .textFormat(builder.TextFormat.xml)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments([
                    //AnimationCard
                    new builder.HeroCard(session)
                        .title("운전적 내부 전경")
                        .images([
                            builder.CardImage.create(session, __dirname + "/images/carDesign/car_inside_detail_front.jpg")

                        ]),
                    new builder.HeroCard(session)
                        .title("뒷자석 내부 전경")
                        .images([
                            builder.CardImage.create(session, __dirname + "/images/carDesign/car_inside_detail_back.jpg")
                        ]),

                ]);

            session.send(msg1);
            builder.Prompts.choice(session, "그랜저의 디자인에 대해 메뉴를 보시겠습니까?", '디자인|색상|내관|외관|홈', { listStyle: builder.ListStyle.button });
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
                            builder.CardImage.create(session, __dirname + "/images/carDesign/WC9/00055.jpg")
                        ]),
                    new builder.HeroCard(session)
                        .title("우측면")
                        .images([
                            builder.CardImage.create(session, __dirname + "/images/carDesign/WC9/00046.jpg")
                        ]),
                    new builder.HeroCard(session)
                        .title("좌측면")
                        .images([
                            builder.CardImage.create(session, __dirname + "/images/carDesign/WC9/00014.jpg")
                        ]),
                    new builder.HeroCard(session)
                        .title("후면")
                        .images([
                            builder.CardImage.create(session, __dirname + "/images/carDesign/WC9/00021.jpg")
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
                builder.Prompts.choice(session, "그랜저의 다른 메뉴를 보시겠습니까?", '시승|디자인|편의사항|가격|홈', { listStyle: builder.ListStyle.button });
            }

        },
        function (session, results) {

            session.userData.menuChoice = results.response.entity;
            if (results.response.entity == '시승') {
                session.beginDialog('/korTestDrive');
            } else if (results.response.entity == '디자인') {
                session.beginDialog('/korDesign');
            } else if (results.response.entity == '편의사항') {
                session.beginDialog('/korConvenience');
            } else if (results.response.entity == '가격') {
                session.beginDialog('/korPrice');
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
                            builder.CardImage.create(session, __dirname + "/images/carDesign/N9V/00055.jpg")
                        ]),
                    new builder.HeroCard(session)
                        .title("우측면")
                        .images([
                            builder.CardImage.create(session, __dirname + "/images/carDesign/N9V/00046.jpg")
                        ]),
                    new builder.HeroCard(session)
                        .title("좌측면")
                        .images([
                            builder.CardImage.create(session, __dirname + "/images/carDesign/N9V/00014.jpg")
                        ]),
                    new builder.HeroCard(session)
                        .title("후면")
                        .images([
                            builder.CardImage.create(session, __dirname + "/images/carDesign/N9V/00021.jpg")
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
                builder.Prompts.choice(session, "그랜저의 다른 메뉴를 보시겠습니까? ", '시승|디자인|편의사항|가격|홈', { listStyle: builder.ListStyle.button });
            }

        },
        function (session, results) {

            session.userData.menuChoice = results.response.entity;
            if (results.response.entity == '시승') {
                session.beginDialog('/korTestDrive');
            } else if (results.response.entity == '디자인') {
                session.beginDialog('/korDesign');
            } else if (results.response.entity == '편의사항') {
                session.beginDialog('/korConvenience');
            } else if (results.response.entity == '가격') {
                session.beginDialog('/korPrice');
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
                            builder.CardImage.create(session, __dirname + "/images/carDesign/U9G/00055.jpg")
                        ]),
                    new builder.HeroCard(session)
                        .title("우측면")
                        .images([
                            builder.CardImage.create(session, __dirname + "/images/carDesign/U9G/00046.jpg")
                        ]),
                    new builder.HeroCard(session)
                        .title("좌측면")
                        .images([
                            builder.CardImage.create(session, __dirname + "/images/carDesign/U9G/00014.jpg")
                        ]),
                    new builder.HeroCard(session)
                        .title("후면")
                        .images([
                            builder.CardImage.create(session, __dirname + "/images/carDesign/U9G/00021.jpg")
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
                builder.Prompts.choice(session, "그랜저의 다른 메뉴를 보시겠습니까? ", '시승|디자인|편의사항|가격|홈', { listStyle: builder.ListStyle.button });
            }

        },
        function (session, results) {

            session.userData.menuChoice = results.response.entity;
            if (results.response.entity == '시승') {
                session.beginDialog('/korTestDrive');
            } else if (results.response.entity == '디자인') {
                session.beginDialog('/korDesign');
            } else if (results.response.entity == '편의사항') {
                session.beginDialog('/korConvenience');
            } else if (results.response.entity == '가격') {
                session.beginDialog('/korPrice');
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
                            builder.CardImage.create(session, __dirname + "/images/carDesign/PG9/00055.jpg")
                        ]),
                    new builder.HeroCard(session)
                        .title("우측면")
                        .images([
                            builder.CardImage.create(session, __dirname + "/images/carDesign/PG9/00046.jpg")
                        ]),
                    new builder.HeroCard(session)
                        .title("좌측면")
                        .images([
                            builder.CardImage.create(session, __dirname + "/images/carDesign/PG9/00014.jpg")
                        ]),
                    new builder.HeroCard(session)
                        .title("후면")
                        .images([
                            builder.CardImage.create(session, __dirname + "/images/carDesign/PG9/00021.jpg")
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
                builder.Prompts.choice(session, "그랜저의 다른 메뉴를 보시겠습니까? ", '시승|디자인|편의사항|가격|홈', { listStyle: builder.ListStyle.button });
            }

        },
        function (session, results) {

            session.userData.menuChoice = results.response.entity;
            if (results.response.entity == '시승') {
                session.beginDialog('/korTestDrive');
            } else if (results.response.entity == '디자인') {
                session.beginDialog('/korDesign');
            } else if (results.response.entity == '편의사항') {
                session.beginDialog('/korConvenience');
            } else if (results.response.entity == '가격') {
                session.beginDialog('/korPrice');
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
                            builder.CardImage.create(session, __dirname + "/images/carDesign/PG9/00055.jpg")
                        ]),
                    new builder.HeroCard(session)
                        .title("우측면")
                        .images([
                            builder.CardImage.create(session, __dirname + "/images/carDesign/PG9/00046.jpg")
                        ]),
                    new builder.HeroCard(session)
                        .title("좌측면")
                        .images([
                            builder.CardImage.create(session, __dirname + "/images/carDesign/PG9/00014.jpg")
                        ]),
                    new builder.HeroCard(session)
                        .title("후면")
                        .images([
                            builder.CardImage.create(session, __dirname + "/images/carDesign/PG9/00021.jpg")
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
                builder.Prompts.choice(session, "그랜저의 다른 메뉴를 보시겠습니까?", '시승|디자인|편의사항|가격|홈', { listStyle: builder.ListStyle.button });
            }

        },
        function (session, results) {

            session.userData.menuChoice = results.response.entity;
            if (results.response.entity == '시승') {
                session.beginDialog('/korTestDrive');
            } else if (results.response.entity == '디자인') {
                session.beginDialog('/korDesign');
            } else if (results.response.entity == '편의사항') {
                session.beginDialog('/korConvenience');
            } else if (results.response.entity == '가격') {
                session.beginDialog('/korPrice');
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
                            builder.CardImage.create(session, __dirname + "/images/carDesign/PG9/00055.jpg")
                        ]),
                    new builder.HeroCard(session)
                        .title("우측면")
                        .images([
                            builder.CardImage.create(session, __dirname + "/images/carDesign/PG9/00046.jpg")
                        ]),
                    new builder.HeroCard(session)
                        .title("좌측면")
                        .images([
                            builder.CardImage.create(session, __dirname + "/images/carDesign/PG9/00014.jpg")
                        ]),
                    new builder.HeroCard(session)
                        .title("후면")
                        .images([
                            builder.CardImage.create(session, __dirname + "/images/carDesign/PG9/00021.jpg")
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
                builder.Prompts.choice(session, "그랜저의 다른 메뉴를 보시겠습니까?", '시승|디자인|편의사항|가격|홈', { listStyle: builder.ListStyle.button });
            }

        },
        function (session, results) {

            session.userData.menuChoice = results.response.entity;
            if (results.response.entity == '시승') {
                session.beginDialog('/korTestDrive');
            } else if (results.response.entity == '디자인') {
                session.beginDialog('/korDesign');
            } else if (results.response.entity == '편의사항') {
                session.beginDialog('/korConvenience');
            } else if (results.response.entity == '가격') {
                session.beginDialog('/korPrice');
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
                            builder.CardImage.create(session, __dirname + "/images/carDesign/PG9/00055.jpg")
                        ]),
                    new builder.HeroCard(session)
                        .title("우측면")
                        .images([
                            builder.CardImage.create(session, __dirname + "/images/carDesign/PG9/00046.jpg")
                        ]),
                    new builder.HeroCard(session)
                        .title("좌측면")
                        .images([
                            builder.CardImage.create(session, __dirname + "/images/carDesign/PG9/00014.jpg")
                        ]),
                    new builder.HeroCard(session)
                        .title("후면")
                        .images([
                            builder.CardImage.create(session, __dirname + "/images/carDesign/PG9/00021.jpg")
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
                builder.Prompts.choice(session, "그랜저의 다른 메뉴를 보시겠습니까?", '시승|디자인|편의사항|가격|홈', { listStyle: builder.ListStyle.button });
            }

        },
        function (session, results) {

            session.userData.menuChoice = results.response.entity;
            if (results.response.entity == '시승') {
                session.beginDialog('/korTestDrive');
            } else if (results.response.entity == '디자인') {
                session.beginDialog('/korDesign');
            } else if (results.response.entity == '편의사항') {
                session.beginDialog('/korConvenience');
            } else if (results.response.entity == '가격') {
                session.beginDialog('/korPrice');
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
                            builder.CardImage.create(session, __dirname + "/images/carDesign/PG9/00055.jpg")
                        ]),
                    new builder.HeroCard(session)
                        .title("좌측면")
                        .images([
                            builder.CardImage.create(session, __dirname + "/images/carDesign/PG9/00046.jpg")
                        ]),
                    new builder.HeroCard(session)
                        .title("우측면")
                        .images([
                            builder.CardImage.create(session, __dirname + "/images/carDesign/PG9/00014.jpg")
                        ]),
                    new builder.HeroCard(session)
                        .title("후면")
                        .images([
                            builder.CardImage.create(session, __dirname + "/images/carDesign/PG9/00021.jpg")
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
                builder.Prompts.choice(session, "그랜저의 다른 메뉴를 보시겠습니까?", '시승|디자인|편의사항|가격|홈', { listStyle: builder.ListStyle.button });
            }

        },
        function (session, results) {

            session.userData.menuChoice = results.response.entity;
            if (results.response.entity == '시승') {
                session.beginDialog('/korTestDrive');
            } else if (results.response.entity == '디자인') {
                session.beginDialog('/korDesign');
            } else if (results.response.entity == '편의사항') {
                session.beginDialog('/korConvenience');
            } else if (results.response.entity == '가격') {
                session.beginDialog('/korPrice');
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
                            builder.CardImage.create(session, __dirname + "/images/carDesign/PG9/00055.jpg")
                        ]),
                    new builder.HeroCard(session)
                        .title("우측면")
                        .images([
                            builder.CardImage.create(session, __dirname + "/images/carDesign/PG9/00046.jpg")
                        ]),
                    new builder.HeroCard(session)
                        .title("좌측면")
                        .images([
                            builder.CardImage.create(session, __dirname + "/images/carDesign/PG9/00014.jpg")
                        ]),
                    new builder.HeroCard(session)
                        .title("후면")
                        .images([
                            builder.CardImage.create(session, __dirname + "/images/carDesign/PG9/00021.jpg")
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
                builder.Prompts.choice(session, "그랜저의 다른 메뉴를 보시겠습니까?", '시승|디자인|편의사항|가격|홈', { listStyle: builder.ListStyle.button });
            }

        },
        function (session, results) {

            session.userData.menuChoice = results.response.entity;
            if (results.response.entity == '시승') {
                session.beginDialog('/korTestDrive');
            } else if (results.response.entity == '디자인') {
                session.beginDialog('/korDesign');
            } else if (results.response.entity == '편의사항') {
                session.beginDialog('/korConvenience');
            } else if (results.response.entity == '가격') {
                session.beginDialog('/korPrice');
            } else if (results.response.entity == '홈') {
                session.beginDialog('/korMenu');
            } else {
                session.endDialog();
            }

        }
    ]);


    /***********************************************************************************

    1. 한국어 편의사항 초기 메뉴

    ************************************************************************************/

    bot.dialog('/korConvenience', [

        function (session) {

            var msg = new builder.Message(session)
                .textFormat(builder.TextFormat.xml)
                //.attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments([
                    //AnimationCard
                    new builder.HeroCard(session)
                        .title("Convenience")
                        .subtitle("스마트 멀티미디어 시스템과 고품격 사운드 시스템 등 고준 준대형 세단이 가져야 할 모든 편의사양들이 그랜저에 적용되었습니다.")
                        .images([
                            builder.CardImage.create(session, __dirname+"/images/convenience/convenience00.png")
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, "스마트센스", "스마트센스"),
                            builder.CardAction.imBack(session, "인포테인먼트", "인포테인먼트"),
                            builder.CardAction.imBack(session, "안전", "안전")
                        ])


                ]);
            builder.Prompts.choice(session, msg, "스마트센스|인포테인먼트|안전");
        }, function (session, results) {
                session.send('당신의 선택 메뉴 : %s!', results.response.entity);
                if (results.response.entity == '스마트센스') {
                    session.beginDialog('/smartsense');
                }
                else if (results.response.entity == '인포테인먼트') {
                    session.beginDialog('/infotainment');
                }
                else if (results.response.entity == '안전') {
                    session.beginDialog('/safe');

                }
        }

    ]);


    /***********************************************************************************

   1. 한국어 편의사항 - 스마트 센스 초기메뉴

   ************************************************************************************/


    //스마트센스
    bot.dialog('/smartsense', [
        function (session) {
            builder.Prompts.choice(session, '원하시는 메뉴를 선택하세요? 선택하시거나 질문해주세요!!!', '스마트 센스 소개|스마트 센스 세부목록|스마트 센스 세부목록 링크', { listStyle: builder.ListStyle.button });
        }, function (session, results) {

            session.send('당신의 선택 메뉴 : %s!', results.response.entity);
            if (results.response.entity == '스마트 센스 소개') {
                var msg = new builder.Message(session)
                    .textFormat(builder.TextFormat.xml)
                    //.attachmentLayout(builder.AttachmentLayout.carousel)
                    .attachments([
                        //AnimationCard
                        new builder.HeroCard(session)
                            .title("SmartSense")
                            .subtitle("그랜저에 적용된 지능형 안전기술")
                            .images([
                                builder.CardImage.create(session, __dirname+"/images/convenience/smartsense/smartsense0.png")
                            ])
                            .buttons([
                                builder.CardAction.openUrl(session, "http://www.hyundai.com/kr/showroom.do?carCd1=RD032&WT.ac=gnb_carkind_grandeur", "Go To SITE")])
                    ]);
            }
            else if (results.response.entity == '스마트 센스 세부목록') {
                session.send('당신의 선택 메뉴 : %s!', results.response.entity);
                if (results.response.entity == '스마트 센스 세부목록') {
                    var msg = new builder.Message(session)
                        .textFormat(builder.TextFormat.xml)
                        .attachmentLayout(builder.AttachmentLayout.carousel)
                        .attachments([
                            //AnimationCard
                            new builder.HeroCard(session)
                                .title("후측방 출돌 회피 지원시스템")
                                .subtitle("아웃사이드 미러로 확인할 수 없는 사각지대의 차량 또는 후방에서 접근하는 차량 등을 감지해 경보합니다. 차선 이탈 시 후측방 차량과 충돌 위험이 감지될 경우, 함으로써 충돌을 방지할 수 있도록 보조합니다.")
                                .images([
                                    builder.CardImage.create(session, __dirname+"/images/convenience/smartsense/smartsense1.png")
                                ]),
                            new builder.HeroCard(session)
                                .title("자동 긴급제동 시스템")
                                .subtitle("전방 레이더와 전방 감지 카메라의 신호를 종합적으로 판단하여 선행 차량 및 보행자와의 추돌 위험 상황이 감지될 경우 운전자에게 이를 경보하고, 필요 시 브레이크 작동을 보조합니다.")
                                .images([
                                    builder.CardImage.create(session, __dirname+"/images/convenience/smartsense/smartsense2.png")
                                ]),
                            new builder.HeroCard(session)
                                .title("어드밴스드 스마트 크루즈 컨트롤")
                                .subtitle("선행차량과의 거리를 감지하여 운전자가 설정한 차량 속도 및 앞차와의 거리를 유지해주며, 차량이 완전히 정지한 후에도 선행차량이 출발하면(3초 이내) 자동으로 속도 및 거리 제어를 지원합니다")
                                .images([
                                    builder.CardImage.create(session, __dirname+"/images/convenience/smartsense/smartsense3.png")
                                ]),
                            new builder.HeroCard(session)
                                .title("어라운드 뷰 모니터")
                                .subtitle("4대의 고화질 카메라가 전·후·측면의 사각지대를 보여주어 주차 상황에서 운전자가 안전하고 쉽게 주차할 수 있도록 도와주며, 주행 중에도 운전자가 필요할 경우 후방 영상을 표시하여 안전성을 추가로 향상시켰습니다.")
                                .images([
                                    builder.CardImage.create(session, __dirname+"/images/convenience/smartsense/smartsense4.png")
                                ]),
                            new builder.HeroCard(session)
                                .title("부주의 운전 정보 시스템")
                                .subtitle("운전 상태를 5단계 레벨로 표시하며, 운전자의 피로나 부주의한 운전 패턴으로 판단되면 팝업 메시지와 경보음을 통해 휴식을 유도합니다.")
                                .images([
                                    builder.CardImage.create(session, __dirname+"/images/convenience/smartsense/smartsense5.png")
                                ]),
                            new builder.HeroCard(session)
                                .title("스마트 하이빔")
                                .subtitle("야간에 상향등을 켜고 주행하는 중 맞은 편에 차량이 있을 경우 헤드램프를 자동으로 하향등으로 전환하여 잦은 상향등 조작에 따른 불편함을 줄여주고 운전차량 및 상대차량이 안전하게 주행할 수 있도록 도와줍니다.")
                                .images([
                                    builder.CardImage.create(session, __dirname+"/images/convenience/smartsense/smartsense6.png")
                                ]),
                            new builder.HeroCard(session)
                                .title("주행 조향보조 시스템")
                                .subtitle("윈드쉴드 글래스 상단에 장착된 카메라를 통하여 차선을 인식하고 차선이탈이 예상되면 조향을 보조하여 차선이탈 상황을 방지해 줍니다.차선 이탈경보 기능, 차선 유지보조 기능, 능동 조향보조 기능 중 하나를 선택하여 사용할 수 있습니다")
                                .images([
                                    builder.CardImage.create(session, __dirname+"/images/convenience/smartsense/smartsense7.png")
                                ])

                        ]);
                }
            }

            else if (results.response.entity == '스마트 센스 세부목록 링크') {
                var msg = new builder.Message(session)
                    .textFormat(builder.TextFormat.xml)
                    //.attachmentLayout(builder.AttachmentLayout.carousel)
                    .attachments([
                        //AnimationCard
                        new builder.HeroCard(session)
                            //.title("SmartSense")
                            .subtitle("스마트 센스 세부목록 편집된 안내 페이지로 링크")
                            .images([
                                builder.CardImage.create(session, "http://www.hyundai.com/kr/images/showroom/grandeur_ig/img_visual_car3.png")
                            ])
                            .buttons([
                                builder.CardAction.openUrl(session, "http://www.hyundai.com/kr/showroom.do?carCd1=RD032&WT.ac=gnb_carkind_grandeur", "Go To SITE")])
                    ]);
            }
            //출력
            session.send(msg);
            //}
        }
    ]);



    /***********************************************************************************

    1. 한국어 편의사항 - 인포테인먼트 초기 메뉴

    ************************************************************************************/



    //인포테인먼트
    bot.dialog('/infotainment', [
        function (session) {
            builder.Prompts.choice(session, '원하시는 메뉴를 선택하세요? 선택하시거나 질문해주세요!!!', '인포테인먼트 소개|인포테인먼트 세부목록|인포테인먼트 세부목록 링크', { listStyle: builder.ListStyle.button });
        }, function (session, results) {

            session.send('당신의 선택 메뉴 : %s!', results.response.entity);
            if (results.response.entity == '인포테인먼트 소개') {
                var msg = new builder.Message(session)
                    .textFormat(builder.TextFormat.xml)
                    //.attachmentLayout(builder.AttachmentLayout.carousel)
                    .attachments([
                        //AnimationCard
                        new builder.HeroCard(session)
                            .title("Infotainment")
                            .subtitle("스마트 멀티미디어 시스템과 고품격 사운드 시스템 등 고급 준대형 세단이 가져야 할 모든 편의사양들이 적용되었습니다. 당신의 삶을 스마트하게 케어할 수 있도록 그랜저가 한 발 더 앞서갑니다.")
                            .images([
                                builder.CardImage.create(session, "http://www.hyundai.com/kr/dsp/20161122094424247104.jpg")
                            ])
                    ]);
            }
            else if (results.response.entity == '인포테인먼트 세부목록') {
                session.send('당신의 선택 메뉴 : %s!', results.response.entity);
                if (results.response.entity == '인포테인먼트 세부목록') {
                    var msg = new builder.Message(session)
                        .textFormat(builder.TextFormat.xml)
                        .attachmentLayout(builder.AttachmentLayout.carousel)
                        .attachments([
                            //AnimationCard
                            new builder.HeroCard(session)
                                .subtitle("8인치 내비게이션 & 폰 커넥티비티 (애플 카플레이, 미러링크 지원)")
                                .images([
                                    builder.CardImage.create(session, __dirname+"/images/convenience/infotainment/infotainment1.png")
                                ]),
                            new builder.HeroCard(session)
                                .subtitle("아날로그 시계 / 전동식 파킹 브레이크 (오토홀드 기능 포함)")
                                .images([
                                    builder.CardImage.create(session, __dirname+"/images/convenience/infotainment/infotainment2.png")
                                ]),
                            new builder.HeroCard(session)
                                .subtitle("JBL 프리미엄 사운드 시스템 (12 스피커)")
                                .images([
                                    builder.CardImage.create(session, __dirname+"/images/convenience/infotainment/infotainment3.png")
                                ]),
                            new builder.HeroCard(session)
                                .subtitle("동승석 워크인 스위치 / CDP (센터 콘솔 암레스트 내장)")
                                .images([
                                    builder.CardImage.create(session, __dirname+"/images/convenience/infotainment/infotainment4.png")
                                ])

                        ]);
                }
                //builder.Prompts.choice(session, '원하시는 메뉴를 선택하세요? 선택하시거나 질문해주세요!!', '인포테인먼트 소개|인포테인먼트 세부목록|인포테인먼트 세부목록 링크', { listStyle: builder.ListStyle.button });
            }
            else if (results.response.entity == '인포테인먼트 세부목록 링크') {
                session.send('인포테인먼트 세부목록 링크');
                //builder.Prompts.choice(session, '원하시는 메뉴를 선택하세요? 선택하시거나 질문해주세요!!', '안전 소개|안전 세부목록|안전 세부목록 링크', { listStyle: builder.ListStyle.button });

            }

            session.send(msg);
        }
    ]);


    /***********************************************************************************

    1. 한국어 편의사항 - 안전 초기 메뉴

    ************************************************************************************/
    //안전
    bot.dialog('/safe', [
        function (session) {

            builder.Prompts.choice(session, '원하시는 메뉴를 선택하세요? 선택하시거나 질문해주세요!!!', '안전 소개|안전 세부목록|안전 세부목록 링크', { listStyle: builder.ListStyle.button });
        }, function (session, results) {

            session.send('당신의 선택 메뉴 : %s!', results.response.entity);
            if (results.response.entity == '안전 소개') {
                var msg = new builder.Message(session)
                    .textFormat(builder.TextFormat.xml)
                    //.attachmentLayout(builder.AttachmentLayout.carousel)
                    .attachments([
                        //AnimationCard
                        new builder.HeroCard(session)
                            .title("Safety")
                            .subtitle("안전에 관한 새로운 패러다임을 제시할 것")
                            .text("앞 차와 사고가 나기전에 미리, 뒤 차와 충돌하기 전에 미리, 차선을 벗어나기 전에 미리 그랜저에게 안전이란, 미리 사고를 예방하는 것입니다. 때론 알아서 멈추고 주변 360도를 확인시켜주고 운전자의 부주의를 챙기는 것까지 어떤 상황에서도 운전자와 보행자 모두의 안전을 지킬 수 있도록. 다시 처음부터 그랜저를 바꾸다")
                            .images([
                                builder.CardImage.create(session, __dirname+"/images/convenience/safe/safe0.jpg")
                            ])

                    ]);
            }
            else if (results.response.entity == '안전 세부목록') {
                session.send('당신의 선택 메뉴 : %s!', results.response.entity);
                if (results.response.entity == '안전 세부목록') {
                    var msg = new builder.Message(session)
                        .textFormat(builder.TextFormat.xml)
                        .attachmentLayout(builder.AttachmentLayout.carousel)
                        .attachments([
                            //AnimationCard
                            new builder.HeroCard(session)
                                .title("9 에어백 시스템")
                                //.subtitle("부주의 운전 경보 시스템")
                                .images([
                                    builder.CardImage.create(session, __dirname+"/images/convenience/safe/safe1.jpg")
                                ]),
                            new builder.HeroCard(session)
                                .title("차체 강성 향상")
                                .subtitle("기존차 대비 차체 평균 강도를 34% 개선, 차체 비틀림 강성이 23% 향상되고 충돌 시 객실 보호 성능이 강화되었습니다.")
                                .images([
                                    builder.CardImage.create(session, __dirname+"/images/convenience/safe/safe2.jpg")
                                ]),
                            new builder.HeroCard(session)
                                .title("전동식 파킹 브레이크 (오토홀드 기능 포함)")
                                //.subtitle("어드밴스드 스마트 크루즈 컨트롤")
                                .images([
                                    builder.CardImage.create(session, __dirname+"/images/convenience/safe/safe3.jpg")
                                ]),
                            new builder.HeroCard(session)
                                .title("세이프티 언락")
                                //.subtitle("어라운드 뷰 모니터")
                                .images([
                                    builder.CardImage.create(session, __dirname+"/images/convenience/safe/safe4.jpg")
                                ])
                        ]);
                }

            }
            else if (results.response.entity == '안전 세부목록 링크') {
                session.send('당신의 선택 메뉴 : %s!', results.response.entity);
                var msg = new builder.Message(session)
                    .textFormat(builder.TextFormat.xml)
                    //.attachmentLayout(builder.AttachmentLayout.carousel)
                    .attachments([
                        //AnimationCard
                        new builder.HeroCard(session)
                            //.title("SmartSense")
                            .subtitle("안전 세부목록 편집된 안내 페이지로 링크")
                            .images([
                                builder.CardImage.create(session, "http://www.hyundai.com/kr/images/showroom/grandeur_ig/img_visual_car3.png")
                            ])
                            .buttons([
                                builder.CardAction.openUrl(session, "http://www.hyundai.com/kr/showroom.do?carCd1=RD032&WT.ac=gnb_carkind_grandeur", "Go To SITE")])
                    ]);

            }
            session.send(msg);
        }
    ]);



    /***********************************************************************************

    1. 한국어 가격 초기 메뉴

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
                            builder.CardImage.create(session, __dirname+"/images/price/Grander_22spec.PNG")
                                .tap(builder.CardAction.showImage(session, __dirname+"/images/price/Grander_22spec.PNG"))
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, "1 : 가솔린 2.4", "가솔린 2.4 선택")
                        ]),
                    new builder.HeroCard(session)
                        .title("가솔린 3.0")
                        .images([
                            builder.CardImage.create(session, __dirname+"/images/price/Grander_30spec.png")
                                .tap(builder.CardAction.showImage(session, __dirname+"/images/price/Grander_30spec.PNG"))
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, "2 : 가솔린 3.0", "가솔린 3.0 선택")
                        ]),
                    new builder.HeroCard(session)
                        .title("가솔린 3.3")
                        .images([
                            builder.CardImage.create(session, __dirname+"/images/price/Grander_33spec.png")
                                .tap(builder.CardAction.showImage(session, __dirname+"/images/price/Grander_33spec.PNG"))
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, "3 : 가솔린 3.3", "가솔린 3.3 선택")
                        ]),
                    new builder.HeroCard(session)
                        .title("디젤 2.2")
                        .images([
                            builder.CardImage.create(session, __dirname+"/images/price/Grander_22spec.png")
                                .tap(builder.CardAction.showImage(session, __dirname+"/images/price/Grander_22spec.PNG"))
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
                    session.send("가솔린 3.0 모델 미구현(가솔린 2.4버튼만 가능)");
                } else if (results.response.entity == "가솔린 3.3" || results.response.entity == 3) {
                    session.send("가솔린 3.3 모델 미구현(가솔린 2.4버튼만 가능)");
                } else if (results.response.entity == "디젤 2.2" || results.response.entity == 4) {
                    session.send("디젤 2.2 모델 미구현(가솔린 2.4버튼만 가능)");
                }
            } else {
                // Exit the menu
                session.endDialog();
            }
        }

    ]);
    
    /***********************************************************************************

    1. 한국어 가격 - 모던 24 메뉴

    ************************************************************************************/

    bot.dialog('/model24', [
        function (session) {
            session.send("가솔린 2.4 모델을 선택 하셨습니다.");
            var msg = new builder.Message(session)
                .attachments([
                    new builder.ReceiptCard(session)
                        .title("가솔린 2.4")
                        .items([
                            builder.ReceiptItem.create(session, "30,550,000", "모던"),
                            builder.ReceiptItem.create(session, "31,750,000", "프리미엄"),
                            builder.ReceiptItem.create(session, "33,750,000", "프리미엄 스페셜")
                        ])
                        .facts([
                            builder.Fact.create(session, "(단위 : 원)", "2017년 3월 기준"),
                            builder.Fact.create(session, "판매가격", "트림명")
                        ])
                        //.tax("$4.40")
                        //.total("$48.40")
                        .buttons([
                            builder.CardAction.imBack(session, "트림", "트림종류"),
                            builder.CardAction.imBack(session, "다른모델", "다른모델 선택"),
                            builder.CardAction.imBack(session, "홈", "홈")
                        ])
                ]);
            //session.send(msg);
            builder.Prompts.choice(session, msg, "트림|다른모델|홈");

        },

        function (session, results) {
            if (results.response && results.response.entity != '(quit)') {
                // Select Model Menu
                if (results.response.entity == "트림" || results.response.entity == 1) {
                    session.beginDialog('/model24_trim');
                } else if (results.response.entity == "다른모델" || results.response.entity == 2) {
                    session.beginDialog('/korPrice');
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

    1. 한국어 가격 - 모던 24 - 모던 24 트림

    ************************************************************************************/

    bot.dialog('/model24_trim', [
        function (session) {
            session.send("가솔린 2.4의 트림입니다.");
            var msg = new builder.Message(session)
                .attachments([
                    new builder.ReceiptCard(session)
                        .title("Mordern(모던)")
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
                        .title("Premium(프리미엄)")
                        .items([
                            builder.ReceiptItem.create(session, "", "가솔린 2.4 모던 기본 사양 및"),
                            builder.ReceiptItem.create(session, "생략", "안전"),
                            builder.ReceiptItem.create(session, "생략", "시트/편의")
                        ])
                        .facts([
                            builder.Fact.create(session, "31,750,000", "주요사항")
                        ]),
                    new builder.ReceiptCard(session)
                        .title("Premium Special(프리미엄 스페셜)")
                        .items([
                            builder.ReceiptItem.create(session, "", "가솔린 2.4 프리미엄 기본 사양 및"),
                            builder.ReceiptItem.create(session, "생략", "외관"),
                            builder.ReceiptItem.create(session, "생략", "내장"),
                            builder.ReceiptItem.create(session, "생략", "시트"),
                            builder.ReceiptItem.create(session, "생략", "편의")
                        ])
                        .facts([
                            builder.Fact.create(session, "33,750,000", "주요사항")
                        ])
                ]);

            builder.Prompts.choice(session, msg, "트림|다른모델|홈");
        }
    ]);

}   // function create(bot) END



module.exports = {
    create
}