/**
 * 奇偶判断
 * @param  {number|string} num
 * @return {Boolean} 是否为奇数
 */
export const isOdd = num => (num & 1)

/**
 * 在指定的范围内生成一个随机整数
 * @param {number} min
 * @param {number} max
 * @return {number} 随机整数
 * @example randomIntegerInRange(0, 5) // 2
 */
export const randomIntegerInRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min


/**
 * 替换手机号中间4位
 * @param {number|string} 手机号
 * @returns {string} 替换的手机号
 * @example replacePhone(15555555555) // "155****5555"
 */
export const replacePhone = cellValue => String(cellValue).replace(/^(\d{3})\d{4}(\d{4})$/, '$1****$2')

// 解决浮点数的问题
export * from './number-precision'