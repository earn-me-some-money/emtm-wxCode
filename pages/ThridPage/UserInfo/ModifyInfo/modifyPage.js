// pages/details/singleTaskPage.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '123',
    email: '123',
    tel: '123',
    info: '123',

    is_identifier: true,
    userType: 1,  // 1代表学生， 2代表奶牛

    major: '123',
    grade: '123',
    credit: '123',
    finish_task: '123',
    launch_task: '123',

    is_modify: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
 
  },

  modify: function() {
    this.setData({
      is_modify: true
    })
  },

  cancel_modify: function () {
    this.setData({
      is_modify: false
    })
  },

  confirm_modify: function() {

  }

})