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
  { id: 21, name: '小米粥', category: '主食', calories: 46, protein: 1.5, fat: 0.2, carbs: 9.0 },
  { id: 22, name: '燕麦', category: '主食', calories: 367, protein: 15.0, fat: 7.0, carbs: 61.0 },
  { id: 23, name: '玉米', category: '主食', calories: 106, protein: 4.0, fat: 1.2, carbs: 22.8 },
  { id: 24, name: '红薯', category: '主食', calories: 99, protein: 1.1, fat: 0.2, carbs: 24.7 },
  
  // 蔬菜类
  { id: 5, name: '白菜', category: '蔬菜', calories: 17, protein: 1.5, fat: 0.1, carbs: 3.2 },
  { id: 6, name: '西红柿', category: '蔬菜', calories: 19, protein: 0.9, fat: 0.2, carbs: 4.0 },
  { id: 7, name: '黄瓜', category: '蔬菜', calories: 15, protein: 0.8, fat: 0.1, carbs: 2.9 },
  { id: 8, name: '胡萝卜', category: '蔬菜', calories: 25, protein: 1.0, fat: 0.2, carbs: 6.0 },
  { id: 25, name: '菠菜', category: '蔬菜', calories: 28, protein: 2.6, fat: 0.3, carbs: 4.5 },
  { id: 26, name: '西兰花', category: '蔬菜', calories: 33, protein: 4.1, fat: 0.6, carbs: 4.3 },
  { id: 27, name: '土豆', category: '蔬菜', calories: 81, protein: 2.0, fat: 0.1, carbs: 17.8 },
  { id: 28, name: '洋葱', category: '蔬菜', calories: 39, protein: 1.8, fat: 0.2, carbs: 9.0 },
  { id: 29, name: '茄子', category: '蔬菜', calories: 21, protein: 1.1, fat: 0.1, carbs: 4.9 },
  { id: 30, name: '青椒', category: '蔬菜', calories: 23, protein: 1.0, fat: 0.2, carbs: 5.5 },
  
  // 肉类
  { id: 9, name: '鸡胸肉', category: '肉类', calories: 133, protein: 24.6, fat: 5.0, carbs: 0 },
  { id: 10, name: '猪肉(瘦)', category: '肉类', calories: 143, protein: 20.3, fat: 6.2, carbs: 0 },
  { id: 11, name: '牛肉', category: '肉类', calories: 125, protein: 20.2, fat: 4.2, carbs: 0 },
  { id: 12, name: '鱼肉', category: '肉类', calories: 104, protein: 18.1, fat: 3.1, carbs: 0 },
  { id: 31, name: '虾', category: '肉类', calories: 87, protein: 18.6, fat: 0.8, carbs: 0 },
  { id: 32, name: '鸡腿肉', category: '肉类', calories: 181, protein: 18.0, fat: 12.0, carbs: 0 },
  { id: 33, name: '三文鱼', category: '肉类', calories: 139, protein: 20.0, fat: 6.3, carbs: 0 },
  { id: 34, name: '羊肉', category: '肉类', calories: 118, protein: 19.0, fat: 4.2, carbs: 0 },
  
  // 蛋类
  { id: 13, name: '鸡蛋', category: '蛋类', calories: 144, protein: 13.3, fat: 8.8, carbs: 2.8 },
  { id: 35, name: '鸭蛋', category: '蛋类', calories: 180, protein: 12.8, fat: 13.8, carbs: 3.1 },
  { id: 36, name: '鹌鹑蛋', category: '蛋类', calories: 160, protein: 11.1, fat: 11.1, carbs: 2.1 },
  
  // 豆类
  { id: 14, name: '豆腐', category: '豆类', calories: 98, protein: 8.1, fat: 4.8, carbs: 4.2 },
  { id: 15, name: '豆浆', category: '豆类', calories: 31, protein: 2.9, fat: 1.4, carbs: 3.0 },
  { id: 37, name: '黄豆', category: '豆类', calories: 390, protein: 35.0, fat: 16.0, carbs: 18.0 },
  { id: 38, name: '绿豆', category: '豆类', calories: 316, protein: 21.6, fat: 0.8, carbs: 62.0 },
  { id: 39, name: '豆腐干', category: '豆类', calories: 140, protein: 11.5, fat: 5.8, carbs: 11.5 },
  
  // 水果类
  { id: 16, name: '苹果', category: '水果', calories: 54, protein: 0.2, fat: 0.2, carbs: 13.5 },
  { id: 17, name: '香蕉', category: '水果', calories: 93, protein: 1.4, fat: 0.2, carbs: 22.0 },
  { id: 18, name: '橙子', category: '水果', calories: 48, protein: 0.8, fat: 0.2, carbs: 11.1 },
  { id: 40, name: '草莓', category: '水果', calories: 30, protein: 1.0, fat: 0.2, carbs: 7.0 },
  { id: 41, name: '葡萄', category: '水果', calories: 69, protein: 0.6, fat: 0.6, carbs: 17.0 },
  { id: 42, name: '猕猴桃', category: '水果', calories: 56, protein: 0.8, fat: 0.6, carbs: 14.0 },
  { id: 43, name: '梨', category: '水果', calories: 51, protein: 0.1, fat: 0.1, carbs: 13.6 },
  { id: 44, name: '西瓜', category: '水果', calories: 25, protein: 0.6, fat: 0.1, carbs: 5.8 },
  { id: 45, name: '桃子', category: '水果', calories: 51, protein: 0.9, fat: 0.1, carbs: 12.2 },
  
  // 零食类
  { id: 19, name: '薯片', category: '零食', calories: 548, protein: 7.5, fat: 37.6, carbs: 49.7 },
  { id: 20, name: '巧克力', category: '零食', calories: 516, protein: 4.3, fat: 30.6, carbs: 60.0 },
  { id: 46, name: '饼干', category: '零食', calories: 435, protein: 7.0, fat: 14.0, carbs: 71.0 },
  { id: 47, name: '蛋糕', category: '零食', calories: 347, protein: 4.9, fat: 15.6, carbs: 50.7 },
  { id: 48, name: '冰淇淋', category: '零食', calories: 127, protein: 2.1, fat: 7.0, carbs: 14.1 },
  { id: 49, name: '坚果', category: '零食', calories: 594, protein: 19.0, fat: 54.0, carbs: 16.0 },
  { id: 50, name: '爆米花', category: '零食', calories: 387, protein: 12.0, fat: 5.0, carbs: 78.0 },
  
  // 中式菜品
  { id: 51, name: '宫保鸡丁', category: '中式菜品', calories: 195, protein: 18.5, fat: 10.2, carbs: 8.3 },
  { id: 52, name: '糖醋里脊', category: '中式菜品', calories: 232, protein: 15.8, fat: 12.5, carbs: 16.2 },
  { id: 53, name: '麻婆豆腐', category: '中式菜品', calories: 158, protein: 8.9, fat: 11.2, carbs: 6.8 },
  { id: 54, name: '红烧肉', category: '中式菜品', calories: 285, protein: 16.8, fat: 22.4, carbs: 4.2 },
  { id: 55, name: '鱼香肉丝', category: '中式菜品', calories: 168, protein: 12.5, fat: 9.8, carbs: 9.2 },
  { id: 56, name: '回锅肉', category: '中式菜品', calories: 298, protein: 14.2, fat: 24.6, carbs: 6.5 },
  { id: 57, name: '水煮鱼', category: '中式菜品', calories: 142, protein: 19.8, fat: 5.2, carbs: 3.8 },
  { id: 58, name: '青椒肉丝', category: '中式菜品', calories: 156, protein: 11.2, fat: 9.8, carbs: 8.5 },
  { id: 59, name: '蒜蓉西兰花', category: '中式菜品', calories: 45, protein: 4.8, fat: 1.2, carbs: 6.2 },
  { id: 60, name: '清蒸鲈鱼', category: '中式菜品', calories: 105, protein: 18.6, fat: 2.8, carbs: 0.5 },
  
  // 主食类（中式）
  { id: 61, name: '包子', category: '主食', calories: 227, protein: 8.9, fat: 3.2, carbs: 41.8 },
  { id: 62, name: '饺子', category: '主食', calories: 198, protein: 9.2, fat: 6.8, carbs: 28.5 },
  { id: 63, name: '煎饼', category: '主食', calories: 255, protein: 7.8, fat: 8.5, carbs: 38.9 },
  { id: 64, name: '油条', category: '主食', calories: 386, protein: 6.9, fat: 17.6, carbs: 51.0 },
  { id: 65, name: '烧饼', category: '主食', calories: 325, protein: 9.8, fat: 11.2, carbs: 47.5 },
  { id: 66, name: '炒河粉', category: '主食', calories: 165, protein: 4.2, fat: 6.8, carbs: 23.5 },
  { id: 67, name: '云吞面', category: '主食', calories: 175, protein: 7.5, fat: 4.2, carbs: 28.9 },
  
  // 快餐类
  { id: 68, name: '汉堡包', category: '快餐', calories: 295, protein: 15.6, fat: 14.8, carbs: 28.2 },
  { id: 69, name: '炸鸡翅', category: '快餐', calories: 250, protein: 18.3, fat: 17.2, carbs: 6.8 },
  { id: 70, name: '薯条', category: '快餐', calories: 365, protein: 4.0, fat: 17.0, carbs: 48.0 },
  { id: 71, name: '鸡块', category: '快餐', calories: 302, protein: 15.8, fat: 20.2, carbs: 15.5 },
  { id: 72, name: '热狗', category: '快餐', calories: 290, protein: 10.4, fat: 26.8, carbs: 2.5 },
  { id: 73, name: '披萨', category: '快餐', calories: 266, protein: 11.0, fat: 10.4, carbs: 33.0 },
  { id: 74, name: '三明治', category: '快餐', calories: 215, protein: 12.8, fat: 8.5, carbs: 25.2 },
  
  // 甜点类
  { id: 75, name: '蛋挞', category: '甜点', calories: 249, protein: 6.2, fat: 15.8, carbs: 22.5 },
  { id: 76, name: '月饼', category: '甜点', calories: 421, protein: 6.8, fat: 19.8, carbs: 56.2 },
  { id: 77, name: '马卡龙', category: '甜点', calories: 390, protein: 6.0, fat: 16.5, carbs: 58.0 },
  { id: 78, name: '提拉米苏', category: '甜点', calories: 292, protein: 4.6, fat: 18.2, carbs: 28.8 },
  { id: 79, name: '芝士蛋糕', category: '甜点', calories: 321, protein: 5.5, fat: 22.5, carbs: 26.2 },
  { id: 80, name: '红豆沙', category: '甜点', calories: 155, protein: 5.8, fat: 0.8, carbs: 32.5 },
  { id: 81, name: '绿豆糕', category: '甜点', calories: 298, protein: 8.2, fat: 2.5, carbs: 62.8 },
  { id: 82, name: '双皮奶', category: '甜点', calories: 118, protein: 4.2, fat: 6.8, carbs: 10.5 },
  { id: 83, name: '布丁', category: '甜点', calories: 126, protein: 4.3, fat: 4.4, carbs: 18.6 },
  { id: 84, name: '奶茶', category: '甜点', calories: 87, protein: 2.1, fat: 3.2, carbs: 13.8 },
  
  // 汤类
  { id: 85, name: '紫菜蛋花汤', category: '汤类', calories: 32, protein: 3.2, fat: 1.8, carbs: 2.1 },
  { id: 86, name: '冬瓜排骨汤', category: '汤类', calories: 58, protein: 6.8, fat: 2.5, carbs: 3.2 },
  { id: 87, name: '番茄鸡蛋汤', category: '汤类', calories: 28, protein: 2.1, fat: 1.5, carbs: 2.8 },
  { id: 88, name: '酸辣汤', category: '汤类', calories: 45, protein: 3.5, fat: 2.2, carbs: 4.8 },
  { id: 89, name: '银耳莲子汤', category: '汤类', calories: 35, protein: 1.2, fat: 0.1, carbs: 8.5 },
  { id: 90, name: '鸡汤', category: '汤类', calories: 68, protein: 9.2, fat: 2.8, carbs: 1.5 },
  
  // 更多水果类
  { id: 91, name: '牛油果', category: '水果', calories: 160, protein: 2.0, fat: 14.7, carbs: 8.5 },
  { id: 92, name: '芒果', category: '水果', calories: 60, protein: 0.8, fat: 0.4, carbs: 15.0 },
  { id: 93, name: '菠萝', category: '水果', calories: 50, protein: 0.5, fat: 0.1, carbs: 13.1 },
  { id: 94, name: '柚子', category: '水果', calories: 42, protein: 0.8, fat: 0.2, carbs: 10.7 },
  { id: 95, name: '樱桃', category: '水果', calories: 63, protein: 1.1, fat: 0.2, carbs: 16.0 },
  { id: 96, name: '蓝莓', category: '水果', calories: 57, protein: 0.7, fat: 0.3, carbs: 14.5 },
  { id: 97, name: '火龙果', category: '水果', calories: 51, protein: 1.1, fat: 0.2, carbs: 13.3 },
  { id: 98, name: '榴莲', category: '水果', calories: 147, protein: 1.5, fat: 5.3, carbs: 27.1 },
  { id: 99, name: '椰子肉', category: '水果', calories: 354, protein: 3.3, fat: 33.5, carbs: 15.2 },
  { id: 100, name: '石榴', category: '水果', calories: 83, protein: 1.7, fat: 1.2, carbs: 18.7 },
  
  // 坚果类
  { id: 101, name: '核桃', category: '坚果', calories: 654, protein: 15.2, fat: 65.2, carbs: 13.7 },
  { id: 102, name: '杏仁', category: '坚果', calories: 579, protein: 21.2, fat: 49.9, carbs: 21.7 },
  { id: 103, name: '花生', category: '坚果', calories: 567, protein: 25.8, fat: 49.2, carbs: 16.1 },
  { id: 104, name: '腰果', category: '坚果', calories: 553, protein: 18.2, fat: 43.8, carbs: 30.2 },
  { id: 105, name: '开心果', category: '坚果', calories: 560, protein: 20.2, fat: 45.3, carbs: 28.0 },
  { id: 106, name: '榛子', category: '坚果', calories: 628, protein: 14.9, fat: 60.8, carbs: 16.7 },
  { id: 107, name: '松子', category: '坚果', calories: 673, protein: 13.7, fat: 68.4, carbs: 13.1 },
  { id: 108, name: '巴旦木', category: '坚果', calories: 578, protein: 21.3, fat: 49.4, carbs: 22.0 },
  { id: 109, name: '瓜子', category: '坚果', calories: 606, protein: 19.1, fat: 53.4, carbs: 13.1 },
  { id: 110, name: '夏威夷果', category: '坚果', calories: 718, protein: 7.9, fat: 75.8, carbs: 13.8 },
  
  // 海鲜类
  { id: 111, name: '大闸蟹', category: '海鲜', calories: 103, protein: 17.5, fat: 2.6, carbs: 2.3 },
  { id: 112, name: '小龙虾', category: '海鲜', calories: 93, protein: 18.9, fat: 1.2, carbs: 1.3 },
  { id: 113, name: '扇贝', category: '海鲜', calories: 88, protein: 16.7, fat: 0.6, carbs: 4.6 },
  { id: 114, name: '生蚝', category: '海鲜', calories: 68, protein: 9.0, fat: 2.3, carbs: 3.9 },
  { id: 115, name: '鲍鱼', category: '海鲜', calories: 84, protein: 12.6, fat: 0.8, carbs: 6.0 },
  { id: 116, name: '海参', category: '海鲜', calories: 78, protein: 16.5, fat: 0.2, carbs: 2.5 },
  { id: 117, name: '龙虾', category: '海鲜', calories: 90, protein: 18.8, fat: 0.9, carbs: 1.3 },
  { id: 118, name: '蛤蜊', category: '海鲜', calories: 74, protein: 12.8, fat: 0.9, carbs: 2.6 },
  { id: 119, name: '鱿鱼', category: '海鲜', calories: 92, protein: 15.6, fat: 1.4, carbs: 3.1 },
  { id: 120, name: '带鱼', category: '海鲜', calories: 127, protein: 17.7, fat: 5.6, carbs: 0 },
  
  // 各类米粉面条
  { id: 121, name: '桂林米粉', category: '主食', calories: 345, protein: 7.4, fat: 0.7, carbs: 77.2 },
  { id: 122, name: '螺蛳粉', category: '主食', calories: 125, protein: 4.2, fat: 2.8, carbs: 22.5 },
  { id: 123, name: '过桥米线', category: '主食', calories: 118, protein: 3.8, fat: 1.2, carbs: 24.1 },
  { id: 124, name: '沙河粉', category: '主食', calories: 109, protein: 1.9, fat: 0.3, carbs: 25.1 },
  { id: 125, name: '河粉', category: '主食', calories: 109, protein: 1.9, fat: 0.3, carbs: 25.1 },
  { id: 126, name: '粉丝', category: '主食', calories: 337, protein: 0.4, fat: 0.1, carbs: 84.2 },
  { id: 127, name: '粉条', category: '主食', calories: 337, protein: 0.4, fat: 0.1, carbs: 84.2 },
  { id: 128, name: '凉皮', category: '主食', calories: 117, protein: 3.8, fat: 0.5, carbs: 25.1 },
  { id: 129, name: '拉面', category: '主食', calories: 137, protein: 4.5, fat: 0.5, carbs: 27.4 },
  { id: 130, name: '刀削面', category: '主食', calories: 137, protein: 4.5, fat: 0.5, carbs: 27.4 },
  
  // 奶制品类
  { id: 131, name: '牛奶', category: '奶制品', calories: 54, protein: 3.0, fat: 3.2, carbs: 3.4 },
  { id: 132, name: '酸奶', category: '奶制品', calories: 72, protein: 2.5, fat: 2.7, carbs: 9.3 },
  { id: 133, name: '奶酪', category: '奶制品', calories: 328, protein: 25.0, fat: 27.5, carbs: 2.4 },
  { id: 134, name: '黄油', category: '奶制品', calories: 717, protein: 1.4, fat: 81.1, carbs: 0.1 },
  { id: 135, name: '炼乳', category: '奶制品', calories: 321, protein: 7.9, fat: 8.7, carbs: 56.3 },
  { id: 136, name: '奶粉', category: '奶制品', calories: 478, protein: 18.5, fat: 20.9, carbs: 54.6 },
  
  // 谷物杂粮类
  { id: 137, name: '黑米', category: '主食', calories: 341, protein: 8.3, fat: 2.5, carbs: 72.2 },
  { id: 138, name: '糙米', category: '主食', calories: 332, protein: 7.7, fat: 1.8, carbs: 76.0 },
  { id: 139, name: '薏米', category: '主食', calories: 357, protein: 12.8, fat: 3.3, carbs: 71.1 },
  { id: 140, name: '藜麦', category: '主食', calories: 368, protein: 14.1, fat: 6.1, carbs: 64.2 },
  { id: 141, name: '荞麦', category: '主食', calories: 337, protein: 11.7, fat: 2.5, carbs: 73.0 },
  { id: 142, name: '高粱', category: '主食', calories: 351, protein: 8.4, fat: 3.4, carbs: 74.8 },
  { id: 143, name: '小米', category: '主食', calories: 358, protein: 9.0, fat: 3.1, carbs: 75.1 },
  
  // 菌菇类
  { id: 144, name: '香菇', category: '蔬菜', calories: 19, protein: 2.2, fat: 0.3, carbs: 5.2 },
  { id: 145, name: '金针菇', category: '蔬菜', calories: 26, protein: 2.4, fat: 0.2, carbs: 6.0 },
  { id: 146, name: '平菇', category: '蔬菜', calories: 20, protein: 1.9, fat: 0.1, carbs: 4.6 },
  { id: 147, name: '杏鲍菇', category: '蔬菜', calories: 31, protein: 1.3, fat: 0.1, carbs: 7.3 },
  { id: 148, name: '茶树菇', category: '蔬菜', calories: 279, protein: 23.1, fat: 2.4, carbs: 45.7 },
  { id: 149, name: '木耳', category: '蔬菜', calories: 21, protein: 1.5, fat: 0.2, carbs: 6.0 },
  { id: 150, name: '银耳', category: '蔬菜', calories: 200, protein: 10.0, fat: 1.4, carbs: 67.3 }
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