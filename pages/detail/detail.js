// pages/detail/detail.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsDetail: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNewsDetail(options.id)
  },

  getNewsDetail: function(id) {
    let that = this;
    wx.showLoading({
      title: '加载中',
    })

    wx.request({
      url: `${app.baserServerAdress}/passage/info/${id}`,
      success(res) {
        wx.hideLoading();
        that.setData({
          newsDetail: res.data.data
        })
        console.log(res.data)
      },
      fail(err) {
        wx.hideLoading();
        console.log(err)
      }
    })
  }
})