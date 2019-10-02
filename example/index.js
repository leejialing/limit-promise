/**
 * Created by jialing on 2019-10-02.
 */

const LimitPromise = require('limit-promise')

const limit1 = new LimitPromise(1)
const limit5 = new LimitPromise(5)

function myTask (name, id) {
  // random timeout
  const time = Math.floor(Math.random() * 1000)
  return new Promise((resolve, reject) => {
    console.log(`${name} begin run promise ${id}, it will end after ${time}ms`)
    setTimeout(() => {
      resolve()
      console.log(`${name} run end run promise ${id}`)
    }, time)
  })
}

for (let i = 0; i < 10; i++) {
  limit1.call(myTask, 'limit1', i)
  limit5.call(myTask, 'limit5', i)
}
