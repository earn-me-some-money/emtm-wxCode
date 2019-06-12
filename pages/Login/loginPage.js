var app = getApp();
Page({
  data: {
    phone: '',
    password: ''
  },

  onLoad: function () {
    wx.showLoading({ title: "加载中…" })
    app.getinfo()
    wx.hideLoading()
    wx.switchTab({
      url: '../FirstPage/enter',
    })
  }
})