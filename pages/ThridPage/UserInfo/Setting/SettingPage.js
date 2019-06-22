// pages/ThridPage/UserInfo/Setting/SettingPage.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

      isVertify: false,

      vertify_mode: 1,

      url: "../../../../images/加号.png",

      /*notation1: ["输 入 学 号", "输 入 真 实 名 字"],

      notation2: ["学 校 名 称", "企 业 或 组 织 名 称"]*/

      notation1: "输 入 学 号",

      notation2: "学 校 名 称",

      buttonText: "认 证"

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      wx.setNavigationBarTitle({
        title: '我 的 认 证',
      })

      // 已认证
      if (isVertify) {
        this.setData({
          buttonText: "已 认 证"
        })
      }

      // 未认证
      else {
        this.setData({
          buttonText: "认 证"
        })
      }

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

    typeChange: function(e) {
      if (e.detail.value == 'student') {
        this.setData({
          vertify_mode: 1,
          notation1: "输 入 学 号",
          notation2: "学 校 名 称"
        })
      }
      else if (e.detail.value == 'milk') {
        this.setData({
          vertify_mode: 2,
          notation1: "输 入 真 实 姓 名",
          notation2: "输 入 机 构 名 称"
        })
      }
    }
})