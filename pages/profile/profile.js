// pages/profile/profile.js
const { DataManager } = require('../../utils/data')

Page({
  data: {
    dailyGoal: 2000,
    age: '',
    height: '',
    weight: '',
    genderOptions: [
      { label: '♂ 男', value: '男', icon: '♂' },
      { label: '♀ 女', value: '女', icon: '♀' }
    ],
    genderIndex: -1,
    bmi: '',
    bmiClass: '',
    bmiStatus: ''
  },

  onLoad(options) {
    this.loadUserProfile()
  },

  // 加载用户资料
  loadUserProfile() {
    const profile = DataManager.getUserProfile()
    
    let genderIndex = -1
    if (profile.gender === '男') genderIndex = 0
    if (profile.gender === '女') genderIndex = 1
    
    this.setData({
      dailyGoal: profile.dailyCalorieGoal || 2000,
      age: profile.age || '',
      height: profile.height || '',
      weight: profile.weight || '',
      genderIndex
    })
    
    this.calculateBMI()
  },

  // 每日目标输入
  onDailyGoalInput(e) {
    const value = e.detail.value
    this.setData({
      dailyGoal: value === '' ? '' : (parseInt(value) || '')
    })
  },

  // 年龄输入
  onAgeInput(e) {
    this.setData({
      age: e.detail.value
    })
  },

  // 身高输入
  onHeightInput(e) {
    this.setData({
      height: e.detail.value
    })
    this.calculateBMI()
  },

  // 体重输入
  onWeightInput(e) {
    this.setData({
      weight: e.detail.value
    })
    this.calculateBMI()
  },

  // 性别选择
  onGenderChange(e) {
    this.setData({
      genderIndex: parseInt(e.detail.value)
    })
  },

  // 计算BMI
  calculateBMI() {
    const { height, weight } = this.data
    const h = parseFloat(height)
    const w = parseFloat(weight)
    
    if (h > 0 && w > 0) {
      const heightInMeter = h / 100
      const bmi = (w / (heightInMeter * heightInMeter)).toFixed(1)
      
      let bmiClass = 'text-success'
      let bmiStatus = '正常范围'
      
      if (bmi < 18.5) {
        bmiClass = 'text-warning'
        bmiStatus = '偏瘦'
      } else if (bmi >= 25) {
        bmiClass = 'text-danger'
        bmiStatus = '超重'
      } else if (bmi >= 24) {
        bmiClass = 'text-warning'
        bmiStatus = '偏肥'
      }
      
      this.setData({
        bmi,
        bmiClass,
        bmiStatus
      })
    } else {
      this.setData({
        bmi: '',
        bmiClass: '',
        bmiStatus: ''
      })
    }
  },

  // 保存设置
  saveProfile() {
    const { dailyGoal, age, height, weight, genderIndex, genderOptions } = this.data
    
    const profile = {
      dailyCalorieGoal: parseInt(dailyGoal) || 2000,
      age: parseInt(age) || 0,
      height: parseInt(height) || 0,
      weight: parseInt(weight) || 0,
      gender: genderIndex >= 0 ? genderOptions[genderIndex].value : ''
    }
    
    DataManager.saveUserProfile(profile)
    
    wx.showToast({
      title: '保存成功',
      icon: 'success'
    })
  },

  // 清空数据
  clearData() {
    wx.showModal({
      title: '确认清空',
      content: '清空后所有记录和设置都将丢失，无法恢复！',
      success: (res) => {
        if (res.confirm) {
          try {
            wx.clearStorageSync()
            wx.showToast({
              title: '清空成功',
              icon: 'success'
            })
            
            // 重新加载默认数据
            setTimeout(() => {
              this.setData({
                dailyGoal: 2000,
                age: '',
                height: '',
                weight: '',
                genderIndex: -1,
                bmi: '',
                bmiClass: '',
                bmiStatus: ''
              })
            }, 1000)
          } catch (error) {
            wx.showToast({
              title: '清空失败',
              icon: 'none'
            })
          }
        }
      }
    })
  }
})