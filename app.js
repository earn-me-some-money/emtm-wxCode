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
              // console.log(res.data.openid)
              _this.globalData.openid = res.data.openid
            }
          })
        } else {
          console.log('获取openid失败！' + res.errMsg)
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
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
      }
    })
    // 登录应用
    wx.request({
      url: this.globalData.serpath + 'login',
      data: {
        "userid": this.globalData.openid,
        "wechat_ok": this.globalData.auth
      },
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data.code) {
          _this.globalData.mode = res.data.user_type
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
  
  globalData: {
    serpath: "https://easy-mock.com/mock/5cea62cd9688d23824616193/example/",
    appid: "wx9d86195b9f2c0137",
    secretid: "6260719c0a702f13c1698ca47beb60bc",
    openid: null,
    auth: false,
    mode: 2,
    userInfo: null,
    test: false
  }
})