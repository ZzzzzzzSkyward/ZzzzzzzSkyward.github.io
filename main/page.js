var pagejs_version=20201114;
var searchMethod={};
var searchMethodBreaker={};
var pagejs=1;
var searchSettings={
    defalut:"bing-cn",
    current:"bing-cn",
    result:"",
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
        if(arguments.length===1) return this[element].innerText!==undefined?this[element].innerText:this[element].value;
        else{
            if(text[text.length-1]!=="\n") text=text+"\n";
            this[element].innerText=text;
            //focus
            if(element==="bar"){
                zzz.clip.focus(searchSettings.bar,text.length-1);
            }
        }
        return this;
    },
    hintEngine:"",
    hintTargeted:false
};
/*
list={
    keyword关键词
    language语言=Simplified Chinese/Traditional Chinese/English/All
    site网站
 */
var splitCommand=function (text) {
    //delete all \n at the end of the string
    text=text.replace(/[\n]+$/,"");
    //convert all inline \n to blank
    text=text.replace(/\n/g," ").replace(String.fromCharCode(160)," ");
    //split by blank
    var result=[],index=0,len=text.length,p=0,tempText="";
    for(;index<len;index++){
        p=text.indexOf(" ",index);
        if(p===-1) break;
        else{
            tempText=text.slice(index,p);
            if(tempText.length) result.push(tempText);
            index=p;
        }
    }
    if(index<len) result.push(text.slice(index,len));
    else result.push("");
    return result;
};
var addSearchMethod=function (name,text,breaker) {
    searchMethod[name]=text;
    if(breaker) searchMethodBreaker[name]=breaker;
};
var useSearchMethod=function(name,input){
    return searchMethod[name].replace("{keyword}",input);
};
var readSearchText=function (text,breaker) {
    if(!breaker) breaker="+";
    return text.replace(/[ ]+/g,breaker);
};
var convertTextToSearch=function (method,text) {
    text=text.replace("/n"," ").trim();
    return useSearchMethod(method,readSearchText(text,searchMethodBreaker[method]));
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
        a.innerText=interpret.code+" "+interpret.key;
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
var hintCommand=function (text) {
    var keyword="fix set fy translate bg unicode \\u random archive openarchive add search download time date fanyi help update".split(" ");
    //todo : priority queue
    var bestMatch=[{index:-1,distance:99999}];
    keyword.forEach(function (value, index, array) {
        var distance=zzz.string.distance(text,value);
        if(distance<zzz.abs(text.length-value.length))
        if(distance<bestMatch[0].distance) bestMatch[0]={index:index,distance:distance};
    });
    if(bestMatch[0].index===-1) return "";
    else return keyword[bestMatch[0].index];
};
var hintEngine=function (text) {
    //todo : priority queue
    var bestMatch=[{name:"",distance:99999}],value;
    for(let index in searchMethod){
        var distance=zzz.string.distance(text,index);
        if(distance<Math.max(text.length,index.length)) {
            if (distance < bestMatch[0].distance) {
                bestMatch = [{name: index, distance: distance}];
            } else if (distance === bestMatch[0].distance) {
                bestMatch[bestMatch.length] = {name: index, distance: distance};
            }
        }
    }
    if(bestMatch.length===1&&bestMatch[0].name&&bestMatch[0].name.search(text)===0){
        searchSettings.hintTargeted=true;
        return bestMatch[0].name;
    }
    else if(bestMatch[0].index===-1) return "";
    else{
        let names="";
        for(let i of bestMatch) names+=i.name+" or ";
        return names;
    }
};
var interpretCmd=function (interpretation,isEqual) {
    var text=searchSettings.text("bar");
    isEqual=isEqual!=="=";
    var cmdLine=splitCommand(text.replace(/\n$/,"").trim());
    var command="";
    command=searchSettings.fixed||cmdLine[0];
    console.log("your command is: ",cmdLine);
    var i=0;
    //jump
    if(isEqual&&searchSettings.jump[cmdLine[0]]){
        zzz.browser.open(searchSettings.jump[cmdLine[0]]);
        return;
    }
    //redirect
    else if(cmdLine.length===1&&zzz.value.domain.has(zzz.path.split(cmdLine[0]).domain)&&zzz.path.split(cmdLine[0]).host){
        let temp=zzz.path.split(cmdLine[0]);
        if(!temp.protocol) temp.protocol="http:";
        zzz.browser.open(zzz.path.merge(temp));
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
                savePreference();
            } else {
                let a = zzz.get.style(searchSettings.engine, "backgroundColor");
                warn();
            }
        }
        searchSettings.text("bar","");
    }
    else if(cmdLine[0]==="search"||cmdLine[0]==="sh"){
        if(searchSettings.short[cmdLine[1]]) cmdLine[1]=searchSettings.short[cmdLine[1]];
        if(searchMethod[cmdLine[1]]){
            var text="";
            for(let i=2;i<cmdLine.length;i++) text+=cmdLine[i]+" ";
            defaultSearch(cmdLine[1],text);
        }
    }
    //random integer
    else if(command==="random"||command==="rnd"){
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
        var resp=function(response){
            if(zzz.fetch.judge(response)) return;
            else warn();
        };
        zzz.api.archive.save(text,resp);
    }
    else if(cmdLine[0]==="openarchive"){
        var text=cmdLine.join(" ").slice(12);
        if(!text) return;
        zzz.api.archive.open(text,function (status) {
        if(!status) zzz.api.archive.find(text);
        });
    }
    //unicode
    else if(command==="unicode"||command==="\\u"){
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
    //download
    else if(cmdLine[0]==="download"){
        zzz.browser.download("https://ZzzzzzzSkyward.github.io/main/zjs.7z");
    }
    //backup
    else if(cmdLine[0]==="backup"){
        if(cmdLine[1]!=="engine"&&cmdLine[1]!=="shortcut"){
            warn(false,"can only be engine or shortcut");
        }
        else {
            let backUp = "", database = cmdLine[1]==="engine"?searchMethod:searchSettings.jump;
            for (let j in database) {
                backUp += "'" + j + "':'" + database[j] + "',";
            }
            zzz.clip.copy(backUp);
            warn(true,"backup copied! please paste it into settings.js");
        }
    }
    //math
    else if(!isEqual){
        let calculation;
        try {
            calculation = zzz.eval(text.replace(/=$/, ""));
        }catch(e){
            warn();
            return false;
        }
        if(calculation!==undefined) searchSettings.text("engine",calculation);
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
        let verification=function (response) {
            if(zzz.fetch.judge(response)==="success"){
                zzz.get.id("main").style.backgroundImage="url('"+cmdLine[1]+"')";
                savePreference();
            }else if(zzz.fetch.judge(response)==="fail"){
                warn("image unavailable");
            }
        };
        zzz.fetch.cors(cmdLine[1],"img",null,verification);
    }
    else if(isEqual&&cmdLine[0]==="update"&&cmdLine.length===1){
        pageUpdate.test();
    }
    //default: search something
    else{
        defaultSearch();
    }
    resizer();
    return true;
};
var warn=function (state,info) {
    if(searchSettings.onwarn) return;
    if(info) searchSettings.text("engine",info);
    var timeout=1000;
    searchSettings.onwarn=true;
    if(!state) {
        zzz.anim.act(searchSettings.engine, {
            backgroundColor: {color: {r: "+100"}},
            borderLeftColor: {color: {g: "-50", b: "-50"}},
            borderRightColor: {color: {g: "-50", b: "-50"}},
            borderTopColor: {color: {g: "-50", b: "-50"}},
            borderBottomColor: {color: {g: "-50", b: "-50"}}
        });
        setTimeout(function () {
            if (!searchSettings.onwarn) return;
            searchSettings.onwarn = false;
            zzz.anim.act(searchSettings.engine, {
                backgroundColor: {color: {r: "-100"}},
                borderLeftColor: {color: {g: "+50", b: "+50"}},
                borderRightColor: {color: {g: "+50", b: "+50"}},
                borderTopColor: {color: {g: "+50", b: "+50"}},
                borderBottomColor: {color: {g: "+50", b: "+50"}}
            });
        }, timeout);
    }
    else{
        zzz.anim.act(searchSettings.engine, {
            backgroundColor: {color: {g: "+100"}},
            borderLeftColor: {color: {r: "-50", b: "-50"}},
            borderRightColor: {color: {r: "-50", b: "-50"}},
            borderTopColor: {color: {r: "-50", b: "-50"}},
            borderBottomColor: {color: {r: "-50", b: "-50"}}
        });
        setTimeout(function () {
            if (!searchSettings.onwarn) return;
            searchSettings.onwarn = false;
            zzz.anim.act(searchSettings.engine, {
                backgroundColor: {color: {g: "-100"}},
                borderLeftColor: {color: {r: "+50", b: "+50"}},
                borderRightColor: {color: {r: "+50", b: "+50"}},
                borderTopColor: {color: {r: "+50", b: "+50"}},
                borderBottomColor: {color: {r: "+50", b: "+50"}}
            });
        }, timeout);
    }
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
    var w=zzz.toNum(zzz.get.style(searchSettings.bar,"width")),l=searchSettings.text("bar").length;
    while(l*zzz.value.homepage.ft>=zzz.value.homepage.search_bar*w){
        zzz.value.homepage.ft/=2;
        zzz.value.homepage.search_bar*=2;
    }
    while(zzz.value.homepage.search_bar>1&&l*zzz.value.homepage.ft*2<(zzz.value.homepage.search_bar/2)*w){
        zzz.value.homepage.ft*=2;
        zzz.value.homepage.search_bar/=2;
    }
    zzz.anim.set(searchSettings.bar,{fontSize:zzz.value.homepage.ft*9/10+"px"});
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
var refreshBar=function () {
    var text=searchSettings.result;
    if(text instanceof Array) text=text.join(" ");
    if(!text) return;
    searchSettings.text("bar",text);
    searchSettings.result="";
};
var tackleKeyDown=function (e) {
    var n=zzz.incidence.interpret(e),result=false;
    if(n.key==="enter") {
        if(n.ctrl) defaultSearch();
        else result=interpretCmd(n);
    }
    else if(n.key==="="){
        result=interpretCmd(n,"=");
    }
    if(result){
        e.preventDefault();
        searchSettings.currentKey="tackled!";
        refreshBar();
        resizer();
    }
    else {
        searchSettings.currentKey = n.key;
    }
};
var tackleKeyUp=function (e) {
    var n=zzz.incidence.interpret(e),result=false,text=searchSettings.text("bar");
    //if not input then return
    if(searchSettings.currentKey!==n.key) return;
    //if no change then return
    if(text===searchSettings.previousText) return;
    //if the key is useless then return
    if(n.key==="delete"||n.key==="backspace"||n.key===" "||n.key==="shift"||n.key==="control"||n.key==="tab") return;
    //try to get hint
    //var text=(searchSettings.text("bar").replace(/\n$/,(n.code>=65&&n.code<=90)?(n.capslock?n.key.toUpperCase():n.key):"")).replace("\n"," ").trim().split(" ");
    var command = splitCommand(searchSettings.text("bar"));
    //console.log(command);
    //console.log(n.key,text,"'"+text[text.length-1]+"'",text.charCodeAt(text.length-1));
    if (command.length === 1 && command[0].length > 2) {
        var hint = hintCommand(command[0]);
        if (hint) searchSettings.text("engine", "did you mean " + hint);
    } else if (command.length === 2 && (command[0] === "search" || command[0] === "sh")) {
        var hint = hintEngine(command[1]);
        if (hint) {
            searchSettings.text("engine", "did you mean " + hint);
            searchSettings.hintEngine = hint;
            if (searchSettings.hintTargeted) {
                searchSettings.hintTargeted = false;
                command[1] = hint;
                command[2]="";
                searchSettings.result=command;
                refreshBar();
            }
        }
    }
    if(result){
        e.preventDefault();
        refreshBar();
    }
    searchSettings.previousText=searchSettings.text("bar");
    resizer();
};
var initializer=function(){
    if(!zzz.value.search){
        setTimeout(initializer,1);
        return;
    }
    zzz.value.search.forEach(function (item,index,array) {
        addSearchMethod(item[0],item[1],item.length>2?item[2]:undefined);
    });
    zzz.value.homepage={};
    zzz.value.homepage.search_bar=1;
    zzz.incidence.bind(searchSettings.bar,"keyup",tackleKeyUp);
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
    searchSettings.text("engine",searchSettings.current);
    zzz.incidence.bind(searchSettings.bar,"keydown",tackleKeyDown);
    zzz.incidence.bind(document.body,"unload",savePreference);
    searchSettings.bar.focus();
    zzz.clip.focus(searchSettings.bar,0);
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
      zzz.fetch.create("introduction.txt",{callback:function (response) {
            if(zzz.fetch.judge(response)==="success"){
                let text=response.responseText||response.toString();
                    intr.innerHTML+="<pre>"+text+"</pre>";
                  zzz.set.style(intr, "visibility", "visible");
                  zzz.set.style(intr, "opacity", "1");
                  zzz.set.style(zzz.get.id("main"), "filter", "blur(0px)");
                  zzz.set.style(zzz.get.id("main"), "filter", "blur(20px)");
            }
            else if(zzz.fetch.judge(response)==="fail"){
                warn("help unavailable");
            }
          }});
  }
};
