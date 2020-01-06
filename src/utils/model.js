/*
 * @Author: PiPi
 * @Github: https://github.com/SenLiangpi
 * @Email: pisenliang@gmail.com
 * @Date: 2019-10-22 16:28:05
 * @LastEditors  : PiPi
 * @LastEditTime : 2019-12-23 11:47:00
 */
//json 深度 get set 监听 0.1.1
export function recursion(obj,Callback){
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
      // 0.1.0 BUG: voType 变量未清空
      // try{
      //   voType = request[o].constructor.name
      // }catch (e){
      //   voType = ''
      // }
      // if(voType == 'Object'){
      //   x(o[a],z[a])
      // }
      try {
        if(o[a].constructor.name == 'Object'){
          x(o[a],z[a])
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
  x(obj,num)
  return num
}