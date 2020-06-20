/**
 * 删除左右两端的空格
 * @param  {string} str
 * @returns {string}
 */
export const trim = str => str.replace(/(^\s*)|(\s*$)/g, '')

/**
 * 获取随机字符串
 * @param {Boolean} bits 默认 13位 否则 11位
 * @returns {string}
 */
export const getRandomStr = bits => (!bits ? Math.random().toString(16).substring(2) : Math.random().toString(36).substring(2)).toUpperCase()