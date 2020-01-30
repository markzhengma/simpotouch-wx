//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    const sid = wx.getStorageSync('sid');
    if(!sid) {
      // 登录
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
                console.log(loginRes.data.data);
                try {
                  wx.setStorageSync('sid', loginRes.data.data.sid);
                  this.globalData.userAuth = { sid: loginRes.data.data.sid, uid: loginRes.data.data.uid || '' }
                } catch (e) { 
                  console.log('failed to save sid to storage')
                }
              }
            }
          })
        }
      })
    } else {
      console.log('SID IN STORAGE: ' + sid);
      this.globalData.userAuth = { sid: sid, uid: '' };
    }
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              console.log(res);

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
  }
})