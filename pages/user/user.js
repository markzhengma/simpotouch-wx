//index.js
//获取应用实例
const app = getApp()
const UserController = require('../../controllers/user');
const user = new UserController;

Page({
  data: {
    userWxInfo: null,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isCreating: false,
    userCreateData: {},
    userAppInfo: {},
    userEditData: {},
    isEditingUser: false,
    isNew: false,
  },
  onLoad: function() {
    console.log(app.data)
    this.setUserInfo();
  },
  setUserInfo: function(){
    this.setData({
      userWxInfo: app.data.userWxInfo,
      userAppInfo: app.data.userAppInfo,
      hasUserInfo: app.data.userWxInfo ? true : false,
      isNew: app.data.userAppInfo && app.data.userAppInfo.is_new ? true : false
    })
  },
  getUserInfo: function(e) {
    if(e.detail.errMsg === "getUserInfo:ok"){
      app.login()
        .then(res => {
          if(res.uid && res.sid) {
            app.getCurrentUser(res.uid, res.sid)
              .then(() => {
                this.setUserInfo()
              })
          } else {
            console.log('get current user failed');
            console.log(res);
          }
        })
        .catch(err => {
          throw err;
        })
      this.setData({
        hasUserInfo: true
      });
    };
  },

  bindRegisterTap: function() {
    this.setData({
      isCreating: true,
      userCreateData: {
        username: this.data.userWxInfo.nickName
      }
    })
  },
  cancelUserCreate: function(){
    this.setData({
      isCreating: false,
      userCreateData: {}
    })
  },
  confirmUserCreate: function(){
    const { uid, sid } = app.data.userAppInfo;
    const userCreateCallback = res => {
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
          isCreating: false,
          userCreateData: {}
        });
        wx.showToast({
          title: '创建成功',
          icon: 'succes',
          duration: 1000,
          mask: true
        });
        app.getCurrentUser(uid, sid)
          .then(() => {
            this.setUserInfo()
          })
          .catch(err => {
            console.log(err)
          })
      }
    };
    user.createUser(uid, sid, this.data.userCreateData, userCreateCallback);
  },
  onUserCreateInput: function(event){
    this.setData({
      [`userCreateData.${event.currentTarget.id}`]: event.detail.value
    });
  },

  cancelUserEdit: function(){
    this.setData({
      isEditingUser: false,
      userEditData: {}
    })
  },
  startUserEdit: function() {
    const userAppInfo = app.data.userAppInfo
    this.setData({
      isEditingUser: true,
      userEditData: {
        username: userAppInfo.username,
        intro: userAppInfo.intro,
        phone: userAppInfo.phone,
        gender: userAppInfo.gender,
        city: userAppInfo.city,
        email: userAppInfo.email,
      }
    })
  },
  onUserEditInput: function(e){
    this.setData({
      [`userEditData.${e.currentTarget.id}`]: e.detail.value
    })
  },
  confirmUserEdit: function(){
    const sid = app.data.userAppInfo.sid;
    const uid = app.data.userAppInfo.uid;

    this.data.userEditData.uid = uid;
    this.data.userEditData.sid = sid;

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
        console.log(res);
        wx.showToast({
          title: '修改成功',
          icon: 'succes',
          duration: 1000,
          mask: true
        });
        this.setData({
          isEditingUser: false,
          userEditData: {}
        });
        app.getCurrentUser(uid, sid)
          .then(() => {
            this.setUserInfo()
          })
          .catch(err => {
            console.log(err)
          })
      }
    };
    user.updateUser(this.data.userEditData, updateUser);
  },
  changeGender: function(e) {
    if(this.data.isEditingUser) {
      this.setData({
        'userEditData.gender': e.currentTarget.dataset.gender
      });
    }
  }
})
