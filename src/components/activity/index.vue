<template>
   <common>
    <span class="tit" slot="title">活动管理</span>
    <ul slot="nav" class="nav-ul">
      <router-link to="/activity/activitybase"   tag="li" class="list">段位等级活动管理</router-link>
      <router-link to="/activity/rankbeforem" tag="li" class="list">段前等级活动管理</router-link>
    </ul>
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
  .nav-ul li{
    float:left;
    margin-left:20px;
    width:182px;
    height:50px;
    line-height:50px;
    text-align:center;
    font-size:14px;
    color:#4D4D4D;
  }
  .active{background-color:#EEEEEE;color:#1A1A1A; font-weight:bold;}
  .router-link-active.list{
     background-color:#EEEEEE;color:#1A1A1A; font-weight:bold;
  }
</style>
