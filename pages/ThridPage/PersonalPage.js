// pages/PersonalPage/PersonalPage.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {
            nickName: "用户名称",
            avatarUrl: "../../images/默认头像.png",
        },
        hasUserInfo: false,
        mode: "登录失败",
        canIUse: true,
        verified: false,
        vrf: "注册"
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function () {
        if (app.globalData.userInfo) {
          
            this.setData({
                userInfo: app.globalData.userInfo,
                hasUserInfo: true
            })
        } else if (this.data.canIUse) {
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            app.userInfoReadyCallback = res =>
            {
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
            }
        } else {
            // 在没有 open-type=getUserInfo 版本的兼容处理
            wx.getUserInfo({
                success: res => {
                app.globalData.userInfo = res.userInfo
                this.setData({
                    userInfo: res.userInfo,
                    hasUserInfo: true
                })
                }
            })
        }
        if (app.globalData.mode == 0) {
          this.setData({
            mode: "奶牛",
            vrf: "认证"
          })
          var _this = this
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
                  verified: res.data.verified,
                })
                if (_this.data.verified) {
                  _this.setData({
                    vrf: "已认证"
                  })
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
        else if (app.globalData.mode == 1) {
          this.setData({
            mode: "学生",
            vrf: "认证"
          })
          var _this = this
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
                  verified: res.data.verified,
                })
                if (_this.data.verified) {
                  _this.setData({
                    vrf: "已认证"
                  })
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
          wx.request({
            url: app.globalData.serpath + 'check_credit',
            data: {
              "userid": app.globalData.openid
            },
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              if (res.data.code) {
                _this.setData({
                  'userInfo.check_credit': "信誉积分：" + res.data.credit_score
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
          this.setData({
            mode: "未注册",
            vrf: "注册"
          })
        }
    },

    NotificationClick: function () {
        wx.navigateTo({
            url: 'UserInfo/Notation/NotationPage',
        })
    },

    RelationshipClick: function () {
        wx.navigateTo({
            url: 'UserInfo/Relationship/RelationshipPage',
        })
    },

    WalletClick: function () {
        wx.navigateTo({
            url: 'UserInfo/Wallet/WalletPage',
        })
    },

    SettingClick: function () {
        if (this.data.verified) {
          wx.showToast({
            title: "已认证",
            icon: "none"
          })
          return
        }
        if (app.globalData.mode == 2) {
          wx.navigateTo({
            url: 'UserInfo/Setting/signInPage/signPage',
          })
        }
        else {
          wx.navigateTo({
            url: 'UserInfo/Setting/SettingPage',
          })
        }
    },

    AddressClick: function () {
        wx.navigateTo({
            url: 'UserEvent/Address/AddressPage',
        })
    },

    myLaunchClick: function () {
        wx.navigateTo({
            url: 'UserEvent/Process/ProcessPage',
        })
    },

    myRevClick: function () {
        wx.navigateTo({
            url: 'UserEvent/Process/ProcessPage',
        })
    },

    myHistoryClick: function () {
        wx.navigateTo({
            url: 'UserEvent/ViewHistory/HistoryPage',
        })
    },

    InProcessClick: function () {
        wx.navigateTo({
            url: 'UserEvent/myEvent/EventPage',
        })
    },

    beConfirmClick: function () {
        wx.navigateTo({
            url: 'UserEvent/myEvent/EventPage',
        })
    },

    RecordClick: function () {
        wx.navigateTo({
            url: 'UserEvent/Record/RecordPage',
        })
    }
})