const formatTime = (date) => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = (n) => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const request =  (url, header, data, method, callback) => {
  wx.request({
    url: url,
    method: method,
    data: data,
    header: header,
    success:  (res) => {
      callback(res.data);
    },
    fail:  (err) => {
      console.log(err);
    }
  });
}

const formatDate = (date) => {
  const paramsDate = new Date(date)
  const year = paramsDate.getFullYear();
  const month = paramsDate.getMonth() === 12 ? 1 : paramsDate.getMonth() + 1;
  const day = paramsDate.getDate();
  return [year, month, day].map(formatNumber).join('-');
}

module.exports = {
  formatTime: formatTime,
  request: request,
  formatDate: formatDate,
  formatNumber: formatNumber
}
