
var builder = require('botbuilder');

exports.beginDialog = function (session, options) {
    session.beginDialog('luisKorServer', options);

}


exports.create = function (bot) {
    bot.dialog('luisKorServer', [
        function (session) {
            builder.Prompts.choice(session, '원하시는 메뉴를 선택하세요?', '시승|디자인|편의사항|가격', { listStyle: builder.ListStyle.button });
        },
        function (session, results) {
            session.send('당신이 선택한 메뉴는 : %s!', results.response.entity);
            session.userData.menu = results.response.entity;
            session.endDialog(results);
        }
    ]);
}
