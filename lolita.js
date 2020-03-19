var getById=function(id){return document.getElementById(id);}
var getByClass=function(className){return document.getElementsByClassName(className);}
var newElement=function(name){return document.createElement(name);}
var setAttr=function(name,key,value){var i;for(i of getByClass(name)){i.style[key]=value;}}
var setAttreach=function(name,key,func){var i;for(i of getByClass(name)){i.style[key]=func(i);}}
var setAll=function(){
var lol={};
lol.width=document.body.clientWidth;
lol.height=document.body.clientHeight;
if(lol.width>lol.height){
//PC
lol.finalWidth=Math.min(lol.height/0.618,lol.width)-4;
}else{
lol.finalWidth=lol.width;
}
lol.fontSize=lol.finalWidth/30;
lol.left=(lol.width-lol.finalWidth)/2-2;
getById("content").style.left=lol.left+"px";
getById("content").style.fontSize=lol.fontSize+"px";
getById("content").style.width=lol.finalWidth+"px";
setAttr("alias","fontSize",lol.fontSize/2+"px");
setAttr("title","lineHeight",lol.height-lol.fontSize-10+"px");
setAttr("title","fontSize",lol.fontSize*2+"px");
setAttreach("comment","borderColor",randomrgba);
setAttreach("comment","marginTop",randommargin);
}
var showNote=function(element){
var container=newElement("div");
container.className="footnotecontent";
container.setAttribute("key",element.getAttribute("key"));
container.style.bottom=document.body.scrollHeight-element.offsetTop;
container.innerHTML=getById(element.getAttribute("key")).innerHTML;
getById("content").appendChild(container);
}
var hideNote=function(element){
  for(let i of getByClass("footnotecontent")){
    if(i.getAttribute("key")===element.getAttribute("key")){
      getById("content").removeChild(i);
      break;
    }
  }
}
var controlCenter=function(eventE){
  if(this.onvisit){
    this.onvisit=0;
    hideNote(this);
    this.className="footnoteword";
  }else{
    this.onvisit=1;
    showNote(this);
    this.className+=" onvisit"
  }
}
var bindNotes=function(){
  for(let i of getByClass("footnoteword")){
    i.onclick=controlCenter;
  }
}
function randint(min,max){
  if(min===max){return min;}
  else{
    let rnd=Math.random()*(max-min);
    return Math.round(rnd)+min;
  }
}
function randomrgba(){
  return "rgba("+randint(0,255)+","+randint(0,255)+","+randint(0,255)+","+randint(0,255)+")";
}
function randommargin(){
  return randint(0,10)+"px"
}