<template>
   <div class="gr-con">
      <div class="go-back" @click="goback"><< 返回</div>   
      <div class="con-info">
        <span class="gr-title">段位考核活动成绩录入</span>
        <span class="info-title">活动基本信息</span>
        <p class="ac-info">
          <span class="ac-key">活动编码：</span>
          <span class="ac-val">{{hinfo.id}}</span>
          <span class="ac-key">活动组织机构：</span>
          <span class="ac-val">{{hinfo.name}}</span>
          <span class="ac-key">活动时间：</span>
          <span class="ac-val">{{hinfo.activitytime}}</span>
        </p>
        <div class="gr-tab">
          <el-table
            :data="grtab"
            style="width: 800px">
            <el-table-column
              prop="number"
              label="学员编号"
              width="120"
              >
            </el-table-column>
            <el-table-column
              prop="realname"
              label="学员姓名"
              width="120">
            </el-table-column>
            <el-table-column
              prop="dan"
              label="报名等级"
              width="100">
            </el-table-column>
            <el-table-column
              prop="paytime"
              label="支付时间">
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
               
                  <el-button type="primary" v-if="scope.row.status==1 || scope.row.status==3 || scope.row.status==4" plain size="small" @click="editRecord(scope.row)">编辑成绩</el-button>
                   <el-button type="primary" v-if="scope.row.status==0" plain size="small" @click="setRecord(scope.row)">录入成绩</el-button>
              </template>
              
            </el-table-column>
          </el-table>
        </div>
      
      </div>
  <div class="block" style="text-align:center;margin-top:30px;">
   
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-sizes="[20, 50, 100]"
      :page-size="pagecount"
      layout="prev, pager, next,sizes"
      :total="pagetotal">
    </el-pagination>
  </div>
      <el-dialog
        :visible.sync="grDialog"
        :before-close="handleClose"
        width="738px"
        center :show-close="false">
        <div class="dialog-box" :class="{'primarybg':info.dan>=1 && info.dan<=3,'middlebg':info.dan>=4 && info.dan<=6,'hleval':info.dan>=7 && info.dan<=9}">
            <p class="dia-title" :class="{'ptt':info.dan>=1 && info.dan<=3,'mtt':info.dan>=4 && info.dan<=6,'htt':info.dan>=7 && info.dan<=9}">大众乒乓球段位段前考核测试表</p>
            <div class="dia-info">
              <span class="info-item ellipsis">
                <span class="dia-key">姓名：</span>
                <span class="dia-val ellipsis wd-100">{{info.realname}}</span>
              </span>
              <span class="info-item">
                <span class="dia-key">性别：</span>
                <span class="dia-val">
                   <span v-if="info.sex==1">男</span>
                   <span v-if="info.sex==2">女</span>
                </span>
               
              </span>

              <span class="info-item">
                <span class="dia-key">专业训练：</span>
                <span v-if="info.trainingyears==1">有</span>
                <span v-if="info.trainingyears==0">无</span>
              
              </span>
            </div>
            <div class="dia-info">
             
              <span class="info-item">
                <span class="dia-key">现有段位：</span>
                <span class="dia-val">{{info.rank}}</span>
              </span>
    
               <span class="info-item">
                <span class="dia-key">乒协会员：</span>
                <span v-if="info.ppassociation==1">有</span>
                <span v-if="info.ppassociation==0">无</span>
               
              </span>
           </div>
            <div class="table-cont">
              <div class="skill-box" v-if="tabList[0]">
                  <div class="cont-ls" >
                      <span class="skill-sty" :class="{'primcolor':info.dan>=1 && info.dan<=3,'middcolor':info.dan>=4 && info.dan<=6,'hcolor':info.dan>=7 && info.dan<=9}">{{tabList[0].name}}</span>
                  </div>
               
                  <div class="tab-bor" :class="{'pbd':info.dan>=1 && info.dan<=3,'mbd':info.dan>=4 && info.dan<=6,'hbd':info.dan>=7 && info.dan<=9}">
                    <table  v-if="info.dan>=1 && info.dan<=3" class="skill-tab" width="100%" border="0" cellpadding="0" cellspacing="0">
                      <thead>
                        <tr>
                          <th width="90">测试指标</th>
                          <th width="180">测试内容</th>
                          <th>测试结果</th>
                          <th width="54">小计</th>
                        </tr>
                      </thead>
                      <tr>
                        <td rowspan="3" class="pd-l10">{{tabList[0].description}}</td>
                        <td class="pd-l10"  v-if="tabList[0].content[0]">{{tabList[0].content[0].value}}球{{tabList[0].content[0].name}}</td>
                        <td>
                            <span v-for="(ipt,idx) in tabList[0].content[0].result">
                                 <input type="text" @keyup="keyupFn(ipt,0)" v-model="ipt.v" :style="'width:'+100/tabList[0].content[0].result.length+'%'" class="boxsiing">
                            </span>
                           
                        </td>
                        <td>
                           <input type="text" class="w54" v-if="tabList[0].content[0]"  @keyup="keyupFn(tabList[0].content[0],1)" v-model="tabList[0].content[0].total">
                        </td>
                      </tr>
                      <tr>
                        <td class="pd-l10" v-if="tabList[0].content[1]">{{tabList[0].content[1].name}}</td>
                        <td class="pd-l10" v-if="tabList[0].content[1]">
                            <el-radio-group v-model="tabList[0].content[1].results">
                             <el-radio :label="1">较差</el-radio>
                             <el-radio :label="2">中</el-radio>
                             <el-radio :label="3">较好</el-radio>
                          </el-radio-group>
                        </td>
                        <td>
                           <input type="text" class="w54"  @keyup="keyupFn(tabList[0].content[1],1)" v-model="tabList[0].content[1].total">
                        </td>
                        
                      </tr>
                      <tr>
                        <td class="pd-l10" v-if="tabList[0].content[2]">{{tabList[0].content[2]['name']}}</td>
                        <td class="pd-l10">
                            <el-radio-group v-if="tabList[0].content[2]" v-model="tabList[0].content[2].results">
                             <el-radio :label="1">较差</el-radio>
                             <el-radio :label="2">中</el-radio>
                             <el-radio :label="3">较好</el-radio>
                          </el-radio-group>
                        </td>
                        <td>
                           <input type="text" class="w54" @keyup="keyupFn(tabList[0].content[2],1)" v-model="tabList[0].content[2].total">
                        </td>
                        
                      </tr>
                    </table>

                     <table  v-if="info.dan>=4 && info.dan<=6" class="skill-tab" width="100%" border="0" cellpadding="0" cellspacing="0">
                      <thead>
                        <tr>
                          <th width="90">测试指标</th>
                          <th width="180">测试内容</th>
                          <th>测试结果</th>
                          <th width="54">小计</th>
                        </tr>
                      </thead>
                      <tr>
                        <td rowspan="3" class="pd-l10">{{tabList[0].description}}</td>
                        <td class="pd-l10"  v-if="tabList[0].content[0]">{{tabList[0].content[0].value}}球{{tabList[0].content[0].name}}</td>
                        <td>
                            <span v-for="(ipt,idx) in tabList[0].content[0].result">
                                 <input type="text" v-model="ipt.v" :style="'width:'+100/tabList[0].content[0].result.length+'%'" class="boxsiing" @keyup="keyupFn(ipt,0)">
                            </span>
                           
                        </td>
                        <td>
                           <input type="text" class="w54" @keyup="keyupFn(tabList[0].content[0],1)" v-if="tabList[0].content[0]" v-model="tabList[0].content[0].total">
                        </td>
                      </tr>
                      <tr>
                        <td class="pd-l10" v-if="tabList[0].content[1]">{{tabList[0].content[1].name}}</td>
                        <td class="pd-l10" v-if="tabList[0].content[1]">
                            <el-radio-group v-model="tabList[0].content[1].results">
                             <el-radio :label="1">较差</el-radio>
                             <el-radio :label="2">中</el-radio>
                             <el-radio :label="3">较好</el-radio>
                          </el-radio-group>
                        </td>
                        <td>
                           <input type="text" class="w54" @keyup="keyupFn(tabList[0].content[1],1)"  v-model="tabList[0].content[1].total">
                        </td>
                        
                      </tr>
                      <tr>
                        <td class="pd-l10" v-if="tabList[0].content[2]">{{tabList[0].content[2]['name']}}</td>
                        <td class="pd-l10">
                            <el-radio-group v-if="tabList[0].content[2]" v-model="tabList[0].content[2].results">
                             <el-radio :label="1">较差</el-radio>
                             <el-radio :label="2">中</el-radio>
                             <el-radio :label="3">较好</el-radio>
                          </el-radio-group>
                        </td>
                        <td>
                           <input type="text" class="w54" @keyup="keyupFn(tabList[0].content[2],1)" v-model="tabList[0].content[2].total">
                        </td>
                        
                      </tr>
                    </table>
                    <table  v-if="info.dan>=7 && info.dan<=9" class="skill-tab" width="100%" border="0" cellpadding="0" cellspacing="0">
                      <thead>
                        <tr>
                          <th width="90">测试指标</th>
                          <th width="180">测试内容</th>
                          <th>测试结果</th>
                          <th width="54">小计</th>
                        </tr>
                      </thead>
                      <tr>
                        <td rowspan="2" class="pd-l10">{{tabList[0].description}}</td>
                        <td class="pd-l10"  v-if="tabList[0].content[0]">{{tabList[0].content[0].value}}球{{tabList[0].content[0].name}}</td>
                        <td>
                            <span v-for="(ipt,idx) in tabList[0].content[0].result">
                                 <input type="text" v-model="ipt.v" :style="'width:'+100/tabList[0].content[0].result.length+'%'" @keyup="keyupFn(ipt,0)" class="boxsiing">
                            </span>
                           
                        </td>
                        <td>
                           <input type="text" class="w54" @keyup="keyupFn(tabList[0].content[0],1)"  v-if="tabList[0].content[0]" v-model="tabList[0].content[0].total">
                        </td>
                      </tr>
                      <tr>
                        <td class="pd-l10" v-if="tabList[0].content[1]">{{tabList[0].content[1].name}}</td>
                        <td class="pd-l10" v-if="tabList[0].content[1]">
                            <el-radio-group v-model="tabList[0].content[1].results">
                             <el-radio :label="1">较差</el-radio>
                             <el-radio :label="2">中</el-radio>
                             <el-radio :label="3">较好</el-radio>
                          </el-radio-group>
                        </td>
                        <td>
                           <input type="text" class="w54" @keyup="keyupFn(tabList[0].content[1],1)" v-model="tabList[0].content[1].total">
                        </td>
                        
                      </tr>
                      <tr>
                        <td rowspan="2" class="pd-l10">反手发侧下/侧上旋球</td>
                        <td class="pd-l10"  v-if="tabList[0].content[2]">{{tabList[0].content[2].value}}球{{tabList[0].content[2].name}}</td>
                        <td>
                            <span v-for="(ipt,idx) in tabList[0].content[2].result">
                                 <input type="text" v-model="ipt.v" @keyup="keyupFn(ipt,0)" :style="'width:'+100/tabList[0].content[2].result.length+'%'" class="boxsiing">
                            </span>
                           
                        </td>
                        <td>
                           <input type="text" class="w54" @keyup="keyupFn(tabList[0].content[2],1)" v-if="tabList[0].content[2]" v-model="tabList[0].content[2].total">
                        </td>
                      </tr>
                      <tr>
                        <td class="pd-l10" v-if="tabList[0].content[3]">{{tabList[0].content[3].name}}</td>
                        <td class="pd-l10" v-if="tabList[0].content[3]">
                            <el-radio-group v-model="tabList[0].content[3].results">
                             <el-radio :label="1">较差</el-radio>
                             <el-radio :label="2">中</el-radio>
                             <el-radio :label="3">较好</el-radio>
                          </el-radio-group>
                        </td>
                        <td>
                           <input type="text" class="w54" @keyup="keyupFn(tabList[0].content[3],1)" v-model="tabList[0].content[3].total">
                        </td>
                      </tr>
                    </table>
                  </div>
              </div>
              <div class="skill-box" v-if="tabList[1]">
                   <div class="cont-ls">
                       <span class="skill-sty" :class="{'primcolor':info.dan>=1 && info.dan<=3,'middcolor':info.dan>=4 && info.dan<=6,'hcolor':info.dan>=7 && info.dan<=9}">{{tabList[1].name}}</span>
                   </div>
                 
                  <div class="tab-bor" :class="{'pbd':info.dan>=1 && info.dan<=3,'mbd':info.dan>=4 && info.dan<=6,'hbd':info.dan>=7 && info.dan<=9}">
                    <table  v-if="info.dan>=1 && info.dan<=3" class="skill-tab" width="100%" border="0" cellpadding="0" cellspacing="0">
                      <thead>
                        <tr>
                          <th width="90">测试指标</th>
                          <th width="180">测试内容</th>
                          <th>测试结果</th>
                          <th width="54">小计</th>
                        </tr>
                      </thead>
                      <tr>
                        <td rowspan="3" class="pd-l10">{{tabList[1].description}}</td>
                        <td class="pd-l10"  v-if="tabList[1].content[0]">{{tabList[1].content[0].value}}球{{tabList[1].content[0].name}}</td>
                        <td>
                           <span v-for="(ipt,idx) in tabList[1].content[0].result">
                                 <input type="text" @keyup="keyupFn(ipt,0)" v-model="ipt.v" :style="'width:'+100/tabList[1].content[0].result.length+'%'" class="boxsiing">
                           </span>
                       
                        </td>
                        <td>
                             
                           <input type="text" class="w54" @keyup="keyupFn(tabList[1].content[0],1)" v-if="tabList[1].content[0]" v-model="tabList[1].content[0].total">
                        </td>
                      </tr>
                      <tr>
                        <td class="pd-l10" v-if="tabList[1].content[1]">{{tabList[1].content[1].name}}</td>
                        <td class="pd-l10" v-if="tabList[1].content[1]">
                            <el-radio-group v-model="tabList[1].content[1].results">
                             <el-radio :label="1">较差</el-radio>
                             <el-radio :label="2">中</el-radio>
                             <el-radio :label="3">较好</el-radio>
                          </el-radio-group>
                        </td>
                        <td>
                           <input type="text" @keyup="keyupFn(tabList[1].content[1],1)" class="w54" v-model="tabList[1].content[1].total">
                        </td>
                        
                      </tr>
                      <tr>
                        <td class="pd-l10" v-if="tabList[1].content[2]">{{tabList[1].content[2]['name']}}</td>
                        <td class="pd-l10">
                            <el-radio-group v-if="tabList[1].content[2]" v-model="tabList[1].content[2].results">
                             <el-radio :label="1">较差</el-radio>
                             <el-radio :label="2">中</el-radio>
                             <el-radio :label="3">较好</el-radio>
                          </el-radio-group>
                        </td>
                        <td>
                           <input type="text" class="w54" @keyup="keyupFn(tabList[1].content[2],1)" v-model="tabList[1].content[2].total"> 
                        </td>
                        
                      </tr>
                    </table>
                    <table  v-if="info.dan>=4 && info.dan<=6" class="skill-tab" width="100%" border="0" cellpadding="0" cellspacing="0">
                      <thead>
                        <tr>
                          <th width="90">测试指标</th>
                          <th width="180">测试内容</th>
                          <th>测试结果</th>
                          <th width="54">小计</th>
                        </tr>
                      </thead>
                      <tr>
                        <td rowspan="3" class="pd-l10">{{tabList[1].description}}</td>
                        <td class="pd-l10"  v-if="tabList[1].content[0]">{{tabList[1].content[0].value}}球{{tabList[1].content[0].name}}</td>
                        <td>
                           <span v-for="(ipt,idx) in tabList[1].content[0].result">
                                 <input type="text" v-model="ipt.v" @keyup="keyupFn(ipt,0)"  :style="'width:'+100/tabList[1].content[0].result.length+'%'" class="boxsiing">
                           </span>
                       
                        </td>
                        <td>
                             
                           <input type="text" class="w54" @keyup="keyupFn(tabList[1].content[0],1)"  v-if="tabList[1].content[0]" v-model="tabList[1].content[0].total">
                        </td>
                      </tr>
                      <tr>
                        <td class="pd-l10" v-if="tabList[1].content[1]">{{tabList[1].content[1].name}}</td>
                        <td class="pd-l10" v-if="tabList[1].content[1]">
                            <el-radio-group v-model="tabList[1].content[1].results">
                             <el-radio :label="1">较差</el-radio>
                             <el-radio :label="2">中</el-radio>
                             <el-radio :label="3">较好</el-radio>
                          </el-radio-group>
                        </td>
                        <td>
                           <input type="text" class="w54" @keyup="keyupFn(tabList[1].content[1],1)" v-model="tabList[1].content[1].total">
                        </td>
                        
                      </tr>
                      <tr>
                        <td class="pd-l10" v-if="tabList[1].content[2]">{{tabList[1].content[2]['name']}}</td>
                        <td class="pd-l10">
                            <el-radio-group v-if="tabList[1].content[2]" v-model="tabList[1].content[2].results">
                             <el-radio :label="1">较差</el-radio>
                             <el-radio :label="2">中</el-radio>
                             <el-radio :label="3">较好</el-radio>
                          </el-radio-group>
                        </td>
                        <td>
                           <input type="text" class="w54" @keyup="keyupFn(tabList[1].content[2],1)" v-model="tabList[1].content[2].total"> 
                        </td>
                        
                      </tr>
                    </table>
                    <table  v-if="info.dan>=7 && info.dan<=9" class="skill-tab" width="100%" border="0" cellpadding="0" cellspacing="0">
                      <thead>
                        <tr>
                          <th width="90">测试指标</th>
                          <th width="180">测试内容</th>
                          <th>测试结果</th>
                          <th width="54">小计</th>
                        </tr>
                      </thead>
                      <tr>
                        <td rowspan="3" class="pd-l10">{{tabList[1].description}}</td>
                        <td class="pd-l10"  v-if="tabList[1].content[0]">{{tabList[1].content[0].value}}球{{tabList[1].content[0].name}}</td>
                        <td>
                           <span v-for="(ipt,idx) in tabList[1].content[0].result">
                                 <input type="text" v-model="ipt.v" @keyup="keyupFn(ipt,0)" :style="'width:'+100/tabList[1].content[0].result.length+'%'" class="boxsiing">
                           </span>
                       
                        </td>
                        <td>
                             
                           <input type="text" class="w54" @keyup="keyupFn(tabList[1].content[0],1)" v-if="tabList[1].content[0]" v-model="tabList[1].content[0].total">
                        </td>
                      </tr>
                      <tr>
                        <td class="pd-l10" v-if="tabList[1].content[1]">{{tabList[1].content[1].name}}</td>
                        <td class="pd-l10" v-if="tabList[1].content[1]">
                            <el-radio-group v-model="tabList[1].content[1].results">
                             <el-radio :label="1">较差</el-radio>
                             <el-radio :label="2">中</el-radio>
                             <el-radio :label="3">较好</el-radio>
                          </el-radio-group>
                        </td>
                        <td>
                           <input type="text" class="w54" @keyup="keyupFn(tabList[1].content[1],1)" v-model="tabList[1].content[1].total">
                        </td>
                        
                      </tr>
                      <tr>
                        <td class="pd-l10" v-if="tabList[1].content[2]">{{tabList[1].content[2]['name']}}</td>
                        <td class="pd-l10">
                            <el-radio-group v-if="tabList[1].content[2]" v-model="tabList[1].content[2].results">
                             <el-radio :label="1">较差</el-radio>
                             <el-radio :label="2">中</el-radio>
                             <el-radio :label="3">较好</el-radio>
                          </el-radio-group>
                        </td>
                        <td>
                           <input type="text" class="w54" @keyup="keyupFn(tabList[1].content[2],1)" v-model="tabList[1].content[2].total"> 
                        </td>
                        
                      </tr>
                    </table>
                  </div>
    
              </div>
              <div class="skill-box" v-if="tabList[2]">
                  <div class="cont-ls">
                      <span class="skill-sty" :class="{'primcolor':info.dan>=1 && info.dan<=3,'middcolor':info.dan>=4 && info.dan<=6,'hcolor':info.dan>=7&& info.dan<=9}">{{tabList[2].name}}</span>
                  </div>

                
                  <div class="tab-bor" :class="{'pbd':info.dan>=1 && info.dan<=3,'mbd':info.dan>=4 && info.dan<=6,'hbd':info.dan>=7 && info.dan<=9}">
                    <table v-if="info.dan>=1 && info.dan<=3"  class="skill-tab" width="100%" border="0" cellpadding="0" cellspacing="0">
                      <thead>
                        <tr>
                          <th width="90">测试指标</th>
                          <th width="180">测试内容</th>
                          <th>测试结果</th>
                          <th width="54">小计</th>
                        </tr>
                      </thead>
                      <tr>
                        <td rowspan="3" class="pd-l10">{{tabList[2].description}}</td>
                        <td class="pd-l10"  v-if="tabList[2].content[0]">{{tabList[2].content[0].value}}秒{{tabList[2].content[0].name}}</td>
                        <td>
                           <input type="text" class="w200" @keyup="keyupFn(tabList[2].content[0],2)" v-if="tabList[2].content[0]"  v-model="tabList[2].content[0].results">
                        </td>
                        <td>
                           <input type="text" class="w54" @keyup="keyupFn(tabList[2].content[0],1)" v-if="tabList[2].content[0]" v-model="tabList[2].content[0].total">
                        </td>
                      </tr>
                      <tr>
                        <td class="pd-l10" v-if="tabList[2].content[1]">{{tabList[2].content[1].name}}</td>
                        <td class="pd-l10" v-if="tabList[2].content[1]">
                            <el-radio-group v-model="tabList[2].content[1].results">
                             <el-radio :label="1">较差</el-radio>
                             <el-radio :label="2">中</el-radio>
                             <el-radio :label="3">较好</el-radio>
                          </el-radio-group>
                        </td>
                        <td>
                           <input type="text" class="w54" @keyup="keyupFn(tabList[2].content[1],1)"  v-model="tabList[2].content[1].total">
                        </td>
                        
                      </tr>
                     
                    </table>
                     <table v-if="info.dan>=4 && info.dan<=6"  class="skill-tab" width="100%" border="0" cellpadding="0" cellspacing="0">
                      <thead>
                        <tr>
                          <th width="90">测试指标</th>
                          <th width="180">测试内容</th>
                          <th>测试结果</th>
                          <th width="54">小计</th>
                        </tr>
                      </thead>
                      <tr>
                        <td rowspan="3" class="pd-l10">{{tabList[2].description}}</td>
                        <td class="pd-l10"  v-if="tabList[2].content[0]">{{tabList[2].content[0].value}}秒{{tabList[2].content[0].name}}</td>
                        <td>
                           <input type="text" class="w200" v-if="tabList[2].content[0]" @keyup="keyupFn(tabList[2].content[0],2)" v-model="tabList[2].content[0].results">
                        </td>
                        <td>
                           <input type="text" class="w54" v-if="tabList[2].content[0]" @keyup="keyupFn(tabList[2].content[0],1)" v-model="tabList[2].content[0].total">
                        </td>
                      </tr>
                      <tr>
                        <td class="pd-l10" v-if="tabList[2].content[1]">{{tabList[2].content[1].name}}</td>
                        <td class="pd-l10" v-if="tabList[2].content[1]">
                            <el-radio-group v-model="tabList[2].content[1].results">
                             <el-radio :label="1">较差</el-radio>
                             <el-radio :label="2">中</el-radio>
                             <el-radio :label="3">较好</el-radio>
                          </el-radio-group>
                        </td>
                        <td>
                           <input type="text" class="w54" @keyup="keyupFn(tabList[2].content[1],1)"  v-model="tabList[2].content[1].total">
                        </td>
                        
                      </tr>
                     
                    </table>

                    <table v-if="info.dan>=7 && info.dan<=9"  class="skill-tab" width="100%" border="0" cellpadding="0" cellspacing="0">
                      <thead>
                        <tr>
                          <th width="90">测试指标</th>
                          <th width="180">测试内容</th>
                          <th>测试结果</th>
                          <th width="54">小计</th>
                        </tr>
                      </thead>
                      <tr>
                        <td rowspan="2" class="pd-l10">{{tabList[2].description.split(',')[0]}}</td>
                        <td class="pd-l10"  v-if="tabList[2].content[0]">{{tabList[2].content[0].value}}球{{tabList[2].content[0].name}}</td>
                        <td>
                           <span v-for="(ipt,idx) in tabList[2].content[0].result">
                                 <input type="text" v-model="ipt.v" @keyup="keyupFn(ipt,0)" :style="'width:'+100/tabList[2].content[0].result.length+'%'" class="boxsiing">
                           </span>
                       
                        </td>
                        <td>
                             
                           <input type="text" class="w54" v-if="tabList[2].content[0]" @keyup="keyupFn(tabList[2].content[0],1)" v-model="tabList[2].content[0].total">
                        </td>
                      </tr>
                      <tr>
                        <td class="pd-l10" v-if="tabList[2].content[1]">{{tabList[2].content[1].name}}</td>
                        <td class="pd-l10" v-if="tabList[2].content[1]">
                            <el-radio-group v-model="tabList[2].content[1].results">
                             <el-radio :label="1">较差</el-radio>
                             <el-radio :label="2">中</el-radio>
                             <el-radio :label="3">较好</el-radio>
                          </el-radio-group>
                        </td>
                        <td>
                           <input type="text" class="w54" @keyup="keyupFn(tabList[2].content[1],1)" v-model="tabList[2].content[1].total">
                        </td>
                        
                      </tr>
                      <tr>
                        <td rowspan="2" class="pd-l10">{{tabList[2].description.split(',')[1]}}</td>
                        <td class="pd-l10"  v-if="tabList[2].content[2]">{{tabList[2].content[2].value}}秒{{tabList[2].content[2].name}}</td>
                        <td>
                           <input type="text" class="w200" v-if="tabList[2].content[2]" @keyup="keyupFn(tabList[2].content[2],2)" v-model="tabList[2].content[2].results">
                        </td>
                        <td>
                           <input type="text" class="w54" v-if="tabList[2].content[2]" @keyup="keyupFn(tabList[2].content[2],1)" v-model="tabList[2].content[2].total">
                        </td>
                      </tr>
                      <tr>
                         <td class="pd-l10" v-if="tabList[2].content[3]">{{tabList[2].content[3].name}}</td>
                        <td class="pd-l10" v-if="tabList[2].content[3]">
                            <el-radio-group v-model="tabList[2].content[3].results">
                             <el-radio :label="1">较差</el-radio>
                             <el-radio :label="2">中</el-radio>
                             <el-radio :label="3">较好</el-radio>
                          </el-radio-group>
                        </td>
                        <td>
                           <input type="text" class="w54" @keyup="keyupFn(tabList[2].content[3],1)" v-model="tabList[2].content[3].total">
                        </td>

                      </tr>
                    </table>
                  </div>
    
              </div>
              <div class="skill-box" v-if="tabList[3]">
                 <div class="cont-ls">
                    <span class="skill-sty" :class="{'primcolor':info.dan>=1 && info.dan<=3,'middcolor':info.dan>=4 && info.dan<=6,'hcolor':info.dan>=7 && info.dan<=9}">{{tabList[3].name}}</span>
                 </div>
                 
                  <div class="tab-bor" :class="{'pbd':info.dan>=1 && info.dan<=3,'mbd':info.dan>=4 && info.dan<=6,'hbd':info.dan>=7 && info.dan<=9}">
                    <table  v-if="info.dan>=1 && info.dan<=3"  class="skill-tab" width="100%" border="0" cellpadding="0" cellspacing="0">
                      <thead>
                        <tr>
                          <th width="90">测试指标</th>
                          <th width="180">测试内容</th>
                          <th>测试结果</th>
                          <th width="54">小计</th>
                        </tr>
                      </thead>
                      <tr>
                        <td rowspan="3">{{tabList[3].description}}</td>
                        <td class="pd-l10"  v-if="tabList[3].content[0]">{{tabList[3].content[0].value}}秒{{tabList[3].content[0].name}}</td>
                        <td>
                           <input type="text" class="w200" v-if="tabList[3].content[0]" @keyup="keyupFn(tabList[3].content[0],2)" v-model="tabList[3].content[0].results">
                        </td>
                        <td>
                           <input type="text" class="w54" v-if="tabList[3].content[0]" @keyup="keyupFn(tabList[3].content[0],1)" v-model="tabList[3].content[0].total">
                        </td>
                      </tr>
                      <tr>
                        <td class="pd-l10" v-if="tabList[3].content[1]">{{tabList[3].content[1].name}}</td>
                        <td class="pd-l10" v-if="tabList[3].content[1]">
                            <el-radio-group v-model="tabList[3].content[1].results">
                             <el-radio :label="1">较差</el-radio>
                             <el-radio :label="2">中</el-radio>
                             <el-radio :label="3">较好</el-radio>
                          </el-radio-group>
                        </td>
                        <td>
                           <input type="text" class="w54" @keyup="keyupFn(tabList[3].content[1],1)" v-model="tabList[3].content[1].total">
                        </td>
                        
                      </tr>
                     
                    </table>
                    <table  v-if="info.dan>=4 && info.dan<=6"  class="skill-tab" width="100%" border="0" cellpadding="0" cellspacing="0">
                      <thead>
                        <tr>
                          <th width="90">测试指标</th>
                          <th width="180">测试内容</th>
                          <th>测试结果</th>
                          <th width="54">小计</th>
                        </tr>
                      </thead>
                      <tr>
                        <td rowspan="3">{{tabList[3].description}}</td>
                        <td class="pd-l10"  v-if="tabList[3].content[0]">{{tabList[3].content[0].value}}秒{{tabList[3].content[0].name}}</td>
                        <td>
                           <input type="text" class="w200" v-if="tabList[3].content[0]" @keyup="keyupFn(tabList[3].content[0],2)" v-model="tabList[3].content[0].results">
                        </td>
                        <td>
                           <input type="text" class="w54" v-if="tabList[3].content[0]" @keyup="keyupFn(tabList[3].content[0],1)" v-model="tabList[3].content[0].total">
                        </td>
                      </tr>
                      <tr>
                        <td class="pd-l10" v-if="tabList[3].content[1]">{{tabList[3].content[1].name}}</td>
                        <td class="pd-l10" v-if="tabList[3].content[1]">
                            <el-radio-group v-model="tabList[3].content[1].results">
                             <el-radio :label="1">较差</el-radio>
                             <el-radio :label="2">中</el-radio>
                             <el-radio :label="3">较好</el-radio>
                          </el-radio-group>
                        </td>
                        <td>
                           <input type="text" class="w54" @keyup="keyupFn(tabList[3].content[1],1)" v-model="tabList[3].content[1].total">
                        </td>
                        
                      </tr>
                     
                    </table>
                     <table  v-if="info.dan>=7 && info.dan<=9"  class="skill-tab" width="100%" border="0" cellpadding="0" cellspacing="0">
                      <thead>
                        <tr>
                          <th width="90">测试指标</th>
                          <th width="180">测试内容</th>
                          <th>测试结果</th>
                          <th width="54">小计</th>
                        </tr>
                      </thead>
                      <tr>
                         <td rowspan="3" class="pd-l10">{{tabList[3].description}}</td>
                        <td class="pd-l10"  v-if="tabList[3].content[0]">{{tabList[3].content[0].value}}球{{tabList[3].content[0].name}}</td>
                        <td>
                           <span v-for="(ipt,idx) in tabList[3].content[0].result">
                                 <input type="text" v-model="ipt.v"  @keyup="keyupFn(ipt,0)" :style="'width:'+100/tabList[3].content[0].result.length+'%'" class="boxsiing">
                           </span>
                        </td>
                        <td>
                           <input type="text" class="w54" v-if="tabList[3].content[0]" @keyup="keyupFn(tabList[3].content[0],1)" v-model="tabList[3].content[0].total">
                        </td>
                      </tr>
                      <tr>
                        <td class="pd-l10" v-if="tabList[3].content[1]">{{tabList[3].content[1].name}}</td>
                        <td class="pd-l10" v-if="tabList[3].content[1]">
                            <el-radio-group v-model="tabList[3].content[1].results">
                             <el-radio :label="1">较差</el-radio>
                             <el-radio :label="2">中</el-radio>
                             <el-radio :label="3">较好</el-radio>
                          </el-radio-group>
                        </td>
                        <td>
                           <input type="text" class="w54" @keyup="keyupFn(tabList[3].content[1],1)" v-model="tabList[3].content[1].total">
                        </td>
                        
                      </tr>
                     
                    </table>
                  </div>
    
              </div>
              <div class="skill-box" v-if="tabList[4]">
                  <div class="cont-ls">
                     <span class="skill-sty" :class="{'primcolor':info.dan>=1 && info.dan<=3,'middcolor':info.dan>=4 && info.dan<=6,'hcolor':info.dan>=7 && info.dan<=9}">{{tabList[4].name}}</span>
                  </div>
                 
                  <div class="tab-bor" :class="{'pbd':info.dan>=1 && info.dan<=3,'mbd':info.dan>=4 && info.dan<=6,'hbd':info.dan>=7 && info.dan<=9}">
                    <table  v-if="info.dan>=1 && info.dan<=3"  class="skill-tab" width="100%" border="0" cellpadding="0" cellspacing="0">
                      <thead>
                        <tr>
                          <th width="90">测试指标</th>
                          <th width="180">测试内容</th>
                          <th>测试结果</th>
                          <th width="54">小计</th>
                        </tr>
                      </thead>
                      <tr>
                        <td rowspan="3" class="pd-l10">{{tabList[4].description}}</td>
                        <td class="pd-l10"  v-if="tabList[4].content[0]">{{tabList[4].content[0].value}}球{{tabList[4].content[0].name}}</td>
                        <td>
                           <span v-for="(ipt,idx) in tabList[4].content[0].result">
                                 <input type="text" @keyup="keyupFn(ipt,0)" v-model="ipt.v" :style="'width:'+100/tabList[4].content[0].result.length+'%'" class="boxsiing">
                           </span>
                        </td>
                        <td>
                           <input type="text" class="w54" v-if="tabList[4].content[0]" @keyup="keyupFn(tabList[4].content[0],1)" v-model="tabList[4].content[0].total">
                        </td>
                      </tr>
                      <tr>
                        <td class="pd-l10" v-if="tabList[4].content[1]">{{tabList[4].content[1].name}}</td>
                        <td class="pd-l10" v-if="tabList[4].content[1]">
                            <el-radio-group v-model="tabList[4].content[1].results">
                             <el-radio :label="1">较差</el-radio>
                             <el-radio :label="2">中</el-radio>
                             <el-radio :label="3">较好</el-radio>
                          </el-radio-group>
                        </td>
                        <td>
                           <input type="text" class="w54" @keyup="keyupFn(tabList[4].content[1],1)" v-model="tabList[4].content[1].total">
                        </td>
                        
                      </tr>
                      <tr>
                        <td class="pd-l10" v-if="tabList[4].content[2]">{{tabList[4].content[2]['name']}}</td>
                        <td class="pd-l10">
                            <el-radio-group v-if="tabList[4].content[2]" v-model="tabList[4].content[2].results">
                             <el-radio :label="1">较差</el-radio>
                             <el-radio :label="2">中</el-radio>
                             <el-radio :label="3">较好</el-radio>
                          </el-radio-group>
                        </td>
                        <td>
                           <input type="text" class="w54" @keyup="keyupFn(tabList[4].content[2],1)" v-model="tabList[4].content[2].total">
                        </td>
                        
                      </tr>


                    </table>
                     <table  v-if="info.dan>=4 && info.dan<=6"  class="skill-tab" width="100%" border="0" cellpadding="0" cellspacing="0">
                      <thead>
                        <tr>
                          <th width="90">测试指标</th>
                          <th width="180">测试内容</th>
                          <th>测试结果</th>
                          <th width="54">小计</th>
                        </tr>
                      </thead>
                      <tr>
                        <td rowspan="3" class="pd-l10">{{tabList[4].description}}</td>
                        <td class="pd-l10"  v-if="tabList[4].content[0]">{{tabList[4].content[0].value}}球{{tabList[4].content[0].name}}</td>
                        <td>
                           <span v-for="(ipt,idx) in tabList[4].content[0].result">
                                 <input type="text" @keyup="keyupFn(ipt,0)" v-model="ipt.v" :style="'width:'+100/tabList[4].content[0].result.length+'%'" class="boxsiing">
                           </span>
                        </td>
                        <td>
                           <input type="text" class="w54" v-if="tabList[4].content[0]" @keyup="keyupFn(tabList[4].content[0],1)" v-model="tabList[4].content[0].total">
                        </td>
                      </tr>
                      <tr>
                        <td class="pd-l10" v-if="tabList[4].content[1]">{{tabList[4].content[1].name}}</td>
                        <td class="pd-l10" v-if="tabList[4].content[1]">
                            <el-radio-group v-model="tabList[4].content[1].results">
                             <el-radio :label="1">较差</el-radio>
                             <el-radio :label="2">中</el-radio>
                             <el-radio :label="3">较好</el-radio>
                          </el-radio-group>
                        </td>
                        <td>
                           <input type="text" class="w54" @keyup="keyupFn(tabList[4].content[1],1)" v-model="tabList[4].content[1].total">
                        </td>
                        
                      </tr>
                    
                    </table>
                     <table  v-if="info.dan>=7 && info.dan<=9"  class="skill-tab" width="100%" border="0" cellpadding="0" cellspacing="0">
                      <thead>
                        <tr>
                          <th width="90">测试指标</th>
                          <th width="180">测试内容</th>
                          <th>测试结果</th>
                          <th width="54">小计</th>
                        </tr>
                      </thead>
                      <tr>
                        <td rowspan="1" class="pd-l10">{{tabList[4].description}}</td>
                        <td class="pd-l10"  v-if="tabList[4].content[0]">{{tabList[4].content[0].value}}球{{tabList[4].content[0].name}}</td>
                        <td>
                           <span v-for="(ipt,idx) in tabList[4].content[0].result">
                                 <input type="text" v-model="ipt.v"  @keyup="keyupFn(ipt,0)" :style="'width:'+100/tabList[4].content[0].result.length+'%'" class="boxsiing">
                           </span>
                        </td>
                        <td>
                           <input type="text" class="w54" v-if="tabList[4].content[0]" @keyup="keyupFn(tabList[4].content[0],1)" v-model="tabList[4].content[0].total">
                        </td>
                      </tr>
                      
                    
                    </table>
                  </div>

              </div>
               <div class="skill-box" v-if="tabList[5]">
                 <div class="cont-ls">
                    <span class="skill-sty" :class="{'primcolor':info.dan>=1 && info.dan<=3,'middcolor':info.dan>=4 && info.dan<=6,'hcolor':info.dan>=7 && info.dan<=9}">{{tabList[5].name}}</span>
                 </div>
                 
                  <div class="tab-bor" :class="{'pbd':info.dan>=1 && info.dan<=3,'mbd':info.dan>=4 && info.dan<=6,'hbd':info.dan>=7 && info.dan<=9}">
                    <table  v-if="info.dan>=4 && info.dan<=6"  class="skill-tab" width="100%" border="0" cellpadding="0" cellspacing="0">
                      <thead>
                        <tr>
                          <th width="90">测试指标</th>
                          <th width="180">测试内容</th>
                          <th>测试结果</th>
                          <th width="54">小计</th>
                        </tr>
                      </thead>
                      <tr>
                        <td rowspan="3">{{tabList[5].description.split(',')[0]}}</td>
                        <td class="pd-l10"  v-if="tabList[5].content[0]">{{tabList[5].content[0].value}}球{{tabList[5].content[0].name}}</td>
                        <td>
                            <span v-for="(ipt,idx) in tabList[5].content[0].result">
                                 <input type="text" v-model="ipt.v" @keyup="keyupFn(ipt,0)" :style="'width:'+100/tabList[5].content[0].result.length+'%'" class="boxsiing">
                           </span>
                        </td>
                        <td>
                           <input type="text" class="w54" v-if="tabList[5].content[0]" @keyup="keyupFn(tabList[5].content[0],1)" v-model="tabList[5].content[0].total">
                        </td>
                      </tr>
                      <tr>
                        <td class="pd-l10" v-if="tabList[5].content[1]">{{tabList[5].content[1].name}}</td>
                        <td class="pd-l10" v-if="tabList[5].content[1]">
                            <el-radio-group v-model="tabList[5].content[1].results">
                             <el-radio :label="1">较差</el-radio>
                             <el-radio :label="2">中</el-radio>
                             <el-radio :label="3">较好</el-radio>
                          </el-radio-group>
                        </td>
                        <td>
                           <input type="text" class="w54" @keyup="keyupFn(tabList[5].content[1],1)" v-model="tabList[5].content[1].total">
                        </td>
                        
                      </tr>
                       <tr>
                        <td class="pd-l10" v-if="tabList[5].content[2]">{{tabList[5].content[2].name}}</td>
                        <td class="pd-l10" v-if="tabList[5].content[2]">
                            <el-radio-group v-model="tabList[5].content[2].results">
                             <el-radio :label="1">较差</el-radio>
                             <el-radio :label="2">中</el-radio>
                             <el-radio :label="3">较好</el-radio>
                          </el-radio-group>
                        </td>
                        <td>
                           <input type="text" class="w54" @keyup="keyupFn(tabList[5].content[2],1)" v-model="tabList[5].content[2].total">
                        </td>
                        
                      </tr>
                      <tr>
                        <td rowspan="3">{{tabList[5].description.split(',')[1]}}</td>
                        <td class="pd-l10"  v-if="tabList[5].content[3]">{{tabList[5].content[3].value}}球{{tabList[5].content[3].name}}</td>
                        <td>
                            <span v-for="(ipt,idx) in tabList[5].content[3].result">
                                 <input type="text" v-model="ipt.v" @keyup="keyupFn(ipt,0)"  :style="'width:'+100/tabList[5].content[3].result.length+'%'" class="boxsiing">
                           </span>
                        </td>
                        <td>
                           <input type="text" class="w54" v-if="tabList[5].content[3]" @keyup="keyupFn(tabList[5].content[3],1)" v-model="tabList[5].content[3].total">
                        </td>

                      </tr>
                     <tr>
                         <td class="pd-l10" v-if="tabList[5].content[4]">{{tabList[5].content[4].name}}</td>
                        <td class="pd-l10" v-if="tabList[5].content[4]">
                            <el-radio-group v-model="tabList[5].content[4].results">
                             <el-radio :label="1">较差</el-radio>
                             <el-radio :label="2">中</el-radio>
                             <el-radio :label="3">较好</el-radio>
                          </el-radio-group>
                        </td>
                        <td>
                           <input type="text" class="w54" @keyup="keyupFn(tabList[5].content[4],1)" v-model="tabList[5].content[4].total">
                        </td>
                     </tr>
                      <tr>
                        <td class="pd-l10" v-if="tabList[5].content[5]">{{tabList[5].content[5].name}}</td>
                        <td class="pd-l10" v-if="tabList[5].content[5]">
                            <el-radio-group v-model="tabList[5].content[5].results">
                             <el-radio :label="1">较差</el-radio>
                             <el-radio :label="2">中</el-radio>
                             <el-radio :label="3">较好</el-radio>
                          </el-radio-group>
                        </td>
                        <td>
                           <input type="text" class="w54" @keyup="keyupFn(tabList[5].content[5],1)" v-model="tabList[5].content[5].total">
                        </td>
                     </tr>
                     
                    </table>

                     <table  v-if="info.dan>=7 && info.dan<=9" class="skill-tab" width="100%" border="0" cellpadding="0" cellspacing="0">
                      <thead>
                        <tr>
                          <th width="90">测试指标</th>
                          <th width="180">测试内容</th>
                          <th>测试结果</th>
                          <th width="54">小计</th>
                        </tr>
                      </thead>
                      <tr>
                        <td rowspan="3" class="pd-l10">{{tabList[5].description}}</td>
                        <td class="pd-l10"  v-if="tabList[5].content[0]">{{tabList[5].content[0].value}}球{{tabList[5].content[0].name}}</td>
                        <td>
                           <span v-for="(ipt,idx) in tabList[5].content[0].result">
                                 <input type="text" v-model="ipt.v" @keyup="keyupFn(ipt,0)" :style="'width:'+100/tabList[5].content[0].result.length+'%'" class="boxsiing">
                           </span>
                       
                        </td>
                        <td>
                             
                           <input type="text" class="w54" v-if="tabList[5].content[0]" @keyup="keyupFn(tabList[5].content[0],1)" v-model="tabList[5].content[0].total">
                        </td>
                      </tr>
                      <tr>
                        <td class="pd-l10" v-if="tabList[5].content[1]">{{tabList[5].content[1].name}}</td>
                        <td class="pd-l10" v-if="tabList[5].content[1]">
                            <el-radio-group v-model="tabList[5].content[1].results">
                             <el-radio :label="1">较差</el-radio>
                             <el-radio :label="2">中</el-radio>
                             <el-radio :label="3">较好</el-radio>
                          </el-radio-group>
                        </td>
                        <td>
                           <input type="text" class="w54" @keyup="keyupFn(tabList[5].content[1],1)" v-model="tabList[5].content[1].total">
                        </td>
                        
                      </tr>
                      <tr>
                        <td class="pd-l10" v-if="tabList[5].content[2]">{{tabList[5].content[2].name}}</td>
                        <td class="pd-l10" v-if="tabList[5].content[2]">
                            <el-radio-group v-model="tabList[5].content[2].results">
                             <el-radio :label="1">较差</el-radio>
                             <el-radio :label="2">中</el-radio>
                             <el-radio :label="3">较好</el-radio>
                          </el-radio-group>
                        </td>
                        <td>
                           <input type="text" class="w54" @keyup="keyupFn(tabList[5].content[2],1)" v-model="tabList[5].content[2].total">
                        </td>
                        
                      </tr>
                      
                    </table>
                    
                  </div>
    
              </div>

            </div>

            <div class="cont-img">
                    <el-upload
                      action="http://upload-z0.qiniu.com"
                      :limit = "1"
                      list-type="picture-card"
                      ref="upload1"
                      :on-change="handlePictureCardPreview"
                      :on-success="imgSuccess"
                      :auto-upload="false"
                      :on-remove="handleRemove"
                      :data="postData"
                      :file-list="addimgList"
                      >
                      <div class="cover-upload" v-if="imageUrl!==''"></div>
                      <i class="el-icon-plus" v-if="imageUrl==''"></i>
                    </el-upload>
            </div> 
            <div class="exams">
                <button @click="examFn(1)" v-if="examEdt==false">提交审核</button>
                <button @click="examFn(2)" v-if="examEdt==true">提交审核</button>
            </div>


        </div>

      </el-dialog>
      
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
      id:0,
      page:1,
      success:false,
      fail:false,
      failinfo:"",
      suinfo:"",
      pagecount:20,
      pagetotal:0,
      examEdt:false,
      mbnum:0,
      recordId:0,
      upload1:"",
      token:sessionStorage.getItem("token"),
      grtab:[],
      hinfo:[],
      postData: {
       token: '',
       key:''
      },
      imageUrl:"",
      addimgList:[],
      grDialog:false,
      radio2: 3,
      info:[],
      tabList:[]
    }
  },
  mounted(){
    this.id = parseInt(this.$route.params.id);
    this.initList(this.id,this.page,this.pagecount);
  },
  computed:{
    
  },
  watch:{
      success:'dalogFn',
      fail:'dalogFn'
  },
  methods: {
       handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.initList(this.id,this.page,val);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.initList(this.id,val,this.pagecount);
      },
      handlePictureCardPreview(file) {
      var d = new Date();
      file.name = d.getTime()+file.name;
      this.getToken(file.name);
      },
     imgSuccess(res,file){
       this.imageUrl = "http://images.harfax.com/"+res.key;
      } ,  
     handleRemove(file, fileList) {
        console.log(file, fileList);
        this.postData.token = '';
        this.postData.key = '';
        this.imageUrl ='';
        this.uploadCover = false;
      }, 
       handleClick(tab, event) {
        console.log(tab, event);
        this.addimgList = [];
        this.imageUrl = '';

      },
    
    getToken(imgName){
           this.$api.post("/uptoken",{key:imgName},su=>{
               console.log(su);
               if(su.status ==1 ){
               // this.uploadCover = true;
                 this.postData.token = su.data;
                 this.postData.key = imgName;
                 this.submitUpload();
               }
           },err=>{

           },{token:sessionStorage.getItem("token")})

      },
      submitUpload(){ 
        this.$refs.upload1.submit();
      },   
    goback(){
         this.$router.push({path:"/activity/activitybase"})
    },
    initList(id,page,pagecount){
       this.$api.post("/scorelist",{
           id:id,
           page:page,
           pagecount:pagecount
       },su=>{
           console.log(su);
           if(su.status==200){
               this.grtab = su.data.list.list;
               this.hinfo = su.data.info;   
               this.pagetotal = su.data.list.totalpages;

           }else{
             this.fail = true;
             this.failinfo = su.info;
           }
       },err=>{
            this.fail = true;
            this.failinfo = err.info;

       },{
          token:this.token
        })

    },
    setRecord(v){

      this.addimgList = [];
      this.imageUrl = "";
      this.examEdt = false;
       console.log(v);
       this.mbnum = v.number;
   
     
      
       this.$api.post("/scoredetail",{
          number:v.number,
          aid:this.id,
          dan:v.dan
       },su=>{
        console.log(su);
        if(su.status==200){
          this.info = su.data.info;
          this.info.trainingyears = parseInt(this.info.trainingyears);
          this.tabList = su.data.list;
          console.log(this.tabList);
         this.grDialog = true;
        }else{
             this.fail = true;
             this.failinfo = su.info;
        }

       },err=>{
          this.fail = true;
          this.failinfo = err.info;
       },{
          token:this.token
        })
       
    },
    //限制输入小数
      keyupFn(obj,n){
        if(n==0){
            obj.v  =  obj.v .replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符  
            obj.v  =   obj.v .replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的  
            obj.v  =   obj.v .replace(".","$#$").replace(/\./g,"").replace("$#$","."); 
            obj.v  =   obj.v .replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数  
        }else if(n==1){
            obj.total  =  obj.total.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符  
            obj.total   = obj.total.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的  
            obj.total   = obj.total.replace(".","$#$").replace(/\./g,"").replace("$#$","."); 
            obj.total   =  obj.total.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数  
        }else if(n==2){
            
            obj.results  =  obj.results.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符  
            obj.results   = obj.results.replace(/\.{2,}/g,"."); //只保留第一个. 清除多余的  
            obj.results   = obj.results.replace(".","$#$").replace(/\./g,"").replace("$#$","."); 
            obj.results   = obj.results.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数  
        }
   
           
         

      },
    editRecord(v){
      this.examEdt = true;
      this.addimgList = [];
      this.imageUrl = "";
      this.mbnum = v.number;
     
    
      this.$api.post("/editscore",{
          number:v.number,
          id:this.id,
      },su=>{
         if(su.status ==200){
              this.recordId = su.data.detail.id;
              this.info = su.data.info;
              this.info.trainingyears = parseInt(this.info.trainingyears);
              this.tabList = su.data.detail.list;

     
              if(su.data.detail.img){
                    this.addimgList.push({'name':'','url':su.data.detail.img});
                    this.imageUrl = su.data.detail.img;
                }else{
                     this.addimgList = [];
                     this.imageUrl = "";
                }
                this.grDialog = true;
         }else{
             this.fail = true;
             this.failinfo = su.info;
          }


      },err=>{
          this.fail = true;
          this.failinfo = err.info;
      },{
          token:this.token
        })

    },
    handleGrade(){
        console.log('handle');
    },
     dalogFn(){
       setTimeout(()=>{
        this.success = false;
        this.fail = false;
      },1500)
    },
    handleClose(){
       this.grDialog = false;
       this.addimgList = [];
       this.imageUrl = "";
    },
    examFn(v){
      
          console.log(this.tabList);
          for(var i=0;i<this.tabList.length;i++){

              for(var m=0;m<this.tabList[i].content.length;m++){
                 if(this.tabList[i].content[m].method==1){
                    for(var n=0;n<this.tabList[i].content[m].result.length;n++){
                        if(!this.tabList[i].content[m].result[n].v){
                            this.$message({
                                showClose: true,
                                duration:2000,
                                message:this.tabList[i].name+this.tabList[i].content[m].name+"测试结果不能为空",
                                type: 'error'
                              });
                            return
                        }
                    }
                 }else if(this.tabList[i].content[m].method==2 || this.tabList[i].content[m].method==3){
                    if(!this.tabList[i].content[m].results){
                         this.$message({
                                showClose: true,
                                duration:2000,
                                message:this.tabList[i].name+this.tabList[i].content[m].name+"测试结果不能为空",
                                type: 'error'
                      });
                     
                        return 
                    }
                 }

                 if(!this.tabList[i].content[m].total){
                       this.$message({
                                showClose: true,
                                duration:2000,
                                message:this.tabList[i].name+this.tabList[i].content[m].name+"小计不能为空",
                                type: 'error'
                      });
                     
                    return
                 }
              }
          }

       if(!this.imageUrl){
         alert("请上缩略图",'');
         return
        }
        let urls="";
        let jsdata ={};
        if(v==1){
          urls ="/scorecheck";
          jsdata = {
          number:this.mbnum,
          aid:this.id,
          list:this.tabList,
          sex:this.info.sex,
          img:this.imageUrl,
          rank:this.info.dan
          };
        }else if(v==2){
          urls ="/checkedit";
          jsdata = {
               id:this.recordId,
               list:this.tabList,
               img:this.imageUrl
          }
        }

       this.$api.post(urls,jsdata,su=>{
        console.log(su);
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

       },err=>{
           this.fail = true;
           this.failinfo = err.info;
       },{
          token:this.token
        })

    }


  }

}
</script>


<style lang='scss' scoped>
  .gr-con{
    padding: 32px 32px 50px 32px;
  }
  .tc{
    text-align: center;
  }
  .db-in{
    display: inline-block;
  }
  .wd-100{
    width: 100px;
  } 
  .wd-180{
    width: 180px;
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
  .con-info{
    text-align:center;
    .gr-title{
      font-size:18px;
      font-family:MicrosoftYaHei;
      color:rgba(26,26,26,1);
      line-height:36px;
      border-bottom:1px solid #CCCCCC;
      padding-bottom:10px; 
    }
    .info-title{
      display: block;
      font-size:14px;
      margin-top:30px;
    }
    .ac-info{
      font-size:14px;
      color:rgba(102,102,102,1);
      margin-top:30px;
      @extend .tc;
      .ac-key{
        margin-left:80px;
      }
      .ac-info span:nth-of-type(1){
        margin-left:0;
      }
      .ac-val{
        color:rgba(26,26,26,1);
      }
    }
  }
  .dialog-box{
    padding:15px 23px;
    height: 938px;
  
    // @extend .tc;
    padding-top:68px; 
    .dia-title{
      @extend .tc;
      font-size:24px;
      font-family:MicrosoftYaHei;
    
      margin-bottom:20px;
    }

  
    .dia-info{
      font-size:14px;
      color:rgba(51,51,51,1);
      line-height:38px;
      span{
         @extend .db-in;
         vertical-align:middle;
      }
      .info-item:nth-of-type(1){
        width: 222px;
        .dia-key{
          margin-left:66px;
        }
        
      }
      .info-item:nth-of-type(2){
        width: 236px;
        .dia-key:nth-of-type(3){
          margin-left:40px;
        }
      }
    }
  }
   .primarybg{
    
       background:url('../../assets/images/scobg1.png') center no-repeat;
       
    }
    .middlebg{
      background:url('../../assets/images/scobg2.png') no-repeat center;
 
    }
    .hleval{
      background:url('../../assets/images/grade-border.png') no-repeat center;
     
    }
  .skill-box{
    width: 614px;
    overflow:hidden;
    margin: 0 auto;
    margin-top:8px;    
    margin-bottom:30px;
    table{
      float:left;
      th{
        text-align:center;
        line-height: 35px;
        border:1px solid #808080;
      }
      td{
        line-height: 35px;
        border:1px solid #808080;
        vertical-align:middle;
      }
      .pd-l10{
        padding-left: 10px;
      }
      tr:first-child th:first-child {
       
          border-top-left-radius: 6px;
      }

      tr:first-child th:last-child {
          border-top-right-radius: 6px;
      }
      tr:last-child td:first-child {
          border-bottom-left-radius: 6px;
      }

      tr:last-child td:last-child {
          border-bottom-right-radius: 6px;
      }
      
    }
    .cont-ls{float:left;width:28px;}
    .skill-sty{
      display: table-cell;
      line-height:20px;
      vertical-align:middle;
      width: 14px;
      height: 60px;
      padding: 10px 7px;
      font-size:14px;
   
      color:rgba(255,255,255,1);
      border-radius:6px 0 0 6px;
      word-wrap: break-word;
    }
    .tab-bor{
      width: 564px;
      height:auto;
      border-radius: 0 6px 6px 6px;
      float:left;
      padding: 10px;
    }
  }

  .ptt{
     color:#E5A929;
  }
  .mtt{
    color:#1472B1;
  }
  .htt{
    color:#592D16;
  }
  .pbd{
     border:1px solid #E5A929;
  }
  .mbd{
     border:1px solid #1472B1;
  }
  .hbd{
      border:1px solid #592D16; 
  }
  .primcolor{
     background-color:#E5A929;
  }
  .middcolor{
    background-color:#1472B1;
  }
  .hcolor{
    background-color:#592D16
  }


</style>
<style>
  .gr-tab .el-table{
    margin: 0 auto;
    margin-top: 50px;
  }
  .gr-tab .el-table td, .el-table th.is-leaf{
    border-bottom:0; 
  }
  .gr-tab .el-table th{
    text-align: center;
    background-color: #EDEDED;
  }
  .gr-tab .el-table--border::after, .el-table--group::after, .el-table::before{
    background-color: #fff;
  }
  .save-btn .el-button.el-button--primary {
    background-color: #1472B1;
    margin-top: 70px;
  }
  .gr-con .el-dialog__header{
    padding:0;
  }
  .gr-con .el-dialog--center .el-dialog__body{
    padding:0;
  }
  .ellipsis{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  .table-cont{
    height:543px;
    width: 638px;
    margin:0 auto;
    overflow: auto;
    margin-top:30px;
  }
  .table-cont input{
    text-align: center;
  }
  .w54{
    width: 54px;
    height:30px;
    border:none;
  }
  .w200{
     width: 100%;
     height:30px;
     border:none;
  }
   .cover-upload{
  display:inline-block;
  width:148px;
  height:148px;
 background-color:white;
 position:relative;
 top:-1px;
 left:-1px;

}
.cont-img{
  height:150px;
  margin-top:10px;
  margin-left:270px;
}
.exams{
  text-align: center;
}
.exams button{
  width: 106px;
  height:36px;
  background-color:#1472B1;
  color:white;
  font-size:14px;
  border-radius:2px; 
  border:none;
  margin-top:20px;
  cursor: pointer;
}
.boxsiing{
  box-sizing: border-box;
  height:30px;
}

.table-cont::-webkit-scrollbar    //滚动条整体部分
{  
    width: 5px;  
    height:10px;     
    background-color:#b5b1b1;

}  

.table-cont::-webkit-scrollbar {/*滚动条整体样式*/
            width: 6px;     /*高宽分别对应横竖滚动条的尺寸*/
            height: 6px;
        }

 .table-cont::-webkit-scrollbar-thumb {/*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
    background: rgba(0,0,0,0.2);
 }
.table-cont::-webkit-scrollbar-track {/*滚动条里面轨道*/
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
      border-radius: 5px !important;
      background: white;
} 
</style>
