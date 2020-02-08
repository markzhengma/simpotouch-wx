const util = require('../utils/util.js');

class EventController {
  getAllEvent(callback){
    util.request(
      'https://api.simpotouch.com/v1/event/all',
      {},
      {},
      'GET',
      callback
    );
  };
};

module.exports = EventController;