<template>
  <div>
    <menu-box></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="ivu-site">
          <span>您现在的位置：</span>
          <router-link  class="active" to="/apartment/communityManagement">会员信息</router-link>
        </div>
        <div class="ivu-bar-title">
          <h3><i class="icon icon-iden"></i>会员信息</h3>
        </div>
        <div id="member-information-wrap">
          <div class="memeber-conten-wrap">
            <ul class="member-information-content">
              <li class="member-content-first-li">
                <h3><i class="icon icon-iden"></i>个人信息</h3>
                <div class="member-img-content">
                  <div class="member-img">
                    <el-upload
                      action="https://jsonplaceholder.typicode.com/posts/"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload">
                      <template v-if="imageUrl">
                        <img  :src="imageUrl" class="avatar">
                        <img class="update-avatar" src="../../../static/images/icon/update-member-img.png" alt="">
                      </template>
                      <template v-else>
                        <i class="el-icon-plus avatar-uploader-icon"></i>
                        <span class="upload-img-text">上传照片</span>
                      </template>
                    </el-upload>
                    <input type="file" class="upfile"  accept="image/png,image/jpg">
                  </div>
                  <table class="member-information-table">
                    <tr>
                      <td><span>会员名称 :</span><span style="font-weight: 700">{{userData.userName}}</span></td>
                      <td><span>会员性别 :</span><span v-if="userData.gender == 1">男</span><span v-if="userData.gender == 2">女</span></td>
                    </tr>
                    <tr>
                      <td><span>会员手机 :</span><span>{{userData.userPhone}}</span></td>
                      <td><span>会员年龄 :</span><span>{{userData.userBirthday}}岁</span></td>
                    </tr>
                    <tr>
                      <td><span>会员邮箱 :</span><span>{{userData.userEMail}}</span></td>
                      <td><span>会员身份证 :</span><span>{{userData.userIdCard}}</span></td>
                    </tr>
                  </table>
                </div>
              </li>
              <li v-if="true">
                <h3><i class="icon icon-iden"></i>个人记录</h3>
                <ul class="time-step-list">
                  <li>
                    <span class="step-icon"></span>
                    <span class="step-time">2016-05-30</span>
                    <span class="step-content">入住19号小区24栋6楼6号</span>
                    <div class="time-line"></div>
                  </li>
                  <li>
                    <span class="step-icon"></span>
                    <span class="step-time">2017-05-30</span>
                    <span class="step-content">合同期满，退房</span>
                    <div class="time-line"></div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>

      </div>
      <footer-box></footer-box>
    </div>
  </div>
</template>

<script>
  import menuBox from '../../components/menuBox.vue';
  import  rightHeader from '../../components/rightHeader.vue';
  import  footerBox from '../../components/footerBox.vue';
  import qs from 'qs';
  import {eemberInformation,imgPath} from '../api.js';


  export default {
    components:{
      rightHeader,
      menuBox,
      footerBox
    },
    data(){
      return{
        value5: 4.8,
        imageUrl: '',
        userId:"",
        userData:{},
        imgPath:"",
      }
    },
    mounted(){
      this.imgPath = imgPath;
      this.userId = this.$route.query.id;
      this.getUserInfo({id:this.userId});
    },
    methods:{
      getUserInfo(params){
          var vm  = this;
        this.$http.post(eemberInformation,qs.stringify(params)).then(function(res){debugger
          if(res.status == 200 && res.data.code == 10000){
            vm.userData = res.data.entity;
          }

        })
      },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {

        const isJPG = (file.type==="image/jpg" || file.type==="image/jpeg" || file.type==="image/png");
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';


  #member-information-wrap {
    padding-bottom: 50px;
    width: 100%;
    min-height: 1000px;
    background-color: #fff;
    box-shadow: 0 3px 1px #ccc;
    .memeber-conten-wrap{
      padding: 40px 50px;
      .member-information-content{
        /*margin: 40px 50px;*/
        height: 100%;
        .member-content-first-li{
          border-bottom:1px dashed #ccc;
          /*margin-top: 30px;*/
        }
        li:after{
          content: "";
          clear: both;
          display: block;
        }
        li:last-child{
          border-bottom: none;
        }
      }
      .member-information-content{
        h3{
          display: inline-block;
          color: rgb(3,139,226);
          i{
            margin-right: 10px;
            background:url("/static/images/icon/iden.png") no-repeat;
            background-size: 80%;
            width: 6px;
            height: 24px;
          }
        }
        .member-img-content{
          .member-img{
            float: left;
            margin: 30px 20px;
            height: 100px;
            width: 100px;
            .avatar{
              border-radius: 10px;
              height: 100px;
              width: 100px;
              border: none;
            }
            .update-avatar{
              position: absolute;
              bottom: 0;
              right: 0;
              display: none;
            }
            :hover .update-avatar{
              display: block;
            }
            .el-upload{
              color: rgb(184,184,184);
              background: rgb(248,248,248);
              border: 1px solid #ccc;
              border-radius: 10px;
              position: relative;
            }
            .avatar-uploader-icon {
              font-size: 28px;
              color: #8c939d;
              width: 100px;
              height: 100px;
              line-height: 80px;
              text-align: center;
            }
            .upload-img-text{
              display:inline-block;
              position: absolute;
              top: 57px;
              left: 21px;

            }
          }
          .upfile{//文件上传input
            cursor: pointer;
            direction: rtl;
            height: 100px;
            opacity: 0;
            width: 100px;
            filter: alpha(opacity=0);
            position: absolute;
            top: 169px;
            left: 91px;
            background-color: red;
            z-index: 60;
          }
          .member-information-table{
            float: left;
          }
          table{
            padding-top: 30px;
            tr{
              td{
                padding: 5px 50px 5px 0;
                span{
                  display: inline-block;
                }
                span:first-child{
                  width: 85px;
                  text-align: right;
                }
                span:nth-child(2){
                  color: black;
                  padding-left: 10px;
                }
              }
            }
          }
        }
      }
    }
    .time-step-list{
      margin: 30px 20px;
      li{
        width: 100%;
        border: none;
        .step-icon{
          display: inline-block;
          width: 15px;
          height: 15px;
          border-radius: 100%;
          border: solid 1px rgb(3,139,226);
        }
        .step-time{
          padding-left: 20px;
          padding-right: 30px;
        }
        .time-line{
          height: 26px;
          width: 100%;
          margin-left: 7px;
          border-left: dashed 1px #ccc;
          position: relative;
          top: -3px;
        }
      }
      li:last-child{
        .step-icon{
          background-color: rgb(3,139,226);
        }
        .time-line{
          display: none;
        }
      }
    }



  }
</style>
