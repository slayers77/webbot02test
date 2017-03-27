

exports.beginDialog = function (session, options) {
    session.beginDialog('luisEngServer', options || {});

} 


exports.create = function (bot) {




    bot.dialog('luisEngServer', prompt);
}
