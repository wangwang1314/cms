<template>
   <div class="ap-con">
      <div class="go-back" @click="goback"><< 返回</div>
      <div class="con-info">
        <span class="ap-title">段位考核活动代理报名</span>
        <span class="info-title">活动基本信息</span>
        <p class="ap-info">
          <span class="ap-key">活动编码：</span>
          <span class="ap-val">01010001</span>
          <span class="ap-key">活动组织机构：</span>
          <span class="ap-val">XXXXXXXXXXXXXXXXXXXXXXX</span>
          <span class="ap-key">活动时间：</span>
          <span class="ap-val">2018-05-06</span>
          <span class="ap-key">名额：</span>
          <span class="ap-val">1000</span>
        </p>
        <div class="ap-box">
          <div class="go-apply" @click="goNewApply">
            <img class="ap-img" src="../../assets/images/new-apply.png" alt="">
            <span>新学员报名</span>
          </div>
          <div class="go-apply">
            <img class="ap-img" src="../../assets/images/old-apply.png" alt="">
            <span>老学员报名</span>
          </div>
        </div>
      </div>
   </div>
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
   
  },
  methods: {
    goback(){
        this.$router.push({path:"/activity/activitybase"})
    },
    goNewApply(){
        this.$router.push({path:"/activity/newapply"})
    }
  }

}
</script>


<style lang='scss' scoped>
  .ap-con{
    padding: 32px 32px 50px 32px;
    overflow:hidden;
  }
  .tc{
    text-align: center;
  }
  .db-in{
    display: inline-block;
  }
  .go-back{
    width:116px;
    height:36px; 
    background:rgba(255,255,255,1);
    border-radius: 2px ;
    border: 1px solid RGBA(55, 142, 239, 1);
    box-sizing:border-box;
    font-size: 14px;
    text-align: center;
    line-height: 36px;
    color: RGBA(55, 142, 239, 1);
  }
  .con-info{
    text-align:center;
    .ap-title{
      font-size:18px;
      font-family:MicrosoftYaHei;
      color:rgba(26,26,26,1);
      line-height:36px;
      border-bottom:1px solid #CCCCCC;
      padding-bottom:10px; 
    }
    .info-title{
      display: block;
      font-size:14px;
      margin-top:30px;
    }
    .ap-info{
      font-size:14px;
      color:rgba(102,102,102,1);
      margin-top:30px;
      @extend .tc;
      .ap-key{
        margin-left:80px;
      }
      .ap-info span:nth-of-type(1){
        margin-left:0;
      }
      .ap-val{
        color:rgba(26,26,26,1);
      }
    }
    .ap-box{
      width: 672px;
      margin:0 auto;
      margin-top:80px;
      overflow:hidden;
      .go-apply{
        float: left;
        width: 234px;
        height: 189px;
        border:1px solid #1FA5FF;
        border-radius: 2px;
        color:#1FA5FF;
        margin:0 auto;
        padding-top: 45px;
        .ap-img{
          width: 72px;
          height: 86px;
          object-fit:cover;
        }
        span{
          display: block;
          margin-top:30px;
          font-size:24px;
        }
      }
      .go-apply:nth-of-type(2){
        margin-left:200px;
      }
    }
   
  }
</style>
