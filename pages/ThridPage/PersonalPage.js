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
      // check_credit: "???",
      mode: true, 
      userid: '00'
    },
    hasUserInfo: true,
    canIUse: true
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
      app.userInfoReadyCallback = res => {
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
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var _this = this
    wx.request({
      url: 'https://easy-mock.com/mock/5cea62cd9688d23824616193/example/check_credit', //仅为示例，并非真实的接口地址
      data: {
        "userid": 123456 //当前大学生用户id[string]
      },
      success: function (res) {
        if (res.data["code"]) {
          _this.setData({ "userInfo.check_credit": res.data['credit_score']})
        }
        else {
          _this.setData({ "userInfo.check_credit": res.data['err_message'] })
        }
      }
    })
    console.log(_this.data.userInfo)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  NotificationClick: function() {
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
    wx.navigateTo({
      url: 'UserInfo/Setting/SettingPage',
    })
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