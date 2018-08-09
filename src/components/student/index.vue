<template>
   <common>
    <span class="tit" slot="title">学员管理</span>
    <div slot="main" class="content-div">
        <router-view></router-view>
    </div>
   </common>
</template>
<script>
export default {
  data () {
    return {
      
    }
  },
  mounted(){
    
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
