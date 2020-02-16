const util = require('../utils/util.js');

class UserController {
  createUser(sid, data, callback){
    util.request(
      'http://localhost:7001/v1/user/single',
      {
        sid: sid
      },
      {
        username: data.username,
        phone: data.phone
      },
      'POST',
      callback
    );
  };
  updateUser(sid, uid, data, callback){
    util.request(
      'http://localhost:7001/v1/user/single',
      {
        sid: sid,
        uid: uid
      },
      data,
      'PUT',
      callback
    );
  };
  findCurrentUser(sid, callback){
    util.request(
      'http://localhost:7001/v1/user/self',
      {
        sid: sid
      },
      {},
      'GET',
      callback
    );
  };
};

module.exports = UserController;