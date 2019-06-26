// pages/details/moreInfo/surveyPage.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    questions: [],
    answers: [],
    show: [],
    // task_user_state为true则用户接受任务后未完成，其余为false
    task_user_state: true,
    id_clicked: 0,
    poster_id: null,
    task_mid: null,
    task_user_state: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    wx.setNavigationBarTitle({
      title: '问卷详情',
    })

    var para = {
      "userid": app.globalData.openid,
      "poster_id": JSON.parse(query.para).poster_id,
      "task_mid": JSON.parse(query.para).task_mid
    }

    this.setData({
      task_user_state: JSON.parse(query.para).task_user_state,
      poster_id: JSON.parse(query.para).poster_id,
      task_mid: JSON.parse(query.para).task_mid,
      task_user_state: JSON.parse(query.para).task_user_state
    })
    var _this = this
    wx.request({
      url: app.globalData.serpath + 'task/question-naire',
      data: para,
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        if (res.data.code) {
          var q = res.data.questions
          var t = []
          var t2 = []
          for (var i = 0; i < q.length; i++) {
            var o = {}
            var o2 = {}
            o.type = q[i].q_type
            o.id = q[i].order + 1
            o2.order = q[i].order
            o.title = q[i].content
            if (o.type == 0) {
              o.res = ''
              o2.answer = null
            }
            else {
              o.choice = []
              o2.choices = []
              for (var j = 0; j < q[i].choices.length; j++) {
                var c = {}
                c.index = j + 1
                c.title = q[i].choices[j]
                o.choice.push(c)
              }
            }
            t.push(o)
            t2.push(o2)
          }
          _this.setData({
            show: t,
            answers: t2
          })
          console.log(_this.data.answers)
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

  textChange: function (e) {
    var id = Number(e.currentTarget.id) - 1
    var tx = e.detail.value
    this.data.answers[id].answer = tx
    console.log(this.data.answers)
  },

  typeChange: function (e) {
    var id = Number(e.currentTarget.id) - 1
    var ch = [Number(e.detail.value[0]) - 1]
    this.data.answers[id].choices = ch
    console.log(this.data.answers)
  },

  typeChange2: function (e) {
    var s = e.detail.value
    var id = Number(e.currentTarget.id) - 1
    var ch = []
    for (var i = 0; i < s.length; i ++) {
      ch.push(Number(s[i]) - 1)
    }
    ch.sort()
    this.data.answers[id].choices = ch
    console.log(this.data.answers)
  },
  
  selected: function(e) {
    this.setData({
      id_clicked: e.currentTarget.dataset.bean.id
    })
  },

  onloadSurvey: function() {
    for (var i = 0; i < this.data.answers.length; i ++) {
      if (this.data.answers[i].choices) {
        if (this.data.answers[i].choices.length == 0) {
          var id = i + 1
          wx.showToast({
            title: "请选择第" + id +"题！",
            icon: "none"
          })
          return
        }
      }
      else {
        if (!this.data.answers[i].answer) {
          var id = i + 1
          wx.showToast({
            title: "请填写第" + id + "题！",
            icon: "none"
          })
          return
        }
      }
    }
    var _this = this
    var para = {
      "userid": app.globalData.openid,
      "poster_id": Number(_this.data.poster_id),
      "task_mid": Number(_this.data.task_mid),
      "answers": _this.data.answers
    }
    console.log(para)
    wx.showLoading({ title: "提交问卷中..." })
    wx.request({
      url: app.globalData.serpath + 'task/submit-stu',
      data: para,
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: "POST",
      success: function (res) {
        wx.hideLoading()
        if (res.data.code) {
          wx.showModal({
            title: '提交成功',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.navigateBack({
                  delta: 2
                })
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