// components/announcement/announcement.js
Component({
  /**
   * Component properties
   */
  properties: {
    annData: {
      type: Object
    }
  },

  /**
   * Component initial data
   */
  data: {
    announcement: ''
  },

  ready: function() {
    this.setAnnData()
  },

  /**
   * Component methods
   */
  methods: {
    setAnnData: function() {
      const text = this.data.annData.text;
      console.log(text)
      this.setData({
        announcement: text
      })
    }
  }
})
