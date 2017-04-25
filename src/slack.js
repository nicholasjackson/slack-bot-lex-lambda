/*jslint node: true */
/*jslint esversion: 6 */
'use strict';

var slackClient = require('@slack/client').WebClient;
var token = process.env.SLACK_API_KEY || '';

var sc = {
};

exports.getUserDetails = function(username, callback) {
  var web = new slackClient(token);
  web.users.list({}, function(err, info) {
     if (!err) {
       var timezone = { };

       info.members.forEach((user) => {
         if (username === user.name) { 
           timezone = { timezone: user.tz_label };
         }
       });
       
       callback(timezone);
     } else {
       callback({ error: err });
     }
  });
};
