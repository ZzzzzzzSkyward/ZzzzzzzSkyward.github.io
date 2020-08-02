/*
version:1.0
time:2020.7.7
author:zzs
*/
"use strict";
var zzz= {};
zzz.value={};



//math

zzz.isInt=Number.isInteger ? Number.isInteger : function (number) {
        return number - 0 === Math.ceil(number);
};
zzz.equal=function (a,b) {
    return a===b;
};
zzz.equal.num=function (a,b) {
    return a-0===b-0;
};
zzz.equal.type=function (obj,type) {
  type=type.toString().toLowerCase();
  if(type==="array"){
      return obj instanceof Array;
  }
  else if(type==="element"){
      return obj instanceof Object&&obj instanceof  HTMLElement;
  }
  else if(type==="null"){
      return obj===null;
  }
  else if(type==="NaN"){
      return isNaN(obj)&&typeof obj=="number";
  }
  else if(type==="integer"){
      return typeof obj==="number"&&zzz.isInt(obj);
  }
  else{
      return type===typeof obj;
  }
};
zzz.toNum=function (text) {
    var i=0,j=0,len=text.length,result=0,isNegative=0,isInt=1;
    //find out if there is a number and if it is a negative.
    for(;i<len;i++){
        if(text[i]==='-'){
            isNegative=1;
        }
        else if(text[i]<='9'&&text[i]>='0') break;
    }
    //as supposed, i should have been at the number's first position.
    if(i===len||text[i]>'9'||text[i]<'0') return NaN;
    else{
        //find out if it is an integer or not
        for(j=i;i<len;i++){
            if(text[i]==='.'){
                isInt=0;
            }
            else if(text[i]<'0'||text[i]>'9') break;
        }
        if(isInt) result=parseInt(text.substr(j,i-j));
        else result=parseFloat(text.substr(j,i-j));
        if(isNegative) result=0-result;
        return result;
    }
};
zzz.random=function () {
    return Math.random();
};
zzz.random.int=function(min_included,max_included){
    if(max_included===min_included) return min_included;
    else if(max_included<min_included){
        return zzz.random.int(max_included,min_included);
    }
    return Math.floor(min_included+(max_included-min_included+1)*Math.random());
};
zzz.random.color=function (setting) {
    let r_min=0,r_max=255,g_min=0,g_max=255,b_min=0,b_max=255;
    let a_min=0,a_max=100;//100x
    if(setting.r){
    if(setting.r.min) r_min=setting.r.min;
    if(setting.r.max) r_max=setting.r.max;
    }
    if(setting.g) {
        if (setting.g.min) g_min = setting.g.min;
        if (setting.g.max) g_max = setting.g.max;
    }
    if(setting.b) {
        if (setting.b.min) b_min = setting.b.min;
        if (setting.b.max) b_max = setting.b.max;
    }
    if(setting.a) {
        if (setting.a.min) a_min = setting.a.min * 100;
        if (setting.a.max) a_max = setting.a.max * 100;
    }
    if(!setting.rgba) return "rgb("+zzz.random.int(r_min,r_max)+','+zzz.random.int(g_min,g_max)+','+zzz.random.int(b_min,b_max)+')';
    else return "rgba("+zzz.random.int(r_min,r_max)+','+zzz.random.int(g_min,g_max)+','+zzz.random.int(b_min,b_max)+','+zzz.random.int(a_min,a_max)/100+')';
};
zzz.random.string=function(len){
    if(!len) len=10;
    var str="";
    for(var i=0;i<len;i++){
        str+=zzz.value.validCharacter[zzz.random.int(0,zzz.value.validCharacter.length-1)];
    }
    return str;
};
zzz.appr=Math.round;
zzz.down=Math.floor;
zzz.up=Math.ceil;
zzz.abs=Math.abs;






//code
//TODO : add UTF-8 to BASE64 encoding and decoding method.
//TODO : add SHA1 calculating method for UTF-8.
//current method:text(UTF-8)->uri(encoded)->BASE64
//difference between uri and path:uri doesn't change ":/" into "%XX" because he thinks it belongs to a uri.
zzz.code={
    b:{
        a:function (base64code) {
            return window.atob(base64code);
        }
    },
    a:{
        b:function (text) {
            return window.btoa(text);
        },
        uri:function (text) {
            return window.encodeURI(text);
        },
        path:function (text) {
            return window.encodeURIComponent(text);
        },
        md5package: {
            d: function (n, t) {
                var r = (65535 & n) + (65535 & t);
                return (n >> 16) + (t >> 16) + (r >> 16) << 16 | 65535 & r
            },
            f: function (n, t, r, e, o, u) {
                var c, z;
                return this.d((c = this.d(this.d(t, n), this.d(e, u))) << (z = o) | c >>> 32 - z, r);
            },

            l: function (n, t, r, e, o, u, c) {
                return this.f(t & r | ~t & e, n, t, o, u, c);
            },

            v: function (n, t, r, e, o, u, c) {
                return this.f(t & e | r & ~e, n, t, o, u, c);
            },

            g: function (n, t, r, e, o, u, c) {
                return this.f(t ^ r ^ e, n, t, o, u, c);
            },

            m: function (n, t, r, e, o, u, c) {
                return this.f(r ^ (t | ~e), n, t, o, u, c);
            },

            i: function (n, t) {
                var r, e, o, u;
                n[t >> 5] |= 128 << t % 32, n[14 + (t + 64 >>> 9 << 4)] = t;
                for (var c = 1732584193, f = -271733879, i = -1732584194, a = 271733878, h = 0; h < n.length; h += 16)
                    c = this.l(r = c, e = f, o = i, u = a, n[h], 7, -680876936), a = this.l(a, c, f, i, n[h + 1], 12, -389564586), i = this.l(i, a, c, f, n[h + 2], 17, 606105819), f = this.l(f, i, a, c, n[h + 3], 22, -1044525330), c = this.l(c, f, i, a, n[h + 4], 7, -176418897), a = this.l(a, c, f, i, n[h + 5], 12, 1200080426), i = this.l(i, a, c, f, n[h + 6], 17, -1473231341), f = this.l(f, i, a, c, n[h + 7], 22, -45705983), c = this.l(c, f, i, a, n[h + 8], 7, 1770035416), a = this.l(a, c, f, i, n[h + 9], 12, -1958414417), i = this.l(i, a, c, f, n[h + 10], 17, -42063), f = this.l(f, i, a, c, n[h + 11], 22, -1990404162), c = this.l(c, f, i, a, n[h + 12], 7, 1804603682), a = this.l(a, c, f, i, n[h + 13], 12, -40341101), i = this.l(i, a, c, f, n[h + 14], 17, -1502002290), c = this.v(c, f = this.l(f, i, a, c, n[h + 15], 22, 1236535329), i, a, n[h + 1], 5, -165796510), a = this.v(a, c, f, i, n[h + 6], 9, -1069501632), i = this.v(i, a, c, f, n[h + 11], 14, 643717713), f = this.v(f, i, a, c, n[h], 20, -373897302), c = this.v(c, f, i, a, n[h + 5], 5, -701558691), a = this.v(a, c, f, i, n[h + 10], 9, 38016083), i = this.v(i, a, c, f, n[h + 15], 14, -660478335), f = this.v(f, i, a, c, n[h + 4], 20, -405537848), c = this.v(c, f, i, a, n[h + 9], 5, 568446438), a = this.v(a, c, f, i, n[h + 14], 9, -1019803690), i = this.v(i, a, c, f, n[h + 3], 14, -187363961), f = this.v(f, i, a, c, n[h + 8], 20, 1163531501), c = this.v(c, f, i, a, n[h + 13], 5, -1444681467), a = this.v(a, c, f, i, n[h + 2], 9, -51403784), i = this.v(i, a, c, f, n[h + 7], 14, 1735328473), c = this.g(c, f = this.v(f, i, a, c, n[h + 12], 20, -1926607734), i, a, n[h + 5], 4, -378558), a = this.g(a, c, f, i, n[h + 8], 11, -2022574463), i = this.g(i, a, c, f, n[h + 11], 16, 1839030562), f = this.g(f, i, a, c, n[h + 14], 23, -35309556), c = this.g(c, f, i, a, n[h + 1], 4, -1530992060), a = this.g(a, c, f, i, n[h + 4], 11, 1272893353), i = this.g(i, a, c, f, n[h + 7], 16, -155497632), f = this.g(f, i, a, c, n[h + 10], 23, -1094730640), c = this.g(c, f, i, a, n[h + 13], 4, 681279174), a = this.g(a, c, f, i, n[h], 11, -358537222), i = this.g(i, a, c, f, n[h + 3], 16, -722521979), f = this.g(f, i, a, c, n[h + 6], 23, 76029189), c = this.g(c, f, i, a, n[h + 9], 4, -640364487), a = this.g(a, c, f, i, n[h + 12], 11, -421815835), i = this.g(i, a, c, f, n[h + 15], 16, 530742520), c = this.m(c, f = this.g(f, i, a, c, n[h + 2], 23, -995338651), i, a, n[h], 6, -198630844), a = this.m(a, c, f, i, n[h + 7], 10, 1126891415), i = this.m(i, a, c, f, n[h + 14], 15, -1416354905), f = this.m(f, i, a, c, n[h + 5], 21, -57434055), c = this.m(c, f, i, a, n[h + 12], 6, 1700485571), a = this.m(a, c, f, i, n[h + 3], 10, -1894986606), i = this.m(i, a, c, f, n[h + 10], 15, -1051523), f = this.m(f, i, a, c, n[h + 1], 21, -2054922799), c = this.m(c, f, i, a, n[h + 8], 6, 1873313359), a = this.m(a, c, f, i, n[h + 15], 10, -30611744), i = this.m(i, a, c, f, n[h + 6], 15, -1560198380), f = this.m(f, i, a, c, n[h + 13], 21, 1309151649), c = this.m(c, f, i, a, n[h + 4], 6, -145523070), a = this.m(a, c, f, i, n[h + 11], 10, -1120210379), i = this.m(i, a, c, f, n[h + 2], 15, 718787259), f = this.m(f, i, a, c, n[h + 9], 21, -343485551), c = this.d(c, r), f = this.d(f, e), i = this.d(i, o), a = this.d(a, u);
                return [c, f, i, a];
            },

            a: function (n) {
                for (var t = "", r = 32 * n.length, e = 0; e < r; e += 8) t += String.fromCharCode(n[e >> 5] >>> e % 32 & 255);
                return t
            },

            h: function (n) {
                var t = [];
                for (t[(n.length >> 2) - 1] = void 0, e = 0; e < t.length; e += 1) t[e] = 0;
                for (var r = 8 * n.length, e = 0; e < r; e += 8) t[e >> 5] |= (255 & n.charCodeAt(e / 8)) << e % 32;
                return t
            },

            e: function (n) {
                for (var t, r = "0123456789abcdef", e = "", o = 0; o < n.length; o += 1) t = n.charCodeAt(o), e += r.charAt(t >>> 4 & 15) + r.charAt(15 & t);
                return e;
            },

            r: function (n) {
                return unescape(encodeURIComponent(n));
            },

            o: function (n) {
                return this.a(this.i(this.h(t = this.r(n)), 8 * t.length));
                var t;
            },

            u: function (n, t) {
                return function (n, t) {
                    var r, e, o = this.h(n), u = [], c = [];
                    for (u[15] = c[15] = void 0, 16 < o.length && (o = this.i(o, 8 * n.length)), r = 0; r < 16; r += 1) u[r] = 909522486 ^ o[r], c[r] = 1549556828 ^ o[r];
                    return e = this.i(u.concat(this.h(t)), 512 + 8 * t.length), this.a(this.i(c.concat(e), 640))
                }(this.r(n), this.r(t));
            },
        },
        //derived from https://github.com/blueimp/JavaScript-MD5/blob/master/js/md5.min.js
        md5:function (n,t,r){
            return t?r?this.md5package.u(t,n):this.md5package.e(this.md5package.u(t,n)):r?this.md5package.o(n):this.md5package.e(this.md5package.o(n));
        }
    },
    uri:{
        a:function (uriName) {
            return window.decodeURI(uriName);
        }
    },
    path:{
        a:function (pathName) {
            return window.decodeURIComponent(pathName);
        }
    },
};






//time
class ztimeStructure{
    constructor(time) {
        this.year=time.year||0;
        this.month=time.month||0;
        this.day=time.day||0;
        this.hour=time.hour||0;
        this.minute=time.minute||0;
        this.second=time.second||0;
    }
}
zzz.time={
    convertFromDate:function(date){
        if(date instanceof Date) {
            var result = new ztimeStructure({
                second: date.getSeconds(),
                minute: date.getMinutes(),
                hour: date.getHours(),
                day: date.getDate(),
                month: date.getMonth() + 1,
                year: date.getFullYear()
            });
            //console.log(date.getSeconds(), date.getMinutes(), date.getHours(), date.getDate(), date.getMonth(), date.getFullYear());
            return result;
        }
        else throw new Error("zzz.time.convertFromDate requires a Date.");
    },
    readDate:function(ztime){
        if(ztime instanceof ztimeStructure) {
            var result = [0, 0, 0, 0, 0, 0];
            result[0] = ztime.second;
            result[1] = ztime.minute;
            result[2] = ztime.hour;
            result[3] = ztime.day;
            result[4] = ztime.month;
            result[5] = ztime.year;
            return result;
        }
        throw new Error("zzz.time.readDate requires a ztimeStructure.");
    },
    convertToDate:function(ztime){
        var result= new Date();
        result.setFullYear(ztime.year);
        result.setMonth(ztime.month-1);
        result.setDate(ztime.day);
        result.setHours(ztime.hour);
        result.setMinutes(ztime.minute);
        result.setSeconds(ztime.second);
        return result;
    },
    now:function () {
        return this.convertFromDate(new Date());
    },
    getWeek:function(ztime){
        if(ztime instanceof Date){
            return ztime.getDay()||7;
        }
        else{
            return this.convertToDate(ztime).getDay();
        }
    }
};




//timer
//TODO : find out a way to transfer params.




//storage
//TODO : cookie and sessionStorage
zzz.storage={
    init:function () {
        if(window.localStorage){
            this.db=window.localStorage;
            this.get=function (key) {
                return window.localStorage.getItem(key)||null;
            }
            this.set=function (key,value) {
                return window.localStorage.setItem(key,value);
            }
            this.del=function (key) {
                return window.localStorage.removeItem(key);
            }
        }
    }
};


//ajax
//TODO : complete this.















//browser check
//TODO : complementary.
zzz.browser={
    cookie:window.navigator.cookieEnabled,
    online:window.navigator.onLine==="online",
    uri:window.location.href,
    host:window.location.hostname,
    path:window.location.pathname,
    protocol:window.location.protocol,
    ie:!!window.attachEvent,
    title:document.title,
    back:history.back,
    forward:history.forward,
    replace:location.replace,
    open:function (path,name,type) {
        window.open(path,name,type);
    }
};



//clipboard
//TODO : work with Firefox.
//TODO : handle for object event.
zzz.clip={
    copy:function (text) {
        if(text instanceof String){
            if (window.clipboardData) {
                window.clipboardData.clearData();
                window.clipboardData.setData("Text", text);
                return true;
            }
            else if (document.execCommand) {
                var cb = document.getElementsByTagName("p");
                var originalText=cb.innerText;
                cb.innerText = object;
                cb.select();
                document.execCommand("copy");
                cb.innerText=originalText;
                cb.blur();
                return true;
            }
        }
        return  false;
    }
};






//arrtibute
//set type
zzz.addAttr=function(obj,key_value_set){
    for(let i in key_value_set){
        obj[i]=key_value_set[i];
    }
};
//chain type
zzz.appendAttr=function(obj,key,value){
    obj[key]=value;
    var returnObject={
        func:function (key,value) {
            this.obj[key]=value;
        },
        obj:obj
    };
    return returnObject;
};




//add favorite
//<a href="#" rel="sidebar" onclick="addFavorite()"></a>
//doesn't work at times.
zzz.addFavorite=function (uri,title) {
    var favoriteURL=url||zzz.browser.url,favoriteTitle=title||zzz.browser.title;
    if(window.external){
        //IE 8
        if(window.external.addToFavoritesBar){
            window.external.AddToFavoritesBar(favoriteURL,favoriteTitle,"");
            return;
        }
        //IE 9
        else if(window.external.addFavorites) {
            window.external.addFavorites(favoriteURL, favoriteTitle);
            return;
        }
    }
    if(window.sidebar&&window.sidebar.addPanel){
        window.sidebar.addPanel(favoriteTitle,favoriteURL,"");
    }
    else{
        //unable to add automatically
        console.log("Please use ctrl+D.");
    }
};


//collect information about the browser
zzz.browser.collectData={
    screen:function () {
        var a=document&&document.documentElement&&document.documentElement.clientHeight||0,b=window.innerHeight||0,c=document&&document.body&&document.body.clientHeight||0;
        zzz.browser.screenY=Math.max(a,b,c);
        a=document&&document.documentElement&&document.documentElement.clientWidth;
        b=window.innerWidth;
        c=document&&document.body&&document.body.clientWidth;
        zzz.browser.screenX=Math.max(a,b,c);
    },
    time:function () {
       zzz.browser.time=zzz.time.now();
    },
    fullscreen:function () {
        zzz.browser.hasFullscreen=document.fullscreenEnabled;
    },
    resizeObserver:function () {
        zzz.browser.hasResizeObserver=!!window.ResizeObserver;
    }
};
zzz.browser.init=function(){
    for(var i in zzz.browser.collectData) zzz.browser.collectData[i]();
};



//BOM
//TODO : specify
zzz.get=function (name) {
    if(name[0]==='.') return zzz.get.cls(name.substr(1));
    else if(name[0]==='#') return zzz.get.id(name.substr(1));
};
zzz.get.id=function (id) {
    return document.getElementById(id);
};
zzz.get.cls=function (className) {
    return document.getElementsByClassName(className);
};
zzz.get.tag=function (tagName) {
    return document.getElementsByTagName(tagName);
};
zzz.get.attr=function(element,attribute){
    return element.getAttribute(attribute);
};
zzz.get.style=function(element,style){
    return getComputedStyle(element)[style];
};
zzz.create=function(tag,attributes,styles){
  var element=document.createElement(tag);
  if(attributes){
      for(var i in attributes) element.setAttribute(i,attributes[i]);
  }
  if(styles){
      for(var i in styles) element.style[i]=styles[i];
  }
  return element;
};

zzz.set=function (element,attribute,value) {
    element.setAttribute(attribute,value);
};
zzz.set.style=function(element,attr,value){
    element.style[attr]=value;
};


//audio
zzz.audio={
    jumpTo:function (element,time) {
        element.currentTime=time;
    },
    pause:function (element) {
        element.pause();
    },
    play:function (element) {
        element.play();
    },
    volume:function (element,volume) {
        element.volume=volume;
    },
    speed:function (element,speed) {
        if(speed&&speed>0)
        element.playbackRate=speed;
        return element.playbackRate;
    },
    create:function(setting){
        var attributes={
            muted:setting.muted||"false",
            autoplay:setting.autoplay||"false",
            preload:setting.preload?"auto":"none",
            controls:setting.controls||"false"
        };
        var newAudio=zzz.create("audio",attributes);
        if(setting.src) zzz.set(newAudio,setting.src);
        return newAudio;
    },
    playBackground:function (src) {
        if(!src) return;
        var newAudio=zzz.audio.create({src:src,autoplay: true});
        //TODO : append.
        return newAudio;
    }
};



//resource loading
zzz.load=function (src) {
    //TODO : estimate from suffix.
};
zzz.load.js=function (src) {
    var newScript=zzz.create("script",{src:src,type:"text/javascript",language:"javascript"});
    document.body.appendChild(newScript);
    return newScript;
};
zzz.load.css=function (src) {
    var newCSS=zzz.create("link",{href:src,rel:"stylesheet",type:"text/css"});
    document.body.appendChild(newCSS);
    return newCSS;
};
zzz.load.font=function (name,src) {
    //var newCSS=zzz.create("style");
    //newCSS.innerText="@font-face{font-family:"+name+";src:url('"+src+") format('"+...+"'}";
};


//incidence
zzz.incidence={
    index:0,
    init:function(){
        //addEvent
      if(document.body.addEventListener){
          zzz.incidence.specificEventBinder=0;
      }
      else if(document.body.attachEvent){
          zzz.incidence.specificEventBinder=1;
      }
      else zzz.incidence.specificEventBinder=2;
    },
    bind:function (element,type,func,isCapture) {
        //fix for Firefox scroll
        if (type === "scroll") {
            if (zzz.browser.type === "firefox") {
                type = "DOMMouseScroll";
            } else {
                type = "mousewheel";
            }
        }
        //resizeObserver API
        if(type==="resize") {
            if (zzz.browser.hasResizeObserver){
                return zzz.instance.bindResizeObserver(element,func);
            }
        }
        if(zzz.incidence.specificEventBinder===0){
            element.addEventListener(type,func,isCapture);
        }
        else if(zzz.incidence.specificEventBinder===1){
            element.attachEvent("on"+type,func);
        }
        else{
            if(element["on"+type]){
                var oldFunc=element["on"+type],newFunc=function () {
                    oldFunc();
                    func();
                };
                element["on"+type]=newFunc;
            }
            else
            element["on"+type]=func;
        }
    },
    erase:function (element,type,func,isCapture) {
        //TODO : rewrite with .apply
        if(zzz.incidence.specificEventBinder===0){
            element.removeEventListener(type,func);
        }
        else if(zzz.incidence.specificEventBinder===1){
            element.removeEventListener(type,func);
        }
        else{
            console.log("unable to unbind the function.")
        }
    },
    interpret:function (event) {
        var interpretation={
            alt:event.altKey||false
            ,mouse:0
            ,client:[event.clientX,event.clientY]
            ,screen:[event.screenX,event.screenY]
            ,page:[event.pageX,event.pageY]
            ,ctrl:event.ctrlKey||false
            ,shift:event.shiftKey||false
            ,type:event.type
            ,target:event.target||event.srcElement
            ,key:event.keyCode
            ,delta:event.detail?event.detail/3:event.wheelDelta/120//firefox fix not present
        };
        return interpretation;
    },
    edit:{
        enable:function (element) {
            zzz.set(element,"contenteditable","true");
        },
        disable:function (element) {
            zzz.set(element,"contenteditable","false");
        }
    }
};




//page visibility API
zzz.updatePageVisibility=function () {
    zzz.browser.visible=!(document.hidden||document.visibilityState==="hidden"||document.msHidden||document.webkitHidden||false);
};



//console API
zzz.console=function () {
    return console.log(arguments);
};
//console.clear().count().debug().countReset().error().info().time(name).



//broadcast API
//works only and when the pages are of the same origin, i.e. the protocol, host and port are the same.
//for example, http://host.com/1 can send message to http://host.com/2.html, but not https:// or :5050 or subdomain.host.com
zzz.message={
    nameStorage:{},
    init:function () {
        if(window.BroadcastChannel) zzz.browser.hasBroadcastAPI=true;
        else zzz.browser.hasBroadcastAPI=true;
    },
    open:function (name) {
        if(!zzz.browser.hasBroadcastAPI) return false;
        if(!name){
            name=zzz.random.string(5);
            while(zzz.channel.nameStorage[name]){
            name=zzz.random.string(5);
            }
        }
        var channel=new window.BroadcastChannel(name);
        this.nameStorage[name]=channel;
        return name;
    },
    send(name,arg){
        if(!zzz.browser.hasBroadcastAPI) return false;
        this.nameStorage[name].postMessage(arg);
        return arg;
    },
    bind:function (name,func) {
        if(!this.nameStorage[name]) return false;
        this.nameStorage[name].onmessage=func;
        return name;
    },
    close:function (name) {
        if(!this.nameStorage[name]) return false;
        this.nameStorage[name].close();
        this.nameStorage[name]=null;
        return name;
    }
};


//canvas
zzz.paint={
  get:function (element) {
    return element.getContext("2d");
  },
  paintMethod:{
      fill:function (color) {
        if(!color) color=this.color;
        this.canvas.fill
      }
  }
};



//fullscreen API
//alternative:esc or F11
zzz.browser.fullscreen={
    status:false,
    enter:function (element) {
        if(!element) return;
        this.status=true;
        element.requestFullscreen();
    },
    exit:function () {
        document.exitFullscreen();
        this.status=false;
    }
};



//drag API
//caution: draggable can only be set "true" or "false" instead of true or false.
zzz.incidence.drag={
    enable:function(element){
        element.draggable="true";
    },
    disable:function (element) {
        element.draggable="false";
    },

};



//resizeObserver API
zzz.incidence.bindResizeObserver=function(element,func){
    var f=new window.ResizeObserver(func);
    f.observe(element);
    return f;
};

//absolute path API
//convert a relative path into an absolute API
//for example, ../images/1.jpg + https://blog.cn/css = https://blog.cn/images/1.jpg
zzz.path={
  abs:function (url,base) {
    if(!base) base="";
    var node=zzz.create("a");
    zzz.set(node,"href",base+url);
    var result=node.href;
    node=null;
    return result;
  },
    host:function (url) {
      let result=url.match("://");
      if(result) {
          url = url.substr(result.index + 3);
      }
      result=url.match("/");
        if(result){
            return url.substr(0,result.index+1);
        }
        else return url+"/";
    },
    protocol:function(url){
      let result=url.match("://");
      if(result){
          return url.substr(0,result.index+1);
      }
      else return null;
    },
    domain:function (url) {
        url=zzz.path.host(url);
        let result=url.split(".");
        // return 192.168.1.1 and the like
        var flag=true;
        for(let i of result){
            if(!zzz.isInt(i)){
                flag=false;
                break;
            }
        }
        if(flag) return true;
        else{
        // delete ****.com,****.co,****.uk,etc.
            var i=result.length-1;
            for(;i>=0;i--){
                if(!zzz.value.domain.has(result[i])) break;
            }
            return result[i];
        }
    }
};

zzz.anim={};
//scroll API
zzz.anim.scroll={
    to:function (element,x,y,isSmooth) {
        if(!element) element=window;
        if(isSmooth===undefined) isSmooth=true;
        element.scrollTo(x,y,isSmooth);
    },
    by:function (element,x,y,isSmooth) {
        if(!element) element=window;
        if(isSmooth===undefined) isSmooth=true;
        element.scrollBy(x,y,isSmooth);
    },
    into:function (element,isSmooth) {
        if(!element) return;
        if(isSmooth===undefined) isSmooth=true;
        element.scrollIntoView(isSmooth);
    }
};

//editor API
//author ： zzs
zzz.editor={
    enable:function () {
        var n=zzz.get.id("main").childNodes;
        for(var i in n){
            if(!(n[i] instanceof HTMLElement)) continue;
            zzz.incidence.drag.enable(n[i]);
            zzz.incidence.edit.enable(n[i]);
            zzz.incidence.bind(n[i],"scroll",function (e) {
                var data=zzz.incidence.interpret(e);
                zzz.appendAttr(data.target.style,"fontSize",zzz.toNum(zzz.get.style(data.target,"fontSize"))+data.delta+"px");
                e.preventDefault();
                return false;
            })
        }

    }
};


//overall initialize
zzz.init=function () {
    zzz.storage.init();
    zzz.incidence.init();
    zzz.browser.init();
};

setTimeout(zzz.init,1);