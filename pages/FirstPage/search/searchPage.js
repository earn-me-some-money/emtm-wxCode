// pages/FirstPage/search/searchPage.js

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    kw: null,
    rev_task: [
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      kw: options.kw
    })
    this.load_search()
    wx.setNavigationBarTitle({
      title: '搜 索 列 表',
    }) 
  },

  // 导入搜索列表
  load_search: function () {
    var _this = this
    wx.request({
      url: app.globalData.serpath + 'task/search',
      data: {
        "keyword": this.data.kw
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.code) {
          _this.fullfill(res)
          _this.setData({
            rev_task: res.data.search_result
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

  fullfill: function (res) {
    for (var i = 0; i < res.data.search_result.length; i++) {
      var x = res.data.search_result[i]
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
      x.providerTime = x.task_time_limit.slice(0, 10) + " " +
        x.task_time_limit.slice(11, 13) + ":" + x.task_time_limit.slice(14, 16)
    }
    res.data.search_result.sort(function(a, b){
      return b.score - a.score
    })
  },


  toSingleTask: function(e) {
    var para = {
      mid: e.currentTarget.dataset.bean.mid,
      poster_id: e.currentTarget.dataset.bean.poster_id
    }
    wx.navigateTo({
      url: '../../details/singleTaskPage?para=' + JSON.stringify(para)
    })
  }
})