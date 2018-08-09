<template>
   <div class="ex-con">
      <div class="go-back" @click="goback"><< 返回</div>
      <div class="header">
        <span>乒乓球段位培训考核机构资质年审表</span>
      </div>
      <div class="tab-box">
        <table class="tab1">
           <tr>
              <th colspan="2">申请机构基本信息</th>
           </tr>
           <tr>
              <td class="key">机构编号：</td>
              <td class="val">01010001</td>
           </tr>
           <tr>
              <td class="key">机构名称：</td>
              <td class="val">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</td>
           </tr>
           <tr>
              <td class="key">营业执照号：</td>
              <td class="val">
                <span class="val1">05947989569897985689</span>
                <span class="val-key">场馆电话：</span>
                <span>05947989569897985689</span>
              </td>
           </tr>
           <tr>
              <td class="key">联系人：</td>
              <td class="val">
                <span class="val1">某某某</span>
                <span class="val-key">联系电话：</span>
                <span>13526547895</span>
              </td>
           </tr>
           <tr>
              <td class="key">邮箱：</td>
              <td class="val">moumou@163.com</td>
           </tr>
           <tr>
              <td class="key">机构所在地址：</td>
              <td class="val">广东省深圳市南山区学苑大道一号2589</td>
           </tr>
           <tr>
              <td class="key">
                法人姓名：
              </td>
              <td class="val">
                <span class="val1">某某某</span>
                <span class="val-key">法人证件：</span>
                <span class="card-sty">身份证 </span>
                <span>456789458965487589</span>
              </td>
           </tr>
           <tr>
             <td class="key">法人所在地址：</td>
             <td>广东省深圳市南山区学苑大道一号2589</td>
           </tr>
        </table>
        <div class="line"></div>
        <table class="tab2">
          <tr>
            <th colspan="2">申请资质</th>
          </tr>
          <tr>
            <td class="key">管理项目：</td>
            <td class="val">
              <span class="val1">乒乓球</span>
              <span class="val-key">培训师数量：</span>
              <span>10</span>
            </td>
          </tr>
          <tr>
            <td class="key">场馆类型：</td>
            <td class="val">
              <span class="val1">
                <el-select v-model="stadium" placeholder="请选择">
                  <el-option label="全部" value="">全部</el-option>
                  <el-option value="1"></el-option>
                </el-select>
              </span>
              <span class="val-key">资质等级：</span>
              <span>
                <el-select v-model="quLavel" placeholder="请选择">
                  <el-option label="全部" value="">全部</el-option>
                  <el-option value="1">1</el-option>
                </el-select>
              </span>
            </td>
          </tr>
          <tr>
            <td class="key">有效场地数：</td>
            <td class="val">
              <span class="val1">
                <el-input v-model="input" placeholder="请输入内容"></el-input>
              </span>
              <span class="val-key">场地租约剩余时间：</span>
              <span>
                <el-input v-model="input" placeholder="请输入内容"></el-input>
                月
              </span>
            </td>
          </tr>
          <tr>
            <td class="key">培训师名册：</td>
            <td class="val">某某某、某某某、某某、某某某</td>
          </tr>
          <tr>
            <td class="key">场馆描述：</td>
            <td class="val">
              <el-input type="textarea" v-model="desc" ></el-input>
            </td>
          </tr>
        </table>
        <div class="line"></div>
        <table class="tab3">
          <tr>
            <th colspan="2">附加证件照片</th>
          </tr>
          <tr>
            <td class="key">营业执照照片：</td>
            <td class="val">
              <ul class="list-img">
                <li class="item"></li>
              </ul>
            </td>
          </tr>
          <tr>
            <td class="key">法人身份证照片：<span class="tips-info">（正反两面）&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></td>
            <td class="val">
              <ul class="list-img">
                <li class="item"></li>
              </ul>
            </td>
          </tr>
          <tr>
            <td class="key">场地使用证明照片：</td>
            <td class="val">
              <ul class="list-img">
                <li class="item"></li>
              </ul>
            </td>
          </tr>
          <tr>
            <td class="key">消防验收照片：</td>
            <td class="val">
              <ul class="list-img">
                <li class="item"></li>
                <li class="item"></li>
                <li class="item"></li>
                <li class="item"></li>
                <li class="item"></li>
                <li class="item"></li>
              </ul>
            </td>
          </tr>
          <tr>
            <td class="key">场地安全验收证明照片：</td>
            <td class="val">
              <ul class="list-img">
                <li class="item"></li>
              </ul>
            </td>
          </tr>
          <tr>
            <td class="key">场地保险合同照片：<span class="tips-info">（封页、签署页外加一张内容页）</span></td>
            <td class="val">
              <ul class="list-img">
                <li class="item"></li>
              </ul>
            </td>
          </tr>
          <tr>
            <td class="key"><span class="star">*</span> 场馆照片：<span class="tips-info">（最多六张）</span></td>
            <td class="val">
              <ul class="list-img">
                <li class="item"></li>
              </ul>
            </td>
          </tr>
          <tr>
            <td class="key">培训师证件照片：</td>
            <td class="val">
              <ul class="list-img">
                <li class="item"></li>
              </ul>
            </td>
          </tr>
        </table>
      </div>
      <div class="exbtn-box">
        <el-button type="primary">提交审核</el-button>
        <el-button plain>存为草稿</el-button>
      </div>
   </div>
</template>
<script>
export default {
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      stadium:'',
      quLavel:'',
      desc:'',
      input:""
    }
  },
  mounted(){
   // console.log(this.$route.path.split("/"))
  },
  computed:{
   
  },
  methods:{
    goback(){
      this.$router.push({path:"/organizational/organbase"});
    }
  }
}
</script>


<style lang='scss' scoped>
  .ex-con{
    padding: 32px 32px 50px 32px;
  }
  .tc-lf{
    text-align:left;
  }
  .tc{
    text-align:center;
  }
  .star{color:#F84C4C;}
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
  .header{
    @extend .tc;
    span{
        font-size:18px; 
        color:rgba(26,26,26,1);
        padding-bottom:10px;
        border-bottom:1px solid #ccc;
    }
  }
  .tab-box{
    table{
      margin:0 auto;
      margin-top:30px;
      th,td{
        line-height:30px;
        font-size:14px;
      }
      td.key{
        text-align:right;
        color:#666;
      }
      td.val{
        padding-left:10px;
        .val1{
          display: inline-block;
          width: 472px;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          vertical-align:middle;
        }
        .val-key{
          color:#666;
          font-size:14px;
        }
        .card-sty{
          margin-right:10px;
        }
      }
      
    }
    .line{
      width:944px;
      height:2px; 
      background:rgba(230,230,230,1);
      border-radius: 1px;
      margin:0 auto;
      margin-top:20px;
    }
    .tab2{
        .el-textarea__inner{
          height: 132px;
        }
        .val-key{
          display: inline-block;
          width: 132px;
          text-align:right;
        }
        td{
          line-height:50px;
        }
        tr:last-child td:first-child{
          vertical-align:top;
        }

    }
    .tab3{
      .tips-info{
        display: block;
        line-height:20px;
        font-size:12px;
        color:rgba(153,153,153,1);
      }
      td{
        vertical-align:top;
        padding-bottom:10px;
      }
      .list-img{
        overflow:hidden;
        width: 880px;
      }
      .val{
        min-width:472px;
      }
      .item{
        width: 152px;
        height: 96px;
        border:1px solid #ccc;
        float:left;
        margin-right:30px;
        // margin-top:10px;
      }
      .item:first-child{
        margin-left:0;
      }
      .item:nth-of-type(n+5){
        margin-top:10px;
      }
    }
  }
  .ex-con .exbtn-box{
    @extend .tc;
    margin-top:60px;
  }
</style>
<style>
  .ex-con .tab2 .el-select .el-input__inner{
    width: 132px;
  }
  .ex-con .tab2 .el-select .el-input__inner{
    width: 132px;
  }
  .ex-con .tab2 .el-input{
    width: 132px;
  }
  .ex-con .tab2 .el-textarea__inner{
    height: 132px;
  }
  .ex-con .exbtn-box .el-button{
    width: 210px;
  }
  .ex-con .exbtn-box .el-button--primary{
    margin-right: 90px;
  }
</style>