const db=wx.cloud.database()
const _ = db.command
var getID=""
Page({
  data: {

  },
  onLoad: function() {

		  db.collection("news").orderBy('post','desc').get({
			success:res=>{
				console.log(res)
				this.setData({
					listData:res.data,
					loading:true
				})
			}
	})
		  

  },
  onPullDownRefresh: function () {
    wx.showNavigationBarLoading()  //在标题栏中显示加载
    this.updateBlogs()  //重新加载数据
    //模拟加载  1秒
    　　　　setTimeout(function () {
      　　　　// complete
      　　　　wx.hideNavigationBarLoading() //完成停止加载
      　　　　wx.stopPullDownRefresh() //停止下拉刷新
      　　　　}, 1000);
  },
  updateBlogs: function () { 
   
 
    db.collection("news").orderBy("post","desc").get({
      success:res=>{
        console.log(res)
        this.setData({
          listData:res.data,
          loading:true
        })
      }
  })
 
  },
  update: function(e){
//console.log(e.currentTarget.dataset.id)
getID=e.currentTarget.dataset.id
wx.navigateTo({
  url: '../updateRecordResult/index?id='+getID,
})

  }
})