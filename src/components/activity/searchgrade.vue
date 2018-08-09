<template>
   <div class="ser-con">
      <div class="go-back" @click="goback"><< 返回</div>
      <div class="con-info">
        <span class="gr-title">段位考核活动成绩录入</span>
        <span class="info-title">活动基本信息</span>
        <p class="ac-info">
          <span class="ac-key">活动编码：</span>
          <span class="ac-val">01010001</span>
          <span class="ac-key">活动组织机构：</span>
          <span class="ac-val">XXXXXXXXXXXXXXXXXXXXXXX</span>
          <span class="ac-key">活动时间：</span>
          <span class="ac-val">2018-05-06</span>
        </p>
        <span class="tab-title">本次考核学员名单</span>
        <div class="ser-tab">
          <el-table
            :data="grtab"
            height="250"
            style="width: 1138px">
            <el-table-column
              prop="stunum"
              label="学员编号">
            </el-table-column>
            <el-table-column
              prop="stuname"
              label="学员姓名">
            </el-table-column>
            <el-table-column
              prop="applylevel"
              label="报名等级">
            </el-table-column>
            <el-table-column
              prop="applysession"
              label="考核场次">
            </el-table-column>
            <el-table-column
              prop="assesstime"
              label="考核时间">
            </el-table-column>
            <el-table-column
              prop="chiefexaminer"
              label="主考官">
            </el-table-column>
            <el-table-column
              prop="assistantexaminer"
              label="副考官">
            </el-table-column>
            <el-table-column
              prop="result"
              label="考核成绩">
            </el-table-column>
            <el-table-column
              prop="status"
              label="考核状态">
            </el-table-column>
            <el-table-column
              prop="assesslevel"
              label="核定等级">
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button type="primary" plain size="small" @click="handleGrade()">成绩明细</el-button>
              </template>
              
            </el-table-column>
          </el-table>
        </div>
      </div>
   </div>
</template>
<script>
export default {
  data () {
    return {
      grtab:[
        {
          stunum: '01010101',
          stuname: '王小虎',
          applylevel: '初级',
          applysession:"10:00",
         
        },
        {
          stunum: '01010101',
          stuname: '王小虎',
          applylevel: '初级',
          applysession:"10:00",

        }
      ]
    }
  },
  mounted(){
    
  },
  computed:{
   
  },
  methods: {
    goback(){
         this.$router.push({path:"/activity/activitybase"})
    }

  }

}
</script>


<style lang='scss' scoped>
  .ser-con{
    padding: 32px 32px 50px 32px;
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
    .gr-title{
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
    .ac-info{
      font-size:14px;
      color:rgba(102,102,102,1);
      margin-top:30px;
      @extend .tc;
      .ac-key{
        margin-left:80px;
      }
      .ac-info span:nth-of-type(1){
        margin-left:0;
      }
      .ac-val{
        color:rgba(26,26,26,1);
      }
    }
    .tab-title{
      display: block;
      font-size:14px;
      color:rgba(26,26,26,1);
      margin:50px 0 25px 0;
    }
  }
</style>
<style>
  .ser-tab .el-table{
    margin: 0 auto;
  }
  .ser-tab .el-table td, .el-table th.is-leaf{
    border-bottom:0; 
  }
  .ser-tab .el-table th{
    text-align: center;
    background-color: #EDEDED;
  }
  .ser-tab .el-table--border::after, .el-table--group::after, .el-table::before{
    background-color: #fff;
  }
</style>

