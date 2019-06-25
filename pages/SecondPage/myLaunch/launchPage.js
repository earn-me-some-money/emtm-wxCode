// pages/details/singleTaskPage.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    hidden_rcv: true, // 是否隐藏弹出的接受任务窗口
    hidden_finish: true, // 是否隐藏完成任务的窗口

    can_do: true,  // 为true，代表是委派页面进入，为false，代表是从首页进入
    can_finish: true,// 是否可以点击完成任务
    vertify_mode: 1,

    taskId: 1,
    provider: "？",
    providerId: 1,
    task_state: false,
    status: "?",
    task_user_state: 1,
    finish: "?",
    taskName: "?",
    taskInfo: "?",
    taskPay: "?",
    ddl: "?",
    mingrade: "?",
    maxgrade: "?",
    major: "?",
    experience: 999,
    credit: 999,
    maxNum: 999,
    student_id: null,
    type: false

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    var para = {
      "userid": app.globalData.openid,
      "poster_id": JSON.parse(query.para).poster_id,
      "task_mid": JSON.parse(query.para).mid
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
              type: true,
              student_id: res.data.accept_users.accept_user_id[0]
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
            })
          }
          switch (_this.data.task_user_state) {
            case 0:
              _this.setData({
                finish: "已发布",
                can_do: true
              })
              break;
            case 1:
              _this.setData({
                finish: "已完成",
              })
              break;
            case 2:
              _this.setData({
                finish: "未完成",
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
          wx.showToast({
            title: res.data.err_message,
            icon: "none"
          })
        }
      }
    })
  },

  rcvTask: function () {
    this.finishTask()
  },

  cancel_rcv: function () {
    this.setData({
      hidden_rcv: true
    })
  },

  confirm_rcv: function () {
    this.setData({
      hidden_rcv: true
    })
  },

  moreInfo: function () {
    var para = {
      "poster_id": this.data.providerId,
      "task_mid": this.data.taskId
    }
    wx.navigateTo({
      url: 'receiver/receiverPage?para=' + JSON.stringify(para)
    })
  },

  finishTask: function () {
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
    var para = {
      "userid": app.globalData.openid, //只有是当前任务发布者才可以确认完成
      "student_id": Number(student_id),
      "task_mid": Number(taskId)
    }
    var _this = this
    wx.request({
      url: app.globalData.serpath + 'task/submit',
      data: para,
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: "POST",
      success: function (res) {
        console.log(res.data)
        if (res.data.code) {
          this.setData({
            hidden_finish: true
          })
          wx.showModal({
            title: '查收成功',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack()
              }
            }
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
  }
})