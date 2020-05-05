const UserController = require('./controllers/user');
const user = new UserController;
//app.js
App({
  onLaunch: function () {
    const sid = wx.getStorageSync('sid');
    const encryptedData = wx.getStorageSync('encryptedData');
    const iv = wx.getStorageSync('iv');
    const signature =wx.getStorageSync('signature');
    if(!sid || !encryptedData || !iv || !signature) {
      // 登录
      this.login()
    } else {
      console.log('SID IN STORAGE: ' + sid);
      console.log('ENCRYPTEDDATA IN STORAGE: ' + encryptedData);
      console.log('IV IN STORAGE: ' + iv);
      console.log('SIGNATURE IN STORAGE: ' + signature);
      this.getCurrentUser(sid, encryptedData, iv, signature);
    }
    this.getSetting();
  },
  globalData: {
    userInfo: null,
    userAuth: null
  },
  login: function(callback) {
    console.log('logging in')
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: 'https://api.simpotouch.com/v1/account/wxlogin',
          header: {
            'content-type': 'application/json',
            code: res.code 
          },
          success: loginRes => {
            // console.log(data.data)
            if(loginRes.data.code !== 200){
              console.log(loginRes.data.data);
            } else {
              console.log('login succeeded, res data:')
              console.log(loginRes.data.data);
              const getUserAttempt = () => {
                try {
                  wx.setStorageSync('sid', loginRes.data.data.sid);
                  this.globalData.userAuth = { sid: loginRes.data.data.sid, uid: loginRes.data.data.uid || '', is_new: loginRes.data.data.is_new };
                  if(callback) {
                    callback(this.globalData.userAuth);
                  }
                } catch (e) { 
                  console.log('failed to save sid to storage')
                }
              }
              this.getSetting(getUserAttempt);
              console.log('this.globalData.userAuth: ', this.globalData.userAuth);
            }
          }
        })
      }
    })
  },

  getSetting: function(getUserAttempt) {
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              wx.setStorageSync('signature', res.signature);
              wx.setStorageSync('encryptedData', res.encryptedData);
              wx.setStorageSync('iv', res.iv);
              this.globalData.userInfo = res.userInfo;
              console.log(this.globalData);

              if(getUserAttempt) {
                getUserAttempt();
              }

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  getCurrentUser: function(sid, encryptedData, iv, signature) {
    const setUid = (res) => {
      if(res.code !== 200) {
        console.log(res);
        console.log('sid not valid, logging in again');

        const callBack = (userAuth) => {
          const sid = userAuth.sid;
          console.log(333, sid);
          this.getCurrentUser(sid, encryptedData, iv, signature);
        }
        this.login(callBack);
      } else if(res.data && res.data.is_new) {
        console.log('this is a new user');
        console.log(res);
      } else {
        this.globalData.userAuth = { sid: sid, uid: res.data.uid };
        this.globalData.userCard = res.data;
      }
    };
    user.findCurrentUser(sid, encryptedData, iv, signature, setUid);
  },

  goToEventPage: function(id) {
    this.globalData.currentEventId = id;
    wx.navigateTo({
      url: `/pages/event/event?id=${id}`
    })
  }
})