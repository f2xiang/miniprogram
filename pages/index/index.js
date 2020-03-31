//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    typeList: [],
    newsList: [],
    selectedIndex: 0 //默认选中
  },

  onLoad(options) {
    this.getTypeList()
    this.getNewsListByType()
    // Promise.all([this.getTypeList, this.getNewsListByType(this.newsList[0].id)]).then(res => {
    //   console.info(res)
    // }).catch(err => {
    //   console,info(err)
    // })
  },

 

  toDetail: function(e) {
    wx.navigateTo({
      url: `../detail/detail?id=${e.currentTarget.dataset.id}`,
    })
  },

  //获取类型信息
  getTypeList: function() {
    let that = this;
    wx.showLoading({
      title: '加载中',
    })

    wx.request({
      url: `${app.baserServerAdress}/type/list`, 
      success(res) {
        wx.hideLoading();
        that.setData({
          typeList: res.data.data
        })
        console.log(res.data)
      },
      fail(err) {
        wx.hideLoading();
        console.log(err)
      }
    })
  },

  getNewsListByType: function (event) {
    let that = this;
    wx.showLoading({
      title: '加载中',
    })

    let id = 1001; //默认初始
    if(event) {
      id = event.currentTarget.dataset.id;
      this.setData({
        selectedIndex: event.currentTarget.dataset.index
      })
    }

    wx.request({
      url: `${app.baserServerAdress}/passage/list/${id}`,
      success(res) {
        wx.hideLoading();
        let data = res.data.data;
        for(let i = 0; i < data.length; i++) {
          try{
            let coverImgObj = JSON.parse(data[i].coverImg)
            data[i].coverImg = coverImgObj;
          }catch(err) {
            console.log(err)
          }
        }
        that.setData({
          newsList: data
        })
      },
      fail(err) {
        wx.hideLoading();
        console.log(err)
      }
    })
  }

})