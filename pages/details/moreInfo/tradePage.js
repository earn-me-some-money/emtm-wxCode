// pages/details/moreInfo/tradePage.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: "?",
    info: "?",
    loss: "?",
    address: "?"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var para = JSON.parse(options.para)
    console.log(para)
    var para = {
      "task_mid": Number(para.task_mid),
      "userid": app.globalData.openid,
      "poster_id": Number(para.poster_id)
    }

    var _this = this
    wx.request({
      url: app.globalData.serpath + 'transaction',
      data: para,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.code) {
          _this.setData({
            type: res.data.t_type,
            info: res.data.info,
            loss: res.data.loss,
            address: res.data.address,
          })
          wx.hideLoading()
        }
        else {
          wx.hideLoading()
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