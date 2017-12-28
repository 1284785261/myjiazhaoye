<template>
	<div>
		<menu-box :active-tab-name="activeTabName"></menu-box>
		<div class="right-content" id="right-content" style="height: 100%;">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
					<span>您现在的位置：工作台  > </span>
					<router-link class="active" to="/apartment/workbench"> 签约</router-link>
				</div>
				<div class="ivu-bar-title">
					<h3><i class="icon icon-iden"></i>公寓租客签约</h3>
					<span>{{Name}}</span>
				</div>
				<div id="lodgingHouse">
					<div class="ivu-floor loadin1">
						<table>
							<tr>
								<td>所属社区:</td>
								<td>{{Name}}</td>
							</tr>
							<tr>
								<td>房间:</td>
								<td>
									<el-select v-model="roomNum" filterable placeholder="输入或选择" @change="room(roomNum)">
										<el-option v-for="item in options1" :key="item.roomNum" :value="item.roomNum">
										</el-option>
									</el-select>
								</td>
							</tr>
							<tr>
								<td>户型:</td>
								<td>{{housetderta.housetypeName}}</td>
							</tr>
							<tr>
								<td>合同编号:</td>
								<td><input type="text" placeholder="请输入合同编号" v-model="contract" maxlength="30" /></td>
							</tr>
							<tr>
								<td>租客类型:</td>
								<td>
									<el-radio class="radio" v-model="radios" label="1">个人租客</el-radio>
									<el-radio class="radio" v-model="radios" label="2">公司租客</el-radio>
								</td>
							</tr>
						</table>
					</div>

					<!--公寓租客-->
					<div v-if="radios == 1">
						<div class="ivu-floor loadin2">
							<p>承租人信息:</p>
							<table v-for="userInfos in aaduserInfo">
								<tr>
									<td>已注册手机号:</td>
									<td><input type="text" placeholder="请输入手机号" v-model="userInfos.phone" @blur="User(userInfos.phone)" maxlength="13"></td>
								</tr>
								<tr>
									<td>姓名:</td>
									<td>
										<input type="text" placeholder="请输入姓名" v-model="userInfos.username" maxlength="10">
									</td>
								</tr>
								<tr>
									<td>性别:</td>
									<td>
										<el-radio class="radio" v-model="userInfos.radio2" label="2">女</el-radio>
										<el-radio class="radio" v-model="userInfos.radio2" label="1">男</el-radio>
									</td>
								</tr>
								<tr>
									<td>证件类型:</td>
									<td>
										<el-select v-model="value" placeholder="请选择证件类型">
											<el-option v-for="item in userInfos.options2" :key="item.dataName" :value="item.dataName">
											</el-option>
										</el-select>
									</td>
								</tr>
								<tr>
									<td>证件号码:</td>
									<td>
										<input type="text" placeholder="请输入证件号码" v-model="userInfos.userCertificate" maxlength="24">
									</td>
								</tr>
							</table>
							<table v-for="(userInfos,index) in ieList">
								<tr>
									<td>已注册手机号:</td>
									<td><input type="text" placeholder="请输入手机号" v-model="userInfos.phone" @blur="User2(index,userInfos.phone)" maxlength="13"></td>
								</tr>
								<tr>
									<td>姓名:</td>
									<td>
										<input type="text" placeholder="请输入姓名" v-model="userInfos.name" maxlength="10">
									</td>
								</tr>
								<tr>
									<td>性别:</td>
									<td>
										<el-radio class="radio" v-model="userInfos.gender" label="2">女</el-radio>
										<el-radio class="radio" v-model="userInfos.gender" label="1">男</el-radio>
									</td>
								</tr>
								<tr>
									<td>证件类型:</td>
									<td>
										<el-select v-model="userInfos.value3" placeholder="请选择证件类型" @change="certificate(index,userInfos.value3)">
											<el-option v-for="item in options2" :key="item.dataName" :value="item.dataName">
											</el-option>
										</el-select>
									</td>
								</tr>
								<tr>
									<td>证件号码:</td>
									<td>
										<input type="text" placeholder="请输入证件号码" v-model="userInfos.certificateNumber" maxlength="24">
										<a class="dels" @click="dels(userInfos,index)">删除</a>
									</td>
								</tr>
							</table>
							<a @click="adduser" class="addv"> + 添加合租人</a>
						</div>
						<div class="ivu-floor loadin3">
							<p>租期信息:</p>
							<ul class="zq">
								<li><span class="qzr">起租日：</span>
									<Date-picker type="date" :options="option1" placeholder="请选择日期" v-model="onhrie"></Date-picker>
								</li>
								<li><span class="qzr">到期日：</span>
									<Date-picker type="date" :options="option2" placeholder="请选择日期" v-model="expire"></Date-picker>
								</li>
								<ul class="apartment">
									<li v-for="(apps,index) in apartments">
										<a @click="apart(index)" :class="{'hus':activ == index}">{{apps.dats}}</a>
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
											<el-select v-model="value2" placeholder="请选择支付方式" @change="way(value2)">
												<el-option v-for="item in options3" :key="item.name" :value="item.name">
												</el-option>
											</el-select>
										</td>
									</tr>
									<tr>
										<td>租金:</td>
										<td><input type="text" placeholder="请输入租金" v-model="housetderta.roomRent" maxlength="10"><span>元/月</span></td>
									</tr>
									<tr>
										<td>租金折扣/浮动比例:</td>
										<td><input type="text" placeholder="请输入百分比" v-model="discount" maxlength="5"><span>%</span></td>
									</tr>
									<tr>
										<td>服务费:</td>
										<td><input type="text" placeholder="请输入服务费" v-model="serve" maxlength="10"><span>元/月</span></td>
									</tr>
								</table>
							</div>
							<div class="div2">
								<p>其他费用:</p>
								<div class="floor-item">
									<table class="table ivu-table">
										<tr v-for="(tableRepair,index) in tableRepairs">

											<td width="200px">
												<input type="text" placeholder="请输入费用名称" v-model="tableRepair.inputValue" maxlength="10" />
											</td>

											<td width="180px"><input class="ivu-input" v-model="tableRepair.date" placeholder="请输入金额" style="width: 120px" maxlength="10"><span>元</span></td>
											<td width="80px"><button class="btn_bar" @click="delet(index)">{{tableRepair.deletect}}</button></td>
											<td></td>
										</tr>
									</table>
									<Button @click="addRepairs" class="addm"><Icon type="plus"></Icon>添加费用</Button>
								</div>
								<div class="clear"></div>

							</div>

						</div>
						<div class="ivu-floor loadin5">
							<table>
								<tr>
									<td>用户需支付首款:</td>
									<td style="color: red;">{{firstmoney}}</td>
								</tr>
								<tr>
									<td>首款支付方式:</td>
									<td>
										<el-radio class="radio" v-model="radio3" label="1" :change="ones(firstmoney)">一次付清</el-radio>
										<el-radio class="radio" v-model="radio3" label="2" :change="ones(firstmoney)">两次付清</el-radio>
									</td>
								</tr>
								<tr v-show="radio3 == 2">
									<td></td>
									<td>
										<!--{{onemoney}}-->
										<ul>
											<!--<input type="text" placeholder="请输入金额" v-model="housetderta.twomoney">-->
											<!--{{twomoney}}-->
											<li><span>第一次支付:</span><input type="text" placeholder="请输入金额" v-model="onemoney" @blur="alway(firstmoney,onemoney)" maxlength="12"><span>元</span></li>
											<li><span>第二次支付: </span><span>{{twomoney}}</span><span>元</span></li>
											<li><span class="dt">付款期限:</span><input type="text" placeholder="请填写天数" v-model="dat" maxlength="10"><span>日内</span></li>
										</ul>
									</td>
								</tr>
								<tr>
									<td style="vertical-align: top;line-height: 40px;">水电费用:</td>
									<td>
										<ul class="uls">
											<li><span style="margin-right: 0;">水费:</span>
												<span>
													{{housetderta.waterPrice | waterPrice}}
													<span v-if="housetderta.waterType == 1">元/度</span>
													<span v-if="housetderta.waterType == 2">元/人/月</span>
												</span>
												<div style="position: absolute;left: 194px;top: 8px;">
													<span v-if="housetderta.waterType == 1">初始:</span>
													<input type="text" v-model="housetderta.roomWater" maxlength="10" v-if="housetderta.waterType == 1" />
													<span v-if="housetderta.waterType">度</span>
												</div>
											</li>
											<li><span style="margin-right: 0;">电费:</span>
												<span>
													{{housetderta.energyPrice | energyPrice}}
													<span v-if="housetderta.electricType == 1">元/度</span>
													<span v-if="housetderta.electricType == 2">元/人/月</span>
												</span>
												<div style="position: absolute;left: 194px;top: 52px;">
													<span v-if="housetderta.electricType == 1">初始:</span>
													<input type="text" v-model="housetderta.roomElectric" maxlength="10" v-if="housetderta.electricType == 1" />
													<span v-if="housetderta.electricType">度</span>
												</div>
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
										<el-radio class="radio" v-model="radio4" label="1">是</el-radio>
										<el-radio class="radio" v-model="radio4" label="2">否</el-radio>
									</td>
								</tr>
								<tr>
									<td style="vertical-align: top;line-height: 40px;">上传证明:</td>
									<td class="boxs">
										<div class="ivu-main-img">
											<div class="item-img">
												<div class="uplodas">
													<div v-if="!uploadList[0]">
														<input type="file" accept="image/png,image/jpg" name="file" class="file" @change="uploadfile" />
														<Icon type="camera" class="icons"></Icon>
														<span class="titew">上传身份证正面照片</span>
													</div>
													<div class="demo-upload-list" v-if="uploadList[0]" v-loading.body="loadList[0]">
														<template>

															<img :src="imgPath+uploadList[0]" v-if="uploadList[0]">
															<div class="demo-upload-list-cover">
																<Icon type="ios-trash-outline" @click.native="handleRemove()"></Icon>
															</div>
														</template>
													</div>
												</div>
												<div class="uplodas">
													<div v-if="!uploadList4[0]">
														<input type="file" accept="image/png,image/jpg" name="file" class="file" @change="uploadfile4" />
														<Icon type="camera" class="icons"></Icon>
														<span class="titew">上传身份证反面照片</span>
													</div>
													<div class="demo-upload-list" v-if="uploadList4[0]" v-loading.body="loadList[1]">
														<template>

															<img :src="imgPath+uploadList4[0]" v-if="uploadList4[0]">
															<div class="demo-upload-list-cover">
																<Icon type="ios-trash-outline" @click.native="handleRemove4()"></Icon>
															</div>
														</template>
													</div>
												</div>
												<div class="uplodas" v-if="radio4 == '1'">
													<div v-if="!uploadList2[0]">
														<input type="file" accept="image/png,image/jpg" name="file" class="file" @change="uploadfile2" />
														<Icon type="camera" class="icons"></Icon>
														<span class="titew">上传合同照片/扫描件</span>
													</div>
													<div class="demo-upload-list" v-if="uploadList2[0]" v-loading.body="loadList[2]">
														<template>
															<img :src="imgPath+uploadList2[0]" v-if="uploadList2[0]">
															<div class="demo-upload-list-cover">
																<Icon type="ios-trash-outline" @click.native="handleRemove2()"></Icon>
															</div>
														</template>
													</div>
												</div>

											</div>
										</div>
									</td>
								</tr>
							</table>

						</div>
						<div class="ivu-floor loadin7">
							<div class="div2">
								<p>物资清点:</p>
								<div class="floor-item">
									<table class="table ivu-table">
										<tr v-for="tableRepair in tableRepairs2">
											<td width="150px">
												<input type="text" placeholder="请输入物品名称" v-model="tableRepair.inputValue" maxlength="10" />
											</td width="140px">
											<td><input class="ivu-input" v-model="tableRepair.date" placeholder="请输入数量" style="width: 120px" maxlength="5"></td>
											<td></td>
										</tr>
									</table>
									<Button @click="addRepairs2" class="addm"><Icon type="plus"></Icon>新增物品</Button>
									<Button class="addm addj" @click="save">保存</Button>
								</div>
								<div class="clear"></div>
							</div>

						</div>
						<div class="ivu-floor loadin8">

							<p class="hint">中介方:</p>
							<table>
								<tr>
									<td>中介公司:</td>
									<td><input type="text" placeholder="请输入中介公司名称" v-model="hints.company" maxlength="15"></td>
								</tr>
								<tr>
									<td>中介人:</td>
									<td><input type="text" placeholder="请输入中介人" v-model="hints.man" maxlength="10"></td>
								</tr>
								<tr>
									<td>中介费:</td>
									<td><input type="text" placeholder="请输入中介费" v-model="hints.cost" maxlength="10"></td>
								</tr>
							</table>
							<p class="hints"><i class="el-icon-information"></i><span>提交后,系统将向用户端app、用户微信、用户手机短信发送提醒通知</span></p>
							<Button class="addm" @click="SigController">提交</Button>

						</div>
					</div>

					<!--公司租客-->
					<div v-if="radios == 2">
						<div class="ivu-floor loadin2">
							<p>经办人信息:</p>
							<table v-for="userInfos in aaduserInfo">
								<tr>
									<td>已注册手机号:</td>
									<td><input type="text" placeholder="请输入手机号" v-model="userInfos.phone" @blur="User(userInfos.phone)" maxlength="13"></td>
								</tr>
								<tr>
									<td>姓名:</td>
									<td>
										<input type="text" placeholder="请输入姓名" v-model="userInfos.username" maxlength="10">
									</td>
								</tr>
								<tr>
									<td>性别:</td>
									<td>
										<el-radio class="radio" v-model="userInfos.radio2" label="2">女</el-radio>
										<el-radio class="radio" v-model="userInfos.radio2" label="1">男</el-radio>
									</td>
								</tr>
								<tr>
									<td>证件类型:</td>
									<td>
										<el-select v-model="value" placeholder="请选择证件类型">
											<el-option v-for="item in userInfos.options2" :key="item.dataName" :value="item.dataName">
											</el-option>
										</el-select>
									</td>
								</tr>
								<tr>
									<td>证件号码:</td>
									<td>
										<input type="text" placeholder="请输入证件号码" v-model="userInfos.userCertificate" maxlength="24">
									</td>
								</tr>
							</table>
							<table v-for="(userInfos,index) in ieList">
								<tr>
									<td>已注册手机号:</td>
									<td><input type="text" placeholder="请输入手机号" v-model="userInfos.phone" @blur="User2(index,userInfos.phone)" maxlength="13"></td>
								</tr>
								<tr>
									<td>姓名:</td>
									<td>
										<input type="text" placeholder="请输入姓名" v-model="userInfos.name" maxlength="10">
									</td>
								</tr>
								<tr>
									<td>性别:</td>
									<td>
										<el-radio class="radio" v-model="userInfos.gender" label="2">女</el-radio>
										<el-radio class="radio" v-model="userInfos.gender" label="1">男</el-radio>
									</td>
								</tr>
								<tr>
									<td>证件类型:</td>
									<td>
										<el-select v-model="userInfos.value3" placeholder="请选择证件类型" @change="certificate(index,userInfos.value3)">
											<el-option v-for="item in options2" :key="item.dataName" :value="item.dataName">
											</el-option>
										</el-select>
									</td>
								</tr>
								<tr>
									<td>证件号码:</td>
									<td>
										<input type="text" placeholder="请输入证件号码" v-model="userInfos.certificateNumber" maxlength="24">
										<a class="dels" @click="dels(userInfos,index)">删除</a>
									</td>
								</tr>
							</table>
							<a @click="adduser" class="addv"> + 添加合租人</a>
						</div>
						<div class="ivu-floor loadinv">
							<p>公司信息:</p>
							<table>
								<tr>
									<td>公司信息:</td>
									<td><input type="text" placeholder="请输入公司信息" v-model="companyInfo" maxlength="15"></td>
								</tr>
								<tr>
									<td>法人姓名:</td>
									<td><input type="text" placeholder="请输入法人姓名" v-model="companylegalPerson" maxlength="10"></td>
								</tr>
							</table>
						</div>
						<div class="ivu-floor loadin3">
							<p>租期信息:</p>
							<ul class="zq">
								<li><span class="qzr">起租日：</span>
									<Date-picker type="date" :options="option1" placeholder="请选择日期" v-model="onhrie"></Date-picker>
								</li>
								<li><span class="qzr">到期日：</span>
									<Date-picker type="date" :options="option2" placeholder="请选择日期" v-model="expire"></Date-picker>
								</li>
								<ul class="apartment">
									<li v-for="(apps,index) in apartments">
										<a @click="apart(index)" :class="{'hus':activ == index}">{{apps.dats}}</a>
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
											<el-select v-model="value2" placeholder="请选择支付方式" @change="way(value2)">
												<el-option v-for="item in options3" :key="item.name" :value="item.name">
												</el-option>
											</el-select>
										</td>
									</tr>
									<tr>
										<td>租金:</td>
										<td><input type="text" placeholder="请输入租金" v-model="housetderta.roomRent" maxlength="10"><span>元/月</span></td>
									</tr>
									<tr>
										<td>租金折扣/浮动比例:</td>
										<td><input type="text" placeholder="请输入百分比" v-model="discount" maxlength="10"><span>%</span></td>
									</tr>
									<tr>
										<td>服务费:</td>
										<td><input type="text" placeholder="请输入服务费" v-model="serve" maxlength="10"><span>元/月</span></td>
									</tr>
								</table>
							</div>
							<div class="div2">
								<p>其他费用:</p>
								<div class="floor-item">
									<table class="table ivu-table">
										<tr v-for="(tableRepair,index) in tableRepairs">

											<td width="200px">
												<input type="text" placeholder="请输入费用名称" v-model="tableRepair.inputValue" maxlength="10" />
											</td>

											<td width="180px"><input class="ivu-input" v-model="tableRepair.date" placeholder="请输入金额" style="width: 120px" maxlength="10"><span>元</span></td>
											<td width="80px"><button class="btn_bar" @click="delet(index)">{{tableRepair.deletect}}</button></td>
											<td></td>
										</tr>
									</table>
									<Button @click="addRepairs" class="addm"><Icon type="plus"></Icon>添加费用</Button>
								</div>
								<div class="clear"></div>

							</div>

						</div>
						<div class="ivu-floor loadin5">
							<table>
								<tr>
									<td>用户需支付首款:</td>
									<td style="color: red;">{{firstmoney}}元</td>
								</tr>
								<tr>
									<td>首款支付方式:</td>
									<td>
										<el-radio class="radio" v-model="radio3" label="1" :change="ones(firstmoney)">一次付清</el-radio>
										<el-radio class="radio" v-model="radio3" label="2" :change="ones(firstmoney)">两次付清</el-radio>
									</td>
								</tr>
								<tr v-show="radio3 == 2           ">
									<td></td>
									<td>
										<!--{{onemoney}}-->
										<ul>
											<!--<input type="text" placeholder="请输入金额" v-model="housetderta.twomoney">-->
											<!-- {{twomoney}} -->
											<li><span>第一次支付:</span><input type="text" placeholder="请输入金额" v-model="onemoney" @blur="alway(firstmoney,onemoney)" maxlength="15"><span>元</span></li>
											<li><span>第二次支付: </span><span>{{twomoney}}</span><span>元</span></li>
											<li><span class="dt">付款期限:</span><input type="text" placeholder="请填写天数" v-model="dat" maxlength="10"><span>日内</span></li>
										</ul>
									</td>
								</tr>
								<tr>
									<td style="vertical-align: top;line-height: 40px;">水电费用:</td>
									<td>
										<ul class="uls">
											<li><span style="margin-right: 0;">水费:</span>
												<span>
													{{housetderta.waterPrice | waterPrice}}
													<span v-if="housetderta.waterType == 1">元/度</span>
													<span v-if="housetderta.waterType == 2">元/人/月</span>
												</span>
												<div style="position: absolute;left: 194px;top: 8px;">
													<span v-if="housetderta.waterType == 1">初始:</span>
													<input type="text" v-model="housetderta.roomWater" maxlength="10" v-if="housetderta.waterType == 1" />
													<span v-if="housetderta.waterType">度</span>
												</div>
											</li>
											<li><span style="margin-right: 0;">电费:</span>
												<span>
													{{housetderta.energyPrice | energyPrice}}
													<span v-if="housetderta.electricType == 1">元/度</span>
													<span v-if="housetderta.electricType == 2">元/人/月</span>
												</span>
												<div style="position: absolute;left: 194px;top: 52px;">
													<span v-if="housetderta.electricType == 1">初始:</span>
													<input type="text" v-model="housetderta.roomElectric" maxlength="10" v-if="housetderta.electricType == 1" />
													<span v-if="housetderta.electricType">度</span>
												</div>
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
										<el-radio class="radio" v-model="radio4" label="1">是</el-radio>
										<el-radio class="radio" v-model="radio4" label="2">否</el-radio>
									</td>
								</tr>
								<tr>
									<td style="vertical-align: top;line-height: 40px;">上传证明:</td>
									<td class="boxs">
										<div class="ivu-main-img">
											<div class="item-img">
												<div class="uplodas">
													<div v-if="!uploadList[0]">
														<input type="file" accept="image/png,image/jpg" name="file" class="file" @change="uploadfile" />
														<Icon type="camera" class="icons"></Icon>
														<span class="titew">上传身份证正面照片</span>
													</div>
													<div class="demo-upload-list" v-if="uploadList[0]" v-loading.body="loadList[0]">
														<template>
															<img :src="imgPath+uploadList[0]">
															<div class="demo-upload-list-cover">
																<Icon type="ios-trash-outline" @click.native="handleRemove()"></Icon>
															</div>
														</template>
													</div>
												</div>
												<div class="uplodas">
													<div v-if="!uploadList4[0]">
														<input type="file" accept="image/png,image/jpg" name="file" class="file" @change="uploadfile4" />
														<Icon type="camera" class="icons"></Icon>
														<span class="titew">上传身份证反面照片</span>
													</div>
													<div class="demo-upload-list" v-if="uploadList4[0]" v-loading.body="loadList[1]">
														<template>

															<img :src="imgPath+uploadList4[0]" v-if="uploadList4[0]">
															<div class="demo-upload-list-cover">
																<Icon type="ios-trash-outline" @click.native="handleRemove4()"></Icon>
															</div>
														</template>
													</div>
												</div>
												<div class="uplodas">
													<div v-if="!uploadList2[0]">
														<input type="file" accept="image/png,image/jpg" name="file" class="file" @change="uploadfile2" />
														<Icon type="camera" class="icons"></Icon>
														<span class="titew">上传委托书</span>
													</div>
													<div class="demo-upload-list" v-if="uploadList2[0]" v-loading.body="loadList[2]">
														<template>
															<img :src="imgPath+uploadList2[0]" v-if="uploadList2[0]">
															<div class="demo-upload-list-cover">
																<Icon type="ios-trash-outline" @click.native="handleRemove2()"></Icon>
															</div>
														</template>
													</div>
												</div>
												<div class="uplodas" v-if="radio4 == '1'">
													<div v-if="!uploadList3[0]">
														<input type="file" accept="image/png,image/jpg" name="file" class="file" @change="uploadfile3" />
														<Icon type="camera" class="icons"></Icon>
														<span class="titew">上传合同</span>
													</div>
													<div class="demo-upload-list" v-if="uploadList3[0]" v-loading.body="loadList[3]">
														<template>
															<img :src="imgPath+uploadList3[0]" v-if="uploadList3[0]">
															<div class="demo-upload-list-cover">
																<Icon type="ios-trash-outline" @click.native="handleRemove3()"></Icon>
															</div>
														</template>
													</div>
												</div>
											</div>
										</div>
									</td>
								</tr>
							</table>

						</div>
						<div class="ivu-floor loadin7">
							<div class="div2">
								<p>物资清点:</p>
								<div class="floor-item">
									<table class="table ivu-table">
										<tr v-for="tableRepair in tableRepairs2">
											<td width="150px">
												<input type="text" placeholder="请输入物品名称" v-model="tableRepair.inputValue" maxlength="10" />
											</td width="140px">
											<td><input class="ivu-input" v-model="tableRepair.date" placeholder="请输入数量" style="width: 120px" maxlength="5"></td>
											<td></td>
										</tr>
									</table>
									<Button @click="addRepairs2" class="addm"><Icon type="plus"></Icon>新增物品</Button>
									<Button class="addm addj" @click="save">保存</Button>
								</div>
								<div class="clear"></div>
							</div>

						</div>
						<div class="ivu-floor loadin8">
							<p class="hint">中介方:</p>
							<table>
								<tr>
									<td>中介公司:</td>
									<td><input type="text" placeholder="请输入中介公司名称" v-model="hints.company" maxlength="15"></td>
								</tr>
								<tr>
									<td>中介人:</td>
									<td><input type="text" placeholder="请输入中介人" v-model="hints.man" maxlength="10"></td>
								</tr>
								<tr>
									<td>中介费:</td>
									<td><input type="text" placeholder="请输入中介费" v-model="hints.cost" maxlength="10"></td>
								</tr>
							</table>
							<p class="hints"><i class="el-icon-information"></i><span>提交后,系统将向用户端app、用户微信、用户手机短信发送提醒通知</span></p>
							<Button class="addm" @click="SigController2">提交</Button>
						</div>
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
	import '../../sass/style/lodgingHouse.css';
	import menuBox from '../../components/menuBox.vue';
	import rightHeader from '../../components/rightHeader.vue';
	import footerBox from '../../components/footerBox.vue';
	import successModal from '../../components/successModal.vue';
	import warningModal from '../../components/warningModal.vue';
	import qs from 'qs';
	import axios from 'axios';
	import { hostController, hostRoomList, hostRoomUser, hostWay, imgPath, hostSigController, hostSignCompany, host } from '../api.js';

	export default {
		components: {
			rightHeader,
			menuBox,
			footerBox,
			successModal,
			warningModal
		},
		data() {
			var _this = this;
			return {
				activeTabName:"workbench",
				successModal: false,
				warningModal: false,
				successMessage: '签约成功',
				warningMessage: '签约信息不完整，请检查填写信息',
				radios: '1',
				radio: '1',
				radio3: '1',
				radio4: '1',
				options1: [],
				options2: [],
				options3: [],
				tableRepairs: [{
					checkValue: "",
					inputValue: "",
					date: "",
					deletect: "删除"
				}],
				tableRepairs2: [{
					checkValue: "",
					inputValue: "",
					date: ""
				}],
				dialogImageUrl: '',
				dialogVisible: false,
				value: '',
				roomNum: '',
				communityId: '',
				Name: '',
				housetderta: {
					housetypeName: '',
					roomWater: '',
					roomElectric: '',
					waterPrice: '0.00',
					energyPrice: '0.00',
					waterType: '',
					electricType: '',
					materials: '',
					roomFurniture: '',
					roomRent: '',
					twomoney: 0,
					firstmoneys: ''
				},
				onemoney: 0,
				userInfo: null,
				aaduserInfo: [{
					userCertificate: '',
					username: '',
					phone: null,
					radio2: '2',
					options2: [],
				}],
				ieList: [],
				value2: '',
				apartments: [{
						dats: '一年'
					},
					{
						dats: '六个月'
					},
					{
						dats: '三个月'
					},
					{
						dats: '一个月'
					}
				],
				activ: '0',
				costInfo: null,
				contract: '', //合同
				serve: null, //服务费
				discount: null, //折扣
				uploadList: [0],
				uploadList2: [0],
				uploadList3: [0],
				uploadList4: [0],
				finished: false,
				imgName: '',
				dat: null,
				hints: {
					company: '',
					man: '',
					cost: ''
				},
				param: null,
				cyclePayType: '',
				user: {
					id: '',
					version: '',
					userPhone: '',
					userName: '',
					gender: '',
					certificateId: '',
					userCertificate: ''
				},
				credentialsImagesArray: [],
				credentialsTitle: [],
				otherCostJson: '',
				materials: '',
				options4: [],
				furniture: '',
				companyInfo: '', //公司信息
				companylegalPerson: '',
				host3: '',
				imgPath: '',
				loadList: [],
				onhrie: null, //起租日
				expire: null, //到租日
				option1: {
                    disabledDate (date) {
                        return date && date.valueOf() < Date.now() - 86400000;
                    }
				},
				option2: {
                    disabledDate (date) {
                        return date && date.valueOf() < _this.onhrie;
                    }
                },
			}
		},
		mounted() {
			for(let i = 0; i < 3; i++) {
				this.$set(this.loadList, i, false)
			}
			this.imgPath = imgPath
			this.host3 = host + '/cxkj-room/apis/system/file/SystemFileUpload100023';
			this.communityId = this.$route.query.communityId;
			this.Name = this.$route.query.Name;
			this.datas();

		},
		computed: {
			firstmoney: function() {
				let vm = this

				var date = new Date();
				//获取年份
				var year = date.getFullYear();
				//获取当前月份
				var mouth = date.getMonth() + 1;
				var daym = date.getDate() - 1;
				//定义当月的天数；
				var days;
				//当月份为二月时，根据闰年还是非闰年判断天数
				if (mouth == 2) {
					days = year % 4 == 0 ? 29 : 28;
				}
				else if (mouth == 1 || mouth == 3 || mouth == 5 || mouth == 7 || mouth == 8 || mouth == 10 || mouth == 12) {
					//月份为：1,3,5,7,8,10,12 时，为大月.则天数为31；
					days = 31;
				}
				else {
					//其他月份，天数为：30.
					days = 30;
				}

				if(this.value2 == '押二付一') {
					let q = 0;
					if(vm.discount){
						console.log(vm.discount / 100);
						let fy = parseFloat(((vm.housetderta.roomRent / days) * (days-daym)) * (vm.discount / 100)).toFixed(4);
						let fw = parseFloat(((vm.serve / days) * (days-daym))).toFixed(4);
						console.log(fy);
						console.log(fw);
						for(let i = 0; i < this.tableRepairs.length; i++) {
							if(parseInt(this.tableRepairs[i].date) > 0) {
								q += parseFloat(this.tableRepairs[i].date).toFixed(4);
							}
						}
						return (vm.housetderta.roomRent * 2 + parseFloat(fy) + parseFloat(fw) + parseFloat(q)).toFixed(2) + '元';
					}
					
				} else if(this.value2 == '押一付一') {
					let q = 0;
					let fy = parseFloat(((vm.housetderta.roomRent / days) * (days-daym)) * (vm.discount / 100)).toFixed(4);
					let fw = parseFloat(((vm.serve / days) * (days-daym))).toFixed(4);
					for(let i = 0; i < this.tableRepairs.length; i++) {
						if(parseInt(this.tableRepairs[i].date) > 0) {
							q += parseInt(this.tableRepairs[i].date).toFixed(4);
						}
					}
					return (vm.housetderta.roomRent * 1 + parseFloat(fy) + parseFloat(fw) + parseFloat(q)).toFixed(2) + '元';
				} else if(this.value2 == '季付') {
					let q = 0;
					let fy = parseFloat(((vm.housetderta.roomRent / days) * (days-daym)) * (vm.discount / 100)).toFixed(4);
					let fw = parseFloat(((vm.serve / days) * (days-daym))).toFixed(4);
					for(let i = 0; i < this.tableRepairs.length; i++) {
						if(parseInt(this.tableRepairs[i].date) > 0) {
							q += parseInt(this.tableRepairs[i].date).toFixed(4);
						}
					}
					return (vm.housetderta.roomRent * parseFloat(vm.discount / 100) * 2 + parseFloat(fy) + parseFloat(fw) + parseFloat(q)).toFixed(2) + '元';
				} else if(this.value2 == '年付') {
					let q = 0;
					let fy = parseFloat(((vm.housetderta.roomRent / days) * (days-daym)) * (vm.discount / 100)).toFixed(4);
					let fw = parseFloat(((vm.serve / days) * (days-daym))).toFixed(4);
					for(let i = 0; i < this.tableRepairs.length; i++) {
						if(parseInt(this.tableRepairs[i].date) > 0) {
							q += parseInt(this.tableRepairs[i].date).toFixed(4);
						}
					}
					return (vm.housetderta.roomRent * parseFloat(vm.discount / 100) * 11 + parseFloat(fy) + parseFloat(fw) + parseFloat(q)).toFixed(2) + '元';
				}
			},
			twomoney: function() {
				if(this.onemoney && this.housetderta.firstmoneys) {
					this.housetderta.twomoney = (parseFloat(this.housetderta.firstmoneys) - parseFloat(this.onemoney)).toFixed(2);
					return this.housetderta.twomoney;
				} else {
					return 0
				}

			}
		},
		watch: {
			onemoney(val) {
				if(val) {
					this.onemoney = parseFloat(val).toFixed(2);
				}
			},
			discount: function() {
				this.discount = this.discount.replace(/[^\d.]/, '');
			},
			serve: function() {
				this.serve = this.serve.replace(/[^\d.]/, '');
			}
		},
		filters: {
			waterPrice(val) {
				if(val != '0.00') {
					//console.log(val);
					return val.toFixed(2);
				} else {
					return '0.00';
				}
			},
			energyPrice(val) {
				if(val != '0.00') {
					//console.log(val);
					return val.toFixed(2);
				} else {
					return '0.00';
				}
			}
		},
		methods: {
			adduser() {
				this.ieList.push({
					userId: '',
					name: '',
					phone: '',
					gender: '',
					certificateType: '',
					certificateNumber: '',
					value3: '',
					version: ''
				})
				this.datas();
				console.log(this.ieList);
			},
			addRepairs() {
				this.tableRepairs.push({
					checkValue: "",
					inputValue: "",
					date: "",
					deletect: "删除"
				})
				console.log(this.tableRepairs);
			},
			addRepairs2() {
				this.tableRepairs2.push({
					checkValue: "",
					inputValue: "",
					date: "",
				})
			},
			delet(index) {
				console.log(index);
				this.tableRepairs.splice(index, 1);
			},
			User(val) {
				axios.post(hostRoomUser,
						qs.stringify({ //获取用户信息
							userPhone: val
						})
					)
					.then((response) => {
						//console.log(response);
						if(response.status == 200 && response.data.code == 10000) {
							this.userInfo = response.data.result.userInfo;
							//console.log(this.userInfo);
							if(this.userInfo.userCertificate != 'null'){
								this.aaduserInfo[0].userCertificate = this.userInfo.userCertificate;
							}
							else{
								this.aaduserInfo[0].userCertificate = ''
							}
							this.aaduserInfo[0].username = this.userInfo.userName + '';
							this.aaduserInfo[0].radio2 = this.userInfo.gender + '';
							this.user.id = this.userInfo.id;
							this.user.version = this.userInfo.version;
							this.user.userPhone = this.userInfo.userPhone;
							this.user.userName = this.userInfo.userName;
							this.user.gender = this.userInfo.gender;
							this.user.certificateId = this.userInfo.certificateId;
							if(this.userInfo.userCertificate != 'null'){
								this.user.userCertificate = this.userInfo.userCertificate;
							}
							else{
								this.user.userCertificate = ''
							}
							if(this.userInfo.certificateId != null){
								let id = this.userInfo.certificateId;
								this.value = this.aaduserInfo[0].options2[this.aaduserInfo[0].options2.findIndex(item => item.dataId == id)].dataName;
							}
							console.log(this.userInfo);
							
						} else {
							console.log('该手机未注册用户')
						};
					})
					.catch((error) => {
						console.log(error);
					})
			},
			User2(index, val) {
				axios.post(hostRoomUser,
						qs.stringify({ //获取用户信息
							userPhone: val
						})
					)
					.then((response) => {
						console.log(222222222222);
						console.log(response);
						if(response.status == 200 && response.data.code == 10000) {
							this.ieList[index].userId = response.data.result.userInfo.id;
							this.ieList[index].version = response.data.result.userInfo.version;
							this.ieList[index].phone = response.data.result.userInfo.userPhone;
							this.ieList[index].name = response.data.result.userInfo.userName;
							this.ieList[index].gender = response.data.result.userInfo.gender + '';
							this.ieList[index].certificateType = response.data.result.userInfo.certificateId;
							this.ieList[index].certificateNumber = response.data.result.userInfo.userCertificate;
							let id = response.data.result.userInfo.certificateId;
							this.ieList[index].value3 = this.aaduserInfo[0].options2[this.aaduserInfo[0].options2.findIndex(item => item.dataId == id)].dataName;
						} else {
							console.log('该手机未注册用户')
						};
					})
					.catch((error) => {
						console.log(error);
					})
			},
			datas() {
				let vm = this
				axios.post(hostRoomList, //获取未出租的房间
						qs.stringify({
							communityId: this.communityId
						})
					)
					.then((response) => {
						console.log(111111111);
						console.log(response);
						if(response.status == 200 && response.data.code == 10000) {
							this.options1 = response.data.result.rentRoomList;
						}
					})
					.catch((error) => {
						console.log(error);
					})
				axios.post(hostController, //  获取签约的合同及付款方式
						qs.stringify({
							communityId: this.communityId,
							signType: 0
						})
					)
					.then((response) => {
						//console.log(response);
						if(response.status == 200 && response.data.code == 10000) {
							this.costInfo = response.data.result;
							this.contract = this.costInfo.contractNumber;
							this.serve = this.costInfo.costInfo.serviceCost;
							this.options3 = this.costInfo.paywayList;
							for(let i = 0; i < vm.options3.length; i++) {
								if(this.options3[i].data_id == '1') {
									vm.options3[i].name = '押二付一';
								}
								if(this.options3[i].data_id == 2) {
									vm.options3[i].name = '押一付一';
								}
								if(this.options3[i].data_id == 3) {
									vm.options3[i].name = '季付';
								}
								if(this.options3[i].data_id == 4) {
									vm.options3[i].name = '年付';
								}
							}
						}

					})
					.catch((error) => {
						console.log(error);
					})

				axios.post(hostWay, //证件类型
						qs.stringify({
							parentId: 35
						})
					)
					.then((response) => {
						//console.log(response);
						if(response.status == 200 && response.data.code == 10000) {
							this.aaduserInfo[0].options2 = response.data.entity;
							this.options2 = response.data.entity;

						}
					})
					.catch((error) => {
						console.log(error);
					})

				axios.post(hostWay, //物资类型
						qs.stringify({
							parentId: 19
						})
					)
					.then((response) => {
						//console.log(response);
						if(response.status == 200 && response.data.code == 10000) {
							this.options4 = response.data.entity;
						}
					})
					.catch((error) => {
						console.log(error);
					})
			},
			certificate(index, val) {
				this.ieList[index].certificateType = this.options2[this.options2.findIndex(item => item.dataName == val)].dataId;
				console.log(this.ieList);
			},
			closeWarningModal() {
				this.warningModal = false;
			},
			room(Num) {
				this.housetderta = this.options1[this.options1.findIndex(item => item.roomNum == Num)];
				console.log(this.housetderta);
				let arr = JSON.parse(this.housetderta.materials);
				for(let i = 0; i < this.tableRepairs2.length; i++) {
					if(this.tableRepairs2.length < arr.length) {
						this.addRepairs2();
					}
					this.tableRepairs2[i].inputValue = arr[i].materialName;
					this.tableRepairs2[i].date = arr[i].count;
				}

				console.log(this.tableRepairs2);
			},
			way(val) {
				this.discount = this.options3[this.options3.findIndex(item => item.name == val)].discount;
				this.cyclePayType = this.options3[this.options3.findIndex(item => item.name == val)].data_id;

			},
			save() {
				this.successMessage = '保存成功';
				this.successModal = true;
				setTimeout(() => {
					this.successModal = false;
				}, 1000);
			},
			apart(index) {
				this.activ = index;

				if(this.onhrie != null) {
					var nes = new Date(this.onhrie);
					if(index == 0) {
						nes.setFullYear(nes.getFullYear() + 1);
						this.expire = nes;
					} else if(index == 1) {
						nes.setMonth(nes.getMonth() + 6);
						this.expire = nes;
					} else if(index == 2) {
						nes.setMonth(nes.getMonth() + 3);
						this.expire = nes;
					} else if(index == 3) {
						nes.setMonth(nes.getMonth() + 1);
						this.expire = nes;
					}
				}
			},
			handleRemove() {
				this.uploadList = []
				this.uploadList[0] = 0
			},
			handleRemove2() {
				this.uploadList2 = []
				this.uploadList2[0] = 0
			},
			handleRemove3() {
				this.uploadList3 = []
				this.uploadList3[0] = 0
			},
			handleRemove4() {
				this.uploadList4 = []
				this.uploadList4[0] = 0
			},
			uploadfile(e) {
				let vm = this;
				let file = e.target.files[0];
				if(!file) {
					return
				}
				vm.$set(vm.loadList, 0, true)
				let param = new FormData();
				param.append('file', file)
				param.append('module', 'user')
				vm.$http.post(vm.host3, param)
					.then(res => {
						if(parseInt(res.data.code) == 10000) {
							setTimeout(function() {
								vm.$set(vm.loadList, 0, false)
							}, 500)
							if(vm.uploadList.length < 2) {
								//                      this.filelist1.push(file);
								vm.uploadList[0] = res.data.result.virtualPath;
								vm.uploadList.push('身份证正面');
							} else {
								alert('最多可以上传1张图片');
								return
							}
						}
					}).catch(err => {
						alert(err)
					})
			},
			uploadfile4(e) {
				let vm = this;
				let file = e.target.files[0];
				if(!file) {
					return
				}
				vm.$set(vm.loadList, 1, true)
				let param = new FormData();
				param.append('file', file)
				param.append('module', 'user')
				vm.$http.post(vm.host3, param)
					.then(res => {
						if(parseInt(res.data.code) == 10000) {
							setTimeout(function() {
								vm.$set(vm.loadList, 1, false)
							}, 2000)

							if(vm.uploadList4.length < 2) {
								//                      this.filelist1.push(file);
								vm.uploadList4[0] = res.data.result.virtualPath;
								vm.uploadList4.push('身份证反面');
							} else {
								alert('最多可以上传1张图片');
								return
							}
						}
					}).catch(err => {
						alert(err)
					})
			},
			uploadfile2(e) {
				let vm = this;
				let file = e.target.files[0];
				if(!file) {
					return
				}
				vm.$set(vm.loadList, 2, true)
				let param = new FormData();
				param.append('file', file)
				param.append('module', 'user')
				vm.$http.post(vm.host3, param)
					.then(res => {
						if(parseInt(res.data.code) == 10000) {
							setTimeout(function() {
								vm.$set(vm.loadList, 2, false)
							}, 2000)

							if(vm.uploadList2.length < 2) {
								//                      this.filelist1.push(file);
								vm.uploadList2[0] = res.data.result.virtualPath;
								vm.uploadList2.push('合同证明');
							} else {
								alert('最多可以上传1张图片');
								return
							}
						}
					}).catch(err => {
						alert(err)
					})
			},
			
			uploadfile3(e) {
				let vm = this;
				let file = e.target.files[0];
				if(!file) {
					return
				}
				vm.$set(vm.loadList, 3, true)
				let param = new FormData();
				param.append('file', file)
				param.append('module', 'user')
				vm.$http.post(vm.host3, param)
					.then(res => {
						if(parseInt(res.data.code) == 10000) {
							setTimeout(function() {
								vm.$set(vm.loadList, 3, false)
							}, 2000)
							if(vm.uploadList3.length < 2) {
								//                      this.filelist1.push(file);
								vm.uploadList3[0] = res.data.result.virtualPath;
								vm.uploadList3.push('委托书');
							} else {
								alert('最多可以上传1张图片');
								return
							}
						}
					}).catch(err => {
						alert(err)
					})
			},
			ones(val) {
				//console.log(val);
				this.housetderta.firstmoneys = val;
				if(val != null) {
					if(this.radio3 == '1') {
						if(parseFloat(val)) {
							this.onemoney = parseFloat(val).toFixed(2);
							this.housetderta.twomoney = 0;
						}
					} else {
						this.housetderta.twomoney = null;
					}
				} else {
					return false;
				}

			},
			dels(info, index) {
				console.log(info);
				console.log(index);
				this.ieList.splice(index, 1);
			},
			alway(fires, val) {
				let vm = this
				if(fires != null) {
					if(this.radio3 == '2') {
						if(parseFloat(val)) {
							this.housetderta.twomoney = (parseFloat(fires) - parseFloat(val)).toFixed(2);
						}
					}
				}
			},
			SigController() {
				let vm = this //公寓个人租客签约
				let arr = [];
				for(let i = 0; i < this.tableRepairs.length; i++) {
					if(this.tableRepairs[i].inputValue != '' && this.tableRepairs[i].date != '') {
						arr.push({
							"costName": this.tableRepairs[i].inputValue,
							"costAmount": this.tableRepairs[i].date
						});
					}
					//console.log(arr);
				}
				this.otherCostJson = JSON.stringify(arr);

				let arr2 = [];
				for(let i = 0; i < this.tableRepairs2.length; i++) {
					if(this.tableRepairs2[i].inputValue != '' && this.tableRepairs2[i].date != '') {
						arr2.push({
							"materialName": this.tableRepairs2[i].inputValue,
							"count": this.tableRepairs2[i].date
						});
					}
				}

				/**********整合照片**********/
				let fileList = []
				if(this.uploadList.length) {
					fileList.push({
						"filePath": this.uploadList[0],
						"fileTitle": this.uploadList[1]
					});
				}
				if(this.uploadList4.length) {
					fileList.push({
						"filePath": this.uploadList4[0],
						"fileTitle": this.uploadList4[1]
					});
				}
				if(this.uploadList2.length) {
					fileList.push({
						"filePath": this.uploadList2[0],
						"fileTitle": this.uploadList2[1]
					});
				}
				//              if(this.uploadList3.length){
				//                fileList.push({"filePath":this.uploadList3[0],"fileTitle":this.uploadList3[1]});
				//              }
				/**********整合照片**********/
				let arr3 = [];
				this.materials = JSON.stringify(arr2);
				for(let i = 0; i < arr2.length; i++) {
					arr3.push(this.options4[this.options4.findIndex(item => item.dataName == arr2[i].materialName)].dataId);
				}
				let param = new FormData();
				this.furniture = JSON.stringify(arr3); //物资
				this.onhrie = new Date(this.onhrie).Format('yyyy-MM-dd');
				this.expire = new Date(this.expire).Format('yyyy-MM-dd');
				console.log('参数');
				//				console.log(this.communityId+'this.communityId');
				//				console.log(this.contract+'this.contract');
				//				console.log(this.housetderta.roomId+'this.housetderta.roomId');
				//				console.log(this.housetderta.roomId+'this.housetderta.roomId');
				console.log(JSON.stringify(fileList));
				console.log('参数');
				param.append('communityId', this.communityId);
				param.append('contractNumber', this.contract);
				param.append('buildingId', this.housetderta.roomId);
				param.append('buildingVersion', this.housetderta.version);
				param.append('housetypeId', this.housetderta.housetypeId);
				param.append('customerType', 1);
				param.append('beginDate', this.onhrie);
				param.append('endDate', this.expire);
				param.append('cyclePayType', this.cyclePayType);
				param.append('cyclePayMoney', this.housetderta.roomRent);
				param.append('cyclePayDiscount', this.discount);
				param.append('serviceCost', this.serve);
				param.append('firstMoneyPayType', this.radio3);
				if(this.radio3 == '1') {
					param.append('firstPayMoney', this.onemoney);
				} else if(this.radio3 == '2') {
					param.append('firstMoney', this.onemoney);
					param.append('secondPayMoney', this.twomoney);
					param.append('secondPayDate', this.dat);
				}
				if(this.housetderta.roomElectric != '') {
					param.append('electricInit', this.housetderta.roomElectric);
				}
				
				param.append('waterInit', this.housetderta.roomWater);
				param.append('waterChargeModel', this.housetderta.waterType);
				param.append('electricInit', this.housetderta.roomElectric);
				param.append('electricChargeModel', this.housetderta.electricType);
				param.append('isPaper', this.radio4);
				param.append('user.id', this.user.id);
				param.append('user.version', this.user.version);
				param.append('user.userPhone', this.user.userPhone);
				param.append('user.userName', this.user.userName);
				param.append('user.gender', this.user.gender);
				param.append('user.certificateId', this.user.certificateId);
				param.append('user.userCertificate', this.user.userCertificate);
				param.append('credentialsImages', JSON.stringify(fileList));

				console.log(this.user);
				if(this.hints.company != '') {
					param.append('intermediaryCompany', this.hints.company);
				}
				if(this.hints.man != '') {
					param.append('intermediaryName', this.hints.man);
				}
				if(this.hints.cost != '') {
					param.append('intermediaryMoney', this.hints.cost);
				}
				param.append('materials', this.materials);
				param.append('furniture', this.furniture);
				if(this.otherCostJson) {
					param.append('otherCostJson', this.otherCostJson);
				}
				if(this.ieList.length) {
					param.append('ieList', this.ieList);
				}
				console.log(this.param);
				axios.post(hostSigController, param).then(res => {
						console.log(res);
						if(res.status == 200 && res.data.code == 10000) {

							vm.successModal = true;
							setTimeout(() => {
								vm.successModal = false;
								this.$router.push('/apartment/workbench');
							}, 3000);
						} else {
							vm.warningModal = true;
						}
					})
					.catch(error => {
						console.log(error);
					})

			},
			SigController2() {
				let vm = this //公寓公司租客签约
				let arr = [];
				for(let i = 0; i < this.tableRepairs.length; i++) {
					if(this.tableRepairs[i].inputValue != '' && this.tableRepairs[i].date != '') {
						arr.push({
							"costName": this.tableRepairs[i].inputValue,
							"costAmount": this.tableRepairs[i].date
						});
					}
					//console.log(arr);
				}
				this.otherCostJson = JSON.stringify(arr);

				let arr2 = [];
				for(let i = 0; i < this.tableRepairs2.length; i++) {
					if(this.tableRepairs2[i].inputValue != '' && this.tableRepairs2[i].date != '') {
						arr2.push({
							"materialName": this.tableRepairs2[i].inputValue,
							"count": this.tableRepairs2[i].date
						});
					}
				}
				let arr3 = [];
				this.materials = JSON.stringify(arr2);
				for(let i = 0; i < arr2.length; i++) {
					arr3.push(this.options4[this.options4.findIndex(item => item.dataName == arr2[i].materialName)].dataId);
				}
				//				if(this.filelist1.length){
				//					for(let i = 0;i<this.filelist1.length;i++){
				//						this.param.append('credentialsImagesArray',this.filelist1[i]);
				//						this.param.append('credentialsTitle','经办人身份证');
				//					}
				//				}
				//				if(this.filelist2.length){
				//					for(let i = 0;i<this.filelist2.length;i++){
				//						this.param.append('credentialsImagesArray',this.filelist2[i]);
				//						this.param.append('credentialsTitle','委托书照片');
				//					}
				//				}
				//				if(this.filelist3.length){
				//					for(let i = 0;i<this.filelist3.length;i++){
				//						this.param.append('credentialsImagesArray',this.filelist3[i]);
				//						this.param.append('credentialsTitle','合同照片');
				//					}
				//				}
				let fileList = []
				if(this.uploadList.length) {
					fileList.push({
						"filePath": this.uploadList[0],
						"fileTitle": this.uploadList[1]
					});
				}
				if(this.uploadList4.length) {
					fileList.push({
						"filePath": this.uploadList4[0],
						"fileTitle": this.uploadList4[1]
					});
				}
				if(this.uploadList2.length) {
					fileList.push({
						"filePath": this.uploadList2[0],
						"fileTitle": this.uploadList2[1]
					});
				}
				
				if(this.uploadList3.length) {
					fileList.push({
						"filePath": this.uploadList3[0],
						"fileTitle": this.uploadList3[1]
					});
				}
				//furniture
				let param = new FormData();
				this.furniture = JSON.stringify(arr3);
				this.onhrie = new Date(this.onhrie).Format('yyyy-MM-dd');
				this.expire = new Date(this.expire).Format('yyyy-MM-dd');
				param.append('credentialsImages', JSON.stringify(fileList));
				//				console.log(this.credentialsImagesArray);
				//				console.log(this.credentialsTitle);
				param.append('communityId', this.communityId);
				param.append('contractNumber', this.contract);
				param.append('buildingId', this.housetderta.roomId);
				param.append('buildingVersion', this.housetderta.version);
				param.append('housetypeId', this.housetderta.housetypeId);
				param.append('customerType', 2);
				param.append('beginDate', this.onhrie);
				param.append('endDate', this.expire);
				param.append('cyclePayType', this.cyclePayType);
				param.append('cyclePayMoney', this.housetderta.roomRent);
				param.append('cyclePayDiscount', this.discount);
				param.append('serviceCost', this.serve);
				param.append('firstMoneyPayType', this.radio3);
				if(this.radio3 == '1') {
					param.append('firstPayMoney', this.onemoney);
				} else if(this.radio3 == '2') {
					param.append('firstMoney', this.onemoney);
					param.append('secondPayMoney', this.housetderta.twomoney);
					param.append('secondPayDate', this.dat);
				}
				if(this.housetderta.roomWater != '') {
					param.append('waterInit', this.housetderta.roomWater);
				}
				if(this.housetderta.roomElectric != '') {
					param.append('electricInit', this.housetderta.roomElectric);
				}
				
				param.append('waterInit', this.housetderta.roomWater);
				param.append('waterChargeModel', this.housetderta.waterType);
				param.append('electricInit', this.housetderta.roomElectric);
				param.append('electricChargeModel', this.housetderta.electricType);
				param.append('isPaper', this.radio4);
				param.append('user.id', this.user.id);
				param.append('user.version', this.user.version);
				param.append('user.userPhone', this.user.userPhone);
				param.append('user.userName', this.user.userName);
				param.append('user.gender', this.user.gender);
				param.append('user.certificateId', this.user.certificateId);
				param.append('user.userCertificate', this.user.userCertificate);
				console.log(this.user);
				if(this.hints.company != '') {
					param.append('intermediaryCompany', this.hints.company);
				}
				if(this.hints.man != '') {
					param.append('intermediaryName', this.hints.man);
				}
				if(this.hints.cost != '') {
					param.append('intermediaryMoney', this.hints.cost);
				}
				param.append('materials', this.materials);
				param.append('furniture', this.furniture);
				if(this.otherCostJson) {
					param.append('otherCostJson', this.otherCostJson);
				}
				if(this.ieList.length) {
					param.append('ieList', this.ieList);
				}
				param.append('companyInfo', this.companyInfo);
				param.append('companylegalPerson', this.companylegalPerson);
				console.log(param);

				axios.post(hostSignCompany, param).then(res => {
						if(res.status == 200 && res.data.code == 10000) {
							console.log(res);
							vm.successModal = true;
							setTimeout(() => {
								vm.successModal = false;
								this.$router.push('/apartment/workbench');
							}, 3000);
						} else {
							vm.warningModal = true;
						}
					})
					.catch(error => {
						console.log(error);
					})

			}
		}
	}
</script>

<style lang="scss" rel="stylesheet/scss">
	@import '../../sass/base/_mixin.scss';
	@import '../../sass/base/_public.scss';
	.location_community {
		.ivu-icon-location {
			font-size: 38px;
			color: red;
			position: relative;
			top: 10px;
			left: 5px;
		}
	}
	
	.ivu-icon-ios-calendar-outline {
		color: #038be2;
		font-family: "iconfont" !important;
		font-size: 18px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		&:before {
			content: "\e60c";
		}
	}
</style>