var app = getApp();
Page({
  para: null,
  data: {
    type: true,  // 0代表学生，1代表奶牛
    hidden_notation: true,

    email: null,
    phone: null,
    info: null,
    name: null,
    grade: null,
  },

  onLoad: function (e) {
    this.setData({
      para: JSON.parse(e.para),
    })
    console.log(this.data.para)
    this.setData({
      type: this.data.para.verify_mode
    })

  },

  login: function() {
    var test = app.globalData.test
    if (test) {
      if (!this.data.email) {
        wx.showToast({
          title: '请输入邮箱地址！',
          icon: "none"
        })
        return
      }

      if (!this.data.phone) {
        wx.showToast({
          title: '请输入电话号码！',
          icon: "none"
        })
        return
      }

      if (this.data.phone.toString().length != 11) {
        wx.showToast({
          title: '请正确输入11位电话号码！',
          icon: "none"
        })
        return
      }

      if (this.data.type) {
        if (!this.data.name) {
          wx.showToast({
            title: '请输入真实姓名！',
            icon: "none"
          })
          return
        }
        if (!this.data.info) {
          wx.showToast({
            title: '请输入自我介绍！',
            icon: "none"
          })
          return
        }
        if (!this.data.grade) {
          wx.showToast({
            title: '请输入就读年级！',
            icon: "none"
          })
          return
        }
        
      }

      else {
        if (!this.data.info) {
          wx.showToast({
            title: '请输入机构介绍！',
            icon: "none"
          })
          return
        }
      }
    }

    wx.showLoading({ title: "注册中..." })
    var _this = this
    var para
    if (this.data.type) {
      para = {
        "username": app.globalData.userInfo.nickName,
        "userid": app.globalData.openid,
        "wechat_ok": this.data.para.verify_mode,
        "email": this.data.email,
        "phone": this.data.phone,
        "infos": this.data.info,
        // 下面是大学生身份认证所需信息
        "school_name": this.data.para.organization,
        "student_id": Number(this.data.para.user_id),
        "major": this.data.name,
        "year": Number(this.data.grade)
      }
      wx.request({
        url: app.globalData.serpath + 'logup/stu',
        data: para,
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: 'POST',
        success: function (res) {
          if (res.data.code) {
            wx.hideLoading()
            _this.setData({
              hidden_notation: false
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
    }
    else {
      para = {
        "username": app.globalData.userInfo.nickName,
        "userid": app.globalData.openid,
        "wechat_ok": this.data.para.verify_mode,
        "email": this.data.email,
        "phone": this.data.phone,
        "infos": this.data.info,
        "organization": this.data.para.organization,
      }
      wx.request({
        url: app.globalData.serpath + 'logup/cow',
        data: para,
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: 'POST',
        success: function (res) {
          if (res.data.code) {
            wx.hideLoading()
            _this.setData({
              hidden_notation: false
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
    }

  },

  confirm_rcv: function () {
    this.setData({
      hidden_notation: true
    })
    wx.redirectTo({
      url: '../../../../Login/loginPage',
    })
  },

  emailInput: function (e) {
    this.setData({
      email: e.detail.value
    })
  },

  phoneInput: function (e) {
    this.setData({
      phone: e.detail.value
    })
  },

  nameInput: function (e) {
    this.setData({
      name: e.detail.value
    })
  },

  infoInput: function (e) {
    this.setData({
      info: e.detail.value
    })
  },

  gradeInput: function (e) {
    this.setData({
      grade: e.detail.value
    })
  }

})