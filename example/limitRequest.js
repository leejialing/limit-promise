/**
 * Created by jialing on 2019-10-02.
 */

const LimitPromise = require('limit-promise')
const request = require('./request')

const MAX = 5

const limitP = new LimitPromise(MAX)

function get (url, params) {
  return limitP.call(request.get, url, params)
}

function post (url, params) {
  return limitP.call(request.post, url, params)
}

module.exports = {get, post}

