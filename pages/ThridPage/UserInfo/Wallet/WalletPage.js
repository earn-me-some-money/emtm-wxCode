// pages/ThridPage/UserInfo/Wallet/WalletPage.js
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
      balance: 0,
      hidden_drawback: true,
      hidden_refill: true,
      drawbacknum: null,
      refillnum: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      wx.setNavigationBarTitle({
        title: '我 的 钱 包',
      })
      var _this = this
      wx.request({
        url: app.globalData.serpath + 'balance',
        data: {
          "userid": app.globalData.openid
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          if (res.data.code) {
            _this.setData({
              balance: res.data.balance
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
    },

    drawback:function() {
      this.setData({
        hidden_drawback: false
      })
    },

    refill:function() {
      this.setData({
        hidden_refill: false
      })
    },

    confirm_drawback: function() {
      if (this.data.drawbacknum){
        wx.showLoading({ title: "提现中…" })
        var _this = this
        wx.request({
          url: app.globalData.serpath + 'balance/withdraw',
          data: {
            "userid": app.globalData.openid,
            "withdraw_amount": Number(this.data.drawbacknum)
          },
          method: 'POST',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            if (res.data.code) {
              _this.setData({
                hidden_drawback: true,
                drawbacknum: null
              })
              wx.showToast({
                title: '提现成功！'
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
        wx.showToast({
          title: '请输入数字！',
          icon: "none"
        })
      }
    },

    cancel_drawback: function() {
      this.setData({
        hidden_drawback: true,
        drawbacknum: null
      })
    },

    drawbackInput: function (e) {
      this.data.drawbacknum = e.detail.value
    },

    confirm_refill: function () {
      if (this.data.refillnum) {
        wx.showLoading({ title: "充值中…" })
        var _this = this
        wx.request({
          url: app.globalData.serpath + 'balance/recharge',
          data: {
            "userid": app.globalData.openid,
            "recharge_amount": Number(this.data.refillnum)
          },
          method: 'POST',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            if (res.data.code) {
              _this.setData({
                hidden_refill: true,
                refillnum: null
              })
              wx.showToast({
                title: '充值成功！'
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
        wx.showToast({
          title: '请输入数字！',
          icon: "none"
        })
      }
    },

    cancel_refill: function () {
      this.setData({
        hidden_refill: true,
        refillnum: null
      })
    },

    refillInput: function (e) {
      this.data.refillnum = e.detail.value
    },
})