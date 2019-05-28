// pages/EnterPage/enter.js
//test.js  
//获取应用实例  
Page({
  data: {
    picList: ["http://img1.imgtn.bdimg.com/it/u=1739733360,1788222103&fm=26&gp=0.jpg", "http://img1.gtimg.com/cul/pics/hv1/148/6/2187/142211353.jpg", "http://img008.hc360.cn/k3/M04/CE/F9/wKhQv1gEwvqEH6QAAAAAALn_tIw839.jpg"],

    selectShow: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    selectData: ['综合排序','信誉最高','距离最近','报酬最高','耗时最少'],//下拉列表的数据
    index: 0 //选择的下拉列表下标
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
    console.log('onLoad test');
  }
})  