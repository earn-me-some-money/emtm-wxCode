// pages/SecondPage/myLaunch/receiver/receiverPage.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    isSurvey: false,

    accept_users: [],
    finish_users: [],
    task_mid: 1,
    finish: 99,
    total: 99
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    var para = {
      "userid": app.globalData.openid,
      "poster_id": JSON.parse(query.para).poster_id,
      "task_mid": JSON.parse(query.para).task_mid
    }
    this.setData({
      task_mid: para.task_mid,
      poster_id: para.poster_id
    })
    console.log(para)
    var _this = this
    wx.request({
      url: app.globalData.serpath + 'task/specific',
      data: para,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.code) {
          var ac = []
          var ri = []
          for (var i = 0; i < res.data.accept_users.accept_user_num; i ++) {
            var o = {}
            o.accept_user_id = res.data.accept_users.accept_user_id[i]
            o.accept_user_names = res.data.accept_users.accept_user_names[i]
            ac.push(o)
          }
          for (var i = 0; i < res.data.finish_users.finish_user_num; i++) {
            var o = {}
            o.finish_user_id = res.data.finish_users.finish_user_id[i]
            o.finish_user_names = res.data.finish_users.finish_user_names[i]
            ri.push(o)
          }
          console.log(ac)
          _this.setData({
            accept_users: ac,
            finish_users: ri,
            isSurvey: (res.data.task_mode == 0),
            total: res.data.accept_users.accept_user_num,
            finish: res.data.finish_users.finish_user_num
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

  toSurvey: function(e) {
    if (this.data.isSurvey) {
      var flag = false
      for (var i = 0; i < this.data.finish_users.length; i ++) {
        if (Number(e.currentTarget.dataset.bean.accept_user_id) == Number(this.data.finish_users[i].finish_user_id)) {
          flag = true
          break
        }
      }
      if (!flag) {
        wx.showToast({
          title: "该用户未完成",
          icon: "none"
        })
        return
      }
      var para = {
        student_id: e.currentTarget.dataset.bean.accept_user_id,
        user_names: e.currentTarget.dataset.bean.accept_user_names,
        task_mid: this.data.task_mid,
        poster_id: this.data.poster_id
      }
      wx.navigateTo({
        url: 'toSurveyPage?para=' + JSON.stringify(para)
      })
    }

  }
})