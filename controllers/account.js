const util = require('../utils/util');

class AccountController {
  login(code, callback){
    util.request(
      'http://localhost:7001/account/wxlogin',
      {},
      { 
        'content-type': 'application/json',
        code: code 
      },
      'GET',
      callback
    );
  };
};

module.exports = AccountController;