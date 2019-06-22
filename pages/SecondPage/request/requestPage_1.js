// pages/SecondPage/request/requestPage_1.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    para: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    wx.setNavigationBarTitle({
      title: '接 收 人 要 求',
    })
    this.setData({
      para: JSON.parse(query.para)
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

  },

  nextStep: function () {
    console.log(this.data.para.selectType);

    switch (Number(this.data.para.selectType)) {
      case 0:
        wx.navigateTo({
          url: 'survey',
        })
      case 1:
        wx.navigateTo({
          url: 'trade',
        })
      case 2:
        wx.navigateTo({
          url: 'package',
        })
    }
  }
})