const UserController = require('./controllers/user');
const user = new UserController;
const watcher = require('./utils/watcher');

//app.js
App({
  onLaunch: function () {
    watcher.setWatcher(this);

    const uid = wx.getStorageSync('uid');
    const sid = wx.getStorageSync('sid');
    const encryptedData = wx.getStorageSync('encryptedData');
    const iv = wx.getStorageSync('iv');
    const signature =wx.getStorageSync('signature');

    this.checkUserAuth()
      .then(res => {
        if (res.authSetting['scope.userInfo']) {
          console.log('got user authentication')
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          if(!uid || !sid) {
            this.login()
              .then(() => {
                this.setAppData('isCheckingUserAuth', false);
              })
              .catch(err => {
                console.log('check user auth error');
                console.log(err);
              })
            return;
          } else if(!encryptedData || !iv || !signature) {
            this.getUserWxInfo()
              .then(() => {
                this.setAppData('isCheckingUserAuth', false);
              })
              .catch(err => {
                console.log('check user auth error');
                console.log(err);
              })
            return;
          } else {
            this.getCurrentUser(uid, sid)
              .then(() => {
                this.setAppData('isCheckingUserAuth', false);
              })
              .catch(err => {
                console.log('check user auth error');
                console.log(err);
              })
          }
        } else {
          this.setAppData('isCheckingUserAuth', false);
          console.log('need user authentication')
        }
      })
      .catch(err => {
        this.setAppData('isCheckingUserAuth', false);
        console.log('check user auth error');
        console.log(err);
      })

  },
  data: {
    userWxInfo: null,
    userAppInfo: null,
    isCheckingUserAuth: false,
  },
  watch: {
    isCheckingUserAuth: function(newVal, oldVal) {
      if(newVal) {
        wx.hideTabBar({
          animation: false,
          fail: (err) => {
            console.log('hide tab bar failed')
            console.log(err)
          }
        });
      } else {
        wx.showTabBar({
          animation: false,
          fail: (err) => {
            console.log('show tab bar failed')
            console.log(err)
          }
        });
          
      }
    }
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
                const encryptedData = userWxInfoRes.encryptedData;
                const iv = userWxInfoRes.iv;
    
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

                    this.setAppData('userAppInfo', loginRes.data);
  
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
          const signature = res.signature;
          const encryptedData = res.encryptedData;
          const iv = res.iv;
          wx.setStorageSync('signature', signature);
          wx.setStorageSync('encryptedData', encryptedData);
          wx.setStorageSync('iv', iv);
          
          self.setAppData('userWxInfo', res.userInfo)
          resolve(res);
        }
      })
    })
  },

  checkUserAuth: function() {
    this.setAppData('isCheckingUserAuth', true);
    return new Promise(resolve => {
      console.log('get setting')
      // 获取用户信息
      wx.getSetting({
        success: res => {
          resolve(res);
        }
      })
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
          resolve(res);
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
    if(!this.data.isCheckingUserAuth){
      this.setAppData('currentEventId', id);
      wx.navigateTo({
        url: `/pages/event/event?id=${id}`
      })
    }
  }
})