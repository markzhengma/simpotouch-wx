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
  createEvent(data, callback) {
    util.request(
      'https://api.simpotouch.com/v1/event/single',
      {},
      data,
      'POST',
      callback
    );
  }
};

module.exports = EventController;