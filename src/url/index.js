/**
 * 解析出path的query对象
 * @param {string} path 解析的路径
 * @returns {Object} query对象
 * @example parseQuery('https://to8to.com?a=1&b=2') // return {a: 1, b: 2};
 *
 */
export function parseQuery(path = window.location.href) {
    path = String(path).replace(/.*\?/, '')
    const query = {}
    const SEARCH_REG = /([^=&\s]+)[=\s]*([^=&\s]*)/g
    while (SEARCH_REG.exec(path)) {
        query[RegExp.$1] = RegExp.$2
    }
    return query
}
