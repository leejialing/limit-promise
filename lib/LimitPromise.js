class LimitPromise {
  constructor (max) {
    this._max = max
    this._count = 0
    this._taskQueue = []
  }

  call (caller, ...args) {
    return new Promise((resolve, reject) => {
      const task = this._createTask(caller, args, resolve, reject)
      if (this._count >= this._max) {
        // console.log('count >= max, push a task to queue')
        this._taskQueue.push(task)
      } else {
        task()
      }
    })
  }

  _createTask (caller, args, resolve, reject) {
    return () => {
      caller(...args)
        .then(res => resolve(res))
        .catch(err => reject(err))
        .finally(() => {
          this._count--
          if (this._taskQueue.length) {
            // console.log('a task run over, pop a task to run')
            let task = this._taskQueue.shift()
            task()
          } else {
            // console.log('task count = ', count)
          }
        })
      this._count++
      // console.log('task run , task count = ', count)
    }
  }
}

module.exports = LimitPromise
