// pages/ThridPage/UserInfo/Setting/SettingPage.js
var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {

      isVertify: true,

      vertify_mode: 1,

      url: "../../../../images/加号.png",

      choose: false,

      /*notation1: ["输 入 学 号", "输 入 真 实 名 字"],

      notation2: ["学 校 名 称", "企 业 或 组 织 名 称"]*/

      notation1: "输 入 学 号",

      notation2: "学 校 名 称",

      text1: null,
      text2: null,

      buttonText: "认 证"

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      wx.setNavigationBarTitle({
        title: '我 的 认 证',
      })
      
      if (app.globalData.mode == 2) {
        this.setData({
          isVertify: false
        })
      }
      else {
        this.setData({
          isVertify: true
        })
      }

    },

    chooseImage: function() {
      var _this = this
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success(res) {
          _this.setData({
            url: res.tempFilePaths[0],
            choose: true
          })
        }
      })
    },

    typeChange: function(e) {
      if (e.detail.value == 'student') {
        this.setData({
          vertify_mode: 1,
          notation1: "输 入 学 号",
          notation2: "学 校 名 称"
        })
      }
      else if (e.detail.value == 'milk') {
        this.setData({
          vertify_mode: 2,
          notation1: "输 入 真 实 姓 名",
          notation2: "输 入 机 构 名 称"
        })
      }
    },

    idInput: function(e) {
      this.setData({
        text1: e.detail.value
      })
    },

    orgInput: function(e) {
      this.setData({
        text2: e.detail.value
      })
    },

    signIn: function() {
      var test = app.globalData.test
      if (test) {
        if (!this.data.choose) {
          wx.showToast({
            title: '请选择证件照片！',
            icon: "none"
          })
          return
        }
        if (!this.data.text1) {
          wx.showToast({
            title: '请输入用户账号！',
            icon: "none"
          })
          return
        }
        if (!this.data.text2) {
          wx.showToast({
            title: '请输入组织名称！',
            icon: "none"
          })
          return
        }
      }

      wx.showLoading({ title: "认证中..." })
      var FSM = wx.getFileSystemManager(); 
      var _this = this
      FSM.readFile({
        filePath: _this.data.url,
        encoding: "base64",
        success: function (res) {
          var vertify_mode
          if (_this.data.vertify_mode == 1) {
            vertify_mode = true
          }
          else {
            vertify_mode = false
          }
          var para = {
            "image_data": res.data,
            "verify_mode": vertify_mode,
            "user_id": _this.data.text1,
            "organization": _this.data.text2
          }
          wx.request({
            url: app.globalData.serpath + 'user/verify',
            data: para,
            header: {
              'content-type': 'application/json' // 默认值
            },
            method: 'POST',
            success: function (res) {
              if (res.data.code) {
                wx.hideLoading()
                var para = {
                  "verify_mode": vertify_mode,
                  "user_id": _this.data.text1,
                  "organization": _this.data.text2
                }
                wx.navigateTo({
                  url: 'signInPage/signPage?para=' + JSON.stringify(para),
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
      })
    }
})