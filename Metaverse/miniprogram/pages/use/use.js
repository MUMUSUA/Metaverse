
const fetch = require('../../utils/get.js')
Page({
  data: {

  },
  onLoad: function() {
	      // 显示模态对话框
		  wx.showLoading({
			title: "努力加载中"
		  })
		  // 请求数据
		  fetch('metaverse/use').then((res) => {
			wx.hideLoading();
			this.setData({
			  listData: res.data,
			  loading: true
			})
		  })
		  

  }
})