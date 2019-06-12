// pages/ThridPage/UserInfo/Wallet/WalletPage.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      hidden_drawback: true,
      hidden_refill: true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      wx.setNavigationBarTitle({
        title: '我 的 钱 包',
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

    drawback:function() {
      this.setData({
        hidden_drawback: false
      })
    },

    refill:function() {
      this.setData({
        hidden_refill: false
      })
    },

    confirm_drawback: function() {
      this.setData({
        hidden_drawback: true
      })

      wx.showToast({
        title: '提现成功！',
      })
    },

    cancel_drawback: function() {
      this.setData({
        hidden_drawback: true
      })
    },

    confirm_refill: function () {
      this.setData({
        hidden_refill: true
      })

      wx.showToast({
        title: '充值成功！',
      })
    },

    cancel_refill: function () {
      this.setData({
        hidden_refill: true
      })
    }
})