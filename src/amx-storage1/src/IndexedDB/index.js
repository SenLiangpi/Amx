/*
 * @Author: PiPi
 * @Github: https://github.com/SenLiangpi
 * @Email: pisenliang@gmail.com
 * @Date: 2019-10-22 17:41:35
 * @LastEditors  : PiPi
 * @LastEditTime : 2019-12-23 11:40:10
 */
//indexedDB 基础API，链接，增删改查
export class amxIndexedDB {
  constructor(json){
    if(json){
      this.V = json.v
      this.dbName = json.db
      this.tableName = json.table
    }
  }
  open(json){
    if (!window.indexedDB) {
      window.alert("Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.");
    }
    return new Promise((resolve, reject)=>{
      let indexDB = window.indexedDB.open("pipi", json.V)
      indexDB.onsuccess = (event)=>{
        this.db = event.target.result
        resolve(indexDB.result)
      }
      indexDB.onerror = (err)=>{
        reject(err)
      }
      indexDB.onupgradeneeded = (event)=>{
        this.db = event.target.result
        for(let a in json.indexDB){
          if(!this.db.objectStoreNames.contains(a)){
            const objectStore =  this.db.createObjectStore(a, { keyPath: 'key' })
          }
        }
        resolve(event.target.result)
      }
    })
  }
  addData(name,json){
    return new Promise((resolve, reject)=>{
      var request = this.db.transaction([name], 'readwrite').objectStore(name).add(json)
      request.onsuccess = (event)=> {
        resolve(event)
      }
      request.onerror = (err)=> {
        reject(err)
      }
    })
  }
  read(name,key){
    return new Promise((resolve, reject)=>{
      var request = this.db.transaction([name]).objectStore(name).get(key)
      request.onsuccess = (event)=>{
        resolve(request)
      }
      request.onerror = (err)=> {
        reject(err)
      }
    })
  }
  readAll(name){
    return new Promise((resolve, reject)=>{
      var objectStore = this.db.transaction(name).objectStore(name),json = []
      objectStore.openCursor().onsuccess = (event)=>{
        let cursor = event.target.result
        if(cursor){
          json.push(cursor.value)
          cursor.continue()
        }else{
          resolve(request)
        }
      }
    })
  }
  update(name,json){
    return new Promise((resolve, reject)=>{
      var request = this.db.transaction([name], 'readwrite').objectStore(name).put(json)
      request.onsuccess = (event)=>{
        resolve(event)
      }
      request.onerror = (err)=>{
        reject(err)
      }
    })
  }
  remove(name,key){
    return new Promise((resolve, reject)=>{
      var request = this.db.transaction([name], 'resdwrite').objectStore(name).delete(key)
      request.onsuccess = (event)=>{
        resolve(event)
      }
      request.onerror = (err)=>{
        reject(err)
      }
    })
  }
}