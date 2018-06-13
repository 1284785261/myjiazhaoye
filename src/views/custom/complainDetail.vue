<template>
	<div>
		<menu-box :active-tab-name="activeTabName"></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
					<span>您现在的位置：</span>
					<router-link class="active" to="/custom/customServiceManagement">客服管理</router-link><span>>投诉详情</span>
				</div>
				<div class="ivu-bar-title">
					<h3><i class="icon icon-iden"></i>投诉详情</h3>
				</div>
				<div id="complain-detail-wrap">
					<div class="order-detail-wrap-head">
						<!--投诉状态0、待确认1、店长处理中2、店长已处理3、客服处理中4、已完结(待回访)5、已回访-->
						<img v-if="complainData.complainStatus == 5" src="../../../static/images/icon/custom_yihuifang.png" alt="投诉详情-已回访">
						<img v-else-if="complainData.complainStatus == 3 || complainData.complainStatus == 1" src="../../../static/images/icon/custom_chulizhong.png" alt="投诉详情-店长处理中">
						<img v-else-if="complainData.complainStatus == 2" src="../../../static/images/icon/yichuli.png" alt="投诉详情-已处理">
						<img v-else-if="complainData.complainStatus == 4" src="../../../static/images/icon/yichuli.png" alt="投诉详情-已完结">
						<img v-else-if="complainData.complainStatus == 0" src="../../../static/images/icon/custom_huifang.png" alt="投诉详情-待确认">
						<div class="order-detail-wrap-head-content">
							<h3>
                <span style="padding-right: 10px;">工号:{{complainData.complainNum}}</span>
                <span v-if="complainData.complainStatus == 0" class="colorSpan" style="color: #FF6612;">待确认</span>
                <span v-else-if="complainData.complainStatus == 1" class="colorSpan" style="color: #96a5af;">店长处理中</span>
                <span v-else-if="complainData.complainStatus == 2" class="colorSpan" style="color: #96a5af;">店长已处理</span>
                <span v-else-if="complainData.complainStatus == 3" class="colorSpan" style="color: #3dc4b2;">客服处理中</span>
                <span v-else-if="complainData.complainStatus == 4" class="colorSpan" style="color: #FF6612;">待回访</span>
                <span v-else-if="complainData.complainStatus == 5" class="colorSpan" style="color: #96a5af;">已回访</span>
              </h3>
							<p>发起投诉时间:{{complainData.createTime | timefilter("yyyy-MM-dd hh:mm")}}</p>
						</div>
					</div>
					<ul class="order-detail-content">
						<li style="position: relative;width: 100%;" :class="{'border-bottom':complainData.complainStatus == 0}">
							<h3><i class="icon icon-iden"></i>用户信息</h3>
							<table>
								<tr>
									<td>姓名 :</td>
									<td>{{complainData.userName}}</td>
								</tr>
								<tr>
									<td>已注册手机 :</td>
									<td>{{complainData.userPhone}}</td>
								</tr>
								<tr>
									<td><b>事情经过 :</b></td>
									<td>
										<p style="max-width: 650px;">{{complainData.complainContent}}</p>
									</td>
								</tr>
							</table>
							<!-- <ul class="logs" v-show="images.length">
								<li class="logs1" v-for="item in images">
									<img :src='imgPath + item' style="width: 200px;height: 120px;" />
								</li>
							</ul> -->
							<div class="ivu-warp-Community" v-show="images.length">

									<div class="demo-upload-list" v-for="item in images">
								<template>
									<img :src="imgPath + item">
									<div class="demo-upload-list-cover">
										<Icon type="ios-eye-outline" @click.native="handleView(item)"></Icon>
									</div>
								</template>
							</div>
									<Modal v-model="visible">
										<img :src="imgPath + imgName" v-if="visible">
									</Modal>
							</div>
						</li>
						<!--isCustomService:0、店长处理1、客服处理   isReturnVisit:是否是回访0、不是1、是-->
						<template v-for="(item,index) in complainData.recordList" v-if="complainData.complainStatus != 1">
							<li v-if="item.isCustomService == 0">
								<h3 v-if="index==0"><i class="icon icon-iden"></i>处理记录</h3>
								<table>
									<tr>
										<td>店长确认接受 :</td>
										<td>{{item.confirmTime | timefilter("yyyy-MM-dd hh:mm")}}</td>
									</tr>
								</table>
							</li>
							<li>
								<table>
									<tr>
										<td v-if="item.isCustomService == 0">店长完成处理 :</td>
										<td v-if="item.isCustomService == 1 &&　item.isReturnVisit == 0">客服介入处理 :</td>
										<td v-if="item.isCustomService == 1 &&　item.isReturnVisit == 1">客服回访 :</td>
										<!--两个不同的时间-->
										<td v-if="item.isCustomService == 0">{{item.completeTime | timefilter("yyyy-MM-dd hh:mm")}}</td>
										<td v-if="item.isCustomService == 1">{{item.createTime | timefilter("yyyy-MM-dd hh:mm")}}</td>
									</tr>
									<tr>
										<td v-if="item.isReturnVisit == 0"><b>处理结果 :</b></td>
										<td v-else-if="item.isReturnVisit == 1"><b>回访反馈 :</b></td>
										<td>{{item.complainResult}}</td>
									</tr>
									<tr v-if="item.isReturnVisit == 0">
										<td><b>用户满意度 :</b></td>
										<td><span v-if="item.userDegree==0">满意</span><span v-else-if="item.userDegree==1">不满意</span></td>
									</tr>
									<tr v-if="item.isReturnVisit == 0">
										<td><b>用户反馈 :</b></td>
										<td>{{item.userFeedback}}</td>
									</tr>
								</table>
							</li>
						</template>
						<li v-if="false">
							<table>
								<tr>
									<td>客服回访 :</td>
									<td>{{item.createTime | timefilter("yyyy-MM-dd hh:mm")}}</td>
								</tr>
								<tr>
									<td><b>回访反馈 :</b></td>
									<td>{{item.complainResult}}</td>
								</tr>
							</table>
						</li>
						<li v-if="complainData.complainStatus == 3">
							<table>
								<tr>
									<td style="position: relative;top: -60px"><b>客服介入处理 :</b></td>
									<td><textarea name="remarks" style="width:400px;height: 140px;padding: 5px;" placeholder="请填写处理结果" v-model="complainContent"></textarea></td>
								</tr>
								<tr>
									<td></td>
									<td>
										<Button type="primary" style="width: 120px;" @click="costomerReturn()">确认已处理</Button>
									</td>
								</tr>
							</table>
						</li>
						<li v-if="complainData.complainStatus == 4 && jurisdiction('CUSTOMER_UPDATE')">
							<table>
								<tr>
									<td style="position: relative;top: -60px"><b>客服回访 :</b></td>
									<td><textarea name="remarks" style="width:400px;height: 140px;padding: 5px;" placeholder="请填回访内容" v-model="complainContent2"></textarea></td>
								</tr>
								<tr>
									<td></td>
									<td>
										<Button type="primary" style="width: 120px;" @click="costomerReturn2()">确认回访</Button>
									</td>
								</tr>
							</table>
						</li>
					</ul>
					<!--<div class="accept-btn" v-if="complainData.complainStatus == 0">-->
					<!--<Button type="primary" style="width: 120px;">确认接收</Button>-->
					<!--</div>-->
				</div>
				<success-modal :success-message="successMessage" v-if="false"></success-modal>
				<warning-modal :warning-message="warningMessage" @closeWarningModal="closeWarningModal()" v-if="false"></warning-modal>
			</div>
			<footer-box></footer-box>
		</div>
	</div>
</template>

<script>
import menuBox from "../../components/menuBox.vue";
import rightHeader from "../../components/rightHeader.vue";
import footerBox from "../../components/footerBox.vue";
import successModal from "../../components/successModal.vue";
import warningModal from "../../components/warningModal.vue";
import { complainDetail, CustomerService300126, imgPath } from "../api.js";
import qs from "qs";

export default {
  components: {
    rightHeader,
    menuBox,
    footerBox,
    successModal,
    warningModal
  },
  data() {
    return {
      activeTabName:'customServiceManagement',
      warningMessage: "",
      successMessage: "",
      testModal: false,
      complainId: "",
      complainData: {},
      complainContent: "",
      complainContent2: "",
      images: [],
      imgPath: "",
      imgName: "",
      visible: false
    };
  },
  mounted() {
    this.complainId = this.$route.query.id;
    this.imgPath = imgPath;
    this.getComplainDetail({
      complainId: this.complainId
    });
  },
  methods: {
    getComplainDetail(data) {
      var that = this;
      this.$http.get(complainDetail, {
          params: data
        })
        .then(function(res) {
          if(res.status == 200 && res.data.code == 10000) {
            that.complainData = res.data.entity;
            if(that.complainData.complainImage){
              let strs = that.complainData.complainImage.split(",");
              that.images = strs;
            }
          }
        });
    },
    //确认已处理
    costomerReturn() {
      var that = this;
      this.$http
        .post(
          CustomerService300126,
          qs.stringify({
            complainStatus: 3,
            complainContent: this.complainContent,
            complainId: this.complainId
          })
        )
        .then(function(res) {
          if (res.status == 200 && res.data.code == 10000) {
            that.getComplainDetail({
              complainId: that.complainId
            });
          }
        });
    },
    //确认回访
    costomerReturn2() {
      var that = this;
      this.$http
        .post(
          CustomerService300126,
          qs.stringify({
            complainStatus: 4,
            complainContent: this.complainContent2,
            complainId: this.complainId
          })
        )
        .then(function(res) {
          if (res.status == 200 && res.data.code == 10000) {
            that.getComplainDetail({
              complainId: that.complainId
            });
          }
        });
    },
    handleView(name) {
	// console.log(name);
      this.imgName = name;
      this.visible = true;
    },
    closeWarningModal() {
      this.testModal = false;
    }
  },
  filters: {
    timefilter(value, format) {
      if (value) {
        return new Date(value).Format(format);
      }
    }
  }
};
</script>

<style lang="scss" rel="stylesheet/scss">
@import "../../sass/base/_mixin.scss";
@import "../../sass/base/_public.scss";
#complain-detail-wrap {
  padding-bottom: 50px;
  width: 100%;
  min-height: 1000px;
  background-color: #fff;
  box-shadow: 0 3px 1px #ccc;
  .order-detail-wrap-head {
    position: relative;
    height: 160px;
    width: 100%;
    background-color: rgb(247, 251, 255);
    border-bottom: 1px solid rgb(220, 220, 220);
    img {
      margin: 25px 45px;
    }
    .order-detail-wrap-head-content {
      height: 100%;
      display: inline-block;
      h3 {
        span.colorSpan {
          padding-left: 150px;
        }
      }
      p {
        position: relative;
        top: 10px;
      }
    }
  }
  ul {
    margin: 40px 50px;
    height: 100%;
    li {
      border-bottom: 1px dashed #ccc;
      margin-top: 30px;
    }
    li:last-child {
      border-bottom: none;
    }
    .border-bottom {
      border-bottom: 1px dashed #ccc !important;
    }
  }
  .accept-btn {
    margin-left: 180px;
    margin-top: 20px;
  }
  .order-detail-content {
    h3 {
      display: inline-block;
      color: rgb(3, 139, 226);
      i {
        margin-right: 10px;
        background: url("/static/images/icon/iden.png") no-repeat;
        background-size: 80%;
        width: 6px;
        height: 24px;
      }
    }
    table {
      tr > td:nth-child(1) {
        text-align: right;
      }
      tr {
        td {
          text-align: left;
          padding: 10px;
        }
        td:first-child {
          width: 115px;
        }
        td.payInfo {
          text-align: left;
          padding-left: 40px;
          color: red;
        }
      }
    }
    .ivu-modal-wrap .ivu-modal .ivu-modal-content .ivu-modal-close {
			display: inline-block;
			background: #333333;
			width: 30px;
			border-radius: 50%;
			text-align: center;
			position: absolute;
			top: -5%;
			right: -5%;
		}

		.ivu-modal-wrap .ivu-modal .ivu-modal-content .ivu-modal-body {
			width: 800px;
			height: 600px;
			overflow: hidden;
		}

		.ivu-modal-wrap .ivu-modal .ivu-modal-content .ivu-modal-body img {
			width: 100%;
			height: 550px;
		}
  }
  .ivu-warp-Community {
		width: 100%;
		min-height: 130px;
		background: #fff;
    overflow: hidden;
    border-bottom: none;
    position: relative;
    .demo-upload-list{
      display: inline-block;
      width: 160px;
      height: 120px;
      text-align: center;
      line-height: 108px;
      border: 1px solid #dcdcdc;
      overflow: hidden;
      padding: 3px;
      background: #fff;
      position: relative;
      box-shadow: 0 1px 1px rgba(0,0,0,.2);
      margin-right: 20px;
    }
    .demo-upload-list img{
      width: 100%;
      height: 100%;
    }
    .demo-upload-list-cover{
      display: none;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover {
      cursor: pointer;
      display: block;
    }
	}
	.demo-upload-list-cover{
    i{
      &:before{
          display: none;
        }
    }
		.ivu-icon-ios-eye-outline{
			background-image: url("/static/images/icon/eye-outline.png");
			width: 30px;
			height: 30px;
			position: absolute;
			left: 50%;
			top: 50%;
			margin-left: -15px;
			margin-top: -15px;
    }
	}
}


.ivu-modal-footer {
  display: none;
}

.ivu-modal-wrap{
  .ivu-modal {
    width: 800px!important;
    height: 600px;
    .ivu-modal-content{
      .ivu-modal-close {
        display: inline-block;
        background: #333333;
        width: 30px;
        border-radius: 50%;
        text-align: center;
        position: absolute;
        top: -5%;
        right: -5%;
      }
      .ivu-modal-body {
        width: 800px;
        height: 600px;
        overflow: hidden;
        img {
          width: 100%;
          height: 550px;
        }
      }
    }
  }
}
</style>
