<template>
	<div class="hous">
		<menu-box :active-tab-name="activeTabName"></menu-box>
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
                <div style="width: 100%;height: 600px;" v-loading="loading" v-if="loading"></div>
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
                          <router-link :to="{name:'doorRecord',query:{roomLockId:item.roomLockId}}" v-if="item.lockStatus">开门记录</router-link>
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
                <div class="equipment1 equipment2" v-for="(electricity,index) in electricityList">
                  <div class="house_xq" @click="hideTable2(index)">
                      <img src="../../../static/images/temp/logo2_03.png">
                      <a class="ceng">{{electricity.floorName}}层</a>
                  </div>
                  <table v-if="electricity.showTable">
                    <thead>
                      <td>房间</td>
                      <td>电表序列号</td>
                      <td>供应商</td>
                      <td>添加时间</td>
                      <td>上次抄表时间</td>
                      <td>上次抄表读数</td>
                      <td>电表状态</td>
                      <td width="15%">操作</td>
                    </thead>
                    <tr v-for="(item,index1) in electricity.roomElectricity">
                      <td>{{item.roomNum}}</td>
                      <td>{{item.electricityMeterSn}}</td>
                      <td>{{item.manufacturerName}}</td>
                      <td>{{item.createtime | timefilter("yyyy.MM.dd")}}</td>
                      <td>{{item.recordCreatetime | timefilter("yyyy.MM.dd")}}</td>
                      <td>{{item.waterElectricityData}}</td>
                      <td>
                        <span v-if="item.electricityStatus == 0" style="color: #3dc4b2;">在线</span>
                        <span v-else-if="item.electricityStatus == 1">离线</span>
                        <span v-else-if="item.electricityStatus == 2">关闭</span>
                        <span v-else style="color: rgb(254,120,50);">未配置</span>
                      </td>
                      <td>
                        <div><!--v-if="item.electricityStatus == 0 || item.electricityStatus == 1 || item.electricityStatus == 0"-->
                          <a v-if="item.electricityStatus == 0 || item.electricityStatus == 1 || item.electricityStatus == 2" @click="updateElectricityTo(item,electricity.floorName)" >修改</a>
                          <a v-if="item.electricityStatus != 2 && (item.electricityStatus == 0 || item.electricityStatus == 1)" @click="shutElectricity(item,electricity.floorName)">关闭</a>
                          <a v-if="item.electricityStatus == 2" @click="openToElectricity(item,electricity.floorName)">开启</a>
                          <a @click="addElectricityTo(electricity.floorName,item.roomNum,item.roomId)" v-if="item.electricityStatus != 0 &&  item.electricityStatus != 1 && item.electricityStatus != 2">添加电表</a>
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>
					    </el-tab-pane>
					    <el-tab-pane label="水表" name="third">
                <div class="equipment1 equipment2" v-for="(water,index) in waterList">
                  <div class="house_xq" @click="hideTable3(index)">
                      <img src="../../../static/images/temp/logo2_03.png">
                      <a class="ceng">{{water.floorName}}层</a>
                  </div>
                  <table  v-if="water.showTable">
                    <thead>
                      <td>房间</td>
                      <td>水表序列号</td>
                      <td>供应商</td>
                      <td>添加时间</td>
                      <td>上次抄表时间</td>
                      <td>上次抄表读数</td>
                      <td>水表状态</td>
                      <td width="15%">操作</td>
                    </thead>
                    <tr v-for="(item,index) in water.roomWater">
                      <td>{{item.roomNum}}</td>
                      <td>{{item.waterMeterSn}}</td>
                      <td>{{item.manufacturerName}}</td>
                      <td>{{item.createtime | timefilter("yyyy.MM.dd")}}</td>
                      <td>{{item.recordCreatetime | timefilter("yyyy.MM.dd")}}</td>
                      <td>{{item.waterElectricityData}}</td>
                      <td>
                        <span v-if="item.waterStatus == 0" style="color: #3dc4b2;">在线</span>
                        <span v-else-if="item.waterStatus == 1">离线</span>
                        <span v-else-if="item.waterStatus == 2">关闭</span>
                        <span v-else style="color: rgb(254,120,50);">未配置</span>
                      </td>
                      <td>
                        <div>
                          <a v-if="item.waterStatus == 0 || item.waterStatus == 1 || item.waterStatus == 2" @click="updateWater(item,water.floorName)">修改</a>
                          <a v-if="item.waterStatus != 2 && (item.waterStatus == 0 || item.waterStatus == 1)" @click="shutWater(item,water.floorName)">关闭</a>
                          <a v-if="item.waterStatus == 2" @click="openWater(item,water.floorName)">开启</a>
                          <a v-if="item.waterStatus != 0 &&  item.waterStatus != 1 && item.waterStatus != 2" @click="addWaterTo(water.floorName,item.roomNum,item.roomId)">添加水表</a>
                        </div>
                      </td>
                    </tr>
							  	</table>
					    	</div>
					    </el-tab-pane>
					</el-tabs>
		    	</div>

        <warning-modal :warning-message="warningMessage" @closeWarningModal="closeWarningModal()" v-if="warningModal"></warning-modal>
        <success-modal :success-message="successMessage" v-if="successModal"></success-modal>
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
			<Button type="primary" class="tjss" @click="addDoorLockSure()" :disabled="addLockFlag">提交</Button>
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
			<a>确定</a><a @click="deleteElectricitySure()">取消</a><!--deleteElectricitySure-->
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
      <a @click="sureUnFreezeUp()">确定</a><a @click="closeUnFreezeUpDoorLock()">取消</a>
    </div>



    <!--添加电表-->
		<div class="instas7 instas4" v-show="addElectricity">
			<i class="el-icon-circle-close" @click="closeModal()"></i>
			<p>添加电表</p>
			<table>
				<tr>
					<td>房间：</td>
          <td>{{floorName}}层 {{roomNum}}</td>
				</tr>
				<tr>
					<td>序列号：</td>
					<td>
						<input type="text" placeholder="请输入序列号" v-model="electricityMeterSn"/>
					</td>
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
			</table>
			<a @click="addElectricitySure()" class="tjss">确定</a>
		</div>
    <!--修改电表配置-->
		<div class="instas8 instas4" v-show="updateElectricity">
			<i class="el-icon-circle-close" @click="closeUpdateElectricity()"></i>
			<p>修改电表配置</p>
			<table>
				<tr>
					<td>房间：</td>
					<td>{{updateFloorName}}层 {{activeElectricity.roomNum}}<a @click="deleteElectricity()">解除电表</a></td>
				</tr>
				<tr>
					<td>序列号：</td>
					<td>
						<input type="text" placeholder="请输入序列号" v-model="activeElectricity.electricityMeterSn"/>
					</td>
				</tr>
				<tr>
          <td>供应商：</td>
          <td>
            <el-select v-model="activeElectricity.manufacturer" filterable placeholder="请输入或选择">
              <el-option
                v-for="item in suppliers"
                :key="item.dataId"
                :label="item.dataName"
                :value="item.dataId">
              </el-option>
            </el-select>
          </td>
				</tr>
			</table>
			<a @click="updateElectricitySure()" class="tjss">确定</a>
		</div>
    <!--解除电表-->
    <div class="deleteElectricity instas2" v-show="isHide8">
      <i class="ivu-icon ivu-icon-help-buoy"></i>
      <p>你确定要<i>解除</i></p>
      <p>房间<b>{{updateFloorName}}层 {{activeElectricity.roomNum}}</b>的电表吗?</p>
      <a @click="deleteElectricitySure">确定</a><a @click="closeDeleteElectricity()">取消</a>
    </div>
    <!--关闭电表-->
    <div class="instas2" v-show="isHide11">
      <Icon type="ios-close-outline"></Icon>
      <p>你确定要<i>关闭</i></p>
      <p>房间<b>{{updateFloorName}}层 {{activeElectricity.roomNum}}</b>的电表吗?</p>
      <a @click="shutElectricitySure">确定</a><a @click="closeShutElectricity()">取消</a>
    </div>
    <!--开启电表-->
    <div class="instas6 instas2" v-show="openElectricityModal">
      <Icon type="ios-unlocked-outline"></Icon>
      <p>你确定要<i>开启</i></p>
      <p>房间<b>{{updateFloorName}}层 {{activeElectricity.roomNum}}</b>的电表吗?</p>
      <a @click="openElectricitySure()">确定</a><a @click="closeOpenElectricity()">取消</a>
    </div>


    <!--关闭水表-->
    <div class="instas2" v-show="shutWaterModal">
      <Icon type="ios-close-outline"></Icon>
      <p>你确定要<i>关闭</i></p>
      <p>房间<b>{{updateFloorName}}层 {{activeWater.roomNum}}</b>的水表吗?</p>
      <a @click="shutWaterSure()">确定</a><a @click="closeShutWaterModal()">取消</a>
    </div>
    <!-- 开启水表-->
    <div class="instas2" v-show="openWaterModal">
      <Icon type="ios-checkmark-outline"></Icon>
      <p>你确定要<i>开启</i></p>
      <p>房间<b>{{updateFloorName}}层 {{activeWater.roomNum}}</b>的水表吗?</p>
      <a @click="openWaterSure()">确定</a><a @click="closeOpenWaterModal()">取消</a>
    </div>
    <!--添加水表-->
    <div class="instas7 instas4" v-show="addWaterModal">
      <i class="el-icon-circle-close" @click="closeAddWaterModal()"></i>
      <p>添加水表</p>
      <table>
        <tr>
          <td>房间：</td>
          <td>{{floorName}}层 {{roomNum}}</td>
        </tr>
        <tr>
          <td>序列号：</td>
          <td>
            <input type="text" placeholder="请输入序列号" v-model="waterMeterSn"/>
          </td>
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
      </table>
      <a @click="addWaterSure()" class="tjss">确定</a>
    </div>
    <!--修改水表配置-->
    <div class="instas8 instas4" v-show="updateWaterModal">
      <i class="el-icon-circle-close" @click="closeUpdateWater()"></i>
      <p>修改水表配置</p>
      <table>
        <tr>
          <td>房间：</td>
          <td>{{updateFloorName}}层 {{activeWater.roomNum}}<a @click="deleteWater()">解除水表</a></td>
        </tr>
        <tr>
          <td>序列号：</td>
          <td>
            <input type="text" placeholder="请输入序列号" v-model="activeWater.waterMeterSn"/>
          </td>
        </tr>
        <tr>
          <td>网关：</td>
          <td>
            <el-select v-model="activeWater.manufacturer" filterable placeholder="请输入或选择">
              <el-option
                v-for="item in suppliers"
                :key="item.dataId"
                :label="item.dataName"
                :value="item.dataId">
              </el-option>
            </el-select>
          </td>
        </tr>
      </table>
      <a @click="updateWaterSure()" class="tjss">确定</a>
    </div>
    <!--解除水表-->
    <div class="deleteElectricity instas2" v-show="deleteWaterModal">
      <i class="ivu-icon ivu-icon-help-buoy"></i>
      <p>你确定要<i>解除</i></p>
      <p>房间<b>{{updateFloorName}}层 {{activeWater.roomNum}}</b>的水表吗?</p>
      <a @click="deleteWaterSure">确定</a><a @click="closeDeleteWater()">取消</a>
    </div>


	</div>
</template>

<script>

	import '../../sass/style/equipment.css';
	import menuBox from '../../components/menuBox.vue';
  import rightHeader from '../../components/rightHeader.vue';
  import footerBox from '../../components/footerBox.vue';
  import  successModal from '../../components/successModal.vue';
  import  warningModal from '../../components/warningModal.vue';
  import qs from 'qs';
  import {gateLock,shutdown,temporaryPwd,sendMessege,SytemData,addDoorLock,updateDL,deleteDL,unLockDL,electricityTable,pushElectricity,electricityDelete,electricitUpdate,openElectricity,
    waterTable,addWaterUrl,updateWaterUrl,deleteWaterUrl,openWaterUrl} from '../api.js';

    export default {
    	components:{
    		rightHeader,
    		menuBox,
    		footerBox,
        warningModal,
        successModal
    	},
    	data(){
    		return{
          activeTabName:"communityManagement",
    			isHid:false,
    			isHid2:false,
    			isHide:false,
    			temporaryPwd:false,
    			addDoorLockFlag:false,
    			isHide4:false,
    			isHide5:false,
    			isHide6:false,
    			updateElectricity:false,
    			isHide8:false,
    			isHide9:false,
    			isHide10:false,
          isHide11:false,
          isHide12:false,
          updateWaterModal:false,
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
          loading:false,

          electricityList:[],
          addElectricity:false,
          electricityMeterSn:"",
          activeElectricity:{},
          openElectricityModal:false,


          waterList:[],
          addWaterModal:false,
          waterMeterSn:"",
          activeWater:{},
          deleteWaterModal:false,
          shutWaterModal:false,
          openWaterModal:false,
          addLockFlag:false,

          successModal:false,
          successMessage:"添加成功！",
          warningModal:false,
          warningMessage:"添加失败！",
		   	}
    	},
      mounted(){
    	  this.communityId = this.$route.query.communityId;
    	  this.getIntelligenceLock();
    	  this.getElectricityTable();
    	  this.getWaterList();
    	  this.getSupplier();
      },
    	methods:{
        closeWarningModal(){
          this.warningModal = false;
        },
        closeModal(){
          this.isHid = false;
          this.temporaryPwd = false;
          this.addDoorLockFlag = false;
          this.isHide4 = false;
          this.freezeUpDoorLock = false;
          this.unFreezeUpDoorLock = false;
          this.addElectricity = false;
          this.updateElectricity = false;
          this.isHide8 = false;
          this.isHide11 = false;
          this.openElectricityModal = false;
          this.addWaterModal = false;
          this.updateWaterModal = false;
          this.deleteWaterModal = false;
          this.shutWaterModal = false;
          this.openWaterModal = false;
        },
        //获取水表列表
        getWaterList(){
          var that = this;
          this.$http.post(waterTable,qs.stringify({communityId:this.communityId})).then(function(res){debugger
            if(res.status == 200 && res.data.code == 10000){
              var rootData = res.data.entity;
              that.waterList = rootData.page;
              for(var i =0;i<that.waterList.length;i++){
                that.$set(that.waterList[i],"showTable",true);
              }
            }
          })
        },
        //添加水表对话框
        addWaterTo(floorName,roomNum,roomId){
          this.isHid = !this.isHid;
          this.addWaterModal = !this.addWaterModal;

          this.floorName = floorName;
          this.roomNum = roomNum;
          this.activeRoomId = roomId;
        },
        //关闭添加水表对话框
        closeAddWaterModal(){
          this.isHid = !this.isHid;
          this.addWaterModal = false;
        },
        //确定添加水表
        addWaterSure(){
          var that = this;
          var data = {
            roomId:this.activeRoomId,
            manufacturer:this.doorLockSupplier,
            waterMeterSn:this.waterMeterSn,
          };
          this.$http.post(addWaterUrl,qs.stringify(data)).then(function(res){debugger
            if(res.status == 200 && res.data.code == 10000){
              that.isHid = !that.isHid;
              that.addWaterModal = !that.addWaterModal;
              that.getWaterList();
            }else if(res.status == 200 && res.data.code == 10004){
              that.isHid = !that.isHid;
              that.addWaterModal = !that.addWaterModal;
              that.warningMessage = "添加水表失败！"
              that.warningModal = true;
            }
          })
        },
        //打开修改水表配置对话框
        updateWater(item,floorName){
          this.isHid = !this.isHid;
          this.updateWaterModal = !this.updateWaterModal;

          this.activeWater = item;
          this.updateFloorName = floorName;
        },
        //关闭修改水表配置对话框
        closeUpdateWater(){
          this.isHid = !this.isHid;
          this.updateWaterModal = !this.updateWaterModal;
        },
        //确定修改水表配置
        updateWaterSure(){
          var that = this;
          var data = {
            roomWatermeterRelationId:this.activeWater.roomWatermeterRelationId,
            roomId:this.activeWater.roomId,
            manufacturer:this.activeWater.manufacturer,
            waterMeterSn:this.activeWater.waterMeterSn,
          };
          this.$http.post(updateWaterUrl,qs.stringify(data)).then(function(res){debugger
            if(res.status == 200 && res.data.code == 10000){
              that.isHid = !that.isHid;
              that.updateWaterModal = !that.updateWaterModal;
              that.getWaterList();
            }
          })
        },
        //打开解除水表对话框
        deleteWater(){
          this.updateWaterModal = false;
          this.deleteWaterModal = true;
        },
        //关闭解除水表
        closeDeleteWater(){
          this.isHid = !this.isHid;
          this.deleteWaterModal = false;
        },
        //确定解除水表
        deleteWaterSure(){
          var that = this;
          this.$http.post(deleteWaterUrl,qs.stringify({roomWatermeterRelationId:this.activeWater.roomWatermeterRelationId,roomId:this.activeWater.roomId})).then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              that.isHid = !that.isHid;
              that.deleteWaterModal = !that.deleteWaterModal;
              that.getWaterList();
            }
          })
        },
        shutWater(item,floorName){
          this.activeWater = item;
          this.updateFloorName = floorName;
          this.isHid = !this.isHid;
          this.shutWaterModal = !this.shutWaterModal;
        },
        closeShutWaterModal(){
          this.shutWaterModal = false;
          this.isHid = !this.isHid;
        },
        shutWaterSure(){
          var that = this;
          this.$http.post(openWaterUrl,qs.stringify({roomWatermeterRelationId:this.activeWater.roomWatermeterRelationId,roomId:this.activeWater.roomId})).then(function(res){debugger
            if(res.status == 200 && res.data.code == 10000){
              that.isHid = false;
              that.shutWaterModal = false;
              that.getWaterList();
            }
          })
        },


        openWater(item,floorName){
          this.activeWater = item;
          this.updateFloorName = floorName;
          this.isHid = !this.isHid;
          this.openWaterModal = !this.openWaterModal;
        },
        closeOpenWaterModal(){
          this.openWaterModal = false;
          this.isHid = !this.isHid;
        },
        openWaterSure(){
          var that = this;
          this.$http.post(openWaterUrl,qs.stringify({roomWatermeterRelationId:this.activeWater.roomWatermeterRelationId,roomId:this.activeWater.roomId})).then(function(res){debugger
            if(res.status == 200 && res.data.code == 10000){
              that.isHid = false;
              that.shutWaterModal = false;
              that.getWaterList();
            }
          })
        },









        //获取智能门锁列表
        getIntelligenceLock(){
          var that = this;
          that.loading = true;
          this.$http.post(shutdown,qs.stringify({communityId:this.communityId})).then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              var rootData = res.data.entity;
              that.doorLockList = rootData.page;
              for(var i =0;i<that.doorLockList.length;i++){
                that.$set(that.doorLockList[i],"showTable",true);
              }
              that.loading = false;
            }
          })
        },
        hideTable(index){
          this.$set(this.doorLockList[index],"showTable",!this.doorLockList[index].showTable);
        },
        hideTable2(index){
          this.$set(this.electricityList[index],"showTable",!this.electricityList[index].showTable);
        },
        hideTable3(index){
          this.$set(this.waterList[index],"showTable",!this.waterList[index].showTable);
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
          this.$http.post(sendMessege,qs.stringify({phone:this.phone,password:this.password})).then(function(res){debugger
            if(res.status == 200 && res.data.code == 10000){
              that.phone = "";
              that.isHid = !that.isHid;
              that.temporaryPwd = !that.temporaryPwd;
            }
          })
        },
        //打开添加门锁对话框
        addDoorLockTo(floorName,roomNum,roomId){
          this.isHid = !this.isHid;
          this.addDoorLockFlag = !this.addDoorLockFlag;

          this.addLockFlag = false;//打开被锁按钮
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
          this.addLockFlag = true;//锁定提交按钮
          this.$http.post(addDoorLock,qs.stringify(data)).then(function(res){debugger
            if(res.status == 200 && res.data.code == 10000){
              that.isHid = !that.isHid;
              that.addDoorLockFlag = !that.addDoorLockFlag;
              that.getIntelligenceLock();
            }else if(res.status == 200 && res.data.code == 10004){
              that.isHid = !that.isHid;
              that.addDoorLockFlag = !that.addDoorLockFlag;
              that.warningMessage = "添加门锁失败！"
              that.warningModal = true;
            }
            that.addLockFlag = false;
          })
        },
        //打开修改门锁对话框
        updateDoorLock(item,floorName){
          this.isHid = !this.isHid;
          this.isHide4 = !this.isHide4;

          this.activeDoorLock = item;
          this.updateFloorName = floorName;
        },
        //取消解冻门锁
        closeUnFreezeUpDoorLock(){
          this.isHid = false;
          this.unFreezeUpDoorLock = false;
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
        //解除门锁
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



        //获取电表列表
        getElectricityTable(){
          var that = this;
          this.$http.post(electricityTable,qs.stringify({communityId:this.communityId})).then(function(res){debugger
            if(res.status == 200 && res.data.code == 10000){
              var rootData = res.data.entity;
              that.electricityList = rootData.page;
              for(var i =0;i<that.electricityList.length;i++){
                that.$set(that.electricityList[i],"showTable",true);
              }
            }
          })
        },
        //打开添加电表对话框
        addElectricityTo(floorName,roomNum,roomId){
          this.isHid = !this.isHid;
          this.addElectricity = !this.addElectricity;

          this.floorName = floorName;
          this.roomNum = roomNum;
          this.activeRoomId = roomId;
        },
        //提交添加电表
        addElectricitySure(){
          var that = this;
          var data = {
            roomId:this.activeRoomId,
            manufacturer:this.doorLockSupplier,
            electricityMeterSn:this.electricityMeterSn,
          };
          this.$http.post(pushElectricity,qs.stringify(data)).then(function(res){debugger
            if(res.status == 200 && res.data.code == 10000){
              that.isHid = !that.isHid;
              that.addElectricity = !that.addElectricity;
              that.getElectricityTable();
            }else if(res.status == 200 && res.data.code == 10004){
              that.isHid = !that.isHid;
              that.addElectricity = !that.addElectricity;
              that.warningMessage = "添加电表失败！"
              that.warningModal = true;
            }
          })
        },
        //修改电表配置
        updateElectricityTo(item,floorName){
          this.isHid = !this.isHid;
          this.updateElectricity = !this.updateElectricity;

          this.activeElectricity = item;
          this.updateFloorName = floorName;
        },
        //关闭修改电表配置
        closeUpdateElectricity(){
          this.isHid = !this.isHid;
          this.updateElectricity = false;
        },
        //确定修改电表配置
        updateElectricitySure(){
          var that = this;

          var data = {
            roomElectricitymeterRelationId:this.activeElectricity.roomElectricitymeterRelationId,
            roomId:this.activeElectricity.roomId,
            manufacturer:this.activeElectricity.manufacturer,
            electricityMeterSn:this.activeElectricity.electricityMeterSn,
          };
          this.$http.post(electricitUpdate,qs.stringify(data)).then(function(res){debugger
            if(res.status == 200 && res.data.code == 10000){
              that.isHid = !that.isHid;
              that.updateElectricity = !that.updateElectricity;
              that.getElectricityTable();
            }
          })
        },
        //解除电表
        deleteElectricity(){

          this.isHide8 = !this.isHide8;
          this.addElectricity = false;
          this.updateElectricity = !this.updateElectricity;
        },
        //确认解除电表
        deleteElectricitySure(){
          var that = this;
          this.$http.post(electricityDelete,qs.stringify({roomElectricitymeterRelationId:this.activeElectricity.roomElectricitymeterRelationId,roomId:this.activeElectricity.roomId})).then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              that.isHid = !that.isHid;
              that.isHide8 = !that.isHide8;
              that.getElectricityTable();
            }
          })
        },
        //取消解除电表
        closeDeleteElectricity(){
          this.isHid = !this.isHid;
          this.isHide8 = false;
        },
        //打开关闭电表对话框
        shutElectricity(item,floorName){
          this.activeElectricity = item;
          this.updateFloorName = floorName;
          this.isHid = !this.isHid;
          this.isHide11 = !this.isHide11;
        },
        //取消关闭电表
        closeShutElectricity(){
          this.isHid = false
          this.isHide11 = false;
        },
        //确定关闭电表
        shutElectricitySure(){
          var that = this;
          this.$http.post(openElectricity,qs.stringify({roomElectricitymeterRelationId:this.activeElectricity.roomElectricitymeterRelationId,roomId:this.activeElectricity.roomId})).then(function(res){debugger
            if(res.status == 200 && res.data.code == 10000){
              that.isHid = false;
              that.isHide11 = false;
              that.getElectricityTable();
            }
          })
        },
        //打开开启电表弹框
        openToElectricity(item,floorName){
          this.isHid = !this.isHid;
          this.openElectricityModal = true;
          this.activeElectricity = item;
          this.updateFloorName = floorName;
        },
        //确定开启电表
        openElectricitySure(){
          var that = this;
          this.$http.post(openElectricity,qs.stringify({roomElectricitymeterRelationId:this.activeElectricity.roomElectricitymeterRelationId,roomId:this.activeElectricity.roomId})).then(function(res){debugger
            if(res.status == 200 && res.data.code == 10000){
              that.isHid = false;
              that.openElectricityModal = false;
              that.getElectricityTable();
            }
          })
        },
        closeOpenElectricity(){
          this.isHid = false;
          this.openElectricityModal = false;
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



    		instas10:function(){
    			this.isHid = !this.isHid;
    			this.isHide9 = !this.isHide9;
    		},
    		instas11:function(){
    			this.isHid = !this.isHid;
    			this.isHide10 = !this.isHide10;
    		},


        instas16(){
          this.isHid = !this.isHid;
          this.isHide12 = !this.isHide12;
        },

    		handleClick(tab, event) {
		        console.log(tab, event);
		    },


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
