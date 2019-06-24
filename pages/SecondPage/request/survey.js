// pages/SecondPage/request/survey.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: 0,
    mid: null,
    questions: []
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
        id: para.id,
        mid: para.mid,
        questions: para.questions
      })
    }
  },

  next: function() {
    var para = {
      id: this.data.id + 1,
      mid: this.data.mid,
      questions: this.data.questions
    }
    wx.navigateTo({
      url: 'survey?para=' + JSON.stringify(para),
    })
  },

  last: function () {
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
    wx.navigateTo({
      url: 'survey?para=' + JSON.stringify(para),
    })
  },

  finish: function () {
    wx.showToast({
      title: '发布任务成功！',
    })
  }
})