<template>
	<div id="housesubscrib">
		<menu-box></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box mps">
				<div class="ivu-site">
					<span>您现在的位置： </span>
					<router-link class="active" to="/system/systems">系统管理</router-link>
				</div>
				<el-tabs v-model="activeName2" type="card">
					<el-tab-pane label="权限配置" name="first">
						<div class="allotjuris">
							<div class="allotjur">
								<img src="../../../static/images/icon/iden.png" /> <span>用户信息</span>
							</div>
							<div class="allotjur2">
								<span>权限组名称：</span><input type="text" v-model="name" />
							</div>
							<table>
								<tr v-for="(item,index) in UserList">
									<td>
										<Checkbox v-model="list[index]" @click.prevent.native="handleCheckAll(item,index)"><span>{{item.title.powerItemName}}</span></Checkbox>
									</td>
									<td>
										<Checkbox v-for="(ite,inde) in item.list" v-model="ite.sing" @on-change="checkAllGroupChange(item,inde)"><span>{{ite.powerItemName}}</span></Checkbox>
									</td>
								</tr>
							</table>

							<a class="tjss" @click="addcommunis">确定</a>
						</div>
					</el-tab-pane>
				</el-tabs>
			</div>
			<footer-box></footer-box>
		</div>

		<warning-modal :warning-message="warningMessage" @closeWarningModal="closeWarningModal()" v-if="warningModal"></warning-modal>
		<success-modal :success-message="successMessage" v-if="successModal"></success-modal>
	</div>
</template>
<script>
	import '../../sass/style/allotjuris.css';
	import menuBox from '../../components/menuBox.vue';
	import rightHeader from '../../components/rightHeader.vue';
	import footerBox from '../../components/footerBox.vue';
	import successModal from '../../components/successModal.vue';
	import warningModal from '../../components/warningModal.vue';
	import { hostAllocation,hostAddToManagement } from '../api.js';
	import axios from 'axios';
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
			return {
				sings:true,
				single:false,
				successModal: false,
				warningModal: false,
				successMessage: '添加部门成功',
				warningMessage: '添加部门失败，请检查是否重复',
				activeName2: 'first',
				loderList: [],
				UserList: [{
					title: {},
					list: []
				}],
				powerId: '',
				name: '',
				list:[],
				list2:[],
				lins:[]
			}
		},
		mounted() {
			this.powerId = this.$route.query.id;
			this.datas();
		},
		methods: {
			addUser() {
				this.UserList.push({
					title: {},
					list: []
				})
			},
			datas() {
				axios.post(hostAllocation,
					qs.stringify({
						powerId: this.powerId
					})
				).then((res) => {
					console.log(res);
					if(res.status == 200 && res.data.code == 10000) {
						this.loderList = res.data.entity.powerItemList;
						this.name = res.data.entity.powerName;
						if(res.data.entity.powerItem){
							this.lins = res.data.entity.powerItem.split(",");
							console.log(this.lins);
						}
						let a = 0;
						let arr = [];
						let arr2 = [];
						let arr3 = [];
						for(let i = 0; i < this.loderList.length; i++) {
							if(this.loderList[i].parentId == 0) {
								a++;
								arr.push(this.loderList[i]);
							}
							if(this.loderList[i].parentId == 1){
								arr2.push(this.loderList[i]);
							}
							if(this.loderList[i].parentId == 6){
								arr3.push(this.loderList[i]);
							}
						}
						for(let i = 1; i<a; i++) {
							this.addUser();
						}
						for(let i = 0; i < this.UserList.length; i++) {
							this.UserList[i].title = arr[i];
							if(this.UserList[i].title.powerItemId == arr2[i].parentId){
								this.UserList[i].list = arr2;
							}
							if(this.UserList[i].title.powerItemId == arr3[i].parentId){
								this.UserList[i].list = arr3;
							}
						}
						for(let i = 0; i < this.UserList.length; i++) {
							this.$set(this.list, [i], false);
							for(let m = 0; m < this.UserList[i].list.length; m++){
								this.$set(this.UserList[i].list[m], "sing", false);
								for(let s = 0;s < this.lins.length;s++){
									if(this.lins[s] == this.UserList[i].list[m].powerItemId){
										
										this.$set(this.UserList[i].list[m], "sing", true);
									}
								}								
							}
							
						}
						console.log(this.UserList);
					}
				}).catch((err) => {
					console.log(err);
				})
			},
			handleCheckAll(item,index) { //权限全选
				console.log(item);
//				item.title.single = ! item.title.single;
				this.$set(this.list,index,!this.list[index])
				if(this.list[index] == true) {
					for(let i = 0; i < item.list.length; i++) {
						this.$set(item.list[i], "sing", true);
					}
				} else {
					for(let i = 0; i < item.list.length; i++) {
						this.$set(item.list[i], "sing", false);
					}
				}
				console.log("item.title.single")
				console.log(this.list[index])
				console.log("item.title.single")
			},
			checkAllGroupChange(item, index) { //权限单选
				console.log(item);
				console.log(index);
				console.log(this.list);
				var flag = true;
				for(let i = 0; i < item.list.length; i++) {
					if(item.list[i].sing != this.sings) {
						flag = false;
						break;
					}
				}
				if(item.title.powerItemId == 1){
					if(item.list.length) {
						this.list[0] = flag;
					} else {
						this.list[0] = false;
					}
				}
				else if(item.title.powerItemId == 6){
					if(item.list.length) {
						this.list[1] = flag;
					} else {
						this.list[1] = false;
					}
				}
				
				console.log(this.list);
			},
			closeWarningModal() {
				this.warningModal = false;
			},
			addcommunis(){
				this.list2 = [];
				for(let i = 0;i<this.UserList.length;i++){
					for(let m = 0;m < this.UserList[i].list.length;m++){
						if(this.UserList[i].list[m].sing == true){
							this.list2.push(this.UserList[i].list[m].powerItemId);
						}
					}
				}
				let str = '';
				str = this.list2.join(",");
				axios.post(hostAddToManagement,
					qs.stringify({
						powerId:this.powerId,
						powerItem:str
					})
				).then((res)=>{
					console.log(res);
					if(res.status == 200 && res.data.code == 10000){
						this.successMessage = '添加权限成功';
						this.successModal = true;
						setTimeout(() => {
							this.successModal = false;
							this.datas();
							this.$router.push('/system/systems');
						}, 2000);
					}
					else{
						this.warningMessage = res.data.content;
						this.warningModal = true;
					}
				}).catch((err)=>{
					console.log(err);
					this.warningMessage = '操作失败,服务器错误';
					this.warningModal = true;
				})
				
				this.list2 = [];
			}
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	@import '../../sass/base/_mixin.scss';
	@import '../../sass/base/_public.scss';
</style>