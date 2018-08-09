<template>
   <div class="nachage-con">
      <div class="go-back" @click="goback"><< 返回</div>
      <div class="info-box">
        <span class="info-title">机构经营资质变更申请</span>
        <table class="ch-tab">
          <tr>
            <td width="150">变更项目</td>
            <td width="150">现有情况</td>
            <td width="150">拟变更为</td>
          </tr>
          <tr>
            <td class="tc-lf" >
              <el-checkbox v-model="checked">场地数</el-checkbox>
            </td>
              <td>4</td>
              <td><input class="now-num" type="text" value="8"></td>
          </tr>
          <tr>

            <td class="tc-lf">
              <el-checkbox v-model="checked">场馆类型</el-checkbox>
            </td>
            <td><span>培训中心</span></td>
              
            <td></td>
          </tr>
          <tr>
            <td class="tc-lf">
              <el-checkbox v-model="checked">等级</el-checkbox>
            </td>
            <td><span>初级</span></td>
            <td></td>
          </tr>
        </table>
        <table class="up-tab">
          <tr>
            <td class="key">
              上传变更凭证（照片）：
              <span class="tips-key">（最多可上传6张）&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            </td>
            <td class="val">
              <el-upload
                class="avatar-uploader"
                action="https://jsonplaceholder.typicode.com/posts/"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                <span class="blue up-text">点击上传图片</span>
              </el-upload>
            </td>
          </tr>
          <tr>
            <td class="key">
              变更理由：
            </td>
            <td class="val">
              <el-input type="textarea" v-model="reason" ></el-input>
            </td>
          </tr>
        </table>
      </div>
      <div class="nabtn-box">
        <el-button type="primary" @click="submit">提交</el-button>
        <el-button plain>取消</el-button>
      </div>
   </div>
</template>
<script>
export default {
  data () {
    return {
      checked:'',
      imageUrl:'',
      reason:''
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
    },
    submit(){
      this.$router.push({path:"/organizational/organex"});
    },
    beforeAvatarUpload(){

    },
    handleAvatarSuccess(){

    }

  }
}
</script>


<style lang='scss' scoped>
  .nachage-con{
    padding: 32px 32px 50px 32px;
  }
  .tc-lf{
    text-align:left;
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
      word-wrap: break-word; 
      word-break: break-all;
      margin:0 auto;
      margin-top:48px;
     
      td{
        line-height:36px;
        .now-num{
          width:122px;
          height:36px;
          border:1px solid #ccc; 
          background:rgba(255,255,255,1);
          border-radius: 2px;
          font-size:16px;
          text-align:center;
        }
      }
      td.key{
        text-align:right;
      }
      td.val{
        padding-left:10px; 
      }
    }
  }
  .nabtn-box{
    text-align:center;
  }
  .reason{
    width: 422px;
    height: 168px;
    border:1px solid #CCCCCC;
  }
  .nabtn-box{
    margin-top:50px;
    padding-left:60px;
    .el-button{
      width: 130px;
    }
    .el-button:last-child{
      margin-left:162px;
    }
  }
  .up-text{
    position: absolute;
    left: 0;
    right: 0;
    top: 55px;
    color:#1FA5FF;
  }
  .tips-key{
    display: block;
    font-size:14px;
    color:#999;
    line-height:10px;
  }
  .ch-tab{
    tr:first-child td:first-child{
      width: 100px;
    }
  }
  .info-box .up-tab{
    margin-top:20px;
     tr:nth-of-type(1) td:first-child{
          vertical-align:top;
      }
      tr:nth-of-type(1) td:last-child{
          padding-bottom:20px;
      }
      tr:nth-of-type(2) td:first-child{
          vertical-align:top;
      }
  }
</style>
<style>
  .nachage-con .avatar-uploader{
    width: 152px;
    height: 96px;
  }
  .nachage-con .avatar-uploader .el-upload {
    width: 100%;
    height: 100%;
    border: 1px solid #d9d9d9;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .nachage-con .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
   .nachage-con .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 152px;
    text-align: center;
    padding-top: 25px;
  }
  .nachage-con .el-textarea__inner{
    width: 422px;
    height: 168px;
    border-radius: 0;
  }
</style>