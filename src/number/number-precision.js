/**
 * @file 解决浮动运算问题，避免小数点后产生多位数和计算精度损失。
 * 问题示例：2.3 + 2.4 = 4.699999999999999，1.0 - 0.9 = 0.09999999999999998
 */
/**
 * 把错误的数据转正
 * strip(0.09999999999999998)=0.1
 */
export function strip(num, precision) {
  if (precision === void 0) {
    precision = 12
  }
  return +parseFloat(num.toPrecision(precision))
}
/**
 * Return digits length of a number
 * @param {*number} num Input number
 */
export function digitLength(num) {
  // Get digit length of e
  var eSplit = num.toString().split(/[eE]/)
  var len = (eSplit[0].split('.')[1] || '').length - (+(eSplit[1] || 0))
  return len > 0 ? len : 0
}
/**
 * 把小数转成整数，支持科学计数法。如果是小数则放大成整数
 * @param {*number} num 输入数
 */
export function float2Fixed(num) {
  if (num.toString().indexOf('e') === -1) {
    return Number(num.toString().replace('.', ''))
  }
  var dLen = digitLength(num)
  return dLen > 0 ? num * Math.pow(10, dLen) : num
}
/**
 * 检测数字是否越界，如果越界给出提示
 * @param {*number} num 输入数
 */
function checkBoundary(num) {
  if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
    console.warn(num + ' is beyond boundary when transfer to integer, the results may not be accurate')
  }
}
/**
 * 精确乘法
 */
export function times(num1, num2) {
  var others = []
  for (var _i = 2; _i < arguments.length; _i++) {
    others[_i - 2] = arguments[_i]
  }
  if (others.length > 0) {
    return times.apply(void 0, [times(num1, num2), others[0]].concat(others.slice(1)))
  }
  var num1Changed = float2Fixed(num1)
  var num2Changed = float2Fixed(num2)
  var baseNum = digitLength(num1) + digitLength(num2)
  var leftValue = num1Changed * num2Changed
  checkBoundary(leftValue)
  return leftValue / Math.pow(10, baseNum)
}
/**
 * 精确加法
 */
export function plus(num1, num2) {
  var others = []
  for (var _i = 2; _i < arguments.length; _i++) {
    others[_i - 2] = arguments[_i]
  }
  if (others.length > 0) {
    return plus.apply(void 0, [plus(num1, num2), others[0]].concat(others.slice(1)))
  }
  var baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)))
  return (times(num1, baseNum) + times(num2, baseNum)) / baseNum
}
/**
 * 精确减法
 */
export function minus(num1, num2) {
  var others = []
  for (var _i = 2; _i < arguments.length; _i++) {
    others[_i - 2] = arguments[_i]
  }
  if (others.length > 0) {
    return minus.apply(void 0, [minus(num1, num2), others[0]].concat(others.slice(1)))
  }
  var baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)))
  return (times(num1, baseNum) - times(num2, baseNum)) / baseNum
}
/**
 * 精确除法
 */
export function divide(num1, num2) {
  var others = []
  for (var _i = 2; _i < arguments.length; _i++) {
    others[_i - 2] = arguments[_i]
  }
  if (others.length > 0) {
    return divide.apply(void 0, [divide(num1, num2), others[0]].concat(others.slice(1)))
  }
  var num1Changed = float2Fixed(num1)
  var num2Changed = float2Fixed(num2)
  checkBoundary(num1Changed)
  checkBoundary(num2Changed)
  return times((num1Changed / num2Changed), Math.pow(10, digitLength(num2) - digitLength(num1)))
}
/**
 * 四舍五入
 */
export function round(num, ratio) {
  var base = Math.pow(10, ratio)
  return divide(Math.round(times(num, base)), base)
}
var index = {
  strip: strip,
  plus: plus,
  minus: minus,
  times: times,
  divide: divide,
  round: round,
  digitLength: digitLength,
  float2Fixed: float2Fixed
}

export default index
