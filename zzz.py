import time
import socket
import ctypes
import hashlib
import os
import pyperclip
import shutil
import win32com
from copy import deepcopy as copy
from urllib import request,parse
import urllib
import mistune
from bs4 import *
import re
import ssl
import json
import filetype
#regexp
regExpDatabase={}
class regType:
    @staticmethod
    def __call__(string,include=False,case=False,multiline=False):
        result=""
        flags=0
        if case:
            flags=flags|re.I
        if multiline:
            flags=flags|re.M
        if isinstance(string,re.Pattern):
            return string
        if include:
            if string in regExpDatabase:
                return regExpDatabase[string]
            else:
                result=re.compile(string,flags)
                regExpDatabase[string]=result
        else:
            result=re.compile(string,flags=flags)
        return result
    @staticmethod
    def replace(string,regexpstring,replacestring):
        r=reg(regexpstring)
        return re.sub(r,replacestring,string)
    @staticmethod
    def sh(string,regexp):
        return re.search(regexp,string)
    @staticmethod
    def search(string,regexp,start=0,end=None):
        if end==None:
            return reg(regexp,True).findall(string,start)
        else:
            return reg(regexp,True).findall(string,start,end)
    @staticmethod
    def match(string,regexp):
        ret=reg(regexp,True).search(string)
        if ret:
            return ret.group()
        else:
            return None
    @staticmethod
    def format(string,formattedRegexp,dictionary):
        for i in dictionary:
            formattedRegexp=reg.replace(formattedRegexp,"{"+i+"}","(?P<"+i+">"+dictionary[i]+")")
        return reg.sh(string,formattedRegexp)
    @staticmethod
    def indexOf(string,matchString,start=0,end=None):
        if not end:
            return string.find(matchString,start)
        else:
            return string.find(matchString,start,end)
    @staticmethod
    def lastIndexOf(string,matchString,start=0,end=None):
        if not end:
            return string.rfind(matchString,start)
        else:
            return string.rfind(matchString,start,end)
    @staticmethod
    def find(string,matchString,start=0,end=None):
        if not end:
            return string.find(matchString,start)
        else:
            return string.find(matchString,start,end)
    @staticmethod
    def lastFind(string,matchString,start=0,end=None):
        if not end:
            return string.rfind(matchString,start)
        else:
            return string.rfind(matchString,start,end)
reg=regType()
#数据
browser={
    'header':{
        #'User-Agent':'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4230.1 Safari/537.36',
        'Connection':'close',
        'Access-Control-Allow-Origin':'*'
        },
    'ua':'User-Agent',
    'cn':'Connection',
    'ka':'keep-alive',
    'timeout':1000,
    'http1':'HTTP/1.1',
    'http2':"HTTP/2.0",
    'break':"\r\n"
}
#create header
def get_header(user_agent=None,connection=None,browser_mode=None,url=None,header=None):
    if not header:
        new_header=copy(browser['header'])
    else:
        new_header=copy(header)
    b=browser
    if url:
        if not 'Host' in new_header:
            new_header['Host']=request.urlsplit(url).netloc
    if browser_mode:
        new_header[b['cn']]=b['ka']
    if connection:
        new_header[b['cn']]=connection
    if user_agent:
        new_header[b['ua']]=user_agent
    return new_header
#create header2
def create_header(https=False):
    new_header=copy(browser['header'])
    text=""
    type='http1'
    if https:
        type='http2'
    text+=browser[type]
    text+=" 200 ok"
    text+=browser["break"]
    for i in new_header:
        text+=i+":"+new_header[i]+"\r\n"
    text+=browser['break']
    return text

#获取ip
def get_my_ip():
    try:
        s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        s.connect(('8.8.8.8', 80))
        ip=s.getsockname()[0]
    finally:
        s.close()
    return ip
#文件系统
class dir:
    # 新建文件夹
    @classmethod
    def create(cls,href):
        if not href:
            return
        if not os.path.exists(href):
            os.makedirs(href)
#文件系统
class file:
    @classmethod
    def f(cls,path):
        path=reg.replace(path,'\\\\','/')
        return path
    @classmethod
    def d(cls,path):
        path=cls.f(path)
        if not path[-1]=='/':
            path=path+'/'
        return path
    #检测存在
    @classmethod
    def exist(cls,path):
        return os.path.exists(path)
    #重命名
    @classmethod
    def rename(cls,path,path2):
        os.rename(path,path2)
    @classmethod
    def rename_batch(cls,dir='',matchStr='',replaceStr=''):
        dir=cls.d(dir)
        matchedFiles=[]
        index=0
        if not matchStr:
            for i in os.listdir(dir):
                format=reg.lastIndexOf(i,'.')
                if format==-1:
                    format=len(i)
                matchedFiles.append((i,replaceStr+str(index)+i[format:]))
                index+=1
        else:
            for i in os.listdir(dir):
                if reg.sh(i,matchStr):
                    matchedFiles.append((i,reg.replace(i,matchStr,replaceStr)))
        for origin,current in matchedFiles:
            cls.rename(dir+origin,dir+current)
    @classmethod
    def type(cls,href,category=None):
        b=filetype.guess(href)
        if category:
            if category=="picture" or category=="img":
                category="image"
            return not not reg.find(b,category)
        return b
    # 新建文件
    @classmethod
    def create(cls,href):
        if not href:
            return
        split=os.path.split(href)
        dir.create(split[0])
        if not os.path.exists(href):
            file=open(href,"w")
            file.close()
    #写入
    @classmethod
    def write(cls,href,data,add=False):
        #转换为二进制
        if type(data)==str:
            data=bytes(data,encoding='utf-8')
        # 如果不存在则创建文件
        if not os.path.exists(href):
            cls.create(href)
        file=open(href,'ab' if add else 'wb')
        file.write(data)
        file.close()
        return

    #读取
    @classmethod
    def read(cls,href,size=None,buffer=None):
        if not href:
            return
        # 把数据读取出来
        file=open(href,'rb')
        data=file.read(size)
        if buffer:
            try:
                buffer.append(data)
            except:
                pass
        return data
    @classmethod
    def open(cls,href):
        if not os.path.exists(href):
            file.create(href)
        return file.read(href)
    @classmethod
    def copy(cls,src,target):
        f=file.open(src)
        g=file.open(target)
        #compare if they are the same
        f_md5=hashlib.md5(f).hexdigest()
        g_md5=hashlib.md5(g).hexdigest()
        if f_md5!=g_md5:
            file.write(target,f)
            print(f"from {src} to {target}.\n")
    @classmethod
    def cpy(cls,path,path2):
        if os.path.isdir(path):
            shutil.copytree(path,path2)
        else:
            shutil.copyfile(path,path2)
    @classmethod
    def cut(cls,path,path2):
        shutil.move(path,path2)
    @classmethod
    def move(cls,path,path2):
        cls.cut(path,path2)
    @classmethod
    def size(cls,path):
        return os.path.getsize(path)
    @classmethod
    def readstr(cls,path):
        return reg.replace(code.de(cls.read(path)),'\r\n','\n')
    @classmethod
    def shortcut(cls,fpath,name=None):
        if not fpath:
            return "require name and path"
        fpath=os.path.abspath(fpath)
        path=fpath
        if name==None:
            j=max(reg.lastIndexOf(path,'\\'),reg.lastIndexOf(path,"/"),0)
            i=reg.lastIndexOf(path,".",j+1)
            if i==-1:
                name=path[j:]
            else:
                name=path[j:i]
        name=os.path.abspath(name)
        if name[-4:]!='.lnk' or name[-4:]!='.url':
            name+='.lnk'
        shell = win32com.client.Dispatch("WScript.Shell")
        shortcut = shell.CreateShortCut(name)
        shortcut.TargetPath = path
        shortcut.save()
        del shell
        return name
    @classmethod
    def remove(cls,name):
        if cls.exist(name):
            if os.path.isdir(name):
                shutil.rmtree(name)
            else:
                os.remove(name)
class connect:
    #get请求
    @classmethod
    def get(cls,url,header=None):
        if isinstance(header,str):
            header=json.loads(header)
        if not header:
            header=get_header(url)
        if reg.indexOf(url,"://")==-1:
            url="https://"+url
        req=request.Request(url)
        for i in header:
            req.add_header(i,header[i])
        try:
            c=request.urlopen(req,timeout=browser['timeout'],context=ssl._create_unverified_context())
            data=c.read()
            header=c.getheaders()
            return {"data":data,"header":header}
        except Exception as e:
            print(str(e))
    #post请求
    @classmethod
    def post(cls,url,data,header=None):
        if not header:
            header=get_header()
        if type(data)==dict:
            data=parse.urlencode(data)
        if type(data)==str:
            data=bytes(data,encoding='utf-8')
        req=request.Request(url,headers=header,data=data)
        try:
            c=request.urlopen(req,timeout=browser['timeout'])
            data=c.read()
            header=c.getheaders()
            return {"data":data,"header":header}
        except Exception as e:
            print(str(e))
    #retrieve data by GET
    @classmethod
    def retrieve(cls,url,href):
        file.write(href,cls.get(url)['data'])
    #监听
    @classmethod
    def listen(cls,port,function):
        sk=socket.socket(socket.AF_INET,socket.SOCK_STREAM)
        sk.bind(('localhost',port))
        sk.listen(1)
        while 1:
            receive_data,receive_address=sk.accept()
            print(receive_address)
            return_data=function(cls.read_data_from_socket(receive_data))
            if return_data=="close":
                receive_data.sendall(b'closed')
                break
            return_data=create_header()+return_data
            print("data receive end")
            receive_data.sendall(bytes(return_data,encoding='utf-8'))
            print("data send end.")
            receive_data.close()
            print("connection close.")

    #直接获取网页
    @classmethod
    def get_html(cls,url):
        print(f'html get {url}')
        data=connect.get(url)
        if data:
            data=data['data']
        if data:
            return code.de(data)
            print(f'html get {url} failed')
        return

    #读取socket的data
    @classmethod
    def read_data_from_socket(cls,sk):
        if not isinstance(sk,socket.socket):
            raise Exception("not a socket")
        buffer=[]
        length=0
        while True:
            data=sk.recv(1024)
            l=len(data)
            if not data:
                break
            buffer.append(data)
            length+=l
            if reg.search(data.decode("utf-8"),'\r\n\r\n'):
                break
            time.sleep(50)
        length=length/1024.0
        print(f'received {length} KB data recieved')
        return b''.join(buffer)

    @classmethod
    def tcp(cls,url):
        s=socket.socket(socket.AF_INET,socket.SOCK_STREAM)
        s.connect((url,80))
        s.send(b'GET / HTTP/1.1\r\nHost: www.1meizitu.com\r\nConnection: close\r\n\r\n')
        buffer = []
        while True:
            d = s.recv(1024)
            if d:
                buffer.append(d)
            else:
                break
        # 把字节连接起来
        data = b''.join(buffer)
        # 关闭连接
        s.close()
        return data
    @classmethod
    def download(cls,url,dir=None,name=None,header=None,user=None,password=None):
        '''
        @param url string or list
        @param dir file location,default:current dir
        @param name of the file,default:
        @param header string
        @param user
        @param password
        '''
        text='E:/aria2/aria2c.exe'
        if dir:
            text+=' -d '+dir
        if name:
            text+=' -o '+name
        if header:
            text+=' --header='+header
        if user:
            protocol=reg.search("[ftphs]{3}").group(0)
            text+=f" --{protocol}-user={user} --{protocol}-password={password}"
        if isinstance(url,list):
            text+=' -Z'
            for i in url:
                text+=" "+i
        else:
            text+=" "+url
        try:
            os.system(text)
        except Exception as e:
            print("error",e)
        return text

#处理
class htm:
    def __init__(self):
        self.dat=None
    @classmethod
    def init(cls,htmlData):
        '''htmlData is a file handle or string
        '''
        cls.data=BeautifulSoup(htmlData,"html.parser")
        cls.dat=BeautifulSoup(htmlData,"html.parser")
    @classmethod
    def cls(cls,className):
        return cls.data.find_all(class_=className)
    @classmethod
    def tag(cls,tagName):
        return cls.data.find_all(tagName)
    @classmethod
    def find(cls,id=None,attrs=None,className=None,tagName=None,tag=None,max=0,deep=False):
        return cls.data.find_all(tagName or tag or "",attrs,class_=className,id=id,limit=max if max else None)
    @classmethod
    def css(cls,string):
        '''
        #id .class ui li  div[id="..."]
        '''
        return cls.data.select(string)
    @classmethod
    def children(cls,node):
        return node.descendants
    @classmethod
    def parent(cls,node):
        return node.parent
    @classmethod
    def siblings(cls,node):
        '''include itself
        '''
        if node.child:
            return node.child.parents
        elif node.parent:
            return node.parent.descendants
        else:
            result=[]
            while node:
                result.append(node)
                node=node.next
            return result
    @staticmethod
    def encodeComponent(txt):
        return parse.quote(txt)
    @staticmethod
    def decodeComponent(txt):
        return parse.unquote(txt)
class cmdType:
    @staticmethod
    def __call__(command):
        return os.system(command)
    @staticmethod
    def install(path):
        '''
        @param path is a package
        @param path is a name
        '''
        path=file.f(path)
        if reg.indexOf(path,' '):
            path=f"'{path}'"
        try:
            cmd("powershell Add-AppxPackage "+path)
        except:
            cmd(path)

cmd=cmdType()

#剪贴板
class clipboard:
    @staticmethod
    def get():
        return pyperclip.paste()
    @staticmethod
    def paste():
        return clipboard.get()
    @staticmethod
    def set(data):
      pyperclip.copy(data)
    @staticmethod
    def copy(data):
        return clipboard.set(data)
    @staticmethod
    def cpy(data):
        return clipboard.set(data)
def clip(data=None):
    result=data
    if data:
        clipboard.set(data)
    else:
        result=clipboard.get()
    return result

class tieba:
    tie="https://tieba.baidu.com/"
    #time,id,ba,pn,lz
    comment='https://tieba.baidu.com/p/totalComment?t={time}&tid={id}&fid={ba}&pn={pn}&see_lz={lz}'
    #index
    emoji='<img class="BDE_Smiley" width="30" height="30" changedsize="false" src="https://gsp0.baidu.com/5aAHeD3nKhI2p27j8IqW0jdnxx1xbK/tb/editor/images/client/image_emoticon{index}.png" >'
    face='<img class="BDE_Smiley" pic_type="1" width="30" height="30" src="https://tb2.bdstatic.com/tb/editor/images/face/i_f{index}.png?t=20140803'
    forum='https://tieba.baidu.com/f?kw={keyword}&ie=utf-8'
    def __init__(self):
        super().__init__()
        self.posts=[]
    @staticmethod
    def createForumURL(name='',pn=0,fid=0):
        if name:
            return reg.replace(tieba.forum,"{keyword}",name)
        else:
            print("error in createForumURL")
    @staticmethod
    def createPageUrl(pn=0,tie="",pid=0):
        if not pid:
            print("tieba.getPageUrl:no pid!")
        if not tie:
            tie=tieba.tie
        return tie+'p/'+str(pid)+"?pn="+str(int(pn))
    def getPageUrl(self,pn):
        return self.tie+'p/'+str(self.pid)+"?pn="+str(int(pn))
    @staticmethod
    def getComment(id,ba,pn=0,lz=0):
        url=tieba.comment.format(id=id,ba=ba,pn=pn,lz=lz)
        newData=tiebaVerify
        newData['id']=id
        newData['fid']=ba
        newData['fname']=""
        newData['first_dir']=""
        newData['second_dir']=""
        #todo ...
        connect.post("https://tieba.baidu.com/official/click/viewTrue",)
        time.sleep(100)
        comment=code.de(connect.get(url))
        print(comment)
        #todo ...
        return comment

    def load(self,html):
        self.type='post' if html.find('/p/')!=-1 else 'forum'
        text=connect.get_html(html)
        self.text=text
        self.url=html
        self.pid=tieba.hrefToPid(html)
        if self.type=='post':
            self.page=self.getTotalPages(self.text,self.pid)
            self.getAuthor()
        #return text
    def a(self):
        lst=self.text.split("</a>")
        alist=[]
        for i in lst:
            temp=reg.search(i,'<a rel="noreferrer" href="[^"]*" title="[^"]*" target="_blank" class="j_th_tit ">')
            if len(temp):
                alist.append(temp[0])
        self.a=[]
        for i in alist:
            try:
                self.a.append({'href':reg.search(i,'(?<=href=")[^"]*')[0],'title':reg.search(i,'(?<=title=")[^"]*')[0]})
                self.a[len(self.a)-1]['pid']=self.hrefToPid(self.a[len(self.a)-1]['href'])
            except:
                print("error:tieba.a",i,reg.search(i,'(?<=href=")[^"]*'),reg.search(i,'(?<=title=")[^"]*'))
        print(self.a)
        return self.a
    def div(self):
        length=len(self.text)
        i=0
        lst=[]
        alist=[]
        while i<length:
            left=self.text.find('<div id="post_content_',i)
            if left==-1:
                break
            #" class="d_post_content j_d_post_content " style="display:;">')
            innerHTML=tieba.seperate(self.text,left)
            lst.append(innerHTML)
            i=left+80
        for i in lst:
            temp=reg.format(i,'<div id="post_content_{id}" class="[^\"]+" style="display:;">{content}</div>',{'id':"[0-9]*",'content':".*"})
            if temp:
                try:
                    post={'id':temp.group('id'),'content':temp.group('content')}
                    post['content']=tieba.prune(post['content'])
                    alist.append(post)
                except:
                    print("tieba.div error in matching <div>.\n")
        self.div=alist
        self.printPosts()
        return self.div
    def printPosts(self):
        max_num=1
        length=len(self.div)
        i=0
        while i<max_num and i<length:
            print("post= %.50s" % self.div[i]['content'],end='')
            if len(self.div[i]['content'])>50:
                print('...')
            else:
                print('')
            i+=1
    def __str__(self):
        result=[[],[]]
        if self.url:
            result[0].append('url')
            result[1].append(self.url)
        if self.text:
            result[0].append('text')
            result[1].append(self.text[0:100])
        if self.pid:
            result[0].append('pid')
            result[1].append(self.pid)
        if self.fid:
            result[0].append('fid')
            result[1].append(self.fid)
        if self.author:
            result[0].append('author')
            result[1].append(self.author)
        text=""
        for i in range(0,len(result[0])):
            text+=result[0][i]+"="+result[1][i]+"\n"
        if type(self.a)==list:
            text+="a links={"
            for i in self.a:
                text+=" "*4+"title="+self.a[i]['title']+";href="+self.a[i]['href']
            text+="}"
        return text
    def openInBrowser(self,i=0):
        try:
            cmd("start "+self.tie+self.a[i]['href'])
        except Exception as e:
            print(e)
    @classmethod
    def get(cls,html):
        page=tieba()
        page.load(html)
        return page
    @staticmethod
    def seperate(text,start):
        length=len(text)
        i=start
        while i<length:
            #find <div
            if text[i:i+4]=="<div":
                i+=4
                break
            else:
                i+=1
        start=i-4;
        depth=1;
        while i<length and depth:
            #find </div depth-1
            #find <div depth+1
            results=text.find("<div",i)
            resulte=text.find("</div>",i)
            if results==-1:
                if resulte!=-1:
                    depth+=1
                    i=resulte+6
                else:
                    break
            else:
                if resulte==-1:
                    i=results
                    break
                elif resulte<results:
                    depth-=1
                    i=resulte+6
                else:
                    depth+=1
                    i=results+5
        if depth:
            print("error:tieba.seperate <div> unsuccessful")
        result=text[start:i]
        #print(f"result={result}")
        return result
    @staticmethod
    def prune(text):
        text=reg.replace(text,"(</div>)|(<div [^>]*>)","")
        text=reg.replace(text,'class="BDE_Smiley" width="30" height="30" changedsize="false" src="https://gsp0\\.baidu\\.com/5aAHeD3nKhI2p27j8IqW0jdnxx1xbK/tb/editor/images/client/image_emoticon','emoji="')
        text=reg.replace(text,'class="BDE_Smiley" pic_type="1" width="30" height="30" src="https://tb2\\.bdstatic\\.com/tb/editor/images/face/i_f','face="')
        text=text.strip()
        return text
    @staticmethod
    def getImages(text):
        start=0
        end=len(text)
        src=[]
        while start<end:
            i=reg.indexOf(text,"<img",start)
            if i==-1:
                break
            srcStart=reg.indexOf(text,"src=\"",i)
            if srcStart==-1:
                break
            start=srcStart+4
            bracketEnd=reg.indexOf(text,">",i)
            if bracketEnd==-1:
                bracketEnd=srcStart
            if srcStart>bracketEnd:
                start=bracketEnd+1
                continue
            srcEnd=reg.indexOf(text,"\"",srcStart+5)
            if srcEnd==-1:
                print("error finding end of quote")
            srcTemp=text[srcStart+5:srcEnd]
            if reg.indexOf(srcTemp,"tiebapic.baidu.com")==-1:
                continue
            src.append(srcTemp)
        return src
    @staticmethod
    def hrefToPid(href):
        print('href=',href)
        return reg.search(href,"[0-9]+")[0]
    @staticmethod
    def getTotalPages(text,pid):
        formatText='<a href="/p/'+str(pid)+'\?pn={pn}">尾页</a>'
        pn=reg.format(text,formatText,{'pn':"[0-9]{1,3}"})
        if not pn:
            print("error:tieba.getTotalPage",pid)
            return 1
        else:
            return int(pn.group('pn'))
    def getAuthor(self):
        text=self.text
        left=text.find('PageData.thread')
        if left==-1:
            print("error:tieba.getAuthor failed")
            return
        for i in ['author','reply_num']:
            index=text.find(i,left)
            temp=text[index:index+len(i)]
            #go to =
            index+=len(i)+1
            temp=index
            while text[index]!=',' and text[index]!='}':
                index+=1
            temp=text[temp:index]
            temp=eval(temp)
            exec("self."+i+"=temp")

tiebaVerify={
    "client_type": "pc_web",
	"task": "ad_plat",
	"locate": "p0250",
	"type": "VIEW_TRUE",
	"url": "",
	"refer": "",
	"page": "pb",
	"fid": "",
	"fname": "",
	"uid": "null",
	"uname": "null",
	"is_new_user": "",
	"tid": "",
	"line": "PT",
	"callfrom": "effect_evl",
	"action_type": "VIEW_TRUE",
	"id": "null",
	"res_id": "null",
	"first_dir": "",
	"second_dir": ""
}
tiebaPostsPerPage=50

class tb:
    @staticmethod
    def images(forumURL,dir=''):
        imgs=[]
        better=[]
        b=tieba()
        b.load(forumURL if reg.indexOf(forumURL,"http")==0 else tieba.createForumURL(name=forumURL))
        b.a()
        kk=10
        for j in b.a:
            if kk==0:
                break
            else:
                kk-=1
            c=tieba()
            c.load(b.createPageUrl(pid=j['pid']))
            c.div()
            e=[]
            for k in c.div:
                e.extend(c.getImages(k['content']))
            for l in e:
                d=tieba()
                d.load("http://tieba.baidu.com/photo/p?kw=" + forumURL + "&flux=1&tid=" + c.pid + "&pic_id=" + (l[reg.lastIndexOf(l,'/')+1:reg.lastIndexOf(l,".")]) + "&pn=1&fp=2&see_lz=" + str(0))
                h=reg.indexOf(d.text,'"waterurl":"')
                h2=reg.indexOf(d.text,'"',h+12)
                url=d.text[h+12:h2]
                imgs.append(url)
                time.sleep(0.5)
        for i in imgs:
            file_name=c.pid+"-"+i[-10:-1]+i[-1]
            print(file_name,end=' ')
            if os.path.exists(dir+file_name):
                print("already exists.")
                continue
            else:
                print("")
            print(file_name)
            connect.retrieve(i,dir+file_name)
            time.sleep(0.5)
class analyze:
    @staticmethod
    def img(text):
        img_list=reg.search(text,"<img[^>]+>")
        src_list=[]
        for i in img_list:
            src=reg.search(i,"src='[^']+'")
            if not src:
                src=reg.search(i,'src="[^"]+"')
            if not src:
                continue
            else:
                src_list.append(src[0][5:len(src[0])-1])
        return src_list
    @staticmethod
    def img_url(text):
        src_list=analyze.img(text)
        url_list=[]
        for i in src_list:
            if i[0:4]=="data":
                continue
            else:
                url_list.append(i)
        return url_list
    @staticmethod
    def img_name(url,max_length=10):
        image_format='jpg|jpeg|png|tif|bmp'
        if max_length<1:
            max_length=10
        if not url:
            raise Exception("no url given to analyze.img_name")
        else:
            name_left=reg.lastIndexOf(url,"/")+1
            name_right=reg.lastIndexOf(url,"?")
            if name_left<8:
                name_left=reg.indexOf(url,".")
            if name_left<0:
                name_left=0
            if name_right==-1:
                name_right=len(url)
            name=url[name_left:name_right]
            if not reg.search(name,"[.]"+image_format):
                name2=reg.search(url,"[^&=?/]{1,"+str(max_length)+"}[.]"+image_format)
                if name2:
                    name=name2[0]
                else:
                    name+='.'+image_format[0:3]#default format set to jpg
            return name
    @staticmethod
    def tieba_big_img(img_url,forumName,pid,pn=1,see_lz=0):
        if not forumName or not pid:
            raise Exception("no forum name or pid given to analyze.tieba_big_img")
        return "http://tieba.baidu.com/photo/p?kw=" + htm.encodeComponent(forumName) + "&flux=1&tid=" + pid + "&pic_id=" + (img_url[reg.lastIndexOf(img_url,'/')+1:reg.lastIndexOf(img_url,".")]) + "&pn="+str(pn)+"&fp=2&see_lz=" + str(see_lz)
    @staticmethod
    def get_tieba_big_img_url(text):
        left=reg.indexOf(text,'"waterurl":"')
        right=reg.indexOf(text,'"',left+12)
        if left==-1 or right==-1:
            raise Exception("cannot find big_img for the url:"+img_url)
        url=text[left+12:right]
        return url
class code:
    @staticmethod
    def de(data):
        for i in ['utf-8','gbk','utf-16','utf-32']:
            try:
                return data.decode(i)
            except:
                pass
        try:
            return json.loads(data)
        except:
            pass
        raise Exception("code.de failed")
    @staticmethod
    def en(data,type='utf-8'):
        if type=="json":
            return json.dumps(data,ensure_ascii=False)
        return data.encode(type)
class htmpage:
    def load(self,url):
        self.url=url
        self.data=connect.get(url)['data']
        self.text=code.de(self.data)
    def image(self):
        return analyze.img_url(self.text)
    def download_image(self,dir,max_loop=10):
        img_list=self.image()
        while max_loop:
            #最大重复次数
            max_loop-=1
            #判断是否全部下载完成
            complete=True
            #文件名按数字递增
            index=0
            for src in img_list:
                file_name=dir+analyze.img_name(src)
                real_name=dir+"%02d"%(index)+".jpg"
                index+=1
                if not os.path.exists(real_name):
                    try:
                        connect.retrieve(src,real_name)
                        print(index,"=",src)
                    except:
                        complete=False
                        time.sleep(0.5)
            if complete:
                print("image download complete.")
                return
class api:
    @staticmethod
    def download_from_server(data,dir="z:/"):
        #format:/?url=......&name=....
        try:
            text=code.de(data)
            url=reg.search(text,"(?<=url=)[^ &]+")
            name=reg.search(text,"(?<=name=)[^ &]+")
            isTieba=reg.search(text,"(?<=isTieba=)false|true")
            if isTieba:
                isTieba=isTieba[0]=="true"
            else:
                print("error: no isTieba in",text)
                isTieba=False
            if not url:
                return "error:cannot find url"
            else:
                url=htm.decodeComponent(url[0])
            if isTieba:
                a=tieba()
                a.load(url)
                url=analyze.get_tieba_big_img_url(a.text)
            if not name:
                name=analyze.img_name(url)
            else:
                name=analyze.img_name(htm.decodeComponent(name[0]),max_length=256)
            href=dir+name
            connect.retrieve(url,href)
            return "{success:true,name:\""+name+"\"}"
        except Exception as e:
            return "{success:false,error:\""+str(e)+"\",name:\""+name+"\"}"
    @staticmethod
    def wait_for(port=5000):
        this_server=connect.listen(port,api.download_from_server)
        return



