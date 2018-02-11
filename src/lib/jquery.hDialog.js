/**
 +-------------------------------------------------------------------
 * jQuery hDialog - 多功能弹出层插件
 +-------------------------------------------------------------------
 * @version 2.0.1
 * @update 2015.07.30
 * @author haibao <hhb219@163.com> <http://www.hehaibao.com/>
 +-------------------------------------------------------------------
 * @Api http://www.jq22.com/yanshi4475
 */
(function (d, p, q, u) {
    var r = d(q), n = d(p), k = d("body");
    methods = {
        init: function (a) {
            return this.each(function () {
                var b = d(this), c = b.data("hDialog");
                "undefined" == typeof c && (c = d.extend({}, {
                    title: "",
                    box: "#HBox",
                    boxBg: "#ffffff",
                    modalBg: "rgba(0,0,0,0.5)",
                    closeBg: "#cccccc",
                    width: 300,
                    height: 270,
                    positions: "center",
                    effect: "zoomOut",
                    hideTime: 0,
                    resetForm: !0,
                    modalHide: !0,
                    isOverlay: !0,
                    closeHide: !0,
                    escHide: !0,
                    autoShow: !1,
                    types: 1,
                    iframeSrc: "",
                    iframeId: "iframeHBox",
                    beforeShow: function () {
                    },
                    afterHide: function () {
                    }
                }, a), b.data("hDialog",
                    c));
                c = d.extend({}, c, a);
                if (0 != c.autoShow)methods.open(c, b); else b.on("click", function () {
                    methods.open(c, b)
                })
            })
        }, open: function (a, b) {
            var c, f, e, g, h, m = closeBtnTpl = overlayTpl = iframeTpl = "", l = d(a.box), p = b.attr("class"), q = a.modalBg, t = a.closeBg;
            c = void 0 != a.width ? parseInt(a.width) : 300;
            f = void 0 != a.height ? parseInt(a.height) : 270;
            h = "" + parseInt(-(f / 2)) + "px 0 0 " + parseInt(-(c / 2)) + "px";
            a.resetForm && (l.find("input[type=text],input[type=tel],input[type=email],input[type=date],input[type=password],textarea").val(""), l.find("select option").removeAttr("selected"),
                l.find("input[type=radio],input[type=checkbox]").removeAttr("checked"));
            methods.fire.call(this, a.beforeShow);
            switch (a.positions) {
                case "top":
                    e = 0;
                    g = "50%";
                    h = "0 0 0 " + parseInt(-(c / 2)) + "px";
                    break;
                case "left":
                    e = g = h = 0;
                case "bottom":
                    e = parseInt(n.height() - f) + "px";
                    g = parseInt(n.width() - c) + "px";
                    h = 0;
                    break;
                default:
                    e = g = "50%"
            }
            0 != a.closeHide && (closeBtnTpl = '<a id="HCloseBtn" title="\u5173\u95ed" style="width:25px;height:25px;line-height:20px;display:inline-block;cursor:pointer;background-color:transparent;color:#999;font-size:1.4em;text-align:center;position:absolute;top:15px;right:8px;"><span style="width:22px;height:22px;display:inline-block;">\u00d7</span></a>');
            "" != a.title && (m = '<div id="HTitle" style="padding:10px 45px 10px 12px;border-bottom:1px solid #ddd;background-color:#f2f2f2;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">' + a.title + "</div>");
            0 != a.isOverlay && (overlayTpl = "<div id='HOverlay' style='width:" + r.width() + "px;height:" + r.height() + "px;background-color:" + q + ";position:fixed;top:0;left:0;z-index:9999;'></div>");
            2 == a.types && (iframeTpl = '<iframe width="' + a.width + '" height="' + a.height + '" frameborder="0" scrolling="auto" src="' + a.iframeSrc +
                '"></iframe>', k.append('<div id="' + a.iframeId + '"></div>'), l = d("#" + a.iframeId));
            0 != a.autoShow && (l = b);
            k.stop().append(overlayTpl).find(l).css({
                "background-color": "#ffffff",
                position: "fixed",
                top: e,
                left: g,
                "z-index": 999999,
                margin: h,
                width: a.width,
                height: a.height
            }).removeAttr("class").addClass("animated " + p).prepend(m + closeBtnTpl + iframeTpl).show();
            c = d("#HCloseBtn");
            a.modalHide && (c = d("#HOverlay,#HCloseBtn"));
            c.on("click", function () {
                methods.close(a, b)
            });
            0 != a.hideTime && setTimeout(function () {
                methods.close(a,
                    b)
            }, parseInt(a.hideTime));
            a.escHide && r.keyup(function () {
                27 === event.keyCode && methods.close(a, b)
            })
        }, close: function (a, b) {
            var c = 0 != a.autoShow ? b : d(a.box);
            methods.remove("#HOverlay,#HCloseBtn,#HTitle,#" + a.iframeId);
            c.removeAttr("class").addClass("animated " + a.effect);
            c.hasClass(a.effect) && setTimeout(function () {
                c.removeAttr("style").hide()
            }, 300);
            this.fire.call(this, a.afterHide)
        }, remove: function (a) {
            d(a).remove()
        }, fire: function (a, b) {
            if (d.isFunction(a))return a.call(this, b)
        }, destroy: function () {
            return d(this).each(function () {
                d(this).removeData("hDialog")
            })
        }
    };
    d.fn.hDialog = function (a) {
        return methods[a] ? methods[a].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" !== typeof a && a ? (d.error("Error! Method" + a + "does not exist on jQuery.hDialog\uff01"), this) : methods.init.apply(this, arguments)
    };
    d.extend({
        showLoading: function (a, b, c) {
            a = void 0 != a ? a : "\u6b63\u5728\u52a0\u8f7d...";
            b = void 0 != b ? parseInt(b) : 140;
            c = void 0 != c ? parseInt(c) : 48;
            var f = "" + parseInt(-(c / 2)) + "px 0 0 " + parseInt(-(b / 2)) + "px";
            methods.remove("#HLoading");
            k.stop().append('<div id="HLoading" style="width:' +
                b + "px;height:" + c + "px;line-height:" + c + "px;border-radius:4px;background:rgba(0,0,0,0.6);color:#fff;text-align:center;position:fixed;top:50%;left:50%;margin:" + f + ';">' + a + '<a style="position:absolute;top:-5px;right:-5px;width:15px;height:15px;line-height:15px;display:inline-block;border-radius:50%;text-align:center;background-color:rgba(0,0,0,0.5);color:#fff;font-size:10px;" href="javascript:;" id="closeBtn">X</a></div>');
            d("#closeBtn").on("click", function () {
                d.hideLoading()
            })
        }, hideLoading: function () {
            methods.remove("#HLoading")
        },
        tooltip: function (a, b, c, d) {
            a = void 0 != a ? a : "Error...";
            b = void 0 != b ? parseInt(b) : 2500;
            var e = '<div class="HTooltip shake animated" style="width:280px;padding:10px;text-align:center;background-color:#D84C31;color:#fff;position:fixed;top:10px;left:50%;z-index:100001;margin-left:-150px;box-shadow:1px 1px 5px #333;-webkit-box-shadow:1px 1px 5px #333;">' + a + "</div>";
            1 == c && void 0 != c && (e = '<div class="HTooltip bounceInDown animated" style="width:280px;padding:10px;text-align:center;background-color:#5cb85c;color:#fff;position:fixed;top:10px;left:50%;z-index:100001;margin-left:-150px;box-shadow:1px 1px 5px #333;-webkit-box-shadow:1px 1px 5px #333;">' +
                a + "</div>");
            methods.remove(".HTooltip");
            k.stop().append(e);
            clearTimeout(g);
            var g = setTimeout(function () {
                methods.remove(".HTooltip");
                void 0 != d && methods.fire.call(this, d)
            }, b)
        }, goTop: function (a, b) {
            a = void 0 != a ? a : "30px";
            b = void 0 != b ? b : "20px";
            methods.remove("#HGoTop");
            k.stop().append('<a id="HGoTop" href="javascript:;" style="width:40px;height:40px;line-height:40px;border-radius:50%;display:inline-block;text-align:center;background:#333;color:#fff;position:fixed;bottom:' + a + ";right:" + b + ';z-index:100000;">Top</a>').find("#HGoTop").hide();
            $T = d("#HGoTop");
            n.on("scroll", function () {
                150 < n.scrollTop() ? $T.removeAttr("class").addClass("animated rollIn").show() : $T.removeAttr("class").addClass("animated rollOut")
            });
            $T.on("click", function () {
                d("body,html").animate({scrollTop: 0}, 500);
                return !1
            })
        }, dialog: function (a, b, c, f, e) {
            var g, h = "", m = "";
            a = void 0 != a ? a : "alert";
            f = void 0 != f ? parseInt(f) : 0;
            "confirm" === a && (m = '<div id="hDialog-footer" style="padding:10px;border-top:1px solid #ddd;text-align:right;"><a href="javascript:;" style="padding:5px 10px;display:inline-block;border-radius:3px;background-color:#337ab7;color:#fff;" id="h_ok">\u786e\u5b9a</a><a href="javascript:;" style="padding:5px 10px;display:inline-block;border-radius:3px;margin-left:10px;background-color:#eee;color:#333;" id="h_cancel">\u53d6\u6d88</a></div>');
            h = h + '<div id="hDialog-mask" style="width:100%;height:100%;background-color:rgba(0,0,0,0.6);position:fixed;top:0;left:0;z-index:99999;"></div>' + ('<div id="hDialog-wrap" class="animated fadeIn" style="width:260px;border-radius:5px;box-shadow:4px 4px 10px #666;-webkit-box-shadow:4px 4px 10px #666;background-color:#ffffff;border:1px solid #eee;position:fixed;top:35%;left:50%;margin:0 0 0 -130px;z-index:100000;">' + ('<div id="hDialog-header" style="border-bottom:1px solid #ddd;padding:10px;font-size:1.2em;color:#333;">' +
                b + "</div>") + ('<div id="hDialog-content" style="padding:25px 15px;text-align:center;">' + c + "</div>") + m + "</div>");
            methods.remove("#hDialog-wrap,#hDialog-mask");
            k.stop().append(h);
            0 !== f && (clearTimeout(g), g = setTimeout(function () {
                d.closeDialog(e)
            }, f));
            d("a:contains(\u786e\u5b9a)").on("click", function () {
                void 0 != e && methods.fire.call(this, e)
            });
            d("a:contains(\u53d6\u6d88)").on("click", function () {
                d.closeDialog()
            })
        }, closeDialog: function (a) {
            methods.remove("#hDialog-wrap,#hDialog-mask");
            void 0 != a && methods.fire.call(this,
                a)
        }
    })
})(jQuery, window, document);
