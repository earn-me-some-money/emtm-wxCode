var app = getApp();
Page({
  data: {
    phone: '',
    password: '',

    type: 1,  // 0代表学生，1代表奶牛
    hidden_notation: true
  },

  onLoad: function () {
  
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