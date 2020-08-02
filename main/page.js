var searchMethod={};
var searchSettings={
    defalut:"bing-cn",
    current:"bing-cn"
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
        var method=zzz.get.cls("search_engine")[0].innerText;
        if(method in searchMethod) zzz.browser.open(convertTextToSearch(method, zzz.get.id("search_bar").innerText));
        else zzz.browser.open(convertTextToSearch(searchSettings.current, zzz.get.id("search_bar").innerText));
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
    var obj=zzz.get.id("search_bar");
    var style={
      height:0.2*zzz.toNum(zzz.get.style(obj,"width"))+"px"};
        style.fontSize=zzz.toNum(style.height)-10+"px";
        zzz.value.homepage.ft=zzz.toNum(style.height);
    for(let i in style) {
        zzz.set.style(obj, i, style[i]);
    }
};
initializer();
