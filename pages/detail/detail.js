// pages/detail/detail.js
const datas = require('../../datas/list-data')
const appData = getApp()
console.log(appData)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    TargetListData: {},
    index: 0,
    isCollected: false,
    isMusicPlay: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 接收跳转过来路径中传递的参数
    const {index} = options
    this.setData({
      index,
      TargetListData: datas.list_data[index]
    })
    let obj = wx.getStorageSync('isCollected')
    if (obj) {
      let isCollected = obj[index]
      if (!isCollected) {
         isCollected = false
      } else {
        isCollected = true
      }
      this.setData({
        isCollected
      })
    }
    const {isPlay, targetIndex} = appData.data
    if (isPlay && targetIndex===index) {
      this.setData({
        isMusicPlay: true
      })
    }
    wx.onBackgroundAudioPlay(() => {
      console.log('音乐播放啦...')
      this.setData({
        isMusicPlay: true
      })
      appData.data.isPlay = true
      appData.data.targetIndex = index
    })
    wx.onBackgroundAudioPause(() => {
      console.log('音乐暂停啦...')
      this.setData({
        isMusicPlay: false
      })
      appData.data.isPlay = false
    })


  },
  handleCollected () {
    const {index} = this.data
    const isCollected = !this.data.isCollected
    const title = isCollected ? '收藏成功' : '取消收藏'
    wx.showToast({
      title,
      icon: 'success'
    })
    let obj = wx.getStorageSync('isCollected') || {}
    // let obj = {}
    obj[index] = isCollected
    wx.setStorage({
      key: 'isCollected',
      data: obj
    })
    this.setData({
      isCollected
    })
  },
  handleMusic () {
    const isMusicPlay = !this.data.isMusicPlay
    this.setData({
      isMusicPlay
    })
    const {dataUrl, title} = this.data.TargetListData.music
    if (isMusicPlay) {
      wx.playBackgroundAudio({
        dataUrl,
        title
      })
    } else {
      wx.pauseBackgroundAudio()
    }
  },
  handleShare() {
    wx.showActionSheet({
      itemList: ['分享到朋友圈', '分享到QQ空间', '分享给好友'],
      itemColor: '#666'
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