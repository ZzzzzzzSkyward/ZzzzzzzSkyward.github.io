from functions import *
import brotli
log=logg('../log/log.txt')
headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
    "Authorization": "24059000443861515277608332754223-1080-1920",
    "Connection": "keep-alive",
    "Content-Length": "26",
    "Content-Type": "application/json;charset=utf-8",
    "Cookie": "koa:sess=eyJ1c2VySWQiOjc3ODk2LCJfZXhwaXJlIjoxNjgxNjMzNjc3NzY3LCJfbWF4QWdlIjoyNTkyMDAwMDAwMH0=; koa:sess.sig=wLJhsL80u2A-aBIRWqs9dgzw1Xw",
    "Host": "glados.rocks",
    "Origin": "https://glados.rocks",
    "Referer": "https://glados.rocks/console/checkin",
    
    "TE": "Trailers",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:106.0) Gecko/20100101 Firefox/106.0"
}
result=requests.post("https://glados.rocks/api/user/checkin",json={"token": "glados.network"}, headers=headers)
result=result.content
print(result)
try:
    result=brotli.decompress(result)
except:
    log("brotli decompress failed")
    pass
try:
    result=json.loads(result)
except:
    log("json load failed")
    pass
log('code=',result['code'])
log('message=',result['message'])