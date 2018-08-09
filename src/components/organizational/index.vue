<template>
   <common>
    <span class="tit" slot="title">机构管理</span>
    <div slot="main" class="content-div">
       
        <router-view></router-view>
    </div>
   </common>
</template>
<script>
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted(){
    
  },
  computed:{
   
  }
}
</script>


<style lang='scss' scoped>
  .content-div{
    background-color:#fff;
    min-height: 620px;
    min-width: 1000px;
  }
</style>
