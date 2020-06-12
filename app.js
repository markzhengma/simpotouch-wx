const UserController = require('./controllers/user');
const user = new UserController;
//app.js
App({
  onLaunch: function () {
    const uid = wx.getStorageSync('uid');
    const sid = wx.getStorageSync('sid');
    const encryptedData = wx.getStorageSync('encryptedData');
    const iv = wx.getStorageSync('iv');
    const signature =wx.getStorageSync('signature');
    if(!uid || !sid) {
      // 登录
      this.login();
    } else if (!encryptedData || !iv || !signature) {
      this.getSetting();
    } else {
      console.log('UID IN STORAGE: ' + uid);
      console.log('SID IN STORAGE: ' + sid);
      console.log('ENCRYPTEDDATA IN STORAGE: ' + encryptedData);
      console.log('IV IN STORAGE: ' + iv);
      console.log('SIGNATURE IN STORAGE: ' + signature);
      this.getCurrentUser(uid, sid);
    }
  },
  data: {
    userWxInfo: null,
    userAppInfo: null
  },
  setAppData: function(field, value) {
    console.log('set global data ' + field)
    this.data[field] = value;
  },
  login: function() {
    console.log('logging in');
    const self = this;
    return new Promise(resolve => {
      wx.login({
        success(res) {
          const callback = (res) => {
            self.loginCallBack(res)
              .then(data => {
                resolve(data);
              })
              .catch(err => {
                throw err;
              })
          };

          user.loginWithJSCode(res.code, callback);
        }
      })
    })
  },

  // work on login res data 
  loginCallBack: function(loginRes){
    console.log('login call back')
    return new Promise(resolve => {
      switch (loginRes.code) {
        case 200:
          const isNew = loginRes.data.is_new;
  
          const sid = loginRes.data.sid;
          const timestamp = loginRes.data.timestamp;
  
          this.getUserWxInfo()
            .then(userWxInfoRes => {
              if(userWxInfoRes) {
                const signature = userWxInfoRes.signature;
                const encryptedData = userWxInfoRes.encryptedData;
                const iv = userWxInfoRes.iv;
        
                wx.setStorageSync('signature', signature);
                wx.setStorageSync('encryptedData', encryptedData);
                wx.setStorageSync('iv', iv);
    
                console.log('got user info');
                
                switch (isNew){
                  case true:
                    console.log('new user yeah');
                    this.initUserWithUserWxInfo(sid, timestamp, encryptedData, iv)
                      .then(userData => {
                        if(userData.code !== 200) {
                          console.log('get user data error')
                          console.log(userData);
                          resolve(userData);
                        } else {
                          const userAppInfo = userData.data;
                          const uid = userAppInfo.uid;
  
                          resolve({ uid, sid })
    
                          wx.setStorageSync('uid', uid);
                          wx.setStorageSync('sid', sid);
    
                          this.setAppData('userAppInfo', userAppInfo);
                        }
                      })
                    break;
                  default: 
                    console.log('not a new user');
                    console.log(loginRes);
                    const uid = loginRes.data.uid;
                    wx.setStorageSync('uid', uid);
                    wx.setStorageSync('sid', sid);
  
                    resolve({ uid, sid })
                    break;
                }
              }
            })
          break;
        default:
          console.log('login failed');
          console.log(loginRes);
          resolve(loginRes)
          break;
      }
    })
  },

  // new user, send wx user data to server
  // init new user with wx info and 
  initUserWithUserWxInfo: function(sid, timestamp, encryptedData, iv){
    console.log('initiate user with wx user info')
    return new Promise(resolve => {
      const callback = (data) => {
        resolve(data)
      };

      const data = {
        sid,
        timestamp,
        encryptedData,
        iv
      }
      user.initUserWithUserWxInfo(data, callback);
    })
  },

  // wx get user info
  getUserWxInfo() {
    console.log('get wx user info');
    let self = this;
    return new Promise(resolve => {
      wx.getUserInfo({
        success(res) {
          self.setAppData('userWxInfo', res.userInfo)
          resolve(res);
        }
      })
    })
  },

  getSetting: function() {
    console.log('get setting')
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          this.getUserWxInfo()
          .then(userWxInfoRes => {
            const signature = userWxInfoRes.signature;
            const encryptedData = userWxInfoRes.encryptedData;
            const iv = userWxInfoRes.iv;
    
            wx.setStorageSync('signature', signature);
            wx.setStorageSync('encryptedData', encryptedData);
            wx.setStorageSync('iv', iv);
          })
        }
      }
    })
  },

  getCurrentUser: function(uid, sid) {
    const self = this;
    return new Promise(resolve => {
      console.log('get current user')
      const setUserInfo = (res) => {
        if(!res || res.code !== 200) {
          console.log('get current user failed');
          console.log(res);
        } else {
          self.setAppData('userAppInfo', res.data);
          resolve(self.data)
        }
        self.getUserWxInfo();
      };
      user.findCurrentUser(uid, sid, setUserInfo);
    })
  },

  goToEventPage: function(id) {
    this.setAppData('currentEventId', id);
    wx.navigateTo({
      url: `/pages/event/event?id=${id}`
    })
  }
})