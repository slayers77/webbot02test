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
            var msg = new builder.Message(session)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments([
                    new builder.HeroCard(session)
                        .title("가솔린 2.4")
                        .images([
                            builder.CardImage.create(session, img_path + "/images/price/Grandeur_24spec.PNG")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_24spec.PNG"))
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, "가격에 가솔린 2.4 모델을 선택", "가솔린 2.4 선택")
                        ]),
                    new builder.HeroCard(session)
                        .title("가솔린 3.0")
                        .images([
                            builder.CardImage.create(session, img_path + "/images/price/Grandeur_30spec.PNG")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_30spec.PNG"))
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, "가격에 가솔린 3.0 모델을 선택", "가솔린 3.0 선택")
                        ]),
                    new builder.HeroCard(session)
                        .title("가솔린 3.3")
                        .images([
                            builder.CardImage.create(session, img_path + "/images/price/Grandeur_33spec.PNG")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_33spec.PNG"))
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, "가격에 가솔린 3.3 모델을 선택", "가솔린 3.3 선택")
                        ]),
                    new builder.HeroCard(session)
                        .title("디젤 2.2")
                        .images([
                            builder.CardImage.create(session, img_path + "/images/price/Grandeur_22spec.PNG")
                                .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_22spec.PNG"))
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, "가격에 디젤 2.2 모델을 선택", "디젤 2.2 선택")
                        ])
                ]);
            builder.Prompts.choice(session, msg, "가솔린 2.4|가솔린 3.0|가솔린 3.3|디젤 2.2");

            
            
            responseTime = parseInt(date.getTime()) - parseInt(args.beginTime);
            query.insertHistoryQuery(args, responseTime, function (err, result) {
                if (!err) {
                    console.log("query.getData : " + result);
                }
            });
        },
        function (session, results) {
            if (results.response && results.response.entity != '(quit)') {
                // Select Model Menu
                if (results.response.entity == "가솔린 2.4" || results.response.entity == 1) {
                    session.userData.model = "가솔린 2.4";
                } else if (results.response.entity == "가솔린 3.0" || results.response.entity == 2) {
                    session.userData.model = "가솔린 3.0";
                } else if (results.response.entity == "가솔린 3.3" || results.response.entity == 3) {
                    session.userData.model = "가솔린 3.3";
                } else if (results.response.entity == "디젤 2.2" || results.response.entity == 4) {
                    session.userData.model = "디젤 2.2";
                } else { session.endDialog()}
                session.beginDialog('/korPriceTrim', session.userData.model);
            } else {
                // Exit the menu
                session.endDialog();
            }
        }

    ]);

    /***********************************************************************************
    2. 한국어 가격 메뉴 (트림 카드)
    ************************************************************************************/

    bot.dialog('/korPriceTrim', [

        function (session, model) {
            var trim1 = "";
            var trim2 = "";
            var trim3 = "";
            var msg;
            if (model == "가솔린 2.4") {
                trim1 = "모던(Modern)";
                trim2 = "프리미엄(Premium)";
                trim3 = "프리미엄 스페셜(Premium Special)";
                msg = new builder.Message(session)
                    .attachmentLayout(builder.AttachmentLayout.carousel)
                    .attachments([
                        new builder.HeroCard(session)
                            .title(model + " " + trim1)
                            .text("가격 : 30,550,000 원")
                            .images([
                                builder.CardImage.create(session, img_path + "/images/price/Grandeur_modern.PNG")
                                    .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_modern.PNG"))
                            ])
                            .buttons([
                                builder.CardAction.imBack(session, "가격의 " + model + " " + trim1 + " 옵션 보기", "옵션 보기")
                            ]),
                        new builder.HeroCard(session)
                            .title(model + " " + trim2)
                            .text("가격 : 31,750,000 원")
                            .images([
                                builder.CardImage.create(session, img_path + "/images/price/Grandeur_modern.PNG")
                                    .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_modern.PNG"))
                            ])
                            .buttons([
                                builder.CardAction.imBack(session, "가격의 " + model + " " + trim2 + " 옵션 보기", "옵션 보기")
                            ]),
                        new builder.HeroCard(session)
                            .title(model + " " + trim3)
                            .text("가격 : 33,750,000 원")
                            .images([
                                builder.CardImage.create(session, img_path + "/images/price/Grandeur_modern.PNG")
                                    .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_modern.PNG"))
                            ])
                            .buttons([
                                builder.CardAction.imBack(session, "가격의 " + model + " " + trim3 + " 옵션 보기", "옵션 보기")
                            ])
                    ]);
            } else if (model == "가솔린 3.0") {
                trim1 = "익스클루시브(Exclusive)";
                trim2 = "익스클루시브 스페셜(Exclusive Special)";
                msg = new builder.Message(session)
                    .attachmentLayout(builder.AttachmentLayout.carousel)
                    .attachments([
                        new builder.HeroCard(session)
                            .title(model + " " + trim1)
                            .text("가격 : 35,550,000 원")
                            .images([
                                builder.CardImage.create(session, img_path + "/images/price/Grandeur_exclusive.PNG")
                                    .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_exclusive.PNG"))
                            ])
                            .buttons([
                                builder.CardAction.imBack(session, "가격의 " + model + " " + trim1 + " 옵션 보기", "옵션 보기")
                            ]),
                        new builder.HeroCard(session)
                            .title(model + " " + trim2)
                            .text("가격 : 38,700,000 원")
                            .images([
                                builder.CardImage.create(session, img_path + "/images/price/Grandeur_exclusive.PNG")
                                    .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_exclusive.PNG"))
                            ])
                            .buttons([
                                builder.CardAction.imBack(session, "가격의 " + model + " " + trim2 + " 옵션 보기", "옵션 보기")
                            ])
                    ]);
            } else if (model == "가솔린 3.3") {
                trim1 = "셀러브리티(Celebrity)";
                msg = new builder.Message(session)
                    .attachmentLayout(builder.AttachmentLayout.carousel)
                    .attachments([
                        new builder.HeroCard(session)
                            .title(model + " " + trim1)
                            .text("가격 : 41,600,000 원")
                            .images([
                                builder.CardImage.create(session, img_path + "/images/price/Grandeur_celebrity.PNG")
                                    .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_celebrity.PNG"))
                            ])
                            .buttons([
                                builder.CardAction.imBack(session, "가격의 " + model + " " + trim1 + " 옵션 보기", "옵션 보기")
                            ])
                    ]);
            } else if (model == "디젤 2.2") {
                trim1 = "모던(Modern)";
                trim2 = "프리미엄(Premium)";
                trim3 = "프리미엄 스페셜(Premium Special)";
                msg = new builder.Message(session)
                    .attachmentLayout(builder.AttachmentLayout.carousel)
                    .attachments([
                        new builder.HeroCard(session)
                            .title(model + " " + trim1)
                            .text("가격 : 35,550,000 원")
                            .images([
                                builder.CardImage.create(session, img_path + "/images/price/Grandeur_modern.PNG")
                                    .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_modern.PNG"))
                            ])
                            .buttons([
                                builder.CardAction.imBack(session, "가격의 " + model + " " + trim1 + " 옵션 보기", "옵션 보기")
                            ]),
                        new builder.HeroCard(session)
                            .title(model + " " + trim2)
                            .text("가격 : 34,750,000 원")
                            .images([
                                builder.CardImage.create(session, img_path + "/images/price/Grandeur_modern.PNG")
                                    .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_modern.PNG"))
                            ])
                            .buttons([
                                builder.CardAction.imBack(session, "가격의 " + model + " " + trim2 + " 옵션 보기", "옵션 보기")
                            ]),
                        new builder.HeroCard(session)
                            .title(model + " " + trim3)
                            .text("가격 : 36,750,000 원")
                            .images([
                                builder.CardImage.create(session, img_path + "/images/price/Grandeur_modern.PNG")
                                    .tap(builder.CardAction.showImage(session, img_path + "/images/price/Grandeur_modern.PNG"))
                            ])
                            .buttons([
                                builder.CardAction.imBack(session, "가격의 " + model + " " + trim3 + " 옵션 보기", "옵션 보기")
                            ])
                    ]);
            }

            builder.Prompts.choice(session, msg, trim1 + "|" + trim2 + "|" + trim3);
        },
        function (session, results) {
            session.userData.trim = "";
            session.userData.trim = results.response.entity;
            session.userData.modelTrim = session.userData.model + " " + session.userData.trim;
            if (results.response && results.response.entity != '(quit)') {
                session.beginDialog('/korPriceOption', session.userData.modelTrim);
            } else {
                // Exit the menu
                session.endDialog();
            }
        }
    ]);

    /***********************************************************************************
    3. 한국어 가격 메뉴 (옵션)
    ************************************************************************************/
    bot.dialog('/korPriceOption', [
        function (session, modelTrim) {
            var msg = new builder.Message(session)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments([
                    new builder.HeroCard(session)
                        .title(modelTrim + " 기본품목")
                        .buttons([
                            builder.CardAction.imBack(session, modelTrim + " 파워트레인 옵션 품목 보기", modelTrim + " 파워트레인"),
                            builder.CardAction.imBack(session, modelTrim + " 성능 옵션 품목 보기", modelTrim + " 성능"),
                            builder.CardAction.imBack(session, modelTrim + " 안전 옵션 품목 보기", modelTrim + " 안전"),
                            builder.CardAction.imBack(session, modelTrim + " 외관 옵션 품목 보기", modelTrim + " 외관"),
                            builder.CardAction.imBack(session, modelTrim + " 내장 옵션 품목 보기", modelTrim + " 내장"),
                            builder.CardAction.imBack(session, modelTrim + " 시트 옵션 품목 보기", modelTrim + " 시트"),
                            builder.CardAction.imBack(session, modelTrim + " 편의 옵션 품목 보기", modelTrim + " 편의"),
                            builder.CardAction.imBack(session, modelTrim + " 멀티미디어 옵션 품목 보기", modelTrim + " 멀티미디어")
                        ]),
                    new builder.HeroCard(session)
                        .title(modelTrim + " 선택품목")
                        .buttons([
                            builder.CardAction.imBack(session, "1 : 파노라마 썬루프", "파노라마 썬루프"),
                            builder.CardAction.imBack(session, "2 : TUIX 컴포트 패키지", "TUIX 컴포트 패키지"),
                            builder.CardAction.imBack(session, "3 : 앞좌석 통풍+하이패스 시스템", "앞좌석 통풍+하이패스 시스템"),
                            builder.CardAction.imBack(session, "4 : 현대 스마트 센스 패키지 IV", "현대 스마트 센스 패키지 IV")
                        ])
                ]);
            builder.Prompts.choice(session, msg, "파워트레인|성능|안전|외관|내장|시트|편의|멀티미디어|파노라마 썬루프|TUIX 컴포트 패키지|앞좌석 통풍+하이패스 시스템|현대 스마트 센스 패키지IV");
        },
        function (session, results) {
            var msg;
            if (results.response && results.response.entity != '(quit)') {
                // Select item Menu
                if (results.response.entity == "파워트레인" || results.response.entity == 1) {
                    msg = "[파워트레인 / 성능]\n\n - 가솔린 2.4엔진";
                } else if (results.response.entity == "성능" || results.response.entity == 2) {
                    msg = "[성능]\n\n -  6단 자동변속기 \n\n - 전동식 파워 스티어링(속도감응형)";
                } else if (results.response.entity == "안전" || results.response.entity == 3) {
                    msg = "[안전]\n\n - 9 에어백 시스템(앞좌석 어드밴스드, 운전석 무릎, 앞/뒷좌석 사이드, 전복 대응 커튼)\n\n - 앞좌석 후방충격 저감 시스템\n\n - 앞좌석 하체 상해 저감 시트벨트(EFD 시스템)\n\n - 뒷좌석 센터 3점식 시트벨트\n\n - 유아용 시트 고정장치(뒷좌석)\n\n - 차체 자세 제어 장치(ESC)\n\n - 샤시 통합 제어 시스템(VSM)\n\n - 경사로 밀림 방지 장치(HAC)\n\n - 급제동 경보 장치(ESS)\n\n - 개별 타이어 공기압 경보 장치(TPMS)\n\n - 세이프티 언락\n\n - 타이어 응급처치 키트";
                } else if (results.response.entity == "외관" || results.response.entity == 4) {
                    msg = "[외관]\n\n - 듀얼 프로젝션 헤드램프\n\n - LED 주간주행등(DRL, 포지셔닝 기능 포함)\n\n - LED 리어 콤비램프(제동등, 후미등 적용)\n\n - LED 보조제동등\n\n - 17인치 알로이 휠 & 타이어\n\n - 이중접합 차음 유리(앞면, 앞도어)\n\n - 아웃사이드 미러(열선, 전동 조절, 전동 접이, LED 방향지시등)\n\n - 도어 포켓라이팅(앞)\n\n - 듀얼 머플러";
                } else if (results.response.entity == "내장" || results.response.entity == 5) {
                    msg = "[내장]\n\n - 슈퍼비전 클러스터(3.5인치 단색 LCD)\n\n - 가죽 스티어링 휠(열선, 수동식 틸트 & 텔레스코픽, 리모컨)\n\n - 가죽 변속기 노브\n\n - 크래쉬패드 인조가죽 감싸기\n\n - 도어트림 우드그레인 가니쉬\n\n - 트리코트 내장재\n\n - 메탈 도어스커프\n\n - 룸램프(LED)\n\n - ECM 룸미러\n\n - 아날로그 시계";
                } else if (results.response.entity == "시트" || results.response.entity == 6) {
                    msg = "[시트]\n\n - 천연가죽 시트\n\n - 운전석 전동 조절(8way) & 전동식 2way 럼버서포트\n\n - 동승석 전동 조절(4way)\n\n - 앞좌석 열선\n\n - 뒷좌석 열선\n\n - 뒷좌석 암레스트(스키쓰루)";
                } else if (results.response.entity == "편의" || results.response.entity == 7) {
                    msg = "[편의]\n\n - 버튼 시동 & 스마트키 시스템\n\n - 듀얼 풀오토 에어컨\n\n - 오토 디포그\n\n - 고성능 에어컨 필터\n\n - 통합주행모드\n\n - 오토 크루즈 컨트롤, 풋파킹 브레이크\n\n - 전/후방 주차보조 시스템\n\n - 후방카메라(조향 연동)\n\n - 스마트 트렁크(풀오픈 타입)\n\n - 세이프티 파워윈도우(앞좌석)\n\n - USB 충전기\n\n - 파워 아웃렛(센터페시아, 센터콘솔 암레스트)";
                } else if (results.response.entity == "멀티미디어" || results.response.entity == 8) {
                    msg = "[멀티미디어]\n\n - 8인치 내비게이션\n\n - 일반 사운드 시스템(8스피커)\n\n - AUX & USB 단자\n\n - 블루투스 핸즈프리";
                } else if (results.response.entity == "파노라마 썬루프" || results.response.entity == 1) {
                    msg = "[파노라마 썬루프]\n\n - 파노라마 썬루프";
                } else if (results.response.entity == "TUIX 컴포트 패키지" || results.response.entity == 2) {
                    msg = "[TUIX 컴포트 패키지]\n\n -  냉온장 컵홀더(컵홀더 커버 미적용) \n\n - LED라이팅(도어 사팟 램프/번호판 램프/풋무드 램프) \n\n - 메탈 페달";
                } else if (results.response.entity == "앞좌석 통풍+하이패스 시스템" || results.response.entity == 3) {
                    msg = "[앞좌석 통풍+하이패스 시스템]\n\n - 앞좌석 통풍 시트 \n\n - 하이패스 시스템";
                } else if (results.response.entity == "현대 스마트 센스 패키지IV" || results.response.entity == 4) {
                    msg = "[현대 스마트 센스 패키지IV]\n\n - 자동 긴급제동 시스템(AEB,보행자 인지 기능 포함) \n\n - 어드밴스드 스마트 크루즈 컨트롤(ASCC) \n\n - 주행 조향보조 시스템(LKAS) \n\n - 부주의 운전 경보 시스템(DAA)\n\n - 전동식 파킹 브레이크(EPB)";
                }
                builder.Prompts.choice(session, msg, '이전|다른모델|다른트림|홈', { listStyle: builder.ListStyle.button });
            } else {
                // Exit the menu
                session.endDialog();
            }
        },
        function (session, results) {
            if (results.response && results.response.entity != '(quit)') {
                // Select Menu
                if (results.response.entity == "이전" || results.response.entity == 1) {
                    session.beginDialog('/korPriceOption', session.userData.modelTrim);
                } else if (results.response.entity == "다른모델" || results.response.entity == 2) {
                    session.beginDialog('/korPriceModel');
                } else if (results.response.entity == "다른트림" || results.response.entity == 3) {
                    session.beginDialog('/korPriceTrim', session.userData.model);
                } else if (results.response.entity == "홈" || results.response.entity == 4) {
                    session.beginDialog('/korReMainMenu');
                }
            } else {
                // Exit the menu
                session.endDialog();
            }
        }
    ]);
}

module.exports = {
    create
}