/*
 * @Author: Pipi
 * @github: https://github.com/SenLiangpi
 * @Email: pisenliang@gmail.com
 */

let Toast = {}
Toast.install = function (Vue, todos) {
  console.log(todos);
  let result = {}
  for (var todo in todos) {
    if(todos[todo].type){
      localStorage.setItem(todos[todo].name, JSON.stringify(todos[todo].store));
      result[todos[todo].name] = 'ok'
    }else{
      if (localStorage.getItem(todos[todo].name) == null) {
        localStorage.setItem(todos[todo].name, JSON.stringify(todos[todo].store));
        result[todos[todo].name] = 'ok'
      } else {
        result[todos[todo].name] = 'name repeat'
      }
    }
  }
}

Toast.read = function(key) {
  let data = {}
  if (!localStorage.getItem(key)) {
    data[key] = 'name repeat'
    return {
      data() {
        return data
      }
    }
  }
  data[key] = JSON.parse(localStorage.getItem(key))
  let watch = {}
  watch[key] = {
    handler(val, oldVal) {
      localStorage.setItem(key, JSON.stringify(val))
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
    },
    watch: watch
  }
}

export default Toast;