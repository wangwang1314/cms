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
                <img src="../../../assets/images/pro3.png" alt="">
                <span class="item-text">完成报名</span>
            </li>
          </ul>
        </div>
        <div class="infotab-box">
          <table>
            <tr>
              <td class="key">基本考核费用：</td>
              <td class="val"><span class="red">200.00</span><span>元</span><span class="discount">优惠折扣：</span><span class="val red">90</span><span>%</span></td>
            </tr>
            <tr>
              <td class="key">实际支付费用：</td>
              <td class="val"><span class="red">180.00</span><span>元</span></td>
            </tr>
            <tr>
              <td class="key">附加：</td>
              <td class="val">
                <div class="checkbox">
                  <el-checkbox v-model="checked1">段位纪念服 <span class="red extra-money">90</span>元</el-checkbox>
                </div>
                <div class="checkbox">
                  <el-checkbox v-model="checked2">段位纪念徽章<span class="red extra-money">80</span>元</el-checkbox>
                </div>
              </td>
            </tr>
            <tr>
              <td class="key">合计：</td>
              <td class="val"><span class="red">270.00</span><span>元</span></td>
            </tr>
            <tr>
              <td class="key">支付方式：</td>
              <td class="val">
                <ul class="pay-list">
                  <li>
                    <div class="payimg-box">
                      <img src="" alt="">
                    </div>
                    
                    <span><i></i><span class="text-cn">微信支付</span></span>
                    <span class="text-en">Wechat Payment</span>
                  </li>
                  <li>
                    <div class="payimg-box">
                      <img src="" alt="">
                    </div>
                    <span><i></i></span>
                    <span class="text-en">Alipay wallet</span>
                  </li>
                </ul>
              </td>
            </tr>
          </table>
        </div>
        <div class="btn-con">
          <el-button type="primary" @click="goPrev">上一步</el-button>
          <el-button>取消报名</el-button>
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
    },
    goPrev(){
      this.$router.push({path:"/activity/applyover"})
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
      .item-text{
        display: block;
        margin-top:10px;
      }
      img{
        width: 56px;
        height: 56px;
      }
    }
    .infotab-box{
      table{
        margin:0 auto;
        margin-top:30px;
        tr:last-child td:first-child{
          vertical-align:top;
        }
        .key{
          text-align:right;
          line-height:36px;
          color:#666666;
          font-size:14px;
        }
        .val{
          text-align:left;
          padding-left:10px; 
          .discount{
            margin-left:62px;
            color:#666666;
            font-size:14px;
          }
          .extra-money{
            margin-left:20px;
            margin-right:10px;
          }
          .checkbox{
            line-height:25px;
          }
          .pay-list li{
            float:left;
            text-align:center;
            .text-en{
              display: block;
              color:#999899;
              font-size:12px;
            }
            .text-cn{
              vertical-align:top;
              margin-left:8px;
              color:#999899;
              font-size:12px;
            }
            span{
              line-height:24px;
            }
            .payimg-box{
              width: 134px;
              height: 134px;
              border:1px solid #3DA738;
              margin-bottom:10px;
              box-sizing:border-box;
              img{
                width: 122px;
                height: 122px;
                obj-fit:contain;
                margin:6px;
              }

            }
          }
          .pay-list li:nth-of-type(1){
            i{
              display: inline-block;
              width: 26px;
              height: 22px;
              background:url('../../../assets/images/wxpay-icon.png') no-repeat center;
              background-size:26px 22px;
            }
        } 
          .pay-list li:nth-of-type(2){
            margin-left:60px;
            margin-right:100px;
            .payimg-box{
              border:1px solid #11347D;
              margin-bottom:10px;
            }
            i{
              display: inline-block;
              width: 54px;
              height: 22px;
              background:url('../../../assets/images/alipay-icon.png') no-repeat center;
              background-size:54px 22px;
            }
          } 
        }
      }
    }
    .btn-con{
      // width: 540px;
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
  
</style>
<style>
  .infotab-box .el-checkbox__input.is-checked+.el-checkbox__label{
    color:#191919;
  }
</style>
