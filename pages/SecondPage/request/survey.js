// pages/SecondPage/request/survey.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

    have_choice: false,

    id: 0,
    mid: null,
    questions: [],
    selectType : 0,
    content: null,
    choices: [],
    choice1: null,
    choice2: null,
    choice3: null,
    choice4: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    console.log(query.para)
    // 从requestionPage_1跳转
    if (query.mid) {
      this.setData({
        mid: query.mid
      })
    }
    // 从上一题跳转
    else {
      var para = JSON.parse(query.para)
      this.setData({
        id: Number(para.id),
        mid: Number(para.mid),
        questions: para.questions
      })
      if (this.data.id < this.data.questions.length) {
        this.setData({
          selectType: Number(this.data.questions[this.data.id].q_type),
          content: this.data.questions[this.data.id].content,
        })
        if (this.data.selectType != 0) {
          this.setData({
            choices: this.data.questions[this.data.id].choices,
            have_choice: true
          })
          while (this.data.choices.length < 4) {
            this.data.choices.push(null)
          }
          this.setData({
            choice1: this.data.choices[0],
            choice2: this.data.choices[1],
            choice3: this.data.choices[2],
            choice4: this.data.choices[3]
          })
          this.setData({
            choices: []
          })
        }
      }
    }
  },

  typeChange: function (e) {
    if (e.detail.value == 'type1') {
      this.setData({
        selectType: 0,
        have_choice: false
      })
    }
    else if (e.detail.value == 'type2') {
      this.setData({
        selectType: 1,
        have_choice: true
      })
    }
    else if (e.detail.value == 'type3') {
      this.setData({
        selectType: 2,
        have_choice: true
      })
    }
  },

  contentInput: function(e) {
    this.setData({
      content: e.detail.value
    })
  },

  choice1: function(e) {
    this.setData({
      choice1: e.detail.value
    })
  },

  choice2: function (e) {
    this.setData({
      choice2: e.detail.value
    })
  },

  choice3: function (e) {
    this.setData({
      choice3: e.detail.value
    })
  },

  choice4: function (e) {
    this.setData({
      choice4: e.detail.value
    })
  },

  next: function () {
    this.save()
    this.check()
    var para = {
      id: this.data.id + 1,
      mid: this.data.mid,
      questions: this.data.questions
    }
    wx.redirectTo({
      url: 'survey?para=' + JSON.stringify(para),
    })
  },

  last: function () {
    this.save()
    this.check()
    if (this.data.id <= 0) {
      wx.showToast({
        title: '目前已是第一题！',
        icon: "none"
      })
      return
    }
    var para = {
      id: this.data.id - 1,
      mid: this.data.mid,
      questions: this.data.questions
    }
    wx.redirectTo({
      url: 'survey?para=' + JSON.stringify(para),
    })
  },

  finish: function () {
    this.save()
    this.check()
    wx.showLoading({ title: "发布任务中..." })
    var _this = this
    wx.request({
      url: app.globalData.serpath + 'task/release-question',
      data: {
        "mid": Number(_this.data.mid),
        "questions": _this.data.questions
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success: function (res) {
        if (res.data.code) {
          wx.hideLoading()
          wx.showModal({
            title: '发布成功',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '../../Login/loginPage',
                })
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

  save: function() {
    if (this.data.selectType == 0) {
      this.data.questions[this.data.id] = {
        "order": this.data.id,
        "q_type": this.data.selectType,
        "content": this.data.content,
      }
    }
    else {
      var i = 0
      if (this.data.choice1) {
        this.data.choices[i] = this.data.choice1
        i++
      }
      if (this.data.choice2) {
        this.data.choices[i] = this.data.choice2
        i++
      }
      if (this.data.choice3) {
        this.data.choices[i] = this.data.choice3
        i++
      }
      if (this.data.choice4) {
        this.data.choices[i] = this.data.choice4
        i++
      }
      this.data.questions[this.data.id] = {
        "order": this.data.id,
        "q_type": this.data.selectType,
        "content": this.data.content,
        "choices": this.data.choices
      }
    }
  },

  check: function() {
    var test = app.globalData.test
    if (test) {
      if (!this.data.content) {
        wx.showToast({
          title: '请输入题目！',
          icon: "none"
        })
        return false
      }
      if (this.data.selectType != 0 && this.data.choices.length < 2) {
        wx.showToast({
          title: '请输入至少两个选项！',
          icon: "none"
        })
        this.data.choices = []
        return false
      }
    }
  }

})