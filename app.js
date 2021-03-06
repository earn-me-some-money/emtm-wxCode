//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    
  },
  getinfo: function() {
    var _this = this
    // 登录
    wx.login({
      success: res => {
        if (res.code) {
          // console.log(res.code)
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          // 获取用户openid
          wx.request({
            url: this.globalData.serpath + 'wechatid',
            data: {
              "appid": this.globalData.appid,
              "secret": this.globalData.secretid,
              "code": res.code
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              console.log(res.data.openid)
              _this.globalData.openid = res.data.openid
              // 登录应用
              wx.request({
                url: _this.globalData.serpath + 'login',
                data: {
                  "userid": _this.globalData.openid,
                  "wechat_ok": _this.globalData.auth
                },
                method: 'POST',
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success: function (res) {
                  if (res.data.code) {
                    _this.globalData.mode = res.data.user_type
                    wx.hideLoading()
                    wx.switchTab({
                      url: '../FirstPage/enter',
                    })
                  }
                  else {
                    _this.globalData.mode = 2
                    wx.showToast({
                      title: res.data.err_message,
                      icon: "none"
                    })
                    wx.hideLoading()
                    wx.switchTab({
                      url: '../FirstPage/enter',
                    })
                  }
                }
              })
            },
            fail: function(res) {
              console.log(res)
            }
          })
        } else {
          wx.showToast({
            title: '获取openid失败！',
            icon: "none"
          })
          console.log('获取openid失败！' + res.errMsg)
        }
      },
      fail: function(res) {
        wx.showToast({
          title: '登录失败！',
          icon: "none"
        })
        console.log(res)
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          this.globalData.auth = true
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 判断用户身份
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
        else {
          this.globalData.auth = false
        }
      },
      fail: res => {
        console.log(res)
      }
    })
  },
  
  globalData: {
    serpath: "https://emtm.miguch.com:789/",
    appid: "wx9d86195b9f2c0137",
    secretid: "6260719c0a702f13c1698ca47beb60bc",
    openid: null,
    auth: false,
    mode: 2,
    userInfo: null,
    test: true
  }
})