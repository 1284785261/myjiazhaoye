<template>
  <div>
    <menu-box></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="ivu-site">
          <span>您现在的位置：</span>
          <router-link  class="active" to="">企业服务</router-link>
        </div>
        <div class="ivu-bar-title">
          <h3><i class="icon icon-iden"></i>增加企业</h3>
          <span>佳兆业航运WEWA空间</span>
        </div>
        <div id="add-corporate-wrap">
          <div class="add-corporate-content">
            <table>
              <tr>
                <td style="position: relative;top: -30px;">企业Logo :</td>
                <td>
                  <div class="logo-td">
                    <div class="corporate-logo">
                      <template v-if="imgPath1">
                        <img class="upload-img" :src="imgPath1" >
                        <img class="update-avatar" src="../../../static/images/icon/update-member-img.png" alt="">
                      </template>
                      <template v-else>
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                        <span class="upload-img-text">上传Logo</span>
                      </template>
                    </div>
                    <input type="file" class="upfile" @change="loadfile"  accept="image/png,image/jpg">
                  </div>
                </td>
              </tr>
              <tr>
                <td>企业名称 :</td>
                <td><Input placeholder="请填写企业名称" style="width: 300px;" v-model="enterpriseName"></Input></td>

              </tr>
                <tr>
                <td>企业电话 :</td>
                <td><Input placeholder="请填写企业电话" style="width: 300px;" v-model="enterpriseTel"></Input></td>

              </tr>
              <!--<tr>-->
                <!--<td>企业地址 :</td>-->
                <!--<td><Input placeholder="请填写租金"></Input></td>-->
              <!--</tr>-->
                <tr >
                    <td>服务区域 :</td>
                    <td>
                        <el-select v-model="itemArea" filterable placeholder="请选择" v-if="Area.length">
                            <el-option v-for="item in Area" :key="item.dataId" :label="item.dataName" :value="item.dataId"></el-option>
                        </el-select>
                    </td>
                </tr>
              <tr >
                <td>服务类别 :</td>
                <td class="service-project" >
                  <!--<Input placeholder="请填写租金" style="width: 200px" v-model="newService"></Input>-->
                  <!--<td>-->
                      <el-select v-model="newService" filterable placeholder="请选择" v-if="floors.length">
                          <el-option v-for="item in floors" :key="item.dataId" :label="item.dataName" :value="item.dataId"></el-option>
                      </el-select>
                  <!--</td>-->
                  <a @click="addService">增加</a>
                  <div class="service-project-item" v-if="projectServices.length">
                    <ul>
                      <li v-for="(item,index) in projectServices"><span>{{item | Service}}</span><div @click="deleteService(index)"><Icon type="ios-close-outline" style="position: absolute;top: -5px;right: -5px;background-color: #fff;"></Icon></div></li>
                    </ul>
                  </div>
                </td>
              </tr>
              <!--<tr>-->
                <!--<td>服务类别 :</td>-->
                <!--<td>-->
                  <!--<el-select v-model="cacheFloorName" filterable placeholder="请输入或选择">-->
                    <!--<el-option v-for="item in floors" :key="item.value" :label="item.label" :value="item.value"></el-option>-->
                  <!--</el-select>-->
                <!--</td>-->
              <!--</tr>-->

            </table>
            <!--<div style="max-width: 900px;">-->
              <!--<div style="position: relative;top: 30px;left: 10px;font-weight: 700;color: black;"><span>服务内容 :</span></div>-->
              <!--<UE :defaultMsg='defaultMsg' :config=config ref="ue" style="padding-left: 85px"></UE>-->
            <!--</div>-->
            <div class="success-btn">
              <Button type="primary" style="width: 120px;height: 36px;" @click="submit">确定</Button>
            </div>
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
  import UE from '../../components/uedit.vue';
  import {imgPath,allCommunity,complainList,SystemFileUpload100023,SytemData,CommunityServiceAdd500120} from '../api.js';
  import  successModal from '../../components/successModal.vue';
  import  warningModal from '../../components/warningModal.vue';
  import qs from 'qs'


  export default {
    components:{
      rightHeader,
      menuBox,
      footerBox,
      UE,
      successModal,
      warningModal
    },
    data(){
      return{
        projectServices:[],//接收服务列表
        newService:"",//增加服务字段
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350
        },
        defaultMsg:"请输入",
        imgPath1:"",
        successModal:false,
        successMessage:"",
        warningModal:false,
        warningMessage:"",
        logoUrl:'',
        floors:[],
        Area:[],
        itemArea:'',
        enterpriseName:'',
        enterpriseTel:'',
      }
    },
    mounted(){
      this.selectService()
      this.selectArea()
    },
    methods:{
      selectService(){//查询企业服务列表
        let vm = this
        vm.$http.post(SytemData,qs.stringify({
          parentId:67
        })).then(res => {
          console.log(res.data)
          if(res.data.code == '10000'){
            vm.floors = res.data.entity
          }
        })
      },
      selectArea(){//查询企业服务列表
        let vm = this
        vm.$http.post(SytemData,qs.stringify({
          parentId:79
        })).then(res => {
          console.log(res.data)
          if(res.data.code == '10000'){
            vm.Area = res.data.entity
          }
        })
      },
      closeWarningModal(){
        this.warningModal = false;
      },
      deleteService(index){
          this.projectServices.splice(index,1);
      },
      addService(){
        let index = this.projectServices.findIndex(item => item == this.newService)
        if(!this.newService){
          this.warningMessage = '请选择有效的企业服务'
          this.warningModal = true
        } else if(index<0){
          this.projectServices.push(this.newService);
          this.newService = "";
        }else {
          this.warningMessage = '请勿重复添加服务项目'
          this.warningModal = true
        }
      },
      loadfile(e){
        let vm = this
        let file = e.target.files[0];
        if(!file){
          return
        }
        let param = new FormData()
        param.append('file', file)
        param.append('module', 'enterpriseLogo')
        vm.$http.post(SystemFileUpload100023,param)
          .then(res => {
            if (parseInt(res.data.code) == 10000) {
              vm.imgPath1= imgPath+res.data.result.virtualPath
              vm.logoUrl = res.data.result.virtualPath
            }
          }).catch(err => {
            vm.warningMessage = '上传LOGO失败'
            vm.warningModal = true
        })
//        let windowURL = window.URL || window.webkitURL;
//        this.imgPath1 = windowURL.createObjectURL(file);
      },
      submit(){
        let vm = this
        if(!vm.logoUrl || !vm.enterpriseName || !vm.enterpriseTel || !vm.itemArea || !vm.projectServices){
          vm.warningMessage = '请填写有效的企业信息'
          vm.warningModal = true
          debugger
          return
        }
        let param = new FormData()
        param.append('enterpriseLogo', vm.logoUrl)
        param.append('enterpriseName', vm.enterpriseName)
        param.append('enterpriseTel', vm.enterpriseTel)
        param.append('enterpriseArea', vm.itemArea)
        param.append('enterpriseType', vm.projectServices)
        
        vm.$http.post(CommunityServiceAdd500120,param).then(res => {
          if(res.data.code == '10000'){
            vm.successMessage='添加企业服务成功'
            vm.successModal = true
            setTimeout(function(){
              vm.$router.push('/corporate/corporateServices')
            },900)
          }else {
            vm.warningMessage = res.data.content
            vm.warningModal = true
          }
        }).catch(err => {
          vm.warningMessage = '添加企业服务失败'
          vm.warningModal = true
        })
      },
    },
    filters:{
      timefilter(value,format){
        if(value){
          return new Date(value).Format(format)
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';

  #add-corporate-wrap{
    height: 100%;
    min-height: 1000px;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 3px 1px #ccc;
    .add-corporate-content{
      width: 100%;
      padding: 30px 0 50px 70px;
      table{
        tr{
          .corporate-logo{
            background-color: #f8f8f8;
            border: 1px solid #ccc;
            width: 90px;
            height: 90px;
            position: relative;
            .upload-img{
              width: 90px;
              height: 90px;
            }
            .update-avatar{
              position: absolute;
              bottom: 0;
              right: 0;
              z-index: 2;
              display: none;
            }
            .avatar-uploader-icon {
              font-size: 28px;
              color: #8c939d;
              width: 90px;
              height: 90px;
              line-height: 80px;
              text-align: center;
            }
            .upload-img-text{
              display:inline-block;
              position: absolute;
              top: 57px;
              left:15px;
            }
          }
          .upfile{//文件上传input
            cursor: pointer;
            direction: rtl;
            height: 90px;
            opacity: 0;
            width: 90px;
            filter: alpha(opacity=0);
            position: absolute;
            top: 0;
            left: 10px;
            background-color: red;
            z-index: 60;
          }
          td:nth-child(1){
            font-weight: 700;
            color: black;
            text-align: right;
            padding-bottom: 20px;
          }
          td:nth-child(2){
            padding-bottom: 20px;
            text-align: left;
            padding-left: 10px;
          }
          .service-project{
            padding: 20px;
            background-color: #f8f8f8;
            width: 600px;
            .service-project-item{
              padding-top: 20px;
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
                }
              }
            }
          }
        }
        .logo-td{
          position: relative;
          height: 90px;
          width: 90px;
          &:hover .update-avatar{
            display: block;
          }
        }
      }
    }
    .success-btn{
      margin-left: 85px;
      margin-top: 20px;
    }
  }



</style>

