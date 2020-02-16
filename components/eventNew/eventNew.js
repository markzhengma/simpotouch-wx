// components/eventNew/eventNew.js
Component({
  /**
   * Component properties
   */
  properties: {
    date: {
      type: String,
      value: ''
    }
  },

  /**
   * Component initial data
   */
  data: {
    newEvent: {
      title: '',
      tags: [1,2,3],
      location: '',
      start_date: '',
      end_date: '',
      start_time: '',
      end_time: '',
      total_attend: '',
      info: ''
    }
  },

  /**
   * Component methods
   */
  methods: {
    onNewEventInput: function(e) {
      this.setData({
        [`newEvent.${e.currentTarget.id}`]: e.detail.value
      });
    },
    submitNewEvent: function() {
      console.log(this.data.newEvent)
    }
  }
})
