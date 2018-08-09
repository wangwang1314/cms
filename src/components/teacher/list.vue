<template>
   <div class="tea-con">
      <div class="header">
        <span>培训师编号：</span>
        <input type="text">
        <span>姓名：</span>
        <input type="text">
        <span>考官资格：</span>
        <el-select v-model="level" placeholder="活动区域">
          <el-option label="高级" value="shanghai"></el-option>
          <el-option label="中级" value="beijing"></el-option>
        </el-select>  
        <span>电话：</span>
        <input type="text">
        <span>状态：</span>
        <el-select v-model="level" placeholder="活动区域">
          <el-option label="取消资格" value="shanghai"></el-option>
          <el-option label="中级" value="beijing"></el-option>
        </el-select>  
        <el-button class="search" @click="search">搜索</el-button>
      </div>
     <p class="total">共<span>333</span>条数据</p>

      <div class="rank-tab">
        <el-table
          :data="teatab"
          height="250"
          >
          <el-table-column
            prop="id"
            label="培训师编号" >
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名" >
          </el-table-column>
          <el-table-column
            prop="gender"
            label="性别" >
          </el-table-column>
          <el-table-column
            prop="birthdate"
            label="出生日期" >
          </el-table-column>
          <el-table-column
            prop="applypeople"
            label="联系电话" >
          </el-table-column>
          <el-table-column
            prop="applytime"
            label="状态" >
          </el-table-column>
          <el-table-column
            prop="applytime"
            label="服务星级" >
          </el-table-column>
          <el-table-column
            prop="applytime"
            label="考官资格" >
          </el-table-column>
          <el-table-column
            prop="applytime"
            label="资质期限" >
          </el-table-column>
          <el-table-column
            prop="applytime"
            label="年审时间" >
          </el-table-column>
          <el-table-column
            fixed="right"
            label="操作"
            min-width="240">
            <template slot-scope="scope">
              <el-button @click="detailFn(scope)" type="primary" plain>查询详情</el-button>
              <el-button type="primary"  @click="relieve(scope)" plain>解除挂靠</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
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
      <el-dialog title="解除挂靠" :visible.sync="dialogRelieveVisible">
        <el-input type="textarea" v-model="desc" placeholder="请填写原因..."></el-input>
        <p class="dia-text"> 
            <span class="dia-img"></span>
            <span>将要解除和培训师 XXX 的挂靠关系，确认解除？</span>
        </p>
        <div class="btn-box">
          <el-button plain>取消</el-button>
          <el-button type="primary">确认并提交</el-button>
        </div>
        
      </el-dialog>
   </div>
</template>
<script>
export default {
  data () {
    return {
      level:'',
      teatab:[
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
        }, 
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
      page:0,
      total:0,
      desc:'',
      dialogRelieveVisible:false
    }
  },
  mounted(){
   
  },
  methods:{
    search(){

    },
    detailFn(){

    },
    relieve(){
      this.dialogRelieveVisible = true;
    },
    handleSizeChange(){

    },
    handleCurrentChange(){

    }
  }
}
</script>


<style lang='scss' scoped>
  .tea-con{
    padding: 16px 0 0 20px;
    .header{
      span{
        font-size:14px;
        color:rgba(128,128,128,1);
        line-height:38px;
        margin-left:50px;
      }
      span:nth-of-type(1){
        margin-left:0px;
      }
      input{
        border:1px solid #ccc;
        line-height:36px;
        border-radius: 2px;
      }
      input:nth-of-type(1){
        width: 244px;
      }
      input:nth-of-type(2){
        width: 124px;
      }
      input:nth-of-type(3){
        width: 196px;
      }
      .search{
        width:106px;
        height:38px; 
        background:rgba(20,114,177,1);
        color:#fff;
        margin-left:50px;
      }
    }
    .total{
      font-size:12px;
      font-family:SimSun;
      color:rgba(128,128,128,1);
      margin-top:30px;
      margin-bottom:20px;
    }
  }
  .dia-text{
    margin:28px 0;
    font-size:14px;
    color:rgba(51,51,51,1);
    .dia-img{
      display: inline-block;
      width: 12px;
      height: 38px;
      background:url(../../assets/images/plaint-icon.png) no-repeat center;
      background-size:cover;
      margin-right:10px;
    }
    span:nth-of-type(2){
      line-height:38px;
      vertical-align:top;
    }
  }
  .btn-box{
    overflow:hidden;
    button{
      float:right;
      width: 112px;
    }
    
  }
</style>
<style>
  .tea-con .header .el-select:nth-of-type(1) .el-input{
    width: 86px;
  }
  .tea-con .header .el-select:nth-of-type(2) .el-input{
    width: 124px;
  }
  .el-pagination{
    text-align: center;
  }
  .tea-con .el-dialog{
    width:418px;
    background:rgba(255,255,255,1);
    border-radius: 6px;
    box-shadow:1px 0px 18px rgba(0,0,0,0.2);
  }
  .tea-con .el-textarea__inner{
    width: 380px;
    height: 202px;
  }
  .tea-con .btn-box .el-button.el-button--primary{
    margin-right:20px;
  }
</style>
