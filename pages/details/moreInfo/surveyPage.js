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
    finish_num: 12,
    total_num: 44
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
          for (var i = 0; i < q.length; i++) {
            var o = {}
            o.type = q[i].q_type
            o.id = q[i].order + 1
            o.title = q[i].content
            if (o.type == 0) {
              o.res = ''
            }
            else {
              o.choice = []
              for (var j = 0; j < q[i].choices.length; j++) {
                var c = {}
                c.index = j
                c.title = q[i].choices[j]
                o.choice.push(c)
              }
            }
            t.push(o)
          }
          _this.setData({
            show: t
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

  answerInput: function (e) {
    console.log(e)
  },

  typeChange: function (e) {
    var s = e.detail.value
    s = s.split(' ')
    console.log(e.detail.value)
  },

  typeChange2: function (e) {
    console.log(e.detail.value)
  },
  
  selected: function(e) {
    this.setData({
      id_clicked: e.currentTarget.dataset.bean.id
    })
  }

})