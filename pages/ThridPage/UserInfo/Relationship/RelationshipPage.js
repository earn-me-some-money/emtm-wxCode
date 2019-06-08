// pages/ThridPage/UserInfo/Relationship/RelationshipPage.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      bt1Color: "black",
      bt2Color: "gray",

      infoList: [{ pic_url: "http://img1.imgtn.bdimg.com/it/u=1739733360,1788222103&fm=26&gp=0.jpg", groupname: "宿谢交流群", unread: "4", lastRcv: "没水了室长记得订水", isRead: "true", lastTime: "18:40"},
        { pic_url: "http://img1.imgtn.bdimg.com/it/u=1739733360,1788222103&fm=26&gp=0.jpg", groupname: "宿谢交流群", unread: "4", lastRcv: "没水了室长记得订水", isRead: "true", lastTime: "昨天" }],

      groupList: [
        { pic_url: "http://img1.imgtn.bdimg.com/it/u=1739733360,1788222103&fm=26&gp=0.jpg", name: "宿谢交流群", size: "4"},
        { pic_url: "http://img1.imgtn.bdimg.com/it/u=1739733360,1788222103&fm=26&gp=0.jpg", name: "三月义卖买家卖家咨询群", size: "20" }],

      select: false
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

  btclick1: function () {

    this.setData({
      bt1Color: "black",
      bt2Color: "gray",
      bt3Color: "gray",

      select: false,
    })

  },

  btclick2: function () {
    this.setData({
      bt1Color: "gray",
      bt2Color: "black",
      bt3Color: "gray",

      select: true
    })
  }
})