/*
 * @Author: PiPi
 * @Email: pisenliang@gmail.com
 * @Github: https://github.com/SenLiangpi
 * @Website: https://senliangpi.github.io/blog/#/
 * @Date: 2020-05-20 09:46:48
 * @LastEditors: PiPi
 * @LastEditTime: 2020-05-22 15:30:21
 */ 
import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/a',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
