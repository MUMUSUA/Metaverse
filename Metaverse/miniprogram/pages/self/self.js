// pages/person/person.js

Page({

	data:{
		hiddenmodalput:true,
		//可以通过hidden是否掩藏弹出框的属性，来指定那个弹出框
		passwd:""
	},
	info: function() {
		wx.showModal({
			title: '关于',
			content: '我们旨在为您科普元宇宙，为您带来最新的元宇宙资讯，让您第一时间体验元宇宙。',
			showCancel: false,//是否显示取消按钮
			confirmText:"是",//默认是“确定”
			confirmColor: 'skyblue',//确定文字的颜色
			success: function (res) {

			},
			fail: function (res) { },//接口调用失败的回调函数
			
		 })
	},
	advice: function() {
	  wx.navigateTo({
		url: '/pages/consult/consult',
	  })
	},

	contact: function (e) {
	  // 调用拨打电话API
	  wx.makePhoneCall({
		phoneNumber: '400-321'   // 该电话号码为模拟数据
	  })
	},
	manage:function(e){

		this.setData({
			hiddenmodalput: !this.data.hiddenmodalput
		   })
	},
	getInputValue(e){
		   this.setData({
			   passwd:e.detail.value
		   })
	
	  },
	//取消按钮
    cancel: function(){
		this.setData({
		 hiddenmodalput: true
		});
	   },
	   //确认
	   confirm: function(e){
		  
		this.setData({
			hiddenmodalput: true
		   })
if(this.data.passwd=="admin"){
		   wx.navigateTo({
			url: '/pages/manage/manage',
		  })

		}
		   else
		   wx.showToast({
			 title: '口令错误',
			 icon:'error'
		   })
	   }
  })