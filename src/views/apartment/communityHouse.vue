<template>

  <div>
    <menu-box :active-tab-name="activeTabName"></menu-box>
    <div class="right-content" id="right-content" style="height: 100%!important;">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="ivu-site">
          <span>您现在的位置：</span>
          <router-link class="active" to="/apartment/communityManagement">社区管理>公寓</router-link>
        </div>
        <div class="ivu-bar-title">
          <h3><i class="icon icon-iden"></i>社区资源</h3>
          <span>{{communityName}}</span>
        </div>
        <div class="message-tis community-house-wrap">
          <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
            <el-tab-pane :label="'公寓('+CommunityRoomCount+')'" name="first" v-if="hides1">
              <div class="house_hu">
                <router-link :to="{name:'communityHouseType',query:{communityId:communityId}}" class="hux" v-if="jurisdiction('COMMUNITY_UPDATE')">管理户型</router-link>
                <a href="javascript:;" class="adds" @click="openFloorModal()" v-if="jurisdiction('COMMUNITY_INCREASE')">添加楼层</a>
              </div>
              <div class="ls" v-if="!loading">
                <div class="lishi" v-for="(floorData,index) in filterRootData">
                  <div class="house_xq">
                    <img src="../../../static/images/temp/logo2_03.png">
                    <a class="ceng" @click="hideTable(index)">{{floorData.floorName}}层</a>
                    <a class="del" @click="openDeleteModal(floorData.floorId)" v-if="jurisdiction('COMMUNITY_DELETE')">删除楼层</a>
                    <a class="isste" @click="copyFloor(floorData.floorId)" v-if="jurisdiction('COMMUNITY_UPDATE')">快速复制楼层</a>
                    <a class="isste" @click="openEditFloorModal(index)" v-if="jurisdiction('COMMUNITY_UPDATE')">修改楼层信息</a>
                    <router-link :to="{ name: 'communityAddRoom' , query: { floorName: floorData.floorName,communityId:floorData.communityId,floorId:floorData.floorId}}" class="adda" v-if="jurisdiction('COMMUNITY_INCREASE')">批量添加房间</router-link>
                  </div>
                  <div class="house_xqb" v-if="floorData.showTable">
                    <el-table
                      :data="floorData.cxkjCommunityListRoom"
                      border
                      style="width: 100%">
                      <template scope="scope" v-if="false">
                        <el-table-column
                          label="房间"
                          width="180">
                          <template scope="scope">
                           <span>{{scope.row.roomNum}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="houseTypeStr"
                          label="户型"
                          width="180">
                        </el-table-column>
                        <el-table-column
                          prop="roomFurniture"
                          label="家具电器">
                        </el-table-column>
                        <el-table-column
                          label="租金(元/月)">
                          <template scope="scope">
                            <span style="color: red">{{scope.row.roomRent}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column
                          label="短租">
                          <template scope="scope">
                            <span v-if="scope.row.pmsRoom">是</span>
                            <span v-else>否</span>
                          </template>
                        </el-table-column>
                        <el-table-column
                          label="水表/水费">
                          <template scope="scope">
                            <span v-if="scope.row.roomLockWaterElect">
                              <span v-if="scope.row.roomLockWaterElect.waterStatus == 0">在线 </span>
                              <span v-if="scope.row.roomLockWaterElect.waterStatus == 1">离线 </span>
                              <span v-if="scope.row.roomLockWaterElect.waterStatus == 2">冻结 </span>
                              <span v-else>未在线 </span>
                            </span>
                            <span>
                              <span v-if="scope.row.waterType == 1">按量计费</span>
                              <span v-else-if="scope.row.waterType == 2">按人计费</span>
                              <span v-else>未配置</span>
                            </span>
                          </template>
                        </el-table-column>
                        <el-table-column
                          label="电表/电费">
                          <template scope="scope">
                            <span v-if="scope.row.roomLockWaterElect">
                              <span v-if="scope.row.roomLockWaterElect.electricityStatus==0">在线</span>
                              <span v-if="scope.row.roomLockWaterElect.electricityStatus==1">离线</span>
                              <span v-if="scope.row.roomLockWaterElect.electricityStatus==2">关闭</span>
                              <span v-else>未在线 </span>
                            </span>
                            <span>
                              <span v-if="scope.row.electricType == 1">按量计费</span>
                              <span v-else-if="scope.row.electricType == 2">按人计费</span>
                              <span v-else>未配置</span>
                            </span>

                          </template>
                        </el-table-column>
                        <el-table-column
                          label="智能门锁">
                          <template scope="scope">
                            <span v-if="scope.row.roomLockWaterElect">
                              <span v-if="scope.row.roomLockWaterElect.lockStatus==1">在线</span>
                              <span v-else-if="scope.row.roomLockWaterElect.lockStatus==2">离线</span>
                              <span v-else-if="scope.row.roomLockWaterElect.lockStatus==3">关闭</span>
                              <span v-else>未配置</span>
                            </span>
                          </template>
                        </el-table-column>
                        <el-table-column
                          label="状态">
                          <template scope="scope">
                            <span v-if="scope.row.roomStatus == 0" style="color: rgb(46,192,172);">配置中</span>
                            <span v-else-if="scope.row.roomStatus == 1" style="color: rgb(255,102,18);">待出租</span>
                            <span v-else-if="scope.row.roomStatus == 2" >已出租</span>
                          </template>
                        </el-table-column>
                        <el-table-column
                          label="操作">
                          <template scope="scope">
                            <span v-if="scope.row.roomStatus == 2 && jurisdiction('COMMUNITY_UPDATE')" style="color: #ccc;">编辑</span>
                            <span v-if="scope.row.roomStatus == 2 && jurisdiction('COMMUNITY_DELETE')" style="color: #ccc;">删除</span>
                            <el-button v-if="scope.row.roomStatus != 2 && jurisdiction('COMMUNITY_UPDATE')" type="text" size="small" @click="editRoom(floorData.cxkjCommunityListRoom[scope.$index].roomId,floorData.floorName,floorData.communityId,floorData.floorId)">编辑</el-button>
                            <el-button v-if="scope.row.roomStatus != 2 && jurisdiction('COMMUNITY_DELETE')" type="text" size="small" @click="deleteRomm(floorData.cxkjCommunityListRoom[scope.$index],scope.$index,index)">删除</el-button>
                          </template>
                        </el-table-column>
                      </template>
                    </el-table>
                  </div>
                </div>
              </div>
              <!--<div class="blank-background-img" v-if="CommunityRoomCount == 0">-->
                <!--<img src="../../../static/images/blank/house_space.png" >-->
                <!--<h2>暂无公寓内容~</h2>-->
              <!--</div>-->
              <div v-loading="loading" style="width: 100%;height: 600px;" v-if="loading"></div>
            </el-tab-pane>
            <el-tab-pane label="开放工位" name="second" v-if="hides2">
              <ul>
                <li>
                  <span>开放工位：</span><input v-model="placeData.placeNum" type="text" placeholder="请输入开放工位数"/><span>个</span>
                </li>
                <li>
                  <span>工位租金：</span><input v-model="placeData.placeRent" type="text" placeholder="请输入工位租金"/><span>元/天</span>
                </li>
              </ul>
              <a href="javascript:;" class="confirm2" @click="addCommunityPlace()" v-if="jurisdiction('COMMUNITY_UPDATE')">确定</a>
              <a href="javascript:;" class="call" @click="canCommunityPlace()" v-if="jurisdiction('COMMUNITY_UPDATE')">取消</a>
            </el-tab-pane>
            <el-tab-pane label="办公室" name="third" v-if="hides2">
              <table class="bgs" id="office-table">
                <thead>
                <tr>
                  <td>门牌号</td>
                  <td>工位数</td>
                  <td>租金(元/月)</td>
                  <td>服务费</td>
                  <td>办公物资</td>
                  <td>操作</td>
                </tr>
                </thead>
                <tr class="mps" v-for="(office,index) in CommunityListOffice">
                  <td>
                    <input type="text" v-model="office.officeHouseNum" placeholder="请输入门牌号">
                  </td>
                  <td>
                    <input type="text" v-model="office.officeWorkNum"  placeholder="请输入工位数">
                  </td>
                  <td>
                    <input type="text" v-model="office.officeRent"  placeholder="请输入租金">
                  </td>
                  <td>
                    <input type="text" v-model="office.serviceCost"  placeholder="请输入服务费">
                  </td>
                  <td @click="openSelectOfficeModal(index)">
                    <p><a v-if="office.officeFurniture">{{office.officeFurniture}}</a><a v-else>请设置办公物资</a></p>
                  </td>
                  <td>
                    <a href="javascript:;" @click="deleteOffice(index)">删除</a>
                  </td>
                </tr>
                <tr class="add_a">
                  <td width="25% " colspan="6">
                    <span>继续添加</span><input type="text" v-model="newRowNum" value="1"/> <span>行</span><a href="javascript:;" @click="addOffice()">确定</a>
                  </td>
                </tr>
              </table>
              <div style="margin-bottom: 50px;">
                <a class="qd" href="javascript:;" @click="addCommunityOffice()" v-if="jurisdiction('COMMUNITY_UPDATE')">确定</a>
                <a class="qx" @click="canclCommunityOffice()" v-if="jurisdiction('COMMUNITY_UPDATE')">取消</a>
              </div>
            </el-tab-pane>
            <el-tab-pane label="会议室" name="fourth" v-if="hides2">
              <table class="bgs">
                <thead>
                <tr>
                  <td>门牌号</td>
                  <td>人数</td>
                  <td>租金(元/小时)</td>
                  <td>操作</td>
                </tr>
                </thead>
                <tr class="mps" v-for="(meeting,index) in CommunityListMeeting">
                  <td>
                    <input type="text" v-model="meeting.meetingHouseNum" placeholder="请输入门牌号">
                  </td>
                  <td>
                    <input type="text" v-model="meeting.meetingPersonNum" placeholder="请输入人数">
                  </td>
                  <td>
                    <input type="text" v-model="meeting.meetingRent" placeholder="请输入租金">
                  </td>
                  <td>
                    <a href="javascript:;" @click="deleteMeeting(index)">删除</a>
                  </td>
                </tr>
                <tr class="add_a">
                  <td width="25% " colspan="4">
                    <span>继续添加</span><input type="text" v-model="newMeetingRoeNum" value="1"/> <span>行</span><a href="javascript:;" @click="addMeeting()">确定</a>
                  </td>
                </tr>
              </table>
              <div style="margin-bottom: 50px;">
                <a class="qd" href="javascript:;" @click="addCommunityMeeting()" v-if="jurisdiction('COMMUNITY_UPDATE')">确定</a>
                <a class="qx" href="javascript:;" @click="cancleCommunityMeeting()" v-if="jurisdiction('COMMUNITY_UPDATE')">取消</a>
              </div>
            </el-tab-pane>
          </el-tabs>

        </div>
      </div>
      <footer-box></footer-box>
    </div>

    <div class="community-house-modal" v-if="addFloorModal" @click="closeFloorModal()"></div>
    <div class="community-house-modal-content" v-if="addFloorModal">
      <div class="community-house-modal-content-title">
        <span>添加楼层</span>
      </div>
      <div class="add-floor-table">
        <table>
          <tr>
            <td><span class="required">*</span>楼层 :</td>
            <td><Input v-model="floorNum" placeholder="请填写整数" style="width: 225px;height: 36px"></Input></td>
          </tr>
          <tr>
            <td>房间数量 :</td>
            <td><Input v-model="roomSize" placeholder="请填写整数" style="width: 225px;height: 36px"></Input> 间</td>
          </tr>
        </table>
      </div>
      <p v-if="showErrorInfo" style="color: red;position: relative;left: 173px;top: -20px;">楼层、房间数量为1-999整数</p>
      <div class="modal-btn">
        <Button type="primary" @click="createNewFloor()" :disabled="!floorNum">确定</Button>
      </div>
      <div class="modal-close-btn" @click="closeFloorModal()">
        <Icon type="ios-close-empty"></Icon>
      </div>
    </div>

    <div class="community-house-modal" v-if="editFloorModal" @click="closeFloorModal()"></div>
    <div class="community-house-modal-content" v-if="editFloorModal">
      <div class="community-house-modal-content-title">
        <span>修改楼层信息</span>
      </div>
      <div class="add-floor-table">
        <table>
          <tr>
            <td>楼层 :</td>
            <td><Input v-model="editfloorNum" placeholder="请填写整数" style="width: 225px;height: 36px"></Input></td>
          </tr>
        </table>
        <p v-if="showErrorInfo" style="color: red;position: relative;left: 173px;top: 0px;">楼层的值为1-999整数</p>
      </div>
      <div class="modal-btn">
        <Button type="primary" @click="editNewFloor()" :disabled="!editfloorNum">确定</Button>
      </div>
      <div class="modal-close-btn" @click="closeFloorModal()">
        <Icon type="ios-close-empty"></Icon>
      </div>
    </div>

    <div class="community-house-modal" v-if="deleteFloorModal" @click="closeDeleteModal()"></div>
    <div class="black-member-modal-content" v-if="deleteFloorModal">
      <div class="modal-img-wrap">
        <img src="../../../static/images/icon/delete.png">
      </div>
      <p>确认<span>删除</span>该楼层吗?</p>
      <div class="modal-btn">
        <Button type="primary" @click="deleteFloor()">确定</Button>
        <Button type="default" @click="closeDeleteModal()" style="margin-left: 10px;">取消</Button>
      </div>
    </div>

    <div class="community-house-modal" v-if="seleteOffieModal" @click="closeSeleteOffieModal()"></div>
    <div id="select-office-modal" class="community-house-modal-content" v-if="seleteOffieModal">
      <div class="community-house-modal-content-title">
        <span>办公物资设置</span>
      </div>
      <div class="select-office-modal-checkbox">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" class="checkAllsT">全选</el-checkbox>
        <el-checkbox-group v-model="selectListData" @change="handleCheckedCitiesChange(selectListData)">
            <el-checkbox v-for="select in checkBoxArr" :label="select.dataName"></el-checkbox>
        </el-checkbox-group>
      </div>
      <div class="modal-btn" style="margin-top: 50px;">
        <Button type="primary" @click="seleteOffie()">确定</Button>
      </div>
      <div class="modal-close-btn" @click="closeSeleteOffieModal()">
        <Icon type="ios-close-empty"></Icon>
      </div>
    </div>

    <!--<div class="community-house-modal" v-if="successModal"></div>-->
    <!--<div id="house-success-modal" v-if="successModal">-->
      <!--<div class="modal-img-wrap">-->
        <!--<img src="../../../static/images/icon/house_type_success.png">-->
      <!--</div>-->
      <!--<p class="success-p">-->
        <!--<span>{{successMessage}}</span>-->
      <!--</p>-->
    <!--</div>-->

    <warning-modal :warning-message="warningMessage" @closeWarningModal="closeWarningModal()" v-if="warningModal"></warning-modal>
    <success-modal :success-message="successMessage" v-if="successModal"></success-modal>

  </div>
</template>

<script>

  import '../../sass/style/communityHouse.css';
  import menuBox from '../../components/menuBox.vue';
  import  rightHeader from '../../components/rightHeader.vue';
  import  footerBox from '../../components/footerBox.vue';
  import  successModal from '../../components/successModal.vue';
  import  warningModal from '../../components/warningModal.vue';
  import {api,RoomAdd,Apartment,Place,Office,ShutdownRoom,Meeting,SytemData,deleteFloor,copyFloor,editFloor,placeInfo,officeInfo,deleteOffice,meetingInfo,deleteMeeting,IntroduceInfo,hostTitle} from '../api.js';
  import qs from 'qs'

  export default{
    components: {
      rightHeader,
      menuBox,
      footerBox,
      warningModal,
      successModal
    },
    data(){
      return {
        activeTabName:"communityManagement",
        communityId:"",
        communityName:"",
        activeName2: 'first',
        newRowNum:1,
        newMeetingRoeNum:1,
        rootData:[],
        CommunityRoomCount:0,
        CommunityListOffice:[],
        officeSelectIndex:0,
        CommunityListMeeting:[],
        addFloorModal:false,
        deleteFloorModal:false,
        seleteOffieModal:false,
        editFloorModal:false,
        editfloorNum:"",
        editActiveindex:0,
        floorNum:"",//楼层
        roomSize:"",//房间数量
        checkBoxArr:[],
        checkBoxObj:{},
        selectListData:[],
        deleteFloorId:"",//缓存要删除的楼层编号
        successModal:false,
        successMessage:"创建成功！",
        warningModal:false,
        warningMessage:"信息填写不完整，请填写完整后重新提交！",
        placeData:{
          placeNum:"",//工位
          placeRent:"",//工位租金
        },
        officeConfigure:{},//办公配置map
        showErrorInfo:false,
        loading:false,
        hides1:true,
        hides2:true,
        communittype:'',
        checkAll:false,
        isIndeterminate:false,
      }
    },
    mounted(){
      this.communityId = this.$route.query.communityId;
      this.communittype = this.$route.query.type;

      if(this.communittype == '0'){
        this.hides2 = false;
      }
      else if(this.communittype == '1'){
        this.hides1 = false;
        this.activeName2 = 'second';
      }
      else{
        this.hides1 = true;
        this.hides2 = true;
      }
      this.getCommunityInfo();
      this.getCommunityListRoom();
      this.init();
      this.getIntroduceInfo();
//      this.getOfficeSelect();

      this.getPaceInfo();
      this.getMeetingInfo();

    },
    computed:{
      filterRootData:function(){
        var count = 0;
        if(this.rootData.length>0){
          for(var i =0;i<this.rootData.length;i++){
            count += this.rootData[i].cxkjCommunityListRoom.length;
            for(var j = 0;j<this.rootData[i].cxkjCommunityListRoom.length;j++){
              this.$set(this.rootData[i],"showTable",true);
              var room = this.rootData[i].cxkjCommunityListRoom[j];
              var houseType = room.cxkjCommunityHousetype;
              if(houseType){
                var houseTypeStr = houseType.housetypeName + " " + houseType.housetypeArea + "㎡ "  + houseType.roomId +"室" + houseType.housetypeHall+"厅"
                  + houseType.housetypeHygienism +"卫 "+  houseType.housetypeWindow + " " +  houseType.housetypeOrientations;
                this.rootData[i].cxkjCommunityListRoom[j].houseTypeStr = houseTypeStr;
              }
            }
          }
        }
        this.CommunityRoomCount = count;
        this.rootData.sort(function(a,b){
           return a.floorName - b.floorName
        });
        return this.rootData;
      },
      CommunityListMeetingRest:function(){
        //计算返回一组新数据格式-->{'0':'xxx','1':'xxx','2':'xxx'}<--[模拟索引号]]
        var obj = {};
        for(var i = 0; i < this.CommunityListMeeting.length; i++){
          obj[i]=this.CommunityListMeeting[i].meetingPersonNum+"";
        }
        return obj;
      }
    },
    methods:{
      init(){
        this.CommunityListOffice = [];
        this.CommunityListMeeting = [];
          for(var i=0;i<1;i++){
            this.CommunityListOffice.push({
              communityId:this.communityId,
              officeHouseNum:"",
              officeWorkNum:"",
              officeFurniture:"",
              officeRent:"",
              serviceCost:""
            });
            this.CommunityListMeeting.push({
              communityId:this.communityId,
              meetingHouseNum:"",
              meetingPersonNum:"",
              meetingRent:""
            });
          }
      },
      handleClick(){

      },
      handleCheckAllChange(value){
        console.log(this.checkAll);
        this.selectListData=[];
        if(this.checkAll){
          for(let i=0;i<this.checkBoxArr.length;i++){
            this.selectListData.push(this.checkBoxArr[i].dataName);
          }
        }else{
          this.selectListData =[];
        }
        this.isIndeterminate = false;
      },
      handleCheckedCitiesChange(value){
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.checkBoxArr.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.checkBoxArr.length;
      },
      //获取社区信息
      getCommunityInfo(){
        var that = this;
        this.$http.post(hostTitle,qs.stringify({communityId:this.communityId})).then(function(res){
          if(res.data.code == 10000){
            that.communityName = res.data.result.community.communityName;
          }
        }).catch(function(err){
          // console.log(err);
        })
      },
      //编辑房间
      editRoom(roomId,floorName,communityId,floorId){
          this.$router.push({
            name:'communityAddRoom',
            query:{
              roomId:roomId,
              floorName:floorName,
              communityId:communityId,
              floorId:floorId
              }
             })
      },
      //查询工位信息
      getPaceInfo(){
        var that = this;
        this.$http.post(placeInfo,qs.stringify({communityId:this.communityId})).then(function(res){
          if(res.data.code == 10000){
            that.placeData = res.data.entity;
          }
        }).catch(function(err){
          // console.log(err);
        })
      },
      //查询办公室信息
      getOfficeInfo(){
        var that = this;
        this.$http.post(officeInfo,qs.stringify({communityId:this.communityId})).then(function(res){
          if(res.data.code == 10000){debugger
            that.CommunityListOffice = res.data.entity;
            for(var i =0;i<that.CommunityListOffice.length;i++){
              if(that.CommunityListOffice[i].officeFurniture){
                var idArr = that.CommunityListOffice[i].officeFurniture.split(",");
                var furnitureArr = [];
                for(var j =0;j<idArr.length;j++){
                  furnitureArr.push(that.officeConfigure[idArr[j]]);
                }
                that.CommunityListOffice[i].officeFurniture = furnitureArr.join(" ");
              }
            }
          }
        }).catch(function(err){
          // console.log(err);
        })
      },
      //查询会议室信息
      getMeetingInfo(){
        var that = this;
        this.$http.post(meetingInfo,{communityId:this.communityId}).then(function(res){
          if(res.data.code == 10000){
            that.CommunityListMeeting = res.data.entity;
          }
        }).catch(function(err){
          // console.log(err);
        })
      },
      closeWarningModal(){
        this.warningModal = false;
      },
      hideTable(index){
        this.$set(this.rootData[index],"showTable",!this.rootData[index].showTable);
      },
      closeFloorModal(){
        this.addFloorModal = false;
        this.editFloorModal = false;

        this.showErrorInfo = false;
        this.floorNum = "";
        this.roomSize = "";
      },
      openFloorModal(){
        this.addFloorModal = true;
      },
      openEditFloorModal(index){
        this.editFloorModal = true;
        this.editActiveindex = index;
        this.editfloorNum = this.rootData[index].floorName;
      },
      //添加楼层
      createNewFloor(){
        var match = /^([1-9]\d\d|[1-9]\d|\d)$/;
        if(match.test(this.floorNum)){
          if(this.roomSize){
            if(!match.test(this.roomSize)){
              this.showErrorInfo = true;
              return;
            }
          }
          this.showErrorInfo = false;
          this.addFloorModal = false;
          var that = this;
          this.$http.post(RoomAdd, qs.stringify({communityId: this.communityId,floorNum:that.floorNum,roomSize:that.roomSize}))
            .then(function (res) {
              if(res.data.code == 10004){
                that.warningMessage = res.data.content;
                that.warningModal = true;
              }else if(res.data.code == 10000){
                that.successMessage = "添加楼层成功!";
                that.successModal = true;
                setTimeout(function(){
                  that.successModal = false;
                },1000)
                that.getCommunityListRoom();
              }else if(res.data.code == 10006){
                that.warningMessage = "链接超时！"
                that.warningModal = true;
              }
            }).catch(function(error){
            // console.log(error);
          })
        }else{
          this.showErrorInfo = true;
        }
      },
      //修改楼层信息
      editNewFloor(){
        var match = /^([1-9]\d\d|[1-9]\d|\d)$/;
        if(match.test(this.editfloorNum)){
          var that = this;
          this.showErrorInfo = false;
          this.editFloorModal = false;
          var floorId = this.rootData[this.editActiveindex].floorId;
          this.$http.post(editFloor, qs.stringify({communityId: this.communityId,floorId:floorId,floorName:this.editfloorNum}))
            .then(function (res) {
              if(res.data.code == 10004){
                that.warningMessage = "该楼层已存在！";
                that.warningModal = true;
              }else if(res.data.code == 10000){
                that.successMessage = "修改楼层成功!";
                that.successModal = true;
                setTimeout(function(){
                  that.successModal = false;
                },1000)
                that.getCommunityListRoom();
              }else if(res.data.code == 10006){
                that.warningMessage = "链接超时！";
                that.warningModal = true;
              }
            }).catch(function(error){
            // console.log(error);
          })
        }else{
          this.showErrorInfo = true;
        }
      },
      openDeleteModal(floorId){
        this.deleteFloorId = floorId;
        this.deleteFloorModal=true;
      },
      closeDeleteModal(){
        this.deleteFloorModal=false;
      },
      //删除楼层
      deleteFloor(){
        this.deleteFloorModal=false;
        var that = this;
        this.$http.post(deleteFloor, qs.stringify({floorId:this.deleteFloorId}))
          .then(function (res) {
            var flag = -1;
            for(var i =0;i<that.rootData.length;i++){
              if(that.rootData[i].floorId == that.deleteFloorId){
                flag = i;
                break;
              }
            }
            if(flag != -1){
              that.rootData.splice(flag,1);
            }
            that.successMessage = "删除楼层成功!";
            that.successModal = true;
            setTimeout(function(){
              that.successModal = false;
            },1000)
          }).catch(function(error){
          // console.log(error);
        })
      },
      closeSeleteOffieModal(){
        this.seleteOffieModal = false;
      },
      seleteOffie(){
        this.seleteOffieModal = false;
        this.CommunityListOffice[this.officeSelectIndex].officeFurniture = this.selectListData.join(" ");
      },
      openSelectOfficeModal(index){
        if(this.checkBoxArr.length>0){
          this.seleteOffieModal = true;
          this.officeSelectIndex = index;
          this.selectListData = this.CommunityListOffice[index].officeFurniture.split(" ");
          if(this.selectListData.length == this.checkBoxArr.length){
            this.checkAll = true;
            this.isIndeterminate = false;
          }else{
            this.isIndeterminate = true;
          }
          console.log(this.selectListData);
        }else{
          this.warningMessage = "请先前往社区设置进行办公设置！";
          this.warningModal = true;
        }
      },
      getCommunityListRoom(){
        var that = this;
        that.loading = true;
        this.$http.post(Apartment, {"communityId": this.communityId})
          .then(function (res) {
            if(res.status == 200 && res.data.code ==10000){
              that.rootData = res.data.entity;
              console.log(that.rootData);
              that.getCommunityListRoomTrue();
            }else{

            }
            that.loading = false;
          }).catch(function(error){
          // console.log(error);
        })
      },
      getCommunityListRoomTrue(){
        var that = this;
        this.$http.post(Apartment, {"communityId": this.communityId,status:1})
          .then(function (res) {
            if(res.status == 200 && res.data.code ==10000){
              that.rootData = res.data.entity;
            }else{

            }
            that.loading = false;
          }).catch(function(error){
          // console.log(error);
        })
      },
      //获取社区办公室配置
//      getOfficeSelect(){
//        var that = this;
//        this.$http.post(
//          SytemData,qs.stringify({parentId:29})
//        ).then(function(res){
//          that.checkBoxArr = res.data.entity;
//          for(var i =0;i<that.checkBoxArr.length;i++){
//            that.checkBoxObj[that.checkBoxArr[i].dataName] = that.checkBoxArr[i].dataId;
//            that.officeConfigure[that.checkBoxArr[i].dataId] = that.checkBoxArr[i].dataName;
//          }
//          //获取办公配置信息后再查办公室信息
//          that.getOfficeInfo();
//        }).catch(function(err){
        //  console.log(err);
//        })
//      },

      //查询社区设置信息
      getIntroduceInfo(){
        var that = this;
        this.$http.post(
          IntroduceInfo,qs.stringify({communityId:this.communityId,communityType:1})
        ).then(function(res){
          var communitySettingInfo = res.data.entity[0];
          //获取家电数据
          var communityListConfig = communitySettingInfo.cxkjCommunityListConfig;
          that.checkBoxArr = [];
          for(var i =0;i<communityListConfig.length;i++){
            that.checkBoxArr.push(communityListConfig[i].systemData);
          }
          for(var i =0;i<that.checkBoxArr.length;i++){
            that.checkBoxObj[that.checkBoxArr[i].dataName] = that.checkBoxArr[i].dataId;
            that.officeConfigure[that.checkBoxArr[i].dataId] = that.checkBoxArr[i].dataName;
          }
          // console.log(that.checkBoxArr)
          // console.log(that.officeConfigure)
          //获取办公配置信息后再查办公室信息
          that.getOfficeInfo();
        }).catch(function(err){
          // console.log(err);
        })
      },


      addCommunityPlace(){
        var that = this;
        if(this.placeData.placeNum === "" || this.placeData.placeRent ===""){
          that.warningMessage = "工位信息填写不完整！";
          that.warningModal = true;
          return;
        }
        that.placeData.communityId = this.communityId;
        this.$http.post(Place, qs.stringify(this.placeData))
          .then(function (res) {
            that.successMessage = "添加工位成功!";
            that.successModal = true;
            setTimeout(function(){
              that.successModal = false;
            },1000)
          }).catch(function(error){
          // console.log(error);
        })
      },
      canCommunityPlace(){
        this.getPaceInfo();
      },
      //删除办公室
      deleteOffice(index){
        var that = this;
        if(this.CommunityListOffice[index].officeId){
          this.$http.post(deleteOffice,qs.stringify({officeId:this.CommunityListOffice[index].officeId})).then(function(res){
            if(res.data.code == 10000){
              that.CommunityListOffice.splice(index,1);
              that.successMessage = "删除办公室成功!";
              that.successModal = true;
              setTimeout(function(){
                that.successModal = false;
              },1000)
            }
          }).catch(function(err){
            // console.log(err);
          })
        }
       this.CommunityListOffice.splice(index,1);
      },
      addOffice(){
        for(var i=0;i<this.newRowNum;i++){
          this.CommunityListOffice.push({
            communityId:this.communityId,
            officeFurniture:"",
            officeHouseNum:"",
            officeWorkNum:"",
            officeRent:"",
            serviceCost:""
          });
        }
      },
      //添加办公室
      addCommunityOffice(){
        var that = this;
        var data = this.CommunityListOffice;
        for(var j =0;j<data.length;j++){
          for(var key in data[j]){
            if(data[j][key]===""){
              that.warningMessage = "办公室信息填写不完整！";
              that.warningModal = true;
              return;
            }
          }
        }
        //复制对象（避免修改原引用）
        var paramsOffice = [];
        for(var k =0;k<this.CommunityListOffice.length;k++){
          var obj = that.deepCopy(this.CommunityListOffice[k]);
          paramsOffice.push(obj)
        }
        for(var i =0;i<paramsOffice.length;i++){
          if(paramsOffice[i].officeFurniture){
            var officeFurniture = paramsOffice[i].officeFurniture.trim();
            var FurnitureArr = officeFurniture.split(" ");
            var dataArr = [];
            var materials = [];
            for(var j =0;j<FurnitureArr.length;j++){
              //拼接办公配置数组字符串
              materials.push({
                "materialName": FurnitureArr[j],
                "count":1
              });
              dataArr.push(this.checkBoxObj[FurnitureArr[j]]+"");
            }
            paramsOffice[i].materials = JSON.stringify(materials);
            if(dataArr.length){
              paramsOffice[i].officeFurniture = dataArr.join(",");
            }else{
              paramsOffice[i].officeFurniture = "";
            }
          }
        }
        // console.log(paramsOffice);

        this.$http.post(Office, {cxkjCommunityListOffice:paramsOffice})
          .then(function (res) {
            that.successMessage = "添加办公室成功!";
            that.successModal = true;
            setTimeout(function(){
              that.successModal = false;
            },1000)
            that.getOfficeInfo();
          }).catch(function(error){
          // console.log(error);
        })
      },
      deepCopy(source){
        var result={};
        for (var key in source) {
          result[key] = typeof source[key]==='object' && source[key] != null? this.deepCopy(source[key]): source[key];
        }
        return result;
      },
      //删除会议室
      deleteMeeting(index){
        var that = this;
        if(this.CommunityListMeeting[index].meetingId){
          this.$http.post(deleteMeeting,{meetingId:this.CommunityListMeeting[index].meetingId}).then(function(res){
            if(res.data.code == 10000){
              that.CommunityListMeeting.splice(index,1);
              that.successMessage = "删除会议室成功!";
              that.successModal = true;
              setTimeout(function(){
                that.successModal = false;
              },1000)
            }
          }).catch(function(err){
            // console.log(err);
          })
        }else{
          this.CommunityListMeeting.splice(index,1);
        }
      },
      //编辑会议室
      addMeeting(){
        for(var i=0;i<this.newMeetingRoeNum;i++){
          this.CommunityListMeeting.push({
            communityId:this.communityId,
            meetingHouseNum:"",
            meetingPersonNum:"",
            meetingRent:""
          });
        }
      },
      addCommunityMeeting(){
        var that = this;
        var data = this.CommunityListMeeting;
        for(var j =0;j<data.length;j++){
          for(var key in data[j]){
            if(data[j][key]===""){
              that.warningMessage = "会议室信息填写不完整！";
              that.warningModal = true;
              return;
            }
          }
        }

        this.$http.post(Meeting, {cxkjCommunityListMeeting:this.CommunityListMeeting})
          .then(function (res) {
            that.successMessage = "添加会议室成功!";
            that.successModal = true;
            setTimeout(function(){
              that.successModal = false;
                  if(that.communittype == '1' || that.communittype == '0,1') {
										that.$router.push('/apartment/communityManagement');
									}
            },1000)
            that.getMeetingInfo();
          }).catch(function(error){
          // console.log(error);
        })
      },
      cancleCommunityMeeting(){
        this.getMeetingInfo();
      },
      canclCommunityOffice(){
        this.getOfficeInfo();
      },
      deleteRomm(room,index,rootDataindex){
        var that = this;
        this.$http.post(ShutdownRoom, qs.stringify({roomId:room.roomId,state:1}))
          .then(function (res) {
            that.rootData[rootDataindex].cxkjCommunityListRoom.splice(index,1);
            that.successMessage = "删除房间成功!";
            that.successModal = true;
            setTimeout(function(){
              that.successModal = false;
            },1000)
          }).catch(function(error){
          // console.log(error);
        })
      },
      copyFloor(floorId){
        var that = this;
        this.$http.post(copyFloor, qs.stringify({communityId:this.communityId,floorId:floorId}))
          .then(function (res) {
            that.successMessage = "复制楼层成功!";
            that.successModal = true;
            setTimeout(function(){
              that.successModal = false;
            },1000);
            that.getCommunityListRoom();
          }).catch(function(error){
          // console.log(error);
        })
      },
      successInfo(successMessage){
        var that = this;
        that.successMessage = successMessage;
        that.successModal = true;
        setTimeout(function(){
          that.successModal = false;
          that.init();
        },1000)
      }
    },
    watch:{
      "placeData.placeNum":function(value,oldValue){
        if(value){
          var value = value +"";
          this.placeData.placeNum = value.replace(/[^\d]/g, "");
        }
      },
      "placeData.placeRent":function(value,oldValue){
        if(value){
          var value = value +"";
          this.placeData.placeRent = value.replace(/[^\d.]/g, "");
        }
      },
      CommunityListMeetingRest:{
        handler(newValue, oldValue) {
          if(newValue){
            for (let i = 0; i < this.CommunityListMeeting.length; i++) {
              if (oldValue[i] != newValue[i] && newValue[i]) {
                this.CommunityListMeeting[i].meetingPersonNum = newValue[i].replace(/[^\d]/g,"")
              }
            }
          }
        },
        deep: true
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';

  .community-house-modal{
       width:100%;
       height:100%;
       background-color:rgba(0,0,0,0.4);
       position: fixed;
       overflow: auto;
       top: 0;
       right: 0;
       bottom: 0;
       left: 0;
       z-index: 999;
     }
    .community-house-modal-content{
      width:500px;
      height:320px;
      background-color:#fff;
      border-radius: 5px;
      margin: auto;
      position: fixed;
      z-index:9999;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      .community-house-modal-content-title{
        height: 60px;
        width: 100%;
        font-size: 20px;
        color: #fff;
        background-color:rgb(53,154,240);
        text-align: center;
        line-height: 60px;
        border-top-right-radius: 5px;
        border-top-left-radius: 5px;
      }
      .add-floor-table{
        height: 175px;
        width: 100%;
        table{
          margin: 0 auto;
          padding-top: 40px;
          tr td:nth-child(1){
            font-weight: 700;
            color: black;
            text-align: right;
          }
          tr{
            td{
              padding: 10px;
            }
          }
        }
      }
      .modal-btn{
        text-align: center;
        button{
          width: 140px;
          height: 38px;
        }
      }
      .modal-close-btn{
        position: absolute;
        top: -36px;
        right: -36px;
        width: 36px;
        height: 36px;
        color: #fff;
        background-color:rgba(0,0,0,0.7) ;
        border-radius: 100%;
        text-align: center;
        font-size: 36px;
        cursor: pointer;
        i{
          position: relative;
          top: -8px;
        }
      }
  }

  .black-member-modal-content{
    width:280px;
    height:180px;
    background-color:#fff;
    border-radius: 5px;
    margin: auto;
    position: fixed;
    z-index:9999;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    .modal-img-wrap{
      height: 80px;
      width: 100%;
      text-align: center;
      img{
        margin-top: 30px;
      }
    }
    p{
      text-align: center;
      span{
        color: #038be2;
        font-weight: 700;
        padding: 0 10px;
      }
    }
    .modal-btn{
      text-align: center;
      button{
        width: 90px;
        height: 30px;
        margin-top: 20px;
      }
    }
  }
  #select-office-modal{
    min-height: 280px;
    width: 500px;
    .select-office-modal-checkbox{
      height: 120px;
      width: 100%;
      .el-checkbox-group{
        width: 270px;
        margin: 0 auto;
        padding-top: 10px;
        .el-checkbox{
          margin-left: 0!important;
          width: 90px;
          padding-bottom: 10px;
        }
      }
    }
  }
  .message-tis #office-table{
    width: 878px;
    margin-left: 100px;
    margin-top: 50px;
    margin-bottom: 40px;
  }
  .message-tis #office-table thead tr td{
    width: 18%;
  }


  #house-success-modal{
    width: 240px;
    height: 160px;
    .modal-close-btn{
      position: absolute;
      top: -36px;
      right: -36px;
      width: 36px;
      height: 36px;
      color: #fff;
      background-color:rgba(0,0,0,0.7) ;
      border-radius: 100%;
      text-align: center;
      font-size: 36px;
      cursor: pointer;
      i{
        position: relative;
        top: -8px;
      }
    }
  }
  #house-success-modal{
    width:280px;
    height:180px;
    background-color:#fff;
    border-radius: 5px;
    margin: auto;
    position: fixed;
    z-index:9999;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    .modal-img-wrap{
      height: 80px;
      width: 100%;
      text-align: center;
      img{
        margin-top: 30px;
      }
    }
    .success-p{
      text-align: center;
      padding-top: 15px;
      font-size: 18px;
    }
    .modal-btn{
      text-align: center;
      button{
        width: 90px;
        height: 30px;
        margin-top: 20px;
      }
    }
  }
  .community-house-wrap{
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
  .required{
    color: red;
  }
  .checkAllsT{
    margin-left: 115px;
    margin-top: 15px;
    margin-bottom: 10px;
  }
</style>
