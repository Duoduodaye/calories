// 数据模型和工具函数

// 餐次类型
const MEAL_TYPES = {
  BREAKFAST: 'breakfast',
  MORNING_SNACK: 'morning_snack',
  LUNCH: 'lunch',
  AFTERNOON_SNACK: 'afternoon_snack',
  DINNER: 'dinner',
  LATE_SNACK: 'late_snack'
}

const MEAL_NAMES = {
  [MEAL_TYPES.BREAKFAST]: '早餐',
  [MEAL_TYPES.MORNING_SNACK]: '上午加餐',
  [MEAL_TYPES.LUNCH]: '午餐',
  [MEAL_TYPES.AFTERNOON_SNACK]: '下午加餐',
  [MEAL_TYPES.DINNER]: '晚餐',
  [MEAL_TYPES.LATE_SNACK]: '夜宵'
}

// 常用食物数据库（每100g的营养数据）
const FOOD_DATABASE = [
  // 主食类
  { id: 1, name: '白米饭', category: '主食', calories: 116, protein: 2.6, fat: 0.3, carbs: 25.9 },
  { id: 2, name: '面条', category: '主食', calories: 137, protein: 4.5, fat: 0.5, carbs: 27.4 },
  { id: 3, name: '馒头', category: '主食', calories: 236, protein: 7.0, fat: 1.1, carbs: 47.0 },
  { id: 4, name: '面包', category: '主食', calories: 312, protein: 8.3, fat: 5.1, carbs: 58.6 },
  
  // 蔬菜类
  { id: 5, name: '白菜', category: '蔬菜', calories: 17, protein: 1.5, fat: 0.1, carbs: 3.2 },
  { id: 6, name: '西红柿', category: '蔬菜', calories: 19, protein: 0.9, fat: 0.2, carbs: 4.0 },
  { id: 7, name: '黄瓜', category: '蔬菜', calories: 15, protein: 0.8, fat: 0.1, carbs: 2.9 },
  { id: 8, name: '胡萝卜', category: '蔬菜', calories: 25, protein: 1.0, fat: 0.2, carbs: 6.0 },
  
  // 肉类
  { id: 9, name: '鸡胸肉', category: '肉类', calories: 133, protein: 24.6, fat: 5.0, carbs: 0 },
  { id: 10, name: '猪肉(瘦)', category: '肉类', calories: 143, protein: 20.3, fat: 6.2, carbs: 0 },
  { id: 11, name: '牛肉', category: '肉类', calories: 125, protein: 20.2, fat: 4.2, carbs: 0 },
  { id: 12, name: '鱼肉', category: '肉类', calories: 104, protein: 18.1, fat: 3.1, carbs: 0 },
  
  // 蛋类
  { id: 13, name: '鸡蛋', category: '蛋类', calories: 144, protein: 13.3, fat: 8.8, carbs: 2.8 },
  
  // 豆类
  { id: 14, name: '豆腐', category: '豆类', calories: 98, protein: 8.1, fat: 4.8, carbs: 4.2 },
  { id: 15, name: '豆浆', category: '豆类', calories: 31, protein: 2.9, fat: 1.4, carbs: 3.0 },
  
  // 水果类
  { id: 16, name: '苹果', category: '水果', calories: 54, protein: 0.2, fat: 0.2, carbs: 13.5 },
  { id: 17, name: '香蕉', category: '水果', calories: 93, protein: 1.4, fat: 0.2, carbs: 22.0 },
  { id: 18, name: '橙子', category: '水果', calories: 48, protein: 0.8, fat: 0.2, carbs: 11.1 },
  
  // 零食类
  { id: 19, name: '薯片', category: '零食', calories: 548, protein: 7.5, fat: 37.6, carbs: 49.7 },
  { id: 20, name: '巧克力', category: '零食', calories: 516, protein: 4.3, fat: 30.6, carbs: 60.0 }
]

// 运动数据库（每分钟消耗热量，基于70kg成人）
const EXERCISE_DATABASE = [
  // 有氧运动
  { id: 1, name: '跑步(8km/h)', category: '有氧运动', caloriesPerMin: 8.5, icon: '🏃' },
  { id: 2, name: '快走(6km/h)', category: '有氧运动', caloriesPerMin: 5.2, icon: '🚶' },
  { id: 3, name: '骑自行车', category: '有氧运动', caloriesPerMin: 7.3, icon: '🚴' },
  { id: 4, name: '游泳', category: '有氧运动', caloriesPerMin: 11.2, icon: '🏊' },
  { id: 5, name: '跳绳', category: '有氧运动', caloriesPerMin: 12.8, icon: '🤸' },
  { id: 6, name: '登山', category: '有氧运动', caloriesPerMin: 9.5, icon: '🧗' },
  
  // 球类运动
  { id: 7, name: '篮球', category: '球类运动', caloriesPerMin: 8.8, icon: '🏀' },
  { id: 8, name: '足球', category: '球类运动', caloriesPerMin: 9.2, icon: '⚽' },
  { id: 9, name: '羽毛球', category: '球类运动', caloriesPerMin: 6.5, icon: '🏸' },
  { id: 10, name: '乒乓球', category: '球类运动', caloriesPerMin: 4.8, icon: '🏓' },
  { id: 11, name: '网球', category: '球类运动', caloriesPerMin: 7.8, icon: '🎾' },
  
  // 力量训练
  { id: 12, name: '举重', category: '力量训练', caloriesPerMin: 6.8, icon: '🏋️' },
  { id: 13, name: '俯卧撑', category: '力量训练', caloriesPerMin: 4.2, icon: '💪' },
  { id: 14, name: '仰卧起坐', category: '力量训练', caloriesPerMin: 3.8, icon: '🤸' },
  { id: 15, name: '深蹲', category: '力量训练', caloriesPerMin: 5.5, icon: '💪' },
  
  // 休闲运动
  { id: 16, name: '瑜伽', category: '休闲运动', caloriesPerMin: 3.2, icon: '🧘' },
  { id: 17, name: '太极拳', category: '休闲运动', caloriesPerMin: 2.8, icon: '🥋' },
  { id: 18, name: '舞蹈', category: '休闲运动', caloriesPerMin: 5.8, icon: '💃' },
  { id: 19, name: '健身操', category: '休闲运动', caloriesPerMin: 6.2, icon: '🤸' },
  
  // 日常活动
  { id: 20, name: '家务清洁', category: '日常活动', caloriesPerMin: 3.5, icon: '🧹' },
  { id: 21, name: '爬楼梯', category: '日常活动', caloriesPerMin: 8.2, icon: '🪜' },
  { id: 22, name: '购物', category: '日常活动', caloriesPerMin: 2.8, icon: '🛒' },
  { id: 23, name: '遛狗', category: '日常活动', caloriesPerMin: 3.8, icon: '🐕' }
]

// 数据存储键名
const STORAGE_KEYS = {
  USER_PROFILE: 'user_profile',
  DAILY_RECORDS: 'daily_records',
  FOOD_RECORDS: 'food_records',
  EXERCISE_RECORDS: 'exercise_records'
}

// 工具函数
class DataManager {
  
  // 获取食物数据库
  static getFoodDatabase() {
    return FOOD_DATABASE
  }
  
  // 根据ID查找食物
  static getFoodById(id) {
    return FOOD_DATABASE.find(food => food.id === id)
  }
  
  // 搜索食物
  static searchFood(keyword) {
    if (!keyword) return FOOD_DATABASE
    return FOOD_DATABASE.filter(food => 
      food.name.includes(keyword) || food.category.includes(keyword)
    )
  }
  
  // 根据分类获取食物
  static getFoodByCategory(category) {
    if (!category) return FOOD_DATABASE
    return FOOD_DATABASE.filter(food => food.category === category)
  }
  
  // 计算食物营养
  static calculateNutrition(food, weight) {
    const ratio = weight / 100 // 转换为每100g的比例
    return {
      calories: Math.round(food.calories * ratio),
      protein: Math.round(food.protein * ratio * 10) / 10,
      fat: Math.round(food.fat * ratio * 10) / 10,
      carbs: Math.round(food.carbs * ratio * 10) / 10
    }
  }
  
  // 保存用户资料
  static saveUserProfile(profile) {
    wx.setStorageSync(STORAGE_KEYS.USER_PROFILE, profile)
  }
  
  // 获取用户资料
  static getUserProfile() {
    return wx.getStorageSync(STORAGE_KEYS.USER_PROFILE) || {
      dailyCalorieGoal: 2000, // 默认每日热量目标
      height: 0,
      weight: 0,
      age: 0,
      gender: ''
    }
  }
  
  // 保存食物记录
  static saveFoodRecord(date, mealType, foodId, weight) {
    const records = this.getFoodRecords()
    const dateKey = this.formatDate(date)
    
    if (!records[dateKey]) {
      records[dateKey] = {}
    }
    
    if (!records[dateKey][mealType]) {
      records[dateKey][mealType] = []
    }
    
    const food = this.getFoodById(foodId)
    const nutrition = this.calculateNutrition(food, weight)
    
    const record = {
      id: Date.now(), // 简单的ID生成
      foodId,
      foodName: food.name,
      weight,
      ...nutrition,
      timestamp: new Date().getTime()
    }
    
    records[dateKey][mealType].push(record)
    wx.setStorageSync(STORAGE_KEYS.FOOD_RECORDS, records)
    
    return record
  }
  
  // 获取食物记录
  static getFoodRecords() {
    return wx.getStorageSync(STORAGE_KEYS.FOOD_RECORDS) || {}
  }
  
  // 获取指定日期的记录
  static getDayRecords(date) {
    const records = this.getFoodRecords()
    const dateKey = this.formatDate(date)
    return records[dateKey] || {}
  }
  
  // 删除食物记录
  static deleteFoodRecord(date, mealType, recordId) {
    const records = this.getFoodRecords()
    const dateKey = this.formatDate(date)
    
    if (records[dateKey] && records[dateKey][mealType]) {
      records[dateKey][mealType] = records[dateKey][mealType].filter(
        record => record.id !== recordId
      )
      wx.setStorageSync(STORAGE_KEYS.FOOD_RECORDS, records)
    }
  }
  
  // 计算某天总热量
  static calculateDayTotalCalories(date) {
    const dayRecords = this.getDayRecords(date)
    let total = 0
    
    Object.values(dayRecords).forEach(mealRecords => {
      if (Array.isArray(mealRecords)) {
        mealRecords.forEach(record => {
          total += record.calories
        })
      }
    })
    
    return total
  }
  
  // 计算某餐总热量
  static calculateMealTotalCalories(date, mealType) {
    const dayRecords = this.getDayRecords(date)
    const mealRecords = dayRecords[mealType] || []
    
    return mealRecords.reduce((total, record) => total + record.calories, 0)
  }
  
  // 格式化日期
  static formatDate(date) {
    const d = new Date(date)
    const year = d.getFullYear()
    const month = (d.getMonth() + 1).toString().padStart(2, '0')
    const day = d.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
  }
  
  // 获取今天的日期字符串
  static getTodayString() {
    return this.formatDate(new Date())
  }

  // ===== 运动相关方法 =====
  
  // 获取运动数据库
  static getExerciseDatabase() {
    return EXERCISE_DATABASE
  }
  
  // 根据ID查找运动
  static getExerciseById(id) {
    return EXERCISE_DATABASE.find(exercise => exercise.id === id)
  }
  
  // 搜索运动
  static searchExercise(keyword) {
    if (!keyword) return EXERCISE_DATABASE
    return EXERCISE_DATABASE.filter(exercise => 
      exercise.name.includes(keyword) || exercise.category.includes(keyword)
    )
  }
  
  // 根据分类获取运动
  static getExerciseByCategory(category) {
    if (!category || category === '全部') return EXERCISE_DATABASE
    return EXERCISE_DATABASE.filter(exercise => exercise.category === category)
  }
  
  // 计算运动消耗热量（根据体重调整）
  static calculateExerciseCalories(exercise, duration, userWeight = 70) {
    const weightFactor = userWeight / 70 // 基准体重70kg
    const totalCalories = exercise.caloriesPerMin * duration * weightFactor
    return Math.round(totalCalories)
  }
  
  // 保存运动记录
  static saveExerciseRecord(date, exerciseId, duration, userWeight = 70) {
    const records = this.getExerciseRecords()
    const dateKey = this.formatDate(date)
    
    if (!records[dateKey]) {
      records[dateKey] = []
    }
    
    const exercise = this.getExerciseById(exerciseId)
    const caloriesBurned = this.calculateExerciseCalories(exercise, duration, userWeight)
    
    const record = {
      id: Date.now(), // 简单的ID生成
      exerciseId,
      exerciseName: exercise.name,
      category: exercise.category,
      icon: exercise.icon,
      duration, // 分钟
      caloriesBurned,
      timestamp: new Date().getTime()
    }
    
    records[dateKey].push(record)
    wx.setStorageSync(STORAGE_KEYS.EXERCISE_RECORDS, records)
    
    return record
  }
  
  // 获取运动记录
  static getExerciseRecords() {
    return wx.getStorageSync(STORAGE_KEYS.EXERCISE_RECORDS) || {}
  }
  
  // 获取指定日期的运动记录
  static getDayExerciseRecords(date) {
    const records = this.getExerciseRecords()
    const dateKey = this.formatDate(date)
    return records[dateKey] || []
  }
  
  // 删除运动记录
  static deleteExerciseRecord(date, recordId) {
    const records = this.getExerciseRecords()
    const dateKey = this.formatDate(date)
    
    if (records[dateKey]) {
      records[dateKey] = records[dateKey].filter(
        record => record.id !== recordId
      )
      wx.setStorageSync(STORAGE_KEYS.EXERCISE_RECORDS, records)
    }
  }
  
  // 计算某天总运动消耗
  static calculateDayTotalExerciseCalories(date) {
    const dayRecords = this.getDayExerciseRecords(date)
    return dayRecords.reduce((total, record) => total + record.caloriesBurned, 0)
  }
  
  // 计算热量差（摄入 - 消耗）
  static calculateCalorieBalance(date) {
    const caloriesIn = this.calculateDayTotalCalories(date)
    const caloriesOut = this.calculateDayTotalExerciseCalories(date)
    return caloriesIn - caloriesOut
  }
}

module.exports = {
  MEAL_TYPES,
  MEAL_NAMES,
  FOOD_DATABASE,
  EXERCISE_DATABASE,
  DataManager
}