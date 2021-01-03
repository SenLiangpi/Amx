/*
 * @Author: Pi Patle
 * @Email: pisenliang@gmail.com
 * @Github: https://github.com/SenLiangpi
 * @Website: https://senliangpi.github.io/blog/#/
 * @Date: 2020-10-21 10:29:36
 * @LastEditors: Pi Patle
 * @LastEditTime: 2020-10-28 14:45:03
 */
const amx_storage_vue = {};
let storage = {
  local: {},
  session:{}
}
// 深度监听 json
function recursion(obj, Callback) {
  var num = {}
  function x(o, z) {
    for (let a in o) {
      let value = o[a]
      Object.defineProperty(z, a, {
        enumerable: true,
        configurable: true,
        get: function () {
          return value
        },
        set: function (v) {
          value = v
          Callback(v)
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
//监听设置
const dataGet = (value,key,type)=>{
  let data,voType
  try {
    data = JSON.parse(value)
  } catch (e) {
    data = value
  }
  try {
    voType = data.constructor.name
  } catch (e) {
    voType = ''
  }
  if (voType == 'Object') {
    if(type==='local'){
      data = recursion(data, (v)=> {
        localStorage.setItem(key, JSON.stringify(v))
      })
    }else if(type==='session'){
      data = recursion(data, (v)=> {
        sessionStorage.setItem(key, JSON.stringify(v))
      })
    }
  }
  if(type==='local'){
    Object.defineProperty(storage.local, key, {
      enumerable: true,
      configurable: true,
      get: function () {
        return data
      },
      set: function (v) {
        data = v
        localStorage.setItem(key, JSON.stringify(v))
      }
    })
  }else if(type==='session'){
    Object.defineProperty(storage.session, key, {
      enumerable: true,
      configurable: true,
      get: function () {
        return data
      },
      set: function (v) {
        data = v
        sessionStorage.setItem(key, JSON.stringify(v))
      }
    })
  }
  return data
}

// window.addEventListener('storage', (e) => {
//   console.log(e)
//   if(storage)
//   if(window.amx[e.key] != e.newValue)
//   try {
//     window.amx[e.key] = recursion(JSON.parse(e.newValue),function () {
//       if (localStorage.getItem(e.key)) {
//         localStorage.setItem(e.key, JSON.stringify(window.amx[e.key]))
//       } else if (sessionStorage.getItem(e.key)) {
//         sessionStorage.setItem(e.key, JSON.stringify(window.amx[e.key]))
//       }
//     })
//   } catch (e) {
//     window.amx[e.key] = e.newValue
//   }
// })
amx_storage_vue.install = (Vue, todos)=>{
  for(let todo in todos.local){
    if (!localStorage.getItem(todo)) {
      localStorage.setItem(todo, JSON.stringify(todos.local[todo]))
    }
  }
  for(let todo in todos.session){
    if (!sessionStorage.getItem(todo)) {
      sessionStorage.setItem(todo, JSON.stringify(todos.session[todo]))
    }
  }
  for(let local in todos.local){
    dataGet(localStorage.getItem(local),local,'local')
  }
  for(let session in todos.session){
    dataGet(sessionStorage.getItem(session),session,'session')
  }
  Vue.prototype.$storage = storage
}
export default amx_storage_vue