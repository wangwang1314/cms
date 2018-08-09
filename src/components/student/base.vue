<template>
  <div class="stu-content">
    <div class="header">
      <span>学员编号：</span>
      <input type="text">
      <span>姓名：</span>
      <input type="text">
      <span>电话：</span>
      <input type="text">
      <el-button class="seach" @click="search">搜索</el-button>
    </div>
    <p class="total">共<span>333</span>条数据</p>
    <el-table
        :data="tableData"
        border
        style="width: 100%">
        <el-table-column
          fixed
          prop="id"
          label="学员编号"
          width="150">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="gender"
          label="性别"
          width="120">
        </el-table-column>
        <el-table-column
          prop="birthdate"
          label="出生日期"
          width="120">
        </el-table-column>
        <el-table-column
          prop="mobile"
          label="联系电话"
          width="120">
        </el-table-column>
        <el-table-column
          prop="newestlevel"
          label="最新段位"
          width="120">
        </el-table-column>
        <el-table-column
          prop="addtime"
          label="最近报名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="level"
          label="报考级别"
          width="120">
        </el-table-column>
        <el-table-column
          prop="isovercheck"
          label="是否完成考核"
          width="120">
        </el-table-column>
        <el-table-column
          prop="isgetgrade"
          label="成绩是否录入"
          width="120">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="600">
          <template slot-scope="scope">
            <el-button @click="detailFn(scope)" type="primary" plain>学员详情</el-button>
            <el-button type="primary"  @click="exFn(scope)" plain>成绩详情</el-button>
          </template>
        </el-table-column>
    </el-table>
    <div style="position:relative;top:20px;" class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-sizes="[20, 50, 100]"
        :page-size="20"
        layout="prev, pager, next, sizes"
        :total="total">
      </el-pagination>
    </div>
     <el-dialog title="学员详情" :visible.sync="dialogStudentVisible" center>
      <div class="stuinfo-box">
        <span class="stuinfo-title">学员基本信息</span>
        <table>
          <tr>
            <td class="key">考生编号：</td>
            <td class="val">
              <span class="num-val">0125468979598</span>
              <span>姓名：</span>
              <span class="name-val">某某某</span>
              <span class="gender-key">性别：</span>
              <span>男</span>
            </td>
          </tr>
          <tr>
            <td class="key">生日：</td>
            <td class="val">
              <span class="birthdate-val">1993-03-02</span>
              <span>邮箱：</span>
              <span class="email-val">moumou@qq.com</span>
              <span class="mobile-key">联系电话：</span>
              <span>16598457896</span>
            </td>
          </tr>
          <tr>
            <td class="key">
              证件号码：
            </td>
            <td class="val">
              <span>身份证</span>
              <span class="idcard-val">445698569825698457</span>
              <span>单位名称：</span>
              <span>XXXXXXXXXXXXXXXXXXXXXX</span>
            </td>
          </tr>
          <tr>
            <td class="key">通信地址：</td>
            <td class="val">XXXXXXXXXXXXXXXXXXXXXX</td>
          </tr>
        </table>
      </div>
      <div class="rank-tab">
        <span class="feature-title">段位及特征信息</span>
        <el-table
          :data="stutab"
          height="250"
          >
          <el-table-column
            prop="stunum"
            label="报名时间">
          </el-table-column>
          <el-table-column
            prop="stuname"
            label="考核场地">
          </el-table-column>
          <el-table-column
            prop="applylevel"
            label="考核时间">
          </el-table-column>
          <el-table-column
            prop="applysession"
            label="主考官">
          </el-table-column>
          <el-table-column
            prop="applypeople"
            label="副考官">
          </el-table-column>
          <el-table-column
            prop="applytime"
            label="考核成绩">
          </el-table-column>
          <el-table-column
            prop="applytime"
            label="核定等级">
          </el-table-column>
          <el-table-column
            prop="applytime"
            label="证书编号">
          </el-table-column>
          <el-table-column
            prop="applytime"
            label="发证机关">
          </el-table-column>
          <el-table-column
            prop="applytime"
            label="发证时间">
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
  
</template>
<script>
export default {
  data () {
    return {
      input:'',
      tableData:[
        {
          id:12312312,
          name:'张三',
          gender:'男',
          birthdate:'2018-5-20',
          mobile:13856988896,
          newestlevel:'初级',
          addtime:'2017-05-02',
          level:'高级',
          isovercheck:'是',
          isgetgrade:'否',
        }
      ],
      total:0,
      page:0,
      dialogStudentVisible:false,
      stutab:[]
    }
  },
  mounted(){
    
  },
  methods:{
    search(){

    },
    handleSizeChange(val) {
        
    },
    handleCurrentChange(val) {
      
    }
  }
}
</script>


<style lang='scss' scoped>
  .stu-content{
    padding-left:20px;
    padding-top:16px; 
    .header{
      span{
        font-size:14px;
        font-family:MicrosoftYaHei;
        color:rgba(128,128,128,1);
        line-height:38px;
      }
      span:nth-of-type(2),span:nth-of-type(3){
        margin-left:80px;
      }
      input{
        height: 36px;
        padding-left:10px; 
        margin-left:20px;
        border:1px solid #cccccc;
        border-radius: 2px;
      }
      input:nth-of-type(1){
        width: 244px;
      }
      input:nth-of-type(2){
        width: 124px;
      }
      input:nth-of-type(3){
        width: 180px;
      }
      .seach{
        width: 106px;
        font-size:14px;
        background-color:rgba(20,114,177,1);
        color:rgba(255,255,255,1);
        margin-left:80px;
      }
    }
  }
    
  .total{
    margin-top:30px;
    margin-bottom:20px;
    font-size:12px;
    font-family:SimSun;
    color:rgba(128,128,128,1);
  }
  .stuinfo-title,.feature-title{
    display: block;
    font-size:14px;
    color:rgba(26,26,26,1);
    text-align:center;
    margin-bottom:10px;
  }
  .stuinfo-box table{
    margin:0 auto;
    margin-bottom:35px;
    td.key{
        text-align:right;
        line-height:36px;
        color:rgba(102,102,102,1);
    }
    td.val{
      padding-left:10px; 
    }
    .num-val,.birthdate-val,.name-val,.email-val{
      display: inline-block;
      width: 200px;
    }
    .gender-key,.mobile-key{
      display: inline-block;
      width: 80px;
      text-align:right;
    }
    .idcard-val{
      margin:0 58px 0 20px;
    }
  }
</style>
<style>
  .stu-content .el-pagination{
    background-color: #fff;
    text-align: center;
    margin-top: 50px;
    padding-bottom: 50px;
  }
  .stu-content .el-table td ,.stu-content .el-table th{
    text-align: center;
  }
  .stu-content .el-dialog__title {
    border-bottom: 1px solid #cccccc;
    padding-bottom: 10px;
    color: #1A1A1A;
  }
  .stu-content .el-dialog{
    width: 1118px;
  }
</style>
