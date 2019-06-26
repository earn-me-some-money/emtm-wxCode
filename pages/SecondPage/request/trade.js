// pages/SecondPage/request/trade.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mid: null,
    t_type: null,
    info: null,
    loss: null,
    address: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    wx.setNavigationBarTitle({
      title: '闲 置 交 易 类 描 述',
    })
    this.setData({
      mid: query.mid
    })
  },

  t_typeInput: function(e) {
    this.setData({
      t_type: e.detail.value
    })
  },

  infoInput: function (e) {
    this.setData({
      info: e.detail.value
    })
  },

  lossInput: function (e) {
    this.setData({
      loss: e.detail.value
    })
  },

  addressInput: function (e) {
    this.setData({
      address: e.detail.value
    })
  },

  save: function () {
    var test = app.globalData.test
    if (test) {
      if (!this.data.t_type) {
        wx.showToast({
          title: '请输入商品类型！',
          icon: "none"
        })
        return
      }
      if (!this.data.info) {
        wx.showToast({
          title: '请输入商品信息！',
          icon: "none"
        })
        return
      }
      if (!this.data.loss) {
        wx.showToast({
          title: '请输入商品的损耗情况！',
          icon: "none"
        })
        return
      }
      if (!this.data.address) {
        wx.showToast({
          title: '请输入交易地点！',
          icon: "none"
        })
        return
      }
      if (!this.data.loss) {
        wx.showToast({
          title: '请输入商品的损耗情况！',
          icon: "none"
        })
        return
      }
      if (Number(this.data.loss) < 0 || Number(this.data.loss) > 5) {
        wx.showToast({
          title: '损耗情况请在0-5之间！',
          icon: "none"
        })
        return
      }
    }
    wx.showLoading({ title: "发布任务中..." })
    var _this = this
    wx.request({
      url: app.globalData.serpath + 'task/release-transaction',
      data: {
        "mid": Number(_this.data.mid),
        "t_type": _this.data.t_type,
        "info": _this.data.info,
        "loss": Number(_this.data.loss),
        "address": _this.data.address
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method: 'POST',
      success: function (res) {
        if (res.data.code) {
          wx.hideLoading()
          wx.showModal({
            title: '发布成功',
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.redirectTo({
                  url: '../../Login/loginPage',
                })
              }
            }
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