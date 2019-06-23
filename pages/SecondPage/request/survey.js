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
    // 从requestionPage_1跳转
    if (query.mid) {
      this.setData({
        mid: query.mid
      })
    }
    // 从上一题跳转
    else {
      para = JSON.parse(query.para)
      this.setData({
        id: para.id,
        mid: para.mid,
        questions: para.questions
      })
    }
  },

  next: function() {
    wx.navigateTo({
      url: 'survey?id=' + (this.data.id+1),
    })
  },

  last: function () {
    wx.navigateTo({
      url: 'survey?id=' + (this.data.id-1),
    })
  },

  finish: function () {
    wx.showToast({
      title: '发布任务成功！',
    })
  }
})