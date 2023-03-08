# -*- coding:utf-8 -*-
from functions import *
script_list=("tieba",)
log=logg('./log/log.txt')
def to_file(src):
    if(src.find(".py")==-1):
        return "batch/"+src+".py"
    else:
        return src
for i in script_list:
    log(to_file(i))
    try:
        os.system("chmod 766 ./batch/*")
        returnValue=os.system("python "+to_file(i))
    except Exception as e:
        print(e)
        os.system("python32 "+to_file(i))