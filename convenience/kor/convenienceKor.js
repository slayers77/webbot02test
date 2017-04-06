var builder = require('botbuilder');
var query = require('../../config/query');
var date = require('date-utils');
date = new Date();

function create(bot) {
    
    var responseTime;

    /***********************************************************************************
    1. 한국어 편의사항 초기 메뉴
    ************************************************************************************/

    bot.dialog('/korConvenienceMain', [

        function (session, args) {

            var msg = new builder.Message(session)
                .textFormat(builder.TextFormat.xml)
                //.attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments([
                    //AnimationCard
                    new builder.HeroCard(session)
                        .title("Convenience")
                        .subtitle("스마트 멀티미디어 시스템과 고품격 사운드 시스템 등 고준 준대형 세단이 가져야 할 모든 편의사양들이 그랜저에 적용되었습니다.")
                        .images([
                            builder.CardImage.create(session, img_path + "/images/convenience/convenience00.png")
                        ])
                        .buttons([
                            builder.CardAction.imBack(session, "스마트센스 보여줘", "스마트센스"),
                            builder.CardAction.imBack(session, "인포테인먼트 보여줘", "인포테인먼트"),
                            builder.CardAction.imBack(session, "안전 보여줘", "안전")
                        ])


                ]);
            builder.Prompts.choice(session, msg, "스마트센스|인포테인먼트|안전");
            
            session.endDialog();
            session.beginDialog('/korReMainMenu');
            
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
    
        function (session,args, results) {
            
            //if (results.response.entity == '스마트 센스 소개') {
                var msg = new builder.Message(session)
                    .textFormat(builder.TextFormat.xml)
                    //.attachmentLayout(builder.AttachmentLayout.carousel)
                    .attachments([
                        //AnimationCard
                    new builder.HeroCard(session)
                            .title("SmartSense")
                            .subtitle("그랜저에 적용된 지능형 안전기술")
                            .images([
                        builder.CardImage.create(session, img_path + "/images/convenience/smartsense/smartsense0.png")
                    ])
                            .buttons([
                            builder.CardAction.imBack(session, "스마트센스 세부목록 보여줘", "스마트센스 세부목록")
                ])

            ]);
            session.send(msg);
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
    
    
    bot.dialog('/korConvenienceSmartsenseList', [
    
        function (session, args, results) { 
        
            var msg = new builder.Message(session)
                        .textFormat(builder.TextFormat.xml)
                        .attachmentLayout(builder.AttachmentLayout.carousel)
                        .attachments([
                            //AnimationCard
                new builder.HeroCard(session)
                                .title("후측방 출돌 회피 지원시스템")
                                .subtitle("아웃사이드 미러로 확인할 수 없는 사각지대의 차량 또는 후방에서 접근하는 차량 등을 감지해 경보합니다. 차선 이탈 시 후측방 차량과 충돌 위험이 감지될 경우, 함으로써 충돌을 방지할 수 있도록 보조합니다.")
                                .images([
                    builder.CardImage.create(session, img_path + "/images/convenience/smartsense/smartsense1.png")
                ]),
                new builder.HeroCard(session)
                                .title("자동 긴급제동 시스템")
                                .subtitle("전방 레이더와 전방 감지 카메라의 신호를 종합적으로 판단하여 선행 차량 및 보행자와의 추돌 위험 상황이 감지될 경우 운전자에게 이를 경보하고, 필요 시 브레이크 작동을 보조합니다.")
                                .images([
                    builder.CardImage.create(session, img_path + "/images/convenience/smartsense/smartsense2.png")
                ]),
                new builder.HeroCard(session)
                                .title("어드밴스드 스마트 크루즈 컨트롤")
                                .subtitle("선행차량과의 거리를 감지하여 운전자가 설정한 차량 속도 및 앞차와의 거리를 유지해주며, 차량이 완전히 정지한 후에도 선행차량이 출발하면(3초 이내) 자동으로 속도 및 거리 제어를 지원합니다")
                                .images([
                    builder.CardImage.create(session, img_path + "/images/convenience/smartsense/smartsense3.png")
                ]),
                new builder.HeroCard(session)
                                .title("어라운드 뷰 모니터")
                                .subtitle("4대의 고화질 카메라가 전·후·측면의 사각지대를 보여주어 주차 상황에서 운전자가 안전하고 쉽게 주차할 수 있도록 도와주며, 주행 중에도 운전자가 필요할 경우 후방 영상을 표시하여 안전성을 추가로 향상시켰습니다.")
                                .images([
                    builder.CardImage.create(session, img_path + "/images/convenience/smartsense/smartsense4.png")
                ]),
                new builder.HeroCard(session)
                                .title("부주의 운전 정보 시스템")
                                .subtitle("운전 상태를 5단계 레벨로 표시하며, 운전자의 피로나 부주의한 운전 패턴으로 판단되면 팝업 메시지와 경보음을 통해 휴식을 유도합니다.")
                                .images([
                    builder.CardImage.create(session, img_path + "/images/convenience/smartsense/smartsense5.png")
                ]),
                new builder.HeroCard(session)
                                .title("스마트 하이빔")
                                .subtitle("야간에 상향등을 켜고 주행하는 중 맞은 편에 차량이 있을 경우 헤드램프를 자동으로 하향등으로 전환하여 잦은 상향등 조작에 따른 불편함을 줄여주고 운전차량 및 상대차량이 안전하게 주행할 수 있도록 도와줍니다.")
                                .images([
                    builder.CardImage.create(session, img_path + "/images/convenience/smartsense/smartsense6.png")
                ]),
                new builder.HeroCard(session)
                                .title("주행 조향보조 시스템")
                                .subtitle("윈드쉴드 글래스 상단에 장착된 카메라를 통하여 차선을 인식하고 차선이탈이 예상되면 조향을 보조하여 차선이탈 상황을 방지해 줍니다.차선 이탈경보 기능, 차선 유지보조 기능, 능동 조향보조 기능 중 하나를 선택하여 사용할 수 있습니다")
                                .images([
                    builder.CardImage.create(session, img_path + "/images/convenience/smartsense/smartsense7.png")
                ])
            ]);
            
            session.send(msg);
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

    /***********************************************************************************
    1. 한국어 편의사항 - 인포테인먼트 초기 메뉴
    ************************************************************************************/


    //인포테인먼트


    bot.dialog('/korConvenienceInfotainmentSimple', [
    
        function (session, args, results) { 
        
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
                             .buttons([
                    builder.CardAction.imBack(session, "인포테인먼트 세부목록 보여줘", "인포테인먼트 세부목록")
                ])
            ]);
            session.send(msg);
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
    
    
    bot.dialog('/korConvenienceInfotainmentList', [
    
        function (session, args, results) { 
        
            var msg = new builder.Message(session)
                        .textFormat(builder.TextFormat.xml)
                        .attachmentLayout(builder.AttachmentLayout.carousel)
                        .attachments([
                            //AnimationCard
                new builder.HeroCard(session)
                                .subtitle("8인치 내비게이션 & 폰 커넥티비티 (애플 카플레이, 미러링크 지원)")
                                .images([
                    builder.CardImage.create(session, img_path + "/images/convenience/infotainment/infotainment1.png")
                ]),
                new builder.HeroCard(session)
                                .subtitle("아날로그 시계 / 전동식 파킹 브레이크 (오토홀드 기능 포함)")
                                .images([
                    builder.CardImage.create(session, img_path + "/images/convenience/infotainment/infotainment2.png")
                ]),
                new builder.HeroCard(session)
                                .subtitle("JBL 프리미엄 사운드 시스템 (12 스피커)")
                                .images([
                    builder.CardImage.create(session, img_path + "/images/convenience/infotainment/infotainment3.png")
                ]),
                new builder.HeroCard(session)
                                .subtitle("동승석 워크인 스위치 / CDP (센터 콘솔 암레스트 내장)")
                                .images([
                    builder.CardImage.create(session, img_path + "/images/convenience/infotainment/infotainment4.png")
                ])
            ]);
            session.send(msg);
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
                    builder.CardImage.create(session, img_path + "/images/convenience/safe/safe0.jpg")
                ])
                            .buttons([
                    builder.CardAction.imBack(session, "안전 세부목록 보여줘", "안전 세부목록")
                ])
            ]);
        

            session.send(msg);
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

    
    bot.dialog('/korConvenienceSafetyList', [
    
        function (session, args, results) { 
        
            var msg = new builder.Message(session)
                        .textFormat(builder.TextFormat.xml)
                        .attachmentLayout(builder.AttachmentLayout.carousel)
                        .attachments([
                            //AnimationCard
                new builder.HeroCard(session)
                                .title("9 에어백 시스템")
                                //.subtitle("부주의 운전 경보 시스템")
                                .images([
                    builder.CardImage.create(session, img_path + "/images/convenience/safe/safe1.jpg")
                ]),
                new builder.HeroCard(session)
                                .title("차체 강성 향상")
                                .subtitle("기존차 대비 차체 평균 강도를 34% 개선, 차체 비틀림 강성이 23% 향상되고 충돌 시 객실 보호 성능이 강화되었습니다.")
                                .images([
                    builder.CardImage.create(session, img_path + "/images/convenience/safe/safe2.jpg")
                ]),
                new builder.HeroCard(session)
                                .title("전동식 파킹 브레이크 (오토홀드 기능 포함)")
                                //.subtitle("어드밴스드 스마트 크루즈 컨트롤")
                                .images([
                    builder.CardImage.create(session, img_path + "/images/convenience/safe/safe3.jpg")
                ]),
                new builder.HeroCard(session)
                                .title("세이프티 언락")
                                //.subtitle("어라운드 뷰 모니터")
                                .images([
                    builder.CardImage.create(session, img_path + "/images/convenience/safe/safe4.jpg")
                ])
            ]);
        
            session.send(msg);
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
            builder.Prompts.choice(session, "메인메뉴로 돌아가고 싶으시면 '처음으로' 또는 '그랜다이저'를 입력해주시고, 다른 편의사항을 보고 싶으면 선택해주세요!!",
                '스마트센스|인포테인먼트|안전|편의사항', { listStyle: builder.ListStyle.button });
        }, function (session, results) {

            if (results.response.entity == '스마트센스') {
                session.beginDialog('/smartsense');
            } else if (results.response.entity == '인포테인먼트') {
                session.beginDialog('/infotainment');
            } else if (results.response.entity == '안전') {
                session.beginDialog('/safe');
            } else if (results.response.entity == '편의사항') {
                session.beginDialog('/korConvenience');
            } else if (results.response.entity == '그랜다이저') {
                session.beginDialog('/korMenu');
            }

        }
    ]);
}

module.exports = {
    create
}