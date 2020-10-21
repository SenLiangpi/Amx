/*
 * @Author: PiPi
 * @Github: https://github.com/SenLiangpi
 * @Email: pisenliang@gmail.com
 * @Date: 2019-06-17 15:37:41
 * @LastEditors: PiPi
 * @LastEditTime: 2020-03-19 12:43:02
 */
// localStorage 写入操作 监听
let orignalSetItem = localStorage.setItem;
localStorage.setItem = function (key, newValue) {
  let setItemEvent = new Event("setItemEvent")
  setItemEvent.key = key
  setItemEvent.newValue = newValue
  window.dispatchEvent(setItemEvent)
  orignalSetItem.apply(this, arguments)
}
//监听 localStorage 改变
window.addEventListener('storage', (e) => {
  if(window.amx[e.key] != e.newValue)
  try {
    window.amx[e.key] = recursion(JSON.parse(e.newValue),function () {
      if (localStorage.getItem(e.key)) {
        localStorage.setItem(e.key, JSON.stringify(window.amx[e.key]))
      } else if (sessionStorage.getItem(e.key)) {
        sessionStorage.setItem(e.key, JSON.stringify(window.amx[e.key]))
      }
    })
  } catch (e) {
    window.amx[e.key] = e.newValue
  }
})
//监听 localStorage 写入
window.addEventListener("setItemEvent", (e) => {
  if(JSON.stringify(window.amx[e.key]) != e.newValue){
    try {
      window.amx[e.key] = recursion(JSON.parse(e.newValue),function () {
        if (localStorage.getItem(e.key)) {
          localStorage.setItem(e.key, JSON.stringify(window.amx[e.key]))
        } else if (sessionStorage.getItem(e.key)) {
          sessionStorage.setItem(e.key, JSON.stringify(window.amx[e.key]))
        }
      })
    } catch (e) {
      window.amx[e.key] = e.newValue
    }
  }
});

// 深度监听 json
function recursion(obj, Callback) {
  var num = {}
  function x(o, z) {
    for (let a in o) {
      let value = o[a], voType
      Object.defineProperty(z, a, {
        enumerable: true,
        configurable: true,
        get: function () {
          return value
        },
        set: function (v) {
          value = v
          Callback()
        }
      })
      try {
        if(o[a].constructor.name == 'Object'){
          x(o[a],z[a])
        }
      } catch (e) {
        // console.log(e)
      }
    }
  }
  try {
    if(obj.constructor.name == 'Object'){
      x(obj, num)
    }
  } catch (e) {
    // console.log(e)
  }
  return num
}
// 深度监听一个 localStorage
function keyData(key) {
  var value = {}, voType
  try {
    value[key] = JSON.parse(dataGet(key))
  } catch (e) {
    value[key] = dataGet(key)
  }
  try {
    voType = value[key].constructor.name
  } catch (e) {
    voType = ''
  }
  if (voType == 'Object') {
    value[key] = recursion(value[key], function () {
      if (localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify(window.amx[key]))
      } else if (sessionStorage.getItem(key)) {
        sessionStorage.setItem(key, JSON.stringify(window.amx[key]))
      }
    })
  }
  Object.defineProperty(window.amx, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      return value[key]
    },
    set: function (v) {
      value[key] = v
      if (localStorage.getItem(key)) {
        localStorage.setItem(key, JSON.stringify(v))
      } else if (sessionStorage.getItem(key)) {
        sessionStorage.setItem(key, JSON.stringify(v))
      }
    }
  })
}

function dataGet(key) {
  const type1 = localStorage.getItem(key), type2 = sessionStorage.getItem(key)
  if (!type1 && !type2) {
    return {
      data() {
        return {
          key: 'name repeat'
        }
      }
    }
  }
  if (type1) {
    return type1
  }
  if (type2) {
    return type2
  }
}
let Toast = {}
Toast.install = function (Vue, todos) {
  window.amx = {}
  if (todos.data) {
    for (let todo in todos.data) {
      if (!localStorage.getItem(todo) && !sessionStorage.getItem(todo)) {
        localStorage.setItem(todo, JSON.stringify(todos.data[todo]))
      }
    }
  }
  if (todos.tData) {
    for (let todo in todos.tData) {
      if (!localStorage.getItem(todo) && !sessionStorage.getItem(todo)) {
        sessionStorage.setItem(todo, JSON.stringify(todos.tData[todo]))
      }
    }
  }
}

Toast.read = function (key) {
  if (!window.amx[key]) {
    keyData(key)
  }
  return {
    data() {
      return window.amx
    },
    created() {
      this[key] = window.amx[key]
    },
    mounted() {
      window.addEventListener('storage', (e) => {
        console.log('1')
        if (e.key == key) {
          console.log('2')
          this[e.key] = window.amx[e.key]
        }
      })
    }
  }
}

Toast.delete = function (todos) {
  for (let todo in todos) {
    localStorage.removeItem(todos[todo])
    sessionStorage.removeItem(todos[todo])
  }
}
Toast.allDelete = function (type) {
  if (type === true) {
    sessionStorage.clear()
    return
  } else if (type === false) {
    localStorage.clear()
    return
  }
  sessionStorage.clear()
  localStorage.clear()
}
export default Toast;