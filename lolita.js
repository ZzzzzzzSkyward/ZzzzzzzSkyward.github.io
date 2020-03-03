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
lol.finalWidth=lol.height/2;
}else{
lol.finalWidth=lol.width;
}
lol.fontSize=lol.finalWidth/30;
lol.left=(lol.width-lol.finalWidth)/1.3;
getById("content").style.left=lol.left;
getById("content").style.fontSize=lol.fontSize;
getById("content").style.width=lol.finalWidth;
setAttr("alias","fontSize",lol.fontSize/2);
setAttr("title","fontSize",lol.fontSize*2);
}
window.onresize=setAll;

