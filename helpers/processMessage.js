const API_AI_TOKEN = '684b65b8a289419594c42551ff6d479e';
const apiAiClient = require('apiai')(API_AI_TOKEN);
const FACEBOOK_ACCESS_TOKEN = 'EAAjtUzh1VDwBABw7Rff95xSrORNZB1xScYdUxW0ruQtNQop7PwvyUNNVG7yW8J6wj3qo1MqbEJcm163e4imbDZAkqOBUUx8ZAnXvFEEYgx0XO9b8NeZBNbItQMl1dKFhD8oI9ZB9LW2mUZCD5sgVwQ3r8xGYoaVIQrurLVDHBkwAZDZD';
const request = require('request');
const sendTextMessage = (senderId, text) => {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: FACEBOOK_ACCESS_TOKEN },
    method: 'POST',
    json: {
        recipient: { id: senderId },
        message: { text },
    }
});
};
module.exports = (event) => {
    const senderId = event.sender.id;
    const message = event.message.text;
    const apiaiSession = apiAiClient.textRequest(message, {sessionId: 'crowdbotics_bot'});
    apiaiSession.on('response', (response) => {
        const result = response.result.fulfillment.speech;
        sendTextMessage(senderId, result);
    });
    apiaiSession.on('error', error => console.log(error));
    apiaiSession.end();
};
