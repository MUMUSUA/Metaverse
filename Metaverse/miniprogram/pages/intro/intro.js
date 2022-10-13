// pages/videos/videos.js
var app = getApp();
const fetch = require('../../utils/get.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src1: 'http://localhost:3000/001.mp4',
    src2: 'http://localhost:3000/002.mp4'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   	      // 显示模态对话框
           wx.showLoading({
            title: "努力加载中"
            })
            // 请求数据
            fetch('metaverse/intro').then((res) => {
            wx.hideLoading();
            this.setData({
              
              listData: res.data,
              loading: true
            })
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