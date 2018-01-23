<template>
    <div class="checkIn">
        <p>房号：101<span style="margin-left: 40px;">标准大单间</span></p>
        <p>房间信息：<span class="span1">格局：daodjaod </span><span class="span1">面积：35.00 m²</span></p>
        <p>定房电话：<input class="ivu-input" style="width:130px;"> 定房姓名：王大妈</p>
        <p>门市价：</p>
        <p>入住时间：<Date-picker type="date" :options="option3" placeholder="选择日期"></Date-picker></p>
        <p>预计退房日期：<Date-picker type="date" :options="option3" placeholder="选择日期"></Date-picker> 
            入住天数： 
            <Select v-model="stationCommunity" style="width:70px">
                <Option v-for="community in  stationSelectList" :value="community.communityId" :key="community.communityId">{{ community.communityName }}</Option>
            </Select>
        </p>
        <p>备注：<input class="ivu-input" style="width:300px;"> 
            市场细分：
            <Select v-model="stationCommunity" style="width:180px">
                <Option v-for="community in  stationSelectList" :value="community.communityId" :key="community.communityId">{{ community.communityName }}</Option>
            </Select>
        </p>
        <p>入住人：
            <ul>
                <li>
                    姓名：<input class="ivu-input " style="width:80px;">
                    <el-radio class="radio" v-model="radio" label="1">男</el-radio>
                    <el-radio class="radio" v-model="radio" label="2">女</el-radio>
                    <Select v-model="stationCommunity" style="width:120px">
                        <Option v-for="community in  stationSelectList" :value="community.communityId" :key="community.communityId">{{ community.communityName }}</Option>
                    </Select>
                    <input class="ivu-input" style="width:250px;">
                </li>
            </ul>
        </p>
        <a @click="checkIn()">提交</a>
        <a @click="notcheckIn()">取消</a>
        <span style="margin-left: 40px;color:red;">点击提交发送密码短信至登录人的手机中</span>
    </div>
</template>

<script>

export default {
  data () {
    return {

    }
  },
  methods:{
    notcheckIn(){
        this.$emit("notcheckIn",false);
    },
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" >
  @import '../sass/base/_mixin.scss';
  .checkIn{
	width: 800px;
	height: 415px;
	background: #fff;
	z-index: 9999;
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%,-50%);
	border-radius: 5px;
	
    }
    .checkIn p{
        margin-left: 20px;
        line-height: 40px;
    }
    .checkIn .ivu-input{
        height: 32px;
        margin-right: 10px;
    }
    .checkIn p .span1{
        margin-left: 20px;
    }
    .checkIn .ivu-select-selection{
        border-radius: 0%;
    }
    .checkIn a{
        width: 100px;
        height: 30px;
        display: inline-block;
        text-align: center;
        line-height: 30px;
        font-size: 16px;
        color: white;
        background: #038BE2;
        border-radius: 5px;
        margin-left: 115px;
        margin-top: 35px;
    }
    .checkIn ul{
        position: absolute;
        left: 86px;
        top: 282px;
    }
</style>
