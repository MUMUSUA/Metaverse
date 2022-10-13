var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
var app = getApp();
const db=wx.cloud.database()
const _ = db.command

Page({
  data: {
    tabs: ['📰新闻资讯', '🔥最热资讯'],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,
    // 搜索框状态
    inputShowed: true,
    //显示结果view的状态
    viewShowed: false,
    // 搜索框值
    inputVal: "",
    //搜索渲染推荐数据
    list: [],
  },
  onLoad: function () {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
	});
	
	db.collection("news").orderBy('post','desc').get({
		success:res=>{
			console.log(res)
			this.setData({
				listData:res.data,
				loading:true
			})
		}
})

db.collection("news").orderBy('hits','desc').get({
		success:res=>{
			console.log(res)
			this.setData({
				hotData:res.data,
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
  updateBlogs: function (e) { 
   
    if(this.data.activeIndex==1){
    db.collection("news").orderBy("hits","desc").get({
      success:res=>{
        console.log(res)
        this.setData({
          hotData:res.data,
          loading:true
        })
      }
  })}
  else{
    
    db.collection("news").orderBy("post","desc").get({
      success:res=>{
        console.log(res)
        this.setData({
          listData:res.data,
          loading:true
        })
      }
  })
  }
  },
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
     
    });
    console.log("id:"+e.currentTarget.id)
  },
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  // 隐藏搜索框样式
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  // 清除搜索框值
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },

  // 键盘抬起事件
  inputTyping: function (e) {
 
    var that = this;
    if (e.detail.value == '') {
      return;
    }
    console.log(e.detail.value)
    that.setData({
      viewShowed: false,
      inputVal: e.detail.value
    });
    
    // let key = "金融界";
    // console.log("查询的内容", key)
    // const db = wx.cloud.database();
    // const _ = db.command
    db.collection('news').where(_.or([{
        title: db.RegExp({
          regexp: '.*' + e.detail.value,
          options: 'i',
        })
      },
      {
        author: db.RegExp({
          regexp: '.*' + e.detail.value,
          options: 'i',
        })
      }
    ])).get({
      success: res => {
        console.log(res)
        		  that.setData({
			list: res.data
		  })
      },
      fail: err => {
        console.log(err)
      }
    })





  },

  // 获取选中推荐列表中的值
  btn_name: function (res) {
    var that = this;
    that.hideInput();
    console.log('name:  ' + res.currentTarget.dataset.name);
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