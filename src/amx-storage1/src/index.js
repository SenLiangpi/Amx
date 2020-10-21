/*
 * @Author: PiPi
 * @Github: https://github.com/SenLiangpi
 * @Email: pisenliang@gmail.com
 * @Date: 2019-06-17 15:37:41
 * @LastEditors  : PiPi
 * @LastEditTime : 2019-12-23 11:43:37
 */
import amxIndexedDB from './IndexedDB/index'

const dataDB = {}
let amxDataDBOpenDb
dataDB.install = (Vue, store)=>{
  amxDataDBOpenDb = new amxIndexedDB({
    v: store.v,
    db: 'amxDataDB',
    dbData: store.dbData
  })
  amxDataDBOpenDb.open().then((result) => {
    if(result){
      for(let a in store.dbData){
        for(let b in store.dbData[a]){
          amxDataDBOpenDb.addData(a,{key:b,value:store.dbData[a][b]}).then((e) => {
            
          }).catch((err) => {
            if(err){
              console.log(err)
            }else{
              console.error(err)
            }
          })
        }
      }
    }
  }).catch((err) => {
    console.log(err)
  });
}
dataDB.db = class {
  constructor(name){
    this.name = name
    this.millisecond = 2
  }
  add(json){
    return new Promise((resolve, reject)=>{
      let amxDBRead = setInterval(()=>{
        amxDataDBOpenDb.addData(this.name,json).then((result) => {
          resolve(result)
          clearTimeout(amxDBRead)
        }).catch((err) => {
          if(err){
            reject(err)
          }else{
            console.error(err)
          }
        })
      },this.millisecond)
    })
  }
  read(key){
    return new Promise((resolve, reject)=>{
      let amxDBRead = setInterval(()=>{
        amxDataDBOpenDb.read(this.name,key).then((result) => {
          resolve(result)
          clearTimeout(amxDBRead)
        }).catch((err) => {
          if(err){
            reject(err)
          }else{
            console.error(err)
          }
        })
      },this.millisecond)
    })
  }
  update(json){
    return new Promise((resolve, reject)=>{
      let amxDBRead = setInterval(()=>{
        amxDataDBOpenDb.update(this.name,json).then((result) => {
          resolve(result)
          clearTimeout(amxDBRead)
        }).catch((err) => {
          if(err){
            reject(err)
          }else{
            console.error(err)
          }
        })
      },this.millisecond)
    })
  }
  remove(key){
    return new Promise((resolve, reject)=>{
      let amxDBRead = setInterval(()=>{
        amxDataDBOpenDb.remove(this.name,key).then((result) => {
          resolve(result)
          clearTimeout(amxDBRead)
        }).catch((err) => {
          if(err){
            reject(err)
          }else{
            console.error(err)
          }
        })
      },this.millisecond)
    })
  }
}

export default dataDB;