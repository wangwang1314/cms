<template>
   <common>
     <span class="tit" slot="title">机构管理首页</span>
     <div slot="main" class="content-div">
        <p class="ti-home">机构信息</p>
        <ul class="show-sys">
          <li>
            <span>机构编号：</span>
            {{data.agency_number}}
          </li>
          <li>
            <span>机构名称：</span>
            {{data.name}}
          </li>
          <li>
            <span>场地数：</span>
            {{data.site_num}}
          </li>
           <li>
            <span>承办项目：</span>
            {{data.categoryname}}
          </li>
          <li>
            <span>场馆类型：</span>
            {{data.venue_type}}
          </li>
          <li>
            <span>管理等级：</span>
            {{data.venue_type}}
          </li>
          <li>
            <span>场馆状态：</span>
           <!--  0草稿1待审核2待发证3运营4暂停5整改6年审7年审冻结8注销9:驳回 -->
            <i v-if="data.status==0">
              草稿
            </i>
            <i v-else-if="data.status==1">
              待审核
            </i>
            <i v-else-if="data.status==2">
              待发证
            </i>
            <i v-else-if="data.status==3">
              运营
            </i>
            <i v-else-if="data.status==4">
              暂停
            </i>
             <i v-else-if="data.status==5">
              整改
            </i>
             <i v-else-if="data.status==6">
              年审
            </i>
             <i v-else-if="data.status==7">
              年审冻结
            </i>
            <i v-else-if="data.status==8">
              注销
            </i>
            <i v-else-if="data.status==9">
              驳回
            </i>
          </li>
         <!--  <li>
            <span>年审时间：</span>
            {{data.SPACE_SIZE}}
          </li> -->
          <li>
            <span>机构评级：</span>
            <i class="star" v-if="data.star_level>=1"></i>
            <i class="star" v-if="data.star_level>=2"></i>
            <i class="star" v-if="data.star_level>=3"></i>
            <i class="star" v-if="data.star_level>=4"></i>
            <i class="star" v-if="data.star_level>=5"></i>
          </li>
        </ul>


        <!-- 操作成功 -->
        <el-dialog  width="340px" top="50vh"  :visible.sync="success" 
          :modal="false" 
          :show-close="false"
          class="res-dialog nopadding">
            <p class="success-bg"></p>
            <i class="suc-icon"></i>
            <p class="res-text">{{suinfo}}</p>
          
        </el-dialog>

        <el-dialog  width="340px" top="50vh" :visible.sync="fail" 
          :modal="false"
          :show-close="false"
          class="res-dialog nopadding">
          
            <p class="failure-bg"></p>
            <i class="fail-icon"></i>
            <p class="res-text">{{failinfo}}</p>
          
        </el-dialog>
     </div>
   </common>
</template>
<script>
import {mapState} from "vuex"
export default {
  data () {
    return {
      success:false,
      suinfo:"",
      fail:false,
      failinfo:"",
      data:{}
    }
  },
  mounted(){
    this.getSystem();
  },
  methods:{
    getSystem(){
      this.$api.get("/info",{
     
        },su=>{
          if(su.status==200){
              this.data = su.data;
          }else{
            
          }
        },err=>{

        },{token:sessionStorage.getItem("token")})
    }
  },
  computed:{
   
  }
}
</script>


<style lang='scss' scoped>
  .show-sys{
    text-align: left;
    font-size: 14px;
    padding-top:26px;
    margin:0px 0 0 35px;
    li{
      line-height: 40px;
      span{
        display: inline-block;
        height: 40px;
        width: 80px;
        text-align: right;
        padding-right: 8px;
        margin-right: 14px;
      }
    }
  }
  .ti-home{
    color: RGBA(0, 0, 0, 1);
    font-size:18px;
    margin-left: 37px;
    padding-top: 30px;
  }
  .star{
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url(../assets/images/dw-star.png);
    margin-right: 10px;
    position: relative;
    top:5px;
  }
</style>
