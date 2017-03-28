
var builder = require('botbuilder');

exports.beginDialog = function (session, options) {
    session.beginDialog('luisKorServer', options);

}


exports.create = function (bot) {

    //var LuisKorModel = process.env.LuisKorModel || 'https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/6393ebda-613e-477e-bade-92330e2e496d?subscription-key=7489b95cf3fb4797939ea70ce94a4b11';
    //bot.recognizer(new builder.LuisRecognizer(LuisKorModel));
    var dialog = new builder.LuisDialog('https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/6393ebda-613e-477e-bade-92330e2e496d?subscription-key=7489b95cf3fb4797939ea70ce94a4b11');

    //bot.add('/', dialog);

    bot.dialog('시승', [

        function (session, args, next) {
            var entity = builder.EntityRecognizer.findEntity(args.entities,'메인::시승');
            //var entity = builder.EntityRecognizer.findEntity(args.intent.entities, '메인주제::시승');
            console.log('entity : ' + entity);
        }
    ]);
}