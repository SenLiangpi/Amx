/*
 * @Author: Pipi
 * @github: https://github.com/SenLiangpi
 * @Email: pisenliang@gmail.com
 */
let orignalSetItem = localStorage.setItem;
localStorage.setItem = function(key,newValue){
  let setItemEvent = new Event("setItemEvent");
  setItemEvent.key = key;
  setItemEvent.newValue = newValue;
  window.dispatchEvent(setItemEvent);
  orignalSetItem.apply(this,arguments);
};
function dataGet(key) {
  const type1 = localStorage.getItem(key) , type2 = sessionStorage.getItem(key)
  if (!type1 && !type2) {
    data[key] = 'name repeat'
    return {
      data() {
        return data
      }
    }
  }
  if(type1){
    return type1
  }
  if(type2){
    return type2
  }
}
let Toast = {}
Toast.install = function (Vue, todos) {
  let result = {}
  for (let todo in todos) {
    if(!localStorage.getItem(todos[todo].name) && !sessionStorage.getItem(todos[todo].name)){
      if(todos[todo].type){
        sessionStorage.setItem(todos[todo].name, JSON.stringify(todos[todo].store))
      }else{
        if(localStorage.getItem(todos[todo].name)){
          result[todos[todo].name] = 'name repeat'
          return
        }
        localStorage.setItem(todos[todo].name, JSON.stringify(todos[todo].store))
      }
      result[todos[todo].name] = 'ok'
    }else{
      result[todos[todo].name] = 'name repeat'
    }
  }
}

Toast.read = function(key) {
  const type1 = localStorage.getItem(key) , type2 = sessionStorage.getItem(key)
  let data = {}
  data[key] = JSON.parse(dataGet(key))
  let watch = {}
  watch[key] = {
    handler(val, oldVal) {
      if(type1){
        localStorage.setItem(key, JSON.stringify(val))
      }else{
        sessionStorage.setItem(key, JSON.stringify(val))
      }
    },
    deep: true
  }
  return {
    data() {
      return data
    },
    mounted() {
      window.addEventListener('storage', (e) => {
        if (e.key == key) {
          this[key] = JSON.parse(e.newValue)
        }
      })
      window.addEventListener("setItemEvent", (e) => {
        if (e.key == key) {
          if(e.newValue != dataGet(key)){
            this[key] = JSON.parse(e.newValue)
          }
        }
      });
    },
    watch: watch
  }
}

Toast.delete = function(todos){
  for (let todo in todos) {
    localStorage.removeItem(todos[todo])
    sessionStorage.removeItem(todos[todo])
  }
}
Toast.allDelete = function(type){
  if(type===true){
    sessionStorage.clear()
    return
  } else if(type===false) {
    localStorage.clear()
    return
  }
  sessionStorage.clear()
  localStorage.clear()
}
export default Toast;