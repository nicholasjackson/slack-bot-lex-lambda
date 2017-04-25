/*jslint node: true */
/*jslint esversion: 6 */
'use strict';

var dispatcher = require('./dispatcher');

var intentStub = {
  currentIntent: {
    name: 'WhereIs',
    slots: {
      User: 'nicjackson'
    }
  }
};

describe('dispatch', () => {

  test('calls the slack API with unknown user', done => {
    var mockSlack = {
      getUserDetails: function(user, callback) {
        callback({ });
      }
    };

    dispatcher.dispatch(intentStub, mockSlack,(outcome) => {
      expect(outcome.dialogAction.fulfillmentState).toEqual('Fulfilled');
      expect(outcome.dialogAction.message).toBeDefined();
      expect(outcome.dialogAction.message.content).toEqual('Sorry I can\'t find user: nicjackson');
      done();
    });
    
  });
  
  test('calls the slack API with known user', done => {
    var mockSlack = {
      getUserDetails: function(user, callback) {
        callback({timezone: 'British Summer Time'});
      }
    };

    dispatcher.dispatch(intentStub, mockSlack, (outcome) => {
      expect(outcome.dialogAction.fulfillmentState).toEqual('Fulfilled');
      expect(outcome.dialogAction.message).toBeDefined();
      expect(outcome.dialogAction.message.content).toEqual('nicjackson is in British Summer Time');
      done();
    });
    
  });
  
  test('returns error when error from slack API', done => {
    var mockSlack = {
      getUserDetails: function(user, callback) {
        callback({err: 'Something went wrong'});
      }
    };

    dispatcher.dispatch(intentStub, mockSlack, (outcome) => {
      expect(outcome.dialogAction.fulfillmentState).toEqual('Failed');
      done();
    });
    
  });
});
