<template>
    <div>
        <menu-box></menu-box>
        <div class="right-content" id="right-content">
            <right-header></right-header>
            <div class="wordbench-box">
                <div class="ivu-site">
                    <span>您现在的位置：</span>
                    <router-link class="active" to="">企业服务</router-link>
                </div>
                <div class="ivu-bar-title">
                    <h3><i class="icon icon-iden"></i>企业服务</h3>
                </div>
                <div id="corporate-service-list">
                    <div class="corporate-service-content">
                        <div class="corporate-service-type">
                            <span>服务类型</span>
                            <Select v-model="enterpriseType" style="width:200px" @on-change="selectType" v-if="selefloors.length>1">
                                <Option v-for="item in selefloors" :key="item.dataId" :label="item.dataName"
                                        :value="item.dataId">{{ item.dataName }}
                                </Option>
                            </Select>
                        </div>
                        <div class="corporate-service-range">
                            <span>服务范围</span>
                            <Select v-model="enterpriseArea" style="width:200px" @on-change="selectArea" v-if="seleArea.length>1">
                                <Option v-for="item in seleArea" :key="item.dataId" :label="item.dataName"
                                        :value="item.dataId">{{ item.dataName }}
                                </Option>
                            </Select>
                        </div>
                        <div class="add-corporate-btn" @click="goToAddCorporate()" v-if="jurisdiction('ENTERPRISE_INCREASE')"><span>+</span>新增企业</div>
                        <table class="corporate-service-table" cellspacing="0" width="100%">
                            <tr class="table-heaher">
                                <th width="150px;">公司LOGO</th>
                                <th>公司名称</th>
                                <th>联系电话</th>
                                <th>服务项目</th>
                                <th width="150px;">服务范围</th>
                                <th>操作</th>
                            </tr>
                            <tr class="active" v-if="complainList.length" v-for="(item,index) in complainList">
                                <td>
                                    <div class="uploading">
                                        <a class="upload" href="javascript:void(0);"  v-loading.body="loading">
                                            <input type="file" class="upfile" @change="loadfile($event,index)" accept="image/png,image/jpg" v-if="chen">
                                            <img :src="imgPath + item.enterpriseLogo" v-if="item.enterpriseLogo" />
                                            <span class="jiahao3" v-if="chen">上传照片</span>
                                        </a>
                                    </div>
                                    <!-- <div style="padding:20px">
                                        <img :src="imgPath+item.enterpriseLogo" alt="" style="width: 50px">
                                    </div> -->
                                </td>
                                <td style="padding: 20px">
                                    <h3 v-if="!item.update">{{item.enterpriseName}}</h3>
                                    <Input v-model="item.enterpriseName" placeholder="" style="width: 200px"
                                           v-if="item.update"></Input>
                                </td>
                                <td style="padding: 20px">
                                    <div v-if="!item.update">{{item.enterpriseTel}}</div>
                                    <Input v-model="item.enterpriseTel" placeholder="" style="width: 150px"
                                           v-if="item.update"></Input>
                                </td>
                                <td class="service-project" style="padding: 20px">
                                    <div style="margin-bottom: 10px ">
                                        <el-select v-model="newService" filterable placeholder="请选择" v-if="item.update">
                                            <el-option v-for="item in floors" :key="item.dataId" :label="item.dataName"
                                                       :value="item.dataId"></el-option>
                                        </el-select>
                                        <!--</td>-->
                                        <a @click="addService(index)" v-if="item.update">新增</a>
                                        <!--<div>{{item.enterpriseType}}</div>-->
                                        <div class="service-project-item"
                                             v-if="enterpriseList[index].length && enterpriseList[index]">
                                            <ul>
                                                <li v-for="(items,index) in enterpriseList[index]"><span>{{items | Service}}</span>
                                                    <div @click="deleteService(index)" v-if="item.update">
                                                        <Icon type="ios-close-outline"
                                                              style="position: absolute;top: -5px;right: -5px;background-color: #fff;"></Icon>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </td>
                                <td style="padding: 20px">
                                    <div v-if="!item.update && item.enterpriseArea">{{item.enterpriseArea | enter}}</div>
                                    <div style="margin-bottom: 10px">
                                        <el-select v-model="item.enterpriseArea" filterable placeholder="请选择" v-if="item.update">
                                            <el-option v-for="item in Area" :key="item.dataId" :label="item.dataName"
                                                       :value="item.dataId"></el-option>
                                        </el-select>
                                    </div>
                                </td>
                                <td style="padding: 20px">
                                    <Button style="width: 80px;height: 30px" @click="updateCorporate(index)" v-if="jurisdiction('ENTERPRISE_UPDATE') && !item.update">编辑</Button>
                                    <Button style="width: 80px;height: 30px" @click="preservationCorporate(index)" v-if="jurisdiction('ENTERPRISE_UPDATE') && item.update">保存</Button>
                                    <Button style="width: 80px;height: 30px" @click="goToDelete(item,index)" v-if="jurisdiction('ENTERPRISE_DELETE')">删除</Button>
                                </td>
                            </tr>
                        </table>
                        <Page :total="complainTotalNum" :current="complainCurrent" :page-size="10" show-elevator
                              show-total @on-change="search"></Page>
                    </div>
                </div>
            </div>
            <footer-box></footer-box>
        </div>
        <warning-modal :warning-message="warningMessage" @closeWarningModal="closeWarningModal()" v-if="warningModal"></warning-modal>
        <success-modal :success-message="successMessage" v-if="successModal" ></success-modal>
    </div>
</template>

<script>
  import menuBox from '../../components/menuBox.vue';
  import  rightHeader from '../../components/rightHeader.vue';
  import  footerBox from '../../components/footerBox.vue';
  import  successModal from '../../components/successModal.vue';
  import  warningModal from '../../components/warningModal.vue';
  import {
    imgPath,
    allCommunity,
    complainList,
    CommunityServiceList500119,
    CommunityServiceUpdate500121,
    CommunityServiceDel500122,
    SytemData,
    host
  } from '../api.js';
  import qs from 'qs'
  export default {
    components: {
      rightHeader,
      menuBox,
      footerBox,
      successModal,
      warningModal
    },
    data(){
      return {
        complainTotalNum: 10,
        complainCurrent: 1,
        projectServices: [],
        floors: [],
        newService: '',
        pageNum: 1,
        enterpriseType: '',
        enterpriseArea: '',
        complainList: [],
        seleArea:[{dataId:'',dataName:'全部'}],
        selefloors:[{dataId:'',dataName:'全部'}],
        Area: [],
        imgPath:'',
        enterpriseList: [],
        successModal:false,
        successMessage:"",
        warningModal:false,
        warningMessage:"",
        chen:false,
        loading:false,
        host3:'',
        param:{},
        imgUser:''
      }
    },
    mounted(){
      this.selectService()
      this.selectAreas()
      this.selectList()
      this.imgPath = imgPath;
      this.param = new FormData();
      this.host3 = host + '/cxkj-room/apis/system/file/SystemFileUpload100023';
    },
    computed:{

    },
    methods: {
      closeWarningModal(){
        this.warningModal = false;
      },
      selectService(){//查询企业服务列表
        let vm = this
        vm.$http.post(SytemData, qs.stringify({
          parentId: 67
        })).then(res => {
          if (res.data.code == '10000') {
            vm.floors = res.data.entity
            vm.selefloors = res.data.entity
          }
        })
      },
      selectAreas(){//查询服务范围列表
        let vm = this
        vm.$http.post(SytemData, qs.stringify({
          parentId: 79
        })).then(res => {
          if (res.data.code == '10000') {
            vm.Area = res.data.entity
            sessionStorage.setItem('Area',JSON.stringify(res.data.entity))
            vm.seleArea = res.data.entity
            vm.seleArea.push()
          }
        })
      },
      selectType(){
        this.selectList()
      },
      selectArea(){
        this.selectList()
      },
      deleteService(index){
          console.log(this.enterpriseList);
          this.enterpriseList[0].splice(index, 1);
      },
      selectList(){
        let vm = this
        vm.$http.post(CommunityServiceList500119, qs.stringify({
          pageNum: vm.pageNum,
          enterpriseType: vm.enterpriseType,
          enterpriseArea: vm.enterpriseArea
        })).then(res => {
          if (res.data.code == '10000') {
            vm.complainList = res.data.result.serviceList
            for (let k in vm.complainList) {
              vm.$set(vm.complainList[k], 'update', false)
              if (vm.complainList[k].enterpriseType) {
                vm.$set(vm.enterpriseList,k,vm.complainList[k].enterpriseType.split(","))
              } else {
                vm.$set(vm.enterpriseList,k,0)
              }
            }
          }
        }).catch(err => {
          console.log(err)
        })
      },
      /** 新增企业服务 **/
      goToAddCorporate(){
        this.$router.push({name: "addCorporate"})
      },
      /** 新增服务 **/
      addService(indexs){
        console.log(indexs);
        console.log(this.seleArea);
        console.log(this.enterpriseList);
        console.log(this.enterpriseList[indexs]);
        let index = this.enterpriseList[indexs].findIndex(item => item == this.newService);
       
        if(!this.newService){
          this.warningMessage = '请选择有效的企业服务'
          this.warningModal = true
        } else if(index<0){
          let list = this.enterpriseList[indexs];
          list.push(this.newService);
          console.log(list);
          vm.$set(vm.enterpriseList,indexs,list)
          this.newService = "";
        }else {
          this.warningMessage = '请勿重复添加服务项目'
          this.warningModal = true
        }
      },
      /** 删除企业服务 **/
      goToDelete(item,index){
        let vm = this
        console.log('ID')
        console.log(item.serviceId)
        console.log('ID')
        vm.$http.post(CommunityServiceDel500122,qs.stringify({serviceId:item.serviceId}))
          .then(res => {
            console.log("删除")
            console.log(res.data)
            console.log("删除")
            if(res.data.code == '10000'){
              vm.complainList.splice(index,1)
              vm.enterpriseList.splice(index,1)
            }
          }).catch(err => {
          vm.warningMessage = '删除失败'
          vm.warningModal = true
        })
      },
      /** 修改企业服务 **/
      updateCorporate(index){
        this.$set(this.complainList[index], 'update', true);
        this.chen = true;
      },
      /** 上传图片 **/
      loadfile(e,index){
        let vm = this
        vm.loading = true;
        let file = e.target.files[0];
        let files = [file,file.name];
        vm.chen = false;
        this.param.append('file',file);
        this.param.append('module','user');
        this.$http.post(vm.host3,vm.param).then(res =>{
            console.log(res);
            if(res.status == 200 && res.data.code == 10000){
                vm.complainList[index].enterpriseLogo = res.data.result.virtualPath;
                vm.loading = false;
            }
            
            
        }).catch(err=>{
            console.log(err)
        })
      },
      /** 保存 **/
      preservationCorporate(index){
        let vm = this
        if(!vm.complainList[index].enterpriseLogo || !vm.complainList[index].enterpriseName || !vm.complainList[index].enterpriseTel || !vm.complainList[index].enterpriseArea || !vm.enterpriseList[index].length){
          vm.warningMessage = '请填写有效的企业信息'
          vm.warningModal = true
          return
        }

        let param = new FormData()
        param.append('serviceId', vm.complainList[index].serviceId)
        param.append('enterpriseLogo', vm.complainList[index].enterpriseLogo)
        param.append('enterpriseName', vm.complainList[index].enterpriseName)
        param.append('enterpriseTel', vm.complainList[index].enterpriseTel)
        param.append('enterpriseArea', vm.complainList[index].enterpriseArea)
        param.append('enterpriseType', vm.enterpriseList[index])
        vm.$http.post(CommunityServiceUpdate500121,param).then(res => {
          console.log('保存')
          console.log(res.data)
          console.log('保存')
          if(res.data.code != '10000'){
            vm.warningMessage = res.data.content
            vm.warningModal = true
          }else {
            vm.$set(vm.complainList[index], 'update', false)
          }
        }).catch(err => {
          console.log(err)
          vm.warningMessage = '报存失败'
          vm.warningModal = true
        })
      },
      search(){

      }
    },
    filters: {
      timefilter(value, format){
        if (value) {
          return new Date(value).Format(format)
        }
      },
      enter(value){
        let Area = JSON.parse(sessionStorage.getItem('Area'))
        if(Area){
          return Area[Area.findIndex(item => item.dataId == parseInt(value))].dataName
        }

      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
    @import '../../sass/base/_mixin.scss';
    @import '../../sass/base/_public.scss';

    #corporate-service-list{
        height: 100%;
        min-height: 1000px;
        width: 100%;
        background-color: #fff;
        box-shadow: 0 3px 1px #ccc;
        .service-project{
            /*padding: 20px;*/
            /*background-color: #f8f8f8;*/
            width: 600px;
            .service-project-item{
                /*padding-top: 20px;*/
                ul{
                    li{
                        position: relative;
                        display: inline-block;
                        float: left;
                        padding: 5px 10px;
                        margin-right: 20px;
                        margin-top: 10px;
                        background-color: #fff;
                        border: solid 1px #ccc;
                        div{
                            cursor: pointer;
                        }
                    }
                }
            }
        }
        .corporate-service-content{
            padding-top: 75px;
            position: relative;
            .corporate-service-type{
                position: absolute;
                top: 20px;
                left: 50px;
            }
            .corporate-service-range{
                position: absolute;
                top: 20px;
                left: 380px;
            }
            .add-corporate-btn{
                position: absolute;
                top: 20px;
                right: 50px;
                width: 120px;
                height: 36px;
                border-radius: 5px;
                border: 1px solid rgb(3, 139, 226);
                line-height: 30px;
                text-align: center;
                color: rgb(3, 139, 226);
                cursor: pointer;
                span{
                    font-size: 18px;
                    padding-right: 10px;
                }
            }
            .corporate-service-table{
                border-collapse: collapse;
                text-align: center;
                .table-heaher{
                    th{
                        border: solid 1px #ccc;
                    }
                    th:nth-child(1){
                        border-left: none;
                    }
                    th:nth-child(2), th:nth-child(3){
                        padding-left: 10px;
                        padding-right: 10px;
                    }
                    th:nth-child(4){
                        border-right: none;
                    }
                }
                tr{
                    th{
                        padding: 16px 0;
                        background-color: rgb(248, 248, 248);
                    }
                    td{
                        border-right: 1px solid #ccc;
                        .corporate-logo{
                            width: 90px;
                            height: 90px;
                            margin: 20px;
                            float: left;
                            img{
                                width: 90px;
                                height: 90px;
                            }
                        }
                        .corporate-info{
                            float: left;
                            text-align: left;
                            display: inline-block;
                            h3{
                                margin-top: 20px;
                            }
                            .address_position{
                                margin: 5px 0 15px 0;
                                display: inline-block;
                                height: 19px;
                                line-height: 19px;
                                .diwei_map{
                                    display: inline-block;
                                    position: relative;
                                    top: 3px;
                                    width: 12px;
                                    height: 19px;
                                    background: url(../../../static/images/icon/service_map.png);
                                }
                                span{
                                    padding-left: 10px;
                                }
                            }
                            ul{
                                li{
                                    display: inline-block;
                                    padding: 3px 10px;
                                    border: solid 1px rgb(31, 187, 166);
                                    color: rgb(31, 187, 166);
                                    border-radius: 3px;
                                    margin-right: 10px;
                                }
                            }
                        }
                    }
                }
                .active{
                    border-bottom: 1px solid #ccc;
                }
                .active:hover{
                    background: rgb(248, 252, 255);
                    h3{
                        color: rgb(3, 139, 226);
                    }
                }
            }
            .ivu-page{
                margin: 50px 0 160px 0;
                text-align: center;
            }
        }
    }





.active td{
    position: relative;
}
.active td .uploading{
    position: absolute;
    left: 50%;
    top: 45%; 
    transform: translate(-50%,-50%);
}
.active td .uploading .upload .upfile{
  cursor: pointer;
  direction: rtl;
  height: 70px;
  opacity: 0;
  width: 70px;
  filter: alpha(opacity=0);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 60;
}
.active td .uploading .upload{
  position: relative;
  display: block;
  height: 70px;
  margin-top: 7px;
  overflow: hidden;
  width: 70px;
  background: #f8f8f8;
  border: 1px solid #dcdcdc;
  line-height: 80px;
  text-align: center;
  font-size: 14px;
  color: #333;
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer;
}
.active td .uploading .upload img{
	width: 70px;
    height: 70px;
    position: absolute;
    left: 0;
    top: 0;
}
.active td .uploading .upload .icon-jiahao1{
	width: 2px;
	height: 20px;
	display: block;
	font-size: 12px;
	color: #B94A48;
	background: #b8b8b8;
	position: absolute;
	left: 47%;
	top: 32%;
}
.active td .uploading .upload .icon-jiahao2{
	width: 20px;
	height: 2px;
	display: block;
	font-size: 12px;
	color: #B94A48;
	background: #b8b8b8;
	position: absolute;
	left: 38%;
  	top: 41%;
}
.active td .uploading .upload .jiahao3{
	position: absolute;
	left: 24px;
  	top: 30px;
	color: #b8b8b8;
	font-size: 12px;
	width: 51px;
  	height: 6px;
}
</style>

