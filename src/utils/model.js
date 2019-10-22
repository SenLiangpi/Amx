/*
 * @Author: PiPi
 * @Github: https://github.com/SenLiangpi
 * @Email: pisenliang@gmail.com
 * @Date: 2019-10-22 16:28:05
 * @LastEditors: PiPi
 * @LastEditTime: 2019-10-22 16:31:02
 */
//json 深度 get set 监听
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