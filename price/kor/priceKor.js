var builder = require('botbuilder');
var query = require('../../config/query');
var date = require('date-utils');
date = new Date();

function create(bot) {
    /***********************************************************************************
1. 한국어 가격 초기 메뉴(모델 카드)
************************************************************************************/

    var responseTime;
    
    bot.dialog('/korPriceModel', [
        
        function (session, args) {
            session.userData.model = "";
            session.send("가격을 보시려면 모델을 선택하셔야 합니다. \n\n 모델은 엔진타입별로 달라요.");
            var msg = new builder.Message(session)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments([
                new builder.HeroCard(session)
                        .title("30,550,000 원 ~ 33,750,000 원")
                        .images([
                    builder.CardImage.create(session, img_path + "/images/price/Grandeur_24spec.PNG")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_24spec.PNG"))
                ])
                        .buttons([
                    builder.CardAction.imBack(session, "가솔린 2.4 모델을 보여줘", "가솔린 2.4 선택")
                ]),
                new builder.HeroCard(session)
                        .title("35,500,000 원 ~ 38,700,000 원")
                        .images([
                    builder.CardImage.create(session, img_path + "/images/price/Grandeur_30spec.PNG")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_30spec.PNG"))
                ])
                        .buttons([
                    builder.CardAction.imBack(session, "가솔린 3.0 모델을 보여줘", "가솔린 3.0 선택")
                ]),
                new builder.HeroCard(session)
                        .title("41,600,000 원")
                        .images([
                    builder.CardImage.create(session, img_path + "/images/price/Grandeur_33spec.PNG")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_33spec.PNG"))
                ])
                        .buttons([
                    builder.CardAction.imBack(session, "가솔린 3.3 모델을 보여줘", "가솔린 3.3 선택")
                ]),
                new builder.HeroCard(session)
                        .title("33,550,000 원 ~ 36,750,000 원")
                        .images([
                    builder.CardImage.create(session, img_path + "/images/price/Grandeur_22spec.PNG")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_22spec.PNG"))
                ])
                        .buttons([
                    builder.CardAction.imBack(session, "디젤 2.2 모델을 보여줘", "디젤 2.2 선택")
                ])
            ]);
            builder.Prompts.choice(session, msg, "가솔린 2.4|가솔린 3.0|가솔린 3.3|디젤 2.2");
            session.endDialog();
            //session.beginDialog('/korReMainMenu');

            /*responseTime = parseInt(date.getTime()) - parseInt(args.beginTime);
            query.insertHistoryQuery(args, responseTime, function (err, result) {
                if (!err) {
                    console.log("query.getData : " + result);
                }
            });*/
        }
    ]);
    
    /***********************************************************************************
    2. 한국어 가격 메뉴 (트림 카드)
    ************************************************************************************/

    bot.dialog('/korPriceTrim', [
        function (session, args) {
            session.send("모델의 가격은 옵션별로 달라요. \n\n 옵션을 선택하시면 가격을 볼 수 있어요. [기본옵션][선택옵션]");
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
            if (args.sendMsg.match(/가솔린2.4/g)) {
                model = "가솔린 2.4";
                trim1 = "모던(Modern)";
                trim2 = "프리미엄(Premium)";
                trim3 = "프리미엄 스페셜(Premium Special)";
                //모던 카드
                trimCard1 = [new builder.HeroCard(session)
                    .title(model + " " + trim1)
                    .text("가격 : 30,550,000 원")
                    .images([
                        builder.CardImage.create(session, img_path + "/images/price/Grandeur_modern.PNG")
                            .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_modern.PNG"))
                    ])
                    .buttons([
                        //builder.CardAction.imBack(session, model + " " + trim1 + " 기본 옵션을 보여줘", "기본 옵션"),
                        builder.CardAction.imBack(session, model + " " + trim1 + " 선택 옵션을 보여줘", "선택 옵션 추가")
                    ])];
                //프리미엄 카드
                trimCard2 = [new builder.HeroCard(session)
                    .title(model + " " + trim2)
                    .text("가격 : 31,750,000 원")
                    .images([
                        builder.CardImage.create(session, img_path + "/images/price/Grandeur_modern.PNG")
                            .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_modern.PNG"))
                    ])
                    .buttons([
                        //builder.CardAction.imBack(session, model + " " + trim2 + " 기본 옵션을 보여줘", "기본 옵션"),
                        builder.CardAction.imBack(session, model + " " + trim2 + " 선택 옵션을 보여줘", "선택 옵션 추가")
                    ])];
                //프리미엄 스페셜 카드
                trimCard3 = [new builder.HeroCard(session)
                    .title(model + " " + trim3)
                    .text("가격 : 33,750,000 원")
                    .images([
                        builder.CardImage.create(session, img_path + "/images/price/Grandeur_modern.PNG")
                            .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_modern.PNG"))
                    ])
                    .buttons([
                        //builder.CardAction.imBack(session, model + " " + trim3 + " 기본 옵션을 보여줘", "기본 옵션"),
                        builder.CardAction.imBack(session, model + " " + trim3 + " 선택 옵션을 보여줘", "선택 옵션 추가")
                    ])];
                //모던 + 프리미엄 + 프리미엄 스페셜 카드
                trimCard4 = [new builder.HeroCard(session)
                    .title(model + " " + trim1)
                    .text("가격 : 30,550,000 원")
                    .images([
                        builder.CardImage.create(session, img_path + "/images/price/Grandeur_modern.PNG")
                            .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_modern.PNG"))
                    ])
                    .buttons([
                        //builder.CardAction.imBack(session, model + " " + trim1 + " 기본 옵션을 보여줘", "기본 옵션"),
                        builder.CardAction.imBack(session, model + " " + trim1 + " 선택 옵션을 보여줘", "선택 옵션 추가")
                    ]),
                    new builder.HeroCard(session)
                        .title(model + " " + trim2)
                        .text("가격 : 31,750,000 원")
                        .images([
                        builder.CardImage.create(session, img_path + "/images/price/Grandeur_modern.PNG")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_modern.PNG"))
                    ])
                        .buttons([
                            //builder.CardAction.imBack(session, model + " " + trim2 + " 기본 옵션을 보여줘", "기본 옵션"),
                        builder.CardAction.imBack(session, model + " " + trim2 + " 선택 옵션을 보여줘", "선택 옵션 추가")
                    ]),
                    new builder.HeroCard(session)
                        .title(model + " " + trim3)
                        .text("가격 : 33,750,000 원")
                        .images([
                        builder.CardImage.create(session, img_path + "/images/price/Grandeur_modern.PNG")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_modern.PNG"))
                    ])
                        .buttons([
                            //builder.CardAction.imBack(session, model + " " + trim3 + " 기본 옵션을 보여줘", "기본 옵션"),
                        builder.CardAction.imBack(session, model + " " + trim3 + " 선택 옵션을 보여줘", "선택 옵션 추가")
                    ])];
                if (args.sendMsg.match(/모던/g)) {
                    showTrim = trimCard1;
                } else if (args.sendMsg.match(/프리미엄/g)) {
                    showTrim = trimCard2;
                } else if (args.sendMsg.match(/프리미엄스페셜/g)) {
                    showTrim = trimCard3;
                } else {
                    showTrim = trimCard4;
                }
                msg = new builder.Message(session).attachmentLayout(builder.AttachmentLayout.carousel).attachments(showTrim);
            } else if (args.sendMsg.match(/가솔린3.0/g)) {
                model = "가솔린 3.0";
                trim1 = "익스클루시브(Exclusive)";
                trim2 = "익스클루시브 스페셜(Exclusive Special)";
                //익스클루시브 카드
                trimCard1 = [new builder.HeroCard(session)
                        .title(model + " " + trim1)
                        .text("가격 : 35,550,000 원")
                        .images([
                        builder.CardImage.create(session, img_path + "/images/price/Grandeur_exclusive.PNG")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_exclusive.PNG"))
                    ])
                        .buttons([
                        builder.CardAction.imBack(session, model + " " + trim1 + " 선택 옵션을 보여줘", "선택 옵션 추가")
                    ])];
                //익스클루시브 스페셜 카드
                trimCard2 = [new builder.HeroCard(session)
                    .title(model + " " + trim2)
                    .text("가격 : 38,700,000 원")
                    .images([
                        builder.CardImage.create(session, img_path + "/images/price/Grandeur_exclusive.PNG")
                            .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_exclusive.PNG"))
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, model + " " + trim2 + " 선택 옵션을 보여줘", "선택 옵션 추가")
                    ])];
                //익스클루시브 + 익스클루시브 스페셜 카드
                trimCard3 = [new builder.HeroCard(session)
                    .title(model + " " + trim1)
                    .text("가격 : 35,550,000 원")
                    .images([
                        builder.CardImage.create(session, img_path + "/images/price/Grandeur_exclusive.PNG")
                            .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_exclusive.PNG"))
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, model + " " + trim1 + " 선택 옵션을 보여줘", "선택 옵션 추가")
                    ]),
                    new builder.HeroCard(session)
                        .title(model + " " + trim2)
                        .text("가격 : 38,700,000 원")
                        .images([
                        builder.CardImage.create(session, img_path + "/images/price/Grandeur_exclusive.PNG")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_exclusive.PNG"))
                    ])
                        .buttons([
                        builder.CardAction.imBack(session, model + " " + trim2 + " 선택 옵션을 보여줘", "선택 옵션 추가")
                    ])];
                if (args.sendMsg.match(/익스클루시브/g)) {
                    showTrim = trimCard1;
                } else if (args.sendMsg.match(/익스클루시브스페셜/g)) {
                    showTrim = trimCard2;
                } else {
                    showTrim = trimCard3;
                }
                msg = new builder.Message(session).attachmentLayout(builder.AttachmentLayout.carousel).attachments(showTrim);
            } else if (args.sendMsg.match(/가솔린3.3/g)) {
                model = "가솔린 3.3";
                trim1 = "셀러브리티(Celebrity)";
                //셀러브리티 카드
                showTrim = [new builder.HeroCard(session)
                    .title(model + " " + trim1)
                    .text("가격 : 41,600,000 원")
                    .images([
                        builder.CardImage.create(session, img_path + "/images/price/Grandeur_celebrity.PNG")
                            .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_celebrity.PNG"))
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, model + " " + trim1 + " 선택 옵션을 보여줘", "선택 옵션 추가")
                    ])];
                msg = new builder.Message(session).attachmentLayout(builder.AttachmentLayout.carousel).attachments(showTrim);
            } else if (args.sendMsg.match(/디젤2.2/g)) {
                model = "디젤 2.2";
                trim1 = "모던(Modern)";
                trim2 = "프리미엄(Premium)";
                trim3 = "프리미엄 스페셜(Premium Special)";
                //모던 카드
                trimCard1 = [new builder.HeroCard(session)
                    .title(model + " " + trim1)
                    .text("가격 : 33,550,000 원")
                    .images([
                        builder.CardImage.create(session, img_path + "/images/price/Grandeur_modern.PNG")
                            .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_modern.PNG"))
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, model + " " + trim1 + " 선택 옵션을 보여줘", "선택 옵션 추가")
                    ])];
                //프리미엄 카드
                trimCard2 = [new builder.HeroCard(session)
                    .title(model + " " + trim2)
                    .text("가격 : 34,750,000 원")
                    .images([
                        builder.CardImage.create(session, img_path + "/images/price/Grandeur_modern.PNG")
                            .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_modern.PNG"))
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, model + " " + trim2 + " 선택 옵션을 보여줘", "선택 옵션 추가")
                    ])];
                //프리미엄 스페셜 카드
                trimCard3 = [new builder.HeroCard(session)
                    .title(model + " " + trim3)
                    .text("가격 : 36,750,000 원")
                    .images([
                        builder.CardImage.create(session, img_path + "/images/price/Grandeur_modern.PNG")
                            .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_modern.PNG"))
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, model + " " + trim3 + " 선택 옵션을 보여줘", "선택 옵션 추가")
                    ])];
                //모던 + 프리미엄 + 프리미엄 스페셜 카드
                trimCard4 = [new builder.HeroCard(session)
                    .title(model + " " + trim1)
                    .text("가격 : 33,550,000 원")
                    .images([
                        builder.CardImage.create(session, img_path + "/images/price/Grandeur_modern.PNG")
                            .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_modern.PNG"))
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, model + " " + trim1 + " 선택 옵션을 보여줘", "선택 옵션 추가")
                    ]),
                    new builder.HeroCard(session)
                    .title(model + " " + trim2)
                    .text("가격 : 34,750,000 원")
                    .images([
                        builder.CardImage.create(session, img_path + "/images/price/Grandeur_modern.PNG")
                            .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_modern.PNG"))
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, model + " " + trim2 + " 선택 옵션을 보여줘", "선택 옵션 추가")
                    ]),
                    new builder.HeroCard(session)
                    .title(model + " " + trim3)
                    .text("가격 : 36,750,000 원")
                    .images([
                        builder.CardImage.create(session, img_path + "/images/price/Grandeur_modern.PNG")
                            .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_modern.PNG"))
                    ])
                    .buttons([
                        builder.CardAction.imBack(session, model + " " + trim3 + " 선택 옵션을 보여줘", "선택 옵션 추가")
                    ])];
                if (args.sendMsg.match(/모던/g)) {
                    showTrim = trimCard1;
                } else if (args.sendMsg.match(/프리미엄/g)) {
                    showTrim = trimCard2;
                } else if (args.sendMsg.match(/프리미엄스페셜/g)) {
                    showTrim = trimCard3;
                } else {
                    showTrim = trimCard4;
                }
                msg = new builder.Message(session).attachmentLayout(builder.AttachmentLayout.carousel).attachments(showTrim);
            }
            builder.Prompts.choice(session, msg, trim1 + "|" + trim2 + "|" + trim3);
            session.endDialog();
            /*responseTime = parseInt(date.getTime()) - parseInt(args.beginTime);
            query.insertHistoryQuery(args, responseTime, function (err, result) {
                if (!err) {
                    console.log("query.getData : " + result);
                }
            });*/
        }
    ]);
    
    /***********************************************************************************
    3-1. 한국어 가격 메뉴 (기본옵션 리스트)
    ************************************************************************************/
    bot.dialog('/korPriceBasicOptionList', [
        function (session, args) {
            /*
            var modelTrim = "";
            var param = new Array();
            param[0] = session.userData.model;
            param[1] = session.userData.trim;
            param[2] = "select_carType";

            //session.send(param[0]);
            //session.send(param[1]);
            //session.send(param[2]);
            
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


            var msg = new builder.Message(session)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments([
                new builder.HeroCard(session)
                        .title(args.model + " " + args.trim + " 기본품목")
                        .buttons([
                    builder.CardAction.imBack(session, " 파워트레인 품목을 보여줘", "파워트레인"),
                    builder.CardAction.imBack(session, " 성능 품목을 보여줘", "성능"),
                    builder.CardAction.imBack(session, " 안전 품목을 보여줘", "안전"),
                    builder.CardAction.imBack(session, " 외관 품목을 보여줘", "외관"),
                    builder.CardAction.imBack(session, " 내장 품목을 보여줘", "내장"),
                    builder.CardAction.imBack(session, " 시트 품목을 보여줘", "시트"),
                    builder.CardAction.imBack(session, " 편의 품목을 보여줘", "편의"),
                    builder.CardAction.imBack(session, " 멀티미디어 품목을 보여줘", "멀티미디어")
                ])
            ]);
            builder.Prompts.choice(session, msg, "파워트레인|성능|안전|외관|내장|시트|편의|멀티미디어");
            session.endDialog();
        }
    ]);
    
    /***********************************************************************************
    3-1-1. 한국어 가격 메뉴 (기본옵션 아이템)
    ************************************************************************************/
    bot.dialog('/korPriceBasicOptionItem', [
        function (session, args) {
            var msg;
            var model = args.model;
            var trim = args.trim;
            var item = args.basicOption1;
            if (item == "파워트레인 / 성능") {
                msg = "[" + model + " " + trim + "] 파워트레인 기본 품목\n\n - 가솔린 2.4엔진";
            } else if (item == "성능") {
                msg = "[" + model + " " + trim + "] 성능 기본 품목\n\n - 6단 자동변속기 \n\n - 전동식 파워 스티어링(속도감응형)";
            } else if (item == "안전") {
                msg = "[" + model + " " + trim + "] 안전 기본 품목\n\n - 9 에어백 시스템(앞좌석 어드밴스드, 운전석 무릎, 앞/뒷좌석 사이드, 전복 대응 커튼)\n\n - 앞좌석 후방충격 저감 시스템\n\n - 앞좌석 하체 상해 저감 시트벨트(EFD 시스템)\n\n - 뒷좌석 센터 3점식 시트벨트\n\n - 유아용 시트 고정장치(뒷좌석)\n\n - 차체 자세 제어 장치(ESC)\n\n - 샤시 통합 제어 시스템(VSM)\n\n - 경사로 밀림 방지 장치(HAC)\n\n - 급제동 경보 장치(ESS)\n\n - 개별 타이어 공기압 경보 장치(TPMS)\n\n - 세이프티 언락\n\n - 타이어 응급처치 키트";
            } else if (item == "외관") {
                msg = "[" + model + " " + trim + "] 외관 기본 품목\n\n - 듀얼 프로젝션 헤드램프\n\n - LED 주간주행등(DRL, 포지셔닝 기능 포함)\n\n - LED 리어 콤비램프(제동등, 후미등 적용)\n\n - LED 보조제동등\n\n - 17인치 알로이 휠 & 타이어\n\n - 이중접합 차음 유리(앞면, 앞도어)\n\n - 아웃사이드 미러(열선, 전동 조절, 전동 접이, LED 방향지시등)\n\n - 도어 포켓라이팅(앞)\n\n - 듀얼 머플러";
            } else if (item == "내장") {
                msg = "[" + model + " " + trim + "] 내장 기본 품목\n\n - 슈퍼비전 클러스터(3.5인치 단색 LCD)\n\n - 가죽 스티어링 휠(열선, 수동식 틸트 & 텔레스코픽, 리모컨)\n\n - 가죽 변속기 노브\n\n - 크래쉬패드 인조가죽 감싸기\n\n - 도어트림 우드그레인 가니쉬\n\n - 트리코트 내장재\n\n - 메탈 도어스커프\n\n - 룸램프(LED)\n\n - ECM 룸미러\n\n - 아날로그 시계";
            } else if (item == "시트") {
                msg = "[" + model + " " + trim + "] 시트 기본 품목\n\n - 천연가죽 시트\n\n - 운전석 전동 조절(8way) & 전동식 2way 럼버서포트\n\n - 동승석 전동 조절(4way)\n\n - 앞좌석 열선\n\n - 뒷좌석 열선\n\n - 뒷좌석 암레스트(스키쓰루)";
            } else if (item == "편의") {
                msg = "[" + model + " " + trim + "] 편의 기본 품목\n\n - 버튼 시동 & 스마트키 시스템\n\n - 듀얼 풀오토 에어컨\n\n - 오토 디포그\n\n - 고성능 에어컨 필터\n\n - 통합주행모드\n\n - 오토 크루즈 컨트롤, 풋파킹 브레이크\n\n - 전/후방 주차보조 시스템\n\n - 후방카메라(조향 연동)\n\n - 스마트 트렁크(풀오픈 타입)\n\n - 세이프티 파워윈도우(앞좌석)\n\n - USB 충전기\n\n - 파워 아웃렛(센터페시아, 센터콘솔 암레스트)";
            } else if (item == "멀티미디어") {
                msg = "[" + model + " " + trim + "] 멀티미디어 기본 품목\n\n - 8인치 내비게이션\n\n - 일반 사운드 시스템(8스피커)\n\n - AUX & USB 단자\n\n - 블루투스 핸즈프리";
            }
            session.send(msg);
            
            var nextBtn = "다른 기본품목을 보실래요?";
            builder.Prompts.choice(session, nextBtn, '예(기본품목)|아니오(홈)', { listStyle: builder.ListStyle.button });
            
            
            session.endDialog();
        }
    ]);
    
    /***********************************************************************************
    3-2. 한국어 가격 메뉴 (선택옵션 리스트)
    ************************************************************************************/
    bot.dialog('/korPriceSelectOptionList', [
        function (session, args) {
            var selectItem1;
            var selectItem2;
            var selectItem3;
            var selectItem4;
            var selectItem5;
            var selectItem6;
            var selectItem7;
            var msg = new builder.Message(session)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments([
                new builder.HeroCard(session)
                        .title(args.model + " " + args.trim + " 선택품목")
                        .buttons([
                    builder.CardAction.imBack(session, "파노라마 썬루프 선택 옵션 품목 보기", "파노라마 썬루프"),
                    builder.CardAction.imBack(session, "TUIX 컴포트 패키지 선택 옵션 품목 보기", "TUIX 컴포트 패키지"),
                    builder.CardAction.imBack(session, "앞좌석 통풍+하이패스 시스템 선택 옵션 품목 보기", "앞좌석 통풍+하이패스 시스템"),
                    builder.CardAction.imBack(session, "현대 스마트 센스 패키지 IV 선택 옵션 품목 보기", "현대 스마트 센스 패키지 IV")
                ])
            ]);
            builder.Prompts.choice(session, msg, "파노라마 썬루프|TUIX 컴포트 패키지|앞좌석 통풍+하이패스 시스템|현대 스마트 센스 패키지IV");
            session.endDialog();
        }
    ]);
    
    /***********************************************************************************
    3-2-1. 한국어 가격 메뉴 (선택옵션 아이템)
    ************************************************************************************/
    bot.dialog('/korPriceSelectOptionItem', [
        function (session, args) {
            var msg;
            var model = args.model;
            var trim = args.trim;
            var item = args.selectOption1;
            if (item == "파노라마 썬루프") {
                msg = "[파노라마 썬루프] : 1,100,000원 \n\n - 파노라마 썬루프";
            } else if (item == "TUIX 컴포트 패키지") {
                msg = "[TUIX 컴포트 패키지] : 780,000원 \n\n -  냉온장 컵홀더(컵홀더 커버 미적용) \n\n - LED라이팅(도어 사팟 램프/번호판 램프/풋무드 램프) \n\n - 메탈 페달";
            } else if (item == "앞좌석통풍 + 하이패스시스템" || item == "앞좌석 통풍" || item == "하이패스") {
                msg = "[앞좌석 통풍+하이패스 시스템] : 600,000원 \n\n - 앞좌석 통풍 시트 \n\n - 하이패스 시스템";
            } else if (item == "현대 스마트센스 패키지IV") {
                msg = "[현대 스마트 센스 패키지IV] : 1,800,000원 \n\n - 자동 긴급제동 시스템(AEB,보행자 인지 기능 포함) \n\n - 어드밴스드 스마트 크루즈 컨트롤(ASCC) \n\n - 주행 조향보조 시스템(LKAS) \n\n - 부주의 운전 경보 시스템(DAA)\n\n - 전동식 파킹 브레이크(EPB)";
            }
            session.send(msg);
            
            var nextBtn = "다른 선택품목을 보실래요?";
            builder.Prompts.choice(session, nextBtn, '예(선택품목)|아니오(홈)', { listStyle: builder.ListStyle.button });
            
            
            session.endDialog();
        }
    ]);
    
    /***********************************************************************************
    4. 한국어 가격 메뉴 (가격표)
    ************************************************************************************/
    bot.dialog('/korPriceRecipt', [
        function (session, args) {
            session.send("선택하신 차량의 산출 가격 입니다.");
            var msg = new builder.Message(session)
                .attachments([
                new builder.ReceiptCard(session)
                        .title(args.model + " " + args.trim)
                        .items([
                    builder.ReceiptItem.create(session, args.carPrice + " 원", args.model + " " + args.trim),
                    builder.ReceiptItem.create(session, args.optionPrice1 + " 원", args.selectOption1),
                ])
                        .facts([
                    builder.Fact.create(session, "(단위 : 원)", "2017년 3월 30일 기준")
                ])
                        .total(args.carPrice + args.optionPrice1 + " 원")
            ]);
            session.send(msg);
            
            var nextBtn = "다른 선택옵션을 추가 하시겠습니까?";
            builder.Prompts.choice(session, nextBtn, '예|아니오', { listStyle: builder.ListStyle.button });
            
            session.endDialog();
            //builder.Prompts.choice(session, msg, "트림|다른모델|홈");
        }
    ]);
}

module.exports = {
    create
}