// pages/FirstPage/singleType/singleTypePage.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemList: [
    ]
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    console.log(query.type)
    var _this = this
    wx.request({
      url: app.globalData.serpath + 'get_tasks',
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

  }
})