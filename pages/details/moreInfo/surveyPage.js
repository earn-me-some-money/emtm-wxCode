// pages/details/moreInfo/surveyPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    questions: [
      { type: 0, id: 1, title: "今天吃了什么水果？", chocie1: "西瓜", chocie2: "桃子", chocie3: "苹果", chocie4: "香蕉" },
      { type: 1, id: 2, title: "今天吃了什么水果？", chocie1: "西瓜西瓜西西瓜", chocie2: "桃子西瓜西瓜", chocie3: "苹果", chocie4: "香蕉" },
      { type: 0, id: 3, title: "今天吃了什么水果？", chocie1: "西瓜", chocie2: "桃子", chocie3: "苹果", chocie4: "香蕉" },
      { type: 2, id: 3, title: "今天吃了什么水果？", chocie1: "西瓜", chocie2: "桃子", chocie3: "苹果", chocie4: "香蕉" }
    ],

    finish_num: 12,
    total_num: 44
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '问卷详情',
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