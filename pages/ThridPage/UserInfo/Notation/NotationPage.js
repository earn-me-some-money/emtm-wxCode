// pages/ThridPage/UserInfo/Notation/NotationPage.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      infoList: [{ pic_url: "http://img1.imgtn.bdimg.com/it/u=1739733360,1788222103&fm=26&gp=0.jpg", groupname: "宿谢交流群", unread: "4", lastRcv: "没水了室长记得订水", isRead: "true", lastTime: "18:40" },
      { pic_url: "http://img1.imgtn.bdimg.com/it/u=1739733360,1788222103&fm=26&gp=0.jpg", groupname: "宿谢交流群", unread: "4", lastRcv: "没水了室长记得订水", isRead: "true", lastTime: "昨天" }]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      wx.setNavigationBarTitle({
        title: '系 统 消 息',
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