const util = require('../utils/util');

class EventController {
  getAllEvent(callback){
    util.request(
      'https://api.simpotouch.com/v1/event/all',
      {},
      { 'content-type': 'application/json' },
      'GET',
      callback
    );
  };
};

module.exports = EventController;