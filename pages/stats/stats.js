// pages/stats/stats.js
const { DataManager, MEAL_TYPES, MEAL_NAMES } = require('../../utils/data')

Page({
  data: {
    currentWeekStart: null,
    dateRangeText: '',
    dailyGoal: 2000,
    avgDailyCalories: 0,
    avgDailyExercise: 0,
    avgCalorieBalance: 0,
    achievementRate: 0,
    achievementClass: 'text-success',
    weeklyData: []
  },

  onLoad(options) {
    this.initPage()
  },

  onShow() {
    this.loadWeeklyData()
  },

  // 初始化页面
  initPage() {
    const today = new Date()
    const weekStart = this.getWeekStart(today)
    const userProfile = DataManager.getUserProfile()
    
    this.setData({
      currentWeekStart: weekStart,
      dailyGoal: userProfile.dailyCalorieGoal
    })
    
    this.updateDateRangeText()
    this.loadWeeklyData()
  },

  // 获取一周的开始日期（周一）
  getWeekStart(date) {
    const d = new Date(date)
    const day = d.getDay()
    const diff = d.getDate() - day + (day === 0 ? -6 : 1) // 调整为周一开始
    return new Date(d.setDate(diff))
  },

  // 更新日期范围文本
  updateDateRangeText() {
    const start = this.data.currentWeekStart
    const end = new Date(start)
    end.setDate(start.getDate() + 6)
    
    const startText = `${start.getMonth() + 1}/${start.getDate()}`
    const endText = `${end.getMonth() + 1}/${end.getDate()}`
    
    this.setData({
      dateRangeText: `${startText} - ${endText}`
    })
  },

  // 上一周
  previousWeek() {
    const newWeekStart = new Date(this.data.currentWeekStart)
    newWeekStart.setDate(newWeekStart.getDate() - 7)
    
    this.setData({
      currentWeekStart: newWeekStart
    })
    
    this.updateDateRangeText()
    this.loadWeeklyData()
  },

  // 下一周
  nextWeek() {
    const today = new Date()
    const newWeekStart = new Date(this.data.currentWeekStart)
    newWeekStart.setDate(newWeekStart.getDate() + 7)
    
    // 不能超过今天
    if (newWeekStart <= today) {
      this.setData({
        currentWeekStart: newWeekStart
      })
      
      this.updateDateRangeText()
      this.loadWeeklyData()
    }
  },

  // 加载周数据
  loadWeeklyData() {
    const weekStart = this.data.currentWeekStart
    const weeklyData = []
    let totalCalories = 0
    let validDays = 0
    
    // 生成一周的7天数据
    for (let i = 0; i < 7; i++) {
      const date = new Date(weekStart)
      date.setDate(weekStart.getDate() + i)
      
      // 不显示未来日期
      if (date > new Date()) continue
      
      const dayRecords = DataManager.getDayRecords(date)
      const dayCalories = DataManager.calculateDayTotalCalories(date)
      const dayExercise = DataManager.calculateDayTotalExerciseCalories(date)
      const calorieBalance = DataManager.calculateCalorieBalance(date)
      
      if (dayCalories > 0) {
        totalCalories += dayCalories
        validDays++
      }
      
      // 生成餐次数据
      const meals = [
        {
          type: MEAL_TYPES.BREAKFAST,
          name: MEAL_NAMES[MEAL_TYPES.BREAKFAST],
          calories: DataManager.calculateMealTotalCalories(date, MEAL_TYPES.BREAKFAST),
          isMain: true
        },
        {
          type: MEAL_TYPES.MORNING_SNACK,
          name: MEAL_NAMES[MEAL_TYPES.MORNING_SNACK],
          calories: DataManager.calculateMealTotalCalories(date, MEAL_TYPES.MORNING_SNACK),
          isMain: false
        },
        {
          type: MEAL_TYPES.LUNCH,
          name: MEAL_NAMES[MEAL_TYPES.LUNCH],
          calories: DataManager.calculateMealTotalCalories(date, MEAL_TYPES.LUNCH),
          isMain: true
        },
        {
          type: MEAL_TYPES.AFTERNOON_SNACK,
          name: MEAL_NAMES[MEAL_TYPES.AFTERNOON_SNACK],
          calories: DataManager.calculateMealTotalCalories(date, MEAL_TYPES.AFTERNOON_SNACK),
          isMain: false
        },
        {
          type: MEAL_TYPES.DINNER,
          name: MEAL_NAMES[MEAL_TYPES.DINNER],
          calories: DataManager.calculateMealTotalCalories(date, MEAL_TYPES.DINNER),
          isMain: true
        },
        {
          type: MEAL_TYPES.LATE_SNACK,
          name: MEAL_NAMES[MEAL_TYPES.LATE_SNACK],
          calories: DataManager.calculateMealTotalCalories(date, MEAL_TYPES.LATE_SNACK),
          isMain: false
        }
      ]
      
      // 计算进度
      const progressPercent = Math.min(100, (dayCalories / this.data.dailyGoal) * 100)
      let progressClass = ''
      let totalClass = 'text-success'
      
      if (progressPercent >= 100) {
        progressClass = 'danger'
        totalClass = 'text-danger'
      } else if (progressPercent >= 80) {
        progressClass = 'warning'
        totalClass = 'text-warning'
      }
      
      weeklyData.push({
        date: DataManager.formatDate(date),
        dateText: this.formatDateText(date),
        totalCalories: dayCalories,
        totalExercise: dayExercise,
        calorieBalance,
        totalClass,
        progressPercent: Math.round(progressPercent),
        progressClass,
        meals
      })
    }
    
    // 计算平均值和达成率
    const avgDailyCalories = validDays > 0 ? Math.round(totalCalories / validDays) : 0
    const avgDailyExercise = validDays > 0 ? Math.round(
      weeklyData.reduce((sum, day) => sum + day.totalExercise, 0) / validDays
    ) : 0
    const avgCalorieBalance = avgDailyCalories - avgDailyExercise
    const achievementRate = validDays > 0 ? Math.round((avgDailyCalories / this.data.dailyGoal) * 100) : 0
    
    let achievementClass = 'text-success'
    if (achievementRate >= 100) {
      achievementClass = 'text-danger'
    } else if (achievementRate >= 80) {
      achievementClass = 'text-warning'
    }
    
    this.setData({
      weeklyData: weeklyData.reverse(), // 最新的在最上面
      avgDailyCalories,
      avgDailyExercise,
      avgCalorieBalance,
      achievementRate,
      achievementClass
    })
  },

  // 格式化日期文本
  formatDateText(date) {
    const month = date.getMonth() + 1
    const day = date.getDate()
    const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    const weekday = weekdays[date.getDay()]
    
    return `${month}/${day} ${weekday}`
  }
})