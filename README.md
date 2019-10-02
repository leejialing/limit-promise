# limit promise
Promise执行数量控制，即"并发"控制（众所周知js是单线程，并不存在真正的并发，只是形象说明才这么称呼的）。

应用场景如：控制异步请求的数量。

## Install (安装)

`npm install limit-promise --save`  
or  
`yarn add limit-promise`

## Tip

Make sure that the function you want to execute is:
* returns a Promise that matches the Promise criteria
* async function
* make sure Promise resolves or reject, otherwise it will "block" the call queue

If it doesn't meet the standard, please adapt yourself


确保需要执行的函数是：
* 返回一个符合Promise标准的promise
* async函数
* 确保Promise会resolve或者reject，否则会"阻塞"住调用队列。

如果不符合标准请自行适配一下。

## Usage（使用）

```js

// request.js
// a request module, contain 'get' and 'post' function

// limitRequest.js
const LimitPromise = require('limit-promise')
const request = require('./request')
// request maximum limit 并发请求上限
const MAX = 5
// core controller 核心控制器
const limitP = new LimitPromise(MAX)

// 通过控制器包装get和post方法，实际上是将请求函数递交给控制器处理
// Wrapping the get and post methods with the controller,
// The request function is actually handed over to the controller for processing
function get (url, params) {
  return limitP.call(request.get, url, params)
}

function post (url, params) {
  return limitP.call(request.post, url, params)
}

module.exports = {get, post}

// example.js

// import new request module
const request = require('./limitRequest')
// mock apis
const apis = [
  {url: 'www.baidu.com'},
  {url: 'www.taobao.com'},
  {url: 'www.qq.com'},
  {url: 'www.jd.com'},
  {url: 'www.meituan.com'},
  {url: 'www.toutiao.com'},
  {url: 'www.weibo.com'},
  {url: 'www.zhihu.com'},
  {url: 'www.alipay.com'}
]

// start multiple network request
// Because the maximum number of requests is limited to 5, the first five requests will start immediately, and the sixth will start in the ready queue for execution
// Once a request is completed and returned, a task is removed from the queue for execution
// 简单粗暴的使用for循环启动数个请求
// 由于限制了最大请求数量是5，因此前五个请求将立即启动，而第6个开始将进入就绪队列等待执行
// 一旦某个请求结束并返回，将从队列中取下一个任务执行
for (let i = 0; i < apis.length; i++) {
  request.get(apis[i].url, {id: i})
    .then(res => console.log(`request resolve : ${res}`))
}

```

## License
*MIT*
