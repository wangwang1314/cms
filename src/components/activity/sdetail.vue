<template>
   <div class="gr-con">
      <div class="go-back" @click="goback"><< 返回</div>   
      <div class="con-info">
        <span class="gr-title">段位考核活动成绩查询</span>
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
            height="250"
            style="width: 100%">
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
              prop="grade"
              label="报考等级"
              width="100">
            </el-table-column>
             <el-table-column
              prop="field"
              label="考核场地"
              width="250">
            </el-table-column>
             <el-table-column
              prop="extime"
              label="考核时间"
              width="200">
            </el-table-column>
             <el-table-column
              prop="examiner"
              label="主考官"
              width="150">
            </el-table-column>
             <el-table-column
              prop="dexaminer"
              label="副考官"
              width="150">
            </el-table-column>
             <el-table-column
              prop="point"
              label="考核成绩"
              width="150">
            </el-table-column>
             <el-table-column
              prop="status"
              label="成绩状态"
              width="150">
             <template slot-scope="scope">
                <span v-if="scope.row.status==1">有效</span>
                <span v-if="scope.row.status==0">无效</span>
             </template>
            </el-table-column>
             <el-table-column
              prop="rank"
              label="核定等级"
              width="150">
            </el-table-column>
          
            <el-table-column
            width="240" fixed="right" label="操作">
            <template slot-scope="scope">
              <el-button 
                @click="editRecord(scope.row)"
                size="mini" type="primary" plain
                >成绩详情
              </el-button>
            </template>
          </el-table-column>
            
          </el-table>
        </div>
       
      </div>

        <el-dialog
        :visible.sync="grDialog"
        :before-close="handleClose"
        width="1300px"
        center :show-close="false">
        <img :src="imageUrl" alt="" class="d-img">
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
                                 <input type="text" style="background-color:white"  disabled="disabled" v-model="ipt.v" :style="'width:'+100/tabList[0].content[0].result.length+'%'" class="boxsiing">
                            </span>
                           
                        </td>
                        <td>
                           <input type="text" class="w54" v-if="tabList[0].content[0]" v-model="tabList[0].content[0].total" disabled="disabled" style="background-color:white;border:none">
                        </td>
                      </tr>
                      <tr>
                        <td class="pd-l10" v-if="tabList[0].content[1]">{{tabList[0].content[1].name}}</td>
                        <td class="pd-l10" v-if="tabList[0].content[1]">
                            <div style="text-align:center;" v-if="tabList[0].content[1].results==1">
                              较差
                            </div>
                             <div style="text-align:center;" v-if="tabList[0].content[1].results==2">
                              中
                            </div>
                             <div style="text-align:center;"  v-if="tabList[0].content[1].results==3">
                              较好
                            </div>
                           
                        </td>
                        <td>
                           <input type="text" class="w54"  v-model="tabList[0].content[1].total" disabled="disabled" style="background-color:white;border:none">
                        </td>
                        
                      </tr>
                      <tr>
                        <td class="pd-l10" v-if="tabList[0].content[2]">{{tabList[0].content[2]['name']}}</td>
                        <td class="pd-l10">
                             <div style="text-align:center;" v-if="tabList[0].content[2].results==1">
                              较差
                            </div>
                             <div style="text-align:center;" v-if="tabList[0].content[2].results==2">
                              中
                            </div>
                             <div style="text-align:center;"  v-if="tabList[0].content[2].results==3">
                              较好
                            </div>
                        </td>
                        <td>
                           <input type="text" class="w54" v-model="tabList[0].content[2].total" disabled="disabled" style="background-color:white;border:none">
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
                                 <input type="text" v-model="ipt.v" :style="'width:'+100/tabList[0].content[0].result.length+'%'" class="boxsiing" style="background-color:white"  disabled="disabled">
                            </span>
                           
                        </td>
                        <td>
                           <input type="text" class="w54" v-if="tabList[0].content[0]" v-model="tabList[0].content[0].total" disabled="disabled" style="background-color:white;border:none">
                        </td>
                      </tr>
                      <tr>
                        <td class="pd-l10" v-if="tabList[0].content[1]">{{tabList[0].content[1].name}}</td>
                        <td class="pd-l10" v-if="tabList[0].content[1]">
                           <div style="text-align:center;" v-if="tabList[0].content[1].results==1">
                              较差
                            </div>
                             <div style="text-align:center;" v-if="tabList[0].content[1].results==2">
                              中
                            </div>
                             <div style="text-align:center;"  v-if="tabList[0].content[1].results==3">
                              较好
                            </div>
                          
                        </td>
                        <td>
                           <input type="text" class="w54"  v-model="tabList[0].content[1].total" disabled="disabled" style="background-color:white;border:none">
                        </td>
                        
                      </tr>
                      <tr>
                        <td class="pd-l10" v-if="tabList[0].content[2]">{{tabList[0].content[2]['name']}}</td>
                        <td class="pd-l10">
                             <div style="text-align:center;" v-if="tabList[0].content[2].results==1">
                              较差
                            </div>
                             <div style="text-align:center;" v-if="tabList[0].content[2].results==2">
                              中
                            </div>
                             <div style="text-align:center;"  v-if="tabList[0].content[2].results==3">
                              较好
                            </div>
                           
                        </td>
                        <td>
                           <input type="text" class="w54" v-model="tabList[0].content[2].total" disabled="disabled" style="background-color:white;border:none">
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
                                 <input type="text" v-model="ipt.v" :style="'width:'+100/tabList[0].content[0].result.length+'%'" class="boxsiing" style="background-color:white"  disabled="disabled">
                            </span>
                           
                        </td>
                        <td>
                           <input type="text" class="w54" v-if="tabList[0].content[0]" v-model="tabList[0].content[0].total" disabled="disabled" style="background-color:white;border:none">
                        </td>
                      </tr>
                      <tr>
                        <td class="pd-l10" v-if="tabList[0].content[1]">{{tabList[0].content[1].name}}</td>
                        <td class="pd-l10" v-if="tabList[0].content[1]">
                             <div style="text-align:center;" v-if="tabList[0].content[1].results==1">
                              较差
                            </div>
                             <div style="text-align:center;" v-if="tabList[0].content[1].results==2">
                              中
                            </div>
                             <div style="text-align:center;"  v-if="tabList[0].content[1].results==3">
                              较好
                            </div>
                            
                        </td>
                        <td>
                           <input type="text" class="w54"  v-model="tabList[0].content[1].total" disabled="disabled" style="background-color:white;border:none">
                        </td>
                        
                      </tr>
                      <tr>
                        <td rowspan="2" class="pd-l10">反手发侧下/侧上旋球</td>
                        <td class="pd-l10"  v-if="tabList[0].content[2]">{{tabList[0].content[2].value}}球{{tabList[0].content[2].name}}</td>
                        <td>
                            <span v-for="(ipt,idx) in tabList[0].content[2].result">
                                 <input type="text" v-model="ipt.v" :style="'width:'+100/tabList[0].content[2].result.length+'%'" class="boxsiing" style="background-color:white"  disabled="disabled">
                            </span>
                           
                        </td>
                        <td>
                           <input type="text" class="w54" v-if="tabList[0].content[2]" v-model="tabList[0].content[2].total" disabled="disabled" style="background-color:white;border:none">
                        </td>
                      </tr>
                      <tr>
                        <td class="pd-l10" v-if="tabList[0].content[3]">{{tabList[0].content[3].name}}</td>
                        <td class="pd-l10" v-if="tabList[0].content[3]">
                            <div style="text-align:center;" v-if="tabList[0].content[3].results==1">
                              较差
                            </div>
                             <div style="text-align:center;" v-if="tabList[0].content[3].results==2">
                              中
                            </div>
                             <div style="text-align:center;"  v-if="tabList[0].content[3].results==3">
                              较好
                            </div>
                           
                        </td>
                        <td>
                           <input type="text" class="w54"  v-model="tabList[0].content[3].total" disabled="disabled" style="background-color:white;border:none">
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
                                 <input type="text" v-model="ipt.v" :style="'width:'+100/tabList[1].content[0].result.length+'%'" class="boxsiing" style="background-color:white"  disabled="disabled">
                           </span>
                       
                        </td>
                        <td>
                             
                           <input type="text" class="w54" v-if="tabList[1].content[0]" v-model="tabList[1].content[0].total" disabled="disabled" style="background-color:white;border:none">
                        </td>
                      </tr>
                      <tr>
                        <td class="pd-l10" v-if="tabList[1].content[1]">{{tabList[1].content[1].name}}</td>
                        <td class="pd-l10" v-if="tabList[1].content[1]">
                             <div style="text-align:center;" v-if="tabList[1].content[1].results==1">
                              较差
                            </div>
                             <div style="text-align:center;" v-if="tabList[1].content[1].results==2">
                              中
                            </div>
                             <div style="text-align:center;"  v-if="tabList[1].content[1].results==3">
                              较好
                            </div>
                           
                        </td>
                        <td>
                           <input type="text" class="w54" v-model="tabList[1].content[1].total" disabled="disabled" style="background-color:white;border:none">
                        </td>
                        
                      </tr>
                      <tr>
                        <td class="pd-l10" v-if="tabList[1].content[2]">{{tabList[1].content[2]['name']}}</td>
                        <td class="pd-l10">
                             <div style="text-align:center;" v-if="tabList[1].content[2].results==1">
                              较差
                            </div>
                             <div style="text-align:center;" v-if="tabList[1].content[2].results==2">
                              中
                            </div>
                             <div style="text-align:center;"  v-if="tabList[1].content[2].results==3">
                              较好
                            </div>
                           
                        </td>
                        <td>
                           <input type="text" class="w54" v-model="tabList[1].content[2].total" disabled="disabled" style="background-color:white;border:none"> 
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
                                 <input type="text" v-model="ipt.v" :style="'width:'+100/tabList[1].content[0].result.length+'%'" class="boxsiing" style="background-color:white"  disabled="disabled">
                           </span>
                       
                        </td>
                        <td>
                             
                           <input type="text" class="w54" v-if="tabList[1].content[0]" v-model="tabList[1].content[0].total" disabled="disabled" style="background-color:white;border:none">
                        </td>
                      </tr>
                      <tr>
                        <td class="pd-l10" v-if="tabList[1].content[1]">{{tabList[1].content[1].name}}</td>
                        <td class="pd-l10" v-if="tabList[1].content[1]">
                             <div style="text-align:center;" v-if="tabList[1].content[1].results==1">
                              较差
                            </div>
                             <div style="text-align:center;" v-if="tabList[1].content[1].results==2">
                              中
                            </div>
                             <div style="text-align:center;"  v-if="tabList[1].content[1].results==3">
                              较好
                            </div>
                            
                        </td>
                        <td>
                           <input type="text" class="w54" v-model="tabList[1].content[1].total" disabled="disabled" style="background-color:white;border:none">
                        </td>
                        
                      </tr>
                      <tr>
                        <td class="pd-l10" v-if="tabList[1].content[2]">{{tabList[1].content[2]['name']}}</td>
                        <td class="pd-l10">
                               <div style="text-align:center;" v-if="tabList[1].content[2].results==1">
                              较差
                            </div>
                             <div style="text-align:center;" v-if="tabList[1].content[2].results==2">
                              中
                            </div>
                             <div style="text-align:center;"  v-if="tabList[1].content[2].results==3">
                              较好
                            </div>
                          
                        </td>
                        <td>
                           <input type="text" class="w54" v-model="tabList[1].content[2].total" disabled="disabled" style="background-color:white;border:none"> 
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
                                 <input type="text" v-model="ipt.v" :style="'width:'+100/tabList[1].content[0].result.length+'%'" class="boxsiing" style="background-color:white"  disabled="disabled">
                           </span>
                       
                        </td>
                        <td>
                             
                           <input type="text" class="w54" v-if="tabList[1].content[0]" v-model="tabList[1].content[0].total" disabled="disabled" style="background-color:white;border:none">
                        </td>
                      </tr>
                      <tr>
                        <td class="pd-l10" v-if="tabList[1].content[1]">{{tabList[1].content[1].name}}</td>
                        <td class="pd-l10" v-if="tabList[1].content[1]">
                               <div style="text-align:center;" v-if="tabList[1].content[1].results==1">
                              较差
                            </div>
                             <div style="text-align:center;" v-if="tabList[1].content[1].results==2">
                              中
                            </div>
                             <div style="text-align:center;"  v-if="tabList[1].content[1].results==3">
                              较好
                            </div>
                            
                        </td>
                        <td>
                           <input type="text" class="w54" v-model="tabList[1].content[1].total" disabled="disabled" style="background-color:white;border:none">
                        </td>
                        
                      </tr>
                      <tr>
                        <td class="pd-l10" v-if="tabList[1].content[2]">{{tabList[1].content[2]['name']}}</td>
                        <td class="pd-l10">
                              <div style="text-align:center;" v-if="tabList[1].content[2].results==1">
                              较差
                            </div>
                             <div style="text-align:center;" v-if="tabList[1].content[2].results==2">
                              中
                            </div>
                             <div style="text-align:center;"  v-if="tabList[1].content[2].results==3">
                              较好
                            </div>
                            
                        </td>
                        <td>
                           <input type="text" class="w54" v-model="tabList[1].content[2].total" disabled="disabled" style="background-color:white;border:none"> 
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
                           <input type="text" class="w200" v-if="tabList[2].content[0]" v-model="tabList[2].content[0].results" style="background-color:white"  disabled="disabled">
                        </td>
                        <td>
                           <input type="text" class="w54" v-if="tabList[2].content[0]" v-model="tabList[2].content[0].total" disabled="disabled" style="background-color:white;border:none">
                        </td>
                      </tr>
                      <tr>
                        <td class="pd-l10" v-if="tabList[2].content[1]">{{tabList[2].content[1].name}}</td>
                        <td class="pd-l10" v-if="tabList[2].content[1]">
                               <div style="text-align:center;" v-if="tabList[2].content[1].results==1">
                              较差
                            </div>
                             <div style="text-align:center;" v-if="tabList[2].content[1].results==2">
                              中
                            </div>
                             <div style="text-align:center;"  v-if="tabList[2].content[1].results==3">
                              较好
                            </div>
                           
                        </td>
                        <td>
                           <input type="text" class="w54" v-model="tabList[2].content[1].total" disabled="disabled" style="background-color:white;border:none">
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
                           <input type="text" class="w200" v-if="tabList[2].content[0]" v-model="tabList[2].content[0].results" style="background-color:white"  disabled="disabled">
                        </td>
                        <td>
                           <input type="text" class="w54" v-if="tabList[2].content[0]" v-model="tabList[2].content[0].total" disabled="disabled" style="background-color:white;border:none">
                        </td>
                      </tr>
                      <tr>
                        <td class="pd-l10" v-if="tabList[2].content[1]">{{tabList[2].content[1].name}}</td>
                        <td class="pd-l10" v-if="tabList[2].content[1]">
                            <div style="text-align:center;" v-if="tabList[2].content[1].results==1">
                              较差
                            </div>
                             <div style="text-align:center;" v-if="tabList[2].content[1].results==2">
                              中
                            </div>
                             <div style="text-align:center;"  v-if="tabList[2].content[1].results==3">
                              较好
                            </div>
                           
                        </td>
                        <td>
                           <input type="text" class="w54" v-model="tabList[2].content[1].total" disabled="disabled" style="background-color:white;border:none">
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
                                 <input type="text" v-model="ipt.v" :style="'width:'+100/tabList[2].content[0].result.length+'%'" class="boxsiing" style="background-color:white"  disabled="disabled">
                           </span>
                       
                        </td>
                        <td>
                             
                           <input type="text" class="w54" v-if="tabList[2].content[0]" v-model="tabList[2].content[0].total" disabled="disabled" style="background-color:white;border:none">
                        </td>
                      </tr>
                      <tr>
                        <td class="pd-l10" v-if="tabList[2].content[1]">{{tabList[2].content[1].name}}</td>
                        <td class="pd-l10" v-if="tabList[2].content[1]">
                           <div style="text-align:center;" v-if="tabList[2].content[1].results==1">
                              较差
                            </div>
                             <div style="text-align:center;" v-if="tabList[2].content[1].results==2">
                              中
                            </div>
                             <div style="text-align:center;"  v-if="tabList[2].content[1].results==3">
                              较好
                            </div>
                           
                        </td>
                        <td>
                           <input type="text" class="w54" v-model="tabList[2].content[1].total" disabled="disabled" style="background-color:white;border:none">
                        </td>
                        
                      </tr>
                      <tr>
                        <td rowspan="2" class="pd-l10">{{tabList[2].description.split(',')[1]}}</td>
                        <td class="pd-l10"  v-if="tabList[2].content[2]">{{tabList[2].content[2].value}}秒{{tabList[2].content[2].name}}</td>
                        <td>
                           <input type="text" class="w200" v-if="tabList[2].content[2]" v-model="tabList[2].content[2].results" style="background-color:white"  disabled="disabled">
                        </td>
                        <td>
                           <input type="text" class="w54" v-if="tabList[2].content[2]" v-model="tabList[2].content[2].total" disabled="disabled" style="background-color:white;border:none">
                        </td>
                      </tr>
                      <tr>
                         <td class="pd-l10" v-if="tabList[2].content[3]">{{tabList[2].content[3].name}}</td>
                        <td class="pd-l10" v-if="tabList[2].content[3]">
                                 <div style="text-align:center;" v-if="tabList[2].content[3].results==1">
                              较差
                            </div>
                             <div style="text-align:center;" v-if="tabList[2].content[3].results==2">
                              中
                            </div>
                             <div style="text-align:center;"  v-if="tabList[2].content[3].results==3">
                              较好
                            </div>
                           
                        </td>
                        <td>
                           <input type="text" class="w54" v-model="tabList[2].content[3].total" disabled="disabled" style="background-color:white;border:none">
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
                        <td rowspan="3" class="pd-l10">{{tabList[3].description}}</td>
                        <td class="pd-l10"  v-if="tabList[3].content[0]">{{tabList[3].content[0].value}}秒{{tabList[3].content[0].name}}</td>
                        <td>
                           <input type="text" class="w200" v-if="tabList[3].content[0]" v-model="tabList[3].content[0].results" style="background-color:white"  disabled="disabled">
                        </td>
                        <td>
                           <input type="text" class="w54" v-if="tabList[3].content[0]" v-model="tabList[3].content[0].total" disabled="disabled" style="background-color:white;border:none">
                        </td>
                      </tr>
                      <tr>
                        <td class="pd-l10" v-if="tabList[3].content[1]">{{tabList[3].content[1].name}}</td>
                        <td class="pd-l10" v-if="tabList[3].content[1]">
                             <div style="text-align:center;" v-if="tabList[3].content[1].results==1">
                              较差
                            </div>
                             <div style="text-align:center;" v-if="tabList[3].content[1].results==2">
                              中
                            </div>
                             <div style="text-align:center;"  v-if="tabList[3].content[1].results==3">
                              较好
                            </div>
                           
                        </td>
                        <td>
                           <input type="text" class="w54" v-model="tabList[3].content[1].total" disabled="disabled" style="background-color:white;border:none">
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
                           <input type="text" class="w200" v-if="tabList[3].content[0]" v-model="tabList[3].content[0].results" style="background-color:white"  disabled="disabled">
                        </td>
                        <td>
                           <input type="text" class="w54" v-if="tabList[3].content[0]" v-model="tabList[3].content[0].total" disabled="disabled" style="background-color:white;border:none">
                        </td>
                      </tr>
                      <tr>
                        <td class="pd-l10" v-if="tabList[3].content[1]">{{tabList[3].content[1].name}}</td>
                        <td class="pd-l10" v-if="tabList[3].content[1]">
                             <div style="text-align:center;" v-if="tabList[3].content[1].results==1">
                              较差
                            </div>
                             <div style="text-align:center;" v-if="tabList[3].content[1].results==2">
                              中
                            </div>
                             <div style="text-align:center;"  v-if="tabList[3].content[1].results==3">
                              较好
                            </div>
                           
                        </td>
                        <td>
                           <input type="text" class="w54" v-model="tabList[3].content[1].total" disabled="disabled" style="background-color:white;border:none">
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
                                 <input type="text" v-model="ipt.v" :style="'width:'+100/tabList[3].content[0].result.length+'%'" class="boxsiing" style="background-color:white"  disabled="disabled">
                           </span>
                        </td>
                        <td>
                           <input type="text" class="w54" v-if="tabList[3].content[0]" v-model="tabList[3].content[0].total" disabled="disabled" style="background-color:white;border:none">
                        </td>
                      </tr>
                      <tr>
                        <td class="pd-l10" v-if="tabList[3].content[1]">{{tabList[3].content[1].name}}</td>
                        <td class="pd-l10" v-if="tabList[3].content[1]">
                             <div style="text-align:center;" v-if="tabList[3].content[1].results==1">
                              较差
                            </div>
                             <div style="text-align:center;" v-if="tabList[3].content[1].results==2">
                              中
                            </div>
                             <div style="text-align:center;"  v-if="tabList[3].content[1].results==3">
                              较好
                            </div>
                           
                        </td>
                        <td>
                           <input type="text" class="w54" v-model="tabList[3].content[1].total" disabled="disabled" style="background-color:white;border:none">
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
                                 <input type="text" v-model="ipt.v" :style="'width:'+100/tabList[4].content[0].result.length+'%'" class="boxsiing" style="background-color:white"  disabled="disabled">
                           </span>
                        </td>
                        <td>
                           <input type="text" class="w54" v-if="tabList[4].content[0]" v-model="tabList[4].content[0].total" disabled="disabled" style="background-color:white;border:none">
                        </td>
                      </tr>
                      <tr>
                        <td class="pd-l10" v-if="tabList[4].content[1]">{{tabList[4].content[1].name}}</td>
                        <td class="pd-l10" v-if="tabList[4].content[1]">
                             <div style="text-align:center;" v-if="tabList[4].content[1].results==1">
                              较差
                            </div>
                             <div style="text-align:center;" v-if="tabList[4].content[1].results==2">
                              中
                            </div>
                             <div style="text-align:center;"  v-if="tabList[4].content[1].results==3">
                              较好
                            </div>
                            
                        </td>
                        <td>
                           <input type="text" class="w54" v-model="tabList[4].content[1].total" disabled="disabled" style="background-color:white;border:none">
                        </td>
                        
                      </tr>
                      <tr>
                        <td class="pd-l10" v-if="tabList[4].content[2]">{{tabList[4].content[2]['name']}}</td>
                        <td class="pd-l10">
                            <div style="text-align:center;" v-if="tabList[4].content[2].results==1">
                              较差
                            </div>
                             <div style="text-align:center;" v-if="tabList[4].content[2].results==2">
                              中
                            </div>
                             <div style="text-align:center;"  v-if="tabList[4].content[2].results==3">
                              较好
                            </div>
                           
                        </td>
                        <td>
                           <input type="text" class="w54" v-model="tabList[4].content[2].total" disabled="disabled" style="background-color:white;border:none">
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
                                 <input type="text" v-model="ipt.v" :style="'width:'+100/tabList[4].content[0].result.length+'%'" class="boxsiing" style="background-color:white"  disabled="disabled">
                           </span>
                        </td>
                        <td>
                           <input type="text" class="w54" v-if="tabList[4].content[0]" v-model="tabList[4].content[0].total" disabled="disabled" style="background-color:white;border:none">
                        </td>
                      </tr>
                      <tr>
                        <td class="pd-l10" v-if="tabList[4].content[1]">{{tabList[4].content[1].name}}</td>
                        <td class="pd-l10" v-if="tabList[4].content[1]">
                            <div style="text-align:center;" v-if="tabList[4].content[1].results==1">
                              较差
                            </div>
                             <div style="text-align:center;" v-if="tabList[4].content[1].results==2">
                              中
                            </div>
                             <div style="text-align:center;"  v-if="tabList[4].content[1].results==3">
                              较好
                            </div>
                           
                        </td>
                        <td>
                           <input type="text" class="w54" v-model="tabList[4].content[1].total" disabled="disabled" style="background-color:white;border:none">
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
                                 <input type="text" v-model="ipt.v" :style="'width:'+100/tabList[4].content[0].result.length+'%'" class="boxsiing" style="background-color:white"  disabled="disabled">
                           </span>
                        </td>
                        <td>
                           <input type="text" class="w54" v-if="tabList[4].content[0]" v-model="tabList[4].content[0].total" disabled="disabled" style="background-color:white;border:none">
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
                                 <input type="text" v-model="ipt.v" :style="'width:'+100/tabList[5].content[0].result.length+'%'" class="boxsiing" style="background-color:white"  disabled="disabled">
                           </span>
                        </td>
                        <td>
                           <input type="text" class="w54" v-if="tabList[5].content[0]" v-model="tabList[5].content[0].total" disabled="disabled" style="background-color:white;border:none">
                        </td>
                      </tr>
                      <tr>
                        <td class="pd-l10" v-if="tabList[5].content[1]">{{tabList[5].content[1].name}}</td>
                        <td class="pd-l10" v-if="tabList[5].content[1]">
                            <div style="text-align:center;" v-if="tabList[5].content[1].results==1">
                              较差
                            </div>
                             <div style="text-align:center;" v-if="tabList[5].content[1].results==2">
                              中
                            </div>
                             <div style="text-align:center;"  v-if="tabList[5].content[1].results==3">
                              较好
                            </div>
                           
                        </td>
                        <td>
                           <input type="text" class="w54" v-model="tabList[5].content[1].total" disabled="disabled" style="background-color:white;border:none">
                        </td>
                        
                      </tr>
                       <tr>
                        <td class="pd-l10" v-if="tabList[5].content[2]">{{tabList[5].content[2].name}}</td>
                        <td class="pd-l10" v-if="tabList[5].content[2]">
                            <div style="text-align:center;" v-if="tabList[5].content[2].results==1">
                              较差
                            </div>
                             <div style="text-align:center;" v-if="tabList[5].content[2].results==2">
                              中
                            </div>
                             <div style="text-align:center;"  v-if="tabList[5].content[2].results==3">
                              较好
                            </div>
                            
                        </td>
                        <td>
                           <input type="text" class="w54" v-model="tabList[5].content[2].total" disabled="disabled" style="background-color:white;border:none">
                        </td>
                        
                      </tr>
                      <tr>
                        <td rowspan="3">{{tabList[5].description.split(',')[1]}}</td>
                        <td class="pd-l10"  v-if="tabList[5].content[3]">{{tabList[5].content[3].value}}球{{tabList[5].content[3].name}}</td>
                        <td>
                            <span v-for="(ipt,idx) in tabList[5].content[3].result">
                                 <input type="text" v-model="ipt.v" :style="'width:'+100/tabList[5].content[3].result.length+'%'" class="boxsiing" style="background-color:white"  disabled="disabled">
                           </span>
                        </td>
                        <td>
                           <input type="text" class="w54" v-if="tabList[5].content[3]" v-model="tabList[5].content[3].total" disabled="disabled" style="background-color:white;border:none">
                        </td>

                      </tr>
                     <tr>
                         <td class="pd-l10" v-if="tabList[5].content[4]">{{tabList[5].content[4].name}}</td>
                        <td class="pd-l10" v-if="tabList[5].content[4]">
                             <div style="text-align:center;" v-if="tabList[5].content[4].results==1">
                              较差
                            </div>
                             <div style="text-align:center;" v-if="tabList[5].content[4].results==2">
                              中
                            </div>
                             <div style="text-align:center;"  v-if="tabList[5].content[4].results==3">
                              较好
                            </div>
                           
                        </td>
                        <td>
                           <input type="text" class="w54" v-model="tabList[5].content[4].total" disabled="disabled" style="background-color:white;border:none">
                        </td>
                     </tr>
                      <tr>
                        <td class="pd-l10" v-if="tabList[5].content[5]">{{tabList[5].content[5].name}}</td>
                        <td class="pd-l10" v-if="tabList[5].content[5]">
                             <div style="text-align:center;" v-if="tabList[5].content[5].results==1">
                              较差
                            </div>
                             <div style="text-align:center;" v-if="tabList[5].content[5].results==2">
                              中
                            </div>
                             <div style="text-align:center;"  v-if="tabList[5].content[5].results==3">
                              较好
                            </div>
                           
                        </td>
                        <td>
                           <input type="text" class="w54" v-model="tabList[5].content[5].total" disabled="disabled" style="background-color:white;border:none">
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
                                 <input type="text" v-model="ipt.v" :style="'width:'+100/tabList[5].content[0].result.length+'%'" class="boxsiing" style="background-color:white"  disabled="disabled">
                           </span>
                       
                        </td>
                        <td>
                             
                           <input type="text" class="w54" v-if="tabList[5].content[0]" v-model="tabList[5].content[0].total" disabled="disabled" style="background-color:white;border:none">
                        </td>
                      </tr>
                      <tr>
                        <td class="pd-l10" v-if="tabList[5].content[1]">{{tabList[5].content[1].name}}</td>
                        <td class="pd-l10" v-if="tabList[5].content[1]">
                             <div style="text-align:center;" v-if="tabList[5].content[1].results==1">
                              较差
                            </div>
                             <div style="text-align:center;" v-if="tabList[5].content[1].results==2">
                              中
                            </div>
                             <div style="text-align:center;"  v-if="tabList[5].content[1].results==3">
                              较好
                            </div>
                           
                        </td>
                        <td>
                           <input type="text" class="w54" v-model="tabList[5].content[1].total" disabled="disabled" style="background-color:white;border:none">
                        </td>
                        
                      </tr>
                      <tr>
                        <td class="pd-l10" v-if="tabList[5].content[2]">{{tabList[5].content[2].name}}</td>
                        <td class="pd-l10" v-if="tabList[5].content[2]">
                             <div style="text-align:center;" v-if="tabList[5].content[2].results==1">
                              较差
                            </div>
                             <div style="text-align:center;" v-if="tabList[5].content[2].results==2">
                              中
                            </div>
                             <div style="text-align:center;"  v-if="tabList[5].content[2].results==3">
                              较好
                            </div>
                          
                        </td>
                        <td>
                           <input type="text" class="w54" v-model="tabList[5].content[2].total" disabled="disabled" style="background-color:white;border:none">
                        </td>
                        
                      </tr>
                      
                    </table>
                    
                  </div>
    
              </div>

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
      pagecount:20,
      examEdt:false,
      mbnum:0,
      success:false,
      fail:false,
      failinfo:"",
      suinfo:"",
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
    goback(){
         this.$router.push({path:"/activity/activitybase"})
    },
     handleClose(){
       this.grDialog = false;
    },
    dalogFn(){
       setTimeout(()=>{
        this.success = false;
        this.fail = false;
      },1500)
    },
    editRecord(v){
      this.examEdt = true;
      this.mbnum = v.number;
    
      this.grDialog = true;
     
      this.$api.post("/performance",{
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
    initList(id){
       this.$api.post("/scoresearch",{
           id:id
       },su=>{
           console.log(su);
           if(su.status==200){
               this.grtab = su.data.list.list;
               this.hinfo = su.data.info;   
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
    width:738px;

    padding:15px 23px;
    height: 938px;
    background:url('../../assets/images/grade-border.png') no-repeat center;
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
      border:1px solid #592D16;
      border-radius: 0 6px 6px 6px;
      float:left;
      padding: 10px;
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
    height:722px;
    width: 638px;
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
.d-img{
  position: absolute;
  right:78px;
  width: 410px;
  top:292px;
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
