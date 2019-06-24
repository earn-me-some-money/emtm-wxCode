// pages/details/singleTaskPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

    hidden_rcv: true, // 是否隐藏弹出的接受任务窗口
    hidden_finish: true, // 是否隐藏完成任务的窗口

    can_do: true,  // 为true，代表是委派页面进入，为false，代表是从首页进入
    can_finish: true,// 是否可以点击完成任务
    vertify_mode: 1,

    taskId: "0001",
    provider: "蔡倓",
    providerId: "552378875",
    status: "已截止",
    finish: "已完成",
    taskName: "去图书馆取快递",
    taskInfo: "123456",
    taskType: "1",
    taskPay: "20.0",
    ddl: "2018-9-10",
    mingrade: "大一",
    maxgrade: "大四",
    major: "文史哲",
    experience: 3,
    credit: 95,
    maxNum: 30

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  rcvTask: function () {
    this.setData({
      hidden_rcv: false
    })
  },

  cancel_rcv: function () {
    this.setData({
      hidden_rcv: true
    })
  },

  confirm_rcv: function () {
    this.setData({
      hidden_rcv: true
    })
  },

  moreInfo: function () {

    if (this.data.vertify_mode == 0) {
      wx.navigateTo({
        url: 'receiver/receiverPage',
      })
    }
    else if (this.data.vertify_mode == 1) {
      wx.navigateTo({
        url: 'receiver/receiverPage',
      })
    }
    else if (this.data.vertify_mode == 2) {
      wx.navigateTo({
        url: 'receiver/receiverPage',
      })
    }


  },

  finishTask: function () {
    this.setData({
      hidden_finish: false
    })
  },

  cancel_finish: function () {
    this.setData({
      hidden_finish: true
    })
  },

  confirm_finish: function () {
    this.setData({
      hidden_finish: true
    })
  }
})