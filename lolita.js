var getById=function(id){return document.getElementById(id);}
var getByClass=function(className){return document.getElementsByClassName(className);}
var setAttr=function(name,key,value){var i;for(i of getByClass(name)){i.style[key]=value;}}
var setAll=function(){
console.log(1);
var lol={};
lol.width=document.body.clientWidth;
lol.height=document.body.clientHeight;
if(lol.width>lol.height){
//PC
lol.finalWidth=lol.height/0.618;
}else{
lol.finalWidth=lol.width;
}
lol.fontSize=lol.finalWidth/30;
lol.left=(lol.width-lol.finalWidth)/2;
getById("content").style.left=lol.left+"px";
getById("content").style.fontSize=lol.fontSize+"px";
getById("content").style.width=lol.finalWidth+"px";
setAttr("alias","fontSize",lol.fontSize/2+"px");
setAttr("title","lineHeight",lol.height-lol.fontSize-10+"px");
setAttr("title","fontSize",lol.fontSize*2+"px");
}

