from functions import *
log=logg('../log/log.txt')
headers = {
    "Accept": "application/json, text/plain, */*",
    "Accept-Encoding": "gzip, deflate, br",
    "Accept-Language": "zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2",
    "Connection": "keep-alive",
    "Content-Length": "26",
    "Content-Type": "application/json;charset=utf-8",
    "Cookie": "__cfduid=df8ed72cd9203bd215807636a8d5c27901617443611; koa:sess=eyJ1c2VySWQiOjc3ODk2LCJfZXhwaXJlIjoxNjQzMzYzNjcxNTEwLCJfbWF4QWdlIjoyNTkyMDAwMDAwMH0=; koa:sess.sig=WSd0aQDByTzXtKzBOZF3gXPM09U",
    "Host": "glados.rocks",
    "Origin": "https://glados.rocks",
    "Referer": "https://glados.rocks/console/checkin",
    "TE": "Trailers",
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:86.0) Gecko/20100101 Firefox/86.0"
}
result=requests.post("https://glados.rocks/api/user/checkin",json={"token": "glados_network"}, headers=headers)
result=json.loads(result.content)
log(result['code'])
log(result['message'])
