var app = getApp();
Page({
  para: null,
  data: {
    phone: '',
    password: '',

    type: 1,  // 0代表学生，1代表奶牛
    hidden_notation: true
  },

  onLoad: function (e) {
    this.setData({
      para: JSON.parse(e.para)
    })
    console.log(this.data.para)
  },

  login: function() {
    this.setData({
      hidden_notation: false
    })
  },

  cancel_rcv: function() {
    this.setData({
      hidden_notation: true
    })
  },

  confirm_rcv: function () {
    this.setData({
      hidden_notation: true
    })
  }
})