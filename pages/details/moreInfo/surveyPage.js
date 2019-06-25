// pages/details/moreInfo/surveyPage.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    questions: [],
    answers: [],
    show: [
      { type: 0, id: 1, title: "今天吃了什么水果？", res: ""},
      { type: 1, id: 2, title: "今天吃了什么水果？", choice: [{ index: 'A', title: "西瓜", check: true }, { index: 'B', title: "西瓜" }, { index: 'C', title: "西瓜" }, { index: 'D', title: "西瓜" }, { index: 'D', title: "西瓜" }, { index: 'D', title: "西瓜" }, { index: 'D', title: "西瓜" } ] },
      { type: 0, id: 3, title: "今天吃了什么水果？", choice: [{ index: 'A', title: "西瓜" }, { index: 'B', title: "西瓜" }, { index: 'C', title: "西瓜" }] },
      { type: 2, id: 3, title: "今天吃了什么水果？", choice: [{ index: 'A', title: "西瓜" }, { index: 'B', title: "西瓜" }, { index: 'C', title: "西瓜" }, { index: 'D', title: "西瓜" }, { index: 'E', title: "西瓜" }] }
    ],
    // task_user_state为true则用户接受任务后未完成，其余为false
    task_user_state: false,
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
          for (var i = 0; i < q.length; i ++) {
            var obj = {}
            obj.type = q[i].q_type
            obj.id = q[i].order + 1
            obj.title = q[i].content
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

  answerInput: function (e) {
    console.log(e)
  },

  typeChange: function (e) {
    console.log(e)
  },

  typeChange2: function (e) {
    console.log(e)
  },
  
  selected: function(e) {
    this.setData({
      id_clicked: e.currentTarget.dataset.bean.id
    })

  }

})