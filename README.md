<!--
 * @Author: PiPi
 * @Github: https://github.com/SenLiangpi
 * @Email: pisenliang@gmail.com
 * @Date: 2019-06-17 15:38:23
 * @LastEditors: PiPi
 * @LastEditTime: 2019-10-23 15:52:57
 -->
# 全局状态管理 Amx.js
令人兴奋的消息，Amx将进行2.x版本的更新，为了增强本地存储和全局变量管理，将更新兼容localStorage，sessionStorage以及indexedDB。

使用1.x版本的用户也不必担心，因为1.x版本还是会继续维护，但可能不会更新新的功能。
github : https://github.com/SenLiangpi/amx-1.x

支持Amx技术：
<!-- * cookies 是服务器发送到用户浏览器并保存在本地的一小块数据，它会在浏览器下次向同一服务器再发起请求时被携带并发送到服务器上。通常，它用于告知服务端两个请求是否来自同一浏览器，如保持用户的登录状态。Cookie使基于无状态的HTTP协议记录稳定的状态信息成为了可能。 -->
* Storage 提供了访问特定域名下的会话存储或本地存储的功能，例如，可以添加、修改或删除存储的数据项。只读的localStorage 属性允许你访问一个Document 源（origin）的对象 Storage；存储的数据将保存在浏览器会话中。localStorage 类似 sessionStorage，但其区别在于：存储在 localStorage 的数据可以长期保留；而当页面会话结束——也就是说，当页面被关闭时，存储在 sessionStorage 的数据会被清除 。
* IndexedDB 是一个用于在浏览器中储存较大数据结构的 Web API, 并提供索引功能以实现高性能查找. 像其他基于 SQL 的 关系型数据库管理系统 (RDBMS) 一样, IndexedDB 是一个事务型的数据库系统. 然而, 它是使用 JavaScript 对象而非列数固定的表格来储存数据的.

Amx 2.x 将会让你以更快的速度，占用更小的内存，更简单的操作使用它们。但它还在我开发计划中可能需要2个月左右的时间才能提供给大家使用，尽情期待。
<!-- Amx.js是一个用纯JavaScript编写的全局状态管理，主要为解决页面或组件之间状态共享、管理等问题。
Amx第一版组要支持vue，还在编写过程中。

支持Amx技术：
* Storage - 浏览器提供的Storage关系型数据存储。
* addEventListener - 监听器
* Vue - 本地存储全局变量与vue的数据绑定相结合

github : https://github.com/SenLiangpi/Amx

1.2.1版本可以与Android和ios配合使用，app直接改变key对应的值就可以动态的改变web端的页面
具体使用请与app端协商

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
let video = {
  name: 'video',//唯一标识，不可以重复
  type: false,//是否更新，如果更新，页面关闭在打开或者开启新页面数据就会变为初始化的值
  store: {//存储的数据，json
    a:4,
    b:5,
    c:6
  }
}
let store = [home,video]
Vue.use(vueamx,store)
```
* Amx.read("name") 读取写入的值
```javascript
mixins: [Amx.read("name"),Amx.read("name1")], //返回一个json
```
* Amx.allData() 读出所有数据仅限 data 永久存储数据
```javascript
// db就相对与你存入 data 永久存储中的所有值 所以 db = {a:{a:1,b:2,c:3}},你可以直接使用这个值也可以改变这些值
let db = Amx.allData()
/*
 * 我们在这里进行了数据监听，当你改变数据在数据存储点也会动态改变，vue页面中的a.a数据也会动态的变为11
 * 你可以很简单在vue框架之外使用数据和改这些数据，数据也会随着你的改变在vue中动态的改变
 * 请享受这个过程
 */
db.a.a = 11
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
``` -->
