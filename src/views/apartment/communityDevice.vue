<template>
  <div>
    <menu-box></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="ivu-site">
          <span>您现在的位置：</span>
          <router-link class="active" to="/apartment/communityManagement">社区管理>公寓</router-link>
        </div>
        <div class="ivu-bar-title">
          <h3><i class="icon icon-iden"></i>设备管理</h3>
          <span>佳兆业航运WEWA空间</span>
        </div>
        <div class="community-device-wrap">
          <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
            <el-tab-pane label="智能门锁" name="first">
              <div class="ls">
                <div class="lishi" v-for="(floorData,index) in filterRootData">
                  <div class="house_xq">
                    <img src="../../../static/images/temp/logo2_03.png">
                    <a class="ceng" @click="hideTable(index)">{{floorData.floorName}}层</a>
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
                          label="门锁类型"
                          width="180">
                        </el-table-column>
                        <el-table-column
                          prop="roomFurniture"
                          label="门锁序列号">
                        </el-table-column>
                        <el-table-column
                          label="网关名称">
                          <template scope="scope">
                            <span style="color: red">{{scope.row.roomRent}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column
                          label="密码">
                          <template scope="scope">
                            <span v-if="true">在线 </span>
                            <span v-else>离线 </span>
                            <span v-if="scope.row.waterType ==1">按量计费</span>
                            <span v-else>按人计费</span>
                          </template>
                        </el-table-column>
                        <el-table-column
                          label="供应商">
                          <template scope="scope">
                            <span v-if="true">在线 </span>
                            <span v-else>离线 </span>
                            <span v-if="scope.row.electricType ==1">按量计费</span>
                            <span v-else-if="scope.row.electricType ==2">按人计费</span>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="open"
                          label="添加时间">
                        </el-table-column>
                        <el-table-column
                          label="门锁状态">
                          <template scope="scope">
                            <span v-if="scope.row.state == 0" style="color: rgb(46,192,172);">配置中</span>
                            <span v-else-if="scope.row.state == 1" style="color: rgb(255,102,18);">待出租</span>
                            <span v-else-if="scope.row.state == 2" >已出租</span>
                          </template>
                        </el-table-column>
                        <el-table-column
                          label="操作">
                          <template scope="scope">
                            <el-button type="text" size="small"><router-link :to="{name:'communityAddRoom',query:{roomId:floorData.cxkjCommunityListRoom[scope.$index].roomId,floorName:floorData.floorName,communityId:floorData.communityId,floorId:floorData.floorId}}">编辑</router-link></el-button>
                            <el-button type="text" size="small" @click="deleteRomm(floorData.cxkjCommunityListRoom[scope.$index],scope.$index,index)">删除</el-button>
                          </template>
                        </el-table-column>
                      </template>
                    </el-table>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="电表" name="second">
              <div class="ls">
                <div class="lishi" v-for="(floorData,index) in filterRootData">
                  <div class="house_xq">
                    <img src="../../../static/images/temp/logo2_03.png">
                    <a class="ceng" @click="hideTable(index)">{{floorData.floorName}}层</a>
                  </div>
                  <div class="house_xqb" v-if="floorData.showTable">
                    <el-table
                      :data="floorData.cxkjCommunityListRoom"
                      border
                      style="width: 100%">
                      <template scope="scope" v-if="false">
                        <el-table-column
                          label="房间号"
                          width="180">
                          <template scope="scope">
                            <span>{{scope.row.roomNum}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="houseTypeStr"
                          label="电表序列号"
                          width="180">
                        </el-table-column>
                        <el-table-column
                          prop="roomFurniture"
                          label="网关名称">
                        </el-table-column>
                        <el-table-column
                          label="供应商">
                          <template scope="scope">
                            <span style="color: red">{{scope.row.roomRent}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column
                          label="添加时间">
                          <template scope="scope">
                            <span v-if="true">在线 </span>
                            <span v-else>离线 </span>
                            <span v-if="scope.row.waterType ==1">按量计费</span>
                            <span v-else>按人计费</span>
                          </template>
                        </el-table-column>
                        <el-table-column
                          label="上次抄表时间">
                          <template scope="scope">
                            <span v-if="true">在线 </span>
                            <span v-else>离线 </span>
                            <span v-if="scope.row.electricType ==1">按量计费</span>
                            <span v-else-if="scope.row.electricType ==2">按人计费</span>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="open"
                          label="上次抄表读数">
                        </el-table-column>
                        <el-table-column
                          label="电表状态">
                          <template scope="scope">
                            <span v-if="scope.row.state == 0" style="color: rgb(46,192,172);">配置中</span>
                            <span v-else-if="scope.row.state == 1" style="color: rgb(255,102,18);">待出租</span>
                            <span v-else-if="scope.row.state == 2" >已出租</span>
                          </template>
                        </el-table-column>
                        <el-table-column
                          label="操作">
                          <template scope="scope">
                            <el-button type="text" size="small"><router-link :to="{name:'communityAddRoom',query:{roomId:floorData.cxkjCommunityListRoom[scope.$index].roomId,floorName:floorData.floorName,communityId:floorData.communityId,floorId:floorData.floorId}}">编辑</router-link></el-button>
                            <el-button type="text" size="small" @click="deleteRomm(floorData.cxkjCommunityListRoom[scope.$index],scope.$index,index)">删除</el-button>
                          </template>
                        </el-table-column>
                      </template>
                    </el-table>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="水表" name="third">
              <div class="ls">
                <div class="lishi" v-for="(floorData,index) in filterRootData">
                  <div class="house_xq">
                    <img src="../../../static/images/temp/logo2_03.png">
                    <a class="ceng" @click="hideTable(index)">{{floorData.floorName}}层</a>
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
                          label="水表序列号"
                          width="180">
                        </el-table-column>
                        <el-table-column
                          prop="roomFurniture"
                          label="网关名称">
                        </el-table-column>
                        <el-table-column
                          label="供应商">
                          <template scope="scope">
                            <span style="color: red">{{scope.row.roomRent}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column
                          label="添加时间">
                          <template scope="scope">
                            <span v-if="true">在线 </span>
                            <span v-else>离线 </span>
                            <span v-if="scope.row.waterType ==1">按量计费</span>
                            <span v-else>按人计费</span>
                          </template>
                        </el-table-column>
                        <el-table-column
                          label="上次抄表时间">
                          <template scope="scope">
                            <span v-if="true">在线 </span>
                            <span v-else>离线 </span>
                            <span v-if="scope.row.electricType ==1">按量计费</span>
                            <span v-else-if="scope.row.electricType ==2">按人计费</span>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="open"
                          label="上次抄表读数">
                        </el-table-column>
                        <el-table-column
                          label="水表状态">
                          <template scope="scope">
                            <span v-if="scope.row.state == 0" style="color: rgb(46,192,172);">配置中</span>
                            <span v-else-if="scope.row.state == 1" style="color: rgb(255,102,18);">待出租</span>
                            <span v-else-if="scope.row.state == 2" >已出租</span>
                          </template>
                        </el-table-column>
                        <el-table-column
                          label="操作">
                          <template scope="scope">
                            <el-button type="text" size="small"><router-link :to="{name:'communityAddRoom',query:{roomId:floorData.cxkjCommunityListRoom[scope.$index].roomId,floorName:floorData.floorName,communityId:floorData.communityId,floorId:floorData.floorId}}">编辑</router-link></el-button>
                            <el-button type="text" size="small" @click="deleteRomm(floorData.cxkjCommunityListRoom[scope.$index],scope.$index,index)">删除</el-button>
                          </template>
                        </el-table-column>
                      </template>
                    </el-table>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane label="网关管理" name="fourth">
              <div class="ls">
                <div class="lishi" v-for="(floorData,index) in filterRootData">
                  <div class="house_xq">
                    <img src="../../../static/images/temp/logo2_03.png">
                    <a class="ceng" @click="hideTable(index)">{{floorData.floorName}}层</a>
                  </div>
                  <div class="house_xqb" v-if="floorData.showTable">
                    <el-table
                      :data="floorData.cxkjCommunityListRoom"
                      border
                      style="width: 100%">
                      <template scope="scope" v-if="false">
                        <el-table-column
                          label="序号"
                          width="180">
                          <template scope="scope">
                            <span>{{scope.row.roomNum}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="houseTypeStr"
                          label="网关类型"
                          width="180">
                        </el-table-column>
                        <el-table-column
                          prop="roomFurniture"
                          label="网关名称">
                        </el-table-column>
                        <el-table-column
                          label="供应商">
                          <template scope="scope">
                            <span style="color: red">{{scope.row.roomRent}}</span>
                          </template>
                        </el-table-column>
                        <el-table-column
                          label="序列号">
                          <template scope="scope">
                            <span v-if="true">在线 </span>
                            <span v-else>离线 </span>
                            <span v-if="scope.row.waterType ==1">按量计费</span>
                            <span v-else>按人计费</span>
                          </template>
                        </el-table-column>
                        <el-table-column
                          label="已连接设备">
                          <template scope="scope">
                            <span v-if="true">在线 </span>
                            <span v-else>离线 </span>
                            <span v-if="scope.row.electricType ==1">按量计费</span>
                            <span v-else-if="scope.row.electricType ==2">按人计费</span>
                          </template>
                        </el-table-column>
                        <el-table-column
                          prop="open"
                          label="添加时间">
                        </el-table-column>
                        <el-table-column
                          label="状态">
                          <template scope="scope">
                            <span v-if="scope.row.state == 0" style="color: rgb(46,192,172);">配置中</span>
                            <span v-else-if="scope.row.state == 1" style="color: rgb(255,102,18);">待出租</span>
                            <span v-else-if="scope.row.state == 2" >已出租</span>
                          </template>
                        </el-table-column>
                        <el-table-column
                          label="操作">
                          <template scope="scope">
                            <el-button type="text" size="small"><router-link :to="{name:'communityAddRoom',query:{roomId:floorData.cxkjCommunityListRoom[scope.$index].roomId,floorName:floorData.floorName,communityId:floorData.communityId,floorId:floorData.floorId}}">编辑</router-link></el-button>
                            <el-button type="text" size="small" @click="deleteRomm(floorData.cxkjCommunityListRoom[scope.$index],scope.$index,index)">删除</el-button>
                          </template>
                        </el-table-column>
                      </template>
                    </el-table>
                  </div>
                </div>
              </div>
            </el-tab-pane>
          </el-tabs>

        </div>
      </div>
      <footer-box></footer-box>
    </div>

    <!--关闭水表modal-->
    <div class="device-shut-modal" v-if="false" @click="closeRefundModal()"></div>
    <div class="device-shut-modal-content" v-if="false">
      <div class="modal-img-wrap">
        <img src="../../../static/images/icon/device_shut_03.png">
      </div>
      <p>您确定要<span style="color: #00a0e9;">关闭</span><br>房间 <span style="font-weight: 700;color: black;">1层103</span> 的水表吗?</p>
      <div class="modal-btn">
        <Button type="primary" @click="closeRefundModal()">确定</Button>
        <Button style="margin-left: 10px;"  @click="closeRefundModal()">取消</Button>
      </div>
    </div>

    <!--开启水表modal-->
    <div class="device-shut-modal" v-if="false" @click="closeRefundModal()"></div>
    <div class="device-shut-modal-content" v-if="false">
      <div class="modal-img-wrap">
        <img src="../../../static/images/icon/device_open_03.png">
      </div>
      <p>您确定要<span style="color: #00a0e9;">开启</span><br>房间 <span style="font-weight: 700;color: black;">1层103</span> 的水表吗?</p>
      <div class="modal-btn">
        <Button type="primary" @click="closeRefundModal()">确定</Button>
        <Button style="margin-left: 10px;"  @click="closeRefundModal()">取消</Button>
      </div>
    </div>

    <!--添加水表，修改电表配置-->
    <div class="device-add-water" v-if="false" @click="closeFloorModal()"></div>
    <div class="device-add-water-content" v-if="false">
      <div class="device-add-water-content-title">
        <span>添加水表</span>
      </div>
      <div class="add-floor-table">
        <table>
          <tr>
            <td>房间 :</td>
            <td>3层301</td>
          </tr>
          <tr>
            <td>序列号 :</td>
            <td><Input v-model="floorNum" placeholder="请输入序列号" style="width: 225px;height: 36px"></Input></td>
          </tr>
          <tr>
            <td>网关 :</td>
            <td>
              <Select v-model="propertyCommunity" style="width:225px">
                <Option v-for="community in  propertyContractSelects" :value="community.communityId" :key="community.communityId">{{ community.communityName }}</Option>
              </Select>
            </td>
          </tr>
        </table>
      </div>
      <div class="modal-btn">
        <Button type="primary" @click="createNewFloor()">确定</Button>
      </div>
      <div class="modal-close-btn" @click="closeFloorModal()">
        <Icon type="ios-close-empty"></Icon>
      </div>
    </div>

    <!--添加电表，修改电表配置-->
    <div class="device-add-water" v-if="false" @click="closeFloorModal()"></div>
    <div class="device-add-water-content" v-if="false">
      <div class="device-add-water-content-title">
        <span>添加电表</span>
      </div>
      <div class="add-floor-table">
        <table>
          <tr>
            <td>房间 :</td>
            <td>3层301</td>
          </tr>
          <tr>
            <td>序列号 :</td>
            <td><Input v-model="floorNum" placeholder="请输入序列号" style="width: 225px;height: 36px"></Input></td>
          </tr>
          <tr>
            <td>网关 :</td>
            <td>
              <Select v-model="propertyCommunity" style="width:225px">
                <Option v-for="community in  propertyContractSelects" :value="community.communityId" :key="community.communityId">{{ community.communityName }}</Option>
              </Select>
            </td>
          </tr>
        </table>
      </div>
      <div class="modal-btn">
        <Button type="primary" @click="createNewFloor()">确定</Button>
      </div>
      <div class="modal-close-btn" @click="closeFloorModal()">
        <Icon type="ios-close-empty"></Icon>
      </div>
    </div>


    <!--添加网关，添加网关配置-->
    <div class="device-add-water" v-if="true" @click="closeFloorModal()"></div>
    <div class="device-add-water-content wang-guan-peizhi" v-if="true">
      <div class="device-add-water-content-title">
        <span>添加网关</span>
      </div>
      <div class="add-floor-table">
        <table>
          <tr>
            <td>楼层 :</td>
            <td>1</td>
          </tr>
          <tr>
            <td>网关名称 :</td>
            <td><Input v-model="floorNum" placeholder="请输入序列号" style="width: 225px;height: 36px"></Input></td>
          </tr>
          <tr>
            <td>供应商 :</td>
            <td>
              <Select v-model="propertyCommunity" style="width:225px">
                <Option v-for="community in  propertyContractSelects" :value="community.communityId" :key="community.communityId">{{ community.communityName }}</Option>
              </Select>
            </td>
          </tr>
          <tr>
            <td>网关 :</td>
            <td>
              <Select v-model="propertyCommunity" style="width:225px">
                <Option v-for="community in  propertyContractSelects" :value="community.communityId" :key="community.communityId">{{ community.communityName }}</Option>
              </Select>
            </td>
          </tr>
          <tr>
            <td>序列号 :</td>
            <td><Input v-model="floorNum" placeholder="请输入序列号" style="width: 225px;height: 36px"></Input></td>
          </tr>
        </table>
        <div class="modal-btn">
          <Button type="primary" @click="createNewFloor()">确定</Button>
        </div>
      </div>
      <div class="modal-close-btn" @click="closeFloorModal()">
        <Icon type="ios-close-empty"></Icon>
      </div>
    </div>

  </div>
</template>

<script>

  import '../../sass/style/communityDevice.css';
  import menuBox from '../../components/menuBox.vue';
  import  rightHeader from '../../components/rightHeader.vue';
  import  footerBox from '../../components/footerBox.vue';
  import {Apartment} from '../api.js';
  import qs from 'qs'

  export default{
    components: {
      rightHeader,
      menuBox,
      footerBox
    },
    data(){
      return {
        communityId:"",
        activeName2: 'first',
        rootData:[],
      }
    },
    mounted(){
      this.communityId = this.$route.query.communityId;
      this.getCommunityListRoom();
      this.init();
    },
    computed:{
      filterRootData:function(){
        if(this.rootData.length>0){
          for(var i =0;i<this.rootData.length;i++){
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
        this.rootData.sort(function(a,b){
          return a.floorName - b.floorName
        });
        return this.rootData;
      }
    },
    methods: {
      init(){
        this.CommunityListOffice = [];
        this.CommunityListMeeting = [];
        for(var i=0;i<3;i++){
          this.CommunityListOffice.push({
            communityId:3,
            officeHouseNum:"",
            officeWorkNum:"",
            officeFurniture:"",
            officeRent:""
          });
          this.CommunityListMeeting.push({
            communityId:3,
            meetingHouseNum:"",
            meetingPersonNum:"",
            meetingRent:""
          });
        }
      },
      handleClick(){

      },
      hideTable(index){
        this.$set(this.rootData[index],"showTable",!this.rootData[index].showTable);
      },
      getCommunityListRoom(){
        var that = this;
        this.$http.post(Apartment, {"communityId": this.communityId})
          .then(function (res) {debugger
            if(res.status == 200 && res.statusText=="OK"){
              that.rootData = res.data.entity;
            }else{

            }
          }).catch(function(error){
          console.log(error);
        })
      },


    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';

  //关闭水表modal
  .device-shut-modal{
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
  .device-shut-modal-content{
    width:280px;
    height:200px;
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
        width: 36px;
        height: 34px;
        margin-top: 30px;
      }
    }
    p{
      text-align: center;
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
  //关闭水表modal


  //添加水表
  .device-add-water{
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
  .device-add-water-content{
    width:500px;
    height:340px;
    background-color:#fff;
    border-radius: 5px;
    margin: auto;
    position: fixed;
    z-index:9999;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    .device-add-water-content-title{
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
        padding-top: 20px;
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
      margin-top: 20px;
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
  //添加水表

  //网关配置
  .wang-guan-peizhi{
    height: 480px;
  }

</style>
