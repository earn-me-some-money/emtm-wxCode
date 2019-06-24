// pages/SecondPage/request/package.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    mid: null,
    pickup_address: null,
    deliver_address: null,
    phone_number: null,
    pick_number: null,
    info: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (query) {
    this.setData({
      mid: query.mid
    })
  },

  pickup_addressInput: function (e) {
    this.setData({
      pickup_address: e.detail.value
    })
  },

  deliver_addressInput: function (e) {
    this.setData({
      deliver_address: e.detail.value
    })
  },

  phone_numberInput: function (e) {
    this.setData({
      phone_number: e.detail.value
    })
  },

  pick_numberInput: function (e) {
    this.setData({
      pick_number: e.detail.value
    })
  },

  infoInput: function (e) {
    this.setData({
      info: e.detail.value
    })
  },

  save: function() {
    var test = app.globalData.test
    if (test) {
      if (!this.data.pickup_address) {
        wx.showToast({
          title: '请输入取寄快递地址！',
          icon: "none"
        })
        return
      }
      if (!this.data.deliver_address) {
        wx.showToast({
          title: '请输入递交快递地址！',
          icon: "none"
        })
        return
      }
      if (!this.data.phone_number) {
        wx.showToast({
          title: '请输入发布者电话号码！',
          icon: "none"
        })
        return
      }
      if (!this.data.pick_number) {
        wx.showToast({
          title: '请输入快递号！',
          icon: "none"
        })
        return
      }
    }
    wx.showLoading({ title: "发布任务中..." })
    var _this = this
    wx.request({
      url: app.globalData.serpath + 'task/release-errand',
      data: {
        "mid": Number(_this.data.mid),
        "pickup_address": _this.data.pickup_address,
        "deliver_address": _this.data.deliver_address,
        "phone_number": _this.data.phone_number,
        "pick_number": _this.data.pick_number,
        "info": _this.data.info
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
                wx.navigateBack({
                  delta: 2
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