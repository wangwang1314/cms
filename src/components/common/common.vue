<template> 
  <div>
    <el-container class="container-warp">
   <el-aside width="200px">
    <div class="slider-lt">
      <img src="../../assets/images/slider-logo.png">
    </div>
    <ul class="slider-ul">
      <!-- <router-link to="/organizational" tag="li">机构管理</router-link>
      <router-link to="/teacher" tag="li">师资管理</router-link>
      <router-link to="/menu" tag="li">菜单管理</router-link>     --> 
     <!--  <template v-for="item in list">
          <li @click="choseFn(item)" :class="{'router-link-active':item.webrouter==manRouter}">{{item.title}}</li>
      </template> -->
      <router-link to="/home" tag="li">机构管理首页</router-link>
      <router-link to="/organizational" tag="li">机构管理</router-link>
      <router-link to="/activity" tag="li">活动管理</router-link>
      <router-link to="/student" tag="li">学员管理</router-link>
      <router-link to="/teacher" tag="li">师资管理</router-link>
      <router-link to="/system" tag="li">系统管理</router-link>
      <router-link to="/rescont" tag="li">修改密码</router-link>
    </ul>
  </el-aside>
  <el-container>
    <el-header>
      <div class="nav-tit">
       <!--  <span class="tit">{{navList.remark}}</span> -->
        <slot name="title"></slot>
        <div class="super-adm">
          <div class="admin-img">
            <img :src="info.avatar" alt="">
          </div> 
          <div class="admin-name">
            <div class="adm-le">
              <p>{{info.greetings}}</p> 
              <p><span>{{info.account}}</span></p>
            </div> 
            <a class="adm-ri" @click="exit">退出</a>
          </div>
        </div>
      </div>
      <slot name="nav"></slot>
    </el-header>
    <el-main>
      <slot name="main"></slot>
    </el-main>
  </el-container>
</el-container>
  </div>
  

</template>
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      list:[],
      navList:[],
      manRouter:"",
      data:{},
      time:""
    }
  },
  methods:{
    //获取用户信息
    getInfo(){
      this.$api.get("/userinfo",{
          
      },su=>{
        if(su.status==200){
           this.$store.state.info = su.data;
        }
      },err=>{
         
      },{token:sessionStorage.getItem("token")})  
    },
    exit(){
      this.$confirm('确定要退出吗？', '', {     
                cancelButtonText: '取消',
                confirmButtonText: '确定',
                type: ''
              }).then(() => {
                     sessionStorage.removeItem("token");
                      this.$router.push({path:"/login"})
              }).catch(()=>{
               
              });
     
    }
  },
  mounted(){
    if(JSON.stringify(this.$store.state.info)=='{}'){
       this.getInfo()
    } 
  },
  watch:{
   
  },
  computed:{
    ...mapState({
      info:"info"
    })
  }
}
</script>
<style lang='scss'>
.container-warp.el-container{
  height:100vh;
}
.container-warp {
  .el-header{
    text-align: left;
    background-color: #fff;
    height: 138px!important;
    border-bottom: 2px solid #e6e6e6;
  }
  .el-aside {
    width:240px;
    background:rgba(47,50,58,1);
    color:#fff;
  }
  .el-main {
    background-color: #EEEEEE;
    color: #333;
  }

  .slider-lt{
    height:74px; 
    background:rgba(29,37,44,1);
    text-align:center;
    line-height:90px;
    padding-top:16px;
    
  }
  .slider-ul{
    li{
      height:50px;
      line-height:50px;
      font-size:14px;
      text-indent:40px;
      text-align:left;
    }
    li.router-link-active{
      background-color: RGBA(31, 165, 255, 1);
    }
  }
}

.nav-tit {
    font-size: 20px;
    color: #000;
    height: 90px;
    line-height: 90px;
    position: relative;
    .tit{
      font-weight: bold;
    }
}
.super-adm {
    position: absolute;
    width: 310px;
    height: 52px;
    right: 18px;
    bottom: 0;
}
.admin-img {
    float: left;
    width: 52px;
    height: 52px;
  img {
    width: 52px;
    height: 52px;
    border-radius: 50%;
  }
}
.adm-le {
    width: 222px;
    float: left;
}
.adm-ri {
    float: left;
    width: 30px;
    height: 24px;
    font-weight: 700;
    color: #378eef;
    margin-top: 14px;
    cursor: pointer;
}
.adm-le p, .adm-ri {
    font-size: 14px;
    line-height: 1;
}
.adm-le p {
    color: #2f323a;
    margin-top: 8px;
    text-indent: 10px;
}
.nav-class {
    overflow: hidden;
    li {
        
        height: 50px;
        float: left;
        color: #4d4d4d;
        font-size: 14px;
        a.router-link-active {
          background: #eee;
          color: #1a1a1a;
          font-weight: bold;
        }
         a {
          display: block;
          height: 50px;
          line-height: 50px;
          text-align: center;
          text-decoration: none;
          color: #4d4d4d;
          padding: 0 30px;
      }
    }

}
</style>