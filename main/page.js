var searchMethod={};
var searchSettings={
    defalut:"bing-cn",
    current:"bing-cn",
    short:{
        "bing":"bing-cn",
        "bd":"baidu",
        "zh":"zhihu",
        "gg":"google",
        "sg":"sougou"
    }
};
/*
list={
    keyword关键词
    language语言=Simplified Chinese/Traditional Chinese/English/All
    site网站
 */
var addSearchMethod=function (name,text) {
    searchMethod[name]=text;
};
var useSearchMethod=function(name,input){
    return searchMethod[name].replace("{keyword}",input);
};
var readSearchText=function (text) {
    return text;
};
var convertTextToSearch=function (method,text) {
    return useSearchMethod(method,readSearchText(text));
};
var addFromRawText=function(text,keyword,name){
    if(!name) name=zzz.path.domain(text);
    addSearchMethod(name,text.replace(keyword,"{keyword}"));
};
var readPreference=function () {
    if(zzz.storage.get("preferredSearchEngine")){
        searchSettings.current=zzz.storage.get("preferredSearchEngine");
    }
    var b=zzz.storage.get("backgroundImageURL");
    if(b&&b!=="undefined")
    zzz.get.id("main").style.backgroundImage="url('"+b+"')";
};
var showKey=function(e){
    var interpret=zzz.incidence.interpret(e);
    var a=zzz.get.id("messageKey");
    if(!a){
        a=zzz.create("div");
        zzz.addAttr(a.style,{
           position:"absolute",
            width:"100%",
            minWidth:"20%",
            height:"10%",
            fontSize:zzz.browser.screenY*0.1+"px",
            top:"70%",
            display:"block",
            textAlign:"center",
            color:"black",
            backgroundColor:"rgba(255,255,255,0.8)",
            boxShadow:"2px 2px 3px black",
            visibility:"visible",
            opacity:"1"
        });
        a.className="smooth";
        zzz.set(a,"id","messageKey");
        document.body.appendChild(a);
    }
        a.innerText=interpret.key+" "+zzz.value.convertTokey(interpret.key);
    zzz.set.style(a,"visibility","visible");
        zzz.set.style(a,"opacity",1);
        setTimeout(function () {
            zzz.set.style(a,"opacity",0);
            setTimeout(function () {
                if(a.style.opacity==0)
                zzz.set.style(a,"visibility","hidden");
            },1000);
        },5000);
};
var savePreferrence=function () {
    zzz.storage.set("preferredSearchEngine",searchSettings.current);
};
var interpretCmd=function () {
    var text=zzz.get.id("search_bar").innerText;
    var cmdLine=text.split(" ");
    cmdLine[cmdLine.length-1]=cmdLine[cmdLine.length-1].replace(/[\n ]/g,"");
    console.log(cmdLine);
    var i=0;
    //set a search engine.
    if(cmdLine[0]==="set"){
        //inspect validity
        if(searchSettings.short[cmdLine[1]]) cmdLine[1]=searchSettings.short[cmdLine[1]];
        if(searchMethod[cmdLine[1]]){
            searchSettings.current=cmdLine[1];
            zzz.get.cls("search_engine")[0].innerText=cmdLine[1];
        }
        else{
            let a=zzz.get.style(zzz.get.cls("search_engine")[0],"backgroundColor");
            zzz.get.cls("search_engine")[0].style.backgroundColor="rgba(255,100,100,0.5)";
            setTimeout(function () {
                zzz.set.style(zzz.get.cls("search_engine")[0],"backgroundColor",a);
            },1000);
        }
    }
    //bg for background
    else if(cmdLine[0]==="bg"){
        //verify
        //TODO : verify?
        var n=zzz.create("img");
        zzz.set(n,"src",cmdLine[1]);
        zzz.addAttr(n.style,{
            position: "absolute",
            display: "block",
            visibility: "hidden"
        });
        document.body.appendChild(n);
        //use
        zzz.get.id("main").style.backgroundImage="url('"+cmdLine[1]+"')";
        zzz.storage.set("backgroundImageURL",cmdLine[1]);
    }
    //default: search something
    else{
        var method=zzz.get.cls("search_engine")[0].innerText;
        if(method in searchMethod) zzz.browser.open(convertTextToSearch(method, text));
        else zzz.browser.open(convertTextToSearch(searchSettings.current, text));
    }
};
var initializer=function(){
    if(!zzz.value.search){
        setTimeout(initializer,1);
        return;
    }
    zzz.value.search.forEach(function (item,index,array) {
        addSearchMethod(item[0],item[1]);
    });
    zzz.value.homepage={};
    zzz.value.homepage.search_bar=1;
    zzz.incidence.bind(zzz.get.id("search_bar"),"keydown",function (e) {
    var n=zzz.incidence.interpret(e).key;
    if(zzz.value.convertTokey(n)==="enter") {
        interpretCmd(e);
        e.preventDefault();
    }
    else{
        if(zzz.get.id("search_bar").innerText.length*zzz.value.homepage.ft>=zzz.value.homepage.search_bar*zzz.toNum(zzz.get.style(zzz.get.id("search_bar"),"width"))){
            console.log(zzz.get.id("search_bar").innerText.length*zzz.value.homepage.ft*zzz.value.homepage.search_bar,zzz.toNum(zzz.get.style(zzz.get.id("search_bar"),"width")));
            zzz.value.homepage.ft/=2;
            zzz.value.homepage.search_bar*=2;
            zzz.set.style(zzz.get.id("search_bar"),"fontSize",zzz.value.homepage.ft+"px");
        }
        else if(zzz.value.homepage.search_bar>1&&zzz.get.id("search_bar").innerText.length*zzz.value.homepage.ft*2<(zzz.value.homepage.search_bar/2)*zzz.toNum(zzz.get.style(zzz.get.id("search_bar"),"width"))){
            zzz.value.homepage.ft*=2;
            zzz.value.homepage.search_bar/=2;
            zzz.set.style(zzz.get.id("search_bar"),"fontSize",zzz.value.homepage.ft+"px");
        }
    }
    });
    readPreference();
    zzz.incidence.bind(document.body,"keydown",showKey);
    zzz.incidence.bind(zzz.get.cls("enter_button")[0],"click",interpretCmd);
    var obj=zzz.get.id("search_bar");
    var style={
        width:0.4*zzz.browser.screenX,
      height:0.1*zzz.browser.screenX,
    };
        style.fontSize=style.height-10;
        zzz.value.homepage.ft=style.height;
        zzz.value.homepage.height=style.height;
        zzz.value.homepage.width=zzz.toNum(zzz.get.style(obj,"width"));
        zzz.set.style(zzz.get.cls("enter_button")[0],"height",zzz.value.homepage.height+"px");
    zzz.set.style(zzz.get.cls("enter_button")[0],"width",zzz.value.homepage.height+"px");

    for(let i in style) {
        zzz.set.style(obj, i, style[i]+"px");
    }
    zzz.incidence.bind(document.body,"unload",savePreferrence);
};
initializer();
