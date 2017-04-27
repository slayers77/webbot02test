// JavaScript source code
var needle = require('needle'),
    restify = require('restify'),
    url = require('url'),
    validUrl = require('valid-url')
var date = require('date-utils');
date = new Date();

//=========================================================
// Utilities
//=========================================================
function hasImageAttachment(session) {
    return session.message.attachments.length > 0 &&
        session.message.attachments[0].contentType.indexOf('image') !== -1;
}

function getImageStreamFromMessage(message) {
    var headers = {};
    var attachment = message.attachments[0];
    if (checkRequiresToken(message)) {
        // The Skype attachment URLs are secured by JwtToken,
        // you should set the JwtToken of your bot as the authorization header for the GET request your bot initiates to fetch the image.
        // https://github.com/Microsoft/BotBuilder/issues/662
        connector.getAccessToken(function (error, token) {
            var tok = token;
            headers['Authorization'] = 'Bearer ' + token;
            headers['Content-Type'] = 'application/octet-stream';

            return needle.get(attachment.contentUrl, { headers: headers });
        });
    }

    headers['Content-Type'] = attachment.contentType;
    return needle.get(attachment.contentUrl, { headers: headers });
}

function checkRequiresToken(message) {
    return message.source === 'skype' || message.source === 'msteams';
}

/**
 * Gets the href value in an anchor element.
 * Skype transforms raw urls to html. Here we extract the href value from the url
 * @param {string} input Anchor Tag
 * @return {string} Url matched or null
 */
function parseAnchorTag(input) {
    var match = input.match('^<a href=\"([^\"]*)\">[^<]*</a>$');
    if (match && match[1]) {
        return match[1];
    }

    return null;
}

//=========================================================
// Response Handling
//=========================================================
function handleSuccessResponse(session, body) {
    var tag = "";
    var desctiption = "";
    var metadata = "";
    var dominantColor = "";
    if (body) {
        //console.log("caption :::::::::::::::::::: " + body.color.dominantColors);

        for (var i = 0; i < body.tags.length; i++) {

            tag = tag + body.tags[i].name + " , ";

        }

        desctiption = body.description.captions[0].text;
        metadata = body.metadata;
        dominantColor = body.color.dominantColors;

        session.send("Tags : [ " + tag.substring(0, tag.length - 2) + " ]");
        session.send("Desctiption : [ " + desctiption + " ]");
        session.send("dominantColor : [ " + dominantColor + " ]");
        session.send("metaData : [ Width = " + metadata.width + " Height = " + metadata.height + " Format = " + metadata.format + " ]");



        if (desctiption == 'a red car') {
            caption = "당신 이미지의 차량 색상은 빨간색 입니다.";
            session.send(caption);
            session.beginDialog('/korDesignSelectValentineRed', { sendMsg: "image", key: userId, beginTime: date.getTime(), intent: "korDesignSelectValentineRed", tableNm: "insert_history", chanelID: session.message.address.channelId });
        }
        //else {

        //    for (var i = 0; i < body.tags.length; i++) {

        //        tag = tag + body.tags[i].name + " , ";

        //    }

        //    desctiption = body.description.captions[0].text;
        //    metadata = body.metadata;
        //    dominantColor = body.color.dominantColors;
            
        //    session.send("Tags : [ " + tag.substring(0, tag.length - 2) + " ]");
        //    session.send("Desctiption : [ " + desctiption + " ]");
        //    session.send("dominantColor : [ " + dominantColor + " ]");
        //    session.send("metaData : [ Width = " + metadata.width + " Height = " + metadata.height + " Format = " + metadata.format+" ]");
        //}
        //session.send('I think it\'s ' + caption);
        
    }
    else {
        session.send('Couldn\'t find a caption for this one');
    }

}

function handleErrorResponse(session, error) {
    session.send('Oops! Something went wrong. Try again later.');
    console.error(error);
}

module.exports = {
    hasImageAttachment, getImageStreamFromMessage, checkRequiresToken, parseAnchorTag, handleSuccessResponse, handleErrorResponse
}
