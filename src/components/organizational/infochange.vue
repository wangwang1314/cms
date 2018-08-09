<template>
   <div class="chage-con">
      <div class="go-back" @click="goback"><< 返回</div>
      <div class="info-box">
        <span class="info-title">基本信息变更</span>
        <table>
          <tr>
            <td class="key">机构编号：</td>
            <td class="val">01010001</td>
          </tr>
          <tr>
            <td class="key">机构名称：</td>
            <td class="val">
              <input type="text" class="org-val">
            </td>
          </tr>
          <tr>
            <td class="key">
              联系人：
            </td>
            <td class="val">
              <input type="text">
              <span class="fr">
                <span>联系电话：</span>
                <input type="text">
              </span>
              
            </td>
          </tr>
          <tr>
            <td class="key">
              邮箱：
            </td>
            <td class="val">
              <input type="text">
              <span class="fr">
                <span>场馆电话：</span>
                <input type="text">
              </span>
            </td>
          </tr>
          <tr>
            <td class="key">
              变更原因：
            </td>
            <td class="val">
              <input type="text" class="in-reason">
            </td>

          </tr>
        </table>
        <div class="change-btnbox">
          <el-button type="primary">提交</el-button>
          <el-button plain>取消</el-button>
        </div>
      </div>
   </div>
</template>
<script>
export default {
  data () {
    return {
      
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
  .chage-con{
    padding: 32px 32px 50px 32px;
  }
  .fr{
    float:right;
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
  .info-box{
    text-align:center;
    .info-title{
      font-size:18px;
      color:rgba(26,26,26,1);
      border-bottom:1px solid #ccc;
      padding-bottom:10px; 
    }
    table{
      margin:0 auto;
      margin-top:40px;
      td{
        padding:10px 0;
      }
      
      td.key{
        font-size:14px;
        color:rgba(102,102,102,1);
        text-align:right;
        line-height:36px;
      }
      td.val{
        font-size:14px;
        padding-left:10px; 
        text-align:left;
      }
      td input{
        line-height:36px;
        border:1px solid #ccc;
        border-radius: 2px 
      }
      input.org-val{
        width: 605px;
      }
      input.in-reason{
        width: 605px;
        height: 258px;
      }
    }
  }
  .change-btnbox{
    margin-top:60px;
    button{
      width:130px;
      border-radius: 2px 
    }
    button:first-child{
      margin-right:142px;
    }
  }
</style>  