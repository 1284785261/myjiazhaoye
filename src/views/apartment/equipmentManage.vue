<template>
	<div class="hous">
		<menu-box></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
		          <span>您现在的位置： </span>
		          <router-link  class="active" to="/apartment/communityManagement">社区管理</router-link>
		        </div>
		        <div class="ivu-bar-title">
		          <h3><i class="icon icon-iden"></i>设备管理</h3>
		          <span>佳兆业航运WEWA空间</span>
		        </div>
		    	<div id="equipmentMan">
		    		<el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
					    <el-tab-pane label="智能门锁" name="first">
                <div class="equipment1" v-for="(doorLock,index) in doorLockList">
                  <div class="house_xq" @click="hideTable(index)">
                      <img src="../../../static/images/temp/logo2_03.png">
                      <a class="ceng">{{doorLock.floorName}}层</a>
                  </div>
                  <table v-if="doorLock.showTable">
                    <thead>
                      <td>房间</td>
                      <td>门锁类型</td>
                      <td>门锁序列号</td>
                      <td>供应商</td>
                      <td>添加时间</td>
                      <td>门锁状态</td>
                      <td width="15%">操作</td>
                    </thead>
                    <tr v-for="(item,index) in doorLock.roomLock">
                      <td>{{item.roomNum}}</td>
                      <td>
                        <span v-if="item.lockType == 1">智能门锁</span>
                        <span v-if="item.lockType == 2">RFID锁</span>
                      </td>
                      <td>{{item.sn}}</td>
                      <td>{{item.supplierDataName}}</td>
                      <td>{{item.createtime | timefilter("yyyy.MM.dd")}}</td>
                      <td>
                        <span v-if="item.lockStatus == 1" style="color: #3dc4b2;">在线</span>
                        <span v-else-if="item.lockStatus == 2" style="color: #ccc;">离线</span>
                        <span v-else-if="item.lockStatus == 3" style="color: red;">冻结</span>
                        <span v-else style="color: rgb(254,120,50);">未配置</span>
                      </td>
                      <td>
                        <div>
                          <a @click="getTemporaryPwd(item.roomLockId)" v-if="item.lockStatus == 1">获取临时密码</a>
                          <a @click="updateDoorLock(item,doorLock.floorName)" v-if="item.lockStatus">修改</a>
                          <router-link to="/apartment/doorRecord" v-if="item.lockStatus">开门记录</router-link>
                          <a @click="freezeUp(doorLock.floorName,item.roomNum,item.roomLockId)" v-if="item.lockStatus && item.lockStatus !=3">冻结</a>
                          <a @click="unfreezeUp(doorLock.floorName,item.roomNum,item.roomLockId)" v-if="item.lockStatus == 3">解冻</a>
                          <a @click="addDoorLockTo(doorLock.floorName,item.roomNum,item.roomId)" v-if="item.lockStatus !=1 && item.lockStatus !=2 && item.lockStatus !=3">添加门锁</a>
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>

					    </el-tab-pane>
					    <el-tab-pane label="电表" name="second">
                <div class="equipment1 equipment2">
                  <div class="house_xq">
                      <img src="../../../static/images/temp/logo2_03.png">
                      <a href="#" class="ceng">1层</a>
                  </div>
                  <table>
                    <thead>
                      <td>房间</td>
                      <td>电表序列号</td>
                      <td>网关名称</td>
                      <td>供应商</td>
                      <td>添加时间</td>
                      <td>上次抄表时间</td>
                      <td>上次抄表读数</td>
                      <td>电表状态</td>
                      <td width="15%">操作</td>
                    </thead>
                    <tr>
                      <td>101</td>
                      <td>1341648946168</td>
                      <td>1楼门锁网关A</td>
                      <td>云丁</td>
                      <td>2017.15.05</td>
                      <td>2017.15.05</td>
                      <td>121213</td>
                      <td>在线</td>
                      <td>
                        <div>
                          <a @click="adddian2()">修改</a>
                          <a>关闭</a>
                          <router-link to="/apartment/meterReading">抄表记录</router-link>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>101</td>
                      <td>1341648946168</td>
                      <td>1楼门锁网关A</td>
                      <td>云丁</td>
                      <td>2017.15.05</td>
                      <td>2017.15.05</td>
                      <td>121213</td>
                      <td>在线</td>
                      <td>
                        <div>
                          <a @click="adddian()">添加电表</a>
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>
					    </el-tab-pane>
					    <el-tab-pane label="水表" name="third">
                <div class="equipment1 equipment2">
                  <div class="house_xq">
                      <img src="../../../static/images/temp/logo2_03.png">
                      <a href="#" class="ceng">1层</a>
                  </div>
                  <table>
                    <thead>
                      <td>房间</td>
                      <td>水表序列号</td>
                      <td>网关名称</td>
                      <td>供应商</td>
                      <td>添加时间</td>
                      <td>上次抄表时间</td>
                      <td>上次抄表读数</td>
                      <td>水表状态</td>
                      <td width="15%">操作</td>
                    </thead>
                    <tr>
                      <td>101</td>
                      <td>1341648946168</td>
                      <td>1楼门锁网关A</td>
                      <td>云丁</td>
                      <td>2017.15.05</td>
                      <td>2017.15.05</td>
                      <td>121213</td>
                      <td>在线</td>
                      <td>
                        <div>
                          <a @click="updateWater()">修改</a>
                          <a @click="closeshui1()">关闭</a>
                          <router-link to="/apartment/meterReading">抄表记录</router-link>
                        </div>
                      </td>
                    </tr>
							  	</table>
					    	</div>
					    </el-tab-pane>
					    <!--<el-tab-pane label="网关管理" name="fourth">-->
					    	<!--<div class="equipment1 equipment2">-->
					    		<!--<div class="house_xq">-->
							  			<!--<img src="../../../static/images/temp/logo2_03.png">-->
							  			<!--<a href="#" class="ceng">1层</a>-->
							  			<!--<a class="tianjia" @click="instas10()"> + 添加网关</a>-->
							  	<!--</div>-->
							  	<!--<table>-->
							  		<!--<thead>-->
							  			<!--<td>序号</td>-->
							  			<!--<td>网关类型</td>-->
							  			<!--<td>网关名称</td>-->
							  			<!--<td>供应商</td>-->
							  			<!--<td>序列号</td>-->
							  			<!--<td>已连接设备</td>-->
							  			<!--<td>添加时间</td>-->
							  			<!--<td>状态</td>-->
							  			<!--<td>操作</td>-->
							  		<!--</thead>-->
							  		<!--<tr>-->
							  			<!--<td>101</td>-->
							  			<!--<td>1341648946168</td>-->
							  			<!--<td>1楼门锁网关A</td>-->
							  			<!--<td>云丁</td>-->
							  			<!--<td>2017.15.05</td>-->
							  			<!--<td>2017.15.05</td>-->
							  			<!--<td>121213</td>-->
							  			<!--<td>在线</td>-->
							  			<!--<td><a @click="instas11()">修改</a></td>-->
							  		<!--</tr>-->
							  	<!--</table>-->
					    	<!--</div>-->
					    <!--</el-tab-pane>-->
					</el-tabs>
		    	</div>


			</div>
			<footer-box></footer-box>
		</div>


		<div class="scherm" v-show="isHid" @click="closeModal()">
		</div>
		<div class="scherm scherm2" v-show="isHid2">
		</div>


    <!--获取临时密码-->
		<div class="instas3" v-show="temporaryPwd">
				<i class="el-icon-circle-close" @click="instas3()"></i>
				<p>获取临时密码</p>
				<span>临时密码发送至：</span>
				<input type="text" placeholder="请输入手机号码" v-model="phone"/>
				<p><i class="el-icon-warning"></i>临时密码有效时间为2个小时</p>
				<a @click="sendMessege()">确定</a>
		</div>



    <!--添加门锁-->
		<div class="instas4" v-show="addDoorLockFlag">
			<i class="el-icon-circle-close" @click="instas4()"></i>
			<p>添加门锁</p>
			<table>
				<tr>
					<td>房间：</td>
					<td>{{floorName}}层 {{roomNum}}</td>
				</tr>
				<tr>
					<td>供应商：</td>
					<td>
						<el-select v-model="doorLockSupplier" filterable placeholder="请输入或选择">
						    <el-option
						      v-for="item in suppliers"
						      :key="item.dataId"
						      :label="item.dataName"
						      :value="item.dataId">
						    </el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td>门锁类型：</td>
					<td>
						<el-select v-model="doorLockType" placeholder="请选择">
						    <el-option v-for="item in lockTypes" :key="item.id" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td>序列号：</td>
					<td>
						<input type="text" placeholder="请输入序列号" v-model="doorLockSn"/>
					</td>
				</tr>
				<tr>
					<td>密码：</td>
					<td>
						<input type="text" placeholder="请输入6位密码" v-model="doorLockPwd"/>
					</td>
				</tr>
			</table>
      <span style="color: red;" v-if="erorrInfo">密码必须为6位数字组成</span>
			<a class="tjss" @click="addDoorLockSure()">提交</a>
		</div>
    <!--修改门锁配置-->
		<div class="instas5" v-show="isHide4">
			<i class="el-icon-circle-close" @click="instas5()"></i>
			<p>修改门锁配置</p>
			<table>
				<tr>
					<td>房间：</td>
					<td>{{updateFloorName}}层 {{activeDoorLock.roomNum}}
						<a @click="deleteDoorLock()">解除门锁</a>
					</td>
				</tr>
				<tr>
					<td>供应商：</td>
					<td>
						<el-select v-model="activeDoorLock.supplierDataId" filterable placeholder="请输入或选择">
						    <el-option
						      v-for="item in suppliers"
						      :key="item.dataId"
						      :label="item.dataName"
						      :value="item.dataId">
						    </el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td>门锁类型：</td>
					<td>
						<el-select v-model="activeDoorLock.lockType" placeholder="请选择">
              <el-option v-for="item in lockTypes" :key="item.id" :label="item.name" :value="item.id"></el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td>序列号：</td>
					<td>
						<input type="text" placeholder="请输入序列号" v-model="activeDoorLock.sn"/>
					</td>
				</tr>
				<tr>
					<td>密码：</td>
					<td>
						<input type="text" placeholder="请输入6位密码" v-model="newPassword"/>
					</td>
				</tr>
			</table>
			<a class="tja" @click="sureUpdateDoorLock()">提交</a>
		</div>
    <!--解除门锁-->
		<div class="instas6 instas2" v-show="isHide5">
			<i class="ivu-icon ivu-icon-help-buoy"></i>
			<p>你确定要<i>解除</i></p>
			<p>房间<b>1层 103</b>的门锁吗?</p>
			<a>确定</a><a @click="instas6()">取消</a>
		</div>
    <!--冻结门锁-->
    <div class="instas2" v-show="freezeUpDoorLock">
      <i class="ivu-icon ivu-icon-ios-locked-outline"></i>
      <p>你确定要<i>冻结</i></p>
      <p>房间<b>{{floorName}}层 {{roomNum}}</b>的门锁吗?</p>
      <a @click="sureFreezeUp()">确定</a><a @click="closeFreezeUp()">取消</a>
    </div>
    <!--解冻门锁-->
    <div class="instas6 instas2" v-show="unFreezeUpDoorLock">
      <Icon type="ios-unlocked-outline"></Icon>
      <p>你确定要<i>解冻</i></p>
      <p>房间<b>{{floorName}}层 {{roomNum}}</b>的门锁吗?</p>
      <a @click="sureUnFreezeUp()">确定</a><a @click="instas6()">取消</a>
    </div>



    <!--添加电表-->
		<div class="instas7 instas4" v-show="isHide6">
			<i class="el-icon-circle-close" @click="adddian()"></i>
			<p>添加电表</p>
			<table>
				<tr>
					<td>房间：</td>
					<td>3层 301</td>
				</tr>
				<tr>
					<td>序列号：</td>
					<td>
						<input type="text" placeholder="请输入序列号" />
					</td>
				</tr>
				<tr>
					<td>网关：</td>
					<td>
						<el-select v-model="value8" filterable placeholder="请输入或选择">
						    <el-option
						      v-for="item in options"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					</td>
				</tr>
			</table>
			<a @click="adddian()" class="tjss">确定</a>
		</div>
    <!--修改电表配置-->
		<div class="instas8 instas4" v-show="isHide7">
			<i class="el-icon-circle-close" @click="adddian2()"></i>
			<p>修改电表配置</p>
			<table>
				<tr>
					<td>房间：</td>
					<td>3层 301<a @click="instas9()">解除电表</a></td>
				</tr>
				<tr>
					<td>序列号：</td>
					<td>
						<input type="text" placeholder="请输入序列号" />
					</td>
				</tr>
				<tr>
					<td>网关：</td>
					<td>
						<el-select v-model="value8" filterable placeholder="请输入或选择">
						    <el-option
						      v-for="item in options"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					</td>
				</tr>
			</table>
			<a @click="adddian2()" class="tjss">确定</a>
		</div>
    <!--解除电表-->
    <div class="instas9 instas2" v-show="isHide8">
      <i class="ivu-icon ivu-icon-help-buoy"></i>
      <p>你确定要<i>解除</i></p>
      <p>房间<b>1层 103</b>的电表吗?</p>
      <a>确定</a><a @click="instas9()">取消</a>
    </div>


    <!--关闭水表-->
    <div class="instas2" v-show="isHide11">
      <Icon type="ios-close-outline"></Icon>
      <p>你确定要<i>关闭</i></p>
      <p>房间<b>1层 103</b>的水表吗?</p>
      <a>确定</a><a @click="instas15()">取消</a>
    </div>
    <!-- 开启水表-->
    <div class="instas2" v-show="isHide12">
      <Icon type="ios-checkmark-outline"></Icon>
      <p>你确定要<i>开启</i></p>
      <p>房间<b>1层 103</b>的水表吗?</p>
      <a>确定</a><a @click="instas16()">取消</a>
    </div>
    <!--添加水表-->
    <div class="instas7 instas4" v-show="false">
      <i class="el-icon-circle-close" @click="adddian()"></i>
      <p>添加水表</p>
      <table>
        <tr>
          <td>房间：</td>
          <td>3层 301</td>
        </tr>
        <tr>
          <td>序列号：</td>
          <td>
            <input type="text" placeholder="请输入序列号" />
          </td>
        </tr>
        <tr>
          <td>网关：</td>
          <td>
            <el-select v-model="value8" filterable placeholder="请输入或选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </td>
        </tr>
      </table>
      <a @click="adddian()" class="tjss">确定</a>
    </div>
    <!--修改水表配置-->
    <div class="instas8 instas4" v-show="isHide13">
      <i class="el-icon-circle-close" @click="closeUpdateWater()"></i>
      <p>修改水表配置</p>
      <table>
        <tr>
          <td>房间：</td>
          <td>3层 301<a @click="instas9()">解除电表</a></td>
        </tr>
        <tr>
          <td>序列号：</td>
          <td>
            <input type="text" placeholder="请输入序列号" />
          </td>
        </tr>
        <tr>
          <td>网关：</td>
          <td>
            <el-select v-model="value8" filterable placeholder="请输入或选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </td>
        </tr>
      </table>
      <a @click="closeUpdateWater()" class="tjss">确定</a>
    </div>



    <!--添加网关-->
		<!--<div class="instas10 instas4" v-show="isHide9">-->
			<!--<i class="el-icon-circle-close" @click="instas10()"></i>-->
			<!--<p>添加网关</p>-->
			<!--<table>-->
				<!--<tr>-->
					<!--<td>楼层：</td>-->
					<!--<td>1层</td>-->
				<!--</tr>-->
				<!--<tr>-->
					<!--<td>网关名称：</td>-->
					<!--<td>-->
						<!--<input type="text" placeholder="请输入网关名称" />-->
					<!--</td>-->
				<!--</tr>-->

				<!--<tr>-->
					<!--<td>供应商：</td>-->
					<!--<td>-->
						<!--<el-select v-model="value8" filterable placeholder="请输入或选择">-->
						    <!--<el-option-->
						      <!--v-for="item in options"-->
						      <!--:key="item.value"-->
						      <!--:label="item.label"-->
						      <!--:value="item.value">-->
						    <!--</el-option>-->
						<!--</el-select>-->
					<!--</td>-->
				<!--</tr>-->
				<!--<tr>-->
					<!--<td>网关类型：</td>-->
					<!--<td>-->
						<!--<el-select v-model="value5" placeholder="请选择网关类型">-->
						    <!--<el-option-->
						      <!--v-for="item in options"-->
						      <!--:key="item.value"-->
						      <!--:label="item.label"-->
						      <!--:value="item.value">-->
						    <!--</el-option>-->
						<!--</el-select>-->
					<!--</td>-->
				<!--</tr>-->
				<!--<tr>-->
					<!--<td>序列号：</td>-->
					<!--<td>-->
						<!--<input type="text" placeholder="请输入序列号" />-->
					<!--</td>-->
				<!--</tr>-->
			<!--</table>-->
			<!--<a @click="instas10()" class="tjss">确定</a>-->
		<!--</div>-->
    <!--添加网关配置-->
		<!--<div class="instas11 instas4" v-show="isHide10">-->
			<!--<i class="el-icon-circle-close" @click="instas11()"></i>-->
			<!--<p>添加网关配置</p>-->
			<!--<table>-->
				<!--<tr>-->
					<!--<td>楼层：</td>-->
					<!--<td>1层<a>解除网关</a></td>-->
				<!--</tr>-->
				<!--<tr>-->
					<!--<td>网关名称：</td>-->
					<!--<td>-->
						<!--<input type="text" placeholder="请输入网关名称" />-->
					<!--</td>-->
				<!--</tr>-->

				<!--<tr>-->
					<!--<td>供应商：</td>-->
					<!--<td>-->
						<!--<el-select v-model="value8" filterable placeholder="请输入或选择">-->
						    <!--<el-option-->
						      <!--v-for="item in options"-->
						      <!--:key="item.value"-->
						      <!--:label="item.label"-->
						      <!--:value="item.value">-->
						    <!--</el-option>-->
						<!--</el-select>-->
					<!--</td>-->
				<!--</tr>-->
				<!--<tr>-->
					<!--<td>网关类型：</td>-->
					<!--<td>-->
						<!--<el-select v-model="value5" placeholder="请选择网关类型">-->
						    <!--<el-option-->
						      <!--v-for="item in options"-->
						      <!--:key="item.value"-->
						      <!--:label="item.label"-->
						      <!--:value="item.value">-->
						    <!--</el-option>-->
						<!--</el-select>-->
					<!--</td>-->
				<!--</tr>-->
				<!--<tr>-->
					<!--<td>序列号：</td>-->
					<!--<td>-->
						<!--<input type="text" placeholder="请输入序列号" />-->
					<!--</td>-->
				<!--</tr>-->
			<!--</table>-->
			<!--<a @click="instas11()" class="tjss">确定</a>-->
		<!--</div>-->

	</div>
</template>

<script>

	import '../../sass/style/equipment.css';
	import menuBox from '../../components/menuBox.vue';
  import rightHeader from '../../components/rightHeader.vue';
  import footerBox from '../../components/footerBox.vue';
  import qs from 'qs';
  import {gateLock,shutdown,temporaryPwd,sendMessege,SytemData,addDoorLock,updateDL,deleteDL,unLockDL} from '../api.js';

    export default {
    	components:{
    		rightHeader,
    		menuBox,
    		footerBox
    	},
    	data(){
    		return{
    			isHid:false,
    			isHid2:false,
    			isHide:false,
    			temporaryPwd:false,
    			addDoorLockFlag:false,
    			isHide4:false,
    			isHide5:false,
    			isHide6:false,
    			isHide7:false,
    			isHide8:false,
    			isHide9:false,
    			isHide10:false,
          isHide11:false,
          isHide12:false,
          isHide13:false,
    			activeName2: 'first',
          value5:"",
    			options: [{
		          value: '1',
		          label: '智能门锁'
		        }, {
		          value: '2',
		          label: 'RFID锁'
		        }, {
		          value: '选项3',
		          label: '蚵仔煎'
		        }, {
		          value: '选项4',
		          label: '龙须面'
		        }, {
		          value: '选项5',
		          label: '北京烤鸭'
		        }],
          lockTypes:[{
              id: 1,
              name: '智能门锁'
            },{
              id: 2,
              name: 'RFID锁'
            }
          ],
          suppliers:[],
          value8: '',


          communityId:"",
          doorLockList:[],
          password:"",
          phone:"",
          doorLockSupplier:null,
          doorLockType:1,
          doorLockSn:"",
          doorLockPwd:"",
          activeRoomId:"",
          floorName:"",
          roomNum:"",
          activeDoorLock:{},
          updateFloorName:"",
          newPassword:null,
          erorrInfo:false,
          freezeUpDoorLock:false,
          unFreezeUpDoorLock:false,
          activeRoomLockId:null,
		   	}
    	},
      mounted(){
    	  this.communityId = this.$route.query.communityId;
    	  this.getIntelligenceLock();
    	  this.getSupplier();
      },
    	methods:{
        //获取智能门锁列表
        getIntelligenceLock(){
          var that = this;
          this.$http.post(shutdown,qs.stringify({communityId:this.communityId})).then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              var rootData = res.data.entity;
              that.doorLockList = rootData.page;
              for(var i =0;i<that.doorLockList.length;i++){
                that.$set(that.doorLockList[i],"showTable",true);
              }
            }
          })
        },
        hideTable(index){
          this.$set(this.doorLockList[index],"showTable",!this.doorLockList[index].showTable);
        },
        //获取供应商数据
        getSupplier(){
          var that = this;
          this.$http.post(
            SytemData,qs.stringify({parentId:61})
          ).then(function(res){
            that.suppliers = res.data.entity;
            that.doorLockSupplier = that.suppliers[0].dataId;
          }).catch(function(err){
            console.log(err);
          })
        },
        getTemporaryPwd(roomLockId){
          var that = this;
          that.instas3();
          this.$http.post(temporaryPwd,qs.stringify({roomLockId:roomLockId})).then(function(res){debugger
            if(res.status == 200 && res.data.code == 10000){
              that.password = res.data.entity.password;
            }
          })
        },
        sendMessege(){
          var that = this;
          this.$http.post(sendMessege,qs.stringify({phone:this.phone,messageType:this.password})).then(function(res){debugger
            if(res.status == 200 && res.data.code == 10000){

            }
          })
        },
        //打开添加门锁对话框
        addDoorLockTo(floorName,roomNum,roomId){
          this.isHid = !this.isHid;
          this.addDoorLockFlag = !this.addDoorLockFlag;

          this.floorName = floorName;
          this.roomNum = roomNum;
          this.activeRoomId = roomId;
        },
        //提交添加门锁
        addDoorLockSure(){
          var that = this;
          var match = /^[0-9]{6}$/;
          if(!match.test(this.doorLockPwd)){
            this.erorrInfo = true;
            return;
          }else{
            this.erorrInfo = false;
          }
          var data = {
            roomId:this.activeRoomId,
            supplierDataId:this.doorLockSupplier,
            lockType:this.doorLockType,
            sn:this.doorLockSn,
            password:this.doorLockPwd
          };
          this.$http.post(addDoorLock,qs.stringify(data)).then(function(res){debugger
            if(res.status == 200 && res.data.code == 10000){
              that.isHid = !that.isHid;
              that.addDoorLockFlag = !that.addDoorLockFlag;
              that.getIntelligenceLock();
            }
          })
        },
        //打开修改门锁对话框
        updateDoorLock(item,floorName){
          this.isHid = !this.isHid;
          this.isHide4 = !this.isHide4;

          this.activeDoorLock = item;
          this.updateFloorName = floorName;
        },
        //确认修改门锁配置
        sureUpdateDoorLock(){
          var that = this;
          var data = {
            roomLockId:this.activeDoorLock.roomLockId,
            supplierDataId:this.activeDoorLock.supplierDataId,
            lockType:this.activeDoorLock.lockType,
            sn:this.activeDoorLock.sn
          };
          if(this.newPassword){
            data.password = this.newPassword || "";
          }
          this.$http.post(updateDL,qs.stringify(data)).then(function(res){
            that.newPassword = "";
            if(res.status == 200 && res.data.code == 10000){
              that.isHid = !that.isHid;
              that.isHide4 = !that.isHide4;
              that.getIntelligenceLock();
            }
          })
        },
        deleteDoorLock(){
          var that = this;
          this.$http.post(deleteDL,qs.stringify({roomLockId:this.activeDoorLock.roomLockId})).then(function(res){debugger
            if(res.status == 200 && res.data.code == 10000){
              that.isHid = !that.isHid;
              that.isHide4 = !that.isHide4;
              that.getIntelligenceLock();
            }
          })
        },
        //打开冻结门锁
        freezeUp(floorName,roomNum,roomLockId){
          this.isHid = !this.isHid;
          this.freezeUpDoorLock = !this.freezeUpDoorLock;
          this.activeRoomLockId = roomLockId;
          this.floorName = floorName;
          this.roomNum = roomNum;
        },
        //确定冻结门锁
        sureFreezeUp(){
          var that = this;
          this.$http.post(unLockDL,qs.stringify({roomLockId:this.activeRoomLockId})).then(function(res){debugger
            if(res.status == 200 && res.data.code == 10000){
              that.isHid = !that.isHid;
              that.freezeUpDoorLock = !that.freezeUpDoorLock;
              that.getIntelligenceLock();
            }
          })
        },
        //取消
        closeFreezeUp(){
          var that = this;
          that.isHid = !that.isHid;
          that.freezeUpDoorLock = !that.freezeUpDoorLock;
        },
        //打开解冻门锁对话框
        unfreezeUp(floorName,roomNum,roomLockId){
          this.isHid = !this.isHid;
          this.unFreezeUpDoorLock = !this.unFreezeUpDoorLock;
          this.activeRoomLockId = roomLockId;
          this.floorName = floorName;
          this.roomNum = roomNum;
        },
        //确定解冻门锁
        sureUnFreezeUp(){
          var that = this;
          this.$http.post(unLockDL,qs.stringify({roomLockId:this.activeRoomLockId})).then(function(res){debugger
            if(res.status == 200 && res.data.code == 10000){
              that.isHid = !that.isHid;
              that.unFreezeUpDoorLock = !that.unFreezeUpDoorLock;
              that.getIntelligenceLock();
            }
          })
        },


    		instas:function(){
    			this.isHid = !this.isHid;
    			this.isHide = !this.isHide;
    		},
    		instas3:function(){
    			this.isHid = !this.isHid;
    			this.temporaryPwd = !this.temporaryPwd;
    		},
    		instas4:function(){
    			this.isHid = !this.isHid;
    			this.addDoorLockFlag = !this.addDoorLockFlag;
    		},
    		instas5:function(){
    			this.isHid = !this.isHid;
    			this.isHide4 = !this.isHide4;
    		},
    		instas6:function(){
    			this.isHid = false;
    			this.isHide4 = false;
    			this.isHide5 = !this.isHide5;
    			this.isHid2 = !this.isHid2;
    		},
    		adddian:function(){
    			this.isHid = !this.isHid;
    			this.isHide6 = !this.isHide6;
    		},
    		adddian2:function(){
    			this.isHid = !this.isHid;
    			this.isHide7 = !this.isHide7;
    		},
    		instas9:function(){
    			this.isHid = false;
    			this.isHide7 = false;
    			this.isHide8 = !this.isHide8;
    			this.isHid2 = !this.isHid2;
    		},
    		instas10:function(){
    			this.isHid = !this.isHid;
    			this.isHide9 = !this.isHide9;
    		},
    		instas11:function(){
    			this.isHid = !this.isHid;
    			this.isHide10 = !this.isHide10;
    		},
        instas15(){
          this.isHid = !this.isHid;
          this.isHide11 = !this.isHide11;
        },
        closeshui1(){debugger
          this.isHid = !this.isHid;
          this.isHide11 = !this.isHide11;
        },
        instas16(){
          this.isHid = !this.isHid;
          this.isHide12 = !this.isHide12;
        },
        updateWater(){
          this.isHid = !this.isHid;
          this.isHide13 = !this.isHide13;
        },
        closeUpdateWater(){
          this.isHid = !this.isHid;
          this.isHide13 = !this.isHide13;
        },
    		handleClick(tab, event) {
		        console.log(tab, event);
		    },


        closeModal(){
          this.isHid = false;
          this.temporaryPwd = false;
          this.addDoorLockFlag = false;
          this.isHide4 = false;
          this.freezeUpDoorLock = false;
          this.unFreezeUpDoorLock = false;
        }
    	},
      filters:{
        timefilter(value,format){
          if(value){
            return new Date(value).Format(format)
          }
        }
      },
    	created(){

    	}
    }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';

  #equipmentMan{
    min-height: 1000px;
    height: 100%;
  }
</style>
