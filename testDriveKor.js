
var builder = require('botbuilder');
var path = require('fs');

module.exports = [

    
    function (session) {

        session.send("맞아요, 한번 타 보셔야 저를 좀 더 잘 알 수 있겠죠!!");

        builder.Prompts.choice(session, '시승 신청을 하시기 위해서는 온라인에서 예약을 하시거나 지점에 직접 연락을 해 주셔야 해요. 제가 도와 드릴께요, 어떤 방법이 편하시겠어요?',
            '온라인 예약|시승센터 전화예약', { listStyle: builder.ListStyle.button });

    }
    , function (session, results, next) {

        var str = "";

        if (session.message.text == '온라인 예약') {
            session.send("온라인 예약 방법을 알려 드릴께요!!");

            var onlineReserveCard = new builder.HeroCard(session)
                .title('현대자동차 시승센터')
                .subtitle('현대자동차 시승센터에서 다양한 시승 서비스를 경험하세요')
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
        }
        else if (session.message.text == '시승센터 전화예약') {

            builder.Prompts.text(session, '시승센터를 찾기위하여 원하시는 위치의 동명을 입력해 주세요.(예: 서울) ');

        }
    }, function (session, results) {

        console.log(real + ' 원하는 지역 : ' + session.message.text);
            session.send("[ " + session.message.text + " ] 의 시승센터 관련 정보입니다.");

            

            // Ask the user to select an item from a carousel.
            var msg = new builder.Message(session)
                .attachmentLayout(builder.AttachmentLayout.carousel)
                .attachments([
                    new builder.HeroCard(session)
                        .title("성내 시승센터")
                        .subtitle("전화번호 : 02-473-7365(FAX : 02-2225-4736) 지점주소 : (05381) 서울 강동구 천호대로 1096 현대자동차 성내지점 3층 성내시승센터")
                        .images([
                            //builder.CardImage.create(session, "C:\\Users\\TAIHO\\Source\\Repos\\webbot02\\images\\" + session.message.text + "\\seongnae.png")
                            builder.CardImage.create(session, "C:\\Users\\TAIHO\\Source\\Repos\\webbot02\\images\\" + session.message.text +  "\\seongnae.png")
                                .tap(builder.CardAction.showImage(session, "C:\\Users\\TAIHO\\Source\\Repos\\webbot02\\images\\" + session.message.text + "\\seongnae.png")),
                        ])
                        .buttons([
                            builder.CardAction.openUrl(session, "http://www.hyundai.com/kr/tdn/index.do", "시승센터 홈페이지"),
                            builder.CardAction.imBack(session, "select:1", "Select")
                        ]),
                    new builder.HeroCard(session)
                        .title("잠실 시승센터")
                        .subtitle("전화번호 : 02-421-7365(FAX : 02-421-4737) 지점주소 : (05502) 서울 송파구 올림픽로 145 리센츠빌딩 2층 C10호 잠실시승센터")
                        .images([
                            builder.CardImage.create(session, "C:\\Users\\TAIHO\\Source\\Repos\\webbot02\\images\\" + session.message.text + "\\jamsil.png")
                                .tap(builder.CardAction.showImage(session, "C:\\Users\\TAIHO\\Source\\Repos\\webbot02\\images\\" + session.message.text + "\\jamsil.png")),
                        ])
                        .buttons([
                            builder.CardAction.openUrl(session, "http://www.hyundai.com/kr/tdn/index.do", "시승센터 홈페이지"),
                            builder.CardAction.imBack(session, "select:2", "Select")
                        ]),
                    new builder.HeroCard(session)
                        .title("공릉 시승센터")
                        .subtitle("전화번호 : 02-973-7365(FAX : 02-3296-6218) 지점주소 : (01861) 서울 노원구 화랑로 429 현대자동차 공릉지점옆 공릉시승센터")
                        .images([
                            builder.CardImage.create(session, "C:\\Users\\TAIHO\\Source\\Repos\\webbot02\\images\\" + session.message.text + "\\gongnung.png")
                                .tap(builder.CardAction.showImage(session, "C:\\Users\\TAIHO\\Source\\Repos\\webbot02\\images\\" + session.message.text + "\\gongnung.png"))
                        ])
                        .buttons([
                            builder.CardAction.openUrl(session, "http://www.hyundai.com/kr/tdn/index.do", "시승센터 홈페이지"),
                            builder.CardAction.imBack(session, "select:3", "Select")
                        ]),
                    new builder.HeroCard(session)
                        .title("목동 시승센터")
                        .subtitle("전화번호 : 02-2644-7365(FAX : 02-2644-7359) 지점주소 : (07995) 서울 양천구 목동서로 225 한국예술인협회 2층 목동시승센터")
                        .images([
                            builder.CardImage.create(session, "C:\\Users\\TAIHO\\Source\\Repos\\webbot02\\images\\" + session.message.text + "\\mokdong.png")
                                .tap(builder.CardAction.showImage(session, "C:\\Users\\TAIHO\\Source\\Repos\\webbot02\\images\\" + session.message.text + "\\mokdong.png"))
                        ])
                        .buttons([
                            builder.CardAction.openUrl(session, "http://www.hyundai.com/kr/tdn/index.do", "시승센터 홈페이지"),
                            builder.CardAction.imBack(session, "select:4", "Select")
                        ])
                ]);
            builder.Prompts.choice(session, msg, "select:1|select:2|select:3");
        },
    function (session, results) {
        var action, item;
        var kvPair = results.response.entity.split(':');
        switch (kvPair[0]) {
            case 'select':
                action = 'selected';
                break;
        }
        switch (kvPair[1]) {
            case '1':
                item = "성내 시승센터";
                break;
            case '2':
                item = "잠실 시승센터";
                break;
            case '3':
                item = "공릉 시승센터";
                break;
            case '4':
                item = "목동 시승센터";
                break;
        }
        session.endDialog('You %s "%s"', action, item);


    }



];




