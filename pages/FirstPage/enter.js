// pages/EnterPage/enter.js
//test.js  
//获取应用实例  
Page({
    data: {
      picList: ["http://img0.imgtn.bdimg.com/it/u=2246248540,3069947388&fm=26&gp=0.jpg", "http://img2.imgtn.bdimg.com/it/u=3427365405,3550792323&fm=26&gp=0.jpg", "http://img2.imgtn.bdimg.com/it/u=3757879143,3844841745&fm=26&gp=0.jpg"],

        selectShow: false,//控制下拉列表的显示隐藏，false隐藏、true显示
        selectData: ['综合排序', '信誉最高', '距离最近', '报酬最高', '耗时最少'],//下拉列表的数据
        index: 0, //选择的下拉列表下标
      task: [
        { type: "寄件", task_name: "帮忙", task_intro: "介绍", task_state: "未完成", task_pay: "cost", providerTime: "123", poster_name: "123"}, 
        { type: "寄件", task_name: "帮忙", task_intro: "介绍", task_state: "未完成", task_pay: "cost", providerTime: "123", poster_name: "123" },
        { type: "寄件", task_name: "帮忙", task_intro: "介绍", task_state: "未完成", task_pay: "cost", providerTime: "123", poster_name: "123" },
        { type: "寄件", task_name: "帮忙", task_intro: "介绍", task_state: "未完成", task_pay: "cost", providerTime: "123", poster_name: "123" }]
    },
    selectTap() {
        this.setData({
            selectShow: !this.data.selectShow
        });
    },
    // 点击下拉列表
    optionTap(e) {
        let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
        this.setData({
            index: Index,
            selectShow: !this.data.selectShow
        });
    },
    onLoad: function () {
    },

    btClick1: function() {
      wx.navigateTo({
        url: 'singleType/singleTypePage?type=0',
      })
    },

    btClick2: function () {
      wx.navigateTo({
        url: 'singleType/singleTypePage?type=1',
      })
    },

    btClick3: function () {
      wx.navigateTo({
        url: 'singleType/singleTypePage?type=2',
      })
    },

    btClick4: function () {
      wx.navigateTo({
        url: 'singleType/singleTypePage',
      })
    },

    getUserInfo: function () {
      var that = this
      wx.getSetting({
        success(res) {
          if (!res.authSetting['scope.userInfo']) {
            wx.authorize({
              scope: 'scope.userInfo',
              success() {
              }
            })
          }
          else {
            that.UserLogin();
          }
        }
      })
    }
})  