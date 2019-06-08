// pages/ThridPage/UserEvent/Address/AddressPage.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      dataList: [
        { name: "蔡倓", gender: "男", tel: "13309088299", addr: "中山大学东校区学生公寓至善园2栋" },
        { name: "蔡大倓", gender: "男", tel: "13309088299", addr: "中山大学广州东校区教学实验中心S" }
      ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      wx.setNavigationBarTitle({
        title: '我的地址',
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

    editAddress:function(e) {
      wx.navigateTo({
        url: 'newAddress/newAddressPage?type=edit',
      })
    },

    addNewAddress:function() {
      wx.navigateTo({
        url: 'newAddress/newAddressPage?type=add',
      })
    }
})