const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const request = (url, data, method, callback) => {
  wx.request({
    url: url,
    method: method,
    data: data,
    header: {
      "Content-type": "application/json"
    },
    success: function (res) {
      callback(res.data);
    },
    fail: function (err) {
      console.log(err);
    }
  });
}

module.exports = {
  formatTime: formatTime,
  request: request
}
