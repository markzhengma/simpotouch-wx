const app = getApp();
const util = require('../../utils/util.js');

Page({

  /**
   * Page initial data
   */
  data: {
    bannerData: {},
    annData: {},
    eventListData: {}
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function () {
    this.setBannerData();
    this.setAnnData();
    this.setEventListData();
  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {
    console.log('refresh');
  },
  
  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {
    this.pushToEventList();
  },

  setBannerData: function() {
    this.setData({
      bannerData: {
        update_time: new Date(),
        list: [
          {
            text: 'test-1',
            img: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4224314812,3295550068&fm=26&gp=0.jpg'
          },
          {
            text: 'test-2',
            img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587217792109&di=2c1decc461810753cd4c3296aea0c4d7&imgtype=0&src=http%3A%2F%2Fimg1.imgtn.bdimg.com%2Fit%2Fu%3D2186434981%2C2381749416%26fm%3D214%26gp%3D0.jpg'
          },
          {
            text: 'test-3',
            img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=322629880,2420466251&fm=26&gp=0.jpg'
          },
        ]
      }
    })
  },

  setAnnData: function() {
    this.setData({
      annData: {
        text: '欢迎来到 simpotouch！这里是我们的通知。',
        url: ''
      }
    })
  },

  setEventListData: function() {
    this.setData({
      eventListData: {
        update_time: new Date(),
        list: [
          {
            id: '0001',
            title: '自媒体运营交流会',
            userid: '001',
            username: '喜经纬',
            avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587232648358&di=be05446226b9dab4aaaf9df0da0e9ba2&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F670f66ab45ec7e1f8243c08315e2f55c17dd9e7b8007-BpNoh5_fw658',
            img: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4224314812,3295550068&fm=26&gp=0.jpg',
            time: '2020-04-18',
            location: '上海'
          },
          {
            id: '0002',
            title: 'IoT创业座谈',
            userid: '002',
            username: '胡名洋',
            avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=243149908,701805517&fm=26&gp=0.jpg',
            img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587217792109&di=2c1decc461810753cd4c3296aea0c4d7&imgtype=0&src=http%3A%2F%2Fimg1.imgtn.bdimg.com%2Fit%2Fu%3D2186434981%2C2381749416%26fm%3D214%26gp%3D0.jpg',
            time: '2020-04-19',
            location: '青岛'
          },
          {
            id: '0003',
            title: '房屋出售开放参观',
            userid: '003',
            username: '马铮',
            avatar: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1427569726,262975820&fm=26&gp=0.jpg',
            img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=322629880,2420466251&fm=26&gp=0.jpg',
            time: '2020-04-20',
            location: '北京'
          },
          {
            id: '0004',
            title: '自媒体运营交流会',
            userid: '001',
            username: '喜经纬',
            avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587232648358&di=be05446226b9dab4aaaf9df0da0e9ba2&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F670f66ab45ec7e1f8243c08315e2f55c17dd9e7b8007-BpNoh5_fw658',
            img: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4224314812,3295550068&fm=26&gp=0.jpg',
            time: '2020-04-18',
            location: '上海'
          },
          {
            id: '0005',
            title: 'IoT创业座谈',
            userid: '002',
            username: '胡名洋',
            avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=243149908,701805517&fm=26&gp=0.jpg',
            img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587217792109&di=2c1decc461810753cd4c3296aea0c4d7&imgtype=0&src=http%3A%2F%2Fimg1.imgtn.bdimg.com%2Fit%2Fu%3D2186434981%2C2381749416%26fm%3D214%26gp%3D0.jpg',
            time: '2020-04-19',
            location: '青岛'
          },
          {
            id: '0006',
            title: '房屋出售开放参观',
            userid: '003',
            username: '马铮',
            avatar: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1427569726,262975820&fm=26&gp=0.jpg',
            img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=322629880,2420466251&fm=26&gp=0.jpg',
            time: '2020-04-20',
            location: '北京'
          },
          {
            id: '0007',
            title: '自媒体运营交流会',
            userid: '001',
            username: '喜经纬',
            avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587232648358&di=be05446226b9dab4aaaf9df0da0e9ba2&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F670f66ab45ec7e1f8243c08315e2f55c17dd9e7b8007-BpNoh5_fw658',
            img: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4224314812,3295550068&fm=26&gp=0.jpg',
            time: '2020-04-18',
            location: '上海'
          },
          {
            id: '0008',
            title: 'IoT创业座谈',
            userid: '002',
            username: '胡名洋',
            avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=243149908,701805517&fm=26&gp=0.jpg',
            img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587217792109&di=2c1decc461810753cd4c3296aea0c4d7&imgtype=0&src=http%3A%2F%2Fimg1.imgtn.bdimg.com%2Fit%2Fu%3D2186434981%2C2381749416%26fm%3D214%26gp%3D0.jpg',
            time: '2020-04-19',
            location: '青岛'
          },
          {
            id: '0009',
            title: '房屋出售开放参观',
            userid: '003',
            username: '马铮',
            avatar: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1427569726,262975820&fm=26&gp=0.jpg',
            img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=322629880,2420466251&fm=26&gp=0.jpg',
            time: '2020-04-20',
            location: '北京'
          },
          {
            id: '0010',
            title: '自媒体运营交流会',
            userid: '001',
            username: '喜经纬',
            avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587232648358&di=be05446226b9dab4aaaf9df0da0e9ba2&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F670f66ab45ec7e1f8243c08315e2f55c17dd9e7b8007-BpNoh5_fw658',
            img: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4224314812,3295550068&fm=26&gp=0.jpg',
            time: '2020-04-18',
            location: '上海'
          },
        ]
      }
    })
  },

  pushToEventList: function() {
    const newEventList = [
      {
        id: '0001',
        title: '自媒体运营交流会',
        userid: '001',
        username: '喜经纬',
        avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587232648358&di=be05446226b9dab4aaaf9df0da0e9ba2&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F670f66ab45ec7e1f8243c08315e2f55c17dd9e7b8007-BpNoh5_fw658',
        img: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4224314812,3295550068&fm=26&gp=0.jpg',
        time: '2020-04-18',
        location: '上海'
      },
      {
        id: '0002',
        title: 'IoT创业座谈',
        userid: '002',
        username: '胡名洋',
        avatar: 'https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=243149908,701805517&fm=26&gp=0.jpg',
        img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587217792109&di=2c1decc461810753cd4c3296aea0c4d7&imgtype=0&src=http%3A%2F%2Fimg1.imgtn.bdimg.com%2Fit%2Fu%3D2186434981%2C2381749416%26fm%3D214%26gp%3D0.jpg',
        time: '2020-04-19',
        location: '青岛'
      },
      {
        id: '0003',
        title: '房屋出售开放参观',
        userid: '003',
        username: '马铮',
        avatar: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1427569726,262975820&fm=26&gp=0.jpg',
        img: 'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=322629880,2420466251&fm=26&gp=0.jpg',
        time: '2020-04-20',
        location: '北京'
      },
      {
        id: '0004',
        title: '自媒体运营交流会',
        userid: '001',
        username: '喜经纬',
        avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1587232648358&di=be05446226b9dab4aaaf9df0da0e9ba2&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F670f66ab45ec7e1f8243c08315e2f55c17dd9e7b8007-BpNoh5_fw658',
        img: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=4224314812,3295550068&fm=26&gp=0.jpg',
        time: '2020-04-18',
        location: '上海'
      }
    ]
    let eventList = this.data.eventListData.list;
    const updatedList = eventList.concat(newEventList)

    this.setData({
      ['eventListData.list']: updatedList
    })
  }

})