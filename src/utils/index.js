/*
 * @Author: PiPi
 * @Github: https://github.com/SenLiangpi
 * @Email: pisenliang@gmail.com
 * @Date: 2019-10-17 15:37:41
 * @LastEditors: PiPi
 * @LastEditTime: 2019-11-06 17:04:17
 */

import { establish } from "./IndexedDB/index.js"

const Amx = {}

Amx.install = (Vue, store)=>{
  // console.log(store)
  if(store.V == localStorage.getItem('version')){
    return
  }
  establish(store)
  window.amx = {}
  localStorage.setItem('version', JSON.stringify(store.V))
}

export default Amx;