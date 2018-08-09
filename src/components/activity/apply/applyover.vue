<template>
   <div class="new-con">
      <div class="go-back" @click="goback"><< 返回</div>
      <div class="info-con">
        <span class="info-title">新学员段位考核报名</span>
        <div class="progress">
          <ul class="pro-box">
            <li class="pro-item">
              <img src="../../../assets/images/pro1.png" alt="">
              <span class="item-text">填写报名信息</span>
            </li>
            <li class="pro-item line"></li>
            <li class="pro-item">
              <img src="../../../assets/images/pro-mon2.png" alt="">
              <span class="item-text">支付考核费用</span>
            </li>
            <li class="pro-item line"></li>
            <li class="pro-item">
                <img src="../../../assets/images/pro-over.png" alt="">
                <span class="item-text">完成报名</span>
            </li>
          </ul>
        </div>

        <div class="suc-info">
          <i></i>
          <span class="suc-text">恭喜！报名成功！</span>
          <div class="text-box">
            <p>欢迎您加入到段位大家庭，相信段位制会给您的运动带来更多乐趣！ </p>
            <p>您是一名新学员，为确保能为您提供更好的服务，我们为您分配了一个唯一的学员编号</p>
          </div>
          
          <span class="stu-num">01010100001</span>
          <p>请您务必记住该编号，该编号是您在本系统中的唯一身份标识，也是您享用本系统为您提供的各项服务的凭证！</p>
          <p class="other-text">其它相关注意、提示等信息</p>
        </div>
          

        <div class="btn-con">
          <el-button type="primary">继续报名</el-button>
          <el-button>报名结束</el-button>
        </div>
      </div>
      
   </div>
</template>
<script>
export default {
  data () {
    return {
      level:'',
      date:'',
      name:'',
      gender:'',
      cardId:'',
      cardNum:'',
      mobile:'',
      provice:'',
      city:'',
      address:'',
      detailAddress:'',
      unit:'',
      addAsscition:'',
      checked1:true,
      checked2:false,
      imageUrl: '',
      dialogWarnVisible:true
    }
  },
  mounted(){
    
  },
  computed:{
   
  },
  methods: {
    goback(){
      this.$router.push({path:"/activity/rankapply"})
    }
   
    

  }

}
</script>


<style lang='scss' scoped>
  .new-con{
     padding: 32px 32px 50px 32px;
  }
  .red{
    color:#F84C4C;
  }
  .blue{
    color:#1472B1;
  }
  .bg-blue{
    background-color:#1472B1;
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
  .info-con{
    text-align:center;
    .info-title{
      padding-bottom:10px;
      border-bottom:1px solid #CCCCCC; 
    }
    .progress{
      display: flex;
      justify-content: center;
      width: 100%;
      margin-top:40px;
      overflow:hidden;
      .pro-box{
        margin:0 auto;
        overflow:hidden;
        position: relative;
      }
      .pro-item{
        float:left;
      }
      .line{
        width: 142px;
        height: 4px;
        background-color:#cccccc;
        border-radius: 2px;
        vertical-align:middle;
        margin-top:26px;
      }
      .pro-item:nth-of-type(2){
        @extend .bg-blue;
      }
      .pro-item:nth-of-type(4){
        @extend .bg-blue;
      }
      .item-text{
        display: block;
        margin-top:10px;
      }
      img{
        width: 56px;
        height: 56px;
      }
    }
    .btn-con{
      margin:0 auto;
      margin-top:80px;
      button{
        width: 210px;
      }
      button:last-child{
        margin-left:128px;
        border-color:#1FA5FF;
        color:#1FA5FF;
      }
    }
  }
  .suc-info{
    margin-top:50px;
    i{
      display: inline-block;
      width: 77px;
      height: 75px;
      background:url(../../../assets/images/succ-icon.png) no-repeat center;
      background-size:77px 75px;
    }
    .suc-text{
      display: inline-block;
      font-size:36px;
      color:rgba(26,26,26,1);
      margin-left:37px;
      line-height:75px;
      vertical-align:top;
    }
    .text-box{
      margin-top:10px;
    }
    p{
      color:rgba(51,51,51,1);
      line-height:30px;
    }
    .stu-num{
      display: block;
      font-size:36px;
      font-family:MicrosoftYaHei;
      color:rgba(248,76,76,1);
      margin:45px 0 38px 0;
    }
    .other-text{
      color:rgba(153,153,153,1);
      margin-top:50px;
    }
  }
</style>
<style>
  .infotab-box .el-checkbox__input.is-checked+.el-checkbox__label{
    color:#191919;
  }
</style>
