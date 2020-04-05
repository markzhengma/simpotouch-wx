const util = require('../../utils/util.js');
const app = getApp()
const EventController = require('../../controllers/event');
const event = new EventController;
// components/eventNew/eventNew.js
Component({
  /**
   * Component properties
   */
  properties: {
    date: String
  },

  /**
   * Component initial data
   */
  data: {
    title: '',
    tagArr: [],
    location: '',
    date: '',
    start_time: '',
    end_time: '',
    total_attend: '',
    info: ''
  },
  /**
   * Component methods
   */
  methods: {
    selectTag: function(e) {
      const title = e.currentTarget.dataset.title;
      const id = e.currentTarget.dataset.value;
      let tagArr = this.data.tagArr;
      this.setData({
        tagArr: tagArr.concat({ title, id })
      });
      console.log(this.data.tagArr)
    },
    delTag: function(e) {
      const id = e.currentTarget.dataset.value;
      let index = 0;
      for(let i = 0; i < this.data.tagArr.length; i ++) {
        if(this.data.tagArr[i].id === id) {
          index = i;
        };
      };
      let tagArr = this.data.tagArr;
      tagArr.splice(index, 1);
      this.setData({
        tagArr: tagArr
      });
    },
    onNewEventInput: function(e) {
      const field = e.currentTarget.id
      this.setData({
        [field]: e.detail.value
      });
    },
    onTimeChange: function(e) {
      const time = e.detail.value;
      const field = e.currentTarget.id;
      this.setData({
        [field]: time
      })
    },
    submitNewEvent: function() {
      const tags = this.data.tagArr.map(tag => {
        return tag.id
      })
      const eventData = {
        userid: app.globalData.userAuth.uid,
        title: this.data.title,
        tags: tags,
        location: this.data.location,
        date: this.data.date,
        start_time: this.data.start_time,
        end_time: this.data.end_time,
        total_attend: parseInt(this.data.total_attend),
        curr_attend: 0,
        info: this.data.info
      };
      console.log(eventData)
      let createEventCallBack = (data) => {
        console.log(data);
        if(data && data.code === 200) {
          wx.showToast({
            title: `创建成功`,
            icon: 'success',
            duration: 1000
          })
        } else {
          wx.showToast({
            title: `活动创建失败`,
            icon: 'none',
            duration: 2000
          })
        }
      }
      event.createEvent(eventData, createEventCallBack)
    }
  }
})
