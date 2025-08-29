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
  },

  // 生成餐次数据
  generateMealData(dayRecords) {
    const meals = [
      { type: MEAL_TYPES.BREAKFAST, name: MEAL_NAMES[MEAL_TYPES.BREAKFAST], isMainMeal: true },
      { type: MEAL_TYPES.MORNING_SNACK, name: MEAL_NAMES[MEAL_TYPES.MORNING_SNACK], isMainMeal: false },
      { type: MEAL_TYPES.LUNCH, name: MEAL_NAMES[MEAL_TYPES.LUNCH], isMainMeal: true },
      { type: MEAL_TYPES.AFTERNOON_SNACK, name: MEAL_NAMES[MEAL_TYPES.AFTERNOON_SNACK], isMainMeal: false },
      { type: MEAL_TYPES.DINNER, name: MEAL_NAMES[MEAL_TYPES.DINNER], isMainMeal: true },
      { type: MEAL_TYPES.LATE_SNACK, name: MEAL_NAMES[MEAL_TYPES.LATE_SNACK], isMainMeal: false }
    ]
    
    return meals.map(meal => {
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
  },

  // 点击餐次卡片，跳转到记录页面
  navigateToRecord(e) {
    const mealType = e.currentTarget.dataset.meal
    wx.navigateTo({
      url: `/pages/record/record?mealType=${mealType}`
    })
  },

  // 生成运动数据
  generateExerciseData(exerciseRecords) {
    return exerciseRecords.slice(0, 3) // 最多显示3个运动记录
  },

  // 快速添加
  quickAdd() {
    wx.navigateTo({
      url: '/pages/record/record'
    })
  },

  // 添加运动记录
  addExercise() {
    wx.navigateTo({
      url: '/pages/record/record?type=exercise'
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