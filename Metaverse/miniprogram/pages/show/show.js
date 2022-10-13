var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var app = getApp();
const db=wx.cloud.database()
const _ = db.command

Page({
  data: {

  },
  onLoad: function (e) {
    this.setData({    
			title: e.title   ,
			
      })   
      console.log(e.title)
      db.collection('news').where({
        title: db.RegExp({
          regexp: '.*' + e.title,
          options: 'i',
        })
      }
    ).get({
      success: res => {
        console.log(res)
        		  this.setData({
			listData: res.data
		  })
      },
      fail: err => {
        console.log(err)
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
  updateBlogs: function (e) { 
   
    db.collection('news').where({
      title: db.RegExp({
        regexp: '.*' + e.title,
        options: 'i',
      })
    }
  )
  
  },
  addHit: function (e) {
   
    console.log(e.currentTarget.dataset.id)
   
    db.collection('news').doc(e.currentTarget.dataset.id).update({
      data: {
        // 表示指示数据库将字段自增 1
        hits: _.inc(1)
      },
      success: function(res) {
        console.log(res.data)
      }

    })



    // db.collection("news").add({
    //     data:{
    //       title:"",
    //       author:"同花顺财经网",
    //       content:"",
    //       pic:"",
    //       hits:45,
    //       content:""


    //     }
    //   })

  }
  
});