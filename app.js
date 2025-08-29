// app.js
const { DataManager } = require('./utils/data')

App({
  onLaunch() {
    // 小程序启动时的处理
    console.log('热量记录小助手启动')
    
    // 初始化用户数据
    this.initUserData()
  },
  
  onShow() {
    // 小程序显示时的处理
  },
  
  onHide() {
    // 小程序隐藏时的处理
  },
  
  // 初始化用户数据
  initUserData() {
    const profile = DataManager.getUserProfile()
    this.globalData.userProfile = profile
  },
  
  // 全局数据
  globalData: {
    userProfile: null
  }
})