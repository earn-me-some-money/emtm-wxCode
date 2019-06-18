var app = getApp();
Page({
  data: {
    phone: '',
    password: ''
  },

  onLoad: function () {
    wx.showLoading({ title: "身份校验中…" })
    app.getinfo()
    wx.hideLoading()
    wx.switchTab({
      url: '../FirstPage/enter',
    })
  }
})