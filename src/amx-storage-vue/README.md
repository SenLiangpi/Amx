<!--
 * @Author: PiPi
 * @Github: https://github.com/SenLiangpi
 * @Email: pisenliang@gmail.com
 * @Date: 2019-06-17 15:38:23
 * @LastEditors: PiPi
 * @LastEditTime: 2020-05-29 11:26:40
 -->
 <!-- Amx-1.x 这里是amx 1.x 版本，由于amx 2.x 版本将进行比较大的扩展在此设立amx 1.x 的版本控制，为使用1.x版本的用户服务。 -->
# 全局状态管理 Amx.js
Amx.js是一个用纯JavaScript编写的全局状态管理，主要为解决页面或组件之间的数据共享。
<!-- Amx第一版组要支持vue，还在编写过程中。 -->

支持Amx技术：
* Storage - 浏览器提供的Storage关系型数据存储。
* addEventListener - 监听器
* Vue - 本地存储全局变量与vue的数据绑定相结合

github : https://github.com/SenLiangpi/Amx

1.2.1版本可以与Android和ios配合使用，app直接改变key对应的值就可以动态的改变web端的页面
具体使用请与app端协商

![image](https://github.com/SenLiangpi/demo/blob/master/ezgif-2-7adee262dd69.gif)

# 用法
安装npm i vue-amx
* 因为加载顺序原因 引入 vue-amx 不能在main.js中，请在App.vue中引入
```javascript
    // 在vue App.vue引入vue-amx
    import vueAmx from 'vue-amx'
    import Vue from 'vue'
    // 写入数据
    let store = {
      /*
       * data中的数据是会永久存储的,页面关闭或打开新的的页面时数据不会覆盖还会是你页面关闭前最后一次修改的数据，
       * 新打开的页面和老的页面可以进行实时的数据共享
      */
      data:{
        a:{
          a:1,
          b:2,
          c:3
        }
      },
      //tData中的数据会在关闭这个页面时清除数据，在新打开的页面中不会有上个页面的数据，页面直接也没办法数据共享
      tData:{
        b:{
          a:1,
          b:2,
          c:3
        }
      }
    }
    /* 
     * 如果写入一个{a:1} 不改值，data情况下 重新打开页面 值不会写入 还是上次的值{a:1}
     * 如果写入一个{a:1} 改变改值{a:2} data情况下 重新打开页面 值为{a:2}
     * 如果写入一个{a:1} 改变改值{a:2} tData情况下 重新打开页面 值为{a:1}
     * 可以根据所需使用不同的写入方式
    */
    import vueamx from 'vue-amx'
    Vue.use(vueamx,store);

    export default {
      name: "App",
      methods: {

      },
    };
```
调用
```HTML
<template>
  <div class="videoa">
    <h1>{{a}}</h1>
    <h1>{{a.a}}</h1>
    <h1>{{b}}</h1>
    <h1>{{b.a}}</h1>

    <button @click="button()">+</button>
  </div>
</template>

<script>
    import Amx from 'vue-amx'

    export default {
        name: "",
        data() {
          return {
          };
        },
        mixins:[Amx.read('a'),Amx.read('b')],//调用变量 页面变量 不可以与调用变量的 name 一样
        methods: {
            button(){
                window.amx.a.a++//直接可以调用使用 当值发生改变时 会动态的进行数据绑定,永久存储的数据也会进行改变
                window.amx.b.a++
            }
        },
        watch: {

        },
        mounted() {

        }
    };
</script>
```
# 高阶使用
本插件把Storage和vue进行了双向数据绑定
可以让android ，ios 写入 或者改变 Storage 值
页面也会动态的改变，这样可以间接的让ios和android控制web

还可以跨页面数据动态刷新

# API
* Vue.use(vueamx,store) 写入数据，在初始化时写入
```javascript
//写入格式为数组json
let store = {
  data:{
    a:{a:1,b:2,c:3}
  },
  tData:{
    b:{a:1,b:2,c:3}
  }
}
Vue.use(vueamx,store)
```
* Amx.read("name") 读取写入的值
```javascript
mixins: [Amx.read("name"),Amx.read("name1")], 
//返回一个json 当你调用这个方法时 传入的key 对应的数据不仅会再写入进vue 而且还会写入到内存中
//使用方法
window.amx.name.a ++
// window.amx 的数据和vue是双向绑定的，而window.amx是全局的你可以再任何位置使用它 而它的数据产生变化时 vue中的数据和本地存储的数据也会实时变化
```
* Amx.delete(['video','home']) 删除
```javascript
Amx.delete(['video','home']) //删除数据，数组格式
```
* Amx.allDelete(type) 删除全部
```javascript
Amx.allDelete(type) //删除全部数据
type===true //删除所有 强制更新的内容
type===false //删除所有 缓存内容
//不传值删除所有
```
