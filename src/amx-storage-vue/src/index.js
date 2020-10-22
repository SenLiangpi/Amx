/*
 * @Author: Pi Patle
 * @Email: pisenliang@gmail.com
 * @Github: https://github.com/SenLiangpi
 * @Website: https://senliangpi.github.io/blog/#/
 * @Date: 2020-10-21 10:29:36
 * @LastEditors: Pi Patle
 * @LastEditTime: 2020-10-21 16:52:03
 */
const amx_storage_vue = {};
//深度監聽 json
const dataGet = (value)=>{
  let data
  try {
    data = JSON.parse(value)
  } catch (e) {
    data = value
  }
  return data
}

amx_storage_vue.install = (Vue, todos)=>{
  console.log(Vue)
  console.log(todos)
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
  const storage = {
    local: {},
    session: {}
  }
  for(let local in todos.local){
    storage.local[local] = dataGet(localStorage.getItem(local))
  }
  for(let session in todos.session){
    storage.session[session] = dataGet(sessionStorage.getItem(session))
  }
  console.log(storage.local)
  console.log(storage.session)
}
export default amx_storage_vue