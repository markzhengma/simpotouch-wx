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
  // onLoad: function () {
  //   // watch this value
  //   this.setData({
  //     isNew: app.data.userAppInfo ? app.data.userAppInfo.is_new : false
  //   })
  //   if (app.data.userInfo) {
  //     this.setData({
  //       userInfo: app.data.userInfo,
  //       hasUserInfo: true
  //     });
  //     if(app.data.userAuth){
  //       const sid = app.data.userAuth.sid;
  //       this.getCurrentUser(sid);
  //     }
  //   } else if (this.data.canIUse){
  //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //     // 所以此处加入 callback 以防止这种情况
  //     app.userInfoReadyCallback = res => {
  //       console.log(res)
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       });
  //       if(app.data.userAuth){
  //         const sid = app.data.userAuth.sid;
  //         this.getCurrentUser(sid);
  //       }
  //     }
  //   } else {
  //     // 在没有 open-type=getUserInfo 版本的兼容处理
  //     wx.getUserInfo({
  //       success: res => {
  //         app.data.userInfo = res.userInfo
  //         this.setData({
  //           userInfo: res.userInfo,
  //           hasUserInfo: true
  //         });
  //         if(app.data.userAuth){
  //           const sid = app.data.userAuth.sid;
  //           this.getCurrentUser(sid);
  //         }
  //       }
  //     })
  //   }
  // },
  // onReady: function(){
    
  // },
  //事件处理函数
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
  // getCurrentUser: function(sid) {
  //   const encryptedData = wx.getStorageSync('encryptedData');
  //   const iv = wx.getStorageSync('iv');
  //   const signature =wx.getStorageSync('signature');

  //   const setUid = (res) => {
  //     console.log(res)
  //     if(res.code !== 200) {
  //       console.log(res);
  //       console.log('sid not valid, logging in again');

  //       const callBack = (userAuth) => {
  //         const sid = userAuth.sid;
  //         this.getCurrentUserAttempt(sid);
  //       }
  //       app.login(callBack);
  //     } else if(res.data && res.data.is_new) {
  //       console.log('this is a new user');
  //       console.log(res);
  //       this.setData({
  //         isNew: true
  //       })
  //     } else {
  //       app.data.userAuth = { sid: sid, uid: res.data.uid };
  //       app.data.userAppInfo = res.data;
  //       this.setData({
  //         userAuth: { sid: sid, uid: res.data.uid },
  //         userAppInfo: res.data,
  //         isNew: false
  //       });
  //     }
  //   };
  //   user.findCurrentUser(sid, encryptedData, iv, signature, setUid);
  // },
  // getCurrentUserAttempt: function(sid) {
  //   const encryptedData = wx.getStorageSync('encryptedData');
  //   const iv = wx.getStorageSync('iv');
  //   const signature =wx.getStorageSync('signature');

  //   const setUid = (res) => {
  //     console.log(res);

  //     if(res.data && res.data.is_new) {
  //       console.log('this is a new user');
  //       console.log(res);
  //       this.setData({
  //         isNew: true
  //       })
  //     } else {
  //       app.data.userAuth = { sid: sid, uid: res.data.uid };
  //       app.data.userAppInfo = res.data;
  //       this.setData({
  //         userAuth: { sid: sid, uid: res.data.uid },
  //         userAppInfo: res.data,
  //         isNew: false
  //       });
  //     }
  //   };

  //   user.findCurrentUser(sid, encryptedData, iv, signature, setUid);
  // },
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
  // confirmUserEdit: function(){
  //   const sid = app.data.userAuth.sid;
  //   const uid = app.data.userAuth.uid;
  //   const updateUser = (res) => {
  //     if(res.code !== 200){
  //       console.log('update failed');
  //       console.log(res);
  //       wx.showToast({
  //         title: '修改失败',
  //         icon: 'none',
  //         duration: 1000,
  //         mask: true
  //       });
  //     } else {
  //       this.setData({
  //         isEditingUser: false,
  //         userEditData: {}
  //       });
  //       app.data.userAuth = { sid: sid, uid: res.data.uid };
  //       this.setData({
  //         userAppInfo: res.data,
  //       })
  //       console.log(res);
  //       wx.showToast({
  //         title: '修改成功',
  //         icon: 'succes',
  //         duration: 1000,
  //         mask: true
  //       });
  //     }
  //   };
  //   user.updateUser(sid, uid, this.data.userEditData, updateUser);
  // },
  // changeGender: function(e) {
  //   if(this.data.isEditingUser) {
  //     this.setData({
  //       'userEditData.gender': e.currentTarget.dataset.gender
  //     });
  //   }
  // }
})
