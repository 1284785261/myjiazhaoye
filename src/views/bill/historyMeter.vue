
<template>
  <div>
    <menu-box :active-tab-name="activeTabName"></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="ivu-site">
          <span>您现在的位置：</span>
          <router-link  class="active" to="/apartment/communityManagement">合同管理</router-link>
        </div>
        <div id="history-meter-wrap">
          <Tabs type="card" v-model="activeName">
            <Tab-pane label="历史抄表" name="1" v-if="activeName == 1">
              <div>
                <Button style="margin-top: 20px;margin-left: 30px;" :class="{active:isActives == 1}" @click="setIsActive(1)">历史水表</Button>
                <Button style="margin-top: 20px;margin-left: 30px;" :class="{active:isActives == 2}" @click="setIsActive(2)">历史电表</Button>
              </div>
              <div class="form-search-criteria">
                <div class="form-item">
                  <b>社区：</b>
                  <span>{{communityName}}</span>
                </div>
                <div class="form-item">
                  <b>房间号：</b>
                  <span>{{roomHistoryRoomNum}} {{roomHistoryHousetypeName}}</span>
                </div>
                <div class="form-item">
                  <span>操作时间：</span>
                  <Date-picker type="date" placeholder="选择日期" v-model="mrStartTime"></Date-picker>
                  <span class="inline-block spanBar">--</span>
                  <Date-picker type="date" placeholder="选择日期" v-model="mrEndTime"></Date-picker>
                </div>
                <div class="form-item">
                  <div class="form-search">
                    <!--<i class="iconfont icon-sousuo"></i>-->
                    <!--<Input v-model="roomSearchKey" placeholder="搜索合同的联系人或联系电话"></Input>-->
                    <input type="button" @click="waterElectricitySearch" value="搜索">
                  </div>
                </div>
              </div>
              <table class="table ivu-table">
                <tr>
                  <th >序号</th>
                  <th v-if="isActives == 1">水表读数</th>
                  <th v-if="isActives == 2">电表读数</th>
                  <th >抄表类型</th>
                  <th>记录时间</th>
                  <th>操作人</th>
                </tr>
                <tr v-for="(item,index) in WaterEnergyHistory" v-if="WaterEnergyHistory.length">
                  <td >{{index+1}}</td>
                  <td>{{item.data}}</td>
                  <!--<td>{{item.energyData}}</td>-->
                  <td>{{item.operationType == 1?'自动':'手动'}}</td>
                  <td>{{item.createTime | timefilter("yyyy-MM-dd hh:mm")}}</td>
                  <td>{{item.userName}}</td>
                </tr>
              </table>
              <div class="blank-background-img" v-if="!WaterEnergyHistory.length">
                <img src="../../../static/images/blank/bill_space.png" >
                <h2>暂无抄表内容~</h2>
              </div>
              <Page :total="WaterEnergyHistoryTotalNum" :current="WaterEnergyHistoryCurrent" :page-size="10" show-elevator show-total @on-change="roomSearch" v-if="WaterEnergyHistory.length"></Page>
            </Tab-pane>
            <Tab-pane label="历史水电账单" name="2" v-if="activeName == 2">
              <div class="form-search-criteria">
                <div class="form-item">
                  <b>社区：</b>
                  <span>{{communityName}}</span>
                </div>
                <div class="form-item">
                  <b>房间号：</b>
                  <span>{{roomNum}}</span>
                </div>
                <!--<div class="form-item">-->
                  <!--<span>操作时间：</span>-->
                  <!--<Date-picker type="date" placeholder="选择日期" v-model="roomStartDate"></Date-picker>-->
                  <!--<span class="inline-block spanBar">--</span>-->
                  <!--<Date-picker type="date" placeholder="选择日期" v-model="roomEndDate"></Date-picker>-->
                <!--</div>-->
                <!--<div class="form-item">-->
                  <!--<div class="form-search">-->
                    <!--&lt;!&ndash;<i class="iconfont icon-sousuo"></i>&ndash;&gt;-->
                    <!--&lt;!&ndash;<Input v-model="roomSearchKey" placeholder="搜索合同的联系人或联系电话"></Input>&ndash;&gt;-->
                    <!--<input type="button" @click="roomSearch()" value="搜索">-->
                  <!--</div>-->
                <!--</div>-->
              </div>
              <table class="table ivu-table">
                <tr>
                  <th >账单日期</th>
                  <th >账单名称</th>
                  <th>水电费情况</th>
                  <th>抄表日期</th>
                  <th>合计应收（元）</th>
                  <th>租客/联系人</th>
                  <th>状态</th>
                  <th>备注</th>
                  <th>操作</th>
                </tr>
                <tr v-for="(item,index) in waterHistoryBillList" v-if="waterHistoryBillList.length">
                  <td>{{item.createTime | timefilter("yyyy-MM-dd")}}</td>
                  <td>{{item.billName}}</td>
                  <td >
                    <div v-if="item.payStatus == 1 && item.isEditor && item.waterChargeModel == 1">
                    <span >上次抄表时间：
                      <!--{{lastTimeWater}}-->
                      <el-select v-model="editorWater.lastTimeWater" placeholder="请选择时间" style="width: 125px" @change=getLastTimeWaterData(editorWater.lastTimeWater,index)>
                      <el-option v-for="(water,waterIndex) in lastTimeWater[index]" :key="waterIndex" :label='water.createTime' :value="waterIndex">
                      </el-option>
                    </el-select>
                    </span>
                    <span >上次水表读数：{{editorWater.lastTimeWaterData}} </span>
                      <span>本次次抄表时间：
                        <el-select v-model="editorWater.currentWater" placeholder="请选择时间" style="width: 125px" @change=getCurrentWaterData(editorWater.currentWater,index)>
                      <el-option v-for="(water,waterIndex) in currentWater[index]" :key="waterIndex" :label='water.createTime' :value="waterIndex">
                      </el-option>
                    </el-select>
                      </span>
                      <span>本次水表读数：{{editorWater.currentWaterData}} </span>
                    <span>水费：{{editorWater.waterPrice}} 元</span>
                    </div>
                    <div v-if=" !item.isEditor && item.waterChargeModel == 1">
                      <span>水表读数：{{item.waterData}} </span>
                      <span>用水量：{{item.waterSize}} </span>
                      <span>水费：{{item.waterCost}} 元</span>
                    </div>
                    <div v-if="item.waterChargeModel == 2">
                      <span>用水人数：{{item.count}} </span>
                      <span>单价：{{item.waterPrice}} </span>
                      <span>水费：{{item.waterCost}} 元</span>
                    </div>
                    <div v-if="item.payStatus == 1 && item.isEditor && item.electricChargeModel == 1">
                      <span  >上次抄表时间：
                       <el-select v-model="editorWater.lastTimeElecTricity" placeholder="请选择时间" style="width: 125px" @change=getLastTimeElecTricityData(editorWater.lastTimeElecTricity,index)>
                      <el-option v-for="(water,waterIndex) in lastTimeElecTricity[index]" :key="waterIndex" :label='water.createTime' :value="waterIndex">
                      </el-option>
                    </el-select>
                      </span>
                      <span>上次电表读数：{{editorWater.lastTimeElecTricityData}} </span>
                      <span>本次抄表时间：
                       <el-select v-model="editorWater.currentElecTricity" placeholder="请选择时间" style="width: 125px" @change=getCurrentElecTricityData(editorWater.currentElecTricity,index)>
                      <el-option v-for="(water,waterIndex) in currentElecTricity[index]" :key="waterIndex" :label='water.createTime' :value="waterIndex">
                      </el-option>
                    </el-select>
                      </span>
                      <span>本次电表读数：{{editorWater.currentElecTricityData}} </span>
                      <span>电费：{{editorWater.elecTricityrice}} 元</span>
                    </div>
                    <div v-if=" !item.isEditor && item.electricChargeModel == 1">
                      <span>电表读数：{{item.energyData}} </span>
                      <span>用电量：{{item.energySize}} </span>
                      <span>电费：{{item.energyCost}} 元</span>
                    </div>
                    <div v-if="item.electricChargeModel == 2">
                      <span>用电人数：{{item.count}} </span>
                      <span>单价：{{item.energyPrice}} </span>
                      <span>电费：{{item.energyCost}} 元</span>
                    </div>
                  </td>
                  <!--<td>-->
                    <!--<span>读数：{{item.energyData}} </span>-->
                    <!--<span>用电量：{{item.energySize}}度 </span>-->
                    <!--<span>电费：{{item.energyCost}} 元</span>-->
                  <!--</td>-->
                  <td  v-if="item.payStatus == 1 && item.isEditor && item.waterChargeModel == 1">
                    <div>水表抄表日期：{{editorWater.lastTimeWater+'-'+editorWater.currentWater}}</div>
                    <div>电表抄表日期：{{editorWater.lastTimeElecTricity+'-'+editorWater.currentElecTricity}}</div>
                  </td>
                  <td v-else>
                    <div v-for="bill in JSON.parse(item.billDate)" v-if="item.billDate">{{bill.waterEnergyName}}:{{bill.waterEnergyDate}}</div>
                  </td>
                  <td  v-if="item.payStatus == 1 && item.isEditor && item.waterChargeModel == 1">
                    {{editorWater.totalPrice}}
                  </td>
                  <td v-else>{{item.realMoney}}</td>
                  <td>{{item.userName}}</td>
                  <td>
                    <span v-if="item.payStatus == 1 && item.isSend == 0">未发送</span>
                    <span v-if="item.payStatus == 1 && item.isSend == 1">待缴</span>
                    <span v-if="item.payStatus == 2">已缴</span>
                  </td>
                  <td v-if="item.payStatus == 1 && item.isEditor && item.electricChargeModel == 1">  <el-input placeholder="请输入备注"  v-model="editorWater.content" clearable></el-input></td>
                  <td v-else>{{item.content}}</td>
                  <td>
                    <a v-if="item.payStatus == 1 && jurisdiction('BILL_UPDATE') && !item.isEditor && item.isSend == 0" @click="editWaterEditBill(index)">编辑</a>
                    <a v-if="item.payStatus == 1 && item.isEditor" @click="saveWaterEditBill(index)">保存</a>
                    <a v-if="item.payStatus == 1 && jurisdiction('BILL_GENERATE') && item.isSend == 0" @click="sendWaterEditBill(item.waterElectricityBill)">发送账单</a>
                    <a v-if="item.payStatus == 1 && jurisdiction('BILL_GENERATE')" @click="deleteWaterEditBill(item.waterElectricityBill)">删除</a>
                    <a v-if="item.payStatus == 1 && jurisdiction('BILL_GENERATE') && item.isSend == 1"  @click="collectionModelShow(item.waterElectricityBill,'WaterEdit')">收款</a>
                  </td>
                </tr>
              </table>
              <div class="blank-background-img" v-if="waterHistoryBillList.length == 0">
                <img src="../../../static/images/blank/bill_space.png" >
                <h2>暂无账单内容~</h2>
              </div>
              <Page :total="waterHistoryBillTotalNum"  :page-size="10" show-elevator show-total @on-change="waterSearch" v-if="waterHistoryBillList.length"></Page>
            </Tab-pane>
            <Tab-pane label="历史租金账单" name="3" v-if="activeName == 3">
              <div class="form-search-criteria">
                <div class="form-item">
                  <b>社区：</b>
                  <span>{{communityName}}</span>
                </div>
                <div class="form-item">
                  <b>房间号：</b>
                  <span>{{roomNum}}</span>
                </div>
                <!--<div class="form-item">-->
                  <!--<span>操作时间：</span>-->
                  <!--<Date-picker type="date" placeholder="选择日期" v-model="roomStartDate"></Date-picker>-->
                  <!--<span class="inline-block spanBar">--</span>-->
                  <!--<Date-picker type="date" placeholder="选择日期" v-model="roomEndDate"></Date-picker>-->
                <!--</div>-->
                <!--<div class="form-item">-->
                  <!--<div class="form-search">-->
                    <!--&lt;!&ndash;<i class="iconfont icon-sousuo"></i>&ndash;&gt;-->
                    <!--&lt;!&ndash;<Input v-model="roomSearchKey" placeholder="搜索合同的联系人或联系电话"></Input>&ndash;&gt;-->
                    <!--<input type="button" @click="roomSearch()" value="搜索">-->
                  <!--</div>-->
                <!--</div>-->
              </div>
              <table class="table ivu-table">
                <tr>
                  <th >账单日期</th>
                  <th>租期</th>
                  <th>承租人</th>
                  <th>承租人手机号</th>
                  <th>租金/月（元）</th>
                  <th>押金（元）</th>
                  <th>服务费/月（元）</th>
                  <th>合计</th>
                  <th>账单日期</th>
                  <th>状态</th>
                  <th>备注</th>
                  <th>操作</th>
                </tr>
                <tr v-for="(room,index) in roomHistoryBillList">
                  <td>{{room.billDate | timefilter("yyyy-MM-dd")}}</td>
                  <td>{{room.beginDate|timefilter("yyyy.MM.dd")}}-{{room.endDate|timefilter("yyyy.MM.dd")}}</td>
                  <td>{{room.userName}}</td>
                  <td>{{room.userPhone}}</td>
                  <td v-if="!room.isEditor">{{room.cyclePayMoney}}</td>
                  <td v-if="!room.isEditor">{{room.isFirstPay?room.deposit:''}}</td>
                  <td v-if="!room.isEditor">{{room.serviceCost}}</td>
                  <td v-if="!room.isEditor">{{room.realPayMoney}}</td>
                  <!--editRental:{-->
                  <!--rentalId:'',//租金账单ID-->
                  <!--rentMoney:'',//租金-->
                  <!--depositMoney:'',//押金-->
                  <!--serviceMoney:'',//服务费-->
                  <!--combined:'',//合计-->
                  <!--startDate:'',//开始日期-->
                  <!--endDate:''//结束日期-->
                  <!--}-->

                  <td v-if="room.isEditor"> <el-input placeholder="请输入租金"  v-model="editRental.rentMoney"   clearable></el-input></td>
                  <td v-if="room.isEditor"> <el-input placeholder="请输入押金"  disabled="true" v-if="room.isFirstPay" v-model="editRental.depositMoney" clearable></el-input></td>
                  <td v-if="room.isEditor"><el-input placeholder="请输入服务费" v-model="editRental.serviceMoney" clearable></el-input></td>
                  <!--+parseFloat(editRental.depositMoney)-->
                  <td v-if="room.isEditor">{{room.isFirstPay?parseFloat(editRental.rentMoney) +parseFloat(editRental.serviceMoney):parseFloat(editRental.rentMoney) +parseFloat(editRental.serviceMoney)}}</td>
                  <td v-if="!room.isEditor">{{room.billBeginDate |  timefilter("yyyy-MM-dd")}}- {{room.billEndDate |  timefilter("yyyy-MM-dd")}}</td>
                  <td v-if="room.isEditor">
                    <el-date-picker v-model="editRental.startDate" type="date"  placeholder="选择账单开始日期"></el-date-picker> - <el-date-picker  v-model="editRental.endDate" type="date" placeholder="选择账单结束日期"></el-date-picker>
                  </td>
                  <td>
                    <span v-if="room.billState == 1&& room.isSend">待支付</span>
                    <span v-if="room.billState == 1&& !room.isSend">未发送</span>
                    <span v-if="room.billState == 2" style="color: #ccc;">已支付</span>
                    <span v-if="room.billState == 3" style="color: red;">违约</span>
                    <span v-if="room.billState == 4">违约办结</span>
                  </td>
                  <td v-if="room.isEditor"><el-input placeholder="请输入备注"  v-model="editRental.content" clearable></el-input></td>
                  <td v-if="!room.isEditor">{{room.remark}}</td>
                  <td>
                    <a v-if="room.billState == 1 && !room.isSend && !room.isEditor " @click="updateBill(index)"> 编辑</a>
                    <a v-if="room.billState == 1 && room.isEditor" @click="saveUpdateBill(index)">保存</a>
                    <a v-if="room.billState == 1" @click="collectionModelShow(room.billId,'bill')"> 收款</a>
                    <a v-if="room.billState == 1 && !room.isSend" @click="sendBill(room.billId)"> 发送账单</a>
                    <router-link :to="{name:'billDetail',query:{billId:room.billId,type:0}}"> 账单详情</router-link>
                    <a v-if="room.billState == 1" @click="delectBill(room.billId)"> 删除</a>
                  </td>
                </tr>
              </table>
              <div class="blank-background-img" v-if="roomHistoryBillTotalNum == 0">
                <img src="../../../static/images/blank/bill_space.png" >
                <h2>暂无账单内容~</h2>
              </div>
              <Page :total="roomHistoryBillTotalNum" :current="roomContractCurrent" :page-size="10" show-elevator show-total @on-change="roomSearch" v-if="roomHistoryBillTotalNum > 0"></Page>
            </Tab-pane>
          </Tabs>
        </div>

      </div>
      <footer-box></footer-box>
    </div>

      <!--收款相关-->
    <div class="black-member-modal" v-if="collectionShow" @click="closeWhileModal()" style="z-index: 999"></div>
    <div class="blackModelCenter" v-if="collectionShow" style="height: 420px;z-index: 9999">
      <p>收款登记</p>
      <div style="text-align: center;border-bottom: solid 1px #ccc;margin-bottom: 10px;">
        <template>
          <el-radio-group v-model="type">
            <el-radio :label="2">微信付款</el-radio>
            <el-radio :label="1">支付宝付款</el-radio>
            <el-radio :label="3">银行转账</el-radio>
            <el-radio :label="4">其他</el-radio>
            <!--<el-radio :label="4"></el-radio>-->
            <el-radio :label="6">POS机刷卡</el-radio>
          </el-radio-group>
        </template>
      </div>
      <div v-if="type == 1">
        <div class="inputBox">
          <span class="span">转帐单号：</span><Input v-model="collection1.payNumbers" placeholder="凭证号"></Input>
        </div>
        <div class="inputBox">
          <span class="span">收款金额：</span><Input v-model="collection1.gatheringMoney" placeholder="收款金额" @on-change="moneyChange('1',collection1.gatheringMoney)"></Input>
        </div>
        <div class="inputBox" style="text-align: left;padding-left: 50px;">
          <span class="span">转账时间：</span>
          <Date-picker type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" style="width: 150px;margin: 0;" placeholder="选择日期"  v-model="collection1.payDate"></Date-picker>
        </div>
      </div>
      <div v-if="type == 2">
        <div class="inputBox">
          <span class="span">转帐单号：</span><Input v-model="collection2.payNumbers" placeholder="凭证号"></Input>
        </div>
        <div class="inputBox">
          <span class="span">收款金额：</span><Input v-model="collection2.gatheringMoney" placeholder="收款金额" @on-change="moneyChange('2',collection2.gatheringMoney)"></Input>
        </div>
        <div class="inputBox" style="text-align: left;padding-left: 50px;">
          <span class="span">转账时间：</span>
          <Date-picker type="datetime" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" style="width: 150px;margin: 0;" placeholder="选择日期"  v-model="collection2.payDate"></Date-picker>
        </div>
      </div>
      <div v-if="type == 3">
        <div class="inputBox">
          <span class="span">银行流水号：</span><Input v-model="collection3.payNumbers" placeholder="银行流水号"></Input>
        </div>
        <div class="inputBox">
          <span class="span">凭证号：</span><Input v-model="collection3.voucherNumbers" placeholder="凭证号"></Input>
        </div>
        <div class="inputBox">
          <span class="span">收款金额：</span><Input v-model="collection3.gatheringMoney" placeholder="收款金额" @on-change="moneyChange('3',collection3.gatheringMoney)"></Input>
        </div>
        <div class="inputBox" style="text-align: left;padding-left: 50px;">
          <span class="span">转账时间：</span>
          <Date-picker type="datetime" format="yyyy-MM-dd HH:mm:ss" style="width: 150px;margin: 0;" placeholder="选择日期"  v-model="collection3.payDate"></Date-picker>
        </div>
      </div>
      <div v-if="type == 4">
        <div class="inputBox">
          <span class="span">收款方式：</span><Input v-model="collection4.payWay" placeholder="收款方式"></Input>
        </div>
        <div class="inputBox">
          <span class="span">收款金额：</span><Input v-model="collection4.gatheringMoney" placeholder="收款金额" @on-change="moneyChange('4',collection4.gatheringMoney)"></Input>
        </div>
        <div class="inputBox">
          <span class="span">收款说明：</span><Input v-model="collection4.remark" placeholder="收款说明"></Input>
        </div>
      </div>

      <div v-if="type == 6">
        <div class="inputBox">
          <span class="span">终端编号：</span><Input v-model="collection6.payNumbers" placeholder="银行流水号"></Input>
        </div>
        <div class="inputBox">
          <span class="span">凭证号：</span><Input v-model="collection6.voucherNumbers" placeholder="凭证号"></Input>
        </div>
        <div class="inputBox">
          <span class="span">参考号：</span><Input v-model="collection6.referNum" placeholder="凭证号"></Input>
        </div>
        <div class="inputBox">
          <span class="span">金额：</span><Input v-model="collection6.gatheringMoney" placeholder="收款金额" @on-change="moneyChange('6',collection6.gatheringMoney)"></Input>
        </div>
        <div class="inputBox" style="text-align: left;padding-left: 50px;">
          <span class="span">转账时间：</span>
          <Date-picker style="width: 150px;margin: 0;" type="datetime" format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期"  v-model="collection6.payDate"></Date-picker>
        </div>
      </div>

      <h5 style="text-align: center;color: red;">{{messageError}}</h5>
      <div class="modal-btn">
        <Button type="primary" @click="allIncome()">确认</Button>
        <Button  @click="setWhileMember()" style="margin-left: 50px;">取消</Button>
      </div>
      <div class="modal-close-btn" @click="closeWhileModal()">
        <Icon type="ios-close-empty"></Icon>
      </div>
    </div>
    <!--收款相关-->

      <warning-modal :warning-message="warningMessage" @closeWarningModal="closeWarningModal()" v-if="warningModal"></warning-modal>
      <success-modal :success-message="successMessage" v-if="successModal"></success-modal>
  </div>

</template>

<script>


  import menuBox from '../../components/menuBox.vue';
  import  rightHeader from '../../components/rightHeader.vue';
  import  footerBox from '../../components/footerBox.vue';
  import successModal from '../../components/successModal.vue';
  import warningModal from '../../components/warningModal.vue';
  import {allCommunity,roomContract,officeContract,propertyContract,CxkjBillSend500169,CxkjBillDelete500170,CxkjBillGathering500168,CxkjBillEdit500167,CxkjWaterBillGathering500165,CxkjWaterEnergyBillSend200239,RoomBillHistoryList500104,WaterEnergyBillHistoryList500106,CxkjWaterEnergyBillUpdate200233,WaterEnergyHistoryList,CxkjWaterEnergyBillDelete200237} from '../api.js';
  import qs from 'qs'

  export default {
    components:{
      rightHeader,
      menuBox,
      footerBox,
      successModal,
      warningModal
    },
    data () {
      return {
        activeTabName:"billManagement",
        activeName:"1",
        RoomContractSelects:[{
          communityId: -1,
          communityName: '全部'
        }],//下拉选
        roomCommunity:-1,//当前选中
        roomHistoryBillList:[],//公寓合同数据
        roomHistoryBillTotalNum:0,//公寓合同总条数
        roomContractCurrent:1,//公寓合同当前页
        roomStartDate:"",//公寓签约开始时间
        roomEndDate:"",//公寓签约结束时间
        roomSearchKey:"",//公寓搜索关键字
        roomId:null,
        roomHistoryRoomNum:"",
        roomHistoryHousetypeName:"",
        waterHistoryBillList:[],
        waterHistoryBillTotalNum:0,
        communityName:"",
        roomNum:'',
        isActives:1,
        mrStartTime:'',//抄表开始时间
        mrEndTime:'',//抄表结束时间
        WaterEnergyHistory:[],//历史抄表
        WaterEnergyHistoryTotalNum:0,//历史抄表总页数
        WaterEnergyHistoryCurrent:0,//历史抄表总条数
        successModal: false,
        warningModal: false,
        successMessage: '设置成功',
        warningMessage: '',
        waterEditState:[],//水电编辑状态
        lastTimeWater:[],//上次抄水表时间
        currentWater:[],//本次抄水表时间
        lastTimeElecTricity:[],//上次抄电表时间
        currentElecTricity:[],//本次抄电表时间
        editorWater:{
          lastTimeWater:'',//上次读水表时间
          lastTimeWaterData:'',//上次读水表读数
          currentWater:'',//本次读水表时间
          currentWaterData:'',//本次读水表读数
          lastTimeElecTricity:'',//上次读电表时间
          lastTimeElecTricityData:'',//上次读电表读数
          currentElecTricity:'',//本次读电表时间
          currentElecTricityData:'',//本次读电表读数
          waterPrice:0,//水费总价
          elecTricityrice:0,//电费总价
          totalPrice:'',//合计
          content:''//备注
        },
        //水电账单收款相关字段
        paymentType:'',//收款类型
        collectionShow:'',//弹框显示
        billId:'',//水电账单ID
        //时间初始化
        collection1:{
          payNumbers:"",
          gatheringMoney:"",
          payDate:new Date().Format("yyyy-MM-dd hh:mm:ss")
        },
        collection2:{
          payNumbers:"",
          gatheringMoney:"",
          payDate:new Date().Format("yyyy-MM-dd hh:mm:ss")
        },
        collection3:{
          payNumbers:"",
          voucherNumbers:"",
          gatheringMoney:"",
          payDate:new Date().Format("yyyy-MM-dd hh:mm:ss")
        },
        collection4:{
          payWay:"",
          gatheringMoney:"",
          remark:""
        },
        collection6:{
          payNumbers:"",
          voucherNumbers:"",
          referNum:"",
          gatheringMoney:"",
          payDate:new Date().Format("yyyy-MM-dd hh:mm:ss")
        },
        messageError:'',
        type:2,//默认收款类型
        //编辑租金账单相关参数
        editRental:{
          rentalId:'',//租金账单ID
          rentMoney:'',//租金
          depositMoney:'',//押金
          serviceMoney:'',//服务费
          combined:'',//合计
          startDate:'',//开始日期
          endDate:'',//结束日期
          content:''//备注
        },
        billType:''//账单类别
      }
    },
    mounted(){
      this.roomId = this.$route.query.roomId;
      var tab = this.$route.query.tab;
      if(tab){
        this.activeName = tab;
      }
      this.roomHistoryRoomNum = sessionStorage.getItem('roomHistoryRoomNum');
      this.roomHistoryHousetypeName = sessionStorage.getItem('roomHistoryHousetypeName');
      this.communityName = sessionStorage.getItem('roomHistoryCommunityName');
      this.getWaterEnergyHistoryList();
      this.getCommunityData();
      this.getRoomHistoryBill({roomId:this.roomId,pageNum:1});
      this.getWaterBillList({roomId:this.roomId,pageNum:1});
    },
    methods: {
      setIsActive(num){//切换抄表类型 1 水表 2电表
        this.isActives = num
        this.page = 1
        this.mrStartTime = ''
        this.mrEndTime = ''

        this.getWaterEnergyHistoryList()
      },
      getWaterEnergyHistoryList(){//获取历史抄表
        let vm = this
        vm.$http.post(WaterEnergyHistoryList,qs.stringify({
          roomId:parseInt(vm.$route.query.roomId),
          type:vm.isActives,
          pageNum:vm.page || 1,
          startDate:vm.mrStartTime,
          endDate:vm.mrEndTime
        })).then(res => {
            if(res.status == 200 && res.data.code == 10000){
              vm.WaterEnergyHistory = res.data.result.waterEnergyList
              vm.WaterEnergyHistoryTotalNum = res.data.result.totalNum
              vm.WaterEnergyHistoryCurrent = res.data.result.WaterEnergyHistoryCurrent
            }
          })
      },
      closeWarningModal() {
        this.warningModal = false;
      },
      getCommunityData(){
        var that = this;
        this.$http.get(allCommunity)
          .then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              that.RoomContractSelects = that.RoomContractSelects.concat(res.data.entity);
            }
          })
      },
      /**
       * 获取租金账单列表
       **/
      getRoomHistoryBill(data){
        var that = this;
        this.$http.get(RoomBillHistoryList500104,{params:data})
          .then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              let pageBean = res.data.result;
              that.communityName = res.data.result.communityName
              that.roomNum = res.data.result.roomNum
              that.roomHistoryBillList = pageBean.roomList;
              for(let i=0;i<pageBean.roomList.length;i++){
                that.$set(that.roomHistoryBillList[i],'isEditor',false)
              }
              that.roomHistoryBillTotalNum = pageBean.totalNum;
            }
            else if(res.data.code == 10008){
              that.roomHistoryBillList = [];
              that.roomHistoryBillTotalNum = 0;
              that.warningMessage = '没有更多数据了'
              that.warningModal = true
            }else {
              that.warningMessage = res.data.content
              that.warningModal = true
            }
          }).catch(err=>{
          that.warningMessage = '查询失败'
          that.warningModal = true
        })
      },
      /**
       * 编辑租金账单，显示输入框
       **/
      updateBill(index){
        let vm = this
        vm.$set(vm.roomHistoryBillList[index],'isEditor',true)

        vm.editRental={
        rentalId:vm.roomHistoryBillList[index].billId?vm.roomHistoryBillList[index].billId:'',//租金账单I
        rentMoney:vm.roomHistoryBillList[index].cyclePayMoney?vm.roomHistoryBillList[index].cyclePayMoney:'',//租
        depositMoney:'',//押
        serviceMoney:vm.roomHistoryBillList[index].serviceCost?vm.roomHistoryBillList[index].serviceCost:'',//服务
        combined:'',//合
          startDate:vm.roomHistoryBillList[index].billBeginDate?vm.roomHistoryBillList[index].billBeginDate:'',//开始日
          endDate:vm.roomHistoryBillList[index].billEndDate?vm.roomHistoryBillList[index].billEndDate:'',//结束日
          content:vm.roomHistoryBillList[index].remark?vm.roomHistoryBillList[index].remark:''//备注
         }
      },
      /**
       * 保存租金账单
       **/
      saveUpdateBill(index){
        let vm = this
        // editRental:{
        //   rentalId:'',//租金账单ID
        //     rentMoney:'',//租金
        //     depositMoney:'',//押金
        //     serviceMoney:'',//服务费
        //     combined:'',//合计
        //     startDate:'',//开始日期
        //     endDate:''//结束日期
        // },
        if(vm.editRental.rentMoney == '' || vm.editRental.serviceMoney == '' || vm.editRental.startDate == '' || vm.editRental.endDate == ''){
          vm.warningMessage='请将信息填写完整'
          vm.warningModal = true
          return
        }
        vm.editRental.combined = parseFloat(vm.editRental.rentMoney) +parseFloat(vm.editRental.serviceMoney)
        vm.$http.post(CxkjBillEdit500167,qs.stringify({
          billId:vm.editRental.rentalId,
          cyclePayMoney:vm.editRental.rentMoney,
          // deposit:vm.editRental.depositMoney,
          serviceCost:vm.editRental.serviceMoney,
          realPayMoney:vm.editRental.combined,
          billBeginDate:new Date(vm.editRental.startDate).Format("yyyy-MM-dd hh:mm:ss"),
          billEndDate:new Date(vm.editRental.endDate).Format("yyyy-MM-dd hh:mm:ss"),
          remark:vm.editRental.content
        })).then(res => {
          if(res.data.code == 10000){
            vm.successMessage='修改租金账单成功'
            vm.successModal = true
            vm.getRoomHistoryBill({roomId:vm.roomId,pageNum:vm.page});
            setTimeout(() => {
              vm.successModal = false;
            }, 1000);
          }else {
            vm.warningMessage=res.data.content+res.data.code
            vm.warningModal = true
            vm.$set(vm.roomHistoryBillList[index],'isEditor',false)
          }
        }).catch(function(err){
          vm.warningMessage='修改租金账单失败'
          vm.warningModal = true
          vm.$set(vm.roomHistoryBillList[index],'isEditor',false)
          console.log(err);
        })
      },
      /**
       * 删除租金账单
       **/
      delectBill(billId){
        let vm = this
        vm.$http.post(CxkjBillDelete500170,qs.stringify({
          billId:billId
        })).then(res => {
          if(res.data.code == 10000){
            vm.successMessage='删除租金账单成功'
            vm.successModal = true
            vm.getRoomHistoryBill({roomId:vm.roomId,pageNum:vm.page});
            setTimeout(() => {
              vm.successModal = false;
            }, 1000);
          }else {
            vm.warningMessage=res.data.content+res.data.code
            vm.warningModal = true
          }
        }).catch(function(err){
          vm.warningMessage='删除租金账单失败'
          vm.warningModal = true
          console.log(err);
        })
      },
      /**
       * 发送租金账单
       **/
      sendBill(billId){
        let vm = this
        vm.$http.post(CxkjBillSend500169,qs.stringify({
          billId:billId
        })).then(res => {
          if(res.data.code == 10000){
            vm.successMessage='发送租金账单成功'
            vm.successModal = true
            vm.getRoomHistoryBill({roomId:vm.roomId,pageNum:vm.page});
            setTimeout(() => {
              vm.successModal = false;
            }, 1000);
          }else {
            vm.warningMessage=res.data.content+res.data.code
            vm.warningModal = true
          }
        }).catch(function(err){
          vm.warningMessage='发送租金账单失败'
          vm.warningModal = true
          console.log(err);
        })
      },
      waterElectricitySearch(){
        let vm = this
        if(vm.mrStartTime && vm.mrEndTime &&vm.mrStartTime < new Date() && vm.mrStartTime < vm.mrEndTime ){
          vm.mrStartTime = vm.dateTime(vm.mrStartTime.getTime())
          vm.mrEndTime = vm.dateTime(vm.mrEndTime.getTime())
          vm.page = 1
          vm.getWaterEnergyHistoryList()
        }else {
          vm.warningMessage = '请选择有效的时间'
          vm.warningModal = true
        }
      },
      roomSearch(page){
        let data = {
          pageNum:page || 1,
          roomId:this.roomId
        }
        this.getRoomHistoryBill(data);
      },


      /**
       * 获取水电抄表历史
       * **/
      getWaterBillList(data){
        let that = this;
        this.$http.get(WaterEnergyBillHistoryList500106,{params:data})
          .then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              let pageBean = res.data.result;
              that.waterHistoryBillList = pageBean.waterList;
              that.waterHistoryBillTotalNum = pageBean.totalNum;
              for(let i=0;i<pageBean.waterList.length;i++){
                that.$set(that.waterHistoryBillList[i],'isEditor',false)
                that.lastTimeWater[i]=pageBean.waterList[i].lastTimeWater
                that.currentWater[i]=pageBean.waterList[i].currentWater
                that.lastTimeElecTricity[i]=pageBean.waterList[i].lastTimeElecTricity
                that.currentElecTricity[i]=pageBean.waterList[i].currentElecTricity
              }
            }
            if(res.data.code == 10008){
              that.waterHistoryBillList = [];
              that.waterHistoryBillTotalNum = 0;
            }
          })
      },
      /**
       * 编辑水电账单按钮事件
       * **/
      editWaterEditBill(index){
        let that = this
        // that.$set(that.waterEditState,index,true)
        that.editorWater.content =that.waterHistoryBillList[index].content?that.waterHistoryBillList[index].content:''
        that.$set(that.waterHistoryBillList[index],'isEditor',true)
        console.log(that.waterHistoryBillList[index].isEditor+'index')
      },
      /**
       * 获取上次水表读数
       * **/
      getLastTimeWaterData(waterIndex,index){
        this.editorWater.lastTimeWater =this.lastTimeWater[index][waterIndex].createTime
        this.editorWater.lastTimeWaterData = this.lastTimeWater[index][waterIndex].waterElectricityData
        this.editorWater.waterPrice = (parseFloat(this.editorWater.currentWaterData) - parseFloat(this.editorWater.lastTimeWaterData)) *this.waterHistoryBillList[index].waterPrice
        this.editorWater.totalPrice =this.editorWater.waterPrice + this.editorWater.elecTricityrice

      },
      /**
       * 获取本次水表读数
       * **/
      getCurrentWaterData(waterIndex,index){
        this.editorWater.currentWater = this.currentWater[index][waterIndex].createTime
        this.editorWater.currentWaterData = this.currentWater[index][waterIndex].waterElectricityData
        this.editorWater.waterPrice = (parseFloat(this.editorWater.currentWaterData) - parseFloat(this.editorWater.lastTimeWaterData)) *this.waterHistoryBillList[index].waterPrice
        this.editorWater.totalPrice =this.editorWater.waterPrice + this.editorWater.elecTricityrice

      },
      /**
       * 获取上次电表读数
       * **/
      getLastTimeElecTricityData(waterIndex,index){
        this.editorWater.lastTimeElecTricity = this.lastTimeElecTricity[index][waterIndex].createTime
        this.editorWater.lastTimeElecTricityData = this.lastTimeElecTricity[index][waterIndex].waterElectricityData
        this.editorWater.elecTricityrice = (parseFloat(this.editorWater.currentElecTricityData) - parseFloat(this.editorWater.lastTimeElecTricityData)) *this.waterHistoryBillList[index].energyPrice
        this.editorWater.totalPrice =this.editorWater.waterPrice + this.editorWater.elecTricityrice
      },
      /**
       * 获取本次电表读数
       * **/
      getCurrentElecTricityData(waterIndex,index){
        this.editorWater.currentElecTricity = this.currentElecTricity[index][waterIndex].createTime
        this.editorWater.currentElecTricityData =this.currentElecTricity[index][waterIndex].waterElectricityData
        this.editorWater.elecTricityrice = (parseFloat(this.editorWater.currentElecTricityData) - parseFloat(this.editorWater.lastTimeElecTricityData)) *this.waterHistoryBillList[index].energyPrice
        this.editorWater.totalPrice =this.editorWater.waterPrice + this.editorWater.elecTricityrice
      },
      /**
       * 保存修改的水电账单
       **/
      saveWaterEditBill(index){
        let vm = this,
          billDate = [{waterEnergyName:'水表抄表日期',waterEnergyDate:this.editorWater.lastTimeWater+'-'+this.editorWater.currentWater },{waterEnergyName:'电表抄表日期',waterEnergyDate:this.editorWater.lastTimeElecTricity+'-'+this.editorWater.currentElecTricity }]
        // if(vm.editorWater.currentWaterData == '' || vm.editorWater.waterPrice== '' || vm.editRental.startDate == '' || vm.editRental.endDate == ''){
        //   vm.warningMessage='请将信息填写完整'
        //   vm.warningModal = true
        //   return
        // }

        this.$http.post(CxkjWaterEnergyBillUpdate200233,qs.stringify({
          waterElectricityBill:vm.waterHistoryBillList[index].waterElectricityBill,
          waterData:vm.editorWater.currentWaterData,
          waterSize:parseFloat(vm.editorWater.currentWaterData) - parseFloat(vm.editorWater.lastTimeWaterData),
          waterCost:vm.editorWater.waterPrice,
          energyData:vm.editorWater.currentElecTricityData,
          energySize:parseFloat(this.editorWater.currentElecTricityData) - parseFloat(this.editorWater.lastTimeElecTricityData),
          energyCost:vm.editorWater.elecTricityrice,
          billDate:JSON.stringify(billDate),
          content:vm.editorWater.content
        })).then(res => {
          console.log(res.data)
          if(res.data.code == 10000){
            vm.successMessage='保存水电账单成功'
            vm.successModal = true
            vm.getWaterBillList({roomId:vm.roomId,pageNum:vm.page});
            setTimeout(() => {
              vm.successModal = false;
            }, 1000);
          }else {
            vm.warningMessage=res.data.content+res.data.code
            vm.warningModal = true
            vm.$set(vm.waterHistoryBillList[index],'isEditor',false)
          }
        }).catch(function(err){
          vm.warningMessage='保存水电账单失败'
          vm.warningModal = true
          vm.$set(vm.waterHistoryBillList[index],'isEditor',false)
          console.log(err);
        })
      },
      /**
       * 删除水电账单
       **/
      deleteWaterEditBill(waterElectricityBill){
        let vm = this
        vm.$http.post(CxkjWaterEnergyBillDelete200237,qs.stringify({
          waterElectricityBill:waterElectricityBill
        })).then(res => {
          if(res.data.code == 10000){
            vm.successMessage='删除水电账单成功'
            vm.successModal = true
            vm.getWaterBillList({roomId:vm.roomId,pageNum:vm.page});
            setTimeout(() => {
              vm.successModal = false;
            }, 1000);
          }else {
            vm.warningMessage=res.data.content+res.data.code
            vm.warningModal = true
          }
        }).catch(function(err){
          vm.warningMessage='删除水电账单失败'
          vm.warningModal = true
          console.log(err);
        })
      },
      /**
       * 发送水电账单
       **/
      sendWaterEditBill(waterElectricityBill){
        let vm = this
        vm.$http.post(CxkjWaterEnergyBillSend200239,qs.stringify({
          waterElectricityBill:waterElectricityBill
        })).then(res => {
          if(res.data.code == 10000){
            vm.successMessage='发送水电账单成功'
            vm.successModal = true
            vm.getWaterBillList({roomId:vm.roomId,pageNum:vm.page});
            setTimeout(() => {
              vm.successModal = false;
            }, 1000);
          }else {
            vm.warningMessage=res.data.content+res.data.code
            vm.warningModal = true
          }
        }).catch(function(err){
          vm.warningMessage='发送水电账单失败'
          vm.warningModal = true
          console.log(err);
        })
      },
      /**
       * 水电账单收款弹框
       * **/
      collectionModelShow(waterElectricityBill,billType){
        let that = this;
        // this.paymentType = 'waterElectricity';
        this.collectionShow = true;
        this.billId = waterElectricityBill;
        this.billType = billType
        // this.signId = contractSignId;

        //初始化收款时间
        this.collection1.payDate = new Date().Format('yyyy-MM-dd hh:mm:ss')
        this.collection2.payDate = new Date().Format('yyyy-MM-dd hh:mm:ss')
        this.collection3.payDate = new Date().Format('yyyy-MM-dd hh:mm:ss')
        this.collection6.payDate = new Date().Format('yyyy-MM-dd hh:mm:ss')
        this.messageError = "";
      },
      /**
       * 金额正则
       * @param value
       */
      moneyChange(number,value){
        if(/(^[1-9](\d+)?(\.\d{1,2})?$)|(^(0){1}$)|(^\d\.\d{1,2}?$)/.test(value)){
          switch (number) {
            case '1':
              this.isMoney1 = true;
              break;
            case '2':
              this.isMoney2 = true;
              break;
            case '3':
              this.isMoney3 = true;
              break;
            case '4':
              this.isMoney4 = true;
              break;
            case '6':
              this.isMoney6 = true;
              break;
          }
        }else{
          switch (number) {
            case '1':
              this.isMoney1 = false;
              break;
            case '2':
              this.isMoney2 = false;
              break;
            case '3':
              this.isMoney3 = false;
              break;
            case '4':
              this.isMoney4 = false;
              break;
            case '6':
              this.isMoney6 = false;
              break;
          }
        }
        this.messageError = "";
      },
      /**
       * 收款弹框隐藏
       **/
      closeWhileModal(){
        this.collectionShow = false;
        for(let key in this.collection1){
          this.collection1[key] = "";
        }
        for(let key in this.collection2){
          this.collection1[key] = "";
        }
        for(let key in this.collection3){
          this.collection1[key] = "";
        }
        for(let key in this.collection4){
          this.collection1[key] = "";
        }
        for(let key in this.collection6){
          this.collection1[key] = "";
        }
      },
      /**
       * 全部收款
       * @param value
       */
      allIncome(){
        let that = this;
        let _this = this;
        let params = {};
        switch(this.type){
          case 1:
            if(_this.collection1.payNumbers == "" || _this.collection1.gatheringMoney=="" ){
              _this.messageError = "收款信息未填写完整！";
              return;
            }
            if(!_this.isMoney1){
              _this.messageError = "请输入合法的金额！";
              return;
            }else{
              _this.messageError = "";
            }
            params = _this.collection1;
            params.payDate = new Date(_this.collection1.payDate).Format("yyyy-MM-dd hh:mm:ss")
            break;
          case 2:
            if(_this.collection2.payNumbers == "" || _this.collection2.gatheringMoney=="" ){
              _this.messageError = "收款信息未填写完整！";
              return;
            }
            if(!_this.isMoney2){
              _this.messageError = "请输入合法的金额！";
              return;
            }else{
              _this.messageError = "";
            }
            params = _this.collection2;
            params.payDate = new Date(_this.collection2.payDate).Format("yyyy-MM-dd hh:mm:ss")
            break;
          case 3:
            if(_this.collection3.payNumbers == "" ||  _this.collection3.voucherNumbers == "" ||  _this.collection3.gatheringMoney==""){
              _this.messageError = "收款信息未填写完整！";
              return;
            }
            if(!_this.isMoney3){
              _this.messageError = "请输入合法的金额！";
              return;
            }else{
              _this.messageError = "";
            }
            params = _this.collection3;
            params.payDate = new Date(_this.collection3.payDate).Format("yyyy-MM-dd hh:mm:ss");
            break;
          case 4:
            if(_this.collection4.remark == "" || _this.collection4.gatheringMoney=="" || _this.collection4.payWay==""){
              _this.messageError = "收款信息未填写完整！";
              return;
            }
            if(!_this.isMoney4){
              _this.messageError = "请输入合法的金额！";
              return;
            }else{
              _this.messageError = "";
            }
            params = _this.collection4;
            break;
          case 6:
            if(_this.collection6.referNum == "" || _this.collection6.voucherNumbers == "" ||  _this.collection6.gatheringMoney==""){
              _this.messageError = "收款信息未填写完整！";
              return;
            }
            if(!_this.isMoney6){
              _this.messageError = "请输入合法的金额！";
              return;
            }else{
              _this.messageError = "";
            }
            params = _this.collection6;
            params.payDate = new Date(_this.collection6.payDate).Format("yyyy-MM-dd hh:mm:ss")
            break;

        }
        params.billId = _this.billId;
        params.type = _this.type;
        /**
         * 判断收款类别，水电或者租金
         **/
        let url = ''
          if(this.billType == 'WaterEdit'){
            url = CxkjWaterBillGathering500165
          }else if(this.billType == 'bill'){
            url = CxkjBillGathering500168
          }
        this.$http.post(url,
          qs.stringify(params)
        ).then(function(res){
          console.log(res);
          if(res.data.code == 10000 && res.status == 200){
            that.collectionShow = false;
            that.successMessage = "收款成功!";
            that.successModal = true;
            if(that.billType == 'WaterEdit'){
              that.getWaterBillList({roomId:that.roomId,pageNum:that.page});
            }else if(that.billType == 'bill'){
              that.getRoomHistoryBill({roomId:that.roomId,pageNum:that.page});
            }

            setTimeout(function(){
              that.successModal = false;
            },1000);

            that.collectionShow=''
              that.billId=''
            that.collection1={
              payNumbers:"",
                gatheringMoney:"",
                payDate:new Date().Format("yyyy-MM-dd hh:mm:ss")
            }
            that.collection2={
              payNumbers:"",
                gatheringMoney:"",
                payDate:new Date().Format("yyyy-MM-dd hh:mm:ss")
            }
            that. collection3={
              payNumbers:"",
                voucherNumbers:"",
                gatheringMoney:"",
                payDate:new Date().Format("yyyy-MM-dd hh:mm:ss")
            }
            that.collection4={
              payWay:"",
                gatheringMoney:"",
                remark:""
            }
            that.collection6={
              payNumbers:"",
                voucherNumbers:"",
                referNum:"",
                gatheringMoney:"",
                payDate:new Date().Format("yyyy-MM-dd hh:mm:ss")
            },
            that.messageError=''
              that.type=2//默认收款类型
          }else{
            that.collectionShow = false;
            that.warningMessage = res.data.content;
            that.warningModal = true;
          }
          //清空
          that.closeWhileModal();
        })
      },
      /**
       * 获取水电抄表列表
       * **/
      getbillPayment(data){
        var that = this;
        this.$http.get(billList500098,{params:data})
          .then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              var pageBean = res.data.result;
              that.billPaymentList = pageBean.waterList;
              that.billTotalNum = pageBean.totalNum;
              for(var i =0;i<that.billPaymentList.length;i++){
                that.$set(that.billPaymentList[i],"isEdit",false);
                that.$set(that.billPaymentList[i],"content","修改账单");
                if(!that.billPaymentList[i].roomWater || (that.billPaymentList[i].roomWater && (parseFloat(that.billPaymentList[i].roomWater) == that.billPaymentList[i].waterData))){
                  that.billPaymentList[i].roomWater = that.billPaymentList[i].waterInit;
                }
                if(!that.billPaymentList[i].roomElectric || (that.billPaymentList[i].roomElectric && (parseFloat(that.billPaymentList[i].roomElectric) == that.billPaymentList[i].energyData))){
                  that.billPaymentList[i].roomElectric = that.billPaymentList[i].electricInit;
                }
              }
            }
            if(res.data.code == 10001){
              that.billPaymentList = [];
              that.billTotalNum = 0;
            }
          })
      },
      waterSearch(page){
        var data = {
          pageNum:page || 1,
          roomId:this.roomId
        }
        this.getWaterBillList(data);
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
  @import '../../sass/page/_communityManagement.scss';

  #history-meter-wrap{
    height: 100%;
    min-height: 1000px;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 3px 1px #ccc;
    .ivu-tabs-card{
      box-shadow:none;
    }
    .form-item .add{
      display: inline-block;
      width: 140px;
      height: 34px;
      border-radius: 5px;
      border: 1px solid #038be2;
      text-align: center;line-height: 34px;
      font-size: 12px;
      font-weight: bold;
      span{
        font-size:16px;
      }
    }
    table{
      tr{
        td,th{
          text-align: center;
          min-width: 70px;
          max-width: 300px;
        }
      }
    }
    .ivu-tabs-bar{
      background-color: rgb(240,240,240);
    }
    .blank-background-img{
      text-align: center;
      img{
        padding-top: 150px;
      }
      h2{
        color: #999;
      }
    }
  }

  .zhezhao{
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #666;
    opacity: 0.5;
    z-index: 999;
  }

</style>
