# -*- coding:utf-8 -*-
import time
import os
script_list=("tieba","GlaDOS")
log_href='~/batch/log.txt'
log_file=open(log_href,'a' if os.path.exists(log_href) else 'w')
def logg(string):
    print(string)
    log_file.write(string+'\n')
def to_file(src):
    if(src.find(".py")==-1):
        return "~/batch/"+src+".py"
    else:
        return src
for i in script_list:
    logg(to_file(i))
    try:
        os.system("chmod 766 ./batch/*")
        returnValue=os.system("python "+to_file(i))
        logg(returnValue)
    except Exception as e:
        os.system("python32 "+to_file(i))
        print(e)
log_file.close()