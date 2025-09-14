// pages/index/index.js
const { DataManager, MEAL_TYPES, MEAL_NAMES } = require('../../utils/data')

Page({
  data: {
    todayDate: '',
    todayCalories: 0,
    todayExerciseCalories: 0,
    calorieBalance: 0,
    dailyGoal: 2000,
    remainingCalories: 2000,
    progressPercent: 0,
    progressClass: '',
    mealData: [],
    exerciseData: []
  },

  onLoad(options) {
    this.initPage()
  },

  onShow() {
    // 页面显示时刷新数据
    this.loadTodayData()
  },

  // 初始化页面
  initPage() {
    const today = new Date()
    const dateStr = this.formatDate(today)
    
    // 获取用户设置
    const userProfile = DataManager.getUserProfile()
    
    this.setData({
      todayDate: dateStr,
      dailyGoal: userProfile.dailyCalorieGoal
    })
    
    this.loadTodayData()
  },

  // 加载今日数据
  loadTodayData() {
    const today = new Date()
    const dayRecords = DataManager.getDayRecords(today)
    const exerciseRecords = DataManager.getDayExerciseRecords(today)
    
    // 计算今日总热量和运动消耗
    const todayCalories = DataManager.calculateDayTotalCalories(today)
    const todayExerciseCalories = DataManager.calculateDayTotalExerciseCalories(today)
    const calorieBalance = DataManager.calculateCalorieBalance(today)
    
    // 计算进度（基于净热量）
    const dailyGoal = this.data.dailyGoal
    const netCalories = Math.max(0, todayCalories - todayExerciseCalories)
    const remainingCalories = Math.max(0, dailyGoal - netCalories)
    const progressPercent = Math.min(100, (netCalories / dailyGoal) * 100)
    
    // 设置进度条颜色
    let progressClass = ''
    if (progressPercent >= 100) {
      progressClass = 'danger'
    } else if (progressPercent >= 80) {
      progressClass = 'warning'
    }
    
    // 生成餐次和运动数据
    const mealData = this.generateMealData(dayRecords)
    const exerciseData = this.generateExerciseData(exerciseRecords)
    
    console.log('setData - mealData:', mealData)
    
    this.setData({
      todayCalories,
      todayExerciseCalories,
      calorieBalance,
      remainingCalories,
      progressPercent: Math.round(progressPercent),
      progressClass,
      mealData,
      exerciseData
    })
    
    console.log('setData完成，当前data.mealData:', this.data.mealData)
  },

  // 生成餐次数据
  generateMealData(dayRecords) {
    console.log('generateMealData - dayRecords:', dayRecords)
    console.log('MEAL_TYPES:', MEAL_TYPES)
    console.log('MEAL_NAMES:', MEAL_NAMES)
    
    const meals = [
      { type: MEAL_TYPES.BREAKFAST, name: MEAL_NAMES[MEAL_TYPES.BREAKFAST], isMainMeal: true },
      { type: MEAL_TYPES.MORNING_SNACK, name: MEAL_NAMES[MEAL_TYPES.MORNING_SNACK], isMainMeal: false },
      { type: MEAL_TYPES.LUNCH, name: MEAL_NAMES[MEAL_TYPES.LUNCH], isMainMeal: true },
      { type: MEAL_TYPES.AFTERNOON_SNACK, name: MEAL_NAMES[MEAL_TYPES.AFTERNOON_SNACK], isMainMeal: false },
      { type: MEAL_TYPES.DINNER, name: MEAL_NAMES[MEAL_TYPES.DINNER], isMainMeal: true },
      { type: MEAL_TYPES.LATE_SNACK, name: MEAL_NAMES[MEAL_TYPES.LATE_SNACK], isMainMeal: false }
    ]
    
    const result = meals.map(meal => {
      const mealRecords = dayRecords[meal.type] || []
      const calories = mealRecords.reduce((total, record) => total + record.calories, 0)
      
      return {
        type: meal.type,
        name: meal.name,
        calories,
        isMainMeal: meal.isMainMeal,
        foods: mealRecords.slice(0, 3) // 最多显示3个食物
      }
    })
    
    console.log('generateMealData - result:', result)
    return result
  },

  // 点击餐次卡片，跳转到记录页面
  navigateToRecord(e) {
    console.log('点击餐次卡片', e)
    const mealType = e.currentTarget.dataset.meal
    console.log('餐次类型:', mealType)
    
    // 由于record页面是tabBar页面，不能用navigateTo，需要用switchTab
    // 先存储餐次类型到全局变量或storage
    wx.setStorageSync('selectedMealType', mealType)
    console.log('已存储餐次类型到storage:', mealType)
    
    wx.switchTab({
      url: '/pages/record/record',
      success: (res) => {
        console.log('切换到记录页面成功', res)
      },
      fail: (err) => {
        console.error('切换到记录页面失败', err)
      }
    })
  },

  // 生成运动数据
  generateExerciseData(exerciseRecords) {
    return exerciseRecords.slice(0, 3) // 最多显示3个运动记录
  },

  // 快速添加
  quickAdd() {
    console.log('点击快速记录按钮')
    // 清除之前存储的餐次类型，使用默认行为
    wx.removeStorageSync('selectedMealType')
    
    wx.switchTab({
      url: '/pages/record/record',
      success: (res) => {
        console.log('快速记录页面跳转成功', res)
      },
      fail: (err) => {
        console.error('快速记录页面跳转失败', err)
      }
    })
  },

  // 添加运动记录
  addExercise() {
    console.log('点击添加运动记录')
    // 存储运动记录标识
    wx.setStorageSync('recordType', 'exercise')
    
    wx.switchTab({
      url: '/pages/record/record',
      success: (res) => {
        console.log('切换到运动记录页面成功', res)
      },
      fail: (err) => {
        console.error('切换到运动记录页面失败', err)
      }
    })
  },

  // 格式化日期
  formatDate(date) {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const weekdays = ['日', '一', '二', '三', '四', '五', '六']
    const weekday = weekdays[date.getDay()]
    
    return `${month}月${day}日 星期${weekday}`
  }
})