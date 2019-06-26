// pages/EnterPage/enter.js
//test.js  
//获取应用实例  
var app = getApp();

Page({
    data: {
      picList: ["http://img0.imgtn.bdimg.com/it/u=2246248540,3069947388&fm=26&gp=0.jpg", "http://img2.imgtn.bdimg.com/it/u=3427365405,3550792323&fm=26&gp=0.jpg", "http://img2.imgtn.bdimg.com/it/u=3757879143,3844841745&fm=26&gp=0.jpg"],
        searchKeyWord: null,
        selectShow: false,//控制下拉列表的显示隐藏，false隐藏、true显示
        selectData: ['综合排序', '信誉最高', '距离最近', '报酬最高', '耗时最少'],//下拉列表的数据
        index: 0, //选择的下拉列表下标
      task: []
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
      var _this = this
      wx.request({
        url: app.globalData.serpath + 'task/top',
        data: {
          "number": 20
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          if (res.data.code) {
            console.log(res)
            _this.fullfill(res)
            _this.setData({
              task: res.data.tasks
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

  fullfill: function (res) {
    for (var i = 0; i < res.data.tasks.length; i++) {
      var x = res.data.tasks[i]
      switch (x.task_mode) {
        case 0:
          x["type"] = "问卷调查类"
          break;
        case 1:
          x["type"] = "闲置交易类"
          break;
        case 2:
          x["type"] = "取件寄件类"
          break;
        default:
          break
      }
      if (x.user_finish_state) {
        x["state"] = "已完成"
      }
      else {
        x["state"] = "未完成"
      }
      x.providerTime = x.task_time_limit.slice(0, 10) + " " +
        x.task_time_limit.slice(11, 13) + ":" + x.task_time_limit.slice(14, 16)
    }
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
    },

    toSingleTask: function (e) {
      var para = {
        mid: e.currentTarget.dataset.bean.mid,
        poster_id: e.currentTarget.dataset.bean.poster_id
      }
      wx.navigateTo({
        url: '../details/singleTaskPage?para=' + JSON.stringify(para)
      })
    },
    searchInput: function(e) {
      this.setData({
        searchKeyWord: e.detail.value
      })
    },
    search: function() {
      wx.navigateTo({
        url: 'search/searchPage?kw='+ this.data.searchKeyWord,
      })
    }
})  