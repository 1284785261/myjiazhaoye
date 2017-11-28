<template>
  <div>
    <menu-box></menu-box>
    <div class="right-content" id="right-content">
      <right-header></right-header>
      <div class="wordbench-box">
        <div class="ivu-site">
          <span>您现在的位置：</span>
          <router-link  class="active" to="">月报</router-link>
        </div>
        <div class="ivu-bar-title">
          <h3><i class="icon icon-iden"></i>月报</h3>
        </div>
        <div id="operation-day-report-wrap">
          <div class="operation-day-report-content">
            <div>
              <Date-picker type="month" placeholder="选择日期" v-model="startDate"
                           :editable="false" :clearable="false" @on-change="dateChange"></Date-picker>
              <!--至-->
              <!--<Date-picker type="month" placeholder="选择日期" v-model="endDate"></Date-picker>-->
            </div>
            <dev class="day-report-btn">
              <!--<Button type="primary" style="width:120px;height: 38px;">导出报表</Button>-->
            </dev>
          </div>
          <div class="day-report-center-wrap">
            <div class="day-report-center-title">
              <h2>{{date}}报表</h2>
            </div>
          </div>

          <ul class="day-report-table-ul">
            <li class="day-report-table-li">
              <h3><i class="icon icon-iden"></i>房源状态</h3>
              <!-- 报表 -->
              <div class="report-list">
                <!-- 公寓 报表 -->
                <div id="apartment" ></div>
                <!-- 办公室 报表 -->
                <div id="office" ></div>
                <hr class="border-dotted">
                <!-- 会议室 报表 -->
                <div id="meeting" ></div>
                <!-- 工位 报表 -->
                <div id="station" ></div>
                <hr class="border-solid">
              </div>
            </li>
            <li class="day-report-table-li">
              <h3><i class="icon icon-iden"></i>业务情况</h3>
              <!-- 报表 -->
              <div class="report-list">
                <!-- 业务情况 报表 -->
                <div id="business" ></div>
                <hr class="border-solid">
              </div>
            </li>
            <li class="day-report-table-li">
              <h3><i class="icon icon-iden"></i>账单情况</h3>
              <!-- 报表 -->
              <div class="report-list">
                <!-- 账单情况 报表 -->
                <div id="bills" ></div>
                <hr class="border-solid">
              </div>
            </li>
            <li class="day-report-table-li">
              <h3><i class="icon icon-iden"></i>财务情况</h3>
              <!-- 报表 -->
              <div class="report-list">
                <!-- 收入 报表 -->
                <div id="income" ></div>
                <!-- 支出 报表 -->
                <div id="expenses" ></div>
                <hr class="border-solid">
              </div>
            </li>
          </ul>

          <!--<ul class="day-report-table-ul">-->
            <!--<li class="day-report-table-li">-->
              <!--<h3><i class="icon icon-iden"></i>房源状态</h3>-->
              <!--<table class="report-table-item" border="1" bordercolor="#ccc" cellspacing="0" width="100%">-->
                <!--<tr>-->
                  <!--<th>房源</th>-->
                  <!--<th>房间总数</th>-->
                  <!--<th>新增房间</th>-->
                  <!--<th>删除房间</th>-->
                  <!--<th>空置房间</th>-->
                  <!--<th>再租房间</th>-->
                  <!--<th>入住率</th>-->
                <!--</tr>-->
                <!--<tr>-->
                  <!--<td>公寓</td>-->
                  <!--<td>1200</td>-->
                  <!--<td>1200</td>-->
                  <!--<td>1200</td>-->
                  <!--<td>1200</td>-->
                  <!--<td>1200</td>-->
                  <!--<td>1200</td>-->
                <!--</tr>-->
              <!--</table>-->
            <!--</li>-->
            <!--<li class="day-report-table-li">-->
              <!--<h3><i class="icon icon-iden"></i>业务情况</h3>-->
              <!--<table class="report-table-item" border="1" bordercolor="#ccc" cellspacing="0" width="100%">-->
                <!--<tr>-->
                  <!--<th>新增客户</th>-->
                  <!--<th>跟进中</th>-->
                  <!--<th>签约数</th>-->
                  <!--<th>业务处理率</th>-->
                <!--</tr>-->
                <!--<tr>-->
                  <!--<td>1200</td>-->
                  <!--<td>1200</td>-->
                  <!--<td>1200</td>-->
                  <!--<td>1200</td>-->
                <!--</tr>-->
              <!--</table>-->
            <!--</li>-->
            <!--<li class="day-report-table-li">-->
              <!--<h3><i class="icon icon-iden"></i>账单情况</h3>-->
              <!--<table class="report-table-item" border="1" bordercolor="#ccc" cellspacing="0" width="100%">-->
                <!--<tr>-->
                  <!--<th>账单总数</th>-->
                  <!--<th>应收账单数</th>-->
                  <!--<th>应付账单数</th>-->
                  <!--<th>代收款账单数</th>-->
                <!--</tr>-->
                <!--<tr>-->
                  <!--<td>1200</td>-->
                  <!--<td>1200</td>-->
                  <!--<td>1200</td>-->
                  <!--<td>1200</td>-->
                <!--</tr>-->
              <!--</table>-->
            <!--</li>-->
            <!--<li class="day-report-table-li">-->
              <!--<h3><i class="icon icon-iden"></i>财务情况</h3>-->
              <!--<ul class="day-report-inner-ul">-->
                <!--&lt;!&ndash;<li class="day-report-inner-li">&ndash;&gt;-->
                  <!--&lt;!&ndash;<div class="inner-li-title">当前现金收入</div>&ndash;&gt;-->
                  <!--&lt;!&ndash;<di class="inner-li-content">&ndash;&gt;-->
                    <!--&lt;!&ndash;<div class="inner-li-content-item">&ndash;&gt;-->
                      <!--&lt;!&ndash;<p>应收已收/元</p>&ndash;&gt;-->
                      <!--&lt;!&ndash;<span>290000.00</span>&ndash;&gt;-->
                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                    <!--&lt;!&ndash;<div class="inner-li-content-item">&ndash;&gt;-->
                      <!--&lt;!&ndash;<p>应收未收/元</p>&ndash;&gt;-->
                      <!--&lt;!&ndash;<span style="color: red">290000.00</span>&ndash;&gt;-->
                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                    <!--&lt;!&ndash;<div class="inner-li-content-item">&ndash;&gt;-->
                      <!--&lt;!&ndash;<p>回收率</p>&ndash;&gt;-->
                      <!--&lt;!&ndash;<span style="color: #00a0e9;">290000.00</span>&ndash;&gt;-->
                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                  <!--&lt;!&ndash;</di>&ndash;&gt;-->
                <!--&lt;!&ndash;</li>&ndash;&gt;-->
                <!--&lt;!&ndash;<li class="day-report-inner-li">&ndash;&gt;-->
                  <!--&lt;!&ndash;<div class="inner-li-title">明日租金预期</div>&ndash;&gt;-->
                  <!--&lt;!&ndash;<di class="inner-li-content">&ndash;&gt;-->
                    <!--&lt;!&ndash;<div class="inner-li-content-item">&ndash;&gt;-->
                      <!--&lt;!&ndash;<p>预计租金收支差/元</p>&ndash;&gt;-->
                      <!--&lt;!&ndash;<span>29000000.00</span>&ndash;&gt;-->
                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                    <!--&lt;!&ndash;<div class="inner-li-content-item">&ndash;&gt;-->
                      <!--&lt;!&ndash;<p>预计租金收入/元</p>&ndash;&gt;-->
                      <!--&lt;!&ndash;<span style="color: #3dc4b2;">2900000.00</span>&ndash;&gt;-->
                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                    <!--&lt;!&ndash;<div class="inner-li-content-item">&ndash;&gt;-->
                      <!--&lt;!&ndash;<p>预计租金支出/元</p>&ndash;&gt;-->
                      <!--&lt;!&ndash;<span style="color: red;">2900000.00</span>&ndash;&gt;-->
                    <!--&lt;!&ndash;</div>&ndash;&gt;-->
                  <!--&lt;!&ndash;</di>&ndash;&gt;-->
                <!--&lt;!&ndash;</li>&ndash;&gt;-->
                <!--<li class="day-report-inner-li">-->
                  <!--<div class="inner-li-title">现金收入</div>-->
                  <!--<div class="inner-li-total-income">-->
                    <!--<span>现金总收入:</span><span style="color: #3dc4b2;">290000.00</span>-->
                  <!--</div>-->
                  <!--<di class="inner-li-content">-->
                    <!--<div class="inner-li-content-item">-->
                      <!--<p>租金收入/元</p>-->
                      <!--<span>+290000.00</span>-->
                    <!--</div>-->
                    <!--<div class="inner-li-content-item">-->
                      <!--<p>押金收入/元</p>-->
                      <!--<span>+290000.00</span>-->
                    <!--</div>-->
                    <!--<div class="inner-li-content-item">-->
                      <!--<p>杂费收入/元</p>-->
                      <!--<span>+290000.00</span>-->
                    <!--</div>-->
                  <!--</di>-->
                <!--</li>-->
                <!--<li class="day-report-inner-li">-->
                  <!--<div class="inner-li-title">现金支出</div>-->
                  <!--<div class="inner-li-total-income">-->
                    <!--<span>现金总支出:</span><span style="color: red;">290000.00</span>-->
                  <!--</div>-->
                  <!--<di class="inner-li-content">-->
                    <!--<div class="inner-li-content-item">-->
                      <!--<p>租金支出/元</p>-->
                      <!--<span>-290000.00</span>-->
                    <!--</div>-->
                    <!--<div class="inner-li-content-item">-->
                      <!--<p>押金支出/元</p>-->
                      <!--<span>-290000.00</span>-->
                    <!--</div>-->
                    <!--<div class="inner-li-content-item">-->
                      <!--<p>杂费支出/元</p>-->
                      <!--<span>-290000.00</span>-->
                    <!--</div>-->
                  <!--</di>-->
                <!--</li>-->
              <!--</ul>-->
            <!--</li>-->
          <!--</ul>-->
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
  import {CommunityMonthReport, CommunityBusinessMonthReport, CommunityOrderMonthReport, CommunityMoneyMonthReport} from '../api.js';

  export default {
    components:{
      rightHeader,
      menuBox,
      footerBox
    },
    data(){
      return{
      	date:'',
        startDate:"",
        endDate:""
      }
    },
    mounted(){
      this.userId = this.$route.query.id;

	    let newDate = new Date()
      this.date = newDate.getFullYear() + '年' + parseInt(newDate.getMonth()+1)+'月'
      this.startDate = newDate.getFullYear() + '-' + parseInt(newDate.getMonth()+1)

      // 初始化报表
      this.initEcharts()
    },
    methods:{
	    /**
	     * 初始化 报表
	     */
	    initEcharts(){
		    // 查询房源状态
		    this.getCommunityMonthReport()
		    // 查询 业务情况
		    this.getCommunityBusinessMonthReport()
		    // 查询 账单
		    this.getCommunityOrderMonthReport()
		    // 查询 财务
		    this.getCommunityMoneyMonthReport()
	    },
      /*
    	* 组织数据
      */
    	getDataValue(data){
    		let obj = {datas:[], values:[]}
    		if(data!=undefined){
    			for (let i=0; i<data.length; i++){
				    obj.datas.push(data[i].data)
				    obj.values.push(data[i].value)
          }
        }
        return obj
      },
    	/**
       * 查询房源状态
       */
    	getCommunityMonthReport(){
		    let that = this;
		    this.$http.post(CommunityMonthReport, qs.stringify({startDate:this.startDate+'-01'}))
			    .then(function(res){
				    if(res.status == 200 && res.data.code == 10000){
					    let data = res.data.result;
					    // 公寓 报表
					    that.createRoomReport(data.room)
					    // 办公室 报表
					    that.createOfficeReport(data.office)
              // 会议室 报表
					    that.createMeetingReport(data.meeting)
					    // 工位 报表
					    that.createStationReport(data.place)
				    }
			    })
      },
	    /**
	     * 查询业务情况
	     */
	    getCommunityBusinessMonthReport(){
		    let that = this;
		    this.$http.post(CommunityBusinessMonthReport, qs.stringify({startDate:this.startDate+'-01'}))
			    .then(function(res){
				    if(res.status == 200 && res.data.code == 10000){
					    let data = res.data.result.business;

					    // 业务情况 报表
					    that.createBusinessReport(data)
				    }
			    })
	    },
	    /**
	     * 查询账单情况
	     */
	    getCommunityOrderMonthReport(){
		    let that = this;
		    this.$http.post(CommunityOrderMonthReport, qs.stringify({startDate:this.startDate+'-01'}))
			    .then(function(res){
				    if(res.status == 200 && res.data.code == 10000){
					    let data = res.data.result.order;

					    // 账单情况 报表
					    that.createBillsReport(data)
				    }
			    })
	    },
	    /**
	     * 查询财务情况
	     */
	    getCommunityMoneyMonthReport(){
		    let that = this;
		    this.$http.post(CommunityMoneyMonthReport, qs.stringify({startDate:this.startDate+'-01'}))
			    .then(function(res){
				    if(res.status == 200 && res.data.code == 10000){
					    let data = res.data.result;

					    // 现金收入 报表
					    that.createIncomeReport(data.money)

					    // 现金支出 报表
					    that.createExpensesReport(data.refund)
				    }
			    })
	    },
      /**
       * 选择日期
       */
	    dateChange(date){
	    	let that = this
	      let _date = new Date(date)
	      let newDate = new Date()

	    	if(_date>newDate){
			    this.$message({
				    showClose: true,
				    message: '查询月份不能大于当前月',
				    type: 'warning'
			    });

			    date = newDate.getFullYear() + '-' + parseInt(newDate.getMonth()+1)
			    this.startDate = ''
          setTimeout(function () {
	          that.startDate = date
          },1)
        }

	      this.date = date.substr(0,4) + '年' + date.substr(5,7)+'月'
	      this.startDate = date

	      // 初始化报表
	      this.initEcharts()
      },
	    /**
       * 公寓 报表
	     */
	    createRoomReport(dt){
		    let data = this.getDataValue(dt)

	    	//指定图标的配置和数据
		    var option1 = {
			    title:{
				    text:'公寓入住率'
			    },
			    tooltip:{},
			    legend:{
				    data:['用户来源']
			    },
          // 滑动事件
			    dataZoom: [
				    {
					    type: 'slider',
					    xAxisIndex: 0,
					    filterMode: 'empty'
				    },
				    {
					    type: 'inside',
					    xAxisIndex: 0,
					    filterMode: 'empty'
				    }
			    ],
			    xAxis:{
				    //type: 'category',
				    //show: true,
				    name: '日期',
				    data:data.datas
			    },
			    yAxis:{
				    min: 0,
				    max: 100,
				    name: '入住率%',
				    axisLabel: {
					    formatter: function (val) {
						    return val + '%';
					    }
				    },
				    //show: true,
				    //type: 'value',
			    },
			    series:[{
				    name:'公寓入住率',
				    type:'line',
				    data:data.values
			    }]
		    };
		    //初始化echarts实例
		    var myChart1 = this.$echarts.init(document.getElementById('apartment'));

		    //使用制定的配置项和数据显示图表
		    myChart1.setOption(option1);
      },
	    /**
	     * 办公室 报表
	     */
	    createOfficeReport(dt){
		    let data = this.getDataValue(dt)

        //指定图标的配置和数据
		    var option1 = {
			    title:{
				    text:'办公室入住率'
			    },
			    tooltip:{},
			    legend:{
				    data:['用户来源']
			    },
			    // 滑动事件
			    dataZoom: [
				    {
					    type: 'slider',
					    xAxisIndex: 0,
					    filterMode: 'empty'
				    },
				    {
					    type: 'inside',
					    xAxisIndex: 0,
					    filterMode: 'empty'
				    }
			    ],
			    xAxis:{
				    //type: 'category',
				    //show: true,
				    name: '日期',
				    data:data.datas
			    },
			    yAxis:{
				    min: 0,
				    max: 100,
				    name: '入住率%',
				    axisLabel: {
					    formatter: function (val) {
						    return val + '%';
					    }
				    },
				    //show: true,
				    //type: 'value',
			    },
			    series:[{
				    name:'办公室入住率',
				    type:'line',
				    data:data.values
			    }]
		    };
		    //初始化echarts实例
		    var myChart1 = this.$echarts.init(document.getElementById('office'));

		    //使用制定的配置项和数据显示图表
		    myChart1.setOption(option1);
	    },
	    /**
	     * 会议室 报表
	     */
	    createMeetingReport(dt){
	    	let data = this.getDataValue(dt)

        //指定图标的配置和数据
		    var option1 = {
			    title:{
				    text:'会议室入住率'
			    },
			    tooltip:{},
			    legend:{
				    data:['用户来源']
			    },
			    // 滑动事件
			    dataZoom: [
				    {
					    type: 'slider',
					    xAxisIndex: 0,
					    filterMode: 'empty'
				    },
				    {
					    type: 'inside',
					    xAxisIndex: 0,
					    filterMode: 'empty'
				    }
			    ],
			    xAxis:{
				    //type: 'category',
				    //show: true,
				    name: '日期',
				    data:data.datas
			    },
			    yAxis:{
				    min: 0,
				    max: 100,
				    name: '入住率%',
				    axisLabel: {
					    formatter: function (val) {
						    return val + '%';
					    }
				    },
			    },
			    series:[{
				    name:'会议室入住率',
				    type:'line',
				    data:data.values
			    }]
		    };
		    //初始化echarts实例
		    var myChart1 = this.$echarts.init(document.getElementById('meeting'));

		    //使用制定的配置项和数据显示图表
		    myChart1.setOption(option1);
	    },
	    /**
	     * 工位 报表
	     */
	    createStationReport(dt){
		    let data = this.getDataValue(dt)

	    	//指定图标的配置和数据
		    var option1 = {
			    title:{
				    text:'工位入住率'
			    },
			    tooltip:{},
			    legend:{
				    data:['用户来源']
			    },
			    // 滑动事件
			    dataZoom: [
				    {
					    type: 'slider',
					    xAxisIndex: 0,
					    filterMode: 'empty'
				    },
				    {
					    type: 'inside',
					    xAxisIndex: 0,
					    filterMode: 'empty'
				    }
			    ],
			    xAxis:{
				    //type: 'category',
				    //show: true,
				    name: '日期',
				    data:data.datas
			    },
			    yAxis:{
				    min: 0,
				    max: 100,
				    name: '入住率%',
				    axisLabel: {
					    formatter: function (val) {
						    return val + '%';
					    }
				    },
				    //show: true,
				    //type: 'value',
			    },
			    series:[{
				    name:'工位入住率',
				    type:'line',
				    data:data.values
			    }]
		    };
		    //初始化echarts实例
		    var myChart1 = this.$echarts.init(document.getElementById('station'));

		    //使用制定的配置项和数据显示图表
		    myChart1.setOption(option1);
	    },
	    /**
	     * 业务情况 报表
	     */
	    createBusinessReport(dt){
		    let data = this.getDataValue(dt)

		    //指定图标的配置和数据
		    var option1 = {
			    title:{
				    text:'业务处理率'
			    },
			    tooltip:{},
			    legend:{
				    data:['用户来源']
			    },
			    xAxis:{
				    //type: 'category',
				    //show: true,
				    name: '日期',
				    data:data.datas
			    },
			    yAxis:{
				    min: 0,
				    max: 100,
				    name: '处理率%',
				    axisLabel: {
					    formatter: function (val) {
						    return val + '%';
					    }
				    },
				    //show: true,
				    //type: 'value',
			    },
			    series:[{
				    name:'业务处理率',
				    type:'line',
				    data:data.values
			    }]
		    };
		    //初始化echarts实例
		    var myChart1 = this.$echarts.init(document.getElementById('business'));

		    //使用制定的配置项和数据显示图表
		    myChart1.setOption(option1);
	    },
	    /**
	     * 账单情况 报表
	     */
	    createBillsReport(dt){
		    let data = this.getDataValue(dt)

		    //指定图标的配置和数据
		    var option1 = {
			    title:{
				    text:'账单总数'
			    },
			    tooltip:{},
			    legend:{
				    data:['用户来源']
			    },
			    xAxis:{
				    //type: 'category',
				    //show: true,
				    name: '日期',
				    data:data.datas
			    },
			    yAxis:{
				    name: '数量（个）',
			    },
			    series:[{
				    name:'账单总数',
				    type:'line',
				    data:data.values
			    }]
		    };
		    //初始化echarts实例
		    var myChart1 = this.$echarts.init(document.getElementById('bills'));

		    //使用制定的配置项和数据显示图表
		    myChart1.setOption(option1);
	    },
	    /**
	     * 现金收入 报表
	     */
	    createIncomeReport(dt){
		    let data = this.getDataValue(dt)

		    //指定图标的配置和数据
		    var option1 = {
			    title:{
				    text:'现金收入'
			    },
			    tooltip:{},
			    legend:{
				    data:['用户来源']
			    },
			    // 滑动事件
			    dataZoom: [
				    {
					    type: 'slider',
					    xAxisIndex: 0,
					    filterMode: 'empty'
				    },
				    {
					    type: 'inside',
					    xAxisIndex: 0,
					    filterMode: 'empty'
				    }
			    ],
			    xAxis:{
				    //type: 'category',
				    //show: true,
				    name: '日期',
				    data:data.datas
			    },
			    yAxis:{
				    name: '金额（元）',
			    },
			    series:[{
				    name:'现金收入',
				    type:'line',
				    data:data.values
			    }]
		    };
		    //初始化echarts实例
		    var myChart1 = this.$echarts.init(document.getElementById('income'));

		    //使用制定的配置项和数据显示图表
		    myChart1.setOption(option1);
	    },
	    /**
	     * 现金支出 报表
	     */
	    createExpensesReport(dt){
		    let data = this.getDataValue(dt)

		    //指定图标的配置和数据
		    var option1 = {
			    title:{
				    text:'现金支出'
			    },
			    tooltip:{},
			    legend:{
				    data:['用户来源']
			    },
			    // 滑动事件
			    dataZoom: [
				    {
					    type: 'slider',
					    xAxisIndex: 0,
					    filterMode: 'empty'
				    },
				    {
					    type: 'inside',
					    xAxisIndex: 0,
					    filterMode: 'empty'
				    }
			    ],
			    xAxis:{
				    //type: 'category',
				    //show: true,
				    name: '日期',
				    data:data.datas
			    },
			    yAxis:{
				    name: '金额（元）',
			    },
			    series:[{
				    name:'现金支出',
				    type:'line',
				    data:data.values
			    }]
		    };
		    //初始化echarts实例
		    var myChart1 = this.$echarts.init(document.getElementById('expenses'));

		    //使用制定的配置项和数据显示图表
		    myChart1.setOption(option1);
	    }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../sass/base/_mixin.scss';
  @import '../../sass/base/_public.scss';

  #operation-day-report-wrap {
    padding-bottom: 50px;
    width: 100%;
    min-height: 1000px;
    background-color: #fff;
    box-shadow: 0 3px 1px #ccc;
    .ivu-icon-ios-calendar-outline{
      color:#038be2;
      font-family: "iconfont" !important;
      font-size: 18px;
      font-style: normal;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      &:before{
        content: "\e60c";
      }
    }
    .operation-day-report-content{
      height: 80px;
      padding: 22px;
      border-bottom: 1px solid #ccc;
      position: relative;
      .day-report-btn{
        position: absolute;
        right: 30px;
        top: 22px;
      }
    }

    .report-list{
      margin: 0.3rem;

      #apartment,#office,#meeting,#station,#income,#expenses{
        width:49%; height: 400px;float:left;
        padding-bottom: 1rem;
      }
      #business,#bills{
        width:100%; height: 400px;
      }
      .border-dotted{
        clear: left;
        border: 0.045rem dotted #999999;
        margin-bottom: 1rem;
      }
      .border-solid{
        clear: left;
        border: 0.01rem solid #999999;
      }
    }

    .day-report-center-wrap{
      width: 100%;
      height: 100%;
      .day-report-center-title{
        height: 100px;
        width: 100%;
        line-height: 100px;
        text-align: center;
      }
    }
    ul.day-report-table-ul{
      padding: 0 30px 10px 30px;
      li.day-report-table-li{
        margin-top: 30px;
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
        .report-table-item{
          border-collapse:collapse;
          text-align: center;
          margin-top: 10px;
          tr{
            th,td{
              padding: 16px;
            }
            th{
              background-color: rgb(238,243,246);
            }
          }
        }
        ul.day-report-inner-ul{
          width: 100%;
          li.day-report-inner-li{
            box-sizing: border-box;
            border: 1px solid #ccc;
            width: 49.2%;
            display: inline-block;
            padding: 0;
            margin-top: 20px;
            .inner-li-title{
              font-size: 20px;
              font-weight: 700;
              background-color: rgb(238,243,246);
              height: 50px;
              line-height: 50px;
              text-align: center;
              border-bottom: 1px solid #ccc;
            }
            .inner-li-total-income{
              height: 80px;
              line-height: 80px;
              text-align: center;
              border-bottom: dashed 1px #ccc;
            }
            .inner-li-content{
              width: 100%;
              text-align: center;
              .inner-li-content-item{
                padding: 40px 0;
                box-sizing: border-box;
                width: 32%;
                display: inline-block;
              }
            }
            p{
              padding-bottom: 10px;
            }
            span{
              font-size: 22px;
            }
          }
          li:nth-of-type(even){
            margin-left: 1%;
          }
        }
      }
    }
  }

</style>
