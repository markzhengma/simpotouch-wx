const util = require('../utils/util.js');

class UserController {
  createUser(sid, data, callback){
    util.request(
      'https://api.simpotouch.com/v1/user/single',
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
      'https://api.simpotouch.com/v1/user/single',
      {
        sid: sid,
        uid: uid
      },
      data,
      'PUT',
      callback
    );
  };
  findCurrentUser(sid, encrypted_data, iv, signature, callback){
    util.request(
      'https://api.simpotouch.com/v1/user/self',
      {
        sid,
        encrypted_data,
        iv,
        signature
      },
      {},
      'GET',
      callback
    );
  };
};

module.exports = UserController;