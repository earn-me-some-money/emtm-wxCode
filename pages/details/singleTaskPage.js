// pages/details/singleTaskPage.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    hidden_rcv: true, // 是否隐藏弹出的接受任务窗口
    hidden_finish: true, // 是否隐藏完成任务的窗口
    
    can_do: false,  // 为true，代表是委派页面进入，为false，代表是从首页进入
    can_rcv: false, // 是否可以接受任务
    can_finish: true,// 是否可以点击完成任务
    vertify_mode: 0,

    taskId: 1,
    provider: "蔡倓",
    providerId: 552378875,
    task_state: false,
    status: "已截止",
    task_user_state: 1,
    finish: "已完成",
    taskName: "去图书馆取快递",
    taskInfo: "123456",
    taskPay: "20.0",
    ddl: "2018-9-10",
    mingrade: "大一",
    maxgrade: "大四",
    major: "文史哲",
    experience: 3,
    credit: 95,
    maxNum: 30,

    type: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    var para = {
      "userid": app.globalData.openid,
      "poster_id": query.para.poster_id,
      "task_mid": query.para.mid
    }
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
          _this.setData({
            taskId: res.data.mid,
            provider: res.data.poster_name,
            providerId: res.data.poster_id,
            task_state: res.data.task_state,
            task_user_state: res.data.task_user_state,
            taskName: res.data.task_name,
            taskInfo: res.data.task_intro,
            vertify_mode: res.data.task_mode,
            taskPay: res.data.task_pay,
            ddl: res.data.task_time_limit.slice(0, 10) + " " +
              res.data.task_time_limit.slice(11, 13) + ":" + res.data.task_time_limit.slice(14, 16),
          })
          if (res.data.task_request) {
            _this.setData({
              type: false,
              mingrade: res.data.task_request.min_grade,
              maxgrade: res.data.task_request.max_grade,
              major: res.data.task_request.major,
              experience: res.data.task_request.task_expe,
              credit: res.data.task_request.credit_score,
              maxNum: res.data.task_request.max_participants
            })
          }
          else {
            _this.setData({
              type: true
            })
          }
          if (_this.data.task_state) {
            _this.setData({
              status: "进行中",
              can_rcv: true
            })
          }
          else {
            _this.setData({
              status: "已结束",
              can_finish: false
            })
          }
          switch (_this.data.task_user_state) {
            case 0:
              _this.setData({
                finish: "已发布"
              })
              break;
            case 1:
              _this.setData({
                finish: "已完成",
                can_do: true,
                can_finish: false
              })
              break;
            case 2:
              _this.setData({
                finish: "未完成",
                can_do: true,
                can_finish: true
              })
              break;
            case 3:
              _this.setData({
                finish: "未接受",
                can_rcv: true
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
  },

  rcvTask: function() {
    this.setData({
      hidden_rcv: false
    })
  },

  cancel_rcv: function() {
    this.setData({
      hidden_rcv: true
    })
  },

  confirm_rcv: function() {
    var para = {
      "userid": app.globalData.openid,
      "poster_id": query.para.poster_id,
      "task_mid": query.para.mid
    }
    var _this = this
    wx.request({
      url: app.globalData.serpath + 'task/receive',
      data: para,
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success: function (res) {
        if (res.data.code) {
          this.setData({
            hidden_rcv: true
          })
          wx.showModal({
            title: '发布成功',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack()
              }
            }
          })
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
  },

  moreInfo: function() {
    
    if (this.data.vertify_mode == 0) {
      wx.navigateTo({
        url: 'moreInfo/surveyPage',
      })
    }
    else if (this.data.vertify_mode == 1) {
      wx.navigateTo({
        url: 'moreInfo/tradePage',
      })
    }
    else if (this.data.vertify_mode == 2) {
      wx.navigateTo({
        url: 'moreInfo/packagePage',
      })
    }
  },

  finishTask: function() {
    this.setData({
      hidden_finish: false
    })
  },

  cancel_finish: function () {
    this.setData({
      hidden_finish: true
    })
  },

  confirm_finish: function () {
    this.setData({
      hidden_finish: true
    })
  }
})