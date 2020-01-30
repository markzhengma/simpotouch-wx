//index.js
//获取应用实例
const app = getApp()
const UserController = require('../../controllers/user');
const user = new UserController;

Page({
  data: {
    motto: '点击头像进入活动列表',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userAuth: app.globalData.userAuth,
    showCreateModal: false,
    userCreateCard: {},
    userCard: {}
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      const self = this;
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
      if(app.globalData.userAuth.sid){
        const sid = app.globalData.userAuth.sid;
        const setUid = (res) => {
          if(res.code !== 200) {
            console.log(res);
          } else {
            console.log(res);
            app.globalData.userAuth = { sid: sid, uid: res.data.uid };
            self.setData({
              userAuth: app.globalData.userAuth,
              userCard: { username: res.data.username, phone: res.data.phone }
            });
          }
        };
        user.findCurrentUser(sid, setUid);
      }
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onReady: function(){
    console.log(app.globalData.userAuth)
  },
  //事件处理函数
  bindRegisterTap: function() {
    // app.globalData.userAuth = { sid: this.data.userAuth.sid, uid: '123'};
    // this.setData({
    //   userAuth: app.globalData.userAuth
    // })
    this.setData({
      showCreateModal: true
    })
  },
  cancelUserCreate: function(){
    this.setData({
      showCreateModal: false,
      userCreateCard: {}
    })
  },
  confirmUserCreate: function(){
    const sid = app.globalData.userAuth.sid;
    const updateUserAuth = (res) => {
      if(res.code !== 200){
        console.log('register failed');
      } else {
        this.setData({
          showCreateModal: false,
          userCreateCard: {}
        });
        app.globalData.userAuth = { sid: sid, uid: res.data.uid };
        this.setData({
          userCard: { username: res.data.username, phone: res.data.phone },
          userAuth: app.globalData.userAuth
        })
      }
    };
    user.createUser(sid, this.data.userCreateCard, updateUserAuth);
  },
  onUserCreateInput: function(event){
    this.setData({
      [`userCreateCard.${event.currentTarget.id}`]: event.detail.value
    });
  },
  getUserInfo: function(e) {
    console.log(e);
    if(e.detail.errMsg === "getUserInfo:ok"){
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      });
      console.log(this.data.userAuth)
    };
  },
})
