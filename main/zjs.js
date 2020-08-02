/*version 1.0
author zzzzzzzs
*/
//initiate
var zjs = function () {
};
zjs.n = function () {
};
zjs.message = function () {
};
zjs.message.err = function () {
};
//standard input:func,type_in_number,description,action_function,level.
//complement

//MATH
zjs.isInteger = Number.isInteger ? Number.isInteger : (function (number) {
    return number - 0 === Math.ceil(number - 0)
});
//equal for type,particularly,equal stands for strict mode.
//Hint:NaN===NaN false.
zjs.equal = function (a, b) {
    return a === b
};
zjs.equal.num = function (a, b) {
    return a - 0 === b - 0
};
zjs.equal.type = function (obj, Type) {
    var type = Type.toString().toLowerCase();
    if (type === "array") {
        return obj instanceof Array
    } else if (type === "element") {
        return obj instanceof Object && obj instanceof HTMLElement
    } else if (type === "object") {
        return obj instanceof Object
    } else if (type === "null") {
        return obj === null
    } else if (type === "NaN") {
        return isNaN(obj) && (typeof obj === "number")
    } else if (type === "integer") {
        return zjs.isInteger(obj) && typeof obj === "number"
    } else if (type === "number") {
        if (typeof obj === "string") {
            return !isNaN(parseFloat(obj))
        } else {
            return typeof obj === "number"
        }
    } else if (type === typeof obj) {
        return true
    } else {
        return false
    }
};
zjs.equal.tag = function (element, tag) {
    return element.tagName.toLowerCase() === tag.toLowerCase()
};
//any for random, supporting input type:[array],null,[a,b).
zjs.any = function () {
    var obj = arguments, rnd = Math.random();
    if (!obj) {
        return rnd
    } else if (zjs.equal.type(obj, "array")) {
        if (obj.length === 2 && typeof obj[0] === "number" && typeof obj[1] === "number") {
            return obj[0] + rnd * (obj[1] - obj[0])
        } else {
            var index = Math.round(obj.length * rnd);
            return obj[index];
        }
    }
    console.log(obj);
    return rnd
};
zjs.any.int = function () {
    var obj = arguments, rnd = Math.random();
    if (!obj) {
        return zjs.appr(rnd)
    } else if (obj.length === 2 && zjs.equal.type(obj[0], "number") && zjs.equal.type(obj[1], "number")) {
        return zjs.appr(zjs.any(obj[0], obj[1]))
    } else {
        zjs.message.err(zjs.any.int, -1);
        return -1;
    }
};
//colorful
zjs.any.rgb = function (r_min, r_max, g_min, g_max, b_min, b_max) {
    r_min = r_min || 0;
    r_max = r_max || 255;
    g_min = g_min || 0;
    g_max = g_max || 255;
    b_min = b_min || 0;
    b_max = b_max || 255;
    return "rgb(" + zjs.any.int(r_min, r_max) + "," + zjs.any.int(g_min, g_max) + "," + zjs.any.int(b_min, b_max) + ")"
};
zjs.any.rgba = function (r_min, r_max, g_min, g_max, b_min, b_max, a_min, a_max) {
    r_min = r_min || 0;
    r_max = r_max || 255;
    g_min = g_min || 0;
    g_max = g_max || 255;
    b_min = b_min || 0;
    b_max = b_max || 255;
    a_min = a_min || 0;
    a_max = a_max || 1;
    return "rgb(" + zjs.any.int(r_min, r_max) + "," + zjs.any.int(g_min, g_max) + "," + zjs.any.int(b_min, b_max) + "," + zjs.any.int(a_min, a_max) + ")"
};
//appr for approximate
zjs.appr = function (num) {
    var number = num - 0;
    return Math.round(number)
};
zjs.appr.down = function (num) {
    var number = num - 0;
    return Math.floor(number)
};
zjs.appr.up = function (num) {
    var number = num - 0;
    return Math.ceil(number)
};
//abs for absolute
zjs.abs = function (num) {
    return Math.abs(num - 0)
};
zjs.lg = Math.log;
//const
zjs.value.e = Math.E;
zjs.value.pi = Math.PI;
/*
Math.max
    .min
    .sin
    .tan
    .cos
    .asin=arcsin
    .LN2
    .LN10
    .SQRT2
 */
//BASE64 relative,only for English
//code for url en/de-code,only for UTF-8.
//if not url,or the code in url,use function all

zjs.code = {
    to: {
        b: function (code) {
            return window.atob(code)
        },
        url: function (code) {
            return window.encodeURI(code)
        },
        path: function (code) {
            return encodeURIComponent(code)
        }
    },
    from: {
        b: function (code) {
            return window.btoa(code)
        },
        url: function (code) {
            return window.decodeURI(code)
        },
        path: function (code) {
            return encodeURIComponent(code)
        }
    }
};

//value container
zjs.v = zjs.value = {};
//time to get local time
zjs.getInitTime = function () {
    var localTime = new Date(),
        day = localTime.getDate(),
        week = localTime.getDay() || 7,
        year = localTime.getFullYear(),
        hour = localTime.getHours(),
        minute = localTime.getMinutes(),
        month = localTime.getMonth(),
        second = localTime.getSeconds();
    zjs.v.time = {year: year, month: month, day: day, weekday: week, hour: hour, minute: minute, second: second};
};
//unit:millisecond=ms
zjs.count = function (func) {
    var startTime = (new Date()).getTime();
    func();
    var endTime = (new Date()).getTime();
    return endTime - startTime
};

//read for interpretation
zjs.read = function () {
};
zjs.read.ms = function (text) {
    var time = 0, temp = "", code;
    for (var i = 0; i++; i <= text.length) {
        code = text.charAt(i);
        if (zjs.equal.type(code, "number")) {
            temp += code
        } else {
            if (code === "h") {
                time += (temp - 0) * 3600 * 60
            } else if (code === "m") {
                time += (temp - 0) * 3600
            } else if (code === "s") {
                time += (temp - 0) * 60
            }
            temp = "";
        }
    }
};
zjs.read.element = function (text) {
    if (text.charAt(0) === "#") {
        return zjs.get.id(text.replace(/^#/, ""))
    } else if (text.charAt(0) === ".") {
        return zjs.get.cls(text.replace(/^./, ""))
    } else {
        return zjs.get.tag(text.replace)
    }
};
//clock for interval,while trigger for out
//unit:ms range:4+,or15.6+
// however,such method is given least priority,thus suffering volatile delay.
//nevertheless,clearInterval isn't supported yet.
zjs.clock = function (func, time, data) {
    var t = zjs.equal.type(time, "number") ? time : zjs.read.ms(time);
    if (!data) {
        setInterval(func, t);
    } else {
        setInterval(func.call(data), t);
    }
};
zjs.trigger = function (func, time, data) {
    var t = zjs.equal.type(time, "number") ? time : zjs.read.ms(time);
    if (!data) {
        setTimeout(func, t);
    } else {
        setTimeout(func.call(data), t);
    }
};
zjs.delay = function (func) {
    setTimeout(func, 0);
};
//storage and fetching
//one at a time,or zjs.db.xxx=yyy for short.
zjs.value.isLocalStorage = !!window.localStorage;
if (zjs.value.isLocalStorage) {
    zjs.db = localStorage;
    zjs.data = function (a, b) {
        if (!b) {
            return localStorage.getItem(a) || null
        } else {
            return localStorage.setItem(a, b)
        }
    };
    zjs.data.store = localStorage.setItem;
    zjs.data.fetch = localStorage.getItem || null;
    zjs.data.del = localStorage.removeItem;
}

//Ajax and several relative technique
//order:url,method,,callback,content  or url,callback
zjs.fetch = function () {

};
if (window.fetch || WorkerGlobalScope.fetch) {
    zjs.fetch.total = function () {

    }
} else {
    if (window.XMLHttpRequest) {
        zjs.fetch.open = function () {
            return newRequest = new XMLHttpRequest()
        };
    } else {
        zjs.fetch.open = function () {
            return new ActiveXObject("Microsoft.XMLHTTP")
        };
    }
    zjs.fetch.total = function () {
        var data = arguments, url, method, callback, content, newRequest = zjs.fetch.open();
        if (zjs.equal.type(data, "array")) {
            url = data[0];
            method = data[1];
            callback = data[2];
            content = data[3];
        } else {
            url = data["url"];
            method = data["method"];
            callback = data["callback"];
            content = data["content"]
        }

        newRequest.open(method, url, true);
        newRequest.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                callback();
            }
        };
        newRequest.send(content || null);
    };
}
//read font-family
zjs.convert = function () {

};
zjs.convert.font = function (name) {
    var i;
    for (i in zjs.value.fontFamily) {
        if (i.ch === name) {
            return i.en
        } else if (i.en === name) {
            return i.ch
        }
    }
    return null
};

//get browser info
zjs.value.isCookie = window.navigator.cookieEnabled;
zjs.value.isOnline = window.navigator.onLine === "online";
zjs.value.systemRawInfo = window.navigator.platform;
zjs.value.src = new String(window.location.href);
zjs.value.src.host = window.location.hostname;
zjs.value.src.path = window.location.pathname;
zjs.value.src.head = window.location.protocol;
zjs.value.isIE = !!window.attachEvent;
//clipboard editor
//HINT firefox has its special method that is way too complicated.
zjs.copytoText = function (object) {
    if (zjs.equal.type(object, "element")) {
        object.contentEditable = true;
        object.select();
        if (document.execCommand) {
            document.execCommand("copy");
        } else {
            zjs.message.err("copy function failure!!");
        }
    } else if (zjs.equal.type(object, "string")) {
        if (window.clipboardData) {
            window.clipboardData.clearData();
            window.clipboardData.setData("Text", object);
        } else if (document.execCommand) {
            var cb = document.getElementById("hidden_cb");
            cb.innerText = object;
            cb.select();
            if (!document.execCommand("copy")) {
                zjs.message.err("copy failure!");
            }
            cb.blur();
        }
    }
};
zjs.cuttoText = function (object) {
    object.select();
    document.execCommand("cut");
};


//add attribute
//usage:zjs.plus(obj,attr1,val1)(attr2,val2)(attr3,val3)...
//NNOTE:there is no way to add attributes from an object???
zjs.plus = function (object, name, value) {
    if (arguments.length === 3) {
        object[name] = value;
    } else if (zjs.equal.type(name, "object")) {
    } else {
        object.push(name);
    }
    var chain = function (name, value) {
        zjs.plus(chain.obj, name, value);
        return chain
    };
    chain.obj = object;
    return chain
};
//Favorite API
//<a href=# rel="sidebar" onclick="javascript:addFavorite2()">加入收藏</a>
zjs.addToFavorite = function () {
    var url = zjs.value.src, title = document.title;
    if (window.external && window.external.AddToFavoritesBar) {
        window.external.AddToFavoritesBar(url, title);
    } else if (window.external && window.external.addFavorite) {
        window.external.addFavorite(url, title);
    } else if (window.sidebar && window.sidebar.addPanel) {
        window.sidebar.addPanel(title, url, "");
    } else {
        alert("请手动按CTRL+D收藏");
    }
};
