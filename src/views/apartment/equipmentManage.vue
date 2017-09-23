<template>
	<div class="hous">
		<menu-box></menu-box>
		<div class="right-content" id="right-content">
			<right-header></right-header>
			<div class="wordbench-box">
				<div class="ivu-site">
		          <span>您现在的位置： </span>
		          <router-link  class="active" to="/apartment/communityManagement">社区管理</router-link>
		        </div>
		        <div class="ivu-bar-title">
		          <h3><i class="icon icon-iden"></i>设备管理</h3>
		          <span>佳兆业航运WEWA空间</span>
		        </div>
		    	<div id="equipmentMan">
		    		<el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
					    <el-tab-pane label="智能门锁" name="first">
                <div class="equipment1">
                  <div class="house_xq">
                      <img src="../../../static/images/temp/logo2_03.png">
                      <a href="#" class="ceng">1层</a>
                  </div>
                  <table>
                    <thead>
                      <td>房间</td>
                      <td>门锁类型</td>
                      <td>门锁序列号</td>
                      <td>网关名称</td>
                      <td>密码</td>
                      <td>供应商</td>
                      <td>添加时间</td>
                      <td>门锁状态</td>
                      <td width="15%">操作</td>
                    </thead>
                    <tr>
                      <td>101</td>
                      <td>智能密码锁</td>
                      <td>1341648946168</td>
                      <td>1楼门锁网关A</td>
                      <td>123456</td>
                      <td>云丁</td>
                      <td>2017.15.05</td>
                      <td>在线</td>
                      <td>
                        <div>
                          <a @click="instas3()">获取临时密码</a>
                          <a @click="instas5()">修改</a>
                          <router-link to="/apartment/doorRecord">开门记录</router-link>
                          <a @click="instas()">冻结</a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>101</td>
                      <td>--</td>
                      <td>--</td>
                      <td>--</td>
                      <td>--</td>
                      <td>--</td>
                      <td>--</td>
                      <td>未配置</td>
                      <td>
                        <a @click="instas4()">添加门锁</a>
                      </td>
                    </tr>
                  </table>
                </div>
                <div class="equipment1">
                  <div class="house_xq">
                    <img src="../../../static/images/temp/logo2_03.png">
                    <a href="#" class="ceng">1层</a>
                  </div>
                  <table>
                    <thead>
                    <td>房间</td>
                    <td>门锁类型</td>
                    <td>门锁序列号</td>
                    <td>网关名称</td>
                    <td>密码</td>
                    <td>供应商</td>
                    <td>添加时间</td>
                    <td>门锁状态</td>
                    <td width="15%">操作</td>
                    </thead>
                    <tr>
                      <td>101</td>
                      <td>智能密码锁</td>
                      <td>1341648946168</td>
                      <td>1楼门锁网关A</td>
                      <td>123456</td>
                      <td>云丁</td>
                      <td>2017.15.05</td>
                      <td>在线</td>
                      <td>
                        <div>
                          <a @click="instas3()">获取临时密码</a>
                          <a @click="instas5()">修改</a>
                          <router-link to="/apartment/doorRecord">开门记录</router-link>
                          <a @click="instas()">冻结</a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>101</td>
                      <td>--</td>
                      <td>--</td>
                      <td>--</td>
                      <td>--</td>
                      <td>--</td>
                      <td>--</td>
                      <td>未配置</td>
                      <td>
                        <a @click="instas4()">添加门锁</a>
                      </td>
                    </tr>
                  </table>
                </div>
                <div class="equipment1">
                  <div class="house_xq">
                    <img src="../../../static/images/temp/logo2_03.png">
                    <a href="#" class="ceng">1层</a>
                  </div>
                  <table>
                    <thead>
                    <td>房间</td>
                    <td>门锁类型</td>
                    <td>门锁序列号</td>
                    <td>网关名称</td>
                    <td>密码</td>
                    <td>供应商</td>
                    <td>添加时间</td>
                    <td>门锁状态</td>
                    <td width="15%">操作</td>
                    </thead>
                    <tr>
                      <td>101</td>
                      <td>智能密码锁</td>
                      <td>1341648946168</td>
                      <td>1楼门锁网关A</td>
                      <td>123456</td>
                      <td>云丁</td>
                      <td>2017.15.05</td>
                      <td>在线</td>
                      <td>
                        <div>
                          <a @click="instas3()">获取临时密码</a>
                          <a @click="instas5()">修改</a>
                          <router-link to="/apartment/doorRecord">开门记录</router-link>
                          <a @click="instas()">冻结</a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>101</td>
                      <td>--</td>
                      <td>--</td>
                      <td>--</td>
                      <td>--</td>
                      <td>--</td>
                      <td>--</td>
                      <td>未配置</td>
                      <td>
                        <a @click="instas4()">添加门锁</a>
                      </td>
                    </tr>
                  </table>
                </div>
                <div class="equipment1">
                  <div class="house_xq">
                    <img src="../../../static/images/temp/logo2_03.png">
                    <a href="#" class="ceng">1层</a>
                  </div>
                  <table>
                    <thead>
                    <td>房间</td>
                    <td>门锁类型</td>
                    <td>门锁序列号</td>
                    <td>网关名称</td>
                    <td>密码</td>
                    <td>供应商</td>
                    <td>添加时间</td>
                    <td>门锁状态</td>
                    <td width="15%">操作</td>
                    </thead>
                    <tr>
                      <td>101</td>
                      <td>智能密码锁</td>
                      <td>1341648946168</td>
                      <td>1楼门锁网关A</td>
                      <td>123456</td>
                      <td>云丁</td>
                      <td>2017.15.05</td>
                      <td>在线</td>
                      <td>
                        <div>
                          <a @click="instas3()">获取临时密码</a>
                          <a @click="instas5()">修改</a>
                          <router-link to="/apartment/doorRecord">开门记录</router-link>
                          <a @click="instas()">冻结</a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>101</td>
                      <td>--</td>
                      <td>--</td>
                      <td>--</td>
                      <td>--</td>
                      <td>--</td>
                      <td>--</td>
                      <td>未配置</td>
                      <td>
                        <a @click="instas4()">添加门锁</a>
                      </td>
                    </tr>
                  </table>
                </div>
                <div class="equipment1">
                  <div class="house_xq">
                    <img src="../../../static/images/temp/logo2_03.png">
                    <a href="#" class="ceng">1层</a>
                  </div>
                  <table>
                    <thead>
                    <td>房间</td>
                    <td>门锁类型</td>
                    <td>门锁序列号</td>
                    <td>网关名称</td>
                    <td>密码</td>
                    <td>供应商</td>
                    <td>添加时间</td>
                    <td>门锁状态</td>
                    <td width="15%">操作</td>
                    </thead>
                    <tr>
                      <td>101</td>
                      <td>智能密码锁</td>
                      <td>1341648946168</td>
                      <td>1楼门锁网关A</td>
                      <td>123456</td>
                      <td>云丁</td>
                      <td>2017.15.05</td>
                      <td>在线</td>
                      <td>
                        <div>
                          <a @click="instas3()">获取临时密码</a>
                          <a @click="instas5()">修改</a>
                          <router-link to="/apartment/doorRecord">开门记录</router-link>
                          <a @click="instas()">冻结</a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>101</td>
                      <td>--</td>
                      <td>--</td>
                      <td>--</td>
                      <td>--</td>
                      <td>--</td>
                      <td>--</td>
                      <td>未配置</td>
                      <td>
                        <a @click="instas4()">添加门锁</a>
                      </td>
                    </tr>
                  </table>
                </div>
                <div class="equipment1">
                  <div class="house_xq">
                    <img src="../../../static/images/temp/logo2_03.png">
                    <a href="#" class="ceng">1层</a>
                  </div>
                  <table>
                    <thead>
                    <td>房间</td>
                    <td>门锁类型</td>
                    <td>门锁序列号</td>
                    <td>网关名称</td>
                    <td>密码</td>
                    <td>供应商</td>
                    <td>添加时间</td>
                    <td>门锁状态</td>
                    <td width="15%">操作</td>
                    </thead>
                    <tr>
                      <td>101</td>
                      <td>智能密码锁</td>
                      <td>1341648946168</td>
                      <td>1楼门锁网关A</td>
                      <td>123456</td>
                      <td>云丁</td>
                      <td>2017.15.05</td>
                      <td>在线</td>
                      <td>
                        <div>
                          <a @click="instas3()">获取临时密码</a>
                          <a @click="instas5()">修改</a>
                          <router-link to="/apartment/doorRecord">开门记录</router-link>
                          <a @click="instas()">冻结</a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>101</td>
                      <td>--</td>
                      <td>--</td>
                      <td>--</td>
                      <td>--</td>
                      <td>--</td>
                      <td>--</td>
                      <td>未配置</td>
                      <td>
                        <a @click="instas4()">添加门锁</a>
                      </td>
                    </tr>
                  </table>
                </div>
                <div class="equipment1">
                  <div class="house_xq">
                    <img src="../../../static/images/temp/logo2_03.png">
                    <a href="#" class="ceng">1层</a>
                  </div>
                  <table>
                    <thead>
                    <td>房间</td>
                    <td>门锁类型</td>
                    <td>门锁序列号</td>
                    <td>网关名称</td>
                    <td>密码</td>
                    <td>供应商</td>
                    <td>添加时间</td>
                    <td>门锁状态</td>
                    <td width="15%">操作</td>
                    </thead>
                    <tr>
                      <td>101</td>
                      <td>智能密码锁</td>
                      <td>1341648946168</td>
                      <td>1楼门锁网关A</td>
                      <td>123456</td>
                      <td>云丁</td>
                      <td>2017.15.05</td>
                      <td>在线</td>
                      <td>
                        <div>
                          <a @click="instas3()">获取临时密码</a>
                          <a @click="instas5()">修改</a>
                          <router-link to="/apartment/doorRecord">开门记录</router-link>
                          <a @click="instas()">冻结</a>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>101</td>
                      <td>--</td>
                      <td>--</td>
                      <td>--</td>
                      <td>--</td>
                      <td>--</td>
                      <td>--</td>
                      <td>未配置</td>
                      <td>
                        <a @click="instas4()">添加门锁</a>
                      </td>
                    </tr>
                  </table>
                </div>


					    </el-tab-pane>
					    <el-tab-pane label="电表" name="second">
                <div class="equipment1 equipment2">
                  <div class="house_xq">
                      <img src="../../../static/images/temp/logo2_03.png">
                      <a href="#" class="ceng">1层</a>
                  </div>
                  <table>
                    <thead>
                      <td>房间</td>
                      <td>电表序列号</td>
                      <td>网关名称</td>
                      <td>供应商</td>
                      <td>添加时间</td>
                      <td>上次抄表时间</td>
                      <td>上次抄表读数</td>
                      <td>电表状态</td>
                      <td width="15%">操作</td>
                    </thead>
                    <tr>
                      <td>101</td>
                      <td>1341648946168</td>
                      <td>1楼门锁网关A</td>
                      <td>云丁</td>
                      <td>2017.15.05</td>
                      <td>2017.15.05</td>
                      <td>121213</td>
                      <td>在线</td>
                      <td>
                        <div>
                          <a @click="adddian2()">修改</a>
                          <a>关闭</a>
                          <router-link to="/apartment/meterReading">抄表记录</router-link>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>101</td>
                      <td>1341648946168</td>
                      <td>1楼门锁网关A</td>
                      <td>云丁</td>
                      <td>2017.15.05</td>
                      <td>2017.15.05</td>
                      <td>121213</td>
                      <td>在线</td>
                      <td>
                        <div>
                          <a @click="adddian()">添加电表</a>
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>
					    </el-tab-pane>
					    <el-tab-pane label="水表" name="third">
                <div class="equipment1 equipment2">
                  <div class="house_xq">
                      <img src="../../../static/images/temp/logo2_03.png">
                      <a href="#" class="ceng">1层</a>
                  </div>
                  <table>
                    <thead>
                      <td>房间</td>
                      <td>水表序列号</td>
                      <td>网关名称</td>
                      <td>供应商</td>
                      <td>添加时间</td>
                      <td>上次抄表时间</td>
                      <td>上次抄表读数</td>
                      <td>水表状态</td>
                      <td width="15%">操作</td>
                    </thead>
                    <tr>
                      <td>101</td>
                      <td>1341648946168</td>
                      <td>1楼门锁网关A</td>
                      <td>云丁</td>
                      <td>2017.15.05</td>
                      <td>2017.15.05</td>
                      <td>121213</td>
                      <td>在线</td>
                      <td>
                        <div>
                          <a>修改</a>
                          <a @click="closeshui1()">关闭</a>
                          <a>抄表记录</a>
                        </div>
                      </td>
                    </tr>
							  	</table>
					    	</div>
					    </el-tab-pane>
					    <el-tab-pane label="网关管理" name="fourth">
					    	<div class="equipment1 equipment2">
					    		<div class="house_xq">
							  			<img src="../../../static/images/temp/logo2_03.png">
							  			<a href="#" class="ceng">1层</a>
							  			<a class="tianjia" @click="instas10()"> + 添加网关</a>
							  	</div>
							  	<table>
							  		<thead>
							  			<td>序号</td>
							  			<td>网关类型</td>
							  			<td>网关名称</td>
							  			<td>供应商</td>
							  			<td>序列号</td>
							  			<td>已连接设备</td>
							  			<td>添加时间</td>
							  			<td>状态</td>
							  			<td>操作</td>
							  		</thead>
							  		<tr>
							  			<td>101</td>
							  			<td>1341648946168</td>
							  			<td>1楼门锁网关A</td>
							  			<td>云丁</td>
							  			<td>2017.15.05</td>
							  			<td>2017.15.05</td>
							  			<td>121213</td>
							  			<td>在线</td>
							  			<td><a @click="instas11()">修改</a></td>
							  		</tr>
							  	</table>
					    	</div>
					    </el-tab-pane>
					</el-tabs>
		    	</div>


			</div>
			<footer-box></footer-box>
		</div>


		<div class="scherm" v-show="isHid">
		</div>
		<div class="scherm scherm2" v-show="isHid2">
		</div>

    <!--冻结门锁-->
		<div class="instas2" v-show="isHide">
				<i class="ivu-icon ivu-icon-ios-locked-outline"></i>
				<p>你确定要<i>冻结</i></p>
				<p>房间<b>1层 103</b>的门锁吗?</p>
				<a>确定</a><a @click="instas()">取消</a>
		</div>
    <!--获取临时密码-->
		<div class="instas3" v-show="isHide2">
				<i class="el-icon-circle-close" @click="instas3()"></i>
				<p>获取临时密码</p>
				<span>临时密码发送至：</span>
				<input type="text" placeholder="请输入手机号码"/>
				<p><i class="el-icon-warning"></i>临时密码有效时间为2个小时</p>
				<a @click="instas3()">确定</a>
		</div>



    <!--添加门锁-->
		<div class="instas4" v-show="false">
			<i class="el-icon-circle-close" @click="instas4()"></i>
			<p>添加门锁</p>
			<table>
				<tr>
					<td>房间：</td>
					<td>1层 103</td>
				</tr>
				<tr>
					<td>供应商：</td>
					<td>
						<el-select v-model="value8" filterable placeholder="请输入或选择">
						    <el-option
						      v-for="item in options"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td>门锁类型：</td>
					<td>
						<el-select v-model="value5" placeholder="请选择">
						    <el-option
						      v-for="item in options"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td>序列号：</td>
					<td>
						<input type="text" placeholder="请输入序列号" />
					</td>
				</tr>
				<tr>
					<td>网关：</td>
					<td>
						<el-select v-model="value8" filterable placeholder="请输入或选择">
						    <el-option
						      v-for="item in options"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td>密码：</td>
					<td>
						<input type="text" placeholder="请输入6位密码" />
					</td>
				</tr>
			</table>
			<a class="tjss">提交</a>
		</div>
    <!--修改门锁配置-->
		<div class="instas5" v-show="isHide4">
			<i class="el-icon-circle-close" @click="instas5()"></i>
			<p>修改门锁配置</p>
			<table>
				<tr>
					<td>房间：</td>
					<td>1层 103
						<a @click="instas6()">解除门锁</a>
					</td>
				</tr>
				<tr>
					<td>供应商：</td>
					<td>
						<el-select v-model="value8" filterable placeholder="请输入或选择">
						    <el-option
						      v-for="item in options"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td>门锁类型：</td>
					<td>
						<el-select v-model="value5" placeholder="请选择">
						    <el-option
						      v-for="item in options"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td>序列号：</td>
					<td>
						<input type="text" placeholder="请输入序列号" />
					</td>
				</tr>
				<tr>
					<td>网关：</td>
					<td>
						<el-select v-model="value8" filterable placeholder="请输入或选择">
						    <el-option
						      v-for="item in options"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td>密码：</td>
					<td>
						<input type="text" placeholder="请输入6位密码" />
					</td>
				</tr>
			</table>
			<a class="tja">提交</a>
		</div>
    <!--解除门锁-->
		<div class="instas6 instas2" v-show="isHide5">
			<i class="ivu-icon ivu-icon-help-buoy"></i>
			<p>你确定要<i>解除</i></p>
			<p>房间<b>1层 103</b>的门锁吗?</p>
			<a>确定</a><a @click="instas6()">取消</a>
		</div>
    <!--冻结门锁-->
    <div class="instas6 instas2" v-show="false">
      <Icon type="ios-locked-outline"></Icon>
      <p>你确定要<i>解冻</i></p>
      <p>房间<b>1层 103</b>的门锁吗?</p>
      <a>确定</a><a @click="instas6()">取消</a>
    </div>
    <!--解冻门锁-->
    <div class="instas6 instas2" v-show="false">
      <Icon type="ios-unlocked-outline"></Icon>
      <p>你确定要<i>解冻</i></p>
      <p>房间<b>1层 103</b>的门锁吗?</p>
      <a>确定</a><a @click="instas6()">取消</a>
    </div>



    <!--添加电表-->
		<div class="instas7 instas4" v-show="isHide6">
			<i class="el-icon-circle-close" @click="adddian()"></i>
			<p>添加电表</p>
			<table>
				<tr>
					<td>房间：</td>
					<td>3层 301</td>
				</tr>
				<tr>
					<td>序列号：</td>
					<td>
						<input type="text" placeholder="请输入序列号" />
					</td>
				</tr>
				<tr>
					<td>网关：</td>
					<td>
						<el-select v-model="value8" filterable placeholder="请输入或选择">
						    <el-option
						      v-for="item in options"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					</td>
				</tr>
			</table>
			<a @click="adddian()" class="tjss">确定</a>
		</div>
    <!--修改电表配置-->
		<div class="instas8 instas4" v-show="isHide7">
			<i class="el-icon-circle-close" @click="adddian2()"></i>
			<p>修改电表配置</p>
			<table>
				<tr>
					<td>房间：</td>
					<td>3层 301<a @click="instas9()">解除电表</a></td>
				</tr>
				<tr>
					<td>序列号：</td>
					<td>
						<input type="text" placeholder="请输入序列号" />
					</td>
				</tr>
				<tr>
					<td>网关：</td>
					<td>
						<el-select v-model="value8" filterable placeholder="请输入或选择">
						    <el-option
						      v-for="item in options"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					</td>
				</tr>
			</table>
			<a @click="adddian2()" class="tjss">确定</a>
		</div>
    <!--解除电表-->
    <div class="instas9 instas2" v-show="isHide8">
      <i class="ivu-icon ivu-icon-help-buoy"></i>
      <p>你确定要<i>解除</i></p>
      <p>房间<b>1层 103</b>的电表吗?</p>
      <a>确定</a><a @click="instas9()">取消</a>
    </div>


    <!--关闭水表-->
    <div class="instas2" v-show="isHide11">
      <Icon type="ios-close-outline"></Icon>
      <p>你确定要<i>关闭</i></p>
      <p>房间<b>1层 103</b>的水表吗?</p>
      <a>确定</a><a @click="instas15()">取消</a>
    </div>
    <!-- 开启水表-->
    <div class="instas2" v-show="isHide12">
      <Icon type="ios-checkmark-outline"></Icon>
      <p>你确定要<i>开启</i></p>
      <p>房间<b>1层 103</b>的水表吗?</p>
      <a>确定</a><a @click="instas16()">取消</a>
    </div>
    <!--添加水表-->
    <div class="instas7 instas4" v-show="false">
      <i class="el-icon-circle-close" @click="adddian()"></i>
      <p>添加水表</p>
      <table>
        <tr>
          <td>房间：</td>
          <td>3层 301</td>
        </tr>
        <tr>
          <td>序列号：</td>
          <td>
            <input type="text" placeholder="请输入序列号" />
          </td>
        </tr>
        <tr>
          <td>网关：</td>
          <td>
            <el-select v-model="value8" filterable placeholder="请输入或选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </td>
        </tr>
      </table>
      <a @click="adddian()" class="tjss">确定</a>
    </div>
    <!--修改水表配置-->
    <div class="instas8 instas4" v-show="false">
      <i class="el-icon-circle-close" @click="adddian2()"></i>
      <p>修改水表配置</p>
      <table>
        <tr>
          <td>房间：</td>
          <td>3层 301<a @click="instas9()">解除电表</a></td>
        </tr>
        <tr>
          <td>序列号：</td>
          <td>
            <input type="text" placeholder="请输入序列号" />
          </td>
        </tr>
        <tr>
          <td>网关：</td>
          <td>
            <el-select v-model="value8" filterable placeholder="请输入或选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </td>
        </tr>
      </table>
      <a @click="adddian2()" class="tjss">确定</a>
    </div>



    <!--添加网关-->
		<div class="instas10 instas4" v-show="isHide9">
			<i class="el-icon-circle-close" @click="instas10()"></i>
			<p>添加网关</p>
			<table>
				<tr>
					<td>楼层：</td>
					<td>1层</td>
				</tr>
				<tr>
					<td>网关名称：</td>
					<td>
						<input type="text" placeholder="请输入网关名称" />
					</td>
				</tr>

				<tr>
					<td>供应商：</td>
					<td>
						<el-select v-model="value8" filterable placeholder="请输入或选择">
						    <el-option
						      v-for="item in options"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td>网关类型：</td>
					<td>
						<el-select v-model="value5" placeholder="请选择网关类型">
						    <el-option
						      v-for="item in options"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td>序列号：</td>
					<td>
						<input type="text" placeholder="请输入序列号" />
					</td>
				</tr>
			</table>
			<a @click="instas10()" class="tjss">确定</a>
		</div>
    <!--添加网关配置-->
		<div class="instas11 instas4" v-show="isHide10">
			<i class="el-icon-circle-close" @click="instas11()"></i>
			<p>添加网关配置</p>
			<table>
				<tr>
					<td>楼层：</td>
					<td>1层<a>解除网关</a></td>
				</tr>
				<tr>
					<td>网关名称：</td>
					<td>
						<input type="text" placeholder="请输入网关名称" />
					</td>
				</tr>

				<tr>
					<td>供应商：</td>
					<td>
						<el-select v-model="value8" filterable placeholder="请输入或选择">
						    <el-option
						      v-for="item in options"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td>网关类型：</td>
					<td>
						<el-select v-model="value5" placeholder="请选择网关类型">
						    <el-option
						      v-for="item in options"
						      :key="item.value"
						      :label="item.label"
						      :value="item.value">
						    </el-option>
						</el-select>
					</td>
				</tr>
				<tr>
					<td>序列号：</td>
					<td>
						<input type="text" placeholder="请输入序列号" />
					</td>
				</tr>
			</table>
			<a @click="instas11()" class="tjss">确定</a>
		</div>

	</div>
</template>

<script>

	import '../../sass/style/equipment.css';
	import menuBox from '../../components/menuBox.vue';
  import rightHeader from '../../components/rightHeader.vue';
  import footerBox from '../../components/footerBox.vue';
  import qs from 'qs';
  import {gateLock} from '../api.js';

    export default {
    	components:{
    		rightHeader,
    		menuBox,
    		footerBox
    	},
    	data(){
    		return{
    			isHid:false,
    			isHid2:false,
    			isHide:false,
    			isHide2:false,
    			isHide3:false,
    			isHide4:false,
    			isHide5:false,
    			isHide6:false,
    			isHide7:false,
    			isHide8:false,
    			isHide9:false,
    			isHide10:false,
          isHide11:false,
          isHide12:false,
    			activeName2: 'first',
          value5:"",
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
		        value8: '',
          communityId:"",
		   	}
    	},
      mounted(){
    	  this.communityId = this.$route.query.communityId;
      },
    	methods:{
    		instas:function(){
    			this.isHid = !this.isHid;
    			this.isHide = !this.isHide;
    		},
    		instas3:function(){
    			this.isHid = !this.isHid;
    			this.isHide2 = !this.isHide2;
    		},
    		instas4:function(){
    			this.isHid = !this.isHid;
    			this.isHide3 = !this.isHide3;
    		},
    		instas5:function(){
    			this.isHid = !this.isHid;
    			this.isHide4 = !this.isHide4;
    		},
    		instas6:function(){
    			this.isHid = false;
    			this.isHide4 = false;
    			this.isHide5 = !this.isHide5;
    			this.isHid2 = !this.isHid2;
    		},
    		adddian:function(){
    			this.isHid = !this.isHid;
    			this.isHide6 = !this.isHide6;
    		},
    		adddian2:function(){
    			this.isHid = !this.isHid;
    			this.isHide7 = !this.isHide7;
    		},
    		instas9:function(){
    			this.isHid = false;
    			this.isHide7 = false;
    			this.isHide8 = !this.isHide8;
    			this.isHid2 = !this.isHid2;
    		},
    		instas10:function(){
    			this.isHid = !this.isHid;
    			this.isHide9 = !this.isHide9;
    		},
    		instas11:function(){
    			this.isHid = !this.isHid;
    			this.isHide10 = !this.isHide10;
    		},
        instas15(){
          this.isHid = !this.isHid;
          this.isHide11 = !this.isHide11;
        },
        closeshui1(){debugger
          this.isHid = !this.isHid;
          this.isHide11 = !this.isHide11;
        },
        instas16(){
          this.isHid = !this.isHid;
          this.isHide12 = !this.isHide12;
        },
    		handleClick(tab, event) {
		        console.log(tab, event);
		    },



    	},
    	created(){


    	}
    }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';

  #equipmentMan{
    min-height: 1000px;
    height: 100%;
  }
</style>
