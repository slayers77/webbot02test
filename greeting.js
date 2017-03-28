var builder = require('botbuilder');

exports.create = function (bot) {

    bot.dialog('/', [

    function (session) {

        //session.send("HI..");
        builder.Prompts.choice(session, "Hi.. Choose or Typing Your Language : ", 'English|Korean', { listStyle: builder.ListStyle.button });

    },

    function (session, results) {
        session.preferredLocale(results.response.entity, function (err) {
            if (!err) {
                //session.send("Your Choice Language %s.", results.response.entity);
                session.userData.language = results.response.entity;
                if (results.response.entity == "English") {
                    session.send("Hi!! I`m Hyundai Motors ChatBot  Grandizer!!");
                    builder.Prompts.text(session, 'What is your name?');
                }
                else if (results.response.entity == "Korean") {
                    session.send("안녕!! 난 현대자동차 챗봇 그랜다이저야 !!");
                    builder.Prompts.text(session, '당신의 이름은?');
                }
            } else {
                session.error(err);
            }
        });
    },
    function (session, results) {

        if (session.userData.language == 'English') {

            session.send('Hello %s!', results.response);
            session.userData.name = results.response;
            builder.Prompts.choice(session, 'What is your Age Group?', '10~20 AgeGroup|30 AgeGroup|40 AgeGroup|50 AgeGroup| 60 Over AgeGroup', { listStyle: builder.ListStyle.button });

        } else if (session.userData.language == 'Korean') {

            session.send('안녕 %s!', results.response);
            session.userData.name = results.response;
            builder.Prompts.choice(session, '당신의 연령대는?', '10~20대|30대|40대|50대|60대이상', { listStyle: builder.ListStyle.button });

        }
    },
    function (session, results) {

        if (session.userData.language == 'English') {

            session.send('Your AgeGroup :  %s!', results.response.entity);
            //session.userData.age = results.response.entity;
            //ession.send("Your Choice Language : " + session.userData.language + " Your Name : " + session.userData.name + " Your Age : " + results.response.entity);
            session.send("OK.. Let`s Go Grandizer..!!" + session.userData.name);
            builder.Prompts.choice(session, 'What do you want menu? choice or typing!!', 'testDrive|Design|Convenience|Price', { listStyle: builder.ListStyle.button });

        } else if (session.userData.language == 'Korean') {

            session.send('당신의 연령대는 : %s!', results.response.entity);
            //session.userData.menu = results.response.entity;
            //session.send("당신이 선택한 언어 : %s  당신의 이름 : %s  당신의 연령대 : %s", session.userData.language, session.userData.name, session.userData.age);
            //session.send("당신이 선택한 언어 : " + session.userData.language + "  당신의 이름 : " + session.userData.name + "  당신의 연령대 : " + results.response.entity);
            session.send("OK.. 그랜다이저를 시작해볼까요..!! %s 님", session.userData.name);
            builder.Prompts.choice(session, '원하시는 메뉴를 선택하세요? 선택하시거나 질문해주세요!!', '시승|디자인|편의사항|가격', { listStyle: builder.ListStyle.button });

        }
    },
    function (session, results) {

        if (session.userData.language == 'English') {

            session.send('Your Select menu :  %s!', results.response.entity);

        } else if (session.userData.language == 'Korean') {

            session.send('당신의 선택 메뉴 : %s!', results.response.entity);

        }
    }
]);
}