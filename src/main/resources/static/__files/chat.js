$.cookie = function (key, value, options) {
    if (arguments.length > 0x1 && String(value) !== "[object Object]") {
        if (value === null || value === undefined) {
            options.expires = -0x1
        }
        ;
        if (typeof options.expires === "number") {
            var days = options.expires, t = options.expires = new Date();
            t.setDate(t.getDate() + days)
        }
        ;value = String(value);
        return (document.cookie = [encodeURIComponent(key), "=", options.raw ? value : encodeURIComponent(value), options.expires ? "; expires=" + options.expires.toUTCString() : "", options.path ? "; path=" + options.path : "", options.domain ? "; domain=" + options.domain : "", options.secure ? "; secure" : ""].join(""))
    }
    ;options = value || {};
    var result, decode = options.raw ? function (s) {
        return s
    } : decodeURIComponent;
    return (result = new RegExp("(?:^|; )" + encodeURIComponent(key) + "=([^;]*)").exec(document.cookie)) ? decode(result[0x1]) : null
};
$.cookie("sk", $.cookie("sk"), {"expires": 365 * 50});
Date.prototype.pattern = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours() % 12 == 0 ? 12 : this.getHours() % 12, //小时
        "H+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    var week = {
        "0": "/u65e5",
        "1": "/u4e00",
        "2": "/u4e8c",
        "3": "/u4e09",
        "4": "/u56db",
        "5": "/u4e94",
        "6": "/u516d"
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    if (/(E+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};
var msgconf = {
    isAutoBottom: true,
    newMsgCount: 0,
    nickName: '时时机器人',
    IDFilter: {},
    beforeMsgTime: 0,
    afterMsgTime: 0,
    nowDate: 0,
    fontSizeType: 0,
    isMenuLayoutUp: false,
    isOverAutoMsgOldFunc: false,
    isAutoMsg: true
};

$(document).ready(function () {
    var refFontSize = function () {
        var val = $.cookie("f");
        switch (val) {
            case "1":
                $("body").removeClass("font_big");
                $("body").removeClass("font_small");
                if (!$("body").hasClass("font_medium")) {
                    $("body").addClass("font_medium");
                }
                msgconf.fontSizeType = 1;
                break;
            case "2":
                $("body").removeClass("font_medium");
                $("body").removeClass("font_small");
                if (!$("body").hasClass("font_big")) {
                    $("body").addClass("font_big");
                }
                msgconf.fontSizeType = 2;
                break;
            default:
                $("body").removeClass("font_big");
                $("body").removeClass("font_medium");
                if (!$("body").hasClass("font_small")) {
                    $("body").addClass("font_small");
                }
                msgconf.fontSizeType = 0;
                break;
        }
    };
    var isIosUserAgent = /\(i[^;]+;( U;)? CPU.+Mac\s+OS\s+X/i.test(navigator.userAgent);
    var isWxUserAgent = /MicroMessenger/i.test(navigator.userAgent);
    //$("#debugout").show().text("ios:"+isIosUserAgent+","+isWxUserAgent+","+navigator.userAgent);
    var txtmsg = $("#txtMsg");
    var msgcontent = $(".msgcontent");
    var autoMsgSize = function () {
        refFontSize();

        var val = $.cookie("l");
        switch (val) {
            case "1": {
                if (!$(".divBottom").hasClass("msgup")) {
                    $(".divBottom").removeClass("msgdown");
                    $(".divBottom").addClass("msgup");
                }
                msgconf.isMenuLayoutUp = true;
                $(".divBottom").css("top", $(window).scrollTop());

                wid = 220;
                if (!$(".send").hasClass("hasFast")) {
                    wid = 160;
                }
                txtmsg.css({
                    "visibility": "visible",
                    "width": (txtmsg.parent().width() - wid)
                });
                msgcontent.css({
                    "top": $(window).scrollTop() + $(".divBottom").height(),
                    "height": document.documentElement.clientHeight - $(".divBottom").height() - $(window).scrollTop()
                });
                $(".aotuheight").css("height", document.documentElement.clientHeight + 0);
            }
                break;
            default: {
                if (!$(".divBottom").hasClass("msgdown")) {
                    $(".divBottom").removeClass("msgup");
                    $(".divBottom").addClass("msgdown");
                }
                msgconf.isMenuLayoutUp = false;
                wid = 220;
                if (!$(".send").hasClass("hasFast")) {
                    wid = 160;
                }
                txtmsg.css({
                    "top": $(window).scrollTop(),
                    "visibility": "visible",
                    "width": (txtmsg.parent().width() - wid)
                });
                msgcontent.css({
                    "top": $(window).scrollTop(),
                    "height": document.documentElement.clientHeight - $(".divBottom").height() - $(window).scrollTop()
                });
                $(".aotuheight").css("height", document.documentElement.clientHeight + 0);
                $(".divBottom").css("top", $(window).scrollTop() + msgcontent.height());//
                //window.scrollTop(document.documentElement.clientHeight);
                //$("#msgout").show().text(msgcontent.height()+","+screen.availHeight+","+screen.height+","+(new Date().getTime()));
                //txtmsg.offset().top
                //$('html, body').attr({scrollTop:$('html, body')[0].scrollHeight});

                //$("#msgout").text("window.scrollY:"+window.scrollY+"innerHeight:"+window.innerHeight+",clientHeight:"+document.documentElement.clientHeight);
            }
                break;
        }
    };

    $(".btndown1").bind("click", function () {
        msgconf.isAutoBottom = true;
        msgcontent.scrollTop(msgcontent[0].scrollHeight - msgcontent.height() - 1);
        $(".divBottom .btndown:visible").hide();
        msgconf.newMsgCount = 0;
        return false;
    });

    $(".divBottom .btndown").bind("click touchstart touchmove touchend", function () {
        event.stopPropagation();
        msgconf.isAutoBottom = true;
        msgcontent.scrollTop(msgcontent[0].scrollHeight - msgcontent.height() - 1);
        $(".divBottom .btndown:visible").hide();
        msgconf.newMsgCount = 0;
        return false;
    });
    $(".add").bind('click', function () {
        ws.send(JSON.stringify({
            action: 'last10'
        }))
    });
    var lastSTop = msgcontent.scrollTop();
    var newMsgB = $(".divBottom .btndown b");
    var checkAutoScroll = function () {
        var sTop = msgcontent.scrollTop();
        try {
            if (sTop < 50) {
                if (msgconf.isAutoMsg) {
                    msgconf.autoMsgOldFunc();
                }
            }
        } catch (e) {
        }
        if (lastSTop != sTop) {
            if (sTop < lastSTop) {
                msgconf.isAutoBottom = false;
            }
            lastSTop = sTop;
            return;
        }
        if (isIosUserAgent) {
            //$("#msgout").text("height:"+msgcontent.scrollTop()+",bheight:"+(msgcontent[0].scrollHeight-msgcontent.height()));
            //$("#msgout").text("height:"+msgcontent.scrollTop()+",bheight:"+(msgcontent[0].scrollHeight-msgcontent.height()));
            if (sTop == 0) {
                msgcontent.scrollTop(1);
                //msgcontent[0].scrollBy(0,1);
            } else if (sTop != 1 && sTop >= (msgcontent[0].scrollHeight - msgcontent.height())) {
                msgcontent.scrollTop(sTop - 1);
                //msgcontent[0].scrollBy(0,-1);
            }
        }
        if (msgconf.isAutoBottom == false && Math.abs(msgcontent[0].scrollHeight - msgcontent.height() - sTop) < 50) {
            msgconf.isAutoBottom = true;
        }
        var newMsgTxt = msgconf.newMsgCount + "条新消息";
        if (msgconf.isAutoBottom) {
            msgcontent.scrollTop(msgcontent[0].scrollHeight - msgcontent.height() - 1);
            $(".divBottom .btndown:visible").hide();
            if (msgconf.newMsgCount != 0) {
                msgconf.newMsgCount = 0;
            }
        } else {
            $(".divBottom .btndown:hidden").show();
        }
        if (newMsgB.text() != newMsgTxt) {
            newMsgB.text(newMsgTxt);
        }
    };
    //msgconf
    //$("body,.msgcontent").bind("click touchstart touchmove touchend",function(){checkAutoScroll();});
    setInterval(checkAutoScroll, 300);
    autoMsgSize();
    $(window).resize(autoMsgSize);

    function setCaretPosition(textDom, pos) {
        if (textDom.setSelectionRange) {
            // IE Support
            textDom.focus();
            textDom.setSelectionRange(pos, pos);
        } else if (textDom.createTextRange) {
            // Firefox support
            var range = textDom.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    }

    var delayAt = null;
    $(".msgcontent .msgleft .headimg").live("touchstart mousedown", function () {
        clearTimeout(delayAt);
        var nowDT = $(this).parents(".msglayer:first").data("dt");
        if (nowDT) {
            (function () {
                var dt = nowDT;

                delayAt = setTimeout(function () {
                    try {
                        txtmsg.val(txtmsg.val() + "@" + dt.name + " ");
                        txtmsgAutoRows();
                        txtmsg[0].focus();
                        setCaretPosition(txtmsg[0], (txtmsg.val() || "").length);
                    } catch (e) {
                    }
                }, 500);
            })();
        }
    });
    $(".msgcontent .msgpre").live("touchstart mousedown", function () {
        clearTimeout(delayAt);
        var txt = $(this).text();

        if (txt && (!$(this).parents(".msglayer:first").find(".sys").length)) {
            (function () {
                var ptxt = txt;
                delayAt = setTimeout(function () {
                    try {
                        txtmsg.val(txtmsg.val() + ptxt);
                        txtmsgAutoRows();
                        txtmsg[0].focus();
                        setCaretPosition(txtmsg[0], (txtmsg.val() || "").length);
                    } catch (e) {
                    }
                }, 500);
            })();
        }
    });

    $(window).bind("touchend touchmove mouseup mousemove", function (event) {
        clearTimeout(delayAt);
    });
    $(".aotuheight,.divBottom").bind("touchmove", function (event) {
        event.stopPropagation();
        return false;
    });
    $(window).bind("touchmove", function (event) {
        /*
            if($(event.target).hasClass("nostart")){
                event.stopPropagation();
                $("#msgout").text("nostart");
                txtmsg[0].focus();
                return true;
            }
                $("#msgout").text("start");*/
        if ($(event.target).hasClass("nostart") == false && document.activeElement.id == "txtMsg") {
            document.activeElement.blur();
        }
        if ($.contains(msgcontent, $(event.target)) == false && $(event.target).hasClass("msgcontent") == false) {
            event.stopPropagation();
            msgcontent.focus();
            return false;
        }

    });
    var lastSubmit = new Date().getTime();
    var submitMsg = function () {
        if (new Date().getTime() - lastSubmit < 800) {
            return;
        }
        var sendContent = $.trim(txtmsg.val() + "");
        lastSubmit = new Date().getTime();

        if (/\S/.test(sendContent)) {
            ws.send(sendContent);
        }
        txtmsg.val("");
        if (txtmsg[0].rows != 1) {
            txtmsg[0].rows = 1;
            autoMsgSize();
            setTimeout(function () {
                txtmsg[0].scrollIntoView(true);
            }, 150);
            if (!msgconf.isMenuLayoutUp) {
                /*
                setTimeout(function () {
                    if ($(window).scrollTop() - 2 > window.innerHeight) {
                        window.scrollBy(0, -40);
                    }
                }, 250);
                if (isIosUserAgent) {
                    if (!isWxUserAgent) {
                    }
                }*/
            }
        }
        if ($(".divBottom").hasClass("selekb") == false && document.activeElement.id != "txtMsg") {
            txtmsg[0].focus();
        }
    };
    txtmsg.keypress(function (e) {
        if (e.ctrlKey && (e.which == 10 || e.which == 13)) {
            submitMsg();
        }
    });
    $(".divBottom .send").bind("touchstart", function (event) {
        event.stopPropagation();
        submitMsg();
        return false;
    });
    $(".divBottom .send").bind("touchend touchmove", function (event) {
        event.stopPropagation();
        return false;
    });
    $(".divBottom .send").bind("click", function (event) {
        submitMsg();
        return false;
        /*
        //txtmsg[0].blur();txtmsg[0].focus();
        txtmsg.val("");
        txtmsg.focus();
        txtmsg[0].rows=1;
        autoMsgSize();
        //txtmsg[0].blur();
        setTimeout(function(){
            txtmsg.focus();
        },200);*/
    });
    //
    /*

    $(".aotuheight,.divBottom").bind("touchstart",function(eve){
        eve.stopPropagation();
        return false;
    });
    */
    txtmsg.focus(function () {
        autoMsgSize();
        if (!msgconf.isMenuLayoutUp) {
            setTimeout(function () {
                txtmsg[0].scrollIntoView(true);
            }, 150);
            /*
            setTimeout(function () {
                if ($(window).scrollTop() - 2 > window.innerHeight) {
                    window.scrollBy(0, -40);
                }
            }, 250);
            if (isIosUserAgent) {
                if (!isWxUserAgent) {
                }
            }*/
        }
    }).blur(function () {
        setTimeout(function () {
            document.body.scrollTop = document.body.scrollTop
        }, 80);
        setTimeout(autoMsgSize, 100);
        setTimeout(function () {
            document.body.scrollTop = document.body.scrollTop
        }, 120);
    });
    autoMsgSize();
    var lastRows = 1;
    var txtmsgAutoRows = function () {
        var changeRows = 1;
        txtmsg[0].rows = 1;
        var lineHeight = parseInt(txtmsg[0].scrollHeight) / parseInt((txtmsg.css("lineHeight") + "").replace("px", "")) || 0;
        changeRows = lineHeight;
        txtmsg[0].rows = lineHeight;
        if (lastRows != changeRows) {
            lastRows = changeRows;
            autoMsgSize();
        }
        //window.scrollTo(0,iosOffsetY);
        //$("#msgout").text("divBottomtouchmove");
        //$("#msgout").text("innerHeight:"+window.innerHeight+",clientHeight:"+document.documentElement.clientHeight);
    };
    txtmsg.bind("input", txtmsgAutoRows);
    txtmsg.bind("mousedown touchstart", function () {
        //txtmsg.removeAttr("readonly");
        $(".divBottom").removeClass("selekb");
        $(".divBottom").removeClass("selehis");
    });
    $(".divBottom .vkb").bind("click", function (event) {
        if ($(".divBottom").hasClass("selekb")) {
            //txtmsg.removeAttr("readonly");
            $(".divBottom").removeClass("selekb");
        } else {
            $(".divBottom").addClass("selekb");
            $(".divBottom").removeClass("selehis");
            //txtmsg.attr("readonly", "readonly");
        }
        autoMsgSize();
        return false;
    });
    $(".divBottom .inpvkb li").bind("click", function (event) {
        var ele = $(this);
        if (ele.hasClass("del")) {
            txtmsg.val((txtmsg.val() || "").replace(/[\S\s]$/, ""));
        } else if (ele.hasClass("cl")) {
            txtmsg.val("");
        } else if (ele.hasClass("nline")) {
            txtmsg.val(txtmsg.val() + "\r\n");
        } else if (ele.text() == '查') {
            ws.send('查');
        } else if (ele.text() == '跟') {
            ws.send('跟');
        } else if (ele.text() == '流水') {
            ws.send('流水');
        } else if (ele.text() == '玩法') {
            ws.send('玩法');
        } else if (ele.text() == '停止') {
            ws.send('停止');
        } else if (ele.text() == '大') {
            txtmsg.val(txtmsg.val() + '56789');
        } else if (ele.text() == '小') {
            txtmsg.val(txtmsg.val() + '01234');
        } else if (ele.text() == '单') {
            txtmsg.val(txtmsg.val() + '13579');
        } else if (ele.text() == '双') {
            txtmsg.val(txtmsg.val() + '02468');
        } else if (ele.text() == '全') {
            txtmsg.val(txtmsg.val() + '0123456789');
        } else {
            txtmsg.val(txtmsg.val() + ele.text());
        }

        txtmsgAutoRows();
        txtmsg.scrollTop(txtmsg[0].scrollHeight);
        event.stopPropagation();
        return false;
    });
    $(".divBottom .add").bind("click", function (event) {
        if ($(".divBottom").hasClass("selehis")) {
            //txtmsg.removeAttr("readonly");
            $(".divBottom").removeClass("selehis");
        } else {
            $(".divBottom").addClass("selehis");
            $(".divBottom").removeClass("selekb");
            //txtmsg.attr("readonly", "readonly");
        }
        autoMsgSize();
        return false;
    });
    var AutoRefTimeTag = function (data, day0, day1, day2) {
        if (msgconf.nowDate != day0) {
            msgconf.nowDate = day0;
            $(".msgcontent .msgtime").each(function () {
                var timeDiv = $(this);
                var timePattern = "yyyy年MM月dd日 ";
                var time = timeDiv.data("time");
                if (time) {
                    if (time > day0) {
                        timePattern = "";
                    } else if (time > day1) {
                        timePattern = "昨天 ";
                    } else if (time > day2) {
                        timePattern = "前天 ";
                    }
                    $("b", timeDiv).text(new Date(time).pattern(timePattern + "HH:mm"));
                }
            });
        }
    };
    var createMsgTimeNewTag = function (dt, day0, day1, day2) {

        if (msgconf.beforeMsgTime == 0) {
            msgconf.beforeMsgTime = dt.time;
            msgconf.afterMsgTime = dt.time;
        }

        if (dt.time - msgconf.beforeMsgTime > 1000 * 60 * 5) {//5分钟
            msgconf.beforeMsgTime = dt.time;
            var timeDiv = $("<div class='msgtime'><b></b></div>");
            timeDiv.data("time", dt.time);
            var timePattern = "yyyy年MM月dd日 ";
            if (dt.time > day0) {
                timePattern = "";
            } else if (dt.time > day1) {
                timePattern = "昨天 ";
            } else if (dt.time > day2) {
                timePattern = "前天 ";
            }
            $("b", timeDiv).text(new Date(dt.time).pattern(timePattern + "HH:mm"));
            msgcontent.append(timeDiv);
        }
    };

    var createMsgTimeOldTag = function (dt, day0, day1, day2, isOver) {

        if (msgconf.afterMsgTime == 0) {
            return;
        }
        if (isOver || msgconf.afterMsgTime - dt.time > 1000 * 60 * 5) {
            if (!isOver) {
                msgconf.afterMsgTime = dt.time;
            }
            var firstDiv = $(">div:first", msgcontent);
            if (firstDiv.length) {
                var firstDT = firstDiv.data("dt");
                if (firstDT && firstDT.time) {
                    var timeDiv = $("<div class='msgtime'><b></b></div>");
                    timeDiv.data("time", firstDT.time);
                    var timePattern = "yyyy年MM月dd日 ";
                    if (firstDT.time > day0) {
                        timePattern = "";
                    } else if (firstDT.time > day1) {
                        timePattern = "昨天 ";
                    } else if (firstDT.time > day2) {
                        timePattern = "前天 ";
                    }
                    $("b", timeDiv).text(new Date(firstDT.time).pattern(timePattern + "HH:mm"));
                    $(">div:first", msgcontent).before(timeDiv);
                }
            }
            if (isOver) {
                $(">div:first", msgcontent).before($("<div class='msgover'><b>没有更多消息</b></div>"));
            }
        }
    };
    var createMsgTag = function (dt) {
        /*
        <div class='msgtime'><b>2018年4月23日 14:14</b></div>
        <div class='msglayer msgleft'>
        <div class="fpop">
        <div class="headimg" ><img src="http://wx.qlogo.cn/mmcrhead/j9F6zNYHdW92yicCSgxv471OfHCsZ0p4Fx7XCke0t0iatotARlLsVapPmCaiajKOtt1zZzIbgvZ71tNibgKsqTykKbibk02TV6ic0C/0" /></div>
        <h5 class="uname sys">啊发哥</h5>
        <pre class="msgpre">
        在不在
        一二五阿斯蒂芬
        dfdfdf
        </pre>
        </div>
        </div>

        <div class='msgimg'><a><img/></a></div>
        */
        try {
            var div = $("<div class='msglayer'><div class='fpop'><div class='headimg' ></div><h5 class='uname'></h5></div></div>");
            div.data("dt", dt);
            //msgleft
            div.addClass(dt.fromId == userId ? "msgright" : "msgleft");
            var uname = $(".uname", div);
            var loading = $(".throbber-loader", div);
            var headimg = $(".headimg", div);
            var fpop = $(".fpop", div);
            uname.text(dt.name + "");
            switch (dt.msgType) {
                case 0:
                    var pre = $("<pre class='msgpre'></pre>");
                    if (dt.content.indexOf("退码") !== -1) {
                        pre = $("<pre class='msgpre_nocopy'></pre>");
                    }

                    pre.html(dt.content);// +"  ； "+ new Date(dt.time).pattern("yyyy年MM月dd日 HH:mm")
                    fpop.append(pre)
                    break;
                case 1:
                    if (dt.content && /\S/.test(dt.content + "")) {
                        var divImg = $("<div class='msgimg'><a><img/></a></div>");
                        var imgUrl = dt.content;
                        //$("a", divImg).attr("href", imgUrl);
                        $("a img", divImg).attr("src", imgUrl);
                        fpop.append(divImg)
                    }
                    break;
            }
            if (/\S/.test(dt.imgUrl || "")) {
                var headImg = $("<img />");
                if (dt.imgUrl.indexOf('http') != -1) {
                    headImg.attr("src", dt.imgUrl);
                } else {
                    headImg.attr("src", "/avatar/" + dt.imgUrl);
                }
                headimg.append(headImg);
            }
            return div;
        } catch (e) {

            alert("Err:" + e);
        }
    };


    var autoMsgOldData = null;
    var autoMsgOldIndex = null;
    var autoMsgOldFunc = null;
    var isRunAutoMsgOldFunc = false;
    var isFirst = false;
    msgconf.autoMsgOldFunc = function () {
        console.log('autoMsgOldFunc');
        if (msgconf.isOverAutoMsgOldFunc || isRunAutoMsgOldFunc) {
            return;
        }

        $("#debugout").text("autoMsgOldData:" + autoMsgOldData + ",autoMsgOldIndex:" + autoMsgOldIndex);
        if (!isFirst) {
            isFirst = true;
            $(">div:first", msgcontent).before($("<div></div>"));
        }

        ws.send(JSON.stringify({
            action: 'pull',
            lastId: autoMsgOldIndex || ''
        }));
        isRunAutoMsgOldFunc = true;
    };

    var autoMsgNewData = null;
    var autoMsgNewIndex = null;

    Fingerprint2.get(function (components) {
        var values = components.map(function (component) {
            return component.value
        })

        values = values.slice(0, 2);
        for (i in values) {
            if (i == 0) {
                values[i] = values[i].substr(0, 80)
            }
        }
        var murmur = Fingerprint2.x64hash128(values.join(''), 31)
        $.post('/bind', {uid: userId, fingerprint: murmur}, function (ret) {
            if (ret.succeed) {
//                createWebSocket("ws://" + location.hostname + ":"+port+"/ws?uid="+userId+"&fp=" + murmur);
            }
        }, 'json');
    })

    var ws;
    var historyLoaded = false;

    // 重连
    function reconnect(url) {
        if (reconnect.lockReconnect) return;
        reconnect.lockReconnect = true;
        setTimeout(function () {     //没连接上会一直重连，设置延迟避免请求过多
            createWebSocket(url);
            reconnect.lockReconnect = false;
        }, 2000);
    }

    // 实例websocket
    function createWebSocket(url) {
        try {
            if ('WebSocket' in window) {
                ws = new WebSocket(url);
            } else if ('MozWebSocket' in window) {
                ws = new MozWebSocket(url);
            } else {
                _alert("当前浏览器不支持websocket协议,建议使用现代浏览器", 3000)
            }
            initEventHandle(url);
        } catch (e) {
            console.log(e);
            reconnect(url);
        }
    }

    // 初始化事件函数
    function initEventHandle(wsUrl) {
        ws.onopen = function () {
            notice('连接成功')
        };
        ws.onclose = function () {
            notice('掉线了，正在重连...')
            //reconnect(wsUrl);
        };
        ws.onerror = function (err) {
            notice('连接出错，正在重连...')
            //reconnect(wsUrl);
        };
        ws.onmessage = onmessage;
    }

    var clipboard;

    function onmessage(event) {
        var ret = JSON.parse(event.data);
        //console.log(event.data);
        if (ret.additionalProperties) {
            if (ret.additionalProperties.action == 'pull') {

                if (ret.data.length == 0) {
                    msgconf.isOverAutoMsgOldFunc = true;
                    isRunAutoMsgOldFunc = false;
                    createMsgTimeOldTag(null, day0, day1, day2, true);
                    return;
                }

                var day0 = Date.parse(new Date(ret.data[0].createdAt).pattern("yyyy-MM-dd"));
                var day1 = day0 - 1000 * 60 * 60 * 24;
                var day2 = day1 - 1000 * 60 * 60 * 24;
                AutoRefTimeTag(ret.data[0], day0, day1, day2);

                var dt = null;
                //var divHeight = 0;
                msgcontent.removeClass("hide");
                if (ret.data.length > 0) {
                    msgcontent.addClass("hide");
                }
                var firstDiv = $(".msgcontent>div:first");
                var firstTop = firstDiv.position().top;
                console.log(msgcontent.scrollTop(), firstTop);
                for (var k = ret.data.length - 1; k >= 0; k--) {
                    (function () {
                        dt = ret.data[k];
                        dt.time = ret.data[k].createdAt;
                        var div = createMsgTag(dt);
                        createMsgTimeOldTag(dt, day0, day1, day2);
                        //alert(div.html())
                        //$("#debugout").show().text(div.html());
                        $(">div:first", msgcontent).before(div);
                        //divHeight += div.height();
                    })();
                }
                if (dt != null) {
                    (function () {
                        autoMsgOldData = dt.createdAt;
                        autoMsgOldIndex = dt.id;
                        //msgcontent.scrollTop(msgcontent.scrollTop() + firstDiv.position().top + firstTop);
                        setTimeout(function () {
                            msgcontent.scrollTop(msgcontent.scrollTop() + firstDiv.position().top + firstTop - 2);
                            setTimeout(function () {
                                msgcontent.removeClass("hide");
                                isRunAutoMsgOldFunc = false;
                            }, 100);
                        }, 700);
                    })();
                }

                if (clipboard) {
                    clipboard.destroy();
                }
                clipboard = new ClipboardJS('.msgpre', {
                    text: function (trigger) {
                        console.log($(trigger).html());
                        return $(trigger).html().replace(/<br>/g, "\n");
                    }
                });
                clipboard.on('success', function () {
                    alert('复制成功');
                })
                clipboard.on('error', function () {
                    alert('复制成功');
                })

            } else if (ret.additionalProperties.action == 'last10') {

                $('#order-list').html('');
                var content = '';
                $.each(ret.data, function (i, e) {
                    content += '<li>' + e + '</li>'
                })
                $('#order-list').html(content);
                $(".divBottom .his li").bind("click", function (event) {
                    var ele = $(this);
                    txtmsg.val(txtmsg.val() + ele.text());

                    txtmsgAutoRows();
                    txtmsg.scrollTop(txtmsg[0].scrollHeight);
                    event.stopPropagation();
                    return false;
                });

            }
        } else {

            console.log(ret);
            ret.time = ret.createdAt;

            var day0 = Date.parse(new Date(ret.createdAt).pattern("yyyy-MM-dd"));
            var day1 = day0 - 1000 * 60 * 60 * 24;
            var day2 = day1 - 1000 * 60 * 60 * 24;
            AutoRefTimeTag(ret, day0, day1, day2);

            var dt = ret;
            if (autoMsgOldIndex === null) {
                autoMsgOldData = dt.createdAt;
                autoMsgOldIndex = dt.id;
            }
            var div = createMsgTag(dt);
            createMsgTimeNewTag(dt, day0, day1, day2);
            msgcontent.append(div);

            autoMsgNewData = dt.createdAt;
            autoMsgNewIndex = dt.id;
            if (msgconf.isAutoBottom) {
                msgcontent.scrollTop(msgcontent[0].scrollHeight - msgcontent.height() - 1);
            } else {
                msgconf.newMsgCount += 1;
            }

            if (clipboard) {
                clipboard.destroy();
            }
            clipboard = new ClipboardJS('.msgpre', {
                text: function (trigger) {
                    console.log($(trigger).html());
                    return $(trigger).html().replace(/<br>/g, "\n");
                }
            });
            clipboard.on('success', function () {
                alert('复制成功');
            })
            clipboard.on('error', function () {
                alert('复制成功');
            })
        }
    };

    function notice(msg) {

    }

    function getHistory() {
        setTimeout(function () {
            var items = $('.msg-item');
            ws.send(JSON.stringify({
                action: 'pull',
                lastId: items.length > 0 ? $(items[0]).data('id') : ''
            }));
        }, 1000);
    }

    $(".tuima").live("click", function() {
        if (confirm("确定要退码吗?")) {
            zdbh = $(this).attr("data");
            $.ajax({
                type: "POST",
                url: "/sys/order-info/tuima?" + Date.parse(new Date()),
                data: {"zdbh": zdbh, uuid: getQueryVariable("u")},
                success: function (ret) {
                    console.log(ret)
                    if (ret.status == 0) {
                        alert(ret.msg);
                    }
                }
            })
        }
    })

    function getQueryVariable(variable)
    {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable){return pair[1];}
        }
        return(false);
    }
});