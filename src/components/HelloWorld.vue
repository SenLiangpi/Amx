<!--
 * @Author: PiPi
 * @Email: pisenliang@gmail.com
 * @Github: https://github.com/SenLiangpi
 * @Website: https://senliangpi.github.io/blog/#/
 * @Date: 2020-05-20 09:46:48
 * @LastEditors: Pi Patle
 * @LastEditTime: 2020-10-27 15:22:23
--> 
<template>
  <div class="hello">
    <div>local: {{$storage.local.aa}}</div>
    <div @click="local_aa_click" class="button">按钮</div>
    <div>local: {{$storage.session.aa}}</div>
    <div @click="session_aa_click" class="button">按钮</div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
    }
  },
  methods: {
    local_aa_click(){
      this.$storage.local.aa++
      this.$forceUpdate()
    },
    session_aa_click(){
      this.$storage.session.aa++
      this.$forceUpdate()
    }
  },
  created(){
    console.log(this.$storage)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .hello{
    padding: 20px;
  }
  .button{
    width: 100px;
    height: 30px;
    background-color: #03A9F4;
    border-radius: 5px;
    text-align: center;
    line-height: 30px;
    color: #fff;
    cursor: pointer;
  }
</style>
