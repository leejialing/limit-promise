/**
 * Created by jialing on 2019-10-02.
 *
 * 模拟网络请求request
 */

function get (url, params) {
  return mock('GET', url, params)
}

function post (url, params) {
  return mock('POST', url, params)
}

function mock (method, url, params) {
  // random timeout
  const time = Math.floor(Math.random() * 1000)
  return new Promise((resolve, reject) => {
    console.log(`request begin : ${method} ${url}, params = ${params && JSON.stringify(params)}`)
    setTimeout(() => {
      resolve(url)
      console.log(`request end : ${method} ${url}, params = ${params && JSON.stringify(params)}`)
    }, time)
  })
}

module.exports = {get, post}
