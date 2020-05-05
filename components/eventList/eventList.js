const app = getApp();
Component({
  /**
   * Component properties
   */
  properties: {
    eventListData: {
      type: Object
    }
  },

  observers: {
    'eventListData': function(eventListData) {
      this.setData({
        eventList: eventListData.list || [],
        updateTime: eventListData.update_time || ''
      })
    }
  },

  /**
   * Component initial data
   */
  data: {
    eventList: [],
    updateTime: ''
  },

  ready: function() {
    this.setEventList();
  },

  /**
   * Component methods
   */
  methods: {
    setEventList: function() {
      const eventList = this.data.eventListData.list;
      const updateTime = this.data.eventListData.update_time.toString();
      this.setData({
        eventList,
        updateTime
      })
    },
    selectEvent: function(e) {
      const id = e.currentTarget.dataset.eventId;
      console.log(id)
      app.goToEventPage(id);
      
    }
  }
})
