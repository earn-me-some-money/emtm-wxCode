// pages/details/singleTaskPage.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    username: '123',
    email: '123',
    tel: '123',
    info: '123',

    is_identifier: true,
    userType: 1,  // 1代表学生， 2代表奶牛

    major: '123',
    grade: '123',
    credit: '123',
    finish_task: '123',
    launch_task: '123',

    organization: '123',

    is_modify: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    this.setData({
      userType: 2 - app.globalData.mode
    })
    var _this = this
    if (this.data.userType == 1) {
      wx.request({
        url: app.globalData.serpath + 'info/stu',
        data: {
          "userid": app.globalData.openid
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          if (res.data.code) {
            _this.setData({
              username: res.data.username,
              email: res.data.email,
              tel: res.data.phone,
              info: res.data.infos,
              major: res.data.major,
              grade: res.data.year,
              is_identifier: res.data.verified,
              credit: res.data.credit,
              launch_task: res.data.accepted,
              finish_task: res.data.finished
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
      wx.request({
        url: app.globalData.serpath + 'info/cow',
        data: {
          "userid": app.globalData.openid
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          if (res.data.code) {
            _this.setData({
              username: res.data.username,
              email: res.data.email,
              tel: res.data.phone,
              info: res.data.infos,
              is_identifier: res.data.verified,
              organization: res.data.organization
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
  },

  modify: function() {
    this.setData({
      is_modify: true
    })
  },

  cancel_modify: function () {
    this.setData({
      is_modify: false
    })
    this.onLoad()
  },

  confirm_modify: function() {
    var _this = this
    if (this.data.userType == 1) {
      var para = {
        "userid": app.globalData.openid,
        "new_email": this.data.email,
        "new_phone": this.data.tel,
        "new_infos": this.data.info,
        "new_major": this.data.major,
        "new_year": Number(this.data.grade)
      }
      console.log(para)
      wx.request({
        url: app.globalData.serpath + 'info/stu/edit',
        data: para,
        method: "POST",
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          if (res.data.code) {
            wx.showToast({
              title: "保存成功",
            })
            _this.setData({
              is_modify: false
            })
            _this.onLoad()
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
      var para = {
        "userid": app.globalData.openid,
        "new_email": this.data.email,
        "new_phone": this.data.tel,
        "new_infos": this.data.info,
      }
      console.log(para)
      wx.request({
        url: app.globalData.serpath + 'info/cow/edit',
        data: para,
        method: "POST",
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          if (res.data.code) {
            wx.showToast({
              title: "保存成功",
            })
            _this.setData({
              is_modify: false
            })
            _this.onLoad()
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
  },

  emailInput: function (e) {
    this.setData({
      email: e.detail.value
    })
  },

  telInput: function (e) {
    this.setData({
      tel: e.detail.value
    })
  },

  infoInput: function (e) {
    this.setData({
      info: e.detail.value
    })
  },

  majorInput: function (e) {
    this.setData({
      major: e.detail.value
    })
  },

  gradeInput: function (e) {
    this.setData({
      grade: e.detail.value
    })
  }

})