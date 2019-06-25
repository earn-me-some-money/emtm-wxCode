// pages/FirstPage/singleType/singleTypePage.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    type: null,
    itemList: [
    ]
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    switch (Number(query.type)) {
      case 0:
        this.setData({
          type: "问 卷 调 查"
        })
        break;
      case 1:
        this.setData({
          type: "闲 置 交 易"
        })
        break;
      case 2:
        this.setData({
          type: "帮 忙 取 件"
        })
        break;
    }
    var _this = this
    wx.request({
      url: app.globalData.serpath + 'task/type',
      data: {
        "task_type": Number(query.type)
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.code) {
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
              x["state"] = "已截至"
            }
            x.ddl = x.task_time_limit.slice(5, 10)
          }
          _this.setData({
            itemList: res.data.tasks
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

  toSingleTask: function (e) {
    var para = {
      mid: e.currentTarget.dataset.bean.mid,
      poster_id: e.currentTarget.dataset.bean.poster_id
    }
    wx.navigateTo({
      url: '../../details/singleTaskPage?para=' + JSON.stringify(para)
    })
  }
})