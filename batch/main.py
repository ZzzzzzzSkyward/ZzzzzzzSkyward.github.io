# -*- coding:utf-8 -*-
from functions import *
script_list=("tieba","GlaDOS")
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
        log(returnValue)
    except Exception as e:
        os.system("python32 "+to_file(i))
        print(e)