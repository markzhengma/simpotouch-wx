const util = require('../utils/util.js');

class UserController {
  loginWithJSCode(code, callback) {
    util.request(
      'https://api.simpotouch.com/v1/user/wxlogin',
      {
        'content-type': 'application/json',
        code
      },
      {},
      'GET',
      callback
    )
  };
  initUserWithUserWxInfo(data, callback){
    util.request(
      'https://api.simpotouch.com/v1/user/init',
      {},
      data,
      'POST',
      callback
    );
  };
  createUser(uid, sid, data, callback){
    util.request(
      'https://api.simpotouch.com/v1/user/single',
      {},
      {
        uid,
        sid,
        username: data.username,
        phone: data.phone
      },
      'POST',
      callback
    );
  };
  updateUser(data, callback){
    util.request(
      'https://api.simpotouch.com/v1/user/single',
      {},
      data,
      'PUT',
      callback
    );
  };
  findCurrentUser(uid, sid, callback){
    util.request(
      'https://api.simpotouch.com/v1/user/self',
      {},
      {
        uid,
        sid
      },
      'GET',
      callback
    );
  };
};

module.exports = UserController;