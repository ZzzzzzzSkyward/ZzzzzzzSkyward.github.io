const lol={};
var getById=function(id){return document.getElementById(id);}
var getByClass=function(className){return document.getElementsByClassName(className);}
var newElement=function(name){return document.createElement(name);}
var setAttr=function(name,key,value){var i;for(i of getByClass(name)){i.style[key]=value;}}
var setAttreach=function(name,key,func){var i;for(i of getByClass(name)){i.style[key]=func(i);}}
var setAll=function(){
lol.width=document.body.clientWidth;
lol.height=document.body.clientHeight;
if(lol.width>lol.height){
//PC
lol.finalWidth=lol.width;
lol.fontSize=Math.min(lol.finalWidth/30,30);
}else{
lol.finalWidth=lol.width;
lol.fontSize=lol.finalWidth/30;
}
lol.left=(lol.width-lol.finalWidth)/2-2;
//getById("content").style.left=lol.left+"px";
getById("content").style.fontSize=lol.fontSize+"px";
//getById("content").style.width=lol.finalWidth+"px";
setAttr("alias","fontSize",lol.fontSize/2+"px");
//setAttr("title","lineHeight",lol.height-lol.fontSize-10+"px");
setAttr("title","fontSize",lol.fontSize*1.5+"px");
setAttreach("comment","borderColor",randomrgba);
setAttreach("comment","color",randomrgba);
getById("endnotecontainer").style.fontSize=lol.fontSize+"px";
}
var showNote=function(element){
	var container=newElement("div");
    container.className="footnotecontent";
	container.setAttribute("key",element.getAttribute("key"));
	container.style.bottom=document.body.scrollHeight-element.offsetTop+10;
	container.innerHTML=getById(element.getAttribute("key")).innerHTML;
	getById("content").appendChild(container);
	var tri=newElement("div");
	tri.className="triangle";
	tri.setAttribute("key",element.getAttribute("key"));
	tri.style.top=element.offsetTop-12;
	var temp;
		temp=element.offsetLeft+element.offsetWidth/2-10;
	if(temp<0){temp=0;}
	if(temp>lol.finalWidth){temp=lol.finalWidth-20;}
	tri.style.left=temp;
	getById("content").appendChild(tri);
}
var hideNote=function(element){
  for(let i of getByClass("footnotecontent")){
    if(i.getAttribute("key")===element.getAttribute("key")){
      getById("content").removeChild(i.nextSibling);
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
function randtxt(length){
	var code="qwertyuiopasdfghjklzxcvbnm$";
	var text="";
	var i=0;
	for(;i<length;i++){
		text+=code.charAt(randint(0,code.length));
	}
	return text;
}
function randomrgba(){
  return "rgba("+randint(0,255)+","+randint(0,255)+","+randint(0,255)+","+randint(0,255)+")";
}
function randommargin(){
  return randint(0,10)+"px"
}
var nodeStack=[];
var index=0;
function paragraph(text){
  var node=newElement("p");
  node.innerHTML=text;
  if(nodeStack[index].className.search("quote")>-1){
    index--;
  }
  nodeStack[index].appendChild(node);
}
function quote(text){
  var node=newElement("p");
  node.innerHTML=text;
  if(nodeStack[index].className.search("quote")===-1){
   var container=newElement("div");
   container.className="quote";
   nodeStack[index].appendChild(container);
   index++;
   nodeStack[index]=container;
  }
  nodeStack[index].appendChild(node);
}
function alias(text){
  return "<span class='alias'>"+text+"</span>"
}
function sup(text){
	return "<sup><small>"+text+"</small></sup>";
}
var endNoteCount=0;
function endnote(text){
	endNoteCount++;
	var node=newElement("div");
	node.innerHTML="["+endNoteCount+"]"+text;
	node.className="endnote";
	getById("endnotecontainer").appendChild(node);
	return sup("["+endNoteCount+"]");
}
function footnote(link,text){
  var node=newElement("div");
  node.innerHTML=text;
  node.className="footnotecontainer";
  node.id=randtxt(10);
  document.body.appendChild(node);
  return "<span class='footnoteword' key='"+node.id+"'>"+link+"</span>";
}
function dialog(speaker,text){
  var node=newElement("p");
  var len=speaker.length;
  node.innerHTML=speaker+text;
  node.style.textIndent=0-len+"em";
  node.style.paddingLeft=len+2+"em";
  getById("content").appendChild(node);
}
function comment(text){
  var node=newElement("div");
  node.innerHTML=text;
  node.className="comment";
  getById("content").appendChild(node);
}

function title(text){
  var node=newElement("div");
  node.innerHTML=text;
  node.className="chapter";
  while(nodeStack[index].className.search("quote")>-1){
    index--;
  }
  nodeStack[index].appendChild(node);
}
function pg(){
	var arg="<p>";
	for(var i=0;i<arguments.length;i++){
		arg+=arguments[i];
		arg+="</p><p>";
	}
	return arg+"</p>";
}
function startquote(){
	return "<div class='quote'>";
}
function endquote(){
	return "</div>";
}
function render(essay){
	nodeStack[0]=getById("content");
	var node;
	if(essay.title){
		node=newElement("div");
		node.className="title";
		node.innerHTML=essay.title;
		document.title=essay.title;
		nodeStack[index].appendChild(node);
	}
	if(essay.author){
		node=newElement("div");
		node.className="author";
		node.innerHTML=essay.author;
		nodeStack[index].appendChild(node);
	}
	if(essay.content){
		essay.content();
	}
}