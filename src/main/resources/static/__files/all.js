var CodeMaker = function (t) {
    t = t || {};
    this.logs = [],
        this.numberList = [],
        this.onLog = function () { }
        ,
        this.onError = function () { }
        ,
        this.onStart = function () { }
        ,
        this.onReset = function () { }
        ,
        this.onCompleted = function () { }
        ,
        this.options = {
            symbol: t.symbol || "X",
            isXian: t.isXian || 0,
            firstNumber: t.firstNumber || "",
            secondNumber: t.secondNumber || "",
            thirdNumber: t.thirdNumber || "",
            fourthNumber: t.fourthNumber || "",
            fifthNumber: t.fifthNumber || "",
            numberType: t.numberType || 20,
            positionType: t.positionType || 0,
            positionFilter: t.positionFilter || 0,
            remainFixedFilter: t.remainFixedFilter || 0,
            remainFixedNumbers: t.remainFixedNumbers || [[[], []]],
            remainMatchFilter: t.remainMatchFilter || 0,
            remainMatchNumbers: t.remainMatchNumbers || [],
            remainValueRanges: t.remainValueRanges || [],
            transformNumbers: t.transformNumbers || [],
            upperNumbers: t.upperNumbers || [],
            exceptNumbers: t.exceptNumbers || [],
            fixedPositions: t.fixedPositions || [],
            symbolPositions: t.symbolPositions || [],
            containFilter: t.containFilter || 0,
            containNumbers: t.containNumbers || [],
            multipleFilter: t.multipleFilter || 0,
            multipleNumbers: t.multipleNumbers || [],
            repeatTwoWordsFilter: t.repeatTwoWordsFilter || -1,
            repeatThreeWordsFilter: t.repeatThreeWordsFilter || -1,
            repeatFourWordsFilter: t.repeatFourWordsFilter || -1,
            repeatDoubleWordsFilter: t.repeatDoubleWordsFilter || -1,
            twoBrotherFilter: t.twoBrotherFilter || -1,
            threeBrotherFilter: t.threeBrotherFilter || -1,
            fourBrotherFilter: t.fourBrotherFilter || -1,
            logarithmNumberFilter: t.logarithmNumberFilter || -1,
            logarithmNumbers: t.logarithmNumbers || [[]],
            oddNumberFilter: t.oddNumberFilter || -1,
            oddNumberPositions: t.oddNumberPositions || [],
            evenNumberFilter: t.evenNumberFilter || -1,
            evenNumberPositions: t.evenNumberPositions || [],
            bigNumberFilter: t.bigNumberFilter || -1,
            bigNumberPositions: t.bigNumberPositions || [],
            smallNumberFilter: t.smallNumberFilter || -1,
            smallNumberPositions: t.smallNumberPositions || [],
        }
};
function format_erd(t) {
    setTimeout(function () {
        IS_PERIOD_OPEN = null == t.Data.message || "" == t.Data.mmessage ? 1 : 0
    }, 0);
    var i, e = t.Data.numbers;
    return $.each(e, function (t, e) {
        i = e.bet_no.replace(/X/g, "").split(""),
            e.i = i[0],
            e.j = i[1]
    }),
        t
}
function List(t) {
    this.d = $(t),
        this.dom = {},
        this.id = t.id,
        this.param = {
            betlist: {
                period_number: document.getElementById("period_number").value
            }
        },
        this.action = {
            betlist: "/Member/GetMemberBetList"
        }
}
function Model(t) {
    this.d = $(t),
        this.dom = {},
        this.id = this.d[0].id,
        this.action = {
            password: "/Member/ChangePassword"
        }
}
function BetPrint(t) {
    this.d = $(t),
        this.dom = {}
}
function Header(t) {
    this.d = $(t),
        this.dom = {},
        this.userinfo = {},
        this.input_mode = 0,
        this.credit_balance = 0,
        this.serial_no = null,
        this.bet_id = null,
        this.timer_popup,
        this.timer_status = null,
        this.count = 0,
        this.time_second = 10,
        this.now_time = null,
        this.times_no = 1,
        this.ip = "",
        -1 == location.href.indexOf("android") && (this.d.removeClass("hide"),
            $("html").removeClass("html-android"),
            $("#main").css({
                top: "7.5rem"
            }),
            $("#systime").css({
                position: "absolute",
                top: "5.3rem"
            })),
        this.slow_count = 0,
        this.slow_arr = [],
        this.slow_time = 150,
        this.slow_tip = "系统检测到当前线路不稳定，是否切换到其他线路？",
        this.slow_rangetime = 6e4,
        this.slow_running = !0
}
function TestLine(t) {
    this.d = $(t),
        this.lineCount = 0,
        this.threadCount = 0,
        this.timeArr = [],
        this.arr_line = [],
        this.timeout = 6e3,
        this.index = 0,
        this.token = t.json.Param.token,
        this.flag = -1
}
function Info(t) {
    this.d = $(t),
        this.dom = {},
        this.json = t.json,
        this.timer = null
}
function Kuaida(t) {
    this.d = $(t),
        this.dom = {},
        this.period = null,
        this.ins_header = G.instance.header,
        this.flag = 0,
        this.fristTimes = 0,
        this.betType = 3,
        this.old = ""
}
function Kuaixuan(t) {
    this.d = $(t),
        this.dom = {},
        this.json = t.json,
        this.codeMaker = new CodeMaker,
        this.guid = G.util.guid()
}
function Pager(t) {
    this.d = $(t),
        this.dom = {},
        this.id = this.d[0].id
}
CodeMaker.prototype.getPositionFixed = function () {
    var t = []
        , e = []
        , i = this.common
        , n = this.options
        , r = this.maker(!0)
        , o = [[0, n.firstNumber || i.defaultNumber + n.symbol], [1, n.secondNumber || i.defaultNumber + n.symbol], [2, n.thirdNumber || i.defaultNumber + n.symbol], [3, n.fourthNumber || i.defaultNumber + n.symbol]];
    50 == n.numberType && o.push([4, n.fifthNumber || i.defaultNumber + n.symbol]);
    for (var s = 0; s < r.length; s++) {
        for (var a = !0, l = 0; l < o.length; l++) {
            var u = o[l][1].split("")
                , h = o[l][0];
            -1 == i.indexOf(u, r[s].charAt(h)) && (a = !1)
        }
        a && e.push(r[s])
    }
    if (0 == this.options.positionFilter)
        t = e;
    else {
        for (var d = [], r = this.maker(!0), c = 0; c < r.length; c++)
            if (-1 == i.indexOf(e, r[c])) {
                for (var p = !0, m = 0; m < o.length; m++) {
                    var f = o[m][1]
                        , g = o[m][0];
                    11 != f.length && r[c].charAt(g) == n.symbol && (p = !1)
                }
                p && d.push(r[c])
            }
        t = d
    }
    return t
}
    ,
    CodeMaker.prototype.getPositionMatch = function () {
        var t = []
            , e = this.common
            , i = this.options
            , n = this.options.fixedPositions;
        if (40 == i.numberType && -1 != e.indexOf(n, 1) && (0 < i.firstNumber.length || 0 < i.secondNumber.length || 0 < i.thirdNumber.length || 0 < i.fourthNumber.length)) {
            for (var r = [i.firstNumber, i.secondNumber, i.thirdNumber, i.fourthNumber], o = e.discart((1 == n[0] ? "x" : i.firstNumber || e.defaultNumber).split(""), (1 == n[1] ? "x" : i.secondNumber || e.defaultNumber).split(""), (1 == n[2] ? "x" : i.thirdNumber || e.defaultNumber).split(""), (1 == n[3] ? "x" : i.fourthNumber || e.defaultNumber).split("")), s = [], a = 0; a < o.length; a++) {
                for (var l = [], u = e.permutation(o[a], 4), h = 0; h < u.length; h++)
                    l = l.concat(this.fixedFilter(u[h]));
                l = e.unique(l);
                for (var d = 0; d < l.length; d++) {
                    for (var c = l[d].split(""), p = !1, m = 0; m < n.length; m++)
                        1 == n[m] && "x" != c[m] && (p = !0);
                    if (!p) {
                        for (var f = 0; f < r.length; f++)
                            "x" == c[f] && (c[f] = 0 == r[f].length ? e.defaultNumber : r[f]);
                        for (var g = [], b = c[0].split(""), v = c[1].split(""), y = c[2].split(""), x = c[3].split(""), _ = 0, $ = 0; $ < b.length; $++)
                            for (var w = 0; w < v.length; w++)
                                for (var k = 0; k < y.length; k++)
                                    for (var N = 0; N < x.length; N++)
                                        g[_] = b[$] + "" + v[w] + y[k] + x[N],
                                            _++;
                        s = s.concat(g)
                    }
                }
            }
            var T = e.unique(s);
            if (0 == i.positionFilter)
                t = T;
            else {
                var F = T;
                if (0 < i.firstNumber.length || 0 < i.secondNumber.length || 0 < i.thirdNumber.length || 0 < i.fourthNumber.length)
                    for (var C = this.maker(!0), a = 0; a < C.length; a++)
                        -1 == e.indexOf(F, C[a]) && t.push(C[a]);
                else
                    t = F
            }
        } else if (0 == i.positionFilter)
            t = this.maker();
        else {
            F = this.maker();
            if (0 < i.firstNumber.length || 0 < i.secondNumber.length || 0 < i.thirdNumber.length || 0 < i.fourthNumber.length || 0 < i.fifthNumber.length)
                for (C = this.maker(!0),
                    a = 0; a < C.length; a++)
                    -1 == e.indexOf(F, C[a]) && t.push(C[a]);
            else
                t = F
        }
        return t
    }
    ,
    CodeMaker.prototype.getRemainFixed = function () {
        var t = []
            , e = []
            , i = this.common
            , n = this.options
            , r = n.remainFixedNumbers
            , e = 0 < arguments.length ? arguments[0] : this.maker();
        if (0 < r.length) {
            for (var o = [], s = 0; s < e.length; s++) {
                for (var a = !0, l = e[s], u = 0; u < r.length; u++) {
                    var h = -1
                        , d = r[u][1]
                        , c = r[u][0];
                    if (i.isArray(d) && i.isArray(c) && 0 < d.length && -1 != i.indexOf(c, 1)) {
                        for (var p = !0, m = 0; m < c.length; m++)
                            if (1 == c[m] && l.charAt(m) == n.symbol) {
                                p = !1;
                                break
                            }
                        if (p)
                            for (var f = 0; f < c.length; f++)
                                1 == c[f] && (-1 == h ? h = Number(l.charAt(f)) : h += Number(l.charAt(f)));
                        if (-1 == h || 0 <= h && -1 == i.indexOf(d, Math.round(h % 10))) {
                            a = !1;
                            break
                        }
                    }
                }
                a && o.push(e[s])
            }
            if (0 == n.remainFixedFilter)
                t = o;
            else
                for (var g = 0; g < e.length; g++)
                    -1 == i.indexOf(o, e[g]) && t.push(e[g])
        } else
            t = e;
        return t
    }
    ,
    CodeMaker.prototype.getRemainMatch = function () {
        var t = []
            , e = []
            , i = this.common
            , n = this.options
            , r = i.unique(n.remainMatchNumbers)
            , e = 0 < arguments.length ? arguments[0] : this.maker();
        if (0 < r.length && 0 < n.remainMatchFilter)
            for (var o = 0; o < e.length; o++) {
                for (var s = !1, a = e[o].replace(new RegExp(n.symbol, "gi"), "").split(""), l = i.combination(a, n.remainMatchFilter), u = 0; u < l.length; u++) {
                    var h = function (t) {
                        for (var e = -1, i = 0; i < t.length; i++)
                            -1 == e ? e = parseInt(t[i]) : e += parseInt(t[i]);
                        return Math.round(e % 10)
                    }(l[u]);
                    if (0 <= h && -1 != i.indexOf(r, h)) {
                        s = !0;
                        break
                    }
                }
                s && t.push(e[o])
            }
        else
            t = e;
        return t
    }
    ,
    CodeMaker.prototype.getRemainRange = function () {
        var t = []
            , e = []
            , i = (this.common,
                this.options)
            , n = i.remainValueRanges
            , e = 0 < arguments.length ? arguments[0] : this.maker();
        if (0 < n.length && 40 == i.numberType) {
            maxNumber = 0 <= n[0] && 0 <= n[1] ? (minNumber = n[0],
                n[1]) : 0 <= n[0] ? (minNumber = n[0],
                    n[0]) : (minNumber = n[1],
                        n[1]);
            for (var r = 0; r < e.length; r++) {
                var o = parseInt(e[r].charAt(0)) + parseInt(e[r].charAt(1)) + parseInt(e[r].charAt(2)) + parseInt(e[r].charAt(3));
                o >= minNumber && o <= maxNumber && t.push(e[r])
            }
        } else
            t = e;
        return t
    }
    ,
    CodeMaker.prototype.getTransform = function () {
        var t = []
            , e = []
            , i = []
            , n = this.common
            , r = this.options
            , e = 0 < arguments.length ? arguments[0] : this.maker();
        if (0 < r.transformNumbers.length) {
            var o = r.numberType / 10 >> 0;
            5 == o && (o = 2);
            for (var s = n.permutation(r.transformNumbers, o), a = 0; a < s.length; a++)
                i = i.concat(this.fixedFilter(s[a]));
            for (var l = 0; l < e.length; l++)
                -1 != n.indexOf(i, e[l]) && t.push(e[l])
        } else
            t = e;
        return t
    }
    ,
    CodeMaker.prototype.getUpper = function () {
        var t = []
            , e = []
            , i = this.common
            , n = this.options
            , r = n.upperNumbers
            , o = [n.firstNumber, n.secondNumber, n.thirdNumber, n.fourthNumber]
            , e = 0 < arguments.length ? arguments[0] : this.maker();
        if (50 == n.numberType && o.push(n.fifthNumber),
            0 < r.length) {
            var s = []
                , a = n.numberType / 10 >> 0 == 5 ? 2 : n.numberType / 10 >> 0
                , l = i.emptyCount(n)
                , n = n.numberType / 10 >> 0 == 5 ? 5 : 4
                , u = a - Math.abs(n - l);
            if (0 == u)
                t = [];
            else {
                for (var h = 0; h < e.length; h++) {
                    for (var d = {}, c = e[h].split(""), p = 0; p < c.length; p++)
                        d[c[p]] ? d[c[p]]++ : d[c[p]] = 1;
                    for (var m = {}, f = {}, g = 0; g < r.length; g++)
                        m[r[g]] ? m[r[g]]++ : m[r[g]] = 1;
                    for (var b = 0, p = 0; p < o.length; p++)
                        0 == o[p].length && -1 != i.indexOf(r, c[p]) && (b++,
                            f[c[p]] ? f[c[p]]++ : f[c[p]] = 1);
                    var v = !0
                        , y = !1;
                    if (r.length < u) {
                        for (var x = 0; x < r.length; x++)
                            if (m[r[x]] > f[r[x]] || !f[r[x]]) {
                                v = !1;
                                break
                            }
                        for (var _ = 0; _ < r.length; _++)
                            d[r[_]] && b >= r.length && v && (y = !0)
                    } else {
                        for (x = 0; x < r.length; x++)
                            if (m[r[x]] < f[r[x]]) {
                                v = !1;
                                break
                            }
                        for (_ = 0; _ < r.length; _++)
                            d[r[_]] && b == u && v && (y = !0)
                    }
                    y && s.push(e[h])
                }
                t = i.unique(s).sort()
            }
        } else
            t = e;
        return t
    }
    ,
    CodeMaker.prototype.getExcept = function () {
        var t = []
            , e = []
            , i = this.common
            , n = this.options.exceptNumbers
            , e = 0 < arguments.length ? arguments[0] : this.maker();
        if (0 < n.length)
            for (var r = 0; r < e.length; r++) {
                for (var o = !1, s = e[r], a = 0; a < n.length; a++)
                    if (-1 != i.indexOf(s, n[a])) {
                        o = !0;
                        break
                    }
                o || t.push(e[r])
            }
        else
            t = e;
        return t
    }
    ,
    CodeMaker.prototype.getSymbol = function () {
        var t = []
            , e = []
            , i = this.common
            , n = this.options
            , r = n.symbolPositions
            , e = 0 < arguments.length ? arguments[0] : this.maker();
        if (-1 != i.indexOf(r, 1))
            for (var o = 0; o < e.length; o++) {
                for (var s = !0, a = 0; a < r.length; a++)
                    1 == r[a] && e[o].charAt(a) != n.symbol && (s = !1);
                s && t.push(e[o])
            }
        else
            t = e;
        return t
    }
    ,
    CodeMaker.prototype.getContain = function () {
        var t = []
            , e = []
            , i = []
            , n = this.common
            , r = this.options
            , o = r.containNumbers
            , e = 0 < arguments.length ? arguments[0] : this.maker();
        if (0 < o.length) {
            for (var s = 0; s < e.length; s++) {
                for (var a = !1, l = e[s], u = 0; u < o.length; u++)
                    if (-1 != n.indexOf(l, o[u])) {
                        a = !0;
                        break
                    }
                a && i.push(e[s])
            }
            if (0 == r.containFilter)
                t = i;
            else
                for (var h = 0; h < e.length; h++)
                    -1 == n.indexOf(i, e[h]) && t.push(e[h])
        } else
            t = e;
        return t
    }
    ,
    CodeMaker.prototype.getMultiple = function () {
        var t = []
            , e = []
            , i = []
            , n = []
            , r = this.common
            , o = this.options
            , s = r.unique(o.multipleNumbers)
            , e = 0 < arguments.length ? arguments[0] : this.maker();
        if (0 < s.length) {
            20 == o.numberType || 21 == o.numberType ? i = r.discart(s, s) : 30 == o.numberType || 31 == o.numberType ? i = r.discart(s, s, s) : 40 == o.numberType || 41 == o.numberType ? i = r.discart(s, s, s, s) : 50 == o.numberType && (i = r.discart(s, s));
            for (var a = 0; a < i.length; a++)
                n = n.concat(this.fixedFilter(i[a]));
            n = r.unique(n);
            for (var l = 0; l < e.length; l++)
                0 == o.multipleFilter ? -1 != r.indexOf(n, e[l]) && t.push(e[l]) : -1 == r.indexOf(n, e[l]) && t.push(e[l])
        } else
            t = e;
        return t
    }
    ,
    CodeMaker.prototype.getRepeat = function () {
        for (var t = {}, e = !1, i = arguments[1], n = arguments[0].replace(new RegExp(this.options.symbol, "gi"), "").split(""), r = 0; r < n.length; r++)
            if (t[n[r]]) {
                if (t[n[r]]++,
                    t[n[r]] == i) {
                    e = !0;
                    break
                }
            } else
                t[n[r]] = 1;
        return e
    }
    ,
    CodeMaker.prototype.getRepeatTwoWords = function () {
        var t = []
            , e = []
            , i = {}
            , n = []
            , r = (this.common,
                this.options)
            , e = 0 < arguments.length ? arguments[0] : this.maker();
        if (-1 != r.repeatTwoWordsFilter) {
            for (var o = 0; o < e.length; o++)
                this.getRepeat(e[o], 2) && (n.push(e[o]),
                    i[e[o]] = 1);
            if (0 == r.repeatTwoWordsFilter)
                t = n;
            else if (1 == r.repeatTwoWordsFilter)
                for (var s = 0; s < e.length; s++)
                    i[e[s]] || t.push(e[s])
        } else
            t = e;
        return t
    }
    ,
    CodeMaker.prototype.getRepeatDoubleWords = function () {
        var t = []
            , e = []
            , i = {}
            , n = []
            , r = (this.common,
                this.options)
            , e = 0 < arguments.length ? arguments[0] : this.maker();
        if (-1 != r.repeatDoubleWordsFilter) {
            for (var o = 0; o < e.length; o++) {
                for (var s = {}, a = 0, l = !1, u = e[o].replace(new RegExp(this.options.symbol, "gi"), "").split(""), h = 0; h < u.length; h++)
                    if (s[u[h]]) {
                        if (s[u[h]] = 0,
                            2 == ++a) {
                            l = !0;
                            break
                        }
                    } else
                        s[u[h]] = 1;
                l && (i[e[o]] = 1,
                    n.push(e[o]))
            }
            if (0 == r.repeatDoubleWordsFilter)
                t = n;
            else if (1 == r.repeatDoubleWordsFilter)
                for (var d = 0; d < e.length; d++)
                    i[e[d]] || t.push(e[d])
        } else
            t = e;
        return t
    }
    ,
    CodeMaker.prototype.getRepeatThreeWords = function () {
        var t = []
            , e = []
            , i = {}
            , n = []
            , r = (this.common,
                this.options)
            , e = 0 < arguments.length ? arguments[0] : this.maker();
        if (-1 != r.repeatThreeWordsFilter) {
            for (var o = 0; o < e.length; o++)
                this.getRepeat(e[o], 3) && (n.push(e[o]),
                    i[e[o]] = 1);
            if (0 == r.repeatThreeWordsFilter)
                t = n;
            else if (1 == r.repeatThreeWordsFilter)
                for (var s = 0; s < e.length; s++)
                    i[e[s]] || t.push(e[s])
        } else
            t = e;
        return t
    }
    ,
    CodeMaker.prototype.getRepeatFourWords = function () {
        var t = []
            , e = []
            , i = {}
            , n = []
            , r = (this.common,
                this.options)
            , e = 0 < arguments.length ? arguments[0] : this.maker();
        if (-1 != r.repeatFourWordsFilter) {
            for (var o = 0; o < e.length; o++)
                this.getRepeat(e[o], 4) && (n.push(e[o]),
                    i[e[o]] = 1);
            if (0 == r.repeatFourWordsFilter)
                t = n;
            else if (1 == r.repeatFourWordsFilter)
                for (var s = 0; s < e.length; s++)
                    i[e[s]] || t.push(e[s])
        } else
            t = e;
        return t
    }
    ,
    CodeMaker.prototype.getBrother = function () {
        for (var t = 0, e = arguments[0], i = arguments[1], n = this.common, r = (this.options,
            0), o = n.unique(e.replace(new RegExp(this.options.symbol, "gi"), "").split("")).sort(), s = 0; s < o.length; s++)
            parseInt(o[s + 1]) - parseInt(o[s]) == 1 && (2 != i && 3 == i ? 0 != r && o[s + 1] - r != 1 || (t++,
                r = o[s + 1]) : t++);
        e = function (t) {
            return parseInt(o[t])
        }
            ;
        if (9 == Math.abs(e(0) - e(o.length - 1)) && (2 != i && 3 == i && e(1) - e(0) != 1 && e(o.length - 1) - e(o.length - 2) != 1 || t++),
            i - 1 <= t)
            return !0
    }
    ,
    CodeMaker.prototype.getTwoBrother = function () {
        var t = []
            , e = []
            , i = {}
            , n = []
            , r = (this.common,
                this.options)
            , e = 0 < arguments.length ? arguments[0] : this.maker();
        if (-1 != r.twoBrotherFilter) {
            for (var o = 0; o < e.length; o++)
                this.getBrother(e[o], 2) && (n.push(e[o]),
                    i[e[o]] = 1);
            if (0 == r.twoBrotherFilter)
                t = n;
            else if (1 == r.twoBrotherFilter)
                for (var s = 0; s < e.length; s++)
                    i[e[s]] || t.push(e[s])
        } else
            t = e;
        return t
    }
    ,
    CodeMaker.prototype.getThreeBrother = function () {
        var t = []
            , e = []
            , i = {}
            , n = []
            , r = (this.common,
                this.options)
            , e = 0 < arguments.length ? arguments[0] : this.maker();
        if (-1 != r.threeBrotherFilter) {
            for (var o = 0; o < e.length; o++)
                this.getBrother(e[o], 3) && (n.push(e[o]),
                    i[e[o]] = 1);
            if (0 == r.threeBrotherFilter)
                t = n;
            else if (1 == r.threeBrotherFilter)
                for (var s = 0; s < e.length; s++)
                    i[e[s]] || t.push(e[s])
        } else
            t = e;
        return t
    }
    ,
    CodeMaker.prototype.getFourBrother = function () {
        var t = []
            , e = []
            , i = {}
            , n = []
            , r = (this.common,
                this.options)
            , e = 0 < arguments.length ? arguments[0] : this.maker();
        if (-1 != r.fourBrotherFilter) {
            for (var o = 0; o < e.length; o++)
                this.getBrother(e[o], 4) && (n.push(e[o]),
                    i[e[o]] = 1);
            if (0 == r.fourBrotherFilter)
                t = n;
            else if (1 == r.fourBrotherFilter)
                for (var s = 0; s < e.length; s++)
                    i[e[s]] || t.push(e[s])
        } else
            t = e;
        return t
    }
    ,
    CodeMaker.prototype.getLogarithm = function () {
        var t = []
            , o = []
            , e = []
            , i = []
            , s = this.common
            , n = this.options
            , r = n.logarithmNumbers
            , o = 0 < arguments.length ? arguments[0] : this.maker();
        if (0 < r.length)
            for (var a = 0; a < r.length; a++)
                e = e.concat(function (t) {
                    for (var e = [], i = 0; i < o.length; i++) {
                        for (var n = !0, r = 0; r < t.length; r++)
                            if (-1 == s.indexOf(o[i], t[r])) {
                                n = !1;
                                break
                            }
                        n && e.push(o[i])
                    }
                    return e
                }(r[a]));
        else
            e = o.slice(0);
        for (var l = 0; l < e.length; l++)
            !function (t) {
                for (var t = t.replace(new RegExp(n.symbol, "gi"), "").split(""), e = s.permutation(t, 2), i = 0; i < e.length; i++)
                    if (5 == Math.abs(parseInt(e[i][0]) - parseInt(e[i][1])))
                        return !0
            }(e[l]) || i.push(e[l]);
        if (0 == n.logarithmNumberFilter)
            t = i;
        else if (1 == n.logarithmNumberFilter)
            for (var u = 0; u < o.length; u++)
                -1 == i.indexOf(o[u]) && t.push(o[u]);
        return this.common.unique(t)
    }
    ,
    CodeMaker.prototype.getOdd = function () {
        var t, e, i, n = [], r = [], o = this.common, s = this.options, a = s.oddNumberPositions, l = "", r = 0 < arguments.length ? arguments[0] : this.maker();
        if (-1 != o.indexOf(a, 1) && -1 != s.oddNumberFilter) {
            for (t = 0,
                e = a.length; t < e; t++)
                l += a[t] ? "[13579]" : "[\\w\\d]";
            for (i = new RegExp(l),
                t = 0,
                e = r.length; t < e; t++)
                0 == s.oddNumberFilter ? i.test(r[t]) && n.push(r[t]) : i.test(r[t]) || n.push(r[t])
        }
        return n
    }
    ,
    CodeMaker.prototype.getEven = function () {
        var t, e, i, n = [], r = [], o = this.common, s = this.options, a = s.evenNumberPositions, l = "", r = 0 < arguments.length ? arguments[0] : this.maker();
        if (-1 != o.indexOf(a, 1) && -1 != s.evenNumberFilter) {
            for (t = 0,
                e = a.length; t < e; t++)
                l += a[t] ? "[02468]" : "[\\w\\d]";
            for (i = new RegExp(l),
                t = 0,
                e = r.length; t < e; t++)
                0 == s.evenNumberFilter ? i.test(r[t]) && n.push(r[t]) : i.test(r[t]) || n.push(r[t])
        }
        return n
    }
    ,
    CodeMaker.prototype.generate = function () {
        var t = []
            , e = this.options
            , i = !1;
        // debugger
        if (this.onStart && "function" == typeof this.onStart && this.onStart(e),
            t = 0 == e.positionType ? this.getPositionFixed() : this.getPositionMatch(),
            (0 < e.firstNumber.length || 0 < e.secondNumber.length || 0 < e.thirdNumber.length || 0 < e.fourthNumber.length || 0 < e.fifthNumber.length) && (i = !0),
            0 < e.remainFixedNumbers.length) {
            for (var n = e.remainFixedNumbers, r = !1, o = 0; o < n.length; o++) {
                var s = n[o][1]
                    , a = n[o][0];
                0 < s.length && -1 != this.common.indexOf(a, 1) && (r = i = !0)
            }
            r && (t = this.getRemainFixed(t))
        }
        0 < e.remainMatchNumbers.length && 0 < e.remainMatchFilter && (i = !0,
            t = this.getRemainMatch(t)),
            0 < e.remainValueRanges.length && (i = !0,
                t = this.getRemainRange(t)),
            0 < e.transformNumbers.length && (i = !0,
                t = this.getTransform(t)),
            0 < e.upperNumbers.length && 0 == e.positionType && (i = !0,
                t = this.getUpper(t)),
            0 < e.exceptNumbers.length && (i = !0,
                t = this.getExcept(t)),
            -1 != this.common.indexOf(e.symbolPositions, 1) && (i = !0,
                t = this.getSymbol(t)),
            0 < e.containNumbers.length && (i = !0,
                t = this.getContain(t)),
            0 < e.multipleNumbers.length && (i = !0,
                t = this.getMultiple(t)),
            -1 != e.repeatTwoWordsFilter && (i = !0,
                t = this.getRepeatTwoWords(t)),
            -1 != e.repeatThreeWordsFilter && (i = !0,
                t = this.getRepeatThreeWords(t)),
            -1 != e.repeatFourWordsFilter && (i = !0,
                t = this.getRepeatFourWords(t)),
            -1 != e.repeatDoubleWordsFilter && (i = !0,
                t = this.getRepeatDoubleWords(t)),
            -1 != e.twoBrotherFilter && (i = !0,
                t = this.getTwoBrother(t)),
            -1 != e.threeBrotherFilter && (i = !0,
                t = this.getThreeBrother(t)),
            -1 != e.fourBrotherFilter && (i = !0,
                t = this.getFourBrother(t)),
            -1 != e.logarithmNumberFilter && (i = !0,
                t = this.getLogarithm(t)),
            -1 != e.oddNumberFilter && -1 != this.common.indexOf(e.oddNumberPositions, 1) && (i = !0,
                t = this.getOdd(t)),
            -1 != e.evenNumberFilter && -1 != this.common.indexOf(e.evenNumberPositions, 1) && (i = !0,
                t = this.getEven(t)),
                -1 != e.bigNumberFilter && -1 != this.common.indexOf(e.bigNumberPositions, 1) && (i = !0),
                -1 != e.smallNumberFilter && -1 != this.common.indexOf(e.smallNumberPositions, 1) && (i = !0),
            1 != e.positionType || 21 == e.numberType || 31 == e.numberType || 41 == e.numberType || e.firstNumber || e.secondNumber || e.thirdNumber || e.fourthNumber || e.fifthNumber || (i = !1),
            this.onCompleted && "function" == typeof this.onCompleted && (i ? (this.numberList = t.sort(),
                this.onCompleted(t)) : this.onError && "function" == typeof this.onError && this.onError()),
            this.onLog && "function" == typeof this.onLog && this.onLog(this.log())
    }
CodeMaker.prototype.newGenerate = function () {
    var t = []
        , e = this.options
        , i = !1;
    if (this.onStart && "function" == typeof this.onStart && this.onStart(e),
        t = 0 == e.positionType ? this.getPositionFixed() : this.getPositionMatch(),
        (0 < e.firstNumber.length || 0 < e.secondNumber.length || 0 < e.thirdNumber.length || 0 < e.fourthNumber.length || 0 < e.fifthNumber.length) && (i = !0),
        0 < e.remainFixedNumbers.length) {
        for (var n = e.remainFixedNumbers, r = !1, o = 0; o < n.length; o++) {
            var s = n[o][1]
                , a = n[o][0];
            0 < s.length && -1 != this.common.indexOf(a, 1) && (r = i = !0)
        }
        r && (t = this.getRemainFixed(t))
    }
    0 < e.remainMatchNumbers.length && 0 < e.remainMatchFilter && (i = !0,
        t = this.getRemainMatch(t)),
        0 < e.remainValueRanges.length && (i = !0,
            t = this.getRemainRange(t)),
        0 < e.transformNumbers.length && (i = !0,
            t = this.getTransform(t)),
        0 < e.upperNumbers.length && 0 == e.positionType && (i = !0,
            t = this.getUpper(t)),
        0 < e.exceptNumbers.length && (i = !0,
            t = this.getExcept(t)),
        -1 != this.common.indexOf(e.symbolPositions, 1) && (i = !0,
            t = this.getSymbol(t)),
        0 < e.containNumbers.length && (i = !0,
            t = this.getContain(t)),
        0 < e.multipleNumbers.length && (i = !0,
            t = this.getMultiple(t)),
        -1 != e.repeatTwoWordsFilter && (i = !0,
            t = this.getRepeatTwoWords(t)),
        -1 != e.repeatThreeWordsFilter && (i = !0,
            t = this.getRepeatThreeWords(t)),
        -1 != e.repeatFourWordsFilter && (i = !0,
            t = this.getRepeatFourWords(t)),
        -1 != e.repeatDoubleWordsFilter && (i = !0,
            t = this.getRepeatDoubleWords(t)),
        -1 != e.twoBrotherFilter && (i = !0,
            t = this.getTwoBrother(t)),
        -1 != e.threeBrotherFilter && (i = !0,
            t = this.getThreeBrother(t)),
        -1 != e.fourBrotherFilter && (i = !0,
            t = this.getFourBrother(t)),
        -1 != e.logarithmNumberFilter && (i = !0,
            t = this.getLogarithm(t)),
        -1 != e.oddNumberFilter && -1 != this.common.indexOf(e.oddNumberPositions, 1) && (i = !0,
            t = this.getOdd(t)),
        -1 != e.evenNumberFilter && -1 != this.common.indexOf(e.evenNumberPositions, 1) && (i = !0,
            t = this.getEven(t)),
            -1 != e.bigNumberFilter && -1 != this.common.indexOf(e.bigNumberPositions, 1) && (i = !0),
                -1 != e.smallNumberFilter && -1 != this.common.indexOf(e.smallNumberPositions, 1) && (i = !0),
        1 != e.positionType || 21 == e.numberType || 31 == e.numberType || 41 == e.numberType || e.firstNumber || e.secondNumber || e.thirdNumber || e.fourthNumber || e.fifthNumber || (i = !1),
        this.onCompleted && "function" == typeof this.onCompleted && (i ? (this.numberList = t.sort(),
            this.onCompleted(t)) : this.onError && "function" == typeof this.onError && this.onError()),
        this.onLog && "function" == typeof this.onLog && this.onLog(this.log())
    // console.log("选择的内容：",e)
},
    CodeMaker.prototype.reset = function () {
        this.logs = [],
            this.numberList = [],
            this.options.firstNumber = "",
            this.options.secondNumber = "",
            this.options.thirdNumber = "",
            this.options.fourthNumber = "",
            this.options.fifthNumber = "",
            this.options.positionFilter = 0,
            this.options.remainFixedFilter = 0,
            this.options.remainFixedNumbers = [[[], []]],
            this.options.remainMatchFilter = 0,
            this.options.remainMatchNumbers = [],
            this.options.remainValueRanges = [],
            this.options.transformNumbers = [],
            this.options.upperNumbers = [],
            this.options.exceptNumbers = [],
            this.options.symbolPositions = [],
            this.options.containFilter = 0,
            this.options.containNumbers = [],
            this.options.multipleFilter = 0,
            this.options.multipleNumbers = [],
            this.options.repeatTwoWordsFilter = -1,
            this.options.repeatThreeWordsFilter = -1,
            this.options.repeatFourWordsFilter = -1,
            this.options.repeatDoubleWordsFilter = -1,
            this.options.twoBrotherFilter = -1,
            this.options.threeBrotherFilter = -1,
            this.options.fourBrotherFilter = -1,
            this.options.logarithmNumberFilter = -1,
            this.options.logarithmNumbers = [[]],
            this.options.oddNumberFilter = -1,
            this.options.oddNumberPositions = [],
            this.options.evenNumberFilter = -1,
            this.options.evenNumberPositions = [],
            this.options.bigNumberFilter = -1,
            this.options.bigNumberPositions = [],
           this.options.smallNumberFilter = -1,
            this.options.smallNumberPositions = [],
            20 == this.options.numberType || 30 == this.options.numberType || 40 == this.options.numberType || 50 == this.options.numberType ? this.options.positionType = 0 : this.options.positionType = 1,
            this.onReset && "function" == typeof this.onReset && this.onReset()
    }
    ,
    CodeMaker.prototype.choose = function () {
        var t = this.options;
        switch (arguments[0]) {
            case 20:
                t.numberType = 20,
                    t.positionType = 0,
                    t.isXian = 0;
                break;
            case 30:
                t.numberType = 30,
                    t.positionType = 0,
                    t.isXian = 0;
                break;
            case 40:
                t.numberType = 40,
                    t.positionType = 0,
                    t.isXian = 0;
                break;
            case 21:
                t.numberType = 21,
                    t.positionType = 1,
                    t.isXian = 1;
                break;
            case 31:
                t.numberType = 31,
                    t.positionType = 1,
                    t.isXian = 1;
                break;
            case 41:
                t.numberType = 41,
                    t.positionType = 1,
                    t.isXian = 1;
                break;
            case 50:
                t.numberType = 50,
                    t.positionType = 0,
                    t.isXian = 0
        }
    }
    ,
    CodeMaker.prototype.log = function () {
        var t = []
            , e = this.common
            , i = this.options;
        switch (i.numberType) {
            case 20:
                t.push("[二定位]");
                break;
            case 30:
                t.push("[三定位]");
                break;
            case 40:
                t.push("[四定位]");
                break;
            case 21:
                t.push("[二字现]");
                break;
            case 31:
                t.push("[三字现]");
                break;
            case 41:
                t.push("[四字现]");
                break;
            case 50:
                t.push("[五位二定]")
        }
        if ((0 < i.firstNumber.length || 0 < i.secondNumber.length || 0 < i.thirdNumber.length || 0 < i.fourthNumber.length || 0 < i.fifthNumber.length) && (o = "",
            0 == i.positionType ? (0 < i.firstNumber.length && (o += "千=[" + i.firstNumber + "]"),
                0 < i.secondNumber.length && (0 < o.length && (o += "，"),
                    o += "百=[" + i.secondNumber + "]"),
                0 < i.thirdNumber.length && (0 < o.length && (o += "，"),
                    o += "十=[" + i.thirdNumber + "]"),
                0 < i.fourthNumber.length && (0 < o.length && (o += "，"),
                    o += "个=[" + i.fourthNumber + "]"),
                0 < i.fifthNumber.length && (0 < o.length && (o += "，"),
                    o += "五=[" + i.fifthNumber + "]"),
                0 == i.positionFilter ? t.push("定位置“[取]”：" + o) : t.push("定位置“[除]”：" + o)) : (0 < i.firstNumber.length && (o += "第1位：[" + i.firstNumber + "]"),
                    0 < i.secondNumber.length && (0 < o.length && (o += "，"),
                        o += "第2位：[" + i.secondNumber + "]"),
                    0 < i.thirdNumber.length && (0 < o.length && (o += "，"),
                        o += "第3位：[" + i.thirdNumber + "]"),
                    0 < i.fourthNumber.length && (0 < o.length && (o += "，"),
                        o += "第" + (h = 50 == i.numberType ? 1 : 4) + "位：[" + i.fourthNumber + "]"),
                    0 < i.fifthNumber.length && (0 < o.length && (o += "，"),
                        o += "第" + (h = 50 == i.numberType ? 2 : 5) + "位：[" + i.fifthNumber + "]"),
                    0 == i.positionFilter ? t.push("配数“[取]”：" + o) : t.push("配数“[除]”：" + o))),
            0 < i.remainFixedNumbers.length) {
            for (var n = i.remainFixedNumbers, r = "", o = 0 == i.remainFixedFilter ? "取" : "除", s = 0; s < n.length; s++)
                if (e.isArray(n[s][0]) && e.isArray(n[s][1]) && 0 < n[s][1].length && -1 != e.indexOf(n[s][0], 1)) {
                    for (var a = 0; a < n[s][0].length; a++)
                        1 == n[s][0][a] && (r += "第[" + (a + 1) + "]位选中，");
                    r += "内容：[" + n[s][1].join("") + "]；"
                }
            t.push("固定合分" + o + "值：" + r)
        }
        if (0 < i.remainMatchNumbers.length && t.push("不定合分值：[" + i.remainMatchNumbers.join("") + "]"),
            0 < i.remainValueRanges.length && t.push("合分值范围：[" + i.remainValueRanges.join("") + "]"),
            0 < i.transformNumbers.length && t.push("全转值：[" + i.transformNumbers.join("") + "]"),
            0 < i.upperNumbers.length && t.push("上奖值：[" + i.upperNumbers.join("") + "]"),
            0 < i.exceptNumbers.length && t.push("排除值：[" + i.exceptNumbers.join("") + "]"),
            -1 != e.indexOf(i.symbolPositions, 1)) {
            for (var l = "", u = i.symbolPositions, h = 0; h < u.length; h++)
                1 == u[h] && (0 == l.length ? l = "第[" + (h + 1) + "]位" : l += "，第[" + (h + 1) + "]位");
            t.push("乘号位置：" + l)
        }
        if (-1 != e.indexOf(i.fixedPositions, 1)) {
            for (var d = "", c = i.fixedPositions, h = 0; h < c.length; h++)
                1 == c[h] && (0 == d.length ? d = "第[" + (h + 1) + "]位" : d += "，第[" + (h + 1) + "]位");
            t.push("固定位置：" + d)
        }
        if (0 < i.containNumbers.length && (0 == i.containFilter ? t.push("包含“[取]”值：[" + i.containNumbers.join("") + "]") : t.push("包含“[除]”值：[" + i.containNumbers.join("") + "]")),
            0 < i.multipleNumbers.length && (0 == i.multipleFilter ? t.push("复式“[取]”值：[" + i.multipleNumbers.join("") + "]") : t.push("复式“[除]”值：[" + i.multipleNumbers.join("") + "]")),
            -1 != i.repeatTwoWordsFilter && (0 == i.repeatTwoWordsFilter ? t.push("双重“[取]”操作") : t.push("双重“[除]”操作")),
            -1 != i.repeatDoubleWordsFilter && (0 == i.repeatDoubleWordsFilter ? t.push("双双重“[取]”操作") : t.push("双双重“[除]”操作")),
            -1 != i.repeatThreeWordsFilter && (0 == i.repeatThreeWordsFilter ? t.push("三重“[取]”操作") : t.push("三重“[除]”操作")),
            -1 != i.repeatFourWordsFilter && (0 == i.repeatFourWordsFilter ? t.push("四重“[取]”操作") : t.push("四重“[除]”操作")),
            -1 != i.twoBrotherFilter && (0 == i.twoBrotherFilter ? t.push("二兄弟“[取]”操作") : t.push("二兄弟“[除]”操作")),
            -1 != i.threeBrotherFilter && (0 == i.threeBrotherFilter ? t.push("三兄弟“[取]”操作") : t.push("三兄弟“[除]”操作")),
            -1 != i.fourBrotherFilter && (0 == i.fourBrotherFilter ? t.push("四兄弟“[取]”操作") : t.push("四兄弟“[除]”操作")),
            0 < i.logarithmNumbers.length) {
            for (var p = "", m = 0; m < i.logarithmNumbers.length; m++)
                p += "[" + i.logarithmNumbers[m].join("") + "]，";
            i.logarithmNumberFilter <= 0 ? t.push("对数“[取]”值：" + p) : 1 == i.logarithmNumberFilter && t.push("对数“[除]”值：" + p)
        } else
            0 == i.logarithmNumberFilter ? t.push("对数“[取]”操作") : 1 == i.logarithmNumberFilter && t.push("对数“[除]”操作");
        if (-1 != i.oddNumberFilter) {
            for (var f = "", g = i.oddNumberPositions, b = 0; b < g.length; b++)
                1 == g[b] && (0 == f.length ? f = "第[" + (b + 1) + "]位" : f += "，第[" + (b + 1) + "]位");
            0 == i.oddNumberFilter ? t.push("单数“[取]”值：" + f) : t.push("单数“[除]”值：" + f)
        }
        if (-1 != i.evenNumberFilter) {
            for (var v = "", y = i.evenNumberPositions, x = 0; x < y.length; x++)
                1 == y[x] && (0 == v.length ? v = "第[" + (x + 1) + "]位" : v += "，第[" + (x + 1) + "]位");
            0 == i.evenNumberFilter ? t.push("双数“[取]”值：" + v) : t.push("双数“[除]”值：" + v)
        }
        return this.logs = t
    }
    ,
    CodeMaker.prototype.maker = function () {
        var t = []
            , e = []
            , i = !1
            , n = this.common
            , r = this.options
            , o = r.symbol
            , s = r.numberType
            , a = r.positionType
            , l = [r.firstNumber.split(""), r.secondNumber.split(""), r.thirdNumber.split(""), r.fourthNumber.split(""), r.fifthNumber.split("")];
        0 < arguments.length && (i = arguments[0]);
        for (var u = 0; u < l.length; u++)
            (l[u].length <= 0 || i) && (l[u] = n.defaultNumber.split(""));
        if (20 == r.numberType || 21 == r.numberType)
            e = this.common.discart(l[0], l[1]);
        else if (30 == r.numberType || 31 == r.numberType)
            e = this.common.discart(l[0], l[1], l[2]);
        else if (40 == r.numberType || 41 == r.numberType)
            e = this.common.discart(l[0], l[1], l[2], l[3]);
        else if (50 == r.numberType) {
            for (var h = "", u = 0; u < l.length - 1; u++)
                0 < l[u].length && (h = l[u]);
            h.length <= 0 && (h = n.defaultNumber.split("")),
                e = this.common.discart(h, l[4])
        }
        for (var d = 0; d < e.length; d++) {
            var c = e[d];
            20 == s ? 1 == a ? (t.push(c[0] + "" + c[1] + o + o),
                t.push(c[1] + "" + c[0] + o + o),
                t.push(c[0] + "" + o + c[1] + o),
                t.push(c[1] + "" + o + c[0] + o),
                t.push(c[0] + "" + o + o + c[1]),
                t.push(c[1] + "" + o + o + c[0]),
                t.push(o + "" + c[1] + o + c[0]),
                t.push(o + "" + c[0] + o + c[1]),
                t.push(o + "" + c[1] + c[0] + o),
                t.push(o + "" + c[0] + c[1] + o),
                t.push(o + "" + o + c[1] + c[0]),
                t.push(o + "" + o + c[0] + c[1])) : (t.push(c[0] + "" + c[1] + o + o),
                    t.push(c[0] + "" + o + c[1] + o),
                    t.push(c[0] + "" + o + o + c[1]),
                    t.push(o + "" + c[1] + o + c[0]),
                    t.push(o + "" + c[1] + c[0] + o),
                    t.push(o + "" + o + c[1] + c[0])) : 30 == s ? 1 == a ? (t.push(c[0] + "" + c[1] + c[2] + o),
                        t.push(c[0] + "" + c[2] + c[1] + o),
                        t.push(c[1] + "" + c[0] + c[2] + o),
                        t.push(c[1] + "" + c[2] + c[0] + o),
                        t.push(c[2] + "" + c[0] + c[1] + o),
                        t.push(c[2] + "" + c[1] + c[0] + o),
                        t.push(c[0] + "" + c[1] + o + c[2]),
                        t.push(c[0] + "" + c[2] + o + c[1]),
                        t.push(c[1] + "" + c[0] + o + c[2]),
                        t.push(c[1] + "" + c[2] + o + c[0]),
                        t.push(c[2] + "" + c[1] + o + c[0]),
                        t.push(c[2] + "" + c[0] + o + c[1]),
                        t.push(c[0] + "" + o + c[1] + c[2]),
                        t.push(c[0] + "" + o + c[2] + c[1]),
                        t.push(c[1] + "" + o + c[0] + c[2]),
                        t.push(c[1] + "" + o + c[2] + c[0]),
                        t.push(c[2] + "" + o + c[1] + c[0]),
                        t.push(c[2] + "" + o + c[0] + c[1]),
                        t.push(o + "" + c[0] + c[1] + c[2]),
                        t.push(o + "" + c[0] + c[2] + c[1]),
                        t.push(o + "" + c[1] + c[0] + c[2]),
                        t.push(o + "" + c[1] + c[2] + c[0]),
                        t.push(o + "" + c[2] + c[1] + c[0]),
                        t.push(o + "" + c[2] + c[0] + c[1])) : (t.push(c[0] + "" + c[1] + c[2] + o),
                            t.push(c[0] + "" + c[1] + o + c[2]),
                            t.push(c[0] + "" + o + c[1] + c[2]),
                            t.push(o + "" + c[0] + c[1] + c[2])) : 40 == s ? 1 == a ? (t.push(c[0] + "" + c[1] + c[2] + c[3]),
                                t.push(c[0] + "" + c[1] + c[3] + c[2]),
                                t.push(c[0] + "" + c[2] + c[1] + c[3]),
                                t.push(c[0] + "" + c[2] + c[3] + c[1]),
                                t.push(c[0] + "" + c[3] + c[2] + c[1]),
                                t.push(c[0] + "" + c[3] + c[1] + c[2]),
                                t.push(c[1] + "" + c[0] + c[2] + c[3]),
                                t.push(c[1] + "" + c[0] + c[3] + c[2]),
                                t.push(c[1] + "" + c[2] + c[0] + c[3]),
                                t.push(c[1] + "" + c[2] + c[3] + c[0]),
                                t.push(c[1] + "" + c[3] + c[0] + c[2]),
                                t.push(c[1] + "" + c[3] + c[2] + c[0]),
                                t.push(c[2] + "" + c[0] + c[1] + c[3]),
                                t.push(c[2] + "" + c[0] + c[3] + c[1]),
                                t.push(c[2] + "" + c[1] + c[0] + c[3]),
                                t.push(c[2] + "" + c[1] + c[3] + c[0]),
                                t.push(c[2] + "" + c[3] + c[0] + c[1]),
                                t.push(c[2] + "" + c[3] + c[1] + c[0]),
                                t.push(c[3] + "" + c[0] + c[1] + c[2]),
                                t.push(c[3] + "" + c[0] + c[2] + c[1]),
                                t.push(c[3] + "" + c[1] + c[0] + c[2]),
                                t.push(c[3] + "" + c[1] + c[2] + c[0]),
                                t.push(c[3] + "" + c[2] + c[0] + c[1]),
                                t.push(c[3] + "" + c[2] + c[1] + c[0])) : t.push(c.join("")) : 50 == s ? 1 == a ? (t.push(c[0] + "" + o + o + o + c[1]),
                                    t.push(c[1] + "" + o + o + o + c[0]),
                                    t.push(o + "" + c[0] + o + o + c[1]),
                                    t.push(o + "" + c[1] + o + o + c[0]),
                                    t.push(o + "" + o + c[0] + o + c[1]),
                                    t.push(o + "" + o + c[1] + o + c[0]),
                                    t.push(o + "" + o + o + c[0] + c[1]),
                                    t.push(o + "" + o + o + c[1] + c[0])) : (t.push(c[0] + "" + o + o + o + c[1]),
                                        t.push(o + "" + c[0] + o + o + c[1]),
                                        t.push(o + "" + o + c[0] + o + c[1]),
                                        t.push(o + "" + o + o + c[0] + c[1])) : t.push(c.sort().join(""))
        }
        return n.unique(t)
    }
    ,
    CodeMaker.prototype.fixedFilter = function () {
        var t = []
            , e = arguments[0]
            , i = this.options.symbol
            , n = this.options.numberType;
        return 20 == n ? (t.push(e[0] + "" + e[1] + i + i),
            t.push(e[0] + "" + i + e[1] + i),
            t.push(e[0] + "" + i + i + e[1]),
            t.push(i + "" + e[1] + i + e[0]),
            t.push(i + "" + e[1] + e[0] + i),
            t.push(i + "" + i + e[1] + e[0])) : 30 == n ? (t.push(e[0] + "" + e[1] + e[2] + i),
                t.push(e[0] + "" + e[1] + i + e[2]),
                t.push(e[0] + "" + i + e[1] + e[2]),
                t.push(i + "" + e[0] + e[1] + e[2])) : 40 == n ? t.push(e.join("")) : 50 == n ? (t.push(e[0] + "" + i + i + i + e[1]),
                    t.push(i + "" + e[0] + i + i + e[1]),
                    t.push(i + "" + i + e[0] + i + e[1]),
                    t.push(i + "" + i + i + e[0] + e[1])) : t.push(e.sort().join("")),
            t
    }
    ,
    CodeMaker.prototype.matchFilter = function () {
        for (var t = [], e = [], i = this.common, n = this.options, r = n.symbol, o = this.options.numberType, s = arguments[0], a = 0; a < s.length; a++)
            s[a].length <= 0 && (s[a] = i.defaultNumber.split(""));
        20 == n.numberType ? e = this.common.discart(s[0], s[1]) : 30 == n.numberType ? e = this.common.discart(s[0], s[1], s[2]) : 40 == n.numberType ? e = this.common.discart(s[0], s[1], s[2], s[3]) : 50 == n.numberType && (e = this.common.discart(s[0], s[1]));
        for (var l = 0; l < e.length; l++) {
            var u = e[l];
            20 == o ? (t.push(u[0] + "" + u[1] + r + r),
                t.push(u[1] + "" + u[0] + r + r),
                t.push(u[0] + "" + r + u[1] + r),
                t.push(u[1] + "" + r + u[0] + r),
                t.push(u[0] + "" + r + r + u[1]),
                t.push(u[1] + "" + r + r + u[0]),
                t.push(r + "" + u[1] + r + u[0]),
                t.push(r + "" + u[0] + r + u[1]),
                t.push(r + "" + u[1] + u[0] + r),
                t.push(r + "" + u[0] + u[1] + r),
                t.push(r + "" + r + u[1] + u[0]),
                t.push(r + "" + r + u[0] + u[1])) : 30 == o ? (t.push(u[0] + "" + u[1] + u[2] + r),
                    t.push(u[0] + "" + u[2] + u[1] + r),
                    t.push(u[1] + "" + u[0] + u[2] + r),
                    t.push(u[1] + "" + u[2] + u[0] + r),
                    t.push(u[2] + "" + u[0] + u[1] + r),
                    t.push(u[2] + "" + u[1] + u[0] + r),
                    t.push(u[0] + "" + u[1] + r + u[2]),
                    t.push(u[0] + "" + u[2] + r + u[1]),
                    t.push(u[1] + "" + u[0] + r + u[2]),
                    t.push(u[1] + "" + u[2] + r + u[0]),
                    t.push(u[2] + "" + u[1] + r + u[0]),
                    t.push(u[2] + "" + u[0] + r + u[1]),
                    t.push(u[0] + "" + r + u[1] + u[2]),
                    t.push(u[0] + "" + r + u[2] + u[1]),
                    t.push(u[1] + "" + r + u[0] + u[2]),
                    t.push(u[1] + "" + r + u[2] + u[0]),
                    t.push(u[2] + "" + r + u[1] + u[0]),
                    t.push(u[2] + "" + r + u[0] + u[1]),
                    t.push(r + "" + u[0] + u[1] + u[2]),
                    t.push(r + "" + u[0] + u[2] + u[1]),
                    t.push(r + "" + u[1] + u[0] + u[2]),
                    t.push(r + "" + u[1] + u[2] + u[0]),
                    t.push(r + "" + u[2] + u[1] + u[0]),
                    t.push(r + "" + u[2] + u[0] + u[1])) : 40 == o ? (t.push(u[0] + "" + u[1] + u[2] + u[3]),
                        t.push(u[0] + "" + u[1] + u[3] + u[2]),
                        t.push(u[0] + "" + u[2] + u[1] + u[3]),
                        t.push(u[0] + "" + u[2] + u[3] + u[1]),
                        t.push(u[0] + "" + u[3] + u[2] + u[1]),
                        t.push(u[0] + "" + u[3] + u[1] + u[2]),
                        t.push(u[1] + "" + u[0] + u[2] + u[3]),
                        t.push(u[1] + "" + u[0] + u[3] + u[2]),
                        t.push(u[1] + "" + u[2] + u[0] + u[3]),
                        t.push(u[1] + "" + u[2] + u[3] + u[0]),
                        t.push(u[1] + "" + u[3] + u[0] + u[2]),
                        t.push(u[1] + "" + u[3] + u[2] + u[0]),
                        t.push(u[2] + "" + u[0] + u[1] + u[3]),
                        t.push(u[2] + "" + u[0] + u[3] + u[1]),
                        t.push(u[2] + "" + u[1] + u[0] + u[3]),
                        t.push(u[2] + "" + u[1] + u[3] + u[0]),
                        t.push(u[2] + "" + u[3] + u[0] + u[1]),
                        t.push(u[2] + "" + u[3] + u[1] + u[0]),
                        t.push(u[3] + "" + u[0] + u[1] + u[2]),
                        t.push(u[3] + "" + u[0] + u[2] + u[1]),
                        t.push(u[3] + "" + u[1] + u[0] + u[2]),
                        t.push(u[3] + "" + u[1] + u[2] + u[0]),
                        t.push(u[3] + "" + u[2] + u[0] + u[1]),
                        t.push(u[3] + "" + u[2] + u[1] + u[0])) : 50 == o ? (t.push(u[0] + "" + r + r + r + u[1]),
                            t.push(u[1] + "" + r + r + r + u[0]),
                            t.push(r + "" + u[0] + r + r + u[1]),
                            t.push(r + "" + u[1] + r + r + u[0]),
                            t.push(r + "" + r + u[0] + r + u[1]),
                            t.push(r + "" + r + u[1] + r + u[0]),
                            t.push(r + "" + r + r + u[0] + u[1]),
                            t.push(r + "" + r + r + u[1] + u[0])) : t.push(u.sort().join(""))
        }
        return t
    }
    ,
    CodeMaker.prototype.common = {
        defaultNumber: "0123456789",
        isArray: function (t) {
            return "[object Array]" === Object.prototype.toString.call(t)
        },
        charCount: function (t) {
            var i = 0;
            return t.replace(/[xX]/g, function (t, e) {
                i++
            }),
                i
        },
        indexOf: function (t, e) {
            if (this.isArray(t)) {
                for (var i = 0; i < t.length; i++)
                    if (t[i] == e)
                        return i;
                return -1
            }
            return t.indexOf(e)
        },
        emptyCount: function (t) {
            var e = 0
                , i = [t.firstNumber, t.secondNumber, t.thirdNumber, t.fourthNumber];
            50 == t.numberType && i.push(t.fifthNumber);
            for (var n = 0; n < i.length; n++)
                0 == i[n].length && e++;
            return e
        },
        unique: function (t) {
            for (var e = {}, i = [], n = 0; n < t.length; n++)
                e[t[n]] || (e[t[n]] = 1,
                    i.push(t[n]));
            return i
        },
        combination: function (t, e) {
            var o = [];
            return function s(t, e, i) {
                if (0 == i)
                    return o.push(t);
                for (var n = 0, r = e.length; n <= r - i; n++)
                    s(t.concat(e[n]), e.slice(n + 1), i - 1)
            }([], t, e),
                o
        },
        permutation: function (t, e) {
            var o = [];
            return function s(t, e, i) {
                if (0 == i)
                    return o.push(t);
                for (var n = 0, r = e.length; n < r; n++)
                    s(t.concat(e[n]), e.slice(0, n).concat(e.slice(n + 1)), i - 1)
            }([], t, e),
                o
        },
        discart: function Discart() {
            for (var s = [], t = 0; t < arguments.length; t++)
                s.push(arguments[t]);
            var a = s.length - 1
                , l = [];
            return s.length ? function u(t, e) {
                for (var i = s[e], n = e === a, r = 0; r < i.length; ++r) {
                    t instanceof Array || (t = [t]);
                    var o = t.slice();
                    o.push(i[r]),
                        n ? l.push(o) : u(o, e + 1)
                }
            }([], 0) : l.push([]),
                l
        }
    },
    window.console || (window.console = {
        log: function () { }
    }),
    $.support.boxSizing || document.execCommand("BackgroundImageCache", !1, !0),
    function (i, a) {
        a(i);
        var l, r = a(document), n = !a.support.clearCloneStyle, u = /#include\s+([a-zA-Z0-9_\-\/]+)/g, h = /#template\s+([a-zA-Z0-9_-]+)/, o = {};
        function s(t, e) {
            t = t || {},
                this.template = null,
                this.jsondata = {
                    Status: 1,
                    Data: {}
                },
                this.bd = t.bd || null,
                this.timer_html = null,
                this.timer_bind = null,
                this.success = t.success || null,
                this.renderSuccess = t.renderSuccess || null,
                this.compile = t.compile || null,
                this.loadid = e,
                this.flag = 0,
                this.loadcount = 2,
                this.hash = t.hash,
                this.loadPage(t, e)
        }
        a.ajaxPrefilter(function (t, e, n) {
            var r = t.url + t.data;
            function i() {
                o[r] = {
                    count: 1,
                    timeStart: a.now(),
                    xhr: n
                };
                var i = t.complete;
                t.complete = function (t, e) {
                    delete o[r],
                        a.isFunction(i) && i.call(this, t, e)
                }
            }
            o[r] ? 1e3 < a.now() - o[r].timeStart ? (o[r].xhr.abort(),
                delete o[r],
                i()) : (o[r].count++,
                    3 == o[r].count && a.alert("您的操作过于频繁，请稍后再试"),
                    n.abort()) : i()
        }),
            a.ajaxSetup({
                global: !1,
                cache: !1
            }),
            s.prototype.loadPage = function (t, e) {
                t = t || {},
                    this.getHTML(t),
                    this.getJSON(t, e)
            }
            ,
            s.prototype.render = function (t) {
                n && (t = t.replace(/\/td>\s+<td/g, "/td><td"));
                var e = this;
                this.success ? this.success(t, this.jsondata) : (this.unbind(this.bd),
                    this.bd.html(t),
                    this.renderSuccess && this.renderSuccess(this.jsondata)),
                    this.timer_bind = setTimeout(function () {
                        e.bind(e.bd, e.jsondata),
                            e.destroy()
                    }, 0),
                    p.iclick && this.hash && r.triggerHandler("setHash")
            }
            ,
            s.prototype.destroy = function () {
                this.timer_bind && clearTimeout(this.timer_bind),
                    this.template = null,
                    this.bd = null,
                    this.timer_html = null,
                    this.timer_bind = null,
                    this.flag = null,
                    this.loadcount = null,
                    p[this.loadid] = null,
                    delete p[this.loadid],
                    this.success = null,
                    this.renderSuccess = null,
                    this.compile = null,
                    this.hash = null
            }
            ,
            s.prototype.getHTML = function (e) {
                var t, i = this;
                if (/<\w+.*?>/.test(e.html))
                    return this.template = e.html,
                        this.flag += 1,
                        void this.flashHTML(e);
                e.html || e.module,
                    t = /^\/.*/.test(e.html) ? e.html : e.html ? p.map[e.module].html[e.html] : p.map[e.module].html[e.module],
                    p.html[e.module + (e.html ? "." + e.html : "")] ? (this.template = p.html[e.module + (e.html ? "." + e.html : "")],
                        this.flag += 1,
                        this.flashHTML(e)) : p.util.getHTML({
                            url: t,
                            success: function (t) {
                                i.template = p.html[e.module + (e.html ? "." + e.html : "")] = t,
                                    i.flag += 1,
                                    e.hash && e.hash != p.util.getHash() && e.hash != p.tmp_hash || i.flashHTML(e, i.jsondata)
                            },
                            error: function () { }
                        })
            }
            ,
            s.prototype.getJSON = function (e, t) {
                var i = this;
                if (jsonurl = /^\/.+/.test(e.json) ? e.json : e.json ? p.map[e.module].json[e.json] : e.module && !e.html ? p.map[e.module].json[e.module] : null,
                    !jsonurl)
                    return this.flag += 1,
                        void this.flashHTML(e);
                p.get({
                    scope: e.scope,
                    url: jsonurl,
                    data: e.param,
                    success: function (t) {
                        i.flag += 1,
                            i.jsondata = t,
                            e.jsonSuccess ? i.jsondata = e.jsonSuccess(t) || t : p.map[e.module] && p.map[e.module].format && p.map[e.module].format[e.html || e.module] && (i.jsondata = p.map[e.module].format[e.html || e.module](t) || t),
                            e.hash && e.hash != p.util.getHash() && e.hash != p.tmp_hash || i.flashHTML(e)
                    },
                    error: function () {
                        e.jsonError && e.jsonError()
                    },
                    bussiness: e.bussiness
                })
            }
            ,
            s.prototype.flashHTML = function (o) {
                var t, e, i, s, a = this;
                if (!(this.flag < this.loadcount)) {
                    var n, r = "";
                    if (u.test(this.template)) {
                        for (t = this.template.match(u),
                            this.loadcount += t.length,
                            e = 0,
                            i = t.length; e < i; e++)
                            s = t[e].split(/\s+/)[1],
                                function () {
                                    var i, e = s, n = "", r = new RegExp("#include\\s+" + s);
                                    p.html[e] ? (n = p.html[e],
                                        a.template = a.template.replace(r, n),
                                        n = null,
                                        a.flag++,
                                        a.flashHTML(o)) : i = p.util.getHTML({
                                            url: "/Htmls/" + e + ".html",
                                            timeout: 5e3,
                                            success: function (t) {
                                                p.html[e] = n = t
                                            },
                                            complete: function (t, e) {
                                                "timeout" == e && i.abort(),
                                                    a.template = a.template.replace(r, n),
                                                    n = null,
                                                    a.flag++,
                                                    a.flashHTML(o)
                                            }
                                        })
                                }();
                        return !1
                    }
                    for (; h.test(this.template);)
                        l = this.template.match(h)[1],
                            l = (l = this.template.match(new RegExp("<script.*id=['\"]" + l + "['\"][^>]*?>([\\s\\S]*?)<\\/script>"))) && l[1] ? l[1] : "",
                            this.template = this.template.replace(h, l);
                    this.template = this.template.replace(new RegExp("<script[^>]*?>[\\s\\S]*?<\\/script>", "ig"), function (t) {
                        return r += t,
                            ""
                    }),
                        this.jsondata.Param = o.param || {},
                        this.jsondata.OpenStatus = OPEN_STATUS,
                        this.jsondata.LotteryType = LOTTERY_TYPE,
                        this.jsondata.LotteryTypeName = LOTTERY_TYPE_NAME,
                        this.jsondata.PeriodTemplate = PERIOD_TEMPLATE,
                        // this.jsondata.CdnUrl = "CDN_URL",
                        // this.jsondata.CdnUrl = "CDN_URL",
                        // this.jsondata.IsIntegrationLogin = IS_INTEGRATION_LOGIN,
                        // this.jsondata.EnableStrongPwd = ENABLE_STRONG_PWD,
                        n = p.util.compile(this.template, this.jsondata),
                        n += r,
                        this.render(n),
                        r = null
                }
            }
            ,
            s.prototype.bind = function (t, e) {
                t && t.length && a("div[name=module]", t).each(function () {
                    a("input[autofocus]", this).focus();
                    var t = this.id;
                    p.modules[t] && !p.instance[t] && (this.json = e || {},
                        p.instance[t] = new p.modules[t](this),
                        p.instance[t].init && p.instance[t].init())
                })
            }
            ;
        var d, c, p = {
            html: {},
            instance: {},
            modules: {},
            dialog: [],
            iclick: !(s.prototype.unbind = function (t) {
                t && t.length && a("div[name=module]", t).each(function () {
                    var t = this.id;
                    p.instance[t] && (p.instance[t].destroy && p.instance[t].destroy(),
                        this.json = null,
                        p.util.destroy(p.instance[t]),
                        p.instance[t] = null,
                        delete p.instance[t])
                })
            }
            ),
            tmp_hash: ""
        };
        p.util = {
            compile: function (t, e) {
                return template.compile(t)(e)
            },
            load: function (t) {
                var e = a.now();
                p[e] = new s(t, e)
            },
            close: function (t) {
                if (t)
                    r.triggerHandler("dialog", [t, "close"]);
                else
                    for (var e in p.dialog)
                        r.triggerHandler("dialog", [e, "close"])
            },
            destroy: function (t) {
                var e, i = t.d, n = t.dom;
                if (i && (i = t.d.attr("id"),
                    t.d.off(),
                    r.off("." + i)),
                    n)
                    for (e in n)
                        n[e].off(),
                            n[e] = null,
                            delete n[e]
            },
            getHTML: function (i) {
                return a.ajax({
                    url: i.url + "?v=" + VERSION,
                    timeout: i.timeout,
                    dataType: "html",
                    cache: i.cache || !0,
                    success: function (t) {
                        i.success && i.success(t)
                    },
                    error: function () {
                        i.error && i.error()
                    },
                    complete: function (t, e) {
                        i.complete && i.complete(t, e)
                    }
                })
            },
            getDate: function (t) {
                var e;
                return t && a.isNumeric(t) || (t = a.now()),
                    (e = new Date(t)).getFullYear() + "-" + (t = (t = e.getMonth() + 1) < 10 ? "0" + t : t) + "-" + (e = (e = e.getDate()) < 10 ? "0" + e : e)
            },
            guid: function () {
                for (var t = [], e = "0123456789abcdef", i = 0; i < 36; i++)
                    t[i] = e.substr(Math.floor(16 * Math.random()), 1);
                return t[14] = "4",
                    t[19] = e.substr(3 & t[19] | 8, 1),
                    t[8] = t[13] = t[18] = t[23] = "-",
                    t.join("")
            },
            tip: function (t) {
                t = t || "操作成功",
                    p.tipTimer && clearTimeout(p.tipTimer),
                    p.cache.tip || (p.cache.tip = a("<div class='g-tip hide'></div>").appendTo(p.instance.header.d)),
                    p.cache.tip.html(t).stop().fadeIn(),
                    p.tipTimer = setTimeout(function () {
                        p.cache.tip.fadeOut()
                    }, 3e3)
            },
            formatSeconds: function (t) {
                var e = parseInt(t / 60)
                    , t = t % 60;
                return (e = e < 10 ? "0" + e : e) + ":" + (t = t < 10 ? "0" + t : t)
            },
            format_thousands: function (t) {
                for (var e = (t = (t + "").split("."))[0]; /\d{4}/.test(e);)
                    e = e.replace(/(\d+)(\d{3})/, "$1,$2");
                return e + (t[1] ? "." + t[1] : "")
            },
            format_print_number: function (t) {
                for (var e = (t = (t + "").split("."))[0]; /\d{4}/.test(e);)
                    e = e.replace(/(\d+)(\d{3})/, "$1,$2");
                return e + (t[1] ? "." + t[1] : "")
            },
            format_number: function (t) {
                return t = (/\.[0-9][1-9]\d+$/.test(t += "") ? parseFloat(t, 10) : parseFloat(t)).toFixed(0),
                    t = p.util.format_thousands(t)
            },
            input_format: function (t, e) {
                var i = e.target;
                t.on("keyup", function (t) {
                    t = t.keyCode;
                    (48 <= t && t <= 57 || 96 <= t && t <= 105 || 189 == t || 109 == t || 8 == t || 46 == t) && (this.value = p.util.format_thousands(this.value.replace(/\,/g, "")),
                        i.val(this.value.replace(/\,/g, "")))
                }).on("blur", function () {
                    i.val(this.value.replace(/\,/g, ""))
                })
            },
            setCookie: function (t, e) {
                var i = new Date;
                i.setTime(i.getTime() + 2592e6),
                    document.cookie = t + "=" + escape(e) + ";expires=" + i.toGMTString()
            },
            getCookie: function (t) {
                var t = new RegExp("(^| )" + t + "=([^;]*)(;|$)");
                return (t = document.cookie.match(t)) ? unescape(t[2]) : null
            },
            delCookie: function (t) {
                var e = new Date;
                e.setTime(e.getTime() - 1);
                var i = p.util.getCookie(t);
                null != i && (document.cookie = t + "=" + i + ";expires=" + e.toGMTString())
            },
            formatHash: (d = ["^#!([a-zA-Z0-9_]+).?", "#![a-zA-Z0-9_]+\\.([a-zA-Z0-9_]+)", "\\|([a-zA-Z0-9_]+)", "\\?(.+)"],
                c = ["module", "html", "json", "param"],
                function (t) {
                    for (var e, i, n, r = 0, o = {}, s = {}; d[r];)
                        e = t.match(new RegExp(d[r])),
                            o[c[r]] = e ? e[1] : undefined,
                            r++;
                    return o.param && (i = o.param.split("&"),
                        a.each(i, function (t, e) {
                            n = e.split("="),
                                s[n[0]] = n[1]
                        }),
                        o.param = s),
                        o
                }
            ),
            getHash: function (t) {
                return "#" + decodeURIComponent(t || location.href).replace(/^[^#]*#?(.*)$/, "$1")
            },
            setHash: function (t) {
                p.iclick = !0,
                    p.tmp_hash = decodeURIComponent(t),
                    p.util.reload(p.tmp_hash)
            },
            checkBetNo: function (t) {
                if (/[xX]{1,2}[^x]?/.test(t) && 4 == t.length) {
                    if (1 < t.replace(/[xX]/g, "").length)
                        return !0
                } else {
                    if (/^\d{2,4}$/.test(t))
                        return !0;
                    if (/\dx{3}\d$|x\dx{2}\d$|x{2}\dx\d$|x{3}\d{2}$/gi.test(t))
                        return !0;
                    if (/\dx{4}|x\dxxx|xx\dxx|xxx\dx|x{4}\d/gi.test(t))
                        return !0
                }
                return !1
            },
            reload: function (t) {
                var e = p.util.getHash(t)
                    , i = p.util.formatHash(e)
                    , t = i.module;
                i.hash = e,
                    p.hashFn[t] && p.hashFn[t](i)
            },
            encrypt: function (t) {
                var e = a("#hd_publickey").val();
                return i.encrypt || (i.encrypt = new JSEncrypt,
                    i.encrypt.setPublicKey(e)),
                    e ? i.encrypt.encrypt(t) : t
            }
        },
            a(["get", "post"]).each(function (t, e) {
                p[e] = function (n) {
                    a.ajax({
                        url: n.url,
                        data: n.data,
                        type: e,
                        dataType: "json",
                        cache: n.cache,
                        async: n.async,
                        timeout: n.timeout,
                        beforeSend: function () {
                            n.send && (n.submitEl ? a(n.submitEl).prop("disabled", !0) : (a("input:submit").prop("disabled", !0),
                                a("input:button").prop("disabled", !0))),
                                n.beforeSend && n.beforeSend()
                        },
                        success: function (t) {
                            switch (t.Status) {
                                case 2:
                                case 4:
                                case 6:
                                case 7:
                                    n.bussiness ? n.bussiness(t.Data) : a.alert(t.Data);
                                    break;
                                case 3:
                                    a.alert(t.Data),
                                        n.bussiness && n.bussiness(t.Data);
                                    break;
                                case 5:
                                    i.android ? a.alert(t.Data, function () {
                                        i.android.sendMessage(1)
                                    }) : location.href = "/Member/Login?Error=" + t.Data,
                                        n.bussiness && n.bussiness(t.Data);
                                    break;
                                case 8:
                                    null != t.Data.errorMsg && 0 < t.Data.errorMsg.length ? t.Data.accessURL && (0 < t.Data.accessURL.indexOf("?") ? location.href = PROTOCOL + t.Data.accessURL + "&Error=" + t.Data.errorMsg : location.href = PROTOCOL + t.Data.accessURL + "?Error=" + t.Data.errorMsg) : location.href = PROTOCOL + t.Data.accessURL;
                                    break;
                                case 500:
                                    a.alert("请求数据失败，错误码：500，具体原因如下：\r\n\r\n" + t.Data);
                                    break;
                                default:
                                    n.success && n.success(t)
                            }
                        },
                        error: function (t, e, i) {
                            n.error && n.error(t, e, i),
                                t.responseText && -1 < t.responseText.indexOf("tn_code") && location.reload()
                        },
                        complete: function (t, e) {
                            n.complete && n.complete(t, e),
                                n.send && (n.submitEl ? a(n.submitEl).prop("disabled", !1) : (a("input:submit").prop("disabled", !1),
                                    a("input:button").prop("disabled", !1)))
                        }
                    })
                }
            }),
            a.extend(i, {
                Loader: s,
                G: p,
                main: a("#main"),
                loadModule: p.util.load,
                doc: a(document)
            }),
            r.on("click", "a", function () {
                if (!this.target && /#!/.test(this.href)) {
                    var t = p.util.getHash(this.href);
                    return p.iclick = !0,
                        p.tmp_hash = t,
                        p.util.reload(p.tmp_hash),
                        !1
                }
            }).on("setHash", function () {
                p.util.getHash(location.hash) == p.tmp_hash && (p.iclick = !1),
                    location.hash = "#" + encodeURIComponent(p.tmp_hash.substring(1))
            })
    }(window, jQuery),
    $(function () {
        G.initSetting(),
            G.hash = G.InitHash,
            $.fn.hashchange.src = "/All/Domain.html",
            $.fn.hashchange.domain = document.domain,
            $(window).hashchange(function () {
                var t, e, i;
                G.iclick ? (G.tmp_hash = null,
                    G.iclick = !1) : (t = G.util.getHash(),
                        i = (e = G.util.formatHash(t)).module,
                        e.hash = t,
                        G.hashFn[i] && G.hashFn[i](e),
                        G.util.close())
            }),
            /#!\w+/.test(location.hash) ? G.util.setHash(G.util.getHash(location.hash)) : G.util.setHash(G.InitHash),
            Loader.prototype.bind($(document.body))
    }),
    $.unparam = function (t) {
        if ("" == t || t == undefined)
            return {};
        for (var e, i = t.split("&"), n = i.length, r = 0, o = {}; r < n; r++)
            o[(e = i[r].split("="))[0]] = e[1] ? decodeURIComponent(e[1]) : "";
        return o
    }
    ,
    Number.prototype.toFixed2 = function (t) {
        var e = parseFloat(this);
        return t = t || 2,
            parseFloat(e.toFixed(t), 10)
    }
    ,
    String.prototype.toFixed2 = Number.prototype.toFixed2,
    Number.prototype.toFixed1 = function (t) {
        var e = 0
            , i = ""
            , n = (this + "").split(".");
        if (n[1] = n[1] || "",
            t <= 0)
            return n[0];
        for (e = 0; e < t; e++)
            n[1][e] && (i += n[1][e]);
        return 0 < n[1].length ? n[0] + "." + i : n[0]
    }
    ,
    String.prototype.toFixed1 = Number.prototype.toFixed1,
    Number.prototype.numberToArray = function (t) {
        for (var e = 0, i = t - this, n = []; e < i; e++)
            n.push(e);
        return n
    }
    ,
    G.mapping_name = {
        level: {
            9: "公司",
            5: "大股东",
            4: "股东",
            3: "总代理",
            2: "代理",
            1: "会员"
        },
        dict_no_type: {
            1: "口口XX",
            2: "口X口X",
            3: "口XX口",
            4: "X口X口",
            5: "X口口X",
            6: "XX口口",
            7: "口口口X",
            8: "口口X口",
            9: "口X口口",
            10: "X口口口",
            11: "四定位",
            12: "二字现",
            13: "三字现",
            14: "四字现"
        },
        lottery_name: {
            0: "七星彩",
            1: "排列五",
            10: "台湾四星彩",
            2: "高频彩"
        },
        navLists: ["#!info", "#!password"]
    },
    G.InitHash = "#!kuaida",
    G.map = {
        // online_account: {
        //     html: {
        //         online_account: "/Htmls/online-account.html"
        //     },
        //     json: {}
        // },
        // printhelp: {
        //     html: {
        //         printhelp: "/Htmls/printhelp.html"
        //     },
        //     json: {}
        // },
        // erd: {
        //     html: {
        //         erd: "/Htmls/erd.html"
        //     },
        //     json: {
        //         erd: "/Member/GetErZiDingNumOdds"
        //     },
        //     format: {
        //         erd: format_erd
        //     }
        // },
        // kuaida: {
        //     html: {
        //         kuaida: "/Htmls/kuaida.html"
        //     },
        //     json: {
        //         kuaida: "/Member/GetKuaidaList"
        //     },
        //     format: {
        //         kuaida: function(t) {
        //             setTimeout(function() {
        //                 IS_PERIOD_OPEN = t.Data.Info.is_period_open
        //             }, 0)
        //         }
        //     }
        // },
        // kuaixuan: {
        //     html: {
        //         kuaixuan: "/Htmls/kuaixuan.html"
        //     },
        //     json: {
        //         kuaixuan: "/Member/GetQuickSelectStatus"
        //     },
        //     format: {
        //         kuaixuan: function(t) {
        //             setTimeout(function() {
        //                 IS_PERIOD_OPEN = t.Data.IsPeriodOpen
        //             }, 0)
        //         }
        //     }
        // },
        // oddschange: {
        //     html: {
        //         oddschange: "/Htmls/oddschange.html"
        //     },
        //     json: {
        //         oddschange: "/Member/GetOddChanges"
        //     }
        // },
        // importtxt: {
        //     html: {
        //         importtxt: "/Htmls/import-txt.html"
        //     },
        //     json: {
        //         importtxt: "/DrawNo/GetCurrentPeriodStatus"
        //     },
        //     format: {
        //         importtxt: function(t) {
        //             setTimeout(function() {
        //                 IS_PERIOD_OPEN = 0 == t.Data.status ? 1 : 0
        //             }, 0)
        //         }
        //     }
        // },
        // betlist: {
        //     html: {
        //         betlist: "/Htmls/betlist.html",
        //         betprint: "/Htmls/betprint.html"
        //     },
        //     json: {
        //         betlist: "/Member/GetMemberBetList",
        //         betprint: "/Member/GetMemberBetList"
        //     }
        // },
        // lastbill: {
        //     html: {
        //         lastbill: "/Htmls/lastbill.html",
        //         betlist: "/Htmls/betlist.html"
        //     },
        //     json: {
        //         lastbill: "/Member/GetHistoryBillList",
        //         betlist: "/Member/GetMemberBetList"
        //     }
        // },
        // info: {
        //     html: {
        //         info: "/Htmls/info.html"
        //     },
        //     json: {
        //         info: "/Member/RetriveMember"
        //     },
        //     format: {
        //         info: function(t) {
        //             return $.each(t.Data.Setting, function(t, e) {
        //                 for (e.return_water_rate = [],
        //                 e.odds_array = [],
        //                 e.self_current_odds = e.self_current_odds1; e.return_water_min <= e.return_water_max; )
        //                     e.return_water_rate.push(e.return_water_max),
        //                     e.return_water_max = (1e3 * e.return_water_max - 1) / 1e3;
        //                 var i = 0;
        //                 if (t <= 19)
        //                     for (; i < e.return_water_rate.length; ) {
        //                         var n = e.return_water_rate[i]
        //                           , r = Math.round(100 * e.odds_max1 - 1e3 * n * e.return_water_diff1 * 100) / 100;
        //                         e.odds_array.push(r),
        //                         i++
        //                     }
        //                 else if (20 == t)
        //                     for (e.self_current_odds = e.self_current_odds1 + "/" + e.self_current_odds2; i < e.return_water_rate.length; ) {
        //                         var n = e.return_water_rate[i]
        //                           , r = Math.round(100 * e.odds_max1 - 1e3 * n * e.return_water_diff1 * 100) / 100
        //                           , o = Math.round(100 * e.odds_max2 - 1e3 * n * e.return_water_diff2 * 100) / 100;
        //                         e.odds_array.push(r + "/" + o),
        //                         i++
        //                     }
        //                 else if (21 == t)
        //                     for (e.self_current_odds = e.self_current_odds1 + "/" + e.self_current_odds2 + "/" + e.self_current_odds3; i < e.return_water_rate.length; ) {
        //                         var n = e.return_water_rate[i]
        //                           , r = Math.round(100 * e.odds_max1 - 1e3 * n * e.return_water_diff1 * 100) / 100
        //                           , o = Math.round(100 * e.odds_max2 - 1e3 * n * e.return_water_diff2 * 100) / 100
        //                           , s = Math.round(10 * e.odds_max3 - 1e3 * n * e.return_water_diff3 * 10) / 10;
        //                         e.odds_array.push(r + "/" + o + "/" + s),
        //                         i++
        //                     }
        //                 else if (22 == t)
        //                     for (e.self_current_odds = e.self_current_odds1 + "/" + e.self_current_odds2 + "/" + e.self_current_odds3 + "/" + e.self_current_odds4; i < e.return_water_rate.length; ) {
        //                         var n = e.return_water_rate[i]
        //                           , r = Math.round(10 * e.odds_max1 - 1e3 * n * e.return_water_diff1 * 10) / 10
        //                           , o = Math.round(10 * e.odds_max2 - 1e3 * n * e.return_water_diff2 * 10) / 10
        //                           , s = Math.round(10 * e.odds_max3 - 1e3 * n * e.return_water_diff3 * 10) / 10
        //                           , a = Math.round(10 * e.odds_max4 - 1e3 * n * e.return_water_diff4 * 10) / 10;
        //                         e.odds_array.push(r + "/" + o + "/" + s + "/" + a),
        //                         i++
        //                     }
        //             }),
        //             t
        //         }
        //     }
        // },
        // drawnumber: {
        //     html: {
        //         drawnumber: "/Htmls/drawnumber.html"
        //     },
        //     json: {
        //         drawnumber: "/DrawNo/GetDrawNoTable"
        //     }
        // },
        // rule: {
        //     html: {
        //         rule: "/Htmls/rule.html"
        //     },
        //     json: {}
        // },
        // log: {
        //     html: {
        //         log: "/Htmls/log.html"
        //     },
        //     json: {
        //         log: "/Member/GetQuickSelectLog"
        //     }
        // },
        // password: {
        //     html: {
        //         password: "/Htmls/password.html"
        //     },
        //     json: {}
        // }
    },
    G.hashFn = function () {
        var i = $("#nav li");
        return {
            supper: function (t) {
                var e = t.module;
                G.util.load({
                    bd: main,
                    module: e,
                    param: t.param || {},
                    html: t.html,
                    json: t.json,
                    hash: t.hash
                }),
                    ("rule" == e || "password" == e || "drawnumber" == e || "log" == e ? i.removeClass("on").filter("[name=more]") : i.removeClass("on").filter("[name=" + e + "]")).addClass("on")
            }
        }
    }(),
    $.each(G.map, function (t) {
        G.hashFn[t] = G.hashFn.supper
    }),
    G.initSetting = function () {
        template.helper("getDictType", function (t) {
            return G.mapping_name.dict_no_type[t]
        }),
            template.helper("format_isxian", function (t) {
                return 12 != t && 13 != t && 14 != t ? "" : "<span class='red fb'>现</span>"
            }),
            template.helper("rpl_color", function (t) {
                return t.replace(/\[([a-zA-Z0-9,\.\u4e00-\u9fa5]*)?\]/g, function (t, e) {
                    return "<span class='red'>" + e + "</span>"
                })
            }),
            template.helper("format_betno", function (t) {
                return t.replace(/[\u4e00-\u9fa5]/, "")
            }),
            template.helper("format_xian", function (t) {
                return t.replace(/[\u4e00-\u9fa5]/, function (t) {
                    return "<span class='red'>" + t + "</span>"
                })
            }),
            template.helper("getLotteryName", function (t) {
                return LOTTERY_TYPE_NAME && 0 < LOTTERY_TYPE_NAME.length ? LOTTERY_TYPE_NAME : G.mapping_name.lottery_name[t]
            }),
            $.validator.setDefaults({
                focusInvalid: !1,
                onfocusout: !1,
                onkeyup: !1,
                showErrors: function (t, e) {
                    e.length && $.alert(e[0].message)
                }
            }),
            $.validator.addMethod("betno", function (t, e) {
                return this.optional(e) || G.util.checkBetNo(t)
            }, "请输入正确的号码"),
            $.validator.addMethod("passwordCheck", function (t, e, i) {
                return this.optional(e) || /^[a-zA-Z0-9]*$/.test(t)
            }, "密码只能由数字或字母组成"),
            $.validator.addMethod("positive", function (t, e, i) {
                return this.optional(e) || /^\d+(\.\d+)?$/.test(t) && 0 < t
            }, "请输入大于0的数"),
            $.validator.addMethod("nonnegative", function (t, e, i) {
                return this.optional(e) || /^\d+(\.\d+)?$/.test(t) && 0 <= t
            }, "请输入一个非负数"),
            $.validator.addMethod("lessthan", function (t, e, i) {
                i = (i = $.trim($(i).val())) ? parseFloat(i) : null;
                return t = parseFloat(t),
                    this.optional(e) || !i || t <= i
            }, "搜索的最小值不能超过最大值！")
            // $.validator.addMethod("pairNumber", function (t, e) {
            //     if ("" == t || "undefined" == t)
            //         return !0;
            //     t = t.split("");
            //     console.log(t);
            //     return 5 == Math.abs(parseInt(t[0]) - parseInt(t[1]))
            // }, "请输入差值为5的对数")
    }
    ,
    function (o) {
        var s = o(document.body)
            , t = o.support.boxSizing ? "" : "<iframe class='ifr-fix-ie6' frameborder='0'></iframe>"
            , a = o("<div class='mask hide'>" + t + "</div>").appendTo(s);
        function l(o, t) {
            o.on("mousedown", t, function (t) {
                var e = o.offset().left
                    , i = o.offset().top
                    , n = t.clientX - e
                    , r = t.clientY - i;
                doc.on("mousemove", function (t) {
                    var e = t.clientX - n
                        , t = t.clientY - r;
                    return o[0].setCapture && o[0].setCapture(),
                        e < 0 ? e = 0 : e > document.documentElement.clientWidth - o.width() - 2 && (e = document.documentElement.clientWidth - o.width() - 2),
                        t < 0 ? t = 0 : t > document.documentElement.clientHeight - o.height() && (t = document.documentElement.clientHeight - o.height()),
                        o.css({
                            left: e,
                            top: t
                        }),
                        !1
                }).on("mouseup", function () {
                    o[0].releaseCapture && o[0].releaseCapture(),
                        doc.off("mousemove").off("mouseup")
                })
            })
        }
        function n(t) {
            var n = this
                , r = o.now()
                , e = null
                , i = "";
            t = o.isPlainObject(t) ? t : {},
                this.settings = {
                    title: "弹出框",
                    cls: "",
                    html: "",
                    button: [],
                    bind: Loader.prototype.bind,
                    unbind: Loader.prototype.unbind,
                    closeBtn: !0
                },
                e = o.extend({}, this.settings, t),
                str_closeBtn = e.closeBtn ? '<a href="javascript:void(0)" class="btn-close fn-close">×</a>' : "",
                o(e.button).each(function (t) {
                    i += '<input type="button" value="' + this + '" class="' + (0 === t ? "btn" : "btn btn-gray") + '" />'
                }),
                this.body = o('<div id="dialog-' + r + '" class="g-dialog ' + e.cls + ' hide"><div class="dialog-hd"><div class="title fl">' + e.title + '</div><div class="fr">' + str_closeBtn + '</div></div><div class="dialog-bd">' + e.html + '</div><div class="dialog-ft">' + i + "</div></div>"),
                this.body.on("click", ".fn-close", function () {
                    e.closeCallback = null,
                        n.close()
                }),
                this.body.on("click", ".dialog-ft input:last", function () {
                    o(this).prev().length && (e.closeCallback = null),
                        n.close()
                }),
                doc.on("dialog.dialog-" + r, function (t, e, i) {
                    "close" == i && e == r && n.close()
                }),
                2 == o(".dialog-ft input", this.body).length && this.body.on("click", ".dialog-ft input:first", function () {
                    n.close()
                }),
                this.open = function () {
                    a.removeClass("hide"),
                        this.body.css("width", e.width || "80%").appendTo(s).removeClass("hide").css({
                            left: e.left || o(window).width() / 2 - n.body.width() / 2
                        }),
                        e.bind(this.body, t.jsondata),
                        G.dialog[r] = {
                            id: r,
                            instance: this
                        },
                        l(this.body, ".dialog-hd"),
                        o.isFunction(e.openCallback) && e.openCallback(),
                        i && setTimeout(function () {
                            o(".dialog-ft :button:first", this.body).focus()
                        }, 0)
                }
                ,
                this.close = function () {
                    doc.off("dialog.dialog-" + r),
                        e.unbind(this.body),
                        this.body.off().remove(),
                        o.isFunction(e.closeCallback) && e.closeCallback(),
                        G.dialog[r].instance = null,
                        delete G.dialog[r],
                        o.isEmptyObject(G.dialog) && a.addClass("hide")
                }
                ,
                this.open()
        }
        o.dialog = function (i) {
            i = o.isPlainObject(i) ? i : {},
                G.util.load({
                    module: i.module,
                    param: i.param,
                    html: i.html,
                    json: i.json,
                    jsonSuccess: i.jsonSuccess,
                    success: function (t, e) {
                        i.html = t,
                            i.jsondata = e,
                            new n(i)
                    }
                })
        }
            ,
            o.alert = function (t, e) {
                o.dialog({
                    title: "提示",
                    html: "<div>" + t + "</div>",
                    closeCallback: e,
                    button: ["确定"],
                    cls: "g-alert",
                    top: 200,
                    closeBtn: !1
                })
            }
            ,
            o.confirm = function (t, e) {
                o.dialog({
                    title: "确认",
                    html: "<div>" + t + "</div>",
                    closeCallback: e,
                    button: ["确定", "取消"],
                    cls: "g-confirm",
                    top: 200,
                    closeBtn: !1
                })
            }
    }(jQuery),
    function (r, i) {
        var t, n, o, e, s, a, l, u = "hashchange", h = document, d = r.event.special, c = h.documentMode, p = "on" + u in i && (void 0 === c || 7 < c);
        function m(t) {
            return "#" + (t = t || location.href).replace(/^[^#]*#?(.*)$/, "$1")
        }
        function f() {
            var t = m()
                , e = l(s);
            t !== s ? (a(s = t, e),
                r(i).trigger(u)) : e !== s && (location.href = location.href.replace(/#.*/, "") + e),
                n = setTimeout(f, r.fn[u].delay)
        }
        r.fn[u] = function (t) {
            return t ? this.bind(u, t) : this.trigger(u)
        }
            ,
            r.fn[u].delay = 50,
            d[u] = r.extend(d[u], {
                setup: function () {
                    if (p)
                        return !1;
                    r(t.start)
                },
                teardown: function () {
                    if (p)
                        return !1;
                    r(t.stop)
                }
            }),
            c = {},
            s = m(),
            l = a = d = function (t) {
                return t
            }
            ,
            c.start = function () {
                n || f()
            }
            ,
            c.stop = function () {
                n && clearTimeout(n),
                    n = void 0
            }
            ,
            function () {
                for (var t = 3, e = document.createElement("div"), i = e.getElementsByTagName("i"); e.innerHTML = "\x3c!--[if gt IE " + ++t + "]><i></i><![endif]--\x3e",
                    i[0];)
                    ;
                return 4 < t ? t : void 0
            }() && !p && (c.start = function () {
                o || (e = (e = r.fn[u].src) && e + m(),
                    o = r('<iframe tabindex="-1" title="empty"/>').hide().one("load", function () {
                        e || a(m()),
                            f()
                    }).attr("src", e || "javascript:0").insertAfter("body")[0].contentWindow,
                    h.onpropertychange = function () {
                        try {
                            "title" === event.propertyName && (o.document.title = h.title)
                        } catch (t) { }
                    }
                )
            }
                ,
                c.stop = d,
                l = function () {
                    return m(o.location.href)
                }
                ,
                a = function (t, e) {
                    var i = o.document
                        , n = r.fn[u].domain;
                    t !== e && (i.title = h.title,
                        i.open(),
                        n && i.write('<script>document.domain="' + n + '"<\/script>'),
                        i.close(),
                        o.location.hash = t)
                }
            ),
            t = c
    }(jQuery, this),
    function (t) {
        "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery)
    }(function (u) {
        u.extend(u.fn, {
            validate: function (t) {
                if (this.length) {
                    var n = u.data(this[0], "validator");
                    return n ? n : (this.attr("novalidate", "novalidate"),
                        n = new u.validator(t, this[0]),
                        u.data(this[0], "validator", n),
                        n.settings.onsubmit && (this.on("click.validate", ":submit", function (t) {
                            n.settings.submitHandler && (n.submitButton = t.target),
                                u(this).hasClass("cancel") && (n.cancelSubmit = !0),
                                u(this).attr("formnovalid") !== undefined && (n.cancelSubmit = !0)
                        }),
                            this.on("submit.validate", function (i) {
                                function t() {
                                    var t, e;
                                    return !n.settings.submitHandler || (n.submitButton && (t = u("<input type='hidden'/>").attr("name", n.submitButton.name).val(u(n.submitButton).val()).appendTo(n.currentForm)),
                                        e = n.settings.submitHandler.call(n, n.currentForm, i),
                                        n.submitButton && t.remove(),
                                        e !== undefined && e)
                                }
                                return n.settings.debug && i.preventDefault(),
                                    n.cancelSubmit ? (n.cancelSubmit = !1,
                                        t()) : n.form() ? n.pendingRequest ? !(n.formSubmitted = !0) : t() : (n.focusInvalid(),
                                            !1)
                            })),
                        n)
                }
                t && t.debug && window.console && console.warn("Nothing selected, can't validate, returning nothing.")
            },
            valid: function () {
                var t, e, i;
                return u(this[0]).is("form") ? t = this.validate().form() : (i = [],
                    t = !0,
                    e = u(this[0].form).validate(),
                    this.each(function () {
                        t = e.element(this) && t,
                            i = i.concat(e.errorList)
                    }),
                    e.errorList = i),
                    t
            },
            rules: function (t, e) {
                var i, n, r, o, s, a = this[0];
                if (t)
                    switch (r = (i = u.data(a.form, "validator").settings).rules,
                    n = u.validator.staticRules(a),
                    t) {
                        case "add":
                            u.extend(n, u.validator.normalizeRule(e)),
                                delete n.messages,
                                r[a.name] = n,
                                e.messages && (i.messages[a.name] = u.extend(i.messages[a.name], e.messages));
                            break;
                        case "remove":
                            return e ? (s = {},
                                u.each(e.split(/\s/), function (t, e) {
                                    s[e] = n[e],
                                        delete n[e],
                                        "required" === e && u(a).removeAttr("aria-required")
                                }),
                                s) : (delete r[a.name],
                                    n)
                    }
                return (r = u.validator.normalizeRules(u.extend({}, u.validator.classRules(a), u.validator.attributeRules(a), u.validator.dataRules(a), u.validator.staticRules(a)), a)).required && (o = r.required,
                    delete r.required,
                    r = u.extend({
                        required: o
                    }, r),
                    u(a).attr("aria-required", "true")),
                    r.remote && (o = r.remote,
                        delete r.remote,
                        r = u.extend(r, {
                            remote: o
                        })),
                    r
            }
        }),
            u.extend(u.expr[":"], {
                blank: function (t) {
                    return !u.trim("" + u(t).val())
                },
                filled: function (t) {
                    return !!u.trim("" + u(t).val())
                },
                unchecked: function (t) {
                    return !u(t).prop("checked")
                }
            }),
            u.validator = function (t, e) {
                this.settings = u.extend(!0, {}, u.validator.defaults, t),
                    this.currentForm = e,
                    this.init()
            }
            ,
            u.validator.format = function (i, t) {
                return 1 === arguments.length ? function () {
                    var t = u.makeArray(arguments);
                    return t.unshift(i),
                        u.validator.format.apply(this, t)
                }
                    : (2 < arguments.length && t.constructor !== Array && (t = u.makeArray(arguments).slice(1)),
                        t.constructor !== Array && (t = [t]),
                        u.each(t, function (t, e) {
                            i = i.replace(new RegExp("\\{" + t + "\\}", "g"), function () {
                                return e
                            })
                        }),
                        i)
            }
            ,
            u.extend(u.validator, {
                defaults: {
                    messages: {},
                    groups: {},
                    rules: {},
                    errorClass: "error",
                    validClass: "valid",
                    errorElement: "label",
                    focusCleanup: !1,
                    focusInvalid: !0,
                    errorContainer: u([]),
                    errorLabelContainer: u([]),
                    onsubmit: !0,
                    ignore: ":hidden",
                    ignoreTitle: !1,
                    onfocusin: function (t) {
                        this.lastActive = t,
                            this.settings.focusCleanup && (this.settings.unhighlight && this.settings.unhighlight.call(this, t, this.settings.errorClass, this.settings.validClass),
                                this.hideThese(this.errorsFor(t)))
                    },
                    onfocusout: function (t) {
                        this.checkable(t) || !(t.name in this.submitted) && this.optional(t) || this.element(t)
                    },
                    onkeyup: function (t, e) {
                        9 === e.which && "" === this.elementValue(t) || -1 !== u.inArray(e.keyCode, [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225]) || (t.name in this.submitted || t === this.lastElement) && this.element(t)
                    },
                    onclick: function (t) {
                        t.name in this.submitted ? this.element(t) : t.parentNode.name in this.submitted && this.element(t.parentNode)
                    },
                    highlight: function (t, e, i) {
                        ("radio" === t.type ? this.findByName(t.name) : u(t)).addClass(e).removeClass(i)
                    },
                    unhighlight: function (t, e, i) {
                        ("radio" === t.type ? this.findByName(t.name) : u(t)).removeClass(e).addClass(i)
                    }
                },
                setDefaults: function (t) {
                    u.extend(u.validator.defaults, t)
                },
                messages: {
                    required: "该项不能为空",
                    remote: "请修正此字段",
                    email: "请输入有效的电子邮件地址",
                    url: "请输入有效的网址",
                    date: "请输入有效的日期",
                    dateISO: "请输入有效的日期 (YYYY-MM-DD)",
                    number: "请输入有效的数字",
                    digits: "只能输入非负整数",
                    creditcard: "请输入有效的信用卡号码",
                    equalTo: "你的输入不相同",
                    extension: "请输入有效的后缀",
                    maxlength: u.validator.format("最多可以输入 {0} 个字符"),
                    minlength: u.validator.format("最少要输入 {0} 个字符"),
                    rangelength: u.validator.format("请输入长度在 {0} 到 {1} 之间的字符串"),
                    range: u.validator.format("请输入范围在 {0} 到 {1} 之间的数值"),
                    max: u.validator.format("请输入不大于 {0} 的数值"),
                    min: u.validator.format("请输入不小于 {0} 的数值")
                },
                autoCreateRanges: !1,
                prototype: {
                    init: function () {
                        this.labelContainer = u(this.settings.errorLabelContainer),
                            this.errorContext = this.labelContainer.length && this.labelContainer || u(this.currentForm),
                            this.containers = u(this.settings.errorContainer).add(this.settings.errorLabelContainer),
                            this.submitted = {},
                            this.valueCache = {},
                            this.pendingRequest = 0,
                            this.pending = {},
                            this.invalid = {},
                            this.reset();
                        var i, n = this.groups = {};
                        function t(t) {
                            var e = u.data(this.form, "validator")
                                , i = "on" + t.type.replace(/^validate/, "")
                                , n = e.settings;
                            n[i] && !u(this).is(n.ignore) && n[i].call(e, this, t)
                        }
                        u.each(this.settings.groups, function (i, t) {
                            "string" == typeof t && (t = t.split(/\s/)),
                                u.each(t, function (t, e) {
                                    n[e] = i
                                })
                        }),
                            i = this.settings.rules,
                            u.each(i, function (t, e) {
                                i[t] = u.validator.normalizeRule(e)
                            }),
                            u(this.currentForm).on("focusin.validate focusout.validate keyup.validate", ":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'], [type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'], [type='radio'], [type='checkbox']", t).on("click.validate", "select, option, [type='radio'], [type='checkbox']", t),
                            this.settings.invalidHandler && u(this.currentForm).on("invalid-form.validate", this.settings.invalidHandler),
                            u(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true")
                    },
                    form: function () {
                        return this.checkForm(),
                            u.extend(this.submitted, this.errorMap),
                            this.invalid = u.extend({}, this.errorMap),
                            this.valid() || u(this.currentForm).triggerHandler("invalid-form", [this]),
                            this.showErrors(),
                            this.valid()
                    },
                    checkForm: function () {
                        this.prepareForm();
                        for (var t = 0, e = this.currentElements = this.elements(); e[t]; t++)
                            this.check(e[t]);
                        return this.valid()
                    },
                    element: function (t) {
                        var e = this.clean(t)
                            , i = this.validationTargetFor(e)
                            , n = !0;
                        return (this.lastElement = i) === undefined ? delete this.invalid[e.name] : (this.prepareElement(i),
                            this.currentElements = u(i),
                            (n = !1 !== this.check(i)) ? delete this.invalid[i.name] : this.invalid[i.name] = !0),
                            u(t).attr("aria-invalid", !n),
                            this.numberOfInvalids() || (this.toHide = this.toHide.add(this.containers)),
                            this.showErrors(),
                            n
                    },
                    showErrors: function (e) {
                        if (e) {
                            for (var t in u.extend(this.errorMap, e),
                                this.errorList = [],
                                e)
                                this.errorList.push({
                                    message: e[t],
                                    element: this.findByName(t)[0]
                                });
                            this.successList = u.grep(this.successList, function (t) {
                                return !(t.name in e)
                            })
                        }
                        this.settings.showErrors ? this.settings.showErrors.call(this, this.errorMap, this.errorList) : this.defaultShowErrors()
                    },
                    resetForm: function () {
                        u.fn.resetForm && u(this.currentForm).resetForm(),
                            this.submitted = {},
                            this.lastElement = null,
                            this.prepareForm(),
                            this.hideErrors();
                        var t, e = this.elements().removeData("previousValue").removeAttr("aria-invalid");
                        if (this.settings.unhighlight)
                            for (t = 0; e[t]; t++)
                                this.settings.unhighlight.call(this, e[t], this.settings.errorClass, "");
                        else
                            e.removeClass(this.settings.errorClass)
                    },
                    numberOfInvalids: function () {
                        return this.objectLength(this.invalid)
                    },
                    objectLength: function (t) {
                        var e, i = 0;
                        for (e in t)
                            i++;
                        return i
                    },
                    hideErrors: function () {
                        this.hideThese(this.toHide)
                    },
                    hideThese: function (t) {
                        t.not(this.containers).text(""),
                            this.addWrapper(t).hide()
                    },
                    valid: function () {
                        return 0 === this.size()
                    },
                    size: function () {
                        return this.errorList.length
                    },
                    focusInvalid: function () {
                        if (this.settings.focusInvalid)
                            try {
                                u(this.findLastActive() || this.errorList.length && this.errorList[0].element || []).filter(":visible").focus().trigger("focusin")
                            } catch (t) { }
                    },
                    findLastActive: function () {
                        var e = this.lastActive;
                        return e && 1 === u.grep(this.errorList, function (t) {
                            return t.element.name === e.name
                        }).length && e
                    },
                    elements: function () {
                        var t = this
                            , e = {};
                        return u(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, :disabled").not(this.settings.ignore).filter(function () {
                            return !this.name && t.settings.debug && window.console && console.error("%o has no name assigned", this),
                                !(this.name in e || !t.objectLength(u(this).rules())) && (e[this.name] = !0)
                        })
                    },
                    clean: function (t) {
                        return u(t)[0]
                    },
                    errors: function () {
                        var t = this.settings.errorClass.split(" ").join(".");
                        return u(this.settings.errorElement + "." + t, this.errorContext)
                    },
                    reset: function () {
                        this.successList = [],
                            this.errorList = [],
                            this.errorMap = {},
                            this.toShow = u([]),
                            this.toHide = u([]),
                            this.currentElements = u([])
                    },
                    prepareForm: function () {
                        this.reset(),
                            this.toHide = this.errors().add(this.containers)
                    },
                    prepareElement: function (t) {
                        this.reset(),
                            this.toHide = this.errorsFor(t)
                    },
                    elementValue: function (t) {
                        var e = u(t)
                            , i = t.type;
                        return "radio" === i || "checkbox" === i ? this.findByName(t.name).filter(":checked").val() : "number" === i && "undefined" != typeof t.validity ? !t.validity.badInput && e.val() : "string" == typeof (e = e.val()) ? e.replace(/\r/g, "") : e
                    },
                    check: function (t) {
                        t = this.validationTargetFor(this.clean(t));
                        var e, i, n, r = u(t).rules(), o = u.map(r, function (t, e) {
                            return e
                        }).length, s = !1, a = this.elementValue(t);
                        for (i in r) {
                            n = {
                                method: i,
                                parameters: r[i]
                            };
                            try {
                                if ("dependency-mismatch" === (e = u.validator.methods[i].call(this, a, t, n.parameters)) && 1 === o) {
                                    s = !0;
                                    continue
                                }
                                if (s = !1,
                                    "pending" === e)
                                    return void (this.toHide = this.toHide.not(this.errorsFor(t)));
                                if (!e)
                                    return this.formatAndAdd(t, n),
                                        !1
                            } catch (l) {
                                throw this.settings.debug && window.console && console.log("Exception occurred when checking element " + t.id + ", check the '" + n.method + "' method.", l),
                                l instanceof TypeError && (l.message += ".  Exception occurred when checking element " + t.id + ", check the '" + n.method + "' method."),
                                l
                            }
                        }
                        if (!s)
                            return this.objectLength(r) && this.successList.push(t),
                                !0
                    },
                    customDataMessage: function (t, e) {
                        return u(t).data("msg" + e.charAt(0).toUpperCase() + e.substring(1).toLowerCase()) || u(t).data("msg")
                    },
                    customMessage: function (t, e) {
                        t = this.settings.messages[t];
                        return t && (t.constructor === String ? t : t[e])
                    },
                    findDefined: function () {
                        for (var t = 0; t < arguments.length; t++)
                            if (arguments[t] !== undefined)
                                return arguments[t];
                        return undefined
                    },
                    defaultMessage: function (t, e) {
                        return this.findDefined(this.customMessage(t.name, e), this.customDataMessage(t, e), !this.settings.ignoreTitle && t.title || undefined, u.validator.messages[e], "<strong>Warning: No message defined for " + t.name + "</strong>")
                    },
                    formatAndAdd: function (t, e) {
                        var i = this.defaultMessage(t, e.method)
                            , n = /\$?\{(\d+)\}/g;
                        "function" == typeof i ? i = i.call(this, e.parameters, t) : n.test(i) && (i = u.validator.format(i.replace(n, "{$1}"), e.parameters)),
                            this.errorList.push({
                                message: i,
                                element: t,
                                method: e.method
                            }),
                            this.errorMap[t.name] = i,
                            this.submitted[t.name] = i
                    },
                    addWrapper: function (t) {
                        return this.settings.wrapper && (t = t.add(t.parent(this.settings.wrapper))),
                            t
                    },
                    defaultShowErrors: function () {
                        for (var t, e, i = 0; this.errorList[i]; i++)
                            e = this.errorList[i],
                                this.settings.highlight && this.settings.highlight.call(this, e.element, this.settings.errorClass, this.settings.validClass),
                                this.showLabel(e.element, e.message);
                        if (this.errorList.length && (this.toShow = this.toShow.add(this.containers)),
                            this.settings.success)
                            for (i = 0; this.successList[i]; i++)
                                this.showLabel(this.successList[i]);
                        if (this.settings.unhighlight)
                            for (i = 0,
                                t = this.validElements(); t[i]; i++)
                                this.settings.unhighlight.call(this, t[i], this.settings.errorClass, this.settings.validClass);
                        this.toHide = this.toHide.not(this.toShow),
                            this.hideErrors(),
                            this.addWrapper(this.toShow).show()
                    },
                    validElements: function () {
                        return this.currentElements.not(this.invalidElements())
                    },
                    invalidElements: function () {
                        return u(this.errorList).map(function () {
                            return this.element
                        })
                    },
                    showLabel: function (t, e) {
                        var i, n, r = this.errorsFor(t), o = this.idOrName(t), s = u(t).attr("aria-describedby");
                        r.length ? (r.removeClass(this.settings.validClass).addClass(this.settings.errorClass),
                            r.html(e)) : (i = r = u("<" + this.settings.errorElement + ">").attr("id", o + "-error").addClass(this.settings.errorClass).html(e || ""),
                                this.settings.wrapper && (i = r.hide().show().wrap("<" + this.settings.wrapper + "/>").parent()),
                                this.labelContainer.length ? this.labelContainer.append(i) : this.settings.errorPlacement ? this.settings.errorPlacement(i, u(t)) : i.insertAfter(t),
                                r.is("label") ? r.attr("for", o) : 0 === r.parents("label[for='" + o + "']").length && (o = r.attr("id").replace(/(:|\.|\[|\]|\$)/g, "\\$1"),
                                    s ? s.match(new RegExp("\\b" + o + "\\b")) || (s += " " + o) : s = o,
                                    u(t).attr("aria-describedby", s),
                                    (n = this.groups[t.name]) && u.each(this.groups, function (t, e) {
                                        e === n && u("[name='" + t + "']", this.currentForm).attr("aria-describedby", r.attr("id"))
                                    }))),
                            !e && this.settings.success && (r.text(""),
                                "string" == typeof this.settings.success ? r.addClass(this.settings.success) : this.settings.success(r, t)),
                            this.toShow = this.toShow.add(r)
                    },
                    errorsFor: function (t) {
                        var e = this.idOrName(t)
                            , t = u(t).attr("aria-describedby")
                            , e = "label[for='" + e + "'], label[for='" + e + "'] *";
                        return t && (e = e + ", #" + t.replace(/\s+/g, ", #")),
                            this.errors().filter(e)
                    },
                    idOrName: function (t) {
                        return this.groups[t.name] || !this.checkable(t) && t.id || t.name
                    },
                    validationTargetFor: function (t) {
                        return this.checkable(t) && (t = this.findByName(t.name)),
                            u(t).not(this.settings.ignore)[0]
                    },
                    checkable: function (t) {
                        return /radio|checkbox/i.test(t.type)
                    },
                    findByName: function (t) {
                        return u(this.currentForm).find("[name='" + t + "']")
                    },
                    getLength: function (t, e) {
                        switch (e.nodeName.toLowerCase()) {
                            case "select":
                                return u("option:selected", e).length;
                            case "input":
                                if (this.checkable(e))
                                    return this.findByName(e.name).filter(":checked").length
                        }
                        return t.length
                    },
                    depend: function (t, e) {
                        return !this.dependTypes["type_" + typeof t] || this.dependTypes["type_" + typeof t](t, e)
                    },
                    dependTypes: {
                        type_boolean: function (t) {
                            return t
                        },
                        type_string: function (t, e) {
                            return !!u(t, e.form).length
                        },
                        type_function: function (t, e) {
                            return t(e)
                        }
                    },
                    optional: function (t) {
                        var e = this.elementValue(t);
                        return !u.validator.methods.required.call(this, e, t) && !/^\s+$/.test(e)
                    },
                    startRequest: function (t) {
                        this.pending[t.name] || (this.pendingRequest++,
                            this.pending[t.name] = !0)
                    },
                    stopRequest: function (t, e) {
                        this.pendingRequest--,
                            this.pendingRequest < 0 && (this.pendingRequest = 0),
                            delete this.pending[t.name],
                            e && 0 === this.pendingRequest && this.formSubmitted && this.form() ? (u(this.currentForm).submit(),
                                this.formSubmitted = !1) : !e && 0 === this.pendingRequest && this.formSubmitted && (u(this.currentForm).triggerHandler("invalid-form", [this]),
                                    this.formSubmitted = !1)
                    },
                    previousValue: function (t) {
                        return u.data(t, "previousValue") || u.data(t, "previousValue", {
                            old: null,
                            valid: !0,
                            message: this.defaultMessage(t, "remote")
                        })
                    },
                    destroy: function () {
                        this.resetForm(),
                            u(this.currentForm).off(".validate").removeData("validator")
                    }
                },
                classRuleSettings: {
                    required: {
                        required: !0
                    },
                    email: {
                        email: !0
                    },
                    url: {
                        url: !0
                    },
                    date: {
                        date: !0
                    },
                    dateISO: {
                        dateISO: !0
                    },
                    number: {
                        number: !0
                    },
                    digits: {
                        digits: !0
                    },
                    creditcard: {
                        creditcard: !0
                    }
                },
                addClassRules: function (t, e) {
                    t.constructor === String ? this.classRuleSettings[t] = e : u.extend(this.classRuleSettings, t)
                },
                classRules: function (t) {
                    var e = {}
                        , t = u(t).attr("class");
                    return t && u.each(t.split(" "), function () {
                        this in u.validator.classRuleSettings && u.extend(e, u.validator.classRuleSettings[this])
                    }),
                        e
                },
                normalizeAttributeRule: function (t, e, i, n) {
                    /min|max/.test(i) && (null === e || /number|range|text/.test(e)) && (n = Number(n),
                        isNaN(n) && (n = undefined)),
                        n || 0 === n ? t[i] = n : e === i && "range" !== e && (t[i] = !0)
                },
                attributeRules: function (t) {
                    var e, i, n = {}, r = u(t), o = t.getAttribute("type");
                    for (e in u.validator.methods)
                        i = "required" === e ? ("" === (i = t.getAttribute(e)) && (i = !0),
                            !!i) : r.attr(e),
                            this.normalizeAttributeRule(n, o, e, i);
                    return n.maxlength && /-1|2147483647|524288/.test(n.maxlength) && delete n.maxlength,
                        n
                },
                dataRules: function (t) {
                    var e, i, n = {}, r = u(t), o = t.getAttribute("type");
                    for (e in u.validator.methods)
                        i = r.data("rule" + e.charAt(0).toUpperCase() + e.substring(1).toLowerCase()),
                            this.normalizeAttributeRule(n, o, e, i);
                    return n
                },
                staticRules: function (t) {
                    var e = {}
                        , i = u.data(t.form, "validator");
                    return i.settings.rules && (e = u.validator.normalizeRule(i.settings.rules[t.name]) || {}),
                        e
                },
                normalizeRules: function (n, r) {
                    return u.each(n, function (t, e) {
                        if (!1 !== e) {
                            if (e.param || e.depends) {
                                var i = !0;
                                switch (typeof e.depends) {
                                    case "string":
                                        i = !!u(e.depends, r.form).length;
                                        break;
                                    case "function":
                                        i = e.depends.call(r, r)
                                }
                                i ? n[t] = e.param === undefined || e.param : delete n[t]
                            }
                        } else
                            delete n[t]
                    }),
                        u.each(n, function (t, e) {
                            n[t] = u.isFunction(e) ? e(r) : e
                        }),
                        u.each(["minlength", "maxlength"], function () {
                            n[this] && (n[this] = Number(n[this]))
                        }),
                        u.each(["rangelength", "range"], function () {
                            var t;
                            n[this] && (u.isArray(n[this]) ? n[this] = [Number(n[this][0]), Number(n[this][1])] : "string" == typeof n[this] && (t = n[this].replace(/[\[\]]/g, "").split(/[\s,]+/),
                                n[this] = [Number(t[0]), Number(t[1])]))
                        }),
                        u.validator.autoCreateRanges && (null != n.min && null != n.max && (n.range = [n.min, n.max],
                            delete n.min,
                            delete n.max),
                            null != n.minlength && null != n.maxlength && (n.rangelength = [n.minlength, n.maxlength],
                                delete n.minlength,
                                delete n.maxlength)),
                        n
                },
                normalizeRule: function (t) {
                    var e;
                    return "string" == typeof t && (e = {},
                        u.each(t.split(/\s/), function () {
                            e[this] = !0
                        }),
                        t = e),
                        t
                },
                addMethod: function (t, e, i) {
                    u.validator.methods[t] = e,
                        u.validator.messages[t] = i !== undefined ? i : u.validator.messages[t],
                        e.length < 3 && u.validator.addClassRules(t, u.validator.normalizeRule(t))
                },
                methods: {
                    required: function (t, e, i) {
                        if (!this.depend(i, e))
                            return "dependency-mismatch";
                        if ("select" !== e.nodeName.toLowerCase())
                            return this.checkable(e) ? 0 < this.getLength(t, e) : 0 < u.trim(t).length;
                        e = u(e).val();
                        return e && 0 < e.length
                    },
                    email: function (t, e) {
                        return this.optional(e) || /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(t)
                    },
                    url: function (t, e) {
                        return this.optional(e) || /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})).?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(t)
                    },
                    date: function (t, e) {
                        return this.optional(e) || !/Invalid|NaN/.test(new Date(t).toString())
                    },
                    dateISO: function (t, e) {
                        return this.optional(e) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(t)
                    },
                    number: function (t, e) {
                        return this.optional(e) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(t)
                    },
                    digits: function (t, e) {
                        return this.optional(e) || /^\d+$/.test(t)
                    },
                    creditcard: function (t, e) {
                        if (this.optional(e))
                            return "dependency-mismatch";
                        if (/[^0-9 \-]+/.test(t))
                            return !1;
                        var i, n, r = 0, o = 0, s = !1;
                        if ((t = t.replace(/\D/g, "")).length < 13 || 19 < t.length)
                            return !1;
                        for (i = t.length - 1; 0 <= i; i--)
                            n = t.charAt(i),
                                o = parseInt(n, 10),
                                s && 9 < (o *= 2) && (o -= 9),
                                r += o,
                                s = !s;
                        return r % 10 == 0
                    },
                    minlength: function (t, e, i) {
                        t = u.isArray(t) ? t.length : this.getLength(t, e);
                        return this.optional(e) || i <= t
                    },
                    maxlength: function (t, e, i) {
                        t = u.isArray(t) ? t.length : this.getLength(t, e);
                        return this.optional(e) || t <= i
                    },
                    rangelength: function (t, e, i) {
                        t = u.isArray(t) ? t.length : this.getLength(t, e);
                        return this.optional(e) || t >= i[0] && t <= i[1]
                    },
                    min: function (t, e, i) {
                        return this.optional(e) || i <= t
                    },
                    max: function (t, e, i) {
                        return this.optional(e) || t <= i
                    },
                    range: function (t, e, i) {
                        return this.optional(e) || t >= i[0] && t <= i[1]
                    },
                    equalTo: function (t, e, i) {
                        i = u(i);
                        return this.settings.onfocusout && i.off(".validate-equalTo").on("blur.validate-equalTo", function () {
                            u(e).valid()
                        }),
                            t === i.val()
                    },
                    remote: function (n, r, t) {
                        if (this.optional(r))
                            return "dependency-mismatch";
                        var o, e, s = this.previousValue(r);
                        return this.settings.messages[r.name] || (this.settings.messages[r.name] = {}),
                            s.originalMessage = this.settings.messages[r.name].remote,
                            this.settings.messages[r.name].remote = s.message,
                            t = "string" == typeof t ? {
                                url: t
                            } : t,
                            s.old === n ? s.valid : (s.old = n,
                                (o = this).startRequest(r),
                                (e = {})[r.name] = n,
                                u.ajax(u.extend(!0, {
                                    mode: "abort",
                                    port: "validate" + r.name,
                                    dataType: "json",
                                    data: e,
                                    context: o.currentForm,
                                    success: function (t) {
                                        var e, i = !0 === t || "true" === t;
                                        o.settings.messages[r.name].remote = s.originalMessage,
                                            i ? (e = o.formSubmitted,
                                                o.prepareElement(r),
                                                o.formSubmitted = e,
                                                o.successList.push(r),
                                                delete o.invalid[r.name],
                                                o.showErrors()) : (e = {},
                                                    t = t || o.defaultMessage(r, "remote"),
                                                    e[r.name] = s.message = u.isFunction(t) ? t(n) : t,
                                                    o.invalid[r.name] = !0,
                                                    o.showErrors(e)),
                                            s.valid = i,
                                            o.stopRequest(r, i)
                                    }
                                }, t)),
                                "pending")
                    }
                }
            });
        var n, r = {};
        u.ajaxPrefilter ? u.ajaxPrefilter(function (t, e, i) {
            var n = t.port;
            "abort" === t.mode && (r[n] && r[n].abort(),
                r[n] = i)
        }) : (n = u.ajax,
            u.ajax = function (t) {
                var e = ("mode" in t ? t : u.ajaxSettings).mode
                    , i = ("port" in t ? t : u.ajaxSettings).port;
                return "abort" === e ? (r[i] && r[i].abort(),
                    r[i] = n.apply(this, arguments),
                    r[i]) : n.apply(this, arguments)
            }
            )
    }),
    function () {
        function e(t, e, i) {
            var n, r, o;
            if (0 == e && 4 == i)
                return 0;
            switch (r = String(t),
            o = String(e),
            t = r.split(".")[1] ? r.split(".")[1].length : 0,
            e = (e = o.split(".")[1] ? o.split(".")[1].length : 0) < t ? t : e,
            r = Math.round(r * Math.pow(10, e)),
            o = Math.round(o * Math.pow(10, e)),
            i) {
                case 1:
                    n = r + o;
                    break;
                case 2:
                    n = r - o;
                    break;
                case 3:
                    n = r * o;
                    break;
                case 4:
                    n = r / o
            }
            return e = 1 == i || 2 == i ? e : 3 == i ? 2 * e : 0,
                n / Math.pow(10, e)
        }
        Number.prototype.add = function (t) {
            return e.apply(null, [this, t, 1])
        }
            ,
            String.prototype.add = Number.prototype.add,
            Number.prototype.subtract = function (t) {
                return e.apply(null, [this, t, 2])
            }
            ,
            String.prototype.subtract = Number.prototype.subtract,
            Number.prototype.multiply = function (t) {
                return e.apply(null, [this, t, 3])
            }
            ,
            String.prototype.multiply = Number.prototype.multiply,
            Number.prototype.divide = function (t) {
                return e.apply(null, [this, t, 4])
            }
            ,
            String.prototype.divide = Number.prototype.divide
    }(),
    List.prototype.init = function () {
        var e = this;
        this.dom.selectAll = $("#selectAll").on("click", function () {
            $("input:checkbox", e.dom.tbody).prop("checked", this.checked)
        }),
            this.d.on("click", ".fn-cancelbet", function () {
                e.doCancelBet()
            }),
            this.dom.tbody = $("#tbody"),
            this.dom.form = $("form", this.d),
            this.dom.form.validate({
                submitHandler: function () {
                    e.doSave()
                }
            }),
            this.tpl_refresh = $("#tpl_refresh").html(),
            this.d.on("click", ".fn-print", function () {
                var t = 1 == $(this).attr("data-type") ? "下注明细" : "中奖明细";
                $.dialog({
                    module: "betlist",
                    html: "betprint",
                    json: "betprint",
                    title: t + "打印",
                    param: $.unparam(e.dom.form.serialize() + (G.instance.pager ? "&pageindex=" + G.instance.pager.pageIndex : "")),
                    width: 800
                })
            }),
            this.dom.print_number = $("#print_number"),
            doc.on("pagecomplete." + this.id, function () {
                e.dom.selectAll.prop("checked", !1)
            }),
            doc.on("click." + this.id, ".fn-nextpage", function () {
                G.util.close(),
                    G.instance.pager.dom.fnNext.triggerHandler("click")
            })
    }
    ,
    List.prototype.doCancelBet = function () {
        var t, e = [];
        $("input:checkbox:checked", this.dom.tbody).each(function () {
            e.push(this.id)
        }),
            e.length ? (doc.triggerHandler("update.header"),
                t = G.instance.header.period_no,
                $.confirm("你确认要退掉选中的号码吗？", function () {
                    G.post({
                        url: "/Member/CancelMemberBet",
                        data: {
                            ids: e.join(","),
                            period_no: t
                        },
                        success: function (t) {
                            window.android && window.android.sendMessage(4),
                                $.dialog({
                                    title: "提示",
                                    html: "<div class='tc'>" + t.Data + "</div><div class='tc' style='padding:50px 0 0'><input type='button' value='关闭' class='btn fn-close'> <a href='javascript:void(0)' class='btn fn-nextpage'>关闭并下一页</a></div>"
                                }),
                                doc.triggerHandler("pagereload"),
                                doc.triggerHandler("update")
                        }
                    })
                })) : $.alert("未选择任何项!")
    }
    ,
    List.prototype.doSave = function () {
        var e = this.dom.form.serialize();
        loadModule({
            html: this.tpl_refresh,
            json: this.action[this.id],
            param: e,
            bd: this.dom.tbody,
            jsonSuccess: function (t) {
                return doc.triggerHandler("pagereset", [t, e]),
                    t
            }
        })
    }
    ,
    G.modules.betlist = List,
    Model.prototype.init = function () {
        var t = this;
        this.dom.form = $("form", this.d),
            this.dom.form.validate({
                submitHandler: function () {
                    t.doSave()
                }
            })
    }
    ,
    Model.prototype.doSave = function () {
        var t = {};
        (t = $.unparam(this.dom.form.serialize())).old_pwd = G.util.encrypt(t.old_pwd),
            t.new_pwd = G.util.encrypt(t.new_pwd),
            t.repeat_new_pwd = G.util.encrypt(t.repeat_new_pwd),
            G.post({
                url: this.action[this.id],
                data: t,
                success: function () {
                    $.alert("修改密码成功，需要重新登录才生效。", function () {
                        window.android ? window.android.sendMessage(1) : location.href = "/Member/Login"
                    })
                }
            })
    }
    ,
    G.modules.password = Model,
    BetPrint.prototype.init = function () {
        this.d.on("click", "#btn-print", function () {
            $("#print-area").printArea()
        })
    }
    ,
    G.modules.betprint = BetPrint,
    Header.prototype.init = function () {
        var i = this;
        this.d.on("click", ".fn-logout", function () {
            $.confirm("确定退出吗？", function () {
                G.get({
                    url: "/Member/Logout",
                    success: function (t) {
                        t.Data && t.Data.accessURL ? location.href = PROTOCOL + t.Data.accessURL : t.Data && t.Data.callbackURL ? location.href = t.Data.callbackURL : location.href = "/"
                    }
                })
            })
        }),
            this.d.on("click", ".lotteryType-nav", function () {
                $(this).toggleClass("on")
            }),
            this.d.on("click", ".fn-changeLottery", function () {
                var t = $(this).attr("lotteryType");
                G.get({
                    url: "/Member/GetIntegrationAccessInfo",
                    data: {
                        lottery_type: t
                    },
                    success: function (t) {
                        1 == t.Status && (t.Data.errorMsg ? $.alert(t.Data.errorMsg, function () {
                            t.Data.accessURL && (location.href = PROTOCOL + t.Data.accessURL)
                        }) : location.href = PROTOCOL + t.Data.accessURL)
                    }
                })
            }),
            this.initAudio(),
            doc.on("update.header", function () {
                i.d.hasClass("hide") || i.getMemberInfo()
            }),
            doc.on("playAudio.audio", function (t, e) {
                i.playAudio(e)
            }),
            this.dom.marquee = $(".marquee").on("click", "span", function () {
                $.dialog({
                    title: "全部公告",
                    width: 1e3,
                    top: "10%",
                    html: '<div class="line26">' + $(this).html() + "</div>"
                })
            }),
            this.tpl_user = $("#tpl_user").html(),
            this.dom.user = $("#user").on("click", ".fn-print", function () {
                var t = $(this)
                    , e = [];
                $("#tbody2 tr.list").each(function () {
                    e.push(this.id)
                }),
                    e.length ? (i.bet_id = e.join(","),
                        i.doPrint(t)) : $.alert("暂无可打印订单!")
            }),
            this.dom.user.on("click", ".fn-clear", function () {
                "0" != $("#recordsCount").html() && G.get({
                    url: "/Member/CleanPrint",
                    success: function (t) {
                        $.alert("操作成功!", function () {
                            i.getMemberInfo()
                        })
                    }
                })
            }),
            this.dom.user.on("click", ".fn_printhelp", function () {
                G.util.setHash("#!printhelp")
            }),
            this.dom.nav = $("#nav").on("click", "a", function () {
                if ("on" == this.parentNode.className) {
                    var t = $(this).attr("href")
                        , e = (new Date).getTime();
                    return G.util.setHash(t + "&v=" + e),
                        !1
                }
            }),
            this.dom.popup = $("#popup").animate({
                bottom: 0
            }).on("click", ".fn-close", function () {
                clearTimeout(i.timer_popup),
                    i.dom.popup.animate({
                        bottom: "-=190"
                    }, function () {
                        $(this).remove()
                    })
            }).on("click", ".fn-min", function () {
                clearTimeout(i.timer_popup);
                var t = $(this);
                t.hasClass("btn-max") ? i.dom.popup.animate({
                    bottom: 0
                }, function () {
                    t.removeClass("btn-max")
                }) : i.popupmin()
            }),
            this.timer_popup = setTimeout(function () {
                i.popupmin()
            }, 2e4),
            this.d.on("click", "a", function () {
                (this.getAttribute("name") || this.parentNode.getAttribute("name")) && i.getSystemInfo()
            }),
            this.getMemberInfo(),
            this.setTimeSecond(),
            this.getSystemInfo("reset"),
            this.doUpdateOpenStatus(i.time_second),
            doc.one("click.playaudio", function () {
                // i.oAudioFull.play(),
                //     i.oAudioLack.play(),
                //     timer1 = setTimeout(function () {
                //         i.oAudioFull.pause(),
                //             i.oAudioLack.pause(),
                //             clearInterval(timer1)
                //     }, 50),
                //     timer = setTimeout(function () {
                //         i.oAudioFull.muted = !1,
                //             i.oAudioLack.muted = !1,
                //             clearInterval(timer)
                //     }, 3e3)
            }),
            this.d.on("click", ".more", function (t) {
                t.stopPropagation(),
                    $(".more-nav").slideToggle()
            }),
            this.d.on("click", ".more-nav a", function (t) {
                t.stopPropagation(),
                    $(".more-nav").slideToggle()
            }),
            this.d.on("click", ".hide-more", function (t) {
                t.stopPropagation(),
                    $(".more-nav").slideUp()
            }),
            this.d.on("click", ".fn-switch-lines", function () {
                i.doOpenTestLine()
            }),
            this.d.on("click", ".fn-switch-line", function () {
                i.doOpenTestLine(!0),
                    i.slow_count = 0,
                    i.slow_arr = []
            }),
            this.d.on("click", ".fn-close-tip", function () {
                $("#slow-tip").remove(),
                    i.slow_count = 0,
                    i.slow_arr = []
            }),
            this.d.on("click", ".fn-notip", function () {
                $("#slow-tip").remove(),
                    i.slow_count = 0,
                    i.slow_arr = [],
                    i.slow_running = !1,
                    setTimeout(function () {
                        i.slow_running = !0
                    }, 6e5)
            })
    }
    ,
    Header.prototype.setTimeSecond = function () {
        var t = this
            , e = (new Date).getHours() + "" + (9 < (new Date).getMinutes() ? (new Date).getMinutes() : "0" + (new Date).getMinutes());
        t.time_second = 220 <= e && e < 910 ? 1500 : 10,
            t.timer_second = setTimeout(function () {
                t.setTimeSecond()
            }, 168e4)
    }
    ,
    Header.prototype.initAudio = function () {
        window.Audio && (this.oAudioFull = new Audio,
            this.oAudioLack = new Audio,
            this.oAudioFull.muted = !0,
            this.oAudioLack.muted = !0
            // this.oAudioFull.src = PROTOCOL + "www.qxfile.com/music/success.mp3",
            // this.oAudioLack.src = PROTOCOL + "www.qxfile.com/music/fail.mp3"
        )
    }
    ,
    Header.prototype.playAudio = function (t) {
        try {
            this.oAudioFull.currentTime = 0,
                this.oAudioLack.currentTime = 0,
                (t ? this.oAudioLack : this.oAudioFull).play()
        } catch (e) { }
    }
    ,
    Header.prototype.popupmin = function () {
        this.dom.popup.animate({
            bottom: "-164px"
        }, function () {
            $(".btn-min", this).addClass("btn-max")
        })
    }
    ,
    Header.prototype.doPrint = function (t) {
        t.prop("disabled", !0),
            G.post({
                url: "/Member/UpdatePrintNo",
                data: {
                    print_no: this.serial_no,
                    bet_id: this.bet_id
                },
                success: function () {
                    t.parent().parent().hide(),
                        $("#bet_print").printArea(),
                        t.parent().parent().show()
                },
                complete: function () {
                    t.prop("disabled", !1)
                }
            })
    }
    ,
    Header.prototype.getMemberInfo = function (t) {
        var e = this;
        // loadModule({
        //     html: this.tpl_user,
        //     json: "/Member/GetMemberPrint",
        //     bd: this.dom.user,
        //     jsonSuccess: function(t) {
        //         e.input_mode = t.Data.input_mode,
        //         e.credit_balance = t.Data.credit_balance,
        //         e.serial_no = t.Data.serial_no,
        //         e.period_no = t.Data.period_no
        //     }
        // })
    }
    ,
    Header.prototype.getSystemInfo = function (e) {
        var i = this
            , n = $.now()
            , t = i.now_time ? i.now_time.split(" ")[1].split(":") : ["00", "00"]
            , t = t[0] + t[1];
        // 355 < t && t < 410 ? (t = 410..subtract(t).multiply(60).divide(11).toFixed(0),
        // LAST_TIME -= 11,
        // i.times_no == t ? (i.times_no = 1,
        // i.now_time = null) : i.times_no++,
        // e && "reset" == e && (i.timer_status && clearInterval(i.timer_status),
        // i.showSystemInfo({
        //     status: OPEN_STATUS,
        //     last_seconds: LAST_TIME,
        //     period_no: PERIOD_NO,
        //     next_period_no: NEXT_PERIOD_NO
        // }))) : G.get({
        //     url: "/drawno/GetCurrentPeriodStatus",
        //     success: function(t) {
        //         i.doReqStatus(n),
        //         OPEN_STATUS = t.Data.status,
        //         LAST_TIME = t.Data.last_seconds,
        //         PERIOD_NO = t.Data.period_no,
        //         NEXT_PERIOD_NO = t.Data.next_period_no || parseInt(PERIOD_NO) + 1,
        //         i.now_time = t.Data.system_db_now,
        //         e && "reset" == e && (i.timer_status && clearInterval(i.timer_status),
        //         i.showSystemInfo({
        //             status: OPEN_STATUS,
        //             last_seconds: LAST_TIME,
        //             period_no: PERIOD_NO,
        //             next_period_no: NEXT_PERIOD_NO
        //         })),
        //         "" !== IS_PERIOD_OPEN && (1 == IS_PERIOD_OPEN && 0 != OPEN_STATUS || 0 == IS_PERIOD_OPEN && 0 == OPEN_STATUS) && location.reload()
        //     },
        //     error: function() {
        //         i.timer_status && clearInterval(i.timer_status)
        //     }
        // })
    }
    ,
    Header.prototype.showSystemInfo = function (t) {
        var n = $("#systime")
            , e = t.last_seconds
            , i = function (t, e) {
                var i;
                e && 0 <= e && (t += "：",
                    t += (i = parseInt(e / 86400)) + "天",
                    e -= 86400 * i,
                    t += (i = parseInt(e / 3600)) + "小时",
                    e -= 3600 * i,
                    t += (i = parseInt(e / 60)) + "分",
                    t += e - 60 * i + "秒"),
                    n.html(t)
            };
        99 == t.status ? i("期号未初始化") : 0 == t.status ? this.doCountDown(t, e, i, "current_period") : 1 == t.status || 4 == t.status ? this.doCountDown(t, e, i) : -1 == t.status ? i("获取期数出错") : (t.status = -99,
            i("已休市"))
    }
    ,
    Header.prototype.doCountDown = function (t, e, i, n) {
        var r = this
            , o = ""
            , s = (s = window.location.hash).split(/&|\?|\./, 1)[0]
            , o = n && "current_period" == n ? "距离" + t.period_no + "期封盘还有" : "距离" + t.next_period_no + "期开盘还有";
        i(o, e),
            e <= 0 ? (this.timer_status && clearInterval(this.timer_status),
                10 < this.count || (this.count++,
                    r.getSystemInfo("reset"))) : this.timer_status = setInterval(function () {
                        e <= 0 && (setTimeout(function () {
                            r.count = 0,
                                G.mapping_name.navLists.indexOf(s) < 0 && location.reload()
                        }, 1e3),
                            clearInterval(r.timer_status)),
                            i(o, --e)
                    }, 1e3)
    }
    ,
    Header.prototype.doUpdateOpenStatus = function (t) {
        var e = this;
        window.time_out && clearTimeout(window.time_out),
            window.time_out = setTimeout(function () {
                t <= 0 ? (clearTimeout(window.time_out),
                    clearInterval(e.timer_status),
                    e.getSystemInfo("reset"),
                    t = e.time_second) : --t,
                    e.doUpdateOpenStatus(t)
            }, 1e3)
    }
    ,
    Header.prototype.getNetTest = function (e) {
        var i, n, r, o = this;
        e && 0 < e.length ? (e.text("测速中..."),
            i = (new Date).getTime(),
            G.get({
                url: "/Member/NetTestGet",
                data: {},
                success: function (t) {
                    n = (new Date).getTime(),
                        r = n.subtract(i),
                        o.setMillisecond(r, !0),
                        e.text("网络测速")
                },
                bussiness: function (t) {
                    $.alert(t),
                        e.text("网络测速")
                },
                error: function () {
                    $.alert("测速失败，请重试！"),
                        e.text("网络测速")
                }
            })) : (i = (new Date).getTime(),
                G.get({
                    url: "/Member/NetTestGet",
                    data: {},
                    success: function (t) {
                        n = (new Date).getTime(),
                            r = n.subtract(i),
                            o.setMillisecond(r, !1)
                    }
                }))
    }
    ,
    Header.prototype.getNetTestForFastLogin = function (e) {
        var i, n = this, r = (new Date).getTime();
        G.get({
            url: "/Member/NetTestGet",
            data: {},
            success: function (t) {
                i = (new Date).getTime(),
                    i = i.subtract(r),
                    n.setNetTest(i, e)
            }
        })
    }
    ,
    Header.prototype.setMillisecond = function (t, e) {
        var i = "";
        t <= 75 ? i = "6" : 75 < t && t <= 130 ? i = "5" : 130 < t && t <= 270 ? i = "4" : 270 < t && t <= 500 ? i = "3" : 500 < t && t <= 1500 ? i = "2" : 1500 < t && (i = "1"),
            e && $.alert("<span class='f14'>您的网络测速结果为：</span><span><img src='/Images/" + i + "star.png'></span>"),
            this.setNetTest(t, !0 === e ? 1 : 0)
    }
    ,
    Header.prototype.setNetTest = function (t, e) {
        G.post({
            url: "/Member/NetTestSet",
            data: {
                timespent: t,
                logtype: e
            },
            success: function () { }
        })
    }
    ,
    Header.prototype.doReqStatus = function (t) {
        var i, n = this;
        !this.slow_running || (i = $.now()) - t >= this.slow_time && (this.slow_arr.push(t),
            4 == this.slow_arr.length && this.slow_arr.shift(),
            3 == this.slow_arr.length && (this.slow_count = 0,
                $.each(this.slow_arr, function (t, e) {
                    i - e <= n.slow_rangetime && n.slow_count++
                }),
                3 == this.slow_count && (this.showSlowTip(),
                    this.slow_count = 0,
                    this.slow_arr = [])))
    }
    ,
    Header.prototype.showSlowTip = function () {
        document.getElementById("slow-tip") || $("<div class='slow-tip' id='slow-tip' style='position:absolute;z-index:101; box-sizing:border-box; padding:5px; border:1px solid #ff0000; background:yellow; color:#ff0000; top:-50px'>" + this.slow_tip + " <input type='button' value='是' class='btn fn-switch-line' /> <input type='button' value='否' class='btn btn-gray fn-close-tip' /> <input type='button' value='关闭(10分钟之内不再提示)' class='btn btn-gray fn-notip' /></div>").appendTo(this.d).animate({
            top: 0
        }).delay(3e4).queue(function () {
            $(this).dequeue().remove()
        })
    }
    ,
    Header.prototype.doOpenTestLine = function (t) {
        G.get({
            url: "/Member/GetSwitchUrl",
            data: {
                is_mobile: 0
            },
            success: function (t) {
                0 < t.Data.Token.length && $.dialog({
                    title: "线路切换",
                    width: 300,
                    html: "<div class='testline' name='module' id='testline'><div class='bd'></div></div>",
                    param: {
                        token: t.Data.Token
                    }
                })
            }
        })
    }
    ,
    G.modules.header = Header,
    TestLine.prototype.init = function () {
        var t = this;
        this.bd = $(".bd", this.d),
            t.getCompanyUrl(),
            this.d.on("click", "a", function () {
                return !(0 <= t.flag) && void (t.flag = 0)
            })
    }
    ,
    TestLine.prototype.getCompanyUrl = function () {
        var e = this;
        G.get({
            url: "/Member/GetCompanyUrl?is_mobile=0&is_all=1",
            success: function (t) {
                e.setIP(),
                    t.Data.length && $.isArray(t.Data) ? (e.arr_line = t.Data,
                        e.checkLine(t.Data)) : e.gotoUrl(location.host)
            }
        })
    }
    ,
    TestLine.prototype.gotoUrl = function (t) {
        0 != this.flag && (this.flag = 1,
            location.href = PROTOCOL + t + "/Member/FastLogin?_=" + (new Date).getTime() + "&Token=" + this.token)
    }
    ,
    TestLine.prototype.checkLine = function (t) {
        t.length <= 0 && gotoUrl(location.host);
        var e = 0
            , i = t.length
            , n = "<table class='t-1'><tr><td>当前IP: <span class='red' id='my_ip'><span></td></tr></table><table class='t-1' style='margin: 10px auto 0;'><thead><tr><td>线路</td><td>响应时间</td><td></td></tr></thead><tbody class='fn-hover'>"
            , r = $.now();
        this.lineCount = i;
        for (var o = referenceSiteTest(e); e < i; e++)
            e < 4 && this.getNetSpeed(t[e], e),
                n += "<tr class='item' id='item_" + e + "'><td><a href='" + PROTOCOL + t[e] + "/Member/FastLogin?_=" + r + "&Token=" + this.token + "'>Line " + (e + 1) + "</a></td><td><span id='line" + e + "'>Checking...</span><span class='status'>最佳</span></td><td><a href='" + PROTOCOL + t[e] + "/Member/FastLogin?_=" + r + "&Token=" + this.token + "' class='btn'>选择</a></td></tr>";
        n += "</tbody></table>",
            n += "<table class='t-1' style='margin: 10px auto 0;'><tr><td>参考站点测试</td></tr></table>",
            n += "<table class='t-1' style='margin: 10px auto 0;' id='referencelines'><td>线路</td><td>响应时间</td>" + o + "</table>",
            this.bd.html(n)
    }
    ,
    TestLine.prototype.getNetSpeed = function (i, n) {
        var r, o, s = this, t = 500;
        s.threadCount++,
            s.index++,
            window["callback" + n] = function () { }
            ,
            1 == n && (i = s.arr_line[8]),
            n < 4 && (t = 500 * n),
            setTimeout(function () {
                r = $.now(),
                    $.ajax({
                        type: "get",
                        cache: !1,
                        url: PROTOCOL + i + "/Member/GetNetSpeed",
                        timeout: s.timeout,
                        dataType: "jsonp",
                        jsonp: "jsonp",
                        jsonpCallback: "callback" + n,
                        success: function (t) {
                            o = $.now(),
                                3 < n && n < 8 && (o += 100),
                                s.timeArr.push({
                                    time: o - r,
                                    src: i,
                                    index: n
                                });
                            var e = o - r
                                , e = e < 5e3 ? e : "超时";
                            $("#line" + n).html(e)
                        },
                        error: function (t, e) {
                            s.timeArr.push({
                                time: 99999,
                                src: i,
                                index: n
                            }),
                                $("#line" + n).html("超时")
                        },
                        complete: function (t, e) {
                            s.threadCount--,
                                "timeout" == e && (s.timeArr.push({
                                    time: 99999,
                                    src: i,
                                    index: n
                                }),
                                    $("#line" + n).html("超时")),
                                s.index < s.lineCount ? s.getNetSpeed(s.arr_line[s.index], s.index) : s.index >= s.lineCount && s.threadCount <= 0 && s.test()
                        }
                    })
            }, t)
    }
    ,
    TestLine.prototype.test = function () {
        var t, e = this;
        this.timeArr.sort(function (t, e) {
            return t.time - e.time
        }),
            t = this.timeArr[0],
            $("#item_" + t.index).addClass("best"),
            this.timer = setTimeout(function () {
                e.gotoUrl(t.src)
            }, 12e3)
    }
    ,
    TestLine.prototype.destroy = function () {
        this.timer && clearTimeout(this.timer)
    }
    ,
    referenceSiteTest = function (e) {
        var i = ""
            , r = $.now()
            , t = Array("https://www.hinet.net", "https://www.baidu.com");
        return $.each(t, function (n, t) {
            i += "<tr><td style='width:60%'><a style='color:black;'>" + t + "</a></td><td><span class='line-speed' id='reference" + n + "'>Checking...</span></td></tr>",
                window["callback" + (e + n)] = function () { }
                ,
                $.ajax({
                    cache: !1,
                    url: t,
                    timeout: 260,
                    dataType: "jsonp",
                    jsonp: "jsonp",
                    jsonpCallback: "callback" + (e + n),
                    complete: function (t, e) {
                        var i = $.now() - r
                            , i = i < 5e3 ? i : "超时";
                        $("#reference" + n).html(i)
                    }
                })
        }),
            i
    }
    ,
    TestLine.prototype.setIP = function (t) {
        $.ajax({
            url: "/Member/GetNetSpeed",
            dataType: "jsonp",
            jsonp: "jsonp",
            jsonpCallback: "callback",
            success: function (t) {
                $("#my_ip").html(t.ip)
            }
        })
    }
    ,
    Header.prototype.getFastLoginNetTest = function () {
        var t = unescape(window.location.href)
            , t = $.unparam(t);
        if (t.loginType !== undefined && 0 !== t.loginType)
            return this.getNetTestForFastLogin(t.loginType),
                void G.util.setHash("#!kuaida")
    }
    ,
    G.modules.testline = TestLine,
    Info.prototype.init = function () {
        var t = this;
        this.dom.selects = $("#tbody select").on("change", function () {
            t.changeOdds(this)
        }),
            this.dom.form = $("form", this.d),
            this.dom.form.validate({
                submitHandler: function () {
                    t.doSave()
                }
            }),
            this.dom.btnSubmit = $(":submit", this.dom.form),
            this.d.on("click", ".fn-switch", function () {
                t.doSwitch(this)
            }),
            this.d.on("click", ".fn-ico-switch", function () {
                t.switchImage(this)
            }),
            this.dom.addr = $("#addr"),
            window.android && this.dom.addr.val(window.android.getStoreName()),
            t.getMemberInfo(),
            this.bindSelect()
    }
    ,
    Info.prototype.bindSelect = function () {
        this.select1 = $("select[_name=return_water]", this.d),
            this.select2 = $("select[_name=odds_limit]", this.d),
            this.renderSelect(0)
    }
    ,
    Info.prototype.renderSelect = function (t) {
        var e, i, n = this, r = "", o = "";
        t < this.select1.length ? (e = n.json.Data.Setting[t],
            $.each(e.return_water_rate, function () {
                i = e.self_return_water_rate == this ? "selected" : "",
                    r += "<option value='" + this + "' " + i + ">" + this + "</option>"
            }),
            this.select1.eq(t).html(r).removeClass("hide"),
            e.odds_array.length ? $.each(e.odds_array, function () {
                i = e.self_current_odds == this ? "selected" : "",
                    o += "<option value='" + this + "' " + i + ">" + this + "</option>"
            }) : o = "<option value='" + e.self_current_odds + "'>" + e.self_current_odds + "</option>",
            this.select2.eq(t).html(o).removeClass("hide"),
            this.timer = setTimeout(function () {
                n.renderSelect(t + 1)
            }, 0)) : this.dom.btnSubmit.prop("disabled", !1)
    }
    ,
    Info.prototype.switchImage = function (t) {
        var e = $(t).attr("_target")
            , i = CDN_URL + "/Images/ico-close-large.gif"
            , n = CDN_URL + "/Images/ico-open-large.gif";
        t.open ? (t.firstChild.src = i,
            t.open = !1) : (t.firstChild.src = n,
                t.open = !0),
            $("#" + e).toggle()
    }
    ,
    Info.prototype.changeOdds = function (t) {
        var e = t.className.split(/\s/)[1];
        this.dom.selects.each(function () {
            if (t != this)
                if (t.getAttribute("selectall"))
                    this.getAttribute("index") == t.getAttribute("index") ? this.selectedIndex = t.selectedIndex : $("option[value='" + t.value + "']", this).length && -1 != this.className.indexOf(e) && ($(this).val(t.value),
                        $(this).parent().siblings().find("select")[0].selectedIndex = this.selectedIndex);
                else if (this.getAttribute("index") == t.getAttribute("index"))
                    return this.selectedIndex = t.selectedIndex,
                        !1
        })
    }
    ,
    Info.prototype.doSwitch = function (t) {
        var e = t.getAttribute("act");
        1 == t.getAttribute("status") ? (document.getElementById(e + "_img").src = CDN_URL + "/Images/ico-open-large.gif",
            document.getElementById(e + "_tr").className = "hide",
            t.setAttribute("status", "0")) : (document.getElementById(e + "_img").src = CDN_URL + "/Images/ico-close-large.gif",
                document.getElementById(e + "_tr").className = "",
                t.setAttribute("status", "1"))
    }
    ,
    Info.prototype.doSave = function () {
        var t, e = this, i = [];
        this.dom.selects.filter("[id]").each(function () {
            t = {
                dict_no_type_id: this.id,
                return_water: this.value
            },
                i.push(t)
        }),
            document.getElementById("setting").value = JSON.stringify(i),
            this.dom.btnSubmit.prop("disabled", !0),
            G.post({
                url: "/Member/UpdateMember",
                data: this.dom.form.serialize(),
                success: function () {
                    $.alert("保存成功!"),
                        doc.triggerHandler("update")
                },
                complete: function () {
                    e.dom.btnSubmit.prop("disabled", !1)
                }
            }),
            window.android && window.android.sendMessage(5, $.trim(this.dom.addr.val()).replace(/</g, "").replace(/>/g, ""))
    }
    ,
    Info.prototype.destroy = function () {
        this.timer && clearTimeout(this.timer)
    }
    ,
    Info.prototype.getMemberInfo = function (t) {
        var e = this;
        (t = t || {}) && (t.t = $.now()),
            loadModule({
                html: $("#tpl_user").html(),
                json: "/Member/GetMemberPrint",
                bd: $("#user"),
                param: t,
                jsonSuccess: function (t) {
                    if (e.input_mode = t.Data.input_mode,
                        e.credit_assigned = t.Data.credit_assigned,
                        t.Data.max_id && t.Data.max_id < e.max_id)
                        return -1;
                    e.max_id = t.Data.max_id,
                        e.serial_no = t.Data.serial_no
                }
            })
    }
    ,
    G.modules.info = Info,
    Kuaida.prototype.init = function () {
        main.addClass("main-kuaida");
        var i = this;
        this.getBetLack(),
            this.dom.guid = $("#guid").val(G.util.guid()),
            this.dom.betarea = $("#betarea"),
            this.dom.selectall = $("#selectAll").on("change", function () {
                $("input:checkbox", i.dom.tbody).prop("checked", this.checked)
            }),
            this.d.on("click", ".fn-more", function () {
                i.doPrintMore(this)
            }),
            this.d.on("click", ".fn-cancelbet", function () {
                i.doCancelBet()
            }),
            this.dom.tbody = $("#tbody"),
            this.tpl_refresh = $("#tpl_refresh").html(),
            this.dom.form = $("form", this.d),
            this.dom.form.validate({
                submitHandler: function () {
                    i.doSave()
                }
            }),
            this.dom.btnSubmit = $("#btnSubmit"),
            this.dom.betno = $("#betno").on("click", function () {
                this.value = "",
                    i.old = "",
                    i.flag = 0,
                    i.changeCursor(),
                    i.changeKeyBoard()
            }),
            this.dom.betmoney = $("#betmoney").on("click", function () {
                this.value = "",
                    i.old = "",
                    i.flag = 1,
                    i.changeCursor(),
                    i.changeKeyBoard(),
                    i.getOdds()
            }),
            this.dom.item_type = $(".fn-bet-type").on("click", function () {
                i.old = "",
                    i.betType = $(this).attr("data-value"),
                    "1" === i.betType ? (i.dom.xian.show(),
                        i.dom.allconvert.prop("checked", !1).prop("disabled", !0),
                        i.dom.betno.attr("maxlength", 4).val(""),
                        /\d{4}/.test(i.dom.betno.val()) && i.getOdds()) : "2" === i.betType ? (i.dom.xian.hide(),
                            i.dom.allconvert.prop("checked", !1).prop("disabled", !1),
                            i.dom.betno.attr("maxlength", 5).val(""),
                            /\dx{3}\d$|x\dx{2}\d$|x{2}\dx\d$|x{3}\d{2}$/gi.test(i.dom.betno.val()) && i.getOdds()) : "3" === i.betType ? (i.dom.xian.hide(),
                                i.dom.allconvert.prop("checked", !1).prop("disabled", !1),
                                i.dom.betno.attr("maxlength", 4).val("")) : "4" === i.betType && (i.dom.xian.hide(),
                                    i.dom.allconvert.prop("checked", !1).prop("disabled", !0),
                                    i.dom.betno.attr("maxlength", 5).val(""),
                                    /\dx{4}|x\dxxx|xx\dxx|xxx\dx|x{4}\d/gi.test(i.dom.betno.val()) && i.getOdds()),
                    i.dom.isfulltransform.val(0)
            }),
            this.dom.betmoney.on("keyup", function () {
                /^\d+(\.\d{0,1})?$/.test(this.value) || !this.value ? this.old = this.value || 0 : this.value = this.old || ""
            }),
            this.dom.toxian = $("#toxian").on("click", function () {
                this.checked ? (i.dom.xian = $("#xian").removeClass("hide"),
                    i.dom.isxian.val(1),
                    i.dom.isfulltransform.val(0)) : (i.dom.xian = $("#xian").addClass("hide"),
                        i.dom.isxian.val(0)),
                    /\d{4}/.test(i.dom.betno.val()) && i.getOdds()
            }),
            this.dom.allconvert = $("#allconvert").on("click", function () {
                i.setIsXian(i.dom.betno.val()),
                    this.checked ? (i.dom.isfulltransform.val(1),
                        i.dom.toxian.prop("checked", !1),
                        i.dom.xian = $("#xian").addClass("hide")) : i.dom.isfulltransform.val(0)
            }),
            this.dom.xian = $("#xian"),
            this.dom.isxian = $("#isxian"),
            this.dom.isfulltransform = $("#isfulltransform"),
            this.dom.betno_odds = $("#betno_odds"),
            this.dom.limit_odds = $("#limit_odds"),
            this.dom.limit_betmoney = $("#limit_betmoney"),
            this.dom.limit_betmoneyspan = this.dom.limit_betmoney.parent(),
            this.d.on("change", "#selectAll_lack", function () {
                $("#tbody_lack input:checkbox").prop("checked", this.checked)
            }),
            this.d.on("change", "#period", function () {
                i.period = this.value,
                    i.getBetLack()
            }),
            this.d.on("click", ".fn-delbetlack", function () {
                i.doDelBetLack()
            }),
            this.d.on("click", ".fn-print", function () {
                window.android && window.android.sendMessage(2, G.instance.pager_print.pageIndex, 500)
            }),
            this.d.on("click", ".fn-clear", function () {
                "0" != $("#recordsCount").html() && G.get({
                    url: "/Member/CleanPrint",
                    success: function (t) {
                        $.alert("操作成功!", function () {
                            i.getMemberInfo(),
                                window.android && i.doRestore()
                        })
                    }
                })
            }),
            this.dom.keyboard = $("#keyboard").on("click", "input", function () {
                var t, e;
                $("[name=is_xian]").attr("data-value");
                "btnSubmit" == this.id ? (i.old = "",
                    i.flag ? i.dom.form.valid() && i.doSave() : (i.flag = 1,
                        i.changeKeyBoard(),
                        i.getOdds())) : i.flag ? ((e = i.dom.betmoney[0]).value,
                            i.fristTimes ? e.value = e.value + this.value : (e.value = this.value,
                                i.fristTimes = 1),
                            /^\d+(\.\d{0,1})?$/.test(e.value) || !e.value ? e.old = e.value || 0 : e.value = e.old || "") : ((e = i.dom.betno[0]).value,
                                e.value = e.value + this.value,
                                i.setIsXian(e.value),
                                5 == e.getAttribute("maxlength") && (t = /^[\d+x+]+$/gi,
                                    4 == e.value.length && 2 == i.betType ? t = /\dxxx|x\dxx|xx\dx|xxx\d/gi : 4 == e.value.length && 4 == i.betType ? t = /\dxxx|x\dxx|xx\dx|xxx\d|xxxx/gi : 5 == e.value.length && 2 == i.betType ? t = /\dx{3}\d$|x\dx{2}\d$|x{2}\dx\d$|x{3}\d{2}$/gi : 5 == e.value.length && 4 == i.betType && (t = /\dx{4}|x\dxxx|xx\dxx|xxx\dx|x{4}\d/gi),
                                    1 == e.value.length && /x|\d/gi.test(e.value) || !this.value || 2 == e.value.length && /\dx|x\d|xx/gi.test(e.value) || 3 == e.value.length && /\dxx|x\dx|xx\d|xxx/gi.test(e.value) || 4 <= e.value.length && t.test(e.value) ? i.old = e.value || 0 : e.value = i.old || ""),
                                e.value.length == e.getAttribute("maxlength") && (i.flag = 1,
                                    i.changeKeyBoard(),
                                    i.dom.betmoney.trigger("select"),
                                    i.getOdds(),
                                    i.fristTimes = 0))
            }),
            this.d.on("click", ".fn-restore", function () {
                i.doRestore()
            }),
            $("#bd_print").length && (this.getMemberInfo(),
                doc.on("update.kuaida", function () {
                    i.getMemberInfo()
                }))
    }
    ,
    Kuaida.prototype.doRestore = function () {
        this.dom.betarea.removeClass("hide").prev().addClass("hide"),
            $("#bd_pager").addClass("hide"),
            $("#bd_clear").addClass("hide"),
            $("#bd_more").removeClass("hide"),
            $("#bd_print_list").removeClass("bd_print_list_max")
    }
    ,
    Kuaida.prototype.doPrintMore = function (t) {
        t = $(t.parentNode).addClass("hide");
        $("#bd_print_list").addClass("bd_print_list_max"),
            t.prev().removeClass("hide"),
            t.next().removeClass("hide"),
            this.dom.betarea.addClass("hide").prev().removeClass("hide")
    }
    ,
    Kuaida.prototype.getMemberInfo = function () {
        loadModule({
            html: $("#tpl_print").html(),
            json: "/Member/GetMemberPrint",
            bd: $("#bd_print")
        })
    }
    ,
    Kuaida.prototype.changeKeyBoard = function () {
        this.flag ? this.dom.keyboard.addClass("keyboard-money").find("#x").val(".") : this.dom.keyboard.removeClass("keyboard-money").find("#x").val("X"),
            this.changeCursor()
    }
    ,
    Kuaida.prototype.changeCursor = function () {
        this.flag ? ($("#betmoney").attr("placeholder", "|"),
            $("#betno").removeAttr("placeholder")) : ($("#betno").attr("placeholder", "|"),
                $("#betmoney").removeAttr("placeholder"))
    }
    ,
    Kuaida.prototype.doCancelBet = function () {
        var t, e = this, i = [];
        $("input:checkbox:checked", this.dom.tbody).each(function () {
            i.push(this.id)
        }),
            i.length ? (doc.triggerHandler("update.header"),
                t = G.instance.header.period_no,
                $.confirm("你确认要退掉选中的号码吗？", function () {
                    G.post({
                        url: "/Member/CancelMemberBet",
                        data: {
                            ids: i.join(","),
                            period_no: t
                        },
                        success: function (t) {
                            $.alert(t.Data),
                                e.doAfterAjax(),
                                window.android && window.android.sendMessage(4)
                        }
                    })
                })) : $.alert("未选择任何项!")
    }
    ,
    Kuaida.prototype.doDelBetLack = function () {
        var t = this
            , e = [];
        $("#tbody_lack input:checkbox:checked").each(function () {
            e.push(this.id)
        }),
            e.length ? $.confirm("确定删除这些停押号码吗?", function () {
                G.post({
                    url: "/Member/DeleteBetLack",
                    data: {
                        ids: e.join(","),
                        periodno: document.getElementById("period").value
                    },
                    success: function () {
                        $.alert("操作成功!"),
                            t.getBetLack()
                    }
                })
            }) : $.alert("未选择任何项!")
    }
    ,
    Kuaida.prototype.getBetLack = function () {
        this.tpl_betlack = $("#tpl_betlack").html(),
            this.dom.betlack = $("#betlack"),
            loadModule({
                html: this.tpl_betlack,
                json: "/Member/GetBetLack",
                bd: this.dom.betlack,
                param: {
                    periodno: this.period
                }
            })
    }
    ,
    Kuaida.prototype.setIsXian = function (t) {
        var e;
        G.util.checkBetNo(t) && (2 == (e = t.length) || 3 == e || !/[xX]/.test(t) && this.dom.toxian[0].checked && !this.dom.allconvert[0].checked ? this.dom.isxian.val(1) : this.dom.isxian.val(0))
    }
    ,
    Kuaida.prototype.getOdds = function () {
        var e = this
            , t = this.dom.betno.val();
        G.util.checkBetNo(t) && G.get({
            url: "/Member/GetBetOddsAndBalance",
            data: {
                betno: t,
                isxian: this.dom.isxian.val()
            },
            success: function (t) {
                (t = t.Data).IsShowBalance ? e.dom.limit_betmoneyspan.removeClass("hide") : e.dom.limit_betmoneyspan.addClass("hide"),
                    e.dom.limit_betmoney.html(t.Balance),
                    e.dom.betno_odds.removeClass("hide"),
                    e.dom.limit_odds.html(t.Odds)
            }
        })
    }
    ,
    Kuaida.prototype.doSave = function () {
        var e = this;
        this.setIsXian(this.dom.betno.val()),
            this.dom.btnSubmit.prop("disabled", !0),
            G.post({
                url: "/Member/Bet",
                data: this.dom.form.serialize(),
                success: function (t) {
                    e.dom.limit_betmoney.html(""),
                        e.dom.limit_odds.html(""),
                        doc.triggerHandler("playAudio.audio", t.Data.LackStatus),
                        e.doAfterAjax(t.Data),
                        window.android && window.android.sendMessage(4)
                },
                complete: function () {
                    e.dom.btnSubmit.prop("disabled", !1),
                        e.dom.guid.val(G.util.guid())
                }
            })
    }
    ,
    Kuaida.prototype.doAfterAjax = function (t) {
        loadModule({
            html: this.tpl_refresh,
            json: "/Member/GetKuaidaList",
            bd: this.dom.tbody
        }),
            this.reset(),
            t ? (1 == t.CompletedStatus && doc.triggerHandler("update"),
                1 == t.LackStatus && this.getBetLack()) : doc.triggerHandler("update")
    }
    ,
    Kuaida.prototype.reset = function () {
        this.dom.betno.val(""),
            this.dom.selectall.prop("checked", !1),
            this.flag = 0,
            this.changeKeyBoard()
    }
    ,
    Kuaida.prototype.destroy = function () {
        main.removeClass("main-kuaida")
    }
    ,
    G.modules.kuaida = Kuaida,
    Kuaixuan.prototype.init = function () {
        var e = this;
        this.cache = {
            qian: "",
            bai: "",
            shi: "",
            ge: ""
        },
            this.d.on("blur", ":text", function () {
                e.setCache(this)
            }),
            this.tpl_number = $("#tpl_number").html(),
            this.bd_template = $("#bd_template"),
            this.dom.numberList = $("#numberList"),
            this.dom.bet_money = $("#bet_money"),
            this.dom.numberCount = $("#numberCount"),
            this.dom.numberCount2 = $("#numberCount2"),
            this.dom.numberAmount = $("#numberAmount"),
            this.dom.sendForm = $("#sendForm", this.d),
            this.dom.createForm = $("#createForm", this.d),
            this.dom.sendForm.validate({
                submitHandler: function () {
                    e.doSave()
                }
            }),
            this.d.on("click", ".fn-module", function () {
                var t = this;
                "on" != this.parentNode.className && (e.codeMaker.numberList.length ? $.confirm("生成数据还没有下注，确定要切换菜单吗?", function () {
                    e.tabChange(t)
                }) : e.tabChange(t))
            }),
            this.loadTemplate("erd"),
            this.initMaker(),
            this.dom.tab_kuaixuan = $("#tab_kuaixuan td")
    }
    ,
    Kuaixuan.prototype.setCache = function (t) {
        this.cache[t.name] !== undefined && (this.cache[t.name] = t.value)
    }
    ,
    Kuaixuan.prototype.doSave = function () {
        this.codeMaker.numberList = this.numberList ? this.numberList : this.codeMaker.numberList;
        var t, e, i, n, r, o, s = this.codeMaker, a = this;
        s.numberList.length <= 0 ? $.alert("请至少选择一个号码！") : (doc.triggerHandler("update.header"),
            t = G.instance.header.period_no,
            e = s.numberList.join(","),
            i = $("#bet_money").val(),
            n = s.options.isXian,
            Number(G.instance.header.credit_balance.toFixed1(1)).subtract(s.numberList.length.multiply(Number(i))),
            r = s.logs.join("，"),
            o = s.options.numberType,
            $("#bet_money").prop("disabled", !0),
            $("#btn_bet").prop("disabled", !0),
            $("#numberList").hide(),
            $(".betStatus").show(),
            $(".betStatus span").text(s.numberList.length),
            localStorage.setItem('lastMoney', i),
            window.parent.postMessage("selectionInput", "*")
            //location.href = `./index.html?toast=1`
            )
            var postData = transSelectAll(this.options, this, G, this.codeMaker);
            console.log(postData)
            console.log($("#operation_condition").val());
        // 返回房间

        // G.post({
        //     url: "/Member/MultipleBet",
        //     data: {
        //         bet_number: e,
        //         bet_money: i,
        //         bet_way: 102,
        //         is_xian: n,
        //         number_type: o,
        //         bet_log: r,
        //         guid: a.guid,
        //         period_no: t,
        //         operation_condition: $("#operation_condition").val()
        //     },
        //     send: !0,
        //     success: function (t) {
        //         doc.triggerHandler("playAudio.audio", t.Data.LackStatus),
        //             window.android ? (window.android.sendMessage(3),
        //                 window.android.sendMessage(4),
        //                 $("#btn_bet").prop("disabled", !1),
        //                 $("#bet_money").prop("disabled", !1)) : (doc.triggerHandler("update"),
        //                     "1" == t.Data.LackStatus ? G.util.setHash("#!kuaida") : $.alert("下注成功！", function () {
        //                         G.util.reload()
        //                     }))
        //     },
        //     error: function () {
        //         $("#btn_bet").prop("disabled", !1),
        //             $("#bet_money").prop("disabled", !1)
        //     },
        //     bussiness: function (t) {
        //         $.alert(t),
        //             $("#btn_bet").prop("disabled", !1),
        //             $("#bet_money").prop("disabled", !1)
        //     },
        //     complete: function () {
        //         $("#numberList").show(),
        //             $(".betStatus").hide(),
        //             a.guid = G.util.guid()
        //     }
        // }))
    }
    ,
    Kuaixuan.prototype.tabChange = function (t) {
        var e = this.codeMaker
            , i = t.getAttribute("module");
        e.reset(),
            this.dom.tab_kuaixuan.each(function () {
                this != t.parentNode ? this.className = "" : this.className = "on"
            }),
            this.loadTemplate(i),
            "erd" == i ? e.choose(20) : "sand" == i ? e.choose(30) : "sid" == i ? e.choose(40) : "erx" == i ? e.choose(21) : "sanx" == i ? e.choose(31) : "six" == i ? e.choose(41) : "fifteen" == i && e.choose(50)
    }
    ,
    Kuaixuan.prototype.initMaker = function () {
        var i = this
            , n = this.codeMaker;
        n.onError = function (err) {
            console.log(err)
            $.alert("请选择或填写条件生成！")
        }
            ,
            n.onReset = function () {
                i.dom.numberList.html(""),
                    i.dom.numberCount.html("0"),
                    i.dom.numberCount2.html("0"),
                    i.dom.numberAmount.html("0"),
                    $("input:text", i.d).val(""),
                    $("input:checkbox", i.d).prop("checked", !1),
                    $(".position-filter:eq(1)", i.d).prop("checked", !0),
                    $(".remain-fixed-filter:eq(1)", i.d).prop("checked", !0),
                    $(".contain-filter:eq(1)").prop("checked", !0);
                var t = n.options.numberType;
                20 != t && 30 != t && 40 != t && 50 != t || (n.options.positionType = 0,
                    n.options.positionFilter = 0,
                    $(".fixed-input").show(),
                    $(".match-input").hide()),
                    r(0)
            }
            ,
            n.onCompleted = function (t) {
                // debugger
                var postData = transSelectAll(this.options, i, G, n)
                getAllCreateNumbers(postData, i, G, n)
                // i.dom.numberList.html($.trim(G.util.compile(i.tpl_number, {
                //     Data: t
                // }))),
                //     i.dom.numberCount.html(t.length);
                // var e = i.dom.bet_money.val();
                // e && 0 < e.length && 0 < t.length && i.dom.numberAmount.html(Math.round(e * t.length * 100) / 100),
                //     i.dom.bet_money.focus(),
                //     $("#operation_condition").val(JSON.stringify(n.options))
            }
            ,
            $("#btn_reset").on("click", function () {
                i.cache = {
                    qian: "",
                    bai: "",
                    shi: "",
                    ge: ""
                },
                    n.reset()
            }),
            i.dom.bet_money.on("keyup", function () {
                /^\d+(\.\d{0,1})?$/.test(this.value) || !this.value ? this.old = this.value || 0 : this.value = this.old || "";
                var t = n.numberList.length
                    , e = "" == this.value ? 0 : parseFloat(this.value);
                i.dom.numberAmount.html(Math.round(e * t * 100) / 100)
            }),
            // this.bd_template.find(".fixed-position-item").each(function(){
            //     $(this).attr("disabled","disabled");
            // }),
            $("#btn_create").on("click", function () {
                return !!i.dom.createForm.valid() && void (i.codeMaker.numberList.length ? $.confirm("上次生成的数据还没有下注完成，需要重新生成吗?", function () {
                    i.createNumber(),
                        setTimeout(function () {
                            i.dom.numberList[0].scrollIntoView(!1)
                        }, 100)
                }) : (i.createNumber(),
                    setTimeout(function () {
                        i.dom.numberList[0].scrollIntoView(!1)
                    }, 100)))
            }),
            $("#btn_create_text").on("click", function () {
                var keyword = $("#keyword").val();
                if(keyword == ''){
                    alert("请输入文本，再生成");
                    return;
                }
                getAllNumbersByText(keyword,i,G,n);
            }),
            this.bd_template.on("blur",".fixed-input input",function(){
                let length = 0;
                $(".fixed-input input").each(function(){
                    var value = $(this).val()
                    if(value && value != '' && value.length > 0){
                        length++;
                    }
                })
                console.log(i.codeMaker.options)
                var num = 0;
                if(i.codeMaker.options.numberType == 20){
                    num = 2
                }else if(i.codeMaker.options.numberType == 30){
                    num = 3
                }else if(i.codeMaker.options.numberType == 40){
                    num = 4
                }else if(i.codeMaker.options.numberType == 50){
                    num = 2
                }
                if(length >= num){
                    $(".upper-filter-item").attr("disabled","disabled");
                }else {
                    $(".upper-filter-item").removeAttr("disabled");
                }
                
            })
            this.bd_template.on("change", ".position-filter", function () {
                var t = $(this).attr("positionFilter")
                    , e = $(this).attr("positionType");
                $(".position-filter").not(this).prop("checked", !1),
                    0 == e ? ($(".fixed-input").show(),
                        $(".match-input").hide()) : ($(".fixed-input").hide(),
                            $(".match-input").show()),
                    $(this).prop("checked") || 0 != $(".position-filter:checked").length || $(this).prop("checked", !0),
                    r(e),
                    n.options.positionFilter = t,
                    n.options.positionType = e
            });
        var r = function (t) {
            40 == n.options.numberType && (0 == t ? $(".gu-ding-wei-zhi").hide().children("input").prop("checked", !1) : $(".gu-ding-wei-zhi").show())
        }
            , e = /^\d+$/
            , o = /1(\d+)?1|2(\d+)?2|3(\d+)?3|4(\d+)?4|5(\d+)?5|6(\d+)?6|7(\d+)?7|8(\d+)?8|9(\d+)?9|0(\d+)?0/;
        this.bd_template.on("keyup", "input", function () {
            var t;
            $(this).parent().hasClass("remain-match-filter-range") || $(this).hasClass("transform-filter-item") || $(this).hasClass("upper-filter-item") || $(this).hasClass("except-filter-item") || ((t = this.value) ? !e.test(t) || o.test(t) ? this.value = this.old || "" : this.old = this.value : this.old = "")
        }).css("ime-mode", "disabled"),
            this.bd_template.on("change", ".remain-fixed-filter", function () {
                $(".remain-fixed-filter").not(this).prop("checked", !1),
                    $(this).prop("checked") || 0 != $(".remain-fixed-filter:checked").length || $(this).prop("checked", !0),
                    n.options.remainFixedFilter = $(this).attr("remainFixedFilter")
            }),
            this.bd_template.on("change", ".remain-match-filter", function () {
                $(".remain-match-filter").not(this).prop("checked", !1),
                    $(this).prop("checked") ? n.options.remainMatchFilter = $(this).attr("remainMatchFilter") : (n.options.remainMatchFilter = 0,
                        $(".remain-match-filter-item input:text").val(""))
            }),
            this.bd_template.on("change", ".contain-filter", function () {
                $(".contain-filter").not(this).prop("checked", !1),
                    $(this).prop("checked") || 0 != $(".contain-filter:checked").length || $(this).prop("checked", !0),
                    $(this).prop("checked") ? (n.options.containFilter = $(this).attr("containFilter"),
                        n.options.multipleFilter = $(this).attr("containFilter")) : (n.options.containFilter = 0,
                            n.options.multipleFilter = 0,
                            $(".contain-filter-item").val(""),
                            $(".multiple-filter-item").val(""))
            }),
            this.bd_template.on("change", ".repeat-two-words-filter", function () {
                $(".repeat-two-words-filter").not(this).prop("checked", !1),
                    $(this).prop("checked") ? 0 == $(this).attr("repeatWordsFilter") ? n.options.repeatTwoWordsFilter = 0 : n.options.repeatTwoWordsFilter = 1 : n.options.repeatTwoWordsFilter = -1
            }),
            this.bd_template.on("change", ".repeat-double-words-filter", function () {
                $(".repeat-double-words-filter").not(this).prop("checked", !1),
                    $(this).prop("checked") ? 0 == $(this).attr("repeatWordsFilter") ? n.options.repeatDoubleWordsFilter = 0 : n.options.repeatDoubleWordsFilter = 1 : n.options.repeatDoubleWordsFilter = -1
            }),
            this.bd_template.on("change", ".repeat-three-words-filter", function () {
                $(".repeat-three-words-filter").not(this).prop("checked", !1),
                    $(this).prop("checked") ? 0 == $(this).attr("repeatWordsFilter") ? n.options.repeatThreeWordsFilter = 0 : n.options.repeatThreeWordsFilter = 1 : n.options.repeatThreeWordsFilter = -1
            }),
            this.bd_template.on("change", ".repeat-four-words-filter", function () {
                $(".repeat-four-words-filter").not(this).prop("checked", !1),
                    $(this).prop("checked") ? 0 == $(this).attr("repeatWordsFilter") ? n.options.repeatFourWordsFilter = 0 : n.options.repeatFourWordsFilter = 1 : n.options.repeatFourWordsFilter = -1
            }),
            this.bd_template.on("change", ".two-brother-filter", function () {
                $(".two-brother-filter").not(this).prop("checked", !1),
                    $(this).prop("checked") ? 0 == $(this).attr("brotherFilter") ? n.options.twoBrotherFilter = 0 : n.options.twoBrotherFilter = 1 : n.options.twoBrotherFilter = -1
            }),
            this.bd_template.on("change", ".three-brother-filter", function () {
                $(".three-brother-filter").not(this).prop("checked", !1),
                    $(this).prop("checked") ? 0 == $(this).attr("brotherFilter") ? n.options.threeBrotherFilter = 0 : n.options.threeBrotherFilter = 1 : n.options.threeBrotherFilter = -1
            }),
            this.bd_template.on("change", ".four-brother-filter", function () {
                $(".four-brother-filter").not(this).prop("checked", !1),
                    $(this).prop("checked") ? 0 == $(this).attr("brotherFilter") ? n.options.fourBrotherFilter = 0 : n.options.fourBrotherFilter = 1 : n.options.fourBrotherFilter = -1
            }),
            this.bd_template.on("change", ".logarithm-number-filter", function () {
                $(".logarithm-number-filter").not(this).prop("checked", !1),
                    $(this).prop("checked") ? 0 == $(this).attr("logarithmNumberFilter") ? n.options.logarithmNumberFilter = 0 : n.options.logarithmNumberFilter = 1 : n.options.logarithmNumberFilter = -1
            }),
            this.bd_template.on("change", ".odd-number-filter", function () {
                $(".odd-number-filter").not(this).prop("checked", !1),
                    $(this).prop("checked") ? 0 == $(this).attr("oddNumberFilter") ? n.options.oddNumberFilter = 0 : n.options.oddNumberFilter = 1 : n.options.oddNumberFilter = -1
            }),
            this.bd_template.on("change", ".even-number-filter", function () {
                $(".even-number-filter").not(this).prop("checked", !1),
                    $(this).prop("checked") ? 0 == $(this).attr("evenNumberFilter") ? n.options.evenNumberFilter = 0 : n.options.evenNumberFilter = 1 : n.options.evenNumberFilter = -1
            })
            this.bd_template.on("change", ".big-number-filter", function () {
                $(".big-number-filter").not(this).prop("checked", !1),
                    $(this).prop("checked") ? 0 == $(this).attr("bigNumberFilter") ? n.options.bigNumberFilter = 0 : n.options.bigNumberFilter = 1 : n.options.bigNumberFilter = -1
            })
            this.bd_template.on("change", ".small-number-filter", function () {
                $(".small-number-filter").not(this).prop("checked", !1),
                    $(this).prop("checked") ? 0 == $(this).attr("smallNumberFilter") ? n.options.smallNumberFilter = 0 : n.options.smallNumberFilter = 1 : n.options.smallNumberFilter = -1
            })
    }
    ,
    Kuaixuan.prototype.createNumber = function () {
        var o = this.codeMaker;
        0 == o.options.positionType ? $(".fixed-input input").each(function () {
            var t = $(this).attr("boxNumber");
            1 == t ? o.options.firstNumber = $(this).val() : 2 == t ? o.options.secondNumber = $(this).val() : 3 == t ? o.options.thirdNumber = $(this).val() : 4 == t ? o.options.fourthNumber = $(this).val() : 5 == t && (o.options.fifthNumber = $(this).val())
        }) : $(".match-input input").each(function () {
            var t = $(this).attr("boxNumber");
            1 == t ? o.options.firstNumber = $(this).val() : 2 == t ? o.options.secondNumber = $(this).val() : 3 == t ? o.options.thirdNumber = $(this).val() : 4 == t ? o.options.fourthNumber = $(this).val() : 5 == t && (o.options.fifthNumber = $(this).val())
        });
        var s = []
            , a = 0;
        $(".remain-fixed-filter-item").each(function (t, e) {
            var i = $("input:text", this).val().split("")
                , n = $("input:checkbox", this);
            if (0 < n.length && 0 < i.length) {
                s[a] = [[], []],
                    n.each(function (t, e) {
                        s[a][0].push(this.checked ? 1 : 0)
                    });
                for (var r = [], o = 0; o < i.length; o++)
                    r.push(parseInt(i[o]));
                s[a][1] = r,
                    a++
            }
        }),
            o.options.remainFixedNumbers = s,
            $(".remain-match-filter-item input:text").val(function (t, e) {
                for (var i = e.split(""), n = [], r = 0; r < i.length; r++)
                    n.push(parseInt(i[r]));
                return o.options.remainMatchNumbers = n,
                    e
            });
        var i = [];
        $(".remain-match-filter-range input:text").each(function (t, e) {
            0 < $(this).val().length && (i[t] = parseInt($(this).val()))
        }),
            o.options.remainValueRanges = i,
            $(".transform-filter-item").val(function (t, e) {
                for (var i = e.split(""), n = [], r = 0; r < i.length; r++)
                    n.push(parseInt(i[r]));
                return o.options.transformNumbers = n,
                    e
            }),
            $(".upper-filter-item").val(function (t, e) {
                for (var i = e.split(""), n = [], r = 0; r < i.length; r++)
                    n.push(parseInt(i[r]));
                return o.options.upperNumbers = n,
                    e
            }),
            $(".except-filter-item").val(function (t, e) {
                for (var i = e.split(""), n = [], r = 0; r < i.length; r++)
                    n.push(parseInt(i[r]));
                return o.options.exceptNumbers = n,
                    e
            });
        var t = [];
        $(".symbol-filter-item").each(function () {
            $(this).prop("checked") ? t.push(1) : t.push(0)
        }),
            o.options.symbolPositions = t;
        var e = [];
        $(".fixed-position-item").each(function () {
            $(this).prop("checked") ? e.push(1) : e.push(0)
        }),
            o.options.fixedPositions = e,
            $(".contain-filter-item").val(function (t, e) {
                for (var i = e.split(""), n = [], r = 0; r < i.length; r++)
                    n.push(parseInt(i[r]));
                return o.options.containNumbers = n,
                    e
            }),
            $(".multiple-filter-item").val(function (t, e) {
                for (var i = e.split(""), n = [], r = 0; r < i.length; r++)
                    n.push(parseInt(i[r]));
                return o.options.multipleNumbers = n,
                    e
            });
        var l = [];
        $(".logarithm-number-item input:text").each(function (t, e) {
            var i = []
                , n = $(this).val();
            if (0 < n.length) {
                for (var r = n.split(""), o = 0; o < r.length; o++)
                    i.push(parseInt(r[o]));
                l.push(i)
            }
        }),
            o.options.logarithmNumbers = l;
        var n = [];
        $(".odd-number-item").each(function () {
            $(this).prop("checked") ? n.push(1) : n.push(0)
        }),
            o.options.oddNumberPositions = n;
        var r = [];
        $(".even-number-item").each(function () {
            $(this).prop("checked") ? r.push(1) : r.push(0)
        }),
            o.options.evenNumberPositions = r;
        var bigList = [];
        $(".big-number-item").each(function () {
            $(this).prop("checked") ? bigList.push(1) : bigList.push(0)
        });
        o.options.bigNumberPositions = bigList;
        var smallList = [];
        $(".small-number-item").each(function () {
            $(this).prop("checked") ? smallList.push(1) : smallList.push(0)
        });
        o.options.smallNumberPositions = smallList;    
            // o.generate()
            o.newGenerate()
    }
    ,
    Kuaixuan.prototype.loadTemplate = function (t) {
        $.extend(this.json.Param, this.cache);
        t = G.util.compile(document.getElementById("tpl_" + t).innerHTML, this.json);
        this.bd_template.html(t)
    }
    ,
    G.modules.kuaixuan = Kuaixuan,
    Pager.prototype.init = function () {
        var n = this;
        this.compile = this.d.attr("compile"),
            this.dom.pagebody = $("#" + (this.d.attr("pagebody") || "pagebody")),
            this.dom.pageindex = $(".pageindex", this.d),
            this.dom.recordcount = $(".recordcount", this.d),
            this.dom.pagecount = $(".pagecount", this.d),
            this.dom.input_index = $(".fn-index", this.d).on("blur", function () {
                var t = parseInt(this.value, 10);
                isNaN(t) || t <= 0 ? this.value = "" : t > n.pageCount && (this.value = n.pageCount)
            }).on("keydown", function (t) {
                13 === t.keyCode && ($(this).triggerHandler("blur"),
                    n.dom.go.trigger("click"))
            }),
            this.dom.go = $(".fn-go", this.d).on("click", function () {
                "" !== n.dom.input_index.val() && (n.original = n.pageIndex,
                    n.pageIndex = parseInt(n.dom.input_index.val(), 10),
                    n.getPage())
            }),
            this.action = this.formatAction(this.d.attr("action")),
            this.template = (this.d.attr("template") ? $("#" + this.d.attr("template")) : $("#template_pager")).html(),
            this.pageCount = this.d.attr("pagecount"),
            this.param = this.d.attr("param"),
            this.pageIndex = parseInt(this.dom.pageindex.html()),
            this.original = this.pageIndex,
            this.dom.fnFirst = $(".fn-first", this.d).on("click", function () {
                1 != n.pageIndex && (n.original = n.pageIndex,
                    n.pageIndex = 1,
                    n.getPage())
            }),
            this.dom.fnPrev = $(".fn-prev", this.d).on("click", function () {
                1 < n.pageIndex && (n.original = n.pageIndex,
                    --n.pageIndex,
                    n.getPage())
            }),
            this.dom.fnNext = $(".fn-next", this.d).on("click", function () {
                n.pageIndex < n.pageCount && (n.original = n.pageIndex,
                    n.pageIndex += 1,
                    n.getPage())
            }),
            this.dom.fnLast = $(".fn-last", this.d).on("click", function () {
                n.pageIndex != n.pageCount && (n.original = n.pageIndex,
                    n.pageIndex = n.pageCount,
                    n.getPage())
            }),
            $(document).bind("pageinit." + this.d.attr("id"), function (t, e) {
                n.pageInit(e)
            }),
            $(document).bind("pagereset." + this.d.attr("id"), function (t, e, i) {
                "pager" == n.id && n.pagereset(e, i)
            }),
            $(document).bind("pagereload." + this.d.attr("id"), function (t) {
                "pager" == n.id && n.getPage()
            })
    }
    ,
    Pager.prototype.pagereset = function (t, e) {
        this.pageIndex = 1,
            this.pageCount = t.Data.PageCount,
            this.param = $.isPlainObject(e) ? $.param(e) : e,
            this.dom.pageindex.html(1),
            this.dom.pagecount.html(this.pageCount),
            this.dom.recordcount.html(t.Data.RecordCount)
    }
    ,
    Pager.prototype.formatAction = function (t) {
        var e = null;
        return /^\/[\w0-9]+\/[\w0-9]+$/.test(t) || (e = t.split("."),
            t = G.map[e[0]].json[e[1] || e[0]],
            e = null),
            t
    }
    ,
    Pager.prototype.pageInit = function (t) {
        this.pageIndex = 1,
            this.param = t,
            this.getPage()
    }
    ,
    Pager.prototype.bind = function (t) {
        this.dom.pageindex.html(t.Data.PageIndex),
            this.dom.recordcount.html(t.Data.RecordCount),
            this.dom.pagecount.html(t.Data.PageCount),
            this.pageCount = t.Data.PageCount,
            this.pageIndex = this.original = t.Data.PageIndex
    }
    ,
    Pager.prototype.getPage = function () {
        var i = this
            , t = (this.param ? this.param + "&" : "") + "pageindex=" + this.pageIndex;
        loadModule({
            html: i.template,
            json: i.action,
            param: t,
            compile: i.compile,
            success: function (t, e) {
                i.dom.pagebody.html(t),
                    i.original = i.pageIndex,
                    i.bind(e),
                    doc.triggerHandler("pagecomplete")
            },
            jsonError: function () {
                i.pageIndex = i.original
            }
        })
    }
    ,
    G.modules.pager = Pager,
    G.modules.pager2 = Pager,
    G.modules.pager_print = Pager,
    function () {
        var p = function (t, e) {
            return "string" == typeof e ? h(e, {
                filename: t
            }) : i(t, e)
        };
        p.version = "3.0.0",
            p.config = function (t, e) {
                a[t] = e
            }
            ;
        var a = p.defaults = {
            openTag: "<%",
            closeTag: "%>",
            escape: !0,
            cache: !0,
            compress: !1,
            parser: null
        }
            , l = p.cache = {};
        p.render = function (t, e) {
            return h(t, e)
        }
            ;
        var i = p.renderFile = function (t, e) {
            t = p.get(t) || u({
                filename: t,
                name: "Render Error",
                message: "Template not found"
            });
            return e ? t(e) : t
        }
            ;
        p.get = function (t) {
            var e, i;
            return l[t] ? i = l[t] : "object" != typeof document || (e = document.getElementById(t)) && (e = (e.value || e.innerHTML).replace(/^\s*|\s*$/g, ""),
                i = h(e, {
                    filename: t
                })),
                i
        }
            ;
        var n = function (t, e) {
            return "string" != typeof t && ("number" == (e = typeof t) ? t += "" : t = "function" == e ? n(t.call(t)) : ""),
                t
        }
            , e = {
                "<": "&#60;",
                ">": "&#62;",
                '"': "&#34;",
                "'": "&#39;",
                "&": "&#38;"
            }
            , r = function (t) {
                return e[t]
            }
            , o = Array.isArray || function (t) {
                return "[object Array]" === {}.toString.call(t)
            }
            , x = p.utils = {
                $helpers: {},
                $include: i,
                $string: n,
                $escape: function (t) {
                    return n(t).replace(/&(?![\w#]+;)|[<>"']/g, r)
                },
                $each: function (t, e) {
                    var i, n;
                    if (o(t))
                        for (i = 0,
                            n = t.length; i < n; i++)
                            e.call(t, t[i], i, t);
                    else
                        for (i in t)
                            e.call(t, t[i], i)
                }
            };
        p.helper = function (t, e) {
            _[t] = e
        }
            ;
        var _ = p.helpers = x.$helpers;
        p.onerror = function (t) {
            var e, i = "Template Error\n\n";
            for (e in t)
                i += "<" + e + ">\n" + t[e] + "\n\n";
            "object" == typeof console && console.error(i)
        }
            ;
        var u = function (t) {
            return p.onerror(t),
                function () {
                    return "{Template Error}"
                }
        }
            , h = p.compile = function (e, i) {
                for (var t in i = i || {},
                    a)
                    i[t] === undefined && (i[t] = a[t]);
                var n = i.filename;
                try {
                    var r = d(e, i)
                } catch (s) {
                    return s.filename = n || "anonymous",
                        s.name = "Syntax Error",
                        u(s)
                }
                function o(t) {
                    try {
                        return new r(t, n) + ""
                    } catch (s) {
                        return i.debug ? u(s)() : (i.debug = !0,
                            h(e, i)(t))
                    }
                }
                return o.prototype = r.prototype,
                    o.toString = function () {
                        return r.toString()
                    }
                    ,
                    n && i.cache && (l[n] = o),
                    o
            }
            , $ = x.$each
            , w = /\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g
            , k = /[^\w$]+/g
            , N = new RegExp(["\\b" + "break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined".replace(/,/g, "\\b|\\b") + "\\b"].join("|"), "g")
            , T = /^\d[^,]*|,\d[^,]*/g
            , F = /^,+|,+$/g
            , C = /^$|,+/;
        function M(t) {
            return "'" + t.replace(/('|\\)/g, "\\$1").replace(/\r/g, "\\r").replace(/\n/g, "\\n") + "'"
        }
        function d(t, n) {
            var r = n.debug
                , e = n.openTag
                , o = n.closeTag
                , s = n.parser
                , i = n.compress
                , a = n.escape
                , l = 1
                , u = {
                    $data: 1,
                    $filename: 1,
                    $utils: 1,
                    $helpers: 1,
                    $out: 1,
                    $line: 1
                }
                , h = "".trim
                , d = h ? ["$out='';", "$out+=", ";", "$out"] : ["$out=[];", "$out.push(", ");", "$out.join('')"]
                , h = h ? "$out+=text;return $out;" : "$out.push(text);"
                , c = "function(){var text=''.concat.apply('',arguments);" + h + "}"
                , p = "function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);" + h + "}"
                , m = "'use strict';var $utils=this,$helpers=$utils.$helpers," + (r ? "$line=0," : "")
                , f = d[0]
                , h = "return new String(" + d[3] + ");";
            $(t.split(e), function (t) {
                var e = (t = t.split(o))[0]
                    , i = t[1];
                1 === t.length ? f += v(e) : (f += function (t) {
                    var e = l;
                    s ? t = s(t, n) : r && (t = t.replace(/\n/g, function () {
                        return "$line=" + ++l + ";"
                    }));
                    {
                        var i;
                        0 === t.indexOf("=") && (i = a && !/^=[=#]/.test(t),
                            t = t.replace(/^=[=#]?|[\s;]*$/g, ""),
                            i ? (i = t.replace(/\s*\([^\)]+\)/, ""),
                                x[i] || /^(include|print)$/.test(i) || (t = "$escape(" + t + ")")) : t = "$string(" + t + ")",
                            t = d[1] + t + d[2])
                    }
                    r && (t = "$line=" + e + ";" + t);
                    return $(function (t) {
                        return t.replace(w, "").replace(k, ",").replace(N, "").replace(T, "").replace(F, "").split(C)
                    }(t), function (t) {
                        var e;
                        t && !u[t] && (e = "print" === t ? c : "include" === t ? p : x[t] ? "$utils." + t : _[t] ? "$helpers." + t : "$data." + t,
                            m += t + "=" + e + ",",
                            u[t] = !0)
                    }),
                        t + "\n"
                }(e),
                    i && (f += v(i)))
            });
            var g = m + f + h;
            r && (g = "try{" + g + "}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:" + M(t) + ".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");
            try {
                var b = new Function("$data", "$filename", g);
                return b.prototype = x,
                    b
            } catch (y) {
                throw y.temp = "function anonymous($data,$filename) {" + g + "}",
                y
            }
            function v(t) {
                return l += t.split(/\n/).length - 1,
                    i && (t = t.replace(/\s+/g, " ").replace(/<!--[\w\W]*?-->/g, "")),
                    t = t && d[1] + M(t) + d[2] + "\n"
            }
        }
        a.openTag = "{{",
            a.closeTag = "}}";
        a.parser = function (t, e) {
            var i, n, r, o = (t = t.replace(/^\s/, "")).split(" "), s = o.shift(), a = o.join(" ");
            switch (s) {
                case "if":
                    t = "if(" + a + "){";
                    break;
                case "else":
                    t = "}else" + (o = "if" === o.shift() ? " if(" + o.join(" ") + ")" : "") + "{";
                    break;
                case "/if":
                    t = "}";
                    break;
                case "each":
                    var l = o[0] || "$data";
                    "as" !== (o[1] || "as") && (l = "[]"),
                        t = "$each(" + l + ",function(" + ((o[2] || "$value") + "," + (o[3] || "$index")) + "){";
                    break;
                case "/each":
                    t = "});";
                    break;
                case "echo":
                    t = "print(" + a + ");";
                    break;
                case "print":
                case "include":
                    t = s + "(" + o.join(",") + ");";
                    break;
                default:
                    if (/^\s*\|\s*[\w\$]/.test(a)) {
                        a = !0;
                        0 === t.indexOf("#") && (t = t.substr(1),
                            a = !1);
                        for (var u = 0, h = t.split("|"), d = h.length, c = h[u++]; u < d; u++)
                            i = c,
                                n = h[u],
                                r = r = void 0,
                                n = (r = n.split(":")).shift(),
                                r = r.join(":") || "",
                                c = "$helpers." + n + "(" + i + (r = r && ", " + r) + ")";
                        t = (a ? "=" : "=#") + c
                    } else
                        t = p.helpers[s] ? "=#" + s + "(" + o.join(",") + ");" : "=" + t
            }
            return t
        }
            ,
            "function" == typeof define ? define(function () {
                return p
            }) : "undefined" != typeof exports ? module.exports = p : this.template = p
    }(),
    JSON = {},
    function () {
        "use strict";
        var rx_one = /^[\],:{}\s]*$/, rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, rx_four = /(?:^|:|,)(?:\s*\[)+/g, rx_escapable = /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta, rep;
        function f(t) {
            return t < 10 ? "0" + t : t
        }
        function this_value() {
            return this.valueOf()
        }
        function quote(t) {
            return rx_escapable.lastIndex = 0,
                rx_escapable.test(t) ? '"' + t.replace(rx_escapable, function (t) {
                    var e = meta[t];
                    return "string" == typeof e ? e : "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4)
                }) + '"' : '"' + t + '"'
        }
        function str(t, e) {
            var i, n, r, o, s, a = gap, l = e[t];
            switch (l && "object" == typeof l && "function" == typeof l.toJSON && (l = l.toJSON(t)),
            "function" == typeof rep && (l = rep.call(e, t, l)),
            typeof l) {
                case "string":
                    return quote(l);
                case "number":
                    return isFinite(l) ? String(l) : "null";
                case "boolean":
                case "null":
                    return String(l);
                case "object":
                    if (!l)
                        return "null";
                    if (gap += indent,
                        s = [],
                        "[object Array]" === Object.prototype.toString.apply(l)) {
                        for (o = l.length,
                            i = 0; i < o; i += 1)
                            s[i] = str(i, l) || "null";
                        return r = 0 === s.length ? "[]" : gap ? "[\n" + gap + s.join(",\n" + gap) + "\n" + a + "]" : "[" + s.join(",") + "]",
                            gap = a,
                            r
                    }
                    if (rep && "object" == typeof rep)
                        for (o = rep.length,
                            i = 0; i < o; i += 1)
                            "string" == typeof rep[i] && (r = str(n = rep[i], l)) && s.push(quote(n) + (gap ? ": " : ":") + r);
                    else
                        for (n in l)
                            Object.prototype.hasOwnProperty.call(l, n) && (r = str(n, l)) && s.push(quote(n) + (gap ? ": " : ":") + r);
                    return r = 0 === s.length ? "{}" : gap ? "{\n" + gap + s.join(",\n" + gap) + "\n" + a + "}" : "{" + s.join(",") + "}",
                        gap = a,
                        r
            }
        }
        "function" != typeof Date.prototype.toJSON && (Date.prototype.toJSON = function () {
            return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + f(this.getUTCMonth() + 1) + "-" + f(this.getUTCDate()) + "T" + f(this.getUTCHours()) + ":" + f(this.getUTCMinutes()) + ":" + f(this.getUTCSeconds()) + "Z" : null
        }
            ,
            Boolean.prototype.toJSON = this_value,
            Number.prototype.toJSON = this_value,
            String.prototype.toJSON = this_value),
            "function" != typeof JSON.stringify && (meta = {
                "\b": "\\b",
                "\t": "\\t",
                "\n": "\\n",
                "\f": "\\f",
                "\r": "\\r",
                '"': '\\"',
                "\\": "\\\\"
            },
                JSON.stringify = function (t, e, i) {
                    var n;
                    if (indent = gap = "",
                        "number" == typeof i)
                        for (n = 0; n < i; n += 1)
                            indent += " ";
                    else
                        "string" == typeof i && (indent = i);
                    if ((rep = e) && "function" != typeof e && ("object" != typeof e || "number" != typeof e.length))
                        throw new Error("JSON.stringify");
                    return str("", {
                        "": t
                    })
                }
            ),
            "function" != typeof JSON.parse && (JSON.parse = function (text, reviver) {
                var j;
                function walk(t, e) {
                    var i, n, r = t[e];
                    if (r && "object" == typeof r)
                        for (i in r)
                            Object.prototype.hasOwnProperty.call(r, i) && ((n = walk(r, i)) !== undefined ? r[i] = n : delete r[i]);
                    return reviver.call(t, e, r)
                }
                if (text = String(text),
                    rx_dangerous.lastIndex = 0,
                    rx_dangerous.test(text) && (text = text.replace(rx_dangerous, function (t) {
                        return "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4)
                    })),
                    rx_one.test(text.replace(rx_two, "@").replace(rx_three, "]").replace(rx_four, "")))
                    return j = eval("(" + text + ")"),
                        "function" == typeof reviver ? walk({
                            "": j
                        }, "") : j;
                throw new SyntaxError("JSON.parse")
            }
            )
    }();

// 转义其选择项
function transSelectAll(e, i, G, n) {
    console.log("选择的内容：", e)
    let postData = {}
    //1. "modeType": "Two_Decide,Three_Decide,Four_Decide,Two_Show(二现)，Three_Show，Four_Show,Five_Two_Decide",
    let modeType = "Two_Decide"
    let modeTypeValue = $('.on').find("input").attr("module")
    let modeTypeFlag = 0
    switch (modeTypeValue) {
        case "erd":
            modeType = 'Two_Decide'
            modeTypeFlag = 2
            break;
        case "sand":
            modeType = 'Three_Decide'
            modeTypeFlag = 3
            break;
        case "sid":
            modeType = 'Four_Decide'
            modeTypeFlag = 4
            break;
        case "erx":
            modeType = 'Two_Show'
            modeTypeFlag = 2
            break;
        case "sanx":
            modeType = 'Three_Show'
            modeTypeFlag = 3
            break;
        case "six":
            modeType = 'Four_Show'
            modeTypeFlag = 4
            break;
        case "fifteen":
            modeType = 'Five_Two_Decide'
            modeTypeFlag = 5
            break;
        default:
            modeType = 'Two_Decide'
            break
    }
    postData.modeType = modeType
    // 是定位置  or  取配数
    // let positionType = e.positionType
    if (e.positionType == "0") {
        // 这时  是  定位置  (取 或者 除)
        let takeType = e.positionFilter == "0" ? "Take" : "Remove"
        postData.takeType = takeType
        // 千百各十
        if (e.firstNumber || e.firstNumber == "0" || e.secondNumber || e.secondNumber == "0" || e.thirdNumber || e.thirdNumber == "0" || e.fourthNumber || e.fourthNumber == "0" || e.fifthNumber || e.fifthNumber == "0") {
            let positionMap = {}
            if (e.firstNumber || e.firstNumber == "0") {
                // positionMap.Thousand = parseInt(e.firstNumber)
                positionMap.Thousand = e.firstNumber
            }
            if (e.secondNumber || e.secondNumber == "0") {
                // positionMap.Hundred = parseInt(e.secondNumber)
                positionMap.Hundred = e.secondNumber
            }
            if (e.thirdNumber || e.thirdNumber == "0") {
                // positionMap.Ten = parseInt(e.thirdNumber)
                positionMap.Ten = e.thirdNumber
            }
            if (e.fourthNumber || e.fourthNumber == "0") {
                // positionMap.Individual = parseInt(e.fourthNumber)
                positionMap.Individual = e.fourthNumber
            }
            if (e.fifthNumber || e.fifthNumber == "0") {
                positionMap.Five = e.fifthNumber
            }
            postData.positionMap = positionMap
        }
    } else {
        // 这时  是 配数  (取 或者 除)
        let matchNumTakeType = e.positionFilter == "0" ? "Take" : "Remove"
        postData.matchNumTakeType = matchNumTakeType
        // 配数
        let matchNumList = []
        if (e.firstNumber || e.secondNumber || e.thirdNumber || e.fourthNumber) {
            if (e.firstNumber || e.firstNumber == "0") {
                matchNumList.push(e.firstNumber)
            }
            if (e.secondNumber || e.secondNumber == "0") {
                matchNumList.push(e.secondNumber)
            }
            if (e.thirdNumber || e.thirdNumber == "0" && modeTypeFlag > 2) {
                matchNumList.push(e.thirdNumber)
            }
            if (e.fourthNumber || e.fourthNumber == "0" && modeTypeFlag > 3) {
                matchNumList.push(e.fourthNumber)
            }
            if (e.fifthNumber || e.fifthNumber == "0" && modeTypeFlag > 4) {
                matchNumList.push(e.fourthNumber)
            }
            postData.matchNumList = matchNumList
        }
    }
    // 3.全转
    let fullTurn = ''
    if (e.transformNumbers && e.transformNumbers.length > 0) {
        fullTurn = e.transformNumbers.join().replace(/,/g, '')
        postData.fullTurn = fullTurn
    }
    // 3.上奖
    let upperPrizeMap = ''
    if (e.upperNumbers && e.upperNumbers.length > 0) {
        upperPrizeMap = e.upperNumbers.join().replace(/,/g, '');
        postData.upperPrizeMap = {
            Take: upperPrizeMap
        }
    }
    // 4.合分（除取）
    let positionSumTakeType = ''
    if (e.remainFixedFilter || e.remainFixedFilter == '0') {
        positionSumTakeType = e.remainFixedFilter == "0" ? "Take" : "Remove"
        postData.positionSumTakeType = positionSumTakeType
    }
    // 位置和 就是那四个小格  因为有四个，所以用数组承接
    let positionSums = []
    let keyDics = ['Thousand', 'Hundred', 'Ten', 'Individual', 'Five']
    if (e.remainFixedNumbers && e.remainFixedNumbers.length > 0) {
        e.remainFixedNumbers.map((curVal) => {
            let position = []
            for (let i = 0; i < curVal[0].length; i++) {
                if (curVal[0][i] != 0) {
                    position.push(keyDics[i])
                }
            }
            let sum = curVal[1].join().replace(/,/g, '')
            positionSums.push({
                position: position,
                sum: sum
            })
        })
        postData.positionSums = positionSums
    }
    // 两数和》三数和
    let numberSumMap = {}
    if (e.remainMatchFilter) {
        let howManyNumber = e.remainMatchFilter;
        let numberValue = e.remainMatchNumbers.join().replace(/,/g, '')
        if (howManyNumber == 2) {
            numberSumMap = {
                '2': numberValue
            }
        } else {
            numberSumMap = {
                '3': numberValue
            }
        }
        postData.numberSumMap = numberSumMap
    }
    // 排除 或者  包含
    let containTakeTypeMap = {}
    if (e.exceptNumbers && e.exceptNumbers.length > 0) {
        console.log(e.exceptNumbers)
        containTakeTypeMap.Remove = e.exceptNumbers.join('').replace(/,/g, '')
    }
    // 取
    if (e.containFilter == "0" && e.containNumbers && e.containNumbers.length > 0) {
        containTakeTypeMap.Take = e.containNumbers.join('').replace(/,/g, '')
    }
    // 排除
    if (e.containFilter == "1" && e.containNumbers && e.containNumbers.length > 0) {
        if(!containTakeTypeMap.Remove){
            containTakeTypeMap.Remove = ""
        }
        containTakeTypeMap.Remove += e.containNumbers.join('').replace(/,/g, '')
    }
    if (containTakeTypeMap.Take || containTakeTypeMap.Remove) {
        postData.containTakeTypeMap = containTakeTypeMap
    }
    // 复式包含
    let compoundContainTakeTypeMap = {}
    // 取
    if (e.multipleFilter == "0" && e.multipleNumbers && e.multipleNumbers.length > 0) {
        compoundContainTakeTypeMap.Take = e.multipleNumbers.join('').replace(/,/g, '')
    }
    // 排除
    if (e.multipleFilter == "1" && e.multipleNumbers && e.multipleNumbers.length > 0) {
        console.log(e.multipleNumbers)
        if(!compoundContainTakeTypeMap.Remove){
            compoundContainTakeTypeMap.Remove = ""
        }
        compoundContainTakeTypeMap.Remove += e.multipleNumbers.join('').replace(/,/g, '')
    }
    if (compoundContainTakeTypeMap.Take || compoundContainTakeTypeMap.Remove) {
        postData.compoundContainTakeTypeMap = compoundContainTakeTypeMap
    }
    // 各种各样的双重
    let repeatTakeTypeMap = {}
    if (e.repeatTwoWordsFilter || e.repeatTwoWordsFilter == "0") { //双重
        if (e.repeatTwoWordsFilter == "0") {
            repeatTakeTypeMap.Double = "Take"
        } else if (e.repeatTwoWordsFilter == "1") {
            repeatTakeTypeMap.Double = "Remove"
        }
    }
    if (e.repeatThreeWordsFilter || e.repeatThreeWordsFilter == "0") { //三重
        if (e.repeatThreeWordsFilter == "0") {
            repeatTakeTypeMap.Three = "Take"
        } else if (e.repeatThreeWordsFilter == "1") {
            repeatTakeTypeMap.Three = "Remove"
        }
    }
    if (e.repeatFourWordsFilter == e.repeatFourWordsFilter) { //四重
        if (e.repeatFourWordsFilter == "0") {
            repeatTakeTypeMap.Four = "Take"
        } else if (e.repeatFourWordsFilter == "1") {
            repeatTakeTypeMap.Four = "Remove"
        }
    }
    if (e.repeatDoubleWordsFilter || e.repeatDoubleWordsFilter == "0") { //双双重
        if (e.repeatDoubleWordsFilter == "0") {
            repeatTakeTypeMap.Double_Double = "Take"
        } else if (e.repeatDoubleWordsFilter == "1") {
            repeatTakeTypeMap.Double_Double = "Remove"
        }
    }
    if (repeatTakeTypeMap.Double || repeatTakeTypeMap.Double == "0" || repeatTakeTypeMap.Three || repeatTakeTypeMap.Three == "0" || repeatTakeTypeMap.Four || repeatTakeTypeMap.Four == "0" || repeatTakeTypeMap.Double_Double || repeatTakeTypeMap.Double_Double == "0") {
        postData.repeatTakeTypeMap = repeatTakeTypeMap
    }
    // 双兄弟
    let brotherTakeTypeMap = {}
    if (e.twoBrotherFilter || e.twoBrotherFilter == "0" || e.threeBrotherFilter || e.threeBrotherFilter == "0" || e.fourBrotherFilter || e.fourBrotherFilter == "0") {
        // 双兄弟
        if (e.twoBrotherFilter == '0') {
            brotherTakeTypeMap.Two = 'Take'
        } else if (e.twoBrotherFilter == '1') {
            brotherTakeTypeMap.Two = 'Remove'
        }
        // 三兄弟
        if (e.threeBrotherFilter == '0') {
            brotherTakeTypeMap.Three = 'Take'
        } else if (e.threeBrotherFilter == '1') {
            brotherTakeTypeMap.Three = 'Remove'
        }
        //四兄弟
        if (e.fourBrotherFilter == '0') {
            brotherTakeTypeMap.Four = 'Take'
        } else if (e.fourBrotherFilter == '1') {
            brotherTakeTypeMap.Four = 'Remove'
        }
        if (brotherTakeTypeMap.Two || brotherTakeTypeMap.Three || brotherTakeTypeMap.Four) {
            postData.brotherTakeTypeMap = brotherTakeTypeMap
        }
    }
    // 乘号位置
    let xPositions = []
    if (e.symbolPositions && e.symbolPositions.length > 0) {
        for (let i = 0; i < e.symbolPositions.length; i++) {
            if (e.symbolPositions[i] != 0) {
                xPositions.push(keyDics[i])
            }
        }
        if (xPositions.length > 0) {
            postData.xPositions = xPositions
        }
    }
    //  对数处理
    let logTakeTypeMap = {}
    let newArr = []
    if (e.logarithmNumbers && e.logarithmNumbers.length > 0) {
        newArr = e.logarithmNumbers.map((item) => {
            return item.join().replace(/,/g, '')
        })
    }
    if (e.logarithmNumberFilter == "0") {
        logTakeTypeMap.Take = newArr
        postData.logTakeTypeMap = logTakeTypeMap
    } else if (e.logarithmNumberFilter == "1") {
        logTakeTypeMap.Remove = newArr
        postData.logTakeTypeMap = logTakeTypeMap
    }
    let valueRangeVO = {}
    if (e.remainValueRanges && e.remainValueRanges.length > 0) {
        valueRangeVO.begin = e.remainValueRanges[0]
        if (e.remainValueRanges.length > 1) {
            valueRangeVO.end = e.remainValueRanges[1]
        }
        if (valueRangeVO.begin || valueRangeVO.begin == "0") {
            postData.valueRangeVO = valueRangeVO
        }
    }
    // 单/双 出现的位置
    let numberTypeMap = {}
    // 偶数
    if (e.evenNumberPositions && e.evenNumberPositions.length > 0) {
        let tempObject = {}
        if (e.evenNumberFilter == '0') {
            let newArr = []
            for (let i = 0; i < e.evenNumberPositions.length; i++) {
                if (e.evenNumberPositions[i] != 0) {
                    newArr.push(keyDics[i])
                }
            }
            if (newArr.length > 0) {
                tempObject.Take = newArr
            }
        } else if (e.evenNumberFilter == '1') {
            let newArr = []
            for (let i = 0; i < e.evenNumberPositions.length; i++) {
                if (e.evenNumberPositions[i] != 0) {
                    newArr.push(keyDics[i])
                }
            }
            if (newArr.length > 0) {
                tempObject.Remove = newArr
            }
        }
        // 判别
        if (tempObject.Take || tempObject.Remove) {
            numberTypeMap.Even = tempObject
        }
    }
    // 奇数
    if (e.oddNumberPositions && e.oddNumberPositions.length > 0) {
        let tempObject = {}
        if (e.oddNumberFilter == '0') {
            let newArr = []
            for (let i = 0; i < e.oddNumberPositions.length; i++) {
                if (e.oddNumberPositions[i] != 0) {
                    newArr.push(keyDics[i])
                }
            }
            if (newArr.length > 0) {
                tempObject.Take = newArr
            }
        } else if (e.oddNumberFilter == '1') {
            let newArr = []
            for (let i = 0; i < e.oddNumberPositions.length; i++) {
                if (e.oddNumberPositions[i] != 0) {
                    newArr.push(keyDics[i])
                }
            }
            if (newArr.length > 0) {
                tempObject.Remove = newArr
            }
        }
        // 判别
        if (tempObject.Take || tempObject.Remove) {
            numberTypeMap.Odd = tempObject
        }
        // end
        // debugger
    }

    // 大
    if (e.bigNumberPositions && e.bigNumberPositions.length > 0) {
        let tempObject = {}
        if (e.bigNumberFilter == '0') {
            let newArr = []
            for (let i = 0; i < e.bigNumberPositions.length; i++) {
                if (e.bigNumberPositions[i] != 0) {
                    newArr.push(keyDics[i])
                }
            }
            if (newArr.length > 0) {
                tempObject.Take = newArr
            }
        } else if (e.bigNumberFilter == '1') {
            let newArr = []
            for (let i = 0; i < e.bigNumberPositions.length; i++) {
                if (e.bigNumberPositions[i] != 0) {
                    newArr.push(keyDics[i])
                }
            }
            if (newArr.length > 0) {
                tempObject.Remove = newArr
            }
        }
        // 判别
        if (tempObject.Take || tempObject.Remove) {
            numberTypeMap.Big = tempObject
        }
        // end
        // debugger
    }
    // 小
    if (e.smallNumberPositions && e.smallNumberPositions.length > 0) {
        let tempObject = {}
        if (e.smallNumberFilter == '0') {
            let newArr = []
            for (let i = 0; i < e.smallNumberPositions.length; i++) {
                if (e.smallNumberPositions[i] != 0) {
                    newArr.push(keyDics[i])
                }
            }
            if (newArr.length > 0) {
                tempObject.Take = newArr
            }
        } else if (e.smallNumberFilter == '1') {
            let newArr = []
            for (let i = 0; i < e.smallNumberPositions.length; i++) {
                if (e.smallNumberPositions[i] != 0) {
                    newArr.push(keyDics[i])
                }
            }
            if (newArr.length > 0) {
                tempObject.Remove = newArr
            }
        }
        // 判别
        if (tempObject.Take || tempObject.Remove) {
            numberTypeMap.Small = tempObject
        }
        // end
        // debugger
    }
    if (numberTypeMap.Odd || numberTypeMap.Even || numberTypeMap.Big || numberTypeMap.Small) {
        postData.numberTypeMap = numberTypeMap
    }

    console.log("转换后的内容：", postData)
    return postData;
}
   const baseUrl = 'http://api.bxjm.net'
//const baseUrl = 'http://localhost:8080'
// let sid = localStorage.getItem("sid")
// let sid = $.cookie("sid")
// if (!sid) {
//     sid = localStorage.getItem("sid")
// } 
// if(!sid) {
//    window.location.href = "/404.html"
// }
// console.log(sid)
let currentPeriod = 0
// 下一期结束时间
let nextPeriodTime = ''
// 获取聊天记录
function getAllNumbersByText(text,i,G,n){
    console.log(text)
    $.ajax({
        type: "GET",
        async: false, //同步执行
        url: baseUrl + `/generate/getNumberByText?keyword=`+encodeURIComponent(text),
        contentType: "application/;charset=UTF-8",//指定消息请求类型
        data: null,
        dataType: "json", //返回数据形式为json
        success: function (res) {
            console.log(res);
            // debugger
            if (res.list && res.list instanceof Array) {
                // 缓存当前下注的content信息
                localStorage.setItem('lastContext', res.context)
                t = res.list
                i.numberList = res.list
            } else {
                // $.alert("请选择或填写条件生成！！")
                $.alert("没有这样的号码！")
                t = []
                i.numberList = []
            }
            $("#generate-text").html("生成的文字为："+res.text);
            i.dom.numberList.html($.trim(G.util.compile(i.tpl_number, {
                Data: t
            }))),
                i.dom.numberCount.html(t.length);
            i.dom.numberCount2.html(t.length);
            var e = i.dom.bet_money.val();
            e && 0 < e.length && 0 < t.length && i.dom.numberAmount.html(Math.round(e * t.length * 100) / 100),
                i.dom.bet_money.focus(),
                $("#operation_condition").val(JSON.stringify(n.options))
            // 监听
            i.dom.bet_money.on("keyup", function () {
                /^\d+(\.\d{0,1})?$/.test(this.value) || !this.value ? this.old = this.value || 0 : this.value = this.old || "";
                var t = i.numberList.length
                    , e = "" == this.value ? 0 : parseFloat(this.value);
                i.dom.numberAmount.html(Math.round(e * t * 100) / 100)
            })
        },
        error: function (errorMsg) {
            console.log(errorMsg);
            // ZENG.msgbox.show("网络错误！", 1, 1500);
            // $.confirm("当前快选已超时！", function () {
            //     location.href = "./index.html?toast=1"
            // })
        }
    })
}
function getAllCreateNumbers(postData, i, G, n) {
    $.ajax({
        type: "POST",
        async: false, //同步执行
        url: baseUrl + `/generate/getAllNumbers`,
        contentType: "application/json;charset=UTF-8",//指定消息请求类型
        data: JSON.stringify(postData),
        dataType: "json", //返回数据形式为json
        success: function (res) {
            console.log(res);
            // debugger
            if (res.list && res.list instanceof Array) {
                // 缓存当前下注的content信息
                localStorage.setItem('lastContext', res.context)
                t = res.list
                i.numberList = res.list
            } else {
                // $.alert("请选择或填写条件生成！！")
                $.alert("没有这样的号码！")
                t = []
                i.numberList = []
            }
            $("#generate-text").html("生成的文字为："+res.text);
            i.dom.numberList.html($.trim(G.util.compile(i.tpl_number, {
                Data: t
            }))),
                i.dom.numberCount.html(t.length);
            i.dom.numberCount2.html(t.length);
            var e = i.dom.bet_money.val();
            e && 0 < e.length && 0 < t.length && i.dom.numberAmount.html(Math.round(e * t.length * 100) / 100),
                i.dom.bet_money.focus(),
                $("#operation_condition").val(JSON.stringify(n.options))
            // 监听
            i.dom.bet_money.on("keyup", function () {
                /^\d+(\.\d{0,1})?$/.test(this.value) || !this.value ? this.old = this.value || 0 : this.value = this.old || "";
                var t = i.numberList.length
                    , e = "" == this.value ? 0 : parseFloat(this.value);
                i.dom.numberAmount.html(Math.round(e * t * 100) / 100)
            })
        },
        error: function (errorMsg) {
            console.log(errorMsg);
            // ZENG.msgbox.show("网络错误！", 1, 1500);
            // $.confirm("当前快选已超时！", function () {
            //     location.href = "./index.html?toast=1"
            // })
        }
    })
}
// 获取余额
// getMoneyNumber()
// 获取下一期
// getNextPeriod()
// 获取余额
function getMoneyNumber() {
    $.ajax({
        type: "get",
        async: false, //同步执行
        url: baseUrl + `/getCurrentIntegral`,
        data: {
            sid: sid
        },
        dataType: "json", //返回数据形式为json
        success: function (res) {
            if (res.integral) {
                $('#leftMoney').html(res.integral)
            } else {
            }
        },
        error: function (errorMsg) {
        }
    })
}
// 获取期号
// function lastPeriod() {
//     $.get(baseUrl + '/draw-result/lastPeriod?sid=' + sid, function (data) {
//         $("#currentPeriod").html(data.period);
//         currentPeriod = data.period
//     });
// }
// 下一期
var startTimeStr
let timeFlag, refreshFlag
let from = getUrlParam("from")
if (from == "dingtou") {
    $(".tc.systime").hide()
    $("#fengPan").hide()
    $(".kuaixuanBox").hide()
    $("#moreInfo").hide()
    $(".dingtou").show()
    setTimeout(() => {
        $("#main").css({
            top: "4.5rem"
        })
    }, 200)
}
function getNextPeriod() {
    let agentRoomId = localStorage.getItem("agentRoomId")
    $.get(baseUrl + `/room/detail/${agentRoomId}?sid=${sid}`, function (data) {
        // 填写当前期号
        $("#currentPeriod").html(data.currentPeriod);
        currentPeriod = data.currentPeriod
        // 填写倒计时
        nextPeriodTime = data.closeTime
        let leftSeconds = data.leftSeconds
        var div = document.getElementById("systime");
        startTimeStr = new Date().getTime()  //获取当前时间
        // var endTimeStr = new Date().getTime() + leftSeconds * 1000//获取当前结束时间
        var endTimeStr = new Date(nextPeriodTime).getTime()//获取当前结束时间
        if (leftSeconds > 0 && from != "dingtou") {
            timeFlag = setInterval(function () {
                div.innerHTML = showtime(endTimeStr, timeFlag);
            }, 1000);  //反复执行函数本身
        }
        if (from == "dingtou") {
            $("#main").css("top", "4.5rem")
        }
    });
}
function refreshPeriod() {
    let agentRoomId = localStorage.getItem("agentRoomId")
    $.get(baseUrl + `/room/detail/${agentRoomId}?sid=${sid}`, function (data) {
        // 获取当前期状态
        let status = data.status
        if (status != "Closed") {
            clearInterval(refreshFlag)
            location.reload()
        }
    });
}
function showtime(endTimeStr, timeFlag) {
    var nowtime = new Date() //获取当前时间
    // endtime = new Date(endTimeStr);  //定义结束时间
    // var lefttime = endtime.getTime() - nowtime.getTime(),  //距离结束时间的毫秒数
    var lefttime = endTimeStr - nowtime.getTime(), //距离结束时间的毫秒数
        leftd = Math.floor(lefttime / (1000 * 60 * 60 * 24)),  //计算天数
        lefth = Math.floor(lefttime / (1000 * 60 * 60) % 24),  //计算小时数
        leftm = Math.floor(lefttime / (1000 * 60) % 60),  //计算分钟数
        lefts = Math.floor(lefttime / 1000 % 60);  //计算秒数
    if (lefttime > 0) {
        return "距离" + (parseInt(currentPeriod)) + "期封盘还有: " + leftd + "天" + lefth + "小时" + leftm + "分" + lefts + "秒";  //返回倒计时的字符串
    } else {
        clearInterval(timeFlag)
        $("#haomaBox").hide()
        $('#fengPan').show()
        $("#btn_reset").click()
        $("#btn_create").attr("disabled", 'disabled')
        refreshFlag = setInterval(function () {
            refreshPeriod()
        }, 1000)
        return `【${parseInt(currentPeriod)}期】已封盘！`
    }
}

// 获取地址栏参数
function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}
