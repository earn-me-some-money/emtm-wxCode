const date = new Date()
const years = []
const months = []
const days = []
for (let i = 1950; i <= date.getFullYear(); i++) {
  years.push(i)
}
for (let i = 0; i <= 11; i++) {
  var k = i;
  if (0 <= i && i < 9) {
    k = "0" + (i + 1);
  } else {
    k = (i + 1);
  }
  months.push(k)
}

for (let i = 1; i <= 31; i++) {
  var k = i;
  if (0 <= i && i < 10) {
    k = "0" + i
  }
  days.push(k)
}
var thisMon = date.getMonth();
var thisDay = date.getDate();
if (0 <= thisMon && thisMon < 9) {
  thisMon = "0" + (thisMon + 1);
} else {
  thisMon = (thisMon + 1);
}
if (0 <= thisDay && thisDay < 10) {
  thisDay = "0" + thisDay;
}
function mGetDate(year, month) {
  var d = new Date(year, month, 0);
  return d.getDate();
}

var todayY = date.getFullYear();
var todayM = date.getMonth();
var todayD = date.getDate();

var storeY = date.getFullYear();
var storeM = date.getMonth();
var storeD = date.getDate();

Page({

  /**
   * 页面的初始数据
   */
  data: {

    selectType: 1,
    username: null,
    taskname: null,
    payment: null,

    flag: false,
    year: date.getFullYear(),
    month: thisMon,
    day: thisDay,
    //数组中保存的可选日期

    nowyear: todayY,
    nowmonth: todayM,
    nowday: todayD,

    years: years,
    months: months,
    days: days,
    value: [date.getFullYear(), thisMon - 1, thisDay - 1],

    isShowDates: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTime();

    wx.setNavigationBarTitle({
      title: '发 布 委 派',
    })
  },

  getTime: function (e) {
    var times = this.data.year + "-" + this.data.month + "-" + this.data.day
    this.setData({
      flag: true,
      upTime: times,
    });
  },
  bindChange: function (e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]],
    })
    var totalDay = mGetDate(this.data.year, this.data.month);
    var changeDate = [];
    for (let i = 1; i <= totalDay; i++) {
      var k = i;
      if (0 <= i && i < 10) {
        k = "0" + i
      }
      changeDate.push(k)
    }
    this.setData({
      days: changeDate
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

  cancel_select_data: function() {
    this.setData({
      isShowDates: false,
      year: storeY,
      month: storeM,
      day: storeD
    })

  },

  confirm_select_data: function() {
    storeY = this.data.year;
    storeM = this.data.month;
    storeD = this.data.day;

    this.setData({
      isShowDates: false,
      year: storeY,
      month: storeM,
      day: storeD
    })
  },

  modify_date: function() {
    this.setData({
      isShowDates: true
    })
  },

  typeChange: function(e) {
    if (e.detail.value == 'fetch') {
      this.setData({
        selectType: 1
      })
    }
    else if (e.detail.value == 'write') {
      this.setData({
        selectType: 2
      })
    }
    else if (e.detail.value == 'trade') {
      this.setData({
        selectType: 3
      })
    }
  },

  usernameInput:function(e) {
    this.setData({
      username: e.detail.value
    })
  },

  paymentInput: function (e) {
    this.setData({
      payment: e.detail.value
    })
  },

  tasknameInput: function (e) {
    this.setData({
      taskname: e.detail.value
    })
  },

  nextStep: function() {
    if (!this.data.username) {
      wx.showToast({
        title: '请输入发起人名称！',
        icon: "none"
      })
      return
    }
    if (!this.data.taskname) {
      wx.showToast({
        title: '请输入委派简介！',
        icon: "none"
      })
      return
    }
    if (!this.data.payment) {
      wx.showToast({
        title: '请输入酬金！',
        icon: "none"
      })
      return
    }
    var para = {
      username: this.data.username,
      selectType: this.data.selectType,
      taskname: this.data.taskname,
      payment: this.data.payment
    }
    wx.navigateTo({
      url: '../request/requestPage_1?selectType=' + this.data.selectType,
    })
    
  }
})