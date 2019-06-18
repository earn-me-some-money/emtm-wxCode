// pages/OrdersPage/OrdersPage.js
var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
      bt1Color: "black",
      bt2Color: "gray",
      bt3Color: "gray",
      select: true,

      rev_task: [
      ],

      launch_task: [
      ]

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
     this.setData({
       select: false
     })
      this.load_rec()
      this.load_lau()
    },

    // 加载我的接受
    load_rec: function() {
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

    // 加载我的发布
    load_lau: function() {
      var _this = this
      wx.request({
        url: app.globalData.serpath + 'check_task_self_release',
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
              launch_task: res.data.tasks
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

    fullfill: function(res) {
      for (var i = 0; i < res.data.tasks.length; i++) {
        var x = res.data.tasks[i]
        switch (x.task_mode) {
          case 0:
            x["type"] = "问卷调查类"
            break;
          case 1:
            x["type"] = "闲置交易类"
            break;
          case 2:
            x["type"] = "取件寄件类"
            break;
          default:
            break
        }
        if (x.task_state) {
          x["state"] = "进行中"
        }
        else {
          x["state"] = "已截止"
        }
        x.task_time_limit = x.task_time_limit.slice(0, 10) + " " +
          x.task_time_limit.slice(11, 13) + ":" + x.task_time_limit.slice(14, 16)
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

    btclick1:function() {

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
    },

    createOrder: function() {
      wx.navigateTo({
        url: 'newOrder/newOrderPage',
      })
    }
})