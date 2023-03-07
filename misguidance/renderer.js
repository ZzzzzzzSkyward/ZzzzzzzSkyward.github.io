var gbyid=function (id) {
    return document.getElementById(id);
};
var gbycls=function (cls) {
    return document.getElementsByClassName(cls);
};
var sbycls=function (cls,stl,val) {
    for(let i of gbycls(cls)){
        i.style[stl]=val;
    }
};
var ctecls=function (tag,cls) {
    var node=document.createElement(tag);
    node.className=cls;
    return node;
}
var currentDepth=0;
var essay=[
        {
            title:"小提示",
            content:["门其实是可以不锁的。","一定记得带钥匙，否则只能找室友、楼长了。","一定记得带校园卡。"]
        },
    {
        title:"近日重要提示：",
        content:["英语水平考试不要考太高，C+只能上一门课，亏了；A的话我觉得怎么也不会考到吧；B的选择比C多一点，最好考B","选课一定要做好全部掉光的打算，投点是玄学：0点都可能中99点都可能掉，你想旁听一定要有决心，选课量力而行，25学分=期末ddl爆炸。","选课前善用搜索（树洞、测评、学长）","刷课可以使用刷课机，也可以手动刷新，注意不要点刷新按钮（因为如果增加名额它也显示「选课人数没有变化」），而要刷新整个页面，必要时退出重进，以防浏览器/服务器读取缓存","我提供了一个页面美化脚本，位于zzzzzzzskyward.github.io/auto.js，有兴趣者可以去我的项目康康"]
        },
        {
            title:"装备与外设",
            content:["笔记本电脑：必备。据观察不少人都使用onenote做笔记。其次，台式机虽然舒服但是不能携带比较伤。",
                "耳机：大家都不外放。",
                ""
            ]
        },
        {
            title:"了解北京大学官方网站构成",
            content:[{
                title:"北大网盘disk.",
                content:["可以内部分享，也可以生成外链。","<u>不限速</u>（划重点）"]
            },{
                title:"选课系统elective.",
                content:["在抢课时打开该网站可以看到各种错误","需要不停刷新，说不定就刷出来了呢","在portal.教务部业务里可以查看全部课程"]
            },
                {
                    title:"内网vpn.",
                    content:["下载Pulse Secure即可从校外网访问校内网（即名称为PKU的wifi所在网络）（注意名为PKU Visitor的wifi并不是内网）","仅限内网的包括但不限于：software.，北大图书馆，ftp.。"]
                },
                {
                    title:"网络its.",
                    content:["功能包括：查看连接数、停用与启用网络服务等"]
                },{
                    title:"门户portal.",
                    content:["要办的业务基本都能找到"]
                },
                {
                    title:"教学网course.",
                    content:["记得在登录后填写一下邮箱"]
                },{
                    title:"邮箱mail.",
                    content:["所有官方讯息都会发给你的这个邮箱，所以记得时不时检查一下","可以利用这个学校邮箱申请一些对学生优惠的产品"]
                },{
                    title:"教务dean.",
                    content:["少数事务会去这里办"]
                }    ]
        },
        {
            title:"了解非官方渠道",
            content:[{
                title:"树洞pkuhelper.",
                content:["进入方法：1.下载PKU Helper最新版。\n2.进入上述网址/hole/这个网站","学会使用网页版的搜索功能，这在选课时非常有用。"]
            },{
                title:"未名BBS",
                content:["允许校外人士参观"]
            },{
                title:"肥猴输出平台",
                content:["这个微信公众号由北大校友李尽沙运营","（确认了，是位技术大佬"]
            },{
                title:"赛艇先生",
                content:["这个微信公众号有一个历年期末资料的数据库"]
            }]
        },
        {
            title:"电脑上需要用到的一些资源和技术",
            content:["下载以下浏览器：Google Chrome或Edge Chrome。另外，我个人还推荐Mozilla Firefox","使用能够穿越GFW（The Great Firewall of China）的技术，由于方法较多，故不再提供","注册Microsoft账号与Google账号",
                "下载适用的浏览器插件","访问维基（wiki）：比百度百科靠谱吧，但是最好看英文版，还要看编辑者是否专业（最近看到法轮功的词条，上面写的什么乱七八糟的东西）","造访Facebook、Twitter、Quora等网站（或许还有Pixiv、YouTube和Pornhub）","使用百度、必应（国际版）、谷歌、搜狗等搜索引擎。","在一些优质资源里查找，如知乎、豆瓣、贴吧。",
                "使用有道词典、百度翻译、谷歌翻译（translate.google.<b>cn</b>是谷歌全家桶里唯一没有被墙的）进行翻译，并用牛津词典、Merriam-Webster词典查词","试用划词翻译","在维普、万方、中国知网、谷歌学术与北京大学图书馆上搜索论文",
                "在software.上下载正版的Word 2019、Excel 2019、PowerPoint 2019以及其他合用的软件，如Matlab、Photoshop等","【计算机相关专业】注册Github账号，学习Markdown格式，并创建一个自己的仓库"
            ]
        },
        {
            title:"打卡景点",
            content:["红湖","朗润园","北京大学图书馆的期刊阅览室"]
        },
        {
            title:"学习与了解当今世界的政治格局",
            content:["上了大学仍然是有政治课的，不过即使不是为了上课的需要，多了解一下这个世界也是不错的","目标：学会批判性思考，树立制度自信，提高国民平均政治素养",{title:"现略举一些例子：",content:["全球化，自由主义，民族主义与逆向民族主义，世界今后的潮流","普世价值是否存在，如自由、民主等","中国的现代化进程","台湾的民主化"]},"美国的反智主义、香港、女拳（参考平权主义、女性主义、后现代主义）"]
        }
];
document.body.onscroll=function () {
    var a=document.body.scrollTop||window.pageYOffset,b=document.body.scrollHeight;
    gbycls("bg")[0].style.filter="blur("+(a>b?50:a/b*50)+"px)";
}
function render(arr){
    for(let i of arr){
        let node=ctecls("p","title"+currentDepth);
        if(typeof i=="object"){
            currentDepth++;
            if(i.title){
                node.innerHTML=i.title;
                gbyid("content").appendChild(node);
            }
            render(i.content);
            currentDepth--;
        }
        else{
            node.innerHTML=i;
            gbyid("content").appendChild(node);
        }
    }
}
render(essay);
setTimeout(function() {
    gbyid("wrong_presentation").style.display = "none";
    gbycls("title")[0].style.transition="color 1s linear";
    gbycls("subtitle")[0].style.transition="color 1s linear";
    gbycls("title")[0].style.color="rgb(255,255,255)";
    gbycls("subtitle")[0].style.color="rgb(255,255,255)";
},0);
