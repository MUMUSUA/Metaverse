const db=wx.cloud.database()
const _ = db.command


Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },
  addNews(res){

var{title,author,pic,content}=res.detail.value;
if(title==""||content==""||pic==""||author=='')
wx.showToast({
  title: '输入存在空值',
  icon:'error'
})
else{
const date=new Date()
var post=date.getFullYear()+'年'+(date.getMonth()+1)+'月'+ date.getDate()+'日'+date.getHours()+':'+date.getMinutes()
console.log(post)
    db.collection("news").add({
        data:{
          title:title,
          author:author,
          content:content,
          pic:pic,
          hits:0,
          post:post

        }
      }).then(res=>{
        console.log(res)
        wx.showToast({
          title: '上传成功',
        })
      })

}

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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