const db=wx.cloud.database()
const _ = db.command


Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:""
  },
  updateNews(res){

var{title,author,pic,content}=res.detail.value;
if(title==""||content==""||pic==""||author=='')
wx.showToast({
  title: '输入存在空值',
  icon:'error'
})
else{

    db.collection("news").doc(this.data.id).update({
        data:{
          title:title,
          author:author,
          content:content,
          pic:pic,
        }
      }).then(res=>{
        console.log(res)
        wx.showToast({
          title: '修改成功',
        })
      })

}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({    
			id: options.id   ,

      })   
      console.log(this.data.id)
      db.collection("news").doc(this.data.id).get({
        success:res=>{
          console.log(res)
          this.setData({
            news:res.data,
            loading:true
          })
        }
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
    
  }
})