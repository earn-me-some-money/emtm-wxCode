var app = getApp();
Page({
  data: {
    phone: '',
    password: ''
  },

  onLoad: function () {
    console.log("Load loginPage")
    wx.showLoading({ title: "身份校验中…" })
    app.getinfo()
  }
})