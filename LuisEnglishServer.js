
var builder = require('botbuilder');

exports.beginDialog = function (session, options) {
    session.beginDialog('luisEngServer', options);

} 


exports.create = function (bot) {
    //bot.dialog('luisEngServer', [
    //    function (session) {
    //        builder.Prompts.choice(session, 'What do you want menu?', 'testDrive|Design|Convenience|Price', { listStyle: builder.ListStyle.button });
    //    },
    //    function (session, results) {
    //        session.send('Your Choice Menu : %s!', results.response.entity);
    //        session.userData.menu = results.response.entity;
    //        session.endDialog(results);
    //    }
    //]);
}
