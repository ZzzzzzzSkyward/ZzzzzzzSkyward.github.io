var pagejs_version=20200915;
var searchMethod={};
var pagejs=1;
var searchSettings={
    defalut:"bing-cn",
    current:"bing-cn",
    short:{
        "bing":"bing-cn",
        "bd":"baidu",
        "zh":"zhihu",
        "gg":"google",
        "sg":"sougou"
    },
    jump:{},
    bar:zzz.get.id("search_bar"),
    engine:zzz.get.cls("search_engine")[0],
    text:function (element,text) {
        if(!text) return this[element].innerText!==undefined?this[element].innerText:this[element].value;
        else{
            this[element].innerText=text;this[element].value=text;
        }
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
    if(!name) name=zzz.path.split(text).subdomain;
    addSearchMethod(name,text.replace(keyword,"{keyword}"));
};
var addUIPanel=function () {
    //UI
    var str1=prompt("add an item (shortcut or search engine):");
    if(str1){
        var str2=prompt("input the location(use {keyword} to refer to keyword):");
        if(str2){
            searchSettings.text("engine",'"'+str1+'":"'+str2+'",');
            zzz.clip.copy(searchSettings.text("engine"));
            zzz.storage.add(str2.indexOf("{keyword}")===-1?"shortcut":"engine",str1,str2);
        }
    }
    //var title=zzz.create("div",{innerText:"add"});
    //title.
};
var readPreference=function () {
    if (zzz.storage.get("preferredSearchEngine")) {
        searchSettings.current = zzz.storage.get("preferredSearchEngine");
    }
    var b = zzz.storage.get("backgroundImageURL");
    if (b && b !== "undefined")
        zzz.get.id("main").style.backgroundImage = b;
    b = zzz.storage.get("translationEngine");
    if (b && b != "undefined") zzz.value.translation.default.engine = b;
    b = zzz.storage.json("unicode");
    if (b) {
        zzz.addAttr(zzz.value.unicodeAlias, b);
    }
    b = zzz.storage.get("shortcut");
    if (b) {
        b = JSON.parse(b);
        for (let i in b) {
            searchSettings.jump[i] = b[i];
        }
    }
    b = zzz.storage.get("engine");
    if (b) {
        b = JSON.parse(b);
        for (let i in b) {
            searchMethod[i] = b[i];
        }
    }
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
var pageStore=function () {
    return {
    preferredSearchEngine:searchSettings.current,
    backgroundImageURL:zzz.get.style(zzz.get.id("main"),"backgroundImage"),
    translationEngine:zzz.value.translation.default.engine
    }
};
var savePreference=function () {
    //check
    var originalData,currentData,items=pageStore();
    for(let i in items){
        originalData=zzz.storage.get(i);
        currentData=items[i];
        if(originalData!==currentData) zzz.storage.set(i,currentData);
    }
};
var interpretCmd=function (e,isEqual) {
    var text=searchSettings.text("bar");
    isEqual=isEqual!=="=";
    var cmdLine=text.split(" ");
    var command="";
    cmdLine[cmdLine.length-1]=cmdLine[cmdLine.length-1].replace(/[\n ]/g,"");
    command=searchSettings.fixed||cmdLine[0];
    console.log(cmdLine);
    var i=0;
    //jump
    if(isEqual&&searchSettings.jump[cmdLine[0]]){
        zzz.browser.open(searchSettings.jump[cmdLine[0]]);
        return;
    }
    //redirect
    else if(cmdLine.length===1&&zzz.value.domain.has(zzz.path.split(cmdLine[0]).domain)&&zzz.path.split(cmdLine[0]).host){
        zzz.browser.open(cmdLine[0]);
    }
    //set fixed command
    else if(cmdLine[0]==="fix"){
        searchSettings.fixed=cmdLine[1]||"";
        searchSettings.text("engine","fixed= "+cmdLine[0]);
    }
    else if(isEqual&&cmdLine[0]==="set"){
        if(cmdLine[1]==="translation"&&cmdLine[2]){
            //set a translation engine
            //verify
            if(zzz.value.translation.engine[cmdLine[2]]){
                zzz.value.translation.default.engine=cmdLine[2];
                savePreference();
            }
            else if(cmdLine[2].length===2){
                zzz.value.translation.default.to=cmdLine[2];
            }
        }
        else {
            //set a search engine.
            //inspect validity
            if (searchSettings.short[cmdLine[1]]) cmdLine[1] = searchSettings.short[cmdLine[1]];
            if (searchMethod[cmdLine[1]]) {
                searchSettings.current = cmdLine[1];
                searchSettings.text("engine", cmdLine[1]);
            } else {
                let a = zzz.get.style(searchSettings.engine, "backgroundColor");
                searchSettings.engine.style.backgroundColor = "rgba(255,100,100,0.5)";
                setTimeout(function () {
                    zzz.set.style(searchSettings.engine, "backgroundColor", a);
                }, 1000);
            }
        }
        searchSettings.text("bar","");
    }
    else if(cmdLine[0]==="search"){
        if(searchSettings.short[cmdLine[1]]) cmdLine[1]=searchSettings.short[cmdLine[1]];
        if(searchMethod[cmdLine[1]]){
            var text="";
            for(let i=2;i<cmdLine.length;i++) text+=cmdLine[i]+" ";
            defaultSearch(cmdLine[1],text);
        }
    }
    else if(cmdLine[0]==="download"){
        zzz.browser.download("https://zzzzzzzskyward.github.io/main/zjs.7z");
    }
    //random integer
    else if(command==="random"){
        if(!cmdLine[1]) cmdLine[1]="0";
        if(!cmdLine[2]) cmdLine[2]="1";
        if(!cmdLine[3]) cmdLine[3]="=";
        cmdLine[4]=zzz.random.int(zzz.toNum(cmdLine[1]),zzz.toNum(cmdLine[2])).toString();
        searchSettings.text("bar",cmdLine.join(" "));
    }
    //web archive api
    else if(cmdLine[0]==="archive"){
        var text=cmdLine.join(" ").slice(8);
        if(!text) return;
        zzz.api.archive.save(text);
    }
    else if(cmdLine[0]==="openarchive"){
        var text=cmdLine.join(" ").slice(12);
        if(!text) return;
        zzz.api.archive.open(text,function (status) {
        if(!status) zzz.api.archive.find(text);
        });
    }
    //unicode
    else if(command==="unicode"){
        if(cmdLine[2]&&cmdLine[2].length===1){
            //add
            zzz.storage.add("unicode",cmdLine[1],cmdLine[2].charCodeAt(0));
        }
        else if(cmdLine[1]) {
            //translate
            var probableIcon = zzz.api.unicode.search(cmdLine[1], zzz.value.unicodeAlias);
            var result = "";
            if (zzz.equal.type(probableIcon, "array")) {
                for (let i of probableIcon) result += zzz.api.unicode.translate(i);
            } else result = zzz.api.unicode.translate(probableIcon);
            searchSettings.text("engine", result);
            if(searchSettings.unicodeCopyEnabled) zzz.clip.copy(result);
        }
        else{
            //list
            var recur=function (i) {
            for(let j in i){
                if(zzz.equal.type(i[j],"number")){searchSettings.engine.innerText+=zzz.api.unicode.translate(i[j]);}
                else recur(i[j]);
            }
            };
            recur(zzz.value.unicode);
        }
    }
    //add shortcut or search engine
    else if(cmdLine[0]==="add"&&cmdLine.length===1){
        addUIPanel();
    }
    //translate
    else if(command==="translate"||command==="fanyi"||command==="fy"){
        if(!cmdLine[1]) return;
        else{
            let text=cmdLine.join(" ");
            text=text.slice(cmdLine[0].length+1);
            let isEnglish=cmdLine[1]==="en";
            isEnglish=isEnglish&&cmdLine[2];
            if(isEnglish) text=text.slice(cmdLine[1].length+2);
            searchSettings.text("bar","translate "+text+" = ...");
            let translate=function(resp){
                searchSettings.text("bar",searchSettings.text("bar").replace("...",resp.dst||resp.join(",")));
                //searchSettings.text("bar",searchSettings.text("bar")+resp.dst);
            };
            zzz.api.translation.translate(text,translate,null,null,isEnglish?"en":null);
        }
    }
    //current time
    else if(cmdLine[0]==="time"&&(cmdLine.length===1||cmdLine[1]==="=")){
        searchSettings.text("bar","time = "+zzz.time.getTime().reverse().join(":"));
    }
    //current date
    else if(cmdLine[0]==="date"&&(cmdLine.length===1||cmdLine[1]==="=")){
        searchSettings.text("bar","date = "+zzz.time.getDate().reverse().join(".")+" "+zzz.value.weekday[zzz.time.getWeek(zzz.time.now())]+"day");
    }
    //math
    else if(!isEqual){
        let calculation=eval(text.replace("=",""));
        if(calculation) searchSettings.text("engine",calculation);
    }
    //introduction
    else if(isEqual&&cmdLine[0]==="help"&&cmdLine.length===1){
        showIntroduction();
    }
    //bg for background
    else if(isEqual&&cmdLine[0]==="bg"){
        //verify
        //bing fix
        if(cmdLine[1]==="bing") cmdLine[1]=zzz.api.bingWallpaper.rand();
        var verification=function (node,success) {
            if(success&&node.complete===true){
                zzz.get.id("main").style.backgroundImage="url('"+cmdLine[1]+"')";
                savePreference();
            }else{
                searchSettings.text("engine","image unavailable");
                setTimeout(function () {
                    searchSettings.text("engine",searchSettings.current);
                },1000);
            }
        };
        zzz.ajax.get("img",cmdLine[1],verification);
    }
    else if(isEqual&&cmdLine[0]==="update"&&cmdLine.length===1){
        pageUpdate.test();
    }
    //default: search something
    else{
        defaultSearch();
    }
    resizer();
};
var defaultSearch=function (method,text) {
    if(!method) method=searchSettings.current;
    if(!text) text=searchSettings.text("bar");
    //var node=
    zzz.browser.open(convertTextToSearch(method, text));
    //node.className="search_result";
    //zzz.get.id("main").appendChild(node);
};
var resizer=function () {
    //console.log(searchSettings.bar.value.length*zzz.value.homepage.ft*zzz.value.homepage.search_bar,zzz.toNum(zzz.get.style(searchSettings.bar,"width")));
    while(searchSettings.text("bar").length*zzz.value.homepage.ft>=zzz.value.homepage.search_bar*zzz.toNum(zzz.get.style(searchSettings.bar,"width"))){
        zzz.value.homepage.ft/=2;
        zzz.value.homepage.search_bar*=2;
        zzz.set.style(searchSettings.bar,"fontSize",zzz.value.homepage.ft*0.9+"px");
    }
    while(zzz.value.homepage.search_bar>1&&searchSettings.text("bar").length*zzz.value.homepage.ft*2<(zzz.value.homepage.search_bar/2)*zzz.toNum(zzz.get.style(searchSettings.bar,"width"))){
        zzz.value.homepage.ft*=2;
        zzz.value.homepage.search_bar/=2;
        zzz.set.style(searchSettings.bar,"fontSize",zzz.value.homepage.ft*0.9+"px");
    }
};
var gadget={
  clock:{
      getTime:function () {
          var info=zzz.time.now();
          return [info.hour,info.minute,info.second];
      },
      getDate:function () {
          var info=zzz.time.now();
          var weekday=(new Date()).getDay()||7;
          return [info.day,info.month,info.year,weekday];
      },
      create_number:function (parentNode) {
          if(!parentNode) return;
          var x=zzz.get.style(parentNode,"width"),y=zzz.get.style(parentNode,"height");
          var node=zzz.create("div");
          var style={
            height:"100%",
            width:"100%",
              position:"relative",
              top:0,
              left:0,
              fontSize:y
          };
          zzz.addAttr(node.style,style);
          node.className="standard_font";
          zzz.value.time=this.getTime();
          parentNode.appendChild(node);
          if(!zzz.value.clocks) {
              zzz.value.clocks = [];
              setInterval(this.refresh,1000);
          }
          zzz.value.clocks[zzz.value.clocks.length]=node;
      },
      refresh:function () {
          var i=gadget.clock.getTime();
          for(let j of zzz.value.clocks){
              let txt=[i[0].toString(),i[1].toString(),i[2].toString()];
              if(i[0]<10) txt[0]="0"+txt[0];
              if(i[1]<10) txt[1]="0"+txt[1];
              if(i[2]<10) txt[2]="0"+txt[2];
              j.innerText=txt.join(" ");
          }
      }
  }
};
var tackleInput=function (e) {
    var n=zzz.incidence.interpret(e);
    if(zzz.value.convertTokey(n.key)==="enter") {
        if(n.ctrl) defaultSearch();
        else interpretCmd(e);
        e.preventDefault();
    }
    else if(zzz.value.convertTokey(n.key)==="="){
        interpretCmd(e,"=");
        e.preventDefault();
    }
    resizer();
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
    zzz.incidence.bind(searchSettings.bar,"keydown",tackleInput);
    readPreference();
    //zzz.incidence.bind(document.body,"keydown",showKey);
    zzz.incidence.bind(zzz.get.cls("enter_button")[0],"click",interpretCmd);
    var obj=searchSettings.bar;
    var button=zzz.get.cls("enter_button")[0];
    var style={
        width:0.45*zzz.browser.screenX,
        height:0.1*zzz.browser.screenX,
    };
        style.fontSize=style.height-10;
        zzz.value.homepage.ft=style.height;
        zzz.value.homepage.height=style.height;
        zzz.value.homepage.width=zzz.toNum(zzz.get.style(obj,"width"));
        zzz.set.style(button,"height",zzz.value.homepage.height/2+"px");
        zzz.set.style(button,"width",zzz.value.homepage.height/2+"px");
        zzz.set.style(button,"top",zzz.toNum(zzz.get.style(button,"top"))-zzz.value.homepage.height/4+"px");
        zzz.set.style(searchSettings.bar,"top",zzz.browser.screenY/2-0.5*zzz.value.homepage.height+"px");
        zzz.set.style(searchSettings.engine,"top",zzz.browser.screenY/2+0.5*zzz.value.homepage.height+"px");

    for(let i in style) {
        zzz.set.style(obj, i, style[i]+"px");
    }
    zzz.incidence.bind(document.body,"unload",savePreference);
};
initializer();
pageUpdate={
    test:function () {
        if(!zzz.api.update.current.page){
            zzz.api.update.current.page=pagejs_version;
        }
        zzz.api.update.test();
        setTimeout(function () {
            let a=zzz.api.update.check();
            if(a.length){
                alert("the following resources can be updated:\n",a.join("\n"));
            }
            else{
                alert("Everything up to date.");
            }
        },3000);
    }
};
var showIntroduction=function () {
  let intr=zzz.get.id("introduction");
  var poem="铅笔奏鸟语，黑板绘樱花。<br/>青风扶字正，白月照影斜。";
  if(!intr.innerHTML){
      zzz.addAttr(intr.style,{
          top:"10px",
          left:"20%",
          width:"60%",
            fontSize:0.6*zzz.browser.screenX/20+"px"
      });
      intr.innerHTML+="<p style='text-align:center;font-size:larger'>"+poem+"</p>";
      let text=zzz.ajax.create({url:"introduction.txt",async:false}).responseText;
      intr.innerHTML+="<pre>"+text+"</pre>";
  }
  setTimeout(function() {
      zzz.set.style(intr, "visibility", "visible");
      zzz.set.style(intr, "opacity", "1");
      zzz.set.style(zzz.get.id("main"), "filter", "blur(0px)");
      zzz.set.style(zzz.get.id("main"), "filter", "blur(20px)");
  },1000);
};
