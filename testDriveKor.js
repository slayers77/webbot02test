
var builder = require('botbuilder');

//exports.beginDialog = function (session, bot) {
//    session.beginDialog('korTestDrive');

//};

//bot.dialog('korTestDrive', [
//    function (session) {
//        builder.Prompts.text(session, 'Hi! What is your name?');
//    },
//    function (session, results) {
//        session.userData.name = results.response;
//        session.endDialog();
//    }
//]);

    


exports.create = function (bot, session) {

    bot.dialog('/', [

        function (session) {

            session.send('Your Select menu :  %s!', results.response.entity);
        }
    ]);

}
