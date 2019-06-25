// pages/details/moreInfo/surveyPage.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    username: "?",

    answers: [],
    questions: [],

    show: [
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    wx.setNavigationBarTitle({
      title: '问卷详情',
    })

    this.setData({
      username: JSON.parse(query.para).user_names
    })

    var para = {
      "task_mid": JSON.parse(query.para).task_mid,
      "userid": app.globalData.openid,
      "poster_id": JSON.parse(query.para).poster_id
    }

    console.log(para)
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
          _this.setData({
            questions: res.data.questions
          })
          var para = {
            "task_mid": JSON.parse(query.para).task_mid,
            "userid": app.globalData.openid,
            "student_id": JSON.parse(query.para).student_id
          }
          console.log(para)
          wx.request({
            url: app.globalData.serpath + 'task/question-naire-answer',
            data: para,
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              console.log(res.data)
              if (res.data.code) {
                _this.setData({
                  answers: res.data.answers
                })
                var t = []
                var q = _this.data.questions
                var a = _this.data.answers
                for (var i = 0; i < a.length; i++) {
                  var o = {}
                  o.type = a[i].q_type
                  o.id = a[i].order + 1
                  o.title = a[i].content
                  if (o.type == 0) {
                    o.res = a[i].answer
                  }
                  else {
                    o.choice = []
                    for (var j = 0; j < q[i].choices.length; j++) {
                      var c = {}
                      c.index = j
                      c.title = q[i].choices[j]
                      o.choice.push(c)
                    }
                    for (var j = 0; j < a[i].choices.length; j++) {
                      console.log(a[i].choices[j])
                      o.choice[a[i].choices[j]].check = true
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

})
