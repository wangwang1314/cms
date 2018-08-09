<template>
  <common>
    <span class="tit" slot="title">修改密码</span>
    <div slot="main" class="content-div">
         <table class="res-tab">
           <tr>
             <td>旧密码：</td>
             <td><input type="password" name="" v-model="phone"></td>
           </tr>
          <!--  <tr>
             <td>旧密码：</td>
             <td><input type="text" name="" v-model=""></td>
           </tr> -->
           <tr>
             <td>新密码：</td>
             <td><input type="password" name="" v-model="newpass" placeholder="密码6-16位" maxlength="16"></td>
           </tr>
           <tr>
             <td>确认密码：</td>
             <td><input type="password" name="" v-model="oldpass" placeholder="密码6-16位" maxlength="16"></td>
           </tr>
          <!--  <tr>
             <td>短信验证码：</td>
             <td><input type="text"  name="" class="msg-class" v-model="msg"> <button class="btn-cla" :class="{'forbit':!isajax}" @click="getcode">{{tip}}</button></td>
           </tr> -->
         </table>
         <div class="bu-box">
           <button class="color" @click="subFn">确认</button>
           <button @click="cancel">取消</button>
         </div>
    </div>
   </common>
</template>
<script>
import md5 from 'js-md5';
export default {
  data () {
    return {
      isajax:true,
      tip:"点击获取",
      phone:"",
      msg:"",
      down:60,
      newpass:"",
      oldpass:"",
      token:""

    }
  },
  mounted(){
    this.token = sessionStorage.getItem("token");
  },
  methods:{
    cancel(){
        this.phone = "";
        this.newpass = "";
        this.oldpass = "";
    },
    subFn(){
          if(!this.phone){
            this.$message({
                message: '请填写旧密码',
                type: 'warning'
            });
            return;
          }
          if(!this.newpass){
            this.$message({
                message: '请填写密码',
                type: 'warning'
            });
            return
          }
          if(this.newpass.length<6){
            this.$message({
                message: '密码长度至少为6位',
                type: 'warning'
            });
            return
          }
          if(/\s/g.test(this.newpass)){
            this.$message({
                message: '密码中不能含有空格',
                type: 'warning'
            });
            return
          }
          if(!this.oldpass){
            this.$message({
                message: '请重复密码',
                type: 'warning'
            });
            return
          }
          if(this.oldpass!=this.newpass){
            this.$message({
                message: '两次输入密码不一致',
                type: 'warning'
            });
            return
          }
          this.$api.post("/changepasswd",{
              oldpasswd:md5(this.phone),
              newpasswd:md5(this.newpass)
            },su=>{
              if(su.status==200){
                this.$message({
                    message: su.info,
                    type: 'success'
                });
                setTimeout(()=>{
                    this.$router.push({path:"/login"});
                    sessionStorage.removeItem("token");
                },1500)
              }else{
                this.$message({
                    message: su.info,
                    type: 'warning'
                });
              }
            },
            err=>{
                this.$message({
                    message: err.info,
                    type: 'warning'
                });
            },{token:this.token})
    }
  }
}
</script>


<style lang='scss' scoped>
  .content-div{
    background-color:#fff;
    min-height: 620px;
    padding-top: 50px;
  }
  .res-tab{
    font-size: 14px;
    color: #666;
    td{
      line-height: 62px;
    }
    td:first-child{
      width: 181px;
      padding-right:10px;
      text-align: right; 
    }
    td:last-child{
      input{
        width:422px;
        height:36px; 
        border-radius: 2px; 
        border: 1px solid #ccc;
        padding: 0;
        box-sizing:border-box;
        text-indent: 5px;

      }
      .msg-class{
        width: 230px;
        margin-right: 60px;
      }
      .btn-cla{
        width: 130px;
        height: 36px;
        border: 1px solid #1FA5FF;
        outline: none;
        background: #1FA5FF;
        color: #fff;
      }
      .forbit{
        background: #ccc;
        border: 1px solid #ccc;
      }
    }
  }
  .bu-box{
    margin-top: 30px;
    button{
      width:130px;
      height:40px; 
      background:rgba(255,255,255,1);
      border-radius: 2px ;
      color: #4D4D4D;
      border: 1px solid #999;
    }
    .color{
      background:#1FA5FF;
      color: #fff;
      border: 1px solid #1FA5FF;
      margin:0 158px 0 192px; 
    }
  }
</style>
