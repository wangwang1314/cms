<template>
  <div class="content">
    <div class="data-con">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="日期：">
          <el-date-picker
              v-model="formInline.startTime"
              type="date"
              value-format="timestamp"
              placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="-">
          <el-date-picker
              v-model="formInline.endTime"
              type="date"
              value-format="timestamp"
              placeholder="选择日期">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="考核等级：">
          <el-select v-model="formInline.level" placeholder="请选择">
            <el-option label="全部" value="">全部</el-option>
            <el-option v-for="item in levelList" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动状态：">
          <el-select v-model="formInline.status" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button class="seach" @click="seach">搜索</el-button>
          <el-button class="pub-activity" @click="gorel">发布活动</el-button>
        </el-form-item>
      </el-form>
    </div>
    <p class="total-data">共有{{total}}条数据</p>
    <div class="tab-data scrollbar">
        <el-table
          :data="tableData"
          border
          style="width: 100%">
          <el-table-column
            prop="id"
            label="活动编码"
            fixed
             width="120"
            >
          </el-table-column>
          <el-table-column
            prop="activitytime"
            label="活动时间"
             width="120"
            >
          </el-table-column>
          <el-table-column
            prop="contacts"
            label="联系人"
             width="120">
          </el-table-column>
          <el-table-column
            prop="contact_number"
            label="联系电话"
             width="120">
          </el-table-column>
          <el-table-column
            prop="addtime"
            label="申请时间"
             width="120">
          </el-table-column>
          <el-table-column
            prop="statusname"
            label="审核结果"
             width="120">
          </el-table-column>
          <el-table-column
            prop="address"
            label="审核机构"
             width="120">
          </el-table-column>
          <el-table-column
            prop="nickname"
            label="审核人"
             width="120">
          </el-table-column>
          <el-table-column
            prop="time"
            label="审核时间"
             width="120">
          </el-table-column>
          <el-table-column
            prop="statusname"
            label="活动状态"
             width="120">
          </el-table-column>
          <el-table-column
            width="740" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button 
                size="mini" type="primary" plain
                @click="handleEdit(scope.row)">活动详情
              </el-button>
              <el-button
                size="mini"
                type="primary" plain
                @click="handleDelete(scope.$index, scope.row)">取消活动
              </el-button>
              <el-button
                size="mini"
                type="primary" plain
                @click="goallot(scope.row)">场次详情
              </el-button>
              <el-button
                size="mini"
                type="primary" plain
                @click="gograde(scope.row)">录入成绩
              </el-button>
                <el-button
                size="mini"
                type="primary" plain
                @click="godetail(scope.row)">查询成绩
              </el-button>
              <el-button
                size="mini"
                type="primary" plain
                @click="gograde()">报名详情
              </el-button>
              <el-button
                size="mini"
                type="primary" plain
                @click="gograde()">学员报名
              </el-button>
            </template>
          </el-table-column>
        </el-table>
    </div>

    <div style="position:relative;top:20px;" class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="formInline.pageNum"
          :page-sizes="[20, 50, 100]"
          :page-size="20"
          layout="prev, pager, next, sizes"
          :total="total">
        </el-pagination>
    </div>
    <el-dialog title="段位考核活动详情" :visible.sync="dialogRankCheckVisible" center  width="780px">
      <h4 class="dialog-title">活动基本信息</h4>
      <ul class="check-info">
        <!-- <li>
          <span class="key">活动编码：</span>
          <span class="val">01010001</span>
        </li> -->
        <li>
          <span class="key">活动组织机构：</span>
          <span class="val">{{data.name}}</span>
        </li>
        <li>
          <span class="key">活动时间：</span>
          <span class="val">{{data.activitytime}}</span>
        </li>
        <li>
          <span class="key">考核时间：</span>
          <span class="am val">上午</span>
          <span class="">{{data.start_morning}}-{{data.end_morning}}</span>
          <span class="pm val">下午</span>
          <span class="">{{data.start_afternoon}}-{{data.end_afternoon}}</span>
        </li>
        <li>
          <span class="key">名额：</span>
          <span class="val">{{data.places}}</span>
        </li>
        <li>
          <span class="key">活动联系人：</span>
          <span class="val w180">{{data.contacts}}</span>
          <span class="key tl">  联系电话：</span>
          <span class="val">{{data.contact_number}}</span>
        </li>
        <li>
          <span class="key">活动描述：</span>
          <span class="val">{{data.describe}}</span>
        </li>
        <li v-for="item in data.gradelist">
          <span class="key">考核等级：</span>
          <span class="val red">{{item.name}}</span>
          <span class="key w100">规定费用：</span>
          <span class="val pd-l0 red">{{item.price}}</span><span class="unit">元</span>
          <span class="key w100">折扣率：</span>
          <span class="val pd-l0 red">{{item.discount}}</span><span class="unit">%</span>
          <span class="key w100">折后费用：</span>
          <span class="val pd-l0 red">{{item.dprice}}</span><span class="unit">元</span>
        </li>
        <li>
          <span class="key">申请时间：</span>
          <span class="val">{{data.addtime}}</span>
        </li>
        <li>
          <span class="key">审核机构：</span>
          <span class="val">{{data.mechanism}}</span>
        </li>
         <li>
          <span class="key">审核结果：</span>
          <span class="val">{{data.info}}</span>
        </li>
         <li>
          <span class="key">审核人：</span>
          <span class="val w180">{{data.nickname}}</span>
          <span class="key">审核时间：</span>
          <span class="val">{{data.time}}</span>
        </li>
         <li>
          <span class="key">活动状态：</span>
          <span class="val">
            <template v-if="data.status==0">
              草稿
            </template>
             <template v-else-if="data.status==1">
              待审核
            </template>
             <template v-else-if="data.status==2">
              驳回
            </template>
             <template v-else-if="data.status==3">
              通过
            </template>
             <template v-else-if="data.status==4">
              下架
            </template>
            <template v-else-if="data.status==5">
             活动到期
            </template>
            <template v-else-if="data.status==6">
             取消
            </template>
          </span>
        </li>
       <!--  <li>
          <span class="key">取消原因：</span>
          <span class="val">{{data.status}}</span>
        </li> -->
      </ul>
    </el-dialog>
    <el-dialog title="段位考核活动学员报名详情" :visible.sync="dialogApplyVisible" center>
      <p class="apply-title">
        <span>活动编码：</span>
        <span>01010001</span>
        <span class="check-time">考核时间：</span>
        <span>2018-03-05</span>
      </p>
      <div class="apply-tab">
        <el-table
          :data="applytab"
          height="250"
          >
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
            label="场次">
          </el-table-column>
          <el-table-column
            prop="applypeople"
            label="报名人">
          </el-table-column>
          <el-table-column
            prop="applytime"
            label="报名时间">
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  <!--   <div style="margin-top:40px">
      <span>测试入口</span>
      <el-button
          size="mini"
          type="primary" plain
          @click="gograde()">录入成绩
        </el-button>
      <el-button
          size="mini"
          type="primary" plain
          @click="goapply()">报名
      </el-button>
      <el-button
          size="mini"
          type="primary" plain
          @click="goSearchGrade()">成绩查询
      </el-button>
    </div> -->
    
  </div>
</template>
<script>
export default {
  data () {
    return {
      formInline: {
        pageNum:1,
        pageSize:20,
        startTime: '',
        endTime: '',
        status:"",
        audits:""
      },
      token:sessionStorage.getItem("token"),
      levelList:[],
      tableData: [],
      total:0,
      options: [
        {
          value: 1,
          label: '待审核'
        }, 
        {
          value: 2,
          label: '驳回'
        }, 
        {
          value: 3,
          label: '通过'
        }, 
        {
          value: 4,
          label: '下架'
        }, 
        {
          value: 5,
          label: '活动到期'
        }
      ],
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,

      dialogRankCheckVisible:false,
      dialogApplyVisible:false,

      applytab:[
        {
          stunum: '01010101',
          stuname: '王小虎',
          applylevel: '初级',
          applysession:"10:00",
          applypeople:"本人",
          applytime:"2018-05-05"
        },
        {
          stunum: '01010101',
          stuname: '王小虎',
          applylevel: '初级',
          applysession:"10:00",
          applypeople:"本人",
          applytime:"2018-05-05"
        }
      ],
      data:{}

    }
  },
  mounted(){
    this.initLevel();
    this.initList(this.formInline.pageNum,this.formInline.pageSize,this.formInline.startTime,this.formInline.endTime,this.formInline.status,this.formInline.audits);
  },
  computed:{
    
  },
  methods: {
      initLevel(){
        this.$api.get("/rankinfo",{
        },
        su=>{
          if(su.status==200){
            this.levelList = su.data;
          }
        },
        err=>{

        },{
          token:this.token
        })
      },
      initList(page,pagesize,starttime,endtime,status,audits){
        this.$api.post("/activitylist",{
          "page":page,
          "pagesize":pagesize,
          "starttime":starttime,
          "endtime":endtime,
          "status":status,
          "audits":audits
        },
        su=>{
          if(su.status==200){
            console.log(su.list)
            this.tableData = su.data.list;
            this.total = su.data.total;
          }
        },
        err=>{

        },{
          token:this.token
        })
      },
      seach(){
          this.initList(this.formInline.pageNum,this.formInline.pageSize,this.formInline.startTime,this.formInline.endTime,this.formInline.status,this.formInline.audits);
      },
     
      handleSizeChange(val) {
        this.formInline.pageSize = val;
        this.initList(this.formInline.pageNum,this.formInline.pageSize,this.formInline.startTime,this.formInline.endTime,this.formInline.status,this.formInline.audits);
      },
      handleCurrentChange(val) {
        this.initList(this.formInline.pageNum,this.formInline.pageSize,this.formInline.startTime,this.formInline.endTime,this.formInline.status,this.formInline.audits);
      },
      gorel(){
        this.$router.push({path:"/activity/release"});
      },
      goallot(val){
        console.log(val)
         this.$router.push({path:"/activity/allotinfo/"+val.id});
      },
      gograde(v){
        this.$router.push({path:"/activity/performanceenter/"+v.id});
      },
      goapply(){
        this.$router.push({path:"/activity/rankapply"});
      },
      goSearchGrade(){
        this.$router.push({path:"/activity/searchgrade"});
      },
       godetail(v){
        this.$router.push({path:"/activity/sdetail/"+v.id});
      },
      handleEdit(val){
        console.log(val);
        this.dialogRankCheckVisible = true;
        this.$api.post("/activitydetail",{
          id:val.id
        },
        su=>{
          if(su.status==200){
            this.data = su.data;
          }
        },
        err=>{

        },{
          token:this.token
        })
      }
  }

}
</script>


<style lang='scss' scoped>
  .data-con .demo-form-inline{
    margin-left:20px;
    line-height:78px;
  }
   .seach{
    width: 106px;
    margin-left:100px;
    margin-right:50px;
    background-color:#1472B1;
    color:#fff;
    font-size:14px;
   }
   .pub-activity{
    width: 106px;
    background-color:#1FA5FF;
    font-size:14px;
    color:#fff;
   }
   .total-data{
    margin-left:20px;
    font-size:12px;
    color:#808080;  
    margin-top:4px;
    margin-bottom:20px;
   }
   .tab-data{
    padding: 0 20px;
   }
   .check-info{
    margin-bottom:10px;
   }
    .dialog-title{
    text-align:center;
    margin-bottom:40px;
   }
   .check-info .key{
    display: inline-block;
    width: 122px;
    text-align: right;
    color: rgba(153,153,153,1);
    font-size: 12px;
    height: 30px;
    line-height: 30px;
   }
   .check-info .val{
      display: inline-block;
      padding-left: 20px;
      font-size: 12px;
      color: rgba(77,77,77,1);
      height: 30px;
      line-height: 30px;
   }
   .check-info  .red{
    color: #F84C4C;
   }
   .check-info .val.w180{
    width: 180px;
   }
   .check-info .key.w100{
    width: 100px;
   }
   .check-info .val.pd-l0{
    padding-left:0; 
   }
   .red{
    color: #F84C4C;
   }
   .check-info .unit{
     font-size: 12px;
      color: rgba(77,77,77,1);
      margin-left:2px;
   }
   .apply-title{
    text-align: center;
    font-size:14px;
    font-family:MicrosoftYaHei;
    color:rgba(102,102,102,1);
    margin-bottom:30px;
   }
   .check-time{
    margin-left:80px;
  }
</style>
<style>
  .data-con .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 148px;
  }
 .data-con .el-form--inline .el-form-item__content{
     vertical-align: middle;
  }
  .data-con .el-form--inline .el-form-item__label{
    font-size:12px;
    color:#808080;
  }
  .data-con .el-select .el-input__inner{
    width: 106px;
  }
  .data-con .el-form-item:nth-of-type(3),.data-con .el-form-item:nth-of-type(4){
    margin-left: 50px;
  }
  .tab-data .has-gutter{
    color: #1A1A1A;
    font-size: 12px;
    text-align: center;
  }
  .tab-data .el-table thead{
    color: #1A1A1A;
  }
  .tab-data thead .is-leaf{
     background-color: #EDEDED;
  }
  .tab-data .el-table td,.tab-data .el-table thead th.is-leaf{
    text-align: center;
    border-left: 0;
    border-right: 0;
  /*   background-color: #EDEDED; */
  }
  .tab-data .has-gutter tr th{
    background-color: #EDEDED;;
  }
  .tab-data .has-gutter tr th, .apply-tab .has-gutter tr th{
 /*    background-color: #EDEDED; */
  }
  
 .content .el-pagination{
    background-color: #fff;
    text-align: center;
    margin-top: 50px;
    padding-bottom: 50px;
  }
  .content .el-dialog__title {
    border-bottom: 1px solid #cccccc;
    padding-bottom: 10px;
    color: #1A1A1A;
  }
  .apply-tab .has-gutter tr th{
    color:#4D4D4D;
    font-size: 14px;
  }
  .apply-tab .el-table td, .apply-tab .el-table th.is-leaf{
    border: 0;
    text-align: center;
  }
  .apply-tab .el-table--border::after, .el-table--group::after, .el-table::before{
    background-color: #fff;
  }
</style>
