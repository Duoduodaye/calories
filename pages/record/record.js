// pages/record/record.js
const { DataManager, MEAL_TYPES, MEAL_NAMES, EXERCISE_DATABASE } = require('../../utils/data')

Page({
  data: {
    // 页面模式：'food' 或 'exercise'
    recordType: 'food',
    
    // 餐次相关
    selectedMeal: MEAL_TYPES.BREAKFAST,
    mealTypes: [
      { type: MEAL_TYPES.BREAKFAST, name: MEAL_NAMES[MEAL_TYPES.BREAKFAST], isMain: true },
      { type: MEAL_TYPES.MORNING_SNACK, name: MEAL_NAMES[MEAL_TYPES.MORNING_SNACK], isMain: false },
      { type: MEAL_TYPES.LUNCH, name: MEAL_NAMES[MEAL_TYPES.LUNCH], isMain: true },
      { type: MEAL_TYPES.AFTERNOON_SNACK, name: MEAL_NAMES[MEAL_TYPES.AFTERNOON_SNACK], isMain: false },
      { type: MEAL_TYPES.DINNER, name: MEAL_NAMES[MEAL_TYPES.DINNER], isMain: true },
      { type: MEAL_TYPES.LATE_SNACK, name: MEAL_NAMES[MEAL_TYPES.LATE_SNACK], isMain: false }
    ],
    
    // 搜索相关
    searchKeyword: '',
    selectedCategory: '全部',
    categories: ['全部', '主食', '蔬菜', '肉类', '蛋类', '豆类', '水果', '零食', '中式菜品', '快餐', '甜点', '汤类', '坚果', '海鲜', '奶制品'],
    exerciseCategories: ['全部', '有氧运动', '球类运动', '力量训练', '休闲运动', '日常活动'],
    
    // 食物数据
    allFoods: [],
    filteredFoods: [],
    
    // 运动数据
    allExercises: [],
    filteredExercises: [],
    
    // 模态框相关
    showWeightModal: false,
    selectedFood: null,
    inputWeight: '',
    quickWeights: [50, 100, 150, 200, 250],
    calculatedNutrition: null,
    
    // 运动模态框相关
    showExerciseModal: false,
    selectedExercise: null,
    inputDuration: '',
    quickDurations: [15, 30, 45, 60, 90],
    calculatedCalories: 0,
    userWeight: 70
  },

  onLoad(options) {
    // 判断记录类型
    const recordType = options.type === 'exercise' ? 'exercise' : 'food'
    
    this.setData({
      recordType
    })
    
    this.initPage()
  },

  onShow() {
    // 页面显示时检查是否有存储的餐次类型
    const storedMealType = wx.getStorageSync('selectedMealType')
    const storedRecordType = wx.getStorageSync('recordType')
    console.log('页面显示，检查存储的餐次类型:', storedMealType)
    console.log('页面显示，检查存储的记录类型:', storedRecordType)
    
    if (storedMealType && MEAL_TYPES[storedMealType.toUpperCase()]) {
      console.log('设置选中的餐次:', storedMealType)
      this.setData({
        selectedMeal: storedMealType,
        recordType: 'food'
      })
      // 清除存储的类型，避免影响下次进入
      wx.removeStorageSync('selectedMealType')
    } else if (storedRecordType === 'exercise') {
      console.log('设置为运动记录模式')
      this.setData({
        recordType: 'exercise'
      })
      // 清除存储的类型
      wx.removeStorageSync('recordType')
    }
    
    // 重新初始化页面数据
    this.initPage()
  },

  // 初始化页面
  initPage() {
    const userProfile = DataManager.getUserProfile()
    
    if (this.data.recordType === 'exercise') {
      const allExercises = DataManager.getExerciseDatabase()
      this.setData({
        allExercises,
        filteredExercises: allExercises,
        selectedCategory: '全部',
        userWeight: userProfile.weight || 70
      })
    } else {
      const allFoods = DataManager.getFoodDatabase()
      this.setData({
        allFoods,
        filteredFoods: allFoods,
        selectedCategory: '全部'
      })
    }
  },

  // 选择餐次
  selectMeal(e) {
    const mealType = e.currentTarget.dataset.meal
    this.setData({
      selectedMeal: mealType
    })
  },

  // 搜索输入
  onSearchInput(e) {
    const keyword = e.detail.value
    this.setData({
      searchKeyword: keyword
    })
    
    if (this.data.recordType === 'exercise') {
      this.filterExercises()
    } else {
      this.filterFoods()
    }
  },

  // 清除搜索
  clearSearch() {
    this.setData({
      searchKeyword: ''
    })
    
    if (this.data.recordType === 'exercise') {
      this.filterExercises()
    } else {
      this.filterFoods()
    }
  },

  // 选择分类
  selectCategory(e) {
    const category = e.currentTarget.dataset.category
    this.setData({
      selectedCategory: category
    })
    
    if (this.data.recordType === 'exercise') {
      this.filterExercises()
    } else {
      this.filterFoods()
    }
  },

  // 过滤食物
  filterFoods() {
    const { allFoods, searchKeyword, selectedCategory } = this.data
    let filtered = allFoods
    
    // 按关键词过滤
    if (searchKeyword) {
      filtered = filtered.filter(food => 
        food.name.includes(searchKeyword) || 
        food.category.includes(searchKeyword)
      )
    }
    
    // 按分类过滤
    if (selectedCategory !== '全部') {
      filtered = filtered.filter(food => food.category === selectedCategory)
    }
    
    this.setData({
      filteredFoods: filtered
    })
  },
  
  // 过滤运动
  filterExercises() {
    const { allExercises, searchKeyword, selectedCategory } = this.data
    let filtered = allExercises
    
    // 按关键词过滤
    if (searchKeyword) {
      filtered = filtered.filter(exercise => 
        exercise.name.includes(searchKeyword) || 
        exercise.category.includes(searchKeyword)
      )
    }
    
    // 按分类过滤
    if (selectedCategory !== '全部') {
      filtered = filtered.filter(exercise => exercise.category === selectedCategory)
    }
    
    this.setData({
      filteredExercises: filtered
    })
  },

  // 选择食物
  selectFood(e) {
    const food = e.currentTarget.dataset.food
    console.log('选择食物:', food?.name)
    
    const defaultNutrition = DataManager.calculateNutrition(food, 100)
    console.log('默认100g营养信息:', defaultNutrition)
    
    this.setData({
      selectedFood: food,
      showWeightModal: true,
      inputWeight: '100', // 默认100g
      calculatedNutrition: defaultNutrition
    }, () => {
      console.log('选择食物后的状态:', {
        selectedFood: this.data.selectedFood?.name,
        inputWeight: this.data.inputWeight,
        showWeightModal: this.data.showWeightModal
      })
    })
  },

  // 关闭重量输入模态框
  closeWeightModal() {
    this.setData({
      showWeightModal: false,
      selectedFood: null,
      inputWeight: '',
      calculatedNutrition: null
    })
  },

  // 重量输入
  onWeightInput(e) {
    const inputValue = e.detail.value
    const weight = parseFloat(inputValue) || 0
    
    console.log('重量输入:', {
      inputValue,
      weight,
      selectedFood: this.data.selectedFood?.name
    })
    
    this.setData({
      inputWeight: inputValue
    })
    
    if (weight > 0 && this.data.selectedFood) {
      const nutrition = DataManager.calculateNutrition(this.data.selectedFood, weight)
      console.log('输入重量计算营养:', nutrition)
      this.setData({
        calculatedNutrition: nutrition
      })
    } else {
      this.setData({
        calculatedNutrition: null
      })
    }
  },

  // 快速选择重量
  selectQuickWeight(e) {
    const weight = parseInt(e.currentTarget.dataset.weight)
    console.log('快速选择重量:', weight, '类型:', typeof weight, '原始数据:', e.currentTarget.dataset.weight)
    
    // 强制更新界面
    this.setData({
      inputWeight: weight.toString(),
      calculatedNutrition: null
    }, () => {
      console.log('快速选择设置后的inputWeight:', this.data.inputWeight)
      
      // 重新计算营养信息
      if (this.data.selectedFood && weight > 0) {
        const nutrition = DataManager.calculateNutrition(this.data.selectedFood, weight)
        console.log('快速选择计算的营养信息:', nutrition)
        this.setData({
          calculatedNutrition: nutrition
        })
      }
    })
  },

  // 选择运动
  selectExercise(e) {
    const exercise = e.currentTarget.dataset.exercise
    const duration = 30 // 默认30分钟
    const calories = DataManager.calculateExerciseCalories(exercise, duration, this.data.userWeight)
    
    this.setData({
      selectedExercise: exercise,
      showExerciseModal: true,
      inputDuration: '30',
      calculatedCalories: calories
    })
  },
  
  // 关闭运动模态框
  closeExerciseModal() {
    this.setData({
      showExerciseModal: false,
      selectedExercise: null,
      inputDuration: '',
      calculatedCalories: 0
    })
  },
  
  // 时长输入
  onDurationInput(e) {
    const duration = parseFloat(e.detail.value) || 0
    this.setData({
      inputDuration: e.detail.value
    })
    
    if (duration > 0 && this.data.selectedExercise) {
      const calories = DataManager.calculateExerciseCalories(
        this.data.selectedExercise, 
        duration, 
        this.data.userWeight
      )
      this.setData({
        calculatedCalories: calories
      })
    } else {
      this.setData({
        calculatedCalories: 0
      })
    }
  },
  
  // 快速选择时长
  selectQuickDuration(e) {
    const duration = e.currentTarget.dataset.duration
    this.setData({
      inputDuration: duration.toString()
    })
    
    if (this.data.selectedExercise) {
      const calories = DataManager.calculateExerciseCalories(
        this.data.selectedExercise, 
        duration, 
        this.data.userWeight
      )
      this.setData({
        calculatedCalories: calories
      })
    }
  },
  
  // 确认添加运动
  confirmAddExercise() {
    const { selectedExercise, inputDuration, userWeight } = this.data
    const duration = parseFloat(inputDuration)
    
    if (!selectedExercise || !duration || duration <= 0) {
      wx.showToast({
        title: '请输入正确的时长',
        icon: 'none'
      })
      return
    }
    
    try {
      // 保存运动记录
      const record = DataManager.saveExerciseRecord(
        new Date(),
        selectedExercise.id,
        duration,
        userWeight
      )
      
      wx.showToast({
        title: '添加成功',
        icon: 'success'
      })
      
      // 关闭模态框
      this.closeExerciseModal()
      
      // 延迟返回上一页
      setTimeout(() => {
        wx.navigateBack()
      }, 1000)
      
    } catch (error) {
      console.error('添加运动记录失败:', error)
      wx.showToast({
        title: '添加失败',
        icon: 'none'
      })
    }
  },

  // 确认添加食物
  confirmAdd() {
    const { selectedFood, selectedMeal, inputWeight } = this.data
    const weight = parseFloat(inputWeight)
    
    console.log('确认添加食物:', {
      selectedFood: selectedFood?.name,
      selectedMeal,
      inputWeight,
      parsedWeight: weight,
      inputWeightType: typeof inputWeight
    })
    
    if (!selectedFood || !weight || weight <= 0) {
      console.log('验证失败:', {
        hasSelectedFood: !!selectedFood,
        hasWeight: !!weight,
        weightValue: weight
      })
      wx.showToast({
        title: '请输入正确的重量',
        icon: 'none'
      })
      return
    }
    
    try {
      // 保存记录
      const record = DataManager.saveFoodRecord(
        new Date(),
        selectedMeal,
        selectedFood.id,
        weight
      )
      
      wx.showToast({
        title: '添加成功',
        icon: 'success'
      })
      
      // 关闭模态框
      this.closeWeightModal()
      
      // 延迟返回上一页
      setTimeout(() => {
        wx.navigateBack()
      }, 1000)
      
    } catch (error) {
      console.error('添加记录失败:', error)
      wx.showToast({
        title: '添加失败',
        icon: 'none'
      })
    }
  }
})