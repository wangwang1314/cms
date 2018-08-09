<template>
   <div class="new-con">
      <div class="go-back" @click="goback"><< 返回</div>
      <div class="info-con">
        <span class="info-title">新学员段位考核报名</span>
        <div class="progress">
          <ul class="pro-box">
            <li class="pro-item">
              <img src="../../../assets/images/pro1.png" alt="">
              <span class="item-text">填写报名信息</span>
            </li>
            <li class="pro-item line"></li>
            <li class="pro-item">
              <img src="../../../assets/images/pro2.png" alt="">
              <span class="item-text">支付考核费用</span>
            </li>
            <li class="pro-item line"></li>
            <li class="pro-item">
                <img src="../../../assets/images/pro3.png" alt="">
                <span class="item-text">完成报名</span>
            </li>
          </ul>
        </div>
        <table class="info-tab">
          <tr>
            <td class="key"><span class="red">*</span>考核段位：</td>
            <td class="val">
              <el-select v-model="level" placeholder="一般">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
              <span class="val-mon">考核费用：</span>
              <span><span class="red">200</span>元</span>
            </td>
          </tr>
          <tr>
            <td class="key">
              <span class="red">*</span>选择考核日期：
            </td>
            <td class="val">
              <el-date-picker
                v-model="date"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
              <span class="surplus-num">(剩余名额：299)</span>
            </td>
          </tr>
          <tr>
            <td class="key">考核机构：</td>
            <td class="val red">xxxxxxxxx</td>
          </tr>
          <tr>
            <td class="key"><span class="red">*</span>姓名：</td>
            <td class="val"><el-input v-model="name"></el-input></td>
          </tr>
          <tr>
            <td class="key"><span class="red">*</span>性别：</td>
            <td class="val">
              <el-radio v-model="gender" label="1">男</el-radio>
              <el-radio v-model="gender" label="2">女</el-radio>
            </td>
          </tr>
          <tr>
            <td class="key"><span class="red">*</span>证件号：</td>
            <td class="val">
              <el-select v-model="cardId" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
              <el-input v-model="cardNum"></el-input>
            </td>
          </tr>
          <tr >
            <td class="key">手机：</td>
            <td class="val"><el-input v-model="mobile"></el-input></td>
          </tr>
          <tr>
            <td class="key">联系地址：</td>
            <td class="val">
              <el-select v-model="provice" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
              <el-select v-model="city" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
              <el-select v-model="address" placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </td>
          </tr>
          <tr>
            <td class="key"></td>
            <td class="val"><el-input v-model="detailAddress"></el-input></td>
          </tr>
          <tr>
            <td class="key">所在单位：</td>
            <td class="val"><el-input v-model="unit"></el-input></td>
          </tr>
          <tr>
            <td class="key">是否加入乒协：</td>
            <td class="val"><el-radio v-model="addAsscition" label="1">是</el-radio>
              <el-radio v-model="radio" label="2">否</el-radio></td>
          </tr>
          <tr>
            <td class="key"><span class="red">*</span>上传证件照片：</td>
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
            <td class="key"></td>
            <td class="val">
              <el-checkbox v-model="checked">我已阅读 <span class="blue">《全国乒乓球段位制协议》</span> ，并同意协议的相关内容</el-checkbox>
            </td>
          </tr>
        </table>
        <div class="save-btn">
          <el-button type="primary" @click="next">下一步</el-button>
        </div>
        
      </div>
      <el-dialog :visible.sync="dialogWarnVisible" center>
        <div class="warn-box">
          <img src="../../../assets/images/warning.png" alt="">
          <div class="warntext-box">
            <p class="warn-text">抱歉！您所选择的考核时间已经没有名额，无法报名。 </p>
            <p class="warn-text">您可以选择其它考核时间，也可以取消本次报名，下次再报。</p>
          </div>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogFormVisible = false">重新选择时间</el-button>
          <el-button @click="dialogFormVisible = false">取 消报名</el-button>
        </div>
      </el-dialog>
   </div>
</template>
<script>
export default {
  data () {
    return {
      level:'',
      date:'',
      name:'',
      gender:'',
      cardId:'',
      cardNum:'',
      mobile:'',
      provice:'',
      city:'',
      address:'',
      detailAddress:'',
      unit:'',
      addAsscition:'',
      checked:true,
      imageUrl: '',
      dialogWarnVisible:true
    }
  },
  mounted(){
    
  },
  computed:{
   
  },
  methods: {
    goback(){
      this.$router.push({path:"/activity/rankapply"})
    },
    next(){
      this.$router.push({path:"/activity/applymoney"})

      if (!this.level) {
        this.$message({
          message: '请选择考核等级',
          type: 'warning'
        });
        return
      }
      if (!this.date) {
        this.$message({
          message: '请选择考核日期',
          type: 'warning'
        });
        return
      }
      if (!this.name) {
        this.$message({
          message: '请填写姓名',
          type: 'warning'
        });
        return
      }
      if (!this.gender) {
        this.$message({
          message: '请选择性别',
          type: 'warning'
        });
        return
      }
      if (!this.cardId) {
        this.$message({
          message: '请选择证件类型',
          type: 'warning'
        });
        return
      }
      if (!this.cardNum) {
        this.$message({
          message: '请填写证件号',
          type: 'warning'
        });
        return
      }
      if (!this.imageUrl) {
        this.$message({
          message: '请上传证件照',
          type: 'warning'
        });
        return
      }
      if (!this.checked) {
        this.$message({
          message: '请阅读协议',
          type: 'warning'
        });
        return
      }
    },
    handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    }
    

  }

}
</script>


<style lang='scss' scoped>
  .new-con{
     padding: 32px 32px 50px 32px;
  }
  .red{
    color:#F84C4C;
  }
  .blue{
    color:#1472B1;
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
  .info-con{
    text-align:center;
    .info-title{
      padding-bottom:10px;
      border-bottom:1px solid #CCCCCC; 
    }
    .progress{
      display: flex;
      justify-content: center;
      width: 100%;
      margin-top:40px;
      overflow:hidden;
      .pro-box{
        margin:0 auto;
        overflow:hidden;
      }
      .pro-item{
        float:left;
      }
      .pro-item.line{
        width: 142px;
        height: 4px;
        background-color:#cccccc;
        border-radius: 2px;
        vertical-align:middle;
        // margin:0 20px;
        margin-top:26px;
      }
      .item-text{
        display: block;
        margin-top:10px;
      }
      img{
        width: 56px;
        height: 56px;
      }
    }
    .info-tab{
      margin: 0 auto;
      margin-top:50px;
      
      td.key{
        text-align:right;
        color:#666666;
        font-size:14px;
      }
      tr{
        line-height:56px;
      }
      td.val{
        padding-left:10px;
        text-align:left;
        font-size:14px;
        .surplus-num{
          font-size:14px;
          color:#666666;
        }
      }
      tr:first-child td:nth-of-type(2) .el-select{
        width: 82px;
      }
      tr:first-child td:nth-of-type(2) span.val-mon{
        margin-left:46px;
        color:#666666;
        font-size:14px;
      }
      tr:nth-of-type(4) td:nth-of-type(2) .el-input{
        width: 156px;
      }
      tr:nth-of-type(6) td:nth-of-type(2) .el-select{
        width: 102px;
      }
      tr:nth-of-type(6) td:nth-of-type(2) .el-input{
        width: 282px;
      }
      tr:nth-of-type(7) td:nth-of-type(2) .el-input{
        width: 274px;
      }
      tr:nth-of-type(8) td .el-select{
        width: 136px;
      }
      tr:nth-of-type(8) td .el-input{
        width: 466px;
      }
      tr:nth-of-type(12) td:first-child{
        vertical-align:top;
      }
    }
  }
  .new-con .avatar-uploader{
      width: 104px;
      height: 158px;
      border:1px solid #CCCCCC;
      text-align:center;
      position: relative;
  }
  .new-con .avatar-uploader .el-upload {
    background:red;
    width: 104px;
    height: 158px;
    border:1px solid #CCCCCC;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    text-align:center;
    background: rebeccapurple;
    span{
      display: block;
      font-size:12px;
      position:absolute;
      bottom: 0;
      margin-left:12px;
    }
  }
  .new-con .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .new-con .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 104px;
    height: 158px;
    line-height: 138px;
    text-align: center;
  }
  .new-con .avatar {
    width: 104px;
    height: 158px;
    display: block;
  }
  .save-btn .el-button--primary {
    width: 210px;
  }
  .warn-box{
    .warntext-box{
      float:left;
      overflow:hidden;
      margin-left:25px;
    }
    .warn-text{
      line-height:38px;
      color:#666666;
      vertical-align:middle;
    }
    img{
      width: 86px;
      height: 75px;
      float: left;
    }
  }
  
</style>
<style>
  .info-tab .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 156px;
  }
  .info-tab .el-checkbox__input.is-checked+.el-checkbox__label{
    color:#808080;
  }
  .new-con .el-dialog{
    width: 686px;
  }
  .new-con .el-dialog__header{
    padding: 0;
  }
  .new-con .el-dialog--center .el-dialog__body{
    overflow: hidden;
    padding:100px 64px 50px 81px;
  }
  .new-con .dialog-footer{
    padding-bottom: 50px;
  }
  .new-con .dialog-footer button:last-child{
    margin-left: 87px;
    color: #1FA5FF;
    border:1px solid #1FA5FF;
  }
  .new-con .dialog-footer button{
    width: 210px;
  }
</style>
