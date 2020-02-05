const dateFormat = require('dateformat')


export function formatDate(date) {
  // let date = new Date(date * 1000);
  let time = dateFormat(date, 'isoDateTime').replace('T', ' ').split('+')
  return time[0]
}

// 防抖
export function debounce(func, delay=200) {
  let timer = null
  return function(...args) {
    if (timer) clearTimeout(timer)

    timer = setTimeout(() => {
      func.apply(this, args)
      // func();
    }, delay)
  }
}