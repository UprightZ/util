/**
 * 校验电话号
 * @param {number|string} number 电话号
 * @returns {Boolean}
 */
export function validatePhone(number) {
    const telRegexp = /^(1[3-9])\d{9}$/;
    return telRegexp.test(number);
}

/**
 * 校验纯数字
 * @param {number|string} value 数字
 */
export function validateNumber(value) {
    const regexp = /^\d+$/
    return regexp.test(value)
}