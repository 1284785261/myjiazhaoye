/*百度分享*/
$(function () {
    if($('.share').length >0){
    window._bd_share_config = {
        share: [{
            "tag": "share_1",
            "bdSize": 16
        }]
    }
    with (document)0[(getElementsByTagName('head')[0] || body).appendChild(createElement('script')).src = 'http://bdimg.share.baidu.com/static/api/js/share.js?cdnversion=' + ~(-new Date() / 36e5)];
    }
});
/*场馆列表*/
$(function () {
    $('.btn-hover,.sportsList,.index-mask').click(function () {
        $('.sportsList,.index-mask').slideToggle();
    });
});

//输入框获取焦点
$(function () {
    $("input[type='text'],.form-control textarea,input[type='email'],.input-box").mousemove(function () {
        $(this).css('border-color', '#ffb50a');
    }).mouseout(function () {
        $(this).css('border-color', '#dbdbdb');
    });
});

//tab切换
$(function () {
    $('.describe_tab').tab({
        currentClass: 'active',
        tabNav: '.tab-nav a',
        tabConent: '.tab-con>div',
        eventType: 'click'
    });
    $('.order_tab').tab({
        currentClass: 'selected',
        tabNav: '.tab-nav a',
        tabConent: '.tab-con>div',
        eventType: 'click'
    });
    $('.admin_area').tab({
        currentClass: 'selected',
        tabNav: '.tab-nav a',
        tabConent: '.tab-con>form',
        eventType: 'click'
    });
    $('.admin_banner').tab({
        currentClass: 'selected',
        tabNav: '.tab-nav>a',
        tabConent: '.tab-con>div',
        eventType: 'click'
    });
    $('.admin_course').tab({
        currentClass: 'selected',
        tabNav: '.tab-nav>a',
        tabConent: '.tab-con>div',
        eventType: 'click'
    });
    $('.admin_commodity').tab({
        currentClass: 'selected',
        tabNav: '.tab-nav>a',
        tabConent: '.tab-con>div',
        eventType: 'click'
    });
    $('.commonality').tab({
        currentClass: 'selected',
        tabNav: '.tab-nav>a',
        tabConent: '.tab-con>div',
        eventType: 'click'
    });
    $('.right-order-plane').tab({
        currentClass: 'active',
        tabNav: '.tab-nav2>a',
        tabConent: '.tab-con2>div',
        eventType: 'click'
    });
});

$(function () {
    /*轮播效果*/
    jQuery(".index_banner").slide({
        titCell: ".hd li",
        mainCell: ".bd ul",
        //effect: "fade",
        effect: "leftLoop",
        autoPlay: true
    });

});


//评论图片
$(function () {
    $('.comment_con p img').each(function () {
            $(this).click(function () {
                var Src = $(this).attr('src');
                $(this).closest('p').siblings('.img-con').show().find('.bigPic').attr('href', Src).find('img').attr('src', Src);
                $(this).addClass('active').parents("a").siblings('a').children("img").removeClass('active');
                $(this).addClass('active').siblings('img').removeClass('active');
            });
        }
    );
    $('.comment_con .Hide').click(function () {
        $(this).closest('.img-con').hide().siblings('p').find('img').removeClass('active');
    })
})
/*会员中心菜单栏*/
$('.tab_box').find('dl').each(function () {
    $(this).find('dt').click(function () {
        $(this).addClass("active").nextAll('dd').toggle(200);
        $(this).closest("li").siblings().find('dt').removeClass("active").nextAll('dd').hide(300);
    });
});


$(function () {
    $('.verify_address table').find('label:not(.btn-address02)').click(
        function () {
            $(this).closest('table').next('.selectcity').hide();
            $('.verify_address>table').find('.btn-address01').attr('class', 'btn-address02');
        }
    );

    $('.verify_address table').find('label:last').click(
        function () {
            $(this).closest('table').next('.selectcity').show();

            var Input = $(this).find('input');
            if (Input.is(":checked")) {
                $(this).attr('class', 'btn-address01');
            }
        }
    );
});


//评论图片
$(function () {
    $('.reviews_con .tab-nav a').each(function () {
            $(this).click(function () {
                var Src = $(this).find('img').attr('src');
                $(this).closest('.tab-nav').siblings('.tab-con').show().find('.bigPpic').attr('href', Src).find('img').attr('src', Src);
                $(this).attr('class', 'active').siblings('a').removeClass('active')
            });
        }
    );
    $('.reviews_con .Hide').click(function () {
        $(this).closest('.tab-con').hide();
    })
})


//选择类型
$(function () {

    $('.detail_inf .type span').click(function () {
        $(this).toggleClass('checked').siblings("span").removeClass('checked');
        var Index = $('.detail_inf .type .checked').index();
        if ($(this).hasClass('checked')) {
            $('.price strong').eq(Index + 1).show().siblings('strong').hide();
            $('.price>span').eq(Index + 1).show().siblings('span').hide();
            $(this).nextAll('small').eq(Index + 1).css('display','block').siblings('small').css('display','none');
            $('.btns a').eq(Index + 1).css('display', 'inline-block').siblings('a').css('display', 'none');
        } else {
            $('.price strong').eq(0).show().siblings('strong').hide();
            $('.price>span').eq(0).show().siblings('span').hide();
            $(this).nextAll('small').eq(0).css('display','block').siblings('small').css('display','none');
            $('.btns a').eq(0).css('display', 'inline-block').siblings('a').css('display', 'none');
        }
        ;
        if ($('.detail_inf .type span').eq(1).hasClass('checked')) {
            $('.detail_inf .people').show();
        } else {
            $('.detail_inf .people').hide();
        }
    })
    if($('.detail_inf .type span').length==1){
        $('.detail_inf .type span').eq(0).trigger("click");
    }
    if($('.detail_inf .type span:eq(0)').is(":hidden")){
        $('.detail_inf .type span').eq(1).trigger("click");
    }
    if($('.detail_inf .type span:eq(1)').is(":hidden")){
        $('.detail_inf .type span').eq(0).trigger("click");
    }

    //订场地-详情
    $('.detail_inf .area-type span').click(function () {
        $(this).toggleClass('checked').siblings("span").removeClass('checked');
        var Index = $(this).index();
        if ($(this).hasClass('checked')) {
            $('.price strong').eq(Index + 1).show().siblings('strong').hide();
            $(this).nextAll('small').eq(Index + 1).css('display','block').siblings('small').css('display','none');
            if($(this).attr("data-type")=='0'){
                $('.detail_inf .people').hide();
                $('.btns a').eq(1).css('display', 'inline-block').siblings('a').css('display', 'none');
            }else if($(this).attr("data-type")=='1'){
                $('.detail_inf .people').show();
                $('.btns a').eq(2).css('display', 'inline-block').siblings('a').css('display', 'none');
            }
        } else {
            $('.price strong').eq(0).show().siblings('strong').hide();
            $(this).nextAll('small').eq(0).css('display','block').siblings('small').css('display','none');
            $('.btns a').eq(0).css('display', 'inline-block').siblings('a').css('display', 'none');
        }
    })
    if($('.detail_inf .area-type span').length==1){
        $('.detail_inf .area-type span').eq(0).trigger("click");
    }
})



//查看验证码
$(function () {
    $('.user_order').find('.show_code').click(function () {
        $(this).closest('tr').nextAll('.code_statu').eq(0).css('display', 'table-row');
    });
    $('.code_statu').find('a').click(function () {
        $(this).closest('.code_statu').css('display', 'none');
    })
});

//管理中心菜单栏
$(function () {
    $('.mb_menu dl').each(function () {
        $(this).children('dt').click(function () {
            var Span = $(this).find("span");
            $(this).closest("dl").siblings("dl").find("dt").find('span').removeClass("icon-shousuojianhao");
            $(this).addClass("selected").closest("dl").siblings("dl").find("dt").removeClass("selected");
            //console.log($(this).siblings('dd').html());
            if (!$(this).siblings('dd').html() == "") {
                $(this).closest("dl").siblings("dl").find("dt").find('menufont').removeClass("icon-shousuojianhao");
                $(this).find('span').toggleClass('icon-shousuojianhao')
            } else {
                $(this).closest("dl").siblings("dl").find("dt").find('menufont').attr("class", "menufont pull-right");
            }
            $(this).closest("dl").siblings("dl").find("dt").nextAll('dd').slideUp(200);
            $(this).nextAll('dd').slideToggle(200);
        });
    })
});

//场馆管理日期选择
$(function () {
    if ($('#selectDate').length) {
        $('#selectDate').datetimepicker({
            weekStart: 1,
            todayBtn: 1,
            autoclose: 1,
            todayHighlight: 1,
            startView: 2,
            minView: 0,
            maxView: 1,
            forceParse: 0,

        }).on("hide", function () {
            $(this).trigger("blur");
        });
    }
});
//确认开放场地
$(function () {
    $('.btn-verifyCode').hDialog({
        box: '#pop_01',
        width: 300,
        height: 200,
        boxBg: '#eeeeee',
        closeBg: '#eeeeee',
        modalBg: 'rgba(0,0,0,0.6)',
        positions: 'center',
        hideTime: 0,
        closeHide: false,
        resetForm: false,
        isOverlay: true,
        modalHide: true,
        escHide: false,
        autoShow: false
    });

});
//审核管理
$(function () {
    $('.btn-audit').hDialog({
        box: '#pop_audit',
        width: 400,
        height: 300,
        boxBg: '#eeeeee',
        closeBg: '#eeeeee',
        modalBg: 'rgba(0,0,0,0.6)',
        positions: 'center',
        hideTime: 0,
        //closeHide: false,
        resetForm: false,
        isOverlay: true,
        modalHide: true,
        escHide: false,
        autoShow: false
    });

   
});
//员工管理（事件委托）
//$(function () {
//    if ($('.cloneTr').length) {
//        $('.addStaff').on("click", function () {
//            var L = $('.setStaff tr').length;
//            var Tr = $('.cloneTr tr').clone();
//            Tr.find('td:first-child').text(L);
//            $('.addStaff').closest('tr').before(Tr);
//
//        });
//        $('tbody').on('click', '.modify', function () {
//            if ($(this).text() === "修改") {
//                $(this).closest('td').siblings('td').find('span').hide().siblings('input').show();
//                $(this).text("完成");
//            } else if ($(this).text() === "完成") {
//                var _td = $(this).closest('td').siblings('td');
//                _td.find('span').show().siblings('input').hide();
//                var serviceVal = _td.find('.service').siblings('input').val();
//                var postVal = _td.find('.post').siblings('input').val();
//                var nameVal = _td.find('.name').siblings('input').val();
//                var pwdVal = _td.find('.pwd').siblings('input').val();
//                var phoneVal = _td.find('.phone').siblings('input').val();
//                if(pwdVal !== " "){
//                    _td.find('span').text("******");
//                }else{
//                    _td.find('span').text(" ");
//                };
//                _td.find('.service').text(serviceVal);
//                _td.find('.post').text(postVal);
//                _td.find('.name').text(nameVal);
//                _td.find('.pwd').val(pwdVal);
//                _td.find('.phone').text(phoneVal);
//                $(this).text("修改");
//            }
//        });
//        $('tbody').on('click', '.deleteDate', function () {
//            $(this).closest('tr').remove();
//            var Trs = $('.setStaff tr');
//            for (var i = 0; i < Trs.length; i++) {
//                Trs.eq(i).find('td:first').text(i + 1);
//            }
//        });
//    }
//
//});

//更多（找课程%字段设置）
$(function () {
    var onOff = true;
    $('.show_more').click(function () {
        $(this).siblings("a:gt(11)").toggleClass('none');
        if (onOff) {
            $(this).html("收起 <i class='icon icon-icon_up'></i>");
            onOff = false;
        } else {
            $(this).html("更多 <i class='icon icon-icon_down'></i>");
            onOff = true;
        }
    });
});
//场馆地址切换
$(function () {
    if ($('#map_container').length>0) {
        //默认地址
        var business_name = "深圳宝安中心体育馆";
        var map = new AMap.Map('map_container', {
            resizeEnable: true,
            center: [113.880641, 22.560741],
            zoom: 13
        });
        var marker = new AMap.Marker({
            position: map.getCenter(),
            content: "<span data-name='' class='markers-name hide' style=''>" + "<i>" + "</i></span>"
            + "<div class='marker-bg'>" + "<span class='text-truncate'>" + business_name + "</span>"
            + "<span style='width:100%;text-align:center;font-size: 12px;line-height: 28px;'>" + "</span>" + "<i class='menufont icon-yeguoditu'>" + "</i>"
            + "</div>"
        });
        marker.setMap(map);
        //变更场馆地址
        $('.sportsList ul li a').click(function () {
            var lng = $(this).attr("data-lng");
            var lat = $(this).attr("data-lat");
            var business_name = $(this).attr("data-business_name");
            $('.marker-bg').find('.text-truncate').text(business_name);
            var map = new AMap.Map('map_container', {
                resizeEnable: true,
                center: [lng, lat],
                zoom: 13
            });
            var marker = new AMap.Marker({
                position: map.getCenter(),
                content: "<span data-name='' class='markers-name hide' style=''>" + "<i>" + "</i></span>"
                + "<div class='marker-bg'>" + "<span class='text-truncate'>" + business_name + "</span>"
                + "<span style='width:100%;text-align:center;font-size: 12px;line-height: 28px;'>" + "</span>" + "<i class='menufont icon-yeguoditu'>" + "</i>"
                + "</div>"
            });
            marker.setMap(map);

        });
    }
});

//开场管理-场馆设置
$(function(){
    $(".set_area").on("contextmenu",function(e){
        return false;
    });
    var lx,ly,rx,ry;
    var e_button = 0;//全部选中，0开始，1结束
    var e_button02 = 0;//全部取消，0开始，1结束
    var movex, movey;
    $(".mouse-area td").on("mousedown", function (event) {
        var e = e || event;
        if ($(this).find('span').hasClass("cur")) {
            e_button = 0;
            if (e.button == 2 && e_button02 == 1) {
                //couter02=0;
                //console.log(e_button);
                ry = $(this).parent("tr").index();
                rx = $(this).index();
                movex = lx - rx;
                movey = ly - ry;
                if (movex >= 0) {
                    if (movey >= 0) {
                        //左上
                        for (var i = 0; i <= Math.abs(movey); i++) {
                            for (var j = 0; j <= Math.abs(movex); j++) {
                                $(".mouse-area").find("tr").eq(ry + i).children("td").eq(rx + j).removeClass("cur").children('span').removeClass("cur");
                            }
                        }
                    } else {
                        //左下
                        for (var i = 0; i <= Math.abs(movey); i++) {
                            for (var j = 0; j <= Math.abs(movex); j++) {
                                $(".mouse-area").find("tr").eq(ly + i).children("td").eq(rx + j).removeClass("cur").children('span').removeClass("cur");
                            }
                        }
                    }
                } else {
                    if (movey >= 0) {
                        //右上
                        for (var i = 0; i <= Math.abs(movey); i++) {
                            for (var j = 0; j <= Math.abs(movex); j++) {
                                $(".mouse-area").find("tr").eq(ry + i).children("td").eq(lx + j).removeClass("cur").children('span').removeClass("cur");
                            }
                        }
                    } else {
                        //右下
                        for (var i = 0; i <= Math.abs(movey); i++) {
                            for (var j = 0; j <= Math.abs(movex); j++) {
                                $(".mouse-area").find("tr").eq(ly + i).children("td").eq(lx + j).removeClass("cur").children('span').removeClass("cur");
                            }
                        }
                    }
                }
                //console.log("[" + lx + "," + ly + "]+[" + rx + "," + ry + "]");
                lx = null, ly = null, rx = null, ry = null, e_button = 0;

            } else if (e.button == 0||e.button == 1) {
                e_button02 = 1;
                ly = $(this).parent("tr").index();
                lx = $(this).index();
                //console.log("[" + lx + "," + ly + "]+[" + rx + "," + ry + "]");

                $(this).removeClass("cur").find('span').removeClass("cur");
            }
        } else {
            e_button02 = 0;
            //console.log(e_button);
            if (e.button == 2 && e_button == 1) {
                //console.log(e_button);
                ry = $(this).parent("tr").index();
                rx = $(this).index();
                movex = lx - rx;
                movey = ly - ry;
                if (movex >= 0) {
                    if (movey >= 0) {
                        //左上
                        for (var i = 0; i <= Math.abs(movey); i++) {
                            for (var j = 0; j <= Math.abs(movex); j++) {
                                if($(".mouse-area").find("tr").eq(ry + i).children("td").eq(rx + j).hasClass("open_area") || $(".mouse-area").find("tr").eq(ry + i).children("td").eq(rx + j).hasClass("order_area") || $(".mouse-area").find("tr").eq(ry + i).children("td").eq(rx + j).hasClass("lock_area") || $(".mouse-area").find("tr").eq(ry + i).children("td").eq(rx + j).hasClass("reserve_area") || $(".mouse-area").find("tr").eq(ry + i).children("td").eq(rx + j).hasClass("close_area")){
                                    continue;
                                }
                                $(".mouse-area").find("tr").eq(ry + i).children("td").eq(rx + j).addClass("cur").children('span').addClass("cur");
                            }
                        }
                    } else {
                        //左下
                        for (var i = 0; i <= Math.abs(movey); i++) {
                            for (var j = 0; j <= Math.abs(movex); j++) {
                                if($(".mouse-area").find("tr").eq(ry + i).children("td").eq(rx + j).hasClass("open_area") || $(".mouse-area").find("tr").eq(ry + i).children("td").eq(rx + j).hasClass("order_area") || $(".mouse-area").find("tr").eq(ry + i).children("td").eq(rx + j).hasClass("lock_area") || $(".mouse-area").find("tr").eq(ry + i).children("td").eq(rx + j).hasClass("reserve_area") || $(".mouse-area").find("tr").eq(ry + i).children("td").eq(rx + j).hasClass("close_area")){
                                    continue;
                                }
                                $(".mouse-area").children("tr").eq(ly + i).children("td").eq(rx + j).addClass("cur").children('span').addClass("cur");
                            }
                        }
                    }
                } else {
                    if (movey >= 0) {
                        //右上
                        for (var i = 0; i <= Math.abs(movey); i++) {
                            for (var j = 0; j <= Math.abs(movex); j++) {
                                if($(".mouse-area").find("tr").eq(ry + i).children("td").eq(rx + j).hasClass("open_area") || $(".mouse-area").find("tr").eq(ry + i).children("td").eq(rx + j).hasClass("order_area") || $(".mouse-area").find("tr").eq(ry + i).children("td").eq(rx + j).hasClass("lock_area") || $(".mouse-area").find("tr").eq(ry + i).children("td").eq(rx + j).hasClass("reserve_area") || $(".mouse-area").find("tr").eq(ry + i).children("td").eq(rx + j).hasClass("close_area")){
                                    continue;
                                }
                                $(".mouse-area").find("tr").eq(ry + i).children("td").eq(lx + j).addClass("cur").children('span').addClass("cur");
                            }
                        }
                    } else {
                        //右下
                        for (var i = 0; i <= Math.abs(movey); i++) {
                            for (var j = 0; j <= Math.abs(movex); j++) {
                                if($(".mouse-area").find("tr").eq(ry + i).children("td").eq(rx + j).hasClass("open_area") || $(".mouse-area").find("tr").eq(ry + i).children("td").eq(rx + j).hasClass("order_area") || $(".mouse-area").find("tr").eq(ry + i).children("td").eq(rx + j).hasClass("lock_area") || $(".mouse-area").find("tr").eq(ry + i).children("td").eq(rx + j).hasClass("reserve_area") || $(".mouse-area").find("tr").eq(ry + i).children("td").eq(rx + j).hasClass("close_area")){
                                    continue;
                                }
                                $(".mouse-area").find("tr").eq(ly + i).children("td").eq(lx + j).addClass("cur").children('span').addClass("cur");
                            }
                        }
                    }
                }
                lx = null, ly = null, rx = null, ry = null, e_button = 0;

            } else if (e.button == 0|| e.button == 1) {
                e_button = 1;
                ly = $(this).parent("tr").index();
                lx = $(this).index();
                //console.log("[" + lx + "," + ly + "]+[" + rx + "," + ry + "]");
                $(this).addClass("cur").children('span').addClass("cur");
            }
        }

    });
});
//开场管理-时段操作切换
$(function(){
    $("td.single").on('click',function(){
        var that=$(this);
        var curFun=function(obj){
            if(obj.hasClass('close_area cur')){
                $('.right-order-plane').find('.btn-plane div').eq(1).css('display','block').siblings('div').css('display','none');
            }else if(obj.hasClass('single close_area')){
                $('.right-order-plane').find('.btn-plane div').eq(0).css('display','block').siblings('div').css('display','none');
            }
            if(obj.hasClass('reserve_area cur')){
                $('.right-order-plane').find('.btn-plane div').eq(2).css('display','block').siblings('div').css('display','none');
            }else if(obj.hasClass('single reserve_area')){
                $('.right-order-plane').find('.btn-plane div').eq(0).css('display','block').siblings('div').css('display','none');
            }
            if(obj.hasClass('lock_area cur')){
                $('.right-order-plane').find('.btn-plane div').eq(3).css('display','block').siblings('div').css('display','none');
            }else if(obj.hasClass('single lock_area')){
                $('.right-order-plane').find('.btn-plane div').eq(0).css('display','block').siblings('div').css('display','none');
            }
            if(obj.hasClass('order_area cur')){
                $('.right-order-plane').find('.btn-plane div').eq(4).css('display','block').siblings('div').css('display','none');
            }else if(obj.hasClass('single order_area')){
                $('.right-order-plane').find('.btn-plane div').eq(0).css('display','block').siblings('div').css('display','none');
            }
            if(obj.hasClass('open_area cur')){
                $('.right-order-plane').find('.btn-plane div').eq(5).css('display','block').siblings('div').css('display','none');
            }else if(obj.hasClass('single open_area')){
                $('.right-order-plane').find('.btn-plane div').eq(0).css('display','block').siblings('div').css('display','none');
            }
        }
        curFun(that);
        var arr=[];
        for(var i=0;i<$("td.single[class$='cur']").length;i++){
            arr.push($("td.single[class$='cur']").eq(i).attr("class"))
        }
        $.each($("td.single[class$='cur']"),function(index,value){
            for(var j=0;j<$("td.single[class$='cur']").length;j++){
                if($(this).attr("class")!=arr[j]){
                    $('.right-order-plane').find('.btn-plane div').eq(0).css('display','none').siblings('div').css('display','none');
                    return false;
                }else{
                    curFun($(this));
                }
            }
        })
    })
});
//开场管理-日期选择
var changeDate;
$(function() {
    /**日期**/
    var classNode = $(".date-list-wrap");
    var num = (classNode.find("div.date-list li").length) / 7 - 1;//点击次数
    var moveW = (classNode.find("div.date-list li").eq(0).width()) * 7;//移动距离
    var speed = 500;
    var poc = 0;
    classNode.find("div.date-list li:last").width(classNode.find("div.date-list li").eq(0).width() + 1);
    //classNode.find("div.date-list a").on("click", function () {
    //    if ($(this).hasClass("disable")) {
    //        return;
    //    }
    //    var Index = $(this).closest('li').index();
    //
    //    //if(Index>15){
    //    //    return false;
    //    //}else{
    //    //    poc = Index -2;
    //    //}
    //    //if(Index<=6){
    //    //    poc=0;
    //    //}else if(6<Index && Index<=13){
    //    //    poc=1;
    //    //}else{
    //    //    poc=2;
    //    //}
    //    //if (poc == num) {
    //    //    classNode.children("a.next").addClass("disable");
    //    //}else{
    //    //    classNode.children("a.next").removeClass("disable");
    //    //}
    //    //if (poc == 0) {
    //    //    classNode.children("a.pre").addClass("disable");
    //    //}else{
    //    //    classNode.children("a.pre").removeClass("disable");
    //    //}
    //    classNode.find("ul").stop(true, false).animate({"left": "-" + moveW/7 * poc + "px"}, speed);
    //    $(this).addClass("selected").parent("li").siblings("li").children("a").removeClass("selected");
    //});
    classNode.children("a.next").on("click", function () {
        if (poc < num) {
            poc++;
            classNode.find("ul").stop(true, false).animate({"left": "-" + moveW * poc + "px"}, speed);
            classNode.children("a.pre").removeClass("disable");
            if (poc == num) {
                $(this).addClass("disable");
                return;
            }
        }
    })
    classNode.children("a.pre").on("click", function () {
        if (poc > 0) {
            poc--;
            classNode.find("ul").stop(true, false).animate({"left": "-" + moveW * poc + "px"}, speed);
            classNode.children("a.next").removeClass("disable");
            if (poc == 0) {
                $(this).addClass("disable");
                return;
            }
        }
    });

    changeDate=function(dateNum){
        var liIndex;
        $.each(classNode.find("div.date-list a"),function(index,value){
            if($(this).attr("data-date")==dateNum){
                liIndex=index;
                return true;
            }
        });
        if(liIndex<=6){
            poc=0;
        }else if(6<liIndex && liIndex<=13){
            poc=1;
        }else{
            poc=2;
        }
        if (poc == num) {
            classNode.children("a.next").addClass("disable");
        }else{
            classNode.children("a.next").removeClass("disable");
        }
        if (poc > 0) {
            classNode.children("a.pre").removeClass("disable");
        }else{
            classNode.children("a.pre").addClass("disable");
        }
        classNode.find("ul").stop(true, false).animate({"left": "-" + moveW * poc + "px"}, speed).find("li").eq(liIndex).children("a").addClass("selected").closest("li").siblings("li").children("a").removeClass("selected");
    }


    /* $("a.select-date").on("click", function () {
     var todate = $(this).attr("data-todate");
     var _index = 0;
     var row = 0;

     $.each(classNode.find("div.date-list li a"), function (index, value) {
     if (todate == $(this).attr("data-date")) {
     _index = index;
     return false;
     }
     });
     poc = Math.floor(_index / 7);
     classNode.find("div.date-list li").eq(_index).children("a").trigger("click");
     classNode.find("ul").stop(true, false).animate({"left": "-" + moveW * poc + "px"}, speed);
     classNode.children("a.pre").removeClass("disable");
     if (poc == num) {
     classNode.children("a.next").addClass("disable");
     }
     if (poc == 0) {
     classNode.children("a.pre").addClass("disable");
     }

     /!*  //下拉框
     if($(this).hasClass("selected")){
     $(this).removeClass("selected");
     $(".select-date-box").css("display","none");
     $(".index-mask").css("display","none");
     }else{
     $(this).addClass("selected");
     $(".select-date-box").css("display","block");
     $(".index-mask").css("display","block");
     }
     })
     $(".index-mask").on("click",function(){
     $("a.select-date").removeClass("selected");
     $(".select-date-box").css("display","none");
     $(this).css("display","none");
     })*!/
     /!**日期**!/
     })*/
})

//开场管理-场馆切换
$(function(){
    var $this = $(this);
    var i = 0;
    var l = $('.rows').eq(0).find("td").length;
    var w = $('.rows').eq(0).find("td").outerWidth(true);
    var hide_l = l -9;
    $('.set_area .prev').click(function () {
        i++;
        if (i>=hide_l) {
            i =1;
        }
        var ml = i * w;
        if (11 <= l - i) {
            $('.main-table').stop().animate({left: -ml+ "px"}, 300)
        }else {
            $('.main-table').stop().animate({left: 0 + "px"}, 300)
        }
    });
    $('.set_area .next').click(function () {
        i--;
        if(i<=0){
            i=0;
        }
        var ml = i * w;
        if (11 <= l - i) {
            $('.main-table').stop().animate({left: -ml+ "px"}, 300)
        }else {
            $('.main-table').stop().animate({left: 0 + "px"}, 300)
        }
    })
});
//开场管理-时段操作对话框
$(function(){
    //订单状态-验证对话框
    $(".orderVerify").on("click",function(){
        $.layer({
            type:1,
            title:false,
            area: ['600px', 'auto'],
            border:[0],
            shadeClose:true,
            page: {
                dom: '#pop_2'
            }
        })
    });
    //关闭状态-开放时段对话框
    $(".areaOpen").on("click",function(){
        $.layer({
            type:1,
            title:false,
            area: ['400px', 'auto'],
            border:[0],
            shadeClose:true,
            page: {
                dom: '#pop_3'
            }
        })
    });
    //正常状态-修改价格对话框
    $(".revisePrice").on("click",function(){
        $.layer({
            type:1,
            title:false,
            area: ['400px', 'auto'],
            border:[0],
            shadeClose:true,
            page: {
                dom: '#pop_4'
            }
        })
    });
    //订单状态-取消订单对话框
    $(".reserveDel").on("click",function(){
        $.layer({
            type:1,
            title:false,
            area: ['300px', 'auto'],
            border:[0],
            shadeClose:true,
            page: {
                dom: '#pop_5'
            }
        })
    });
    //订单状态-取消订单对话框
    $(".orderDel").on("click",function(){
        $.layer({
            type:1,
            title:false,
            area: ['600px', 'auto'],
            border:[0],
            shadeClose:true,
            page: {
                dom: '#pop_2'
            }
        })
    });
    //开场状态-查看详情直接开场对话框
    $(".openInfo").on("click",function(){
        $.layer({
            type:1,
            title:false,
            area: ['600px', 'auto'],
            border:[0],
            shadeClose:true,
            page: {
                dom: '#pop_8'
            }
        })
    });
    //预定状态-开场
    $(".reservlOpen").on("click",function(){
        $.layer({
            type:1,
            title:false,
            area: ['600px', 'auto'],
            border:[0],
            shadeClose:true,
            page: {
                dom: '#pop_11'
            }
        })
    });
    //正常状态-预定信息
    $(".normalInfo").on("click",function(){
        $.layer({
            type:1,
            title:false,
            area: ['600px', 'auto'],
            border:[0],
            shadeClose:true,
            page: {
                dom: '#pop_10'
            }
        })
    });
    //正常状态-开场
    $(".normalOpen").on("click",function(){
        $.layer({
            type:1,
            title:false,
            area: ['600px', 'auto'],
            border:[0],
            shadeClose:true,
            page: {
                dom: '#pop_11'
            }
        })
    });
    //正常状态-关闭时段
    $(".normalClose").on("click",function(){
        $.layer({
            type:1,
            title:false,
            area: ['400px', 'auto'],
            border:[0],
            shadeClose:true,
            page: {
                dom: '#pop_12'
            }
        })
    });
 
});
//开场管理-删除场馆
$(function(){
    $('.lastTr td').each(function(){
        $(this).click(function(){
            var Index = $(this).index();
            var Trs = $('.mouse-area').find('tr');
            var Ths = $('.main-table').find('thead tr');
            Ths.each(function(){
                $(this).find('.heads').eq(Index).remove();
            });
            Trs.each(function(){
                $(this).find('td').eq(Index).remove();
            });
        })
    });
});
$(function(){
    //课程属性
    $('body').on('click','.addTr',(function(){
        var _td = $(this).closest('tr').find('td');
        var TrFirst = $('.trList').find('tr:first');
        var TrLast = $('.trList').find('tr:last');
        var l = $('.trList tr').length + 1;
        for(var i= 1; i < _td.length;i++){
            var _val = _td.eq(i).find('input').val();
            if(_td.eq(i).find('input').attr("name")=="remark"){
                continue;
            }
            if(_val == ""){
                return false;
            }
        };
        TrFirst.find('.hide').siblings('a').removeClass('addTr');
        if(l !== 6){
            var Tr2='<tr>';
            Tr2+='<td>'+l+'</td>';
            Tr2+='<td><input class="w190" type="text" id="class-name" name="type" value="" placeholder="课别，如：少年班、年卡"/>';
            Tr2+='<div class="message-tips"></div>';
            Tr2+='</td>';
            Tr2+='<td><input class="w120" type="text" value="" name="oldPrice" placeholder="原价"/> 元';
            Tr2+='<div class="message-tips"></div>';
            Tr2+='</td>';
            Tr2+='<td><input class="w120" type="text" value="" name="price" placeholder="优惠价"/> 元';
            Tr2+='<div class="message-tips"></div>';
            Tr2+='</td>';
            Tr2+='<td><input class="w280" type="text" name="remark" value="" placeholder=""/>';
            Tr2+='<a href="javascript:;" class="addTr">+</a><a href="javascript:;" class="deleteTr">-</a>';
            Tr2+='<div class="message-tips"></div>';
            Tr2+='</td>';
            Tr2+='</tr>';
            TrLast.after(Tr2);

            $('[placeholder]:visible').placeholder();
        }else{
            return false;
        }
    })).on('click', '.deleteTr', function () {
        $(this).closest('tr').remove();
        var Trs = $('.trList tr');
        for (var i = 0; i < Trs.length; i++) {
            Trs.eq(i).find('td:first').text(i + 1);
        }
        if(Trs.length < 3){
            Trs.first().find('.hide').siblings('a').addClass('addTr');
        }
        $('[placeholder]:visible').placeholder();
    });
//师资介绍
    $('.teachers').on('keyup blur','input',(function(){
        if(/^\s*$/.test($(this).val())){
            $('.addLi').siblings("div.message-tips").html("<p class='warning mar-t10'><span class='icon'></span>输入框内容不能为空</p>");
            return false;
        }else{
            $('.addLi').siblings("div.message-tips").html("");
        }
        $('[placeholder]:visible').placeholder();
    }));
    $('.teachers').on('keyup keydown blur','textarea[name="introduction"]',(function(){
        var strLength=150;
        switch(checkTitleLength($(this),strLength)){
            case 0:
                $('.addLi').siblings("div.message-tips").html("<p class='warning mar-t10'><span class='icon'></span>输入框内容不能为空</p>");
                break;
            case 1:
                var num=strLength-$(this).val().length;
                if(num>0){
                    $('.addLi').siblings("div.message-tips").html("<p class='confirm mar-t10'><span class='icon'></span>还可以"+num+"个字符</p>");
                }else{
                    $('.addLi').siblings("div.message-tips").html("");
                }
                break;
            case 2:
                var strVal=$(this).val();
                $(this).val(strVal.substr(0,strLength));
                $('.addLi').siblings("div.message-tips").html("");
                break;
        }
        $('[placeholder]:visible').placeholder();
    }));
    $('.teachers').on('click','.addLi',function(e){
        var Li = $(this).closest('ul').find('li');
        for(var i = 0; i<Li.length;i++){
            var Tag =Li.eq(i).find('.form-control');
            for(var j = 0; j<Tag.length; j++){
                var Val = Tag.eq(j).find('input,textarea').val();
                //var Val2 = Tag.eq(j).find('textarea').val();
                var re = /ˆ\s*$/;
                if(Val==""){
                    $('.addLi').siblings("div.message-tips").html("<p class='warning mar-l10'><span class='icon'></span>输入框内容不能为空</p>");
                    return false;
                }else{
                    $('.addLi').siblings("div.message-tips").html("");
                }
            }
        }
        if(Li.length !==5){
            var index = Li.length + 1;
            var Li2 = "<li>" +
                "<div class='teachers_img img-file'>" +
                "<div class='img-box img-box04' id='PhotoDiv" +
                index + "'>" +
                "<img src='/resource/images/user.png' alt=''  id='ImgBox" + index + "'/>" +
                "<input type='file' class='file' id='teacher_img" + index + "'name='teacherIMG'/>" +
                "<input type='hidden'  name ='hideIMG'/>" +
                "<input type='hidden'  name ='hideName' value='0'/>"+
                "</div>" + "</div>" + "<div class='form-control'>" +
                "<input type='text'  name ='call' placeholder='教师名称'/>" +
                "</div>" + "<div class='form-control'>" +
                "<input type='text' name = 'position' placeholder='教师职称' />" +
                "</div>" + "<div class='form-control'>" +
                "<textarea name='intro' placeholder='教师简介：请填写0~150个字符' id='' cols='30' rows='10'>" + "</textarea>" +
                "</div>" + "<div class='form-control'>" + "<input type='button' value='删除' class='btn-default03 deleteThis' />" +
                "</div>" + "</li>"+
                "<script type='text/javascript'>" +
                "new uploadPreview({ UpBtn: 'teacher_img" + index + "', DivShow: 'PhotoDiv" + index + "', ImgShow:'ImgBox" + index + "'});<\/script>";
            $(this).closest("li").before(Li2);

        }else{
            return false;
        }
        $('[placeholder]:visible').placeholder();
    }).on('click','.deleteThis',function(){
        $(this).closest("li").remove();
        $('[placeholder]:visible').placeholder();
    });
});
//取消验证码
$(function(){
    $( "body" ).on( "click","input[type=checkbox]",function(){
        var Check = $(this);
        var sum =$('.form-control').find('p').find('strong');
        if(Check.is(":checked")){
            var n = parseInt(sum.text()) + 1;
            sum.text(n);
        }else{
            var s = parseInt(sum.text()) - 1;
            sum.text(s);
        }
    })
})

//批量审核管理
$(function () {
    $('.btn-ver').hDialog({
        box: '#pop_audit_2',
        width: 400,
        height: 300,
        boxBg: '#eeeeee',
        closeBg: '#eeeeee',
        modalBg: 'rgba(0,0,0,0.6)',
        positions: 'center',
        hideTime: 0,
        //closeHide: false,
        resetForm: false,
        isOverlay: true,
        modalHide: true,
        escHide: false,
        autoShow: false
    });
});
