/**
 * Created by jialing on 2019-10-02.
 */

const request = require('./limitRequest')

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

for (let i = 0; i < apis.length; i++) {
  request.get(apis[i].url, {id: i})
    .then(res => console.log(`request resolve : ${res}`))
}
