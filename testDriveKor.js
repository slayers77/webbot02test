
var builder = require('botbuilder');

//exports.beginDialog = function (session, options) {
//    session.beginDialog('korTestDrive', options);

//}


exports.create = function (bot, session) {

    bot.dialog('korTestDrive', [

        function (session) {

            session.send('Your Select menu :  %s!', results.response.entity);
        }
    ]);

}
