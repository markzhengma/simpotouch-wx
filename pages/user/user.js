//index.js
//获取应用实例
const app = getApp()
const UserController = require('../../controllers/user');
const user = new UserController;

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userAuth: app.globalData.userAuth,
    showCreateModal: false,
    userCreateCard: {},
    userCard: {},
    userEditCard: {},
    isEditingUser: false,
    showRegister: false,
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });
      if(app.globalData.userAuth){
        const sid = app.globalData.userAuth.sid;
        this.getCurrentUser(sid);
      }
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        });
        if(app.globalData.userAuth){
          const sid = app.globalData.userAuth.sid;
          this.getCurrentUser(sid);
        }
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          });
          if(app.globalData.userAuth){
            const sid = app.globalData.userAuth.sid;
            this.getCurrentUser(sid);
          }
        }
      })
    }
  },
  onReady: function(){
    
  },
  //事件处理函数
  bindRegisterTap: function() {
    // app.globalData.userAuth = { sid: this.data.userAuth.sid, uid: '123'};
    // this.setData({
    //   userAuth: app.globalData.userAuth
    // })
    this.setData({
      showCreateModal: true,
      userCreateCard: {
        username: this.data.userInfo.nickName
      }
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
        console.log(res);
        wx.showToast({
          title: '创建失败',
          icon: 'none',
          duration: 1000,
          mask: true
        });
      } else {
        this.setData({
          showCreateModal: false,
          userCreateCard: {}
        });
        app.globalData.userAuth = { sid: sid, uid: res.data.uid };
        this.setData({
          userCard: res.data,
          userAuth: app.globalData.userAuth,
          showRegister: false,
        });
        wx.showToast({
          title: '创建成功',
          icon: 'succes',
          duration: 1000,
          mask: true
        });
      }
    };
    user.createUser(sid, this.data.userCreateCard, updateUserAuth);
  },
  onUserCreateInput: function(event){
    this.setData({
      [`userCreateCard.${event.currentTarget.id}`]: event.detail.value
    });
  },
  getCurrentUser: function(sid) {
    const encryptedData = wx.getStorageSync('encryptedData');
    const iv = wx.getStorageSync('iv');
    const signature =wx.getStorageSync('signature');

    const setUid = (res) => {
      console.log(res)
      if(res.code !== 200) {
        console.log(res);
        console.log('sid not valid, logging in again');

        const callBack = (userAuth) => {
          const sid = userAuth.sid;
          this.getCurrentUserAttempt(sid);
        }
        app.login(callBack);
      } else if(res.data && res.data.is_new) {
        console.log('this is a new user');
        console.log(res);
        this.setData({
          showRegister: true
        })
      } else {
        app.globalData.userAuth = { sid: sid, uid: res.data.uid };
        app.globalData.userCard = res.data;
        this.setData({
          userAuth: { sid: sid, uid: res.data.uid },
          userCard: res.data,
          showRegister: false
        });
      }
    };
    user.findCurrentUser(sid, encryptedData, iv, signature, setUid);
  },
  getCurrentUserAttempt: function(sid) {
    const encryptedData = wx.getStorageSync('encryptedData');
    const iv = wx.getStorageSync('iv');
    const signature =wx.getStorageSync('signature');

    const setUid = (res) => {
      console.log(res);

      if(res.data && res.data.is_new) {
        console.log('this is a new user');
        console.log(res);
        this.setData({
          showRegister: true
        })
      } else {
        app.globalData.userAuth = { sid: sid, uid: res.data.uid };
        app.globalData.userCard = res.data;
        this.setData({
          userAuth: { sid: sid, uid: res.data.uid },
          userCard: res.data,
          showRegister: false
        });
      }
    };

    user.findCurrentUser(sid, encryptedData, iv, signature, setUid);
  },
  getUserInfo: function(e) {
    if(e.detail.errMsg === "getUserInfo:ok"){
      app.globalData.userInfo = e.detail.userInfo;
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      });

      const sid = app.globalData.userAuth && app.globalData.userAuth.sid;
      this.getCurrentUser(sid);
    };
  },
  cancelUserEdit: function(){
    this.setData({
      isEditingUser: false,
      userEditCard: {}
    })
  },
  startUserEdit: function() {
    const userData = this.data.userCard
    this.setData({
      isEditingUser: true,
      userEditCard: {
        username: userData.username,
        intro: userData.intro,
        phone: userData.phone,
        gender: userData.gender,
        city: userData.city,
        email: userData.email,
      }
    })
  },
  onUserEditInput: function(e){
    this.setData({
      [`userEditCard.${e.currentTarget.id}`]: e.detail.value
    })
  },
  confirmUserEdit: function(){
    const sid = app.globalData.userAuth.sid;
    const uid = app.globalData.userAuth.uid;
    const updateUser = (res) => {
      if(res.code !== 200){
        console.log('update failed');
        console.log(res);
        wx.showToast({
          title: '修改失败',
          icon: 'none',
          duration: 1000,
          mask: true
        });
      } else {
        this.setData({
          isEditingUser: false,
          userEditCard: {}
        });
        app.globalData.userAuth = { sid: sid, uid: res.data.uid };
        this.setData({
          userCard: res.data,
        })
        console.log(res);
        wx.showToast({
          title: '修改成功',
          icon: 'succes',
          duration: 1000,
          mask: true
        });
      }
    };
    user.updateUser(sid, uid, this.data.userEditCard, updateUser);
  },
  changeGender: function(e) {
    if(this.data.isEditingUser) {
      this.setData({
        'userEditCard.gender': e.currentTarget.dataset.gender
      });
    }
  }
})
