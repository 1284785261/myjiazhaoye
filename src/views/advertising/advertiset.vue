<template>
	<div>
		<menu-box></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
					<span>您现在的位置： </span>
					<router-link class="active" to="/advertising/advertiset">广告设置</router-link>
				</div>
				<div class="ivu-bar-title">
					<h3><i class="icon icon-iden"></i>广告设置</h3>
					<!--<span>佳兆业航运WEWA空间</span>-->
				</div>
				<div id="advertiset">
					<div class="advertiset1">
						<span>Banner管理</span>
						<router-link to="/advertising/addBanner">+ 添加Banner</router-link>
					</div>
					<div v-if="Datas != null">
						<table>
							<thead>
								<td width="25%">缩略图</td>
								<td width="30%">图片说明</td>
								<td>排序</td>
								<td>状态</td>
								<td width="20%">操作</td>
							</thead>
							<tr v-for="item in Datas">
								<td><img :src='imgPaths + item.bannerPic'></td>
								<td v-if="item.imgExplain != null">{{item.imgExplain}}</td>
								<td v-else>无</td>
								<td>{{item.listNumber}}</td>
								<td>{{item.isClose | order(item.isClose)}}</td>
								<td>
									<router-link :to="{path:'/advertising/addBanner',query:{id:item.adId}}">修改</router-link>
									<a @click="deletes(item.adId)">删除</a>
								</td>
							</tr>
						</table>
						<el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size=pageSize layout="prev, pager, next,total,jumper" :total=totalNum>

						</el-pagination>
					</div>
					<div v-else class="kbt">
						<img src="../../../static/images/icon/ktb_03.png" style="margin-top: 150px;">
					</div>
				</div>

			</div>
			<footer-box></footer-box>
		</div>
		<warning-modal :warning-message="warningMessage" @closeWarningModal="closeWarningModal()" v-if="warningModal"></warning-modal>
		<success-modal :success-message="successMessage" v-if="successModal"></success-modal>
	</div>
</template>

<script>
	import '../../sass/style/advertiset.css';
	import menuBox from '../../components/menuBox.vue';
	import rightHeader from '../../components/rightHeader.vue';
	import footerBox from '../../components/footerBox.vue';
	import successModal from '../../components/successModal.vue';
	import warningModal from '../../components/warningModal.vue';
	import qs from 'qs';
	import axios from 'axios';
	import { hostAdvert, imgPath, hostDelete } from '../api.js';

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
				isHide: false,
				currentPage3: 1,
				Datas: null,
				totalNum: null,
				pageNum: 1,
				imgPaths: null,
				pageSize: 4,
				successModal: false,
				warningModal: false,
				successMessage: '添加成功',
				warningMessage: '添加信息不完整，请检查添加社区信息'
			}
		},
		mounted() {
			this.datas();
			this.imgPaths = imgPath;
		},
		methods: {
			closeWarningModal() {
				this.warningModal = false;
			},
			handleCurrentChange(val) {
				//console.log(`当前页: ${val}`);
				this.pageNum = val;
				this.datas();
			},
			datas() {
				let vm = this               //获取所有banner数据
				let pageNum = vm.pageNum;
				let pageSize = vm.pageSize;
				axios.post(hostAdvert,
						qs.stringify({
							pageNum: pageNum,
							pageSize: pageSize
						})).then((response) => {
						console.log(response);
						if(response.status == 200 && response.data.code == 10000) {
							this.Datas = response.data.pageBean.page;
							this.totalNum = response.data.pageBean.totalNum;
						} else {
							console.log('获取数据异常');
						}
					})
					.catch((error) => {
						console.log(error);
					})
			},
			deletes(id) {
				axios.post(hostDelete, //删除广告
						qs.stringify({
							adIds: id
						}))
					.then((response) => {
						console.log(response);
						if(response.status == 200 && response.data.code == 10000) {

							this.successMessage = '删除成功';
							this.successModal = true;
							setTimeout(() => {
								this.successModal = false;
								this.datas();
							}, 2000);
							
						} else {
							this.warningMessage = res.data.content;
              				this.warningModal = true;
						}

					})
					.catch((error) => {
						console.log(error);
						this.warningMessage = '删除失败';
              			this.warningModal = true;
					})

			}

		},
		filters: {
			order(number) {
				if(number == '0') {
					return '开放'
				} else if(number == '1') {
					return '关闭'
				}
			}
		},
		created() {

		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	@import '../../sass/base/_mixin.scss';
	@import '../../sass/base/_public.scss';
</style>