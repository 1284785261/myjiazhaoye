<template>
  <div class="shortOrderListClass">
    <div>
      <div class="form-item">
        <b>社区：</b>
        <Select v-model="communityId" style="width:180px">
          <Option v-for="community in  stationSelectList" :value="community.communityId"
                  :key="community.communityId">{{ community.communityName }}
          </Option>
        </Select>
      </div>
      <div class="form-item">
        <b>社区长租名称：</b>
        <Input style="width: 225px;" v-model="housetypeLikeName"></Input>
      </div>
      <div class="form-item">
        <Button type="primary" style="width: 120px;height: 36px;" @click="search()" >查询</Button>
      </div>
      <div class="form-item ">
        <Button type="primary" style="width: 120px;height: 36px;" @click="goToNewShort" >新增</Button>
      </div>
    </div>
    <div class="tableDiv">
      <table class="table ivu-table" >
        <tr>
          <th>社区名称</th>
          <th>长租房名称</th>
          <th>短租房名称</th>
          <th>公寓设施</th>
          <th width="200px">服务说明</th>
          <th>房间信息</th>
          <th width="200px">操作</th>
        </tr>
        <tr v-for="(item,index) in shortSettingList">
          <td>{{item.communityName}}</td>
          <td>{{item.housetypeName}}</td>
          <td>{{item.name}}</td>
          <td>{{item.roomSettingStr}}</td>
          <td>{{item.serviceInfo}}</td>
          <td>房型面积{{item.housetypeArea}}m²,{{item.bedNum}}{{item.bedLength}}</td>
          <td>
            <a @click="deleteShort(item.housetypeId)">删除</a>
            <a @click="goToNewShort(item.housetypeId)">编辑</a>
            <a @click="openUploadModal(item.housetypeId,index)">图片上传</a>
          </td>
        </tr>
      </table>
      <div class="block">
        <el-pagination @current-change="search" :current-page="pageNum" :page-size="10" layout=" prev, pager, next, total,jumper" :total=totalNum>
        </el-pagination>
      </div>
    </div>


    <div class="upload-modal" v-if="uploadModal" ref="outUploadModal" @click="closeUploadModal()"></div>
    <div class="upload-content uploadModal" v-if="uploadModal" ref="uploadModal">
      <div class="upload-content-title">
        <span>短租户型图片上传</span>
      </div>
      <div class="modal-content-meddle">
        <div class="form-item">
        </div>
        <el-upload
          :action="host"
          :file-list="fileList"
          list-type="picture-card"
          :format="['jpg','jpeg','png']"
          :max-size="2048"
          :on-format-error="handleFormatError"
          :on-exceeded-size="handleMaxSize"
          :before-upload="handleBeforeUpload"
          :on-success="handleSuccess"
          :on-preview="handlePictureCardPreview"
          multiple
          :limit="10"
          type="drag"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" size="tiny">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </div>
      <div class="form-btn-wrap">
        <Button type="primary" style="width: 120px;height: 36px;margin-right: 150px;" @click="submitUpload" >提交</Button>
        <Button type="primary" style="width: 120px;height: 36px;" @click="closeUploadModal" >取消</Button>
      </div>
      <div class="modal-close-btn" @click="closeUploadModal()">
        <Icon type="ios-close-empty"></Icon>
      </div>
    </div>

  </div>
</template>

<script>
  import menuBox from '../../components/menuBox.vue';
  import rightHeader from '../../components/rightHeader.vue';
  import footerBox from '../../components/footerBox.vue';
  import successModal from '../../components/successModal.vue';
  import warningModal from '../../components/warningModal.vue';
  import axios from 'axios';
  import {allCommunity,CxkjCommunityPmsRoomTypeTable200191,CxkjCommunityPmsRoomTypeDelete200190,CxkjCommunityPmsRoomTypesubmit200189,host,imgPath} from '../api.js';
  import qs from 'qs';

  export default {
    components: {
      rightHeader,
      menuBox,
      footerBox,
      successModal,
      warningModal
    },
    data() {
      let _this = this;
      return {
        activeTabName: "shortRent",//右侧导航栏选中状态
        host:"",
        imgPath:"",//图片路径前缀
        successModal: false,//成功弹框显示控制
        warningModal: false,//失败弹框显示控制
        successMessage: '',//成功弹框提示消息
        warningMessage: '',//失败弹框提示消息
        selectShow:false,//条件查询显示或隐藏
        stationSelectList:[],//社区列表
        communityId:null,//被选中的社区
        defaultList:[],//默认显示图片
        pageNum:1,//当前页数
        totalNum:0,//总条数
        dialogImageUrl:"",//预览图片URL
        dialogVisible:false,
        uploadModal:false,
        housetypeLikeName:"",//长租房名称
        shortSettingList:[],
        fileList:[{name:"hhhhh",url:"http://kaisa-cxkj.oss-cn-shenzhen.aliyuncs.com/test/files/default/fangchanzhengea2x180201144986.jpg"}],//预览图片
        uploadFileList:[],
        housetypeId:"",//编辑中的短租户型ID
      }
    },
    mounted() {
      this.host = host + '/cxkj-room/apis/system/file/SystemFileUpload100023';
      this.imgPath = imgPath;
      this.getCommunityData();
    },
    methods: {
      //获取社区id
      getCommunityData(){
        var that = this;
        var value = sessionStorage.getItem("communityId");
        this.$http.get(allCommunity)
          .then(function(res){
            if(res.status == 200 && res.data.code == 10000){
              that.stationSelectList = res.data.entity;
              if(value){
                that.communityId = parseInt(value);
              }else{
                that.communityId = parseInt(that.stationSelectList[0].communityId);
              }
              //水电账单
              that.getShortSettingList({communityId:that.communityId,pageNum:1,pageSize:10});
            }
          })
      },
      //获取短租列表信息
      getShortSettingList(param){
        let vm = this;
        this.$http.post(
          CxkjCommunityPmsRoomTypeTable200191,qs.stringify(param)
        ).then(function(res){
          if(res.data.code == 10000){
            vm.shortSettingList = res.data.entity.page;
            vm.totalNum = res.data.entity.totalNum;
            console.log(vm.shortSettingList);
            for(let j =0;j<vm.shortSettingList.length;j++){
              let configNew = vm.shortSettingList[j].configNew;
              let roomSettingStr = "";
              for(let i =0;i<configNew.length;i++){
                roomSettingStr += configNew[i].dataName+",";
              }
              roomSettingStr = roomSettingStr.substring(0,roomSettingStr.length-1);
              vm.shortSettingList[j].roomSettingStr = roomSettingStr;
            }

          }
          else{
            vm.shortSettingList = [];
            vm.totalNum = 0;
          }

        })
      },
      search(page){
        //接口待修改
        let params = {
          pageNum:page || 1,
          communityId:this.communityId,
        }
        if(this.housetypeLikeName){
          params.housetypeLikeName = this.housetypeLikeName;
        }
        if(this.communityId){
          params.communityId = this.communityId;
        }

        this.getShortSettingList(params);
      },
      //删除短租配置
      deleteShort(housetypeId){
        let vm = this;
        this.$http.post(
          CxkjCommunityPmsRoomTypeDelete200190,qs.stringify({housetypeId:housetypeId})
        ).then(function(res){
            if(res.data.code == 10000){
              vm.search();
            }
        })
      },

      /**
       * 分页插件
       **/
      handleCurrentChange3(){

      },


      handleFormatError(){
      },
      handleMaxSize(){
      },
      //文件上传前
      handleBeforeUpload(){

      },
      handleRemove(file,all){
        for(let i =0;i<this.fileList.length;i++){
            if(this.fileList[i].name == file.name){
              this.fileList.splice(i,1);
            }
        }
        for(let i =0;i<this.uploadFileList.length;i++){
          if(this.uploadFileList[i].name == file.name){
            this.uploadFileList.splice(i,1);
          }
        }
      },
      //文件上传成功时
      handleSuccess(res, file){
        if(res.code == 10000){
          file.url = imgPath + res.result.virtualPath;
          let len = res.result.virtualPath.split("/");
          file.name = len[len.length-1];
          this.fileList.push({name:file.name,url:this.imgPath+res.result.virtualPath});
          this.uploadFileList.push({name:file.name,url:res.result.virtualPath});
        }
      },
      //图片上传按钮
      submitUpload(housetypeId){
        let that = this;
        let fileStr ="";
        for(let i =0;i<this.uploadFileList.length;i++){
          fileStr += this.uploadFileList[i].url+",";
        }
        fileStr = fileStr.substring(0,fileStr.length-1);
        let param = {
          communityId:this.communityId,
          housetypeId:this.housetypeId,
          images:fileStr,
        };
        this.$http.post(
          CxkjCommunityPmsRoomTypesubmit200189,qs.stringify(param)
        ).then(function(res){
          console.log(res);
          if(res.data.code == 10000){
            that.closeUploadModal();
            that.search();
            that.$emit("successUpload");
          }
        })
      },

      //图片预览
      handlePictureCardPreview(file){
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },

      /**
       * 打开创建哑帐弹框
       */
      openUploadModal(housetypeId,index){
        let images = this.shortSettingList[index].images;
        this.fileList = [];
        this.uploadFileList = [];
        if(images &&　images.indexOf(",")!=-1){//大于一个照片
          let imagesArr = images.split(",");
          for(let i =0;i<imagesArr.length;i++){
            let len = imagesArr[i].split("/");
            this.fileList.push({name:len[len.length-1],url:this.imgPath+imagesArr[i]});
            this.uploadFileList.push({name:len[len.length-1],url:imagesArr[i]});
          }
        }

        this.uploadModal = true;
        this.housetypeId = housetypeId;//保存编辑中的房型ID
        setTimeout(() => {//将this.uploadModal = true;渲染完成后，否则找不到节点
          this.$nextTick(() => {
            document.querySelector("#app").firstChild.appendChild(this.$refs.uploadModal);
            document.querySelector("#app").firstChild.appendChild(this.$refs.outUploadModal);
          })
        }, 0)
      },
      /**
       * 关闭创建哑帐弹框
       */
      closeUploadModal(){
        document.querySelector("#app").firstChild.removeChild(this.$refs.uploadModal);
        document.querySelector("#app").firstChild.removeChild(this.$refs.outUploadModal);
      },
      goToNewShort(housetypeId){
        if(housetypeId > 0){
          this.$router.push({name:"newShortSetting",query:{housetypeId:housetypeId,communityId:this.communityId}})
        }else{
          this.$router.push({name:"newShortSetting",query:{communityId:this.communityId}})
        }
        
      }
    },
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';
  @import '../../sass/page/shortRent.scss';

  .upload-modal{
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

  .upload-content{
    width: 820px;
    height: 520px;
    min-height:320px;
    background-color:#fff;
    border-radius: 5px;
    margin: auto;
    position: fixed;
    z-index:9999;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    .upload-content-title{
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
    .modal-content-meddle{
      padding: 0 20px;
      height: 340px;
      .form-item{
        display: inline-block;

      }
    }
    .form-btn-wrap{
      text-align: center;
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
    //预览图片插件
    .el-dialog{
      width: 880px;
    }
    .el-upload__input{
      display: none;
    }
  }
</style>
