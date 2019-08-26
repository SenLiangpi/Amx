# 全局状态管理 Amx.js
Amx.js是一个用纯JavaScript编写的全局状态管理，主要为解决页面或组件之间状态共享、管理等问题。
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
    let home = {
        name: 'home',//name 名 相对于 key
        //以存在的name是否强制写入数据 true 强制写入 false 不强制

        //由于使用的本地存储 第一次写入只有值就会存在，如果不强制就会使用之前写入的值

        //如果写入一个{a:1} 不改值，不强制更新的情况下 刷新页面 值不会写入 还是上次的值{a:1}

        //如果写入一个{a:1} 改变改值{a:2}，不强制更新的情况下 刷新页面 值为{a:2}

        //如果写入一个{a:1} 改变改值{a:2}，强制更新的情况下 刷新页面 值为{a:1}，
        //只有在页面关闭或者重新打开一个新页面的情况下才会重新写入
        type: false,
        store: { //要写入的数据json
          a:1,
          b:2,
          c:3
        }
    }
    let video = {
      name: 'video',
      type: false,
      store: {
        a:4,
        b:5,
        c:6
      }
    }

    let store = [home,video]

    
    import vueamx from 'vue-amx/src/lib/index'
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
    <h1>{{video}}</h1>
    <h1>{{video.a}}</h1>
    <h1>{{home}}</h1>
    <h1>{{home.a}}</h1>

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
        mixins:[Amx.read('home'),Amx.read('video')],//调用变量 页面变量 不可以与调用变量的 name 一样
        methods: {
            button(){
                this.video.a++//直接可以调用使用 当值发生改变时 会动态的进行数据绑定
                this.home.a++
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
