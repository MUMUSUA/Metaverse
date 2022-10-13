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
  getId(res){
    var vlu=res.detail.value;
    console.log(vlu)
  },
  delete: function(e){
console.log(e.currentTarget.dataset.id)
getID=e.currentTarget.dataset.id
// console.log("id:"+id)
db.collection("news").doc(getID)
// .where({
//   _id:
// })
.remove({

  success: res => {

    wx.showToast({

    title: '删除成功',

    })

    console.log(res)

},

fail: err => {

wx.showToast({

icon: 'none',

title: '删除失败',

})

console.error('[数据库] [删除记录] 失败：', err)

}



})


  }
})