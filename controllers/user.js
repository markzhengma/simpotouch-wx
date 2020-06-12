const util = require('../utils/util.js');

class UserController {
  loginWithJSCode(code, callback) {
    util.request(
      'http://localhost:7001/v1/user/wxlogin',
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
      'http://localhost:7001/v1/user/init',
      {},
      data,
      'POST',
      callback
    );
  };
  createUser(uid, sid, data, callback){
    util.request(
      'http://localhost:7001/v1/user/single',
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
  findCurrentUser(uid, sid, callback){
    util.request(
      'http://localhost:7001/v1/user/self',
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