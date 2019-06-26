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
     
    },

    onShow: function (options) {
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
        url: app.globalData.serpath + 'task/self-receive',
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
        url: app.globalData.serpath + 'task/self-release',
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
        if (x.user_finish_state) {
          x["state"] = "已完成"
        }
        else {
          x["state"] = "未完成"
        }
        x.providerTime = x.task_time_limit.slice(0, 10) + " " +
          x.task_time_limit.slice(11, 13) + ":" + x.task_time_limit.slice(14, 16)
      }
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
      if (!app.globalData.test) {
        wx.navigateTo({
          url: 'newOrder/newOrderPage',
        })
        return
      }
      if (app.globalData.mode == 2) {
        wx.showToast({
          title: '请先注册！',
          icon: "none"
        })
      }
      else {
        wx.navigateTo({
          url: 'newOrder/newOrderPage',
        })
      }
    },

    toSingleTask: function (e) {
      var para = {
        mid: e.currentTarget.dataset.bean.mid,
        poster_id: e.currentTarget.dataset.bean.poster_id
      }
      wx.navigateTo({
        url: '../details/singleTaskPage?para=' + JSON.stringify(para)
      })
    },

    toSingleTaskOfLaunch: function(e) {
      var para = {
        mid: e.currentTarget.dataset.bean.mid,
        poster_id: e.currentTarget.dataset.bean.poster_id
      }
      wx.navigateTo({
        url: 'myLaunch/launchPage?para=' + JSON.stringify(para)
      })
    }
})