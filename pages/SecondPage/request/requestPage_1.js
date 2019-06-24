// pages/SecondPage/request/requestPage_1.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    para: null,
    min_grade: null,
    max_grade: null,
    major: null,
    task_expe: null,
    credit_score: null,
    max_participants: null,
    task_risk: null,
    mid: 10,
    type: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    wx.setNavigationBarTitle({
      title: '接 收 人 要 求',
    })
    this.setData({
      para: JSON.parse(query.para),
      type: app.globalData.mode
    })
  },

  min_gradeInput: function (e) {
    this.setData({
      min_grade: e.detail.value
    })
  },

  max_gradeInput: function (e) {
    this.setData({
      max_grade: e.detail.value
    })
  },

  majorInput: function (e) {
    this.setData({
      major: e.detail.value
    })
  },

  task_expeInput: function (e) {
    this.setData({
      task_expe: e.detail.value
    })
  },

  credit_scoreInput: function (e) {
    this.setData({
      credit_score: e.detail.value
    })
  },

  task_riskInput: function (e) {
    this.setData({
      task_risk: e.detail.value
    })
  },

  max_participantsInput: function (e) {
    this.setData({
      max_participants: e.detail.value
    })
  },

  nextStep: function () {
    var test = app.globalData.test
    if (test) {
      if (!this.data.min_grade && this.data.type != 1) {
        wx.showToast({
          title: '请输入最低年级要求！',
          icon: "none"
        })
        return
      }
      if (!this.data.max_grade && this.data.type != 1) {
        wx.showToast({
          title: '请输入最高年级要求！',
          icon: "none"
        })
        return
      }
      if (!this.data.major && this.data.type != 1) {
        wx.showToast({
          title: '请输入专业要求！',
          icon: "none"
        })
        return
      }
      if (!this.data.task_expe && this.data.type != 1) {
        wx.showToast({
          title: '请输入任务经验下限！',
          icon: "none"
        })
        return
      }
      if (!this.data.credit_score && this.data.type != 1) {
        wx.showToast({
          title: '请输入信誉积分下限！',
          icon: "none"
        })
        return
      }
      if (!this.data.task_risk) {
        wx.showToast({
          title: '请输入任务失败扣分！',
          icon: "none"
        })
        return
      }
      if (!this.data.max_participants && this.data.type != 1) {
        wx.showToast({
          title: '请输入最大参与人数！',
          icon: "none"
        })
        return
      }
      if (this.data.type != 1 && this.data.min_grade > this.data.max_grade) {
        wx.showToast({
          title: '最低年级要求不得大于最高年级要求！',
          icon: "none"
        })
        return
      }
    }

    var para = {
      "userid": app.globalData.openid,
      "task_name": this.data.para.task_name,
      "task_intro": this.data.para.task_intro,
      "task_mode": Number(this.data.para.task_mode),
      "task_request": {
        "min_grade": Number(this.data.min_grade),
        "max_grade": Number(this.data.max_grade),
        "major": this.data.major,
        "task_expe": Number(this.data.task_expe),
        "credit_score": Number(this.data.credit_score),
        "max_participants": Number(this.data.max_participants)
      },
      "task_risk": Number(this.data.task_risk),
      "task_pay": Number(this.data.para.task_pay),
      "task_time_limit": this.data.para.task_time_limit,
    }
    wx.showLoading({ title: "新建任务中..." })
    var _this = this
    wx.request({
      url: app.globalData.serpath + 'task/release',
      data: para,
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success: function (res) {
        if (res.data.code) {
          _this.setData({
            mid: res.data.mid
          })
          wx.hideLoading()
          switch (Number(_this.data.para.task_mode)) {
            case 0:
              wx.navigateTo({
                url: 'survey?mid=' + res.data.mid,
              })
              break;
            case 1:
              wx.navigateTo({
                url: 'trade?mid=' + res.data.mid,
              })
              break;
            case 2:
              wx.navigateTo({
                url: 'package?mid=' + res.data.mid,
              })
              break;
          }
        }
        else {
          wx.hideLoading()
          wx.showToast({
            title: res.data.err_message,
            icon: "none"
          })
        }
      }
    })
    
  }
})