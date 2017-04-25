/*jslint node: true */
/*jslint esversion: 6 */
'use strict';

process.env.PATH = process.env.PATH + ':' + process.env.LAMBDA_TASK_ROOT;

var slackClient = require('slack');
var dispatcher = require('dispatcher');

// --------------- Main handler -----------------------

function loggingCallback(response, originalCallback) {
    originalCallback(null, response);
}

// Route the incoming request based on intent.
// The JSON body of the request is provided in the event slot.
exports.handler = (event, context, callback) => {
    try {
        // By default, treat the user request as coming from the America/New_York time zone.
        process.env.TZ = 'America/New_York';
        console.log(`event.bot.name=${event.bot.name}`);

        dispatcher.dispatch(event, slackClient, (response) => loggingCallback(response, callback));
    } catch (err) {
        callback(err);
    }
};
