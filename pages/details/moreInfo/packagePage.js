// pages/details/moreInfo/packagePage.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    providerName: "?",
    providerTel: "?",
    providerAddress: "?",

    target_address: "?",
    pick_number: "?",
    other_info: "?"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var para = JSON.parse(options.para)
    console.log(para)
    this.setData({
      providerName: para.providerName
    })
    var para = {
      "task_mid": Number(para.task_mid),
      "userid": app.globalData.openid,
      "poster_id": Number(para.poster_id)
    }

    var _this = this
    wx.request({
      url: app.globalData.serpath + 'errand',
      data: para,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.code) {
          _this.setData({
            providerTel: res.data.phone_number,
            providerAddress: res.data.deliver_address,
            target_address: res.data.pickup_address,
            pick_number: res.data.pick_number,
            other_info: res.data.info
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