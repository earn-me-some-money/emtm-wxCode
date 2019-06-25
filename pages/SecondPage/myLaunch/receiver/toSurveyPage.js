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
      { type: 0, id: 1, title: "今天吃了什么水果？", res: "啊哈哈哈哈" },
      { type: 1, id: 2, title: "今天吃了什么水果？", choice: [{ index: 'A', title: "西瓜", check: true }, { index: 'B', title: "西瓜" }, { index: 'C', title: "西瓜" }, { index: 'D', title: "西瓜" }, { index: 'D', title: "西瓜" }, { index: 'D', title: "西瓜" }, { index: 'D', title: "西瓜" }] },
      { type: 0, id: 3, title: "今天吃了什么水果？", choice: [{ index: 'A', title: "西瓜" }, { index: 'B', title: "西瓜" }, { index: 'C', title: "西瓜" }] },
      { type: 2, id: 3, title: "今天吃了什么水果？", choice: [{ index: 'A', title: "西瓜" }, { index: 'B', title: "西瓜", check: true }, { index: 'C', title: "西瓜" }, { index: 'D', title: "西瓜" }, { index: 'E', title: "西瓜", check: true }] }
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
                var q = _this.data.questions
                var a = _this.data.answers
                for (var i = 0; i < a.length; i ++) {
                  var o = {}
                  o.type = a[i].q_type
                  o.id = a[i].order + 1
                  o.title = a[i].content
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