<template>
  <div class="re-box">
    <div class="go-back" @click="goback"><< 返回</div>
    <div class="contented-box">
      <div class="text-center">
        <p class="tit-p">段位考核活动申请表</p>
        <p class="tit-tip">活动基本信息</p>
      </div>
      <table class="ac-tab">
       <!--  <tr>
          <td>活动组织机构：</td>
          <td>XXXXXXXXXXXXXXXXXX</td>
        </tr> -->
        <tr>
          <td>活动联系人：</td>
          <td><input type="text" name="" v-model="contacts" maxlength="10" placeholder="10个字以内"></td>
        </tr>
        <tr>
          <td>联系电话：</td>
          <td><input type="text" name="" v-model="contact_number" maxlength="11"></td>
        </tr>
        <tr>
          <td>考段名额：</td>
          <td><input type="text" name="" class="width-110" v-model="places" @input="inputFn(places)"> 人</td>
        </tr>
        <tr>
          <td>考核等级：</td>
          <td>
            <p v-for="item in data">
              <el-checkbox v-model="item.ischeck"></el-checkbox>
              <span class="color-26 mar-23">{{item.name}}（{{item.describe}}）</span>
              <span>费用<i class="red">{{item.price}}</i>元</span>
              <span class="mar-51">折扣 <input type="text" name="" class="width-62" v-model="item.num" maxlength="3" @input="arrFn(item.num,item)"> % (>=80)</span>
            </p>
          </td>
        </tr>
        <tr>
          <td>活动描述：</td>
          <td>
            <textarea v-model="describe"></textarea>
          </td>
        </tr>
      </table>
      <p class="ac-time">申报活动时间</p>
      <div class="card-class" v-for="(item,index) in times">
          <i class="close" @click="delFn(index)"></i>
          <table class="card-tab">
            <tr>
              <td>选择活动时间：</td>
              <td>
                <el-date-picker
                  v-model="item.activitytime"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </td>
            </tr>
            <tr>
              <td>考核时间：</td>
              <td>
                <p>
                  <span class="span-select">上午&nbsp;
                    <el-time-select
                      placeholder="起始时间"
                      v-model="item.start_morning"
                      :picker-options="{
                        start: '08:00',
                        step: '00:20',
                        end: '12:00'
                      }">
                    </el-time-select>
                    —
                    <el-time-select
                      placeholder="结束时间"
                      v-model="item.end_morning"
                      :picker-options="{
                        start: '08:00',
                        step: '00:20',
                        end: '12:00',
                        minTime: item.start_morning
                      }">
                    </el-time-select>
                  </span>
                  <span class="span-select">
                    &nbsp;&nbsp;&nbsp;下午&nbsp;
                    <el-time-select
                      placeholder="起始时间"
                      v-model="item.start_afternoon"
                      :picker-options="{
                        start: '12:00',
                        step: '00:20',
                        end: '18:00'
                      }">
                    </el-time-select>
                    —
                    <el-time-select
                      placeholder="结束时间"
                      v-model="item.end_afternoon"
                      :picker-options="{
                        start: '12:00',
                        step: '00:20',
                        end: '18:00',
                        minTime: item.start_afternoon
                      }">
                    </el-time-select>
                  </span>
                </p>
               <!--  <p>共<input type="text" class="time">小时</p> -->
              </td>
            </tr>
            <tr>
              <td>报名截止时间：</td>
              <td>
                <el-date-picker
                  v-model="item.deadline"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </td>
            </tr>
            <tr>
              <td>考桌：</td>
              <td>
                <input type="number" name="" v-model="item.tables" maxlength="11" min="1" :max="max" class="number-class">
              </td>
            </tr>
          </table>
      </div>
      <div class="add-class"><button @click="addFn">添加活动</button></div>   
          <div class="btn-box">
            <button @click="confirm(1)" style="margin-right:0">提交审核</button>
           <!--  <button @click="confirm(0)">存为草稿</button> -->
      </div>
    </div>

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
</template>
<script>
export default {
  data () {
    return {
      checked:"",
      value1:"",
      startTime:"",
      endTime:"",
      token:sessionStorage.getItem("token"),
      data:[],
      contacts:"",
      contact_number:"",
      places:"",
      describe:"",
      list:[],
      times:[],
      success:false,
      suinfo:"",
      fail:false,
      failinfo:"",
      max:1
    }
  },
  mounted(){
      this.getinfo();
      this.getlist();
      //this.addFn();
  },
  computed:{
   
  },
  methods:{
    getinfo(){
      this.$api.get("/rankinfo",{
      },
      su=>{
        if(su.status==200){
          for(let val of su.data){
            val.ischeck = false;
            val.num = "";
          }
          this.data = su.data;
        }
      },
      err=>{

      },{
        token:this.token
      })
    },
    getlist(){
      this.$api.get("/tables",{
      },
      su=>{
        if(su.status==200){
           
          this.max = su.data;
          this.addFn();
        }
      },
      err=>{

      },{
        token:this.token
      })
    },
    addFn(){
      this.times.push({
        activitytime:"",
        start_morning:"",
        end_morning:"",
        start_afternoon:"",
        end_afternoon:"",
        deadline:"",
        // list:JSON.parse(this.list),
        tables:this.max
      })
    },
    delFn(val){
      if(this.times.length<=1){
        this.$message({
          message: '至少保留一条报名信息',
          type: 'warning'
        });
        return
      }
      this.times.splice(val,1)
    },
    confirm(val){
      if(!this.contacts){
        this.$message({
          message: '请填写联系人',
          type: 'warning'
        });
        return
      }
      if(!this.contact_number){
        this.$message({
          message: '请填写联系电话',
          type: 'warning'
        });
        return
      }
      let reg = /^1[2|3|4|5|6|7|8|9][0-9]\d{4,8}$/;
      if(!reg.test(this.contact_number)){
         this.$message({
          message: '手机号码格式不正确',
          type: 'warning'
        });
        return
      }
      if(!this.places){
        this.$message({
          message: '请填写考段名额',
          type: 'warning'
        });
        return
      }
      let arr = [];
      for(let value of this.data){
        if(value.ischeck){
          if(!value.num){
            this.$message({
              message: '请填写折扣',
              type: 'warning'
            });
            return
          }
          if(Number(value.num)<80||Number(value.num)>100){
             this.$message({
              message: '折扣必须在80到100之间',
              type: 'warning'
            });
            return
          }
          arr.push({
            gid:value.id,
            discount:value.num
          })
        }
      }
       if(arr.length<=0){
        this.$message({
          message: '请选择考核等级',
          type: 'warning'
        });
        return
      }
      if(!this.describe){
        this.$message({
          message: '请填写活动描述',
          type: 'warning'
        });
        return
      }
      //console.log(this.times);
      let obj = {
        status:val,
        contacts:this.contacts,
        contact_number:this.contact_number,
        places:this.places,
        describe:this.describe,
        grade:arr,
        activitytime:[]
      }
      for(let time of this.times){
        if(!time.activitytime){
            this.$message({
              message: '请选择活动时间',
              type: 'warning'
            });
            return 
        }
        if(!time.start_morning||!time.end_morning||!time.start_afternoon||!time.end_afternoon){
            this.$message({
              message: '请选择考核时间',
              type: 'warning'
            });
            return 
        }
        if(!time.deadline){
            this.$message({
              message: '请选择截止时间',
              type: 'warning'
            });
            return 
        }
        if(time.tables>this.max||time.tables<1){
            this.$message({
              message: '请填写合法的考桌数',
              type: 'warning'
            });
            return 
        }
        // let checkman = [];
        // for(let man of time.list){
        //   if(man.ischeck){
        //     checkman.push({id:man.id})
        //   }
        // }
        // if(checkman.length<=0){
        //    this.$message({
        //       message: '请选择考官',
        //       type: 'warning'
        //     });
        //     return 
        // }
        obj.activitytime.push({
          activitytime:this.parseTime(time.activitytime.getTime()),
          start_morning:this.parseTime(this.getTime(time.activitytime,time.start_morning)),
          end_morning:this.parseTime(this.getTime(time.activitytime,time.end_morning)),
          start_afternoon:this.parseTime(this.getTime(time.activitytime,time.start_afternoon)),
          end_afternoon:this.parseTime(this.getTime(time.activitytime,time.end_afternoon)),
          deadline:this.parseTime(time.deadline.getTime()),
          tables:time.tables
          //roster:checkman
        })

      }
      this.$api.post("/release",obj,
      su=>{
        if(su.status==200){
          this.success = true;
          this.suinfo = su.info;
          setTimeout(()=>{
            this.$router.push({path:"/activity/activitybase"})
          },1000)
        }else{
          this.fail = true;
          this.failinfo = su.info;
        }
      },
      err=>{
          this.fail = true;
          this.failinfo = su.info;
      },{token:this.token})
    },
    getTime(val,time){
      let ti = "";
      ti = val.getFullYear()+"-"+ (val.getMonth()+1)+"-"+val.getDate()+" "+time;
      console.log(ti,"time")
      return (new Date(ti)).getTime();
    },
    parseTime(val){
      return parseInt(val/1000);
    },
    dalogFn(){
       setTimeout(()=>{
        this.success = false;
        this.fail = false;
      },1500)
    },
    goback(){
         this.$router.push({path:"/activity/activitybase"})
    },
    inputFn(val){
        //console.log(val)
        if(parseInt(val)){
          this.places = parseInt(val)
        }else{
          this.places = ""
        }
    },
    arrFn(val,num){
      //console.log(num)
        if(parseInt(val)){
          num.num = parseInt(val)
        }else{
          num.num = ""
        }
    }
  },
  watch:{
      success:'dalogFn',
      fail:'dalogFn'
  }
}
</script>


<style lang='scss' scoped>
  .re-box{
    padding: 31px 0 50px 0;
  }
  .contented-box{
    width: 822px;
    margin: 0 auto;
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
    margin: 0 0 0 32px;
  }
  .text-center{
    text-align: center;
    .tit-p{
      font-size:18px;
      color:rgba(26,26,26,1);
      padding-bottom: 11px;
      border-bottom: 2px solid RGBA(204, 204, 204, 1);
      width: 198px;
      display: inline-block;  
    }
    .tit-tip{
      margin-top: 30px;
      font-size: 14px;
    }
  }
  .ac-tab{
      font-size: 14px;
      color: RGBA(102, 102, 102, 1);
      margin-top: 10px;
      td{
        line-height: 50px;
      }
      td:first-child{
        width: 144px;
        text-align: right;
        vertical-align: top;
      }
      td:last-child{
        padding-left: 19px;
        text-align: left;
        .color-26{
          color: RGBA(26, 26, 26, 1);
        }
        .mar-23{
          margin: 0 13px 0 35px;
        }
         .mar-51{
          margin-left:51px;
        }
        input{
          width:230px;
          height:36px; 
          border-radius: 2px;
          border: 1px solid RGBA(204, 204, 204, 1);
          padding:0;
          box-sizing:border-box;
        }
        .red{
          color: RGBA(248, 76, 76, 1);
          margin: 0 9px;
        }
        input.width-110{
          width: 110px;
        }
        input.width-62{
          width: 62px;
        }
        textarea{
          width:528px;
          height:164px; 
          border-radius: 2px;
          margin-top: 20px;
        }
      }
  }
  .ac-time{
    text-align: center;
    font-size:14px;
    color:rgba(26,26,26,1);
    margin: 20px 0 20px 0;
  }
  .card-class{
    border-radius: 2px;
    border: 1px solid RGBA(204, 204, 204, 1);
    padding: 25px;
    font-size: 14px;
    color: RGBA(102, 102, 102, 1);
    margin-bottom: 20px;
    .close{
      float: right;
      display: inline-block;
      width: 36px;
      height: 36px;
      background: url(../../assets/images/del-ac.png);
      cursor: pointer;
    } 
  }
  .span-select{
    .el-date-editor.el-input{
      width: 120px;
    }
  }
  .card-tab{
    td{
      line-height: 55px;
      .time{
        width:68px;
        height:36px; 
        border-radius: 2px;
        border: 1px solid #dcdfe6;
        margin: 0 10px;
      }
    }
  }
  .te-class{
    width:150px;
    height:36px; 
    background:rgba(204,204,204,1);
    border-radius: 2px ;
    color: #fff;
    text-align: center;
    line-height: 36px;
  }
  .check-box{
    width: 560px;
    line-height: 40px;
    span{   
      display: inline-block;
      width: 70px;  
      margin-right: 41px;
      i{
        margin-left: 4px;
        width: 50px;
        text-overflow:ellipsis;
        white-space: nowrap;
        display: inline-block;
        overflow: hidden;
        height: 19px;
        line-height: 19px;
        position: relative;
        top:3px;
      }
    }
    span:nth-child(5n){
      margin-right: 0;
    }
  }
  .add-class{
    text-align: center;
    margin: 20px 0;
    button{
      width: 160px;
      height: 30px;
      background:rgba(31,165,255,1);
      border:1px solid rgba(31,165,255,1);
      color: #fff;
      cursor: pointer;
    }
  }
  .btn-box{
    text-align: center;

    button{
      width: 210px;
      height: 40px;
      outline: none;
      box-sizing:border-box;
      cursor: pointer;
    }
    button:first-child{
      background:rgba(31,165,255,1);
      margin-right: 128px;
      border:1px solid rgba(31,165,255,1);
      color: #fff;
    }
    button:last-child{
       border:1px solid #1FA5FF;
       color: #1FA5FF;
       background: #fff;
    }
  }
  .number-class{
    width: 110px;
    height: 36px;
    border-radius: 2px;
    border: 1px solid RGBA(204, 204, 204, 1);
    padding: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    text-indent: 5px;
  }
</style>