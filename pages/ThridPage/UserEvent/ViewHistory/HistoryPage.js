// pages/ThridPage/UserEvent/ViewHistory/HistoryPage.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      historyList: [
        { title: "到邮局领取顺丰快递", type: "取件寄件类", cost: "26.80元", provider: "中山大学", requires: "尽快送到邮局请务必做到谢谢", providerTime: "2019/7/1" },
        { title: "填写心理学测试问卷", type: "问卷调查类", cost: "20.0元", provider: "中山大学心理学系", requires: "请确保信息的真实可靠性", providerTime: "2019/6/15" },
        { title: "出售9成新羽毛球拍", type: "闲置交易类", cost: "80.0元", provider: "此岸云巅", requires: "不支持快递，请找时间面交", providerTime: "2019/6/19" }
      ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      wx.setNavigationBarTitle({
        title: '历 史 记 录',
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