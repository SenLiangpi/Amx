/*
 * @Author: PiPi
 * @Github: https://github.com/SenLiangpi
 * @Email: pisenliang@gmail.com
 * @Date: 2019-10-22 17:41:35
 * @LastEditors: PiPi
 * @LastEditTime: 2019-11-05 17:39:43
 */
//浏览器是否支持
export const establish = (json)=>{
  if (!window.indexedDB) {
    window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
  }
  console.log(json.indexDB)
  
  const indexDB = window.indexedDB.open("amx", json.V);
  let db
  indexDB.onsuccess = (event)=>{
    db = indexDB.result
  }
  indexDB.onerror = ()=>{
    
  }
  indexDB.onupgradeneeded = (event)=>{
    const request = event.target.result
    for(let a in json.indexDB){
      if(!request.objectStoreNames.contains(a)){
        request.createObjectStore(a, {keyPath: 'key'})
        let dbAdd = request.transaction([a], 'readwrite').objectStore(a)
        for(let b in json.indexDB[a]){
          let chenc = dbAdd.add({key: b, val: JSON.stringify(json.indexDB[a][b])})
          chenc.onsuccess = (event)=>{
            console.log(event)
          }
          chenc.onerror = (err)=>{
            console.log(err)
          }
        }
      }
    }
    
  }
}
