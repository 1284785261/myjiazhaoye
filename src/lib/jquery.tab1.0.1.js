+(function(){
    'use strict';
    $.fn.tab =function(ops){
        var defaults = {
            currentClass:'current',
            tabNav:'.tabNav>li',
            tabConent:'.tabContent>div',
            eventType:'click'
        };
        var ops = $.extend({},defaults,ops);
        this.each(function(){
            var _this = $(this);
            // 初始化显示
            var showIndex = _this.find('.'+ops.currentClass).index();
            _this.find(ops.tabConent).eq(showIndex).show(0);
            _this.find(ops.tabNav).on(ops.eventType,function(){
                $(this).addClass(ops.currentClass)
                    .siblings().removeClass(ops.currentClass);
                $(this).children('.more').show(0);
                $(this).siblings().children('.more').hide(0);
                var index = $(this).index();
                _this.find(ops.tabConent).eq(index).fadeIn(100).siblings().hide(0);
                $('[placeholder]').placeholder();
            });
        });
        return this;
    }
})(jQuery);
