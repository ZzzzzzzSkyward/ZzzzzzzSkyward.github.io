if(!zzz) var zzz={};
if(!zzz.value) zzz.value={};
zzz.value.ajaxinfo={
    100:"客户必须继续发出请求",
    101:"客户要求服务器根据请求转换HTTP协议版本",
    200:"交易成功",
    201:"提示知道新文件的URL",
    202:"接受和处理、但处理未完成",
    203:"返回信息不确定或不完整",
    204:"请求收到，但返回信息为空",
    205:"服务器完成了请求，用户代理必须复位当前已经浏览过的文件",
    206:"服务器已经完成了部分用户的GET请求",
    300:"请求的资源可在多处得到",
    301:"删除请求数据",
    302:"在其他地址发现了请求数据",
    303:"建议客户访问其他URL或访问方式",
    304:"客户端已经执行了GET，但文件未变化",
    305:"请求的资源必须从服务器指定的地址得到",
    306:"前一版本HTTP中使用的代码，现行版本中不再使用",
    307:"申明请求的资源临时性删除",
    400:"错误请求，如语法错误",
    401:"请求授权失败",
    402:"保留有效ChargeTo头响应",
    403:"请求不允许",
    404:"没有发现文件、查询或URl",
    405:"用户在Request-Lne字段定义的方法不允许",
    406:"根据用户发送的Accept拖，请求资源不可访问",
    407:"类似401，用户必须首先在代理服务器上得到授权",
    408:"客户端没有在用户指定的饿时间内完成请求",
    409:"对当前资源状态，请求不能完成",
    410:"服务器上不再有此资源且无进一步的参考地址",
    411:"服务器拒绝用户定义的Content-Length属性请求",
    412:"一个或多个请求头字段在当前请求中错误",
    413:"请求的资源大于服务器允许的大小",
    414:"请求的资源URL长于服务器允许的长度",
    415:"请求资源不支持请求项目格式",
    416:"请求中包含Range请求头字段，在当前请求资源范围内没有range指示值，请求也不包含f-Range请求头字段",
    417:"服务器不满足请求Expect头字段指定的期望值，如果是代理服务器，可能是下一级服务器不能满足请求",
    500:"服务器产生内部错误",
    501:"服务器不支持请求的函数",
    502:"服务器暂时不可用，有时是为了防止发生系统过载",
    503:"服务器过载或暂停维修",
    504:"关口过载，服务器使用另一个关口或服务来响应用户，等待时间设定值较长",
    505:"服务器不支持或拒绝支请求头中指定的HTTP版本"
};
zzz.value.fontFamily={
    1:{ch:"宋体",en:"SimSun"},
    2:{ch:"黑体",en:"SimHei"},
    3:{ch:"微软雅黑",en:"Microsoft Yahei"},
    4:{ch:"楷体",en:"KaiTi"},
    5:{ch:"新宋体",en:"NSimSun"},
    6:{ch:"仿宋",en:"FangSong"},
    7:{ch:"华文黑体",en:"STHeiti"},
    8:{ch:"华文楷体",en:"STKaiti"},
    9:{ch:"华文宋体",en:"STSong"},
    10:{ch:"华文仿宋",en:"STFangsong"},
    11:{ch:"华文中宋",en:"STZhongsong"},
    12:{ch:"华文琥珀",en:"STHupo"},
    13:{ch:"华文新魏",en:"STXinwei"},
    14:{ch:"华文隶书",en:"STLiti"},
    15:{ch:"华文行楷",en:"STXingkai"},
    16:{ch:"隶书",en:"LiSu"},
    17:{ch:"华文细黑",en:"STXihei"},
    18:{ch:"方正舒体",en:"FZShuTi"},
    19:{ch:"方正姚体",en:"FZYaoti"},
    20:{ch:"方正报宋简体",en:"FZBaoSong-Z04S"},
    21:{ch:"方正报宋简体",en:"FZBaoSong-Z04S"},
    22:{ch:"方正报宋简体",en:"FZBaoSong-Z04S"},
    23:{ch:"方正报宋简体",en:"FZBaoSong-Z04S"},
    24:{ch:"方正报宋简体",en:"FZBaoSong-Z04S"},
    25:{ch:"方正报宋简体",en:"FZBaoSong-Z04S"},
    26:{ch:"方正报宋简体",en:"FZBaoSong-Z04S"},
};
zzz.value.event={
    abort:"图像加载中断"
    ,blur:"失去焦点"
    ,change:"内容改变"
    ,click:"单击"
    ,dblclick:"双击"
    ,error:"文档、图像加载出错"
    ,focus:"获得焦点"
    ,keydown:"按下键"
    ,keypress:"按住键"
    ,keyup:"松开键"
    ,load:"文档、图像加载完成"
    ,mousedown:"鼠标按下"
    ,mousemove:"鼠标移动"
    ,mouseout:"鼠标移出元素"
    ,mouseover:"鼠标移到元素上"
    ,mouseup:"鼠标松开"
    ,resize:"调整尺寸"
    ,select:"选中文本"
    ,submit:"提交"
    ,unload:"关闭页面"
    ,visibilitychange:"页面可视性AP"
    //HTML 5
    ,drag:"拖动元素"
    ,dragend:"拖动结束"
    ,dragenter:"拖入"
    ,dragleave:"拖出"
    ,dragover:"在元素内部拖动"
    ,dragstart:"拖动开始"
    ,drop:"放下元素"
    //wheel event
    ,scroll:"鼠标滚轮滚动"
    //media event
    ,pause:"暂停"
    ,play:"播放"
    ,progress:"获取数据"
    ,ratechange:"速率改变"
    ,readystatechange:"准备就绪"
    ,stalled:"无法获取数据"
    ,timeupdate:"跳转"
    ,volumechange:"改变音量"
    ,waiting:"开始等待缓冲"
    //fullscreen API
    ,fullscreenchange:"全屏开启或退出"
    ,fullscreenerror:"设置全屏出错"
};
zzz.value.validCharacter="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_";
zzz.value.ChineseNumber="零一二三四五六七八九十百千万亿点";
zzz.value.ChineseNumberBig="零壹贰叁肆伍陆柒捌玖拾佰仟萬亿點";
zzz.value.zero="0".charCodeAt(0);
zzz.value.a="a".charCodeAt(0);
zzz.value.A="A".charCodeAt(0);
zzz.value.keyCode= {
    1:"leftbutton",
    2:"rightbutton",
    4:"middlebutton",
    8:"backspace",
    9:"tab",
    13:"enter",
    16:"shift",
    17:"ctrl",
    18:"alt",
    19:"pause",
    20:"capslock",
    27:"esc",
    32:"blank",
    33:"pageup",
    34:"pagedown",
    35:"end",
    36:"home",
    37:"leftarrow",
    38:"uparrow",
    39:"rightarrow",
    40:"downarrow",
    44:"printscreen",
    45:"insert",
    46:"delete",
    91:"winl",
    92:"winr",
    106:"*num",
    107:"+num",
    109:"-num",
    110:".num",
    111:"/num",
    144:"numlock",
    145:"scrolllock",
    186:";",
    187:"=",
    188:",",
    189:"-",
    190:".",
    191:"/",
    192:"`",
    219:"[",
    220:"\\",
    222:"'"

};
zzz.value.convertTokey=function (code) {
    if(code>=48&&code<=57) return code-48+"";
    else if(code>=65&&code<=90) return String.fromCharCode(code+32);
    else if(code>=96&&code<=105) return code-96+"num";
    else if(code>=112&&code<=123) return "F"+(code-111);
    else return zzz.value.keyCode[code];
};
zzz.value.domain=new Set([
    "biz","com","edu","gov","info","int","mil","name","net","org","pro","xyz","aero","cat","coop","jobs","museum","travel","mobi","asia","tel","xxx","arpa","root","tel","example","invalid","test",
       "ac","ad","ae","af","ag","ai","al","am","an","ao","aq","ar","as","at","au","aw","az","ba","bb","bd","be","bf","bg","bh","bi","bj","bm","bn","bo","br","bs","bt","bv","bw","by","bz","ca","cc","cd","cf","cg","ch","ci","ck","cl","cm","cn","co","cr","cu","cv","cx","cy","cz","de","dj","dk","dm","do","dz","ec","ee","eg","er","es","et","eu","fi","fj","fk","fm","fo","fr","ga","gd","ge","gf","gg","gh","gi","gl","gm","gn","gp","gq","gr","gs","gt","gu","gw","gy","hk","hm","hn","hr","ht","hu","id","ie","il","im","in","io","iq","ir","is","it","je","jm","jo","jp","ke","kg","kh","ki","km","kn","kr","kw","ky","kz","la","lb","lc","li","lk","lr","ls","lt","lu","lv","ly","ma","mc","md","me","mg","mh","mk","ml","mm","mn","mo","mp","mq","mr","ms","mt","mu","mv","mw","mx","my","mz","na","nc","ne","nf","ng","ni","nl","no","np","nr","nu","nz","om","pa","pe","pf","pg","ph","pk","pl","pm","pn","pr","ps","pt","pw","py","qa","re","ro","ru","rw","sa","sb","sc","sd","se","sg","sh","si","sk","sl","sm","sn","so","sr","st","sv","sy","sz","tc","td","tf","tg","th","tj","tk","tl","tm","tn","to","tr","tt","tv","tw","tz","ua","ug","uk","us","uy","uz","va","vc","ve","vg","vi","vn","vu","wf","ws","ye","yt","yu","za","zm","zw"
]);
zzz.value.weekday=["","Mon","Tues","Wednes","Thurs","Fri","Satur","Sun"];
zzz.value.month=[31,28,31,30,31,30,31,31,30,31,30,31,30];
zzz.value.search=[
    ["baidu","http://www.baidu.com/s?wd={keyword}"],//si,ie,..
    ["bing-cn","https://cn.bing.com/search?q={keyword}"],
    ["bing-en","https://cn.bing.com/search?q={keyword}&ensearch=1"],
    ["google","https://www.google.com/search?q={keyword}"],
    ["zhihu","https://www.zhihu.com/search?type=content&q={keyword}"," "],
    ["github","https://github.com/search?q={keyword}"],
    ["taobao","https://s.taobao.com/search?q={keyword}"],
    ["bilibili","https://search.bilibili.com/all?keyword={keyword}"],
    ["m.bilibili","https://m.bilibili.com/search?keyword={keyword}"],
    ["yandex","https://yandex.com/search/?text={keyword}&lr=20930&lang=en"],
    ["wolframalpha","https://www.wolframalpha.com/input/?i={keyword}"],
    ["duckduckgo","https://duckduckgo.com/?q={keyword}&t=ht&ia=web"],
    ["ask","https://www.ask.com/web?o=0&l=dir&qo=serpSearchTopBox&q={keyword}"]
];
zzz.value.web=["https://www.baidu.com/img/PCtm_d9c8750bed0b3c7d089fa7d55720d6cf.png"];
zzz.value.foreign=["https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"];
zzz.value.translation={
    default:{
        engine:"baidu",
        from:"en",
        to:"zh"
    },
    engine: {
        baidu:"https://api.fanyi.baidu.com/api/trans/vip/translate?q={text}&from={fromLanguage}&to={toLanguage}&appid={id}&salt={salt}&sign={sign}",
        youdao:"https://openapi.youdao.com/api?q={text}&from={fromLanguage}&to={toLanguage}&appKey={id}&salt={salt}&sign={sign}&signType=v3&curtime={time}"
    },
    token:{
        baidu: "V3VDYX2naJAEBev1upFy",
        youdao:"RmXxFtGRYLlwH9BK7U0ZmXP67Dj94Cm0"
    },
    id:{
        baidu:"20200814000542873",
        youdao:"29698b390b528412"
    }
};
zzz.value.unicode= {
    pinyin: {
        a: [257, 225, 259, 224],
        e: [275, 233, 277, 232],
        i: [299, 237, 301, 236],
        o: [333, 243, 335, 242],
        u: [363, 250, 365, 249],
        y: [470, 472, 474, 476]
    },
    bracket: {
        single: [12300, 12301],
        hollow: [12302, 12303],
        round_hollow: [12310, 12311],
        chinese_single: [65378, 65379]
    },
    blank: [10240],
    question_reverted: 191,
    multiply: 215,
    divide: 247,
    degree: 176,
    positive_negative: 177,
    thousand_percent: 8240,
    ten_thousand_percent: 8241,
    delta: 8710,
    sum: 8721,
    tick: 8730,
    smaller_equal: 8804,
    bigger_equal: 8805,
    round: 10752,
    sigma: 8486,
    alphabet: {
        math_bold: [119834, 119808],
        math: [119886, 119860],
        math_italic: [119938, 119912],
    },
    left_arrow: 8592,
    right_arrow: 8594,
    up_arrow: 8593,
    down_arrow: 8595,
    arrow_range: [8592, 8703],
    rectangle: [9600, 9631],
    geometry: {
        square: 9632,
        rectangle: 9644,
        triangle: 9650,
        round: 11044,
        poly5: 11039,
        poly6: 11042
    },
    chemistry: {
        benzene: 9004,

    },
    music: 9833,
    emoji: {
        sun: 9728,
        lightening: 9889,
        cloud: 9729,

    },
    times: [8304, 185, 178, 179, 8308, 8309, 8310, 8311, 8312, 8313],
    down_times: [8320, 8321, 8322, 8323, 8324, 8325, 8326, 8327, 8328, 8329],
    line: 11835,
    celsius_degree: 8451,
    fahrenheit_degree: 8457,
    japanese: [12353, 12447, 12799],//平假名、片假名
    enclosed: {
        small_alphatbet: {
            small_bracket: 9372,
            round: 9424
        },
        big_alphabet: {
            round: 9398
        },
        number: {
            round: 9312,
            small_bracket: 9332,
        }
    }
};
zzz.value.unicodeAlias={};
zzz.value.hex=function(character){
    if(!(typeof character==="string")) return;
    if(isNaN(character-0)) return character.charCodeAt(0)-zzz.value.A+10;
    else return character-0;
};
zzz.value.userAgent={
    browser:["2345Explorer","360 Browser","Amaya","Android Browser","Arora","Avant","Avast","AVG",
        "BIDUBrowser","Baidu","Basilisk","Blazer","Bolt","Brave","Bowser","Camino", "Chimera",
        "Chrome Headless","Chrome WebView","Chrome","Chromium","Comodo Dragon","Dillo",
        "Dolphin","Doris","Edge","Epiphany","Facebook","Falkon","Fennec","Firebird","Firefox",
        "Flock","GSA","GoBrowser","ICE Browser","IE","IEMobile","IceApe","IceCat","IceDragon",
        "Iceape","Iceweasel","Iridium","Iron","Jasmine","K-Meleon","Kindle","Konqueror",
        "LBBROWSER Line","Links","Lunascape","Lynx","MIUI Browser","Maemo Browser","Maemo",
        "Maxthon","MetaSr Midori","Minimo","Mobile Safari","Mosaic","Mozilla","NetFront",
        "NetSurf","Netfront","Netscape","NokiaBrowser","Oculus Browser","OmniWeb",
        "Opera Coast","Opera Mini","Opera Mobi","Opera Tablet","Opera","PaleMoon","PhantomJS",
        "Phoenix","Polaris","Puffin","QQ","QQBrowser","QQBrowserLite","Quark","QupZilla",
        "RockMelt","Safari","Sailfish Browser","Samsung Browser","SeaMonkey","Silk","Skyfire",
        "Sleipnir","Slim","SlimBrowser","Swiftfox","Tizen Browser","UCBrowser","Vivaldi",
        "Waterfox","WeChat","Yandex","baidu","iCab","w3m"],
    os:["AIX","Amiga OS","Android","Arch","Bada","BeOS","BlackBerry","CentOS","Chromium OS",
        "Contiki","Fedora","Firefox OS","FreeBSD","Debian","DragonFly","Fuchsia","Gentoo","GNU",
        "Haiku","Hurd","iOS","Joli","KaiOS","Linpus","Linux","Mac OS","Mageia","Mandriva","MeeGo",
        "Minix","Mint","Morph OS","NetBSD","Nintendo","OpenBSD","OpenVMS","OS/2","Palm","PC-BSD",
        "PCLinuxOS","Plan9","Playstation","QNX","RedHat","RIM Tablet OS","RISC OS","Sailfish",
        "Series40","Slackware","Solaris","SUSE","Symbian","Tizen","Ubuntu","Unix","VectorLinux",
        "WebOS","Windows [Phone/Mobile]","Zenwalk"]
};
zzz.value.init=function(){
    var u=zzz.value.unicode;
    var set= {
        a1: u.pinyin.a[0],
        a2: u.pinyin.a[1],
        a3: u.pinyin.a[2],
        a4: u.pinyin.a[3],
        e1: u.pinyin.e[0],
        e2: u.pinyin.e[1],
        e3: u.pinyin.e[2],
        e4: u.pinyin.e[3],
        i1: u.pinyin.i[0],
        i2: u.pinyin.i[1],
        i3: u.pinyin.i[2],
        i4: u.pinyin.i[3],
        u1: u.pinyin.u[0],
        u2: u.pinyin.u[1],
        u3: u.pinyin.u[2],
        u4: u.pinyin.u[3],
        b1: u.bracket.single,
        b2: u.bracket.hollow,
        b3: u.bracket.chinese_single,
        "乘":u.multiply,
        "除":u.divide,
        "上标":u.times,
        "下标":u.down_times,
        "箭头":[u.up_arrow,u.down_arrow,u.left_arrow,u.right_arrow],
        "摄氏度":u.celsius_degree,
        "华氏度":u.fahrenheit_degree,
        "苯":u.chemistry.benzene,
        "?":u.question_reverted
    };
    for(let i in set) zzz.value.unicodeAlias[i]=set[i];
    for(let i in zzz.value.unicode){
        if(zzz.equal.type(zzz.value.unicode[i],"number")) zzz.value.unicodeAlias[i]=zzz.value.unicode[i];
    }
};
zzz.value.ocr={
    token:"MRMkori4tA25THsgNLknYrGxXlj0zCMA",
    id:"u1pi9cNR8hGBPozNI7A9BnCE"
};
zzz.value.storage={
    defaultExpire:60*60*24
};
zzz.value.tieba={
    emoji:function(name){
        if(this.emoji_alias[name]) name=this.emoji_alias[name];
        var i=0;
        while(i<this.emoji_storage.length) {
            if (this.emoji_storage[i]===name) break;
            i++;
        }
        if(i===this.emoji_storage.length) return 0;
        i++;
        return i<10?("0"+i):i.toString();
    },
    emoji_storage:["hehe","haha","tushe","a","ku","nu","kaixin","han","lei","heixian","bishi","bugaoxing","zhenbang","qian","yiwen","yinxian","tu","yi","weiqu","huaxin","hu","xiaoyan","leng","taikaixin","huaji","mianqiang","kuanghan","shuijiao","jingku","shengqi","jingya","pen","aixin","xinsui",],
    emoji_alias:{
        "滑稽":"huaji",
        "funny":"huaji",
        "angry":"nu",
        "阴险":"yinxian"
    }
};
zzz.value.file={
    mime:{
        audio:{
            aac:"aac",
            mp3:"mpeg",
            oga:"ogg",
            wav:"wav",
            weba:"webm",
            mid:"midi"
        },
        video:{
            "3gp":"3gpp",
            "3g2":"3gpp2",
            webm:"webm",
            ogv:"ogg",
            mpeg:"mpeg",
            avi:"x-msvideo"
        },
        image:{
            gif:"gif",
            jpeg:"jpeg",
            jpg:"jpeg",
            svg:"svg+xml",
            tif:"tiff",
            tiff:"tiff",
            webp:"webp",
            ico:"vnd.microsoft.icon"
        },
        application:{
            bin:"octet-stream",
            bz:"x-bzip",
            bz2:"x-bzip2",
            csh:"x-csh",
            doc:"msword",
            docx:"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            epub:"epub+zip",
            jar:"java-archive",
            json:"json",
            jsonld:"ld+json",
            ogx:"ogg",
            pdf:"pdf",
            ppt:"vnd.ms-powerpoint",
            pptx:"application/vnd.openxmlformats-officedocument.presentationml.presentation",
            rar:"x-rar-compressed",
            rtf:"rtf",
            swf:"x-shockwave-flash",
            tar:"x-tar",
            vsd:"vnd.visio",
            xls:"vnd.ms-excel",
            xlsx:"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            zip:"zip",
            "7z":"x-7z-compressed"
        },
        text:{
            css:"css",
            csv:"csv",
            htm:"html",
            html:"html",
            ics:"calendar",
            js:"javascript",
            mjs:"javascript",
            txt:"plain"
        },
        font:{
            otf:"otf",
            woff:"woff",
            woff2:"woff2",
            ttf:"ttf"
        }
    },
    encode:function (type) {
        var short=zzz.value.file.mime;
        for(let i in short){
            if(short[i][type]) return i+"/"+short[i][type];
        }
        if(type) return "text/"+type;
        else return "text/plain";
    },
    decode:function (mime) {
        var index=mime.indexOf("/")||0;
        var type=mime.slice(0,index),text=mime.slice(index);
        var short=zzz.value.file.mime;
        if(short[type]){
            for(let i in short){
                for(let j in short[i]){
                    if(short[i][j]===text) return j;
                }
            }
        }
        return text;
    }
};
zzz.value.init();