<template>
	<div>
		<menu-box></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
					<span>您现在的位置：</span>
					<router-link class="active" to="/apartment/communityManagement">工作台 > 签约</router-link>
				</div>
				<div class="ivu-bar-title">
					<h3><i class="icon icon-iden"></i>公寓租客签约</h3>
					<span>佳兆业航运WEWA空间</span>
				</div>
				<div id="lodgingHouse">
					<div class="ivu-floor loadin1">
						<table>
							<tr>
								<td>所属社区:</td>
								<td>佳兆业</td>
							</tr>
							<tr>
								<td>房间:</td>
								<td>
									<el-select v-model="value" filterable placeholder="输入或选择">
										<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</td>
							</tr>
							<tr>
								<td>户型:</td>
								<td>标准大标间</td>
							</tr>
							<tr>
								<td>合同编号:</td>
								<td><input type="text" name="" id="" placeholder="请输入合同编号" /></td>
							</tr>
							<tr>
								<td>租客类型:</td>
								<td>
									<el-radio class="radio" v-model="radio" label="1">个人租客</el-radio>
									<el-radio class="radio" v-model="radio" label="2">公司租客</el-radio>
								</td>
							</tr>
						</table>
					</div>
					<div class="ivu-floor loadin2">
						<p>承租人信息:</p>
						<table>
							<tr>
								<td>已注册手机号:</td>
								<td><input type="text" placeholder="请输入手机号"></td>
							</tr>
							<tr>
								<td>姓名:</td>
								<td><input type="text" placeholder="请输入姓名"></td>
							</tr>
							<tr>
								<td>性别:</td>
								<td>
									<el-radio class="radio" v-model="radio" label="1">女</el-radio>
									<el-radio class="radio" v-model="radio" label="2">男</el-radio>
								</td>
							</tr>
							<tr>
								<td>证件类型:</td>
								<td>
									<el-select v-model="value" placeholder="请选择证件类型">
										<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
										</el-option>
									</el-select>
								</td>
							</tr>
							<tr>
								<td>证件号码:</td>
								<td><input type="text" placeholder="请输入证件号码"></td>
							</tr>
						</table>
						<a> + 添加合租人</a>
					</div>
					<div class="ivu-floor loadin3">
						<p>租期信息:</p>
						<ul>
							<li><span>起租日：</span>
								<Date-picker type="date" placeholder="请选择日期"></Date-picker>
							</li>
							<li><span>到期日：</span>
								<Date-picker type="date" placeholder="请选择日期"></Date-picker>
							</li>
							<ul class="apartment">
								<li>
									<a>一年</a>
								</li>
								<li>
									<a>6个月</a>
								</li>
								<li>
									<a>3个月</a>
								</li>
								<li>
									<a>1个月</a>
								</li>
							</ul>
						</ul>

					</div>
					<div class="ivu-floor loadin4">
						<div class="div1">
							<p>租金和付款方式:</p>
							<table>
								<tr>
									<td>首笔支付:</td>
									<td>
										<el-select v-model="value" placeholder="请选择证件类型">
											<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
											</el-option>
										</el-select>
									</td>
								</tr>
								<tr>
									<td>租金:</td>
									<td><input type="text" placeholder="请输入租金"><span>元/月</span></td>
								</tr>
								<tr>
									<td>租金折扣/浮动比例:</td>
									<td><input type="text" placeholder="请输入百分比"><span>%</span></td>
								</tr>
								<tr>
									<td>服务费:</td>
									<td><input type="text" placeholder="请输入服务费"><span>元/月</span></td>
								</tr>
							</table>
						</div>
						<div class="div2">
							<p>其他费用:</p>
							<div class="floor-item">
								<table class="table ivu-table">
									<tr v-for="tableRepair in tableRepairs">

										<td width="250px">
											<input type="text" placeholder="请输入费用名称" />
										</td>

										<td width="200px"><input class="ivu-input" v-model="tableRepair.date" placeholder="请输入金额" style="width: 120px"><span>元</span></td>
										<td width="90px"><button class="btn_bar" @click="deleteRepair">{{tableRepair.deletect}}</button></td>
									</tr>
								</table>
							</div>
						</div>
						<Button @click="addRepairs" class="addm"><Icon type="plus"></Icon>添加费用</Button>
					</div>
					<div class="ivu-floor loadin5">
						<table>
							<tr>
								<td>用户需支付首款:</td>
								<td style="color: #00FF00;">5500.00元</td>
							</tr>
							<tr>
								<td>首款支付方式:</td>
								<td>
									<el-radio class="radio" v-model="radio" label="1">一次付清</el-radio>
									<el-radio class="radio" v-model="radio" label="2">两次付清</el-radio>
								</td>
							</tr>
							<tr>
								<td></td>
								<td>
									<ul>
										<li><span>第一次支付:</span><input type="text" placeholder="请输入金额"><span>元</span></li>
										<li><span>第一次支付:</span><input type="text" placeholder="请输入金额"><span>元</span></li>
										<li><span class="dt">付款期限:</span><input type="text" placeholder="请填写天数"><span>日内</span></li>
									</ul>
								</td>
							</tr>
							<tr>
								<td>水电费用:</td>
								<td>
									<ul class="uls">
										<li><span>水费:</span><span>30.00元/人/月</span></li>
										<li><span>电费:</span><span>2.20元/度</span>
											<span>初始:</span><input type="text" /><span>度</span>
										</li>
									</ul>
								</td>
							</tr>
						</table>
					</div>
					<div class="ivu-floor loadin6">
						<table>
							<tr>
								<td>是否签署纸质合同:</td>
								<td>
									<el-radio class="radio" v-model="radio" label="1">是</el-radio>
									<el-radio class="radio" v-model="radio" label="2">否</el-radio>
								</td>
							</tr>
							<tr>
								<td>上传证明:</td>
								<td>
									<el-upload action="https://jsonplaceholder.typicode.com/posts/" list-type="picture-card" :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
										<i class="el-icon-plus"></i>

									</el-upload>
									<el-dialog v-model="dialogVisible" size="tiny">
										<img width="100%" :src="dialogImageUrl" alt="">
									</el-dialog>
								</td>
							</tr>
						</table>

					</div>
					<div class="ivu-floor loadin7">
						<div class="div2">
							<p>物资清点:</p>
							<div class="floor-item">
								<table class="table ivu-table">
									<tr v-for="tableRepair in tableRepairs">
										<td >
											<input type="text" value="床" />
										</td>
										<td><input class="ivu-input" v-model="tableRepair.date" style="width: 120px"></td>
									</tr>
									<tr v-for="tableRepair in tableRepairs">
										<td>
											<input type="text" placeholder="请输入物品名称" />
										</td>
										<td><input class="ivu-input" v-model="tableRepair.date" placeholder="请输入数量" style="width: 120px"></td>
									</tr>
								</table>
							</div>
						</div>
						<Button @click="addRepairs" class="addm"><Icon type="plus"></Icon>新增物品</Button>
						<Button class="addm addj">保存</Button>
					</div>
					<div class="ivu-floor loadin8">
						
						
							<p class="hint">中介方:</p>
							<table>
								<tr>
									<td>中介公司:</td>
									<td><input type="text" placeholder="请输入中介公司名称"></td>
								</tr>
								<tr>
									<td>中介人:</td>
									<td><input type="text" placeholder="请输入中介人"></td>
								</tr>
								<tr>
									<td>中介费:</td>
									<td><input type="text" placeholder="请输入中介费"></td>
								</tr>
							</table>
							<p class="hints"><i class="el-icon-information"></i><span>提交后,系统将向用户端app、用户微信、用户手机短信发送提醒通知</span></p>
							<Button class="addm">提交</Button>
		
							
						
					</div>
				</div>
			</div>
			<footer-box></footer-box>
		</div>
	</div>

</template>

<script>
	import '../../sass/style/lodgingHouse.css';
	import menuBox from '../../components/menuBox.vue';
	import rightHeader from '../../components/rightHeader.vue';
	import footerBox from '../../components/footerBox.vue';
	import api from '../api.js';

	export default {
		components: {
			rightHeader,
			menuBox,
			footerBox
		},
		data() {
			return {
				radio: '1',
				options: [{
					value: '选项1',
					label: '黄金糕'
				}, {
					value: '选项2',
					label: '双皮奶'
				}, {
					value: '选项3',
					label: '蚵仔煎'
				}, {
					value: '选项4',
					label: '龙须面'
				}, {
					value: '选项5',
					label: '北京烤鸭'
				}],
				tableRepairs: [{
					checkValue: "",
					inputValue: "",
					element: "预计上门时间：",
					date: "",
					deletect: "删除"
				}],
				dialogImageUrl: '',
				dialogVisible: false

			}
		},
		methods: {
			addRepairs() {
				this.tableRepairs.push({
					checkValue: "",
					inputValue: "",
					element: "预计上门时间：",
					date: "",
					deletect: "删除"
				})
			},
			deleteRepair(item) {
				this.tableRepairs.splice(item, 1);
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePictureCardPreview(file) {
				this.dialogImageUrl = file.url;
				this.dialogVisible = true;
			}
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	@import '../../sass/base/_mixin.scss';
	@import '../../sass/base/_public.scss';
</style>