<template>
	<div class="header">
		<!--<Select v-model="selectModel1" style="width:240px;text-align: left;" @on-change="temp(selectModel1)">-->
			<!--<Option v-for="item in cityList" :value="item.communityName" :key="item.communityName">{{ item.communityName }}</Option>-->
		<!--</Select>-->
		<div class="inline-block">
			<Badge :count="nums">
				<router-link to="/signed/messageInform"><Icon type="ios-bell-outline"></Icon></router-link>
			</Badge>
			<Dropdown trigger="click">
				<a href="javascript:void(0)">
					<img :src=imgPath1 v-if="imgPath1 != ''"/>
					<img src="../../static/images/temp/userHead.png" v-else/>
					{{userID}}
					<Icon type="arrow-down-b"></Icon>
				</a>
				<Dropdown-menu slot="list" >
					<Dropdown-item v-for="userBar in userBars" >
						<router-link :to=userBar.path><i :class="userBar.icon"></i>{{userBar.userContent}}</router-link>
					</Dropdown-item>
				</Dropdown-menu>
			</Dropdown>
			<Dropdown trigger="hover" class="reset-dropdown">
				<a href="javascript:void(0)"><i class="iconfont icon-shujuappxiazai"></i>下载管家APP</a>
				<Dropdown-menu slot="list">
					<div class="imgBox">
						<div class="img">
							<img src="/static/images/temp/code01.png">
						</div>
						<img src="/static/images/temp/code02.png">
					</div>
				</Dropdown-menu>
			</Dropdown>

		</div>
	</div>
</template>

<script>
	import axios from 'axios';
	import { hostAuthor, imgPath,hostUserMessagey,hostAppMgCxkjCo,MllCommunity300145 } from '../views/api.js';
	import qs from 'qs'

	export default {
		data() {
			return {
				userID: "请登录~",
				userBars: [{
					icon: "iconfont icon-gerenxinxi1",
					userContent: "个人信息",
					path: "/apartment/communityPersonal"
				}, {
					icon: "iconfont icon-yeji",
					userContent: "我的业绩",
					path: "/personal/performance"
				}, {
					icon: "iconfont icon-zhuxiao",
					userContent: "注销",
					path: "/"
				}],
				imgPath1: '',
				nums:0,
				cityList: [],
				selectModel1: null,
			}
		},
		mounted() {
			this.title();
			this.nums = sessionStorage.getItem("nums") ? sessionStorage.getItem("nums"):0;
			this.imgPath1 = sessionStorage.getItem("imgPath1")? sessionStorage.getItem("imgPath1"):'';
			this.userID = sessionStorage.getItem("userID")? sessionStorage.getItem("userID"):'';
			if(this.imgPath1 && this.userID){
				return
			}else {
				this.datas();
			}


		},
		methods: {
			datas() {
				let vm = this;
				axios.get(hostAuthor)
				.then((response) => {
					// console.log(response);
					if(response.status == 200 && response.data.code == 10000) {
						if(response.data.entity.headPic != null) {
							vm.imgPath1 = imgPath + response.data.entity.headPic;
							sessionStorage.setItem("imgPath1",vm.imgPath1);
						}
						else{
							vm.imgPath1 = ''
						}
						if(response.data.entity.userName){
							vm.userID = response.data.entity.userName;
							sessionStorage.setItem("userID",vm.userID);
						}
						else{
							vm.userID = '请登录~'
						}
					}
				})
				.catch((error) => {
					console.log(error);
				})


			},
			title() {
				let vm = this
				let Model = sessionStorage.getItem('communityId');

				axios.post(MllCommunity300145).then((response) => { //获取社区分类数据
						// console.log(response);
						if(response.status == 200 && response.data.code == 10000) {
							this.cityList = response.data.pageBean;
							// console.log(this.cityList);
							if(Model) {
								this.selectModel1 = this.cityList[this.cityList.findIndex(item => item.communityId == Model)].communityName;
								let haveper = this.cityList[this.cityList.findIndex(item => item.communityId == Model)].havePer;
								this.$emit("communityId",{'communityId':Model,'havepers':haveper});
							} else {
								this.selectModel1 = this.cityList[0].communityName;
								let haveper = this.cityList[0].havePer;
								// sessionStorage.setItem('communityId', this.cityList[0].communityId);
								this.$emit("communityId",{'communityId':this.cityList[0].communityId,'havepers':haveper});
							}

						}
					})
					.catch((error) => {
						// console.log(error);
					})
			},
			temp(val){
				let Index = this.cityList[this.cityList.findIndex(item => item.communityName == val)].communityId;
				// console.log(val);
				sessionStorage.setItem('communityId', Index);
				sessionStorage.setItem('communityName', val);
				this.title();
			}
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	@import '../sass/base/_mixin.scss';
	@import '../sass/page/_head.scss';
	.inline-block {
		display: inline-block;
	}
</style>
