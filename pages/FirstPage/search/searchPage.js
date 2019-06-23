// pages/FirstPage/search/searchPage.js

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    rev_task: [
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.load_search()

    wx.setNavigationBarTitle({
      title: '搜 索 列 表',
    }) 
  },

  // 导入搜索列表
  load_search: function () {
    var _this = this
    wx.request({
      url: app.globalData.serpath + 'check_task_self_receive',
      data: {
        "userid": app.globalData.openid
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.code) {
          _this.fullfill(res)
          _this.setData({
            rev_task: res.data.tasks
          })
        }
        else {
          wx.showToast({
            title: res.data.err_message,
            icon: "none"
          })
        }
      }
    })
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

  }
})