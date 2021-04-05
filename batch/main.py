# -*- coding:utf-8 -*-
import time
import os
script_list=("tieba","GlaDOS")
def to_file(src):
    if(src.find(".py")==-1):
        return "batch/"+src+".py"
    else:
        return src
for i in script_list:
    print(to_file(i))
    try:
        os.system("chmod 766 ./batch/*")
        os.system(to_file(i))
    except Exception as e:
        print(e)