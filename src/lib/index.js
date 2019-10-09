/*
 * @Author: PiPi
 * @Github: https://github.com/SenLiangpi
 * @Email: pisenliang@gmail.com
 * @Date: 2019-06-17 15:37:41
 * @LastEditors: PiPi
 * @LastEditTime: 2019-10-09 13:58:36
 */
function recursion(obj,Callback){
  var num = {}
  function x(o,z) {
    for(let a in o){
      let value = o[a],voType
      Object.defineProperty( z, a, {
        enumerable: true,
        configurable: true,
        get: function() {
          return value
        },
        set: function(v) {
          value = v
          Callback()
        }
      })
      try{
        voType = request[o].constructor.name
      }catch (e){
        voType = ''
      }
      if(voType == 'Object'){
        x(o[a],z[a])
      }
    }
  }
  x(obj,num)
  return num
}
function keyData(key){
  var request = {}
  try{
    request[key] = JSON.parse(dataGet(key))
  }catch (e){
    request[key] = dataGet(key)
  }
  for(let o in request){
    let value = request[o],voType
    try{
      voType = request[o].constructor.name
    }catch (e){
      voType = ''
    }
    if(voType == 'Object'){
      value = recursion(request[o],function(){
        if (localStorage.getItem(o)) {
          localStorage.setItem(o, JSON.stringify(window.amx[o]))
        }else if(sessionStorage.getItem(todo)){
          sessionStorage.setItem(o, JSON.stringify(window.amx[o]))
        }
      })
    }
    
    Object.defineProperty(window.amx, o, {
      enumerable: true,
      configurable: true,
      get: function() {
        return value
      },
      set: function(v) {
        value = v
        if (localStorage.getItem(o)) {
          localStorage.setItem(o, JSON.stringify(v))
        }else if(sessionStorage.getItem(todo)){
          sessionStorage.setItem(o, JSON.stringify(v))
        }
      }
    })
  }
  // return back
}
let orignalSetItem = localStorage.setItem;
localStorage.setItem = function (key, newValue) {
  let setItemEvent = new Event("setItemEvent")
  setItemEvent.key = key
  setItemEvent.newValue = newValue
  window.dispatchEvent(setItemEvent)
  orignalSetItem.apply(this, arguments)
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
  var timestamp=new Date().getTime()
  let result = {}
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
  window.amx = {}
  // console.log((new Date().getTime()-timestamp))
}

Toast.read = function (key) {
  // var timestamp=new Date().getTime()
  const type1 = localStorage.getItem(key), type2 = sessionStorage.getItem(key)
  let data = {}
  if(!window.amx[key]){
    keyData(key)
  }
  data[key] = window.amx[key]
  let watch = {}
  watch[key] = {
    handler(val, oldVal) {
      if (type1) {
        localStorage.setItem(key, JSON.stringify(val))
      } else {
        sessionStorage.setItem(key, JSON.stringify(val))
      }
    },
    deep: true
  }
  // console.log((new Date().getTime()-timestamp))
  return {
    data() {
      return data
    },
    created(){
      this[key] = window.amx[key]
    },
    mounted() {
      window.addEventListener('storage', (e) => {
        if (e.key == key) {
          this[key] = JSON.parse(e.newValue)
        }
      })
      window.addEventListener("setItemEvent", (e) => {
        if (e.key == key) {
          if (e.newValue != dataGet(key)) {
            this[key] = JSON.parse(e.newValue)
          }
        }
      });
    },
    // watch: watch
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
Toast.allData = function () {
  let storage = window.localStorage
  var request = {}
  for (var i = 0, len = storage.length; i < len; i++) {
    let key = storage.key(i)
    // console.log(key)
    try{
      request[key] = JSON.parse(dataGet(key))
    }catch (e){
      request[key] = dataGet(key)
    }
  }
  var back = {}
  for(let o in request){
    let value = request[o],voType
    try{
      voType = request[o].constructor.name
    }catch (e){
      voType = ''
    }
    if(voType == 'Object'){
      value = recursion(request[o],function(){
        if (localStorage.getItem(o)) {
          localStorage.setItem(o, JSON.stringify(back[o]))
        }else if(sessionStorage.getItem(todo)){
          sessionStorage.setItem(o, JSON.stringify(back[o]))
        }
      })
    }
    
    Object.defineProperty(back, o, {
      enumerable: true,
      configurable: true,
      get: function() {
        return value
      },
      set: function(v) {
        value = v
        if (localStorage.getItem(o)) {
          localStorage.setItem(o, JSON.stringify(v))
        }else if(sessionStorage.getItem(todo)){
          sessionStorage.setItem(o, JSON.stringify(v))
        }
      }
    })
  }
  return back
}
export default Toast;