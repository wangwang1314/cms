<template>
  <div class="man">
    <div>
      <div class="head">乒乓球段位培训考核机构基本信息</div>
    </div>
    <div class="top">
      <table >
        <tr>
          <td >机构编号：</td>
          <td colspan="3" width="325">{{data.agency_number}}</td>
        </tr>
        <tr>
          <td>机构名称：</td>
          <td colspan="3">{{data.name}}</td>
        </tr>
        <tr>
          <td width="170">营业执照号：</td>
          <td width="325">{{data.license_number}}</td>
          <td width="170">场馆电话：</td>
          <td>{{data.venue_phone}}</td>
        </tr>
        <tr>
          <td>联系人：</td>
          <td>{{data.contact_name}}</td>
          <td>联系电话：</td>
          <td>{{data.contact_phone}}</td>
        </tr>
        <tr>
          <td>邮箱：</td>
          <td>{{data.email}}</td>
          <td>邮政编码：</td>
          <td>{{data.postcode}}</td>
        </tr>
        <tr>
          <td>机构所在地址：</td>
          <td colspan="3">{{data.agency_address}}</td>
        </tr>
        <tr>
          <td>法人姓名：</td>
          <td>{{data.legal_name}}</td>
          <td>法人证件：</td>
          <td>{{data.legal_idcard}}</td>
        </tr>
        <tr>
          <td>法人所在地址：</td>
          <td colspan="3">{{data.legal_address}}</td>
        </tr>
      </table>
      <div class="hr"></div>
       <table class="border-t">
        <tr>
          <td >场馆状态：</td>
          <td colspan="3" >{{data.statusname}}</td>
        </tr>
        <tr>
          <td width="170">所申请项目：</td>
          <td width="325">{{data.categoryname}}</td>
          <td width="170">有效场地数：</td>
          <td >{{data.site_num}}</td>
        </tr>
        <tr>
          <td>申请场馆类型：</td>
          <td>{{data.venue_type}}</td>
          <td>申请资质等级：</td>
          <td>{{data.quality_level}}</td>
        </tr>
        <tr>
          <td>场地租约剩余时间：</td>
          <td>{{data.month}}</td>
          <td>培训师数量：</td>
          <td>{{data.sum}}</td>
        </tr>
        <tr>
          <td>培训师名册：</td>
          <td colspan="3">{{data.trainer_roster}}</td>
        </tr>
        <tr>
          <td>场馆描述：</td>
          <td colspan="3">{{data.description}}</td>
        </tr>
      </table>
    </div>
    <div class="btn-box">
      <button class="color" @click="showDialog">申请暂停运营</button>
      <button class="color" @click="naChange">申请经营变更</button>
      <button @click="infoChange">基本信息变更</button>
    </div>   

    <el-dialog title="申请暂停运营" :visible.sync="dialogPauseVisible">
      <el-input type="textarea" v-model="desc" placeholder="请填写原因..."></el-input>
      <div class="dia-btnbox"> 
        <el-button plain>取消</el-button>
        <el-button type="primary">提交</el-button>
      </div>
        
    </el-dialog>
  </div>
</template>
<script>
export default {
  data () {
    return {
        data:{},
        dialogPauseVisible:false,
        desc:''
    }
  },
  mounted(){
    this.getList();
  },
  computed:{
   
  },
  methods:{
    getList(){
       this.$api.get("/info",{
     
        },su=>{
          if(su.status==200){
              this.data = su.data;
          }else{
            
          }
        },err=>{

        },{token:sessionStorage.getItem("token")})
    },
    showDialog(){
      this.dialogPauseVisible = true;
    },
    naChange(){
      this.$router.push({path:"/organizational/organna"});
    },
    infoChange(){
      this.$router.push({path:"/organizational/organinfo"});
    }
  }
}
</script>


<style lang='scss' scoped>
.man{
  text-align: center;
  padding-top: 73px;
  .head{
    font-size:18px;
    color:rgba(26,26,26,1);
    text-align: center;
    width: 322px;
    display: inline-block;
    padding-bottom: 10px;
    border-bottom: 2px solid rgba(204,204,204,1);
  }
}
.top{
  width: 944px;
  display: inline-block;
  padding-top: 50px;
  table{
    width: 100%;
    font-size: 14px;
    color: RGBA(102, 102, 102, 1);

    td{
      line-height: 32px;
    }
    td:nth-child(2n+1){
      text-align: right;
    }
    td:nth-child(2n){
      text-align: left;
      padding-left: 20px;
      color: RGBA(26, 26, 26, 1);
    }
  }
} 

.hr{
  height:2px; 
  background:rgba(230,230,230,1);
  border-radius: 1px ;
  margin:7px 0 7px 0;
}
.btn-box{
  padding: 80px 0 80px 0;
  button{
    width:210px;
    height:40px; 
    background:rgba(255,255,255,1);
    border-radius: 2px ;
    border: 1px solid RGBA(153, 153, 153, 1);
    outline: none;
    margin-right: 90px;
    font-size: 16px;
    color: RGBA(77, 77, 77, 1);
    // line-height: 40px;
    cursor: pointer;
  }
  button:nth-child(3){
    margin-right: 0;
  }
  button.color{
    background: RGBA(31, 165, 255, 1);
    border-color: RGBA(31, 165, 255, 1);
    color: #fff;
  }
}
.dia-btnbox{
  overflow:hidden;
  .el-button{
    width: 80px;
    margin-top:20px;
    float:right;
  }
  .el-button--primary{
    margin-right:20px;
  }
}
  
</style>
<style>
  .man .el-dialog{
      width: 460px;
  }
  .man .el-textarea__inner{
    width: 420px;
    height: 245px;
  }
  .man .el-dialog__header{
    text-align: left;
  }
</style>