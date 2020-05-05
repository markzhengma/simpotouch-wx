const UserController = require('./controllers/user');
const user = new UserController;
//app.js
App({
  onLaunch: function () {
    const sid = wx.getStorageSync('sid');
    if(!sid) {
      // 登录
      this.login()
    } else {
      console.log('SID IN STORAGE: ' + sid);
      this.getCurrentUser(sid);
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              console.log(res)
              this.globalData.userInfo = res.userInfo
              console.log(this.globalData);

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
  globalData: {
    userInfo: null,
    userAuth: null
  },
  login: function(callback) {
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
              try {
                wx.setStorageSync('sid', loginRes.data.data.sid);
                this.globalData.userAuth = { sid: loginRes.data.data.sid, uid: loginRes.data.data.uid || '', is_new: loginRes.data.data.is_new };
                if(callback) {
                  callback(this.globalData.userAuth);
                }
              } catch (e) { 
                console.log('failed to save sid to storage')
              }
              console.log('this.globalData.userAuth: ', this.globalData.userAuth);
            }
          }
        })
      }
    })
  },

  getCurrentUser: function(sid) {
    const setUid = (res) => {
      if(res.code !== 200) {
        console.log(res);
        console.log('sid not valid, logging in again');

        const callBack = (userAuth) => {
          const sid = userAuth.sid;
          console.log(333, sid);
          this.getCurrentUser(sid);
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
    user.findCurrentUser(sid, setUid);
  },

  goToEventPage: function(id) {
    this.globalData.currentEventId = id;
    wx.navigateTo({
      url: `/pages/event/event?id=${id}`
    })
  }
})